import { NextRequest, NextResponse } from 'next/server'
import path from 'node:path'
import { validateAdminCookie } from '@/lib/admin-auth'
import { startBuild } from '@/lib/build-pipeline'

export function GET(request: NextRequest): NextResponse {
  const authError = validateAdminCookie(request)
  if (authError) return authError

  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const nextPkg = require('next/package.json') as { version: string }

  return NextResponse.json({
    success: true,
    nodeVersion: process.version,
    nextVersion: nextPkg.version,
    dbPath: path.join(process.cwd(), 'data', 'version2.db'),
    uptime: process.uptime(),
  })
}

export function POST(request: NextRequest): NextResponse {
  const authError = validateAdminCookie(request)
  if (authError) return authError

  const result = startBuild('admin-settings')

  if ('error' in result) {
    return NextResponse.json(
      { success: false, error: result.error },
      { status: 409 },
    )
  }

  return NextResponse.json({ success: true, buildId: result.buildId })
}
