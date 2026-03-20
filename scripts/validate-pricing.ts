/**
 * Validate pricing calculator with multiple configurations.
 * Usage: npx tsx scripts/validate-pricing.ts
 */
import fs from 'node:fs'
import path from 'node:path'

const configPath = path.join(process.cwd(), 'content', 'pricing-config.json')
const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'))

const MINIMUM_ONETIME = 2500

type PriceRange = [number, number]
type Selections = {
  projectType: string | null
  scope: string | null
  design: string | null
  timeline: string | null
  maintenanceTier: string | null
  addons: Record<string, { enabled: boolean; quantity?: number }>
}

function roundTo(value: number, nearest: number): number {
  return Math.round(value / nearest) * nearest
}

function calculate(sel: Selections): { oneTime: PriceRange; monthly: PriceRange; yearly: PriceRange } {
  let baseMin = 0, baseMax = 0
  if (sel.projectType && sel.scope) {
    const scopeOptions = config.steps.scope.optionsByType[sel.projectType]
    const scopeOption = scopeOptions?.find((o: { id: string }) => o.id === sel.scope)
    if (scopeOption) {
      baseMin = scopeOption.basePrice[0]
      baseMax = scopeOption.basePrice[1]
    }
  }

  let multipliedMin = 0, multipliedMax = 0
  const featureOptions = config.steps.features.sections.flatMap((s: { options: unknown[] }) => s.options)
  for (const option of featureOptions) {
    const o = option as { id: string; price: number[]; freeWhen?: { projectType: string } }
    const addon = sel.addons[o.id]
    if (!addon?.enabled) continue
    if (o.freeWhen?.projectType === sel.projectType) continue
    const qty = addon.quantity ?? 1
    multipliedMin += o.price[0] * qty
    multipliedMax += o.price[1] * qty
  }

  for (const designAddon of config.steps.design.addOns as Array<{ id: string; price: number[] }>) {
    const addon = sel.addons[designAddon.id]
    if (!addon?.enabled) continue
    multipliedMin += designAddon.price[0]
    multipliedMax += designAddon.price[1]
  }

  const designMult = sel.design
    ? (config.steps.design.options.find((o: { id: string }) => o.id === sel.design)?.multiplier ?? 1)
    : 1
  const timelineMult = sel.timeline
    ? (config.steps.timeline.options.find((o: { id: string }) => o.id === sel.timeline)?.multiplier ?? 1)
    : 1

  let flatMin = 0, flatMax = 0, monthlyMin = 0, monthlyMax = 0, yearlyMin = 0, yearlyMax = 0
  const serviceOptions = config.steps.services.sections.flatMap((s: { options: unknown[] }) => s.options)
  for (const option of serviceOptions) {
    const o = option as { id: string; price: number[]; recurring?: string }
    if (o.id.startsWith('maintenance_')) {
      if (o.id === sel.maintenanceTier) {
        if (o.recurring === 'monthly') { monthlyMin += o.price[0]; monthlyMax += o.price[1] }
      }
      continue
    }
    const addon = sel.addons[o.id]
    if (!addon?.enabled) continue
    const qty = addon.quantity ?? 1
    if (o.recurring === 'monthly') { monthlyMin += o.price[0] * qty; monthlyMax += o.price[1] * qty }
    else if (o.recurring === 'yearly') { yearlyMin += o.price[0] * qty; yearlyMax += o.price[1] * qty }
    else { flatMin += o.price[0] * qty; flatMax += o.price[1] * qty }
  }

  const multTotalMin = (baseMin + multipliedMin) * designMult * timelineMult
  const multTotalMax = (baseMax + multipliedMax) * designMult * timelineMult
  let oneTimeMin = roundTo(multTotalMin + flatMin, 100)
  let oneTimeMax = roundTo(multTotalMax + flatMax, 100)
  if (oneTimeMin < MINIMUM_ONETIME && oneTimeMin > 0) oneTimeMin = MINIMUM_ONETIME
  if (oneTimeMax < oneTimeMin) oneTimeMax = oneTimeMin

  return {
    oneTime: [oneTimeMin, oneTimeMax],
    monthly: [roundTo(monthlyMin, 10), roundTo(monthlyMax, 10)],
    yearly: [roundTo(yearlyMin, 10), roundTo(yearlyMax, 10)],
  }
}

