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

      <section className="py-20 md:py-28 lg:py-36 bg-base">
        <Container>
          <StaggerReveal className="space-y-16 md:space-y-24">
            {projects.map((project, index) => {
              const isWide = index % 3 === 0
              return (
                <Link
                  key={project.slug}
                  href={`/portfolio/${project.slug}/`}
                  className="group block"
                >
                  <div className={`grid grid-cols-1 gap-8 items-center ${
                    isWide ? 'lg:grid-cols-1' : index % 2 === 0 ? 'lg:grid-cols-[1.4fr_1fr]' : 'lg:grid-cols-[1fr_1.4fr]'
                  }`}>
                    {/* Image */}
                    <div className={`relative rounded-xl overflow-hidden border border-line-subtle group-hover:border-line transition-colors ${
                      !isWide && index % 2 !== 0 ? 'lg:order-2' : ''
                    }`}
                      style={{ transitionDuration: 'var(--duration-normal)' }}
                    >
                      <Image
                        src={project.image}
                        alt={project.name.en ?? project.name.hr}
                        width={isWide ? 1200 : 800}
                        height={isWide ? 600 : 500}
                        className="w-full h-auto group-hover:scale-[1.02] transition-transform"
                        style={{
                          transitionDuration: '600ms',
                          transitionTimingFunction: 'var(--ease-out)',
                          aspectRatio: isWide ? '2 / 1' : '16 / 10',
                          objectFit: 'cover',
                        }}
                      />
                      {/* Hover overlay */}
                      <div
                        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{
                          background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent 50%)',
                          transitionDuration: '500ms',
                        }}
                      />
                    </div>

                    {/* Info */}
                    <div className={!isWide && index % 2 !== 0 ? 'lg:order-1' : ''}>
                      <span
                        className="block mb-2 text-brand-red font-body uppercase"
                        style={{
                          fontSize: 'var(--text-overline)',
                          fontWeight: 'var(--font-weight-body-semibold)',
                          letterSpacing: 'var(--tracking-overline)',
                        }}
                      >
                        {project.industry.en ?? project.industry.hr}
                      </span>
                      <h2
                        className="font-heading text-foreground group-hover:text-brand-red-light transition-colors"
                        style={{
                          fontSize: isWide ? 'var(--text-h2)' : 'var(--text-h3)',
                          fontWeight: 'var(--font-weight-headline)',
                          lineHeight: 'var(--leading-tight)',
                          letterSpacing: 'var(--tracking-h2)',
                          transitionDuration: 'var(--duration-normal)',
                        } as React.CSSProperties}
                      >
                        {project.name.en ?? project.name.hr}
                      </h2>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {project.tech_highlights.slice(0, 4).map((tech) => (
                          <Badge key={tech}>{tech}</Badge>
                        ))}
                      </div>
                      <span
                        className="mt-6 inline-flex items-center gap-2 text-brand-red font-body transition-all group-hover:gap-3"
                        style={{
                          fontSize: 'var(--text-small)',
                          fontWeight: 'var(--font-weight-body-semibold)',
                          transitionDuration: 'var(--duration-normal)',
                        }}
                      >
                        View case study <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </Link>
              )
            })}
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
