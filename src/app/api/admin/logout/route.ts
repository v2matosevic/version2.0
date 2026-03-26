import { NextRequest, NextResponse } from 'next/server'
import { clearSessionCookie, revokeSession } from '@/lib/admin-auth'
import { getClientIp } from '@/lib/client-ip'
import { validateRequestOrigin } from '@/lib/request-origin'

export function POST(request: NextRequest): NextResponse {
  const originError = validateRequestOrigin(request)
  if (originError) return originError

  const response = NextResponse.json({ success: true })
  const token = request.cookies.get('v2_admin_session')?.value

  if (token) {
    revokeSession(token, {
      ip: getClientIp(request),
      userAgent: request.headers.get('user-agent'),
    })
  }

  clearSessionCookie(response)

  return response
}
