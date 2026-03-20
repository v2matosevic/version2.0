import { NextRequest, NextResponse } from 'next/server'
import { careerPayloadSchema } from '@/lib/validation/schemas/career-schema'
import { parseZodErrors } from '@/lib/parse-zod-errors'
import { rateLimit } from '@/lib/rate-limiter'
import { getClientIp } from '@/lib/client-ip'
import { generateId } from '@/lib/generate-id'
import { sendEmail } from '@/lib/email'
import { careerNotification } from '@/lib/notification-emails'
import { db, schema } from '@/db'
import { ensureDatabase } from '@/db/migrate'

let dbReady = false

const TEAM_EMAIL = process.env.TEAM_EMAIL ?? 'info@version2.hr'

export async function POST(request: NextRequest): Promise<NextResponse> {
  if (!dbReady) { ensureDatabase(); dbReady = true }

  const ip = getClientIp(request)
  const rateLimited = rateLimit(ip, 'career', { windowMs: 60_000, maxRequests: 3 })
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

  const parseResult = careerPayloadSchema.safeParse(body)
  if (!parseResult.success) {
    return NextResponse.json(
      { success: false, errors: parseZodErrors(parseResult.error) },
      { status: 400 },
    )
  }

  const data = parseResult.data

  if (data._honey) {
    return NextResponse.json({ success: true })
  }

  const id = generateId('app')

  db.insert(schema.careerApps).values({
    id,
    name: data.name,
    email: data.email,
    portfolioUrl: data.portfolioUrl,
    message: data.message,
    language: data.language,
    ip,
  }).run()

  try {
    await sendEmail({
      to: TEAM_EMAIL,
      subject: `[Version2] New Career Application from ${data.name}`,
      html: careerNotification({
        id,
        name: data.name,
        email: data.email,
        portfolioUrl: data.portfolioUrl,
        message: data.message,
        language: data.language,
      }),
    })
  } catch (err) {
    console.error('[Career] Email send failed:', err)
  }

  return NextResponse.json({ success: true, id })
}
