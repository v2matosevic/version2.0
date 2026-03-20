import { NextResponse } from 'next/server'
import { draftMode } from 'next/headers'

export async function POST(): Promise<NextResponse> {
  const draft = await draftMode()
  draft.disable()

  return NextResponse.json({ success: true, draftMode: false })
}
