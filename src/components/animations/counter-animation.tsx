'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useReducedMotion } from '@/lib/utils/use-reduced-motion'

gsap.registerPlugin(ScrollTrigger, useGSAP)

type CounterAnimationProps = {
  target: number
  prefix?: string
  suffix?: string
  decimals?: number
  duration?: number
  className?: string
}

function CounterAnimation({
  target,
  prefix = '',
  suffix = '',
  decimals = 0,
  duration = 2,
  className,
}: CounterAnimationProps) {
  const spanRef = useRef<HTMLSpanElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useGSAP(() => {
    if (prefersReducedMotion || !spanRef.current) return

    const counter = { value: 0 }

    gsap.to(counter, {
      value: target,
      duration,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: spanRef.current,
        start: 'top 85%',
        once: true,
      },
      onUpdate() {
        if (spanRef.current) {
          spanRef.current.textContent = `${prefix}${counter.value.toFixed(decimals)}${suffix}`
        }
      },
    })
  }, { dependencies: [prefersReducedMotion, target, prefix, suffix, decimals, duration] })

  // SSR and reduced motion: show final value immediately
  const displayValue = `${prefix}${target.toFixed(decimals)}${suffix}`

  return (
    <span ref={spanRef} className={className}>
      {displayValue}
    </span>
  )
}

export { CounterAnimation }
export type { CounterAnimationProps }
