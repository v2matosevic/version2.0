function emailWrapper(title: string, body: string): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>${title}</title></head>
<body style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;color:#333;">
  <div style="border-bottom:3px solid #991717;padding-bottom:10px;margin-bottom:20px;">
    <h1 style="color:#991717;margin:0;font-size:20px;">${title}</h1>
  </div>
  ${body}
  <div style="margin-top:30px;padding-top:15px;border-top:1px solid #eee;font-size:12px;color:#888;">
    Version2.hr — Automated notification
  </div>
</body>
</html>`
}

function row(label: string, value: string): string {
  return `<tr><td style="padding:8px 12px;font-weight:bold;vertical-align:top;white-space:nowrap;">${label}</td><td style="padding:8px 12px;">${escapeHtml(value)}</td></tr>`
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

type ContactData = {
  id: string
  name: string
  email: string
  message: string
  type: string
  websiteUrl?: string
  language: string
}

export function contactNotification(data: ContactData): string {
  const isAnalysis = data.type === 'analysis'
  const title = isAnalysis ? 'New Analysis Request' : 'New Contact Form Submission'
  const body = `
    <table style="width:100%;border-collapse:collapse;">
      ${row('Reference', data.id)}
      ${row('Name', data.name)}
      ${row('Email', data.email)}
      ${row('Type', isAnalysis ? 'Website Analysis' : 'General Contact')}
      ${isAnalysis && data.websiteUrl ? row('Website', data.websiteUrl) : ''}
      ${row('Language', data.language.toUpperCase())}
      ${row('Message', data.message)}
    </table>`
  return emailWrapper(title, body)
}

type CareerData = {
  id: string
  name: string
  email: string
  portfolioUrl?: string
  message: string
  language: string
}

export function careerNotification(data: CareerData): string {
  const body = `
    <table style="width:100%;border-collapse:collapse;">
      ${row('Reference', data.id)}
      ${row('Name', data.name)}
      ${row('Email', data.email)}
      ${data.portfolioUrl ? row('Portfolio', data.portfolioUrl) : ''}
      ${row('Language', data.language.toUpperCase())}
      ${row('Message', data.message)}
    </table>`
  return emailWrapper('New Career Application', body)
}

type PricingData = {
  id: string
  name: string
  email: string
  message?: string
  language: string
  selections: Record<string, unknown>
  estimate: { oneTime: [number, number]; monthly: [number, number]; yearly: [number, number] }
}

export function pricingNotification(data: PricingData): string {
  const est = data.estimate
  const body = `
    <table style="width:100%;border-collapse:collapse;">
      ${row('Reference', data.id)}
      ${row('Name', data.name)}
      ${row('Email', data.email)}
      ${row('Language', data.language.toUpperCase())}
      ${row('One-time', `€${est.oneTime[0].toLocaleString()} — €${est.oneTime[1].toLocaleString()}`)}
      ${row('Monthly', `€${est.monthly[0].toLocaleString()} — €${est.monthly[1].toLocaleString()}`)}
      ${row('Yearly', `€${est.yearly[0].toLocaleString()} — €${est.yearly[1].toLocaleString()}`)}
      ${data.message ? row('Message', data.message) : ''}
    </table>
    <details style="margin-top:15px;">
      <summary style="cursor:pointer;font-weight:bold;">Full Selections</summary>
      <pre style="background:#f5f5f5;padding:12px;border-radius:4px;overflow-x:auto;font-size:12px;">${escapeHtml(JSON.stringify(data.selections, null, 2))}</pre>
    </details>`
  return emailWrapper('New Pricing Estimate Request', body)
}
