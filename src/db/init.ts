import { ensureDatabase } from './migrate'

let ready = false

/**
 * Initialize the database schema once. Safe to call multiple times.
 */
export function initDatabase(): void {
  if (ready) return
  ensureDatabase()
  ready = true
}
