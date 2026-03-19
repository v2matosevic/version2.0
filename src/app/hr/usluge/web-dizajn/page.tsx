import type { Metadata } from 'next'
import { PageHero } from '@/components/shared/page-hero'
import { ContentSection } from '@/components/shared/content-section'
import { CTASection } from '@/components/shared/cta-section'
import { Container } from '@/components/ui/container'
import { buildPageMetadata } from '@/lib/seo'
import { ServiceJsonLd, BreadcrumbJsonLd } from '@/components/seo/json-ld'
import { SITE_URL } from '@/lib/seo'

export const metadata: Metadata = buildPageMetadata({
  title: 'Web Dizajn',
  description: 'Prilagođeni web dizajn i razvoj. Brzo, responsivno i izrađeno za konverzije.',
  routeKey: 'services/web-design',
})

const FEATURES = [
  { title: 'Prilagođeni Dizajn', description: 'Bez predložaka. Svaki raspored, svaka interakcija dizajnirana posebno za vaš brend i publiku.' },
  { title: 'Responzivni Razvoj', description: 'Savršeno na svakoj veličini ekrana. Desktop, tablet, mobitel — testirano na stvarnim uređajima.' },
  { title: 'Performanse na Prvom Mjestu', description: 'Učitavanje ispod sekunde. Optimizirane slike, učinkovit kod i pametne strategije keširanja.' },
  { title: 'SEO Temelji', description: 'Semantički HTML, strukturirani podaci, meta oznake i mape stranica ugrađene od prvog dana.' },
  { title: 'CMS Integracija', description: 'Uređujte vlastiti sadržaj bez diranja koda. Postavljamo headless CMS rješenja prilagođena vašem procesu.' },
  { title: 'Postavljanje Analitike', description: 'Znajte što funkcionira. Konfiguriramo praćenje, ciljeve i nadzorne ploče za mjerenje rezultata.' },
] as const

const PROCESS_STEPS = [
  { step: '01', title: 'Analiza', description: 'Upoznajemo vaš posao, ciljeve, konkurenciju i publiku. To oblikuje svaku odluku koja slijedi.' },
  { step: '02', title: 'Dizajn', description: 'Najprije wireframeovi, zatim vizualni dizajn. Pregledavate i iteriramo dok svaki detalj nije savršen.' },
  { step: '03', title: 'Razvoj', description: 'Čisti, moderni kod. TypeScript, React, Next.js. Testirano na svim uređajima i preglednicima.' },
  { step: '04', title: 'Lansiranje', description: 'Objavljeno na brzoj infrastrukturi. DNS, SSL, praćenje — sve riješeno. Optimizacija nakon lansiranja uključena.' },
] as const

export default function HrWebDesignPage() {
  return (
    <main id="main-content" className="flex-1">
      <ServiceJsonLd
        name="Web Dizajn"
        description="Prilagođeni web dizajn i razvoj. Brzo, responsivno i izrađeno za konverzije."
        url={`${SITE_URL}/hr/usluge/web-dizajn/`}
      />
      <BreadcrumbJsonLd items={[
        { name: 'Početna', url: SITE_URL },
        { name: 'Usluge', url: `${SITE_URL}/hr/usluge/` },
        { name: 'Web Dizajn', url: `${SITE_URL}/hr/usluge/web-dizajn/` },
      ]} />
      <PageHero
        overline="Web Dizajn"
        headline="Web stranice koje ne izgledaju kao sve ostale."
        subtext="Prilagođeni dizajn i razvoj za tvrtke koje ozbiljno shvaćaju svoju online prisutnost."
      />

      <ContentSection background="raised" overline="Što Dobivate" heading="Sve Uključeno">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {FEATURES.map((feature) => (
            <div key={feature.title}>
              <div className="mb-4 w-8 h-0.5 bg-brand-red" />
              <h3
                className="font-heading text-foreground"
                style={{ fontSize: 'var(--text-h4)', fontWeight: 'var(--font-weight-headline-bold)' } as React.CSSProperties}
              >
                {feature.title}
              </h3>
              <p className="mt-2 text-muted" style={{ fontSize: 'var(--text-body)', lineHeight: 'var(--leading-body)' }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </ContentSection>

      <section className="py-16 md:py-24 lg:py-32 bg-base">
        <Container>
          <p
            className="mb-3 uppercase text-muted font-body"
            style={{ fontSize: 'var(--text-overline)', fontWeight: 'var(--font-weight-body-semibold)', letterSpacing: 'var(--tracking-overline)' } as React.CSSProperties}
          >
            Kako Radimo
          </p>
          <h2
            className="mb-12 font-heading text-foreground"
            style={{ fontSize: 'var(--text-h2)', fontWeight: 'var(--font-weight-headline)', lineHeight: 'var(--leading-tight)', letterSpacing: 'var(--tracking-h2)' } as React.CSSProperties}
          >
            Od Briefa do Lansiranja
          </h2>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
            {PROCESS_STEPS.map((step) => (
              <div key={step.step}>
                <span className="block font-heading text-brand-red" style={{ fontSize: 'var(--text-h3)', fontWeight: 'var(--font-weight-headline)' } as React.CSSProperties}>
                  {step.step}
                </span>
                <h3
                  className="mt-2 font-heading text-foreground"
                  style={{ fontSize: 'var(--text-h4)', fontWeight: 'var(--font-weight-headline-bold)' } as React.CSSProperties}
                >
                  {step.title}
                </h3>
                <p className="mt-2 text-muted" style={{ fontSize: 'var(--text-body)', lineHeight: 'var(--leading-body)' }}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CTASection
        heading="Spremni za početak?"
        subtext="Recite nam o svom projektu. Javit ćemo vam se u roku 24 sata."
        ctaLabel="Kontaktirajte Nas"
        ctaHref="/hr/kontakt/"
      />
    </main>
  )
}
