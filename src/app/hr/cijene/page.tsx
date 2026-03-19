import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo'
import { SITE_URL } from '@/lib/seo'
import { BreadcrumbJsonLd } from '@/components/seo/json-ld'
import { PageHero } from '@/components/shared/page-hero'
import { CTASection } from '@/components/shared/cta-section'

export const metadata: Metadata = buildPageMetadata({
  title: 'Cijene',
  description: 'Transparentne cijene za web dizajn, razvoj i AI integraciju.',
  routeKey: 'pricing',
})

export default function CijenePage() {
  return (
    <main id="main-content" className="flex-1">
      <BreadcrumbJsonLd items={[
        { name: 'Početna', url: `${SITE_URL}/hr/` },
        { name: 'Cijene', url: `${SITE_URL}/hr/cijene/` },
      ]} />
      <PageHero
        headline="Cijene"
        subtext="Uskoro. U međuvremenu, javite nam se za individualni cjenik."
      />
      <CTASection
        heading="Trebate ponudu?"
        subtext="Svaki projekt je drugačiji. Recite nam što trebate i pripremit ćemo transparentnu ponudu."
        ctaLabel="Kontaktirajte nas"
        ctaHref="/hr/kontakt/"
      />
    </main>
  )
}
