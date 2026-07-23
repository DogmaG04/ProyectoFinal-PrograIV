export type TipoAlerta = 'critica' | 'advertencia' | 'info'

export interface Alerta {
  id: number
  tipo: TipoAlerta
  surtidor: string
  mensaje: string
  timestamp: string
}
