import { NextRequest, NextResponse } from 'next/server'
import { rateLimit } from '@/lib/rate-limiter'
import { getClientIp } from '@/lib/client-ip'
import {
  getAdminKey,
  verifyPassword,
  createSession,
  setSessionCookie,
} from '@/lib/admin-auth'

export async function POST(request: NextRequest): Promise<NextResponse> {
  const ip = getClientIp(request)

  // 5 attempts per minute
  const minuteLimit = rateLimit(ip, 'admin-login', { windowMs: 60_000, maxRequests: 5 })
  if (minuteLimit) return minuteLimit

  // 10 attempts per 15 minutes (lockout)
  const lockoutLimit = rateLimit(ip, 'admin-login-lockout', { windowMs: 15 * 60_000, maxRequests: 10 })
  if (lockoutLimit) return lockoutLimit

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid JSON body' },
      { status: 400 },
    )
  }

  const { password } = body as { password?: string }
  if (!password) {
    return NextResponse.json(
      { success: false, error: 'Password required' },
      { status: 400 },
    )
  }

  // Ensure admin key is configured (throws in production if missing)
  try {
    getAdminKey()
  } catch (err) {
    return NextResponse.json(
      { success: false, error: (err as Error).message },
      { status: 500 },
    )
  }

  if (!verifyPassword(password)) {
    return NextResponse.json(
      { success: false, error: 'Invalid credentials' },
      { status: 401 },
    )
  }

  const { token, isDevKey } = createSession()
  const response = NextResponse.json({
    success: true,
    warning: isDevKey ? 'Using default dev key. Set ADMIN_API_KEY in production.' : undefined,
  })

  setSessionCookie(response, token)
  return response
}
