import type { Metadata } from 'next'
import { PageHero } from '@/components/shared/page-hero'
import { ContentSection } from '@/components/shared/content-section'
import { CTASection } from '@/components/shared/cta-section'
import { Container } from '@/components/ui/container'
import { buildPageMetadata } from '@/lib/seo'
import { ServiceJsonLd, BreadcrumbJsonLd } from '@/components/seo/json-ld'
import { SITE_URL } from '@/lib/seo'

export const metadata: Metadata = buildPageMetadata({
  title: 'Web Aplikacije',
  description: 'Prilagođene web aplikacije — nadzorne ploče, portali, interni alati.',
  routeKey: 'services/web-applications',
})

const FEATURES = [
  { title: 'Prilagođene Nadzorne Ploče', description: 'Vizualizacija podataka u stvarnom vremenu, upravljanje korisnicima i admin paneli za vaš specifični proces.' },
  { title: 'Klijentski Portali', description: 'Sigurna područja za prijavu gdje korisnici mogu pregledavati narudžbe, dokumente, račune i status projekta.' },
  { title: 'Interni Alati', description: 'Zamijenite tablice s namjenskim alatima. Upravljanje zalihama, CRM, raspoređivanje — što god vaš tim treba.' },
  { title: 'Značajke u Stvarnom Vremenu', description: 'Ažuriranja uživo, obavijesti, chat, kolaborativno uređivanje. WebSocket pogon kad milisekunde znače.' },
  { title: 'Razvoj API-ja', description: 'REST ili GraphQL API-ji koji povezuju vašu aplikaciju s vanjskim servisima, mobilnim aplikacijama ili drugim sustavima.' },
  { title: 'Autentikacija i Sigurnost', description: 'Pristup temeljen na ulogama, dvofaktorska autentikacija, šifrirani podaci. Sigurnost je arhitektura, ne naknadna misao.' },
] as const

const PROCESS_STEPS = [
  { step: '01', title: 'Analiza', description: 'Mapiramo vaše procese, identificiramo uska grla i definiramo što aplikacija treba riješiti.' },
  { step: '02', title: 'Dizajn', description: 'Wireframeovi i prototipi. Validiramo UX prije pisanja jedne linije produkcijskog koda.' },
  { step: '03', title: 'Razvoj', description: 'Iterativni razvoj u sprintovima. Vidite gotove funkcionalnosti svaka dva tjedna.' },
  { step: '04', title: 'Lansiranje', description: 'Postupna objava, praćenje i primopredaja koja uključuje dokumentaciju i obuku.' },
] as const

export default function HrWebApplicationsPage() {
  return (
    <main id="main-content" className="flex-1">
      <ServiceJsonLd
        name="Web Aplikacije"
        description="Prilagođene web aplikacije — nadzorne ploče, portali, interni alati."
        url={`${SITE_URL}/hr/usluge/web-aplikacije/`}
      />
      <BreadcrumbJsonLd items={[
        { name: 'Početna', url: SITE_URL },
        { name: 'Usluge', url: `${SITE_URL}/hr/usluge/` },
        { name: 'Web Aplikacije', url: `${SITE_URL}/hr/usluge/web-aplikacije/` },
      ]} />
      <PageHero
        overline="Web Aplikacije"
        headline="Software izgrađen oko vašeg procesa."
        subtext="Nadzorne ploče, portali i interni alati. Složeni problemi riješeni čistim sučeljima."
      />

      <ContentSection background="raised" overline="Što Dobivate" heading="Izgrađeno za Vaš Posao">
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
            Od Ideje do Produkcije
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
