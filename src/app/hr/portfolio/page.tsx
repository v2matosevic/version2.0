import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo'
import { SITE_URL } from '@/lib/seo'
import { BreadcrumbJsonLd } from '@/components/seo/json-ld'
import { PageHero } from '@/components/shared/page-hero'
import { CTASection } from '@/components/shared/cta-section'

export const metadata: Metadata = buildPageMetadata({
  title: 'Portfolio',
  description: 'Odabrani radovi Version2. Prilagođene web stranice i web aplikacije.',
  routeKey: 'portfolio',
})

export default function PortfolioHrPage() {
  return (
    <main id="main-content" className="flex-1">
      <BreadcrumbJsonLd items={[
        { name: 'Početna', url: `${SITE_URL}/hr/` },
        { name: 'Portfolio', url: `${SITE_URL}/hr/portfolio/` },
      ]} />
      <PageHero
        headline="Portfolio"
        subtext="Uskoro. Naše studije slučaja se upravo dokumentiraju."
      />
      <CTASection
        heading="Želite vidjeti naš rad?"
        subtext="Rado ćemo vam pokazati naše projekte osobno. Javite nam se i podijelit ćemo relevantne primjere."
        ctaLabel="Kontaktirajte nas"
        ctaHref="/hr/kontakt/"
      />
    </main>
  )
}
