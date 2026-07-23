import { config } from 'dotenv'
import { createClient } from '@supabase/supabase-js'

config()

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Variables SUPABASE_URL y SUPABASE_ANON_KEY son requeridas en .env')
  process.exit(1)
}

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
