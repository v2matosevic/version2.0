import { NextResponse } from 'next/server'

type RateLimitEntry = {
  timestamps: number[]
}

const store = new Map<string, RateLimitEntry>()

const CLEANUP_INTERVAL_MS = 60_000

let lastCleanup = Date.now()

function cleanup(windowMs: number): void {
  const now = Date.now()
  if (now - lastCleanup < CLEANUP_INTERVAL_MS) return
  lastCleanup = now

  const cutoff = now - windowMs
  for (const [key, entry] of store) {
    entry.timestamps = entry.timestamps.filter((t) => t > cutoff)
    if (entry.timestamps.length === 0) {
      store.delete(key)
    }
  }
}

type RateLimitConfig = {
  windowMs: number
  maxRequests: number
}

/**
 * Check rate limit for a given IP and endpoint key.
 * Returns null if allowed, or a 429 NextResponse if exceeded.
 */
export function rateLimit(
  ip: string,
  endpoint: string,
  config: RateLimitConfig,
): NextResponse | null {
  cleanup(config.windowMs)

  const key = `${endpoint}:${ip}`
  const now = Date.now()
  const cutoff = now - config.windowMs

  const entry = store.get(key) ?? { timestamps: [] }
  entry.timestamps = entry.timestamps.filter((t) => t > cutoff)

  if (entry.timestamps.length >= config.maxRequests) {
    const oldestInWindow = entry.timestamps[0]
    const retryAfter = Math.ceil((oldestInWindow + config.windowMs - now) / 1000)

    return NextResponse.json(
      { success: false, error: `Too many requests. Try again in ${retryAfter} seconds.` },
      {
        status: 429,
        headers: { 'Retry-After': String(retryAfter) },
      },
    )
  }

  entry.timestamps.push(now)
  store.set(key, entry)

  return null
}
