import { NextRequest, NextResponse } from 'next/server'
import { sql } from 'drizzle-orm'
import { validateAuth } from '@/lib/auth'
import { db, schema } from '@/db'
import { initDatabase } from '@/db/init'

export function GET(request: NextRequest): NextResponse {
  const authError = validateAuth(request)
  if (authError) return authError
  initDatabase()

  const conversions = db
    .select({
      type: sql<string>`json_extract(${schema.analyticsEvents.data}, '$.conversionType')`,
      count: sql<number>`count(*)`,
    })
    .from(schema.analyticsEvents)
    .where(sql`${schema.analyticsEvents.type} = 'conversion'`)
    .groupBy(sql`json_extract(${schema.analyticsEvents.data}, '$.conversionType')`)
    .orderBy(sql`count(*) desc`)
    .all()

  return NextResponse.json({ conversions })
}
