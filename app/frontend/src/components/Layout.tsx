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

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const title = titles[location.pathname] || 'Dashboard'

  return (
    <div className="grid min-h-screen" style={{ gridTemplateColumns: '240px 1fr', gridTemplateRows: '64px 1fr', gridTemplateAreas: '"sidebar header" "sidebar main"' }}>
      <Sidebar onLogout={onLogout} />
      <header className="bg-surface border-b border-border flex items-center justify-between px-8" style={{ gridArea: 'header' }}>
        <h1 className="text-text text-xl font-bold">{title}</h1>
        <div className="flex items-center gap-3 text-sm text-subtext">
          <ThemeToggle />
          <NotificationBell />
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-success" />
            <span>Sistema en línea</span>
          </div>
          <span>{time.toLocaleTimeString('es-BO', { hour12: false })}</span>
        </div>
      </header>
      <main className="overflow-y-auto p-7" style={{ gridArea: 'main', scrollbarWidth: 'thin', scrollbarColor: '#2a2a36 transparent' }}>
        <Outlet />
      </main>
    </div>
  )
}
