import { mockVentas } from '../services/mockData'

export default function Ventas() {
  const totalGeneral = mockVentas.reduce((acc, v) => acc + v.total, 0)
  const litrosTotal = mockVentas.reduce((acc, v) => acc + v.litros, 0)

  return (
    <div>
      <h1 className="text-text text-lg font-semibold mb-6 uppercase tracking-wider">Registro de Ventas</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-panel border border-border p-5">
          <p className="text-subtext text-[10px] uppercase tracking-widest mb-1">Transacciones</p>
          <p className="text-cyan text-2xl font-bold">{mockVentas.length}</p>
        </div>
        <div className="bg-panel border border-border p-5">
          <p className="text-subtext text-[10px] uppercase tracking-widest mb-1">Litros Hoy</p>
          <p className="text-mint text-2xl font-bold">{litrosTotal.toFixed(1)}L</p>
        </div>
        <div className="bg-panel border border-border p-5">
          <p className="text-subtext text-[10px] uppercase tracking-widest mb-1">Monto Total</p>
          <p className="text-mint text-2xl font-bold">${totalGeneral.toFixed(2)}</p>
        </div>
      </div>

      <div className="bg-panel border border-border overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-cyan/30">
              <th className="px-4 py-3 text-[10px] font-semibold text-subtext uppercase tracking-widest">Fecha</th>
              <th className="px-4 py-3 text-[10px] font-semibold text-subtext uppercase tracking-widest">Surtidor</th>
              <th className="px-4 py-3 text-[10px] font-semibold text-subtext uppercase tracking-widest">Tipo</th>
              <th className="px-4 py-3 text-[10px] font-semibold text-subtext uppercase tracking-widest">Litros</th>
              <th className="px-4 py-3 text-[10px] font-semibold text-subtext uppercase tracking-widest">Precio/L</th>
              <th className="px-4 py-3 text-[10px] font-semibold text-subtext uppercase tracking-widest">Monto</th>
            </tr>
          </thead>
          <tbody>
            {mockVentas.map(v => (
              <tr key={v.id} className="border-b border-border hover:bg-panel-hover transition-colors">
                <td className="px-4 py-3 text-xs text-text">{v.fecha}</td>
                <td className="px-4 py-3 text-xs text-cyan">N° {v.surtidor_id}</td>
                <td className="px-4 py-3 text-xs text-subtext">{v.combustible}</td>
                <td className="px-4 py-3 text-xs text-text">{v.litros}L</td>
                <td className="px-4 py-3 text-xs text-subtext">${v.precio.toFixed(2)}</td>
                <td className="px-4 py-3 text-xs text-mint font-semibold">${v.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
