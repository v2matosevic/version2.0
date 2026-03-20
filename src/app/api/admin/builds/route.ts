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

  const builds = db
    .select({
      id: schema.buildLogs.id,
      status: schema.buildLogs.status,
      triggeredBy: schema.buildLogs.triggeredBy,
      durationMs: schema.buildLogs.durationMs,
      createdAt: schema.buildLogs.createdAt,
    })
    .from(schema.buildLogs)
    .orderBy(desc(schema.buildLogs.createdAt))
    .limit(20)
    .all()

  return NextResponse.json({ success: true, builds })
}
