import { randomBytes } from 'node:crypto'

/**
 * Generate a prefixed ID like "cnt_a1b2c3d4".
 * Uses 8 random hex bytes (16 chars) for collision resistance.
 */
export function generateId(prefix: string): string {
  return `${prefix}_${randomBytes(8).toString('hex')}`
}
