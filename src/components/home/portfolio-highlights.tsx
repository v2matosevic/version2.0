import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import type { Language } from '@/types/i18n'

type PortfolioProject = {
  slug: string
  name: string
  industry: string
  tech: string[]
  image: string
  grid_size: 'large' | 'standard'
}

type PortfolioHighlightsProps = {
  projects: PortfolioProject[]
  lang: Language
}

function ProjectCard({ project, lang }: { project: PortfolioProject; lang: Language }) {
  const langPrefix = lang === 'hr' ? '/hr' : lang === 'de' ? '/de' : ''

  return (
    <Link
      href={`${langPrefix}/portfolio/${project.slug}/`}
      className="group block relative rounded-xl overflow-hidden border border-transparent hover:border-brand-red/30 hover:-translate-y-1 transition-all"
      style={{ transitionDuration: 'var(--duration-normal)' } as React.CSSProperties}
    >
      <div
        className="overflow-hidden rounded-t-xl"
        style={{ aspectRatio: '16 / 10' }}
      >
        <Image
          src={project.image}
          alt={project.name}
          width={800}
          height={500}
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform"
          style={{ transitionDuration: '400ms' }}
        />
      </div>
      <div className="pt-4">
        <h3
          className="font-heading text-foreground"
          style={{
            fontSize: 'var(--text-h4)',
            fontWeight: 'var(--font-weight-headline-bold)',
            lineHeight: 'var(--leading-snug)',
          } as React.CSSProperties}
        >
          {project.name}
        </h3>
        <p className="mt-1 text-muted text-sm">{project.industry}</p>
      </div>
    </Link>
  )
}

function PortfolioHighlights({ projects, lang }: PortfolioHighlightsProps) {
  const portfolioHref = lang === 'hr' ? '/hr/portfolio/' : lang === 'de' ? '/de/portfolio/' : '/portfolio/'
  const displayProjects = projects.slice(0, 6)

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-sunken">
      <Container>
        <p
          className="mb-3 uppercase text-muted font-body"
          style={{
            fontSize: 'var(--text-overline)',
            fontWeight: 'var(--font-weight-body-semibold)',
            letterSpacing: 'var(--tracking-overline)',
          } as React.CSSProperties}
        >
          {lang === 'hr' ? 'Odabrani radovi' : lang === 'de' ? 'Ausgewählte Arbeiten' : 'Selected Work'}
        </p>
        <h2
          className="mb-12 font-heading text-foreground"
          style={{
            fontSize: 'var(--text-h2)',
            fontWeight: 'var(--font-weight-headline)',
            lineHeight: 'var(--leading-tight)',
            letterSpacing: 'var(--tracking-h2)',
          } as React.CSSProperties}
        >
          {lang === 'hr' ? 'Projekti koji dokazuju tvrdnju.' : lang === 'de' ? 'Projekte, die den Punkt beweisen.' : 'Projects that prove the point.'}
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-[1.2fr_1fr]">
          {displayProjects.slice(0, 2).map((project) => (
            <ProjectCard key={project.slug} project={project} lang={lang} />
          ))}
        </div>
        {displayProjects.length > 2 && (
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-[1fr_1.2fr]">
            {displayProjects.slice(2, 4).map((project) => (
              <ProjectCard key={project.slug} project={project} lang={lang} />
            ))}
          </div>
        )}
        {displayProjects.length > 4 && (
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-[1.2fr_1fr]">
            {displayProjects.slice(4, 6).map((project) => (
              <ProjectCard key={project.slug} project={project} lang={lang} />
            ))}
          </div>
        )}

        <div className="mt-12 text-right">
          <Link href={portfolioHref}>
            <Button variant="ghost" size="md">
              {lang === 'hr' ? 'Pogledaj sve projekte' : lang === 'de' ? 'Alle Projekte anzeigen' : 'View All Projects'}
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  )
}

export { PortfolioHighlights }
export type { PortfolioHighlightsProps }
