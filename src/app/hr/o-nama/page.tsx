import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo'
import { SITE_URL } from '@/lib/seo'
import { JsonLd, BreadcrumbJsonLd } from '@/components/seo/json-ld'
import { PageHero } from '@/components/shared/page-hero'
import { ContentSection } from '@/components/shared/content-section'
import { CTASection } from '@/components/shared/cta-section'

export const metadata: Metadata = buildPageMetadata({
  title: 'O nama',
  description: 'Saznajte više o Version2 — studio za web dizajn i razvoj sa sjedištem u Zadru. Izrađujemo prilagođene web stranice, web aplikacije i AI alate od nule.',
  routeKey: 'about',
})

const STATS = [
  { number: '100+', label: 'Projekata' },
  { number: '100+', label: 'Klijenata' },
  { number: '5.0', label: 'Ocjena' },
  { number: '40+', label: 'Recenzija' },
  { number: '2022', label: 'Osnovano' },
] as const

export default function HrAboutPage() {
  return (
    <main id="main-content" className="flex-1">
      <BreadcrumbJsonLd items={[
        { name: 'Početna', url: `${SITE_URL}/hr/` },
        { name: 'O nama', url: `${SITE_URL}/hr/o-nama/` },
      ]} />
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: 'O nama — Version2',
        description: 'Saznajte više o Version2 — studio za web dizajn i razvoj sa sjedištem u Zadru.',
        url: `${SITE_URL}/hr/o-nama/`,
        mainEntity: { '@id': `${SITE_URL}/#business` },
      }} />
      <PageHero headline="Mi smo Version2. Pišemo kod." minHeight="50vh" />
      <ContentSection background="base">
        <p className="text-foreground max-w-xl" style={{ fontSize: 'var(--text-body-lg)', lineHeight: 'var(--leading-body)' } as React.CSSProperties}>
          Započeli smo u rujnu 2022. u Zadru, Hrvatska. Mali tim koji gradi stvari za web. Sada radimo samo ono u čemu smo najbolji: pišemo kod i isporučujemo projekte. Više od 100 do sada.
        </p>
      </ContentSection>
      <section className="py-12 md:py-16 lg:py-20 bg-sunken">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-between items-center gap-8">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-heading text-foreground" style={{ fontSize: 'var(--text-h2)', fontWeight: 'var(--font-weight-headline-bold)' } as React.CSSProperties}>
                  {stat.number}
                </div>
                <p className="mt-1 text-sm text-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CTASection
        heading="Želite vidjeti jesmo li pravi izbor?"
        subtext="Započnimo razgovor. Bez prezentacija. Bez prodajnih poziva."
        ctaLabel="Kontaktirajte nas"
        ctaHref="/hr/kontakt/"
      />
    </main>
  )
}
