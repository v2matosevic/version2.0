import { NextRequest, NextResponse } from 'next/server'
import { createHmac } from 'node:crypto'

const DEV_KEY = 'v2-dev-admin-key'

/**
 * Validate the admin session cookie on API routes.
 * Returns null if the session is valid, or a 401 response if not.
 */
export function validateAdminCookie(request: NextRequest): NextResponse | null {
  const sessionCookie = request.cookies.get('v2_admin_session')
  if (!sessionCookie?.value) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 },
    )
  }

  const parts = sessionCookie.value.split('.')
  if (parts.length !== 2) {
    return NextResponse.json(
      { success: false, error: 'Invalid session' },
      { status: 401 },
    )
  }

  const [sessionId, signature] = parts
  const key = process.env.ADMIN_API_KEY || DEV_KEY
  const expected = createHmac('sha256', key).update(sessionId!).digest('hex')

  if (signature !== expected) {
    return NextResponse.json(
      { success: false, error: 'Invalid session' },
      { status: 401 },
    )
  }

  return null
}
