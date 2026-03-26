import 'server-only'

import { NextRequest, NextResponse } from 'next/server'
import { and, eq, gt, isNull } from 'drizzle-orm'
import { db, schema } from '@/db'
import { initDatabase } from '@/db/init'
import { getClientIp } from '@/lib/client-ip'
import { recordSecurityEvent } from '@/lib/security-events'
import {
  COOKIE_NAME,
  SESSION_MAX_AGE_SECONDS,
  SESSION_TTL_MS,
  createSessionToken,
  getAdminKey,
  hashSessionToken,
  parseSessionToken,
  verifyPassword,
  verifySession,
} from '@/lib/admin-session-token'

const SESSION_TOUCH_INTERVAL_MS = 15 * 60 * 1000

function clearSessionCookie(response: NextResponse): void {
  response.cookies.set(COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 0,
    priority: 'high',
  })
}

function setSessionCookie(response: NextResponse, token: string): void {
  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: SESSION_MAX_AGE_SECONDS,
    priority: 'high',
  })
}

function buildUnauthorizedResponse(message: string, clearCookie = false): NextResponse {
  const response = NextResponse.json(
    { success: false, error: message },
    { status: 401 },
  )

  if (clearCookie) {
    clearSessionCookie(response)
  }

  return response
}

function trimUserAgent(userAgent?: string | null): string | null {
  if (!userAgent) return null
  return userAgent.slice(0, 500)
}

function createSession(context: {
  ip: string
  userAgent?: string | null
}): { token: string; isDevKey: boolean } {
  initDatabase()

  const { token, sessionId, sessionHash } = createSessionToken()
  const now = new Date()
  const nowIso = now.toISOString()
  const expiresAt = new Date(now.getTime() + SESSION_TTL_MS).toISOString()

  db.insert(schema.adminSessions)
    .values({
      id: sessionId,
      sessionHash,
      expiresAt,
      lastSeenAt: nowIso,
      ip: context.ip,
      userAgent: trimUserAgent(context.userAgent),
      createdAt: nowIso,
      updatedAt: nowIso,
    })
    .run()

  return {
    token,
    isDevKey: !process.env.ADMIN_API_KEY,
  }
}

function revokeSession(token: string, context?: { ip?: string; userAgent?: string | null }): void {
  if (!verifySession(token)) return

  const parsed = parseSessionToken(token)
  if (!parsed) return

  initDatabase()
  const revokedAt = new Date().toISOString()

  db.update(schema.adminSessions)
    .set({ revokedAt, updatedAt: revokedAt })
    .where(eq(schema.adminSessions.id, parsed.sessionId))
    .run()

  recordSecurityEvent({
    eventType: 'admin.logout',
    ip: context?.ip ?? null,
    userAgent: context?.userAgent,
    details: { sessionId: parsed.sessionId },
  })
}

function validateAdminCookie(request: NextRequest): NextResponse | null {
  initDatabase()

  const sessionCookie = request.cookies.get(COOKIE_NAME)
  const ip = getClientIp(request)
  const userAgent = request.headers.get('user-agent')

  if (!sessionCookie?.value) {
    return buildUnauthorizedResponse('Unauthorized')
  }

  if (!verifySession(sessionCookie.value)) {
    recordSecurityEvent({
      eventType: 'admin.session.invalid-signature',
      level: 'warning',
      ip,
      userAgent,
    })
    return buildUnauthorizedResponse('Invalid session', true)
  }

  const parsed = parseSessionToken(sessionCookie.value)
  if (!parsed) {
    return buildUnauthorizedResponse('Invalid session', true)
  }

  const sessionHash = hashSessionToken(parsed.sessionId, parsed.secret)
  const nowIso = new Date().toISOString()
  const session = db.select()
    .from(schema.adminSessions)
    .where(
      and(
        eq(schema.adminSessions.id, parsed.sessionId),
        eq(schema.adminSessions.sessionHash, sessionHash),
        isNull(schema.adminSessions.revokedAt),
        gt(schema.adminSessions.expiresAt, nowIso),
      ),
    )
    .get()

  if (!session) {
    recordSecurityEvent({
      eventType: 'admin.session.rejected',
      level: 'warning',
      ip,
      userAgent,
      details: { sessionId: parsed.sessionId },
    })
    return buildUnauthorizedResponse('Session expired or revoked', true)
  }

  const lastSeenAt = session.lastSeenAt ? Date.parse(session.lastSeenAt) : 0
  if (!Number.isNaN(lastSeenAt) && Date.now() - lastSeenAt > SESSION_TOUCH_INTERVAL_MS) {
    db.update(schema.adminSessions)
      .set({ lastSeenAt: nowIso, updatedAt: nowIso })
      .where(eq(schema.adminSessions.id, parsed.sessionId))
      .run()
  }

  return null
}

export {
  COOKIE_NAME,
  clearSessionCookie,
  createSession,
  getAdminKey,
  revokeSession,
  setSessionCookie,
  validateAdminCookie,
  verifyPassword,
}
