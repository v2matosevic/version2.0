import type {
  PricingConfig,
  WizardSelections,
  PricingEstimate,
  PriceRange,
  FeatureOption,
} from '@/types/pricing'

const MINIMUM_ONETIME = 2500

/**
 * Gather all feature/integration options from the config's "features" step.
 * These are multiplied by design and timeline multipliers.
 */
function getMultipliedOptions(config: PricingConfig): FeatureOption[] {
  return config.steps.features.sections.flatMap((section) => section.options)
}

/**
 * Gather all service options from the config's "services" step.
 * These are added flat (NOT multiplied).
 */
function getFlatServiceOptions(config: PricingConfig): FeatureOption[] {
  return config.steps.services.sections.flatMap((section) => section.options)
}

/**
 * Compute the price contribution of a single addon selection.
 */
function computeAddonPrice(
  option: FeatureOption,
  quantity: number,
  projectType: string | null,
): PriceRange {
  // Free when condition met
  if (option.freeWhen && option.freeWhen.projectType === projectType) {
    return [0, 0]
  }
  return [option.price[0] * quantity, option.price[1] * quantity]
}

/**
 * Round to nearest N.
 */
function roundTo(value: number, nearest: number): number {
  return Math.round(value / nearest) * nearest
}

/**
 * Pure calculation function.
 * Takes wizard selections + pricing config, returns the estimate.
 *
 * Formula:
 * ONE-TIME = (base + features + integrations + designAddons) * designMultiplier * timelineMultiplier + services
 * MONTHLY  = sum of monthly-recurring items
 * YEARLY   = sum of yearly-recurring items
 */
function calculateEstimate(
  selections: WizardSelections,
  config: PricingConfig,
): PricingEstimate {
  // --- Base price from scope ---
  let baseMin = 0
  let baseMax = 0

  if (selections.projectType && selections.scope) {
    const scopeOptions = config.steps.scope.optionsByType[selections.projectType]
    const scopeOption = scopeOptions?.find((o) => o.id === selections.scope)
    if (scopeOption) {
      baseMin = scopeOption.basePrice[0]
      baseMax = scopeOption.basePrice[1]
    }
  }

  // --- Multiplied addons (features + integrations + design addons) ---
  let multipliedMin = 0
  let multipliedMax = 0

  // Features & integrations
  const multipliedOptions = getMultipliedOptions(config)
  for (const option of multipliedOptions) {
    const addon = selections.addons[option.id]
    if (!addon?.enabled) continue

    const quantity = addon.quantity ?? 1
    const [pMin, pMax] = computeAddonPrice(option, quantity, selections.projectType)
    multipliedMin += pMin
    multipliedMax += pMax
  }

  // Design add-ons (from design step)
  for (const designAddon of config.steps.design.addOns) {
    const addon = selections.addons[designAddon.id]
    if (!addon?.enabled) continue

    multipliedMin += designAddon.price[0]
    multipliedMax += designAddon.price[1]
  }

  // --- Multipliers ---
  const designMultiplier = selections.design
    ? (config.steps.design.options.find((o) => o.id === selections.design)?.multiplier ?? 1)
    : 1

  const timelineMultiplier = selections.timeline
    ? (config.steps.timeline.options.find((o) => o.id === selections.timeline)?.multiplier ?? 1)
    : 1

  // --- Flat services (not multiplied) ---
  let flatOneTimeMin = 0
  let flatOneTimeMax = 0
  let monthlyMin = 0
  let monthlyMax = 0
  let yearlyMin = 0
  let yearlyMax = 0

  const flatOptions = getFlatServiceOptions(config)
  for (const option of flatOptions) {
    // Maintenance is mutually exclusive — handled by maintenanceTier
    if (option.id.startsWith('maintenance_')) {
      if (option.id === selections.maintenanceTier) {
        const quantity = 1
        const [pMin, pMax] = computeAddonPrice(option, quantity, selections.projectType)
        if (option.recurring === 'monthly') {
          monthlyMin += pMin
          monthlyMax += pMax
        } else if (option.recurring === 'yearly') {
          yearlyMin += pMin
          yearlyMax += pMax
        } else {
          flatOneTimeMin += pMin
          flatOneTimeMax += pMax
        }
      }
      continue
    }

    const addon = selections.addons[option.id]
    if (!addon?.enabled) continue

    const quantity = addon.quantity ?? 1
    const [pMin, pMax] = computeAddonPrice(option, quantity, selections.projectType)

    if (option.recurring === 'monthly') {
      monthlyMin += pMin
      monthlyMax += pMax
    } else if (option.recurring === 'yearly') {
      yearlyMin += pMin
      yearlyMax += pMax
    } else {
      flatOneTimeMin += pMin
      flatOneTimeMax += pMax
    }
  }

  // --- Final one-time calculation ---
  const multipliedTotalMin = (baseMin + multipliedMin) * designMultiplier * timelineMultiplier
  const multipliedTotalMax = (baseMax + multipliedMax) * designMultiplier * timelineMultiplier

  let oneTimeMin = roundTo(multipliedTotalMin + flatOneTimeMin, 100)
  let oneTimeMax = roundTo(multipliedTotalMax + flatOneTimeMax, 100)

  // Floor enforcement
  if (oneTimeMin < MINIMUM_ONETIME && oneTimeMin > 0) {
    oneTimeMin = MINIMUM_ONETIME
  }
  if (oneTimeMax < oneTimeMin) {
    oneTimeMax = oneTimeMin
  }

  return {
    oneTime: [oneTimeMin, oneTimeMax],
    monthly: [roundTo(monthlyMin, 10), roundTo(monthlyMax, 10)],
    yearly: [roundTo(yearlyMin, 10), roundTo(yearlyMax, 10)],
  }
}

export { calculateEstimate }
