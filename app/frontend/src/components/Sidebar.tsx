import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'DASHBOARD', icon: '◆' },
  { to: '/surtidores', label: 'SURTIMENTOS', icon: '⛽' },
  { to: '/ventas', label: 'VENTAS', icon: '▬' },
  { to: '/alertas', label: 'ALERTAS', icon: '▲' },
  { to: '/reportes', label: 'REPORTES', icon: '▤' },
]

export default function Sidebar() {
  return (
    <aside className="w-60 min-h-screen bg-panel border-r border-border flex flex-col fixed left-0 top-0">
      <div className="p-5 border-b border-border">
        <div className="flex items-center gap-2">
          <span className="text-mint text-lg">⛽</span>
          <div>
            <h1 className="text-cyan font-bold text-sm tracking-wider">GASCONTROL</h1>
            <p className="text-subtext text-[10px]">// RICE-UI</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-3 flex flex-col gap-1">
        {links.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 text-xs tracking-wide transition-colors ${
                isActive
                  ? 'bg-panel-hover text-cyan border-l-2 border-cyan'
                  : 'text-subtext hover:text-text hover:bg-panel-hover border-l-2 border-transparent'
              }`
            }
          >
            <span className="text-sm">{icon}</span>
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-border text-[10px] space-y-2">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-mint animate-pulse"></span>
          <span className="text-mint">STATUS: EN LÍNEA</span>
        </div>
        <div className="text-cyan">OP: Admin</div>
        <div className="text-amber">TURNO: 1</div>
      </div>
    </aside>
  )
}
