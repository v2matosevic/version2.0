'use client'

import { useRef, useEffect, useCallback } from 'react'
import { gsap } from 'gsap'
import { useReducedMotion } from '@/lib/utils/use-reduced-motion'

const CURSOR_SIZE = 12
const CURSOR_GROW_SCALE = 3

function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const quickX = useRef<gsap.QuickToFunc | null>(null)
  const quickY = useRef<gsap.QuickToFunc | null>(null)
  const isTouch = useRef(false)
  const prefersReducedMotion = useReducedMotion()

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isTouch.current) return
    quickX.current?.(e.clientX)
    quickY.current?.(e.clientY)
  }, [])

  const handleMouseEnterInteractive = useCallback(() => {
    if (!cursorRef.current) return
    gsap.to(cursorRef.current, {
      scale: CURSOR_GROW_SCALE,
      duration: 0.3,
      ease: 'power2.out',
    })
  }, [])

  const handleMouseLeaveInteractive = useCallback(() => {
    if (!cursorRef.current) return
    gsap.to(cursorRef.current, {
      scale: 1,
      duration: 0.3,
      ease: 'power2.out',
    })
  }, [])

  const handleClick = useCallback(() => {
    if (!cursorRef.current) return
    gsap.fromTo(cursorRef.current, {
      scale: 0.8,
    }, {
      scale: 1,
      duration: 0.4,
      ease: 'elastic.out(1, 0.4)',
    })
  }, [])

  const handleTouchStart = useCallback(() => {
    isTouch.current = true
    if (cursorRef.current) {
      cursorRef.current.style.display = 'none'
    }
  }, [])

  useEffect(() => {
    if (prefersReducedMotion || !cursorRef.current) return

    // Hide on touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      cursorRef.current.style.display = 'none'
      return
    }

    const cursor = cursorRef.current
    quickX.current = gsap.quickTo(cursor, 'x', { duration: 0.2, ease: 'power2.out' })
    quickY.current = gsap.quickTo(cursor, 'y', { duration: 0.2, ease: 'power2.out' })

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('click', handleClick)
    document.addEventListener('touchstart', handleTouchStart, { once: true })

    // Observe interactive elements
    const interactives = document.querySelectorAll('a, button, [role="button"], input, textarea, select, [data-cursor-grow]')
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnterInteractive)
      el.addEventListener('mouseleave', handleMouseLeaveInteractive)
    })

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('click', handleClick)
      document.removeEventListener('touchstart', handleTouchStart)
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnterInteractive)
        el.removeEventListener('mouseleave', handleMouseLeaveInteractive)
      })
    }
  }, [prefersReducedMotion, handleMouseMove, handleClick, handleTouchStart, handleMouseEnterInteractive, handleMouseLeaveInteractive])

  if (prefersReducedMotion) return null

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: -CURSOR_SIZE / 2,
        left: -CURSOR_SIZE / 2,
        width: CURSOR_SIZE,
        height: CURSOR_SIZE,
        borderRadius: '50%',
        backgroundColor: 'var(--color-foreground)',
        pointerEvents: 'none',
        zIndex: 9999,
        mixBlendMode: 'difference',
        willChange: 'transform',
      }}
    />
  )
}

export { CustomCursor }
