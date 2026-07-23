import { useEffect } from 'react'

interface ModalProps {
  abierto: boolean
  titulo: string
  onClose: () => void
  children: React.ReactNode
}

export default function Modal({ abierto, titulo, onClose, children }: ModalProps) {
  useEffect(() => {
    if (!abierto) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [abierto, onClose])

  if (!abierto) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative bg-surface border border-border rounded-2xl p-6 w-[480px] max-w-[90vw] max-h-[85vh] overflow-y-auto shadow-xl">
        <div className="flex items-center justify-between mb-5 pb-4 border-b border-border">
          <h2 className="text-lg font-bold text-text">{titulo}</h2>
          <button onClick={onClose} className="text-tertiary hover:text-text transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
