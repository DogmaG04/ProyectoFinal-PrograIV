import { supabase } from '../services/supabaseClient'
import type { Alerta, TipoAlerta } from '../models'

export async function obtenerAlertas(): Promise<Alerta[]> {
  const { data, error } = await supabase
    .from('alertas')
    .select('*')

  if (error || !data?.length) return []

  return data.map((r: any) => ({
    id: r.id,
    tipo: r.tipo,
    surtidorId: r.surtidor_id,
    mensaje: r.mensaje,
    timestamp: r.timestamp,
  }))
}

export async function crearAlerta(
  tipo: TipoAlerta,
  surtidorId: number,
  mensaje: string
): Promise<Alerta | null> {
  const { data, error } = await supabase
    .from('alertas')
    .insert({
      tipo,
      surtidor_id: surtidorId,
      mensaje,
      timestamp: new Date().toISOString(),
    })
    .select()
    .single()

  if (error || !data) return null

  return {
    id: data.id,
    tipo: data.tipo,
    surtidorId: data.surtidor_id,
    mensaje: data.mensaje,
    timestamp: data.timestamp,
  }
}

export async function eliminarAlerta(id: number): Promise<boolean> {
  const { error } = await supabase
    .from('alertas')
    .delete()
    .eq('id', id)

  return !error
}
