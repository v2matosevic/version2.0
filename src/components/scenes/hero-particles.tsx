'use client'

import { useRef, useState, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

type HeroParticlesProps = {
  count: number
  mouseRef: React.RefObject<{ x: number; y: number } | null>
}

const VERTEX_SHADER = `
  attribute float aSize;
  attribute float aOpacity;
  varying float vOpacity;
  varying float vDepth;

  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vDepth = -mvPosition.z;
    vOpacity = aOpacity;
    gl_PointSize = aSize * (200.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`

const FRAGMENT_SHADER = `
  varying float vOpacity;
  varying float vDepth;
  uniform vec3 uColor;
  uniform vec3 uAccent;
  uniform float uTime;

  void main() {
    // Circular soft particle with glow falloff
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;

    // Soft radial gradient — bright core, smooth falloff
    float core = 1.0 - smoothstep(0.0, 0.15, dist);
    float glow = 1.0 - smoothstep(0.05, 0.5, dist);
    float alpha = (core * 0.8 + glow * 0.4) * vOpacity;

    // Depth-based fade — further particles are dimmer
    float depthFade = smoothstep(12.0, 2.0, vDepth);
    alpha *= depthFade;

    // Mix base color with accent based on depth
    float accentMix = smoothstep(4.0, 8.0, vDepth) * 0.3;
    vec3 color = mix(uColor, uAccent, accentMix);

    // Subtle brightness pulsing on the core
    color += core * 0.15;

    gl_FragColor = vec4(color, alpha);
  }
`

function generateParticleData(count: number): {
  positions: Float32Array
  sizes: Float32Array
  opacities: Float32Array
  velocities: Float32Array
} {
  const positions = new Float32Array(count * 3)
  const sizes = new Float32Array(count)
  const opacities = new Float32Array(count)
  const velocities = new Float32Array(count * 3)

  for (let i = 0; i < count; i++) {
    // Distribute in a sphere-like volume, denser toward center
    const radius = Math.pow(Math.random(), 0.6) * 6
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)

    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
    positions[i * 3 + 2] = radius * Math.cos(phi) - 1

    // Varied sizes — mostly small with a few larger accent particles
    sizes[i] = Math.random() < 0.05
      ? Math.random() * 6 + 4    // 5% large accent particles
      : Math.random() * 2.5 + 0.5 // 95% small ambient particles

    // Varied opacity
    opacities[i] = Math.random() * 0.5 + 0.2

    // Slow drift velocities
    velocities[i * 3] = (Math.random() - 0.5) * 0.08
    velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.06
    velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.04
  }

  return { positions, sizes, opacities, velocities }
}

function HeroParticles({ count, mouseRef }: HeroParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null)
  const [data] = useState(() => generateParticleData(count))
  const smoothMouse = useRef({ x: 0, y: 0 })

  const uniforms = useMemo(() => ({
    uColor: { value: new THREE.Color('#F0E8E0') },
    uAccent: { value: new THREE.Color('#991717') },
    uTime: { value: 0 },
  }), [])

  useFrame((_, delta) => {
    if (!pointsRef.current) return

    const geometry = pointsRef.current.geometry
    const posAttr = geometry.attributes.position as THREE.BufferAttribute
    const positions = posAttr.array as Float32Array

    // Smooth mouse tracking
    const mouse = mouseRef.current
    if (mouse) {
      smoothMouse.current.x = THREE.MathUtils.lerp(smoothMouse.current.x, mouse.x, 0.05)
      smoothMouse.current.y = THREE.MathUtils.lerp(smoothMouse.current.y, mouse.y, 0.05)
    }

    const mx = smoothMouse.current.x
    const my = smoothMouse.current.y

    // Animate each particle
    for (let i = 0; i < count; i++) {
      const ix = i * 3
      const iy = i * 3 + 1
      const iz = i * 3 + 2

      // Gentle drift
      positions[ix] += data.velocities[ix] * delta
      positions[iy] += data.velocities[iy] * delta
      positions[iz] += data.velocities[iz] * delta

      // Mouse influence — particles shift away from cursor in screen space
      const dx = positions[ix] - mx * 3
      const dy = positions[iy] - my * 3
      const distSq = dx * dx + dy * dy
      const influence = 1.0 / (1.0 + distSq * 0.8)
      positions[ix] += dx * influence * delta * 1.5
      positions[iy] += dy * influence * delta * 1.5

      // Soft boundary — wrap particles that drift too far
      if (Math.abs(positions[ix]) > 7) positions[ix] *= -0.9
      if (Math.abs(positions[iy]) > 7) positions[iy] *= -0.9
      if (Math.abs(positions[iz]) > 7) positions[iz] *= -0.9
    }

    posAttr.needsUpdate = true

    // Slow global rotation for organic movement
    pointsRef.current.rotation.y += delta * 0.015
    pointsRef.current.rotation.x += delta * 0.008

    // Update time uniform
    uniforms.uTime.value += delta
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[data.positions, 3]} />
        <bufferAttribute attach="attributes-aSize" args={[data.sizes, 1]} />
        <bufferAttribute attach="attributes-aOpacity" args={[data.opacities, 1]} />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={VERTEX_SHADER}
        fragmentShader={FRAGMENT_SHADER}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

export { HeroParticles }
export type { HeroParticlesProps }
