'use client'

import { useRef, useCallback, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { HeroParticles } from './hero-particles'
import { HeroGeometry } from './hero-geometry'

type GpuTier = 'high' | 'medium' | 'low'

type HeroSceneProps = {
  gpuTier: GpuTier
  onReady?: () => void
}

const PARTICLE_COUNTS: Record<GpuTier, number> = {
  high: 800,
  medium: 480,
  low: 300,
}

function HeroScene({ gpuTier, onReady }: HeroSceneProps) {
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const [isReady, setIsReady] = useState(false)

  const handleCreated = useCallback(() => {
    setIsReady(true)
    onReady?.()
  }, [onReady])

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseRef.current = {
      x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
      y: -((e.clientY - rect.top) / rect.height) * 2 + 1,
    }
  }, [])

  const showGeometry = gpuTier === 'high'
  const useAntialias = gpuTier === 'high'
  const dpr = gpuTier === 'high' ? [1, 2] as [number, number] : [1, 1] as [number, number]

  return (
    <div
      onPointerMove={handlePointerMove}
      style={{
        position: 'absolute',
        inset: 0,
        opacity: isReady ? 1 : 0,
        transition: 'opacity 1s ease-out',
      }}
    >
      <Canvas
        gl={{ antialias: useAntialias, alpha: true }}
        dpr={dpr}
        camera={{ position: [0, 0, 5], fov: 60 }}
        onCreated={handleCreated}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={0.5} />
        <directionalLight position={[-5, -3, -5]} intensity={0.2} />
        <pointLight position={[0, 0, 3]} intensity={0.4} color="#991717" />

        <HeroParticles
          count={PARTICLE_COUNTS[gpuTier]}
          mouseRef={mouseRef}
        />

        {showGeometry && <HeroGeometry mouseRef={mouseRef} />}
      </Canvas>
    </div>
  )
}

export { HeroScene }
export type { HeroSceneProps, GpuTier }
