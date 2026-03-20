/**
 * Injects `id` attributes into H2 and H3 heading tags
 * so the Table of Contents can link to them.
 */
function generateHeadingId(text: string): string {
  return text
    .replace(/<[^>]*>/g, '') // strip inner HTML tags
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
}

function injectHeadingIds(html: string): string {
  return html.replace(
    /<(h[23])([^>]*)>(.*?)<\/\1>/gi,
    (match, tag: string, attrs: string, text: string) => {
      if (/id\s*=/.test(attrs)) return match
      const id = generateHeadingId(text)
      return `<${tag}${attrs} id="${id}">${text}</${tag}>`
    },
  )
}

export { injectHeadingIds, generateHeadingId }
