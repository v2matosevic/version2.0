'use client'

import { Component } from 'react'
import type { ReactNode, ErrorInfo } from 'react'

type WebGLErrorBoundaryProps = {
  children: ReactNode
}

type WebGLErrorBoundaryState = {
  hasError: boolean
}

/**
 * Catches R3F/Three.js runtime crashes (WebGL context loss, shader errors, etc.)
 * and silently unmounts the 3D scene. The cinematic gradient fallback behind it
 * remains visible — the user sees a degraded but still atmospheric hero.
 */
class WebGLErrorBoundary extends Component<WebGLErrorBoundaryProps, WebGLErrorBoundaryState> {
  constructor(props: WebGLErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): WebGLErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log but don't crash — the gradient fallback handles this gracefully
    console.warn('[WebGL] 3D scene crashed, showing fallback:', error.message, errorInfo.componentStack)
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // Return nothing — the gradient background behind this component is the fallback
      return null
    }
    return this.props.children
  }
}

export { WebGLErrorBoundary }
