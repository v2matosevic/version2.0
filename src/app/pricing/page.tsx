import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo'
import { SITE_URL } from '@/lib/seo'
import { BreadcrumbJsonLd } from '@/components/seo/json-ld'
import { PageHero } from '@/components/shared/page-hero'
import { CTASection } from '@/components/shared/cta-section'

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
        subtext="Coming soon. In the meantime, get in touch for a custom quote."
      />
      <CTASection
        heading="Need a quote?"
        subtext="Every project is different. Tell us what you need and we'll put together a transparent proposal."
        ctaLabel="Get in Touch"
        ctaHref="/contact/"
      />
    </main>
  )
}
