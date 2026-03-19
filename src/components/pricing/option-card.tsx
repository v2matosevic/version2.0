'use client'

import { motion } from 'motion/react'

type OptionCardProps = {
  label: string
  description: string
  detail?: string
  badge?: string
  selected: boolean
  onSelect: () => void
  children?: React.ReactNode
}

function OptionCard({
  label,
  description,
  detail,
  badge,
  selected,
  onSelect,
  children,
}: OptionCardProps) {
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      whileHover={{ scale: 1.015 }}
      whileTap={{ scale: 0.985 }}
      className={[
        'relative w-full text-left rounded-xl border p-6 transition-colors cursor-pointer',
        'focus-visible:ring-2 focus-visible:ring-brand-red/40 focus-visible:ring-offset-2 focus-visible:ring-offset-base',
        selected
          ? 'border-brand-red bg-raised shadow-glow'
          : 'border-line bg-raised/50 hover:border-faint',
      ].join(' ')}
    >
      {badge && (
        <span
          className="absolute -top-3 right-4 rounded-md px-3 py-0.5 text-xs bg-brand-red text-white font-body"
          style={{ fontWeight: 'var(--font-weight-body-semibold)' } as React.CSSProperties}
        >
          {badge}
        </span>
      )}

      {/* Selection indicator */}
      <div className="flex items-start gap-4">
        <div
          className={[
            'mt-1 h-5 w-5 shrink-0 rounded-full border-2 transition-colors flex items-center justify-center',
            selected ? 'border-brand-red bg-brand-red' : 'border-faint',
          ].join(' ')}
        >
          {selected && (
            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
              <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>

        <div className="flex-1 min-w-0">
          {children}
          <h3
            className="font-heading text-foreground"
            style={{
              fontSize: 'var(--text-h4)',
              fontWeight: 'var(--font-weight-headline-bold)',
              lineHeight: 'var(--leading-tight)',
            } as React.CSSProperties}
          >
            {label}
          </h3>
          <p
            className="mt-1 text-muted"
            style={{ fontSize: 'var(--text-body)', lineHeight: 'var(--leading-body)' } as React.CSSProperties}
          >
            {description}
          </p>
          {detail && (
            <p
              className="mt-2 text-faint"
              style={{ fontSize: 'var(--text-small)' } as React.CSSProperties}
            >
              {detail}
            </p>
          )}
        </div>
      </div>
    </motion.button>
  )
}

export { OptionCard }
export type { OptionCardProps }
