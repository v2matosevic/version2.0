import { NextRequest, NextResponse } from 'next/server'
import { analyticsEventsSchema } from '@/lib/validation/schemas/analytics-schema'
import { parseZodErrors } from '@/lib/parse-zod-errors'
import { rateLimit } from '@/lib/rate-limiter'
import { getClientIp } from '@/lib/client-ip'
import { generateId } from '@/lib/generate-id'
import { db, schema } from '@/db'
import { initDatabase } from '@/db/init'

export async function POST(request: NextRequest): Promise<NextResponse> {
  initDatabase()

  const ip = getClientIp(request)
  const rateLimited = rateLimit(ip, 'analytics', { windowMs: 60_000, maxRequests: 100 })
  if (rateLimited) return rateLimited

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid JSON body' }, { status: 400 })
  }

  const parseResult = analyticsEventsSchema.safeParse(body)
  if (!parseResult.success) {
    return NextResponse.json({ success: false, errors: parseZodErrors(parseResult.error) }, { status: 400 })
  }

  const { events } = parseResult.data

  for (const event of events) {
    db.insert(schema.analyticsEvents).values({
      id: generateId('evt'),
      type: event.type,
      page: event.page,
      data: event.data ? JSON.stringify(event.data) : null,
      sessionId: event.sessionId,
      timestamp: event.timestamp,
      ip,
    }).run()
  }

  return NextResponse.json({ received: events.length })
}
