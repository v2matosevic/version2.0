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

export default async function HrHomePage() {
  const page = await parsePage('home', 'hr')
  const testimonials = loadTestimonials()
  const portfolio = loadPortfolioFeatured()

  const fm = page?.frontmatter as Record<string, unknown> | undefined
  const servicesTeaser = (fm?.services_teaser as Array<{ name: string; description: string; href: string }>) ?? []
  const differentiators = (fm?.differentiators as Array<{ number: string; title: string; copy: string }>) ?? []
  const ctaSection = fm?.cta_section as { heading: string; subtext: string; label: string; href: string } | undefined

  const portfolioProjects = portfolio.map((p) => ({
    slug: p.slug,
    name: p.name.hr ?? p.name.en,
    industry: p.industry.hr ?? p.industry.en,
    tech: p.tech_highlights,
    grid_size: p.grid_size as 'large' | 'standard',
  }))

  const featuredTestimonials = testimonials.testimonials.filter((t) => t.featured).slice(0, 2)

  return (
    <main id="main-content" className="flex-1">
      <LocalBusinessJsonLd lang="hr" />
      <WebSiteJsonLd />
      <BreadcrumbJsonLd items={[{ name: 'Početna', url: `${SITE_URL}/hr/` }]} />
      <Hero3D>
        <HeroContent
          overline={(fm?.overline as string) ?? 'Studio za web razvoj'}
          headline={(fm?.h1 as string) ?? 'Gradimo ono što drugi ne mogu.'}
          subtext={(fm?.subtext as string) ?? 'Prilagođene web stranice, web aplikacije i alati pokretani umjetnom inteligencijom. Izrađeno od nule. Bez predložaka.'}
          ctaPrimaryLabel={(fm?.cta_primary_label as string) ?? 'Pogledajte naš rad'}
          ctaPrimaryHref={(fm?.cta_primary_href as string) ?? '/hr/portfolio/'}
          ctaSecondaryLabel={(fm?.cta_secondary_label as string) ?? 'Zatražite ponudu'}
          ctaSecondaryHref={(fm?.cta_secondary_href as string) ?? '/hr/cijene/'}
        />
      </Hero3D>
      <ServicesTeaser services={servicesTeaser} />
      <PortfolioHighlights projects={portfolioProjects} lang="hr" />
      <Differentiators
        overline="Zašto Version2"
        heading="Svaka linija koda je naša."
        items={differentiators}
      />
      {featuredTestimonials.length > 0 && (
        <Testimonials testimonials={featuredTestimonials} lang="hr" />
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
