import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  trailingSlash: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'version2.hr' },
    ],
  },
  async redirects() {
    return []
  },
  async rewrites() {
    return []
  },
}

export default nextConfig
