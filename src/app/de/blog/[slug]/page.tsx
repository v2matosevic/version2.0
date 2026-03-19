import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CURATED_SLUGS } from '@/lib/content/curated-slugs'
import { getPostBySlug } from '@/lib/content/get-post-by-slug'
import { getAllPosts } from '@/lib/content/get-all-posts'
import { buildBlogMetadata, SITE_URL } from '@/lib/seo'
import { BlogPostingJsonLd, BreadcrumbJsonLd } from '@/components/seo/json-ld'
import { Container } from '@/components/ui/container'
import { Badge } from '@/components/ui/badge'
import { BlogPostContent } from '@/components/blog/blog-post-content'
import { ShareButtons } from '@/components/blog/share-buttons'
import { RelatedPosts } from '@/components/blog/related-posts'
import '@/styles/blog-prose.css'

type DeBlogPostPageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  return Array.from(CURATED_SLUGS).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: DeBlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug, 'de')
  if (!post) return { title: 'Artikel nicht gefunden — Version2' }
  return buildBlogMetadata({
    title: post.frontmatter.title,
    description: post.frontmatter.excerpt,
    slug: post.directorySlug,
    lang: 'de',
    translations: post.frontmatter.translations,
    date: post.frontmatter.date,
    author: post.frontmatter.author,
    featuredImage: post.frontmatter.featuredImage || undefined,
    tags: post.frontmatter.tags,
  })
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('de-DE', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export default async function DeBlogPostPage({ params }: DeBlogPostPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug, 'de')
  if (!post) notFound()

  const allPosts = await getAllPosts('de')
  const { title, excerpt, category, date, tags, lastModified, author, featuredImage } = post.frontmatter
  const postUrl = `${SITE_URL}/de/blog/${slug}/`

  return (
    <main id="main-content" className="flex-1">
      <BlogPostingJsonLd
        title={title}
        description={excerpt}
        url={postUrl}
        datePublished={date}
        dateModified={lastModified || date}
        author={author}
        image={featuredImage || undefined}
      />
      <BreadcrumbJsonLd items={[
        { name: 'Startseite', url: `${SITE_URL}/de/` },
        { name: 'Blog', url: `${SITE_URL}/de/blog/` },
        { name: title, url: postUrl },
      ]} />
      {/* Hero */}
      <section className="bg-base pt-32 pb-12 md:pt-40 md:pb-16">
        <Container>
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <Badge>{category}</Badge>
              <span className="text-faint" style={{ fontSize: 'var(--text-small)' }}>
                {formatDate(date)}
              </span>
              <span className="text-faint" style={{ fontSize: 'var(--text-small)' }}>
                {post.readingTime} Min. Lesezeit
              </span>
            </div>
            <h1
              className="font-heading text-foreground mb-4"
              style={{
                fontSize: 'var(--text-h1)',
                fontWeight: 'var(--font-weight-headline)',
                lineHeight: 'var(--leading-display)',
                letterSpacing: 'var(--tracking-h1)',
              }}
            >
              {title}
            </h1>
            <p
              className="text-muted max-w-xl"
              style={{
                fontSize: 'var(--text-body-lg)',
                lineHeight: 'var(--leading-body)',
              }}
            >
              {excerpt}
            </p>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-6">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-faint"
                    style={{ fontSize: 'var(--text-small)' }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* Content */}
      <section className="bg-base pb-16 md:pb-24">
        <Container>
          <div className="max-w-3xl">
            <BlogPostContent html={post.html} />

            <div className="mt-12 pt-8 border-t border-line">
              <ShareButtons
                url={postUrl}
                title={title}
                label="Diesen Artikel teilen"
              />
            </div>

            <RelatedPosts
              currentSlug={slug}
              currentCategory={category}
              allPosts={allPosts}
              langPrefix="/de"
              heading="Verwandte Artikel"
            />
          </div>
        </Container>
      </section>
    </main>
  )
}
