'use client'

import type { PricingConfig, ProjectTypeId } from '@/types/pricing'
import { formatRange } from '@/lib/pricing/format-price'
import { OptionCard } from './option-card'

type StepScopeProps = {
  config: PricingConfig
  projectType: ProjectTypeId | null
  selected: string | null
  onSelect: (id: string) => void
  onNext: () => void
}

function StepScope({ config, projectType, selected, onSelect, onNext }: StepScopeProps) {
  const step = config.steps.scope
  const options = projectType ? (step.optionsByType[projectType] ?? []) : []

  function handleSelect(id: string) {
    onSelect(id)
    setTimeout(onNext, 250)
  }

  return (
    <div>
      <h2
        className="font-heading text-foreground"
        style={{
          fontSize: 'var(--text-h2)',
          fontWeight: 'var(--font-weight-headline)',
          lineHeight: 'var(--leading-display)',
          letterSpacing: 'var(--tracking-h2)',
        } as React.CSSProperties}
      >
        {step.headline}
      </h2>
      <p
        className="mt-2 text-muted"
        style={{ fontSize: 'var(--text-body-lg)', lineHeight: 'var(--leading-body)' } as React.CSSProperties}
      >
        {step.subtitle}
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {options.map((option) => (
          <OptionCard
            key={option.id}
            label={option.label}
            description={option.description}
            detail={`${option.detail} · Starting from ${formatRange(option.basePrice)}`}
            selected={selected === option.id}
            onSelect={() => handleSelect(option.id)}
          />
        ))}
      </div>
    </div>
  )
}

export { StepScope }
export type { StepScopeProps }
