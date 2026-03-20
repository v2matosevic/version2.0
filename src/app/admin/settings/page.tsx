'use client'

import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Settings, Hammer, Loader2 } from 'lucide-react'
import { SystemInfoCard, type SystemInfo } from '@/components/admin/settings/system-info'
import { BuildHistory, type BuildEntry } from '@/components/admin/settings/build-history'

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
      if (sysRes.status === 401 || buildsRes.status === 401) { router.push('/admin/login?from=/admin/settings'); return }
      if (!sysRes.ok) throw new Error('Failed to fetch system info')
      if (!buildsRes.ok) throw new Error('Failed to fetch build history')
      setSystem(await sysRes.json())
      const buildsData = await buildsRes.json()
      setBuilds(buildsData.builds)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load settings')
    } finally {
      setLoading(false)
    }
  }, [router])

  useEffect(() => { fetchAll() }, [fetchAll])

  async function handleTriggerBuild(): Promise<void> {
    setBuildTriggering(true)
    setBuildResult(null)
    try {
      const res = await fetch('/api/admin/settings', { method: 'POST' })
      const data = await res.json()
      if (!res.ok) { setBuildResult({ success: false, message: data.error || 'Build trigger failed' }); return }
      setBuildResult({ success: true, message: `Build started (ID: ${data.buildId})` })
      setTimeout(() => {
        fetch('/api/admin/builds').then((r) => r.json()).then((d) => setBuilds(d.builds)).catch(() => {})
      }, 2000)
    } catch {
      setBuildResult({ success: false, message: 'Network error' })
    } finally {
      setBuildTriggering(false)
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-[var(--text-h3)] font-[300] tracking-[var(--tracking-h3)] text-foreground flex items-center gap-3">
          <Settings size={24} className="text-muted" /> Settings
        </h1>
        <p className="text-muted text-[var(--text-small)] mt-1">System information and build management</p>
      </div>

      {error && (
        <div className="mb-6 px-4 py-3 bg-brand-red/10 border border-brand-red/20 rounded-lg text-brand-red text-[var(--text-small)]">{error}</div>
      )}

      {loading && (
        <div className="flex items-center justify-center py-20 text-muted">
          <Loader2 size={24} className="animate-spin" />
          <span className="ml-3 text-[var(--text-small)]">Loading settings...</span>
        </div>
      )}

      {!loading && (
        <div className="space-y-8">
          {system && <SystemInfoCard system={system} />}

          <section className="bg-raised border border-line rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-heading text-[var(--text-h4)] font-[700] text-foreground flex items-center gap-2">
                  <Hammer size={16} className="text-brand-red" /> Trigger Build
                </h2>
                <p className="text-muted text-[var(--text-small)] mt-1">Run a production build of the site</p>
              </div>
              <button onClick={handleTriggerBuild} disabled={buildTriggering} className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-red text-white text-[var(--text-small)] font-[600] rounded-lg hover:bg-brand-red-light active:bg-brand-red-dark transition-colors disabled:opacity-50">
                {buildTriggering ? <Loader2 size={16} className="animate-spin" /> : <Hammer size={16} />}
                {buildTriggering ? 'Starting...' : 'Start Build'}
              </button>
            </div>
            {buildResult && (
              <div className={`mt-4 px-4 py-3 rounded-lg text-[var(--text-small)] ${buildResult.success ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400' : 'bg-brand-red/10 border border-brand-red/20 text-brand-red'}`}>
                {buildResult.message}
              </div>
            )}
          </section>

          <BuildHistory builds={builds} />
        </div>
      )}
    </div>
  )
}
