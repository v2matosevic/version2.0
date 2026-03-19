'use client'

import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

type HeroParticlesProps = {
  count: number
  mouseRef: React.RefObject<{ x: number; y: number } | null>
}

function generatePositions(count: number): Float32Array {
  const pos = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 10
    pos[i * 3 + 1] = (Math.random() - 0.5) * 10
    pos[i * 3 + 2] = (Math.random() - 0.5) * 10
  }
  return pos
}

function generateSizes(count: number): Float32Array {
  const s = new Float32Array(count)
  for (let i = 0; i < count; i++) {
    s[i] = Math.random() * 2 + 0.5
  }
  return s
}

function HeroParticles({ count, mouseRef }: HeroParticlesProps) {
  const meshRef = useRef<THREE.Points>(null)
  // Using useState with lazy initializer to avoid lint issues with refs in render
  // and useMemo purity concerns with Math.random()
  const [positions] = useState(() => generatePositions(count))
  const [sizes] = useState(() => generateSizes(count))

  useFrame((_, delta) => {
    if (!meshRef.current) return

    meshRef.current.rotation.y += delta * 0.02
    meshRef.current.rotation.x += delta * 0.01

    const mouse = mouseRef.current
    if (mouse) {
      const targetRotY = meshRef.current.rotation.y + mouse.x * 0.01
      const targetRotX = meshRef.current.rotation.x + mouse.y * 0.005
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotY, 0.1)
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotX, 0.1)
    }
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#F0E8E0"
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

export { HeroParticles }
export type { HeroParticlesProps }
