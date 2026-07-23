import { useState, useEffect } from 'react'
import { useAlertas } from '../controllers/useAlertas'
import { useSurtidores } from '../controllers/useSurtidores'
import { useAdapter } from '../services/adapterContext'
import { alertSubject, Observer, DBAlerta } from '../patterns/observer/AlertObserver'
import Modal from '../components/Modal'
import ConfirmDialog from '../components/ConfirmDialog'
import { showToast } from '../components/Toast'

const labels: Record<string, string> = { todas: 'Todas', critica: 'Crítica', advertencia: 'Advertencia', info: 'Info' }
const tipos = ['todas', 'critica', 'advertencia', 'info'] as const

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

  const [notificaciones, setNotificaciones] = useState<DBAlerta[]>([])

  useEffect(() => {
    const observer: Observer = {
      notificar(alerta: DBAlerta) {
        setNotificaciones(prev => [alerta, ...prev].slice(0, 5))
        showToast('info', `Nueva alerta: ${alerta.mensaje}`)
      },
    }
    const unsub = alertSubject.suscribir(observer)
    return unsub
  }, [])

  const counts: Record<string, number> = {}
  tipos.forEach(t => {
    counts[t] = t === 'todas' ? alertas.length : alertas.filter(a => a.tipo === t).length
  })

  const filtered = filter === 'todas' ? alertas : alertas.filter(a => a.tipo === filter)

  async function handleCrear() {
    if (!selSurtidor || !mensaje.trim()) return
    setGuardando(true)
    const ok = await crear(tipo, selSurtidor, mensaje.trim())
    setGuardando(false)
    if (ok) {
      showToast('exito', 'Alerta creada')
      setModalNueva(false)
      setMensaje('')
      setSelSurtidor(0)
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
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2">
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
        <button
          onClick={() => setModalNueva(true)}
          className="px-4 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          + Nueva Alerta
        </button>
      </div>

      {notificaciones.length > 0 && (
        <div className="mb-4 bg-primary-light border border-primary/20 rounded-xl p-3">
          <p className="text-xs font-semibold text-primary mb-2">Notificaciones en tiempo real (Observer):</p>
          {notificaciones.map((n, i) => (
            <p key={i} className="text-xs text-subtext">{n.timestamp} — {n.mensaje}</p>
          ))}
        </div>
      )}

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
              <div className="flex items-center gap-2">
                <span className={`text-[11px] font-bold uppercase tracking-wide whitespace-nowrap px-3 py-1 rounded-full ${a.tipo === 'critica' ? 'text-danger bg-danger-light' : a.tipo === 'advertencia' ? 'text-warning bg-warning-light' : 'text-primary bg-primary-light'}`}>
                  {a.tipo}
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
          ))
        )}
      </div>

      <Modal abierto={modalNueva} titulo="Nueva Alerta" onClose={() => setModalNueva(false)}>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-subtext">Tipo</label>
            <select
              value={tipo}
              onChange={e => setTipo(e.target.value as typeof tipo)}
              className="w-full px-4 py-3 border border-border rounded-xl bg-bg text-text text-sm outline-none"
            >
              <option value="critica">Crítica</option>
              <option value="advertencia">Advertencia</option>
              <option value="info">Info</option>
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-subtext">Surtidor</label>
            <select
              value={selSurtidor}
              onChange={e => setSelSurtidor(Number(e.target.value))}
              className="w-full px-4 py-3 border border-border rounded-xl bg-bg text-text text-sm outline-none"
            >
              <option value={0}>Seleccionar surtidor...</option>
              {surtidores.map(s => (
                <option key={s.id} value={s.id}>{s.codigo} — {s.ubicacion}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-subtext">Mensaje</label>
            <textarea
              value={mensaje}
              onChange={e => setMensaje(e.target.value)}
              placeholder="Descripción de la alerta..."
              rows={3}
              className="w-full px-4 py-3 border border-border rounded-xl bg-bg text-text text-sm outline-none resize-none"
            />
          </div>
          <button
            onClick={handleCrear}
            disabled={guardando || !selSurtidor || !mensaje.trim()}
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
