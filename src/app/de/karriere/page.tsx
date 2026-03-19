import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo'
import { SITE_URL } from '@/lib/seo'
import { BreadcrumbJsonLd } from '@/components/seo/json-ld'
import { PageHero } from '@/components/shared/page-hero'
import { ContentSection } from '@/components/shared/content-section'
import { Badge } from '@/components/ui/badge'
import { ContactForm } from '@/components/shared/contact-form'

export const metadata: Metadata = buildPageMetadata({
  title: 'Karriere',
  description: 'Werden Sie Teil von Version2 — wir suchen Entwickler mit Leidenschaft. Offene Stellen ansehen.',
  routeKey: 'career',
})

export default function DeCareerPage() {
  return (
    <main id="main-content" className="flex-1">
      <BreadcrumbJsonLd items={[
        { name: 'Startseite', url: `${SITE_URL}/de/` },
        { name: 'Karriere', url: `${SITE_URL}/de/karriere/` },
      ]} />
      <PageHero
        headline="Wir bauen. Willst du helfen?"
        subtext="Dies ist kein Unternehmens-Jobbord. Wir sind ein kleines Webentwicklungsteam aus Zadar, das alles von Grund auf baut."
      />
      <ContentSection background="raised" heading="Wie es hier ist">
        <p className="text-foreground max-w-2xl" style={{ fontSize: 'var(--text-body-lg)', lineHeight: 'var(--leading-body)' } as React.CSSProperties}>
          Kleines Team. Echte Projekte. Keine Vorlagen. Wir arbeiten Montag bis Freitag, 08:00 bis 16:00.
        </p>
      </ContentSection>
      <ContentSection background="base">
        <Badge>Offene Stelle</Badge>
        <h2 className="mt-4 mb-8 font-heading text-foreground" style={{ fontSize: 'var(--text-h2)', fontWeight: 'var(--font-weight-headline)' } as React.CSSProperties}>
          Junior Developer
        </h2>
        <p className="text-muted max-w-xl" style={{ fontSize: 'var(--text-body)', lineHeight: 'var(--leading-body)' }}>
          Wir suchen jemanden am Anfang seiner Karriere, der in der Webentwicklung gut werden möchte. Ab dem ersten Tag an echten Projekten arbeiten, mit Mentoring.
        </p>
      </ContentSection>
      <ContentSection background="raised" heading="Zeig uns, was du gebaut hast." id="apply">
        <p className="mb-8 text-muted">Überspringe das Anschreiben. Deine Arbeit sagt mehr als ein PDF.</p>
        <ContactForm lang="de" />
      </ContentSection>
    </main>
  )
}
