import { parse } from 'node-html-parser'
import type { TrackingResult, TrackingEvent, TrackingStatus } from './types'

const HP_TRACKING_URL = 'https://posiljka.posta.hr/Tracking/Details'

function parseStatus(text: string): TrackingStatus {
  const lower = text.toLowerCase()
  if (lower.includes('dostav') || lower.includes('deliver')) return 'delivered'
  if (lower.includes('isporuk') || lower.includes('out for')) return 'out_for_delivery'
  if (lower.includes('tranzit') || lower.includes('transit') || lower.includes('zaprim') || lower.includes('obrađ')) return 'in_transit'
  if (lower.includes('informacij') || lower.includes('info')) return 'info_received'
  return 'in_transit'
}

export async function scrapeHrvatskaPostа(trackingNumber: string): Promise<TrackingResult> {
  try {
    const response = await fetch(`${HP_TRACKING_URL}?code=${encodeURIComponent(trackingNumber)}`, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Version2.hr Tracking Service)' },
    })

    if (!response.ok) {
      return { success: false, carrier: 'hrvatska-posta', events: [], currentStatus: 'info_received', error: `HTTP ${response.status}` }
    }

    const html = await response.text()
    const root = parse(html)
    const rows = root.querySelectorAll('table.table tbody tr')

    const events: TrackingEvent[] = []
    for (const row of rows) {
      const cells = row.querySelectorAll('td')
      if (cells.length < 3) continue

      const dateText = cells[0].text.trim()
      const location = cells[1].text.trim()
      const description = cells[2].text.trim()

      events.push({
        status: parseStatus(description),
        location,
        description,
        eventTime: dateText,
      })
    }

    const currentStatus = events.length > 0 ? events[0].status : 'info_received'

    return {
      success: events.length > 0,
      carrier: 'hrvatska-posta',
      events,
      currentStatus,
      error: events.length === 0 ? 'No tracking events found' : undefined,
    }
  } catch (err) {
    return {
      success: false,
      carrier: 'hrvatska-posta',
      events: [],
      currentStatus: 'info_received',
      error: err instanceof Error ? err.message : 'Unknown error',
    }
  }
}
