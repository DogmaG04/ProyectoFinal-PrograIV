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
    <div>
      <h1 className="text-text text-lg font-semibold mb-6 uppercase tracking-wider">Reportes</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-panel border border-border p-5">
          <p className="text-subtext text-[10px] uppercase tracking-widest mb-1">Litros Vendidos</p>
          <p className="text-cyan text-2xl font-bold">{grandLitros.toFixed(1)}L</p>
        </div>
        <div className="bg-panel border border-border p-5">
          <p className="text-subtext text-[10px] uppercase tracking-widest mb-1">Ingresos Totales</p>
          <p className="text-mint text-2xl font-bold">${grandTotal.toFixed(2)}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-panel border border-border">
          <div className="px-5 py-3 border-b border-border">
            <h2 className="text-subtext text-xs uppercase tracking-widest">Por Combustible</h2>
          </div>
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-cyan/30">
                <th className="px-4 py-3 text-[10px] font-semibold text-subtext uppercase tracking-widest">Tipo</th>
                <th className="px-4 py-3 text-[10px] font-semibold text-subtext uppercase tracking-widest">Ventas</th>
                <th className="px-4 py-3 text-[10px] font-semibold text-subtext uppercase tracking-widest">Litros</th>
                <th className="px-4 py-3 text-[10px] font-semibold text-subtext uppercase tracking-widest">Total</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(ventasPorCombustible).map(([tipo, data]) => (
                <tr key={tipo} className="border-b border-border hover:bg-panel-hover transition-colors">
                  <td className="px-4 py-3 text-xs text-text font-semibold">{tipo}</td>
                  <td className="px-4 py-3 text-xs text-subtext">{data.count}</td>
                  <td className="px-4 py-3 text-xs text-text">{data.litros.toFixed(1)}L</td>
                  <td className="px-4 py-3 text-xs text-mint font-semibold">${data.total.toFixed(2)}</td>
                </tr>
              ))}
              <tr className="border-t border-cyan/30">
                <td className="px-4 py-3 text-xs text-cyan font-bold">TOTAL</td>
                <td className="px-4 py-3 text-xs text-cyan font-bold">{mockVentas.length}</td>
                <td className="px-4 py-3 text-xs text-cyan font-bold">{grandLitros.toFixed(1)}L</td>
                <td className="px-4 py-3 text-xs text-cyan font-bold">${grandTotal.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-panel border border-border">
          <div className="px-5 py-3 border-b border-border">
            <h2 className="text-subtext text-xs uppercase tracking-widest">Por Surtidor</h2>
          </div>
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-cyan/30">
                <th className="px-4 py-3 text-[10px] font-semibold text-subtext uppercase tracking-widest">N°</th>
                <th className="px-4 py-3 text-[10px] font-semibold text-subtext uppercase tracking-widest">Ventas</th>
                <th className="px-4 py-3 text-[10px] font-semibold text-subtext uppercase tracking-widest">Litros</th>
                <th className="px-4 py-3 text-[10px] font-semibold text-subtext uppercase tracking-widest">Total</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(ventasPorSurtidor).map(([id, data]) => (
                <tr key={id} className="border-b border-border hover:bg-panel-hover transition-colors">
                  <td className="px-4 py-3 text-xs text-cyan font-semibold">N° {id}</td>
                  <td className="px-4 py-3 text-xs text-subtext">{data.count}</td>
                  <td className="px-4 py-3 text-xs text-text">{data.litros.toFixed(1)}L</td>
                  <td className="px-4 py-3 text-xs text-mint font-semibold">${data.total.toFixed(2)}</td>
                </tr>
              ))}
              <tr className="border-t border-cyan/30">
                <td className="px-4 py-3 text-xs text-cyan font-bold">TOTAL</td>
                <td className="px-4 py-3 text-xs text-cyan font-bold">{mockVentas.length}</td>
                <td className="px-4 py-3 text-xs text-cyan font-bold">{grandLitros.toFixed(1)}L</td>
                <td className="px-4 py-3 text-xs text-cyan font-bold">${grandTotal.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
