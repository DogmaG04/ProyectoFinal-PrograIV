import { useState, useEffect } from 'react'
import { supabase } from '../services/supabase'
import { Combustible } from '../models/Surtidor'
import { COMBUSTIBLES } from '../services/mockData'

export function useCombustibles() {
  const [data, setData] = useState<Combustible[]>(COMBUSTIBLES)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('combustibles')
      .select('id, nombre, color, precio_litro')
      .then(({ data: rows, error }) => {
        if (!error && rows?.length) {
          setData(rows.map(r => ({ id: r.id, nombre: r.nombre, color: r.color, precioLitro: r.precio_litro })))
        }
        setLoading(false)
      })
  }, [])

  return { data, loading }
}
