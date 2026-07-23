export interface Combustible {
  id: number
  nombre: string
  color: string
  precioLitro: number
}

export interface Surtido {
  combustibleId: number
  nivel: number
  capacidad: number
}

export interface SurtidorData {
  id: number
  codigo: string
  ubicacion: string
  estado: 'activo' | 'mantenimiento' | 'fuera de servicio'
  surtidos: Surtido[]
}

export class Surtidor {
  id: number
  codigo: string
  ubicacion: string
  estado: 'activo' | 'mantenimiento' | 'fuera de servicio'
  surtidos: Surtido[]

  constructor(data: SurtidorData) {
    this.id = data.id
    this.codigo = data.codigo
    this.ubicacion = data.ubicacion
    this.estado = data.estado
    this.surtidos = data.surtidos
  }

  getNivel(combustibleId: number): number {
    const s = this.surtidos.find(x => x.combustibleId === combustibleId)
    return s ? s.nivel : 0
  }

  getCapacidad(combustibleId: number): number {
    const s = this.surtidos.find(x => x.combustibleId === combustibleId)
    return s ? s.capacidad : 0
  }

  getPorcentaje(combustibleId: number): number {
    const cap = this.getCapacidad(combustibleId)
    return cap > 0 ? (this.getNivel(combustibleId) / cap) * 100 : 0
  }

  get esActivo(): boolean {
    return this.estado === 'activo'
  }
}
