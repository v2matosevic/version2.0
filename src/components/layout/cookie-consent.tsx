'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'

const STORAGE_KEY = 'v2_cookie_consent'
const CONSENT_VERSION = 1

type ConsentData = {
  version: number
  analytics: boolean
  timestamp: string
}

function getStoredConsent(): ConsentData | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const data = JSON.parse(raw) as ConsentData
    if (data.version < CONSENT_VERSION) return null
    return data
  } catch {
    return null
  }
}

function CookieConsent() {
  const [visible, setVisible] = useState(false)
  const [showCustomize, setShowCustomize] = useState(false)
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false)

  useEffect(() => {
    const stored = getStoredConsent()
    if (!stored) {
      // Intentional: check localStorage once on mount to show banner
      setVisible(true) // eslint-disable-line react-hooks/set-state-in-effect
    }
  }, [])

  const saveConsent = useCallback((analytics: boolean) => {
    const data: ConsentData = {
      version: CONSENT_VERSION,
      analytics,
      timestamp: new Date().toISOString(),
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    window.dispatchEvent(new Event('v2-consent-change'))
    setVisible(false)
  }, [])

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-label="Cookie preferences"
      className="fixed bottom-0 left-0 w-full bg-raised border-t border-line"
      style={{ zIndex: 'var(--z-cookie)' } as React.CSSProperties}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-4">
          <p className="text-foreground font-body text-base">
            We use cookies for analytics to improve your experience.
          </p>
          <div className="flex items-center gap-3 shrink-0">
            <Button variant="primary" size="sm" onClick={() => saveConsent(true)}>
              Accept All
            </Button>
            <Button variant="ghost" size="sm" onClick={() => saveConsent(false)}>
              Decline
            </Button>
            <button
              onClick={() => setShowCustomize(!showCustomize)}
              className="text-sm text-muted underline font-body hover:text-foreground transition-colors"
            >
              Customize
            </button>
          </div>
        </div>

        {showCustomize && (
          <div className="mt-4 pt-4 border-t border-line-subtle">
            <div className="flex flex-col gap-4 max-w-md">
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground font-body">Functional</span>
                <span className="text-sm text-muted font-body">Always active</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground font-body">Analytics</span>
                <button
                  role="switch"
                  aria-checked={analyticsEnabled}
                  onClick={() => setAnalyticsEnabled(!analyticsEnabled)}
                  className={[
                    'relative w-10 h-5 rounded-full transition-colors',
                    analyticsEnabled ? 'bg-brand-red' : 'bg-line',
                  ].join(' ')}
                >
                  <span
                    className={[
                      'absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform',
                      analyticsEnabled ? 'translate-x-5' : 'translate-x-0',
                    ].join(' ')}
                  />
                </button>
              </div>
              <Button
                variant="primary"
                size="sm"
                onClick={() => saveConsent(analyticsEnabled)}
              >
                Save Preferences
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export { CookieConsent }
