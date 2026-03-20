import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHero } from '@/components/shared/page-hero'
import { ContentSection } from '@/components/shared/content-section'
import { CTASection } from '@/components/shared/cta-section'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { buildPageMetadata } from '@/lib/seo'
import { BreadcrumbJsonLd } from '@/components/seo/json-ld'
import { SITE_URL } from '@/lib/seo'
import { ScrollReveal } from '@/components/animations/scroll-reveal'

export const metadata: Metadata = buildPageMetadata({
  title: 'Services',
  description: 'Custom web design, development, AI integration, e-commerce, and SEO services. Everything built from scratch by Version2.',
  routeKey: 'services',
})

const CORE_SERVICES = [
  { number: '01', title: 'Custom Websites', href: '/services/web-design/', description: 'Designed from scratch. Fast, responsive, and built to convert. No themes, no templates — just clean code shaped around your brand.' },
  { number: '02', title: 'Web Applications', href: '/services/web-applications/', description: 'Dashboards, portals, internal tools. Complex front-ends with real-time data. Built on modern stacks that scale.' },
  { number: '03', title: 'Online Stores', href: '/services/e-commerce/', description: 'E-commerce that actually works. Product management, payments, shipping — everything integrated, nothing bolted on.' },
  { number: '04', title: 'AI Integration', href: '/services/ai-integration/', description: 'Chatbots, content generation, smart search. AI that solves real business problems, not buzzword demos.' },
  { number: '05', title: 'SEO', href: '/services/seo/', description: 'Technical SEO baked into the build. Structured data, Core Web Vitals, crawlability — the foundations that rankings are built on.' },
] as const

const SUPPORTING_SERVICES = [
  { title: 'Digital Business Cards', description: 'NFC-enabled cards that link to a custom micro-site. Tap, share, done.' },
  { title: '360° Virtual Tours', description: 'Interactive walkthroughs for hotels, restaurants, and real estate. Embedded anywhere.' },
  { title: 'Integrations', description: 'Payment gateways, CRM sync, booking systems, APIs. We connect what needs connecting.' },
  { title: 'Maintenance', description: 'Updates, monitoring, backups, performance tuning. We keep things running after launch.' },
] as const

const PROCESS_STEPS = [
  { step: '01', title: 'Discovery', description: 'We learn your business, goals, and audience.' },
  { step: '02', title: 'Design', description: 'Wireframes and visual direction, iterated with you.' },
  { step: '03', title: 'Build', description: 'Clean code, tested on every device and browser.' },
  { step: '04', title: 'Launch', description: 'Deployed, monitored, and optimized post-launch.' },
] as const

export default function ServicesPage() {
  return (
    <main id="main-content" className="flex-1">
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: SITE_URL },
        { name: 'Services', url: `${SITE_URL}/services/` },
      ]} />
      <PageHero
        overline="Services"
        headline="Everything we build is custom."
        subtext="No templates. No drag-and-drop. Every project starts from zero."
        minHeight="50vh"
      />

      {CORE_SERVICES.map((service, index) => (
        <ScrollReveal key={service.number}>
        <section
          key={service.number}
          className={`py-16 md:py-24 lg:py-32 ${index % 2 === 0 ? 'bg-base' : 'bg-raised'}`}
        >
          <Container>
            <div className={`grid grid-cols-1 gap-12 lg:grid-cols-2 items-center ${index % 2 !== 0 ? 'lg:direction-rtl' : ''}`}>
              <div className={index % 2 !== 0 ? 'lg:order-2' : ''}>
                <span
                  className="block mb-4 font-heading text-brand-red"
                  style={{ fontSize: 'var(--text-h2)', fontWeight: 'var(--font-weight-headline)' } as React.CSSProperties}
                >
                  {service.number}
                </span>
                <h2
                  className="font-heading text-foreground"
                  style={{ fontSize: 'var(--text-h2)', fontWeight: 'var(--font-weight-headline)', lineHeight: 'var(--leading-tight)', letterSpacing: 'var(--tracking-h2)' } as React.CSSProperties}
                >
                  {service.title}
                </h2>
                <p
                  className="mt-4 text-muted max-w-lg"
                  style={{ fontSize: 'var(--text-body-lg)', lineHeight: 'var(--leading-body)' } as React.CSSProperties}
                >
                  {service.description}
                </p>
                <div className="mt-8">
                  <Link href={service.href}>
                    <Button variant="secondary" size="md">Learn More</Button>
                  </Link>
                </div>
              </div>
              <div className={`rounded-xl bg-sunken border border-line-subtle aspect-[4/3] ${index % 2 !== 0 ? 'lg:order-1' : ''}`} />
            </div>
          </Container>
        </section>
        </ScrollReveal>
      ))}

      <ContentSection background="raised" overline="Also" heading="Supporting Services">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          {SUPPORTING_SERVICES.map((service) => (
            <div key={service.title} className="p-6 rounded-xl bg-base border border-line-subtle">
              <div className="mb-4 w-8 h-0.5 bg-brand-red" />
              <h3
                className="font-heading text-foreground"
                style={{ fontSize: 'var(--text-h4)', fontWeight: 'var(--font-weight-headline-bold)' } as React.CSSProperties}
              >
                {service.title}
              </h3>
              <p className="mt-2 text-muted" style={{ fontSize: 'var(--text-body)', lineHeight: 'var(--leading-body)' }}>
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </ContentSection>

      <section className="py-12 md:py-16 lg:py-20 bg-sunken">
        <Container>
          <p
            className="mb-8 uppercase text-muted font-body text-center"
            style={{ fontSize: 'var(--text-overline)', fontWeight: 'var(--font-weight-body-semibold)', letterSpacing: 'var(--tracking-overline)' } as React.CSSProperties}
          >
            Our Process
          </p>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {PROCESS_STEPS.map((step) => (
              <div key={step.step} className="text-center">
                <span className="block font-heading text-brand-red" style={{ fontSize: 'var(--text-h3)', fontWeight: 'var(--font-weight-headline)' } as React.CSSProperties}>
                  {step.step}
                </span>
                <h3
                  className="mt-2 font-heading text-foreground"
                  style={{ fontSize: 'var(--text-h4)', fontWeight: 'var(--font-weight-headline-bold)' } as React.CSSProperties}
                >
                  {step.title}
                </h3>
                <p className="mt-1 text-sm text-muted">{step.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CTASection
        heading="Not sure where to start?"
        subtext="Get a free website analysis and we'll point you in the right direction."
        ctaLabel="Get Free Analysis"
        ctaHref="/analysis/"
      />
    </main>
  )
}
