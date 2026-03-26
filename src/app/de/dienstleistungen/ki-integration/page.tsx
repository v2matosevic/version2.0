import type { Metadata } from 'next'
import { PageHero } from '@/components/shared/page-hero'
import { ContentSection } from '@/components/shared/content-section'
import { CTASection } from '@/components/shared/cta-section'
import { Container } from '@/components/ui/container'
import { buildPageMetadata } from '@/lib/seo'
import { ServiceJsonLd, BreadcrumbJsonLd } from '@/components/seo/json-ld'
import { SITE_URL } from '@/lib/seo'

export const metadata: Metadata = buildPageMetadata({
  title: 'KI-Integration',
  description: 'KI-Chatbots, Content-Generierung, intelligente Suche. KI, die echte Geschäftsprobleme löst.',
  routeKey: 'services/ai-integration',
})

const FEATURES = [
  { title: 'KI-Chatbots', description: 'Kundensupport rund um die Uhr. Trainiert auf Ihren Daten, eingebettet in Ihre Website, beantwortet echte Fragen.' },
  { title: 'Content-Generierung', description: 'Produktbeschreibungen, Blog-Entwürfe, E-Mail-Texte. KI-gestützte Schreibpipelines, die Stunden pro Woche sparen.' },
  { title: 'Intelligente Suche', description: 'Semantische Suche, die Absicht versteht, nicht nur Schlüsselwörter. Ihre Nutzer finden schneller, was sie brauchen.' },
  { title: 'Datenanalyse', description: 'Erkenntnisse aus Dokumenten, Tabellen und Datenbanken gewinnen. Unstrukturierte Daten in verwertbare Berichte verwandeln.' },
  { title: 'Prozessautomatisierung', description: 'E-Mails klassifizieren, Tickets routen, Rechnungsdaten extrahieren. Repetitive Aufgaben von KI erledigt, von Menschen geprüft.' },
  { title: 'Maßgeschneiderte KI-Tools', description: 'Spezifisch für Ihre Branche und Ihren Workflow. Wir bauen KI-Lösungen für Ihre Probleme, nicht generische.' },
] as const

const PROCESS_STEPS = [
  { step: '01', title: 'Analyse', description: 'Wir identifizieren, wo KI tatsächlich Zeit oder Geld spart. Kein Hype — nur praktische Chancen.' },
  { step: '02', title: 'Design', description: 'Architektur und Datenfluss. Wir planen die Integration, wählen die richtigen Modelle und definieren Erfolgskriterien.' },
  { step: '03', title: 'Entwicklung', description: 'Iterative Entwicklung mit echten Daten. Wir testen Genauigkeit, Latenz und Grenzfälle vor dem Go-Live.' },
  { step: '04', title: 'Launch', description: 'Bereitgestellt mit Monitoring und Feedback-Schleifen. KI verbessert sich über die Zeit mit echten Nutzungsdaten.' },
] as const

export default function DeAIIntegrationPage() {
  return (
    <main id="main-content" className="flex-1">
      <ServiceJsonLd
        name="KI-Integration"
        description="KI-Chatbots, Content-Generierung, intelligente Suche. KI, die echte Geschäftsprobleme löst."
        url={`${SITE_URL}/de/dienstleistungen/ki-integration/`}
      />
      <BreadcrumbJsonLd items={[
        { name: 'Startseite', url: SITE_URL },
        { name: 'Dienstleistungen', url: `${SITE_URL}/de/dienstleistungen/` },
        { name: 'KI-Integration', url: `${SITE_URL}/de/dienstleistungen/ki-integration/` },
      ]} />
      <PageHero
        overline="KI-Integration"
        headline="KI, die echte Probleme löst."
        subtext="Keine Chatbot-Demo. Echte KI-Integration in Ihren Geschäftsprozess."
      />

      <ContentSection background="raised" overline="Was Sie Bekommen" heading="Praktische KI-Lösungen">
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
            Vom Konzept zur Integration
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
