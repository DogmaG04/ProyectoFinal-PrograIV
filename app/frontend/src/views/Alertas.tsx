import { useState } from 'react'
import { useAlertas } from '../controllers/useAlertas'
import { useSurtidores } from '../controllers/useSurtidores'
import { useAdapter } from '../services/adapterContext'
import Modal from '../components/Modal'
import ConfirmDialog from '../components/ConfirmDialog'
import { showToast } from '../components/Toast'
import { alertaSchema } from '../schemas'
import Pagination from '../components/Pagination'

const labels: Record<string, string> = { todas: 'Todas', critica: 'Crítica', advertencia: 'Advertencia', info: 'Info' }
const tipos = ['todas', 'critica', 'advertencia', 'info'] as const

const categoriaConfig: Record<string, { borde: string; bg: string; icono: React.ReactNode }> = {
  critica: {
    borde: 'border-l-danger',
    bg: 'bg-danger-light',
    icono: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-danger">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    ),
  },
  advertencia: {
    borde: 'border-l-warning',
    bg: 'bg-warning-light',
    icono: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-warning">
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
    ),
  },
  info: {
    borde: 'border-l-primary',
    bg: 'bg-primary-light',
    icono: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
      </svg>
    ),
  },
}

const tagClasses: Record<string, string> = {
  critica: 'text-danger bg-danger-light',
  advertencia: 'text-warning bg-warning-light',
  info: 'text-primary bg-primary-light',
}

