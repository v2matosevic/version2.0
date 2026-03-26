import { NextRequest } from 'next/server'
import { isIP } from 'node:net'

function normalizeIp(candidate: string): string | null {
  const trimmed = candidate.trim()
  if (!trimmed) return null

  const bracketMatch = trimmed.match(/^\[([^\]]+)](?::\d+)?$/)
  const withoutBrackets = bracketMatch ? bracketMatch[1] : trimmed
  const withoutPort = withoutBrackets.includes(':') && isIP(withoutBrackets) === 0
    ? withoutBrackets.replace(/:\d+$/, '')
    : withoutBrackets

  return isIP(withoutPort) ? withoutPort : null
}

/**
 * Extract client IP from proxy headers or connection info.
 */
export function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    const forwardedIp = forwarded
      .split(',')
      .map((part) => normalizeIp(part))
      .find((value) => value !== null)

    if (forwardedIp) return forwardedIp
  }

  const realIp = request.headers.get('x-real-ip')
  if (realIp) {
    const normalized = normalizeIp(realIp)
    if (normalized) return normalized
  }

  return '127.0.0.1'
}
