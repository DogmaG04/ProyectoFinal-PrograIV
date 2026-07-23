import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { COMBUSTIBLES, mockVentas, mockSurtidores } from '../services/mockData'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const fmt = (n: number) => 'Bs. ' + n.toLocaleString('es-BO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
const fmtNum = (n: number) => n.toLocaleString('es-BO', { minimumFractionDigits: 1, maximumFractionDigits: 1 })

function statusTagClass(estado: string) {
  const map: Record<string, string> = { activo: 'text-success bg-success-light', mantenimiento: 'text-warning bg-warning-light', 'fuera de servicio': 'text-danger bg-danger-light' }
  return map[estado] || ''
}

export default function Reportes() {
  const porComb = COMBUSTIBLES.map(c => {
    const ventasC = mockVentas.filter(v => v.combustibleId === c.id)
    return {
      ...c,
      litros: ventasC.reduce((a, v) => a + v.litros, 0),
      total: ventasC.reduce((a, v) => a + v.total, 0),
      transacciones: ventasC.length,
    }
  })

  const porSurt = mockSurtidores.filter(s => s.estado !== 'fuera de servicio').map(s => {
    const ventasS = mockVentas.filter(v => v.surtidorId === s.id)
    const porCombS = COMBUSTIBLES.map(c => {
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
      <div className="mb-4">
        <span className="text-base font-bold text-text">Resumen por Combustible</span>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-6">
        {porComb.map(c => (
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
    </div>
  )
}
