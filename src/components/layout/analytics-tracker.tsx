'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { hasAnalyticsConsent } from '@/components/layout/analytics'
import { trackPageView, startTracker, stopTracker } from '@/lib/analytics-tracker'

/**
 * Consent-gated analytics tracker that batches events to /api/analytics/events.
 * Added to LayoutShell alongside the third-party Analytics component.
 */
function AnalyticsTracker() {
  const pathname = usePathname()

  useEffect(() => {
    if (!hasAnalyticsConsent()) return

    startTracker()
    return () => stopTracker()
  }, [])

  useEffect(() => {
    if (!hasAnalyticsConsent()) return
    trackPageView(pathname)
  }, [pathname])

  return null
}

export { AnalyticsTracker }
