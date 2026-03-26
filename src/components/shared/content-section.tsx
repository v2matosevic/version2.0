import { Container } from '@/components/ui/container'
import type { SectionBackground } from '@/components/ui/section'

type ContentSectionProps = {
  background?: SectionBackground
  heading?: string
  overline?: string
  children: React.ReactNode
  className?: string
  id?: string
}

const BG_MAP: Record<SectionBackground, string> = {
  base: 'bg-base',
  raised: 'bg-raised',
  sunken: 'bg-sunken',
}

function ContentSection({
  background = 'base',
  heading,
  overline,
  children,
  className = '',
  id,
}: ContentSectionProps) {
  return (
    <section id={id} className={`py-16 md:py-24 lg:py-32 ${BG_MAP[background]} ${className}`}>
      <Container>
        {overline && (
          <p
            className="mb-4 uppercase text-brand-red font-body"
            style={{
              fontSize: 'var(--text-overline)',
              fontWeight: 'var(--font-weight-body-semibold)',
              letterSpacing: 'var(--tracking-overline)',
            } as React.CSSProperties}
          >
            {overline}
          </p>
        )}
        {heading && (
          <h2
            className="mb-14 font-heading text-foreground max-w-2xl"
            style={{
              fontSize: 'var(--text-h2)',
              fontWeight: 'var(--font-weight-headline)',
              lineHeight: 'var(--leading-tight)',
              letterSpacing: 'var(--tracking-h2)',
            } as React.CSSProperties}
          >
            {heading}
          </h2>
        )}
        {children}
      </Container>
    </section>
  )
}

export { ContentSection }
export type { ContentSectionProps }
