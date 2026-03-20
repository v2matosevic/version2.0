import { Container } from '@/components/ui/container'
import type { Testimonial } from '@/types/testimonial'
import type { Language } from '@/types/i18n'

type TestimonialsProps = {
  testimonials: Testimonial[]
  lang: Language
}

function TestimonialCard({ testimonial, lang }: { testimonial: Testimonial; lang: Language }) {
  const quote = testimonial.quote[lang] ?? testimonial.quote.en

  return (
    <div className="relative border-l-2 border-brand-red pl-6">
      <span
        className="absolute top-[-10px] left-1 pointer-events-none font-heading text-brand-red select-none"
        style={{
          fontSize: '5rem',
          opacity: 0.15,
          fontWeight: 'var(--font-weight-headline-bold)',
        } as React.CSSProperties}
        aria-hidden="true"
      >
        &ldquo;
      </span>
      <blockquote
        className="text-foreground italic"
        style={{
          fontSize: 'var(--text-body-lg)',
          lineHeight: 'var(--leading-body)',
        } as React.CSSProperties}
      >
        {quote}
      </blockquote>
      <p
        className="mt-4 text-foreground"
        style={{
          fontSize: 'var(--text-body)',
          fontWeight: 'var(--font-weight-body-semibold)',
        } as React.CSSProperties}
      >
        {testimonial.name}
      </p>
      <p className="mt-0.5 text-muted text-sm">
        {testimonial.role}, {testimonial.company}
      </p>
    </div>
  )
}

function Testimonials({ testimonials, lang }: TestimonialsProps) {
  return (
    <section className="py-16 md:py-24 lg:py-32 bg-base">
      <Container>
        <h2
          className="mb-12 text-center uppercase text-muted font-body"
          style={{
            fontSize: 'var(--text-overline)',
            fontWeight: 'var(--font-weight-body-semibold)',
            letterSpacing: 'var(--tracking-overline)',
          } as React.CSSProperties}
        >
          {lang === 'hr' ? 'Što klijenti kažu' : lang === 'de' ? 'Was Kunden sagen' : 'What Clients Say'}
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {testimonials.map((t) => (
            <TestimonialCard key={t.id} testimonial={t} lang={lang} />
          ))}
        </div>
      </Container>
    </section>
  )
}

export { Testimonials }
export type { TestimonialsProps }
