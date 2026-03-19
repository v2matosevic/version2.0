'use client'

import { Sun, Moon } from 'lucide-react'
import { useTheme } from '@/lib/utils/use-theme'

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="text-muted hover:text-foreground transition-colors p-1"
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  )
}

export { ThemeToggle }
