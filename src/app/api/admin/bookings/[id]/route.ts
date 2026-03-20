import { NextRequest, NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { validateAdminCookie } from '@/lib/admin-auth'
import { db, schema } from '@/db'
import { ensureDatabase } from '@/db/migrate'

let dbReady = false

const updateStatusSchema = z.object({
  status: z.enum(['cancelled', 'confirmed', 'completed']),
})

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  const authError = validateAdminCookie(request)
  if (authError) return authError

  if (!dbReady) {
    ensureDatabase()
    dbReady = true
  }

  const { id } = await params

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid JSON body' },
      { status: 400 },
    )
  }

  const parsed = updateStatusSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: 'Invalid status. Must be: cancelled, confirmed, or completed.' },
      { status: 400 },
    )
  }

  const existing = db
    .select({ id: schema.bookings.id })
    .from(schema.bookings)
    .where(eq(schema.bookings.id, id))
    .get()

  if (!existing) {
    return NextResponse.json(
      { success: false, error: 'Booking not found' },
      { status: 404 },
    )
  }

  db.update(schema.bookings)
    .set({
      status: parsed.data.status,
      updatedAt: new Date().toISOString(),
    })
    .where(eq(schema.bookings.id, id))
    .run()

  return NextResponse.json({ success: true, status: parsed.data.status })
}
