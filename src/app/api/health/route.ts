import { NextResponse } from 'next/server'
import Database from 'better-sqlite3'
import path from 'node:path'
import { ensureDatabase } from '@/db/migrate'
import { isSmtpConfigured } from '@/lib/email'

const DB_PATH = process.env.DATABASE_PATH
  ?? path.join(process.cwd(), 'data', 'version2.db')

let dbInitialized = false

function checkDatabase(): boolean {
  try {
    if (!dbInitialized) {
      ensureDatabase()
      dbInitialized = true
    }
    const sqlite = new Database(DB_PATH, { readonly: true })
    const result = sqlite.prepare('SELECT 1 as ok').get() as { ok: number }
    sqlite.close()
    return result.ok === 1
  } catch {
    return false
  }
}

const startTime = Date.now()

function getOperationalChecks(): Record<string, string> {
  const comingSoon = process.env.COMING_SOON === 'true'

  return {
    database: checkDatabase() ? 'connected' : 'error',
    smtp: isSmtpConfigured() ? 'configured' : (comingSoon ? 'not-required' : 'missing'),
    adminAuth: process.env.ADMIN_API_KEY ? 'configured' : (comingSoon ? 'not-required' : 'missing'),
    sentry: process.env.NEXT_PUBLIC_SENTRY_DSN ? 'configured' : 'not-required',
    llm: process.env.LLM_API_KEY ? 'configured' : (comingSoon ? 'not-required' : 'missing'),
  }
}

export function GET(): NextResponse {
  const checks = getOperationalChecks()
  const isHealthy = Object.entries(checks).every(([, value]) =>
    value === 'configured' || value === 'connected' || value === 'not-required'
  )

  return NextResponse.json(
    {
      status: isHealthy ? 'ok' : 'degraded',
      timestamp: new Date().toISOString(),
      uptime: Math.floor((Date.now() - startTime) / 1000),
      checks,
    },
    { status: isHealthy ? 200 : 503 },
  )
}
