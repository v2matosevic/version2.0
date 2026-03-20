'use client'

import { useState, type FormEvent } from 'react'
import { X } from 'lucide-react'

type CreateOrderModalProps = {
  onClose: () => void
  onCreated: () => void
}

function CreateOrderModal({ onClose, onCreated }: CreateOrderModalProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [tracking, setTracking] = useState('')
  const [carrier, setCarrier] = useState('')
  const [language, setLanguage] = useState('en')
  const [notes, setNotes] = useState('')
  const [creating, setCreating] = useState(false)
  const [error, setError] = useState('')

  async function handleCreate(e: FormEvent): Promise<void> {
    e.preventDefault()
    setCreating(true)
    setError('')

    try {
      const body: Record<string, string | undefined> = {
        customerName: name,
        customerEmail: email,
        language,
      }
      if (tracking) body.trackingNumber = tracking
      if (carrier) body.carrier = carrier
      if (notes) body.notes = notes

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

      onClose()
      onCreated()
    } catch {
      setError('Network error. Try again.')
    } finally {
      setCreating(false)
    }
  }

  const inputClass = 'w-full px-3 py-2.5 bg-sunken border border-line rounded-lg text-foreground text-sm placeholder:text-faint focus:border-brand-red focus:outline-none transition-colors'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg mx-4 bg-raised border border-line rounded-xl shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-line">
          <h2 className="font-heading text-lg font-[700] text-foreground">New Order</h2>
          <button onClick={onClose} className="text-muted hover:text-foreground transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleCreate} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">{error}</div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="create-name" className="block text-xs text-muted mb-1.5">Customer Name *</label>
              <input id="create-name" type="text" required value={name} onChange={(e) => setName(e.target.value)} className={inputClass} placeholder="John Doe" />
            </div>
            <div>
              <label htmlFor="create-email" className="block text-xs text-muted mb-1.5">Customer Email *</label>
              <input id="create-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} placeholder="john@example.com" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="create-tracking" className="block text-xs text-muted mb-1.5">Tracking Number</label>
              <input id="create-tracking" type="text" value={tracking} onChange={(e) => setTracking(e.target.value)} className={inputClass} placeholder="Optional" />
            </div>
            <div>
              <label htmlFor="create-carrier" className="block text-xs text-muted mb-1.5">Carrier</label>
              <select id="create-carrier" value={carrier} onChange={(e) => setCarrier(e.target.value)} className={inputClass}>
                <option value="">None</option>
                <option value="hrvatska-posta">Hrvatska Posta</option>
                <option value="gls">GLS</option>
                <option value="dpd">DPD</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="create-language" className="block text-xs text-muted mb-1.5">Language</label>
            <select id="create-language" value={language} onChange={(e) => setLanguage(e.target.value)} className={inputClass}>
              <option value="en">English</option>
              <option value="hr">Croatian</option>
              <option value="de">German</option>
            </select>
          </div>

          <div>
            <label htmlFor="create-notes" className="block text-xs text-muted mb-1.5">Notes</label>
            <textarea id="create-notes" rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} className={`${inputClass} resize-none`} placeholder="Optional internal notes..." />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2.5 text-muted hover:text-foreground text-sm transition-colors">Cancel</button>
            <button type="submit" disabled={creating} className="px-6 py-2.5 bg-brand-red text-white font-body font-[600] rounded-lg hover:bg-brand-red-light active:bg-brand-red-dark transition-colors text-sm disabled:opacity-50">
              {creating ? 'Creating...' : 'Create Order'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export { CreateOrderModal }
