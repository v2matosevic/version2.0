'use client'

import { useState } from 'react'
import { PageHero } from '@/components/shared/page-hero'
import { ContentSection } from '@/components/shared/content-section'
import { CTASection } from '@/components/shared/cta-section'
import { Container } from '@/components/ui/container'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const ANALYSIS_AREAS = [
  { title: 'Speed', description: 'How fast does your site load? We measure real-world performance, not just lab scores.' },
  { title: 'SEO Health', description: 'Meta tags, structured data, crawlability, indexation. The technical foundations of search visibility.' },
  { title: 'Mobile Responsiveness', description: 'How does your site perform on phones and tablets? Layout, touch targets, viewport behavior.' },
  { title: 'Security', description: 'SSL configuration, headers, vulnerabilities. The basics that protect you and your users.' },
  { title: 'User Experience', description: 'Navigation, readability, accessibility, conversion paths. How easy is it to actually use your site?' },
] as const

const DELIVERABLES = [
  'Performance score breakdown with specific recommendations',
  'SEO audit with prioritized fix list',
  'Mobile compatibility report',
  'Security checklist results',
  'Actionable next steps — ranked by impact',
] as const

function AnalysisForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('sending')
    setErrorMessage('')

    const formData = new FormData(event.currentTarget)
    const honeypot = formData.get('_honey')
    if (honeypot) return

    const body = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      website: formData.get('website') as string,
      type: 'analysis',
      language: 'en',
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (response.ok) {
        setStatus('success')
        ;(event.target as HTMLFormElement).reset()
      } else {
        setStatus('error')
        setErrorMessage('Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setErrorMessage('Something went wrong. Please try again.')
    }
  }

  return (
    <>
      <PageHero
        overline="Free Analysis"
        headline="How good is your website? We'll tell you. For free."
        subtext="No sales pitch. Just an honest assessment of where your site stands and what to improve."
      />

      <ContentSection background="raised" overline="What We Check" heading="5 Areas We Analyze">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {ANALYSIS_AREAS.map((area, index) => (
            <div key={area.title} className={index === 4 ? 'md:col-span-2 lg:col-span-1' : ''}>
              <div className="mb-4 w-8 h-0.5 bg-brand-red" />
              <h3
                className="font-heading text-foreground"
                style={{ fontSize: 'var(--text-h4)', fontWeight: 'var(--font-weight-headline-bold)' } as React.CSSProperties}
              >
                {area.title}
              </h3>
              <p className="mt-2 text-muted" style={{ fontSize: 'var(--text-body)', lineHeight: 'var(--leading-body)' }}>
                {area.description}
              </p>
            </div>
          ))}
        </div>
      </ContentSection>

      <ContentSection background="base" overline="Deliverable" heading="What You Get">
        <div className="p-6 rounded-xl bg-raised border border-line-subtle max-w-2xl">
          <p
            className="mb-4 text-foreground"
            style={{ fontSize: 'var(--text-body-lg)', lineHeight: 'var(--leading-body)' } as React.CSSProperties}
          >
            A detailed PDF report covering:
          </p>
          <ul className="flex flex-col gap-3">
            {DELIVERABLES.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-1.5 block w-1.5 h-1.5 rounded-full bg-brand-red shrink-0" />
                <span className="text-muted" style={{ fontSize: 'var(--text-body)', lineHeight: 'var(--leading-body)' }}>
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </ContentSection>

      <section className="py-16 md:py-24 lg:py-32 bg-raised" id="analysis-form">
        <Container>
          <p
            className="mb-3 uppercase text-muted font-body"
            style={{ fontSize: 'var(--text-overline)', fontWeight: 'var(--font-weight-body-semibold)', letterSpacing: 'var(--tracking-overline)' } as React.CSSProperties}
          >
            Get Started
          </p>
          <h2
            className="mb-12 font-heading text-foreground"
            style={{ fontSize: 'var(--text-h2)', fontWeight: 'var(--font-weight-headline)', lineHeight: 'var(--leading-tight)', letterSpacing: 'var(--tracking-h2)' } as React.CSSProperties}
          >
            Request Your Free Analysis
          </h2>

          <form onSubmit={handleSubmit} className="max-w-lg flex flex-col gap-6">
            {status === 'success' && (
              <div className="p-4 rounded-lg bg-green-900/20 border border-green-800/30 text-green-400">
                Request sent! We&apos;ll deliver your analysis within 48 hours.
              </div>
            )}
            {status === 'error' && (
              <div className="p-4 rounded-lg bg-red-900/20 border border-red-800/30 text-red-400">
                {errorMessage}
              </div>
            )}

            <div className="absolute left-[-9999px] opacity-0 h-0 pointer-events-none" aria-hidden="true">
              <input type="text" name="_honey" tabIndex={-1} autoComplete="off" />
            </div>

            <Input name="name" label="Name" required minLength={2} maxLength={100} disabled={status === 'sending'} />
            <Input name="email" type="email" label="Email" required maxLength={254} disabled={status === 'sending'} />
            <Input name="website" type="url" label="Website URL" placeholder="https://example.com" required disabled={status === 'sending'} />

            <Button type="submit" variant="primary" size="md" loading={status === 'sending'} className="w-full sm:w-auto">
              {status === 'sending' ? 'Sending...' : 'Request Free Analysis'}
            </Button>
          </form>
        </Container>
      </section>

      <CTASection
        heading="Have a bigger project in mind?"
        subtext="The analysis is a great starting point. But if you already know what you need, let's talk."
        ctaLabel="Get in Touch"
        ctaHref="/contact/"
      />
    </>
  )
}

export { AnalysisForm }
