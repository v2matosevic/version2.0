'use client'

import { Menu } from 'lucide-react'
import Link from 'next/link'
import { Container } from '@/components/ui/container'

type HeaderProps = {
  onMenuOpen: () => void
}

const NAV_LINKS = [
  { label: 'Portfolio', href: '/portfolio/' },
  { label: 'Pricing', href: '/pricing/' },
  { label: 'Contact', href: '/contact/' },
] as const

function Header({ onMenuOpen }: HeaderProps) {
  return (
    <header
      className="fixed top-0 left-0 w-full transition-all"
      style={{
        zIndex: 'var(--z-header)',
      } as React.CSSProperties}
    >
      <Container>
        <div className="flex items-center justify-between h-16 lg:h-18">
          <Link href="/" className="font-heading text-foreground text-xl" style={{ fontWeight: 'var(--font-weight-headline-bold)' } as React.CSSProperties}>
            Version2
          </Link>

          <div className="flex items-center gap-6">
            <nav className="hidden lg:flex items-center gap-8" aria-label="Primary">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-foreground hover:text-brand-red transition-colors font-body"
                  style={{ transitionDuration: 'var(--duration-fast)' } as React.CSSProperties}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <button
              onClick={onMenuOpen}
              className="text-foreground hover:text-brand-red transition-colors p-1"
              aria-expanded={false}
              aria-controls="menu-panel"
              aria-label="Open navigation menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </Container>
    </header>
  )
}

export { Header }
export type { HeaderProps }
