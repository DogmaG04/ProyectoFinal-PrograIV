import { useState, useEffect } from 'react'
import { supabase } from '../services/supabase'
import { Surtidor } from '../models/Surtidor'
import { mockSurtidores } from '../services/mockData'

export function useSurtidores() {
  const [data, setData] = useState<Surtidor[]>(mockSurtidores)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    supabase
      .from('surtidores')
      .select('*, surtidos(*)')
      .then(({ data: rows, error: err }) => {
        if (err) {
          setError(err.message)
          setLoading(false)
          return
        }
        if (!rows?.length) { setLoading(false); return }
        const surtidores = rows.map((r: any) => new Surtidor({
          id: r.id,
          codigo: r.codigo,
          ubicacion: r.ubicacion,
          estado: r.estado,
          surtidos: (r.surtidos || []).map((s: any) => ({
            combustibleId: s.combustible_id,
            nivel: s.nivel,
            capacidad: s.capacidad,
          })),
        }))
        setData(surtidores)
        setLoading(false)
      })
  }, [])

  return { data, loading, error }
}
