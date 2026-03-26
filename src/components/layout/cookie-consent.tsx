'use client'

import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'motion/react'
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

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-label="Cookie preferences"
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-0 left-0 w-full"
          style={{
            zIndex: 'var(--z-cookie)',
            background: 'color-mix(in srgb, var(--color-sunken) 95%, transparent)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            borderTop: '1px solid color-mix(in srgb, var(--color-line) 40%, transparent)',
          } as React.CSSProperties}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 pr-20 sm:pr-6 lg:pr-8">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-6">
              <p
                className="text-muted font-body"
                style={{ fontSize: 'var(--text-small)' } as React.CSSProperties}
              >
                We use cookies for analytics to improve your experience.
              </p>
              <div className="flex items-center gap-3 shrink-0">
                <Button variant="primary" size="sm" onClick={() => saveConsent(true)}>
                  Accept
                </Button>
                <Button variant="ghost" size="sm" onClick={() => saveConsent(false)}>
                  Decline
                </Button>
                <button
                  onClick={() => setShowCustomize(!showCustomize)}
                  className="text-sm text-faint hover:text-muted transition-colors font-body underline underline-offset-2"
                  style={{ transitionDuration: 'var(--duration-fast)' }}
                >
                  Customize
                </button>
              </div>
            </div>

            <AnimatePresence>
              {showCustomize && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 pt-4 border-t border-line-subtle">
                    <div className="flex flex-col gap-4 max-w-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-foreground font-body">Functional</span>
                        <span
                          className="text-faint font-body"
                          style={{ fontSize: 'var(--text-small)' }}
                        >
                          Always active
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-foreground font-body">Analytics</span>
                        <button
                          role="switch"
                          aria-checked={analyticsEnabled}
                          onClick={() => setAnalyticsEnabled(!analyticsEnabled)}
                          className="relative w-10 h-5 rounded-full transition-colors"
                          style={{
                            backgroundColor: analyticsEnabled ? 'var(--color-brand-red)' : 'var(--color-line)',
                            transitionDuration: 'var(--duration-normal)',
                          }}
                        >
                          <span
                            className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform"
                            style={{
                              transform: analyticsEnabled ? 'translateX(20px)' : 'translateX(0)',
                              transitionDuration: 'var(--duration-normal)',
                              transitionTimingFunction: 'var(--ease-out)',
                            }}
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
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export { CookieConsent }
