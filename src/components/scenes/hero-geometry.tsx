'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

type HeroGeometryProps = {
  mouseRef: React.RefObject<{ x: number; y: number } | null>
}

type WireframeShape = {
  position: [number, number, number]
  rotation: [number, number, number]
  scale: number
  type: 'icosahedron' | 'octahedron' | 'dodecahedron'
  speed: number
}

const SHAPES: WireframeShape[] = [
  { position: [3, 1.5, -2], rotation: [0.3, 0.5, 0], scale: 1.2, type: 'icosahedron', speed: 0.15 },
  { position: [-2.5, -1, -1], rotation: [0.7, 0.2, 0.4], scale: 0.9, type: 'octahedron', speed: 0.2 },
  { position: [1, -2, -3], rotation: [0.1, 0.8, 0.2], scale: 0.7, type: 'dodecahedron', speed: 0.12 },
]

function WireframeMesh({ shape, mouseRef }: { shape: WireframeShape; mouseRef: HeroGeometryProps['mouseRef'] }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((_, delta) => {
    if (!meshRef.current) return

    meshRef.current.rotation.x += delta * shape.speed
    meshRef.current.rotation.y += delta * shape.speed * 0.7

    const mouse = mouseRef.current
    if (mouse) {
      meshRef.current.position.x = THREE.MathUtils.lerp(
        meshRef.current.position.x,
        shape.position[0] + mouse.x * 0.3,
        0.02,
      )
      meshRef.current.position.y = THREE.MathUtils.lerp(
        meshRef.current.position.y,
        shape.position[1] + mouse.y * 0.2,
        0.02,
      )
    }
  })

  const geometryNode = shape.type === 'icosahedron'
    ? <icosahedronGeometry args={[shape.scale, 1]} />
    : shape.type === 'octahedron'
      ? <octahedronGeometry args={[shape.scale, 0]} />
      : <dodecahedronGeometry args={[shape.scale, 0]} />

  return (
    <mesh
      ref={meshRef}
      position={shape.position}
      rotation={shape.rotation}
    >
      {geometryNode}
      <meshBasicMaterial
        wireframe
        color="#991717"
        transparent
        opacity={0.15}
      />
    </mesh>
  )
}

function HeroGeometry({ mouseRef }: HeroGeometryProps) {
  return (
    <group>
      {SHAPES.map((shape, i) => (
        <WireframeMesh key={i} shape={shape} mouseRef={mouseRef} />
      ))}
    </group>
  )
}

export { HeroGeometry }
export type { HeroGeometryProps }
