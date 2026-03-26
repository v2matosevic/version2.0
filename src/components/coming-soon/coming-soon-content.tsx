'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { Mail, Phone, MessageCircle, MapPin, Instagram, Facebook } from 'lucide-react'
import { InteractiveGrid } from '@/components/coming-soon/interactive-grid'
import { useReducedMotion } from '@/lib/utils/use-reduced-motion'
import type { ComingSoonStrings } from './coming-soon-translations'

/* ─── constants ─── */

const SOCIAL_LINKS = [
  { href: 'https://instagram.com/version2hr', icon: Instagram, label: 'Instagram' },
  { href: 'https://facebook.com/version2hr', icon: Facebook, label: 'Facebook' },
  { href: 'https://tiktok.com/@version2hr', label: 'TikTok' },
  { href: 'https://x.com/version2hr', label: 'X' },
] as const

const LANG_OPTIONS = [
  { code: 'en', label: 'EN' },
  { code: 'hr', label: 'HR' },
  { code: 'de', label: 'DE' },
] as const

/* ─── tiny icons without lucide ─── */

function TikTokIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  )
}
function XIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
      <path d="M4 20l6.768 -6.768m2.46 -2.46L20 4" />
    </svg>
  )
}

/* ─── CSS keyframes ─── */

const KEYFRAMES = `
@keyframes cs-glow{0%,100%{transform:translate(0,0) scale(1);opacity:.06}50%{transform:translate(4%,-6%) scale(1.08);opacity:.12}}
@keyframes cs-flare{0%{transform:translateX(-120%) rotate(-12deg);opacity:0}20%{opacity:.05}80%{opacity:.02}100%{transform:translateX(220%) rotate(-12deg);opacity:0}}
@keyframes cs-redline{from{transform:scaleY(0)}to{transform:scaleY(1)}}
`

/* ─── types ─── */

type ComingSoonContentProps = { lang: string; strings: ComingSoonStrings }

/* ─── component ─── */

