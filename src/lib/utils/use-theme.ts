'use client'

import { useSyncExternalStore, useCallback } from 'react'

type Theme = 'dark' | 'light'

const STORAGE_KEY = 'v2_theme'

function getServerSnapshot(): Theme {
  return 'dark'
}

function getSnapshot(): Theme {
  if (typeof window === 'undefined') return 'dark'
  return document.documentElement.classList.contains('light') ? 'light' : 'dark'
}

function subscribe(callback: () => void): () => void {
  const observer = new MutationObserver(() => {
    callback()
  })

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  })

  return () => observer.disconnect()
}

export function useTheme(): { theme: Theme; toggleTheme: () => void; setTheme: (theme: Theme) => void } {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const setTheme = useCallback((newTheme: Theme) => {
    if (newTheme === 'light') {
      document.documentElement.classList.add('light')
    } else {
      document.documentElement.classList.remove('light')
    }
    localStorage.setItem(STORAGE_KEY, newTheme)
  }, [])

  const toggleTheme = useCallback(() => {
    const current = document.documentElement.classList.contains('light') ? 'light' : 'dark'
    setTheme(current === 'light' ? 'dark' : 'light')
  }, [setTheme])

  return { theme, toggleTheme, setTheme }
}
