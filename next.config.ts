import type { NextConfig } from 'next'
import fs from 'node:fs'
import path from 'node:path'

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://connect.facebook.net",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https://version2.hr https://www.google-analytics.com https://www.facebook.com https://www.googletagmanager.com",
      "font-src 'self'",
      "connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com https://www.facebook.com",
      "frame-ancestors 'none'",
    ].join('; '),
  },
]

function loadBlogSlugRedirects(): Array<{ source: string; destination: string; permanent: boolean }> {
  const filePath = path.join(process.cwd(), 'src', 'lib', 'content', 'blog-slug-redirects.txt')
  if (!fs.existsSync(filePath)) return []

  const lines = fs.readFileSync(filePath, 'utf-8').trim().split('\n')
  return lines.map((line) => {
    const [enSlug, hrSlug] = line.trim().split(' ')
    return { source: `/blog/${enSlug}/`, destination: `/blog/${hrSlug}/`, permanent: true }
  })
}

const nextConfig: NextConfig = {
  output: 'standalone',
  trailingSlash: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'version2.hr' },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
  async redirects() {
    return loadBlogSlugRedirects()
  },
  async rewrites() {
    return []
  },
  serverExternalPackages: ['better-sqlite3'],
}

export default nextConfig
