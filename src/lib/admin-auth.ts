import { NextRequest, NextResponse } from 'next/server'
import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto'

const DEV_KEY = 'v2-dev-admin-key'
const COOKIE_NAME = 'v2_admin_session'
const SESSION_MAX_AGE = 60 * 60 * 24 * 7 // 7 days

/**
 * Get the admin API key. Requires ADMIN_API_KEY in production.
 * Falls back to dev key only in development mode.
 */
function getAdminKey(): string {
  const key = process.env.ADMIN_API_KEY
  if (key) return key
  if (process.env.NODE_ENV === 'production') {
    throw new Error('Server misconfigured: ADMIN_API_KEY required in production')
  }
  return DEV_KEY
}

/**
 * HMAC-sign a session ID.
 */
function signSession(sessionId: string): string {
  return createHmac('sha256', getAdminKey()).update(sessionId).digest('hex')
}

/**
 * Verify a session cookie value using timing-safe comparison.
 */
function verifySession(cookieValue: string): boolean {
  const parts = cookieValue.split('.')
  if (parts.length !== 2) return false
  const [sessionId, signature] = parts
  if (!sessionId || !signature) return false
  const expected = signSession(sessionId)
  try {
    return timingSafeEqual(Buffer.from(signature), Buffer.from(expected))
  } catch {
    return false
  }
}

/**
 * Create a new admin session. Returns the token and dev key status.
 */
function createSession(): { token: string; isDevKey: boolean } {
  const sessionId = randomBytes(32).toString('hex')
  const signature = signSession(sessionId)
  return {
    token: `${sessionId}.${signature}`,
    isDevKey: !process.env.ADMIN_API_KEY,
  }
}

/**
 * Set the admin session cookie on a response.
 */
function setSessionCookie(response: NextResponse, token: string): void {
  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_MAX_AGE,
  })
}

/**
 * Validate the admin session cookie on API routes.
 * Returns null if the session is valid, or a 401 response if not.
 */
function validateAdminCookie(request: NextRequest): NextResponse | null {
  const sessionCookie = request.cookies.get(COOKIE_NAME)
  if (!sessionCookie?.value) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 },
    )
  }

  if (!verifySession(sessionCookie.value)) {
    return NextResponse.json(
      { success: false, error: 'Invalid session' },
      { status: 401 },
    )
  }

  return null
}

/**
 * Verify admin password using timing-safe comparison.
 */
function verifyPassword(password: string): boolean {
  try {
    const adminKey = getAdminKey()
    return timingSafeEqual(Buffer.from(password), Buffer.from(adminKey))
  } catch {
    // timingSafeEqual throws if buffers differ in length — password doesn't match
    return false
  }
}

export {
  COOKIE_NAME,
  getAdminKey,
  verifySession,
  createSession,
  setSessionCookie,
  validateAdminCookie,
  verifyPassword,
}
