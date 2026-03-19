import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo'
import { SITE_URL } from '@/lib/seo'
import { BreadcrumbJsonLd } from '@/components/seo/json-ld'
import { PageHero } from '@/components/shared/page-hero'
import { CTASection } from '@/components/shared/cta-section'

export const metadata: Metadata = buildPageMetadata({
  title: 'Portfolio',
  description: 'Selected work by Version2. Custom websites, web apps, and AI-powered tools.',
  routeKey: 'portfolio',
})

export default function PortfolioPage() {
  return (
    <main id="main-content" className="flex-1">
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: SITE_URL },
        { name: 'Portfolio', url: `${SITE_URL}/portfolio/` },
      ]} />
      <PageHero
        headline="Portfolio"
        subtext="Coming soon. Our case studies are being documented."
      />
      <CTASection
        heading="Want to see our work?"
        subtext="We'd love to walk you through our projects in person. Reach out and we'll share relevant examples."
        ctaLabel="Get in Touch"
        ctaHref="/contact/"
      />
    </main>
  )
}
