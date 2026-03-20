'use client'

type ChatMessageProps = {
  role: 'user' | 'assistant'
  content: string
  sources?: string[]
}

function ChatMessage({ role, content, sources }: ChatMessageProps) {
  const isUser = role === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={[
          'max-w-[80%] rounded-xl px-4 py-3 text-sm',
          isUser
            ? 'bg-brand-red text-white'
            : 'bg-raised text-foreground border border-line-subtle',
        ].join(' ')}
        style={{ lineHeight: 'var(--leading-body)' }}
      >
        <p className="whitespace-pre-wrap">{content}</p>
        {sources && sources.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {sources.map((source) => (
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
