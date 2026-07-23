import { supabase } from '../services/supabaseClient'
import type { Surtidor } from '../models'

export async function obtenerSurtidores(): Promise<Surtidor[]> {
  const { data, error } = await supabase
    .from('surtidores')
    .select('*, surtidos(*)')

  if (error || !data?.length) return []

  return data.map((r: any) => ({
    id: r.id,
    codigo: r.codigo,
    ubicacion: r.ubicacion,
    estado: r.estado,
    surtidos: (r.surtidos || []).map((s: any) => ({
      id: s.id,
      surtidorId: s.surtidor_id,
      combustibleId: s.combustible_id,
      nivel: s.nivel,
      capacidad: s.capacidad,
    })),
  }))
}

export async function crearSurtidor(
  codigo: string,
  ubicacion: string,
  estado: 'activo' | 'mantenimiento' | 'fuera de servicio',
  surtidos: { combustibleId: number; nivel: number; capacidad: number }[]
): Promise<Surtidor | null> {
  const { data: surtidor, error } = await supabase
    .from('surtidores')
    .insert({ codigo, ubicacion, estado })
    .select()
    .single()

  if (error || !surtidor) return null

  const surtidosInsert = surtidos.map(s => ({
    surtidor_id: surtidor.id,
    combustible_id: s.combustibleId,
    nivel: s.nivel,
    capacidad: s.capacidad,
  }))

  await supabase.from('surtidos').insert(surtidosInsert)

  return {
    id: surtidor.id,
    codigo: surtidor.codigo,
    ubicacion: surtidor.ubicacion,
    estado: surtidor.estado,
    surtidos: surtidos.map((s, i) => ({
      id: surtidor.id * 100 + i,
      surtidorId: surtidor.id,
      combustibleId: s.combustibleId,
      nivel: s.nivel,
      capacidad: s.capacidad,
    })),
  }
}

export async function editarSurtidor(
  id: number,
  cambios: Partial<{ ubicacion: string; estado: 'activo' | 'mantenimiento' | 'fuera de servicio' }>
): Promise<boolean> {
  const { error } = await supabase
    .from('surtidores')
    .update(cambios)
    .eq('id', id)

  return !error
}

export async function eliminarSurtidor(id: number): Promise<boolean> {
  const { error } = await supabase
    .from('surtidores')
    .delete()
    .eq('id', id)

  return !error
}
