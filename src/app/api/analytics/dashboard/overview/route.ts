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

  const totalViews = db
    .select({ count: sql<number>`count(*)` })
    .from(schema.analyticsEvents)
    .where(sql`${schema.analyticsEvents.type} = 'page_view'`)
    .get()

  const uniqueSessions = db
    .select({ count: sql<number>`count(distinct ${schema.analyticsEvents.sessionId})` })
    .from(schema.analyticsEvents)
    .get()

  const topPages = db
    .select({
      page: schema.analyticsEvents.page,
      count: sql<number>`count(*)`,
    })
    .from(schema.analyticsEvents)
    .where(sql`${schema.analyticsEvents.type} = 'page_view'`)
    .groupBy(schema.analyticsEvents.page)
    .orderBy(sql`count(*) desc`)
    .limit(10)
    .all()

  const conversions = db
    .select({ count: sql<number>`count(*)` })
    .from(schema.analyticsEvents)
    .where(sql`${schema.analyticsEvents.type} = 'conversion'`)
    .get()

  return NextResponse.json({
    totalViews: totalViews?.count ?? 0,
    uniqueSessions: uniqueSessions?.count ?? 0,
    topPages,
    conversions: conversions?.count ?? 0,
  })
}
