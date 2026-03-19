'use client'

import { AnimatePresence, motion } from 'motion/react'
import type { PricingConfig } from '@/types/pricing'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { useWizardState } from './use-wizard-state'
import { StepIndicator } from './step-indicator'
import { StepProjectType } from './step-project-type'
import { StepScope } from './step-scope'
import { StepDesign } from './step-design'
import { StepTimeline } from './step-timeline'
import { StepSummary } from './step-summary'

type WizardShellProps = {
  config: PricingConfig
}

const SLIDE_DISTANCE = 40

function WizardShell({ config }: WizardShellProps) {
  const wizard = useWizardState(config)

  const canGoBack = wizard.step > 1
  const canAdvance =
    (wizard.step === 1 && wizard.selections.projectType !== null) ||
    (wizard.step === 2 && wizard.selections.scope !== null) ||
    (wizard.step === 3 && wizard.selections.design !== null) ||
    (wizard.step === 4 && wizard.selections.timeline !== null)

  return (
    <section className="py-12 md:py-20">
      <Container>
        {/* Step indicator */}
        <div className="mb-10 flex items-center justify-between">
          <StepIndicator currentStep={wizard.step} onStepClick={wizard.goToStep} />
          <span
            className="text-faint font-body sm:hidden"
            style={{ fontSize: 'var(--text-small)' } as React.CSSProperties}
          >
            {wizard.step} / 5
          </span>
        </div>

        {/* Step content with transitions */}
        <div className="relative min-h-[400px]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={wizard.step}
              initial={{ opacity: 0, x: wizard.direction * SLIDE_DISTANCE }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: wizard.direction * -SLIDE_DISTANCE }}
              transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {wizard.step === 1 && (
                <StepProjectType
                  config={config}
                  selected={wizard.selections.projectType}
                  onSelect={wizard.setProjectType}
                  onNext={wizard.nextStep}
                />
              )}
              {wizard.step === 2 && (
                <StepScope
                  config={config}
                  projectType={wizard.selections.projectType}
                  selected={wizard.selections.scope}
                  onSelect={wizard.setScope}
                  onNext={wizard.nextStep}
                />
              )}
              {wizard.step === 3 && (
                <StepDesign
                  config={config}
                  selected={wizard.selections.design}
                  onSelect={wizard.setDesign}
                  onNext={wizard.nextStep}
                />
              )}
              {wizard.step === 4 && (
                <StepTimeline
                  config={config}
                  selected={wizard.selections.timeline}
                  onSelect={wizard.setTimeline}
                  onNext={wizard.nextStep}
                />
              )}
              {wizard.step === 5 && (
                <StepSummary
                  config={config}
                  selections={wizard.selections}
                  estimate={wizard.estimate}
                  onToggleAddon={wizard.toggleAddon}
                  onAddonQuantity={wizard.setAddonQuantity}
                  onMaintenanceChange={wizard.setMaintenanceTier}
                  onReset={wizard.reset}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation buttons — hidden on summary */}
        {wizard.step < 5 && (
          <div className="mt-10 flex items-center justify-between">
            <div>
              {canGoBack && (
                <Button variant="ghost" size="md" onClick={wizard.prevStep}>
                  <span className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Back
                  </span>
                </Button>
              )}
            </div>
            <div>
              {canAdvance && (
                <Button variant="primary" size="md" onClick={wizard.nextStep}>
                  <span className="flex items-center gap-2">
                    Continue
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Base includes — shown below step 1 */}
        {wizard.step === 1 && (
          <div className="mt-16 pt-8 border-t border-line-subtle">
            <p
              className="text-faint uppercase font-body mb-4"
              style={{
                fontSize: 'var(--text-overline)',
                letterSpacing: 'var(--tracking-overline)',
                fontWeight: 'var(--font-weight-body-semibold)',
              } as React.CSSProperties}
            >
              Every project includes
            </p>
            <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {config.baseIncludes.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-muted"
                  style={{ fontSize: 'var(--text-small)' } as React.CSSProperties}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    className="mt-0.5 shrink-0 text-brand-red"
                  >
                    <path d="M2 7L5.5 10.5L12 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </Container>
    </section>
  )
}

export { WizardShell }
export type { WizardShellProps }
