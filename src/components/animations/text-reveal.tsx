'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useReducedMotion } from '@/lib/utils/use-reduced-motion'

gsap.registerPlugin(ScrollTrigger, useGSAP)

type TextRevealMode = 'chars' | 'words'
type TextRevealTrigger = 'mount' | 'scroll'

type TextRevealProps = {
  text: string
  mode?: TextRevealMode
  trigger?: TextRevealTrigger
  stagger?: number
  duration?: number
  className?: string
  style?: React.CSSProperties
}

function TextReveal({
  text,
  mode = 'chars',
  trigger = 'mount',
  stagger,
  duration = 0.6,
  className,
  style,
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const defaultStagger = mode === 'chars' ? 0.03 : 0.08

  useGSAP(() => {
    if (prefersReducedMotion || !containerRef.current) return

    const spans = containerRef.current.querySelectorAll('[data-split]')
    if (spans.length === 0) return

    // Set initial hidden state via GSAP (not inline styles) — progressive enhancement
    gsap.set(spans, { opacity: 0, y: 20 })

    const animConfig: gsap.TweenVars = {
      opacity: 1,
      y: 0,
      duration,
      stagger: stagger ?? defaultStagger,
      ease: 'power2.out',
    }

    if (trigger === 'scroll') {
      animConfig.scrollTrigger = {
        trigger: containerRef.current,
        start: 'top 85%',
        once: true,
      }
    }

    gsap.to(spans, animConfig)
  }, { dependencies: [prefersReducedMotion, text, mode, trigger, stagger, duration] })

  // Split text into spans — visible by default, GSAP animates as progressive enhancement
  const parts = mode === 'chars'
    ? text.split('').map((char, i) => (
        <span
          key={i}
          data-split=""
          style={{
            display: 'inline-block',
            whiteSpace: char === ' ' ? 'pre' : undefined,
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))
    : text.split(' ').map((word, i, arr) => (
        <span
          key={i}
          data-split=""
          style={{ display: 'inline-block' }}
        >
          {word}{i < arr.length - 1 ? '\u00A0' : ''}
        </span>
      ))

  return (
    <div ref={containerRef} className={className} style={style} role="presentation">
      {parts}
    </div>
  )
}

export { TextReveal }
export type { TextRevealProps, TextRevealMode, TextRevealTrigger }
