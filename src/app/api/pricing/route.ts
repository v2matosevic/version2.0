import { NextRequest, NextResponse } from 'next/server'
import { pricingSchema } from '@/lib/validation/schemas/pricing-schema'
import { parseZodErrors } from '@/lib/parse-zod-errors'
import { rateLimit } from '@/lib/rate-limiter'
import { getClientIp } from '@/lib/client-ip'
import { generateId } from '@/lib/generate-id'
import { sendEmail } from '@/lib/email'
import { reportError } from '@/lib/monitoring'
import { pricingNotification } from '@/lib/notification-emails'
import { calculateEstimate } from '@/lib/pricing/calculate-estimate'
import { PRICING_CONFIG } from '@/lib/pricing/load-pricing-config'
import { validateRequestOrigin } from '@/lib/request-origin'
import { db, schema } from '@/db'
import { initDatabase } from '@/db/init'
import type { WizardSelections, AddonSelection } from '@/types/pricing'
import type { PricingSelections } from '@/lib/validation/schemas/pricing-schema'

const TEAM_EMAIL = process.env.TEAM_EMAIL ?? 'info@version2.hr'

/**
 * Convert flat API selections format to internal WizardSelections.
 */
function toWizardSelections(sel: PricingSelections): WizardSelections {
  const addons: Record<string, AddonSelection> = {}

  const allIds = [
    ...sel.features,
    ...sel.ecommerce,
    ...sel.integrations,
    ...sel.designAddons,
    ...sel.services,
  ]

  for (const id of allIds) {
    const qty =
      sel.featureQuantities[id] ??
      sel.integrationQuantities[id] ??
      sel.serviceQuantities[id] ??
      1
    addons[id] = { enabled: true, quantity: qty }
  }

  return {
    projectType: sel.projectType,
    scope: sel.scope,
    design: sel.design,
    timeline: sel.timeline,
    addons,
    maintenanceTier: sel.maintenance,
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  initDatabase()

  const originError = validateRequestOrigin(request)
  if (originError) return originError

  const ip = getClientIp(request)
  const rateLimited = rateLimit(ip, 'pricing', { windowMs: 60_000, maxRequests: 10 })
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

  const parseResult = pricingSchema.safeParse(body)
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

  // Server-side recalculation
  const wizardSelections = toWizardSelections(data.selections)
  const serverEstimate = calculateEstimate(wizardSelections, PRICING_CONFIG)

  const clientEst = data.calculatedEstimate
  const hasMismatch =
    clientEst.oneTime[0] !== serverEstimate.oneTime[0] ||
    clientEst.oneTime[1] !== serverEstimate.oneTime[1] ||
    clientEst.monthly[0] !== serverEstimate.monthly[0] ||
    clientEst.monthly[1] !== serverEstimate.monthly[1] ||
    clientEst.yearly[0] !== serverEstimate.yearly[0] ||
    clientEst.yearly[1] !== serverEstimate.yearly[1]

  if (hasMismatch) {
    console.warn('[Pricing] Client/server estimate mismatch:', {
      client: clientEst,
      server: serverEstimate,
    })
  }

  const id = generateId('est')

  db.insert(schema.pricingLeads).values({
    id,
    name: data.name,
    email: data.email,
    message: data.message,
    language: data.language,
    selections: JSON.stringify(data.selections),
    clientEstimate: JSON.stringify(clientEst),
    serverEstimate: JSON.stringify(serverEstimate),
    hasMismatch,
    ip,
  }).run()

  try {
    await sendEmail({
      to: TEAM_EMAIL,
      subject: `[Version2] New Pricing Estimate from ${data.name} (${id})`,
      html: pricingNotification({
        id,
        name: data.name,
        email: data.email,
        message: data.message,
        language: data.language,
        selections: data.selections as unknown as Record<string, unknown>,
        estimate: serverEstimate,
      }),
    })
  } catch (err) {
    reportError(err, { scope: 'Pricing email send failed', extras: { id, ip, hasMismatch } })
  }

  return NextResponse.json({
    success: true,
    id,
    validatedEstimate: serverEstimate,
  })
}
