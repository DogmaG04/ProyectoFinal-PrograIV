import { useSurtidores } from '../controllers/useSurtidores'
import { useCombustibles } from '../controllers/useCombustibles'

function statusTagClass(estado: string) {
  const map: Record<string, string> = { activo: 'text-success bg-success-light', mantenimiento: 'text-warning bg-warning-light', 'fuera de servicio': 'text-danger bg-danger-light' }
  return map[estado] || ''
}

function getNivelClass(nivel: number) {
  return nivel <= 20 ? 'animate-pulse' : ''
}

function getNivelColor(nivel: number) {
  if (nivel <= 20) return '#f87171'
  if (nivel <= 40) return '#fbbf24'
  return '#4d7cfe'
}

const fmtNum = (n: number) => n.toLocaleString('es-BO', { minimumFractionDigits: 1, maximumFractionDigits: 1 })

export default function Surtidores() {
  const { data: surtidores } = useSurtidores()
  const { data: combustibles } = useCombustibles()

  return (
    <div>
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
              <div className="grid grid-cols-3 gap-4">
                {gauges}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
