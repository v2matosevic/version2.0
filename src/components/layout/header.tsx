'use client'

import Image from 'next/image'
import { Menu } from 'lucide-react'
import Link from 'next/link'
import { Container } from '@/components/ui/container'
import { useScrollDirection } from '@/lib/utils/use-scroll-direction'
import type { Language } from '@/types/i18n'

type HeaderProps = {
  lang: Language
  onMenuOpen: () => void
  isMenuOpen: boolean
}

const HERO_HEIGHT = 600

function getNavLinks(lang: Language) {
  const prefix = lang === 'en' ? '' : `/${lang}`
  return [
    { label: lang === 'hr' ? 'Portfolio' : lang === 'de' ? 'Portfolio' : 'Portfolio', href: `${prefix}/portfolio/` },
    { label: lang === 'hr' ? 'Cijene' : lang === 'de' ? 'Preise' : 'Pricing', href: lang === 'hr' ? `${prefix}/cijene/` : lang === 'de' ? `${prefix}/preise/` : `${prefix}/pricing/` },
    { label: lang === 'hr' ? 'Kontakt' : 'Contact', href: lang === 'hr' ? `${prefix}/kontakt/` : lang === 'de' ? `${prefix}/kontakt/` : `${prefix}/contact/` },
  ] as const
}

function getHomePath(lang: Language): string {
  if (lang === 'en') return '/'
  return `/${lang}/`
}

function Header({ lang, onMenuOpen, isMenuOpen }: HeaderProps) {
  const { scrollDirection, scrollY } = useScrollDirection()

  const isPastHero = scrollY > HERO_HEIGHT
  const isHidden = scrollDirection === 'down' && isPastHero && !isMenuOpen

  const navLinks = getNavLinks(lang)
  const homePath = getHomePath(lang)

  return (
    <header
      className="fixed top-0 left-0 w-full transition-all"
      style={{
        zIndex: 'var(--z-header)',
        transform: isHidden ? 'translateY(-100%)' : 'translateY(0)',
        transitionDuration: '200ms',
        transitionTimingFunction: 'var(--ease-out)',
        background: isPastHero
          ? 'color-mix(in srgb, var(--color-base) 90%, transparent)'
          : 'transparent',
        backdropFilter: isPastHero ? 'blur(8px)' : 'none',
        borderBottom: isPastHero
          ? '1px solid var(--color-line-subtle)'
          : '1px solid transparent',
      } as React.CSSProperties}
    >
      <Container>
        <div className="flex items-center justify-between" style={{ height: '64px' } as React.CSSProperties}>
          <Link
            href={homePath}
            className="flex items-center gap-2 font-heading text-foreground text-xl"
            style={{ fontWeight: 'var(--font-weight-headline-bold)' } as React.CSSProperties}
          >
            <Image
              src="/logo.svg"
              alt=""
              width={32}
              height={32}
              className="w-8 h-8"
              priority
            />
            Version2
          </Link>

          <div className="flex items-center gap-6">
            <nav className="hidden lg:flex items-center gap-8" aria-label="Primary">
              {navLinks.map((link) => (
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
              aria-expanded={isMenuOpen}
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
