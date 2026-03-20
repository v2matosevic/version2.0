import { formatAdminDate } from '@/components/admin/format-date'
import { statusColor } from '@/components/admin/status-badge'

type OrderRow = {
  id: string
  customerName: string
  currentStatus: string
  createdAt: string
}

function OrdersTable({ orders }: { orders: OrderRow[] }) {
  return (
    <table className="w-full text-[var(--text-small)]">
      <thead>
        <tr className="border-b border-line-subtle text-left text-muted">
          <th className="px-5 py-3 font-[600]">Order ID</th>
          <th className="px-5 py-3 font-[600]">Customer</th>
          <th className="px-5 py-3 font-[600]">Status</th>
          <th className="px-5 py-3 font-[600] text-right">Date</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr
            key={order.id}
            className="border-b border-line-subtle last:border-0 hover:bg-sunken/50 transition-colors"
          >
            <td className="px-5 py-3 text-faint font-mono text-[var(--text-overline)]">
              {order.id.slice(0, 8)}...
            </td>
            <td className="px-5 py-3 text-foreground font-[500]">
              {order.customerName}
            </td>
            <td className="px-5 py-3">
              <span
                className={`inline-block px-2.5 py-0.5 rounded-full text-[var(--text-overline)] font-[600] capitalize ${statusColor(order.currentStatus)}`}
              >
                {order.currentStatus}
              </span>
            </td>
            <td className="px-5 py-3 text-muted text-right">
              {formatAdminDate(order.createdAt)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export { OrdersTable as DashboardOrdersTable }
export type { OrderRow }
