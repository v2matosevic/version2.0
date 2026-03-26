'use client'

import { useRef, useEffect, useCallback } from 'react'

const DOT_SPACING = 32
const DOT_BASE_RADIUS = 1
const DOT_MAX_RADIUS = 2.5
const MOUSE_RADIUS = 180
const CONNECTION_DISTANCE = 80
const DOT_COLOR = { r: 240, g: 232, b: 224 }       // --color-foreground
const ACCENT_COLOR = { r: 153, g: 23, b: 23 }       // --color-brand-red
const DOT_BASE_OPACITY = 0.12
const DOT_ACTIVE_OPACITY = 0.7
const LINE_MAX_OPACITY = 0.2

type Dot = {
  baseX: number
  baseY: number
  x: number
  y: number
  shimmerPhase: number
  shimmerSpeed: number
}

function InteractiveGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const dotsRef = useRef<Dot[]>([])
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const smoothMouseRef = useRef({ x: -9999, y: -9999 })
  const rafRef = useRef<number>(0)
  const sizeRef = useRef({ w: 0, h: 0 })

  const buildGrid = useCallback(() => {
    const { w, h } = sizeRef.current
    const dots: Dot[] = []
    const offsetX = (w % DOT_SPACING) / 2
    const offsetY = (h % DOT_SPACING) / 2

    for (let x = offsetX; x < w; x += DOT_SPACING) {
      for (let y = offsetY; y < h; y += DOT_SPACING) {
        dots.push({
          baseX: x, baseY: y, x, y,
          shimmerPhase: Math.random() * Math.PI * 2,
          shimmerSpeed: 0.3 + Math.random() * 0.8,
        })
      }
    }
    dotsRef.current = dots
  }, [])

  const handleResize = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const dpr = Math.min(window.devicePixelRatio, 2)
    const rect = canvas.getBoundingClientRect()
    sizeRef.current = { w: rect.width, h: rect.height }
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr

    const ctx = canvas.getContext('2d')
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    buildGrid()
  }, [buildGrid])

  useEffect(() => {
    handleResize()

    const observer = new ResizeObserver(handleResize)
    if (canvasRef.current) observer.observe(canvasRef.current)

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    const handleMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 }
    }
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
      }
    }
    const handleTouchEnd = () => {
      mouseRef.current = { x: -9999, y: -9999 }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    window.addEventListener('touchend', handleTouchEnd)

    return () => {
      observer.disconnect()
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [handleResize])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let time = 0

    const animate = () => {
      const { w, h } = sizeRef.current
      ctx.clearRect(0, 0, w, h)
      time += 0.016 // ~60fps increment

      // Smooth mouse position
      const sm = smoothMouseRef.current
      const tm = mouseRef.current
      sm.x += (tm.x - sm.x) * 0.12
      sm.y += (tm.y - sm.y) * 0.12

      const rect = canvas.getBoundingClientRect()
      const mx = sm.x - rect.left
      const my = sm.y - rect.top

      const dots = dotsRef.current
      const activeDots: Dot[] = []
      const radiusSq = MOUSE_RADIUS * MOUSE_RADIUS

      // Draw dots and collect active ones
      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i]
        const dx = dot.baseX - mx
        const dy = dot.baseY - my
        const distSq = dx * dx + dy * dy
        const proximity = Math.max(0, 1 - distSq / radiusSq)

        // Subtle displacement away from cursor
        const dist = Math.sqrt(distSq)
        if (dist > 0 && dist < MOUSE_RADIUS) {
          const pushStrength = proximity * 3
          dot.x += (dot.baseX + (dx / dist) * pushStrength - dot.x) * 0.15
          dot.y += (dot.baseY + (dy / dist) * pushStrength - dot.y) * 0.15
        } else {
          dot.x += (dot.baseX - dot.x) * 0.1
          dot.y += (dot.baseY - dot.y) * 0.1
        }

        // Shimmer — random dots pulse brighter over time
        const shimmer = Math.sin(time * dot.shimmerSpeed + dot.shimmerPhase) * 0.5 + 0.5
        const shimmerBoost = shimmer * 0.08

        const radius = DOT_BASE_RADIUS + (DOT_MAX_RADIUS - DOT_BASE_RADIUS) * proximity + shimmer * 0.3
        const opacity = DOT_BASE_OPACITY + shimmerBoost + (DOT_ACTIVE_OPACITY - DOT_BASE_OPACITY) * proximity

        // Color: blend from foreground to accent red near cursor
        const accentBlend = proximity * 0.6 + shimmer * 0.08
        const r = Math.round(DOT_COLOR.r + (ACCENT_COLOR.r - DOT_COLOR.r) * accentBlend)
        const g = Math.round(DOT_COLOR.g + (ACCENT_COLOR.g - DOT_COLOR.g) * accentBlend)
        const b = Math.round(DOT_COLOR.b + (ACCENT_COLOR.b - DOT_COLOR.b) * accentBlend)

        ctx.beginPath()
        ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${r},${g},${b},${opacity})`
        ctx.fill()

        if (proximity > 0.05) activeDots.push(dot)
      }

      // Draw connections between nearby active dots
      if (activeDots.length > 1) {
        for (let i = 0; i < activeDots.length; i++) {
          for (let j = i + 1; j < activeDots.length; j++) {
            const a = activeDots[i]
            const b = activeDots[j]
            const cdx = a.x - b.x
            const cdy = a.y - b.y
            const cdist = Math.sqrt(cdx * cdx + cdy * cdy)

            if (cdist < CONNECTION_DISTANCE) {
              const lineOpacity = LINE_MAX_OPACITY * (1 - cdist / CONNECTION_DISTANCE)
              ctx.beginPath()
              ctx.moveTo(a.x, a.y)
              ctx.lineTo(b.x, b.y)
              ctx.strokeStyle = `rgba(${ACCENT_COLOR.r},${ACCENT_COLOR.g},${ACCENT_COLOR.b},${lineOpacity})`
              ctx.lineWidth = 0.5
              ctx.stroke()
            }
          }
        }
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: 'none' }}
      aria-hidden="true"
    />
  )
}

export { InteractiveGrid }
