'use client'

import { useState, useEffect } from 'react'

type ScrollDirection = 'up' | 'down' | null

export function useScrollDirection(threshold = 10): {
  scrollDirection: ScrollDirection
  scrollY: number
} {
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>(null)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    let lastScrollY = window.scrollY
    let ticking = false

    function updateScrollDirection() {
      const currentScrollY = window.scrollY
      setScrollY(currentScrollY)

      if (Math.abs(currentScrollY - lastScrollY) < threshold) {
        ticking = false
        return
      }

      setScrollDirection(currentScrollY > lastScrollY ? 'down' : 'up')
      lastScrollY = currentScrollY > 0 ? currentScrollY : 0
      ticking = false
    }

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDirection)
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return { scrollDirection, scrollY }
}
