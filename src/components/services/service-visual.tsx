import { Monitor, LayoutDashboard, ShoppingCart, BrainCircuit, Search } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type ServiceSlug = 'web-design' | 'web-applications' | 'e-commerce' | 'ai-integration' | 'seo'

type ServiceVisualProps = {
  service: ServiceSlug
  number: string
}

const SERVICE_ICONS: Record<ServiceSlug, LucideIcon> = {
  'web-design': Monitor,
  'web-applications': LayoutDashboard,
  'e-commerce': ShoppingCart,
  'ai-integration': BrainCircuit,
  'seo': Search,
}

function ServiceVisual({ service, number }: ServiceVisualProps): React.JSX.Element {
  const Icon = SERVICE_ICONS[service]

  return (
    <div className="relative overflow-hidden rounded-xl border border-line-subtle aspect-[4/3] flex items-center justify-center"
      style={{
        background: 'radial-gradient(ellipse at 50% 50%, #1c1c1c 0%, #0c0c0c 100%)',
      }}
    >
      {/* Red accent glow behind icon */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(153, 23, 23, 0.25) 0%, rgba(153, 23, 23, 0.08) 35%, transparent 65%)',
        }}
      />

      {/* Subtle noise texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />

      {/* Service number — top-right corner */}
      <span
        className="absolute top-4 right-5 font-heading text-foreground/[0.06] select-none"
        style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: 300, lineHeight: 1 }}
      >
        {number}
      </span>

      {/* Icon */}
      <Icon
        className="relative z-10 text-foreground/80"
        size={88}
        strokeWidth={1}
      />

      {/* Bottom edge highlight */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(153, 23, 23, 0.4), transparent)',
        }}
      />
    </div>
  )
}

export { ServiceVisual }
export type { ServiceVisualProps, ServiceSlug }
