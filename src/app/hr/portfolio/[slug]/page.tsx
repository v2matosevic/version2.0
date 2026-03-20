import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { getCaseStudy, getPortfolioSlugs } from '@/lib/content/get-case-study'
import { buildPageMetadata, SITE_URL } from '@/lib/seo'
import { BreadcrumbJsonLd } from '@/components/seo/json-ld'
import { Container } from '@/components/ui/container'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
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

  return (
    <main id="main-content" className="flex-1">
      <BreadcrumbJsonLd items={[
        { name: 'Početna', url: SITE_URL },
        { name: 'Portfolio', url: `${SITE_URL}/hr/portfolio/` },
        { name: frontmatter.title, url: `${SITE_URL}/hr/portfolio/${slug}/` },
      ]} />

      <section className="bg-base pt-32 pb-12 md:pt-40 md:pb-16">
        <Container>
          <Link
            href="/hr/portfolio/"
            className="inline-flex items-center gap-2 text-muted hover:text-brand-red transition-colors mb-8"
            style={{ fontSize: 'var(--text-small)' }}
          >
            <ArrowLeft size={16} />
            Natrag na portfolio
          </Link>

          <div className="max-w-3xl">
            <p
              className="mb-3 uppercase text-muted font-body"
              style={{
                fontSize: 'var(--text-overline)',
                fontWeight: 'var(--font-weight-body-semibold)',
                letterSpacing: 'var(--tracking-overline)',
              } as React.CSSProperties}
            >
              {frontmatter.industry} — {frontmatter.year}
            </p>
            <h1
              className="font-heading text-foreground mb-4"
              style={{
                fontSize: 'var(--text-h1)',
                fontWeight: 'var(--font-weight-headline)',
                lineHeight: 'var(--leading-display)',
                letterSpacing: 'var(--tracking-h1)',
              }}
            >
              {frontmatter.title}
            </h1>
            <p
              className="text-muted max-w-xl"
              style={{
                fontSize: 'var(--text-body-lg)',
                lineHeight: 'var(--leading-body)',
              }}
            >
              {frontmatter.summary}
            </p>
          </div>
        </Container>
      </section>

      {frontmatter.hero_image && (
        <section className="bg-base pb-12">
          <Container>
            <div className="rounded-xl overflow-hidden border border-line">
              <Image
                src={frontmatter.hero_image}
                alt={frontmatter.title}
                width={1200}
                height={750}
                className="w-full h-auto"
                priority
              />
            </div>
          </Container>
        </section>
      )}

      <section className="bg-base pb-16 md:pb-24">
        <Container>
          <div className="max-w-3xl">
            <div className="prose-blog" dangerouslySetInnerHTML={{ __html: html }} />

            <div className="mt-12 flex flex-wrap gap-2">
              {frontmatter.tech.map((tech) => (
                <Badge key={tech}>{tech}</Badge>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {frontmatter.services.map((service) => (
                <span
                  key={service}
                  className="inline-block rounded-full px-3 py-1 text-sm border border-brand-red/30 text-brand-red"
                >
                  {service}
                </span>
              ))}
            </div>

            {frontmatter.testimonial && (
              <blockquote className="mt-12 border-l-2 border-brand-red pl-6 py-2">
                <p className="text-muted italic" style={{ fontSize: 'var(--text-body-lg)' }}>
                  &ldquo;{frontmatter.testimonial.quote}&rdquo;
                </p>
                <footer className="mt-4 text-foreground">
                  <strong>{frontmatter.testimonial.author}</strong>
                  <span className="text-faint ml-2">{frontmatter.testimonial.role}</span>
                </footer>
              </blockquote>
            )}

            <div className="mt-12 flex items-center gap-4">
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
