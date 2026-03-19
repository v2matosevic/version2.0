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
      className="py-20 md:py-28 lg:py-36"
      style={{
        background: 'linear-gradient(180deg, var(--color-base) 0%, var(--color-sunken) 100%)',
      }}
    >
      <Container>
        <ScrollReveal direction="up">
          <div className="text-center">
            <h2
              className="font-heading text-foreground max-w-xl mx-auto"
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
              className="mt-4 text-muted max-w-md mx-auto"
              style={{
                fontSize: 'var(--text-body-lg)',
                lineHeight: 'var(--leading-body)',
              } as React.CSSProperties}
            >
              {subtext}
            </p>
            <div className="mt-8">
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
