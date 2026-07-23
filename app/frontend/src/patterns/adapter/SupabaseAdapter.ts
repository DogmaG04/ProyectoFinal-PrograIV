import {
  obtenerCombustibles as beObtenerCombustibles,
  obtenerSurtidores as beObtenerSurtidores,
  crearSurtidor as beCrearSurtidor,
  editarSurtidor as beEditarSurtidor,
  eliminarSurtidor as beEliminarSurtidor,
  eliminarVenta as beEliminarVenta,
  eliminarAlerta as beEliminarAlerta,
} from '../../backend'
import { verificarConexion as beVerificarConexion } from '../../backend/services/supabaseClient'
import { supabase } from '../../backend/services/supabaseClient'
import { formatTimestamp } from '../../utils/formatDate'
import {
  DatabaseAdapter,
  DBCombustible,
  DBSurtidor,
  DBSurtido,
  DBVenta,
  DBAlerta,
} from './DatabaseAdapter'

export class SupabaseAdapter implements DatabaseAdapter {
  async verificarConexion(): Promise<boolean> {
    return beVerificarConexion()
  }

  async obtenerCombustibles(): Promise<DBCombustible[]> {
    return beObtenerCombustibles()
  }

  async obtenerSurtidores(): Promise<DBSurtidor[]> {
    const rows = await beObtenerSurtidores()
    return rows.map(r => ({
      id: r.id,
      codigo: r.codigo,
      ubicacion: r.ubicacion,
      estado: r.estado,
      surtidos: r.surtidos.map((s: any) => ({
        id: s.id,
        surtidorId: s.surtidorId,
        combustibleId: s.combustibleId,
        nivel: s.nivel,
        capacidad: s.capacidad,
      } as DBSurtido)),
    }))
  }

  async crearSurtidor(codigo: string, ubicacion: string, estado: 'activo' | 'mantenimiento' | 'fuera de servicio', surtidos: { combustibleId: number; nivel: number; capacidad: number }[]): Promise<DBSurtidor | null> {
    const result = await beCrearSurtidor(codigo, ubicacion, estado, surtidos)
    if (!result) return null
    return {
      id: result.id,
      codigo: result.codigo,
      ubicacion: result.ubicacion,
      estado: result.estado,
      surtidos: result.surtidos.map((s: any) => ({
        id: s.id,
        surtidorId: s.surtidorId,
        combustibleId: s.combustibleId,
        nivel: s.nivel,
        capacidad: s.capacidad,
      } as DBSurtido)),
    }
  }

  async editarSurtidor(id: number, cambios: Partial<{ ubicacion: string; estado: 'activo' | 'mantenimiento' | 'fuera de servicio' }>): Promise<boolean> {
    return beEditarSurtidor(id, cambios)
  }

  async eliminarSurtidor(id: number): Promise<boolean> {
    return beEliminarSurtidor(id)
  }

  async obtenerVentas(): Promise<DBVenta[]> {
    const { data, error } = await supabase
      .from('ventas')
      .select('*, surtidores!inner(codigo), combustibles!inner(nombre)')

    if (error || !data?.length) return []

    return data.map((r: any) => ({
      id: r.id,
      fecha: formatTimestamp(r.fecha),
      surtidor: r.surtidores?.codigo || '',
      combustible: r.combustibles?.nombre || '',
      litros: r.litros,
      total: r.total,
      surtidorId: r.surtidor_id,
      combustibleId: r.combustible_id,
    }))
  }

  async crearVenta(surtidorId: number, combustibleId: number, litros: number, total: number): Promise<DBVenta | null> {
    const { data, error } = await supabase
      .from('ventas')
      .insert({
        fecha: new Date().toISOString(),
        surtidor_id: surtidorId,
        combustible_id: combustibleId,
        litros,
        total,
      })
      .select('*, surtidores!inner(codigo), combustibles!inner(nombre)')
      .single()

    if (error || !data) return null

    return {
      id: data.id,
      fecha: formatTimestamp(data.fecha),
      surtidor: data.surtidores?.codigo || '',
      combustible: data.combustibles?.nombre || '',
      litros: data.litros,
      total: data.total,
      surtidorId: data.surtidor_id,
      combustibleId: data.combustible_id,
    }
  }

  async eliminarVenta(id: number): Promise<boolean> {
    return beEliminarVenta(id)
  }

  async obtenerAlertas(): Promise<DBAlerta[]> {
    const { data, error } = await supabase
      .from('alertas')
      .select('*, surtidores!inner(codigo)')

    if (error || !data?.length) return []

    return data.map((r: any) => ({
      id: r.id,
      tipo: r.tipo,
      surtidor: r.surtidores?.codigo || '',
      mensaje: r.mensaje,
      timestamp: formatTimestamp(r.timestamp),
    }))
  }

  async crearAlerta(tipo: 'critica' | 'advertencia' | 'info', surtidorId: number, mensaje: string): Promise<DBAlerta | null> {
    const { data, error } = await supabase
      .from('alertas')
      .insert({
        tipo,
        surtidor_id: surtidorId,
        mensaje,
        timestamp: new Date().toISOString(),
      })
      .select('*, surtidores!inner(codigo)')
      .single()

    if (error || !data) return null

    return {
      id: data.id,
      tipo: data.tipo,
      surtidor: data.surtidores?.codigo || '',
      mensaje: data.mensaje,
      timestamp: formatTimestamp(data.timestamp),
    }
  }

  async eliminarAlerta(id: number): Promise<boolean> {
    return beEliminarAlerta(id)
  }
}
