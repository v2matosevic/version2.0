'use client'

import { useState, type FormEvent } from 'react'
import { Save } from 'lucide-react'

type OrderEditFormProps = {
  orderId: string
  initialTracking: string
  initialCarrier: string
  initialStatus: string
  initialNotes: string
  onSaved: (updated: Record<string, unknown>) => void
}

function OrderEditForm({
  orderId,
  initialTracking,
  initialCarrier,
  initialStatus,
  initialNotes,
  onSaved,
}: OrderEditFormProps) {
  const [trackingNumber, setTrackingNumber] = useState(initialTracking)
  const [carrier, setCarrier] = useState(initialCarrier)
  const [currentStatus, setCurrentStatus] = useState(initialStatus)
  const [notes, setNotes] = useState(initialNotes)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const inputClass = 'w-full px-3 py-2.5 bg-sunken border border-line rounded-lg text-foreground text-sm placeholder:text-faint focus:border-brand-red focus:outline-none transition-colors'

  async function handleSave(e: FormEvent): Promise<void> {
    e.preventDefault()
    setSaving(true)
    setError('')
    setSuccess('')

    try {
      const body: Record<string, string | undefined> = {
        currentStatus,
        trackingNumber: trackingNumber || undefined,
        carrier: carrier || undefined,
        notes: notes || undefined,
      }

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
      onSaved(data.order)
      setSuccess('Order updated successfully')
      setTimeout(() => setSuccess(''), 3000)
    } catch {
      setError('Network error. Try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="mt-8 bg-raised border border-line rounded-xl p-6">
      <h2 className="font-heading text-sm font-[700] text-foreground uppercase tracking-wider mb-6">Update Order</h2>

      {error && <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">{error}</div>}
      {success && <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-400 text-sm">{success}</div>}

      <form onSubmit={handleSave} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="edit-tracking" className="block text-xs text-muted mb-1.5">Tracking Number</label>
            <input id="edit-tracking" type="text" value={trackingNumber} onChange={(e) => setTrackingNumber(e.target.value)} className={inputClass} placeholder="Enter tracking number" />
          </div>
          <div>
            <label htmlFor="edit-carrier" className="block text-xs text-muted mb-1.5">Carrier</label>
            <select id="edit-carrier" value={carrier} onChange={(e) => setCarrier(e.target.value)} className={inputClass}>
              <option value="">None</option>
              <option value="hrvatska-posta">Hrvatska Posta</option>
              <option value="gls">GLS</option>
              <option value="dpd">DPD</option>
            </select>
          </div>
          <div>
            <label htmlFor="edit-status" className="block text-xs text-muted mb-1.5">Status</label>
            <select id="edit-status" value={currentStatus} onChange={(e) => setCurrentStatus(e.target.value)} className={inputClass}>
              <option value="pending">Pending</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="edit-notes" className="block text-xs text-muted mb-1.5">Notes</label>
          <textarea id="edit-notes" rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} className={`${inputClass} resize-none`} placeholder="Internal notes..." />
        </div>
        <div className="flex justify-end">
          <button type="submit" disabled={saving} className="flex items-center gap-2 px-6 py-2.5 bg-brand-red text-white font-body font-[600] rounded-lg hover:bg-brand-red-light active:bg-brand-red-dark transition-colors text-sm disabled:opacity-50">
            <Save size={14} /> {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  )
}

export { OrderEditForm }
