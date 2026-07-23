import { mockSurtidores, mockAlertas } from '../services/mockData'

export default function Dashboard() {
  const totalSurtidores = mockSurtidores.length
  const criticos = mockSurtidores.filter(s => s.estadoNivel === 'critico').length
  const normales = mockSurtidores.filter(s => s.estadoNivel === 'normal').length
  const activas = mockAlertas.filter(a => a.estado === 'activa').length

  return (
    <div>
      <h1 className="text-text text-lg font-semibold mb-6 uppercase tracking-wider">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-panel border border-border p-5">
          <p className="text-subtext text-[10px] uppercase tracking-widest mb-1">Ltrs Hoy</p>
          <p className="text-cyan text-2xl font-bold">306.5L</p>
        </div>
        <div className="bg-panel border border-border p-5">
          <p className="text-subtext text-[10px] uppercase tracking-widest mb-1">Ingresos Hoy</p>
          <p className="text-mint text-2xl font-bold">$343.75</p>
        </div>
        <div className="bg-panel border border-border p-5">
          <p className="text-subtext text-[10px] uppercase tracking-widest mb-1">Tanques Alerta</p>
          <p className="text-red text-2xl font-bold">{criticos}</p>
        </div>
        <div className="bg-panel border border-border p-5">
          <p className="text-subtext text-[10px] uppercase tracking-widest mb-1">Surtidores ON</p>
          <p className="text-amber text-2xl font-bold">{normales}/{totalSurtidores}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-panel border border-border">
          <div className="px-5 py-3 border-b border-border">
            <h2 className="text-subtext text-xs uppercase tracking-widest">Estado de Surtidores</h2>
          </div>
          <div className="p-5 space-y-4">
            {mockSurtidores.map(s => (
              <div key={s.id} className="flex items-center gap-4">
                <span className="text-cyan text-sm font-semibold w-8">N°{s.numero}</span>
                <div className="flex-1">
                  <div className="flex justify-between text-[10px] text-subtext mb-1">
                    <span>{s.combustible}</span>
                    <span>{s.nivel}L / {s.capacidad}L</span>
                  </div>
                  <div className="w-full bg-border h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        s.estadoNivel === 'critico' ? 'bg-red' :
                        s.estadoNivel === 'bajo' ? 'bg-amber' : 'bg-mint'
                      }`}
                      style={{ width: `${s.porcentajeNivel}%` }}
                    />
                  </div>
                </div>
                <span className={`text-[10px] font-semibold w-12 text-right ${
                  s.estadoNivel === 'critico' ? 'text-red' :
                  s.estadoNivel === 'bajo' ? 'text-amber' : 'text-mint'
                }`}>
                  {s.porcentajeNivel}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-panel border border-border">
          <div className="px-5 py-3 border-b border-border">
            <h2 className="text-subtext text-xs uppercase tracking-widest">Alertas Activas</h2>
          </div>
          <div className="p-3">
            {mockAlertas.filter(a => a.estado === 'activa').map(a => (
              <div
                key={a.id}
                className={`p-3 mb-2 border-l-2 ${
                  a.tipo === 'nivel_critico' ? 'border-red' : 'border-amber'
                }`}
              >
                <p className={`text-xs font-semibold ${
                  a.tipo === 'nivel_critico' ? 'text-red' : 'text-amber'
                }`}>
                  {a.tipo === 'nivel_critico' ? 'NIVEL CRÍTICO' : 'NIVEL BAJO'}
                </p>
                <p className="text-subtext text-[10px] mt-1">Surtidor N° {a.surtidor_id}</p>
                <p className="text-subtext text-[10px] opacity-50 mt-0.5">{a.fecha}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
