import type { LucideIcon } from 'lucide-react'

type StatCardProps = {
  icon: LucideIcon
  label: string
  value: string
}

function StatCard({ icon: Icon, label, value }: StatCardProps) {
  return (
    <div className="bg-raised border border-line rounded-lg p-5">
      <div className="flex items-center gap-2 text-muted mb-2">
        <Icon size={16} />
        <span className="text-[var(--text-small)]">{label}</span>
      </div>
      <p className="font-heading text-[var(--text-h3)] font-[300] text-foreground tracking-tight">
        {value}
      </p>
    </div>
  )
}

export { StatCard }
export type { StatCardProps }
