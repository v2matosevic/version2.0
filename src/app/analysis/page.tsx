import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo'
import { SITE_URL } from '@/lib/seo'
import { BreadcrumbJsonLd } from '@/components/seo/json-ld'
import { AnalysisForm } from './analysis-form'

export const metadata: Metadata = buildPageMetadata({
  title: 'Free Website Analysis',
  description: 'Get a free analysis of your website. We\'ll review performance, SEO, and user experience.',
  routeKey: 'analysis',
})

export default function AnalysisPage() {
  return (
    <main id="main-content" className="flex-1">
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: SITE_URL },
        { name: 'Free Website Analysis', url: `${SITE_URL}/analysis/` },
      ]} />
      <AnalysisForm />
    </main>
  )
}
