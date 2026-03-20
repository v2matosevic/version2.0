'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import {
  Eye,
  TrendingUp,
  Users,
  Package,
  Calendar,
  FileText,
  RefreshCw,
  AlertCircle,
} from 'lucide-react'

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface ContactRow {
  id: string
  name: string
  email: string
  type: string
  createdAt: string
}

interface OrderRow {
  id: string
  customerName: string
  currentStatus: string
  createdAt: string
}

interface BookingRow {
  id: string
  name: string
  date: string
  time: string
  status: string
}

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

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-yellow-900/30 text-yellow-400',
  confirmed: 'bg-emerald-900/30 text-emerald-400',
  shipped: 'bg-blue-900/30 text-blue-400',
  delivered: 'bg-emerald-900/30 text-emerald-400',
  cancelled: 'bg-red-900/30 text-red-400',
}

function statusBadge(status: string): string {
  return STATUS_COLORS[status] ?? 'bg-faint/20 text-muted'
}

function formatDate(iso: string): string {
  try {
    return new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(new Date(iso))
  } catch {
    return iso
  }
}

/* ------------------------------------------------------------------ */
/*  Stat Card                                                          */
/* ------------------------------------------------------------------ */

function StatCard({
  label,
  value,
  icon: Icon,
  accent = false,
}: {
  label: string
  value: number
  icon: typeof Eye
  accent?: boolean
}) {
  return (
    <div className="bg-raised border border-line rounded-lg p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[var(--text-small)] text-muted font-body">
          {label}
        </span>
        <Icon size={18} className={accent ? 'text-brand-red' : 'text-faint'} />
      </div>
      <p
        className={`font-heading text-[var(--text-h3)] font-[700] tracking-[var(--tracking-heading)] ${
          accent ? 'text-brand-red-light' : 'text-foreground'
        }`}
      >
        {value.toLocaleString()}
      </p>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Table Shell                                                        */
/* ------------------------------------------------------------------ */

function TableSection({
  title,
  children,
  emptyMessage,
  isEmpty,
}: {
  title: string
  children: React.ReactNode
  emptyMessage: string
  isEmpty: boolean
}) {
  return (
    <div className="bg-raised border border-line rounded-lg overflow-hidden">
      <div className="px-5 py-4 border-b border-line">
        <h2 className="font-heading text-[var(--text-body-lg)] font-[700] text-foreground">
          {title}
        </h2>
      </div>
      {isEmpty ? (
        <div className="px-5 py-10 text-center text-muted text-[var(--text-small)]">
          {emptyMessage}
        </div>
      ) : (
        children
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

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

      if (res.status === 401) {
        router.push('/admin/login?from=/admin')
        return
      }

      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(
          (body as { error?: string }).error ?? `HTTP ${res.status}`,
        )
      }

      const json = (await res.json()) as DashboardData & { success: boolean }
      setData(json)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load dashboard')
    } finally {
      setLoading(false)
    }
  }, [router])

  useEffect(() => {
    fetchDashboard()
  }, [fetchDashboard])

  /* ---- Loading state ---- */
  if (loading && !data) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <RefreshCw size={24} className="text-muted animate-spin" />
      </div>
    )
  }

  /* ---- Error state ---- */
  if (error && !data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <AlertCircle size={32} className="text-brand-red" />
        <p className="text-muted text-[var(--text-small)]">{error}</p>
        <button
          onClick={fetchDashboard}
          className="px-4 py-2 bg-raised border border-line rounded-lg text-[var(--text-small)] text-foreground hover:border-brand-red transition-colors"
        >
          Retry
        </button>
      </div>
    )
  }

  if (!data) return null

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-[var(--text-h2)] font-[300] tracking-[var(--tracking-h2)] text-foreground">
            Dashboard
          </h1>
          <p className="text-muted text-[var(--text-small)] mt-1">
            Overview of your site activity
          </p>
        </div>

        <button
          onClick={fetchDashboard}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-raised border border-line rounded-lg text-[var(--text-small)] text-muted hover:text-foreground hover:border-brand-red transition-colors disabled:opacity-50"
        >
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
          Refresh
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard label="Views Today" value={data.viewsToday} icon={Eye} accent />
        <StatCard label="Views This Week" value={data.viewsWeek} icon={TrendingUp} />
        <StatCard label="Contacts" value={data.totalContacts} icon={Users} />
        <StatCard label="Orders" value={data.totalOrders} icon={Package} />
        <StatCard label="Bookings" value={data.totalBookings} icon={Calendar} />
        <StatCard label="Blog Drafts" value={data.totalDrafts} icon={FileText} />
      </div>

      {/* Tables Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Recent Contacts */}
        <TableSection
          title="Recent Contacts"
          emptyMessage="No contacts yet."
          isEmpty={data.recentContacts.length === 0}
        >
          <table className="w-full text-[var(--text-small)]">
            <thead>
              <tr className="border-b border-line-subtle text-left text-muted">
                <th className="px-5 py-3 font-[600]">Name</th>
                <th className="px-5 py-3 font-[600]">Type</th>
                <th className="px-5 py-3 font-[600] text-right">Date</th>
              </tr>
            </thead>
            <tbody>
              {data.recentContacts.map((contact) => (
                <tr
                  key={contact.id}
                  className="border-b border-line-subtle last:border-0 hover:bg-sunken/50 transition-colors"
                >
                  <td className="px-5 py-3">
                    <p className="text-foreground font-[500]">{contact.name}</p>
                    <p className="text-faint text-[var(--text-overline)] mt-0.5">
                      {contact.email}
                    </p>
                  </td>
                  <td className="px-5 py-3 text-muted capitalize">
                    {contact.type}
                  </td>
                  <td className="px-5 py-3 text-muted text-right">
                    {formatDate(contact.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableSection>

        {/* Upcoming Bookings */}
        <TableSection
          title="Upcoming Bookings"
          emptyMessage="No upcoming bookings."
          isEmpty={data.upcomingBookings.length === 0}
        >
          <table className="w-full text-[var(--text-small)]">
            <thead>
              <tr className="border-b border-line-subtle text-left text-muted">
                <th className="px-5 py-3 font-[600]">Name</th>
                <th className="px-5 py-3 font-[600]">Date</th>
                <th className="px-5 py-3 font-[600] text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.upcomingBookings.map((booking) => (
                <tr
                  key={booking.id}
                  className="border-b border-line-subtle last:border-0 hover:bg-sunken/50 transition-colors"
                >
                  <td className="px-5 py-3 text-foreground font-[500]">
                    {booking.name}
                  </td>
                  <td className="px-5 py-3 text-muted">
                    {formatDate(booking.date)}{' '}
                    <span className="text-faint">{booking.time}</span>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[var(--text-overline)] font-[600] capitalize ${statusBadge(booking.status)}`}
                    >
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableSection>

        {/* Recent Orders — full width */}
        <div className="xl:col-span-2">
          <TableSection
            title="Recent Orders"
            emptyMessage="No orders yet."
            isEmpty={data.recentOrders.length === 0}
          >
            <table className="w-full text-[var(--text-small)]">
              <thead>
                <tr className="border-b border-line-subtle text-left text-muted">
                  <th className="px-5 py-3 font-[600]">Order ID</th>
                  <th className="px-5 py-3 font-[600]">Customer</th>
                  <th className="px-5 py-3 font-[600]">Status</th>
                  <th className="px-5 py-3 font-[600] text-right">Date</th>
                </tr>
              </thead>
              <tbody>
                {data.recentOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-line-subtle last:border-0 hover:bg-sunken/50 transition-colors"
                  >
                    <td className="px-5 py-3 text-faint font-mono text-[var(--text-overline)]">
                      {order.id.slice(0, 8)}...
                    </td>
                    <td className="px-5 py-3 text-foreground font-[500]">
                      {order.customerName}
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[var(--text-overline)] font-[600] capitalize ${statusBadge(order.currentStatus)}`}
                      >
                        {order.currentStatus}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-muted text-right">
                      {formatDate(order.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableSection>
        </div>
      </div>
    </div>
  )
}
