type IcsEvent = {
  id: string
  title: string
  description: string
  date: string
  time: string
  durationMinutes: number
  organizerEmail: string
  attendeeEmail: string
}

/**
 * Generate an RFC 5545 ICS calendar string.
 */
export function generateIcs(event: IcsEvent): string {
  const startDt = toIcsDateTime(event.date, event.time)
  const endDt = toIcsDateTime(event.date, event.time, event.durationMinutes)
  const now = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Version2.hr//Booking//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:REQUEST',
    'BEGIN:VEVENT',
    `UID:${event.id}@version2.hr`,
    `DTSTAMP:${now}`,
    `DTSTART:${startDt}`,
    `DTEND:${endDt}`,
    `SUMMARY:${escapeIcsText(event.title)}`,
    `DESCRIPTION:${escapeIcsText(event.description)}`,
    `ORGANIZER;CN=Version2:mailto:${event.organizerEmail}`,
    `ATTENDEE;CN=Client:mailto:${event.attendeeEmail}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')
}

function toIcsDateTime(date: string, time: string, addMinutes = 0): string {
  const [year, month, day] = date.split('-').map(Number)
  const [hours, minutes] = time.split(':').map(Number)

  const dt = new Date(Date.UTC(year, month - 1, day, hours - 1, minutes + addMinutes))
  return dt.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
}

function escapeIcsText(text: string): string {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n')
}
