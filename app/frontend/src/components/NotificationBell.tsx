import { useState, useEffect, useRef } from 'react'
import { alertSubject, Observer, DBAlerta } from '../patterns/observer/AlertObserver'

const tipoConfig: Record<string, { color: string; bg: string; label: string }> = {
  critica: { color: 'text-danger', bg: 'bg-danger-light', label: 'Crítica' },
  advertencia: { color: 'text-warning', bg: 'bg-warning-light', label: 'Advertencia' },
  info: { color: 'text-primary', bg: 'bg-primary-light', label: 'Info' },
}

export default function NotificationBell() {
  const [notificaciones, setNotificaciones] = useState<DBAlerta[]>([])
  const [abierto, setAbierto] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer: Observer = {
      notificar(alerta) {
        setNotificaciones(prev => [alerta, ...prev].slice(0, 20))
      },
    }
    const unsub = alertSubject.suscribirNuevos(observer)
    return unsub
  }, [])

  useEffect(() => {
    if (!abierto) return
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setAbierto(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [abierto])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setAbierto(!abierto)}
        className="relative p-2 rounded-xl hover:bg-surface-hover transition-colors text-subtext hover:text-text"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
        </svg>
        {notificaciones.length > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 bg-danger text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
            {notificaciones.length}
          </span>
        )}
      </button>

      {abierto && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-surface border border-border rounded-2xl shadow-xl z-50 overflow-hidden">
          <div className="px-4 py-3 border-b border-border flex items-center justify-between">
            <span className="text-sm font-bold text-text">Notificaciones</span>
            {notificaciones.length > 0 && (
              <button
                onClick={() => setNotificaciones([])}
                className="text-xs text-tertiary hover:text-text transition-colors"
              >
                Limpiar
              </button>
            )}
          </div>
          <div className="max-h-80 overflow-y-auto">
            {notificaciones.length === 0 ? (
              <div className="px-4 py-8 text-center text-tertiary text-xs">
                Sin notificaciones nuevas
              </div>
            ) : (
              notificaciones.map((n, i) => {
                const cfg = tipoConfig[n.tipo] || tipoConfig.info
                return (
                  <div key={i} className="px-4 py-3 border-b border-border last:border-b-0 hover:bg-surface-hover transition-colors">
                    <div className="flex items-start gap-2.5">
                      <span className={`mt-0.5 w-2 h-2 rounded-full shrink-0 ${cfg.color === 'text-danger' ? 'bg-danger' : cfg.color === 'text-warning' ? 'bg-warning' : 'bg-primary'}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-text leading-snug">{n.mensaje}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] text-tertiary">{n.surtidor}</span>
                          <span className="text-[10px] text-tertiary">·</span>
                          <span className="text-[10px] text-tertiary">{n.timestamp}</span>
                        </div>
                      </div>
                      <span className={`text-[10px] font-bold uppercase tracking-wide whitespace-nowrap px-2 py-0.5 rounded-full ${cfg.color} ${cfg.bg}`}>
                        {cfg.label}
                      </span>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>
      )}
    </div>
  )
}
