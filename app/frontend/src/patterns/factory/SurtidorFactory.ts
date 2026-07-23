import { Surtidor, Surtido } from '../../models/Surtidor'

export type TipoSurtidor = 'estacionario' | 'portatil' | 'industrial'

interface ConfigCombustible {
  combustibleId: number
  capacidad: number
  nivelInicial: number
}

interface ConfigSurtidor {
  tipo: TipoSurtidor
  combustibles: ConfigCombustible[]
}

const CONFIGS: Record<TipoSurtidor, ConfigSurtidor> = {
  estacionario: {
    tipo: 'estacionario',
    combustibles: [
      { combustibleId: 1, capacidad: 6000, nivelInicial: 4800 },
      { combustibleId: 2, capacidad: 4000, nivelInicial: 3200 },
      { combustibleId: 3, capacidad: 8000, nivelInicial: 6400 },
    ],
  },
  portatil: {
    tipo: 'portatil',
    combustibles: [
      { combustibleId: 1, capacidad: 2000, nivelInicial: 1600 },
      { combustibleId: 2, capacidad: 1500, nivelInicial: 1200 },
    ],
  },
  industrial: {
    tipo: 'industrial',
    combustibles: [
      { combustibleId: 1, capacidad: 12000, nivelInicial: 9600 },
      { combustibleId: 2, capacidad: 8000, nivelInicial: 6400 },
      { combustibleId: 3, capacidad: 15000, nivelInicial: 12000 },
    ],
  },
}

let contadorId = 100

export class SurtidorFactory {
  static crear(
    tipo: TipoSurtidor,
    codigo: string,
    ubicacion: string,
    estado: 'activo' | 'mantenimiento' | 'fuera de servicio' = 'activo'
  ): Surtidor {
    const config = CONFIGS[tipo]
    const surtidos: Surtido[] = config.combustibles.map(c => ({
      combustibleId: c.combustibleId,
      nivel: c.nivelInicial,
      capacidad: c.capacidad,
    }))

    return new Surtidor({
      id: ++contadorId,
      codigo,
      ubicacion,
      estado,
      surtidos,
    })
  }

  static obtenerConfiguracion(tipo: TipoSurtidor): ConfigSurtidor {
    return { ...CONFIGS[tipo] }
  }

  static tiposDisponibles(): TipoSurtidor[] {
    return Object.keys(CONFIGS) as TipoSurtidor[]
  }
}
