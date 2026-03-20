import { formatAdminDateTime } from '@/components/admin/format-date'

const CARRIER_LABELS: Record<string, string> = {
  'hrvatska-posta': 'Hrvatska Posta',
  gls: 'GLS',
  dpd: 'DPD',
}

type OrderForCards = {
  customerName: string
  customerEmail: string
  language: string
  createdAt: string
  updatedAt: string
  carrier: string | null
  trackingNumber: string | null
  notes: string | null
}

function OrderInfoCards({ order }: { order: OrderForCards }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="bg-raised border border-line rounded-xl p-6">
        <h2 className="font-heading text-sm font-[700] text-foreground uppercase tracking-wider mb-4">Customer</h2>
        <dl className="space-y-3">
          <div><dt className="text-xs text-faint">Name</dt><dd className="text-foreground text-sm mt-0.5">{order.customerName}</dd></div>
          <div><dt className="text-xs text-faint">Email</dt><dd className="text-muted text-sm mt-0.5">{order.customerEmail}</dd></div>
          <div><dt className="text-xs text-faint">Language</dt><dd className="text-muted text-sm mt-0.5 uppercase">{order.language}</dd></div>
        </dl>
      </div>

      <div className="bg-raised border border-line rounded-xl p-6">
        <h2 className="font-heading text-sm font-[700] text-foreground uppercase tracking-wider mb-4">Timeline</h2>
        <dl className="space-y-3">
          <div><dt className="text-xs text-faint">Created</dt><dd className="text-muted text-sm mt-0.5">{formatAdminDateTime(order.createdAt)}</dd></div>
          <div><dt className="text-xs text-faint">Last Updated</dt><dd className="text-muted text-sm mt-0.5">{formatAdminDateTime(order.updatedAt)}</dd></div>
          <div><dt className="text-xs text-faint">Current Carrier</dt><dd className="text-muted text-sm mt-0.5">{order.carrier ? (CARRIER_LABELS[order.carrier] ?? order.carrier) : 'Not assigned'}</dd></div>
        </dl>
      </div>

      <div className="bg-raised border border-line rounded-xl p-6">
        <h2 className="font-heading text-sm font-[700] text-foreground uppercase tracking-wider mb-4">Tracking</h2>
        <dl className="space-y-3">
          <div><dt className="text-xs text-faint">Tracking Number</dt><dd className="text-foreground text-sm mt-0.5 font-mono">{order.trackingNumber ?? 'Not assigned'}</dd></div>
          <div><dt className="text-xs text-faint">Notes</dt><dd className="text-muted text-sm mt-0.5 whitespace-pre-wrap">{order.notes ?? 'None'}</dd></div>
        </dl>
      </div>
    </div>
  )
}

export { OrderInfoCards }
export type { OrderForCards }
