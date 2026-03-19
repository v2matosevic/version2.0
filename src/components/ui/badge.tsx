import type { HTMLAttributes } from 'react'

type BadgeProps = HTMLAttributes<HTMLSpanElement>

function Badge({ className = '', children, ...props }: BadgeProps) {
  return (
    <span
      className={`inline-block rounded-md px-2 py-0.5 text-sm bg-raised border border-line text-muted font-body ${className}`}
      style={{ fontWeight: 'var(--font-weight-body-semibold)' } as React.CSSProperties}
      {...props}
    >
      {children}
    </span>
  )
}

export { Badge }
export type { BadgeProps }
