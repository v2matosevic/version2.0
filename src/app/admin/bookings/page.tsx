'use client'

import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Calendar, Loader2 } from 'lucide-react'
import { BookingsTable } from '@/components/admin/bookings-table'
import type { Booking } from '@/components/admin/bookings-table'

function todayString(): string {
  return new Date().toISOString().split('T')[0]!
}

export default function AdminBookingsPage() {
  const router = useRouter()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

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

  function handleStatusChange(id: string, status: string): void {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)))
  }

  const today = todayString()
  const upcoming = bookings.filter((b) => b.date >= today)
  const past = bookings.filter((b) => b.date < today)

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-[var(--text-h3)] font-[300] tracking-[var(--tracking-h3)] text-foreground">
            Bookings
          </h1>
          <p className="text-muted text-[var(--text-small)] mt-1">Manage consultation bookings</p>
        </div>
        <div className="flex items-center gap-2 text-muted text-[var(--text-small)]">
          <Calendar size={16} />
          {bookings.length} total
        </div>
      </div>

      {error && (
        <div className="mb-6 px-4 py-3 bg-brand-red/10 border border-brand-red/20 rounded-lg text-brand-red text-[var(--text-small)]">
          {error}
        </div>
      )}

      {loading && (
        <div className="flex items-center justify-center py-20 text-muted">
          <Loader2 size={24} className="animate-spin" />
          <span className="ml-3 text-[var(--text-small)]">Loading bookings...</span>
        </div>
      )}

      {!loading && !error && (
        <div className="space-y-10">
          <section>
            <h2 className="font-heading text-[var(--text-h4)] font-[700] text-foreground mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Upcoming
              <span className="text-muted text-[var(--text-small)] font-body font-[400] ml-1">({upcoming.length})</span>
            </h2>
            <BookingsTable bookings={upcoming} isUpcoming={true} onStatusChange={handleStatusChange} />
          </section>

          <section>
            <h2 className="font-heading text-[var(--text-h4)] font-[700] text-foreground mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-faint" />
              Past
              <span className="text-muted text-[var(--text-small)] font-body font-[400] ml-1">({past.length})</span>
            </h2>
            <BookingsTable bookings={past} isUpcoming={false} onStatusChange={handleStatusChange} />
          </section>
        </div>
      )}
    </div>
  )
}
