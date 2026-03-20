import { z } from 'zod'
import {
  nameField,
  emailField,
  optionalMessageField,
  honeypotField,
  languageField,
} from '../fields'
import {
  PROJECT_TYPES,
  SCOPE_OPTIONS,
  DESIGN_OPTIONS,
  TIMELINE_OPTIONS,
  MAINTENANCE_TIERS,
} from '../constants'

const priceRangeTuple = z
  .tuple([
    z.number().int().nonnegative(),
    z.number().int().nonnegative(),
  ])
  .refine(([min, max]) => min <= max, {
    error: 'Minimum price must not exceed maximum price',
  })

const optionIdArray = z
  .array(z.string().regex(/^[a-z][a-z0-9_]*$/, { error: 'Invalid option ID format' }))
  .default([])

const quantityMap = z
  .record(
    z.string().regex(/^[a-z][a-z0-9_]*$/),
    z.number().int().positive(),
  )
  .default({})

const selectionsSchema = z.object({
  projectType: z.enum(PROJECT_TYPES, { error: 'Invalid project type' }),
  scope: z.enum(SCOPE_OPTIONS, { error: 'Invalid scope selection' }),
  design: z.enum(DESIGN_OPTIONS, { error: 'Invalid design selection' }),
  timeline: z.enum(TIMELINE_OPTIONS, { error: 'Invalid timeline selection' }),
  features: optionIdArray,
  featureQuantities: quantityMap,
  ecommerce: optionIdArray,
  integrations: optionIdArray,
  integrationQuantities: quantityMap,
  designAddons: optionIdArray,
  services: optionIdArray,
  serviceQuantities: quantityMap,
  maintenance: z.enum(MAINTENANCE_TIERS, { error: 'Invalid maintenance tier' }),
})

const calculatedEstimateSchema = z.object({
  oneTime: priceRangeTuple,
  monthly: priceRangeTuple,
  yearly: priceRangeTuple,
})

export const pricingSchema = z.object({
  name: nameField,
  email: emailField,
  message: optionalMessageField,
  language: languageField,
  selections: selectionsSchema,
  calculatedEstimate: calculatedEstimateSchema,
  _honey: honeypotField,
})

export type PricingFormData = z.infer<typeof pricingSchema>
export type PricingSelections = z.infer<typeof selectionsSchema>
export type PriceEstimate = z.infer<typeof calculatedEstimateSchema>
