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
  description: 'Insights on web design, SEO, branding, and digital strategy from the Version2 studio.',
  routeKey: 'blog',
})

export default async function BlogPage() {
  const posts = await getAllPosts('en')
  const categories = getBlogCategories(posts)

  return (
    <main id="main-content" className="flex-1">
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: SITE_URL },
        { name: 'Blog', url: `${SITE_URL}/blog/` },
      ]} />
      <PageHero
        overline="Blog"
        headline="Insights & Strategy"
        subtext="Deep dives into web design, SEO, branding, and the technology that powers modern businesses."
      />

      <section className="bg-base py-16 md:py-24">
        <Container>
          <BlogListingContent
            posts={posts}
            categories={categories}
          />
        </Container>
      </section>
    </main>
  )
}
