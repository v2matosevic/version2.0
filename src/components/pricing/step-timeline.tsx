'use client'

import type { PricingConfig, TimelineId } from '@/types/pricing'
import { OptionCard } from './option-card'

type StepTimelineProps = {
  config: PricingConfig
  selected: TimelineId | null
  onSelect: (id: TimelineId) => void
  onNext: () => void
}

function StepTimeline({ config, selected, onSelect, onNext }: StepTimelineProps) {
  const step = config.steps.timeline

  function handleSelect(id: TimelineId) {
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
        {step.options.map((option) => (
          <OptionCard
            key={option.id}
            label={option.label}
            description={option.description}
            detail={option.detail}
            badge={option.badge}
            selected={selected === option.id}
            onSelect={() => handleSelect(option.id as TimelineId)}
          />
        ))}
      </div>
    </div>
  )
}

export { StepTimeline }
export type { StepTimelineProps }
