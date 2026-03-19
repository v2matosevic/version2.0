import type { Metadata } from 'next'
import { PageHero } from '@/components/shared/page-hero'
import { ContentSection } from '@/components/shared/content-section'
import { CTASection } from '@/components/shared/cta-section'
import { Container } from '@/components/ui/container'
import { buildPageMetadata } from '@/lib/seo'
import { ServiceJsonLd, BreadcrumbJsonLd } from '@/components/seo/json-ld'
import { SITE_URL } from '@/lib/seo'

export const metadata: Metadata = buildPageMetadata({
  title: 'E-Commerce',
  description: 'Maßgeschneiderte E-Commerce-Lösungen. Produktmanagement, Zahlungen, Versand — alles integriert.',
  routeKey: 'services/e-commerce',
})

const FEATURES = [
  { title: 'Produktverwaltung', description: 'Kategorien, Varianten, Preise, Lagerbestand. Ein Backend, das die Verwaltung Hunderter Produkte schmerzlos macht.' },
  { title: 'Zahlungsabwicklung', description: 'Stripe, PayPal, Banküberweisung, Nachnahme. Mehrere Gateways, ein nahtloses Checkout-Erlebnis.' },
  { title: 'Versandintegration', description: 'Echtzeit-Tarife, Labeldruck, Sendungsverfolgung. Angebunden an lokale und internationale Spediteure.' },
  { title: 'Mobile-First Design', description: 'Die meisten Kunden kaufen auf dem Handy. Jede Interaktion ist für Touch und Geschwindigkeit optimiert.' },
  { title: 'Analyse & Reporting', description: 'Umsatz, Konversionsraten, abgebrochene Warenkörbe, beliebte Produkte. Daten, die beim Verkaufen helfen.' },
  { title: 'Mehrsprachigkeit & Währungen', description: 'Verkaufen Sie grenzüberschreitend. Mehrere Sprachen, Währungen und Steuerregeln korrekt verarbeitet.' },
] as const

const PROCESS_STEPS = [
  { step: '01', title: 'Analyse', description: 'Wir analysieren Ihre Produkte, Zielgruppe und Wettbewerber für die richtige E-Commerce-Strategie.' },
  { step: '02', title: 'Design', description: 'Konversionsfokussierte Layouts. Produktseiten, Warenkorb, Checkout — jeder Schritt reibungsarm gestaltet.' },
  { step: '03', title: 'Entwicklung', description: 'Sicher, schnell, getestet. Zahlungsintegrationen verifiziert. Produktimport wo möglich automatisiert.' },
  { step: '04', title: 'Launch', description: 'Go-Live mit Zuversicht. Monitoring, Backup und Post-Launch-Support für die ersten Bestellungen.' },
] as const

export default function DeEcommercePage() {
  return (
    <main id="main-content" className="flex-1">
      <ServiceJsonLd
        name="E-Commerce"
        description="Maßgeschneiderte E-Commerce-Lösungen. Produktmanagement, Zahlungen, Versand — alles integriert."
        url={`${SITE_URL}/de/dienstleistungen/e-commerce/`}
      />
      <BreadcrumbJsonLd items={[
        { name: 'Startseite', url: SITE_URL },
        { name: 'Dienstleistungen', url: `${SITE_URL}/de/dienstleistungen/` },
        { name: 'E-Commerce', url: `${SITE_URL}/de/dienstleistungen/e-commerce/` },
      ]} />
      <PageHero
        overline="E-Commerce"
        headline="Online-Shops, die wirklich verkaufen."
        subtext="Individuelle E-Commerce-Lösungen. Kein WooCommerce-Theme mit Ihrem Logo drauf."
      />

      <ContentSection background="raised" overline="Was Sie Bekommen" heading="End-to-End E-Commerce">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {FEATURES.map((feature) => (
            <div key={feature.title}>
              <div className="mb-4 w-8 h-0.5 bg-brand-red" />
              <h3
                className="font-heading text-foreground"
                style={{ fontSize: 'var(--text-h4)', fontWeight: 'var(--font-weight-headline-bold)' } as React.CSSProperties}
              >
                {feature.title}
              </h3>
              <p className="mt-2 text-muted" style={{ fontSize: 'var(--text-body)', lineHeight: 'var(--leading-body)' }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </ContentSection>

      <section className="py-16 md:py-24 lg:py-32 bg-base">
        <Container>
          <p
            className="mb-3 uppercase text-muted font-body"
            style={{ fontSize: 'var(--text-overline)', fontWeight: 'var(--font-weight-body-semibold)', letterSpacing: 'var(--tracking-overline)' } as React.CSSProperties}
          >
            Wie Wir Arbeiten
          </p>
          <h2
            className="mb-12 font-heading text-foreground"
            style={{ fontSize: 'var(--text-h2)', fontWeight: 'var(--font-weight-headline)', lineHeight: 'var(--leading-tight)', letterSpacing: 'var(--tracking-h2)' } as React.CSSProperties}
          >
            Vom Katalog zum Checkout
          </h2>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
            {PROCESS_STEPS.map((step) => (
              <div key={step.step}>
                <span className="block font-heading text-brand-red" style={{ fontSize: 'var(--text-h3)', fontWeight: 'var(--font-weight-headline)' } as React.CSSProperties}>
                  {step.step}
                </span>
                <h3
                  className="mt-2 font-heading text-foreground"
                  style={{ fontSize: 'var(--text-h4)', fontWeight: 'var(--font-weight-headline-bold)' } as React.CSSProperties}
                >
                  {step.title}
                </h3>
                <p className="mt-2 text-muted" style={{ fontSize: 'var(--text-body)', lineHeight: 'var(--leading-body)' }}>
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
