'use client'

import Link from 'next/link'
import type { PricingConfig, WizardSelections, PricingEstimate, MaintenanceTierId } from '@/types/pricing'
import { serializeSelections } from '@/lib/pricing/serialize-selections'
import { Button } from '@/components/ui/button'
import { PriceDisplay } from './price-display'
import { ChoicesSummary } from './choices-summary'
import { AddonPanel } from './addon-panel'

type StepSummaryProps = {
  config: PricingConfig
  selections: WizardSelections
  estimate: PricingEstimate
  onToggleAddon: (id: string) => void
  onAddonQuantity: (id: string, quantity: number) => void
  onMaintenanceChange: (tier: MaintenanceTierId) => void
  onReset: () => void
}

function StepSummary({
  config,
  selections,
  estimate,
  onToggleAddon,
  onAddonQuantity,
  onMaintenanceChange,
  onReset,
}: StepSummaryProps) {
  const summary = config.steps.summary
  const queryString = serializeSelections(selections)
  const contactHref = queryString ? `/contact/?${queryString}` : '/contact/'

  return (
    <div>
      {/* Header */}
      <h2
        className="font-heading text-foreground"
        style={{
          fontSize: 'var(--text-h2)',
          fontWeight: 'var(--font-weight-headline)',
          lineHeight: 'var(--leading-display)',
          letterSpacing: 'var(--tracking-h2)',
        } as React.CSSProperties}
      >
        {summary.headline}
      </h2>
      <p
        className="mt-2 text-muted"
        style={{ fontSize: 'var(--text-body-lg)', lineHeight: 'var(--leading-body)' } as React.CSSProperties}
      >
        {summary.subtitle}
      </p>

      {/* Price display */}
      <div className="mt-8 p-6 rounded-xl border border-line bg-raised/50">
        <PriceDisplay estimate={estimate} config={config} />
      </div>

      {/* Choices summary */}
      <div className="mt-6 p-6 rounded-xl border border-line-subtle bg-raised/30">
        <ChoicesSummary selections={selections} config={config} />
      </div>

      {/* Range explanation */}
      <p
        className="mt-4 text-faint"
        style={{ fontSize: 'var(--text-small)', lineHeight: 'var(--leading-body)' } as React.CSSProperties}
      >
        {summary.rangeExplanation}
      </p>

      {/* Addon panel */}
      <div className="mt-10">
        <AddonPanel
          config={config}
          selections={selections}
          onToggle={onToggleAddon}
          onQuantityChange={onAddonQuantity}
          onMaintenanceChange={onMaintenanceChange}
        />
      </div>

      {/* Disclaimer */}
      <p
        className="mt-8 text-faint"
        style={{ fontSize: 'var(--text-small)', lineHeight: 'var(--leading-body)' } as React.CSSProperties}
      >
        {summary.disclaimer}
      </p>

      {/* CTAs */}
      <div className="mt-8 flex flex-col sm:flex-row items-start gap-4">
        <Link href={contactHref}>
          <Button variant="primary" size="lg">
            {summary.ctaPrimary.label}
          </Button>
        </Link>
        <Link href="/contact/">
          <Button variant="secondary" size="lg">
            {summary.ctaSecondary.label}
          </Button>
        </Link>
      </div>

      {/* Reset */}
      <button
        type="button"
        onClick={onReset}
        className="mt-6 text-faint hover:text-muted transition-colors cursor-pointer font-body"
        style={{ fontSize: 'var(--text-small)' } as React.CSSProperties}
      >
        Start over
      </button>
    </div>
  )
}

export { StepSummary }
export type { StepSummaryProps }
