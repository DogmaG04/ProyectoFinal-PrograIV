import { Surtido } from './Surtido'

export type EstadoSurtidor = 'activo' | 'mantenimiento' | 'fuera de servicio'

export interface Surtidor {
  id: number
  codigo: string
  ubicacion: string
  estado: EstadoSurtidor
  surtidos: Surtido[]
}
