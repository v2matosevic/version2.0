'use client'

import { useState, useCallback } from 'react'
import { Header } from '@/components/layout/header'
import { Menu } from '@/components/layout/menu'
import { Footer } from '@/components/layout/footer'
import { PageTransition } from '@/components/layout/page-transition'
import { SmoothScroll } from '@/components/layout/smooth-scroll'
import { CookieConsent } from '@/components/layout/cookie-consent'
import { Analytics } from '@/components/layout/analytics'
import { AnalyticsTracker } from '@/components/layout/analytics-tracker'
import { Fab } from '@/components/layout/fab'
import { ChatWidget } from '@/components/chat/chat-widget'
import type { Language } from '@/types/i18n'
import type { NavMenuItem } from '@/lib/content/get-menu-items'

type LayoutShellProps = {
  lang: Language
  navItems: NavMenuItem[]
  children: React.ReactNode
}

function LayoutShell({ lang, navItems, children }: LayoutShellProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)

  const openMenu = useCallback(() => setMenuOpen(true), [])
  const closeMenu = useCallback(() => setMenuOpen(false), [])
  const openChat = useCallback(() => setChatOpen(true), [])

  const contactHref = lang === 'hr' ? '/hr/kontakt/' : lang === 'de' ? '/de/kontakt/' : '/contact/'

  return (
    <SmoothScroll>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:bg-brand-red focus:text-white focus:px-4 focus:py-2 focus:rounded-lg"
        style={{ zIndex: 'var(--z-preloader)' } as React.CSSProperties}
      >
        Skip to main content
      </a>

      <Header lang={lang} onMenuOpen={openMenu} isMenuOpen={menuOpen} />
      <Menu isOpen={menuOpen} onClose={closeMenu} lang={lang} navItems={navItems} />

      <PageTransition>
        {children}
      </PageTransition>

      <Footer lang={lang} />
      <CookieConsent />
      <Analytics />
      <AnalyticsTracker />
      <Fab contactHref={contactHref} onOpenChat={openChat} />
      <ChatWidget lang={lang} isOpen={chatOpen} onClose={() => setChatOpen(false)} />
    </SmoothScroll>
  )
}

export { LayoutShell }
export type { LayoutShellProps }
