import { exec } from 'node:child_process'
import { db, schema } from '@/db'
import { eq } from 'drizzle-orm'
import { generateId } from '@/lib/generate-id'

const BUILD_TIMEOUT_MS = 5 * 60 * 1000
const LOCK_STALE_MS = 10 * 60 * 1000

let currentBuildId: string | null = null
let currentBuildStarted: number | null = null

export function isBuildRunning(): boolean {
  if (!currentBuildId || !currentBuildStarted) return false

  // Check for stale lock
  if (Date.now() - currentBuildStarted > LOCK_STALE_MS) {
    currentBuildId = null
    currentBuildStarted = null
    return false
  }

  return true
}

/**
 * Start an async build. Returns the build ID immediately.
 * The build runs in the background; poll GET /api/cms/builds/[id] for status.
 */
export function startBuild(triggeredBy: string): { buildId: string } | { error: string } {
  if (isBuildRunning()) {
    return { error: 'A build is already in progress' }
  }

  const buildId = generateId('build')
  currentBuildId = buildId
  currentBuildStarted = Date.now()

  db.insert(schema.buildLogs).values({
    id: buildId,
    status: 'running',
    triggeredBy,
  }).run()

  const startTime = Date.now()

  exec('npm run build', { timeout: BUILD_TIMEOUT_MS, cwd: process.cwd() }, (error, stdout, stderr) => {
    const durationMs = Date.now() - startTime
    const status = error ? 'failed' : 'success'

    db.update(schema.buildLogs)
      .set({
        status,
        stdout: stdout.slice(0, 50_000),
        stderr: stderr.slice(0, 50_000),
        durationMs,
        updatedAt: new Date().toISOString(),
      })
      .where(eq(schema.buildLogs.id, buildId))
      .run()

    currentBuildId = null
    currentBuildStarted = null
  })

  return { buildId }
}
