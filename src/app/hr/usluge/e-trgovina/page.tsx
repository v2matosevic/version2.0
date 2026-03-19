import type { Metadata } from 'next'
import { PageHero } from '@/components/shared/page-hero'
import { ContentSection } from '@/components/shared/content-section'
import { CTASection } from '@/components/shared/cta-section'
import { Container } from '@/components/ui/container'
import { buildPageMetadata } from '@/lib/seo'
import { ServiceJsonLd, BreadcrumbJsonLd } from '@/components/seo/json-ld'
import { SITE_URL } from '@/lib/seo'

export const metadata: Metadata = buildPageMetadata({
  title: 'E-Trgovina',
  description: 'Prilagođena e-trgovina rješenja. Upravljanje proizvodima, plaćanja, dostava — sve integrirano.',
  routeKey: 'services/e-commerce',
})

const FEATURES = [
  { title: 'Upravljanje Proizvodima', description: 'Kategorije, varijante, cijene, zalihe. Backend koji upravljanje stotinama proizvoda čini bezbolnim.' },
  { title: 'Obrada Plaćanja', description: 'Stripe, PayPal, bankovni prijenos, pouzeće. Više kanala, jedno besprijekorno iskustvo naplate.' },
  { title: 'Integracija Dostave', description: 'Cijene u stvarnom vremenu, ispis naljepnica, praćenje. Povezano s lokalnim i međunarodnim dostavljačima.' },
  { title: 'Mobile-First Dizajn', description: 'Većina kupaca kupuje na mobitelima. Svaka interakcija optimizirana za dodir i brzinu.' },
  { title: 'Analitika i Izvještaji', description: 'Prihod, stopa konverzije, napuštene košarice, popularni proizvodi. Podaci koji pomažu prodavati više.' },
  { title: 'Više Valuta i Jezika', description: 'Prodajte preko granica. Više jezika, valuta i poreznih pravila pravilno obrađenih.' },
] as const

const PROCESS_STEPS = [
  { step: '01', title: 'Analiza', description: 'Analiziramo vaše proizvode, publiku i konkurenciju za definiranje prave e-commerce strategije.' },
  { step: '02', title: 'Dizajn', description: 'Rasporedi fokusirani na konverziju. Stranice proizvoda, košarica, naplata — svaki korak dizajniran za smanjenje trenja.' },
  { step: '03', title: 'Razvoj', description: 'Sigurno, brzo, testirano. Integracije plaćanja verificirane. Import proizvoda automatiziran gdje je moguće.' },
  { step: '04', title: 'Lansiranje', description: 'Objava s povjerenjem. Praćenje, sigurnosne kopije i podrška za prvu valnu narudžbi.' },
] as const

export default function HrEcommercePage() {
  return (
    <main id="main-content" className="flex-1">
      <ServiceJsonLd
        name="E-Trgovina"
        description="Prilagođena e-trgovina rješenja. Upravljanje proizvodima, plaćanja, dostava — sve integrirano."
        url={`${SITE_URL}/hr/usluge/e-trgovina/`}
      />
      <BreadcrumbJsonLd items={[
        { name: 'Početna', url: SITE_URL },
        { name: 'Usluge', url: `${SITE_URL}/hr/usluge/` },
        { name: 'E-Trgovina', url: `${SITE_URL}/hr/usluge/e-trgovina/` },
      ]} />
      <PageHero
        overline="E-Trgovina"
        headline="Web trgovine koje zaista prodaju."
        subtext="Prilagođena e-commerce rješenja. Ne WooCommerce tema s vašim logom."
      />

      <ContentSection background="raised" overline="Što Dobivate" heading="Kompletna E-Trgovina">
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
            Od Kataloga do Naplate
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
