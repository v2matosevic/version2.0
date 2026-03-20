import { NextResponse } from 'next/server'
import { ensureDatabase } from '@/db/migrate'

let dbInitialized = false

function checkDatabase(): boolean {
  try {
    if (!dbInitialized) {
      ensureDatabase()
      dbInitialized = true
    }
    // Import dynamically to test the connection
    const Database = require('better-sqlite3')
    const path = require('node:path')
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
