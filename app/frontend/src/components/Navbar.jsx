import { NavLink } from 'react-router-dom'

const tabs = [
  { to: '/', label: 'Dashboard' },
  { to: '/surtidores', label: 'Surtidores' },
  { to: '/ventas', label: 'Ventas' },
  { to: '/alertas', label: 'Alertas' },
  { to: '/reportes', label: 'Reportes' },
]

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <span className="font-bold text-lg text-yellow-400">SurtidorApp</span>
          <div className="flex gap-1">
            {tabs.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `px-4 py-2 rounded text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-yellow-500 text-gray-900'
                      : 'text-gray-300 hover:bg-gray-700'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
