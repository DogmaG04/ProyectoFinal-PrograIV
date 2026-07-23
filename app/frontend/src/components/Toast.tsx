import { useEffect, useState } from 'react'

export interface ToastMsg {
  id: number
  tipo: 'exito' | 'error' | 'info'
  mensaje: string
}

let toastId = 0
let globalSetToasts: React.Dispatch<React.SetStateAction<ToastMsg[]>> | null = null

export function showToast(tipo: ToastMsg['tipo'], mensaje: string) {
  const toast: ToastMsg = { id: ++toastId, tipo, mensaje }
  if (globalSetToasts) {
    globalSetToasts(prev => [...prev, toast])
  }
}

export default function ToastContainer() {
  const [toasts, setToasts] = useState<ToastMsg[]>([])

  useEffect(() => {
    globalSetToasts = setToasts
    return () => { globalSetToasts = null }
  }, [])

  useEffect(() => {
    if (toasts.length === 0) return
    const timer = setTimeout(() => {
      setToasts(prev => prev.slice(1))
    }, 3500)
    return () => clearTimeout(timer)
  }, [toasts])

  const colorMap: Record<string, string> = {
    exito: 'border-l-success text-success',
    error: 'border-l-danger text-danger',
    info: 'border-l-primary text-primary',
  }

  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2 pointer-events-none">
      {toasts.map(t => (
        <div
          key={t.id}
          className={`bg-surface border border-border border-l-4 ${colorMap[t.tipo]} rounded-xl px-4 py-3 text-sm font-medium text-text shadow-lg pointer-events-auto animate-slide-in`}
        >
          {t.mensaje}
        </div>
      ))}
    </div>
  )
}
