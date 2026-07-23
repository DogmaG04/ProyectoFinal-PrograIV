import { useState, useEffect, useRef } from 'react'

interface LoginProps {
  onLogin: () => void
}

export default function Login({ onLogin }: LoginProps) {
  const [typing, setTyping] = useState(true)
  const [hidden, setHidden] = useState(false)
  const [logginIn, setLogginIn] = useState(false)
  const userRef = useRef<HTMLInputElement>(null)
  const passRef = useRef<HTMLInputElement>(null)

  const USER = 'operador'
  const PASS = 'CELERON2026'

  useEffect(() => {
    let cancelled = false

    function typeText(
      el: HTMLInputElement,
      text: string,
      i: number,
      cb: () => void
    ) {
      if (cancelled) return
      if (i < text.length) {
        el.value += text[i]
        setTimeout(
          () => typeText(el, text, i + 1, cb),
          60 + Math.random() * 40
        )
      } else {
        cb()
      }
    }

    if (userRef.current && passRef.current) {
      typeText(userRef.current, USER, 0, () => {
        if (cancelled) return
        setTimeout(() => {
          if (cancelled) return
          typeText(passRef.current!, PASS, 0, () => {
            if (cancelled) return
            setTyping(false)
          })
        }, 300)
      })
    }

    return () => { cancelled = true }
  }, [])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (typing || logginIn) return
    setLogginIn(true)
    setTimeout(() => {
      setHidden(true)
      setTimeout(() => onLogin(), 500)
    }, 600)
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-bg transition-opacity duration-400 ${
        hidden ? 'opacity-0 pointer-events-none' : ''
      }`}
    >
      <div className="bg-surface border border-border rounded-3xl p-12 w-[400px] max-w-[90vw] shadow-lg text-center">
        <div className="mb-9">
          <div className="w-14 h-14 bg-primary rounded-2xl inline-flex items-center justify-center text-white mb-4">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 22V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16"/><path d="M15 10h2a2 2 0 0 1 2 2v2a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V9.83a2 2 0 0 0-.59-1.42L18 4"/><path d="M3 22h12"/><circle cx="8" cy="10" r="1" fill="currentColor"/></svg>
          </div>
          <h1 className="text-text text-[22px] font-bold mb-1">Celeron Control</h1>
          <p className="text-tertiary text-sm">Sistema de Monitoreo de Surtidores</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-subtext">Usuario</label>
            <input
              ref={userRef}
              type="text"
              readOnly
              className="w-full px-4 py-3 border border-border rounded-xl bg-bg text-text text-sm outline-none"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-subtext">Contraseña</label>
            <input
              ref={passRef}
              type="password"
              readOnly
              className="w-full px-4 py-3 border border-border rounded-xl bg-bg text-text text-sm outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={typing}
            className="w-full py-3.5 bg-primary text-white rounded-xl font-semibold text-sm mt-2 transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-default"
          >
            {logginIn ? 'Ingresando...' : 'Iniciar Sesión'}
          </button>
          <p className="text-center text-[11px] text-tertiary mt-1">Acceso demo — credenciales pre-cargadas</p>
        </form>
      </div>
    </div>
  )
}
