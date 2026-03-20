'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, TrendingUp, Users, Package, Calendar, FileText, RefreshCw, AlertCircle } from 'lucide-react'
import { StatCard } from '@/components/admin/dashboard/stat-card'
import { TableSection } from '@/components/admin/dashboard/table-section'
import { ContactsTable, type ContactRow } from '@/components/admin/dashboard/contacts-table'
import { BookingsTable, type BookingRow } from '@/components/admin/dashboard/bookings-table'
import { DashboardOrdersTable, type OrderRow } from '@/components/admin/dashboard/orders-table'

interface DashboardData {
  viewsToday: number
  viewsWeek: number
  totalContacts: number
  totalOrders: number
  totalBookings: number
  totalDrafts: number
  recentContacts: ContactRow[]
  recentOrders: OrderRow[]
  upcomingBookings: BookingRow[]
}

export default function AdminDashboardPage() {
  const router = useRouter()
  const [data, setData] = useState<DashboardData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchDashboard = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/admin/dashboard')
      if (res.status === 401) { router.push('/admin/login?from=/admin'); return }
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error((body as { error?: string }).error ?? `HTTP ${res.status}`)
      }
      setData(await res.json() as DashboardData & { success: boolean })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load dashboard')
    } finally {
      setLoading(false)
    }
  }, [router])

  useEffect(() => { fetchDashboard() }, [fetchDashboard])

  if (loading && !data) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <RefreshCw size={24} className="text-muted animate-spin" />
      </div>
    )
  }

  if (error && !data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <AlertCircle size={32} className="text-brand-red" />
        <p className="text-muted text-[var(--text-small)]">{error}</p>
        <button onClick={fetchDashboard} className="px-4 py-2 bg-raised border border-line rounded-lg text-[var(--text-small)] text-foreground hover:border-brand-red transition-colors">
          Retry
        </button>
      </div>
    )
  }

  if (!data) return null

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-[var(--text-h2)] font-[300] tracking-[var(--tracking-h2)] text-foreground">Dashboard</h1>
          <p className="text-muted text-[var(--text-small)] mt-1">Overview of your site activity</p>
        </div>
        <button onClick={fetchDashboard} disabled={loading} className="flex items-center gap-2 px-4 py-2 bg-raised border border-line rounded-lg text-[var(--text-small)] text-muted hover:text-foreground hover:border-brand-red transition-colors disabled:opacity-50">
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard label="Views Today" value={data.viewsToday} icon={Eye} accent />
        <StatCard label="Views This Week" value={data.viewsWeek} icon={TrendingUp} />
        <StatCard label="Contacts" value={data.totalContacts} icon={Users} />
        <StatCard label="Orders" value={data.totalOrders} icon={Package} />
        <StatCard label="Bookings" value={data.totalBookings} icon={Calendar} />
        <StatCard label="Blog Drafts" value={data.totalDrafts} icon={FileText} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <TableSection title="Recent Contacts" emptyMessage="No contacts yet." isEmpty={data.recentContacts.length === 0}>
          <ContactsTable contacts={data.recentContacts} />
        </TableSection>
        <TableSection title="Upcoming Bookings" emptyMessage="No upcoming bookings." isEmpty={data.upcomingBookings.length === 0}>
          <BookingsTable bookings={data.upcomingBookings} />
        </TableSection>
        <div className="xl:col-span-2">
          <TableSection title="Recent Orders" emptyMessage="No orders yet." isEmpty={data.recentOrders.length === 0}>
            <DashboardOrdersTable orders={data.recentOrders} />
          </TableSection>
        </div>
      </div>
    </div>
  )
}
