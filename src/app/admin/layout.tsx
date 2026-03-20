'use client'

import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  FileText,
  Package,
  Calendar,
  BarChart3,
  Settings,
  LogOut,
} from 'lucide-react'
import type { ReactNode } from 'react'

const NAV_ITEMS = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/posts', label: 'Blog Posts', icon: FileText },
  { href: '/admin/orders', label: 'Orders', icon: Package },
  { href: '/admin/bookings', label: 'Bookings', icon: Calendar },
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
] as const

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

  // Don't wrap login page in admin layout
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  return (
    <div className="min-h-screen bg-base flex">
      {/* Sidebar */}
      <aside className="w-64 bg-sunken border-r border-line flex flex-col shrink-0">
        <div className="p-6 border-b border-line">
          <h2 className="font-heading text-lg font-[700] text-foreground">Version2</h2>
          <p className="text-[var(--text-small)] text-muted mt-0.5">Admin Panel</p>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
            const isActive = href === '/admin'
              ? pathname === '/admin'
              : pathname.startsWith(href)

            return (
              <a
                key={href}
                href={href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[var(--text-small)] transition-colors ${
                  isActive
                    ? 'bg-brand-red/10 text-brand-red-light'
                    : 'text-muted hover:text-foreground hover:bg-raised'
                }`}
              >
                <Icon size={18} />
                {label}
              </a>
            )
          })}
        </nav>

        <div className="p-3 border-t border-line">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[var(--text-small)] text-muted hover:text-brand-red hover:bg-raised transition-colors w-full"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
