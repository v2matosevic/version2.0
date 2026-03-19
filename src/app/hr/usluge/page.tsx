import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHero } from '@/components/shared/page-hero'
import { ContentSection } from '@/components/shared/content-section'
import { CTASection } from '@/components/shared/cta-section'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { buildPageMetadata } from '@/lib/seo'
import { BreadcrumbJsonLd } from '@/components/seo/json-ld'
import { SITE_URL } from '@/lib/seo'

export const metadata: Metadata = buildPageMetadata({
  title: 'Usluge',
  description: 'Prilagođeni web dizajn, razvoj, AI integracija, e-trgovina i SEO usluge. Sve izrađeno od nule.',
  routeKey: 'services',
})

const CORE_SERVICES = [
  { number: '01', title: 'Web Stranice', href: '/hr/usluge/web-dizajn/', description: 'Dizajnirane od nule. Brze, responzivne i napravljene za konverzije. Bez tema, bez predložaka — čisti kod oblikovan oko vašeg brenda.' },
  { number: '02', title: 'Web Aplikacije', href: '/hr/usluge/web-aplikacije/', description: 'Nadzorne ploče, portali, interni alati. Složena sučelja s podacima u stvarnom vremenu. Izgrađeno na modernim tehnologijama.' },
  { number: '03', title: 'Web Trgovine', href: '/hr/usluge/e-trgovina/', description: 'E-trgovina koja zaista funkcionira. Upravljanje proizvodima, plaćanja, dostava — sve integrirano, ništa zakrpano.' },
  { number: '04', title: 'AI Integracija', href: '/hr/usluge/ai-integracija/', description: 'Chatbotovi, generiranje sadržaja, pametna pretraga. AI koji rješava stvarne poslovne probleme, ne demo prezentacije.' },
  { number: '05', title: 'SEO', href: '/hr/usluge/seo/', description: 'Tehnički SEO ugrađen u izradu. Strukturirani podaci, Core Web Vitals, indeksiranje — temelji na kojima se grade pozicije.' },
] as const

const SUPPORTING_SERVICES = [
  { title: 'Digitalne Posjetnice', description: 'NFC kartice povezane s prilagođenom mikro-stranicom. Dotakni, podijeli, gotovo.' },
  { title: '360° Virtualne Ture', description: 'Interaktivni obilasci za hotele, restorane i nekretnine. Ugradive bilo gdje.' },
  { title: 'Integracije', description: 'Platni sustavi, CRM sinkronizacija, sustavi rezervacija, API-ji. Povezujemo što treba povezati.' },
  { title: 'Održavanje', description: 'Ažuriranja, praćenje, sigurnosne kopije, optimizacija. Održavamo sve nakon lansiranja.' },
] as const

const PROCESS_STEPS = [
  { step: '01', title: 'Analiza', description: 'Upoznajemo vaš posao, ciljeve i publiku.' },
  { step: '02', title: 'Dizajn', description: 'Wireframeovi i vizualni smjer, iterativno s vama.' },
  { step: '03', title: 'Razvoj', description: 'Čisti kod, testiran na svakom uređaju i pregledniku.' },
  { step: '04', title: 'Lansiranje', description: 'Objavljeno, praćeno i optimizirano nakon lansiranja.' },
] as const

export default function HrServicesPage() {
  return (
    <main id="main-content" className="flex-1">
      <BreadcrumbJsonLd items={[
        { name: 'Početna', url: SITE_URL },
        { name: 'Usluge', url: `${SITE_URL}/hr/usluge/` },
      ]} />
      <PageHero
        overline="Usluge"
        headline="Sve što radimo je prilagođeno."
        subtext="Bez predložaka. Bez drag-and-drop. Svaki projekt počinje od nule."
        minHeight="50vh"
      />

      {CORE_SERVICES.map((service, index) => (
        <section
          key={service.number}
          className={`py-16 md:py-24 lg:py-32 ${index % 2 === 0 ? 'bg-base' : 'bg-raised'}`}
        >
          <Container>
            <div className={`grid grid-cols-1 gap-12 lg:grid-cols-2 items-center ${index % 2 !== 0 ? 'lg:direction-rtl' : ''}`}>
              <div className={index % 2 !== 0 ? 'lg:order-2' : ''}>
                <span
                  className="block mb-4 font-heading text-brand-red"
                  style={{ fontSize: 'var(--text-h2)', fontWeight: 'var(--font-weight-headline)' } as React.CSSProperties}
                >
                  {service.number}
                </span>
                <h2
                  className="font-heading text-foreground"
                  style={{ fontSize: 'var(--text-h2)', fontWeight: 'var(--font-weight-headline)', lineHeight: 'var(--leading-tight)', letterSpacing: 'var(--tracking-h2)' } as React.CSSProperties}
                >
                  {service.title}
                </h2>
                <p
                  className="mt-4 text-muted max-w-lg"
                  style={{ fontSize: 'var(--text-body-lg)', lineHeight: 'var(--leading-body)' } as React.CSSProperties}
                >
                  {service.description}
                </p>
                <div className="mt-8">
                  <Link href={service.href}>
                    <Button variant="secondary" size="md">Saznajte Više</Button>
                  </Link>
                </div>
              </div>
              <div className={`rounded-xl bg-sunken border border-line-subtle aspect-[4/3] ${index % 2 !== 0 ? 'lg:order-1' : ''}`} />
            </div>
          </Container>
        </section>
      ))}

      <ContentSection background="raised" overline="Također" heading="Dodatne Usluge">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          {SUPPORTING_SERVICES.map((service) => (
            <div key={service.title} className="p-6 rounded-xl bg-base border border-line-subtle">
              <div className="mb-4 w-8 h-0.5 bg-brand-red" />
              <h3
                className="font-heading text-foreground"
                style={{ fontSize: 'var(--text-h4)', fontWeight: 'var(--font-weight-headline-bold)' } as React.CSSProperties}
              >
                {service.title}
              </h3>
              <p className="mt-2 text-muted" style={{ fontSize: 'var(--text-body)', lineHeight: 'var(--leading-body)' }}>
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </ContentSection>

      <section className="py-12 md:py-16 lg:py-20 bg-sunken">
        <Container>
          <p
            className="mb-8 uppercase text-muted font-body text-center"
            style={{ fontSize: 'var(--text-overline)', fontWeight: 'var(--font-weight-body-semibold)', letterSpacing: 'var(--tracking-overline)' } as React.CSSProperties}
          >
            Naš Proces
          </p>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {PROCESS_STEPS.map((step) => (
              <div key={step.step} className="text-center">
                <span className="block font-heading text-brand-red" style={{ fontSize: 'var(--text-h3)', fontWeight: 'var(--font-weight-headline)' } as React.CSSProperties}>
                  {step.step}
                </span>
                <h3
                  className="mt-2 font-heading text-foreground"
                  style={{ fontSize: 'var(--text-h4)', fontWeight: 'var(--font-weight-headline-bold)' } as React.CSSProperties}
                >
                  {step.title}
                </h3>
                <p className="mt-1 text-sm text-muted">{step.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CTASection
        heading="Ne znate gdje početi?"
        subtext="Zatražite besplatnu analizu web stranice i usmjerit ćemo vas u pravom smjeru."
        ctaLabel="Besplatna Analiza"
        ctaHref="/hr/analiza/"
      />
    </main>
  )
}
