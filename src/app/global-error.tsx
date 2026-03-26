'use client'

type GlobalErrorProps = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError({ reset }: GlobalErrorProps) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#1a1a1a',
          color: '#e5e5e5',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        <div style={{ position: 'relative', textAlign: 'center', padding: '4rem 1.5rem' }}>
          <span
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: 'clamp(8rem, 20vw, 20rem)',
              fontWeight: 700,
              lineHeight: 1,
              color: '#991717',
              opacity: 0.08,
              userSelect: 'none',
              pointerEvents: 'none',
            }}
            aria-hidden="true"
          >
            500
          </span>
          <div style={{ position: 'relative' }}>
            <h1
              style={{
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                fontWeight: 300,
                lineHeight: 1.1,
                margin: 0,
              }}
            >
              Something went wrong.
            </h1>
            <p
              style={{
                marginTop: '1rem',
                fontSize: '1.125rem',
                lineHeight: 1.6,
                color: '#999',
                maxWidth: '28rem',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              An unexpected error occurred. Please try again.
            </p>
            <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button
                onClick={reset}
                style={{
                  padding: '0.75rem 2rem',
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: '#fff',
                  backgroundColor: '#991717',
                  border: 'none',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                }}
              >
                Try Again
              </button>
              {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- global-error has no Next.js router context */}
              <a
                href="/"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '0.75rem 2rem',
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: '#e5e5e5',
                  backgroundColor: 'transparent',
                  border: '1px solid #333',
                  borderRadius: '0.5rem',
                  textDecoration: 'none',
                  cursor: 'pointer',
                }}
              >
                Go Home
              </a>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
