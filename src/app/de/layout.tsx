import type { Metadata } from 'next'
import { LayoutShell } from '@/components/layout/layout-shell'
import { LangSetter } from '@/components/layout/lang-setter'
import { getMenuItems } from '@/lib/content/get-menu-items'
import { buildPageMetadata } from '@/lib/seo'

export const metadata: Metadata = buildPageMetadata({
  title: 'Web Design & Entwicklung Studio',
  description: 'Premium-Webdesign, -Entwicklung und KI-Integration Studio mit Sitz in Zadar, Kroatien. Maßgeschneiderte Websites, Webanwendungen und KI-Tools von Grund auf erstellt.',
  routeKey: 'home',
})

export default function DeLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const navItems = getMenuItems('de')

  return (
    <>
      <LangSetter lang="de" />
      <LayoutShell lang="de" navItems={navItems}>
        {children}
      </LayoutShell>
    </>
  )
}
