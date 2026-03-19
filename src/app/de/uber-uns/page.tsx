import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo'
import { SITE_URL } from '@/lib/seo'
import { JsonLd, BreadcrumbJsonLd } from '@/components/seo/json-ld'
import { PageHero } from '@/components/shared/page-hero'
import { ContentSection } from '@/components/shared/content-section'
import { CTASection } from '@/components/shared/cta-section'

export const metadata: Metadata = buildPageMetadata({
  title: 'Über uns',
  description: 'Erfahren Sie mehr über Version2 — ein Web-Design- und Entwicklungsstudio mit Sitz in Zadar, Kroatien. Wir erstellen maßgeschneiderte Websites und KI-Tools.',
  routeKey: 'about',
})

export default function DeAboutPage() {
  return (
    <main id="main-content" className="flex-1">
      <BreadcrumbJsonLd items={[
        { name: 'Startseite', url: `${SITE_URL}/de/` },
        { name: 'Über uns', url: `${SITE_URL}/de/uber-uns/` },
      ]} />
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: 'Über uns — Version2',
        description: 'Erfahren Sie mehr über Version2 — ein Web-Design- und Entwicklungsstudio mit Sitz in Zadar, Kroatien.',
        url: `${SITE_URL}/de/uber-uns/`,
        mainEntity: { '@id': `${SITE_URL}/#business` },
      }} />
      <PageHero headline="Wir sind Version2. Wir schreiben Code." minHeight="50vh" />
      <ContentSection background="base">
        <p className="text-foreground max-w-xl" style={{ fontSize: 'var(--text-body-lg)', lineHeight: 'var(--leading-body)' } as React.CSSProperties}>
          Wir haben im September 2022 in Zadar, Kroatien angefangen. Ein kleines Team, das Dinge für das Web baut. Jetzt machen wir nur noch das, was wir am besten können: Code schreiben und Projekte ausliefern. Über 100 bisher.
        </p>
      </ContentSection>
      <CTASection
        heading="Möchten Sie sehen, ob wir passen?"
        subtext="Lassen Sie uns ein Gespräch beginnen. Keine Pitch Decks. Keine Verkaufsgespräche."
        ctaLabel="Kontakt aufnehmen"
        ctaHref="/de/kontakt/"
      />
    </main>
  )
}
