'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import type {
  PricingConfig,
  WizardSelections,
  AddonSelection,
  ProjectTypeId,
  MaintenanceTierId,
} from '@/types/pricing'
import { AddonSection } from './addon-section'

type AddonPanelProps = {
  config: PricingConfig
  selections: WizardSelections
  onToggle: (id: string) => void
  onQuantityChange: (id: string, quantity: number) => void
  onMaintenanceChange: (tier: MaintenanceTierId) => void
}

type SectionData = {
  id: string
  label: string
  note?: string
  options: PricingConfig['steps']['features']['sections'][number]['options']
}

/**
 * Build the ordered list of addon sections to display.
 */
function buildSections(config: PricingConfig, projectType: ProjectTypeId | null): SectionData[] {
  const sections: SectionData[] = []

  // Feature sections (core, ecommerce)
  for (const section of config.steps.features.sections) {
    // Skip conditional sections that don't apply
    if (section.showWhen && section.showWhen.projectType !== projectType) continue
    sections.push({
      id: section.id,
      label: section.label,
      note: section.note,
      options: section.options,
    })
  }

  // Design add-ons (from design step)
  sections.push({
    id: 'design_addons',
    label: 'Design Add-ons',
    options: config.steps.design.addOns.map((addon) => ({
      ...addon,
      icon: addon.icon,
    })),
  })

  // Service sections (SEO, content, analytics, hosting, maintenance, training)
  for (const section of config.steps.services.sections) {
    sections.push({
      id: section.id,
      label: section.label,
      note: section.note,
      options: section.options,
    })
  }

  return sections
}

function AddonPanel({
  config,
  selections,
  onToggle,
  onQuantityChange,
  onMaintenanceChange,
}: AddonPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const sections = buildSections(config, selections.projectType)

  const totalSelected = Object.values(selections.addons).filter((a: AddonSelection) => a.enabled).length
    + (selections.maintenanceTier !== 'maintenance_none' ? 1 : 0)

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-3 text-foreground hover:text-brand-red transition-colors cursor-pointer"
      >
        <span
          className="font-heading"
          style={{
            fontSize: 'var(--text-h4)',
            fontWeight: 'var(--font-weight-headline-bold)',
          } as React.CSSProperties}
        >
          Customize your estimate
        </span>
        {totalSelected > 0 && (
          <span
            className="rounded-full bg-brand-red text-white px-2.5 py-0.5 font-body"
            style={{ fontSize: 'var(--text-small)', fontWeight: 'var(--font-weight-body-semibold)' } as React.CSSProperties}
          >
            {totalSelected}
          </span>
        )}
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          className={[
            'text-faint transition-transform',
            isExpanded ? 'rotate-180' : '',
          ].join(' ')}
        >
          <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-6 space-y-3">
              {sections.map((section) => (
                <AddonSection
                  key={section.id}
                  id={section.id}
                  label={section.label}
                  note={section.note}
                  options={section.options}
                  addons={selections.addons}
                  projectType={selections.projectType}
                  maintenanceTier={selections.maintenanceTier}
                  onToggle={onToggle}
                  onQuantityChange={onQuantityChange}
                  onMaintenanceChange={onMaintenanceChange}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export { AddonPanel }
export type { AddonPanelProps }
