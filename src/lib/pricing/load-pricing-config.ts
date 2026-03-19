import type { PricingConfig } from '@/types/pricing'
import rawConfig from '@content/pricing-config.json'

/**
 * Load and type-assert the pricing config.
 *
 * JSON arrays are inferred as `number[]` by TypeScript, but our types use
 * tuple `[number, number]` for price ranges. The JSON structure is validated
 * at authoring time, so the cast through `unknown` is safe here.
 */
function loadPricingConfig(): PricingConfig {
  return rawConfig as unknown as PricingConfig
}

const PRICING_CONFIG = loadPricingConfig()

export { PRICING_CONFIG, loadPricingConfig }
