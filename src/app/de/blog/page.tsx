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
  description: 'Einblicke in Webdesign, SEO, Branding und digitale Strategie aus dem Version2 Studio.',
  routeKey: 'blog',
})

export default async function DeBlogPage() {
  const posts = await getAllPosts('de')
  const categories = getBlogCategories(posts)

  return (
    <main id="main-content" className="flex-1">
      <BreadcrumbJsonLd items={[
        { name: 'Startseite', url: `${SITE_URL}/de/` },
        { name: 'Blog', url: `${SITE_URL}/de/blog/` },
      ]} />
      <PageHero
        overline="Blog"
        headline="Einblicke & Strategie"
        subtext="Tiefe Einblicke in Webdesign, SEO, Branding und die Technologie, die moderne Unternehmen antreibt."
      />

      <section className="bg-base py-16 md:py-24">
        <Container>
          <BlogListingContent
            posts={posts}
            categories={categories}
            langPrefix="/de"
          />
        </Container>
      </section>
    </main>
  )
}
