'use client'

import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, Users, Target, Loader2 } from 'lucide-react'
import { StatCard } from '@/components/admin/stat-card'
import { AnalyticsChart } from '@/components/admin/analytics-chart'
import { TopPagesTable, ConversionsTable } from '@/components/admin/analytics-tables'
import type { DayView } from '@/components/admin/analytics-chart'
import type { TopPage, Conversion } from '@/components/admin/analytics-tables'

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

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-[var(--text-h3)] font-[300] tracking-[var(--tracking-h3)] text-foreground">Analytics</h1>
        <p className="text-muted text-[var(--text-small)] mt-1">Site traffic and conversion data</p>
      </div>

      {error && (
        <div className="mb-6 px-4 py-3 bg-brand-red/10 border border-brand-red/20 rounded-lg text-brand-red text-[var(--text-small)]">{error}</div>
      )}

      {loading && (
        <div className="flex items-center justify-center py-20 text-muted">
          <Loader2 size={24} className="animate-spin" />
          <span className="ml-3 text-[var(--text-small)]">Loading analytics...</span>
        </div>
      )}

      {!loading && data && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatCard icon={Eye} label="Total Views" value={formatNumber(data.totalViews)} />
            <StatCard icon={Users} label="Unique Sessions" value={formatNumber(data.uniqueSessions)} />
            <StatCard icon={Target} label="Total Conversions" value={formatNumber(totalConversions)} />
          </div>

          <AnalyticsChart viewsByDay={data.viewsByDay} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TopPagesTable pages={data.topPages} />
            <ConversionsTable conversions={data.conversions} />
          </div>
        </div>
      )}
    </div>
  )
}
