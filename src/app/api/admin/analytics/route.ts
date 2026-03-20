import { NextRequest, NextResponse } from 'next/server'
import { sql } from 'drizzle-orm'
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
    .orderBy(sql`count(*) DESC`)
    .limit(10)
    .all()

  const conversions = db
    .select({
      type: sql<string>`json_extract(${schema.analyticsEvents.data}, '$.conversion_type')`,
      count: sql<number>`count(*)`,
    })
    .from(schema.analyticsEvents)
    .where(sql`${schema.analyticsEvents.type} = 'conversion'`)
    .groupBy(sql`json_extract(${schema.analyticsEvents.data}, '$.conversion_type')`)
    .all()

  const viewsByDay = db
    .select({
      period: sql<string>`date(${schema.analyticsEvents.timestamp})`,
      count: sql<number>`count(*)`,
    })
    .from(schema.analyticsEvents)
    .where(
      sql`${schema.analyticsEvents.type} = 'page_view'
          AND date(${schema.analyticsEvents.timestamp}) >= date('now', '-30 days')`,
    )
    .groupBy(sql`date(${schema.analyticsEvents.timestamp})`)
    .orderBy(sql`date(${schema.analyticsEvents.timestamp})`)
    .all()

  return NextResponse.json({
    success: true,
    totalViews: totalViews?.count ?? 0,
    uniqueSessions: uniqueSessions?.count ?? 0,
    topPages,
    conversions,
    viewsByDay,
  })
}
