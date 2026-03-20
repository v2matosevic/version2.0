import type { ZodError } from 'zod'
import type { FieldError } from '@/lib/validation/api-types'

/**
 * Convert Zod validation errors to our API field error format.
 */
export function parseZodErrors(error: ZodError): FieldError[] {
  return error.issues.map((issue) => ({
    field: issue.path.join('.'),
    message: issue.message,
  }))
}
