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
        {/* Image — with overlay gradient for depth */}
        <div
          className="relative aspect-[16/10] rounded-lg overflow-hidden mb-5"
          style={hasImage ? undefined : {
            background: 'linear-gradient(135deg, var(--color-raised) 0%, var(--color-sunken) 100%)',
          }}
        >
          {hasImage ? (
            <>
              <Image
                src={imageSrc}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-[1.03] transition-transform"
                style={{ transitionDuration: '500ms', transitionTimingFunction: 'var(--ease-out)' }}
              />
              <div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background: 'linear-gradient(to top, rgba(0,0,0,0.3), transparent 50%)',
                  transitionDuration: '500ms',
                }}
              />
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                className="font-heading text-foreground/[0.06] select-none"
                style={{ fontSize: 'clamp(3rem, 5vw, 5rem)', fontWeight: 300 }}
              >
                V2
              </span>
            </div>
          )}
        </div>

        {/* Meta line */}
        <div className="flex items-center gap-3 mb-3">
          <Badge>{category}</Badge>
          <span
            className="text-faint"
            style={{ fontSize: 'var(--text-small)' }}
          >
            {formatDate(date)}
          </span>
        </div>

        {/* Title */}
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

        {/* Excerpt */}
        <p
          className="text-muted flex-1 line-clamp-3"
          style={{
            fontSize: 'var(--text-body)',
            lineHeight: 'var(--leading-body)',
          }}
        >
          {excerpt}
        </p>

        {/* Reading time */}
        <p
          className="mt-4 text-faint"
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
