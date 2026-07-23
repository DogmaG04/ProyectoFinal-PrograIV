import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)

export async function verificarConexion(): Promise<boolean> {
  try {
    const { error } = await supabase.from('surtidores').select('id').limit(1)
    if (error) throw error
    console.log('✅ Conexión a Supabase correcta')
    return true
  } catch (err) {
    console.error('❌ Error de conexión a Supabase:', err)
    return false
  }
}
