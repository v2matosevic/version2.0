import { NextRequest, NextResponse } from 'next/server'
import { bookingPayloadSchema } from '@/lib/validation/schemas/booking-schema'
import { parseZodErrors } from '@/lib/parse-zod-errors'
import { rateLimit } from '@/lib/rate-limiter'
import { getClientIp } from '@/lib/client-ip'
import { generateId } from '@/lib/generate-id'
import { isSlotAvailable } from '@/lib/booking-availability'
import { generateIcs } from '@/lib/ics'
import { sendEmail } from '@/lib/email'
import { bookingTeamNotification, bookingConfirmation } from '@/lib/booking-emails'
import { db, schema } from '@/db'
import { initDatabase } from '@/db/init'

const TEAM_EMAIL = process.env.TEAM_EMAIL ?? 'info@version2.hr'

export async function POST(request: NextRequest): Promise<NextResponse> {
  initDatabase()

  const ip = getClientIp(request)
  const rateLimited = rateLimit(ip, 'booking', { windowMs: 60_000, maxRequests: 5 })
  if (rateLimited) return rateLimited

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid JSON body' },
      { status: 400 },
    )
  }

  const parseResult = bookingPayloadSchema.safeParse(body)
  if (!parseResult.success) {
    return NextResponse.json(
      { success: false, errors: parseZodErrors(parseResult.error) },
      { status: 400 },
    )
  }

  const data = parseResult.data

  if (data._honey) {
    return NextResponse.json({ success: true })
  }

  // Atomic availability check + insert
  if (!isSlotAvailable(data.date, data.time)) {
    return NextResponse.json(
      { success: false, error: 'This time slot is no longer available.' },
      { status: 409 },
    )
  }

  const id = generateId('bk')

  db.insert(schema.bookings).values({
    id,
    name: data.name,
    email: data.email,
    date: data.date,
    time: data.time,
    contactMethod: data.contactMethod,
    description: data.description,
    language: data.language,
    ip,
  }).run()

  const icsContent = generateIcs({
    id,
    title: 'Version2 — Free Consultation',
    description: data.description ?? 'Free consultation call with Version2.hr',
    date: data.date,
    time: data.time,
    durationMinutes: 30,
    organizerEmail: TEAM_EMAIL,
    attendeeEmail: data.email,
  })

  // Send confirmation to client
  try {
    await sendEmail({
      to: data.email,
      subject: `Booking Confirmed — ${data.date} at ${data.time} CET`,
      html: bookingConfirmation({
        id, name: data.name, email: data.email,
        date: data.date, time: data.time,
        contactMethod: data.contactMethod, description: data.description,
      }),
      attachments: [
        { filename: 'booking.ics', content: icsContent, contentType: 'text/calendar' },
      ],
    })
  } catch (err) {
    console.error('[Booking] Confirmation email failed:', err)
  }

  // Notify team
  try {
    await sendEmail({
      to: TEAM_EMAIL,
      subject: `[Version2] New Booking: ${data.name} — ${data.date} ${data.time}`,
      html: bookingTeamNotification({
        id, name: data.name, email: data.email,
        date: data.date, time: data.time,
        contactMethod: data.contactMethod, description: data.description,
      }),
    })
  } catch (err) {
    console.error('[Booking] Team notification failed:', err)
  }

  return NextResponse.json({
    success: true,
    id,
    icsUrl: `/api/booking/${id}/ics`,
  })
}
