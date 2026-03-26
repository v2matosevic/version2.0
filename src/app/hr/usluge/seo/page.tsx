import type { Metadata } from 'next'
import { PageHero } from '@/components/shared/page-hero'
import { ContentSection } from '@/components/shared/content-section'
import { CTASection } from '@/components/shared/cta-section'
import { Container } from '@/components/ui/container'
import { buildPageMetadata } from '@/lib/seo'
import { ServiceJsonLd, BreadcrumbJsonLd } from '@/components/seo/json-ld'
import { SITE_URL } from '@/lib/seo'

export const metadata: Metadata = buildPageMetadata({
  title: 'SEO',
  description: 'Tehnički SEO ugrađen u temelje. Strukturirani podaci, Core Web Vitals, indeksiranje.',
  routeKey: 'services/seo',
})

const FEATURES = [
  { title: 'Tehnički SEO Audit', description: 'Greške indeksiranja, neispravni linkovi, duplicirani sadržaj, problemi indeksacije. Pronalazimo i popravljamo sve.' },
  { title: 'Core Web Vitals', description: 'LCP, FID, CLS — metrike koje Google zaista mjeri. Optimiziramo dok svaki rezultat nije zelen.' },
  { title: 'Strukturirani Podaci', description: 'Schema markup za bogate rezultate. Vaši rezultati pretrage ističu se s ocjenama, cijenama, FAQ-ovima.' },
  { title: 'On-Page Optimizacija', description: 'Naslovi, meta opisi, hijerarhija naslova, interno povezivanje. Osnove napravljene kako treba.' },
  { title: 'Strategija Sadržaja', description: 'Istraživanje ključnih riječi, praznine u sadržaju, tematski klasteri. Plan što pisati i zašto će se rangirati.' },
  { title: 'Praćenje i Izvještaji', description: 'Mjesečni izvještaji sa stvarnim metrikama. Pozicije, promet, konverzije — ne prazne brojke.' },
] as const

const PROCESS_STEPS = [
  { step: '01', title: 'Analiza', description: 'Potpuni audit vaše stranice. Identificiramo svaki tehnički problem i propuštenu priliku.' },
  { step: '02', title: 'Dizajn', description: 'Prioritetizirani plan. Brze pobjede prvo, zatim strukturna poboljšanja koja rastu s vremenom.' },
  { step: '03', title: 'Razvoj', description: 'Implementiramo popravke i optimizacije. Tehničke promjene, ažuriranja sadržaja i strukturna poboljšanja.' },
  { step: '04', title: 'Lansiranje', description: 'Kontinuirano praćenje. SEO nije jednokratni popravak — pratimo, prilagođavamo i poboljšavamo.' },
] as const

export default function HrSEOPage() {
  return (
    <main id="main-content" className="flex-1">
      <ServiceJsonLd
        name="SEO"
        description="Tehnički SEO ugrađen u temelje. Strukturirani podaci, Core Web Vitals, indeksiranje."
        url={`${SITE_URL}/hr/usluge/seo/`}
      />
      <BreadcrumbJsonLd items={[
        { name: 'Početna', url: SITE_URL },
        { name: 'Usluge', url: `${SITE_URL}/hr/usluge/` },
        { name: 'SEO', url: `${SITE_URL}/hr/usluge/seo/` },
      ]} />
      <PageHero
        overline="SEO"
        headline="Pozicije izgrađene na stvarnim temeljima."
        subtext="Tehnički SEO, strategija sadržaja i optimizacija performansi. Bez trikova, bez prečaca."
      />

      <ContentSection background="raised" overline="Što Dobivate" heading="Kompletna SEO Usluga">
        <div className="grid grid-cols-1 gap-px md:grid-cols-2 rounded-xl overflow-hidden border border-line-subtle">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="group p-8 lg:p-10"
              style={{ background: 'var(--color-base)' }}
            >
              <div
                className="mb-5 w-8 h-0.5 transition-all group-hover:w-12"
                style={{ background: 'var(--color-brand-red)', transitionDuration: 'var(--duration-normal)' }}
              />
              <h3
                className="font-heading text-foreground"
                style={{ fontSize: 'var(--text-h4)', fontWeight: 'var(--font-weight-headline-bold)' } as React.CSSProperties}
              >
                {feature.title}
              </h3>
              <p className="mt-3 text-muted" style={{ fontSize: 'var(--text-body)', lineHeight: 'var(--leading-body)' }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </ContentSection>

      <section
        className="relative py-20 md:py-28 lg:py-36 overflow-hidden"
        style={{ background: 'linear-gradient(180deg, var(--color-base) 0%, var(--color-sunken) 50%, var(--color-base) 100%)' }}
      >
        <Container>
          <p
            className="mb-3 uppercase text-muted font-body"
            style={{ fontSize: 'var(--text-overline)', fontWeight: 'var(--font-weight-body-semibold)', letterSpacing: 'var(--tracking-overline)' } as React.CSSProperties}
          >
            Kako Radimo
          </p>
          <h2
            className="mb-16 font-heading text-foreground"
            style={{ fontSize: 'var(--text-h2)', fontWeight: 'var(--font-weight-headline)', lineHeight: 'var(--leading-tight)', letterSpacing: 'var(--tracking-h2)' } as React.CSSProperties}
          >
            Od Audita do Rezultata
          </h2>
          <div className="grid grid-cols-1 gap-0 md:grid-cols-4">
            {PROCESS_STEPS.map((step, index) => (
              <div
                key={step.step}
                className="relative py-8 md:py-0 md:px-6 first:md:pl-0 last:md:pr-0"
                style={{ borderBottom: index < PROCESS_STEPS.length - 1 ? '1px solid var(--color-line-subtle)' : 'none' }}
              >
                {index < PROCESS_STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-0 right-0 w-px h-full" style={{ background: 'var(--color-line-subtle)' }} />
                )}
                <span
                  className="block font-heading text-brand-red mb-3"
                  style={{ fontSize: 'var(--text-overline)', fontWeight: 'var(--font-weight-body-semibold)', letterSpacing: 'var(--tracking-overline)' } as React.CSSProperties}
                >
                  {step.step}
                </span>
                <h3
                  className="font-heading text-foreground mb-2"
                  style={{ fontSize: 'var(--text-h4)', fontWeight: 'var(--font-weight-headline-bold)', lineHeight: 'var(--leading-snug)' } as React.CSSProperties}
                >
                  {step.title}
                </h3>
                <p className="text-muted" style={{ fontSize: 'var(--text-body)', lineHeight: 'var(--leading-body)' }}>
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
