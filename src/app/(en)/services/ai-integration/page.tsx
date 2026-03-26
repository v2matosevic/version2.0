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
            From Concept to Integration
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
