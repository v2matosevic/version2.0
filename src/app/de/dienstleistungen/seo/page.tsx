import type { Metadata } from 'next'
import { PageHero } from '@/components/shared/page-hero'
import { ContentSection } from '@/components/shared/content-section'
import { CTASection } from '@/components/shared/cta-section'
import { Container } from '@/components/ui/container'
import { buildPageMetadata } from '@/lib/seo'
import { ServiceJsonLd, BreadcrumbJsonLd } from '@/components/seo/json-ld'
import { SITE_URL } from '@/lib/seo'

export const metadata: Metadata = buildPageMetadata({
  title: 'SEO',
  description: 'Technisches SEO in das Fundament eingebaut. Strukturierte Daten, Core Web Vitals, Indexierung.',
  routeKey: 'services/seo',
})

const FEATURES = [
  { title: 'Technisches SEO-Audit', description: 'Crawl-Fehler, defekte Links, doppelter Content, Indexierungsprobleme. Wir finden und beheben alles.' },
  { title: 'Core Web Vitals', description: 'LCP, FID, CLS — die Metriken, die Google tatsächlich misst. Wir optimieren, bis jeder Wert grün ist.' },
  { title: 'Strukturierte Daten', description: 'Schema-Markup für Rich Snippets. Ihre Suchergebnisse stechen hervor mit Bewertungen, Preisen, FAQs.' },
  { title: 'On-Page-Optimierung', description: 'Title-Tags, Meta-Beschreibungen, Überschriftenhierarchie, interne Verlinkung. Die Grundlagen richtig gemacht.' },
  { title: 'Content-Strategie', description: 'Keyword-Recherche, Content-Lücken, Themencluster. Ein Plan für Inhalte und warum sie ranken werden.' },
  { title: 'Monitoring & Reporting', description: 'Monatliche Berichte mit echten Metriken. Rankings, Traffic, Konversionen — keine Eitelkeitszahlen.' },
] as const

const PROCESS_STEPS = [
  { step: '01', title: 'Analyse', description: 'Vollständiges Audit Ihrer aktuellen Website. Wir identifizieren jedes technische Problem und jede verpasste Chance.' },
  { step: '02', title: 'Design', description: 'Priorisierte Roadmap. Schnelle Gewinne zuerst, dann strukturelle Verbesserungen mit Zinseszins-Effekt.' },
  { step: '03', title: 'Entwicklung', description: 'Wir implementieren Fixes und Optimierungen. Technische Änderungen, Content-Updates und strukturelle Verbesserungen.' },
  { step: '04', title: 'Launch', description: 'Fortlaufendes Monitoring. SEO ist kein einmaliger Fix — wir verfolgen, passen an und verbessern kontinuierlich.' },
] as const

export default function DeSEOPage() {
  return (
    <main id="main-content" className="flex-1">
      <ServiceJsonLd
        name="SEO"
        description="Technisches SEO in das Fundament eingebaut. Strukturierte Daten, Core Web Vitals, Indexierung."
        url={`${SITE_URL}/de/dienstleistungen/seo/`}
      />
      <BreadcrumbJsonLd items={[
        { name: 'Startseite', url: SITE_URL },
        { name: 'Dienstleistungen', url: `${SITE_URL}/de/dienstleistungen/` },
        { name: 'SEO', url: `${SITE_URL}/de/dienstleistungen/seo/` },
      ]} />
      <PageHero
        overline="SEO"
        headline="Rankings auf echten Fundamenten gebaut."
        subtext="Technisches SEO, Content-Strategie und Performance-Optimierung. Keine Tricks, keine Abkürzungen."
      />

      <ContentSection background="raised" overline="Was Sie Bekommen" heading="Kompletter SEO-Service">
        <div className="grid grid-cols-1 gap-px md:grid-cols-2 rounded-xl overflow-hidden border border-line-subtle">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="group p-8 lg:p-10"
              style={{ background: 'var(--color-base)' }}
            >
              <div
                className="mb-5 w-8 h-0.5 transition-all group-hover:w-12"
                style={{ background: 'var(--color-brand-red)', transitionDuration: 'var(--duration-normal)' }}
              />
              <h3
                className="font-heading text-foreground"
                style={{ fontSize: 'var(--text-h4)', fontWeight: 'var(--font-weight-headline-bold)' } as React.CSSProperties}
              >
                {feature.title}
              </h3>
              <p className="mt-3 text-muted" style={{ fontSize: 'var(--text-body)', lineHeight: 'var(--leading-body)' }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </ContentSection>

      <section
        className="relative py-20 md:py-28 lg:py-36 overflow-hidden"
        style={{ background: 'linear-gradient(180deg, var(--color-base) 0%, var(--color-sunken) 50%, var(--color-base) 100%)' }}
      >
        <Container>
          <p
            className="mb-3 uppercase text-muted font-body"
            style={{ fontSize: 'var(--text-overline)', fontWeight: 'var(--font-weight-body-semibold)', letterSpacing: 'var(--tracking-overline)' } as React.CSSProperties}
          >
            Wie Wir Arbeiten
          </p>
          <h2
            className="mb-16 font-heading text-foreground"
            style={{ fontSize: 'var(--text-h2)', fontWeight: 'var(--font-weight-headline)', lineHeight: 'var(--leading-tight)', letterSpacing: 'var(--tracking-h2)' } as React.CSSProperties}
          >
            Vom Audit zu Ergebnissen
          </h2>
          <div className="grid grid-cols-1 gap-0 md:grid-cols-4">
            {PROCESS_STEPS.map((step, index) => (
              <div
                key={step.step}
                className="relative py-8 md:py-0 md:px-6 first:md:pl-0 last:md:pr-0"
                style={{ borderBottom: index < PROCESS_STEPS.length - 1 ? '1px solid var(--color-line-subtle)' : 'none' }}
              >
                {index < PROCESS_STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-0 right-0 w-px h-full" style={{ background: 'var(--color-line-subtle)' }} />
                )}
                <span
                  className="block font-heading text-brand-red mb-3"
                  style={{ fontSize: 'var(--text-overline)', fontWeight: 'var(--font-weight-body-semibold)', letterSpacing: 'var(--tracking-overline)' } as React.CSSProperties}
                >
                  {step.step}
                </span>
                <h3
                  className="font-heading text-foreground mb-2"
                  style={{ fontSize: 'var(--text-h4)', fontWeight: 'var(--font-weight-headline-bold)', lineHeight: 'var(--leading-snug)' } as React.CSSProperties}
                >
                  {step.title}
                </h3>
                <p className="text-muted" style={{ fontSize: 'var(--text-body)', lineHeight: 'var(--leading-body)' }}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CTASection
        heading="Bereit loszulegen?"
        subtext="Erzählen Sie uns von Ihrem Projekt. Wir melden uns innerhalb von 24 Stunden."
        ctaLabel="Kontakt Aufnehmen"
        ctaHref="/de/kontakt/"
      />
    </main>
  )
}
