import {
  DatabaseAdapter,
  DBCombustible,
  DBSurtidor,
  DBVenta,
  DBAlerta,
} from './DatabaseAdapter'

const API = '/api'

async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...init,
  })
  return res.json()
}

export class SupabaseAdapter implements DatabaseAdapter {
  async verificarConexion(): Promise<boolean> {
    const { connected } = await api<{ connected: boolean }>('/health')
    return connected
  }

  async obtenerCombustibles(): Promise<DBCombustible[]> {
    return api<DBCombustible[]>('/combustibles')
  }

  async obtenerSurtidores(): Promise<DBSurtidor[]> {
    return api<DBSurtidor[]>('/surtidores')
  }

  async crearSurtidor(
    codigo: string,
    ubicacion: string,
    estado: 'activo' | 'mantenimiento' | 'fuera de servicio',
    surtidos: { combustibleId: number; nivel: number; capacidad: number }[]
  ): Promise<DBSurtidor | null> {
    const data = await api<{ id: number } & Record<string, unknown>>('/surtidores', {
      method: 'POST',
      body: JSON.stringify({ codigo, ubicacion, estado, surtidos }),
    })
    if (!data?.id) return null
    return { id: data.id, codigo, ubicacion, estado, surtidos: surtidos.map((s, i) => ({ id: i, surtidorId: data.id, ...s })) }
  }

  async editarSurtidor(id: number, cambios: Partial<{ ubicacion: string; estado: 'activo' | 'mantenimiento' | 'fuera de servicio' }>): Promise<boolean> {
    const { ok } = await api<{ ok: boolean }>(`/surtidores/${id}`, {
      method: 'PUT',
      body: JSON.stringify(cambios),
    })
    return ok
  }

  async eliminarSurtidor(id: number): Promise<boolean> {
    const { ok } = await api<{ ok: boolean }>(`/surtidores/${id}`, { method: 'DELETE' })
    return ok
  }

  async obtenerVentas(): Promise<DBVenta[]> {
    const rows = await api<Record<string, unknown>[]>('/ventas')
    return rows.map(r => ({
      id: r.id as number,
      fecha: r.fecha as string,
      surtidor: r.surtidor as string,
      combustible: r.combustible as string,
      litros: r.litros as number,
      total: r.total as number,
      surtidorId: r.surtidorId as number,
      combustibleId: r.combustibleId as number,
    }))
  }

  async crearVenta(surtidorId: number, combustibleId: number, litros: number, total: number): Promise<DBVenta | null> {
    const data = await api<Record<string, unknown> | null>('/ventas', {
      method: 'POST',
      body: JSON.stringify({ surtidorId, combustibleId, litros, total }),
    })
    if (!data?.id) return null
    return {
      id: data.id as number,
      fecha: data.fecha as string,
      surtidor: data.surtidor as string,
      combustible: data.combustible as string,
      litros: data.litros as number,
      total: data.total as number,
      surtidorId: data.surtidorId as number,
      combustibleId: data.combustibleId as number,
    }
  }

  async eliminarVenta(id: number): Promise<boolean> {
    const { ok } = await api<{ ok: boolean }>(`/ventas/${id}`, { method: 'DELETE' })
    return ok
  }

  async obtenerAlertas(): Promise<DBAlerta[]> {
    const rows = await api<Record<string, unknown>[]>('/alertas')
    return rows.map(r => ({
      id: r.id as number,
      tipo: r.tipo as 'critica' | 'advertencia' | 'info',
      surtidor: r.surtidor as string,
      mensaje: r.mensaje as string,
      timestamp: r.timestamp as string,
    }))
  }

  async crearAlerta(tipo: 'critica' | 'advertencia' | 'info', surtidorId: number, mensaje: string): Promise<DBAlerta | null> {
    const data = await api<Record<string, unknown> | null>('/alertas', {
      method: 'POST',
      body: JSON.stringify({ tipo, surtidorId, mensaje }),
    })
    if (!data?.id) return null
    return {
      id: data.id as number,
      tipo: data.tipo as 'critica' | 'advertencia' | 'info',
      surtidor: data.surtidor as string,
      mensaje: data.mensaje as string,
      timestamp: data.timestamp as string,
    }
  }

  async eliminarAlerta(id: number): Promise<boolean> {
    const { ok } = await api<{ ok: boolean }>(`/alertas/${id}`, { method: 'DELETE' })
    return ok
  }
}
