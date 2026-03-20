'use client'

import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Settings,
  Server,
  Database,
  Clock,
  Hammer,
  Loader2,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from 'lucide-react'

interface SystemInfo {
  nodeVersion: string
  nextVersion: string
  dbPath: string
  uptime: number
}

interface BuildEntry {
  id: string
  status: string
  triggeredBy: string | null
  durationMs: number | null
  createdAt: string
}

const BUILD_STATUS_BADGE: Record<string, string> = {
  success: 'bg-emerald-500/15 text-emerald-400',
  failed: 'bg-red-500/15 text-red-400',
  running: 'bg-amber-500/15 text-amber-400',
}

const BUILD_STATUS_ICON: Record<string, typeof CheckCircle2> = {
  success: CheckCircle2,
  failed: XCircle,
  running: Loader2,
}

function formatUptime(seconds: number): string {
  const days = Math.floor(seconds / 86400)
  const hours = Math.floor((seconds % 86400) / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const parts: string[] = []
  if (days > 0) parts.push(`${days}d`)
  if (hours > 0) parts.push(`${hours}h`)
  parts.push(`${minutes}m`)
  return parts.join(' ')
}

function formatDuration(ms: number | null): string {
  if (ms === null) return '--'
  if (ms < 1000) return `${ms}ms`
  return `${(ms / 1000).toFixed(1)}s`
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function AdminSettingsPage() {
  const router = useRouter()
  const [system, setSystem] = useState<SystemInfo | null>(null)
  const [builds, setBuilds] = useState<BuildEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [buildTriggering, setBuildTriggering] = useState(false)
  const [buildResult, setBuildResult] = useState<{ success: boolean; message: string } | null>(null)

  const fetchAll = useCallback(async (): Promise<void> => {
    setLoading(true)
    setError('')
    try {
      const [sysRes, buildsRes] = await Promise.all([
        fetch('/api/admin/settings'),
        fetch('/api/admin/builds'),
      ])

      if (sysRes.status === 401 || buildsRes.status === 401) {
        router.push('/admin/login?from=/admin/settings')
        return
      }

      if (!sysRes.ok) throw new Error('Failed to fetch system info')
      if (!buildsRes.ok) throw new Error('Failed to fetch build history')

      const sysData = await sysRes.json()
      const buildsData = await buildsRes.json()

      setSystem(sysData)
      setBuilds(buildsData.builds)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load settings')
    } finally {
      setLoading(false)
    }
  }, [router])

  useEffect(() => {
    fetchAll()
  }, [fetchAll])

  async function handleTriggerBuild(): Promise<void> {
    setBuildTriggering(true)
    setBuildResult(null)
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
      })
      const data = await res.json()

      if (!res.ok) {
        setBuildResult({ success: false, message: data.error || 'Build trigger failed' })
        return
      }

      setBuildResult({ success: true, message: `Build started (ID: ${data.buildId})` })
      // Refresh builds list after a short delay
      setTimeout(() => {
        fetch('/api/admin/builds')
          .then((r) => r.json())
          .then((d) => setBuilds(d.builds))
          .catch(() => { /* silent refresh failure */ })
      }, 2000)
    } catch {
      setBuildResult({ success: false, message: 'Network error' })
    } finally {
      setBuildTriggering(false)
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-heading text-[var(--text-h3)] font-[300] tracking-[var(--tracking-h3)] text-foreground flex items-center gap-3">
          <Settings size={24} className="text-muted" />
          Settings
        </h1>
        <p className="text-muted text-[var(--text-small)] mt-1">
          System information and build management
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
          <span className="ml-3 text-[var(--text-small)]">Loading settings...</span>
        </div>
      )}

      {/* Content */}
      {!loading && (
        <div className="space-y-8">
          {/* System Info Card */}
          {system && (
            <section className="bg-raised border border-line rounded-lg p-6">
              <h2 className="font-heading text-[var(--text-h4)] font-[700] text-foreground mb-5 flex items-center gap-2">
                <Server size={16} className="text-brand-red" />
                System Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InfoRow icon={Server} label="Node.js" value={system.nodeVersion} />
                <InfoRow icon={AlertCircle} label="Next.js" value={`v${system.nextVersion}`} />
                <InfoRow icon={Database} label="Database" value={system.dbPath} mono />
                <InfoRow icon={Clock} label="Uptime" value={formatUptime(system.uptime)} />
              </div>
            </section>
          )}

          {/* Trigger Build */}
          <section className="bg-raised border border-line rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-heading text-[var(--text-h4)] font-[700] text-foreground flex items-center gap-2">
                  <Hammer size={16} className="text-brand-red" />
                  Trigger Build
                </h2>
                <p className="text-muted text-[var(--text-small)] mt-1">
                  Run a production build of the site
                </p>
              </div>
              <button
                onClick={handleTriggerBuild}
                disabled={buildTriggering}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-red text-white text-[var(--text-small)] font-[600] rounded-lg hover:bg-brand-red-light active:bg-brand-red-dark transition-colors disabled:opacity-50"
              >
                {buildTriggering ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Hammer size={16} />
                )}
                {buildTriggering ? 'Starting...' : 'Start Build'}
              </button>
            </div>
            {buildResult && (
              <div
                className={`mt-4 px-4 py-3 rounded-lg text-[var(--text-small)] ${
                  buildResult.success
                    ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
                    : 'bg-brand-red/10 border border-brand-red/20 text-brand-red'
                }`}
              >
                {buildResult.message}
              </div>
            )}
          </section>

          {/* Build History */}
          <section>
            <h2 className="font-heading text-[var(--text-h4)] font-[700] text-foreground mb-4 flex items-center gap-2">
              <Clock size={16} className="text-muted" />
              Build History
            </h2>

            {builds.length === 0 ? (
              <p className="text-muted text-[var(--text-small)] py-8 text-center bg-raised border border-line rounded-lg">
                No builds yet.
              </p>
            ) : (
              <div className="border border-line rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-sunken border-b border-line">
                      <th className="text-left px-4 py-3 text-[var(--text-small)] font-[600] text-muted w-28">Status</th>
                      <th className="text-left px-4 py-3 text-[var(--text-small)] font-[600] text-muted">Triggered By</th>
                      <th className="text-left px-4 py-3 text-[var(--text-small)] font-[600] text-muted w-24">Duration</th>
                      <th className="text-left px-4 py-3 text-[var(--text-small)] font-[600] text-muted w-44">Created</th>
                    </tr>
                  </thead>
                  <tbody>
                    {builds.map((build) => {
                      const StatusIcon = BUILD_STATUS_ICON[build.status]
                      return (
                        <tr
                          key={build.id}
                          className="bg-raised border-b border-line last:border-b-0 hover:bg-raised/80 transition-colors"
                        >
                          <td className="px-4 py-3">
                            <span
                              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[var(--text-small)] font-[500] ${
                                BUILD_STATUS_BADGE[build.status] || 'bg-white/5 text-muted'
                              }`}
                            >
                              {StatusIcon && (
                                <StatusIcon
                                  size={13}
                                  className={build.status === 'running' ? 'animate-spin' : ''}
                                />
                              )}
                              {build.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-foreground text-[var(--text-small)]">
                            {build.triggeredBy || '--'}
                          </td>
                          <td className="px-4 py-3 text-muted text-[var(--text-small)] tabular-nums">
                            {formatDuration(build.durationMs)}
                          </td>
                          <td className="px-4 py-3 text-muted text-[var(--text-small)]">
                            {formatDate(build.createdAt)}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Info Row                                                           */
/* ------------------------------------------------------------------ */

function InfoRow({
  icon: Icon,
  label,
  value,
  mono = false,
}: {
  icon: typeof Server
  label: string
  value: string
  mono?: boolean
}) {
  return (
    <div className="flex items-start gap-3">
      <Icon size={16} className="text-muted mt-0.5 shrink-0" />
      <div>
        <p className="text-[var(--text-small)] text-muted">{label}</p>
        <p
          className={`text-foreground text-[var(--text-body)] ${
            mono ? 'font-mono text-[var(--text-small)] break-all' : ''
          }`}
        >
          {value}
        </p>
      </div>
    </div>
  )
}
