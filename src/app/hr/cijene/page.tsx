import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo'
import { SITE_URL } from '@/lib/seo'
import { BreadcrumbJsonLd } from '@/components/seo/json-ld'
import { PageHero } from '@/components/shared/page-hero'
import { WizardShell } from '@/components/pricing'
import { PRICING_CONFIG } from '@/lib/pricing/load-pricing-config'

export const metadata: Metadata = buildPageMetadata({
  title: 'Cijene',
  description: 'Transparentne cijene za web dizajn, razvoj i AI integraciju.',
  routeKey: 'pricing',
})

export default function CijenePage() {
  return (
    <main id="main-content" className="flex-1">
      <BreadcrumbJsonLd items={[
        { name: 'Pocetna', url: `${SITE_URL}/hr/` },
        { name: 'Cijene', url: `${SITE_URL}/hr/cijene/` },
      ]} />
      <PageHero
        headline="Cijene"
        subtext="Transparentne procjene u manje od minute. Bez iznenadjenja, bez skrivenih naknada."
        minHeight="30vh"
      />
      <WizardShell config={PRICING_CONFIG} />
    </main>
  )
}
