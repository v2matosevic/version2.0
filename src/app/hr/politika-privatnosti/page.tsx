import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo'
import { SITE_URL } from '@/lib/seo'
import { BreadcrumbJsonLd } from '@/components/seo/json-ld'
import { parsePage } from '@/lib/content/parse-page'
import { LegalPageContent } from '@/components/shared/legal-page-content'

export const metadata: Metadata = buildPageMetadata({
  title: 'Politika privatnosti',
  description: 'Kako Version2 prikuplja, koristi i štiti vaše osobne podatke.',
  routeKey: 'privacy-policy',
})

export default async function PolitikaPrivatnostiPage() {
  const page = await parsePage('politika-privatnosti', 'hr')
  if (!page) return <div>Page not found</div>

  return (
    <main id="main-content" className="flex-1">
      <BreadcrumbJsonLd items={[
        { name: 'Početna', url: `${SITE_URL}/hr/` },
        { name: 'Politika privatnosti', url: `${SITE_URL}/hr/politika-privatnosti/` },
      ]} />
      <LegalPageContent
        title={page.frontmatter.title}
        lastUpdated={page.frontmatter.lastModified}
        html={page.html}
      />
    </main>
  )
}
