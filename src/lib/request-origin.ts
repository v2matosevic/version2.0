import { NextRequest, NextResponse } from 'next/server'

const DEV_ORIGINS = new Set([
  'http://localhost:3000',
  'http://127.0.0.1:3000',
])

function getAllowedOrigins(): Set<string> {
  const origins = new Set<string>()
  const configured = [process.env.NEXT_PUBLIC_SITE_URL, process.env.SITE_URL]

  for (const origin of configured) {
    if (origin) origins.add(origin.replace(/\/$/, ''))
  }

  const extraOrigins = process.env.ALLOWED_ORIGINS?.split(',') ?? []
  for (const origin of extraOrigins) {
    const normalized = origin.trim().replace(/\/$/, '')
    if (normalized) origins.add(normalized)
  }

  if (process.env.NODE_ENV !== 'production') {
    for (const origin of DEV_ORIGINS) origins.add(origin)
  }

  return origins
}

function extractRequestOrigin(request: NextRequest): string | null {
  const origin = request.headers.get('origin')
  if (origin) return origin.replace(/\/$/, '')

  const referer = request.headers.get('referer')
  if (!referer) return null

  try {
    return new URL(referer).origin.replace(/\/$/, '')
  } catch {
    return null
  }
}

function validateRequestOrigin(request: NextRequest): NextResponse | null {
  const origin = extractRequestOrigin(request)
  const allowedOrigins = getAllowedOrigins()

  if (!origin) {
    if (process.env.NODE_ENV !== 'production') return null
    return NextResponse.json(
      { success: false, error: 'Origin header required' },
      { status: 403 },
    )
  }

  if (!allowedOrigins.has(origin)) {
    return NextResponse.json(
      { success: false, error: 'Origin not allowed' },
      { status: 403 },
    )
  }

  return null
}

export { validateRequestOrigin }
