'use client'

import { useEffect, useState, type FormEvent } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save, Loader2, Trash2 } from 'lucide-react'

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

const STATUS_STYLES: Record<string, string> = {
  pending: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
  shipped: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  delivered: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  cancelled: 'bg-red-500/15 text-red-400 border-red-500/30',
}

const CARRIER_LABELS: Record<string, string> = {
  'hrvatska-posta': 'Hrvatska Posta',
  gls: 'GLS',
  dpd: 'DPD',
}

function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-[500] border capitalize ${STATUS_STYLES[status] ?? 'bg-raised text-muted border-line'}`}
    >
      {status}
    </span>
  )
}

function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function AdminOrderDetailPage() {
  const params = useParams()
  const router = useRouter()
  const orderId = params.id as string

  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [cancelling, setCancelling] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Edit form state
  const [trackingNumber, setTrackingNumber] = useState('')
  const [carrier, setCarrier] = useState('')
  const [currentStatus, setCurrentStatus] = useState('')
  const [notes, setNotes] = useState('')

  async function fetchOrder(): Promise<void> {
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`)
      if (!res.ok) {
        if (res.status === 401) {
          window.location.href = `/admin/login?from=/admin/orders/${orderId}`
          return
        }
        if (res.status === 404) {
          setError('Order not found')
          setLoading(false)
          return
        }
        throw new Error('Failed to fetch order')
      }
      const data = await res.json()
      const o = data.order as Order
      setOrder(o)
      setTrackingNumber(o.trackingNumber ?? '')
      setCarrier(o.carrier ?? '')
      setCurrentStatus(o.currentStatus)
      setNotes(o.notes ?? '')
    } catch {
      setError('Failed to load order')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchOrder() }, [orderId]) // eslint-disable-line react-hooks/exhaustive-deps

  async function handleSave(e: FormEvent): Promise<void> {
    e.preventDefault()
    setSaving(true)
    setError('')
    setSuccess('')

    try {
      const body: Record<string, string | undefined> = {
        currentStatus,
      }
      body.trackingNumber = trackingNumber || undefined
      body.carrier = carrier || undefined
      body.notes = notes || undefined

      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data.error ?? data.errors?.[0]?.message ?? 'Failed to update order')
        return
      }

      const data = await res.json()
      const updated = data.order as Order
      setOrder(updated)
      setTrackingNumber(updated.trackingNumber ?? '')
      setCarrier(updated.carrier ?? '')
      setCurrentStatus(updated.currentStatus)
      setNotes(updated.notes ?? '')
      setSuccess('Order updated successfully')
      setTimeout(() => setSuccess(''), 3000)
    } catch {
      setError('Network error. Try again.')
    } finally {
      setSaving(false)
    }
  }

  async function handleCancel(): Promise<void> {
    const confirmed = window.confirm(
      `Are you sure you want to cancel order ${orderId}? This action cannot be undone.`,
    )
    if (!confirmed) return

    setCancelling(true)
    setError('')

    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, { method: 'DELETE' })
      if (!res.ok) {
        const data = await res.json()
        setError(data.error ?? 'Failed to cancel order')
        return
      }

      router.push('/admin/orders')
    } catch {
      setError('Network error. Try again.')
    } finally {
      setCancelling(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 size={24} className="animate-spin text-muted" />
      </div>
    )
  }

  if (!order) {
    return (
      <div>
        <Link
          href="/admin/orders"
          className="inline-flex items-center gap-1.5 text-muted hover:text-foreground text-sm transition-colors mb-6"
        >
          <ArrowLeft size={14} />
          Back to Orders
        </Link>
        <div className="p-6 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
          {error || 'Order not found'}
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Back link */}
      <Link
        href="/admin/orders"
        className="inline-flex items-center gap-1.5 text-muted hover:text-foreground text-sm transition-colors mb-6"
      >
        <ArrowLeft size={14} />
        Back to Orders
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="font-heading text-[var(--text-h3)] font-[300] tracking-[var(--tracking-h3)] text-foreground">
              Order Detail
            </h1>
            <StatusBadge status={order.currentStatus} />
          </div>
          <p className="text-muted text-[var(--text-small)] font-mono">{order.id}</p>
        </div>
        {order.currentStatus !== 'cancelled' && (
          <button
            onClick={handleCancel}
            disabled={cancelling}
            className="flex items-center gap-2 px-4 py-2.5 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/10 transition-colors text-sm disabled:opacity-50"
          >
            <Trash2 size={14} />
            {cancelling ? 'Cancelling...' : 'Cancel Order'}
          </button>
        )}
      </div>

      {/* Notifications */}
      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-400 text-sm">
          {success}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customer info */}
        <div className="bg-raised border border-line rounded-xl p-6">
          <h2 className="font-heading text-sm font-[700] text-foreground uppercase tracking-wider mb-4">
            Customer
          </h2>
          <dl className="space-y-3">
            <div>
              <dt className="text-xs text-faint">Name</dt>
              <dd className="text-foreground text-sm mt-0.5">{order.customerName}</dd>
            </div>
            <div>
              <dt className="text-xs text-faint">Email</dt>
              <dd className="text-muted text-sm mt-0.5">{order.customerEmail}</dd>
            </div>
            <div>
              <dt className="text-xs text-faint">Language</dt>
              <dd className="text-muted text-sm mt-0.5 uppercase">{order.language}</dd>
            </div>
          </dl>
        </div>

        {/* Timestamps */}
        <div className="bg-raised border border-line rounded-xl p-6">
          <h2 className="font-heading text-sm font-[700] text-foreground uppercase tracking-wider mb-4">
            Timeline
          </h2>
          <dl className="space-y-3">
            <div>
              <dt className="text-xs text-faint">Created</dt>
              <dd className="text-muted text-sm mt-0.5">{formatDateTime(order.createdAt)}</dd>
            </div>
            <div>
              <dt className="text-xs text-faint">Last Updated</dt>
              <dd className="text-muted text-sm mt-0.5">{formatDateTime(order.updatedAt)}</dd>
            </div>
            <div>
              <dt className="text-xs text-faint">Current Carrier</dt>
              <dd className="text-muted text-sm mt-0.5">
                {order.carrier ? (CARRIER_LABELS[order.carrier] ?? order.carrier) : 'Not assigned'}
              </dd>
            </div>
          </dl>
        </div>

        {/* Current tracking */}
        <div className="bg-raised border border-line rounded-xl p-6">
          <h2 className="font-heading text-sm font-[700] text-foreground uppercase tracking-wider mb-4">
            Tracking
          </h2>
          <dl className="space-y-3">
            <div>
              <dt className="text-xs text-faint">Tracking Number</dt>
              <dd className="text-foreground text-sm mt-0.5 font-mono">
                {order.trackingNumber ?? 'Not assigned'}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-faint">Notes</dt>
              <dd className="text-muted text-sm mt-0.5 whitespace-pre-wrap">
                {order.notes ?? 'None'}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Edit form */}
      <div className="mt-8 bg-raised border border-line rounded-xl p-6">
        <h2 className="font-heading text-sm font-[700] text-foreground uppercase tracking-wider mb-6">
          Update Order
        </h2>
        <form onSubmit={handleSave} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="edit-tracking" className="block text-xs text-muted mb-1.5">
                Tracking Number
              </label>
              <input
                id="edit-tracking"
                type="text"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                className="w-full px-3 py-2.5 bg-sunken border border-line rounded-lg text-foreground text-sm placeholder:text-faint focus:border-brand-red focus:outline-none transition-colors"
                placeholder="Enter tracking number"
              />
            </div>
            <div>
              <label htmlFor="edit-carrier" className="block text-xs text-muted mb-1.5">
                Carrier
              </label>
              <select
                id="edit-carrier"
                value={carrier}
                onChange={(e) => setCarrier(e.target.value)}
                className="w-full px-3 py-2.5 bg-sunken border border-line rounded-lg text-foreground text-sm focus:border-brand-red focus:outline-none transition-colors"
              >
                <option value="">None</option>
                <option value="hrvatska-posta">Hrvatska Posta</option>
                <option value="gls">GLS</option>
                <option value="dpd">DPD</option>
              </select>
            </div>
            <div>
              <label htmlFor="edit-status" className="block text-xs text-muted mb-1.5">
                Status
              </label>
              <select
                id="edit-status"
                value={currentStatus}
                onChange={(e) => setCurrentStatus(e.target.value)}
                className="w-full px-3 py-2.5 bg-sunken border border-line rounded-lg text-foreground text-sm focus:border-brand-red focus:outline-none transition-colors"
              >
                <option value="pending">Pending</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="edit-notes" className="block text-xs text-muted mb-1.5">
              Notes
            </label>
            <textarea
              id="edit-notes"
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2.5 bg-sunken border border-line rounded-lg text-foreground text-sm placeholder:text-faint focus:border-brand-red focus:outline-none transition-colors resize-none"
              placeholder="Internal notes..."
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-6 py-2.5 bg-brand-red text-white font-body font-[600] rounded-lg hover:bg-brand-red-light active:bg-brand-red-dark transition-colors text-sm disabled:opacity-50"
            >
              <Save size={14} />
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
