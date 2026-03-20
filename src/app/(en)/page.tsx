import { parsePage } from '@/lib/content/parse-page'
import { loadTestimonials } from '@/lib/content/load-testimonials'
import { loadPortfolioFeatured } from '@/lib/content/load-portfolio'
import { HeroContent } from '@/components/home/hero-content'
import { Hero3D } from '@/components/home/hero-3d'
import { ServicesTeaser } from '@/components/home/services-teaser'
import { Differentiators } from '@/components/home/differentiators'
import { PortfolioHighlights } from '@/components/home/portfolio-highlights'
import { Testimonials } from '@/components/shared/testimonials'
import { CTASection } from '@/components/shared/cta-section'
import { LocalBusinessJsonLd, WebSiteJsonLd, BreadcrumbJsonLd } from '@/components/seo/json-ld'
import { SITE_URL } from '@/lib/seo'

export default async function HomePage() {
  const page = await parsePage('home', 'en')
  const testimonials = loadTestimonials()
  const portfolio = loadPortfolioFeatured()

  const fm = page?.frontmatter as Record<string, unknown> | undefined
  const servicesTeaser = (fm?.services_teaser as Array<{ name: string; description: string; href: string }>) ?? []
  const differentiators = (fm?.differentiators as Array<{ number: string; title: string; copy: string }>) ?? []
  const ctaSection = fm?.cta_section as { heading: string; subtext: string; label: string; href: string } | undefined

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

      <ServicesTeaser services={servicesTeaser} />

      <PortfolioHighlights projects={portfolioProjects} lang="en" />

      <Differentiators
        overline="Why Version2"
        heading="Every line is ours."
        items={differentiators}
      />

      {featuredTestimonials.length > 0 && (
        <Testimonials testimonials={featuredTestimonials} lang="en" />
      )}

      {ctaSection && (
        <CTASection
          heading={ctaSection.heading}
          subtext={ctaSection.subtext}
          ctaLabel={ctaSection.label}
          ctaHref={ctaSection.href}
        />
      )}
    </main>
  )
}
