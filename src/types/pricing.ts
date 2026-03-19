/* ============================================================
   Pricing Wizard Types
   Maps to content/pricing-config.json structure
   ============================================================ */

export type PriceRange = [min: number, max: number]

/* --- Config shape (mirrors JSON) --- */

export type ProjectTypeId = 'website' | 'webshop' | 'webapp' | 'other'
export type ScopeId = string
export type DesignId = 'reference' | 'custom' | 'brand'
export type TimelineId = 'flexible' | 'standard' | 'priority'
export type MaintenanceTierId = 'maintenance_none' | 'maintenance_basic' | 'maintenance_standard' | 'maintenance_premium'

export type ProjectTypeOption = {
  id: ProjectTypeId
  label: string
  description: string
  icon: string
  redirectsToContact?: boolean
}

export type ScopeOption = {
  id: string
  label: string
  detail: string
  description: string
  basePrice: PriceRange
  includes?: string
}

export type DesignOption = {
  id: DesignId
  label: string
  description: string
  detail: string
  multiplier: number
}

export type DesignAddon = {
  id: string
  label: string
  description: string
  price: PriceRange
  icon: string
}

export type TimelineOption = {
  id: TimelineId
  label: string
  description: string
  detail: string
  multiplier: number
  badge: string
}

export type ShowWhenCondition = {
  projectType: ProjectTypeId
}

export type FreeWhenCondition = {
  projectType: ProjectTypeId
}

export type FeatureOption = {
  id: string
  label: string
  description: string
  price: PriceRange
  icon: string
  perUnit?: string
  hasQuantity?: boolean
  minQuantity?: number
  maxQuantity?: number
  requiresFeature?: string
  freeWhen?: FreeWhenCondition
  recurring?: 'monthly' | 'yearly'
  note?: string
  isDefault?: boolean
}

export type FeatureSection = {
  id: string
  label: string
  options: FeatureOption[]
  showWhen?: ShowWhenCondition
  note?: string
}

export type PricingConfig = {
  _meta: {
    version: string
    lastUpdated: string
    currency: string
    notes: string[]
  }
  baseIncludes: string[]
  steps: {
    projectType: {
      order: number
      headline: string
      subtitle: string
      options: ProjectTypeOption[]
    }
    scope: {
      order: number
      headline: string
      subtitle: string
      optionsByType: Record<string, ScopeOption[]>
    }
    features: {
      order: number
      headline: string
      subtitle: string
      note: string
      sections: FeatureSection[]
    }
    design: {
      order: number
      headline: string
      subtitle: string
      options: DesignOption[]
      addOns: DesignAddon[]
    }
    services: {
      order: number
      headline: string
      subtitle: string
      note: string
      sections: FeatureSection[]
    }
    timeline: {
      order: number
      headline: string
      subtitle: string
      options: TimelineOption[]
    }
    summary: {
      order: number
      headline: string
      subtitle: string
      disclaimer: string
      ctaPrimary: { label: string; action: string }
      ctaSecondary: { label: string; action: string }
      rangeExplanation: string
      displaySections: Record<string, { label: string; description: string; note?: string }>
    }
  }
  calculation: {
    formula: Record<string, string>
    rounding: string
    displayFormat: Record<string, string>
    minimumEstimate: number
    notes: string[]
  }
  estimatedTimelines: Record<string, Record<string, Record<string, string>>>
}

/* --- Wizard state --- */

export type AddonSelection = {
  enabled: boolean
  quantity?: number
}

export type WizardSelections = {
  projectType: ProjectTypeId | null
  scope: string | null
  design: DesignId | null
  timeline: TimelineId | null
  addons: Record<string, AddonSelection>
  maintenanceTier: MaintenanceTierId
}

export type PricingEstimate = {
  oneTime: PriceRange
  monthly: PriceRange
  yearly: PriceRange
}

export type WizardStep = 1 | 2 | 3 | 4 | 5

export const WIZARD_STEP_COUNT = 5
export const WIZARD_STEP_LABELS = ['Type', 'Scope', 'Design', 'Timeline', 'Summary'] as const
