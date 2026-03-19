import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo'
import { SITE_URL } from '@/lib/seo'
import { BreadcrumbJsonLd } from '@/components/seo/json-ld'
import { AnalysisFormHr } from './analysis-form-hr'

export const metadata: Metadata = buildPageMetadata({
  title: 'Besplatna analiza web stranice',
  description: 'Besplatna analiza vaše web stranice. Pregledamo performanse, SEO i korisničko iskustvo.',
  routeKey: 'analysis',
})

export default function HrAnalysisPage() {
  return (
    <main id="main-content" className="flex-1">
      <BreadcrumbJsonLd items={[
        { name: 'Početna', url: `${SITE_URL}/hr/` },
        { name: 'Besplatna analiza web stranice', url: `${SITE_URL}/hr/analiza/` },
      ]} />
      <AnalysisFormHr />
    </main>
  )
}
