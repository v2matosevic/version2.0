import { NextRequest, NextResponse } from 'next/server'
import { draftMode } from 'next/headers'
import { validateAuth } from '@/lib/auth'

export async function POST(request: NextRequest): Promise<NextResponse> {
  const authError = validateAuth(request)
  if (authError) return authError

  const draft = await draftMode()
  draft.enable()

  return NextResponse.json({ success: true, draftMode: true })
}