export default function Alertas() {
  const adapter = useAdapter()
  const { data: alertas, crear, eliminar } = useAlertas(adapter)
  const { data: surtidores } = useSurtidores(adapter)
  const [filter, setFilter] = useState<string>('todas')

  const [modalNueva, setModalNueva] = useState(false)
  const [confirmarEliminar, setConfirmarEliminar] = useState<number | null>(null)
  const [guardando, setGuardando] = useState(false)

  const [tipo, setTipo] = useState<'critica' | 'advertencia' | 'info'>('info')
  const [selSurtidor, setSelSurtidor] = useState<number>(0)
  const [mensaje, setMensaje] = useState('')
  const [errores, setErrores] = useState<Record<string, string>>({})
  const [touch, setTouch] = useState<Record<string, boolean>>({})
  const [paginaAlerta, setPaginaAlerta] = useState(1)
  const alertasPorPagina = 7

  const counts: Record<string, number> = {}
  tipos.forEach(t => {
    counts[t] = t === 'todas' ? alertas.length : alertas.filter(a => a.tipo === t).length
  })

  const filtered = filter === 'todas' ? alertas : alertas.filter(a => a.tipo === filter)

  const totalPaginasAlerta = Math.ceil(filtered.length / alertasPorPagina)
  const filteredPagina = filtered.slice((paginaAlerta - 1) * alertasPorPagina, paginaAlerta * alertasPorPagina)

  const criticas = filteredPagina.filter(a => a.tipo === 'critica')
  const advertencias = filteredPagina.filter(a => a.tipo === 'advertencia')
  const infos = filteredPagina.filter(a => a.tipo === 'info')

  const secciones: { tipo: string; alertas: typeof filtered }[] = []
  if (filter === 'todas' || filter === 'critica') secciones.push({ tipo: 'critica', alertas: criticas })
  if (filter === 'todas' || filter === 'advertencia') secciones.push({ tipo: 'advertencia', alertas: advertencias })
  if (filter === 'todas' || filter === 'info') secciones.push({ tipo: 'info', alertas: infos })

  function validarAlerta() {
    const resultado = alertaSchema.safeParse({ tipo, surtidorId: selSurtidor, mensaje })
    if (!resultado.success) {
      const errs = resultado.error.flatten().fieldErrors
      setErrores({
        tipo: errs.tipo?.[0] || '',
        surtidorId: errs.surtidorId?.[0] || '',
        mensaje: errs.mensaje?.[0] || '',
      })
      return false
    }
    setErrores({})
    return true
  }

  async function handleCrear() {
    if (!validarAlerta()) return
    setGuardando(true)
    const ok = await crear(tipo, selSurtidor, mensaje.trim())
    setGuardando(false)
    if (ok) {
      showToast('exito', 'Alerta creada correctamente')
      setModalNueva(false)
      setMensaje('')
      setSelSurtidor(0)
      setErrores({})
      setTouch({})
    } else {
      showToast('error', 'Error al crear alerta')
    }
  }

  async function handleEliminar() {
    if (confirmarEliminar === null) return
    const ok = await eliminar(confirmarEliminar)
    if (ok) showToast('exito', 'Alerta eliminada')
    setConfirmarEliminar(null)
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-5">
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {tipos.map(t => (
            <button
              key={t}
              onClick={() => { setFilter(t); setPaginaAlerta(1) }}
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
        <button
          onClick={() => setModalNueva(true)}
          className="px-4 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          + Nueva Alerta
        </button>
      </div>

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
        <div className="flex flex-col gap-5">
          {secciones.map(({ tipo: t, alertas: lista }) => {
            if (lista.length === 0) return null
            const cfg = categoriaConfig[t]
            return (
              <div key={t} className="bg-surface border border-border rounded-2xl overflow-hidden">
                <div className="px-5 py-3.5 border-b border-border flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    {cfg.icono}
                    <span className="text-sm font-bold text-text">{labels[t]}</span>
                  </div>
                  <span className="text-xs text-tertiary bg-surface-hover px-2.5 py-1 rounded-full">{lista.length}</span>
                </div>
                <div className="p-3 flex flex-col gap-2">
                  {lista.map(a => (
                    <div
                      key={a.id}
                      className={`bg-bg border border-border border-l-4 ${cfg.borde} rounded-xl p-3 md:p-4 flex items-start justify-between gap-3 md:gap-4 hover:bg-surface-hover transition-colors`}
                    >
                      <div className="flex flex-col gap-1.5 flex-1">
                        <span className="text-sm font-medium text-text">{a.mensaje}</span>
                        <div className="flex gap-3 text-xs text-tertiary">
                          <span>{a.surtidor}</span>
                          <span>{a.timestamp}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-[11px] font-bold uppercase tracking-wide whitespace-nowrap px-3 py-1 rounded-full ${tagClasses[a.tipo]}`}>
                          {labels[a.tipo]}
                        </span>
                        <button
                          onClick={() => setConfirmarEliminar(a.id)}
                          className="text-tertiary hover:text-danger transition-colors p-1"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}

      <Pagination
        paginaActual={paginaAlerta}
        totalPaginas={totalPaginasAlerta}
        totalItems={filtered.length}
        itemsPorPagina={alertasPorPagina}
        onCambioPagina={setPaginaAlerta}
      />

      <Modal abierto={modalNueva} titulo="Nueva Alerta" onClose={() => { setModalNueva(false); setErrores({}); setTouch({}) }}>
        <div className="flex flex-col gap-4 p-4 sm:p-6">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-subtext">Tipo</label>
            <select
              value={tipo}
              onChange={e => { setTipo(e.target.value as typeof tipo); if (touch.tipo) setErrores(prev => ({ ...prev, tipo: '' })) }}
              className={`w-full px-4 py-3 border rounded-xl bg-bg text-text text-sm outline-none ${
                errores.tipo ? 'border-danger' : 'border-border'
              }`}
            >
              <option value="critica">Crítica</option>
              <option value="advertencia">Advertencia</option>
              <option value="info">Info</option>
            </select>
            {errores.tipo && <p className="text-danger text-xs">{errores.tipo}</p>}
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-subtext">Surtidor</label>
            <select
              value={selSurtidor}
              onChange={e => { setSelSurtidor(Number(e.target.value)); if (touch.surtidorId) setErrores(prev => ({ ...prev, surtidorId: '' })) }}
              className={`w-full px-4 py-3 border rounded-xl bg-bg text-text text-sm outline-none ${
                errores.surtidorId ? 'border-danger' : 'border-border'
              }`}
            >
              <option value={0}>Seleccionar surtidor...</option>
              {surtidores.map(s => (
                <option key={s.id} value={s.id}>{s.codigo} — {s.ubicacion}</option>
              ))}
            </select>
            {errores.surtidorId && <p className="text-danger text-xs">{errores.surtidorId}</p>}
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-subtext">Mensaje</label>
            <textarea
              value={mensaje}
              onChange={e => { setMensaje(e.target.value); if (touch.mensaje) setErrores(prev => ({ ...prev, mensaje: '' })) }}
              onBlur={() => setTouch(prev => ({ ...prev, mensaje: true }))}
              placeholder="Descripción de la alerta..."
              rows={3}
              className={`w-full px-4 py-3 border rounded-xl bg-bg text-text text-sm outline-none resize-none ${
                errores.mensaje ? 'border-danger' : 'border-border'
              }`}
            />
            {errores.mensaje && <p className="text-danger text-xs">{errores.mensaje}</p>}
          </div>
          <button
            onClick={handleCrear}
            disabled={guardando}
            className="w-full py-3 bg-primary text-white rounded-xl font-semibold text-sm hover:opacity-90 disabled:opacity-50 transition-opacity"
          >
            {guardando ? 'Creando...' : 'Crear Alerta'}
          </button>
        </div>
      </Modal>

      <ConfirmDialog
        abierto={confirmarEliminar !== null}
        titulo="Eliminar Alerta"
        mensaje="¿Estás seguro de eliminar esta alerta? Esta acción no se puede deshacer."
        onConfirmar={handleEliminar}
        onCancelar={() => setConfirmarEliminar(null)}
      />
    </div>
  )
}
