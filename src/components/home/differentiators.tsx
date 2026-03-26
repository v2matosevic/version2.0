import { Container } from '@/components/ui/container'
import { ScrollReveal, StaggerReveal } from '@/components/animations'

type DifferentiatorItem = {
  number: string
  title: string
  copy: string
}

type DifferentiatorsProps = {
  overline: string
  heading: string
  items: DifferentiatorItem[]
}

function Differentiators({ overline, heading, items }: DifferentiatorsProps) {
  // Split heading into lines for dramatic two-line layout
  const headingWords = heading.split(' ')
  const midpoint = Math.ceil(headingWords.length / 2)
  const line1 = headingWords.slice(0, midpoint).join(' ')
  const line2 = headingWords.slice(midpoint).join(' ')

  return (
    <section className="relative min-h-[80vh] flex flex-col justify-center overflow-hidden">
      {/* Layered atmospheric background — stronger red glow */}
      <div
        className="absolute inset-0"
        style={{
          background: [
            'radial-gradient(ellipse at 50% 30%, rgba(153,23,23,0.06) 0%, transparent 50%)',
            'radial-gradient(ellipse at 20% 80%, rgba(153,23,23,0.03) 0%, transparent 40%)',
            'radial-gradient(ellipse at 80% 0%, var(--color-base) 0%, transparent 50%)',
            'var(--color-raised)',
          ].join(', '),
        }}
        aria-hidden="true"
      />

      {/* Grain texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.04\'/%3E%3C/svg%3E")',
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px',
          opacity: 0.4,
        }}
        aria-hidden="true"
      />

      <div className="relative py-20 md:py-28 lg:py-36">
        <Container>
          {/* Overline */}
          <ScrollReveal direction="up" delay={0}>
            <p
              className="mb-6 uppercase text-brand-red font-body"
              style={{
                fontSize: 'var(--text-overline)',
                fontWeight: 'var(--font-weight-body-semibold)',
                letterSpacing: 'var(--tracking-overline)',
              } as React.CSSProperties}
            >
              {overline}
            </p>
          </ScrollReveal>

          {/* Monument heading — viewport-commanding */}
          <ScrollReveal direction="up" delay={0.1}>
            <h2 className="font-heading text-foreground" aria-label={heading}>
              <span
                className="block"
                style={{
                  fontSize: 'clamp(3.5rem, 11vw, 9rem)',
                  fontWeight: 'var(--font-weight-headline)',
                  lineHeight: 0.95,
                  letterSpacing: '-0.04em',
                } as React.CSSProperties}
              >
                {line1}
              </span>
              <span
                className="block"
                style={{
                  fontSize: 'clamp(3.5rem, 11vw, 9rem)',
                  fontWeight: 'var(--font-weight-headline)',
                  lineHeight: 0.95,
                  letterSpacing: '-0.04em',
                } as React.CSSProperties}
              >
                {line2}
              </span>
            </h2>
          </ScrollReveal>

          {/* Red accent line */}
          <ScrollReveal direction="up" delay={0.2}>
            <div
              className="mt-6 mb-10 md:mt-8 md:mb-14"
              style={{ width: '80px', height: '2px', background: 'var(--color-brand-red)' }}
            />
          </ScrollReveal>

          {/* Proof strip — anchors the bold claim */}
          <ScrollReveal direction="up" delay={0.25}>
            <div
              className="mb-14 md:mb-20 flex flex-wrap items-center gap-4 md:gap-6"
              style={{
                fontSize: 'var(--text-overline)',
                letterSpacing: 'var(--tracking-overline)',
              } as React.CSSProperties}
            >
              <span className="text-muted uppercase font-body">100+ Projects</span>
              <span className="w-1 h-1 rounded-full bg-brand-red" aria-hidden="true" />
              <span className="text-muted uppercase font-body">5.0 Google Rating</span>
              <span className="w-1 h-1 rounded-full bg-brand-red" aria-hidden="true" />
              <span className="text-muted uppercase font-body">Since 2022</span>
            </div>
          </ScrollReveal>

          {/* 4-column grid with red top borders */}
          <StaggerReveal stagger={0.12}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
              {items.map((item, index) => (
                <div
                  key={item.number}
                  className="relative py-8 lg:py-0 lg:px-6 first:lg:pl-0 last:lg:pr-0"
                  style={{
                    borderTop: '2px solid var(--color-brand-red)',
                    borderRight: index < items.length - 1
                      ? undefined
                      : undefined,
                  }}
                >
                  {/* Vertical divider between columns (desktop) */}
                  {index < items.length - 1 && (
                    <div
                      className="hidden lg:block absolute top-0 right-0 w-px h-full"
                      style={{ background: 'color-mix(in srgb, var(--color-brand-red) 15%, transparent)' }}
                      aria-hidden="true"
                    />
                  )}

                  <div className="pt-6 lg:pt-8">
                    <span
                      className="block text-brand-red font-body mb-4"
                      style={{
                        fontSize: 'var(--text-overline)',
                        fontWeight: 'var(--font-weight-body-semibold)',
                        letterSpacing: 'var(--tracking-overline)',
                      } as React.CSSProperties}
                    >
                      {item.number}
                    </span>
                    <h3
                      className="font-heading text-foreground mb-3"
                      style={{
                        fontSize: 'var(--text-h4)',
                        fontWeight: 'var(--font-weight-headline-bold)',
                        lineHeight: 'var(--leading-snug)',
                      } as React.CSSProperties}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="text-muted"
                      style={{
                        fontSize: 'var(--text-body)',
                        lineHeight: 'var(--leading-body)',
                      }}
                    >
                      {item.copy}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </StaggerReveal>
        </Container>
      </div>
    </section>
  )
}

export { Differentiators }
export type { DifferentiatorsProps, DifferentiatorItem }
