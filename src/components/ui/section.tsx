import type { HTMLAttributes } from 'react'

type SectionBackground = 'base' | 'raised' | 'sunken'

type SectionProps = HTMLAttributes<HTMLElement> & {
  background?: SectionBackground
  fullBleed?: boolean
}

const BG_CLASSES: Record<SectionBackground, string> = {
  base: 'bg-base',
  raised: 'bg-raised',
  sunken: 'bg-sunken',
}

function Section({ background = 'base', fullBleed = false, className = '', children, ...props }: SectionProps) {
  return (
    <section
      className={[
        'py-16 md:py-24 lg:py-32',
        BG_CLASSES[background],
        fullBleed ? 'w-full' : '',
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </section>
  )
}

export { Section }
export type { SectionProps, SectionBackground }
