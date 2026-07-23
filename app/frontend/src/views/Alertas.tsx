import { mockAlertas } from '../services/mockData'

const tipoLabels = {
  nivel_bajo: 'NIVEL BAJO',
  nivel_critico: 'NIVEL CRÍTICO',
  mantenimiento: 'MANTENIMIENTO',
  fuga: 'FUGA DETECTADA',
}

export default function Alertas() {
  const activas = mockAlertas.filter(a => a.estado === 'activa')
  const resueltas = mockAlertas.filter(a => a.estado === 'resuelta')

  return (
    <div>
      <h1 className="text-text text-lg font-semibold mb-6 uppercase tracking-wider">Panel de Alertas</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-panel border border-border p-5">
          <p className="text-subtext text-[10px] uppercase tracking-widest mb-1">Activas</p>
          <p className="text-red text-2xl font-bold">{activas.length}</p>
        </div>
        <div className="bg-panel border border-border p-5">
          <p className="text-subtext text-[10px] uppercase tracking-widest mb-1">Resueltas</p>
          <p className="text-mint text-2xl font-bold">{resueltas.length}</p>
        </div>
      </div>

      <div className="bg-panel border border-border mb-6">
        <div className="px-5 py-3 border-b border-border">
          <h2 className="text-subtext text-xs uppercase tracking-widest">Alertas Activas</h2>
        </div>
        <div className="p-3">
          {activas.map(a => (
            <div
              key={a.id}
              className={`p-4 mb-2 border-l-2 ${
                a.tipo === 'nivel_critico' || a.tipo === 'fuga' ? 'border-red' : 'border-amber'
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className={`text-xs font-semibold ${
                    a.tipo === 'nivel_critico' || a.tipo === 'fuga' ? 'text-red' : 'text-amber'
                  }`}>
                    {tipoLabels[a.tipo]}
                  </p>
                  <p className="text-subtext text-[10px] mt-1">Surtidor N° {a.surtidor_id}</p>
                  <p className="text-subtext text-[10px] opacity-50 mt-0.5">{a.fecha}</p>
                </div>
                <span className="text-[10px] font-semibold text-red border border-red/30 px-2 py-1">
                  ACTIVA
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-panel border border-border">
        <div className="px-5 py-3 border-b border-border">
          <h2 className="text-subtext text-xs uppercase tracking-widest">Resueltas</h2>
        </div>
        <div className="p-3">
          {resueltas.map(a => (
            <div
              key={a.id}
              className="p-4 mb-2 border-l-2 border-mint opacity-60"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs font-semibold text-mint">
                    {tipoLabels[a.tipo]}
                  </p>
                  <p className="text-subtext text-[10px] mt-1">Surtidor N° {a.surtidor_id}</p>
                  <p className="text-subtext text-[10px] opacity-50 mt-0.5">{a.fecha}</p>
                </div>
                <span className="text-[10px] font-semibold text-mint border border-mint/30 px-2 py-1">
                  RESUELTA
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
