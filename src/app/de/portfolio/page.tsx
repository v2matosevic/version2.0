import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo'
import { SITE_URL } from '@/lib/seo'
import { BreadcrumbJsonLd } from '@/components/seo/json-ld'
import { PageHero } from '@/components/shared/page-hero'
import { CTASection } from '@/components/shared/cta-section'

export const metadata: Metadata = buildPageMetadata({
  title: 'Portfolio',
  description: 'Ausgewählte Arbeiten von Version2. Maßgeschneiderte Websites und Webanwendungen.',
  routeKey: 'portfolio',
})

export default function PortfolioDePage() {
  return (
    <main id="main-content" className="flex-1">
      <BreadcrumbJsonLd items={[
        { name: 'Startseite', url: `${SITE_URL}/de/` },
        { name: 'Portfolio', url: `${SITE_URL}/de/portfolio/` },
      ]} />
      <PageHero
        headline="Portfolio"
        subtext="Kommt bald. Unsere Fallstudien werden gerade dokumentiert."
      />
      <CTASection
        heading="Möchten Sie unsere Arbeit sehen?"
        subtext="Wir zeigen Ihnen gerne unsere Projekte persönlich. Kontaktieren Sie uns und wir teilen relevante Beispiele."
        ctaLabel="Kontakt aufnehmen"
        ctaHref="/de/kontakt/"
      />
    </main>
  )
}
