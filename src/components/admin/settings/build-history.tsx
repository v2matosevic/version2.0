import { CheckCircle2, XCircle, Loader2, Clock } from 'lucide-react'

type BuildEntry = {
  id: string
  status: string
  triggeredBy: string | null
  durationMs: number | null
  createdAt: string
}

const STATUS_BADGE: Record<string, string> = {
  success: 'bg-emerald-500/15 text-emerald-400',
  failed: 'bg-red-500/15 text-red-400',
  running: 'bg-amber-500/15 text-amber-400',
}

const STATUS_ICON: Record<string, typeof CheckCircle2> = {
  success: CheckCircle2,
  failed: XCircle,
  running: Loader2,
}

function formatDuration(ms: number | null): string {
  if (ms === null) return '--'
  if (ms < 1000) return `${ms}ms`
  return `${(ms / 1000).toFixed(1)}s`
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
  })
}

function BuildHistory({ builds }: { builds: BuildEntry[] }) {
  return (
    <section>
      <h2 className="font-heading text-[var(--text-h4)] font-[700] text-foreground mb-4 flex items-center gap-2">
        <Clock size={16} className="text-muted" />
        Build History
      </h2>

      {builds.length === 0 ? (
        <p className="text-muted text-[var(--text-small)] py-8 text-center bg-raised border border-line rounded-lg">No builds yet.</p>
      ) : (
        <div className="border border-line rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-sunken border-b border-line">
                <th className="text-left px-4 py-3 text-[var(--text-small)] font-[600] text-muted w-28">Status</th>
                <th className="text-left px-4 py-3 text-[var(--text-small)] font-[600] text-muted">Triggered By</th>
                <th className="text-left px-4 py-3 text-[var(--text-small)] font-[600] text-muted w-24">Duration</th>
                <th className="text-left px-4 py-3 text-[var(--text-small)] font-[600] text-muted w-44">Created</th>
              </tr>
            </thead>
            <tbody>
              {builds.map((build) => {
                const Icon = STATUS_ICON[build.status]
                return (
                  <tr key={build.id} className="bg-raised border-b border-line last:border-b-0 hover:bg-raised/80 transition-colors">
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[var(--text-small)] font-[500] ${STATUS_BADGE[build.status] || 'bg-white/5 text-muted'}`}>
                        {Icon && <Icon size={13} className={build.status === 'running' ? 'animate-spin' : ''} />}
                        {build.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-foreground text-[var(--text-small)]">{build.triggeredBy || '--'}</td>
                    <td className="px-4 py-3 text-muted text-[var(--text-small)] tabular-nums">{formatDuration(build.durationMs)}</td>
                    <td className="px-4 py-3 text-muted text-[var(--text-small)]">{formatDate(build.createdAt)}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export { BuildHistory }
export type { BuildEntry }
