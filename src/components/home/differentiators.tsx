import { Container } from '@/components/ui/container'
import { StaggerReveal } from '@/components/animations'

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
  return (
    <section
      className="py-16 md:py-24 lg:py-32 bg-raised"
      style={{
        background: 'radial-gradient(ellipse at 50% 0%, var(--color-base) 0%, var(--color-raised) 60%)',
      }}
    >
      <Container>
        <p
          className="mb-3 uppercase text-muted font-body"
          style={{
            fontSize: 'var(--text-overline)',
            fontWeight: 'var(--font-weight-body-semibold)',
            letterSpacing: 'var(--tracking-overline)',
          } as React.CSSProperties}
        >
          {overline}
        </p>
        <h2
          className="mb-12 font-heading text-foreground"
          style={{
            fontSize: 'var(--text-h2)',
            fontWeight: 'var(--font-weight-headline)',
            lineHeight: 'var(--leading-tight)',
            letterSpacing: 'var(--tracking-h2)',
          } as React.CSSProperties}
        >
          {heading}
        </h2>

        <StaggerReveal stagger={0.15}>
          {items.map((item, index) => (
            <div
              key={item.number}
              className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-4 md:gap-8 py-8 md:py-10"
              style={{
                borderBottom: index < items.length - 1
                  ? '1px solid var(--color-line-subtle)'
                  : 'none',
              }}
            >
              <div
                className="font-heading text-brand-red md:min-w-[100px]"
                style={{
                  fontSize: 'var(--text-h1)',
                  fontWeight: 'var(--font-weight-headline-bold)',
                  opacity: 0.15,
                } as React.CSSProperties}
              >
                {item.number}
              </div>
              <div>
                <h3
                  className="font-heading text-foreground"
                  style={{
                    fontSize: 'var(--text-h3)',
                    fontWeight: 'var(--font-weight-headline)',
                    lineHeight: 'var(--leading-tight)',
                  } as React.CSSProperties}
                >
                  {item.title}
                </h3>
                <p
                  className="mt-2 text-muted max-w-md"
                  style={{
                    fontSize: 'var(--text-body)',
                    lineHeight: 'var(--leading-body)',
                  } as React.CSSProperties}
                >
                  {item.copy}
                </p>
              </div>
            </div>
          ))}
        </StaggerReveal>
      </Container>
    </section>
  )
}

export { Differentiators }
export type { DifferentiatorsProps, DifferentiatorItem }
