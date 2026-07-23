import { useState } from 'react'
import { mockAlertas } from '../services/mockData'

const labels: Record<string, string> = { todas: 'Todas', critica: 'Crítica', advertencia: 'Advertencia', info: 'Info' }
const tipos = ['todas', 'critica', 'advertencia', 'info'] as const

export default function Alertas() {
  const [filter, setFilter] = useState<string>('todas')

  const counts: Record<string, number> = {}
  tipos.forEach(t => {
    counts[t] = t === 'todas' ? mockAlertas.length : mockAlertas.filter(a => a.tipo === t).length
  })

  const filtered = filter === 'todas' ? mockAlertas : mockAlertas.filter(a => a.tipo === filter)

  return (
    <div>
      <div className="flex gap-2 mb-4">
        {tipos.map(t => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
              filter === t
                ? 'bg-primary text-white border-primary'
                : 'bg-surface border border-border text-subtext hover:text-text hover:border-tertiary'
            }`}
          >
            {labels[t]} ({counts[t]})
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-2.5">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-tertiary">
            <div className="mb-3">
              <svg className="inline-block w-10 h-10 stroke-tertiary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
            </div>
            <p>No hay alertas de este tipo</p>
          </div>
        ) : (
          filtered.map(a => (
            <div
              key={a.id}
              className={`bg-surface border border-border border-l-4 ${a.tipo === 'critica' ? 'border-l-danger' : a.tipo === 'advertencia' ? 'border-l-warning' : 'border-l-primary'} rounded-2xl p-4 flex items-start justify-between gap-4 hover:bg-surface-hover transition-colors`}
            >
              <div className="flex flex-col gap-1.5 flex-1">
                <span className="text-sm font-medium text-text">{a.mensaje}</span>
                <div className="flex gap-3 text-xs text-tertiary">
                  <span>{a.surtidor}</span>
                  <span>{a.timestamp}</span>
                </div>
              </div>
              <span className={`text-[11px] font-bold uppercase tracking-wide whitespace-nowrap px-3 py-1 rounded-full ${a.tipo === 'critica' ? 'text-danger bg-danger-light' : a.tipo === 'advertencia' ? 'text-warning bg-warning-light' : 'text-primary bg-primary-light'}`}>
                {a.tipo}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
