import type { Metadata } from 'next'
import { PageHero } from '@/components/shared/page-hero'
import { ContentSection } from '@/components/shared/content-section'
import { CTASection } from '@/components/shared/cta-section'
import { Container } from '@/components/ui/container'
import { buildPageMetadata } from '@/lib/seo'
import { ServiceJsonLd, BreadcrumbJsonLd } from '@/components/seo/json-ld'
import { SITE_URL } from '@/lib/seo'

export const metadata: Metadata = buildPageMetadata({
  title: 'E-Commerce',
  description: 'Custom e-commerce solutions. Product management, payments, shipping — everything integrated.',
  routeKey: 'services/e-commerce',
})

const FEATURES = [
  { title: 'Product Management', description: 'Categories, variants, pricing, inventory. A backend that makes managing hundreds of products painless.' },
  { title: 'Payment Processing', description: 'Stripe, PayPal, bank transfers, cash on delivery. Multiple gateways, one seamless checkout experience.' },
  { title: 'Shipping Integration', description: 'Real-time rates, label printing, tracking. Connected to local and international carriers.' },
  { title: 'Mobile-First Design', description: 'Most of your customers shop on their phones. Every interaction is optimized for touch and speed.' },
  { title: 'Analytics & Reporting', description: 'Revenue, conversion rates, abandoned carts, popular products. Data that helps you sell more.' },
  { title: 'Multi-Currency & i18n', description: 'Sell across borders. Multiple languages, currencies, and tax rules handled correctly.' },
] as const

const PROCESS_STEPS = [
  { step: '01', title: 'Discovery', description: 'We analyze your products, audience, and competitors to define the right e-commerce strategy.' },
  { step: '02', title: 'Design', description: 'Conversion-focused layouts. Product pages, cart, checkout — every step designed to reduce friction.' },
  { step: '03', title: 'Build', description: 'Secure, fast, tested. Payment integrations verified. Product import automated where possible.' },
  { step: '04', title: 'Launch', description: 'Go live with confidence. Monitoring, backup, and post-launch support to handle the first wave of orders.' },
] as const

export default function EcommercePage() {
  return (
    <main id="main-content" className="flex-1">
      <ServiceJsonLd
        name="E-Commerce"
        description="Custom e-commerce solutions. Product management, payments, shipping — everything integrated."
        url={`${SITE_URL}/services/e-commerce/`}
      />
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: SITE_URL },
        { name: 'Services', url: `${SITE_URL}/services/` },
        { name: 'E-Commerce', url: `${SITE_URL}/services/e-commerce/` },
      ]} />
      <PageHero
        overline="E-Commerce"
        headline="Online stores that actually sell."
        subtext="Custom e-commerce solutions. Not a WooCommerce theme with your logo slapped on."
      />

      <ContentSection background="raised" overline="What You Get" heading="End-to-End E-Commerce">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {FEATURES.map((feature) => (
            <div key={feature.title}>
              <div className="mb-4 w-8 h-0.5 bg-brand-red" />
              <h3
                className="font-heading text-foreground"
                style={{ fontSize: 'var(--text-h4)', fontWeight: 'var(--font-weight-headline-bold)' } as React.CSSProperties}
              >
                {feature.title}
              </h3>
              <p className="mt-2 text-muted" style={{ fontSize: 'var(--text-body)', lineHeight: 'var(--leading-body)' }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </ContentSection>

      <section className="py-16 md:py-24 lg:py-32 bg-base">
        <Container>
          <p
            className="mb-3 uppercase text-muted font-body"
            style={{ fontSize: 'var(--text-overline)', fontWeight: 'var(--font-weight-body-semibold)', letterSpacing: 'var(--tracking-overline)' } as React.CSSProperties}
          >
            How We Work
          </p>
          <h2
            className="mb-12 font-heading text-foreground"
            style={{ fontSize: 'var(--text-h2)', fontWeight: 'var(--font-weight-headline)', lineHeight: 'var(--leading-tight)', letterSpacing: 'var(--tracking-h2)' } as React.CSSProperties}
          >
            From Catalog to Checkout
          </h2>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
            {PROCESS_STEPS.map((step) => (
              <div key={step.step}>
                <span className="block font-heading text-brand-red" style={{ fontSize: 'var(--text-h3)', fontWeight: 'var(--font-weight-headline)' } as React.CSSProperties}>
                  {step.step}
                </span>
                <h3
                  className="mt-2 font-heading text-foreground"
                  style={{ fontSize: 'var(--text-h4)', fontWeight: 'var(--font-weight-headline-bold)' } as React.CSSProperties}
                >
                  {step.title}
                </h3>
                <p className="mt-2 text-muted" style={{ fontSize: 'var(--text-body)', lineHeight: 'var(--leading-body)' }}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CTASection
        heading="Ready to start?"
        subtext="Tell us about your project. We'll get back to you within 24 hours."
        ctaLabel="Get in Touch"
        ctaHref="/contact/"
      />
    </main>
  )
}
