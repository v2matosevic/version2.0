'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Loader2, Trash2 } from 'lucide-react'
import { StatusBadge } from '@/components/admin/status-badge'
import { OrderInfoCards } from '@/components/admin/orders/order-info-cards'
import { OrderEditForm } from '@/components/admin/orders/order-edit-form'

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

export default function AdminOrderDetailPage() {
  const params = useParams()
  const router = useRouter()
  const orderId = params.id as string

  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [cancelling, setCancelling] = useState(false)
  const [error, setError] = useState('')

  async function fetchOrder(): Promise<void> {
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`)
      if (!res.ok) {
        if (res.status === 401) { window.location.href = `/admin/login?from=/admin/orders/${orderId}`; return }
        if (res.status === 404) { setError('Order not found'); setLoading(false); return }
        throw new Error('Failed to fetch order')
      }
      const data = await res.json()
      setOrder(data.order as Order)
    } catch {
      setError('Failed to load order')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchOrder() }, [orderId]) // eslint-disable-line react-hooks/exhaustive-deps

  async function handleCancel(): Promise<void> {
    if (!window.confirm(`Are you sure you want to cancel order ${orderId}? This action cannot be undone.`)) return
    setCancelling(true)
    setError('')
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, { method: 'DELETE' })
      if (!res.ok) { const data = await res.json(); setError(data.error ?? 'Failed to cancel order'); return }
      router.push('/admin/orders')
    } catch {
      setError('Network error. Try again.')
    } finally {
      setCancelling(false)
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center py-20"><Loader2 size={24} className="animate-spin text-muted" /></div>
  }

  if (!order) {
    return (
      <div>
        <Link href="/admin/orders" className="inline-flex items-center gap-1.5 text-muted hover:text-foreground text-sm transition-colors mb-6"><ArrowLeft size={14} /> Back to Orders</Link>
        <div className="p-6 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">{error || 'Order not found'}</div>
      </div>
    )
  }

  return (
    <div>
      <Link href="/admin/orders" className="inline-flex items-center gap-1.5 text-muted hover:text-foreground text-sm transition-colors mb-6"><ArrowLeft size={14} /> Back to Orders</Link>

      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="font-heading text-[var(--text-h3)] font-[300] tracking-[var(--tracking-h3)] text-foreground">Order Detail</h1>
            <StatusBadge status={order.currentStatus} />
          </div>
          <p className="text-muted text-[var(--text-small)] font-mono">{order.id}</p>
        </div>
        {order.currentStatus !== 'cancelled' && (
          <button onClick={handleCancel} disabled={cancelling} className="flex items-center gap-2 px-4 py-2.5 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/10 transition-colors text-sm disabled:opacity-50">
            <Trash2 size={14} /> {cancelling ? 'Cancelling...' : 'Cancel Order'}
          </button>
        )}
      </div>

      {error && <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">{error}</div>}

      <OrderInfoCards order={order} />
      <OrderEditForm
        orderId={orderId}
        initialTracking={order.trackingNumber ?? ''}
        initialCarrier={order.carrier ?? ''}
        initialStatus={order.currentStatus}
        initialNotes={order.notes ?? ''}
        onSaved={(updated) => setOrder(updated as Order)}
      />
    </div>
  )
}
