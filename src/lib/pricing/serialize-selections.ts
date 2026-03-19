import type { WizardSelections } from '@/types/pricing'

/**
 * Serialize wizard selections into URL search params for the contact form handoff.
 * Only includes non-null/non-empty values to keep the URL clean.
 */
function serializeSelections(selections: WizardSelections): string {
  const params = new URLSearchParams()

  if (selections.projectType) params.set('project', selections.projectType)
  if (selections.scope) params.set('scope', selections.scope)
  if (selections.design) params.set('design', selections.design)
  if (selections.timeline) params.set('timeline', selections.timeline)
  if (selections.maintenanceTier !== 'maintenance_none') {
    params.set('maintenance', selections.maintenanceTier)
  }

  const enabledAddons = Object.entries(selections.addons)
    .filter(([, sel]) => sel.enabled)
    .map(([id, sel]) => (sel.quantity && sel.quantity > 1 ? `${id}:${sel.quantity}` : id))

  if (enabledAddons.length > 0) {
    params.set('addons', enabledAddons.join(','))
  }

  return params.toString()
}

export { serializeSelections }
