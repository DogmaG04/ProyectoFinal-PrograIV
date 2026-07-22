import { mockAlertas } from '../services/mockData'

const tipoLabels = {
  nivel_bajo: 'Nivel Bajo',
  nivel_critico: 'Nivel Crítico',
  mantenimiento: 'Mantenimiento',
  fuga: 'Fuga Detectada',
}

export default function Alertas() {
  const activas = mockAlertas.filter(a => a.estado === 'activa')
  const resueltas = mockAlertas.filter(a => a.estado === 'resuelta')

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Panel de Alertas</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-500 text-sm">Alertas Activas</p>
          <p className="text-3xl font-bold text-red-500">{activas.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-500 text-sm">Alertas Resueltas</p>
          <p className="text-3xl font-bold text-green-500">{resueltas.length}</p>
        </div>
      </div>

      <div className="space-y-3">
        {mockAlertas.map(a => (
          <div
            key={a.id}
            className={`bg-white rounded-lg shadow p-4 border-l-4 ${
              a.estado === 'activa'
                ? a.tipo === 'nivel_critico' || a.tipo === 'fuga'
                  ? 'border-red-500'
                  : 'border-yellow-500'
                : 'border-green-500'
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{tipoLabels[a.tipo] || a.tipo}</h3>
                <p className="text-gray-500 text-sm">Surtidor N° {a.surtidor_id}</p>
                <p className="text-gray-400 text-xs mt-1">{a.fecha}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                a.estado === 'activa' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
              }`}>
                {a.estado === 'activa' ? 'Activa' : 'Resuelta'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
