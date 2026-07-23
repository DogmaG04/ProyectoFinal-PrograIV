import { useState, useEffect } from 'react'
import { showToast } from './Toast'
import { loginSchema, type LoginFormData } from '../schemas'

interface LoginProps {
  onLogin: () => void
}

const EMAIL = 'admin@gmail.com'
const PASS = '12345678'

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [hidden, setHidden] = useState(false)
  const [logginIn, setLogginIn] = useState(false)
  const [errores, setErrores] = useState<Record<string, string>>({})
  const [touch, setTouch] = useState<Record<string, boolean>>({})

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark')
    localStorage.setItem('theme', 'dark')
  }, [])

  function validarCampo(campo: keyof LoginFormData, valor: string) {
    const parcial = { [campo]: valor }
    const resultado = loginSchema.safeParse({ email, password, ...parcial })
    if (!resultado.success) {
      const err = resultado.error.flatten().fieldErrors[campo]
      setErrores(prev => ({ ...prev, [campo]: err?.[0] || '' }))
    } else {
      setErrores(prev => ({ ...prev, [campo]: '' }))
    }
  }

  function handleBlur(campo: keyof LoginFormData) {
    setTouch(prev => ({ ...prev, [campo]: true }))
    const valor = campo === 'email' ? email : password
    validarCampo(campo, valor)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (logginIn) return

    const resultado = loginSchema.safeParse({ email, password })
    if (!resultado.success) {
      const errs = resultado.error.flatten().fieldErrors
      setErrores({ email: errs.email?.[0] || '', password: errs.password?.[0] || '' })
      setTouch({ email: true, password: true })
      return
    }

    if (email === EMAIL && password === PASS) {
      setLogginIn(true)
      setTimeout(() => {
        setHidden(true)
        setTimeout(() => onLogin(), 500)
      }, 600)
    } else {
      showToast('error', 'Credenciales incorrectas')
    }
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-bg transition-opacity duration-400 px-6 py-4 md:px-12 md:py-8 ${
        hidden ? 'opacity-0 pointer-events-none' : ''
      }`}
    >
      <div className="grid grid-cols-1 md:grid-cols-[1fr_340px] items-center gap-4 md:gap-6 max-w-[90vw]">
        <div className="bg-surface border border-border rounded-3xl p-4 sm:p-6 md:p-8 w-full md:w-[400px] shadow-lg text-center">
          <div className="mb-9">
            <div className="w-14 h-14 bg-primary rounded-2xl inline-flex items-center justify-center text-white mb-4">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 22V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16"/><path d="M15 10h2a2 2 0 0 1 2 2v2a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V9.83a2 2 0 0 0-.59-1.42L18 4"/><path d="M3 22h12"/><circle cx="8" cy="10" r="1" fill="currentColor"/></svg>
            </div>
            <h1 className="text-text text-lg md:text-xl font-bold mb-1">Celeron Control</h1>
            <p className="text-tertiary text-sm">Sistema de Monitoreo de Surtidores</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-subtext">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => { setEmail(e.target.value); if (touch.email) validarCampo('email', e.target.value) }}
                onBlur={() => handleBlur('email')}
                placeholder="admin@gmail.com"
                autoFocus
                className={`w-full px-4 h-11 md:h-12 border rounded-xl bg-bg text-text text-sm outline-none transition-colors ${
                  touch.email && errores.email ? 'border-danger' : 'border-border focus:border-primary'
                }`}
              />
              {touch.email && errores.email && (
                <p className="text-danger text-xs">{errores.email}</p>
              )}
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-subtext">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={e => { setPassword(e.target.value); if (touch.password) validarCampo('password', e.target.value) }}
                onBlur={() => handleBlur('password')}
                placeholder="••••••••"
                className={`w-full px-4 h-11 md:h-12 border rounded-xl bg-bg text-text text-sm outline-none transition-colors ${
                  touch.password && errores.password ? 'border-danger' : 'border-border focus:border-primary'
                }`}
              />
              {touch.password && errores.password && (
                <p className="text-danger text-xs">{errores.password}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={logginIn}
              className="w-full h-11 md:h-12 bg-primary text-white rounded-xl font-semibold text-sm mt-2 transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-default"
            >
              {logginIn ? 'Ingresando...' : 'Iniciar Sesión'}
            </button>
          </form>
        </div>

        <div className="bg-surface border border-border rounded-2xl p-3 md:p-5 mt-6 md:mt-10 w-full md:w-[220px] shadow-lg relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Credenciales
          </div>
          <div className="mt-2 flex flex-col gap-3">
            <div>
              <p className="text-[10px] text-tertiary uppercase tracking-wider mb-1">Email</p>
              <p className="text-text text-sm font-mono break-all">{EMAIL}</p>
            </div>
            <div>
              <p className="text-[10px] text-tertiary uppercase tracking-wider mb-1">Contraseña</p>
              <p className="text-text text-sm font-mono">{PASS}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
