import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHero } from '@/components/shared/page-hero'
import { ContentSection } from '@/components/shared/content-section'
import { CTASection } from '@/components/shared/cta-section'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { buildPageMetadata } from '@/lib/seo'
import { BreadcrumbJsonLd } from '@/components/seo/json-ld'
import { SITE_URL } from '@/lib/seo'

export const metadata: Metadata = buildPageMetadata({
  title: 'Dienstleistungen',
  description: 'Maßgeschneidertes Webdesign, Entwicklung, KI-Integration, E-Commerce und SEO. Alles von Grund auf erstellt.',
  routeKey: 'services',
})

const CORE_SERVICES = [
  { number: '01', title: 'Individuelle Websites', href: '/de/dienstleistungen/web-design/', description: 'Von Grund auf gestaltet. Schnell, responsiv und auf Konversion ausgelegt. Keine Themes, keine Templates — sauberer Code, geformt um Ihre Marke.' },
  { number: '02', title: 'Web-Anwendungen', href: '/de/dienstleistungen/web-anwendungen/', description: 'Dashboards, Portale, interne Tools. Komplexe Frontends mit Echtzeitdaten. Gebaut auf modernen Stacks, die skalieren.' },
  { number: '03', title: 'Online-Shops', href: '/de/dienstleistungen/e-commerce/', description: 'E-Commerce, der funktioniert. Produktverwaltung, Zahlungen, Versand — alles integriert, nichts angeflickt.' },
  { number: '04', title: 'KI-Integration', href: '/de/dienstleistungen/ki-integration/', description: 'Chatbots, Content-Generierung, intelligente Suche. KI, die echte Geschäftsprobleme löst, keine Buzzword-Demos.' },
  { number: '05', title: 'SEO', href: '/de/dienstleistungen/seo/', description: 'Technisches SEO in den Build integriert. Strukturierte Daten, Core Web Vitals, Crawlability — die Grundlagen für Rankings.' },
] as const

const SUPPORTING_SERVICES = [
  { title: 'Digitale Visitenkarten', description: 'NFC-fähige Karten mit eigener Micro-Site. Antippen, teilen, fertig.' },
  { title: '360° Virtuelle Rundgänge', description: 'Interaktive Touren für Hotels, Restaurants und Immobilien. Überall einbettbar.' },
  { title: 'Integrationen', description: 'Zahlungs-Gateways, CRM-Sync, Buchungssysteme, APIs. Wir verbinden, was verbunden werden muss.' },
  { title: 'Wartung', description: 'Updates, Monitoring, Backups, Performance-Tuning. Wir halten alles nach dem Launch am Laufen.' },
] as const

const PROCESS_STEPS = [
  { step: '01', title: 'Analyse', description: 'Wir lernen Ihr Geschäft, Ihre Ziele und Zielgruppe kennen.' },
  { step: '02', title: 'Design', description: 'Wireframes und visuelle Richtung, iterativ mit Ihnen.' },
  { step: '03', title: 'Entwicklung', description: 'Sauberer Code, getestet auf jedem Gerät und Browser.' },
  { step: '04', title: 'Launch', description: 'Bereitgestellt, überwacht und nach dem Launch optimiert.' },
] as const

export default function DeServicesPage() {
  return (
    <main id="main-content" className="flex-1">
      <BreadcrumbJsonLd items={[
        { name: 'Startseite', url: SITE_URL },
        { name: 'Dienstleistungen', url: `${SITE_URL}/de/dienstleistungen/` },
      ]} />
      <PageHero
        overline="Dienstleistungen"
        headline="Alles, was wir bauen, ist maßgeschneidert."
        subtext="Keine Templates. Kein Drag-and-Drop. Jedes Projekt beginnt bei Null."
        minHeight="50vh"
      />

      {CORE_SERVICES.map((service, index) => (
        <section
          key={service.number}
          className={`py-16 md:py-24 lg:py-32 ${index % 2 === 0 ? 'bg-base' : 'bg-raised'}`}
        >
          <Container>
            <div className={`grid grid-cols-1 gap-12 lg:grid-cols-2 items-center ${index % 2 !== 0 ? 'lg:direction-rtl' : ''}`}>
              <div className={index % 2 !== 0 ? 'lg:order-2' : ''}>
                <span
                  className="block mb-4 font-heading text-brand-red"
                  style={{ fontSize: 'var(--text-h2)', fontWeight: 'var(--font-weight-headline)' } as React.CSSProperties}
                >
                  {service.number}
                </span>
                <h2
                  className="font-heading text-foreground"
                  style={{ fontSize: 'var(--text-h2)', fontWeight: 'var(--font-weight-headline)', lineHeight: 'var(--leading-tight)', letterSpacing: 'var(--tracking-h2)' } as React.CSSProperties}
                >
                  {service.title}
                </h2>
                <p
                  className="mt-4 text-muted max-w-lg"
                  style={{ fontSize: 'var(--text-body-lg)', lineHeight: 'var(--leading-body)' } as React.CSSProperties}
                >
                  {service.description}
                </p>
                <div className="mt-8">
                  <Link href={service.href}>
                    <Button variant="secondary" size="md">Mehr Erfahren</Button>
                  </Link>
                </div>
              </div>
              <div className={`rounded-xl bg-sunken border border-line-subtle aspect-[4/3] ${index % 2 !== 0 ? 'lg:order-1' : ''}`} />
            </div>
          </Container>
        </section>
      ))}

      <ContentSection background="raised" overline="Außerdem" heading="Ergänzende Dienste">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          {SUPPORTING_SERVICES.map((service) => (
            <div key={service.title} className="p-6 rounded-xl bg-base border border-line-subtle">
              <div className="mb-4 w-8 h-0.5 bg-brand-red" />
              <h3
                className="font-heading text-foreground"
                style={{ fontSize: 'var(--text-h4)', fontWeight: 'var(--font-weight-headline-bold)' } as React.CSSProperties}
              >
                {service.title}
              </h3>
              <p className="mt-2 text-muted" style={{ fontSize: 'var(--text-body)', lineHeight: 'var(--leading-body)' }}>
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </ContentSection>

      <section className="py-12 md:py-16 lg:py-20 bg-sunken">
        <Container>
          <p
            className="mb-8 uppercase text-muted font-body text-center"
            style={{ fontSize: 'var(--text-overline)', fontWeight: 'var(--font-weight-body-semibold)', letterSpacing: 'var(--tracking-overline)' } as React.CSSProperties}
          >
            Unser Prozess
          </p>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {PROCESS_STEPS.map((step) => (
              <div key={step.step} className="text-center">
                <span className="block font-heading text-brand-red" style={{ fontSize: 'var(--text-h3)', fontWeight: 'var(--font-weight-headline)' } as React.CSSProperties}>
                  {step.step}
                </span>
                <h3
                  className="mt-2 font-heading text-foreground"
                  style={{ fontSize: 'var(--text-h4)', fontWeight: 'var(--font-weight-headline-bold)' } as React.CSSProperties}
                >
                  {step.title}
                </h3>
                <p className="mt-1 text-sm text-muted">{step.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CTASection
        heading="Nicht sicher, wo Sie anfangen sollen?"
        subtext="Fordern Sie eine kostenlose Website-Analyse an und wir zeigen Ihnen die richtige Richtung."
        ctaLabel="Kostenlose Analyse"
        ctaHref="/de/analyse/"
      />
    </main>
  )
}
