import 'server-only'

import { generateId } from '@/lib/generate-id'
import { db, schema } from '@/db'
import { initDatabase } from '@/db/init'

type SecurityEventInput = {
  eventType: string
  level?: 'info' | 'warning' | 'error'
  ip?: string | null
  userAgent?: string | null
  details?: Record<string, unknown>
}

function trimUserAgent(userAgent?: string | null): string | null {
  if (!userAgent) return null
  return userAgent.slice(0, 500)
}

function recordSecurityEvent({
  eventType,
  level = 'info',
  ip,
  userAgent,
  details,
}: SecurityEventInput): void {
  initDatabase()

  db.insert(schema.securityEvents)
    .values({
      id: generateId('sec'),
      eventType,
      level,
      ip: ip ?? null,
      userAgent: trimUserAgent(userAgent),
      details: details ? JSON.stringify(details) : null,
    })
    .run()
}

export { recordSecurityEvent }
