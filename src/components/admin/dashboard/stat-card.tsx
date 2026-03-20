import type { LucideIcon } from 'lucide-react'

type StatCardProps = {
  label: string
  value: number
  icon: LucideIcon
  accent?: boolean
}

function StatCard({ label, value, icon: Icon, accent = false }: StatCardProps) {
  return (
    <div className="bg-raised border border-line rounded-lg p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[var(--text-small)] text-muted font-body">
          {label}
        </span>
        <Icon size={18} className={accent ? 'text-brand-red' : 'text-faint'} />
      </div>
      <p
        className={`font-heading text-[var(--text-h3)] font-[700] tracking-[var(--tracking-heading)] ${
          accent ? 'text-brand-red-light' : 'text-foreground'
        }`}
      >
        {value.toLocaleString()}
      </p>
    </div>
  )
}

export { StatCard }
export type { StatCardProps }
