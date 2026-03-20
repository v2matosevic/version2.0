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
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50"
            style={{ zIndex: 49 } as React.CSSProperties}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Desktop sidebar */}
          <motion.div
            ref={panelRef}
            id="menu-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 h-full bg-sunken hidden lg:block"
            style={{ zIndex: 'var(--z-menu)', width: '400px' } as React.CSSProperties}
          >
            <MenuContent onClose={onClose} lang={lang} navItems={navItems} isMobile={false} />
          </motion.div>

          {/* Mobile fullscreen */}
          <motion.div
            ref={panelRef}
            id="menu-panel-mobile"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-sunken lg:hidden overflow-y-auto"
            style={{ zIndex: 'var(--z-menu)', paddingBottom: 'env(safe-area-inset-bottom)' } as React.CSSProperties}
          >
            <motion.div
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              exit={{ y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <MenuContent onClose={onClose} lang={lang} navItems={navItems} isMobile={true} />
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export { Menu }
export type { MenuProps }
