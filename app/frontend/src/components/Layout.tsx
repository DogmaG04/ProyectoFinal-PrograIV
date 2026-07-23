import { useState, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import NotificationBell from './NotificationBell'
import ThemeToggle from './ThemeToggle'

const titles: Record<string, string> = {
  '/': 'Dashboard',
  '/surtidores': 'Surtidores',
  '/ventas': 'Ventas',
  '/alertas': 'Alertas',
  '/reportes': 'Reportes',
}

interface LayoutProps {
  onLogout?: () => void
}

export default function Layout({ onLogout }: LayoutProps) {
  const location = useLocation()
  const [time, setTime] = useState(new Date())
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    setSidebarOpen(false)
  }, [location.pathname])

  const title = titles[location.pathname] || 'Dashboard'

  return (
    <div className="min-h-screen flex flex-col">
      <Sidebar onLogout={onLogout} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <header className="bg-surface border-b border-border flex items-center justify-between px-4 md:px-8 h-14 md:h-16 sticky top-0 z-20 md:ml-[240px]">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg bg-surface-hover hover:bg-primary/20 text-subtext hover:text-text transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          <h1 className="text-text text-base md:text-xl font-bold">{title}</h1>
        </div>
        <div className="flex items-center gap-2 md:gap-3 text-sm text-subtext">
          <ThemeToggle />
          <NotificationBell />
          <div className="hidden sm:flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-success" />
            <span>En línea</span>
          </div>
          <span className="hidden sm:inline">{time.toLocaleTimeString('es-BO', { hour12: false })}</span>
        </div>
      </header>
      <main className="overflow-y-auto p-4 md:p-7 md:ml-[240px]" style={{ scrollbarWidth: 'thin', scrollbarColor: '#2a2a36 transparent' }}>
        <Outlet />
      </main>
    </div>
  )
}
