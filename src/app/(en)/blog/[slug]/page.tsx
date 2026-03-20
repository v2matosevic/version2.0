import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { CURATED_SLUGS } from '@/lib/content/curated-slugs'
import { getPostBySlug } from '@/lib/content/get-post-by-slug'
import { getAllPosts } from '@/lib/content/get-all-posts'
import { buildBlogMetadata, SITE_URL } from '@/lib/seo'
import { BlogPostingJsonLd, BreadcrumbJsonLd } from '@/components/seo/json-ld'
import { Container } from '@/components/ui/container'
import { Badge } from '@/components/ui/badge'
import { BlogPostContent } from '@/components/blog/blog-post-content'
import { TableOfContents } from '@/components/blog/table-of-contents'
import { ShareButtons } from '@/components/blog/share-buttons'
import { RelatedPosts } from '@/components/blog/related-posts'
import { injectHeadingIds } from '@/lib/content/inject-heading-ids'
import '@/styles/blog-prose.css'

type BlogPostPageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  return Array.from(CURATED_SLUGS).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug, 'en')
  if (!post) return { title: 'Post Not Found — Version2' }
  return buildBlogMetadata({
    title: post.frontmatter.title,
    description: post.frontmatter.excerpt,
    slug: post.directorySlug,
    lang: 'en',
    translations: post.frontmatter.translations,
    date: post.frontmatter.date,
    author: post.frontmatter.author,
    featuredImage: post.frontmatter.featuredImage || undefined,
    tags: post.frontmatter.tags,
  })
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug, 'en')
  if (!post) notFound()

  const allPosts = await getAllPosts('en')
  const { title, excerpt, category, date, tags, lastModified, author, featuredImage } = post.frontmatter
  const postUrl = `${SITE_URL}/blog/${slug}/`
  const htmlWithIds = injectHeadingIds(post.html)

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
        { name: 'Home', url: SITE_URL },
        { name: 'Blog', url: `${SITE_URL}/blog/` },
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
                {post.readingTime} min read
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

      {/* Featured Image */}
      {featuredImage && (
        <section className="bg-base pb-8 md:pb-12">
          <Container>
            <div className="max-w-4xl">
              <Image
                src={`/api/blog-image/${slug}/`}
                alt={title}
                width={1200}
                height={675}
                className="w-full h-auto rounded-xl border border-line"
                style={{ aspectRatio: '16 / 9', objectFit: 'cover' }}
                priority
              />
            </div>
          </Container>
        </section>
      )}

      {/* Content */}
      <section className="bg-base pb-16 md:pb-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-8 max-w-5xl">
            <div>
              <TableOfContents html={htmlWithIds} />
              <BlogPostContent html={htmlWithIds} />

              <div className="mt-12 pt-8 border-t border-line">
                <ShareButtons url={postUrl} title={title} />
              </div>

              <RelatedPosts
                currentSlug={slug}
                currentCategory={category}
                allPosts={allPosts}
              />
            </div>
            <TableOfContents html={htmlWithIds} />
          </div>
        </Container>
      </section>
    </main>
  )
}
