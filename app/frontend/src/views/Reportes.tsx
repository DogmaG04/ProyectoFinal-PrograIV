import { useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { useVentas } from '../controllers/useVentas'
import { useSurtidores } from '../controllers/useSurtidores'
import { useCombustibles } from '../controllers/useCombustibles'
import { useAdapter } from '../services/adapterContext'
import { decodificarReportes, decodificarVentas } from '../utils/decoders'
import { fmt, fmtNum, statusTagClass } from '../utils/uiHelpers'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function Reportes() {
  const adapter = useAdapter()
  const { data: combustibles } = useCombustibles(adapter)
  const { data: ventas } = useVentas(adapter)
  const { data: surtidores } = useSurtidores(adapter)

  const [mostrarBinario, setMostrarBinario] = useState(false)

  const precios: Record<number, number> = {}
  combustibles.forEach(c => { precios[c.id] = c.precioLitro })

  const reportes = decodificarReportes(ventas, combustibles)
  const ventasDecodificadas = decodificarVentas(ventas, precios)

  const porComb = combustibles.map(c => {
    const ventasC = ventas.filter(v => v.combustibleId === c.id)
    return {
      ...c,
      litros: ventasC.reduce((a, v) => a + v.litros, 0),
      total: ventasC.reduce((a, v) => a + v.total, 0),
      transacciones: ventasC.length,
    }
  })

  const porSurt = surtidores.filter(s => s.estado !== 'fuera de servicio').map(s => {
    const ventasS = ventas.filter(v => v.surtidorId === s.id)
    const porCombS = combustibles.map(c => {
      const v = ventasS.filter(x => x.combustibleId === c.id)
      return {
        nombre: c.nombre,
        color: c.color,
        litros: v.reduce((a, x) => a + x.litros, 0),
        total: v.reduce((a, x) => a + x.total, 0),
      }
    })
    return {
      ...s,
      litros: ventasS.reduce((a, v) => a + v.litros, 0),
      total: ventasS.reduce((a, v) => a + v.total, 0),
      transacciones: ventasS.length,
      porComb: porCombS,
    }
  })

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <span className="text-base font-bold text-text">Resumen por Combustible</span>
        <button
          onClick={() => setMostrarBinario(!mostrarBinario)}
          className={`px-4 py-2 rounded-xl text-xs font-medium border transition-all ${
            mostrarBinario
              ? 'bg-primary-light border-primary/30 text-primary'
              : 'bg-surface border-border text-subtext hover:text-text'
          }`}
        >
          {mostrarBinario ? 'Binario: ON' : 'Binario: OFF'}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {porComb.map((c, i) => (
          <div key={c.id} className="bg-surface border border-border rounded-2xl p-5">
            <div className="flex items-center gap-2.5 pb-3 mb-4 border-b border-border">
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: c.color }} />
              <span className="text-sm font-bold" style={{ color: c.color }}>{c.nombre}</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm"><span className="text-subtext">Precio / litro</span><span className="text-text font-semibold">{fmt(c.precioLitro)}</span></div>
              <div className="flex justify-between text-sm"><span className="text-subtext">Litros vendidos</span><span className="text-text font-semibold">{fmtNum(c.litros)} L</span></div>
              <div className="flex justify-between text-sm"><span className="text-subtext">Total en ventas</span><span className="text-text font-semibold">{fmt(c.total)}</span></div>
              <div className="flex justify-between text-sm"><span className="text-subtext">Transacciones</span><span className="text-text font-semibold">{c.transacciones}</span></div>
              {mostrarBinario && reportes[i] && (
                <>
                  <div className="border-t border-border my-1" />
                  <div className="flex justify-between text-xs"><span className="text-tertiary">Litros (bin)</span><span className="text-primary font-mono font-bold">{reportes[i].totalLitrosBinario}</span></div>
                  <div className="flex justify-between text-xs"><span className="text-tertiary">Total (bin)</span><span className="text-primary font-mono font-bold">{reportes[i].totalVentasBinario}</span></div>
                  <div className="flex justify-between text-xs"><span className="text-tertiary">Precio prom (bin)</span><span className="text-primary font-mono font-bold">{reportes[i].precioPromedioBinario}</span></div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-surface border border-border rounded-2xl p-5 mb-6">
        <div className="mb-3">
          <span className="text-base font-bold text-text">Litros Vendidos por Combustible</span>
        </div>
        <div className="relative h-[260px]">
          <Bar
            data={{
              labels: porComb.map(c => c.nombre),
              datasets: [{
                label: 'Litros',
                data: porComb.map(c => c.litros),
                backgroundColor: porComb.map(c => c.color + '99'),
                borderColor: porComb.map(c => c.color),
                borderWidth: 1.5,
                borderRadius: 6,
                barPercentage: 0.5,
              }],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              indexAxis: 'y',
              plugins: { legend: { display: false } },
              scales: {
                x: { beginAtZero: true, grid: { color: '#2a2a3644' }, ticks: { color: '#9393a0' } },
                y: { grid: { display: false }, ticks: { color: '#9393a0' } },
              },
            }}
          />
        </div>
      </div>

      <div className="mb-4">
        <span className="text-base font-bold text-text">Resumen por Surtidor</span>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        {porSurt.map(s => (
          <div key={s.id} className="bg-surface border border-border rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-bold text-subtext uppercase tracking-wide">{s.codigo} — {s.ubicacion}</span>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wide ${statusTagClass(s.estado)}`}>
                {s.estado}
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm"><span className="text-subtext">Ventas totales</span><span className="text-text font-semibold">{fmt(s.total)}</span></div>
              <div className="flex justify-between text-sm"><span className="text-subtext">Litros totales</span><span className="text-text font-semibold">{fmtNum(s.litros)} L</span></div>
              <div className="flex justify-between text-sm"><span className="text-subtext">Transacciones</span><span className="text-text font-semibold">{s.transacciones}</span></div>
            </div>
            <div className="border-t border-border my-2.5" />
            <div className="space-y-2">
              {s.porComb.map(c => (
                <div key={c.nombre} className="flex justify-between text-sm">
                  <span className="font-medium" style={{ color: c.color }}>{c.nombre}</span>
                  <span className="text-text font-semibold">{fmtNum(c.litros)} L — {fmt(c.total)}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-surface border border-border rounded-2xl p-5">
        <div className="mb-3">
          <span className="text-base font-bold text-text">Ventas por Surtidor</span>
        </div>
        <div className="relative h-[260px]">
          <Bar
            data={{
              labels: porSurt.map(s => s.codigo),
              datasets: [{
                label: 'Ventas (Bs.)',
                data: porSurt.map(s => s.total),
                backgroundColor: '#4d7cfe99',
                borderColor: '#4d7cfe',
                borderWidth: 1.5,
                borderRadius: 6,
                barPercentage: 0.6,
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

      {mostrarBinario && (
        <div className="mt-6 bg-surface border border-border rounded-2xl overflow-hidden">
          <div className="px-5 py-3.5 border-b border-border">
            <span className="text-base font-bold text-text">Ventas Decodificadas (Binario)</span>
          </div>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-surface-hover">
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-subtext">Surtidor</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-subtext">Combustible</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-subtext">Litros (Dec)</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-subtext">Litros (Bin)</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-subtext">Precio (Bin)</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-subtext">Total (Dec)</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-subtext">Total (Bin)</th>
              </tr>
            </thead>
            <tbody>
              {ventasDecodificadas.map(v => (
                <tr key={v.id} className="border-b border-border hover:bg-surface-hover transition-colors">
                  <td className="px-5 py-3 text-sm font-semibold text-text">{v.surtidor}</td>
                  <td className="px-5 py-3 text-sm text-text">{v.combustible}</td>
                  <td className="px-5 py-3 text-sm text-text">{fmtNum(v.litros)}</td>
                  <td className="px-5 py-3 text-sm font-mono text-primary font-bold">{v.litrosBinario}</td>
                  <td className="px-5 py-3 text-sm font-mono text-primary font-bold">{v.precioBinario}</td>
                  <td className="px-5 py-3 text-sm font-semibold text-text">{fmt(v.total)}</td>
                  <td className="px-5 py-3 text-sm font-mono text-success font-bold">{v.totalBinario}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
