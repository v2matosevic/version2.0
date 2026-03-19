import type { Metadata } from 'next'
import { getAllPosts } from '@/lib/content/get-all-posts'
import { getBlogCategories } from '@/lib/content/get-blog-categories'
import { buildPageMetadata, SITE_URL } from '@/lib/seo'
import { BreadcrumbJsonLd } from '@/components/seo/json-ld'
import { PageHero } from '@/components/shared/page-hero'
import { Container } from '@/components/ui/container'
import { BlogListingContent } from '@/components/blog/blog-listing-content'

export const metadata: Metadata = buildPageMetadata({
  title: 'Blog',
  description: 'Uvidi o web dizajnu, SEO-u, brendiranju i digitalnoj strategiji iz Version2 studija.',
  routeKey: 'blog',
})

export default async function HrBlogPage() {
  const posts = await getAllPosts('hr')
  const categories = getBlogCategories(posts)

  return (
    <main id="main-content" className="flex-1">
      <BreadcrumbJsonLd items={[
        { name: 'Početna', url: `${SITE_URL}/hr/` },
        { name: 'Blog', url: `${SITE_URL}/hr/blog/` },
      ]} />
      <PageHero
        overline="Blog"
        headline="Uvidi i strategija"
        subtext="Duboki uvidi u web dizajn, SEO, brendiranje i tehnologiju koja pokrece moderna poslovanja."
      />

      <section className="bg-base py-16 md:py-24">
        <Container>
          <BlogListingContent
            posts={posts}
            categories={categories}
            langPrefix="/hr"
          />
        </Container>
      </section>
    </main>
  )
}
