import { forwardRef, type InputHTMLAttributes } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  error?: string
  hint?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input({ label, error, hint, id, className = '', ...props }, ref) {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="flex flex-col">
        {label && (
          <label
            htmlFor={inputId}
            className="mb-2 text-foreground font-body"
            style={{
              fontSize: 'var(--text-small)',
              fontWeight: 'var(--font-weight-body-semibold)',
            } as React.CSSProperties}
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={[
            'rounded-lg border px-4 py-3 font-body text-foreground transition-all',
            'placeholder:text-faint',
            'focus:border-brand-red focus:ring-1 focus:ring-brand-red/20 focus:outline-none',
            error ? 'border-red-500' : 'border-line',
            className,
          ].join(' ')}
          style={{
            background: 'var(--color-sunken)',
            fontSize: 'var(--text-body)',
            transitionDuration: 'var(--duration-fast)',
            transitionTimingFunction: 'var(--ease-smooth)',
          } as React.CSSProperties}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="mt-1.5 text-sm text-red-500 font-body" role="alert">
            {error}
          </p>
        )}
        {!error && hint && (
          <p id={`${inputId}-hint`} className="mt-1.5 text-sm text-muted font-body">
            {hint}
          </p>
        )}
      </div>
    )
  },
)

export { Input }
export type { InputProps }
