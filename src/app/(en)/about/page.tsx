import type { Metadata } from 'next'
import { Camera } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { SITE_URL } from '@/lib/seo'
import { JsonLd, BreadcrumbJsonLd } from '@/components/seo/json-ld'
import { PageHero } from '@/components/shared/page-hero'
import { ContentSection } from '@/components/shared/content-section'
import { CTASection } from '@/components/shared/cta-section'
import { Badge } from '@/components/ui/badge'
import { CounterAnimation } from '@/components/animations/counter-animation'
import { ScrollReveal } from '@/components/animations/scroll-reveal'

export const metadata: Metadata = buildPageMetadata({
  title: 'About Version2',
  description: 'Learn about Version2 — a web design and development studio based in Zadar, Croatia. We build custom websites, web apps, and AI tools from scratch.',
  routeKey: 'about',
})

const ANIMATED_STATS = [
  { target: 100, suffix: '+', decimals: 0, label: 'Projects' },
  { target: 100, suffix: '+', decimals: 0, label: 'Clients' },
  { target: 5, suffix: '', decimals: 1, label: 'Rating' },
  { target: 40, suffix: '+', decimals: 0, label: 'Reviews' },
] as const

const VALUES = [
  { title: 'Templates look like templates.', description: "That's why we don't use them. Every project starts with a blank file. Your business isn't generic. Your website shouldn't be either." },
  { title: 'Your website is not a brochure.', description: "It's a product. It needs to load fast, work on every device, and actually do something useful for your business." },
  { title: 'Speed matters.', description: 'Not as a talking point. As a measurable outcome. Sub-second load times. Real performance scores.' },
  { title: 'Complexity is the enemy.', description: "Code should be clean enough that anyone can maintain it. If we build something only we can understand, we've failed." },
] as const

