import type { Metadata } from 'next'
import { LayoutShell } from '@/components/layout/layout-shell'
import { getMenuItems } from '@/lib/content/get-menu-items'
import { buildPageMetadata } from '@/lib/seo'

export const metadata: Metadata = buildPageMetadata({
  title: 'Web Design & Development Studio',
  description: 'Premium web design, development, and AI integration studio based in Zadar, Croatia. Custom websites, web applications, and AI-powered tools built from scratch.',
  routeKey: 'home',
})

export default function EnLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const navItems = getMenuItems('en')

  return (
    <LayoutShell lang="en" navItems={navItems}>
      {children}
    </LayoutShell>
  )
}
