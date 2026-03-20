import { NextRequest, NextResponse } from 'next/server'
import { createHmac, randomBytes } from 'node:crypto'

const DEV_KEY = 'v2-dev-admin-key'

function getAdminKey(): string {
  return process.env.ADMIN_API_KEY || DEV_KEY
}

function signToken(sessionId: string): string {
  const key = getAdminKey()
  return createHmac('sha256', key).update(sessionId).digest('hex')
}

export function verifySessionCookie(cookieValue: string): boolean {
  const parts = cookieValue.split('.')
  if (parts.length !== 2) return false
  const [sessionId, signature] = parts
  const expected = signToken(sessionId!)
  return signature === expected
}

export async function POST(request: NextRequest): Promise<NextResponse> {
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

  const adminKey = getAdminKey()
  if (password !== adminKey) {
    return NextResponse.json(
      { success: false, error: 'Invalid credentials' },
      { status: 401 },
    )
  }

  const sessionId = randomBytes(32).toString('hex')
  const signature = signToken(sessionId)
  const token = `${sessionId}.${signature}`

  const isDevKey = !process.env.ADMIN_API_KEY

  const response = NextResponse.json({
    success: true,
    warning: isDevKey ? 'Using default dev key. Set ADMIN_API_KEY in production.' : undefined,
  })

  response.cookies.set('v2_admin_session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })

  return response
}
