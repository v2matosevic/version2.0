import { NextResponse } from 'next/server'
import Database from 'better-sqlite3'
import path from 'node:path'
import { ensureDatabase } from '@/db/migrate'
import { isSmtpConfigured } from '@/lib/email'

let dbInitialized = false

function checkDatabase(): boolean {
  try {
    if (!dbInitialized) {
      ensureDatabase()
      dbInitialized = true
    }
    const dbPath = path.join(process.cwd(), 'data', 'version2.db')
    const sqlite = new Database(dbPath, { readonly: true })
    const result = sqlite.prepare('SELECT 1 as ok').get() as { ok: number }
    sqlite.close()
    return result.ok === 1
  } catch {
    return false
  }
}

const startTime = Date.now()

function getOperationalChecks(): Record<string, string> {
  const isProduction = process.env.NODE_ENV === 'production'

  return {
    database: checkDatabase() ? 'connected' : 'error',
    smtp: isSmtpConfigured() ? 'configured' : (isProduction ? 'missing' : 'optional'),
    adminAuth: process.env.ADMIN_API_KEY ? 'configured' : (isProduction ? 'missing' : 'dev-fallback'),
    sentry: process.env.NEXT_PUBLIC_SENTRY_DSN ? 'configured' : 'missing',
    llm: process.env.LLM_API_KEY && process.env.LLM_BASE_URL ? 'configured' : 'missing',
  }
}

export function GET(): NextResponse {
  const checks = getOperationalChecks()
  const isHealthy = Object.entries(checks).every(([name, value]) => {
    if (name === 'sentry') return true
    if (value === 'optional' || value === 'dev-fallback') return true
    return value === 'configured' || value === 'connected'
  })

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
