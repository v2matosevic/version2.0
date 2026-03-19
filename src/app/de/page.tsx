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

export default async function DeHomePage() {
  const page = await parsePage('home', 'de')
  const testimonials = loadTestimonials()
  const portfolio = loadPortfolioFeatured()

  const fm = page?.frontmatter as Record<string, unknown> | undefined
  const servicesTeaser = (fm?.services_teaser as Array<{ name: string; description: string; href: string }>) ?? []
  const differentiators = (fm?.differentiators as Array<{ number: string; title: string; copy: string }>) ?? []
  const ctaSection = fm?.cta_section as { heading: string; subtext: string; label: string; href: string } | undefined

  const portfolioProjects = portfolio.map((p) => ({
    slug: p.slug,
    name: p.name.de ?? p.name.en,
    industry: p.industry.de ?? p.industry.en,
    tech: p.tech_highlights,
    grid_size: p.grid_size as 'large' | 'standard',
  }))

  const featuredTestimonials = testimonials.testimonials.filter((t) => t.featured).slice(0, 2)

  return (
    <main id="main-content" className="flex-1">
      <LocalBusinessJsonLd lang="de" />
      <WebSiteJsonLd />
      <BreadcrumbJsonLd items={[{ name: 'Startseite', url: `${SITE_URL}/de/` }]} />
      <Hero3D>
        <HeroContent
          overline={(fm?.overline as string) ?? 'Webentwicklung Studio'}
          headline={(fm?.h1 as string) ?? 'Wir bauen, was andere nicht können.'}
          subtext={(fm?.subtext as string) ?? 'Maßgeschneiderte Websites, Webanwendungen und KI-gestützte Tools. Von Grund auf gebaut. Keine Vorlagen.'}
          ctaPrimaryLabel={(fm?.cta_primary_label as string) ?? 'Unsere Arbeit ansehen'}
          ctaPrimaryHref={(fm?.cta_primary_href as string) ?? '/de/portfolio/'}
          ctaSecondaryLabel={(fm?.cta_secondary_label as string) ?? 'Angebot anfordern'}
          ctaSecondaryHref={(fm?.cta_secondary_href as string) ?? '/de/preise/'}
        />
      </Hero3D>
      <ServicesTeaser services={servicesTeaser} />
      <PortfolioHighlights projects={portfolioProjects} lang="de" />
      <Differentiators
        overline="Warum Version2"
        heading="Jede Zeile gehört uns."
        items={differentiators}
      />
      {featuredTestimonials.length > 0 && (
        <Testimonials testimonials={featuredTestimonials} lang="de" />
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
