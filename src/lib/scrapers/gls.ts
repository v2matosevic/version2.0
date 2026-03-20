import { parse } from 'node-html-parser'
import type { TrackingResult, TrackingEvent, TrackingStatus } from './types'

const GLS_TRACKING_URL = 'https://gls-group.eu/HR/hr/pracenje-posiljki'

function parseStatus(text: string): TrackingStatus {
  const lower = text.toLowerCase()
  if (lower.includes('dostav') || lower.includes('deliver') || lower.includes('zugestell')) return 'delivered'
  if (lower.includes('isporuk') || lower.includes('out for') || lower.includes('zustellung')) return 'out_for_delivery'
  if (lower.includes('tranzit') || lower.includes('transit') || lower.includes('sortir') || lower.includes('hub')) return 'in_transit'
  if (lower.includes('preuz') || lower.includes('picked') || lower.includes('aufgeg')) return 'info_received'
  return 'in_transit'
}

export async function scrapeGls(trackingNumber: string): Promise<TrackingResult> {
  try {
    const response = await fetch(`${GLS_TRACKING_URL}?match=${encodeURIComponent(trackingNumber)}`, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Version2.hr Tracking Service)' },
    })

    if (!response.ok) {
      return { success: false, carrier: 'gls', events: [], currentStatus: 'info_received', error: `HTTP ${response.status}` }
    }

    const html = await response.text()
    const root = parse(html)
    const rows = root.querySelectorAll('.gl_history table tr')

    const events: TrackingEvent[] = []
    for (const row of rows) {
      const cells = row.querySelectorAll('td')
      if (cells.length < 3) continue

      events.push({
        status: parseStatus(cells[2].text.trim()),
        location: cells[1].text.trim(),
        description: cells[2].text.trim(),
        eventTime: cells[0].text.trim(),
      })
    }

    const currentStatus = events.length > 0 ? events[0].status : 'info_received'

    return {
      success: events.length > 0,
      carrier: 'gls',
      events,
      currentStatus,
      error: events.length === 0 ? 'No tracking events found' : undefined,
    }
  } catch (err) {
    return {
      success: false,
      carrier: 'gls',
      events: [],
      currentStatus: 'info_received',
      error: err instanceof Error ? err.message : 'Unknown error',
    }
  }
}
