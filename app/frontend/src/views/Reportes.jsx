import { mockVentas } from '../services/mockData'

export default function Reportes() {
  const ventasPorCombustible = mockVentas.reduce((acc, v) => {
    if (!acc[v.combustible]) acc[v.combustible] = { litros: 0, total: 0, count: 0 }
    acc[v.combustible].litros += v.litros
    acc[v.combustible].total += v.total
    acc[v.combustible].count += 1
    return acc
  }, {})

  const ventasPorSurtidor = mockVentas.reduce((acc, v) => {
    if (!acc[v.surtidor_id]) acc[v.surtidor_id] = { litros: 0, total: 0, count: 0 }
    acc[v.surtidor_id].litros += v.litros
    acc[v.surtidor_id].total += v.total
    acc[v.surtidor_id].count += 1
    return acc
  }, {})

  const grandTotal = mockVentas.reduce((acc, v) => acc + v.total, 0)
  const grandLitros = mockVentas.reduce((acc, v) => acc + v.litros, 0)

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Reportes</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Ventas por Combustible</h2>
          <table className="w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-3 py-2 text-sm font-medium text-gray-600">Tipo</th>
                <th className="px-3 py-2 text-sm font-medium text-gray-600">Ventas</th>
                <th className="px-3 py-2 text-sm font-medium text-gray-600">Litros</th>
                <th className="px-3 py-2 text-sm font-medium text-gray-600">Total</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(ventasPorCombustible).map(([tipo, data]) => (
                <tr key={tipo} className="border-t">
                  <td className="px-3 py-2 text-sm font-medium">{tipo}</td>
                  <td className="px-3 py-2 text-sm">{data.count}</td>
                  <td className="px-3 py-2 text-sm">{data.litros.toFixed(1)}L</td>
                  <td className="px-3 py-2 text-sm font-medium">${data.total.toFixed(2)}</td>
                </tr>
              ))}
              <tr className="border-t bg-gray-50 font-semibold">
                <td className="px-3 py-2 text-sm">Total</td>
                <td className="px-3 py-2 text-sm">{mockVentas.length}</td>
                <td className="px-3 py-2 text-sm">{grandLitros.toFixed(1)}L</td>
                <td className="px-3 py-2 text-sm">${grandTotal.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Ventas por Surtidor</h2>
          <table className="w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-3 py-2 text-sm font-medium text-gray-600">Surtidor</th>
                <th className="px-3 py-2 text-sm font-medium text-gray-600">Ventas</th>
                <th className="px-3 py-2 text-sm font-medium text-gray-600">Litros</th>
                <th className="px-3 py-2 text-sm font-medium text-gray-600">Total</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(ventasPorSurtidor).map(([id, data]) => (
                <tr key={id} className="border-t">
                  <td className="px-3 py-2 text-sm font-medium">N° {id}</td>
                  <td className="px-3 py-2 text-sm">{data.count}</td>
                  <td className="px-3 py-2 text-sm">{data.litros.toFixed(1)}L</td>
                  <td className="px-3 py-2 text-sm font-medium">${data.total.toFixed(2)}</td>
                </tr>
              ))}
              <tr className="border-t bg-gray-50 font-semibold">
                <td className="px-3 py-2 text-sm">Total</td>
                <td className="px-3 py-2 text-sm">{mockVentas.length}</td>
                <td className="px-3 py-2 text-sm">{grandLitros.toFixed(1)}L</td>
                <td className="px-3 py-2 text-sm">${grandTotal.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
