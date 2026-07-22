import { mockSurtidores } from '../services/mockData'

export default function Surtidores() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Gestión de Surtidores</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockSurtidores.map(s => (
          <div key={s.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold">Surtidor N° {s.numero}</h3>
                <p className="text-gray-500 text-sm">{s.combustible}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                s.estadoNivel === 'critico' ? 'bg-red-100 text-red-700' :
                s.estadoNivel === 'bajo' ? 'bg-yellow-100 text-yellow-700' :
                'bg-green-100 text-green-700'
              }`}>
                {s.estadoNivel === 'critico' ? 'Crítico' :
                 s.estadoNivel === 'bajo' ? 'Bajo' : 'Normal'}
              </span>
            </div>

            <div className="mb-2">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Nivel</span>
                <span>{s.nivel}L / {s.capacidad}L</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full ${
                    s.estadoNivel === 'critico' ? 'bg-red-500' :
                    s.estadoNivel === 'bajo' ? 'bg-yellow-500' :
                    'bg-green-500'
                  }`}
                  style={{ width: `${s.porcentajeNivel}%` }}
                />
              </div>
            </div>

            <p className="text-right text-sm text-gray-500 mt-1">{s.porcentajeNivel}%</p>
          </div>
        ))}
      </div>
    </div>
  )
}
