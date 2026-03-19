'use client'

import type { PricingConfig, WizardSelections } from '@/types/pricing'

type ChoicesSummaryProps = {
  selections: WizardSelections
  config: PricingConfig
}

function findLabel(
  config: PricingConfig,
  selections: WizardSelections,
): { projectType: string; scope: string; design: string; timeline: string } {
  const projectType =
    config.steps.projectType.options.find((o) => o.id === selections.projectType)?.label ?? '—'

  let scope = '—'
  if (selections.projectType && selections.scope) {
    const scopeOptions = config.steps.scope.optionsByType[selections.projectType]
    scope = scopeOptions?.find((o) => o.id === selections.scope)?.label ?? '—'
  }

  const design =
    config.steps.design.options.find((o) => o.id === selections.design)?.label ?? '—'

  const timeline =
    config.steps.timeline.options.find((o) => o.id === selections.timeline)?.label ?? '—'

  return { projectType, scope, design, timeline }
}

function ChoicesSummary({ selections, config }: ChoicesSummaryProps) {
  const labels = findLabel(config, selections)

  const items = [
    { label: 'Project Type', value: labels.projectType },
    { label: 'Scope', value: labels.scope },
    { label: 'Design', value: labels.design },
    { label: 'Timeline', value: labels.timeline },
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {items.map((item) => (
        <div key={item.label}>
          <p
            className="text-faint uppercase font-body"
            style={{
              fontSize: 'var(--text-overline)',
              letterSpacing: 'var(--tracking-overline)',
            } as React.CSSProperties}
          >
            {item.label}
          </p>
          <p
            className="mt-1 text-foreground font-body"
            style={{
              fontSize: 'var(--text-body)',
              fontWeight: 'var(--font-weight-body-semibold)',
            } as React.CSSProperties}
          >
            {item.value}
          </p>
        </div>
      ))}
    </div>
  )
}

export { ChoicesSummary }
export type { ChoicesSummaryProps }
