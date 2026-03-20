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

export const metadata: Metadata = buildPageMetadata({
  title: 'Portfolio',
  description: 'Ausgewählte Arbeiten von Version2. Maßgeschneiderte Websites und Webanwendungen von Grund auf erstellt.',
  routeKey: 'portfolio',
})

export default function PortfolioDePage() {
  const projects = loadPortfolioFeatured()

  return (
    <main id="main-content" className="flex-1">
      <BreadcrumbJsonLd items={[
        { name: 'Startseite', url: `${SITE_URL}/de/` },
        { name: 'Portfolio', url: `${SITE_URL}/de/portfolio/` },
      ]} />
      <PageHero
        headline="Portfolio"
        subtext="Jedes Projekt hier wurde von Grund auf gebaut. Keine Templates. Keine Page Builder. Nur Code, Design und Handwerk."
        overline="Ausgewählte Arbeiten"
      />

      <section className="py-16 md:py-24 bg-base">
        <Container>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            {projects.map((project) => (
              <Link
                key={project.slug}
                href={`/de/portfolio/${project.slug}/`}
                className="group block"
              >
                <div className="rounded-xl overflow-hidden border border-line group-hover:border-brand-red/30 transition-colors">
                  <Image
                    src={project.image}
                    alt={project.name.de ?? project.name.en}
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
                    {project.name.de ?? project.name.en}
                  </h2>
                  <p className="mt-1 text-muted" style={{ fontSize: 'var(--text-body)' }}>
                    {project.industry.de ?? project.industry.en}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.tech_highlights.slice(0, 4).map((tech) => (
                      <Badge key={tech}>{tech}</Badge>
                    ))}
                  </div>
                  <span className="mt-4 inline-flex items-center gap-1 text-brand-red text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    Fallstudie ansehen <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <CTASection
        heading="Haben Sie ein Projekt im Sinn?"
        subtext="Lassen Sie uns darüber sprechen, was wir zusammen bauen können. Keine Verpflichtung, nur Gespräch."
        ctaLabel="Kontakt aufnehmen"
        ctaHref="/de/kontakt/"
      />
    </main>
  )
}
