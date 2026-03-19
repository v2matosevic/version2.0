import fs from 'node:fs'
import path from 'node:path'

const SITE_URL = 'https://version2.hr'
const OUTPUT_PATH = path.join(process.cwd(), 'public', 'robots.txt')

function main(): void {
  const content = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`

  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true })
  fs.writeFileSync(OUTPUT_PATH, content, 'utf-8')

  console.log('robots.txt generated')
}

main()
