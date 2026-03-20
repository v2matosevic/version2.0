import { NextRequest, NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'
import { validateAuth } from '@/lib/auth'
import { db, schema } from '@/db'
import { ensureDatabase } from '@/db/migrate'

let dbReady = false

type RouteParams = { params: Promise<{ id: string }> }

export async function GET(request: NextRequest, { params }: RouteParams): Promise<NextResponse> {
  const authError = validateAuth(request)
  if (authError) return authError
  if (!dbReady) { ensureDatabase(); dbReady = true }

  const { id } = await params

  const build = db.select().from(schema.buildLogs).where(eq(schema.buildLogs.id, id)).get()

  if (!build) {
    return NextResponse.json({ success: false, error: 'Build not found' }, { status: 404 })
  }

  return NextResponse.json({ build })
}
