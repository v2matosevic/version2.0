'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { Container } from '@/components/ui/container'
import { StaggerReveal } from '@/components/animations'
import { useReducedMotion } from '@/lib/utils/use-reduced-motion'

type ServiceTeaserItem = {
  name: string
  description: string
  href: string
}

type ServicesTeaserProps = {
  services: ServiceTeaserItem[]
}

function ServiceRow({ service, index }: { service: ServiceTeaserItem; index: number }) {
  const arrowRef = useRef<SVGSVGElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const padded = String(index + 1).padStart(2, '0')

  useGSAP(() => {
    if (prefersReducedMotion || !arrowRef.current) return
    const path = arrowRef.current.querySelector('line')
    if (!path) return
    gsap.set(path, { attr: { x2: 12 } })
  }, { dependencies: [prefersReducedMotion] })

  function handleEnter() {
    if (prefersReducedMotion) return
    if (arrowRef.current) {
      const path = arrowRef.current.querySelector('line')
      if (path) gsap.to(path, { attr: { x2: 20 }, duration: 0.3, ease: 'power2.out' })
    }
    if (bgRef.current) {
      gsap.to(bgRef.current, { opacity: 1, duration: 0.3, ease: 'power2.out' })
    }
  }

  function handleLeave() {
    if (prefersReducedMotion) return
    if (arrowRef.current) {
      const path = arrowRef.current.querySelector('line')
      if (path) gsap.to(path, { attr: { x2: 12 }, duration: 0.3, ease: 'power2.out' })
    }
    if (bgRef.current) {
      gsap.to(bgRef.current, { opacity: 0, duration: 0.3, ease: 'power2.out' })
    }
  }

  return (
    <Link
      href={service.href}
      className="group relative block py-8 md:py-10"
      style={{ borderBottom: '1px solid var(--color-line-subtle)' }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* Hover background glow */}
      <div
        ref={bgRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0,
          background: 'linear-gradient(90deg, rgba(153,23,23,0.04) 0%, transparent 60%)',
        }}
        aria-hidden="true"
      />

      <div className="relative flex items-start md:items-center gap-4 md:gap-8">
        {/* Numbered index */}
        <span
          className="hidden md:block font-heading text-brand-red shrink-0"
          style={{
            fontSize: 'var(--text-h3)',
            fontWeight: 'var(--font-weight-headline-bold)',
            opacity: 0.2,
            minWidth: '48px',
          } as React.CSSProperties}
        >
          {padded}
        </span>

        <div className="flex-1 flex items-center justify-between">
          <div className="max-w-lg">
            <h3
              className="font-heading text-foreground group-hover:text-brand-red transition-colors"
              style={{
                fontSize: 'var(--text-h2)',
                fontWeight: 'var(--font-weight-headline)',
                lineHeight: 'var(--leading-tight)',
                letterSpacing: 'var(--tracking-h2)',
                transitionDuration: 'var(--duration-normal)',
              } as React.CSSProperties}
            >
              {service.name}
            </h3>
            <p
              className="mt-2 text-muted"
              style={{
                fontSize: 'var(--text-body)',
                lineHeight: 'var(--leading-body)',
              } as React.CSSProperties}
            >
              {service.description}
            </p>
          </div>

          {/* Arrow that draws out on hover */}
          <svg
            ref={arrowRef}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="hidden md:block text-faint group-hover:text-brand-red shrink-0 ml-8 transition-colors"
            style={{ transitionDuration: 'var(--duration-normal)' } as React.CSSProperties}
          >
            <line x1="4" y1="12" x2="12" y2="12" />
            <polyline points="14 6 20 12 14 18" />
          </svg>
        </div>
      </div>
    </Link>
  )
}

function ServicesTeaser({ services }: ServicesTeaserProps) {
  return (
    <section
      className="relative py-20 md:py-28 lg:py-36 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, var(--color-raised) 0%, var(--color-base) 100%)',
      }}
    >
      {/* Subtle left-edge red accent glow */}
      <div
        className="absolute top-0 left-0 w-1/3 h-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 0% 50%, rgba(153,23,23,0.04) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />
      <Container>
        <p
          className="mb-3 uppercase text-brand-red font-body"
          style={{
            fontSize: 'var(--text-overline)',
            fontWeight: 'var(--font-weight-body-semibold)',
            letterSpacing: 'var(--tracking-overline)',
          } as React.CSSProperties}
        >
          What We Do
        </p>
        <h2 className="sr-only">Services</h2>
        <StaggerReveal stagger={0.1}>
          {services.map((service, index) => (
            <ServiceRow key={service.href} service={service} index={index} />
          ))}
        </StaggerReveal>
      </Container>
    </section>
  )
}

export { ServicesTeaser }
export type { ServicesTeaserProps, ServiceTeaserItem }
