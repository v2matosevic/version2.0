import { NextRequest, NextResponse } from 'next/server'
import { desc } from 'drizzle-orm'
import { validateAdminCookie } from '@/lib/admin-auth'
import { db, schema } from '@/db'
import { ensureDatabase } from '@/db/migrate'

let dbReady = false

export function GET(request: NextRequest): NextResponse {
  const authError = validateAdminCookie(request)
  if (authError) return authError

  if (!dbReady) {
    ensureDatabase()
    dbReady = true
  }

  const allBookings = db
    .select()
    .from(schema.bookings)
    .orderBy(desc(schema.bookings.date))
    .all()

  return NextResponse.json({ success: true, bookings: allBookings })
}
