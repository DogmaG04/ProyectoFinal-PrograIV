import { supabase } from '../services/supabaseClient'
import type { Venta } from '../models'

export async function obtenerVentas(): Promise<Venta[]> {
  const { data, error } = await supabase
    .from('ventas')
    .select('*, surtidores!inner(codigo), combustibles!inner(nombre)')

  if (error || !data?.length) return []

  return data.map((r: any) => ({
    id: r.id,
    fecha: r.fecha,
    surtidor: r.surtidores?.codigo || '',
    combustible: r.combustibles?.nombre || '',
    litros: r.litros,
    total: r.total,
    surtidorId: r.surtidor_id,
    combustibleId: r.combustible_id,
  }))
}

export async function crearVenta(
  surtidorId: number,
  combustibleId: number,
  litros: number,
  total: number
): Promise<Venta | null> {
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
    fecha: data.fecha,
    surtidor: data.surtidores?.codigo || '',
    combustible: data.combustibles?.nombre || '',
    litros: data.litros,
    total: data.total,
    surtidorId: data.surtidor_id,
    combustibleId: data.combustible_id,
  }
}

export async function eliminarVenta(id: number): Promise<boolean> {
  const { error } = await supabase
    .from('ventas')
    .delete()
    .eq('id', id)

  return !error
}
