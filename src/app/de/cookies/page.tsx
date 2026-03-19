import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo'
import { SITE_URL } from '@/lib/seo'
import { BreadcrumbJsonLd } from '@/components/seo/json-ld'
import { parsePage } from '@/lib/content/parse-page'
import { LegalPageContent } from '@/components/shared/legal-page-content'

export const metadata: Metadata = buildPageMetadata({
  title: 'Cookie-Richtlinie',
  description: 'Wie Version2 Cookies und ähnliche Technologien verwendet.',
  routeKey: 'cookies',
})

export default async function CookiesPage() {
  const page = await parsePage('kolacici', 'de')
  if (!page) return <div>Page not found</div>

  return (
    <main id="main-content" className="flex-1">
      <BreadcrumbJsonLd items={[
        { name: 'Startseite', url: `${SITE_URL}/de/` },
        { name: 'Cookie-Richtlinie', url: `${SITE_URL}/de/cookies/` },
      ]} />
      <LegalPageContent
        title={page.frontmatter.title}
        lastUpdated={page.frontmatter.lastModified}
        html={page.html}
      />
    </main>
  )
}
