import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { eq } from 'drizzle-orm'
import { validateAuth } from '@/lib/auth'
import { parseZodErrors } from '@/lib/parse-zod-errors'
import { sendEmail } from '@/lib/email'
import { db, schema } from '@/db'
import { initDatabase } from '@/db/init'

type RouteParams = { params: Promise<{ id: string }> }

const updateOrderSchema = z.object({
  trackingNumber: z.string().max(100).optional(),
  carrier: z.enum(['hrvatska-posta', 'gls', 'dpd']).optional(),
  currentStatus: z.string().max(50).optional(),
  notes: z.string().max(2000).optional(),
})

export async function PUT(request: NextRequest, { params }: RouteParams): Promise<NextResponse> {
  const authError = validateAuth(request)
  if (authError) return authError
  initDatabase()

  const { id } = await params

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid JSON body' }, { status: 400 })
  }

  const parseResult = updateOrderSchema.safeParse(body)
  if (!parseResult.success) {
    return NextResponse.json({ success: false, errors: parseZodErrors(parseResult.error) }, { status: 400 })
  }

  const existing = db.select().from(schema.orders).where(eq(schema.orders.id, id)).get()
  if (!existing) {
    return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 })
  }

  const data = parseResult.data
  const hadTrackingBefore = !!existing.trackingNumber
  const gettingTrackingNow = !!data.trackingNumber && !hadTrackingBefore

  db.update(schema.orders)
    .set({
      ...data,
      updatedAt: new Date().toISOString(),
    })
    .where(eq(schema.orders.id, id))
    .run()

  // Auto-email when tracking code is first entered
  if (gettingTrackingNow) {
    const carrierName = data.carrier === 'hrvatska-posta' ? 'Hrvatska Pošta' : data.carrier === 'gls' ? 'GLS' : 'DPD'
    sendEmail({
      to: existing.customerEmail,
      subject: `Your order has been shipped — ${data.trackingNumber}`,
      html: `<p>Hi ${existing.customerName},</p>
        <p>Your order has been shipped via <strong>${carrierName}</strong>.</p>
        <p>Tracking number: <strong>${data.trackingNumber}</strong></p>
        <p>Track your package: <a href="https://version2.hr/tracking/?q=${data.trackingNumber}">version2.hr/tracking/</a></p>
        <p>— Version2 Team</p>`,
    }).catch((err) => console.error('[Orders] Tracking email failed:', err))
  }

  return NextResponse.json({ success: true })
}

export async function DELETE(request: NextRequest, { params }: RouteParams): Promise<NextResponse> {
  const authError = validateAuth(request)
  if (authError) return authError
  initDatabase()

  const { id } = await params

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
