import Link from 'next/link'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { ScrollReveal } from '@/components/animations'

type CTASectionProps = {
  heading: string
  subtext: string
  ctaLabel: string
  ctaHref: string
}

function CTASection({ heading, subtext, ctaLabel, ctaHref }: CTASectionProps) {
  return (
    <section
      className="relative py-24 md:py-32 lg:py-40 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, var(--color-base) 0%, var(--color-sunken) 40%, var(--color-sunken) 60%, var(--color-base) 100%)',
      }}
    >
      {/* Grain texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      {/* Subtle red glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(153, 23, 23, 0.06) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <Container>
        <ScrollReveal direction="up">
          <div className="relative text-center max-w-2xl mx-auto">
            <h2
              className="font-heading text-foreground"
              style={{
                fontSize: 'var(--text-h1)',
                fontWeight: 'var(--font-weight-headline)',
                lineHeight: 'var(--leading-display)',
                letterSpacing: 'var(--tracking-h1)',
              } as React.CSSProperties}
            >
              {heading}
            </h2>
            <p
              className="mt-5 text-muted mx-auto max-w-md"
              style={{
                fontSize: 'var(--text-body-lg)',
                lineHeight: 'var(--leading-body)',
              } as React.CSSProperties}
            >
              {subtext}
            </p>
            <div className="mt-10">
              <Link href={ctaHref}>
                <Button variant="primary" size="lg">
                  {ctaLabel}
                </Button>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  )
}

export { CTASection }
export type { CTASectionProps }
