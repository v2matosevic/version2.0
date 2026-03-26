import type { Metadata } from 'next'
import { PageHero } from '@/components/shared/page-hero'
import { ContentSection } from '@/components/shared/content-section'
import { CTASection } from '@/components/shared/cta-section'
import { Container } from '@/components/ui/container'
import { buildPageMetadata } from '@/lib/seo'
import { ServiceJsonLd, BreadcrumbJsonLd } from '@/components/seo/json-ld'
import { SITE_URL } from '@/lib/seo'

export const metadata: Metadata = buildPageMetadata({
  title: 'Web-Anwendungen',
  description: 'Maßgeschneiderte Webanwendungen — Dashboards, Portale, interne Tools.',
  routeKey: 'services/web-applications',
})

const FEATURES = [
  { title: 'Individuelle Dashboards', description: 'Echtzeit-Datenvisualisierung, Benutzerverwaltung und Admin-Panels für Ihren spezifischen Workflow.' },
  { title: 'Kundenportale', description: 'Sichere Login-Bereiche, in denen Ihre Kunden Bestellungen, Dokumente, Rechnungen und Projektstatus einsehen.' },
  { title: 'Interne Tools', description: 'Ersetzen Sie Tabellen durch zweckgebundene Tools. Lagerverwaltung, CRM, Planung — was Ihr Team braucht.' },
  { title: 'Echtzeit-Funktionen', description: 'Live-Updates, Benachrichtigungen, Chat, kollaboratives Bearbeiten. WebSocket-gestützt, wenn Millisekunden zählen.' },
  { title: 'API-Entwicklung', description: 'REST- oder GraphQL-APIs, die Ihre App mit Drittdiensten, mobilen Apps oder anderen Systemen verbinden.' },
  { title: 'Authentifizierung & Sicherheit', description: 'Rollenbasierter Zugriff, Zwei-Faktor-Auth, verschlüsselte Daten. Sicherheit ist Architektur, kein Nachgedanke.' },
] as const

const PROCESS_STEPS = [
  { step: '01', title: 'Analyse', description: 'Wir kartieren Ihre Workflows, identifizieren Engpässe und definieren, was die Anwendung lösen muss.' },
  { step: '02', title: 'Design', description: 'Wireframes und Prototypen. Wir validieren die UX, bevor eine Zeile Produktionscode geschrieben wird.' },
  { step: '03', title: 'Entwicklung', description: 'Iterative Entwicklung in Sprints. Sie sehen funktionierende Features alle zwei Wochen.' },
  { step: '04', title: 'Launch', description: 'Stufenweise Bereitstellung, Monitoring und eine Übergabe mit Dokumentation und Schulung.' },
] as const

export default function DeWebApplicationsPage() {
  return (
    <main id="main-content" className="flex-1">
      <ServiceJsonLd
        name="Web-Anwendungen"
        description="Maßgeschneiderte Webanwendungen — Dashboards, Portale, interne Tools."
        url={`${SITE_URL}/de/dienstleistungen/web-anwendungen/`}
      />
      <BreadcrumbJsonLd items={[
        { name: 'Startseite', url: SITE_URL },
        { name: 'Dienstleistungen', url: `${SITE_URL}/de/dienstleistungen/` },
        { name: 'Web-Anwendungen', url: `${SITE_URL}/de/dienstleistungen/web-anwendungen/` },
      ]} />
      <PageHero
        overline="Web-Anwendungen"
        headline="Software, die um Ihren Workflow gebaut ist."
        subtext="Dashboards, Portale und interne Tools. Komplexe Probleme mit klaren Interfaces gelöst."
      />

      <ContentSection background="raised" overline="Was Sie Bekommen" heading="Für Ihr Geschäft Gebaut">
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
            Von der Idee zur Produktion
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
