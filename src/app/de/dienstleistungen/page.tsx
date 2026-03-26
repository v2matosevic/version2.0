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
import { ScrollReveal } from '@/components/animations/scroll-reveal'
import { ServiceVisual } from '@/components/services/service-visual'
import type { ServiceSlug } from '@/components/services/service-visual'

export const metadata: Metadata = buildPageMetadata({
  title: 'Dienstleistungen',
  description: 'Maßgeschneidertes Webdesign, Entwicklung, KI-Integration, E-Commerce und SEO. Alles von Grund auf erstellt.',
  routeKey: 'services',
})

const CORE_SERVICES = [
  { number: '01', title: 'Individuelle Websites', href: '/de/dienstleistungen/web-design/', slug: 'web-design' as ServiceSlug, description: 'Von Grund auf gestaltet. Schnell, responsiv und auf Konversion ausgelegt. Keine Themes, keine Templates — sauberer Code, geformt um Ihre Marke.' },
  { number: '02', title: 'Web-Anwendungen', href: '/de/dienstleistungen/web-anwendungen/', slug: 'web-applications' as ServiceSlug, description: 'Dashboards, Portale, interne Tools. Komplexe Frontends mit Echtzeitdaten. Gebaut auf modernen Stacks, die skalieren.' },
  { number: '03', title: 'Online-Shops', href: '/de/dienstleistungen/e-commerce/', slug: 'e-commerce' as ServiceSlug, description: 'E-Commerce, der funktioniert. Produktverwaltung, Zahlungen, Versand — alles integriert, nichts angeflickt.' },
  { number: '04', title: 'KI-Integration', href: '/de/dienstleistungen/ki-integration/', slug: 'ai-integration' as ServiceSlug, description: 'Chatbots, Content-Generierung, intelligente Suche. KI, die echte Geschäftsprobleme löst, keine Buzzword-Demos.' },
  { number: '05', title: 'SEO', href: '/de/dienstleistungen/seo/', slug: 'seo' as ServiceSlug, description: 'Technisches SEO in den Build integriert. Strukturierte Daten, Core Web Vitals, Crawlability — die Grundlagen für Rankings.' },
]

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
        <ScrollReveal key={service.number}>
        <section
          className="relative py-20 md:py-28 lg:py-36 overflow-hidden"
          style={{
            background: index % 2 === 0
              ? 'var(--color-base)'
              : 'linear-gradient(180deg, var(--color-raised) 0%, var(--color-base) 100%)',
          }}
        >
          <Container>
            <div className={`grid grid-cols-1 gap-12 lg:gap-16 lg:grid-cols-2 items-center`}>
              <div className={index % 2 !== 0 ? 'lg:order-2' : ''}>
                {/* Number — large, atmospheric */}
                <span
                  className="block mb-2 font-heading text-brand-red"
                  style={{
                    fontSize: 'var(--text-overline)',
                    fontWeight: 'var(--font-weight-body-semibold)',
                    letterSpacing: 'var(--tracking-overline)',
                  } as React.CSSProperties}
                >
                  {service.number}
                </span>
                <h2
                  className="font-heading text-foreground"
                  style={{
                    fontSize: 'var(--text-h2)',
                    fontWeight: 'var(--font-weight-headline)',
                    lineHeight: 'var(--leading-tight)',
                    letterSpacing: 'var(--tracking-h2)',
                  } as React.CSSProperties}
                >
                  {service.title}
                </h2>
                {/* Red accent bar */}
                <div
                  className="mt-4 mb-5"
                  style={{ width: '40px', height: '2px', background: 'var(--color-brand-red)' }}
                />
                <p
                  className="text-muted max-w-lg"
                  style={{
                    fontSize: 'var(--text-body-lg)',
                    lineHeight: 'var(--leading-body)',
                  } as React.CSSProperties}
                >
                  {service.description}
                </p>
                <div className="mt-8">
                  <Link href={service.href}>
                    <Button variant="secondary" size="md">Mehr Erfahren</Button>
                  </Link>
                </div>
              </div>
              <div className={index % 2 !== 0 ? 'lg:order-1' : ''}>
                <ServiceVisual
                  service={service.slug}
                  number={service.number}
                />
              </div>
            </div>
          </Container>
        </section>
        </ScrollReveal>
      ))}

      <ContentSection background="raised" overline="Außerdem" heading="Ergänzende Dienste">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {SUPPORTING_SERVICES.map((service) => (
            <div
              key={service.title}
              className="group p-8 rounded-xl border border-line-subtle transition-colors hover:border-line"
              style={{
                background: 'linear-gradient(135deg, var(--color-base) 0%, var(--color-sunken) 100%)',
                transitionDuration: 'var(--duration-normal)',
              }}
            >
              <div
                className="mb-5 w-8 h-0.5 transition-all group-hover:w-12"
                style={{
                  background: 'var(--color-brand-red)',
                  transitionDuration: 'var(--duration-normal)',
                }}
              />
              <h3
                className="font-heading text-foreground"
                style={{ fontSize: 'var(--text-h4)', fontWeight: 'var(--font-weight-headline-bold)' } as React.CSSProperties}
              >
                {service.title}
              </h3>
              <p className="mt-3 text-muted" style={{ fontSize: 'var(--text-body)', lineHeight: 'var(--leading-body)' }}>
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </ContentSection>

      <section
        className="relative py-20 md:py-28 lg:py-36 overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, var(--color-sunken) 0%, var(--color-base) 100%)',
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
            backgroundRepeat: 'repeat',
          }}
        />
        <Container>
          <p
            className="mb-3 uppercase text-muted font-body"
            style={{
              fontSize: 'var(--text-overline)',
              fontWeight: 'var(--font-weight-body-semibold)',
              letterSpacing: 'var(--tracking-overline)',
            } as React.CSSProperties}
          >
            Wie Wir Arbeiten
          </p>
          <h2
            className="mb-16 font-heading text-foreground"
            style={{
              fontSize: 'var(--text-h2)',
              fontWeight: 'var(--font-weight-headline)',
              lineHeight: 'var(--leading-tight)',
              letterSpacing: 'var(--tracking-h2)',
            } as React.CSSProperties}
          >
            Vier Schritte. Keine Überraschungen.
          </h2>
          <div className="grid grid-cols-1 gap-0 md:grid-cols-4">
            {PROCESS_STEPS.map((step, index) => (
              <div
                key={step.step}
                className="relative py-8 md:py-0 md:px-6 first:md:pl-0 last:md:pr-0"
                style={{
                  borderBottom: index < PROCESS_STEPS.length - 1 ? '1px solid var(--color-line-subtle)' : 'none',
                }}
              >
                {/* Connector line between steps (desktop) */}
                {index < PROCESS_STEPS.length - 1 && (
                  <div
                    className="hidden md:block absolute top-0 right-0 w-px h-full"
                    style={{ background: 'var(--color-line-subtle)' }}
                  />
                )}
                <span
                  className="block font-heading text-brand-red mb-3"
                  style={{
                    fontSize: 'var(--text-overline)',
                    fontWeight: 'var(--font-weight-body-semibold)',
                    letterSpacing: 'var(--tracking-overline)',
                  } as React.CSSProperties}
                >
                  {step.step}
                </span>
                <h3
                  className="font-heading text-foreground mb-2"
                  style={{
                    fontSize: 'var(--text-h4)',
                    fontWeight: 'var(--font-weight-headline-bold)',
                    lineHeight: 'var(--leading-snug)',
                  } as React.CSSProperties}
                >
                  {step.title}
                </h3>
                <p
                  className="text-muted"
                  style={{
                    fontSize: 'var(--text-body)',
                    lineHeight: 'var(--leading-body)',
                  }}
                >
                  {step.description}
                </p>
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
