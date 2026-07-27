import { useEffect } from 'react'
import type { AlertaData } from '../models/Alerta'

interface CriticalAlertsModalProps {
  abierto: boolean
  alertas: AlertaData[]
  onClose: () => void
  onIrAlertas: () => void
}

export default function CriticalAlertsModal({ abierto, alertas, onClose, onIrAlertas }: CriticalAlertsModalProps) {
  useEffect(() => {
    if (!abierto) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [abierto, onClose])

  if (!abierto || alertas.length === 0) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 animate-fadeIn" onClick={onClose} />
      <div className="relative bg-surface border border-border rounded-2xl w-full max-w-[560px] max-h-[85vh] overflow-hidden animate-scaleIn">
        <div className="px-6 pt-6 pb-4 border-b border-border">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-danger-light flex items-center justify-center animate-pulse">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-danger">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-bold text-text">Alertas Críticas</h2>
              <p className="text-xs text-tertiary">{alertas.length} requieren atención inmediata</p>
            </div>
          </div>
        </div>

        <div className="p-4 overflow-y-auto max-h-[50vh] flex flex-col gap-2.5">
          {alertas.map(a => (
            <div
              key={a.id}
              className="bg-bg border border-border border-l-4 border-l-danger rounded-xl p-4 flex flex-col gap-2 hover:bg-surface-hover transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="text-sm font-medium text-text leading-snug">{a.mensaje}</span>
                <span className="text-[10px] font-bold uppercase tracking-wide whitespace-nowrap px-2.5 py-1 rounded-full text-danger bg-danger-light">
                  Crítica
                </span>
              </div>
              <div className="flex gap-3 text-xs text-tertiary">
                <span className="flex items-center gap-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  {a.timestamp}
                </span>
                <span className="flex items-center gap-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                  </svg>
                  {a.surtidor}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="px-6 py-4 border-t border-border flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold border border-border text-subtext hover:text-text hover:border-tertiary transition-colors"
          >
            Cerrar
          </button>
          <button
            onClick={onIrAlertas}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-danger text-white hover:opacity-90 transition-opacity"
          >
            Ir a Alertas
          </button>
        </div>
      </div>
    </div>
  )
}
