import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { eq } from 'drizzle-orm'
import { validateAdminCookie } from '@/lib/admin-auth'
import { parseZodErrors } from '@/lib/parse-zod-errors'
import { sendEmail } from '@/lib/email'
import { db, schema } from '@/db'
import { initDatabase } from '@/db/init'

const updateOrderSchema = z.object({
  trackingNumber: z.string().max(100).optional(),
  carrier: z.enum(['hrvatska-posta', 'gls', 'dpd']).optional(),
  currentStatus: z.enum(['pending', 'shipped', 'delivered', 'cancelled']).optional(),
  notes: z.string().max(2000).optional(),
})

type RouteContext = { params: Promise<{ id: string }> }

export async function GET(
  request: NextRequest,
  context: RouteContext,
): Promise<NextResponse> {
  const authError = validateAdminCookie(request)
  if (authError) return authError
  initDatabase()
  const { id } = await context.params

  const order = db.select().from(schema.orders).where(eq(schema.orders.id, id)).get()
  if (!order) {
    return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 })
  }

  return NextResponse.json({ order })
}

export async function PUT(
  request: NextRequest,
  context: RouteContext,
): Promise<NextResponse> {
  const authError = validateAdminCookie(request)
  if (authError) return authError
  initDatabase()
  const { id } = await context.params

  const existing = db.select().from(schema.orders).where(eq(schema.orders.id, id)).get()
  if (!existing) {
    return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid JSON body' }, { status: 400 })
  }

  const parseResult = updateOrderSchema.safeParse(body)
  if (!parseResult.success) {
    return NextResponse.json(
      { success: false, errors: parseZodErrors(parseResult.error) },
      { status: 400 },
    )
  }

  const data = parseResult.data
  const hadTrackingBefore = !!existing.trackingNumber
  const trackingJustAdded = !hadTrackingBefore && !!data.trackingNumber

  db.update(schema.orders)
    .set({
      ...(data.trackingNumber !== undefined && { trackingNumber: data.trackingNumber }),
      ...(data.carrier !== undefined && { carrier: data.carrier }),
      ...(data.currentStatus !== undefined && { currentStatus: data.currentStatus }),
      ...(data.notes !== undefined && { notes: data.notes }),
      updatedAt: new Date().toISOString(),
    })
    .where(eq(schema.orders.id, id))
    .run()

  if (trackingJustAdded) {
    const trackingUrl = `https://version2.hr/tracking?order=${id}`
    await sendEmail({
      to: existing.customerEmail,
      subject: 'Your order has been shipped',
      html: `
        <h2>Your order has been shipped!</h2>
        <p>Hi ${existing.customerName},</p>
        <p>Your order <strong>${id}</strong> has been shipped.</p>
        <p><strong>Tracking number:</strong> ${data.trackingNumber}</p>
        ${data.carrier ? `<p><strong>Carrier:</strong> ${data.carrier}</p>` : ''}
        <p><a href="${trackingUrl}">Track your order here</a></p>
        <p>Thank you,<br/>Version2</p>
      `,
    })
  }

  const updated = db.select().from(schema.orders).where(eq(schema.orders.id, id)).get()

  return NextResponse.json({ success: true, order: updated })
}

export async function DELETE(
  request: NextRequest,
  context: RouteContext,
): Promise<NextResponse> {
  const authError = validateAdminCookie(request)
  if (authError) return authError
  initDatabase()
  const { id } = await context.params

  const existing = db.select().from(schema.orders).where(eq(schema.orders.id, id)).get()
  if (!existing) {
    return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 })
  }

  db.update(schema.orders)
    .set({ currentStatus: 'cancelled', updatedAt: new Date().toISOString() })
    .where(eq(schema.orders.id, id))
    .run()

  return NextResponse.json({ success: true })
}