const TECH_STACK = [
  { category: 'Frontend', items: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Three.js/R3F', 'GSAP'] },
  { category: 'Backend', items: ['Node.js', 'PostgreSQL', 'REST APIs', 'WebSockets'] },
  { category: 'AI', items: ['Claude API', 'GPT API', 'RAG', 'Embeddings'] },
  { category: 'Infrastructure', items: ['Hostinger VPS', 'Nginx', 'PM2', 'Cloudflare', 'Git'] },
] as const

export default function AboutPage() {
  return (
    <main id="main-content" className="flex-1">
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: SITE_URL },
        { name: 'About', url: `${SITE_URL}/about/` },
      ]} />
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: 'About Version2',
        description: 'Learn about Version2 — a web design and development studio based in Zadar, Croatia.',
        url: `${SITE_URL}/about/`,
        mainEntity: { '@id': `${SITE_URL}/#business` },
      }} />
      <PageHero
        headline="We're Version2. We write code."
        minHeight="50vh"
      />

      <ScrollReveal>
      <ContentSection background="base">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_0.8fr]">
          <div
            className="prose-none text-foreground max-w-xl"
            style={{ fontSize: 'var(--text-body-lg)', lineHeight: 'var(--leading-body)' } as React.CSSProperties}
          >
            <p className="mb-6">
              We started in September 2022 in Zadar, Croatia. A small team that builds things for the web.
            </p>
            <p className="mb-6">
              The honest version? We started as a digital marketing company. Social media, photos, videos, the whole package. We did it. We were decent at it. But then we got honest with ourselves. What we&apos;re actually good at is building. Websites, apps, tools. The things that work long after the campaign ends.
            </p>
            <p>
              So we stripped everything else away. No more photo shoots. No more social media calendars. Now we only do what we do best: write code and ship projects. Over 100 of them so far, for clients across Croatia and Europe. Every one built from scratch.
            </p>
          </div>
          <div
            className="relative overflow-hidden rounded-xl border border-line-subtle"
            style={{ aspectRatio: '3 / 4' }}
          >
            {/* Warm charcoal gradient background */}
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(160deg, #1a1714 0%, #252220 35%, #1e1b18 65%, #151311 100%)',
              }}
            />
            {/* Subtle grain overlay */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
                backgroundSize: '128px 128px',
              }}
            />
            {/* Warm accent glow */}
            <div
              className="absolute inset-0 opacity-[0.06]"
              style={{
                background: 'radial-gradient(ellipse at 30% 70%, #991717, transparent 60%)',
              }}
            />
            {/* Content */}
            <div className="relative flex h-full flex-col items-center justify-center gap-6 px-8 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-line-subtle/50 bg-base/10 backdrop-blur-sm">
                <Camera size={28} className="text-muted/60" strokeWidth={1.5} />
              </div>
              <div>
                <p
                  className="font-heading text-foreground/80"
                  style={{
                    fontSize: 'var(--text-h4)',
                    fontWeight: 'var(--font-weight-headline)',
                    lineHeight: 'var(--leading-tight)',
                  } as React.CSSProperties}
                >
                  Version2
                </p>
                <p
                  className="mt-2 text-muted/50"
                  style={{
                    fontSize: 'var(--text-small)',
                    lineHeight: 'var(--leading-body)',
                  }}
                >
                  Studio Photo Coming Soon
                </p>
              </div>
              <div className="mt-2 h-px w-12 bg-brand-red/30" />
            </div>
          </div>
        </div>
      </ContentSection>
      </ScrollReveal>

      <ScrollReveal>
      <ContentSection background="raised" heading="What We Believe">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {VALUES.map((value) => (
            <div key={value.title}>
              <div className="mb-4 w-8 h-0.5 bg-brand-red" />
              <h3
                className="font-heading text-foreground"
                style={{
                  fontSize: 'var(--text-h4)',
                  fontWeight: 'var(--font-weight-headline-bold)',
                } as React.CSSProperties}
              >
                {value.title}
              </h3>
              <p className="mt-2 text-muted" style={{ fontSize: 'var(--text-body)', lineHeight: 'var(--leading-body)' }}>
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </ContentSection>
      </ScrollReveal>

      <ScrollReveal>
      <section className="py-12 md:py-16 lg:py-20 bg-sunken">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-between items-center gap-8">
            {ANIMATED_STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <div
                  className="font-heading text-foreground"
                  style={{
                    fontSize: 'var(--text-h2)',
                    fontWeight: 'var(--font-weight-headline-bold)',
                  } as React.CSSProperties}
                >
                  <CounterAnimation
                    target={stat.target}
                    suffix={stat.suffix}
                    decimals={stat.decimals}
                  />
                </div>
                <p className="mt-1 text-sm text-muted">{stat.label}</p>
              </div>
            ))}
            <div className="text-center">
              <div
                className="font-heading text-foreground"
                style={{
                  fontSize: 'var(--text-h2)',
                  fontWeight: 'var(--font-weight-headline-bold)',
                } as React.CSSProperties}
              >
                2022
              </div>
              <p className="mt-1 text-sm text-muted">Founded</p>
            </div>
          </div>
        </div>
      </section>
      </ScrollReveal>

      <ScrollReveal>
      <ContentSection background="base" heading="What We Build With">
        <div className="flex flex-col gap-8">
          {TECH_STACK.map((group) => (
            <div key={group.category}>
              <p
                className="mb-3 uppercase text-muted font-body"
                style={{
                  fontSize: 'var(--text-overline)',
                  fontWeight: 'var(--font-weight-body-semibold)',
                  letterSpacing: 'var(--tracking-overline)',
                } as React.CSSProperties}
              >
                {group.category}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <Badge key={item}>{item}</Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ContentSection>

      <ContentSection background="base">
        <h2
          className="mb-4 font-heading text-foreground"
          style={{
            fontSize: 'var(--text-h3)',
            fontWeight: 'var(--font-weight-headline)',
          } as React.CSSProperties}
        >
          Where We Are
        </h2>
        <p
          className="text-muted max-w-xl"
          style={{ fontSize: 'var(--text-body-lg)', lineHeight: 'var(--leading-body)' } as React.CSSProperties}
        >
          Zadar, Croatia. A city on the Adriatic coast with fast internet and good coffee. European quality. Competitive pricing compared to Western Europe. Same timezone as Berlin, Paris, and Rome.
        </p>
        <p className="mt-4 text-foreground">
          Novigradska 21, 23000 Zadar, Croatia
        </p>
      </ContentSection>
      </ScrollReveal>

      <ScrollReveal>
      <CTASection
        heading="Want to see if we're the right fit?"
        subtext="Let's start with a conversation. No pitch decks. No sales calls."
        ctaLabel="Get in Touch"
        ctaHref="/contact/"
      />
      </ScrollReveal>
    </main>
  )
}
