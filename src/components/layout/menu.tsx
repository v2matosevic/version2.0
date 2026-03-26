'use client'

import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { MenuContent } from '@/components/layout/menu-content'
import { useLockBody } from '@/lib/utils/use-lock-body'
import type { Language } from '@/types/i18n'
import type { NavMenuItem } from '@/lib/content/get-menu-items'

type MenuProps = {
  isOpen: boolean
  onClose: () => void
  lang: Language
  navItems: NavMenuItem[]
}

function Menu({ isOpen, onClose, lang, navItems }: MenuProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  useLockBody(isOpen)

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape' && isOpen) onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  useEffect(() => {
    if (isOpen && panelRef.current) {
      const firstLink = panelRef.current.querySelector('a, button')
      if (firstLink instanceof HTMLElement) firstLink.focus()
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop — full bleed dark overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            style={{ zIndex: 49 } as React.CSSProperties}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Desktop sidebar — slides from right */}
          <motion.div
            ref={panelRef}
            id="menu-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 h-full hidden lg:flex flex-col"
            style={{
              zIndex: 'var(--z-menu)',
              width: '420px',
              background: 'var(--color-sunken)',
              borderLeft: '1px solid color-mix(in srgb, var(--color-line) 40%, transparent)',
            } as React.CSSProperties}
          >
            {/* Grain texture */}
            <div
              className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              }}
              aria-hidden="true"
            />
            <MenuContent onClose={onClose} lang={lang} navItems={navItems} isMobile={false} />
          </motion.div>

          {/* Mobile fullscreen — fades in */}
          <motion.div
            id="menu-panel-mobile"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-0 lg:hidden overflow-y-auto flex flex-col"
            style={{
              zIndex: 'var(--z-menu)',
              background: 'var(--color-sunken)',
              paddingBottom: 'env(safe-area-inset-bottom)',
            } as React.CSSProperties}
          >
            {/* Grain texture */}
            <div
              className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              }}
              aria-hidden="true"
            />
            <MenuContent onClose={onClose} lang={lang} navItems={navItems} isMobile={true} />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export { Menu }
export type { MenuProps }
