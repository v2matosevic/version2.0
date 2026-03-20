import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import type { BlogPostMeta } from '@/types/blog'

type BlogCardProps = {
  post: BlogPostMeta
  langPrefix?: string
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

function BlogCard({ post, langPrefix = '' }: BlogCardProps) {
  const href = `${langPrefix}/blog/${post.directorySlug}/`
  const { title, excerpt, category, date, featuredImage } = post.frontmatter
  const hasImage = Boolean(featuredImage)
  const imageSrc = `/api/blog-image/${post.directorySlug}/`

  return (
    <article className="group flex flex-col h-full">
      <Link href={href} className="flex flex-col h-full">
        <div
          className="relative aspect-[16/10] rounded-lg overflow-hidden mb-4"
          style={hasImage ? undefined : {
            background: 'linear-gradient(135deg, var(--color-raised) 0%, var(--color-sunken) 100%)',
          }}
        >
          {hasImage ? (
            <Image
              src={imageSrc}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-[1.03] transition-transform"
              style={{ transitionDuration: '400ms' }}
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          )}
        </div>

        <div className="flex items-center gap-3 mb-3">
          <Badge>{category}</Badge>
          <span
            className="text-faint"
            style={{ fontSize: 'var(--text-small)' }}
          >
            {formatDate(date)}
          </span>
        </div>

        <h3
          className="font-heading text-foreground mb-2 transition-colors group-hover:text-brand-red-light"
          style={{
            fontSize: 'var(--text-h4)',
            fontWeight: 'var(--font-weight-headline-bold)',
            lineHeight: 'var(--leading-snug)',
            letterSpacing: 'var(--tracking-heading)',
            transitionDuration: 'var(--duration-fast)',
          }}
        >
          {title}
        </h3>

        <p
          className="text-muted flex-1 line-clamp-3"
          style={{
            fontSize: 'var(--text-body)',
            lineHeight: 'var(--leading-body)',
          }}
        >
          {excerpt}
        </p>

        <p
          className="mt-3 text-faint"
          style={{ fontSize: 'var(--text-small)' }}
        >
          {post.readingTime} min read
        </p>
      </Link>
    </article>
  )
}

export { BlogCard }
export type { BlogCardProps }
