'use client'

import { useState, useMemo, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { BlogCard } from '@/components/blog/blog-card'
import { CategoryFilter } from '@/components/blog/category-filter'
import { BlogSearch } from '@/components/blog/blog-search'
import { Button } from '@/components/ui/button'
import type { BlogPostMeta, BlogCategory } from '@/types/blog'

type BlogListingContentProps = {
  posts: BlogPostMeta[]
  categories: BlogCategory[]
  langPrefix?: string
}

const POSTS_PER_PAGE = 12

function BlogListingInner({ posts, categories, langPrefix = '' }: BlogListingContentProps) {
  const searchParams = useSearchParams()
  const activeCategory = searchParams.get('category') ?? 'all'
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE)

  const filteredPosts = useMemo(() => {
    if (activeCategory === 'all') return posts
    return posts.filter(
      (post) => post.frontmatter.category.toLowerCase().replace(/\s+/g, '-') === activeCategory,
    )
  }, [posts, activeCategory])

  const visiblePosts = filteredPosts.slice(0, visibleCount)
  const hasMore = visibleCount < filteredPosts.length

  return (
    <div>
      {/* Controls bar */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between mb-12">
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
        />
        <BlogSearch
          posts={posts}
          langPrefix={langPrefix}
        />
      </div>

      {/* Post grid */}
      {visiblePosts.length > 0 ? (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {visiblePosts.map((post) => (
            <BlogCard
              key={post.directorySlug}
              post={post}
              langPrefix={langPrefix}
            />
          ))}
        </div>
      ) : (
        <p
          className="text-center text-muted py-16"
          style={{ fontSize: 'var(--text-body-lg)' }}
        >
          No articles found.
        </p>
      )}

      {/* Load more */}
      {hasMore && (
        <div className="mt-12 flex justify-center">
          <Button
            variant="outline"
            size="lg"
            onClick={() => setVisibleCount((prev) => prev + POSTS_PER_PAGE)}
          >
            Load more
          </Button>
        </div>
      )}
    </div>
  )
}

function BlogListingContent(props: BlogListingContentProps) {
  return (
    <Suspense>
      <BlogListingInner {...props} />
    </Suspense>
  )
}

export { BlogListingContent }
export type { BlogListingContentProps }
