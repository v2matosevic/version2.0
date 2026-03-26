import type { HTMLAttributes } from 'react'

type BadgeVariant = 'default' | 'brand'

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant
}

function Badge({ variant = 'default', className = '', children, ...props }: BadgeProps) {
  const variantClasses = variant === 'brand'
    ? 'bg-brand-red/10 border-brand-red/20 text-brand-red'
    : 'bg-raised border-line text-muted'

  return (
    <span
      className={`inline-block rounded-md px-2.5 py-1 text-sm border font-body ${variantClasses} ${className}`}
      style={{
        fontSize: 'var(--text-small)',
        fontWeight: 'var(--font-weight-body-semibold)',
        letterSpacing: '0.01em',
      } as React.CSSProperties}
      {...props}
    >
      {children}
    </span>
  )
}

export { Badge }
export type { BadgeProps, BadgeVariant }
