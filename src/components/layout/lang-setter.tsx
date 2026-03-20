'use client'

import { useEffect } from 'react'
import type { Language } from '@/types/i18n'

function LangSetter({ lang }: { lang: Language }) {
  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  return null
}

export { LangSetter }
