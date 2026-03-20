function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function row(label: string, value: string): string {
  return `<tr><td style="padding:8px 12px;font-weight:bold;vertical-align:top;white-space:nowrap;">${label}</td><td style="padding:8px 12px;">${escapeHtml(value)}</td></tr>`
}

type BookingData = {
  id: string
  name: string
  email: string
  date: string
  time: string
  contactMethod: string
  description?: string
}

export function bookingTeamNotification(data: BookingData): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>New Booking</title></head>
<body style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;color:#333;">
  <div style="border-bottom:3px solid #991717;padding-bottom:10px;margin-bottom:20px;">
    <h1 style="color:#991717;margin:0;font-size:20px;">New Consultation Booking</h1>
  </div>
  <table style="width:100%;border-collapse:collapse;">
    ${row('Reference', data.id)}
    ${row('Name', data.name)}
    ${row('Email', data.email)}
    ${row('Date', data.date)}
    ${row('Time', data.time + ' CET')}
    ${row('Contact Method', data.contactMethod)}
    ${data.description ? row('Description', data.description) : ''}
  </table>
  <div style="margin-top:30px;padding-top:15px;border-top:1px solid #eee;font-size:12px;color:#888;">
    Version2.hr — Automated notification
  </div>
</body>
</html>`
}

export function bookingConfirmation(data: BookingData): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Booking Confirmed</title></head>
<body style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;color:#333;">
  <div style="border-bottom:3px solid #991717;padding-bottom:10px;margin-bottom:20px;">
    <h1 style="color:#991717;margin:0;font-size:20px;">Your Consultation is Confirmed</h1>
  </div>
  <p>Hi ${escapeHtml(data.name)},</p>
  <p>Your free consultation has been booked:</p>
  <table style="width:100%;border-collapse:collapse;margin:15px 0;">
    ${row('Date', data.date)}
    ${row('Time', data.time + ' CET')}
    ${row('Reference', data.id)}
  </table>
  <p>We'll reach you via <strong>${escapeHtml(data.contactMethod)}</strong>. An ICS calendar file is attached.</p>
  <p style="margin-top:20px;">See you then!</p>
  <p>— The Version2 Team</p>
  <div style="margin-top:30px;padding-top:15px;border-top:1px solid #eee;font-size:12px;color:#888;">
    Version2.hr
  </div>
</body>
</html>`
}
