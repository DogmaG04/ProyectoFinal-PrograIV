import { DBVenta } from '../patterns/adapter/DatabaseAdapter'
import { decimalABinario } from './binaryMath'

export interface VentaDecodificada {
  id: number
  surtidor: string
  combustible: string
  litros: number
  litrosBinario: string
  precioUnitario: number
  precioBinario: string
  total: number
  totalBinario: string
  fecha: string
  fechaLegible: string
}

export interface ReporteDecodificado {
  combustible: string
  totalLitros: number
  totalLitrosBinario: string
  totalVentas: number
  totalVentasBinario: string
  transacciones: number
  transaccionesBinario: string
  precioPromedio: number
  precioPromedioBinario: string
}

export function decodificarVenta(venta: DBVenta, precioLitro: number): VentaDecodificada {
  return {
    id: venta.id,
    surtidor: venta.surtidor,
    combustible: venta.combustible,
    litros: venta.litros,
    litrosBinario: decimalABinario(venta.litros),
    precioUnitario: precioLitro,
    precioBinario: decimalABinario(precioLitro),
    total: venta.total,
    totalBinario: decimalABinario(venta.total),
    fecha: venta.fecha,
    fechaLegible: venta.fecha,
  }
}

export function decodificarReporte(
  combustible: string,
  ventas: DBVenta[],
  _precioLitro: number
): ReporteDecodificado {
  const totalLitros = ventas.reduce((a, v) => a + v.litros, 0)
  const totalVentas = ventas.reduce((a, v) => a + v.total, 0)
  const transacciones = ventas.length
  const precioPromedio = transacciones > 0 ? totalVentas / totalLitros : 0

  return {
    combustible,
    totalLitros,
    totalLitrosBinario: decimalABinario(totalLitros),
    totalVentas,
    totalVentasBinario: decimalABinario(totalVentas),
    transacciones,
    transaccionesBinario: decimalABinario(transacciones),
    precioPromedio,
    precioPromedioBinario: decimalABinario(precioPromedio),
  }
}

export function decodificarVentas(
  ventas: DBVenta[],
  precios: Record<number, number>
): VentaDecodificada[] {
  return ventas.map(v => decodificarVenta(v, precios[v.combustibleId] || 0))
}

export function decodificarReportes(
  ventas: DBVenta[],
  combustibles: { id: number; nombre: string; precioLitro: number }[]
): ReporteDecodificado[] {
  return combustibles.map(c => {
    const ventasC = ventas.filter(v => v.combustibleId === c.id)
    return decodificarReporte(c.nombre, ventasC, c.precioLitro)
  })
}
