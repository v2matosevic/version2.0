import { parsePage } from '@/lib/content/parse-page'
import { loadTestimonials } from '@/lib/content/load-testimonials'
import { loadPortfolioFeatured } from '@/lib/content/load-portfolio'
import { HeroContent } from '@/components/home/hero-content'
import { Hero3D } from '@/components/home/hero-3d'
import { ServicesTeaser } from '@/components/home/services-teaser'
import { Differentiators } from '@/components/home/differentiators'
import { PortfolioHighlights } from '@/components/home/portfolio-highlights'
import { Testimonials } from '@/components/shared/testimonials'
import { SectionConnector } from '@/components/home/section-connector'
import { ScrollReveal } from '@/components/animations/scroll-reveal'
import { LocalBusinessJsonLd, WebSiteJsonLd, BreadcrumbJsonLd } from '@/components/seo/json-ld'
import { SITE_URL } from '@/lib/seo'

export default async function HomePage() {
  const page = await parsePage('home', 'en')
  const testimonials = loadTestimonials()
  const portfolio = loadPortfolioFeatured()

  const fm = page?.frontmatter as Record<string, unknown> | undefined
  const servicesTeaser = (fm?.services_teaser as Array<{ name: string; description: string; href: string }>) ?? []
  const differentiators = (fm?.differentiators as Array<{ number: string; title: string; copy: string }>) ?? []
  const portfolioProjects = portfolio.map((p) => ({
    slug: p.slug,
    name: p.name.en ?? p.name.hr,
    industry: p.industry.en ?? p.industry.hr,
    tech: p.tech_highlights,
    image: p.image,
    grid_size: p.grid_size as 'large' | 'standard',
  }))

  const featuredTestimonials = testimonials.testimonials.filter((t) => t.featured).slice(0, 2)

  return (
    <main id="main-content" className="flex-1">
      <LocalBusinessJsonLd lang="en" />
      <WebSiteJsonLd />
      <BreadcrumbJsonLd items={[{ name: 'Home', url: SITE_URL }]} />

      {/* Hero — 3D particles + headline */}
      <Hero3D>
        <HeroContent
          overline={(fm?.overline as string) ?? 'Web Development Studio'}
          headline={(fm?.h1 as string) ?? 'We build what others can\'t.'}
          subtext={(fm?.subtext as string) ?? 'Custom websites, web applications, and AI-powered tools. Built from scratch. No templates.'}
          ctaPrimaryLabel={(fm?.cta_primary_label as string) ?? 'See Our Work'}
          ctaPrimaryHref={(fm?.cta_primary_href as string) ?? '/portfolio/'}
          ctaSecondaryLabel={(fm?.cta_secondary_label as string) ?? 'Get a Quote'}
          ctaSecondaryHref={(fm?.cta_secondary_href as string) ?? '/pricing/'}
        />
      </Hero3D>

      {/* Services — numbered list with hover interactions */}
      <ScrollReveal>
        <ServicesTeaser services={servicesTeaser} />
      </ScrollReveal>

      {/* Connector: Services → Portfolio */}
      <SectionConnector variant="line" />

      {/* Portfolio — featured hero + compact grid */}
      <ScrollReveal>
        <PortfolioHighlights projects={portfolioProjects} lang="en" />
      </ScrollReveal>

      {/* Connector: Portfolio → Differentiators */}
      <div
        style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent, color-mix(in srgb, var(--color-brand-red) 15%, transparent), transparent)',
        }}
        aria-hidden="true"
      />

      {/* Differentiators — full-viewport typography monument */}
      <Differentiators
        overline="Why Version2"
        heading="Every line is ours."
        items={differentiators}
      />

      {/* Breathing space before testimonials */}
      <SectionConnector variant="space" />

      {/* Testimonials — real Google reviews */}
      {featuredTestimonials.length > 0 && (
        <ScrollReveal>
          <Testimonials testimonials={featuredTestimonials} lang="en" />
        </ScrollReveal>
      )}
    </main>
  )
}
