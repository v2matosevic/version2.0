import { NextRequest, NextResponse } from 'next/server'
import { validateAuth } from '@/lib/auth'
import { startBuild } from '@/lib/build-pipeline'
import { initDatabase } from '@/db/init'

export function POST(request: NextRequest): NextResponse {
  const authError = validateAuth(request)
  if (authError) return authError
  initDatabase()

  const result = startBuild('api')

  if ('error' in result) {
    return NextResponse.json({ success: false, error: result.error }, { status: 409 })
  }

  return NextResponse.json({ success: true, buildId: result.buildId })
}
