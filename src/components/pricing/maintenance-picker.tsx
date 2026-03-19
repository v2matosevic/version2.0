'use client'

import type { FeatureOption, MaintenanceTierId } from '@/types/pricing'
import { formatRange } from '@/lib/pricing/format-price'

type MaintenancePickerProps = {
  options: FeatureOption[]
  selectedTier: MaintenanceTierId
  onSelect: (tier: MaintenanceTierId) => void
}

function MaintenancePicker({ options, selectedTier, onSelect }: MaintenancePickerProps) {
  return (
    <div className="space-y-2">
      {options.map((option) => {
        const isSelected = option.id === selectedTier
        const priceLabel =
          option.price[0] === 0 && option.price[1] === 0
            ? 'Free'
            : `${formatRange(option.price)} /mo`

        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onSelect(option.id as MaintenanceTierId)}
            className={[
              'w-full text-left flex items-start gap-3 p-3 rounded-lg border transition-colors',
              'focus-visible:ring-2 focus-visible:ring-brand-red/40 focus-visible:ring-offset-2 focus-visible:ring-offset-base',
              isSelected
                ? 'border-brand-red bg-raised/80'
                : 'border-line-subtle bg-transparent hover:border-faint cursor-pointer',
            ].join(' ')}
          >
            {/* Radio indicator */}
            <div
              className={[
                'mt-0.5 h-4 w-4 shrink-0 rounded-full border-2 flex items-center justify-center',
                isSelected ? 'border-brand-red' : 'border-faint',
              ].join(' ')}
            >
              {isSelected && <div className="h-2 w-2 rounded-full bg-brand-red" />}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-baseline justify-between gap-2">
                <span
                  className="text-foreground font-body"
                  style={{ fontSize: 'var(--text-body)', fontWeight: 'var(--font-weight-body-semibold)' } as React.CSSProperties}
                >
                  {option.label}
                </span>
                <span
                  className="shrink-0 text-muted font-body"
                  style={{ fontSize: 'var(--text-small)' } as React.CSSProperties}
                >
                  {priceLabel}
                </span>
              </div>
              <p
                className="mt-0.5 text-faint"
                style={{ fontSize: 'var(--text-small)', lineHeight: 'var(--leading-body)' } as React.CSSProperties}
              >
                {option.description}
              </p>
            </div>
          </button>
        )
      })}
    </div>
  )
}

export { MaintenancePicker }
export type { MaintenancePickerProps }
