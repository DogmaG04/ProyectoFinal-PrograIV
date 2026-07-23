export interface VentaData {
  id: number
  fecha: string
  surtidor: string
  combustible: string
  litros: number
  total: number
  surtidorId: number
  combustibleId: number
}

export class Venta {
  id: number
  fecha: string
  surtidor: string
  combustible: string
  litros: number
  total: number
  surtidorId: number
  combustibleId: number

  constructor(data: VentaData) {
    this.id = data.id
    this.fecha = data.fecha
    this.surtidor = data.surtidor
    this.combustible = data.combustible
    this.litros = data.litros
    this.total = data.total
    this.surtidorId = data.surtidorId
    this.combustibleId = data.combustibleId
  }
}
