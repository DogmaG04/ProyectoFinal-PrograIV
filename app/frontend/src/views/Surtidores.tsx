import { useState } from 'react'
import { useSurtidores } from '../controllers/useSurtidores'
import { useCombustibles } from '../controllers/useCombustibles'
import { useAdapter } from '../services/adapterContext'
import { SurtidorFactory, TipoSurtidor } from '../patterns/factory/SurtidorFactory'
import Modal from '../components/Modal'
import ConfirmDialog from '../components/ConfirmDialog'
import { showToast } from '../components/Toast'
import { fmtNum, statusTagClass, getNivelClass, getNivelColor } from '../utils/uiHelpers'

export default function Surtidores() {
  const adapter = useAdapter()
  const { data: surtidores, crear, editar, eliminar } = useSurtidores(adapter)
  const { data: combustibles } = useCombustibles(adapter)

  const [modalCrear, setModalCrear] = useState(false)
  const [modalEditar, setModalEditar] = useState<number | null>(null)
  const [confirmarEliminar, setConfirmarEliminar] = useState<number | null>(null)

  const [tipo, setTipo] = useState<TipoSurtidor>('estacionario')
  const [codigo, setCodigo] = useState('')
  const [ubicacion, setUbicacion] = useState('')
  const [editEstado, setEditEstado] = useState<'activo' | 'mantenimiento' | 'fuera de servicio'>('activo')
  const [guardando, setGuardando] = useState(false)

  async function handleCrear() {
    if (!codigo.trim() || !ubicacion.trim()) return
    setGuardando(true)
    const config = SurtidorFactory.obtenerConfiguracion(tipo)
    const surtidos = config.combustibles.map(c => ({
      combustibleId: c.combustibleId,
      nivel: c.nivelInicial,
      capacidad: c.capacidad,
    }))
    const ok = await crear(codigo.trim(), ubicacion.trim(), 'activo', surtidos)
    setGuardando(false)
    if (ok) {
      showToast('exito', `Surtidor ${codigo} creado (${tipo})`)
      setModalCrear(false)
      setCodigo('')
      setUbicacion('')
    } else {
      showToast('error', 'Error al crear surtidor')
    }
  }

  function abrirEditar(s: typeof surtidores[0]) {
    setModalEditar(s.id)
    setEditEstado(s.estado)
  }

  async function handleEditar() {
    if (modalEditar === null) return
    setGuardando(true)
    const ok = await editar(modalEditar, { estado: editEstado })
    setGuardando(false)
    if (ok) {
      showToast('exito', 'Surtidor actualizado')
      setModalEditar(null)
    }
  }

  async function handleEliminar() {
    if (confirmarEliminar === null) return
    const ok = await eliminar(confirmarEliminar)
    if (ok) {
      showToast('exito', 'Surtidor eliminado')
    }
    setConfirmarEliminar(null)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <span className="text-sm text-tertiary">{surtidores.length} surtidores registrados</span>
        <button
          onClick={() => setModalCrear(true)}
          className="px-4 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          + Nuevo Surtidor
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {surtidores.map(s => {
          const gauges = s.surtidos.map(st => {
            const c = combustibles.find(x => x.id === st.combustibleId)
            if (!c) return null
            const pct = (st.nivel / st.capacidad) * 100
            const litrosAct = (pct * st.capacidad) / 100
            return (
              <div key={c.id} className="flex flex-col gap-2">
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-bold" style={{ color: c.color }}>{c.nombre}</span>
                  <span className="text-xs text-tertiary font-medium">{Math.round(pct)}% — {fmtNum(litrosAct)} L</span>
                </div>
                <div className="w-full h-2.5 bg-surface-hover rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${getNivelClass(pct)}`} style={{ width: `${pct}%`, background: getNivelColor(pct) }} />
                </div>
              </div>
            )
          })

          return (
            <div key={s.id} className="bg-surface border border-border rounded-2xl p-5 hover:bg-surface-hover transition-colors">
              <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-border">
                <span className="text-lg font-bold text-text">{s.codigo}</span>
                <span className="text-xs text-tertiary">{s.ubicacion}</span>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wide ${statusTagClass(s.estado)}`}>
                  {s.estado}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-4">
                {gauges}
              </div>
              <div className="flex gap-2 pt-3 border-t border-border">
                <button
                  onClick={() => abrirEditar(s)}
                  className="flex-1 px-3 py-2 rounded-xl text-xs font-medium bg-surface-hover border border-border text-subtext hover:text-text transition-colors"
                >
                  Editar
                </button>
                <button
                  onClick={() => setConfirmarEliminar(s.id)}
                  className="flex-1 px-3 py-2 rounded-xl text-xs font-medium bg-danger-light border border-danger/20 text-danger hover:opacity-80 transition-opacity"
                >
                  Eliminar
                </button>
              </div>
            </div>
          )
        })}
      </div>

      <Modal abierto={modalCrear} titulo="Nuevo Surtidor" onClose={() => setModalCrear(false)}>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-subtext">Tipo de Surtidor</label>
            <select
              value={tipo}
              onChange={e => setTipo(e.target.value as TipoSurtidor)}
              className="w-full px-4 py-3 border border-border rounded-xl bg-bg text-text text-sm outline-none"
            >
              <option value="estacionario">Estacionario (3 combustibles, capacidad media)</option>
              <option value="portatil">Portátil (2 combustibles, capacidad baja)</option>
              <option value="industrial">Industrial (3 combustibles, capacidad alta)</option>
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-subtext">Código</label>
            <input
              value={codigo}
              onChange={e => setCodigo(e.target.value)}
              placeholder="Ej: S-007"
              className="w-full px-4 py-3 border border-border rounded-xl bg-bg text-text text-sm outline-none"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-subtext">Ubicación</label>
            <input
              value={ubicacion}
              onChange={e => setUbicacion(e.target.value)}
              placeholder="Ej: Isla 4 — Lateral Norte"
              className="w-full px-4 py-3 border border-border rounded-xl bg-bg text-text text-sm outline-none"
            />
          </div>
          <div className="bg-surface-hover rounded-xl p-3 text-xs text-tertiary">
            <p className="font-semibold text-subtext mb-1">Surtidos que se crearán:</p>
            {SurtidorFactory.obtenerConfiguracion(tipo).combustibles.map(c => {
              const comb = combustibles.find(x => x.id === c.combustibleId)
              return (
                <p key={c.combustibleId}>
                  {comb?.nombre || `Combustible ${c.combustibleId}`} — Capacidad: {c.capacidad}L, Nivel inicial: {c.nivelInicial}L
                </p>
              )
            })}
          </div>
          <button
            onClick={handleCrear}
            disabled={guardando || !codigo.trim() || !ubicacion.trim()}
            className="w-full py-3 bg-primary text-white rounded-xl font-semibold text-sm hover:opacity-90 disabled:opacity-50 transition-opacity"
          >
            {guardando ? 'Creando...' : 'Crear Surtidor'}
          </button>
        </div>
      </Modal>

      <Modal abierto={modalEditar !== null} titulo="Editar Surtidor" onClose={() => setModalEditar(null)}>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-subtext">Estado</label>
            <select
              value={editEstado}
              onChange={e => setEditEstado(e.target.value as typeof editEstado)}
              className="w-full px-4 py-3 border border-border rounded-xl bg-bg text-text text-sm outline-none"
            >
              <option value="activo">Activo</option>
              <option value="mantenimiento">Mantenimiento</option>
              <option value="fuera de servicio">Fuera de servicio</option>
            </select>
          </div>
          <button
            onClick={handleEditar}
            disabled={guardando}
            className="w-full py-3 bg-primary text-white rounded-xl font-semibold text-sm hover:opacity-90 disabled:opacity-50 transition-opacity"
          >
            {guardando ? 'Guardando...' : 'Guardar Cambios'}
          </button>
        </div>
      </Modal>

      <ConfirmDialog
        abierto={confirmarEliminar !== null}
        titulo="Eliminar Surtidor"
        mensaje="¿Estás seguro de eliminar este surtidor? Esta acción no se puede deshacer."
        onConfirmar={handleEliminar}
        onCancelar={() => setConfirmarEliminar(null)}
      />
    </div>
  )
}
