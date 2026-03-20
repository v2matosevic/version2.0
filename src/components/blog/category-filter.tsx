'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import type { BlogCategory } from '@/types/blog'

type CategoryFilterProps = {
  categories: BlogCategory[]
  activeCategory: string
}

const ALL_SLUG = 'all'

function CategoryFilter({ categories, activeCategory }: CategoryFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleSelect = useCallback(
    (slug: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (slug === ALL_SLUG) {
        params.delete('category')
      } else {
        params.set('category', slug)
      }
      const query = params.toString()
      router.push(query ? `?${query}` : '?', { scroll: false })
    },
    [router, searchParams],
  )

  const pillClass = (isActive: boolean): string =>
    [
      'shrink-0 rounded-full px-4 py-2 text-sm font-body transition-colors cursor-pointer whitespace-nowrap',
      'border',
      isActive
        ? 'bg-brand-red border-brand-red text-white'
        : 'bg-transparent border-line text-muted hover:border-brand-red hover:text-foreground',
    ].join(' ')

  return (
    <div
      className="flex gap-2 overflow-x-auto pb-2 scrollbar-none"
      role="tablist"
      aria-label="Filter by category"
    >
      <button
        role="tab"
        aria-selected={activeCategory === ALL_SLUG}
        onClick={() => handleSelect(ALL_SLUG)}
        className={pillClass(activeCategory === ALL_SLUG)}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat.slug}
          role="tab"
          aria-selected={activeCategory === cat.slug}
          onClick={() => handleSelect(cat.slug)}
          className={pillClass(activeCategory === cat.slug)}
        >
          {cat.name}
          <span className="ml-1.5 text-xs opacity-60">{cat.count}</span>
        </button>
      ))}
    </div>
  )
}

export { CategoryFilter }
export type { CategoryFilterProps }
