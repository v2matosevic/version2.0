'use client'

import Link from 'next/link'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'

type ErrorPageProps = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ErrorPage({ reset }: ErrorPageProps) {
  return (
    <main id="main-content" className="flex-1 flex items-center justify-center bg-base">
      <Container>
        <div className="relative py-24 md:py-32 lg:py-40">
          <span
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none font-heading"
            style={{
              fontSize: 'clamp(8rem, 20vw, 20rem)',
              fontWeight: 'var(--font-weight-headline-bold)',
              lineHeight: 1,
              color: 'var(--color-brand-red)',
              opacity: 0.08,
            } as React.CSSProperties}
            aria-hidden="true"
          >
            500
          </span>
          <div className="relative text-center">
            <h1
              className="font-heading text-foreground"
              style={{
                fontSize: 'var(--text-h1)',
                fontWeight: 'var(--font-weight-headline)',
                lineHeight: 'var(--leading-display)',
              } as React.CSSProperties}
            >
              Something went wrong.
            </h1>
            <p
              className="mt-4 text-muted max-w-md mx-auto"
              style={{
                fontSize: 'var(--text-body-lg)',
                lineHeight: 'var(--leading-body)',
              } as React.CSSProperties}
            >
              An unexpected error occurred. Please try again.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <Button variant="primary" size="lg" onClick={reset}>
                Try Again
              </Button>
              <Link href="/">
                <Button variant="secondary" size="lg">
                  Go Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </main>
  )
}
