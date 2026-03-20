import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo'
import { SITE_URL } from '@/lib/seo'
import { BreadcrumbJsonLd } from '@/components/seo/json-ld'
import { PageHero } from '@/components/shared/page-hero'
import { WizardShell } from '@/components/pricing'
import { PRICING_CONFIG } from '@/lib/pricing/load-pricing-config'

export const metadata: Metadata = buildPageMetadata({
  title: 'Pricing',
  description: 'Transparent pricing for web design, development, and AI integration. Get an instant estimate.',
  routeKey: 'pricing',
})

export default function PricingPage() {
  return (
    <main id="main-content" className="flex-1">
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: SITE_URL },
        { name: 'Pricing', url: `${SITE_URL}/pricing/` },
      ]} />
      <PageHero
        headline="Pricing"
        subtext="Transparent estimates in under a minute. No surprises, no hidden fees."
        minHeight="30vh"
      />
      <WizardShell config={PRICING_CONFIG} />
    </main>
  )
}
