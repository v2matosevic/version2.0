'use client'

type QuantitySelectorProps = {
  id: string
  quantity: number
  min: number
  max: number
  perUnit?: string
  onChange: (id: string, quantity: number) => void
}

function QuantitySelector({ id, quantity, min, max, perUnit, onChange }: QuantitySelectorProps) {
  function decrement() {
    if (quantity > min) onChange(id, quantity - 1)
  }

  function increment() {
    if (quantity < max) onChange(id, quantity + 1)
  }

  return (
    <div className="flex items-center gap-2 mt-1.5">
      <button
        type="button"
        onClick={decrement}
        disabled={quantity <= min}
        aria-label="Decrease quantity"
        className={[
          'h-7 w-7 rounded-md border border-line bg-raised text-foreground flex items-center justify-center transition-colors',
          'focus-visible:ring-2 focus-visible:ring-brand-red/40',
          quantity <= min ? 'opacity-30 cursor-not-allowed' : 'hover:border-faint cursor-pointer',
        ].join(' ')}
      >
        <svg width="12" height="2" viewBox="0 0 12 2" fill="currentColor">
          <rect width="12" height="2" rx="1" />
        </svg>
      </button>

      <span
        className="w-8 text-center text-foreground font-body tabular-nums"
        style={{ fontSize: 'var(--text-body)', fontWeight: 'var(--font-weight-body-semibold)' } as React.CSSProperties}
      >
        {quantity}
      </span>

      <button
        type="button"
        onClick={increment}
        disabled={quantity >= max}
        aria-label="Increase quantity"
        className={[
          'h-7 w-7 rounded-md border border-line bg-raised text-foreground flex items-center justify-center transition-colors',
          'focus-visible:ring-2 focus-visible:ring-brand-red/40',
          quantity >= max ? 'opacity-30 cursor-not-allowed' : 'hover:border-faint cursor-pointer',
        ].join(' ')}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
          <rect x="5" y="0" width="2" height="12" rx="1" />
          <rect x="0" y="5" width="12" height="2" rx="1" />
        </svg>
      </button>

      {perUnit && (
        <span
          className="text-faint"
          style={{ fontSize: 'var(--text-small)' } as React.CSSProperties}
        >
          {perUnit}
        </span>
      )}
    </div>
  )
}

export { QuantitySelector }
export type { QuantitySelectorProps }
