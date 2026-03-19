'use client'

import type { PricingConfig, DesignId } from '@/types/pricing'
import { OptionCard } from './option-card'

type StepDesignProps = {
  config: PricingConfig
  selected: DesignId | null
  onSelect: (id: DesignId) => void
  onNext: () => void
}

function StepDesign({ config, selected, onSelect, onNext }: StepDesignProps) {
  const step = config.steps.design

  function handleSelect(id: DesignId) {
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

      <div className="mt-8 grid gap-4">
        {step.options.map((option) => {
          const multiplierLabel =
            option.multiplier === 1
              ? 'Base price'
              : `${option.multiplier > 1 ? '+' : ''}${Math.round((option.multiplier - 1) * 100)}% on base`

          return (
            <OptionCard
              key={option.id}
              label={option.label}
              description={option.description}
              detail={`${option.detail} · ${multiplierLabel}`}
              selected={selected === option.id}
              onSelect={() => handleSelect(option.id as DesignId)}
            />
          )
        })}
      </div>
    </div>
  )
}

export { StepDesign }
export type { StepDesignProps }
