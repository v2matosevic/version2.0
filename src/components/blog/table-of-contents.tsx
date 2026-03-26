'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

type TocHeading = {
  id: string
  text: string
  level: 2 | 3
}

type TableOfContentsProps = {
  html: string
  variant?: 'auto' | 'mobile' | 'desktop'
}

const HEADING_REGEX = /<h([23])[^>]*id="([^"]*)"[^>]*>(.*?)<\/h[23]>/gi
const MIN_HEADINGS = 3

function parseHeadings(html: string): TocHeading[] {
  const headings: TocHeading[] = []
  let match: RegExpExecArray | null

  // Reset lastIndex for global regex
  HEADING_REGEX.lastIndex = 0

  while ((match = HEADING_REGEX.exec(html)) !== null) {
    const level = Number(match[1]) as 2 | 3
    const id = match[2]
    const text = match[3].replace(/<[^>]*>/g, '').trim()
    headings.push({ id, text, level })
  }

  return headings
}

function TableOfContents({ html, variant = 'auto' }: TableOfContentsProps) {
  const headings = parseHeadings(html)
  const [activeId, setActiveId] = useState<string>('')
  const [isOpen, setIsOpen] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)

  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    // Find the topmost visible heading
    const visibleEntries = entries.filter((entry) => entry.isIntersecting)
    if (visibleEntries.length > 0) {
      // Pick the one closest to the top of the viewport
      const topEntry = visibleEntries.reduce((prev, curr) =>
        prev.boundingClientRect.top < curr.boundingClientRect.top ? prev : curr,
      )
      setActiveId(topEntry.target.id)
    }
  }, [])

  useEffect(() => {
    if (headings.length < MIN_HEADINGS) return

    observerRef.current = new IntersectionObserver(handleObserver, {
      rootMargin: '-80px 0px -60% 0px',
      threshold: 0,
    })

    const elements = headings
      .map((h) => document.getElementById(h.id))
      .filter(Boolean) as HTMLElement[]

    elements.forEach((el) => observerRef.current?.observe(el))

    return () => {
      observerRef.current?.disconnect()
    }
  }, [headings, handleObserver])

  if (headings.length < MIN_HEADINGS) return null

  function handleClick(id: string): void {
    const element = document.getElementById(id)
    if (!element) return
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setActiveId(id)
    setIsOpen(false)
  }

  const showMobile = variant === 'auto' || variant === 'mobile'
  const showDesktop = variant === 'auto' || variant === 'desktop'

  return (
    <>
      {/* Mobile: collapsible section above content */}
      {showMobile && <nav
        className="lg:hidden mb-8"
        aria-label="Table of contents"
      >
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex w-full items-center justify-between rounded-lg border border-line px-4 py-3 text-foreground transition-colors hover:border-brand-red"
          style={{ fontSize: 'var(--text-small)' }}
        >
          <span className="font-medium">Table of Contents</span>
          <svg
            className={`h-4 w-4 text-muted transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {isOpen && (
          <ul className="mt-2 space-y-1 rounded-lg border border-line p-4">
            {headings.map((heading) => (
              <li
                key={heading.id}
                className={heading.level === 3 ? 'pl-4' : ''}
              >
                <button
                  type="button"
                  onClick={() => handleClick(heading.id)}
                  className={`block w-full text-left py-1 transition-colors ${
                    activeId === heading.id
                      ? 'text-foreground'
                      : 'text-muted hover:text-foreground'
                  }`}
                  style={{ fontSize: 'var(--text-small)' }}
                >
                  {activeId === heading.id && (
                    <span
                      className="inline-block w-1.5 h-1.5 rounded-full mr-2 align-middle"
                      style={{ backgroundColor: '#991717' }}
                    />
                  )}
                  {heading.text}
                </button>
              </li>
            ))}
          </ul>
        )}
      </nav>}

      {/* Desktop: sticky sidebar */}
      {showDesktop && <aside
        className="hidden lg:block"
        aria-label="Table of contents"
      >
        <div className="sticky top-24">
          <p
            className="text-faint uppercase tracking-widest mb-4 font-medium"
            style={{ fontSize: '11px', letterSpacing: '0.1em' }}
          >
            On this page
          </p>
          <ul className="space-y-1 border-l border-line">
            {headings.map((heading) => (
              <li key={heading.id}>
                <button
                  type="button"
                  onClick={() => handleClick(heading.id)}
                  className={`block w-full text-left transition-colors duration-150 ${
                    heading.level === 3 ? 'pl-6' : 'pl-4'
                  } py-1.5 -ml-px border-l-2 ${
                    activeId === heading.id
                      ? 'border-brand-red text-foreground'
                      : 'border-transparent text-muted hover:text-foreground hover:border-line'
                  }`}
                  style={{ fontSize: 'var(--text-small)' }}
                >
                  {heading.text}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </aside>}
    </>
  )
}

export { TableOfContents }
export type { TocHeading, TableOfContentsProps }
