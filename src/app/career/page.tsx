import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo'
import { SITE_URL } from '@/lib/seo'
import { BreadcrumbJsonLd } from '@/components/seo/json-ld'
import { PageHero } from '@/components/shared/page-hero'
import { ContentSection } from '@/components/shared/content-section'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ContactForm } from '@/components/shared/contact-form'

export const metadata: Metadata = buildPageMetadata({
  title: 'Career',
  description: "Join Version2 — we're looking for developers who care about craft. See open positions.",
  routeKey: 'career',
})

const WORK_WITH = [
  'React and Next.js',
  'TypeScript',
  'Tailwind CSS',
  'Git and real deployment workflows',
  'Client projects from day one',
] as const

const WHAT_WE_EXPECT = [
  'Curiosity',
  'Basic HTML/CSS/JS understanding',
  'Some projects you\'ve built',
  'Willingness to take feedback',
] as const

const WHAT_YOU_GET = [
  'Hands-on mentorship',
  'Real project work',
  'Clear growth path',
  'Paid position',
] as const

function BulletList({ items }: { items: readonly string[] }) {
  return (
    <ul className="flex flex-col gap-2">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2 text-muted" style={{ fontSize: 'var(--text-body)', lineHeight: 'var(--leading-body)' }}>
          <span className="w-1.5 h-1.5 mt-2.5 rounded-sm bg-brand-red shrink-0" />
          {item}
        </li>
      ))}
    </ul>
  )
}

export default function CareerPage() {
  return (
    <main id="main-content" className="flex-1">
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: SITE_URL },
        { name: 'Career', url: `${SITE_URL}/career/` },
      ]} />
      <PageHero
        headline="We're building. Want to help?"
        subtext="This isn't a corporate job board. There's no &quot;we're a family&quot; speech. We're a small web development company in Zadar that builds custom websites and apps from scratch."
      />

      <ContentSection background="raised" heading="What It's Like Here">
        <p
          className="text-foreground max-w-2xl"
          style={{ fontSize: 'var(--text-body-lg)', lineHeight: 'var(--leading-body)' } as React.CSSProperties}
        >
          Small team. Real projects. No templates. Every site is built with React, Next.js, and TypeScript.
          You&apos;ll write code that ships to production, not code that sits in a drawer.
          We work Monday through Friday, 08:00 to 16:00. No weekend Slack messages.
        </p>
      </ContentSection>

      <ContentSection background="base">
        <div className="mb-4">
          <Badge>Open Position</Badge>
        </div>
        <h2
          className="mb-8 font-heading text-foreground"
          style={{
            fontSize: 'var(--text-h2)',
            fontWeight: 'var(--font-weight-headline)',
            lineHeight: 'var(--leading-tight)',
          } as React.CSSProperties}
        >
          Junior Developer
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <h3
              className="mb-4 font-heading text-foreground"
              style={{
                fontSize: 'var(--text-h4)',
                fontWeight: 'var(--font-weight-body-semibold)',
              } as React.CSSProperties}
            >
              What you&apos;ll work with
            </h3>
            <BulletList items={WORK_WITH} />
          </div>
          <div>
            <h3
              className="mb-4 font-heading text-foreground"
              style={{
                fontSize: 'var(--text-h4)',
                fontWeight: 'var(--font-weight-body-semibold)',
              } as React.CSSProperties}
            >
              What we expect
            </h3>
            <BulletList items={WHAT_WE_EXPECT} />
          </div>
          <div>
            <h3
              className="mb-4 font-heading text-foreground"
              style={{
                fontSize: 'var(--text-h4)',
                fontWeight: 'var(--font-weight-body-semibold)',
              } as React.CSSProperties}
            >
              What you get
            </h3>
            <BulletList items={WHAT_YOU_GET} />
          </div>
        </div>
      </ContentSection>

      <ContentSection background="raised" heading="Show us what you've built." id="apply">
        <p className="mb-8 text-muted" style={{ fontSize: 'var(--text-body)', lineHeight: 'var(--leading-body)' }}>
          Skip the cover letter. Your work says more than a PDF.
        </p>
        <ContactForm lang="en" />
        <p className="mt-4 text-sm text-muted">
          Or email us directly at{' '}
          <a href="mailto:info@version2.hr" className="text-brand-red hover:text-brand-red-light transition-colors">
            info@version2.hr
          </a>
        </p>
      </ContentSection>

      <ContentSection background="base">
        <h2
          className="mb-4 font-heading text-foreground"
          style={{
            fontSize: 'var(--text-h3)',
            fontWeight: 'var(--font-weight-headline)',
          } as React.CSSProperties}
        >
          No Opening That Fits?
        </h2>
        <p className="mb-6 text-muted max-w-md" style={{ fontSize: 'var(--text-body)', lineHeight: 'var(--leading-body)' }}>
          We&apos;re always interested in good people. If you write code and build things, we want to hear from you.
        </p>
        <a href="mailto:info@version2.hr">
          <Button variant="ghost" size="md">Send us a message</Button>
        </a>
      </ContentSection>
    </main>
  )
}
