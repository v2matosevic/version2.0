import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo'
import { SITE_URL } from '@/lib/seo'
import { BreadcrumbJsonLd } from '@/components/seo/json-ld'
import { parsePage } from '@/lib/content/parse-page'
import { LegalPageContent } from '@/components/shared/legal-page-content'

export const metadata: Metadata = buildPageMetadata({
  title: 'Nutzungsbedingungen',
  description: 'Nutzungsbedingungen für Version2-Dienste und Website.',
  routeKey: 'terms-and-conditions',
})

export default async function NutzungsbedingungenPage() {
  const page = await parsePage('uvjeti-koristenja', 'de')
  if (!page) return <div>Page not found</div>

  return (
    <main id="main-content" className="flex-1">
      <BreadcrumbJsonLd items={[
        { name: 'Startseite', url: `${SITE_URL}/de/` },
        { name: 'Nutzungsbedingungen', url: `${SITE_URL}/de/nutzungsbedingungen/` },
      ]} />
      <LegalPageContent
        title={page.frontmatter.title}
        lastUpdated={page.frontmatter.lastModified}
        html={page.html}
      />
    </main>
  )
}
