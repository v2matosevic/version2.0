'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import Link from 'next/link'
import type { BlogPostMeta } from '@/types/blog'

type BlogSearchProps = {
  posts: BlogPostMeta[]
  langPrefix?: string
  placeholder?: string
}

type FuseInstance = {
  search(query: string): Array<{ item: BlogPostMeta; score?: number }>
}

const MAX_RESULTS = 8
const FUSE_OPTIONS = {
  keys: [
    { name: 'frontmatter.title', weight: 0.4 },
    { name: 'frontmatter.excerpt', weight: 0.25 },
    { name: 'frontmatter.category', weight: 0.2 },
    { name: 'frontmatter.tags', weight: 0.15 },
  ],
  threshold: 0.4,
  includeScore: true,
}

function BlogSearch({ posts, langPrefix = '', placeholder = 'Search articles...' }: BlogSearchProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<BlogPostMeta[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const fuseRef = useRef<FuseInstance | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  const initFuse = useCallback(async () => {
    if (fuseRef.current) return
    const Fuse = (await import('fuse.js')).default
    fuseRef.current = new Fuse(posts, FUSE_OPTIONS) as FuseInstance
  }, [posts])

  const handleSearch = useCallback(
    (value: string) => {
      setQuery(value)
      setActiveIndex(-1)
      if (!value.trim() || !fuseRef.current) {
        setResults([])
        setIsOpen(false)
        return
      }
      const matches = fuseRef.current.search(value).slice(0, MAX_RESULTS)
      setResults(matches.map((m) => m.item))
      setIsOpen(matches.length > 0)
    },
    [],
  )

  const handleFocus = useCallback(async () => {
    await initFuse()
    if (query.trim() && results.length > 0) setIsOpen(true)
  }, [initFuse, query, results.length])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!isOpen) return
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setActiveIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1))
      } else if (e.key === 'Escape') {
        setIsOpen(false)
        inputRef.current?.blur()
      }
    },
    [isOpen, results.length],
  )

  useEffect(() => {
    if (activeIndex >= 0 && listRef.current) {
      const item = listRef.current.children[activeIndex] as HTMLElement | undefined
      item?.scrollIntoView({ block: 'nearest' })
    }
  }, [activeIndex])

  const listboxId = 'blog-search-listbox'

  return (
    <div className="relative w-full max-w-md">
      <input
        ref={inputRef}
        type="search"
        role="combobox"
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        onFocus={handleFocus}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-autocomplete="list"
        aria-controls={listboxId}
        aria-activedescendant={activeIndex >= 0 ? `search-result-${activeIndex}` : undefined}
        className="w-full rounded-lg border border-line bg-sunken px-4 py-3 font-body text-foreground placeholder:text-faint focus:border-brand-red focus:ring-1 focus:ring-brand-red/20 focus:outline-none transition-colors"
        style={{ fontSize: 'var(--text-body)' }}
      />

      {isOpen && results.length > 0 && (
        <ul
          ref={listRef}
          id={listboxId}
          role="listbox"
          className="absolute z-50 mt-2 w-full rounded-lg border border-line bg-raised shadow-lg overflow-hidden"
        >
          {results.map((post, idx) => (
            <li
              key={post.directorySlug}
              id={`search-result-${idx}`}
              role="option"
              aria-selected={idx === activeIndex}
            >
              <Link
                href={`${langPrefix}/blog/${post.directorySlug}/`}
                className={[
                  'block px-4 py-3 transition-colors',
                  idx === activeIndex ? 'bg-brand-red/10 text-foreground' : 'text-muted hover:bg-raised hover:text-foreground',
                ].join(' ')}
              >
                <span className="block text-sm font-body text-foreground truncate">
                  {post.frontmatter.title}
                </span>
                <span className="block text-xs text-faint mt-0.5">
                  {post.frontmatter.category}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export { BlogSearch }
export type { BlogSearchProps }
