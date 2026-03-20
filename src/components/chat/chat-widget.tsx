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

type Message = {
  role: 'user' | 'assistant'
  content: string
  sources?: string[]
}

const LABELS = {
  en: { title: 'Chat with us', placeholder: 'Ask about our services...', close: 'Close chat' },
  hr: { title: 'Razgovarajte s nama', placeholder: 'Pitajte o našim uslugama...', close: 'Zatvori chat' },
  de: { title: 'Chatten Sie mit uns', placeholder: 'Fragen Sie nach unseren Dienstleistungen...', close: 'Chat schließen' },
}

function ChatWidget({ lang, isOpen, onClose }: ChatWidgetProps) {
  const t = LABELS[lang as keyof typeof LABELS] ?? LABELS.en
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [conversationId, setConversationId] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Restore conversation from sessionStorage
  useEffect(() => {
    const storedId = sessionStorage.getItem('v2_chat_conversation_id')
    if (storedId) {
      setConversationId(storedId)
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

      const data = await response.json()

      if (response.ok) {
        if (!conversationId && data.conversationId) {
          setConversationId(data.conversationId)
          sessionStorage.setItem('v2_chat_conversation_id', data.conversationId)
        }
        setMessages((prev) => [...prev, {
          role: 'assistant',
          content: data.response,
          sources: data.sources,
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
            {messages.map((msg, i) => (
              <ChatMessage key={i} role={msg.role} content={msg.content} sources={msg.sources} />
            ))}
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
