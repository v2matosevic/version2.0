import { NextResponse } from 'next/server'
import Database from 'better-sqlite3'
import path from 'node:path'
import { ensureDatabase } from '@/db/migrate'

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

export function GET(): NextResponse {
  const dbOk = checkDatabase()

  return NextResponse.json(
    {
      status: dbOk ? 'ok' : 'degraded',
      timestamp: new Date().toISOString(),
      uptime: Math.floor((Date.now() - startTime) / 1000),
      database: dbOk ? 'connected' : 'error',
    },
    { status: dbOk ? 200 : 503 },
  )
}
