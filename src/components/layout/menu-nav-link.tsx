'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ChevronDown } from 'lucide-react'
import Link from 'next/link'
import type { NavMenuItem } from '@/lib/content/get-menu-items'

type MenuNavLinkProps = {
  item: NavMenuItem
  onClose: () => void
  isMobile: boolean
}

function MenuNavLink({ item, onClose, isMobile }: MenuNavLinkProps) {
  const [expanded, setExpanded] = useState(false)
  const textSize = isMobile ? 'var(--text-h2)' : 'var(--text-h3)'

  if (item.children) {
    return (
      <div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-2 py-2 font-heading text-foreground hover:text-brand-red transition-colors w-full text-left"
          style={{
            fontSize: textSize,
            fontWeight: 'var(--font-weight-headline)',
            lineHeight: 'var(--leading-tight)',
          } as React.CSSProperties}
        >
          {item.label}
          <ChevronDown
            size={20}
            className="transition-transform"
            style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0)' }}
          />
        </button>
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="overflow-hidden"
            >
              <div className="pl-6 flex flex-col gap-1 pb-2">
                {item.children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    onClick={onClose}
                    className="block py-1.5 text-muted hover:text-foreground transition-colors font-heading"
                    style={{
                      fontSize: 'var(--text-body)',
                      fontWeight: 'var(--font-weight-headline)',
                    } as React.CSSProperties}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  return (
    <Link
      href={item.href}
      onClick={onClose}
      className="block py-2 font-heading text-foreground hover:text-brand-red transition-colors"
      style={{
        fontSize: textSize,
        fontWeight: 'var(--font-weight-headline)',
        lineHeight: 'var(--leading-tight)',
      } as React.CSSProperties}
    >
      {item.label}
    </Link>
  )
}

export { MenuNavLink }
export type { MenuNavLinkProps }
