import type { Metadata } from 'next'
import { PageHero } from '@/components/shared/page-hero'
import { ContentSection } from '@/components/shared/content-section'
import { CTASection } from '@/components/shared/cta-section'
import { Container } from '@/components/ui/container'
import { buildPageMetadata } from '@/lib/seo'
import { ServiceJsonLd, BreadcrumbJsonLd } from '@/components/seo/json-ld'
import { SITE_URL } from '@/lib/seo'

export const metadata: Metadata = buildPageMetadata({
  title: 'AI Integration',
  description: 'AI chatbots, content generation, smart search. AI that solves real business problems.',
  routeKey: 'services/ai-integration',
})

const FEATURES = [
  { title: 'AI Chatbots', description: 'Customer support that works 24/7. Trained on your data, embedded in your website, answering real questions.' },
  { title: 'Content Generation', description: 'Product descriptions, blog drafts, email copy. AI-assisted writing pipelines that save hours every week.' },
  { title: 'Smart Search', description: 'Semantic search that understands intent, not just keywords. Your users find what they need faster.' },
  { title: 'Data Analysis', description: 'Extract insights from documents, spreadsheets, and databases. Turn unstructured data into actionable reports.' },
  { title: 'Process Automation', description: 'Classify emails, route tickets, extract invoice data. Repetitive tasks handled by AI, reviewed by humans.' },
  { title: 'Custom AI Tools', description: 'Specific to your industry and workflow. We build AI solutions that solve your problems, not generic ones.' },
] as const

const PROCESS_STEPS = [
  { step: '01', title: 'Discovery', description: 'We identify where AI can actually save you time or money. No hype — just practical opportunities.' },
  { step: '02', title: 'Design', description: 'Architecture and data flow. We plan the integration, choose the right models, and define success metrics.' },
  { step: '03', title: 'Build', description: 'Iterative development with real data. We test accuracy, latency, and edge cases before going live.' },
  { step: '04', title: 'Launch', description: 'Deployed with monitoring and feedback loops. AI improves over time with real usage data.' },
] as const

export default function AIIntegrationPage() {
  return (
    <main id="main-content" className="flex-1">
      <ServiceJsonLd
        name="AI Integration"
        description="AI chatbots, content generation, smart search. AI that solves real business problems."
        url={`${SITE_URL}/services/ai-integration/`}
      />
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: SITE_URL },
        { name: 'Services', url: `${SITE_URL}/services/` },
        { name: 'AI Integration', url: `${SITE_URL}/services/ai-integration/` },
      ]} />
      <PageHero
        overline="AI Integration"
        headline="AI that solves real problems."
        subtext="Not a chatbot demo. Real AI integration into your business workflow."
      />

      <ContentSection background="raised" overline="What You Get" heading="Practical AI Solutions">
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
            From Concept to Integration
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
