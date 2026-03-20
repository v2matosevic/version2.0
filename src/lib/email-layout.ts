/**
 * Branded email layout for Version2 notifications.
 * Table-based HTML for maximum email client compatibility.
 */

const BRAND_RED = '#991717'
const DARK_BG = '#1a1a1a'
const BODY_BG = '#f5f0eb'
const CARD_BG = '#ffffff'
const TEXT_PRIMARY = '#2d2d2d'
const TEXT_MUTED = '#6a625c'

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function dataRow(label: string, value: string): string {
  return `<tr>
    <td style="padding:10px 16px;font-weight:600;vertical-align:top;white-space:nowrap;color:${TEXT_MUTED};font-size:14px;border-bottom:1px solid #eee;">${label}</td>
    <td style="padding:10px 16px;font-size:14px;color:${TEXT_PRIMARY};border-bottom:1px solid #eee;">${escapeHtml(value)}</td>
  </tr>`
}

function brandedWrapper(title: string, preheader: string, body: string): string {
  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
  <style>
    @media only screen and (max-width: 600px) {
      .container { width: 100% !important; }
      .content { padding: 24px 16px !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:${BODY_BG};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <!-- Preheader -->
  <div style="display:none;max-height:0;overflow:hidden;">${escapeHtml(preheader)}</div>

  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color:${BODY_BG};">
    <tr><td align="center" style="padding:32px 16px;">

      <!-- Container -->
      <table role="presentation" class="container" cellpadding="0" cellspacing="0" width="600" style="max-width:600px;width:100%;">

        <!-- Header -->
        <tr><td style="background-color:${DARK_BG};padding:24px 32px;border-radius:12px 12px 0 0;">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td>
                <span style="color:#ffffff;font-size:20px;font-weight:700;letter-spacing:-0.5px;">Version</span><span style="color:${BRAND_RED};font-size:20px;font-weight:700;">2</span>
              </td>
              <td align="right">
                <span style="color:${TEXT_MUTED};font-size:12px;">Web Development Studio</span>
              </td>
            </tr>
          </table>
        </td></tr>

        <!-- Red accent line -->
        <tr><td style="background-color:${BRAND_RED};height:3px;font-size:0;line-height:0;">&nbsp;</td></tr>

        <!-- Body -->
        <tr><td class="content" style="background-color:${CARD_BG};padding:32px;border-radius:0 0 12px 12px;">
          <h1 style="margin:0 0 8px;font-size:22px;font-weight:700;color:${TEXT_PRIMARY};letter-spacing:-0.3px;">${escapeHtml(title)}</h1>
          ${body}
        </td></tr>

        <!-- Footer -->
        <tr><td style="padding:24px 32px;text-align:center;">
          <p style="margin:0 0 8px;font-size:12px;color:${TEXT_MUTED};">
            Version2 j.d.o.o. · Novigradska ul. 21, 23000 Zadar, Croatia
          </p>
          <p style="margin:0;font-size:12px;color:${TEXT_MUTED};">
            <a href="mailto:info@version2.hr" style="color:${BRAND_RED};text-decoration:none;">info@version2.hr</a>
            &nbsp;·&nbsp;
            <a href="tel:+385995617706" style="color:${BRAND_RED};text-decoration:none;">+385 99 561 7706</a>
            &nbsp;·&nbsp;
            <a href="https://version2.hr" style="color:${BRAND_RED};text-decoration:none;">version2.hr</a>
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`
}

function ctaButton(text: string, url: string): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:24px 0;">
    <tr><td style="background-color:${BRAND_RED};border-radius:8px;padding:12px 28px;">
      <a href="${url}" style="color:#ffffff;text-decoration:none;font-size:14px;font-weight:600;display:inline-block;">${escapeHtml(text)}</a>
    </td></tr>
  </table>`
}

export { brandedWrapper, dataRow, escapeHtml, ctaButton }
