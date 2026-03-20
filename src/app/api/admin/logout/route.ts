import { NextResponse } from 'next/server'

export function POST(): NextResponse {
  const response = NextResponse.json({ success: true })

  response.cookies.set('v2_admin_session', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  })

  return response
}
