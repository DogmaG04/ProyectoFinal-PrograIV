export type AlertaTipo = 'nivel_critico' | 'nivel_bajo' | 'mantenimiento' | 'fuga'
export type AlertaEstado = 'activa' | 'resuelta'

export interface AlertaData {
  id: number
  surtidor_id: number
  tipo: AlertaTipo
  fecha: string
  estado: AlertaEstado
}

export class Alerta {
  id: number
  surtidor_id: number
  tipo: AlertaTipo
  fecha: string
  estado: AlertaEstado

  constructor({ id, surtidor_id, tipo, fecha, estado }: AlertaData) {
    this.id = id
    this.surtidor_id = surtidor_id
    this.tipo = tipo
    this.fecha = fecha
    this.estado = estado
  }

  get esUrgente(): boolean {
    return this.tipo === 'nivel_critico' || this.tipo === 'fuga'
  }
}
