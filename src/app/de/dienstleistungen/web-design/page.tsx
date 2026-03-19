import type { Metadata } from 'next'
import { PageHero } from '@/components/shared/page-hero'
import { ContentSection } from '@/components/shared/content-section'
import { CTASection } from '@/components/shared/cta-section'
import { Container } from '@/components/ui/container'
import { buildPageMetadata } from '@/lib/seo'
import { ServiceJsonLd, BreadcrumbJsonLd } from '@/components/seo/json-ld'
import { SITE_URL } from '@/lib/seo'

export const metadata: Metadata = buildPageMetadata({
  title: 'Web Design',
  description: 'Individuelles Webdesign und Entwicklung. Schnell, responsiv und konversionsorientiert.',
  routeKey: 'services/web-design',
})

const FEATURES = [
  { title: 'Individuelles Design', description: 'Keine Templates. Jedes Layout, jede Interaktion speziell für Ihre Marke und Zielgruppe gestaltet.' },
  { title: 'Responsive Entwicklung', description: 'Pixelgenau auf jeder Bildschirmgröße. Desktop, Tablet, Mobil — auf echten Geräten getestet.' },
  { title: 'Performance First', description: 'Ladezeiten unter einer Sekunde. Optimierte Bilder, effizienter Code und intelligente Caching-Strategien.' },
  { title: 'SEO-Grundlagen', description: 'Semantisches HTML, strukturierte Daten, Meta-Tags und Sitemaps von Tag eins an integriert.' },
  { title: 'CMS-Integration', description: 'Bearbeiten Sie Ihren Content ohne Code. Wir richten Headless-CMS-Lösungen ein, die zu Ihrem Workflow passen.' },
  { title: 'Analytics-Setup', description: 'Wissen Sie, was funktioniert. Wir konfigurieren Tracking, Ziele und Dashboards zur Erfolgsmessung.' },
] as const

const PROCESS_STEPS = [
  { step: '01', title: 'Analyse', description: 'Wir lernen Ihr Geschäft, Ihre Ziele, Wettbewerber und Zielgruppe kennen. Das formt jede folgende Entscheidung.' },
  { step: '02', title: 'Design', description: 'Erst Wireframes, dann High-Fidelity-Visuals. Sie prüfen und iterieren, bis jedes Detail stimmt.' },
  { step: '03', title: 'Entwicklung', description: 'Sauberer, moderner Code. TypeScript, React, Next.js. Geräte- und browserübergreifend getestet.' },
  { step: '04', title: 'Launch', description: 'Auf schneller Infrastruktur bereitgestellt. DNS, SSL, Monitoring — alles erledigt. Post-Launch-Optimierung inklusive.' },
] as const

export default function DeWebDesignPage() {
  return (
    <main id="main-content" className="flex-1">
      <ServiceJsonLd
        name="Web Design"
        description="Individuelles Webdesign und Entwicklung. Schnell, responsiv und konversionsorientiert."
        url={`${SITE_URL}/de/dienstleistungen/web-design/`}
      />
      <BreadcrumbJsonLd items={[
        { name: 'Startseite', url: SITE_URL },
        { name: 'Dienstleistungen', url: `${SITE_URL}/de/dienstleistungen/` },
        { name: 'Web Design', url: `${SITE_URL}/de/dienstleistungen/web-design/` },
      ]} />
      <PageHero
        overline="Web-Design"
        headline="Websites, die nicht aussehen wie alle anderen."
        subtext="Individuelles Design und Entwicklung für Unternehmen, die ihre Online-Präsenz ernst nehmen."
      />

      <ContentSection background="raised" overline="Was Sie Bekommen" heading="Alles Inklusive">
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
            Vom Briefing zum Launch
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
