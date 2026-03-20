'use client'

import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Calendar, Loader2, XCircle, CheckCircle2, Clock } from 'lucide-react'

interface Booking {
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

function todayString(): string {
  return new Date().toISOString().split('T')[0]!
}

export default function AdminBookingsPage() {
  const router = useRouter()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  const fetchBookings = useCallback(async (): Promise<void> => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin/bookings')
      if (!res.ok) {
        if (res.status === 401) {
          router.push('/admin/login?from=/admin/bookings')
          return
        }
        throw new Error('Failed to fetch bookings')
      }
      const data = await res.json()
      setBookings(data.bookings)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load bookings')
    } finally {
      setLoading(false)
    }
  }, [router])

  useEffect(() => {
    fetchBookings()
  }, [fetchBookings])

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
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status: 'cancelled' } : b)),
      )
    } catch {
      setError('Failed to cancel booking')
    } finally {
      setUpdatingId(null)
    }
  }

  const today = todayString()
  const upcoming = bookings.filter((b) => b.date >= today)
  const past = bookings.filter((b) => b.date < today)

  function renderTable(items: Booking[], isUpcoming: boolean) {
    if (items.length === 0) {
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
            {items.map((booking) => {
              const StatusIcon = STATUS_ICON[booking.status]
              return (
                <tr
                  key={booking.id}
                  className="bg-raised border-b border-line last:border-b-0 hover:bg-raised/80 transition-colors"
                >
                  <td className="px-4 py-3 text-foreground text-[var(--text-body)]">
                    {formatDate(booking.date)}
                  </td>
                  <td className="px-4 py-3 text-foreground text-[var(--text-body)] font-mono text-[var(--text-small)]">
                    {booking.time}
                  </td>
                  <td className="px-4 py-3 text-foreground text-[var(--text-body)] font-[500]">
                    {booking.name}
                  </td>
                  <td className="px-4 py-3 text-muted text-[var(--text-small)]">
                    {booking.email}
                  </td>
                  <td className="px-4 py-3 text-muted text-[var(--text-small)] capitalize">
                    {booking.contactMethod}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[var(--text-small)] font-[500] ${
                        STATUS_BADGE[booking.status] || 'bg-white/5 text-muted'
                      }`}
                    >
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
                          {updatingId === booking.id ? (
                            <Loader2 size={14} className="animate-spin" />
                          ) : (
                            <XCircle size={14} />
                          )}
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

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-[var(--text-h3)] font-[300] tracking-[var(--tracking-h3)] text-foreground">
            Bookings
          </h1>
          <p className="text-muted text-[var(--text-small)] mt-1">
            Manage consultation bookings
          </p>
        </div>
        <div className="flex items-center gap-2 text-muted text-[var(--text-small)]">
          <Calendar size={16} />
          {bookings.length} total
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 px-4 py-3 bg-brand-red/10 border border-brand-red/20 rounded-lg text-brand-red text-[var(--text-small)]">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-20 text-muted">
          <Loader2 size={24} className="animate-spin" />
          <span className="ml-3 text-[var(--text-small)]">Loading bookings...</span>
        </div>
      )}

      {/* Content */}
      {!loading && !error && (
        <div className="space-y-10">
          {/* Upcoming */}
          <section>
            <h2 className="font-heading text-[var(--text-h4)] font-[700] text-foreground mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Upcoming
              <span className="text-muted text-[var(--text-small)] font-body font-[400] ml-1">
                ({upcoming.length})
              </span>
            </h2>
            {renderTable(upcoming, true)}
          </section>

          {/* Past */}
          <section>
            <h2 className="font-heading text-[var(--text-h4)] font-[700] text-foreground mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-faint" />
              Past
              <span className="text-muted text-[var(--text-small)] font-body font-[400] ml-1">
                ({past.length})
              </span>
            </h2>
            {renderTable(past, false)}
          </section>
        </div>
      )}
    </div>
  )
}
