'use client'

import { useRouter } from 'next/navigation'
import type { PricingConfig, ProjectTypeId } from '@/types/pricing'
import { OptionCard } from './option-card'

type StepProjectTypeProps = {
  config: PricingConfig
  selected: ProjectTypeId | null
  onSelect: (id: ProjectTypeId) => void
  onNext: () => void
}

function StepProjectType({ config, selected, onSelect, onNext }: StepProjectTypeProps) {
  const router = useRouter()
  const step = config.steps.projectType

  function handleSelect(id: ProjectTypeId, redirectsToContact?: boolean) {
    if (redirectsToContact) {
      router.push('/contact/')
      return
    }
    onSelect(id)
    // Auto-advance after selection
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
        {step.options.map((option) => (
          <OptionCard
            key={option.id}
            label={option.label}
            description={option.description}
            selected={selected === option.id}
            onSelect={() => handleSelect(option.id, option.redirectsToContact)}
          />
        ))}
      </div>
    </div>
  )
}

export { StepProjectType }
export type { StepProjectTypeProps }
