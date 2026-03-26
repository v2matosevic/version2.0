'use client'

import { useEffect } from 'react'

type LenisLike = { stop: () => void; start: () => void }

export function useLockBody(locked: boolean): void {
  useEffect(() => {
    if (!locked) return

    const originalOverflow = document.body.style.overflow
    const originalPaddingRight = document.body.style.paddingRight

    // Lock native scrolling
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`
    }

    // Stop Lenis smooth scroll if active
    const lenis = (window as unknown as Record<string, unknown>).__lenis as LenisLike | undefined
    lenis?.stop()

    return () => {
      document.body.style.overflow = originalOverflow
      document.body.style.paddingRight = originalPaddingRight
      lenis?.start()
    }
  }, [locked])
}
