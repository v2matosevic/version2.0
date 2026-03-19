'use client'

import { useState } from 'react'
import { PageHero } from '@/components/shared/page-hero'
import { ContentSection } from '@/components/shared/content-section'
import { CTASection } from '@/components/shared/cta-section'
import { Container } from '@/components/ui/container'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const ANALYSIS_AREAS = [
  { title: 'Brzina', description: 'Koliko brzo se vaša stranica učitava? Mjerimo stvarne performanse, ne samo laboratorijske rezultate.' },
  { title: 'SEO Zdravlje', description: 'Meta oznake, strukturirani podaci, indeksiranje. Tehnički temelji vidljivosti u pretraživačima.' },
  { title: 'Mobilna Responzivnost', description: 'Kako vaša stranica funkcionira na mobitelima i tabletima? Raspored, dodirne zone, ponašanje viewporta.' },
  { title: 'Sigurnost', description: 'SSL konfiguracija, zaglavlja, ranjivosti. Osnove koje štite vas i vaše korisnike.' },
  { title: 'Korisničko Iskustvo', description: 'Navigacija, čitljivost, pristupačnost, putovi konverzije. Koliko je jednostavno koristiti vašu stranicu?' },
] as const

const DELIVERABLES = [
  'Raščlamba performansi s konkretnim preporukama',
  'SEO audit s prioritetiziranom listom popravaka',
  'Izvještaj o mobilnoj kompatibilnosti',
  'Rezultati sigurnosne provjere',
  'Konkretni sljedeći koraci — rangirani po utjecaju',
] as const

function AnalysisFormHr() {
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
      language: 'hr',
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
        setErrorMessage('Nešto je pošlo po krivu. Pokušajte ponovno.')
      }
    } catch {
      setStatus('error')
      setErrorMessage('Nešto je pošlo po krivu. Pokušajte ponovno.')
    }
  }

  return (
    <>
      <PageHero
        overline="Besplatna Analiza"
        headline="Koliko je dobra vaša web stranica? Reći ćemo vam. Besplatno."
        subtext="Bez prodajnog pitcha. Samo iskrena procjena gdje vaša stranica stoji i što poboljšati."
      />

      <ContentSection background="raised" overline="Što Provjeravamo" heading="5 Područja Koje Analiziramo">
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

      <ContentSection background="base" overline="Isporuka" heading="Što Dobivate">
        <div className="p-6 rounded-xl bg-raised border border-line-subtle max-w-2xl">
          <p
            className="mb-4 text-foreground"
            style={{ fontSize: 'var(--text-body-lg)', lineHeight: 'var(--leading-body)' } as React.CSSProperties}
          >
            Detaljni PDF izvještaj koji pokriva:
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
            Započnite
          </p>
          <h2
            className="mb-12 font-heading text-foreground"
            style={{ fontSize: 'var(--text-h2)', fontWeight: 'var(--font-weight-headline)', lineHeight: 'var(--leading-tight)', letterSpacing: 'var(--tracking-h2)' } as React.CSSProperties}
          >
            Zatražite Besplatnu Analizu
          </h2>

          <form onSubmit={handleSubmit} className="max-w-lg flex flex-col gap-6">
            {status === 'success' && (
              <div className="p-4 rounded-lg bg-green-900/20 border border-green-800/30 text-green-400">
                Zahtjev poslan! Analizu ćemo isporučiti u roku 48 sati.
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

            <Input name="name" label="Ime" required minLength={2} maxLength={100} disabled={status === 'sending'} />
            <Input name="email" type="email" label="Email" required maxLength={254} disabled={status === 'sending'} />
            <Input name="website" type="url" label="URL Web Stranice" placeholder="https://primjer.hr" required disabled={status === 'sending'} />

            <Button type="submit" variant="primary" size="md" loading={status === 'sending'} className="w-full sm:w-auto">
              {status === 'sending' ? 'Šaljem...' : 'Zatražite Besplatnu Analizu'}
            </Button>
          </form>
        </Container>
      </section>

      <CTASection
        heading="Imate veći projekt na umu?"
        subtext="Analiza je odličan početak. Ali ako već znate što trebate, razgovarajmo."
        ctaLabel="Kontaktirajte Nas"
        ctaHref="/hr/kontakt/"
      />
    </>
  )
}

export { AnalysisFormHr }
