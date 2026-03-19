'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useReducedMotion } from '@/lib/utils/use-reduced-motion'

gsap.registerPlugin(ScrollTrigger, useGSAP)

type StaggerRevealProps = {
  children: React.ReactNode
  stagger?: number
  duration?: number
  className?: string
}

function StaggerReveal({
  children,
  stagger = 0.1,
  duration = 0.8,
  className,
}: StaggerRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useGSAP(() => {
    if (prefersReducedMotion || !containerRef.current) return

    const items = containerRef.current.children

    gsap.from(items, {
      opacity: 0,
      y: 40,
      duration,
      stagger,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 85%',
        once: true,
      },
    })
  }, { dependencies: [prefersReducedMotion, stagger, duration] })

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  )
}

export { StaggerReveal }
export type { StaggerRevealProps }
