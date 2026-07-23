export interface VentaData {
  id: number
  fecha: string
  combustible: string
  litros: number
  precio: number
  total: number
  surtidor_id: number
}

export class Venta {
  id: number
  fecha: string
  combustible: string
  litros: number
  precio: number
  total: number
  surtidor_id: number

  constructor({ id, fecha, combustible, litros, precio, total, surtidor_id }: VentaData) {
    this.id = id
    this.fecha = fecha
    this.combustible = combustible
    this.litros = litros
    this.precio = precio
    this.total = total
    this.surtidor_id = surtidor_id
  }
}
