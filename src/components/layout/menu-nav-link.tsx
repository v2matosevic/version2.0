'use client'

import { motion } from 'motion/react'
import Link from 'next/link'
import type { NavMenuItem } from '@/lib/content/get-menu-items'

type MenuNavLinkProps = {
  item: NavMenuItem
  onClose: () => void
  isMobile: boolean
  index: number
  /** When another item's dropdown is expanded, this item should dim */
  dimmed?: boolean
}

const STAGGER_DELAY = 0.06

function MenuNavLink({ item, onClose, isMobile, index, dimmed = false }: MenuNavLinkProps) {
  const linkStyle: React.CSSProperties = {
    fontSize: isMobile ? 'var(--text-h2)' : 'var(--text-h3)',
    fontWeight: 'var(--font-weight-headline)',
    lineHeight: 'var(--leading-tight)',
    letterSpacing: 'var(--tracking-h2)',
  }

  // Dimming styles — when another item is expanded, this item fades and shrinks
  const dimStyle: React.CSSProperties = dimmed ? {
    opacity: 0.25,
    filter: 'blur(1px)',
    transform: 'scale(0.97)',
    pointerEvents: 'none' as const,
  } : {
    opacity: 1,
    filter: 'blur(0)',
    transform: 'scale(1)',
  }

  if (item.children) {
    // This is handled by the parent — MenuContent manages expanded state
    // This component just renders the button + children
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.4,
        delay: index * STAGGER_DELAY,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="transition-all"
      style={{
        ...dimStyle,
        transitionDuration: 'var(--duration-normal)',
        transitionTimingFunction: 'var(--ease-out)',
      }}
    >
      <Link
        href={item.href}
        onClick={onClose}
        className="block py-3 font-heading text-foreground hover:text-brand-red transition-colors"
        style={{
          ...linkStyle,
          transitionDuration: 'var(--duration-fast)',
        } as React.CSSProperties}
      >
        {item.label}
      </Link>
    </motion.div>
  )
}

export { MenuNavLink }
export type { MenuNavLinkProps }
