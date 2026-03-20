import { brandedWrapper, dataRow, escapeHtml, ctaButton } from '@/lib/email-layout'

type BookingData = {
  id: string
  name: string
  email: string
  date: string
  time: string
  contactMethod: string
  description?: string
}

function bookingTeamNotification(data: BookingData): string {
  const body = `
    <p style="margin:16px 0;font-size:14px;color:#6a625c;">A new consultation has been booked.</p>
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;border:1px solid #eee;border-radius:8px;">
      ${dataRow('Reference', data.id)}
      ${dataRow('Client', data.name)}
      ${dataRow('Email', data.email)}
      ${dataRow('Date', data.date)}
      ${dataRow('Time', data.time + ' CET')}
      ${dataRow('Contact', data.contactMethod)}
      ${data.description ? dataRow('Notes', data.description) : ''}
    </table>`
  return brandedWrapper(
    'New Consultation Booking',
    `${data.name} booked ${data.date} at ${data.time}`,
    body,
  )
}

function bookingConfirmation(data: BookingData): string {
  return brandedWrapper(
    'Your Consultation is Confirmed',
    `Confirmed: ${data.date} at ${data.time} CET`,
    `<p style="margin:16px 0;font-size:14px;color:#2d2d2d;">Hi ${escapeHtml(data.name)},</p>
    <p style="margin:16px 0;font-size:14px;color:#2d2d2d;">Your free consultation has been confirmed:</p>
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;border:1px solid #eee;border-radius:8px;margin:16px 0;">
      ${dataRow('Date', data.date)}
      ${dataRow('Time', data.time + ' CET')}
      ${dataRow('Contact via', data.contactMethod)}
      ${dataRow('Reference', data.id)}
    </table>
    <p style="margin:16px 0;font-size:14px;color:#2d2d2d;">We'll reach you via <strong>${escapeHtml(data.contactMethod)}</strong>. An ICS calendar invitation is attached to this email.</p>
    <p style="margin:20px 0 8px;font-size:13px;color:#6a625c;">Need to reschedule? Reply to this email or contact us.</p>
    ${ctaButton('Prepare for Your Call', 'https://version2.hr/analysis/')}
    <p style="margin:16px 0;font-size:14px;color:#2d2d2d;">See you then!</p>
    <p style="margin:16px 0;font-size:14px;color:#2d2d2d;">— The Version2 Team</p>`,
  )
}

export { bookingTeamNotification, bookingConfirmation, type BookingData }
