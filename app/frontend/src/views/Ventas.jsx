import { mockVentas } from '../services/mockData'

export default function Ventas() {
  const totalGeneral = mockVentas.reduce((acc, v) => acc + v.total, 0)
  const litrosTotal = mockVentas.reduce((acc, v) => acc + v.litros, 0)

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Registro de Ventas</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-500 text-sm">Total Ventas</p>
          <p className="text-3xl font-bold text-gray-800">{mockVentas.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-500 text-sm">Litros Vendidos</p>
          <p className="text-3xl font-bold text-blue-500">{litrosTotal.toFixed(1)}L</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-500 text-sm">Monto Total</p>
          <p className="text-3xl font-bold text-green-500">${totalGeneral.toFixed(2)}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-sm font-medium text-gray-600">Fecha</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-600">Combustible</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-600">Litros</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-600">Precio/L</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-600">Total</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-600">Surtidor</th>
            </tr>
          </thead>
          <tbody>
            {mockVentas.map(v => (
              <tr key={v.id} className="border-t">
                <td className="px-4 py-3 text-sm">{v.fecha}</td>
                <td className="px-4 py-3 text-sm">{v.combustible}</td>
                <td className="px-4 py-3 text-sm">{v.litros}L</td>
                <td className="px-4 py-3 text-sm">${v.precio.toFixed(2)}</td>
                <td className="px-4 py-3 text-sm font-medium">${v.total.toFixed(2)}</td>
                <td className="px-4 py-3 text-sm">N° {v.surtidor_id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
