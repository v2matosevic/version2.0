import { NextRequest, NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'
import { generateIcs } from '@/lib/ics'
import { db, schema } from '@/db'
import { ensureDatabase } from '@/db/migrate'

let dbReady = false

const TEAM_EMAIL = process.env.TEAM_EMAIL ?? 'info@version2.hr'

type RouteParams = { params: Promise<{ bookingId: string }> }

export async function GET(_request: NextRequest, { params }: RouteParams): Promise<NextResponse> {
  if (!dbReady) { ensureDatabase(); dbReady = true }

  const { bookingId } = await params

  const booking = db
    .select()
    .from(schema.bookings)
    .where(eq(schema.bookings.id, bookingId))
    .get()

  if (!booking) {
    return NextResponse.json(
      { success: false, error: 'Booking not found' },
      { status: 404 },
    )
  }

  const icsContent = generateIcs({
    id: booking.id,
    title: 'Version2 — Free Consultation',
    description: booking.description ?? 'Free consultation call with Version2.hr',
    date: booking.date,
    time: booking.time,
    durationMinutes: 30,
    organizerEmail: TEAM_EMAIL,
    attendeeEmail: booking.email,
  })

  return new NextResponse(icsContent, {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': `attachment; filename="booking-${booking.id}.ics"`,
    },
  })
}
