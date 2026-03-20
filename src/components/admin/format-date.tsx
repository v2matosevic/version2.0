/**
 * Format an ISO date string for admin display (e.g. "19 Mar 2026").
 */
export function formatAdminDate(iso: string): string {
  try {
    return new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(new Date(iso))
  } catch {
    return iso
  }
}

/**
 * Format an ISO date string with time (e.g. "19 Mar 2026, 14:30").
 */
export function formatAdminDateTime(iso: string): string {
  return new Date(iso).toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
