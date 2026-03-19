import Link from 'next/link'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { TextReveal, ScrollReveal } from '@/components/animations'

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
  return (
    <section className="relative min-h-screen" style={{ overflow: 'hidden' }}>
      {/* CSS gradient fallback background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 30% 40%, #1c1c1c 0%, #0c0c0c 70%)',
        }}
        aria-hidden="true"
      />

      <Container>
        <div className="relative flex flex-col justify-center min-h-screen py-24" style={{ zIndex: 10 }}>
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

            <h1 className="sr-only">{headline}</h1>
            <TextReveal
              text={headline}
              mode="chars"
              trigger="mount"
              className="font-heading text-foreground"
              style={{
                fontSize: 'var(--text-display)',
                fontWeight: 'var(--font-weight-headline)',
                lineHeight: 'var(--leading-display)',
                letterSpacing: 'var(--tracking-display)',
              } as React.CSSProperties}
            />

            <div
              className="mt-4 mb-6"
              style={{ width: '64px', height: '3px', background: 'var(--color-brand-red)' }}
            />

            <p
              className="text-muted max-w-lg"
              style={{
                fontSize: 'var(--text-body-lg)',
                lineHeight: 'var(--leading-body)',
              } as React.CSSProperties}
            >
              {subtext}
            </p>

            <ScrollReveal direction="up" delay={0.4}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
                <Link href={ctaPrimaryHref}>
                  <Button variant="primary" size="lg">
                    {ctaPrimaryLabel}
                  </Button>
                </Link>
                <Link href={ctaSecondaryHref}>
                  <Button variant="secondary" size="lg">
                    {ctaSecondaryLabel}
                  </Button>
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </Container>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
        style={{ zIndex: 10 }}
      >
        <div
          className="w-0.5 h-10 animate-pulse"
          style={{ background: 'var(--color-faint)' }}
        />
      </div>
    </section>
  )
}

export { HeroContent }
export type { HeroContentProps }
