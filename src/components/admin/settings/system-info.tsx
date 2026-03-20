import { Server, AlertCircle, Database, Clock } from 'lucide-react'

type SystemInfo = {
  nodeVersion: string
  nextVersion: string
  dbPath: string
  uptime: number
}

function formatUptime(seconds: number): string {
  const days = Math.floor(seconds / 86400)
  const hours = Math.floor((seconds % 86400) / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const parts: string[] = []
  if (days > 0) parts.push(`${days}d`)
  if (hours > 0) parts.push(`${hours}h`)
  parts.push(`${minutes}m`)
  return parts.join(' ')
}

function InfoRow({ icon: Icon, label, value, mono = false }: { icon: typeof Server; label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-start gap-3">
      <Icon size={16} className="text-muted mt-0.5 shrink-0" />
      <div>
        <p className="text-[var(--text-small)] text-muted">{label}</p>
        <p className={`text-foreground text-[var(--text-body)] ${mono ? 'font-mono text-[var(--text-small)] break-all' : ''}`}>{value}</p>
      </div>
    </div>
  )
}

function SystemInfoCard({ system }: { system: SystemInfo }) {
  return (
    <section className="bg-raised border border-line rounded-lg p-6">
      <h2 className="font-heading text-[var(--text-h4)] font-[700] text-foreground mb-5 flex items-center gap-2">
        <Server size={16} className="text-brand-red" />
        System Information
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoRow icon={Server} label="Node.js" value={system.nodeVersion} />
        <InfoRow icon={AlertCircle} label="Next.js" value={`v${system.nextVersion}`} />
        <InfoRow icon={Database} label="Database" value={system.dbPath} mono />
        <InfoRow icon={Clock} label="Uptime" value={formatUptime(system.uptime)} />
      </div>
    </section>
  )
}

export { SystemInfoCard }
export type { SystemInfo }
