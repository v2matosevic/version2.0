import { Star } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { ScrollReveal } from '@/components/animations'
import type { Testimonial } from '@/types/testimonial'
import type { Language } from '@/types/i18n'

type TestimonialsProps = {
  testimonials: Testimonial[]
  lang: Language
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={14}
          className={i < rating ? 'text-amber-500' : 'text-line'}
          fill={i < rating ? 'currentColor' : 'none'}
        />
      ))}
    </div>
  )
}

function TestimonialCard({ testimonial, lang }: { testimonial: Testimonial; lang: Language }) {
  const quote = testimonial.quote[lang] ?? testimonial.quote.en

  return (
    <div
      className="relative p-6 md:p-8 rounded-xl border border-line-subtle"
      style={{
        background: 'var(--color-raised)',
      }}
    >
      {/* Decorative quote mark */}
      <span
        className="absolute top-4 right-6 pointer-events-none font-heading text-line select-none"
        style={{
          fontSize: '4rem',
          lineHeight: 1,
          fontWeight: 'var(--font-weight-headline-bold)',
        } as React.CSSProperties}
        aria-hidden="true"
      >
        &rdquo;
      </span>

      <div className="relative">
        <StarRating rating={testimonial.stars} />
        <blockquote
          className="mt-4 text-foreground"
          style={{
            fontSize: 'var(--text-body)',
            lineHeight: 'var(--leading-body)',
            fontWeight: 'var(--font-weight-body)',
          } as React.CSSProperties}
        >
          {quote}
        </blockquote>
        <div className="mt-5 pt-4 border-t border-line-subtle">
          <p
            className="text-foreground font-body"
            style={{
              fontSize: 'var(--text-small)',
              fontWeight: 'var(--font-weight-body-semibold)',
            } as React.CSSProperties}
          >
            {testimonial.name}
          </p>
          <p className="mt-0.5 text-faint text-sm font-body">
            {testimonial.role}, {testimonial.company}
          </p>
        </div>
      </div>
    </div>
  )
}

function Testimonials({ testimonials, lang }: TestimonialsProps) {
  const headingText = lang === 'hr' ? 'Što klijenti kažu' : lang === 'de' ? 'Was Kunden sagen' : 'What Clients Say'
  const sourceText = lang === 'hr' ? 'Iz Google Maps recenzija' : lang === 'de' ? 'Aus Google Maps Bewertungen' : 'From Google Maps reviews'

  return (
    <section
      className="relative py-20 md:py-28 lg:py-36 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, var(--color-base) 0%, var(--color-sunken) 30%, var(--color-sunken) 70%, var(--color-base) 100%)',
      }}
    >
      <Container>
        <ScrollReveal direction="up">
          <div className="mb-12 md:mb-16">
            <p
              className="mb-4 uppercase text-brand-red font-body"
              style={{
                fontSize: 'var(--text-overline)',
                fontWeight: 'var(--font-weight-body-semibold)',
                letterSpacing: 'var(--tracking-overline)',
              } as React.CSSProperties}
            >
              {headingText}
            </p>
            <h2
              className="font-heading text-foreground"
              style={{
                fontSize: 'var(--text-h2)',
                fontWeight: 'var(--font-weight-headline)',
                lineHeight: 'var(--leading-tight)',
                letterSpacing: 'var(--tracking-h2)',
              } as React.CSSProperties}
            >
              {lang === 'hr' ? 'Rezultati govore sami za sebe.' : lang === 'de' ? 'Ergebnisse sprechen für sich.' : 'Results speak for themselves.'}
            </h2>
            <p className="mt-3 text-muted text-sm font-body">{sourceText}</p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-6">
          {testimonials.map((t, index) => (
            <ScrollReveal key={t.id} direction="up" delay={index * 0.1}>
              <TestimonialCard testimonial={t} lang={lang} />
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  )
}

export { Testimonials }
export type { TestimonialsProps }
