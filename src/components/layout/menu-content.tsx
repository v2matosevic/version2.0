'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { ThemeToggle } from '@/components/layout/theme-toggle'
import { LanguageSwitcher } from '@/components/layout/language-switcher'
import type { Language } from '@/types/i18n'
import type { NavMenuItem } from '@/lib/content/get-menu-items'

type MenuContentProps = {
  onClose: () => void
  lang: Language
  navItems: NavMenuItem[]
  isMobile: boolean
}

/** How long items take to fade out (opacity/blur) */
const FADE_OUT = 0.18
/** Delay before height collapse starts — items are already invisible by then */
const HEIGHT_COLLAPSE_DELAY = 0.18
/** How long the height collapse takes */
const HEIGHT_COLLAPSE = 0.28
/** Delay before children start expanding — matches collapse start */
const CHILDREN_EXPAND_DELAY = 0.2
/** Stagger between items reappearing */
const RETURN_STAGGER = 0.06
/** Stagger between child links appearing */
const CHILD_STAGGER = 0.05

type Bezier = [number, number, number, number]
const EASE_ACCEL: Bezier = [0.4, 0, 1, 1]
const EASE_INOUT: Bezier = [0.76, 0, 0.24, 1]
const EASE_DECEL: Bezier = [0.16, 1, 0.3, 1]

/**
 * Per-property transition for collapsing (dimmed) items.
 * Phase 1: opacity + filter + scale fade out instantly (0–180ms)
 * Phase 2: height collapses after items are invisible (180ms–460ms)
 * This prevents the "push down then disappear" glitch.
 */
const collapseTransition = {
  opacity: { duration: FADE_OUT, ease: EASE_ACCEL },
  filter: { duration: FADE_OUT, ease: EASE_ACCEL },
  scale: { duration: FADE_OUT, ease: EASE_ACCEL },
  height: { duration: HEIGHT_COLLAPSE, delay: HEIGHT_COLLAPSE_DELAY, ease: EASE_INOUT },
  marginBottom: { duration: HEIGHT_COLLAPSE, delay: HEIGHT_COLLAPSE_DELAY, ease: EASE_INOUT },
}

/** Per-property transition for returning items — height first, then fade in */
function returnTransition(index: number) {
  const staggerDelay = index * RETURN_STAGGER
  return {
    height: { duration: 0.35, delay: staggerDelay, ease: EASE_DECEL },
    marginBottom: { duration: 0.35, delay: staggerDelay, ease: EASE_DECEL },
    opacity: { duration: 0.35, delay: staggerDelay + 0.05, ease: EASE_DECEL },
    filter: { duration: 0.35, delay: staggerDelay + 0.05, ease: EASE_DECEL },
    scale: { duration: 0.35, delay: staggerDelay + 0.05, ease: EASE_DECEL },
  }
}

