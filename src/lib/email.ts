import nodemailer from 'nodemailer'

type EmailOptions = {
  to: string
  subject: string
  html: string
  attachments?: Array<{
    filename: string
    content: string
    contentType: string
  }>
}

function isSmtpConfigured(): boolean {
  return Boolean(
    process.env.SMTP_HOST &&
    process.env.SMTP_PORT &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASS,
  )
}

function createTransport(): nodemailer.Transporter | null {
  const host = process.env.SMTP_HOST
  const port = process.env.SMTP_PORT
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS

  if (!isSmtpConfigured()) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('SMTP is not configured for production')
    }
    return null
  }

  return nodemailer.createTransport({
    host,
    port: Number(port),
    secure: Number(port) === 465,
    auth: { user, pass },
  })
}

/**
 * Send an email via Zoho SMTP.
 * Falls back to console.log in development when SMTP vars are missing.
 */
export async function sendEmail(options: EmailOptions): Promise<void> {
  const transport = createTransport()
  const from = process.env.SMTP_FROM ?? 'noreply@version2.hr'

  if (!transport) {
    console.log('[Email] SMTP not configured — logging email:')
    console.log(`  To: ${options.to}`)
    console.log(`  Subject: ${options.subject}`)
    console.log(`  Body length: ${options.html.length} chars`)
    if (options.attachments?.length) {
      console.log(`  Attachments: ${options.attachments.map((a) => a.filename).join(', ')}`)
    }
    return
  }

  await transport.sendMail({
    from,
    to: options.to,
    subject: options.subject,
    html: options.html,
    attachments: options.attachments,
  })
}

export { isSmtpConfigured }
