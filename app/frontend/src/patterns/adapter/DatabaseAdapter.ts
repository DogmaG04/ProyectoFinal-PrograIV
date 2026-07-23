export interface DBCombustible {
  id: number
  nombre: string
  color: string
  precioLitro: number
}

export interface DBSurtido {
  id: number
  surtidorId: number
  combustibleId: number
  nivel: number
  capacidad: number
}

export interface DBSurtidor {
  id: number
  codigo: string
  ubicacion: string
  estado: 'activo' | 'mantenimiento' | 'fuera de servicio'
  surtidos: DBSurtido[]
}

export interface DBVenta {
  id: number
  fecha: string
  surtidor: string
  combustible: string
  litros: number
  total: number
  surtidorId: number
  combustibleId: number
}

export interface DBAlerta {
  id: number
  tipo: 'critica' | 'advertencia' | 'info'
  surtidor: string
  mensaje: string
  timestamp: string
}

export interface DatabaseAdapter {
  obtenerCombustibles(): Promise<DBCombustible[]>
  obtenerSurtidores(): Promise<DBSurtidor[]>
  obtenerVentas(): Promise<DBVenta[]>
  obtenerAlertas(): Promise<DBAlerta[]>

  crearSurtidor(codigo: string, ubicacion: string, estado: 'activo' | 'mantenimiento' | 'fuera de servicio', surtidos: { combustibleId: number; nivel: number; capacidad: number }[]): Promise<DBSurtidor | null>
  editarSurtidor(id: number, cambios: Partial<{ ubicacion: string; estado: 'activo' | 'mantenimiento' | 'fuera de servicio' }>): Promise<boolean>
  eliminarSurtidor(id: number): Promise<boolean>

  crearVenta(surtidorId: number, combustibleId: number, litros: number, total: number): Promise<DBVenta | null>
  eliminarVenta(id: number): Promise<boolean>

  crearAlerta(tipo: 'critica' | 'advertencia' | 'info', surtidorId: number, mensaje: string): Promise<DBAlerta | null>
  eliminarAlerta(id: number): Promise<boolean>

  verificarConexion(): Promise<boolean>
}
