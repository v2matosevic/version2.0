import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo'
import { SITE_URL } from '@/lib/seo'
import { BreadcrumbJsonLd } from '@/components/seo/json-ld'
import { PageHero } from '@/components/shared/page-hero'
import { WizardShell } from '@/components/pricing'
import { PRICING_CONFIG } from '@/lib/pricing/load-pricing-config'

export const metadata: Metadata = buildPageMetadata({
  title: 'Preise',
  description: 'Transparente Preise fur Webdesign, Entwicklung und KI-Integration.',
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
        subtext="Transparente Schatzungen in weniger als einer Minute. Keine Uberraschungen, keine versteckten Gebuhren."
        minHeight="30vh"
      />
      <WizardShell config={PRICING_CONFIG} />
    </main>
  )
}
