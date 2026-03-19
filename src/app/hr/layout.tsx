import type { Metadata } from 'next'
import { Albert_Sans, Manrope } from 'next/font/google'
import '@/styles/globals.css'
import { LayoutShell } from '@/components/layout/layout-shell'
import { getMenuItems } from '@/lib/content/get-menu-items'
import { buildPageMetadata } from '@/lib/seo'

const albertSans = Albert_Sans({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '700'],
  display: 'swap',
  variable: '--font-albert-sans',
})

const manrope = Manrope({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '600'],
  display: 'swap',
  variable: '--font-manrope',
})

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: 'Web Dizajn & Razvoj Studio',
    description: 'Premium web dizajn, razvoj i AI integracija studio sa sjedištem u Zadru, Hrvatska. Prilagođene web stranice, web aplikacije i AI alati izrađeni od nule.',
    routeKey: 'home',
  }),
  metadataBase: new URL('https://version2.hr'),
}

export default function HrLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const navItems = getMenuItems('hr')

  return (
    <html
      lang="hr"
      className={`${albertSans.variable} ${manrope.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('v2_theme');if(t==='light'||(!t&&window.matchMedia('(prefers-color-scheme: light)').matches)){document.documentElement.classList.add('light')}})()`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-base text-foreground font-body">
        <LayoutShell lang="hr" navItems={navItems}>
          {children}
        </LayoutShell>
      </body>
    </html>
  )
}
