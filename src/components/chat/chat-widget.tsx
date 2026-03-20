'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { ChatMessage } from './chat-message'
import { ChatInput } from './chat-input'

type ChatWidgetProps = {
  lang: string
  isOpen: boolean
  onClose: () => void
}

type ToolResult = {
  type: 'navigation' | 'pricing' | 'booking' | 'blog_results'
  data: Record<string, unknown>
}

type Message = {
  role: 'user' | 'assistant'
  content: string
  sources?: string[]
  toolResults?: ToolResult[]
}

const LABELS: Record<string, {
  title: string
  placeholder: string
  close: string
  welcome: string
  suggestions: string[]
}> = {
  en: {
    title: 'Chat with Z.AI',
    placeholder: 'Ask about our services...',
    close: 'Close chat',
    welcome: "Hi! I'm Z.AI, the Version2 assistant. I can help you with pricing, services, booking a consultation, or answering web development questions.",
    suggestions: ['What services do you offer?', 'How much does a website cost?', 'Book a consultation'],
  },
  hr: {
    title: 'Razgovor sa Z.AI',
    placeholder: 'Pitajte o našim uslugama...',
    close: 'Zatvori chat',
    welcome: 'Pozdrav! Ja sam Z.AI, Version2 asistent. Mogu Vam pomoći s cijenama, uslugama, rezervacijom konzultacije ili pitanjima o web razvoju.',
    suggestions: ['Koje usluge nudite?', 'Koliko košta web stranica?', 'Rezerviraj konzultaciju'],
  },
  de: {
    title: 'Chat mit Z.AI',
    placeholder: 'Fragen Sie nach unseren Dienstleistungen...',
    close: 'Chat schließen',
    welcome: 'Hallo! Ich bin Z.AI, der Version2-Assistent. Ich kann Ihnen bei Preisen, Dienstleistungen, Terminbuchung oder Fragen zur Webentwicklung helfen.',
    suggestions: ['Welche Dienstleistungen bieten Sie an?', 'Was kostet eine Website?', 'Beratungstermin buchen'],
  },
}

function ChatWidget({ lang, isOpen, onClose }: ChatWidgetProps) {
  const t = LABELS[lang] ?? LABELS.en
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [conversationId, setConversationId] = useState<string | null>(null)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Restore conversation from sessionStorage
  useEffect(() => {
    const storedId = sessionStorage.getItem('v2_chat_conversation_id')
    if (storedId) {
      setConversationId(storedId)
      setShowSuggestions(false)
      fetch(`/api/chat/${storedId}/`)
        .then((res) => res.ok ? res.json() : null)
        .then((data) => {
          if (data?.messages) {
            setMessages(data.messages.map((m: { role: string; content: string; sources?: string[] }) => ({
              role: m.role as 'user' | 'assistant',
              content: m.content,
              sources: m.sources,
            })))
          }
        })
        .catch(() => { /* ignore restore failure */ })
    }
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = useCallback(async (message: string) => {
    setMessages((prev) => [...prev, { role: 'user', content: message }])
    setIsLoading(true)
    setShowSuggestions(false)

    try {
      const response = await fetch('/api/chat/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          language: lang,
          conversationId: conversationId ?? undefined,
        }),
      })

      const data = await response.json() as {
        conversationId?: string
        response?: string
        sources?: string[]
        toolResults?: ToolResult[]
        error?: string
      }

      if (response.ok) {
        if (!conversationId && data.conversationId) {
          setConversationId(data.conversationId)
          sessionStorage.setItem('v2_chat_conversation_id', data.conversationId)
        }
        setMessages((prev) => [...prev, {
          role: 'assistant',
          content: data.response ?? '',
          sources: data.sources,
          toolResults: data.toolResults,
        }])
      } else {
        setMessages((prev) => [...prev, {
          role: 'assistant',
          content: data.error ?? 'Sorry, something went wrong.',
        }])
      }
    } catch {
      setMessages((prev) => [...prev, {
        role: 'assistant',
        content: 'Unable to reach the server. Please try again.',
      }])
    } finally {
      setIsLoading(false)
    }
  }, [lang, conversationId])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="fixed bottom-20 right-4 z-50 flex h-[500px] w-[380px] flex-col overflow-hidden rounded-2xl border border-line bg-base shadow-2xl sm:right-6"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-line bg-raised px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
              <span className="text-sm font-medium text-foreground">{t.title}</span>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg p-1 text-muted transition-colors hover:text-foreground"
              aria-label={t.close}
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
            {/* Welcome message */}
            {messages.length === 0 && (
              <ChatMessage role="assistant" content={t.welcome} />
            )}

            {messages.map((msg, i) => (
              <ChatMessage
                key={i}
                role={msg.role}
                content={msg.content}
                sources={msg.sources}
                toolResults={msg.toolResults}
              />
            ))}

            {/* Typing indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="rounded-xl bg-raised border border-line-subtle px-4 py-3">
                  <div className="flex gap-1">
                    <span className="h-2 w-2 rounded-full bg-muted animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="h-2 w-2 rounded-full bg-muted animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="h-2 w-2 rounded-full bg-muted animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested questions */}
          {showSuggestions && messages.length === 0 && (
            <div className="flex gap-2 px-3 pb-2 flex-wrap">
              {t.suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => handleSend(suggestion)}
                  disabled={isLoading}
                  className="rounded-lg border border-line bg-raised px-3 py-1.5 text-xs text-muted transition-colors hover:border-brand-red hover:text-foreground disabled:opacity-50"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="border-t border-line p-3">
            <ChatInput
              onSend={handleSend}
              disabled={isLoading}
              placeholder={t.placeholder}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export { ChatWidget, type ChatWidgetProps }
