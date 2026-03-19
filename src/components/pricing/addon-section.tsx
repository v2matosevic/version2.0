'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import type { FeatureOption, AddonSelection, ProjectTypeId, MaintenanceTierId } from '@/types/pricing'
import { AddonToggle } from './addon-toggle'
import { QuantitySelector } from './quantity-selector'
import { MaintenancePicker } from './maintenance-picker'

type AddonSectionProps = {
  id: string
  label: string
  note?: string
  options: FeatureOption[]
  addons: Record<string, AddonSelection>
  projectType: ProjectTypeId | null
  maintenanceTier: MaintenanceTierId
  onToggle: (id: string) => void
  onQuantityChange: (id: string, quantity: number) => void
  onMaintenanceChange: (tier: MaintenanceTierId) => void
}

function AddonSection({
  id,
  label,
  note,
  options,
  addons,
  projectType,
  maintenanceTier,
  onToggle,
  onQuantityChange,
  onMaintenanceChange,
}: AddonSectionProps) {
  const [isOpen, setIsOpen] = useState(false)
  const isMaintenance = id === 'maintenance'

  const enabledCount = isMaintenance
    ? (maintenanceTier !== 'maintenance_none' ? 1 : 0)
    : options.filter((o) => addons[o.id]?.enabled).length

  return (
    <div className="border border-line-subtle rounded-lg overflow-hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-raised/50 transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <h4
            className="font-heading text-foreground"
            style={{ fontSize: 'var(--text-body)', fontWeight: 'var(--font-weight-headline-bold)' } as React.CSSProperties}
          >
            {label}
          </h4>
          <span
            className="text-faint font-body"
            style={{ fontSize: 'var(--text-small)' } as React.CSSProperties}
          >
            {options.length} options
            {enabledCount > 0 && (
              <span className="text-brand-red ml-1">
                · {enabledCount} selected
              </span>
            )}
          </span>
        </div>

        {/* Chevron */}
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className={[
            'text-faint transition-transform',
            isOpen ? 'rotate-180' : '',
          ].join(' ')}
        >
          <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 border-t border-line-subtle pt-2">
              {note && (
                <p
                  className="mb-3 text-faint"
                  style={{ fontSize: 'var(--text-small)', lineHeight: 'var(--leading-body)' } as React.CSSProperties}
                >
                  {note}
                </p>
              )}

              {isMaintenance ? (
                <MaintenancePicker
                  options={options}
                  selectedTier={maintenanceTier}
                  onSelect={onMaintenanceChange}
                />
              ) : (
                <div>
                  {options.map((option) => {
                    const addonState = addons[option.id]
                    const isEnabled = addonState?.enabled ?? false
                    const isFree = !!(option.freeWhen && option.freeWhen.projectType === projectType)
                    const requiresMissing = !!(
                      option.requiresFeature && !addons[option.requiresFeature]?.enabled
                    )

                    return (
                      <div key={option.id}>
                        <AddonToggle
                          id={option.id}
                          label={option.label}
                          description={option.description}
                          price={option.price}
                          perUnit={option.perUnit}
                          enabled={isEnabled}
                          disabled={requiresMissing}
                          disabledReason={
                            requiresMissing ? `Requires ${option.requiresFeature}` : undefined
                          }
                          isFree={isFree}
                          onToggle={onToggle}
                        />
                        {isEnabled && option.hasQuantity && (
                          <div className="ml-12 -mt-1 mb-2">
                            <QuantitySelector
                              id={option.id}
                              quantity={addonState?.quantity ?? option.minQuantity ?? 1}
                              min={option.minQuantity ?? 1}
                              max={option.maxQuantity ?? 10}
                              perUnit={option.perUnit}
                              onChange={onQuantityChange}
                            />
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export { AddonSection }
export type { AddonSectionProps }
