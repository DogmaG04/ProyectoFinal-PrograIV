import { supabase } from '../services/supabaseClient'
import type { Combustible } from '../models'

export async function obtenerCombustibles(): Promise<Combustible[]> {
  const { data, error } = await supabase
    .from('combustibles')
    .select('id, nombre, color, precio_litro')

  if (error || !data?.length) return []

  return data.map((r: any) => ({
    id: r.id,
    nombre: r.nombre,
    color: r.color,
    precioLitro: r.precio_litro,
  }))
}
