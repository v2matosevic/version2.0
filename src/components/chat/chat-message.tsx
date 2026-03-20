'use client'

import type { ReactNode } from 'react'

type ToolResult = {
  type: 'navigation' | 'pricing' | 'booking' | 'blog_results'
  data: Record<string, unknown>
}

type ChatMessageProps = {
  role: 'user' | 'assistant'
  content: string
  sources?: string[]
  toolResults?: ToolResult[]
}

/**
 * Render inline links from text content.
 * Converts /path/ patterns into clickable links.
 */
function renderContent(text: string): ReactNode[] {
  const parts: ReactNode[] = []
  const linkRegex = /((?:\/[a-z0-9-]+)+\/)/g
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index))
    }
    const url = match[1]
    parts.push(
      <a
        key={`link-${match.index}`}
        href={url}
        className="text-brand-red hover:text-brand-red-light underline underline-offset-2"
      >
        {url}
      </a>,
    )
    lastIndex = match.index + match[0].length
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }

  return parts
}

function ToolResultCard({ result }: { result: ToolResult }) {
  const data = result.data

  if (result.type === 'navigation' && data.url) {
    return (
      <a
        href={data.url as string}
        className="mt-2 flex items-center gap-2 rounded-lg border border-line bg-sunken px-3 py-2 text-xs text-brand-red transition-colors hover:border-brand-red hover:bg-raised"
      >
        <span className="font-medium">{data.description as string}</span>
        <span className="ml-auto opacity-60">{data.url as string}</span>
      </a>
    )
  }

  if (result.type === 'pricing' && data.formatted) {
    return (
      <div className="mt-2 rounded-lg border border-line bg-sunken px-3 py-2 text-xs">
        <div className="flex items-center justify-between">
          <span className="text-muted">{data.projectType as string} · {data.scope as string}</span>
          <span className="font-semibold text-foreground">{data.formatted as string}</span>
        </div>
        <a
          href={data.calculatorUrl as string}
          className="mt-1 text-brand-red hover:text-brand-red-light underline underline-offset-2"
        >
          Get a detailed estimate →
        </a>
      </div>
    )
  }

  if (result.type === 'booking') {
    return (
      <a
        href={data.bookingUrl as string}
        className="mt-2 flex items-center gap-2 rounded-lg border border-brand-red/30 bg-brand-red/5 px-3 py-2 text-xs text-brand-red transition-colors hover:bg-brand-red/10"
      >
        <span className="font-medium">Book a free consultation →</span>
      </a>
    )
  }

  if (result.type === 'blog_results') {
    const results = data.results as Array<{ title: string; url: string; snippet: string }>
    if (!results || results.length === 0) return null
    return (
      <div className="mt-2 flex flex-col gap-1">
        {results.slice(0, 3).map((article) => (
          <a
            key={article.url}
            href={article.url}
            className="rounded-lg border border-line bg-sunken px-3 py-1.5 text-xs text-foreground transition-colors hover:border-brand-red"
          >
            {article.title}
          </a>
        ))}
      </div>
    )
  }

  return null
}

function ChatMessage({ role, content, sources, toolResults }: ChatMessageProps) {
  const isUser = role === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={[
          'max-w-[85%] rounded-xl px-4 py-3 text-sm',
          isUser
            ? 'bg-brand-red text-white'
            : 'bg-raised text-foreground border border-line-subtle',
        ].join(' ')}
        style={{ lineHeight: 'var(--leading-body)' }}
      >
        <p className="whitespace-pre-wrap">
          {isUser ? content : renderContent(content)}
        </p>

        {/* Tool result cards */}
        {toolResults && toolResults.length > 0 && (
          <div className="flex flex-col">
            {toolResults.map((result, i) => (
              <ToolResultCard key={i} result={result} />
            ))}
          </div>
        )}

        {/* Source links */}
        {sources && sources.length > 0 && !toolResults?.length && (
          <div className="mt-2 flex flex-wrap gap-1">
            {sources.slice(0, 3).map((source) => (
              <a
                key={source}
                href={source}
                className="text-xs opacity-70 hover:opacity-100 underline"
              >
                {source}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export { ChatMessage }
