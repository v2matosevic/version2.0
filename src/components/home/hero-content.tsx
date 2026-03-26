'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { TextReveal } from '@/components/animations'
import { useReducedMotion } from '@/lib/utils/use-reduced-motion'

type HeroContentProps = {
  overline: string
  headline: string
  subtext: string
  ctaPrimaryLabel: string
  ctaPrimaryHref: string
  ctaSecondaryLabel: string
  ctaSecondaryHref: string
}

function HeroContent({
  overline,
  headline,
  subtext,
  ctaPrimaryLabel,
  ctaPrimaryHref,
  ctaSecondaryLabel,
  ctaSecondaryHref,
}: HeroContentProps) {
  const accentRef = useRef<HTMLDivElement>(null)
  const subtextRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useGSAP(() => {
    if (prefersReducedMotion) return

    const tl = gsap.timeline({ delay: 0.6 })

    if (accentRef.current) {
      gsap.set(accentRef.current, { scaleX: 0, transformOrigin: 'left center' })
      tl.to(accentRef.current, { scaleX: 1, duration: 0.8, ease: 'power3.out' })
    }

    if (subtextRef.current) {
      gsap.set(subtextRef.current, { opacity: 0, y: 20 })
      tl.to(subtextRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4')
    }

    if (ctaRef.current) {
      gsap.set(ctaRef.current, { opacity: 0, y: 20 })
      tl.to(ctaRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3')
    }

    if (scrollRef.current) {
      gsap.set(scrollRef.current, { opacity: 0 })
      tl.to(scrollRef.current, { opacity: 1, duration: 0.8, ease: 'power1.out' }, '-=0.2')
    }
  }, { dependencies: [prefersReducedMotion] })

  return (
    <Container>
      {/* Left-edge vignette for text contrast against 3D scene */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, rgba(20,20,20,0.85) 0%, rgba(20,20,20,0.4) 50%, transparent 75%)',
        }}
        aria-hidden="true"
      />

      {/* Grain texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.04\'/%3E%3C/svg%3E")',
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px',
          opacity: 0.5,
        }}
        aria-hidden="true"
      />

      {/* Force dark-mode colors — hero always has a dark background regardless of theme */}
      <div
        className="relative flex flex-col justify-center min-h-screen py-24"
        style={{
          '--color-foreground': '#F0E8E0',
          '--color-muted': '#9A918A',
          '--color-faint': '#6A625C',
          '--color-line': '#2a2a2a',
          '--color-line-subtle': '#1f1f1f',
        } as React.CSSProperties}
      >
        <div className="max-w-3xl lg:max-w-[58.33%]">
          <p
            className="mb-4 uppercase text-muted font-body"
            style={{
              fontSize: 'var(--text-overline)',
              fontWeight: 'var(--font-weight-body-semibold)',
              letterSpacing: 'var(--tracking-overline)',
            } as React.CSSProperties}
          >
            {overline}
          </p>

          <h1
            className="font-heading text-foreground"
            style={{
              fontSize: 'var(--text-display)',
              fontWeight: 'var(--font-weight-headline)',
              lineHeight: 'var(--leading-display)',
              letterSpacing: 'var(--tracking-display)',
            } as React.CSSProperties}
          >
            <TextReveal text={headline} mode="chars" trigger="mount" />
          </h1>

          {/* Animated red accent bar */}
          <div
            ref={accentRef}
            className="mt-5 mb-6"
            style={{
              width: '80px',
              height: '3px',
              background: 'var(--color-brand-red)',
            }}
          />

          <p
            ref={subtextRef}
            className="text-muted max-w-lg"
            style={{
              fontSize: 'var(--text-body-lg)',
              lineHeight: 'var(--leading-body)',
            } as React.CSSProperties}
          >
            {subtext}
          </p>

          <div ref={ctaRef} className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Link href={ctaPrimaryHref}>
              <Button variant="primary" size="lg" className="shadow-glow">
                {ctaPrimaryLabel}
              </Button>
            </Link>
            <Link href={ctaSecondaryHref}>
              <Button variant="secondary" size="lg">
                {ctaSecondaryLabel}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator — animated vertical line with label */}
      <div
        ref={scrollRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-3"
        style={{ zIndex: 10 }}
      >
        <span
          className="text-faint font-body uppercase"
          style={{
            fontSize: '0.625rem',
            letterSpacing: 'var(--tracking-overline)',
            writingMode: 'vertical-lr',
          } as React.CSSProperties}
        >
          Scroll
        </span>
        <div className="relative w-px h-12 overflow-hidden" style={{ background: 'var(--color-line-subtle)' }}>
          <div
            className="absolute top-0 left-0 w-full"
            style={{
              height: '40%',
              background: 'var(--color-faint)',
              animation: 'scrollLine 2s ease-in-out infinite',
            }}
          />
        </div>
      </div>
    </Container>
  )
}

export { HeroContent }
export type { HeroContentProps }
