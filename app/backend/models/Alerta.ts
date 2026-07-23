export type TipoAlerta = 'critica' | 'advertencia' | 'info'

export interface Alerta {
  id: number
  tipo: TipoAlerta
  surtidorId: number
  mensaje: string
  timestamp: string
}
