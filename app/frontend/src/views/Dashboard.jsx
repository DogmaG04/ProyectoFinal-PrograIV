import { mockSurtidores } from '../services/mockData'

export default function Dashboard() {
  const totalSurtidores = mockSurtidores.length
  const criticos = mockSurtidores.filter(s => s.estadoNivel === 'critico').length
  const normales = mockSurtidores.filter(s => s.estadoNivel === 'normal').length

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-500 text-sm">Total Surtidores</p>
          <p className="text-3xl font-bold text-gray-800">{totalSurtidores}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-500 text-sm">Nivel Crítico</p>
          <p className="text-3xl font-bold text-red-500">{criticos}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-500 text-sm">Nivel Normal</p>
          <p className="text-3xl font-bold text-green-500">{normales}</p>
        </div>
      </div>

      <h2 className="text-lg font-semibold mb-3">Estado de Surtidores</h2>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-sm font-medium text-gray-600">N°</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-600">Combustible</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-600">Nivel</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-600">Estado</th>
            </tr>
          </thead>
          <tbody>
            {mockSurtidores.map(s => (
              <tr key={s.id} className="border-t">
                <td className="px-4 py-3 text-sm">{s.numero}</td>
                <td className="px-4 py-3 text-sm">{s.combustible}</td>
                <td className="px-4 py-3 text-sm">{s.nivel}L / {s.capacidad}L</td>
                <td className="px-4 py-3 text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    s.estadoNivel === 'critico' ? 'bg-red-100 text-red-700' :
                    s.estadoNivel === 'bajo' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {s.porcentajeNivel}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
