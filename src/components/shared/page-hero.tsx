import { Container } from '@/components/ui/container'
import { ScrollReveal } from '@/components/animations'

type PageHeroProps = {
  headline: string
  subtext?: string
  overline?: string
  minHeight?: string
}

function PageHero({ headline, subtext, overline, minHeight = '40vh' }: PageHeroProps) {
  return (
    <section className="bg-base" style={{ minHeight }}>
      <Container>
        <div
          className="flex flex-col justify-end pb-12 md:pb-16"
          style={{ minHeight }}
        >
          <div className="max-w-3xl">
            {overline && (
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
            )}
            <ScrollReveal direction="up">
              <h1
                className="font-heading text-foreground"
                style={{
                  fontSize: 'var(--text-h1)',
                  fontWeight: 'var(--font-weight-headline)',
                  lineHeight: 'var(--leading-display)',
                  letterSpacing: 'var(--tracking-h1)',
                } as React.CSSProperties}
              >
                {headline}
              </h1>
            </ScrollReveal>
            {subtext && (
              <ScrollReveal direction="up" delay={0.2}>
                <p
                  className="mt-4 text-muted max-w-xl"
                  style={{
                    fontSize: 'var(--text-body-lg)',
                    lineHeight: 'var(--leading-body)',
                  } as React.CSSProperties}
                >
                  {subtext}
                </p>
              </ScrollReveal>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}

export { PageHero }
export type { PageHeroProps }
