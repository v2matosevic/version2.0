'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Mail, MessageCircle, MessageSquare, ChevronUp, Plus } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const WHATSAPP_NUMBER = '385957174804'
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`

type FabAction = {
  label: string
  icon: LucideIcon
  delay: number
  href?: string
  external?: boolean
  onClick?: () => void
}

type FabProps = {
  contactHref?: string
  onOpenChat?: () => void
}

function Fab({ contactHref = '/contact/', onOpenChat }: FabProps) {
  const [isOpen, setIsOpen] = useState(false)
  const fabRef = useRef<HTMLDivElement>(null)

  const toggle = useCallback(() => setIsOpen((prev) => !prev), [])
  const close = useCallback(() => setIsOpen(false), [])

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    close()
  }, [close])

  useEffect(() => {
    if (!isOpen) return
    function handleClick(e: MouseEvent) {
      if (fabRef.current && !fabRef.current.contains(e.target as Node)) close()
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [isOpen, close])

  useEffect(() => {
    if (!isOpen) return
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [isOpen, close])

  const openChat = useCallback(() => {
    if (onOpenChat) onOpenChat()
    close()
  }, [onOpenChat, close])

  const actions: FabAction[] = [
    ...(onOpenChat ? [{ label: 'Live Chat', onClick: openChat, icon: MessageSquare as LucideIcon, delay: 0 }] : []),
    { label: 'Contact', href: contactHref, icon: Mail, delay: 0.04 },
    { label: 'WhatsApp', href: WHATSAPP_URL, icon: MessageCircle, external: true, delay: 0.08 },
    { label: 'Scroll to Top', onClick: scrollToTop, icon: ChevronUp, delay: 0.12 },
  ]

  return (
    <div
      ref={fabRef}
      className="fixed bottom-6 right-6 md:bottom-8 md:right-8"
      style={{ zIndex: 'var(--z-fab)' } as React.CSSProperties}
    >
      <AnimatePresence>
        {isOpen && (
          <div className="absolute bottom-16 right-0 flex flex-col gap-2.5 items-end mb-2">
            {actions.map((action) => {
              const Icon = action.icon
              const content = (
                <>
                  <Icon size={15} className="shrink-0" />
                  <span>{action.label}</span>
                </>
              )

              const className = [
                'flex items-center gap-2.5 px-4 py-2.5 rounded-full font-body',
                'text-foreground transition-colors whitespace-nowrap',
                'border border-line-subtle',
              ].join(' ')

              const style: React.CSSProperties = {
                fontSize: 'var(--text-small)',
                fontWeight: 'var(--font-weight-body)',
                background: 'color-mix(in srgb, var(--color-raised) 90%, transparent)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                transitionDuration: 'var(--duration-fast)',
              }

              return (
                <motion.div
                  key={action.label}
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{
                    duration: 0.2,
                    delay: action.delay,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {action.onClick ? (
                    <button onClick={action.onClick} className={className} style={style}>
                      {content}
                    </button>
                  ) : (
                    <a
                      href={action.href}
                      {...(action.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className={className}
                      style={style}
                    >
                      {content}
                    </a>
                  )}
                </motion.div>
              )
            })}
          </div>
        )}
      </AnimatePresence>

      {/* Main FAB button */}
      <motion.button
        onClick={toggle}
        aria-label={isOpen ? 'Close actions' : 'Open actions'}
        aria-expanded={isOpen}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center justify-center w-14 h-14 rounded-full bg-brand-red text-white"
        style={{
          boxShadow: isOpen
            ? '0 0 0 0 transparent'
            : '0 4px 20px rgba(153, 23, 23, 0.35), 0 0 40px rgba(153, 23, 23, 0.15)',
          transition: `box-shadow var(--duration-normal) var(--ease-smooth)`,
        }}
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          <Plus size={22} strokeWidth={1.5} />
        </motion.div>
      </motion.button>
    </div>
  )
}

export { Fab }
export type { FabProps }
