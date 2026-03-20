'use client'

import { useState, useRef } from 'react'
import { Send } from 'lucide-react'

type ChatInputProps = {
  onSend: (message: string) => void
  disabled: boolean
  placeholder: string
}

function ChatInput({ onSend, disabled, placeholder }: ChatInputProps) {
  const [value, setValue] = useState('')
  const inputRef = useRef<HTMLTextAreaElement>(null)

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    const trimmed = value.trim()
    if (!trimmed || disabled) return
    onSend(trimmed)
    setValue('')
    inputRef.current?.focus()
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      handleSubmit(event)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <textarea
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        rows={1}
        maxLength={1000}
        className="flex-1 resize-none rounded-lg border border-line bg-sunken px-3 py-2.5 text-sm text-foreground placeholder:text-faint focus:border-brand-red focus:ring-1 focus:ring-brand-red/20 focus:outline-none disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={disabled || !value.trim()}
        className="flex items-center justify-center rounded-lg bg-brand-red px-3 py-2.5 text-white transition-colors hover:bg-brand-red-light disabled:opacity-50"
        aria-label="Send message"
      >
        <Send size={16} />
      </button>
    </form>
  )
}

export { ChatInput }
