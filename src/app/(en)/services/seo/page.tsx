import type { Metadata } from 'next'
import { PageHero } from '@/components/shared/page-hero'
import { ContentSection } from '@/components/shared/content-section'
import { CTASection } from '@/components/shared/cta-section'
import { Container } from '@/components/ui/container'
import { buildPageMetadata } from '@/lib/seo'
import { ServiceJsonLd, BreadcrumbJsonLd } from '@/components/seo/json-ld'
import { SITE_URL } from '@/lib/seo'

export const metadata: Metadata = buildPageMetadata({
  title: 'SEO',
  description: 'Technical SEO built into the foundation. Structured data, Core Web Vitals, crawlability.',
  routeKey: 'services/seo',
})

const FEATURES = [
  { title: 'Technical SEO Audit', description: 'Crawl errors, broken links, duplicate content, indexation issues. We find and fix what search engines complain about.' },
  { title: 'Core Web Vitals', description: 'LCP, FID, CLS — the metrics Google actually measures. We optimize until every score is green.' },
  { title: 'Structured Data', description: 'Schema markup for rich snippets. Your search results stand out with ratings, prices, FAQs, and more.' },
  { title: 'On-Page Optimization', description: 'Title tags, meta descriptions, heading hierarchy, internal linking. The fundamentals done right.' },
  { title: 'Content Strategy', description: 'Keyword research, content gaps, topic clusters. A plan for what to write and why it will rank.' },
  { title: 'Monitoring & Reporting', description: 'Monthly reports with real metrics. Rankings, traffic, conversions — not vanity numbers.' },
] as const

const PROCESS_STEPS = [
  { step: '01', title: 'Discovery', description: 'Full audit of your current site. We identify every technical issue and missed opportunity.' },
  { step: '02', title: 'Design', description: 'Prioritized roadmap. Quick wins first, then structural improvements that compound over time.' },
  { step: '03', title: 'Build', description: 'We implement fixes and optimizations. Technical changes, content updates, and structural improvements.' },
  { step: '04', title: 'Launch', description: 'Ongoing monitoring. SEO is not a one-time fix — we track, adjust, and improve continuously.' },
] as const

export default function SEOPage() {
  return (
    <main id="main-content" className="flex-1">
      <ServiceJsonLd
        name="SEO"
        description="Technical SEO built into the foundation. Structured data, Core Web Vitals, crawlability."
        url={`${SITE_URL}/services/seo/`}
      />
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: SITE_URL },
        { name: 'Services', url: `${SITE_URL}/services/` },
        { name: 'SEO', url: `${SITE_URL}/services/seo/` },
      ]} />
      <PageHero
        overline="SEO"
        headline="Rankings built on real foundations."
        subtext="Technical SEO, content strategy, and performance optimization. No tricks, no shortcuts."
      />

      <ContentSection background="raised" overline="What You Get" heading="Complete SEO Service">
        <div className="grid grid-cols-1 gap-px md:grid-cols-2 rounded-xl overflow-hidden border border-line-subtle">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="group p-8 lg:p-10"
              style={{ background: 'var(--color-base)' }}
            >
              <div
                className="mb-5 w-8 h-0.5 transition-all group-hover:w-12"
                style={{ background: 'var(--color-brand-red)', transitionDuration: 'var(--duration-normal)' }}
              />
              <h3
                className="font-heading text-foreground"
                style={{ fontSize: 'var(--text-h4)', fontWeight: 'var(--font-weight-headline-bold)' } as React.CSSProperties}
              >
                {feature.title}
              </h3>
              <p className="mt-3 text-muted" style={{ fontSize: 'var(--text-body)', lineHeight: 'var(--leading-body)' }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </ContentSection>

      <section
        className="relative py-20 md:py-28 lg:py-36 overflow-hidden"
        style={{ background: 'linear-gradient(180deg, var(--color-base) 0%, var(--color-sunken) 50%, var(--color-base) 100%)' }}
      >
        <Container>
          <p
            className="mb-3 uppercase text-muted font-body"
            style={{ fontSize: 'var(--text-overline)', fontWeight: 'var(--font-weight-body-semibold)', letterSpacing: 'var(--tracking-overline)' } as React.CSSProperties}
          >
            How We Work
          </p>
          <h2
            className="mb-16 font-heading text-foreground"
            style={{ fontSize: 'var(--text-h2)', fontWeight: 'var(--font-weight-headline)', lineHeight: 'var(--leading-tight)', letterSpacing: 'var(--tracking-h2)' } as React.CSSProperties}
          >
            From Audit to Results
          </h2>
          <div className="grid grid-cols-1 gap-0 md:grid-cols-4">
            {PROCESS_STEPS.map((step, index) => (
              <div
                key={step.step}
                className="relative py-8 md:py-0 md:px-6 first:md:pl-0 last:md:pr-0"
                style={{ borderBottom: index < PROCESS_STEPS.length - 1 ? '1px solid var(--color-line-subtle)' : 'none' }}
              >
                {index < PROCESS_STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-0 right-0 w-px h-full" style={{ background: 'var(--color-line-subtle)' }} />
                )}
                <span className="block font-heading text-brand-red mb-3" style={{ fontSize: 'var(--text-overline)', fontWeight: 'var(--font-weight-body-semibold)', letterSpacing: 'var(--tracking-overline)' } as React.CSSProperties}>
                  {step.step}
                </span>
                <h3 className="font-heading text-foreground mb-2" style={{ fontSize: 'var(--text-h4)', fontWeight: 'var(--font-weight-headline-bold)', lineHeight: 'var(--leading-snug)' } as React.CSSProperties}>
                  {step.title}
                </h3>
                <p className="text-muted" style={{ fontSize: 'var(--text-body)', lineHeight: 'var(--leading-body)' }}>
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
