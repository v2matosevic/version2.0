'use client'

import { useState } from 'react'
import { PageHero } from '@/components/shared/page-hero'
import { ContentSection } from '@/components/shared/content-section'
import { CTASection } from '@/components/shared/cta-section'
import { Container } from '@/components/ui/container'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const ANALYSIS_AREAS = [
  { title: 'Geschwindigkeit', description: 'Wie schnell lädt Ihre Seite? Wir messen reale Performance, nicht nur Laborwerte.' },
  { title: 'SEO-Gesundheit', description: 'Meta-Tags, strukturierte Daten, Crawlability, Indexierung. Technische Grundlagen der Suchsichtbarkeit.' },
  { title: 'Mobile Responsivität', description: 'Wie verhält sich Ihre Seite auf Handys und Tablets? Layout, Touch-Ziele, Viewport-Verhalten.' },
  { title: 'Sicherheit', description: 'SSL-Konfiguration, Header, Schwachstellen. Die Basics, die Sie und Ihre Nutzer schützen.' },
  { title: 'Nutzererfahrung', description: 'Navigation, Lesbarkeit, Barrierefreiheit, Konversionspfade. Wie einfach ist Ihre Seite zu benutzen?' },
] as const

const DELIVERABLES = [
  'Performance-Auswertung mit konkreten Empfehlungen',
  'SEO-Audit mit priorisierter Fix-Liste',
  'Mobile-Kompatibilitätsbericht',
  'Ergebnisse der Sicherheitsüberprüfung',
  'Umsetzbare nächste Schritte — nach Wirkung priorisiert',
] as const

function AnalysisFormDe() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('sending')
    setErrorMessage('')

    const formData = new FormData(event.currentTarget)

    const body = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      websiteUrl: formData.get('website') as string,
      _honey: (formData.get('_honey') as string) ?? '',
      type: 'analysis' as const,
      language: 'de',
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
        setErrorMessage('Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.')
      }
    } catch {
      setStatus('error')
      setErrorMessage('Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.')
    }
  }

  return (
    <>
      <PageHero
        overline="Kostenlose Analyse"
        headline="Wie gut ist Ihre Website? Wir sagen es Ihnen. Kostenlos."
        subtext="Kein Verkaufsgespräch. Nur eine ehrliche Bewertung, wo Ihre Seite steht und was zu verbessern ist."
      />

      <ContentSection background="raised" overline="Was Wir Prüfen" heading="5 Bereiche, die Wir Analysieren">
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

      <ContentSection background="base" overline="Lieferung" heading="Was Sie Bekommen">
        <div className="p-6 rounded-xl bg-raised border border-line-subtle max-w-2xl">
          <p
            className="mb-4 text-foreground"
            style={{ fontSize: 'var(--text-body-lg)', lineHeight: 'var(--leading-body)' } as React.CSSProperties}
          >
            Ein detaillierter PDF-Bericht mit:
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
            Loslegen
          </p>
          <h2
            className="mb-12 font-heading text-foreground"
            style={{ fontSize: 'var(--text-h2)', fontWeight: 'var(--font-weight-headline)', lineHeight: 'var(--leading-tight)', letterSpacing: 'var(--tracking-h2)' } as React.CSSProperties}
          >
            Kostenlose Analyse Anfordern
          </h2>

          <form onSubmit={handleSubmit} className="max-w-lg flex flex-col gap-6">
            {status === 'success' && (
              <div className="p-4 rounded-lg bg-green-900/20 border border-green-800/30 text-green-400">
                Anfrage gesendet! Wir liefern Ihre Analyse innerhalb von 48 Stunden.
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
            <Input name="email" type="email" label="E-Mail" required maxLength={254} disabled={status === 'sending'} />
            <Input name="website" type="url" label="Website-URL" placeholder="https://beispiel.de" required disabled={status === 'sending'} />

            <Button type="submit" variant="primary" size="md" loading={status === 'sending'} className="w-full sm:w-auto">
              {status === 'sending' ? 'Wird gesendet...' : 'Kostenlose Analyse Anfordern'}
            </Button>
          </form>
        </Container>
      </section>

      <CTASection
        heading="Haben Sie ein größeres Projekt im Sinn?"
        subtext="Die Analyse ist ein guter Startpunkt. Aber wenn Sie bereits wissen, was Sie brauchen, lassen Sie uns reden."
        ctaLabel="Kontakt Aufnehmen"
        ctaHref="/de/kontakt/"
      />
    </>
  )
}

export { AnalysisFormDe }
