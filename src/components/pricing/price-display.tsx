'use client'

import type { PricingEstimate, PricingConfig } from '@/types/pricing'
import { formatRange, formatMonthly, formatYearly } from '@/lib/pricing/format-price'

type PriceDisplayProps = {
  estimate: PricingEstimate
  config: PricingConfig
}

function PriceDisplay({ estimate, config }: PriceDisplayProps) {
  const display = config.steps.summary.displaySections
  const hasMonthly = estimate.monthly[0] > 0 || estimate.monthly[1] > 0
  const hasYearly = estimate.yearly[0] > 0 || estimate.yearly[1] > 0

  return (
    <div className="space-y-6">
      {/* One-time cost — large, prominent */}
      <div>
        <p
          className="text-muted font-body uppercase tracking-wider"
          style={{ fontSize: 'var(--text-overline)', letterSpacing: 'var(--tracking-overline)' } as React.CSSProperties}
        >
          {display.oneTime.label}
        </p>
        <p
          className="mt-1 font-heading text-foreground"
          style={{
            fontSize: 'var(--text-h2)',
            fontWeight: 'var(--font-weight-headline-bold)',
            lineHeight: 'var(--leading-tight)',
            letterSpacing: 'var(--tracking-h2)',
          } as React.CSSProperties}
        >
          {formatRange(estimate.oneTime)}
        </p>
        <p
          className="mt-1 text-faint"
          style={{ fontSize: 'var(--text-small)' } as React.CSSProperties}
        >
          {display.oneTime.description}
        </p>
      </div>

      {/* Monthly & Yearly — secondary */}
      <div className="flex flex-wrap gap-8">
        {hasMonthly && (
          <div>
            <p
              className="text-muted font-body uppercase tracking-wider"
              style={{ fontSize: 'var(--text-overline)', letterSpacing: 'var(--tracking-overline)' } as React.CSSProperties}
            >
              {display.monthly.label}
            </p>
            <p
              className="mt-1 font-heading text-foreground"
              style={{
                fontSize: 'var(--text-h4)',
                fontWeight: 'var(--font-weight-headline-bold)',
                lineHeight: 'var(--leading-tight)',
              } as React.CSSProperties}
            >
              {formatMonthly(estimate.monthly)}
            </p>
            {display.monthly.note && (
              <p
                className="mt-0.5 text-faint"
                style={{ fontSize: 'var(--text-small)' } as React.CSSProperties}
              >
                {display.monthly.note}
              </p>
            )}
          </div>
        )}

        {hasYearly && (
          <div>
            <p
              className="text-muted font-body uppercase tracking-wider"
              style={{ fontSize: 'var(--text-overline)', letterSpacing: 'var(--tracking-overline)' } as React.CSSProperties}
            >
              {display.yearly.label}
            </p>
            <p
              className="mt-1 font-heading text-foreground"
              style={{
                fontSize: 'var(--text-h4)',
                fontWeight: 'var(--font-weight-headline-bold)',
                lineHeight: 'var(--leading-tight)',
              } as React.CSSProperties}
            >
              {formatYearly(estimate.yearly)}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export { PriceDisplay }
export type { PriceDisplayProps }
