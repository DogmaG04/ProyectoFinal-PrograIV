import { useState } from 'react'
import { Bar, Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js'
import { useSurtidores } from '../controllers/useSurtidores'
import { useVentas } from '../controllers/useVentas'
import { useAlertas } from '../controllers/useAlertas'
import { useCombustibles } from '../controllers/useCombustibles'
import { useAdapter } from '../services/adapterContext'
import { fmt, fmtNum, statusTagClass } from '../utils/uiHelpers'

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend)

export default function Dashboard() {
  const adapter = useAdapter()
  const { data: surtidores } = useSurtidores(adapter)
  const { data: ventas } = useVentas(adapter)
  const { data: alertas } = useAlertas(adapter)
  const { data: combustibles } = useCombustibles(adapter)

  const [slideIdx, setSlideIdx] = useState(0)
  const slidesPorVista = 2
  const totalSlides = Math.ceil(surtidores.length / slidesPorVista)
  const parActual = surtidores.slice(slideIdx * slidesPorVista, slideIdx * slidesPorVista + slidesPorVista)

  const totalLitros = ventas.reduce((a, v) => a + v.litros, 0)
  const totalVentas = ventas.reduce((a, v) => a + v.total, 0)
  const activos = surtidores.filter(s => s.estado === 'activo').length
  const criticas = alertas.filter(a => a.tipo === 'critica').length

  const porComb = combustibles.map(c => ({
    nombre: c.nombre,
    litros: ventas.filter(v => v.combustibleId === c.id).reduce((a, v) => a + v.litros, 0),
    color: c.color,
  }))

  const porEstado: Record<string, number> = {}
  surtidores.forEach(s => { porEstado[s.estado] = (porEstado[s.estado] || 0) + 1 })
  const estadoColors: Record<string, string> = { activo: '#34d399', mantenimiento: '#fbbf24', 'fuera de servicio': '#f87171' }
  const estadoLabels = Object.keys(porEstado)

  return (
    <div>
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-surface border border-border rounded-2xl p-5 flex flex-col gap-2 hover:bg-surface-hover transition-colors">
          <span className="text-sm font-medium text-subtext">Ventas Hoy</span>
          <span className="text-primary text-[28px] font-bold leading-none">{fmt(totalVentas)}</span>
          <span className="text-xs text-tertiary">{ventas.length} transacciones</span>
        </div>
        <div className="bg-surface border border-border rounded-2xl p-5 flex flex-col gap-2 hover:bg-surface-hover transition-colors">
          <span className="text-sm font-medium text-subtext">Litros Vendidos</span>
          <span className="text-success text-[28px] font-bold leading-none">{fmtNum(totalLitros)} L</span>
          <span className="text-xs text-tertiary">{combustibles.length} tipos de combustible</span>
        </div>
        <div className="bg-surface border border-border rounded-2xl p-5 flex flex-col gap-2 hover:bg-surface-hover transition-colors">
          <span className="text-sm font-medium text-subtext">Surtidores Activos</span>
          <span className="text-warning text-[28px] font-bold leading-none">{activos} / {surtidores.length}</span>
          <span className="text-xs text-tertiary">{surtidores.length - activos} inactivos</span>
        </div>
        <div className="bg-surface border border-border rounded-2xl p-5 flex flex-col gap-2 hover:bg-surface-hover transition-colors">
          <span className="text-sm font-medium text-subtext">Alertas Críticas</span>
          <span className="text-danger text-[28px] font-bold leading-none">{criticas}</span>
          <span className="text-xs text-tertiary">{alertas.length} total</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-surface border border-border rounded-2xl overflow-hidden">
          <div className="px-5 py-3.5 border-b border-border">
            <span className="text-base font-bold text-text">Estado de Surtidores</span>
          </div>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-surface-hover">
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-subtext">Código</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-subtext">Ubicación</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-subtext">Estado</th>
              </tr>
            </thead>
            <tbody>
              {surtidores.map(s => (
                <tr key={s.id} className="border-b border-border hover:bg-surface-hover transition-colors">
                  <td className="px-5 py-3 text-sm font-semibold text-text">{s.codigo}</td>
                  <td className="px-5 py-3 text-sm text-subtext">{s.ubicacion}</td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wide ${statusTagClass(s.estado)}`}>
                      {s.estado}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-surface border border-border rounded-2xl overflow-hidden flex flex-col">
          <div className="px-5 py-3.5 border-b border-border flex items-center justify-between">
            <span className="text-base font-bold text-text">Niveles de Combustible</span>
            {totalSlides > 0 && (
              <span className="text-xs text-tertiary bg-surface-hover px-2.5 py-1 rounded-full">
                {slideIdx + 1} / {totalSlides}
              </span>
            )}
          </div>
          <div className="flex-1 flex items-center justify-center p-5 min-h-[240px]">
            {parActual.length > 0 ? (
              <div className="flex gap-8 w-full justify-center">
                {parActual.map(s => (
                  <div key={s.id} className="flex flex-col items-center gap-3 flex-1 min-w-0">
                    <div className="text-center">
                      <span className="text-sm font-bold text-text">{s.codigo}</span>
                      <span className="block text-[10px] text-tertiary mt-0.5 truncate">{s.ubicacion}</span>
                    </div>
                    {s.surtidos.length > 0 ? (
                      <div className="flex items-end justify-center gap-4">
                        {s.surtidos.map(st => {
                          const c = combustibles.find(x => x.id === st.combustibleId)
                          const pct = (st.nivel / st.capacidad) * 100
                          return (
                            <div key={st.combustibleId} className="flex flex-col items-center gap-1.5">
                              <span className="text-[11px] font-semibold text-text">{Math.round(pct)}%</span>
                              <div className="w-7 h-[90px] bg-surface-hover rounded-full overflow-hidden relative">
                                <div
                                  className="absolute bottom-0 left-0 w-full rounded-full transition-all duration-500"
                                  style={{ height: `${pct}%`, background: c?.color || '#6b7280' }}
                                />
                              </div>
                              <span className="text-[9px] text-subtext text-center leading-tight max-w-[56px] truncate">
                                {c?.nombre || '?'}
                              </span>
                            </div>
                          )
                        })}
                      </div>
                    ) : (
                      <span className="text-[10px] text-tertiary italic">Sin datos</span>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <span className="text-xs text-tertiary italic">No hay surtidores</span>
            )}
          </div>
          {totalSlides > 1 && (
            <div className="px-5 pb-4 flex items-center justify-between">
              <button
                onClick={() => setSlideIdx(i => (i - 1 + totalSlides) % totalSlides)}
                className="w-8 h-8 rounded-full bg-surface-hover hover:bg-primary/20 text-subtext hover:text-primary flex items-center justify-center transition-colors text-lg font-bold cursor-pointer"
              >
                &#8249;
              </button>
              <div className="flex gap-1.5">
                {Array.from({ length: totalSlides }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setSlideIdx(i)}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${i === slideIdx ? 'bg-primary w-5' : 'bg-surface-hover hover:bg-subtext w-2'}`}
                  />
                ))}
              </div>
              <button
                onClick={() => setSlideIdx(i => (i + 1) % totalSlides)}
                className="w-8 h-8 rounded-full bg-surface-hover hover:bg-primary/20 text-subtext hover:text-primary flex items-center justify-center transition-colors text-lg font-bold cursor-pointer"
              >
                &#8250;
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mb-6">
        <div className="bg-surface border border-border rounded-2xl">
          <div className="px-5 py-3.5 border-b border-border flex items-center justify-between">
            <span className="text-base font-bold text-text">Alertas Recientes</span>
            <span className="text-xs text-tertiary bg-surface-hover px-2.5 py-1 rounded-full">{alertas.length} total</span>
          </div>
          <div className="p-3 flex flex-col gap-2.5">
            {alertas.slice(0, 5).map(a => (
              <div key={a.id} className={`bg-surface border border-border border-l-4 ${a.tipo === 'critica' ? 'border-l-danger' : a.tipo === 'advertencia' ? 'border-l-warning' : 'border-l-primary'} rounded-2xl p-4 flex items-start justify-between gap-4 hover:bg-surface-hover transition-colors`}>
                <div className="flex flex-col gap-1.5 flex-1">
                  <span className="text-sm font-medium text-text">{a.mensaje}</span>
                  <div className="flex gap-3 text-xs text-tertiary">
                    <span>{a.surtidor}</span>
                    <span>{a.timestamp}</span>
                  </div>
                </div>
                <span className={`text-[11px] font-bold uppercase tracking-wide whitespace-nowrap px-3 py-1 rounded-full ${a.tipo === 'critica' ? 'text-danger bg-danger-light' : a.tipo === 'advertencia' ? 'text-warning bg-warning-light' : 'text-primary bg-primary-light'}`}>
                  {a.tipo}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-surface border border-border rounded-2xl p-5">
          <div className="mb-3">
            <span className="text-base font-bold text-text">Ventas por Combustible</span>
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
        <div className="bg-surface border border-border rounded-2xl p-5">
          <div className="mb-3">
            <span className="text-base font-bold text-text">Surtidores por Estado</span>
          </div>
          <div className="relative h-[260px]">
            <Doughnut
              data={{
                labels: estadoLabels.map(e => e.charAt(0).toUpperCase() + e.slice(1)),
                datasets: [{
                  data: estadoLabels.map(e => porEstado[e]),
                  backgroundColor: estadoLabels.map(e => estadoColors[e] || '#6b7280'),
                  borderWidth: 0,
                  hoverOffset: 6,
                }],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                cutout: '65%',
                plugins: {
                  legend: { position: 'bottom', labels: { color: '#9393a0', usePointStyle: true, padding: 16 } },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
