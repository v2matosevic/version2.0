import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo'
import { SITE_URL } from '@/lib/seo'
import { BreadcrumbJsonLd } from '@/components/seo/json-ld'
import { AnalysisFormDe } from './analysis-form-de'

export const metadata: Metadata = buildPageMetadata({
  title: 'Kostenlose Website-Analyse',
  description: 'Kostenlose Analyse Ihrer Website. Wir überprüfen Leistung, SEO und Benutzererfahrung.',
  routeKey: 'analysis',
})

export default function DeAnalysisPage() {
  return (
    <main id="main-content" className="flex-1">
      <BreadcrumbJsonLd items={[
        { name: 'Startseite', url: `${SITE_URL}/de/` },
        { name: 'Kostenlose Website-Analyse', url: `${SITE_URL}/de/analyse/` },
      ]} />
      <AnalysisFormDe />
    </main>
  )
}
