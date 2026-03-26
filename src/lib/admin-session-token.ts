import { createHash, createHmac, randomBytes, timingSafeEqual } from 'node:crypto'

const DEV_KEY = 'v2-dev-admin-key'
const COOKIE_NAME = 'v2_admin_session'
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7
const SESSION_TTL_MS = SESSION_MAX_AGE_SECONDS * 1000

type SessionTokenParts = {
  sessionId: string
  secret: string
  signature: string
}

function getAdminKey(): string {
  const key = process.env.ADMIN_API_KEY
  if (key) return key
  if (process.env.NODE_ENV === 'production') {
    throw new Error('Server misconfigured: ADMIN_API_KEY required in production')
  }
  return DEV_KEY
}

function buildSessionPayload(sessionId: string, secret: string): string {
  return `${sessionId}.${secret}`
}

function signSessionPayload(payload: string): string {
  return createHmac('sha256', getAdminKey()).update(payload).digest('hex')
}

function parseSessionToken(token: string): SessionTokenParts | null {
  const parts = token.split('.')
  if (parts.length !== 3) return null

  const [sessionId, secret, signature] = parts
  if (!sessionId || !secret || !signature) return null

  return { sessionId, secret, signature }
}

function verifySession(token: string): boolean {
  const parsed = parseSessionToken(token)
  if (!parsed) return false

  const expected = signSessionPayload(
    buildSessionPayload(parsed.sessionId, parsed.secret),
  )

  try {
    return timingSafeEqual(Buffer.from(parsed.signature), Buffer.from(expected))
  } catch {
    return false
  }
}

function hashSessionToken(sessionId: string, secret: string): string {
  return createHash('sha256')
    .update(`${buildSessionPayload(sessionId, secret)}.${getAdminKey()}`)
    .digest('hex')
}

function createSessionToken(): {
  token: string
  sessionId: string
  sessionHash: string
} {
  const sessionId = randomBytes(16).toString('hex')
  const secret = randomBytes(32).toString('base64url')
  const payload = buildSessionPayload(sessionId, secret)
  const signature = signSessionPayload(payload)

  return {
    token: `${payload}.${signature}`,
    sessionId,
    sessionHash: hashSessionToken(sessionId, secret),
  }
}

function verifyPassword(password: string): boolean {
  const adminKeyHash = createHash('sha256').update(getAdminKey()).digest()
  const passwordHash = createHash('sha256').update(password).digest()
  return timingSafeEqual(passwordHash, adminKeyHash)
}

export {
  COOKIE_NAME,
  SESSION_MAX_AGE_SECONDS,
  SESSION_TTL_MS,
  createSessionToken,
  getAdminKey,
  hashSessionToken,
  parseSessionToken,
  verifyPassword,
  verifySession,
}
