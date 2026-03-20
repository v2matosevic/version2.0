'use client'

import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { BarChart3, Eye, Users, Target, Loader2 } from 'lucide-react'

interface TopPage {
  page: string
  count: number
}

interface Conversion {
  type: string | null
  count: number
}

interface DayView {
  period: string
  count: number
}

interface AnalyticsData {
  totalViews: number
  uniqueSessions: number
  topPages: TopPage[]
  conversions: Conversion[]
  viewsByDay: DayView[]
}

function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`
  return n.toString()
}

function formatShortDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })
}

export default function AdminAnalyticsPage() {
  const router = useRouter()
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchAnalytics = useCallback(async (): Promise<void> => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin/analytics')
      if (!res.ok) {
        if (res.status === 401) {
          router.push('/admin/login?from=/admin/analytics')
          return
        }
        throw new Error('Failed to fetch analytics')
      }
      const json = await res.json()
      setData(json)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load analytics')
    } finally {
      setLoading(false)
    }
  }, [router])

  useEffect(() => {
    fetchAnalytics()
  }, [fetchAnalytics])

  const totalConversions = data?.conversions.reduce((sum, c) => sum + c.count, 0) ?? 0
  const maxDayViews = data?.viewsByDay.reduce((max, d) => Math.max(max, d.count), 0) ?? 1

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-heading text-[var(--text-h3)] font-[300] tracking-[var(--tracking-h3)] text-foreground">
          Analytics
        </h1>
        <p className="text-muted text-[var(--text-small)] mt-1">
          Site traffic and conversion data
        </p>
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
          <span className="ml-3 text-[var(--text-small)]">Loading analytics...</span>
        </div>
      )}

      {/* Content */}
      {!loading && data && (
        <div className="space-y-8">
          {/* Stats row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatCard
              icon={Eye}
              label="Total Views"
              value={formatNumber(data.totalViews)}
            />
            <StatCard
              icon={Users}
              label="Unique Sessions"
              value={formatNumber(data.uniqueSessions)}
            />
            <StatCard
              icon={Target}
              label="Total Conversions"
              value={formatNumber(totalConversions)}
            />
          </div>

          {/* Bar chart: Views per day */}
          <section className="bg-raised border border-line rounded-lg p-6">
            <h2 className="font-heading text-[var(--text-h4)] font-[700] text-foreground mb-6 flex items-center gap-2">
              <BarChart3 size={18} className="text-brand-red" />
              Views per Day
              <span className="text-muted text-[var(--text-small)] font-body font-[400] ml-1">
                (last 30 days)
              </span>
            </h2>

            {data.viewsByDay.length === 0 ? (
              <p className="text-muted text-[var(--text-small)] py-8 text-center">
                No page view data yet.
              </p>
            ) : (
              <div className="flex items-end gap-[3px] h-48 overflow-x-auto">
                {data.viewsByDay.map((day) => {
                  const heightPercent = maxDayViews > 0
                    ? Math.max((day.count / maxDayViews) * 100, 2)
                    : 2
                  return (
                    <div
                      key={day.period}
                      className="flex flex-col items-center flex-1 min-w-[18px] group"
                    >
                      {/* Tooltip */}
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] text-foreground bg-sunken border border-line rounded px-1.5 py-0.5 mb-1 whitespace-nowrap pointer-events-none">
                        {day.count}
                      </div>
                      {/* Bar */}
                      <div
                        className="w-full bg-brand-red/80 hover:bg-brand-red rounded-t transition-colors"
                        style={{ height: `${heightPercent}%` }}
                      />
                      {/* X-axis label (every 5th) */}
                      <span className="text-[9px] text-faint mt-1.5 rotate-[-45deg] origin-top-left whitespace-nowrap">
                        {formatShortDate(day.period)}
                      </span>
                    </div>
                  )
                })}
              </div>
            )}
          </section>

          {/* Two-column: Top Pages + Conversions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Pages */}
            <section className="bg-raised border border-line rounded-lg overflow-hidden">
              <div className="px-4 py-3 bg-sunken border-b border-line">
                <h3 className="text-[var(--text-small)] font-[600] text-foreground">
                  Top Pages
                </h3>
              </div>
              {data.topPages.length === 0 ? (
                <p className="text-muted text-[var(--text-small)] py-8 text-center">No data.</p>
              ) : (
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-line">
                      <th className="text-left px-4 py-2.5 text-[var(--text-small)] font-[600] text-muted">Page</th>
                      <th className="text-right px-4 py-2.5 text-[var(--text-small)] font-[600] text-muted w-20">Views</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.topPages.map((p, i) => (
                      <tr key={i} className="border-b border-line last:border-b-0 hover:bg-base/50 transition-colors">
                        <td className="px-4 py-2.5 text-foreground text-[var(--text-small)] font-mono truncate max-w-xs">
                          {p.page}
                        </td>
                        <td className="px-4 py-2.5 text-muted text-[var(--text-small)] text-right tabular-nums">
                          {formatNumber(p.count)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </section>

            {/* Conversions */}
            <section className="bg-raised border border-line rounded-lg overflow-hidden">
              <div className="px-4 py-3 bg-sunken border-b border-line">
                <h3 className="text-[var(--text-small)] font-[600] text-foreground">
                  Conversions
                </h3>
              </div>
              {data.conversions.length === 0 ? (
                <p className="text-muted text-[var(--text-small)] py-8 text-center">No conversions yet.</p>
              ) : (
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-line">
                      <th className="text-left px-4 py-2.5 text-[var(--text-small)] font-[600] text-muted">Type</th>
                      <th className="text-right px-4 py-2.5 text-[var(--text-small)] font-[600] text-muted w-20">Count</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.conversions.map((c, i) => (
                      <tr key={i} className="border-b border-line last:border-b-0 hover:bg-base/50 transition-colors">
                        <td className="px-4 py-2.5 text-foreground text-[var(--text-small)] capitalize">
                          {c.type || 'unknown'}
                        </td>
                        <td className="px-4 py-2.5 text-muted text-[var(--text-small)] text-right tabular-nums">
                          {formatNumber(c.count)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </section>
          </div>
        </div>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Stat Card                                                          */
/* ------------------------------------------------------------------ */

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Eye
  label: string
  value: string
}) {
  return (
    <div className="bg-raised border border-line rounded-lg p-5">
      <div className="flex items-center gap-2 text-muted mb-2">
        <Icon size={16} />
        <span className="text-[var(--text-small)]">{label}</span>
      </div>
      <p className="font-heading text-[var(--text-h3)] font-[300] text-foreground tracking-tight">
        {value}
      </p>
    </div>
  )
}
