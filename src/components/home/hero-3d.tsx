'use client'

import { useState, useEffect, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { useReducedMotion } from '@/lib/utils/use-reduced-motion'
import { WebGLErrorBoundary } from '@/components/scenes/webgl-error-boundary'
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
      {/* Cinematic gradient base — warm charcoal with depth */}
      <div
        className="absolute inset-0"
        style={{
          background: [
            'radial-gradient(ellipse at 20% 50%, #1a1816 0%, transparent 60%)',
            'radial-gradient(ellipse at 80% 20%, #1c1918 0%, transparent 50%)',
            'radial-gradient(ellipse at 50% 80%, #0e0c0b 0%, transparent 60%)',
            '#121010',
          ].join(', '),
        }}
        aria-hidden="true"
      />

      {/* Brand red atmospheric glow — subtle, shifted off-center */}
      <div
        className="absolute inset-0"
        style={{
          background: [
            'radial-gradient(ellipse at 65% 55%, rgba(153, 23, 23, 0.07) 0%, transparent 50%)',
            'radial-gradient(ellipse at 30% 70%, rgba(153, 23, 23, 0.04) 0%, transparent 40%)',
          ].join(', '),
        }}
        aria-hidden="true"
      />

      {/* Top edge vignette — softens transition from header */}
      <div
        className="absolute inset-x-0 top-0 h-32"
        style={{
          background: 'linear-gradient(180deg, rgba(18,16,16,0.6) 0%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      {/* Bottom edge fade — transitions into next section */}
      <div
        className="absolute inset-x-0 bottom-0 h-24"
        style={{
          background: 'linear-gradient(0deg, var(--color-base) 0%, transparent 100%)',
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
            transition: 'opacity 1.2s ease-out',
          }}
        >
          <WebGLErrorBoundary>
            <HeroScene gpuTier={gpuTier} onReady={handleSceneReady} />
          </WebGLErrorBoundary>
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
