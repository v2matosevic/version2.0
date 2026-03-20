'use client'

import { useEffect, useState, type FormEvent } from 'react'
import Link from 'next/link'
import { Package, Plus, X, ExternalLink, Loader2 } from 'lucide-react'

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

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [creating, setCreating] = useState(false)
  const [error, setError] = useState('')

  // New order form state
  const [formName, setFormName] = useState('')
  const [formEmail, setFormEmail] = useState('')
  const [formTracking, setFormTracking] = useState('')
  const [formCarrier, setFormCarrier] = useState('')
  const [formLanguage, setFormLanguage] = useState('en')
  const [formNotes, setFormNotes] = useState('')

  async function fetchOrders(): Promise<void> {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/orders')
      if (!res.ok) {
        if (res.status === 401) {
          window.location.href = '/admin/login?from=/admin/orders'
          return
        }
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

  function resetForm(): void {
    setFormName('')
    setFormEmail('')
    setFormTracking('')
    setFormCarrier('')
    setFormLanguage('en')
    setFormNotes('')
    setError('')
  }

  async function handleCreate(e: FormEvent): Promise<void> {
    e.preventDefault()
    setCreating(true)
    setError('')

    try {
      const body: Record<string, string | undefined> = {
        customerName: formName,
        customerEmail: formEmail,
        language: formLanguage,
      }
      if (formTracking) body.trackingNumber = formTracking
      if (formCarrier) body.carrier = formCarrier
      if (formNotes) body.notes = formNotes

      const res = await fetch('/api/admin/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data.error ?? data.errors?.[0]?.message ?? 'Failed to create order')
        return
      }

      setShowModal(false)
      resetForm()
      await fetchOrders()
    } catch {
      setError('Network error. Try again.')
    } finally {
      setCreating(false)
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-[var(--text-h3)] font-[300] tracking-[var(--tracking-h3)] text-foreground">
            Orders
          </h1>
          <p className="text-muted text-[var(--text-small)] mt-1">
            {orders.length} order{orders.length !== 1 ? 's' : ''} total
          </p>
        </div>
        <button
          onClick={() => { resetForm(); setShowModal(true) }}
          className="flex items-center gap-2 px-4 py-2.5 bg-brand-red text-white font-body font-[600] rounded-lg hover:bg-brand-red-light active:bg-brand-red-dark transition-colors text-sm"
        >
          <Plus size={16} />
          New Order
        </button>
      </div>

      {/* Error */}
      {error && !showModal && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={24} className="animate-spin text-muted" />
        </div>
      )}

      {/* Empty state */}
      {!loading && orders.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Package size={48} className="text-faint mb-4" />
          <p className="text-muted text-sm">No orders yet</p>
          <p className="text-faint text-xs mt-1">Create your first order to get started</p>
        </div>
      )}

      {/* Orders table */}
      {!loading && orders.length > 0 && (
        <div className="bg-raised border border-line rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-line">
                  <th className="text-left px-4 py-3 text-muted font-[500] text-xs uppercase tracking-wider">Order ID</th>
                  <th className="text-left px-4 py-3 text-muted font-[500] text-xs uppercase tracking-wider">Customer</th>
                  <th className="text-left px-4 py-3 text-muted font-[500] text-xs uppercase tracking-wider">Email</th>
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
                    <td className="px-4 py-3 text-muted">{order.customerEmail}</td>
                    <td className="px-4 py-3 text-muted font-mono text-xs">
                      {order.trackingNumber ? (
                        <span className="flex items-center gap-1">
                          {order.trackingNumber}
                          {order.carrier && (
                            <span className="text-faint">({CARRIER_LABELS[order.carrier] ?? order.carrier})</span>
                          )}
                        </span>
                      ) : (
                        <span className="text-faint">&mdash;</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={order.currentStatus} />
                    </td>
                    <td className="px-4 py-3 text-muted text-xs">{formatDate(order.createdAt)}</td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="inline-flex items-center gap-1 text-brand-red-light hover:text-brand-red transition-colors text-xs font-[500]"
                      >
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

      {/* Create Order Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          />
          <div className="relative w-full max-w-lg mx-4 bg-raised border border-line rounded-xl shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-line">
              <h2 className="font-heading text-lg font-[700] text-foreground">New Order</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-muted hover:text-foreground transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreate} className="p-6 space-y-4">
              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="create-name" className="block text-xs text-muted mb-1.5">
                    Customer Name *
                  </label>
                  <input
                    id="create-name"
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full px-3 py-2.5 bg-sunken border border-line rounded-lg text-foreground text-sm placeholder:text-faint focus:border-brand-red focus:outline-none transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="create-email" className="block text-xs text-muted mb-1.5">
                    Customer Email *
                  </label>
                  <input
                    id="create-email"
                    type="email"
                    required
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    className="w-full px-3 py-2.5 bg-sunken border border-line rounded-lg text-foreground text-sm placeholder:text-faint focus:border-brand-red focus:outline-none transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="create-tracking" className="block text-xs text-muted mb-1.5">
                    Tracking Number
                  </label>
                  <input
                    id="create-tracking"
                    type="text"
                    value={formTracking}
                    onChange={(e) => setFormTracking(e.target.value)}
                    className="w-full px-3 py-2.5 bg-sunken border border-line rounded-lg text-foreground text-sm placeholder:text-faint focus:border-brand-red focus:outline-none transition-colors"
                    placeholder="Optional"
                  />
                </div>
                <div>
                  <label htmlFor="create-carrier" className="block text-xs text-muted mb-1.5">
                    Carrier
                  </label>
                  <select
                    id="create-carrier"
                    value={formCarrier}
                    onChange={(e) => setFormCarrier(e.target.value)}
                    className="w-full px-3 py-2.5 bg-sunken border border-line rounded-lg text-foreground text-sm focus:border-brand-red focus:outline-none transition-colors"
                  >
                    <option value="">None</option>
                    <option value="hrvatska-posta">Hrvatska Posta</option>
                    <option value="gls">GLS</option>
                    <option value="dpd">DPD</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="create-language" className="block text-xs text-muted mb-1.5">
                  Language
                </label>
                <select
                  id="create-language"
                  value={formLanguage}
                  onChange={(e) => setFormLanguage(e.target.value)}
                  className="w-full px-3 py-2.5 bg-sunken border border-line rounded-lg text-foreground text-sm focus:border-brand-red focus:outline-none transition-colors"
                >
                  <option value="en">English</option>
                  <option value="hr">Croatian</option>
                  <option value="de">German</option>
                </select>
              </div>

              <div>
                <label htmlFor="create-notes" className="block text-xs text-muted mb-1.5">
                  Notes
                </label>
                <textarea
                  id="create-notes"
                  rows={3}
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
                  className="w-full px-3 py-2.5 bg-sunken border border-line rounded-lg text-foreground text-sm placeholder:text-faint focus:border-brand-red focus:outline-none transition-colors resize-none"
                  placeholder="Optional internal notes..."
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2.5 text-muted hover:text-foreground text-sm transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creating}
                  className="px-6 py-2.5 bg-brand-red text-white font-body font-[600] rounded-lg hover:bg-brand-red-light active:bg-brand-red-dark transition-colors text-sm disabled:opacity-50"
                >
                  {creating ? 'Creating...' : 'Create Order'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
