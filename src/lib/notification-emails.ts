import { brandedWrapper, dataRow, escapeHtml, ctaButton } from '@/lib/email-layout'

type ContactData = {
  id: string
  name: string
  email: string
  message: string
  type: string
  websiteUrl?: string
  language: string
}

function contactNotification(data: ContactData): string {
  const isAnalysis = data.type === 'analysis'
  const title = isAnalysis ? 'New Analysis Request' : 'New Contact Form Submission'
  const preheader = `${data.name} (${data.email}) submitted a ${isAnalysis ? 'website analysis' : 'contact'} form`
  const body = `
    <p style="margin:16px 0;font-size:14px;color:#6a625c;">A new submission has been received.</p>
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;border:1px solid #eee;border-radius:8px;overflow:hidden;">
      ${dataRow('Reference', data.id)}
      ${dataRow('Name', data.name)}
      ${dataRow('Email', data.email)}
      ${dataRow('Type', isAnalysis ? 'Website Analysis' : 'General Contact')}
      ${isAnalysis && data.websiteUrl ? dataRow('Website', data.websiteUrl) : ''}
      ${dataRow('Language', data.language.toUpperCase())}
      ${dataRow('Message', data.message)}
    </table>`
  return brandedWrapper(title, preheader, body)
}

function contactConfirmation(data: ContactData): string {
  const titles: Record<string, string> = {
    en: 'Thank You for Reaching Out',
    hr: 'Hvala Vam na poruci',
    de: 'Vielen Dank für Ihre Nachricht',
  }
  const bodies: Record<string, string> = {
    en: `<p style="margin:16px 0;font-size:14px;color:#2d2d2d;">Hi ${escapeHtml(data.name)},</p>
      <p style="margin:16px 0;font-size:14px;color:#2d2d2d;">We've received your message and will get back to you within 24 hours.</p>
      <p style="margin:16px 0;font-size:14px;color:#6a625c;">In the meantime, feel free to explore our work:</p>
      ${ctaButton('View Our Portfolio', 'https://version2.hr/portfolio/')}
      <p style="margin:16px 0;font-size:14px;color:#2d2d2d;">— The Version2 Team</p>`,
    hr: `<p style="margin:16px 0;font-size:14px;color:#2d2d2d;">Poštovani ${escapeHtml(data.name)},</p>
      <p style="margin:16px 0;font-size:14px;color:#2d2d2d;">Primili smo Vašu poruku i javit ćemo Vam se unutar 24 sata.</p>
      ${ctaButton('Pogledajte naš portfolio', 'https://version2.hr/hr/portfolio/')}
      <p style="margin:16px 0;font-size:14px;color:#2d2d2d;">— Version2 tim</p>`,
    de: `<p style="margin:16px 0;font-size:14px;color:#2d2d2d;">Hallo ${escapeHtml(data.name)},</p>
      <p style="margin:16px 0;font-size:14px;color:#2d2d2d;">Wir haben Ihre Nachricht erhalten und werden uns innerhalb von 24 Stunden bei Ihnen melden.</p>
      ${ctaButton('Unser Portfolio ansehen', 'https://version2.hr/de/portfolio/')}
      <p style="margin:16px 0;font-size:14px;color:#2d2d2d;">— Das Version2 Team</p>`,
  }
  const lang = data.language in titles ? data.language : 'en'
  return brandedWrapper(titles[lang], 'We received your message', bodies[lang])
}

type CareerData = {
  id: string
  name: string
  email: string
  portfolioUrl?: string
  message: string
  language: string
}

function careerNotification(data: CareerData): string {
  const body = `
    <p style="margin:16px 0;font-size:14px;color:#6a625c;">A new career application has been submitted.</p>
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;border:1px solid #eee;border-radius:8px;">
      ${dataRow('Reference', data.id)}
      ${dataRow('Name', data.name)}
      ${dataRow('Email', data.email)}
      ${data.portfolioUrl ? dataRow('Portfolio', data.portfolioUrl) : ''}
      ${dataRow('Language', data.language.toUpperCase())}
      ${dataRow('Message', data.message)}
    </table>`
  return brandedWrapper('New Career Application', `${data.name} applied`, body)
}