function ComingSoonContent({ lang, strings }: ComingSoonContentProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useGSAP(() => {
    const r = rootRef.current
    if (!r) return

    if (prefersReducedMotion) {
      gsap.set(r.querySelectorAll('[data-a]'), { opacity: 1, y: 0, x: 0 })
      return
    }

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    // hide everything
    gsap.set(r.querySelectorAll('[data-a]:not([data-a="h"])'), { opacity: 0 })

    // 0 — red vertical line draws down
    tl.fromTo(r.querySelector('[data-a="line"]'),
      { opacity: 1, scaleY: 0 }, { scaleY: 1, duration: 0.8, ease: 'power2.inOut' }, 0)

    // 0.15 — logo
    tl.fromTo(r.querySelector('[data-a="logo"]'),
      { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.6 }, 0.15)

    // 0.3 — headline chars
    const chars = r.querySelectorAll('[data-a="h"] [data-c]')
    gsap.set(chars, { opacity: 0, y: 30 })
    tl.to(chars, { opacity: 1, y: 0, duration: 0.4, stagger: 0.018 }, 0.3)

    // 0.9 — services index + label
    const svcItems = r.querySelectorAll('[data-a="svc"]')
    tl.fromTo(svcItems, { opacity: 0, x: -10 },
      { opacity: 1, x: 0, duration: 0.3, stagger: 0.05 }, 0.9)

    // 1.2 — contact items
    const contacts = r.querySelectorAll('[data-a="ct"]')
    tl.fromTo(contacts, { opacity: 0, y: 6 },
      { opacity: 1, y: 0, duration: 0.3, stagger: 0.06 }, 1.2)

    // 1.5 — socials pop
    const socials = r.querySelectorAll('[data-a="soc"]')
    tl.fromTo(socials, { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, duration: 0.25, stagger: 0.04, ease: 'back.out(2)' }, 1.5)

    // 1.7 — footer
    tl.fromTo(r.querySelector('[data-a="ft"]'),
      { opacity: 0 }, { opacity: 1, duration: 0.5 }, 1.7)

  }, { dependencies: [prefersReducedMotion, lang] })

  return (
    <div ref={rootRef} className="relative min-h-screen overflow-hidden" style={{ background: '#0c0a09' }}>
      <style dangerouslySetInnerHTML={{ __html: KEYFRAMES }} />

      {/* ═══ ATMOSPHERE ═══ */}

      {/* base gradient */}
      <div className="absolute inset-0" style={{
        background: [
          'radial-gradient(ellipse 70% 60% at 30% 40%, rgba(22,18,16,1) 0%, transparent 70%)',
          'radial-gradient(ellipse 50% 50% at 80% 30%, rgba(153,23,23,0.05) 0%, transparent 55%)',
          'radial-gradient(ellipse 40% 60% at 70% 80%, rgba(153,23,23,0.03) 0%, transparent 50%)',
        ].join(', '),
      }} aria-hidden="true" />

      {/* drifting red glow */}
      <div className="absolute pointer-events-none" style={{
        top: '10%', left: '15%', width: '45%', height: '50%', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(153,23,23,0.14) 0%, transparent 65%)',
        filter: 'blur(80px)',
        animation: prefersReducedMotion ? 'none' : 'cs-glow 14s ease-in-out infinite',
      }} aria-hidden="true" />

      {/* flare sweep */}
      <div className="absolute pointer-events-none" style={{
        top: '15%', left: 0, width: '25%', height: '70%',
        background: 'linear-gradient(90deg, transparent, rgba(240,232,224,0.025) 40%, rgba(153,23,23,0.03) 55%, transparent)',
        filter: 'blur(35px)',
        animation: prefersReducedMotion ? 'none' : 'cs-flare 22s ease-in-out 2s infinite',
      }} aria-hidden="true" />

      {/* grain */}
      <div className="absolute inset-0 pointer-events-none" style={{
        opacity: 0.035,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: '200px',
      }} aria-hidden="true" />

      {/* dot grid */}
      {!prefersReducedMotion && <InteractiveGrid />}

      {/* vignette — heavier on right to let left content breathe */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: [
          'linear-gradient(90deg, rgba(12,10,9,0.15) 0%, transparent 30%, rgba(12,10,9,0.5) 100%)',
          'linear-gradient(180deg, rgba(12,10,9,0.35) 0%, transparent 20%, transparent 80%, rgba(12,10,9,0.5) 100%)',
        ].join(', '),
      }} aria-hidden="true" />

      {/* ═══ LAYOUT ═══ */}
      <div className="relative min-h-screen flex" style={{ zIndex: 10 }}>

        {/* Red vertical accent — structural, left edge */}
        <div
          data-a="line"
          className="hidden md:block absolute"
          style={{
            left: 'clamp(2rem, 5vw, 5rem)',
            top: '10%',
            width: '1px',
            height: '80%',
            background: 'linear-gradient(180deg, transparent, var(--color-brand-red) 20%, var(--color-brand-red) 80%, transparent)',
            transformOrigin: 'top',
            opacity: 0.5,
          }}
          aria-hidden="true"
        />

        {/* Main content — left-aligned */}
        <div className="flex flex-col justify-between min-h-screen w-full px-6 py-8 md:py-10 md:pl-[clamp(5rem,9vw,9rem)] md:pr-12 lg:pr-24">

          {/* TOP — logo + lang */}
          <header className="flex items-center justify-between">
            <div data-a="logo">
              <Image
                src="/assets/logos/white-logo-name-600w.webp"
                alt="Version2"
                width={180} height={40}
                className="h-6 md:h-8 w-auto"
                priority
              />
            </div>
            <nav data-a="ft" className="flex items-center gap-0.5" aria-label="Language">
              {LANG_OPTIONS.map(({ code, label }, i) => (
                <span key={code} className="flex items-center">
                  <Link
                    href={code === 'en' ? '/coming-soon/' : `/coming-soon/?lang=${code}`}
                    className={`px-1.5 py-1 font-body transition-colors ${
                      lang === code ? 'text-foreground' : 'text-faint hover:text-muted'
                    }`}
                    style={{
                      fontSize: '0.65rem',
                      letterSpacing: '0.08em',
                      transitionDuration: 'var(--duration-fast)',
                      fontWeight: lang === code ? 600 : 400,
                    }}
                  >{label}</Link>
                  {i < LANG_OPTIONS.length - 1 && (
                    <span className="text-faint" style={{ opacity: 0.15, fontSize: '0.5rem' }}>/</span>
                  )}
                </span>
              ))}
            </nav>
          </header>

          {/* CENTER — headline + services */}
          <main className="flex-1 flex flex-col justify-center -mt-4 md:-mt-8">

            {/* Headline — massive, left-aligned */}
            <div data-a="h" className="max-w-[90vw] md:max-w-[70vw] lg:max-w-[55vw]">
              {strings.headline.map((line, li) => (
                <div
                  key={li}
                  className="font-heading text-foreground overflow-hidden"
                  style={{
                    fontSize: 'clamp(2.8rem, 8vw, 7rem)',
                    fontWeight: 300,
                    lineHeight: 1.05,
                    letterSpacing: '-0.03em',
                  }}
                >
                  {line.split('').map((char, ci) => (
                    <span
                      key={`${li}-${ci}`}
                      data-c=""
                      style={{ display: 'inline-block' }}
                    >{char === ' ' ? '\u00A0' : char}</span>
                  ))}
                </div>
              ))}
            </div>

            {/* Services — numbered, editorial, left-aligned */}
            <div className="mt-8 md:mt-12 flex flex-col gap-1 md:gap-1.5">
              {strings.services.map((service, i) => (
                <div
                  key={service}
                  data-a="svc"
                  className="flex items-baseline gap-3 md:gap-4"
                >
                  <span
                    className="font-heading text-brand-red"
                    style={{ fontSize: '0.6rem', letterSpacing: '0.05em', opacity: 0.6 }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className="font-body text-muted uppercase"
                    style={{ fontSize: '0.7rem', letterSpacing: '0.12em' }}
                  >
                    {service}
                  </span>
                </div>
              ))}
            </div>
          </main>

          {/* BOTTOM — contact + social + copyright */}
          <footer className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">

            {/* Contact — compact row on desktop, stack on mobile */}
            <div className="flex flex-col gap-2 md:flex-row md:gap-6">
              <a data-a="ct" href="mailto:office@version2.hr"
                className="inline-flex items-center gap-2 text-muted hover:text-foreground transition-colors"
                style={{ transitionDuration: 'var(--duration-fast)' }}>
                <Mail size={12} className="text-faint" />
                <span style={{ fontSize: '0.75rem' }}>office@version2.hr</span>
              </a>
              <a data-a="ct" href="tel:+385995617706"
                className="inline-flex items-center gap-2 text-muted hover:text-foreground transition-colors"
                style={{ transitionDuration: 'var(--duration-fast)' }}>
                <Phone size={12} className="text-faint" />
                <span style={{ fontSize: '0.75rem' }}>+385 99 561 7706</span>
              </a>
              <a data-a="ct" href="https://wa.me/385995617706" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-muted hover:text-foreground transition-colors"
                style={{ transitionDuration: 'var(--duration-fast)' }}>
                <MessageCircle size={12} className="text-faint" />
                <span style={{ fontSize: '0.75rem' }}>{strings.sendMessage}</span>
              </a>
              <span data-a="ct" className="inline-flex items-center gap-2 text-faint" style={{ fontSize: '0.75rem' }}>
                <MapPin size={12} />
                Zadar, Croatia
              </span>
            </div>

            {/* Right side — socials + copyright stacked */}
            <div className="flex flex-col items-start md:items-end gap-3">
              <div className="flex items-center gap-4">
                {SOCIAL_LINKS.map(({ href, label, ...rest }) => {
                  const Icon = 'icon' in rest ? rest.icon
                    : label === 'TikTok' ? TikTokIcon : XIcon
                  return (
                    <a key={label} data-a="soc" href={href}
                      target="_blank" rel="noopener noreferrer" aria-label={label}
                      className="text-faint hover:text-brand-red transition-colors"
                      style={{ transitionDuration: 'var(--duration-fast)' }}>
                      <Icon size={14} />
                    </a>
                  )
                })}
              </div>
              <p data-a="ft" className="text-faint" style={{ fontSize: '0.6rem', opacity: 0.4 }}>
                {strings.copyright}
              </p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}

export { ComingSoonContent }
