'use client'

import Image from 'next/image'
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
const HEADER_HEIGHT = 72

function getNavLinks(lang: Language) {
  const prefix = lang === 'en' ? '' : `/${lang}`
  return [
    { label: lang === 'hr' ? 'Usluge' : lang === 'de' ? 'Leistungen' : 'Services', href: lang === 'hr' ? `${prefix}/usluge/` : lang === 'de' ? `${prefix}/dienstleistungen/` : `${prefix}/services/` },
    { label: lang === 'hr' ? 'Portfolio' : lang === 'de' ? 'Portfolio' : 'Portfolio', href: `${prefix}/portfolio/` },
    { label: 'Blog', href: `${prefix}/blog/` },
    { label: lang === 'hr' ? 'Kontakt' : 'Contact', href: lang === 'hr' ? `${prefix}/kontakt/` : lang === 'de' ? `${prefix}/kontakt/` : `${prefix}/contact/` },
  ] as const
}

function getHomePath(lang: Language): string {
  if (lang === 'en') return '/'
  return `/${lang}/`
}

/**
 * Animated hamburger icon using SVG paths.
 * Two curved paths that appear as 3 straight lines, then morph to an X.
 * Inspired by jonsuh.com/hamburgers — GPU-accelerated via SVG transforms.
 */
function MenuToggleIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Top line → rotates to form \ of X */}
      <line
        x1="4" y1="6" x2="20" y2="6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        className="transition-all origin-center"
        style={{
          transitionDuration: '400ms',
          transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
          transform: isOpen ? 'translateY(6px) rotate(45deg)' : 'none',
        }}
      />
      {/* Middle line → fades out */}
      <line
        x1="4" y1="12" x2="16" y2="12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        className="transition-all origin-center"
        style={{
          transitionDuration: '300ms',
          transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
          opacity: isOpen ? 0 : 1,
          transform: isOpen ? 'scaleX(0)' : 'none',
        }}
      />
      {/* Bottom line → rotates to form / of X */}
      <line
        x1="4" y1="18" x2="20" y2="18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        className="transition-all origin-center"
        style={{
          transitionDuration: '400ms',
          transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
          transform: isOpen ? 'translateY(-6px) rotate(-45deg)' : 'none',
        }}
      />
    </svg>
  )
}

function Header({ lang, onMenuOpen, isMenuOpen }: HeaderProps) {
  const { scrollDirection, scrollY } = useScrollDirection()

  const isPastHero = scrollY > HERO_HEIGHT
  const isHidden = scrollDirection === 'down' && isPastHero && !isMenuOpen

  const navLinks = getNavLinks(lang)
  const homePath = getHomePath(lang)

  return (
    <header
      className="fixed top-0 left-0 w-full"
      style={{
        zIndex: 'var(--z-header)',
        transform: isHidden ? 'translateY(-100%)' : 'translateY(0)',
        transition: 'transform var(--duration-normal) var(--ease-out), background var(--duration-slow) var(--ease-smooth), backdrop-filter var(--duration-slow) var(--ease-smooth), border-color var(--duration-slow) var(--ease-smooth)',
        background: isPastHero
          ? 'color-mix(in srgb, var(--color-base) 85%, transparent)'
          : 'transparent',
        backdropFilter: isPastHero ? 'blur(12px) saturate(1.2)' : 'none',
        WebkitBackdropFilter: isPastHero ? 'blur(12px) saturate(1.2)' : 'none',
        borderBottom: isPastHero
          ? '1px solid color-mix(in srgb, var(--color-line) 50%, transparent)'
          : '1px solid transparent',
      } as React.CSSProperties}
    >
      <Container>
        <div className="flex items-center justify-between" style={{ height: `${HEADER_HEIGHT}px` }}>
          {/* Logo — white with CSS inversion for light mode past hero */}
          <Link href={homePath} className="shrink-0">
            <Image
              src="/logo-white.webp"
              alt="Version2"
              width={160}
              height={47}
              className="h-7 md:h-8 w-auto transition-all"
              style={{
                filter: isPastHero ? 'var(--logo-filter, none)' : 'none',
                transitionDuration: 'var(--duration-normal)',
              }}
              priority
            />
          </Link>

          <div className="flex items-center gap-8">
            {/* Desktop nav links with sliding underline */}
            <nav className="hidden lg:flex items-center gap-8" aria-label="Primary">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative text-muted hover:text-foreground transition-colors font-body text-sm tracking-wide group"
                  style={{
                    transitionDuration: 'var(--duration-fast)',
                    fontWeight: 'var(--font-weight-body)',
                  } as React.CSSProperties}
                >
                  {link.label}
                  <span
                    className="absolute -bottom-1 left-0 w-full h-px bg-brand-red transition-transform origin-left scale-x-0 group-hover:scale-x-100"
                    style={{
                      transitionDuration: 'var(--duration-normal)',
                      transitionTimingFunction: 'var(--ease-out)',
                    }}
                  />
                </Link>
              ))}
            </nav>

            {/* Menu toggle — SVG animated icon */}
            <button
              onClick={onMenuOpen}
              className="text-foreground hover:text-brand-red transition-colors p-1.5"
              style={{ transitionDuration: 'var(--duration-fast)' }}
              aria-expanded={isMenuOpen}
              aria-controls="menu-panel"
              aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              <MenuToggleIcon isOpen={isMenuOpen} />
            </button>
          </div>
        </div>
      </Container>
    </header>
  )
}

export { Header }
export type { HeaderProps }
