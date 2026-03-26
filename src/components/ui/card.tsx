import type { HTMLAttributes } from 'react'

type CardProps = HTMLAttributes<HTMLDivElement> & {
  hover?: boolean
}

function Card({ hover = false, className = '', children, style, ...props }: CardProps) {
  return (
    <div
      className={[
        'rounded-xl border border-line-subtle p-6 md:p-8',
        hover ? 'transition-all hover:-translate-y-1' : '',
        className,
      ].join(' ')}
      style={{
        background: 'var(--color-raised)',
        transitionDuration: 'var(--duration-normal)',
        transitionTimingFunction: 'var(--ease-out)',
        ...style,
      } as React.CSSProperties}
      {...props}
    >
      {children}
    </div>
  )
}

export { Card }
export type { CardProps }
