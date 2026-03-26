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
      {/* Hero — atmospheric, editorial */}
      <section
        className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, var(--color-sunken) 0%, var(--color-base) 100%)',
        }}
      >
        {/* Grain overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
            backgroundRepeat: 'repeat',
          }}
        />
        <Container>
          <div className="relative max-w-3xl">
            {/* Meta line */}
            <div className="flex items-center gap-4 mb-8">
              <Badge>{category}</Badge>
              <span className="text-faint" style={{ fontSize: 'var(--text-small)' }}>
                {formatDate(date)}
              </span>
              <span
                className="hidden sm:inline-block w-1 h-1 rounded-full"
                style={{ backgroundColor: 'var(--color-faint)' }}
              />
              <span className="hidden sm:inline text-faint" style={{ fontSize: 'var(--text-small)' }}>
                {post.readingTime} min read
              </span>
            </div>

            {/* Title — editorial, commanding */}
            <h1
              className="font-heading text-foreground"
              style={{
                fontSize: 'var(--text-h1)',
                fontWeight: 'var(--font-weight-headline)',
                lineHeight: 'var(--leading-display)',
                letterSpacing: 'var(--tracking-h1)',
              }}
            >
              {title}
            </h1>

            {/* Red accent bar */}
            <div
              className="mt-6 mb-6"
              style={{ width: '48px', height: '2px', background: 'var(--color-brand-red)' }}
            />

            {/* Excerpt */}
            <p
              className="text-muted max-w-xl"
              style={{
                fontSize: 'var(--text-body-lg)',
                lineHeight: 'var(--leading-body)',
              }}
            >
              {excerpt}
            </p>

            {/* Tags */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-8">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-faint border border-line-subtle rounded-full px-3 py-1"
                    style={{ fontSize: 'var(--text-small)' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* Featured Image — cinematic, full-width within container */}
      {featuredImage && (
        <section className="bg-base pb-12 md:pb-16 -mt-2">
          <Container>
            <div className="max-w-4xl relative rounded-xl overflow-hidden">
              <Image
                src={`/api/blog-image/${slug}/`}
                alt={title}
                width={1200}
                height={675}
                className="w-full h-auto"
                style={{ aspectRatio: '16 / 9', objectFit: 'cover' }}
                priority
              />
              {/* Subtle bottom fade into content */}
              <div
                className="absolute inset-x-0 bottom-0 h-16 pointer-events-none"
                style={{ background: 'linear-gradient(to top, var(--color-base), transparent)' }}
              />
            </div>
          </Container>
        </section>
      )}

      {/* Content + Sidebar */}
      <section className="bg-base pb-20 md:pb-32">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,768px)_1fr] gap-12 lg:gap-16 max-w-5xl">
            {/* Article body */}
            <article>
              {/* Mobile ToC */}
              <TableOfContents html={htmlWithIds} variant="mobile" />

              <BlogPostContent html={htmlWithIds} />

              {/* Share + divider */}
              <div className="mt-16 pt-8 border-t border-line">
                <ShareButtons url={postUrl} title={title} />
              </div>
            </article>

            {/* Desktop sidebar — ToC only */}
            <div className="hidden lg:block">
              <TableOfContents html={htmlWithIds} variant="desktop" />
            </div>
          </div>

          {/* Related posts — full width, below the grid */}
          <div className="max-w-5xl">
            <RelatedPosts
              currentSlug={slug}
              currentCategory={category}
              allPosts={allPosts}
            />
          </div>
        </Container>
      </section>
    </main>
  )
}
