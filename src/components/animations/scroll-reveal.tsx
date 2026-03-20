'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useReducedMotion } from '@/lib/utils/use-reduced-motion'

gsap.registerPlugin(ScrollTrigger, useGSAP)

type ScrollRevealDirection = 'up' | 'down' | 'left' | 'right' | 'none'

type ScrollRevealProps = {
  children: React.ReactNode
  direction?: ScrollRevealDirection
  duration?: number
  delay?: number
  distance?: number
  className?: string
}

const DIRECTION_MAP: Record<ScrollRevealDirection, { x: number; y: number }> = {
  up: { x: 0, y: 40 },
  down: { x: 0, y: -40 },
  left: { x: 40, y: 0 },
  right: { x: -40, y: 0 },
  none: { x: 0, y: 0 },
}

function ScrollReveal({
  children,
  direction = 'up',
  duration = 0.8,
  delay = 0,
  distance,
  className,
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useGSAP(() => {
    if (prefersReducedMotion || !containerRef.current) return

    const offset = DIRECTION_MAP[direction]
    const x = distance !== undefined ? (offset.x !== 0 ? Math.sign(offset.x) * distance : 0) : offset.x
    const y = distance !== undefined ? (offset.y !== 0 ? Math.sign(offset.y) * distance : 0) : offset.y

    // Set initial hidden state via GSAP — content visible by default in HTML
    gsap.set(containerRef.current, { opacity: 0, x, y })

    gsap.to(containerRef.current, {
      opacity: 1,
      x: 0,
      y: 0,
      duration,
      delay,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 85%',
        once: true,
      },
    })
  }, { dependencies: [prefersReducedMotion, direction, duration, delay, distance] })

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  )
}

export { ScrollReveal }
export type { ScrollRevealProps, ScrollRevealDirection }
