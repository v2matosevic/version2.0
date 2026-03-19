'use client'

import { useState, useEffect, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { useReducedMotion } from '@/lib/utils/use-reduced-motion'
import type { GpuTier } from '@/components/scenes/hero-scene'

const HeroScene = dynamic(
  () => import('@/components/scenes/hero-scene').then((mod) => ({ default: mod.HeroScene })),
  { ssr: false },
)

type Hero3DProps = {
  children: React.ReactNode
}

function Hero3D({ children }: Hero3DProps) {
  const prefersReducedMotion = useReducedMotion()
  const [gpuTier, setGpuTier] = useState<GpuTier | null>(null)
  const [sceneReady, setSceneReady] = useState(false)

  useEffect(() => {
    if (prefersReducedMotion) return

    async function detectGpu() {
      try {
        const { getGPUTier } = await import('detect-gpu')
        const result = await getGPUTier()
        const tier = result.tier >= 3 ? 'high'
          : result.tier >= 2 ? 'medium'
          : 'low'
        setGpuTier(tier as GpuTier)
      } catch {
        setGpuTier('low')
      }
    }

    detectGpu()
  }, [prefersReducedMotion])

  const handleSceneReady = useCallback(() => {
    setSceneReady(true)
  }, [])

  return (
    <section className="relative min-h-screen" style={{ overflow: 'hidden' }}>
      {/* Atmospheric gradient fallback — always visible */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 30% 40%, #1c1c1c 0%, #0c0c0c 70%)',
        }}
        aria-hidden="true"
      />

      {/* Brand glow accent */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 70% 60%, rgba(153, 23, 23, 0.08) 0%, transparent 60%)',
        }}
        aria-hidden="true"
      />

      {/* 3D scene — fades in when ready */}
      {!prefersReducedMotion && gpuTier && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            opacity: sceneReady ? 1 : 0,
            transition: 'opacity 1s ease-out',
          }}
        >
          <HeroScene gpuTier={gpuTier} onReady={handleSceneReady} />
        </div>
      )}

      {/* Text overlay */}
      <div className="relative" style={{ zIndex: 10 }}>
        {children}
      </div>
    </section>
  )
}

export { Hero3D }
export type { Hero3DProps }
