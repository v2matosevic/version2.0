type SectionConnectorProps = {
  variant?: 'line' | 'fade' | 'space'
}

function SectionConnector({ variant = 'line' }: SectionConnectorProps) {
  if (variant === 'space') {
    return <div style={{ height: '80px', background: 'var(--color-base)' }} aria-hidden="true" />
  }

  if (variant === 'fade') {
    return (
      <div
        style={{
          height: '120px',
          background: 'linear-gradient(180deg, var(--color-base) 0%, var(--color-sunken) 100%)',
        }}
        aria-hidden="true"
      />
    )
  }

  // Default: red line connector
  return (
    <div
      className="flex items-center justify-center"
      style={{
        height: '100px',
        background: 'var(--color-base)',
      }}
      aria-hidden="true"
    >
      <div
        style={{
          width: '1px',
          height: '48px',
          background: 'linear-gradient(180deg, transparent, var(--color-brand-red), transparent)',
        }}
      />
    </div>
  )
}

export { SectionConnector }
export type { SectionConnectorProps }
