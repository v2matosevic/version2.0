import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { getCaseStudy, getPortfolioSlugs, getPortfolioScreenshots } from '@/lib/content/get-case-study'
import { buildPageMetadata, SITE_URL } from '@/lib/seo'
import { BreadcrumbJsonLd } from '@/components/seo/json-ld'
import { Container } from '@/components/ui/container'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ScreenshotGallery } from '@/components/portfolio/screenshot-gallery'
import '@/styles/blog-prose.css'

type CaseStudyPageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  return getPortfolioSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params
  const study = await getCaseStudy(slug, 'hr')
  if (!study) return { title: 'Projekt nije pronađen — Version2' }

  return buildPageMetadata({
    title: study.frontmatter.title,
    description: study.frontmatter.summary,
    routeKey: 'portfolio',
    ogImage: study.frontmatter.hero_image,
  })
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params
  const study = await getCaseStudy(slug, 'hr')
  if (!study) notFound()

  const { frontmatter, html } = study
  const screenshots = getPortfolioScreenshots(slug)

  return (
    <main id="main-content" className="flex-1">
      <BreadcrumbJsonLd items={[
        { name: 'Početna', url: SITE_URL },
        { name: 'Portfolio', url: `${SITE_URL}/hr/portfolio/` },
        { name: frontmatter.title, url: `${SITE_URL}/hr/portfolio/${slug}/` },
      ]} />

      {/* Hero — atmospheric */}
      <section
        className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, var(--color-sunken) 0%, var(--color-base) 100%)',
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
            backgroundRepeat: 'repeat',
          }}
        />
        <Container>
          <div className="relative">
            <Link
              href="/hr/portfolio/"
              className="inline-flex items-center gap-2 text-muted hover:text-brand-red transition-colors mb-10"
              style={{ fontSize: 'var(--text-small)' }}
            >
              <ArrowLeft size={14} />
              Natrag na portfolio
            </Link>

            <div className="max-w-3xl">
              <p
                className="mb-4 uppercase text-brand-red font-body"
                style={{
                  fontSize: 'var(--text-overline)',
                  fontWeight: 'var(--font-weight-body-semibold)',
                  letterSpacing: 'var(--tracking-overline)',
                } as React.CSSProperties}
              >
                {frontmatter.industry} — {frontmatter.year}
              </p>
              <h1
                className="font-heading text-foreground"
                style={{
                  fontSize: 'var(--text-h1)',
                  fontWeight: 'var(--font-weight-headline)',
                  lineHeight: 'var(--leading-display)',
                  letterSpacing: 'var(--tracking-h1)',
                }}
              >
                {frontmatter.title}
              </h1>
              <div
                className="mt-6 mb-6"
                style={{ width: '48px', height: '2px', background: 'var(--color-brand-red)' }}
              />
              <p
                className="text-muted max-w-xl"
                style={{
                  fontSize: 'var(--text-body-lg)',
                  lineHeight: 'var(--leading-body)',
                }}
              >
                {frontmatter.summary}
              </p>

              {/* Tech + Services tags inline */}
              <div className="mt-8 flex flex-wrap gap-2">
                {frontmatter.tech.map((tech) => (
                  <Badge key={tech}>{tech}</Badge>
                ))}
                {frontmatter.services.map((service) => (
                  <span
                    key={service}
                    className="inline-block rounded-full px-3 py-1 text-sm border border-brand-red/30 text-brand-red"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Hero image — cinematic */}
      {frontmatter.hero_image && (
        <section className="bg-base pb-12 md:pb-16 -mt-2">
          <Container>
            <div className="relative rounded-xl overflow-hidden">
              <Image
                src={frontmatter.hero_image}
                alt={frontmatter.title}
                width={1200}
                height={750}
                className="w-full h-auto"
                priority
              />
              <div
                className="absolute inset-x-0 bottom-0 h-20 pointer-events-none"
                style={{ background: 'linear-gradient(to top, var(--color-base), transparent)' }}
              />
            </div>
          </Container>
        </section>
      )}

      {/* Content */}
      <section className="bg-base pb-20 md:pb-32">
        <Container>
          <div className="max-w-3xl">
            <div className="prose-blog" dangerouslySetInnerHTML={{ __html: html }} />

            {/* Testimonial — editorial blockquote */}
            {frontmatter.testimonial && (
              <blockquote
                className="mt-16 py-8 border-l-3 pl-8"
                style={{ borderColor: 'var(--color-brand-red)' }}
              >
                <p
                  className="font-heading text-foreground"
                  style={{
                    fontSize: 'var(--text-body-lg)',
                    fontWeight: 'var(--font-weight-headline)',
                    lineHeight: 'var(--leading-snug)',
                  }}
                >
                  &ldquo;{frontmatter.testimonial.quote}&rdquo;
                </p>
                <footer className="mt-4">
                  <strong className="text-foreground">{frontmatter.testimonial.author}</strong>
                  <span className="text-faint ml-2">{frontmatter.testimonial.role}</span>
                </footer>
              </blockquote>
            )}

            {/* Screenshots */}
            {screenshots.length > 0 && (
              <div className="mt-20">
                <h2
                  className="mb-10 font-heading text-foreground"
                  style={{
                    fontSize: 'var(--text-h3)',
                    fontWeight: 'var(--font-weight-headline)',
                    lineHeight: 'var(--leading-tight)',
                  }}
                >
                  Snimke zaslona
                </h2>
                <ScreenshotGallery images={screenshots} alt={frontmatter.title} />
              </div>
            )}

            {/* Actions */}
            <div
              className="mt-16 pt-8 flex items-center gap-4"
              style={{ borderTop: '1px solid var(--color-line)' }}
            >
              {frontmatter.url && (
                <a href={frontmatter.url} target="_blank" rel="noopener noreferrer">
                  <Button variant="primary" size="md">
                    Posjetite stranicu
                    <ExternalLink size={16} className="ml-2" />
                  </Button>
                </a>
              )}
              <Link href="/hr/portfolio/">
                <Button variant="ghost" size="md">
                  <ArrowLeft size={16} className="mr-2" />
                  Svi projekti
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  )
}
