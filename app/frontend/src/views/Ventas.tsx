import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js'
import { mockVentas, COMBUSTIBLES } from '../services/mockData'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

const fmt = (n: number) => 'Bs. ' + n.toLocaleString('es-BO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
const fmtNum = (n: number) => n.toLocaleString('es-BO', { minimumFractionDigits: 1, maximumFractionDigits: 1 })

function getCombColor(combustibleId: number) {
  const c = COMBUSTIBLES.find(x => x.id === combustibleId)
  return c ? c.color : '#6b7280'
}

export default function Ventas() {
  const totalVentas = mockVentas.reduce((a, v) => a + v.total, 0)
  const totalLitros = mockVentas.reduce((a, v) => a + v.litros, 0)
  const promedio = mockVentas.length ? totalVentas / mockVentas.length : 0

  const horas: Record<string, number> = {}
  mockVentas.forEach(v => {
    const h = v.fecha.split(' ')[1]?.split(':')[0] || '00'
    horas[h] = (horas[h] || 0) + v.total
  })
  const sorted = Object.keys(horas).sort()
  const lineLabels = sorted.map(h => h + ':00')
  const lineData = sorted.map(h => horas[h])

  return (
    <div>
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
          <span className="text-text text-[28px] font-bold leading-none">{mockVentas.length}</span>
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
          <span className="text-xs text-tertiary bg-surface-hover px-2.5 py-1 rounded-full">{mockVentas.length} registros</span>
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
            </tr>
          </thead>
          <tbody>
            {mockVentas.map((v, i) => (
              <tr key={v.id} className="border-b border-border hover:bg-surface-hover transition-colors">
                <td className="px-5 py-3 text-sm text-tertiary">{i + 1}</td>
                <td className="px-5 py-3 text-sm text-text">{v.fecha}</td>
                <td className="px-5 py-3 text-sm font-semibold text-text">{v.surtidor}</td>
                <td className="px-5 py-3 text-sm font-medium" style={{ color: getCombColor(v.combustibleId) }}>{v.combustible}</td>
                <td className="px-5 py-3 text-sm text-text">{fmtNum(v.litros)} L</td>
                <td className="px-5 py-3 text-sm font-semibold text-text">{fmt(v.total)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="font-bold text-text border-t-2 border-border bg-surface-hover">
              <td colSpan={4} className="px-5 py-3 text-sm">TOTAL</td>
              <td className="px-5 py-3 text-sm">{fmtNum(totalLitros)} L</td>
              <td className="px-5 py-3 text-sm">{fmt(totalVentas)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}
