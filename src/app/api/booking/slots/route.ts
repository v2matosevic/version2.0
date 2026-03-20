import { NextRequest, NextResponse } from 'next/server'
import { getAvailableSlots } from '@/lib/booking-availability'
import { rateLimit } from '@/lib/rate-limiter'
import { getClientIp } from '@/lib/client-ip'
import { initDatabase } from '@/db/init'

export function GET(request: NextRequest): NextResponse {
  initDatabase()

  const ip = getClientIp(request)
  const rateLimited = rateLimit(ip, 'booking-slots', { windowMs: 60_000, maxRequests: 30 })
  if (rateLimited) return rateLimited

  const { searchParams } = new URL(request.url)
  const from = searchParams.get('from')
  const to = searchParams.get('to')

  if (!from || !to) {
    return NextResponse.json(
      { success: false, error: 'Missing "from" and "to" query parameters (YYYY-MM-DD)' },
      { status: 400 },
    )
  }

  const dateRegex = /^\d{4}-\d{2}-\d{2}$/
  if (!dateRegex.test(from) || !dateRegex.test(to)) {
    return NextResponse.json(
      { success: false, error: 'Dates must be in YYYY-MM-DD format' },
      { status: 400 },
    )
  }

  const slots = getAvailableSlots(from, to)

  return NextResponse.json({ slots })
}
