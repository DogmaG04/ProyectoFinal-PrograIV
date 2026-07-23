import { mockSurtidores } from '../services/mockData'

export default function Surtidores() {
  return (
    <div>
      <h1 className="text-text text-lg font-semibold mb-6 uppercase tracking-wider">Gestión de Surtidores</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockSurtidores.map(s => (
          <div key={s.id} className="bg-panel border border-border p-5 hover:bg-panel-hover transition-colors">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-cyan text-lg font-bold">N° {s.numero}</h3>
                <p className="text-subtext text-[10px] uppercase tracking-wider mt-1">{s.combustible}</p>
              </div>
              <span className={`text-[10px] font-semibold px-2 py-1 ${
                s.estadoNivel === 'critico' ? 'text-red border border-red/30' :
                s.estadoNivel === 'bajo' ? 'text-amber border border-amber/30' :
                'text-mint border border-mint/30'
              }`}>
                {s.estadoNivel === 'critico' ? 'CRÍTICO' :
                 s.estadoNivel === 'bajo' ? 'BAJO' : 'NORMAL'}
              </span>
            </div>

            <div className="mb-3">
              <div className="w-full bg-border h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    s.estadoNivel === 'critico' ? 'bg-red' :
                    s.estadoNivel === 'bajo' ? 'bg-amber' : 'bg-mint'
                  }`}
                  style={{ width: `${s.porcentajeNivel}%` }}
                />
              </div>
            </div>

            <div className="flex justify-between text-[10px] text-subtext">
              <span>{s.nivel}L / {s.capacidad}L</span>
              <span className={`font-semibold ${
                s.estadoNivel === 'critico' ? 'text-red' :
                s.estadoNivel === 'bajo' ? 'text-amber' : 'text-mint'
              }`}>{s.porcentajeNivel}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
