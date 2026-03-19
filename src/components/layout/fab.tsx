'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Mail, MessageCircle, ChevronUp, Plus } from 'lucide-react'
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
}

function Fab({ contactHref = '/contact/' }: FabProps) {
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
      if (fabRef.current && !fabRef.current.contains(e.target as Node)) {
        close()
      }
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

  const actions: FabAction[] = [
    { label: 'Contact', href: contactHref, icon: Mail, delay: 0 },
    { label: 'WhatsApp', href: WHATSAPP_URL, icon: MessageCircle, external: true, delay: 0.05 },
    { label: 'Scroll to Top', onClick: scrollToTop, icon: ChevronUp, delay: 0.1 },
  ]

  return (
    <div
      ref={fabRef}
      className="fixed bottom-6 right-6"
      style={{ zIndex: 40 }}
    >
      <AnimatePresence>
        {isOpen && (
          <div className="absolute bottom-16 right-0 flex flex-col gap-3 items-end mb-3">
            {actions.map((action) => {
              const Icon = action.icon
              return (
                <motion.div
                  key={action.label}
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.9 }}
                  transition={{ duration: 0.2, delay: action.delay }}
                >
                  {action.onClick ? (
                    <button
                      onClick={action.onClick}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-raised border border-line text-foreground hover:bg-base transition-colors"
                      style={{ fontSize: 'var(--text-small)' }}
                    >
                      <Icon size={16} />
                      <span>{action.label}</span>
                    </button>
                  ) : (
                    <a
                      href={action.href}
                      {...(action.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-raised border border-line text-foreground hover:bg-base transition-colors"
                      style={{ fontSize: 'var(--text-small)' }}
                    >
                      <Icon size={16} />
                      <span>{action.label}</span>
                    </a>
                  )}
                </motion.div>
              )
            })}
          </div>
        )}
      </AnimatePresence>

      {/* Main FAB button */}
      <button
        onClick={toggle}
        aria-label={isOpen ? 'Close actions' : 'Open actions'}
        aria-expanded={isOpen}
        className="flex items-center justify-center w-12 h-12 rounded-full bg-brand-red text-white shadow-lg hover:bg-brand-red-hover transition-colors"
        style={{ transitionDuration: 'var(--duration-normal)' }}
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <Plus size={20} />
        </motion.div>
      </button>
    </div>
  )
}

export { Fab }
export type { FabProps }