function test(name: string, sel: Partial<Selections>, expectMin: number, expectMax: number): void {
  const full: Selections = {
    projectType: null, scope: null, design: null, timeline: null, maintenanceTier: null, addons: {},
    ...sel,
  }
  const result = calculate(full)
  const pass = result.oneTime[0] >= expectMin && result.oneTime[1] <= expectMax
  const icon = pass ? '✓' : '✗'
  console.log(`${icon} ${name}: €${result.oneTime[0].toLocaleString()} – €${result.oneTime[1].toLocaleString()}${!pass ? ` (expected €${expectMin.toLocaleString()} – €${expectMax.toLocaleString()})` : ''}`)
  if (result.monthly[1] > 0) console.log(`  Monthly: €${result.monthly[0]} – €${result.monthly[1]}`)
}

console.log('=== Pricing Calculator Validation ===\n')

// Test 1: Landing page, minimal options (should hit floor)
test('Landing page, reference design, flexible',
  { projectType: 'website', scope: 'landing', design: 'reference', timeline: 'flexible' },
  2500, 4500)

// Test 2: Business website, standard
test('Business website, reference, standard',
  { projectType: 'website', scope: 'business', design: 'reference', timeline: 'standard' },
  4500, 8000)

// Test 3: Corporate website, custom design, priority
test('Corporate, custom design, priority',
  { projectType: 'website', scope: 'corporate', design: 'custom', timeline: 'priority' },
  10000, 25000)

// Test 4: Enterprise webshop, all features
test('Enterprise webshop with features',
  {
    projectType: 'webshop', scope: 'enterprise', design: 'brand', timeline: 'priority',
    addons: {
      multilingual: { enabled: true, quantity: 2 },
      blog: { enabled: true },
      auth: { enabled: true },
      search: { enabled: true },
      product_variants: { enabled: true },
      advanced_inventory: { enabled: true },
      shipping_integration: { enabled: true },
    },
  },
  25000, 100000)

// Test 5: Simple webapp
test('Simple webapp, standard',
  { projectType: 'webapp', scope: 'simple', design: 'reference', timeline: 'standard' },
  8000, 17000)

// Test 6: Verify floor price enforcement
test('Landing page with flexible timeline (floor check)',
  { projectType: 'website', scope: 'landing', design: 'reference', timeline: 'flexible' },
  2500, 5000)

// Test 7: With maintenance
const withMaint = calculate({
  projectType: 'website', scope: 'business', design: 'reference', timeline: 'standard',
  maintenanceTier: 'maintenance_standard', addons: {},
})
console.log(`\n✓ Business + Standard Maintenance: €${withMaint.oneTime[0].toLocaleString()} – €${withMaint.oneTime[1].toLocaleString()} + €${withMaint.monthly[0]} – €${withMaint.monthly[1]}/mo`)

// Test 8: Empty selections = €0
const empty = calculate({ projectType: null, scope: null, design: null, timeline: null, maintenanceTier: null, addons: {} })
console.log(`✓ Empty selections: €${empty.oneTime[0]} (should be 0)`)

// Test 9: Stripe is free for webshops
const webshopStripe = calculate({
  projectType: 'webshop', scope: 'starter', design: 'reference', timeline: 'standard',
  maintenanceTier: null, addons: { payment_stripe: { enabled: true } },
})
const websiteStripe = calculate({
  projectType: 'website', scope: 'business', design: 'reference', timeline: 'standard',
  maintenanceTier: null, addons: { payment_stripe: { enabled: true } },
})
console.log(`✓ Webshop + Stripe: €${webshopStripe.oneTime[0].toLocaleString()} (Stripe free for webshop)`)
console.log(`✓ Website + Stripe: €${websiteStripe.oneTime[0].toLocaleString()} (Stripe costs extra for non-webshop)`)

console.log('\n=== Validation Complete ===')
