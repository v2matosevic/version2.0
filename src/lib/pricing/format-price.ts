import type { PriceRange } from '@/types/pricing'

/**
 * Format a single number as EUR currency.
 */
function formatEur(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

/**
 * Format a price range: "€2,500 — €4,500"
 */
function formatRange(range: PriceRange): string {
  if (range[0] === 0 && range[1] === 0) return '€0'
  if (range[0] === range[1]) return formatEur(range[0])
  return `${formatEur(range[0])} — ${formatEur(range[1])}`
}

/**
 * Format a monthly price range: "€120 — €250 /mo"
 */
function formatMonthly(range: PriceRange): string {
  if (range[0] === 0 && range[1] === 0) return '€0 /mo'
  return `${formatRange(range)} /mo`
}

/**
 * Format a yearly price range: "€15 — €50 /yr"
 */
function formatYearly(range: PriceRange): string {
  if (range[0] === 0 && range[1] === 0) return '€0 /yr'
  return `${formatRange(range)} /yr`
}

export { formatEur, formatRange, formatMonthly, formatYearly }
