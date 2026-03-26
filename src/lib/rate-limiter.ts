import { createHash } from 'node:crypto'
import { NextResponse } from 'next/server'
import { eq, lte } from 'drizzle-orm'
import { db, schema } from '@/db'
import { initDatabase } from '@/db/init'

type RateLimitConfig = {
  windowMs: number
  maxRequests: number
}

const CLEANUP_INTERVAL_MS = 60_000

let lastCleanupAt = 0

function cleanupExpiredWindows(): void {
  const now = Date.now()
  if (now - lastCleanupAt < CLEANUP_INTERVAL_MS) return

  lastCleanupAt = now
  initDatabase()

  db.delete(schema.rateLimitWindows)
    .where(lte(schema.rateLimitWindows.expiresAt, new Date(now).toISOString()))
    .run()
}

function buildRateLimitKey(ip: string, endpoint: string, config: RateLimitConfig): string {
  return createHash('sha256')
    .update(`${endpoint}:${config.windowMs}:${config.maxRequests}:${ip}`)
    .digest('hex')
}

export function rateLimit(
  ip: string,
  endpoint: string,
  config: RateLimitConfig,
): NextResponse | null {
  initDatabase()
  cleanupExpiredWindows()

  const now = new Date()
  const nowIso = now.toISOString()
  const expiresAt = new Date(now.getTime() + config.windowMs).toISOString()
  const keyHash = buildRateLimitKey(ip, endpoint, config)
  const endpointKey = `${endpoint}:${config.windowMs}:${config.maxRequests}`

  const currentWindow = db.select()
    .from(schema.rateLimitWindows)
    .where(eq(schema.rateLimitWindows.keyHash, keyHash))
    .get()

  if (!currentWindow || currentWindow.expiresAt <= nowIso) {
    db.insert(schema.rateLimitWindows)
      .values({
        keyHash,
        endpoint: endpointKey,
        hits: 1,
        windowStartedAt: nowIso,
        expiresAt,
        createdAt: nowIso,
        updatedAt: nowIso,
      })
      .onConflictDoUpdate({
        target: schema.rateLimitWindows.keyHash,
        set: {
          endpoint: endpointKey,
          hits: 1,
          windowStartedAt: nowIso,
          expiresAt,
          updatedAt: nowIso,
        },
      })
      .run()

    return null
  }

  if (currentWindow.hits >= config.maxRequests) {
    const retryAfter = Math.max(
      1,
      Math.ceil((Date.parse(currentWindow.expiresAt) - now.getTime()) / 1000),
    )

    return NextResponse.json(
      { success: false, error: `Too many requests. Try again in ${retryAfter} seconds.` },
      {
        status: 429,
        headers: { 'Retry-After': String(retryAfter) },
      },
    )
  }

  db.update(schema.rateLimitWindows)
    .set({
      hits: currentWindow.hits + 1,
      updatedAt: nowIso,
    })
    .where(eq(schema.rateLimitWindows.keyHash, keyHash))
    .run()

  return null
}
