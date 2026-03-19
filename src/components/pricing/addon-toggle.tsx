'use client'

import { formatRange } from '@/lib/pricing/format-price'
import type { PriceRange } from '@/types/pricing'

type AddonToggleProps = {
  id: string
  label: string
  description: string
  price: PriceRange
  perUnit?: string
  enabled: boolean
  disabled?: boolean
  disabledReason?: string
  isFree?: boolean
  onToggle: (id: string) => void
}

function AddonToggle({
  id,
  label,
  description,
  price,
  perUnit,
  enabled,
  disabled = false,
  disabledReason,
  isFree = false,
  onToggle,
}: AddonToggleProps) {
  return (
    <div
      className={[
        'flex items-start gap-3 py-3 border-b border-line-subtle last:border-b-0',
        disabled ? 'opacity-50' : '',
      ].join(' ')}
    >
      {/* Toggle switch */}
      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        aria-label={`Toggle ${label}`}
        disabled={disabled}
        onClick={() => onToggle(id)}
        className={[
          'mt-0.5 relative inline-flex h-5 w-9 shrink-0 rounded-full transition-colors',
          'focus-visible:ring-2 focus-visible:ring-brand-red/40 focus-visible:ring-offset-2 focus-visible:ring-offset-base',
          enabled ? 'bg-brand-red' : 'bg-line',
          disabled ? 'cursor-not-allowed' : 'cursor-pointer',
        ].join(' ')}
      >
        <span
          className={[
            'inline-block h-4 w-4 rounded-full bg-white transition-transform mt-0.5',
            enabled ? 'translate-x-4.5 ml-px' : 'translate-x-0.5',
          ].join(' ')}
        />
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline justify-between gap-2">
          <span
            className="text-foreground font-body"
            style={{ fontSize: 'var(--text-body)', fontWeight: 'var(--font-weight-body-semibold)' } as React.CSSProperties}
          >
            {label}
          </span>
          <span
            className={[
              'shrink-0 font-body',
              isFree ? 'text-brand-red' : 'text-muted',
            ].join(' ')}
            style={{ fontSize: 'var(--text-small)' } as React.CSSProperties}
          >
            {isFree ? 'Included' : formatRange(price)}
            {perUnit && !isFree ? ` ${perUnit}` : ''}
          </span>
        </div>
        <p
          className="mt-0.5 text-faint"
          style={{ fontSize: 'var(--text-small)', lineHeight: 'var(--leading-body)' } as React.CSSProperties}
        >
          {description}
        </p>
        {disabled && disabledReason && (
          <p
            className="mt-0.5 text-brand-red"
            style={{ fontSize: 'var(--text-small)' } as React.CSSProperties}
          >
            {disabledReason}
          </p>
        )}
      </div>
    </div>
  )
}

export { AddonToggle }
export type { AddonToggleProps }