function careerConfirmation(data: CareerData): string {
  return brandedWrapper(
    'Application Received',
    'Thank you for your interest in Version2',
    `<p style="margin:16px 0;font-size:14px;color:#2d2d2d;">Hi ${escapeHtml(data.name)},</p>
    <p style="margin:16px 0;font-size:14px;color:#2d2d2d;">Thank you for your interest in joining Version2. We've received your application and will review it carefully.</p>
    <p style="margin:16px 0;font-size:14px;color:#2d2d2d;">We'll be in touch soon.</p>
    <p style="margin:16px 0;font-size:14px;color:#2d2d2d;">— The Version2 Team</p>`,
  )
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

function pricingNotification(data: PricingData): string {
  const est = data.estimate
  const body = `
    <p style="margin:16px 0;font-size:14px;color:#6a625c;">A pricing estimate was requested.</p>
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;border:1px solid #eee;border-radius:8px;">
      ${dataRow('Reference', data.id)}
      ${dataRow('Name', data.name)}
      ${dataRow('Email', data.email)}
      ${dataRow('Language', data.language.toUpperCase())}
      ${dataRow('One-time', `€${est.oneTime[0].toLocaleString()} – €${est.oneTime[1].toLocaleString()}`)}
      ${dataRow('Monthly', `€${est.monthly[0].toLocaleString()} – €${est.monthly[1].toLocaleString()}`)}
      ${dataRow('Yearly', `€${est.yearly[0].toLocaleString()} – €${est.yearly[1].toLocaleString()}`)}
      ${data.message ? dataRow('Message', data.message) : ''}
    </table>
    <details style="margin-top:20px;">
      <summary style="cursor:pointer;font-weight:600;font-size:13px;color:#6a625c;">Full Selections JSON</summary>
      <pre style="background:#f5f5f5;padding:12px;border-radius:8px;overflow-x:auto;font-size:11px;margin-top:8px;">${escapeHtml(JSON.stringify(data.selections, null, 2))}</pre>
    </details>`
  return brandedWrapper('New Pricing Estimate Request', `${data.name} requested a quote`, body)
}

function pricingConfirmation(data: PricingData): string {
  const est = data.estimate
  return brandedWrapper(
    'Your Pricing Estimate',
    `Estimate: €${est.oneTime[0].toLocaleString()} – €${est.oneTime[1].toLocaleString()}`,
    `<p style="margin:16px 0;font-size:14px;color:#2d2d2d;">Hi ${escapeHtml(data.name)},</p>
    <p style="margin:16px 0;font-size:14px;color:#2d2d2d;">Here's a summary of your pricing estimate:</p>
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;border:1px solid #eee;border-radius:8px;">
      ${dataRow('One-time', `€${est.oneTime[0].toLocaleString()} – €${est.oneTime[1].toLocaleString()}`)}
      ${est.monthly[1] > 0 ? dataRow('Monthly', `€${est.monthly[0].toLocaleString()} – €${est.monthly[1].toLocaleString()} /mo`) : ''}
      ${est.yearly[1] > 0 ? dataRow('Yearly', `€${est.yearly[0].toLocaleString()} – €${est.yearly[1].toLocaleString()} /yr`) : ''}
    </table>
    <p style="margin:20px 0 8px;font-size:13px;color:#6a625c;">This is an estimate based on your selections. The final price depends on specific requirements.</p>
    ${ctaButton('Schedule a Free Consultation', 'https://version2.hr/contact/')}
    <p style="margin:16px 0;font-size:14px;color:#2d2d2d;">— The Version2 Team</p>`,
  )
}

type TrackingData = {
  orderId: string
  trackingNumber: string
  carrier: string
  customerName: string
  customerEmail: string
}

function trackingNotification(data: TrackingData): string {
  return brandedWrapper(
    'Your Order Tracking Update',
    `Tracking number: ${data.trackingNumber}`,
    `<p style="margin:16px 0;font-size:14px;color:#2d2d2d;">Hi ${escapeHtml(data.customerName)},</p>
    <p style="margin:16px 0;font-size:14px;color:#2d2d2d;">Here are the tracking details for your order:</p>
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;border:1px solid #eee;border-radius:8px;">
      ${dataRow('Order', data.orderId)}
      ${dataRow('Tracking #', data.trackingNumber)}
      ${dataRow('Carrier', data.carrier)}
    </table>
    ${ctaButton('Track Your Order', `https://version2.hr/tracking/?order=${encodeURIComponent(data.orderId)}`)}
    <p style="margin:16px 0;font-size:14px;color:#2d2d2d;">— The Version2 Team</p>`,
  )
}

export {
  contactNotification,
  contactConfirmation,
  careerNotification,
  careerConfirmation,
  pricingNotification,
  pricingConfirmation,
  trackingNotification,
  type ContactData,
  type CareerData,
  type PricingData,
  type TrackingData,
}
