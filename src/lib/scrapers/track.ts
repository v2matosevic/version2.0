import { scrapeHrvatskaPostа } from './hrvatska-posta'
import { scrapeGls } from './gls'
import { scrapeDpd } from './dpd'
import type { TrackingResult } from './types'

type Carrier = 'hrvatska-posta' | 'gls' | 'dpd'

const scrapers: Record<Carrier, (trackingNumber: string) => Promise<TrackingResult>> = {
  'hrvatska-posta': scrapeHrvatskaPostа,
  'gls': scrapeGls,
  'dpd': scrapeDpd,
}

// In-memory cache: trackingNumber -> { result, timestamp }
const cache = new Map<string, { result: TrackingResult; timestamp: number }>()
const CACHE_TTL_MS = 30 * 60 * 1000 // 30 minutes

export async function trackParcel(trackingNumber: string, carrier: Carrier): Promise<TrackingResult> {
  const cacheKey = `${carrier}:${trackingNumber}`
  const cached = cache.get(cacheKey)

  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    // Don't cache delivered results for long — they won't change
    if (cached.result.currentStatus === 'delivered' || Date.now() - cached.timestamp < CACHE_TTL_MS) {
      return cached.result
    }
  }

  const scraper = scrapers[carrier]
  if (!scraper) {
    return {
      success: false,
      carrier,
      events: [],
      currentStatus: 'info_received',
      error: `Unknown carrier: ${carrier}`,
    }
  }

  const result = await scraper(trackingNumber)
  cache.set(cacheKey, { result, timestamp: Date.now() })

  return result
}

export type { Carrier }
