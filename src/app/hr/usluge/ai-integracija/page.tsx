import type { Metadata } from 'next'
import { PageHero } from '@/components/shared/page-hero'
import { ContentSection } from '@/components/shared/content-section'
import { CTASection } from '@/components/shared/cta-section'
import { Container } from '@/components/ui/container'
import { buildPageMetadata } from '@/lib/seo'
import { ServiceJsonLd, BreadcrumbJsonLd } from '@/components/seo/json-ld'
import { SITE_URL } from '@/lib/seo'

export const metadata: Metadata = buildPageMetadata({
  title: 'AI Integracija',
  description: 'AI chatbotovi, generiranje sadržaja, pametna pretraga. AI koji rješava stvarne poslovne probleme.',
  routeKey: 'services/ai-integration',
})

const FEATURES = [
  { title: 'AI Chatbotovi', description: 'Korisnička podrška koja radi 24/7. Trenirana na vašim podacima, ugrađena u web stranicu, odgovara na stvarna pitanja.' },
  { title: 'Generiranje Sadržaja', description: 'Opisi proizvoda, nacrti blogova, email tekstovi. AI asistirana pisanja koja štede sate svaki tjedan.' },
  { title: 'Pametna Pretraga', description: 'Semantička pretraga koja razumije namjeru, ne samo ključne riječi. Korisnici brže pronalaze što trebaju.' },
  { title: 'Analiza Podataka', description: 'Izvlačenje uvida iz dokumenata, tablica i baza podataka. Pretvorite nestrukturirane podatke u korisne izvještaje.' },
  { title: 'Automatizacija Procesa', description: 'Klasifikacija emailova, usmjeravanje zahtjeva, ekstrakcija podataka s računa. Ponavljajući zadaci koje AI obrađuje.' },
  { title: 'Prilagođeni AI Alati', description: 'Specifični za vašu industriju i proces. Gradimo AI rješenja koja rješavaju vaše probleme, ne generičke.' },
] as const

const PROCESS_STEPS = [
  { step: '01', title: 'Analiza', description: 'Identificiramo gdje AI zaista može uštedjeti vrijeme ili novac. Bez pretjerivanja — samo praktične prilike.' },
  { step: '02', title: 'Dizajn', description: 'Arhitektura i tok podataka. Planiramo integraciju, biramo prave modele i definiramo metrike uspjeha.' },
  { step: '03', title: 'Razvoj', description: 'Iterativni razvoj sa stvarnim podacima. Testiramo točnost, latenciju i rubne slučajeve prije objave.' },
  { step: '04', title: 'Lansiranje', description: 'Objavljeno s praćenjem i povratnim petljama. AI se poboljšava s vremenom na stvarnim podacima.' },
] as const

export default function HrAIIntegrationPage() {
  return (
    <main id="main-content" className="flex-1">
      <ServiceJsonLd
        name="AI Integracija"
        description="AI chatbotovi, generiranje sadržaja, pametna pretraga. AI koji rješava stvarne poslovne probleme."
        url={`${SITE_URL}/hr/usluge/ai-integracija/`}
      />
      <BreadcrumbJsonLd items={[
        { name: 'Početna', url: SITE_URL },
        { name: 'Usluge', url: `${SITE_URL}/hr/usluge/` },
        { name: 'AI Integracija', url: `${SITE_URL}/hr/usluge/ai-integracija/` },
      ]} />
      <PageHero
        overline="AI Integracija"
        headline="AI koji rješava stvarne probleme."
        subtext="Ne chatbot demo. Prava AI integracija u vaš poslovni proces."
      />

      <ContentSection background="raised" overline="Što Dobivate" heading="Praktična AI Rješenja">
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
            Od Koncepta do Integracije
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
