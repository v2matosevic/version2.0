import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo'
import { SITE_URL } from '@/lib/seo'
import { BreadcrumbJsonLd } from '@/components/seo/json-ld'
import { parsePage } from '@/lib/content/parse-page'
import { LegalPageContent } from '@/components/shared/legal-page-content'

export const metadata: Metadata = buildPageMetadata({
  title: 'Pravna obavijest',
  description: 'Pravna obavijest i podaci o tvrtki Version2 d.o.o.',
  routeKey: 'legal-notice',
})

export default async function PravnaObavijestPage() {
  const page = await parsePage('pravna-obavijest', 'hr')
  if (!page) return <div>Page not found</div>

  return (
    <main id="main-content" className="flex-1">
      <BreadcrumbJsonLd items={[
        { name: 'Početna', url: `${SITE_URL}/hr/` },
        { name: 'Pravna obavijest', url: `${SITE_URL}/hr/pravna-obavijest/` },
      ]} />
      <LegalPageContent
        title={page.frontmatter.title}
        lastUpdated={page.frontmatter.lastModified}
        html={page.html}
      />
    </main>
  )
}
