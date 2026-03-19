'use client'

import { useState, useCallback, useMemo, useEffect, useRef } from 'react'
import type {
  WizardSelections,
  WizardStep,
  PricingEstimate,
  PricingConfig,
  ProjectTypeId,
  DesignId,
  TimelineId,
  MaintenanceTierId,
} from '@/types/pricing'
import { calculateEstimate } from '@/lib/pricing/calculate-estimate'

const STORAGE_KEY = 'v2_pricing_state'

const INITIAL_SELECTIONS: WizardSelections = {
  projectType: null,
  scope: null,
  design: null,
  timeline: null,
  addons: {},
  maintenanceTier: 'maintenance_none',
}

type PersistedState = { step: WizardStep; selections: WizardSelections }

type WizardState = {
  step: WizardStep
  selections: WizardSelections
  estimate: PricingEstimate
  direction: 1 | -1
  setProjectType: (id: ProjectTypeId) => void
  setScope: (id: string) => void
  setDesign: (id: DesignId) => void
  setTimeline: (id: TimelineId) => void
  toggleAddon: (id: string) => void
  setAddonQuantity: (id: string, quantity: number) => void
  setMaintenanceTier: (tier: MaintenanceTierId) => void
  nextStep: () => void
  prevStep: () => void
  goToStep: (step: WizardStep) => void
  reset: () => void
}

function readStorage(): PersistedState | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as PersistedState
  } catch {
    return null
  }
}

function writeStorage(step: WizardStep, selections: WizardSelections): void {
  if (typeof window === 'undefined') return
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ step, selections }))
  } catch {
    // Storage full or unavailable
  }
}

/**
 * Lazy initializer for step state — reads from sessionStorage on first render.
 */
function initStep(): WizardStep {
  return readStorage()?.step ?? 1
}

/**
 * Lazy initializer for selections state.
 */
function initSelections(): WizardSelections {
  return readStorage()?.selections ?? INITIAL_SELECTIONS
}

function useWizardState(config: PricingConfig): WizardState {
  const [step, setStep] = useState<WizardStep>(initStep)
  const [selections, setSelections] = useState<WizardSelections>(initSelections)
  const [direction, setDirection] = useState<1 | -1>(1)
  const mountedRef = useRef(false)

  // Persist on change (skip initial mount to avoid redundant write)
  useEffect(() => {
    if (mountedRef.current) {
      writeStorage(step, selections)
    } else {
      mountedRef.current = true
    }
  }, [step, selections])

  const estimate = useMemo(
    () => calculateEstimate(selections, config),
    [selections, config],
  )

  const setProjectType = useCallback((id: ProjectTypeId) => {
    setSelections((prev) => ({
      ...prev,
      projectType: id,
      scope: null,
      addons: {},
    }))
  }, [])

  const setScope = useCallback((id: string) => {
    setSelections((prev) => ({ ...prev, scope: id }))
  }, [])

  const setDesign = useCallback((id: DesignId) => {
    setSelections((prev) => ({ ...prev, design: id }))
  }, [])

  const setTimeline = useCallback((id: TimelineId) => {
    setSelections((prev) => ({ ...prev, timeline: id }))
  }, [])

  const toggleAddon = useCallback((id: string) => {
    setSelections((prev) => {
      const current = prev.addons[id]
      const newAddons = { ...prev.addons }

      if (current?.enabled) {
        newAddons[id] = { enabled: false }
      } else {
        newAddons[id] = { enabled: true, quantity: current?.quantity ?? 1 }
      }
      return { ...prev, addons: newAddons }
    })
  }, [])

  const setAddonQuantity = useCallback((id: string, quantity: number) => {
    setSelections((prev) => ({
      ...prev,
      addons: {
        ...prev.addons,
        [id]: { enabled: true, quantity },
      },
    }))
  }, [])

  const setMaintenanceTier = useCallback((tier: MaintenanceTierId) => {
    setSelections((prev) => ({ ...prev, maintenanceTier: tier }))
  }, [])

  const nextStep = useCallback(() => {
    setDirection(1)
    setStep((prev) => (prev < 5 ? ((prev + 1) as WizardStep) : prev))
  }, [])

  const prevStep = useCallback(() => {
    setDirection(-1)
    setStep((prev) => (prev > 1 ? ((prev - 1) as WizardStep) : prev))
  }, [])

  const goToStep = useCallback((target: WizardStep) => {
    setStep((prev) => {
      setDirection(target > prev ? 1 : -1)
      return target
    })
  }, [])

  const reset = useCallback(() => {
    setStep(1)
    setSelections(INITIAL_SELECTIONS)
    setDirection(1)
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(STORAGE_KEY)
    }
  }, [])

  return {
    step,
    selections,
    estimate,
    direction,
    setProjectType,
    setScope,
    setDesign,
    setTimeline,
    toggleAddon,
    setAddonQuantity,
    setMaintenanceTier,
    nextStep,
    prevStep,
    goToStep,
    reset,
  }
}

export { useWizardState }
export type { WizardState }
