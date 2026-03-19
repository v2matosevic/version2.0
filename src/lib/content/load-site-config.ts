import fs from 'node:fs'
import path from 'node:path'
import type { SiteConfig } from '@/types/site'

const CONFIG_PATH = path.join(process.cwd(), 'content', 'site-config.json')

let cachedConfig: SiteConfig | null = null

export function loadSiteConfig(): SiteConfig {
  if (cachedConfig) return cachedConfig

  const raw = fs.readFileSync(CONFIG_PATH, 'utf-8')
  cachedConfig = JSON.parse(raw) as SiteConfig

  return cachedConfig
}
