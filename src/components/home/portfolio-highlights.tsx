import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { ScrollReveal } from '@/components/animations'
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

const LABELS = {
  en: { overline: 'Selected Work', heading: 'Projects that prove the point.', cta: 'View All Projects', view: 'View Project' },
  hr: { overline: 'Odabrani radovi', heading: 'Projekti koji dokazuju tvrdnju.', cta: 'Pogledaj sve projekte', view: 'Pogledaj projekt' },
  de: { overline: 'Ausgewählte Arbeiten', heading: 'Projekte, die den Punkt beweisen.', cta: 'Alle Projekte anzeigen', view: 'Projekt ansehen' },
} as const

type Labels = { overline: string; heading: string; cta: string; view: string }

function FeaturedProject({ project, lang, labels }: { project: PortfolioProject; lang: Language; labels: Labels }) {
  const langPrefix = lang === 'hr' ? '/hr' : lang === 'de' ? '/de' : ''

  return (
    <Link
      href={`${langPrefix}/portfolio/${project.slug}/`}
      className="group block relative rounded-xl overflow-hidden"
    >
      {/* Cinematic aspect ratio — wider than 16:9 */}
      <div className="relative" style={{ aspectRatio: '21 / 9' }}>
        <Image
          src={project.image}
          alt={project.name}
          fill
          sizes="100vw"
          className="object-cover group-hover:scale-[1.02] transition-transform"
          style={{
            transitionDuration: '800ms',
            transitionTimingFunction: 'var(--ease-out)',
          }}
          priority
        />

        {/* Strong bottom gradient for text legibility */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to top, rgba(12,12,12,0.95) 0%, rgba(12,12,12,0.5) 35%, rgba(12,12,12,0.1) 60%, transparent 80%)',
          }}
          aria-hidden="true"
        />

        {/* Hover: slightly stronger overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
          style={{
            background: 'rgba(12,12,12,0.15)',
            transitionDuration: '600ms',
          }}
          aria-hidden="true"
        />

        {/* Project info — bottom-left overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 lg:p-12">
          <span
            className="block text-brand-red font-body uppercase mb-3"
            style={{
              fontSize: 'var(--text-overline)',
              fontWeight: 600,
              letterSpacing: 'var(--tracking-overline)',
            }}
          >
            {project.industry}
          </span>
          <h3
            className="font-heading text-white"
            style={{
              fontSize: 'clamp(1.75rem, 4vw, 3rem)',
              fontWeight: 300,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            } as React.CSSProperties}
          >
            {project.name}
          </h3>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            {project.tech.slice(0, 3).map((t) => (
              <span
                key={t}
                className="font-body text-white/70"
                style={{ fontSize: 'var(--text-small)' }}
              >
                {t}
              </span>
            ))}
            <span className="text-white/30 mx-1" aria-hidden="true">·</span>
            <span
              className="inline-flex items-center gap-1.5 text-brand-red-light font-body group-hover:gap-2.5 transition-all"
              style={{
                fontSize: 'var(--text-small)',
                fontWeight: 600,
                transitionDuration: 'var(--duration-normal)',
              }}
            >
              {labels.view} <ArrowRight size={14} />
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

function CompactProjectCard({ project, lang }: { project: PortfolioProject; lang: Language }) {
  const langPrefix = lang === 'hr' ? '/hr' : lang === 'de' ? '/de' : ''

  return (
    <Link
      href={`${langPrefix}/portfolio/${project.slug}/`}
      className="group block"
    >
      <div className="relative rounded-lg overflow-hidden border border-line-subtle group-hover:border-line transition-colors"
        style={{
          aspectRatio: '3 / 2',
          transitionDuration: 'var(--duration-normal)',
        }}
      >
        <Image
          src={project.image}
          alt={project.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover group-hover:scale-[1.03] transition-transform"
          style={{
            transitionDuration: '600ms',
            transitionTimingFunction: 'var(--ease-out)',
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to top, rgba(12,12,12,0.7) 0%, rgba(12,12,12,0.1) 50%, transparent 70%)',
          }}
          aria-hidden="true"
        />
        {/* Name overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <p
            className="font-heading text-white"
            style={{
              fontSize: 'var(--text-body)',
              fontWeight: 'var(--font-weight-headline-bold)',
              lineHeight: 'var(--leading-snug)',
            }}
          >
            {project.name}
          </p>
          <p className="mt-0.5 text-white/50" style={{ fontSize: 'var(--text-small)' }}>
            {project.industry}
          </p>
        </div>
      </div>
    </Link>
  )
}

function PortfolioHighlights({ projects, lang }: PortfolioHighlightsProps) {
  const labels = LABELS[lang] ?? LABELS.en
  const portfolioHref = lang === 'hr' ? '/hr/portfolio/' : lang === 'de' ? '/de/portfolio/' : '/portfolio/'
  const featured = projects[0]
  const grid = projects.slice(1, 6)

  return (
    <section
      className="relative py-20 md:py-28 lg:py-36 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, var(--color-sunken) 0%, var(--color-base) 40%, var(--color-sunken) 100%)',
      }}
    >
      {/* Grain texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.04\'/%3E%3C/svg%3E")',
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px',
          opacity: 0.3,
        }}
        aria-hidden="true"
      />

      <Container className="relative">
        {/* Header */}
        <ScrollReveal direction="up" delay={0}>
          <p
            className="mb-3 uppercase text-brand-red font-body"
            style={{
              fontSize: 'var(--text-overline)',
              fontWeight: 'var(--font-weight-body-semibold)',
              letterSpacing: 'var(--tracking-overline)',
            } as React.CSSProperties}
          >
            {labels.overline}
          </p>
        </ScrollReveal>
        <ScrollReveal direction="up" delay={0.1}>
          <h2
            className="mb-12 md:mb-16 font-heading text-foreground"
            style={{
              fontSize: 'var(--text-h2)',
              fontWeight: 'var(--font-weight-headline)',
              lineHeight: 'var(--leading-tight)',
              letterSpacing: 'var(--tracking-h2)',
            } as React.CSSProperties}
          >
            {labels.heading}
          </h2>
        </ScrollReveal>

        {/* Featured project — cinematic hero */}
        {featured && (
          <ScrollReveal direction="up" delay={0.15}>
            <FeaturedProject project={featured} lang={lang} labels={labels} />
          </ScrollReveal>
        )}

        {/* Compact grid — remaining projects */}
        {grid.length > 0 && (
          <div className="mt-8 md:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {grid.map((project, idx) => (
              <ScrollReveal key={project.slug} direction="up" delay={0.1 + idx * 0.08}>
                <CompactProjectCard project={project} lang={lang} />
              </ScrollReveal>
            ))}
          </div>
        )}

        {/* CTA — left-aligned, confident */}
        <ScrollReveal direction="up" delay={0.3}>
          <div className="mt-12 md:mt-14">
            <Link
              href={portfolioHref}
              className="group inline-flex items-center gap-3 text-foreground hover:text-brand-red transition-colors"
              style={{
                fontSize: 'var(--text-body-lg)',
                fontWeight: 'var(--font-weight-body-semibold)',
                transitionDuration: 'var(--duration-normal)',
              } as React.CSSProperties}
            >
              {labels.cta}
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
                style={{ transitionDuration: 'var(--duration-normal)' }}
              />
            </Link>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  )
}

export { PortfolioHighlights }
export type { PortfolioHighlightsProps }
