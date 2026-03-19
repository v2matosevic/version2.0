import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo'
import { SITE_URL } from '@/lib/seo'
import { BreadcrumbJsonLd } from '@/components/seo/json-ld'
import { PageHero } from '@/components/shared/page-hero'
import { ContentSection } from '@/components/shared/content-section'
import { Badge } from '@/components/ui/badge'
import { ContactForm } from '@/components/shared/contact-form'

export const metadata: Metadata = buildPageMetadata({
  title: 'Karijera',
  description: 'Pridružite se Version2 — tražimo programere kojima je stalo do kvalitete. Pogledajte otvorene pozicije.',
  routeKey: 'career',
})

export default function HrCareerPage() {
  return (
    <main id="main-content" className="flex-1">
      <BreadcrumbJsonLd items={[
        { name: 'Početna', url: `${SITE_URL}/hr/` },
        { name: 'Karijera', url: `${SITE_URL}/hr/karijera/` },
      ]} />
      <PageHero
        headline="Gradimo. Želiš pomoći?"
        subtext="Ovo nije korporativni oglas za posao. Mali smo tim za web razvoj iz Zadra koji sve gradi od nule."
      />
      <ContentSection background="raised" heading="Kako je raditi kod nas">
        <p className="text-foreground max-w-2xl" style={{ fontSize: 'var(--text-body-lg)', lineHeight: 'var(--leading-body)' } as React.CSSProperties}>
          Mali tim. Pravi projekti. Bez predložaka. Sve gradimo s React, Next.js i TypeScript. Radimo od ponedjeljka do petka, 08:00 do 16:00.
        </p>
      </ContentSection>
      <ContentSection background="base">
        <Badge>Otvorena pozicija</Badge>
        <h2 className="mt-4 mb-8 font-heading text-foreground" style={{ fontSize: 'var(--text-h2)', fontWeight: 'var(--font-weight-headline)' } as React.CSSProperties}>
          Junior Developer
        </h2>
        <p className="text-muted max-w-xl" style={{ fontSize: 'var(--text-body)', lineHeight: 'var(--leading-body)' }}>
          Tražimo nekoga tko je na početku karijere i želi postati dobar u web razvoju. Rad na pravim projektima od prvog dana, uz mentorstvo.
        </p>
      </ContentSection>
      <ContentSection background="raised" heading="Pokaži nam što si napravio/la." id="apply">
        <p className="mb-8 text-muted">Preskoči motivacijsko pismo. Tvoj rad govori više od PDF-a.</p>
        <ContactForm lang="hr" />
      </ContentSection>
    </main>
  )
}
