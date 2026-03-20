import { BlogCard } from '@/components/blog/blog-card'
import type { BlogPostMeta } from '@/types/blog'

type RelatedPostsProps = {
  currentSlug: string
  currentCategory: string
  allPosts: BlogPostMeta[]
  langPrefix?: string
  heading?: string
}

const RELATED_COUNT = 3

function RelatedPosts({
  currentSlug,
  currentCategory,
  allPosts,
  langPrefix = '',
  heading = 'Related Articles',
}: RelatedPostsProps) {
  const related = allPosts
    .filter(
      (post) =>
        post.directorySlug !== currentSlug &&
        post.frontmatter.category === currentCategory,
    )
    .slice(0, RELATED_COUNT)

  if (related.length === 0) return null

  return (
    <section className="mt-16 pt-16 border-t border-line">
      <h2
        className="font-heading text-foreground mb-8"
        style={{
          fontSize: 'var(--text-h3)',
          fontWeight: 'var(--font-weight-headline)',
          lineHeight: 'var(--leading-tight)',
          letterSpacing: 'var(--tracking-h2)',
        }}
      >
        {heading}
      </h2>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {related.map((post) => (
          <BlogCard
            key={post.directorySlug}
            post={post}
            langPrefix={langPrefix}
          />
        ))}
      </div>
    </section>
  )
}

export { RelatedPosts }
export type { RelatedPostsProps }
