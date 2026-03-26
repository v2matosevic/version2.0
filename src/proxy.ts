import { NextRequest, NextResponse } from 'next/server'
import { verifySession } from '@/lib/admin-session-token'

const SUPPORTED_LANGUAGES = ['en', 'hr', 'de'] as const
const DEFAULT_LANGUAGE = 'en'
const COOKIE_NAME = 'v2_lang'

const SKIP_PATHS = [
  '/_next/',
  '/api/',
  '/dev/',
  '/favicon.ico',
]

const STATIC_EXTENSIONS = [
  '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico', '.webp', '.avif',
  '.css', '.js', '.map', '.woff', '.woff2', '.ttf', '.eot',
  '.xml', '.txt', '.json', '.webmanifest',
]

function shouldSkip(pathname: string): boolean {
  if (SKIP_PATHS.some((prefix) => pathname.startsWith(prefix))) {
    return true
  }
  if (STATIC_EXTENSIONS.some((ext) => pathname.endsWith(ext))) {
    return true
  }
  return false
}

function detectLanguageFromHeader(request: NextRequest): typeof SUPPORTED_LANGUAGES[number] {
  const acceptLanguage = request.headers.get('accept-language')
  if (!acceptLanguage) return DEFAULT_LANGUAGE

  const preferred = acceptLanguage
    .split(',')
    .map((part) => {
      const [lang, quality] = part.trim().split(';q=')
      return { lang: lang.trim().toLowerCase(), q: quality ? parseFloat(quality) : 1 }
    })
    .sort((a, b) => b.q - a.q)

  for (const { lang } of preferred) {
    const primary = lang.split('-')[0]
    if (primary === 'hr') return 'hr'
    if (primary === 'de') return 'de'
    if (primary === 'en') return 'en'
  }

  return DEFAULT_LANGUAGE
}

function getLanguageFromPath(pathname: string): typeof SUPPORTED_LANGUAGES[number] {
  if (pathname.startsWith('/hr/') || pathname === '/hr') return 'hr'
  if (pathname.startsWith('/de/') || pathname === '/de') return 'de'
  return 'en'
}

const COMING_SOON = process.env.COMING_SOON === 'true'

export function proxy(request: NextRequest): NextResponse | undefined {
  const { pathname } = request.nextUrl

  // Coming soon mode — redirect all public routes to /coming-soon/
  if (COMING_SOON && !shouldSkip(pathname) && !pathname.startsWith('/coming-soon') && !pathname.startsWith('/admin')) {
    const url = request.nextUrl.clone()
    url.pathname = '/coming-soon/'
    if (pathname.startsWith('/hr')) {
      url.searchParams.set('lang', 'hr')
    } else if (pathname.startsWith('/de')) {
      url.searchParams.set('lang', 'de')
    }
    return NextResponse.redirect(url, 302)
  }

  // Admin auth check — protect /admin/ routes except /admin/login
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const sessionCookie = request.cookies.get('v2_admin_session')
    if (!sessionCookie?.value || !verifySession(sessionCookie.value)) {
      const loginUrl = new URL('/admin/login', request.url)
      loginUrl.searchParams.set('from', pathname)
      return NextResponse.redirect(loginUrl)
    }
    return NextResponse.next()
  }

  if (shouldSkip(pathname)) {
    return undefined
  }

  const savedLang = request.cookies.get(COOKIE_NAME)?.value
  const pathLang = getLanguageFromPath(pathname)

  if (savedLang && SUPPORTED_LANGUAGES.includes(savedLang as typeof SUPPORTED_LANGUAGES[number])) {
    const response = NextResponse.next()
    return response
  }

  const detectedLang = detectLanguageFromHeader(request)

  if (detectedLang !== 'en' && pathLang === 'en' && pathname === '/') {
    const url = request.nextUrl.clone()
    url.pathname = `/${detectedLang}/`
    const response = NextResponse.redirect(url)
    response.cookies.set(COOKIE_NAME, detectedLang, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
      sameSite: 'lax',
    })
    return response
  }

  const response = NextResponse.next()
  response.cookies.set(COOKIE_NAME, pathLang, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
  })
  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api/).*)',
  ],
}
