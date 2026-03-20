const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
  confirmed: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  shipped: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  delivered: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  cancelled: 'bg-red-500/15 text-red-400 border-red-500/30',
  draft: 'bg-faint/20 text-muted border-line',
  published: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  success: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  failed: 'bg-red-500/15 text-red-400 border-red-500/30',
  running: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
}

function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-[500] border capitalize ${
        STATUS_COLORS[status] ?? 'bg-raised text-muted border-line'
      }`}
    >
      {status}
    </span>
  )
}

function statusColor(status: string): string {
  return STATUS_COLORS[status] ?? 'bg-faint/20 text-muted border-line'
}

export { StatusBadge, statusColor, STATUS_COLORS }
