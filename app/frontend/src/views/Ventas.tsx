import { useState } from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js'
import { useVentas } from '../controllers/useVentas'
import { useSurtidores } from '../controllers/useSurtidores'
import { useCombustibles } from '../controllers/useCombustibles'
import { useAdapter } from '../services/adapterContext'
import { decimalABinario, multiplicarBinarios } from '../utils/binaryMath'
import Modal from '../components/Modal'
import ConfirmDialog from '../components/ConfirmDialog'
import { showToast } from '../components/Toast'
import { fmt, fmtNum } from '../utils/uiHelpers'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

export default function Ventas() {
  const adapter = useAdapter()
  const { data: ventas, crear, eliminar } = useVentas(adapter)
  const { data: surtidores } = useSurtidores(adapter)
  const { data: combustibles } = useCombustibles(adapter)

  const [modalNueva, setModalNueva] = useState(false)
  const [confirmarEliminar, setConfirmarEliminar] = useState<number | null>(null)
  const [guardando, setGuardando] = useState(false)

  const [busqueda, setBusqueda] = useState('')

  const [selSurtidor, setSelSurtidor] = useState<number>(0)
  const [selCombustible, setSelCombustible] = useState<number>(0)
  const [litros, setLitros] = useState<string>('')

  const litrosNum = parseFloat(litros) || 0
  const precioUnitario = combustibles.find(c => c.id === selCombustible)?.precioLitro || 0
  const total = litrosNum * precioUnitario

  const litrosBin = decimalABinario(litrosNum)
  const precioBin = decimalABinario(precioUnitario)
  const totalBin = multiplicarBinarios(litrosBin, precioBin)

  function getCombColor(combustibleId: number) {
    const c = combustibles.find(x => x.id === combustibleId)
    return c ? c.color : '#6b7280'
  }

  const totalVentas = ventas.reduce((a, v) => a + v.total, 0)
  const totalLitros = ventas.reduce((a, v) => a + v.litros, 0)
  const promedio = ventas.length ? totalVentas / ventas.length : 0

  const horas: Record<string, number> = {}
  ventas.forEach(v => {
    const h = String(new Date(v.fecha).getHours()).padStart(2, '0')
    horas[h] = (horas[h] || 0) + v.total
  })
  const sorted = Object.keys(horas).sort()
  const lineLabels = sorted.map(h => h + ':00')
  const lineData = sorted.map(h => horas[h])

  const filtradas = busqueda.trim()
    ? ventas.filter(v =>
        v.surtidor.toLowerCase().includes(busqueda.toLowerCase()) ||
        v.combustible.toLowerCase().includes(busqueda.toLowerCase()) ||
        v.fecha.includes(busqueda) ||
        v.total.toString().includes(busqueda) ||
        v.litros.toString().includes(busqueda)
      )
    : ventas

  async function handleCrear() {
    if (!selSurtidor || !selCombustible || litrosNum <= 0) return
    setGuardando(true)
    const ok = await crear(selSurtidor, selCombustible, litrosNum, total)
    setGuardando(false)
    if (ok) {
      showToast('exito', `Venta registrada: ${fmtNum(litrosNum)} L por ${fmt(total)}`)
      setModalNueva(false)
      setSelSurtidor(0)
      setSelCombustible(0)
      setLitros('')
    } else {
      showToast('error', 'Error al registrar venta')
    }
  }

  async function handleEliminar() {
    if (confirmarEliminar === null) return
    const ok = await eliminar(confirmarEliminar)
    if (ok) showToast('exito', 'Venta eliminada')
    setConfirmarEliminar(null)
  }

  const surtidoresActivos = surtidores.filter(s => s.estado === 'activo')

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <span className="text-sm text-tertiary">{ventas.length} transacciones</span>
        <button
          onClick={() => setModalNueva(true)}
          className="px-4 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          + Registrar Venta
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-5">
        <div className="bg-surface border border-border rounded-2xl p-5 flex flex-col gap-2 hover:bg-surface-hover transition-colors">
          <span className="text-sm font-medium text-subtext">Total Ventas</span>
          <span className="text-primary text-[28px] font-bold leading-none">{fmt(totalVentas)}</span>
        </div>
        <div className="bg-surface border border-border rounded-2xl p-5 flex flex-col gap-2 hover:bg-surface-hover transition-colors">
          <span className="text-sm font-medium text-subtext">Total Litros</span>
          <span className="text-success text-[28px] font-bold leading-none">{fmtNum(totalLitros)} L</span>
        </div>
        <div className="bg-surface border border-border rounded-2xl p-5 flex flex-col gap-2 hover:bg-surface-hover transition-colors">
          <span className="text-sm font-medium text-subtext">Ticket Promedio</span>
          <span className="text-warning text-[28px] font-bold leading-none">{fmt(promedio)}</span>
        </div>
        <div className="bg-surface border border-border rounded-2xl p-5 flex flex-col gap-2 hover:bg-surface-hover transition-colors">
          <span className="text-sm font-medium text-subtext">Transacciones</span>
          <span className="text-text text-[28px] font-bold leading-none">{ventas.length}</span>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-2xl p-5 mb-5">
        <div className="mb-3">
          <span className="text-base font-bold text-text">Ventas por Hora</span>
        </div>
        <div className="relative h-[260px]">
          <Line
            data={{
              labels: lineLabels,
              datasets: [{
                label: 'Ventas (Bs.)',
                data: lineData,
                borderColor: '#4d7cfe',
                backgroundColor: 'rgba(77,124,254,0.1)',
                fill: true,
                tension: 0.4,
                pointRadius: 4,
                pointBackgroundColor: '#4d7cfe',
                pointBorderColor: '#121218',
                pointBorderWidth: 2,
              }],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: { legend: { display: false } },
              scales: {
                y: { beginAtZero: true, grid: { color: '#2a2a3644' }, ticks: { color: '#9393a0' } },
                x: { grid: { display: false }, ticks: { color: '#9393a0' } },
              },
            }}
          />
        </div>
      </div>

      <div className="bg-surface border border-border rounded-2xl overflow-hidden">
        <div className="px-5 py-3.5 border-b border-border flex items-center justify-between">
          <span className="text-base font-bold text-text">Registro de Ventas</span>
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={busqueda}
              onChange={e => setBusqueda(e.target.value)}
              placeholder="Buscar surtidor, combustible, fecha..."
              className="px-3 py-1.5 border border-border rounded-lg bg-bg text-text text-xs outline-none w-64"
            />
            <span className="text-xs text-tertiary bg-surface-hover px-2.5 py-1 rounded-full">{filtradas.length} registros</span>
          </div>
        </div>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-surface-hover">
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-subtext">#</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-subtext">Fecha</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-subtext">Surtidor</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-subtext">Combustible</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-subtext">Litros</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-subtext">Total (Bs.)</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-subtext"></th>
            </tr>
          </thead>
          <tbody>
            {filtradas.map((v, i) => (
              <tr key={v.id} className="border-b border-border hover:bg-surface-hover transition-colors">
                <td className="px-5 py-3 text-sm text-tertiary">{i + 1}</td>
                <td className="px-5 py-3 text-sm text-text">{v.fecha}</td>
                <td className="px-5 py-3 text-sm font-semibold text-text">{v.surtidor}</td>
                <td className="px-5 py-3 text-sm font-medium" style={{ color: getCombColor(v.combustibleId) }}>{v.combustible}</td>
                <td className="px-5 py-3 text-sm text-text">{fmtNum(v.litros)} L</td>
                <td className="px-5 py-3 text-sm font-semibold text-text">{fmt(v.total)}</td>
                <td className="px-5 py-3">
                  <button
                    onClick={() => setConfirmarEliminar(v.id)}
                    className="text-tertiary hover:text-danger transition-colors"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="font-bold text-text border-t-2 border-border bg-surface-hover">
              <td colSpan={4} className="px-5 py-3 text-sm">TOTAL</td>
              <td className="px-5 py-3 text-sm">{fmtNum(filtradas.reduce((a, v) => a + v.litros, 0))} L</td>
              <td className="px-5 py-3 text-sm">{fmt(filtradas.reduce((a, v) => a + v.total, 0))}</td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>

      <Modal abierto={modalNueva} titulo="Registrar Venta" onClose={() => setModalNueva(false)}>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-subtext">Surtidor</label>
            <select
              value={selSurtidor}
              onChange={e => setSelSurtidor(Number(e.target.value))}
              className="w-full px-4 py-3 border border-border rounded-xl bg-bg text-text text-sm outline-none"
            >
              <option value={0}>Seleccionar surtidor...</option>
              {surtidoresActivos.map(s => (
                <option key={s.id} value={s.id}>{s.codigo} — {s.ubicacion}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-subtext">Combustible</label>
            <select
              value={selCombustible}
              onChange={e => setSelCombustible(Number(e.target.value))}
              className="w-full px-4 py-3 border border-border rounded-xl bg-bg text-text text-sm outline-none"
            >
              <option value={0}>Seleccionar combustible...</option>
              {combustibles.map(c => (
                <option key={c.id} value={c.id}>{c.nombre} — {fmt(c.precioLitro)}/L</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-subtext">Litros</label>
            <input
              type="number"
              value={litros}
              onChange={e => setLitros(e.target.value)}
              placeholder="0.00"
              min="0"
              step="0.1"
              className="w-full px-4 py-3 border border-border rounded-xl bg-bg text-text text-sm outline-none"
            />
          </div>

          {litrosNum > 0 && precioUnitario > 0 && (
            <div className="bg-surface-hover rounded-xl p-4 text-xs">
              <p className="font-bold text-subtext mb-3 uppercase tracking-wide">Cálculo con Aritmética Binaria</p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-tertiary">Litros (decimal):</span>
                  <span className="text-text font-semibold">{litrosNum}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-tertiary">Litros (binario):</span>
                  <span className="text-primary font-mono font-bold">{litrosBin}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-tertiary">Precio/L (decimal):</span>
                  <span className="text-text font-semibold">{precioUnitario}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-tertiary">Precio/L (binario):</span>
                  <span className="text-primary font-mono font-bold">{precioBin}</span>
                </div>
                <div className="border-t border-border my-1" />
                <div className="flex justify-between">
                  <span className="text-tertiary">Total = Litros × Precio:</span>
                  <span className="text-text font-semibold">{fmtNum(litrosNum)} × {fmt(precioUnitario)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-tertiary">Total (binario):</span>
                  <span className="text-success font-mono font-bold">{totalBin}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-tertiary">Total (decimal):</span>
                  <span className="text-success font-bold">{fmt(total)}</span>
                </div>
              </div>
            </div>
          )}

          <button
            onClick={handleCrear}
            disabled={guardando || !selSurtidor || !selCombustible || litrosNum <= 0}
            className="w-full py-3 bg-primary text-white rounded-xl font-semibold text-sm hover:opacity-90 disabled:opacity-50 transition-opacity"
          >
            {guardando ? 'Registrando...' : 'Registrar Venta'}
          </button>
        </div>
      </Modal>

      <ConfirmDialog
        abierto={confirmarEliminar !== null}
        titulo="Eliminar Venta"
        mensaje="¿Estás seguro de eliminar esta venta? Esta acción no se puede deshacer."
        onConfirmar={handleEliminar}
        onCancelar={() => setConfirmarEliminar(null)}
      />
    </div>
  )
}
