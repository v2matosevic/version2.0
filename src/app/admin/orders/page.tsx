'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Package, Plus, ExternalLink, Loader2 } from 'lucide-react'
import { StatusBadge } from '@/components/admin/status-badge'
import { formatAdminDate } from '@/components/admin/format-date'
import { CreateOrderModal } from '@/components/admin/orders/create-order-modal'

type Order = {
  id: string
  customerName: string
  customerEmail: string
  trackingNumber: string | null
  carrier: string | null
  currentStatus: string
  language: string
  notes: string | null
  createdAt: string
  updatedAt: string
}

const CARRIER_LABELS: Record<string, string> = {
  'hrvatska-posta': 'Hrvatska Posta',
  gls: 'GLS',
  dpd: 'DPD',
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [error, setError] = useState('')

  async function fetchOrders(): Promise<void> {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/orders')
      if (!res.ok) {
        if (res.status === 401) { window.location.href = '/admin/login?from=/admin/orders'; return }
        throw new Error('Failed to fetch orders')
      }
      const data = await res.json()
      setOrders(data.orders ?? [])
    } catch {
      setError('Failed to load orders')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchOrders() }, [])

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-[var(--text-h3)] font-[300] tracking-[var(--tracking-h3)] text-foreground">Orders</h1>
          <p className="text-muted text-[var(--text-small)] mt-1">{orders.length} order{orders.length !== 1 ? 's' : ''} total</p>
        </div>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-4 py-2.5 bg-brand-red text-white font-body font-[600] rounded-lg hover:bg-brand-red-light active:bg-brand-red-dark transition-colors text-sm">
          <Plus size={16} /> New Order
        </button>
      </div>

      {error && !showModal && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">{error}</div>
      )}

      {loading && (
        <div className="flex items-center justify-center py-20"><Loader2 size={24} className="animate-spin text-muted" /></div>
      )}

      {!loading && orders.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Package size={48} className="text-faint mb-4" />
          <p className="text-muted text-sm">No orders yet</p>
          <p className="text-faint text-xs mt-1">Create your first order to get started</p>
        </div>
      )}

      {!loading && orders.length > 0 && (
        <div className="bg-raised border border-line rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-line">
                  <th className="text-left px-4 py-3 text-muted font-[500] text-xs uppercase tracking-wider">Order ID</th>
                  <th className="text-left px-4 py-3 text-muted font-[500] text-xs uppercase tracking-wider">Customer</th>
                  <th className="text-left px-4 py-3 text-muted font-[500] text-xs uppercase tracking-wider">Tracking #</th>
                  <th className="text-left px-4 py-3 text-muted font-[500] text-xs uppercase tracking-wider">Status</th>
                  <th className="text-left px-4 py-3 text-muted font-[500] text-xs uppercase tracking-wider">Created</th>
                  <th className="text-right px-4 py-3 text-muted font-[500] text-xs uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-sunken/50 transition-colors">
                    <td className="px-4 py-3 text-foreground font-mono text-xs">{order.id}</td>
                    <td className="px-4 py-3 text-foreground">{order.customerName}</td>
                    <td className="px-4 py-3 text-muted font-mono text-xs">
                      {order.trackingNumber ? (
                        <span className="flex items-center gap-1">
                          {order.trackingNumber}
                          {order.carrier && <span className="text-faint">({CARRIER_LABELS[order.carrier] ?? order.carrier})</span>}
                        </span>
                      ) : <span className="text-faint">&mdash;</span>}
                    </td>
                    <td className="px-4 py-3"><StatusBadge status={order.currentStatus} /></td>
                    <td className="px-4 py-3 text-muted text-xs">{formatAdminDate(order.createdAt)}</td>
                    <td className="px-4 py-3 text-right">
                      <Link href={`/admin/orders/${order.id}`} className="inline-flex items-center gap-1 text-brand-red-light hover:text-brand-red transition-colors text-xs font-[500]">
                        View <ExternalLink size={12} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showModal && <CreateOrderModal onClose={() => setShowModal(false)} onCreated={fetchOrders} />}
    </div>
  )
}
