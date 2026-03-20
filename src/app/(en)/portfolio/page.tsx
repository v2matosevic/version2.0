import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { loadPortfolioFeatured } from '@/lib/content/load-portfolio'
import { buildPageMetadata, SITE_URL } from '@/lib/seo'
import { BreadcrumbJsonLd } from '@/components/seo/json-ld'
import { PageHero } from '@/components/shared/page-hero'
import { CTASection } from '@/components/shared/cta-section'
import { Container } from '@/components/ui/container'
import { Badge } from '@/components/ui/badge'
import { StaggerReveal } from '@/components/animations/stagger-reveal'

export const metadata: Metadata = buildPageMetadata({
  title: 'Portfolio',
  description: 'Selected work by Version2. Custom websites, web apps, and AI-powered tools built from scratch.',
  routeKey: 'portfolio',
})

export default function PortfolioPage() {
  const projects = loadPortfolioFeatured()

  return (
    <main id="main-content" className="flex-1">
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: SITE_URL },
        { name: 'Portfolio', url: `${SITE_URL}/portfolio/` },
      ]} />
      <PageHero
        headline="Portfolio"
        subtext="Every project here was built from scratch. No templates. No page builders. Just code, design, and craft."
        overline="Selected Work"
      />

      <section className="py-16 md:py-24 bg-base">
        <Container>
          <StaggerReveal className="grid grid-cols-1 gap-12 md:grid-cols-2">
            {projects.map((project) => (
              <Link
                key={project.slug}
                href={`/portfolio/${project.slug}/`}
                className="group block"
              >
                <div className="rounded-xl overflow-hidden border border-line group-hover:border-brand-red/30 transition-colors">
                  <Image
                    src={project.image}
                    alt={project.name.en ?? project.name.hr}
                    width={800}
                    height={500}
                    className="w-full h-auto group-hover:scale-[1.02] transition-transform"
                    style={{ transitionDuration: '400ms' }}
                  />
                </div>
                <div className="mt-4">
                  <h2
                    className="font-heading text-foreground group-hover:text-brand-red transition-colors"
                    style={{
                      fontSize: 'var(--text-h3)',
                      fontWeight: 'var(--font-weight-headline-bold)',
                      lineHeight: 'var(--leading-snug)',
                    } as React.CSSProperties}
                  >
                    {project.name.en ?? project.name.hr}
                  </h2>
                  <p className="mt-1 text-muted" style={{ fontSize: 'var(--text-body)' }}>
                    {project.industry.en ?? project.industry.hr}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.tech_highlights.slice(0, 4).map((tech) => (
                      <Badge key={tech}>{tech}</Badge>
                    ))}
                  </div>
                  <span className="mt-4 inline-flex items-center gap-1 text-brand-red text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    View case study <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </StaggerReveal>
        </Container>
      </section>

      <CTASection
        heading="Have a project in mind?"
        subtext="Let's talk about what we can build together. No commitment, just conversation."
        ctaLabel="Get in Touch"
        ctaHref="/contact/"
      />
    </main>
  )
}
