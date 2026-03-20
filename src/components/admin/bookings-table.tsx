'use client'

import { useState } from 'react'
import { Loader2, XCircle, CheckCircle2, Clock } from 'lucide-react'

type Booking = {
  id: string
  name: string
  email: string
  date: string
  time: string
  contactMethod: string
  description: string | null
  language: string
  status: string
  createdAt: string
}

type BookingsTableProps = {
  bookings: Booking[]
  isUpcoming: boolean
  onStatusChange: (id: string, status: string) => void
}

const STATUS_BADGE: Record<string, string> = {
  confirmed: 'bg-emerald-500/15 text-emerald-400',
  cancelled: 'bg-red-500/15 text-red-400',
  completed: 'bg-sky-500/15 text-sky-400',
}

const STATUS_ICON: Record<string, typeof CheckCircle2> = {
  confirmed: CheckCircle2,
  cancelled: XCircle,
  completed: Clock,
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

function BookingsTable({ bookings, isUpcoming, onStatusChange }: BookingsTableProps) {
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  async function handleCancel(id: string): Promise<void> {
    if (!confirm('Cancel this booking? The client will need to be notified separately.')) return

    setUpdatingId(id)
    try {
      const res = await fetch(`/api/admin/bookings/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'cancelled' }),
      })
      if (!res.ok) throw new Error('Update failed')
      onStatusChange(id, 'cancelled')
    } catch {
      // Error handled by parent
    } finally {
      setUpdatingId(null)
    }
  }

  if (bookings.length === 0) {
    return (
      <p className="text-muted text-[var(--text-small)] py-8 text-center">
        No {isUpcoming ? 'upcoming' : 'past'} bookings.
      </p>
    )
  }

  return (
    <div className="border border-line rounded-lg overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="bg-sunken border-b border-line">
            <th className="text-left px-4 py-3 text-[var(--text-small)] font-[600] text-muted">Date</th>
            <th className="text-left px-4 py-3 text-[var(--text-small)] font-[600] text-muted w-20">Time</th>
            <th className="text-left px-4 py-3 text-[var(--text-small)] font-[600] text-muted">Client</th>
            <th className="text-left px-4 py-3 text-[var(--text-small)] font-[600] text-muted">Email</th>
            <th className="text-left px-4 py-3 text-[var(--text-small)] font-[600] text-muted w-28">Contact</th>
            <th className="text-left px-4 py-3 text-[var(--text-small)] font-[600] text-muted w-28">Status</th>
            {isUpcoming && (
              <th className="text-right px-4 py-3 text-[var(--text-small)] font-[600] text-muted w-24">Actions</th>
            )}
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => {
            const StatusIcon = STATUS_ICON[booking.status]
            return (
              <tr key={booking.id} className="bg-raised border-b border-line last:border-b-0 hover:bg-raised/80 transition-colors">
                <td className="px-4 py-3 text-foreground text-[var(--text-body)]">{formatDate(booking.date)}</td>
                <td className="px-4 py-3 text-foreground text-[var(--text-body)] font-mono text-[var(--text-small)]">{booking.time}</td>
                <td className="px-4 py-3 text-foreground text-[var(--text-body)] font-[500]">{booking.name}</td>
                <td className="px-4 py-3 text-muted text-[var(--text-small)]">{booking.email}</td>
                <td className="px-4 py-3 text-muted text-[var(--text-small)] capitalize">{booking.contactMethod}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[var(--text-small)] font-[500] ${STATUS_BADGE[booking.status] || 'bg-white/5 text-muted'}`}>
                    {StatusIcon && <StatusIcon size={13} />}
                    {booking.status}
                  </span>
                </td>
                {isUpcoming && (
                  <td className="px-4 py-3 text-right">
                    {booking.status !== 'cancelled' && (
                      <button
                        onClick={() => handleCancel(booking.id)}
                        disabled={updatingId === booking.id}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[var(--text-small)] text-muted hover:text-brand-red hover:bg-brand-red/10 transition-colors disabled:opacity-50"
                        title="Cancel booking"
                      >
                        {updatingId === booking.id ? <Loader2 size={14} className="animate-spin" /> : <XCircle size={14} />}
                        Cancel
                      </button>
                    )}
                  </td>
                )}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export { BookingsTable }
export type { Booking, BookingsTableProps }
