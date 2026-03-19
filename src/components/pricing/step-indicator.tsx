'use client'

import type { WizardStep } from '@/types/pricing'
import { WIZARD_STEP_LABELS, WIZARD_STEP_COUNT } from '@/types/pricing'

type StepIndicatorProps = {
  currentStep: WizardStep
  onStepClick: (step: WizardStep) => void
}

function StepIndicator({ currentStep, onStepClick }: StepIndicatorProps) {
  return (
    <nav aria-label="Wizard progress" className="flex items-center gap-2 sm:gap-3">
      {Array.from({ length: WIZARD_STEP_COUNT }, (_, i) => {
        const stepNumber = (i + 1) as WizardStep
        const isActive = stepNumber === currentStep
        const isCompleted = stepNumber < currentStep
        const isClickable = stepNumber < currentStep

        return (
          <button
            key={stepNumber}
            type="button"
            disabled={!isClickable}
            onClick={() => isClickable && onStepClick(stepNumber)}
            className={[
              'flex items-center gap-2 transition-colors',
              isClickable ? 'cursor-pointer' : 'cursor-default',
              isActive ? 'text-foreground' : isCompleted ? 'text-brand-red' : 'text-faint',
            ].join(' ')}
            aria-current={isActive ? 'step' : undefined}
            aria-label={`Step ${stepNumber}: ${WIZARD_STEP_LABELS[i]}`}
          >
            {/* Dot */}
            <span
              className={[
                'h-2.5 w-2.5 rounded-full transition-colors',
                isActive
                  ? 'bg-brand-red'
                  : isCompleted
                    ? 'bg-brand-red/60'
                    : 'bg-line',
              ].join(' ')}
            />
            {/* Label — hidden on mobile */}
            <span
              className="hidden sm:inline text-sm font-body"
              style={{ fontWeight: 'var(--font-weight-body)' } as React.CSSProperties}
            >
              {WIZARD_STEP_LABELS[i]}
            </span>

            {/* Connector line */}
            {i < WIZARD_STEP_COUNT - 1 && (
              <span
                className={[
                  'hidden sm:block h-px w-6 transition-colors',
                  isCompleted ? 'bg-brand-red/40' : 'bg-line',
                ].join(' ')}
              />
            )}
          </button>
        )
      })}
    </nav>
  )
}

export { StepIndicator }
export type { StepIndicatorProps }
