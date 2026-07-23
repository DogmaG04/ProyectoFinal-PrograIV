import { useState } from 'react'
import { Bar, Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js'
import { useSurtidores } from '../controllers/useSurtidores'
import { useVentas } from '../controllers/useVentas'
import { useAlertas } from '../controllers/useAlertas'
import { useCombustibles } from '../controllers/useCombustibles'
import { useAdapter } from '../services/adapterContext'
import { fmt, fmtNum, statusTagClass } from '../utils/uiHelpers'
import Pagination from '../components/Pagination'

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend)

export default function Dashboard() {
  const adapter = useAdapter()
  const { data: surtidores } = useSurtidores(adapter)
  const { data: ventas } = useVentas(adapter)
  const { data: alertas } = useAlertas(adapter)
  const { data: combustibles } = useCombustibles(adapter)

  const [paginaSurt, setPaginaSurt] = useState(1)
  const [slideAlertas, setSlideAlertas] = useState(0)
  const surtPorPagina = 4
  const alertasPorSlide = 3

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

  const alertasOrdenadas = [...alertas].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
  const totalPaginasSurt = Math.ceil(surtidores.length / surtPorPagina)
  const surtPagina = surtidores.slice((paginaSurt - 1) * surtPorPagina, paginaSurt * surtPorPagina)
  const totalSlidesAlertas = Math.ceil(alertasOrdenadas.length / alertasPorSlide)
  const alertasSlide = alertasOrdenadas.slice(slideAlertas * alertasPorSlide, slideAlertas * alertasPorSlide + alertasPorSlide)

  return (
    <div>
      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
        <div className="bg-surface border border-border rounded-2xl p-3 md:p-5 flex flex-col gap-1.5 md:gap-2 hover:bg-surface-hover transition-colors">
          <span className="text-xs md:text-sm font-medium text-subtext">Ventas Hoy</span>
          <span className="text-primary text-lg md:text-[28px] font-bold leading-none">{fmt(totalVentas)}</span>
          <span className="text-[10px] md:text-xs text-tertiary">{ventas.length} transacciones</span>
        </div>
        <div className="bg-surface border border-border rounded-2xl p-3 md:p-5 flex flex-col gap-1.5 md:gap-2 hover:bg-surface-hover transition-colors">
          <span className="text-xs md:text-sm font-medium text-subtext">Litros Vendidos</span>
          <span className="text-success text-lg md:text-[28px] font-bold leading-none">{fmtNum(totalLitros)} L</span>
          <span className="text-[10px] md:text-xs text-tertiary">{combustibles.length} tipos de combustible</span>
        </div>
        <div className="bg-surface border border-border rounded-2xl p-3 md:p-5 flex flex-col gap-1.5 md:gap-2 hover:bg-surface-hover transition-colors">
          <span className="text-xs md:text-sm font-medium text-subtext">Surtidores Activos</span>
          <span className="text-warning text-lg md:text-[28px] font-bold leading-none">{activos} / {surtidores.length}</span>
          <span className="text-[10px] md:text-xs text-tertiary">{surtidores.length - activos} inactivos</span>
        </div>
        <div className="bg-surface border border-border rounded-2xl p-3 md:p-5 flex flex-col gap-1.5 md:gap-2 hover:bg-surface-hover transition-colors">
          <span className="text-xs md:text-sm font-medium text-subtext">Alertas Críticas</span>
          <span className="text-danger text-lg md:text-[28px] font-bold leading-none">{criticas}</span>
          <span className="text-[10px] md:text-xs text-tertiary">{alertas.length} total</span>
        </div>
      </div>

      {/* Estado Surtidores + Alertas Recientes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {/* Estado de Surtidores */}
        <div className="bg-surface border border-border rounded-2xl overflow-hidden">
          <div className="px-4 md:px-5 py-3 md:py-3.5 border-b border-border">
            <span className="text-base md:text-lg font-bold text-text">Estado de Surtidores</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse min-w-[400px]">
              <thead>
                <tr className="bg-surface-hover">
                  <th className="text-left px-4 md:px-5 py-3 md:py-3.5 text-xs font-semibold text-subtext">Código</th>
                  <th className="text-left px-4 md:px-5 py-3 md:py-3.5 text-xs font-semibold text-subtext">Ubicación</th>
                  <th className="text-left px-4 md:px-5 py-3 md:py-3.5 text-xs font-semibold text-subtext">Estado</th>
                </tr>
              </thead>
              <tbody>
                {surtPagina.map(s => (
                  <tr key={s.id} className="border-b border-border hover:bg-surface-hover transition-colors">
                    <td className="px-4 md:px-5 py-2.5 md:py-3 text-sm font-semibold text-text">{s.codigo}</td>
                    <td className="px-4 md:px-5 py-2.5 md:py-3 text-sm text-subtext">{s.ubicacion}</td>
                    <td className="px-4 md:px-5 py-2.5 md:py-3">
                      <span className={`inline-flex items-center px-2.5 md:px-3 py-1 rounded-full text-[10px] md:text-[11px] font-semibold uppercase tracking-wide ${statusTagClass(s.estado)}`}>
                        {s.estado}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination
            paginaActual={paginaSurt}
            totalPaginas={totalPaginasSurt}
            totalItems={surtidores.length}
            itemsPorPagina={surtPorPagina}
            onCambioPagina={setPaginaSurt}
          />
        </div>

        {/* Alertas Recientes */}
        <div className="bg-surface border border-border rounded-2xl overflow-hidden flex flex-col">
          <div className="px-4 md:px-5 py-3 md:py-3.5 border-b border-border flex items-center justify-between">
            <span className="text-base md:text-lg font-bold text-text">Alertas Recientes</span>
            {totalSlidesAlertas > 0 && (
              <span className="text-[10px] md:text-xs text-tertiary bg-surface-hover px-2 md:px-2.5 py-1 rounded-full">
                {slideAlertas + 1} / {totalSlidesAlertas}
              </span>
            )}
          </div>
          <div className="p-3 flex flex-col gap-2.5 min-h-[120px] overflow-hidden">
            {alertasSlide.length > 0 ? alertasSlide.map(a => (
              <div key={a.id} className={`bg-surface border border-border border-l-4 ${a.tipo === 'critica' ? 'border-l-danger' : a.tipo === 'advertencia' ? 'border-l-warning' : 'border-l-primary'} rounded-2xl p-3 md:p-4 flex items-start justify-between gap-3 md:gap-4 hover:bg-surface-hover transition-colors`}>
                <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                  <span className="text-xs md:text-sm font-medium text-text">{a.mensaje}</span>
                  <div className="flex gap-2 md:gap-3 text-[10px] md:text-xs text-tertiary">
                    <span className="truncate">{a.surtidor}</span>
                    <span className="whitespace-nowrap">{a.timestamp}</span>
                  </div>
                </div>
                <span className={`text-[10px] md:text-[11px] font-bold uppercase tracking-wide whitespace-nowrap px-2.5 md:px-3 py-1 rounded-full ${a.tipo === 'critica' ? 'text-danger bg-danger-light' : a.tipo === 'advertencia' ? 'text-warning bg-warning-light' : 'text-primary bg-primary-light'}`}>
                  {a.tipo}
                </span>
              </div>
            )) : (
              <span className="text-[10px] md:text-xs text-tertiary italic text-center py-4">No hay alertas</span>
            )}
          </div>
          {totalSlidesAlertas > 1 && (
            <div className="px-4 md:px-5 pb-4 flex items-center justify-between">
              <button
                onClick={() => setSlideAlertas(i => (i - 1 + totalSlidesAlertas) % totalSlidesAlertas)}
                className="w-8 h-8 rounded-full bg-surface-hover hover:bg-primary/20 text-subtext hover:text-primary flex items-center justify-center transition-colors text-lg font-bold cursor-pointer"
              >
                &#8249;
              </button>
              <div className="flex gap-1.5">
                {Array.from({ length: totalSlidesAlertas }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setSlideAlertas(i)}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${i === slideAlertas ? 'bg-primary w-5' : 'bg-surface-hover hover:bg-subtext w-2'}`}
                  />
                ))}
              </div>
              <button
                onClick={() => setSlideAlertas(i => (i + 1) % totalSlidesAlertas)}
                className="w-8 h-8 rounded-full bg-surface-hover hover:bg-primary/20 text-subtext hover:text-primary flex items-center justify-center transition-colors text-lg font-bold cursor-pointer"
              >
                &#8250;
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-surface border border-border rounded-2xl p-4 md:p-5">
          <div className="mb-3">
            <span className="text-base md:text-lg font-bold text-text">Ventas por Combustible</span>
          </div>
          <div className="relative min-h-[220px] md:min-h-[260px]">
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
        <div className="bg-surface border border-border rounded-2xl p-4 md:p-5">
          <div className="mb-3">
            <span className="text-base md:text-lg font-bold text-text">Surtidores por Estado</span>
          </div>
          <div className="relative min-h-[220px] md:min-h-[260px]">
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