function MenuContent({ onClose, lang, navItems, isMobile }: MenuContentProps) {
  const [expandedHref, setExpandedHref] = useState<string | null>(null)

  const hasExpanded = expandedHref !== null

  const linkStyle: React.CSSProperties = {
    fontSize: 'var(--text-h3)',
    fontWeight: 'var(--font-weight-headline)',
    lineHeight: 'var(--leading-tight)',
    letterSpacing: 'var(--tracking-h2)',
  }

  return (
    <div className="relative p-6 sm:p-8 md:p-10 min-h-full flex flex-col">
      {/* Close button */}
      <div className="flex justify-end mb-6 sm:mb-10 md:mb-14">
        <button
          onClick={onClose}
          className="group relative w-8 h-8 flex items-center justify-center text-muted hover:text-foreground transition-colors"
          style={{ transitionDuration: 'var(--duration-fast)' }}
          aria-label="Close navigation menu"
        >
          <span
            className="absolute block h-px w-6 bg-current transition-transform"
            style={{ transform: 'rotate(45deg)', transitionDuration: 'var(--duration-normal)', transitionTimingFunction: 'var(--ease-out)' }}
          />
          <span
            className="absolute block h-px w-6 bg-current transition-transform"
            style={{ transform: 'rotate(-45deg)', transitionDuration: 'var(--duration-normal)', transitionTimingFunction: 'var(--ease-out)' }}
          />
        </button>
      </div>

      {/* Navigation — pb accounts for the pinned footer */}
      <nav className="flex flex-col flex-1 pb-36" aria-label="Main navigation">
        {navItems.map((item, index) => {
          const isExpanded = expandedHref === item.href
          const isDimmed = hasExpanded && !isExpanded

          if (item.children) {
            return (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: 20, height: 'auto' }}
                animate={{
                  opacity: isDimmed ? 0 : 1,
                  x: 0,
                  height: isDimmed ? 0 : 'auto',
                  scale: isDimmed ? 0.96 : 1,
                  filter: isDimmed ? 'blur(4px)' : 'blur(0px)',
                  marginBottom: isDimmed ? 0 : 2,
                }}
                transition={isDimmed ? collapseTransition : returnTransition(index)}
                className="overflow-hidden"
                style={{ pointerEvents: isDimmed ? 'none' : 'auto' }}
              >
                {/* Parent toggle */}
                <button
                  onClick={() => setExpandedHref(isExpanded ? null : item.href)}
                  className="flex items-center gap-3 py-2 sm:py-3 font-heading text-foreground hover:text-brand-red transition-colors w-full text-left group"
                  style={{ ...linkStyle, transitionDuration: 'var(--duration-fast)' } as React.CSSProperties}
                >
                  {item.label}
                  <ChevronDown
                    size={16}
                    className="text-faint group-hover:text-brand-red transition-all"
                    style={{
                      transform: isExpanded ? 'rotate(180deg)' : 'rotate(0)',
                      transitionDuration: 'var(--duration-normal)',
                      transitionTimingFunction: 'var(--ease-out)',
                    }}
                  />
                </button>

                {/* Children — delayed expansion so other items fade first */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        height: { duration: 0.4, delay: CHILDREN_EXPAND_DELAY, ease: [0.16, 1, 0.3, 1] },
                        opacity: { duration: 0.3, delay: CHILDREN_EXPAND_DELAY + 0.1, ease: [0.16, 1, 0.3, 1] },
                      }}
                      className="overflow-hidden"
                    >
                      <div className="pl-1 border-l border-brand-red/20 ml-1 flex flex-col gap-0.5 py-3">
                        {item.children.map((child, childIndex) => (
                          <motion.div
                            key={child.href}
                            initial={{ opacity: 0, x: -16, filter: 'blur(4px)' }}
                            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, x: -8 }}
                            transition={{
                              duration: 0.4,
                              delay: CHILDREN_EXPAND_DELAY + 0.15 + childIndex * CHILD_STAGGER,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                          >
                            <Link
                              href={child.href}
                              onClick={onClose}
                              className="group/child flex items-center gap-2 py-2.5 pl-3 text-muted hover:text-foreground transition-colors font-body"
                              style={{
                                fontSize: 'var(--text-body-lg)',
                                fontWeight: 'var(--font-weight-body)',
                                transitionDuration: 'var(--duration-fast)',
                              } as React.CSSProperties}
                            >
                              <span
                                className="inline-block w-4 h-px bg-brand-red/40 group-hover/child:w-6 group-hover/child:bg-brand-red transition-all"
                                style={{ transitionDuration: 'var(--duration-fast)' }}
                              />
                              {child.label}
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          }

          // Regular link
          return (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, x: 20, height: 'auto' }}
              animate={{
                opacity: isDimmed ? 0 : 1,
                x: 0,
                height: isDimmed ? 0 : 'auto',
                scale: isDimmed ? 0.96 : 1,
                filter: isDimmed ? 'blur(4px)' : 'blur(0px)',
                marginBottom: isDimmed ? 0 : 2,
              }}
              transition={isDimmed ? collapseTransition : returnTransition(index)}
              className="overflow-hidden"
              style={{ pointerEvents: isDimmed ? 'none' : 'auto' }}
            >
              <Link
                href={item.href}
                onClick={onClose}
                className="block py-2 sm:py-3 font-heading text-foreground hover:text-brand-red transition-colors"
                style={{ ...linkStyle, transitionDuration: 'var(--duration-fast)' } as React.CSSProperties}
              >
                {item.label}
              </Link>
            </motion.div>
          )
        })}
      </nav>

      {/* Footer area — pinned to bottom so it never shifts during nav animations */}
      <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-10 flex flex-col gap-6 pt-6 sm:pt-8 border-t border-line-subtle"
        style={{ background: 'var(--color-sunken)' }}
      >
        <div className="flex flex-col gap-2.5">
          <a
            href="mailto:info@version2.hr"
            className="text-sm text-muted hover:text-foreground transition-colors font-body"
            style={{ transitionDuration: 'var(--duration-fast)' }}
          >
            info@version2.hr
          </a>
          <a
            href="tel:+385995617706"
            className="text-sm text-muted hover:text-foreground transition-colors font-body"
            style={{ transitionDuration: 'var(--duration-fast)' }}
          >
            +385 99 561 7706
          </a>
        </div>
        <div className="flex items-center gap-4">
          <LanguageSwitcher currentLang={lang} />
          <ThemeToggle />
        </div>
      </div>
    </div>
  )
}

export { MenuContent }
export type { MenuContentProps }
