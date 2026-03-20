type AnalyticsEvent = {
  type: 'page_view' | 'click' | 'scroll_depth' | 'time_on_page' | 'conversion'
  page: string
  data?: Record<string, unknown>
  sessionId: string
  timestamp: string
}

const BATCH_INTERVAL_MS = 10_000
const MAX_BATCH_SIZE = 50

const eventQueue: AnalyticsEvent[] = []
let flushTimer: ReturnType<typeof setInterval> | null = null
let sessionId: string | null = null

function getSessionId(): string {
  if (sessionId) return sessionId

  if (typeof window !== 'undefined') {
    const stored = sessionStorage.getItem('v2_analytics_session')
    if (stored) {
      sessionId = stored
      return stored
    }

    const id = crypto.randomUUID()
    sessionStorage.setItem('v2_analytics_session', id)
    sessionId = id
    return id
  }

  return 'unknown'
}

function flush(): void {
  if (eventQueue.length === 0) return

  const batch = eventQueue.splice(0, MAX_BATCH_SIZE)

  if (typeof navigator !== 'undefined' && 'sendBeacon' in navigator) {
    navigator.sendBeacon(
      '/api/analytics/events/',
      JSON.stringify({ events: batch }),
    )
  } else {
    fetch('/api/analytics/events/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ events: batch }),
      keepalive: true,
    }).catch(() => { /* silent fail */ })
  }
}

export function trackEvent(
  type: AnalyticsEvent['type'],
  page: string,
  data?: Record<string, unknown>,
): void {
  eventQueue.push({
    type,
    page,
    data,
    sessionId: getSessionId(),
    timestamp: new Date().toISOString(),
  })

  // If batch is full, flush immediately
  if (eventQueue.length >= MAX_BATCH_SIZE) {
    flush()
  }
}

export function trackPageView(page: string): void {
  trackEvent('page_view', page)
}

export function trackConversion(page: string, conversionType: string): void {
  trackEvent('conversion', page, { conversionType })
}

export function startTracker(): void {
  if (flushTimer) return

  flushTimer = setInterval(flush, BATCH_INTERVAL_MS)

  if (typeof window !== 'undefined') {
    window.addEventListener('beforeunload', flush)
    window.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') flush()
    })
  }
}

export function stopTracker(): void {
  if (flushTimer) {
    clearInterval(flushTimer)
    flushTimer = null
  }
  flush()
}
