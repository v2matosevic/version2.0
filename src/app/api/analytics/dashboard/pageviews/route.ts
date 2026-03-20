import { NextRequest, NextResponse } from 'next/server'
import { sql } from 'drizzle-orm'
import { validateAuth } from '@/lib/auth'
import { db, schema } from '@/db'
import { ensureDatabase } from '@/db/migrate'

let dbReady = false

export function GET(request: NextRequest): NextResponse {
  const authError = validateAuth(request)
  if (authError) return authError
  if (!dbReady) { ensureDatabase(); dbReady = true }

  const { searchParams } = new URL(request.url)
  const interval = searchParams.get('interval') === 'week' ? 'week' : 'day'

  const dateFormat = interval === 'week'
    ? `strftime('%Y-W%W', ${schema.analyticsEvents.timestamp.name})`
    : `date(${schema.analyticsEvents.timestamp.name})`

  const pageviews = db
    .select({
      period: sql<string>`${sql.raw(dateFormat)}`,
      count: sql<number>`count(*)`,
    })
    .from(schema.analyticsEvents)
    .where(sql`${schema.analyticsEvents.type} = 'page_view'`)
    .groupBy(sql`${sql.raw(dateFormat)}`)
    .orderBy(sql`${sql.raw(dateFormat)} asc`)
    .limit(90)
    .all()

  return NextResponse.json({ pageviews, interval })
}
