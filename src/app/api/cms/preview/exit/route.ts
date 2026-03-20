import { NextRequest, NextResponse } from 'next/server'
import { draftMode } from 'next/headers'
import { validateAdminCookie } from '@/lib/admin-auth'

export async function POST(request: NextRequest): Promise<NextResponse> {
  const authError = validateAdminCookie(request)
  if (authError) return authError

  const draft = await draftMode()
  draft.disable()

  return NextResponse.json({ success: true, draftMode: false })
}
