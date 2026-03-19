'use client'

import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import Link from 'next/link'
import { ThemeToggle } from '@/components/layout/theme-toggle'

type MobileMenuProps = {
  isOpen: boolean
  onClose: () => void
}

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Portfolio', href: '/portfolio/' },
  { label: 'Pricing', href: '/pricing/' },
  { label: 'About', href: '/about/' },
  { label: 'Blog', href: '/blog/' },
  { label: 'Career', href: '/career/' },
  { label: 'Contact', href: '/contact/' },
] as const

function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (isOpen) {
      closeButtonRef.current?.focus()
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      id="menu-panel"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
      className="fixed inset-0 bg-sunken overflow-y-auto"
      style={{
        zIndex: 'var(--z-menu)',
        paddingBottom: 'env(safe-area-inset-bottom)',
      } as React.CSSProperties}
    >
      <div className="p-8">
        <div className="flex justify-end mb-8">
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="text-foreground hover:text-brand-red transition-colors p-1"
            aria-label="Close navigation menu"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex flex-col gap-3" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="block py-2 font-heading text-foreground hover:text-brand-red transition-colors"
              style={{
                fontSize: 'var(--text-h2)',
                fontWeight: 'var(--font-weight-headline)',
                lineHeight: 'var(--leading-tight)',
              } as React.CSSProperties}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-12 flex flex-col gap-6">
          <div className="flex items-center gap-4 text-sm text-muted">
            <a href="mailto:info@version2.hr" className="hover:text-foreground transition-colors">
              info@version2.hr
            </a>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </div>
  )
}

export { MobileMenu }
export type { MobileMenuProps }
