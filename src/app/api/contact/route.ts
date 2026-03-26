import { NextRequest, NextResponse } from 'next/server'
import { contactPayloadSchema, analysisPayloadSchema } from '@/lib/validation/schemas/contact-schema'
import { parseZodErrors } from '@/lib/parse-zod-errors'
import { rateLimit } from '@/lib/rate-limiter'
import { getClientIp } from '@/lib/client-ip'
import { generateId } from '@/lib/generate-id'
import { sendEmail } from '@/lib/email'
import { contactNotification } from '@/lib/notification-emails'
import { reportError } from '@/lib/monitoring'
import { validateRequestOrigin } from '@/lib/request-origin'
import { db, schema } from '@/db'
import { initDatabase } from '@/db/init'

const TEAM_EMAIL = process.env.TEAM_EMAIL ?? 'info@version2.hr'

export async function POST(request: NextRequest): Promise<NextResponse> {
  initDatabase()

  const originError = validateRequestOrigin(request)
  if (originError) return originError

  const ip = getClientIp(request)
  const rateLimited = rateLimit(ip, 'contact', { windowMs: 60_000, maxRequests: 5 })
  if (rateLimited) return rateLimited

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid JSON body' },
      { status: 400 },
    )
  }

  const raw = body as Record<string, unknown>
  const isAnalysis = raw.type === 'analysis'

  const parseResult = isAnalysis
    ? analysisPayloadSchema.safeParse(body)
    : contactPayloadSchema.safeParse(body)

  if (!parseResult.success) {
    return NextResponse.json(
      { success: false, errors: parseZodErrors(parseResult.error) },
      { status: 400 },
    )
  }

  const data = parseResult.data

  // Honeypot check — fake success for bots
  if (data._honey) {
    return NextResponse.json({ success: true })
  }

  const id = generateId('cnt')

  db.insert(schema.contacts).values({
    id,
    name: data.name,
    email: data.email,
    message: isAnalysis ? ((data as { message?: string }).message ?? '') : (data as { message: string }).message,
    type: isAnalysis ? 'analysis' : 'contact',
    websiteUrl: isAnalysis ? (data as { websiteUrl: string }).websiteUrl : undefined,
    language: data.language,
    ip,
  }).run()

  try {
    await sendEmail({
      to: TEAM_EMAIL,
      subject: isAnalysis
        ? `[Version2] New Analysis Request from ${data.name}`
        : `[Version2] New Contact from ${data.name}`,
      html: contactNotification({
        id,
        name: data.name,
        email: data.email,
        message: isAnalysis ? ((data as { message?: string }).message ?? 'No message') : (data as { message: string }).message,
        type: isAnalysis ? 'analysis' : 'contact',
        websiteUrl: isAnalysis ? (data as { websiteUrl: string }).websiteUrl : undefined,
        language: data.language,
      }),
    })
  } catch (err) {
    reportError(err, { scope: 'Contact email send failed', extras: { id, ip } })
  }

  return NextResponse.json({ success: true, id })
}
