import type { Metadata } from 'next'
import { LayoutShell } from '@/components/layout/layout-shell'
import { LangSetter } from '@/components/layout/lang-setter'
import { getMenuItems } from '@/lib/content/get-menu-items'
import { buildPageMetadata } from '@/lib/seo'

export const metadata: Metadata = buildPageMetadata({
  title: 'Web Dizajn & Razvoj Studio',
  description: 'Premium web dizajn, razvoj i AI integracija studio sa sjedištem u Zadru, Hrvatska. Prilagođene web stranice, web aplikacije i AI alati izrađeni od nule.',
  routeKey: 'home',
})

export default function HrLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const navItems = getMenuItems('hr')

  return (
    <>
      <LangSetter lang="hr" />
      <LayoutShell lang="hr" navItems={navItems}>
        {children}
      </LayoutShell>
    </>
  )
}
