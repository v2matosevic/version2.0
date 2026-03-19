import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo'
import { SITE_URL } from '@/lib/seo'
import { BreadcrumbJsonLd } from '@/components/seo/json-ld'
import { PageHero } from '@/components/shared/page-hero'
import { CTASection } from '@/components/shared/cta-section'

export const metadata: Metadata = buildPageMetadata({
  title: 'Preise',
  description: 'Transparente Preise für Webdesign, Entwicklung und KI-Integration.',
  routeKey: 'pricing',
})

export default function PreisePage() {
  return (
    <main id="main-content" className="flex-1">
      <BreadcrumbJsonLd items={[
        { name: 'Startseite', url: `${SITE_URL}/de/` },
        { name: 'Preise', url: `${SITE_URL}/de/preise/` },
      ]} />
      <PageHero
        headline="Preise"
        subtext="Kommt bald. Kontaktieren Sie uns in der Zwischenzeit für ein individuelles Angebot."
      />
      <CTASection
        heading="Brauchen Sie ein Angebot?"
        subtext="Jedes Projekt ist anders. Sagen Sie uns, was Sie brauchen, und wir erstellen ein transparentes Angebot."
        ctaLabel="Kontakt aufnehmen"
        ctaHref="/de/kontakt/"
      />
    </main>
  )
}
