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
    <section
      className="relative overflow-hidden"
      style={{
        minHeight,
        background: 'linear-gradient(180deg, var(--color-sunken) 0%, var(--color-base) 100%)',
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

      <Container>
        <div
          className="relative flex flex-col justify-end pb-14 md:pb-20"
          style={{ minHeight }}
        >
          <div className="max-w-3xl">
            {overline && (
              <ScrollReveal direction="up" delay={0}>
                <p
                  className="mb-5 uppercase text-brand-red font-body"
                  style={{
                    fontSize: 'var(--text-overline)',
                    fontWeight: 'var(--font-weight-body-semibold)',
                    letterSpacing: 'var(--tracking-overline)',
                  } as React.CSSProperties}
                >
                  {overline}
                </p>
              </ScrollReveal>
            )}
            <ScrollReveal direction="up" delay={0.1}>
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
              <ScrollReveal direction="up" delay={0.25}>
                <p
                  className="mt-5 text-muted max-w-xl"
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
