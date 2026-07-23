export interface AlertaData {
  id: number
  tipo: 'critica' | 'advertencia' | 'info'
  surtidor: string
  mensaje: string
  timestamp: string
}

export class Alerta {
  id: number
  tipo: 'critica' | 'advertencia' | 'info'
  surtidor: string
  mensaje: string
  timestamp: string

  constructor(data: AlertaData) {
    this.id = data.id
    this.tipo = data.tipo
    this.surtidor = data.surtidor
    this.mensaje = data.mensaje
    this.timestamp = data.timestamp
  }

  get esCritica(): boolean {
    return this.tipo === 'critica'
  }
}
