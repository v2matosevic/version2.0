import type { Metadata } from 'next'
import { PageHero } from '@/components/shared/page-hero'
import { ContentSection } from '@/components/shared/content-section'
import { CTASection } from '@/components/shared/cta-section'
import { Container } from '@/components/ui/container'
import { buildPageMetadata } from '@/lib/seo'
import { ServiceJsonLd, BreadcrumbJsonLd } from '@/components/seo/json-ld'
import { SITE_URL } from '@/lib/seo'

export const metadata: Metadata = buildPageMetadata({
  title: 'Web Applications',
  description: 'Custom web applications — dashboards, portals, internal tools. Built on modern stacks that scale.',
  routeKey: 'services/web-applications',
})

const FEATURES = [
  { title: 'Custom Dashboards', description: 'Real-time data visualization, user management, and admin panels built for your specific workflow.' },
  { title: 'Client Portals', description: 'Secure login areas where your customers can view orders, documents, invoices, and project status.' },
  { title: 'Internal Tools', description: 'Replace spreadsheets with purpose-built tools. Inventory management, CRM, scheduling — whatever your team needs.' },
  { title: 'Real-Time Features', description: 'Live updates, notifications, chat, collaborative editing. WebSocket-powered when milliseconds matter.' },
  { title: 'API Development', description: 'REST or GraphQL APIs that connect your app to third-party services, mobile apps, or other systems.' },
  { title: 'Authentication & Security', description: 'Role-based access, two-factor auth, encrypted data. Security is architecture, not an afterthought.' },
] as const

const PROCESS_STEPS = [
  { step: '01', title: 'Discovery', description: 'We map your workflows, identify bottlenecks, and define what the application needs to solve.' },
  { step: '02', title: 'Design', description: 'Wireframes and prototypes. We validate the UX before writing a single line of production code.' },
  { step: '03', title: 'Build', description: 'Iterative development in sprints. You see working features every two weeks, not a big reveal at the end.' },
  { step: '04', title: 'Launch', description: 'Staged deployment, monitoring, and a handoff that includes documentation and training.' },
] as const

export default function WebApplicationsPage() {
  return (
    <main id="main-content" className="flex-1">
      <ServiceJsonLd
        name="Web Applications"
        description="Custom web applications — dashboards, portals, internal tools. Built on modern stacks that scale."
        url={`${SITE_URL}/services/web-applications/`}
      />
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: SITE_URL },
        { name: 'Services', url: `${SITE_URL}/services/` },
        { name: 'Web Applications', url: `${SITE_URL}/services/web-applications/` },
      ]} />
      <PageHero
        overline="Web Applications"
        headline="Software built around your workflow."
        subtext="Dashboards, portals, and internal tools. Complex problems solved with clean interfaces."
      />

      <ContentSection background="raised" overline="What You Get" heading="Built for Your Business">
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
            From Idea to Production
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
