import { db, schema } from '@/db'
import { eq, and, gte, lte } from 'drizzle-orm'

const AVAILABLE_DAYS = [3, 4, 5] as const // Wed, Thu, Fri
const TIME_SLOTS = ['14:00', '14:45', '15:30', '16:15'] as const
const MIN_ADVANCE_DAYS = 2
const MAX_ADVANCE_DAYS = 14

export type AvailableSlot = {
  date: string
  times: Array<{ time: string; available: boolean }>
}

/**
 * Get available booking slots for a date range.
 */
export function getAvailableSlots(fromDate: string, toDate: string): AvailableSlot[] {
  const from = new Date(fromDate + 'T00:00:00Z')
  const to = new Date(toDate + 'T00:00:00Z')
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

  const minDate = new Date(today)
  minDate.setDate(minDate.getDate() + MIN_ADVANCE_DAYS)
  const maxDate = new Date(today)
  maxDate.setDate(maxDate.getDate() + MAX_ADVANCE_DAYS)

  // Clamp range to bookable window
  const effectiveFrom = from < minDate ? minDate : from
  const effectiveTo = to > maxDate ? maxDate : to

  if (effectiveFrom > effectiveTo) return []

  // Fetch existing bookings in range
  const existingBookings = db
    .select({ date: schema.bookings.date, time: schema.bookings.time })
    .from(schema.bookings)
    .where(
      and(
        gte(schema.bookings.date, formatDate(effectiveFrom)),
        lte(schema.bookings.date, formatDate(effectiveTo)),
        eq(schema.bookings.status, 'confirmed'),
      ),
    )
    .all()

  const bookedSet = new Set(existingBookings.map((b) => `${b.date}:${b.time}`))

  const slots: AvailableSlot[] = []
  const current = new Date(effectiveFrom)

  while (current <= effectiveTo) {
    const dayOfWeek = current.getUTCDay()
    if (AVAILABLE_DAYS.includes(dayOfWeek as 3 | 4 | 5)) {
      const dateStr = formatDate(current)
      slots.push({
        date: dateStr,
        times: TIME_SLOTS.map((time) => ({
          time,
          available: !bookedSet.has(`${dateStr}:${time}`),
        })),
      })
    }
    current.setUTCDate(current.getUTCDate() + 1)
  }

  return slots
}

/**
 * Check if a specific slot is still available (atomic check).
 */
export function isSlotAvailable(date: string, time: string): boolean {
  const existing = db
    .select({ id: schema.bookings.id })
    .from(schema.bookings)
    .where(
      and(
        eq(schema.bookings.date, date),
        eq(schema.bookings.time, time),
        eq(schema.bookings.status, 'confirmed'),
      ),
    )
    .get()

  return !existing
}

function formatDate(date: Date): string {
  return date.toISOString().split('T')[0]
}
