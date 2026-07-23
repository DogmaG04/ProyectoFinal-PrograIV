import { useState, useEffect } from 'react'
import { supabase } from '../services/supabase'
import { Venta } from '../models/Venta'
import { mockVentas } from '../services/mockData'
import { formatTimestamp } from '../utils/formatDate'

export function useVentas() {
  const [data, setData] = useState<Venta[]>(mockVentas)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    supabase
      .from('ventas')
      .select('*, surtidores!inner(codigo), combustibles!inner(nombre)')
      .then(({ data: rows, error: err }) => {
        if (err) {
          setError(err.message)
          setLoading(false)
          return
        }
        if (!rows?.length) { setLoading(false); return }
        const ventas = rows.map((r: any) => new Venta({
          id: r.id,
          fecha: formatTimestamp(r.fecha),
          surtidor: r.surtidores?.codigo || '',
          combustible: r.combustibles?.nombre || '',
          litros: r.litros,
          total: r.total,
          surtidorId: r.surtidor_id,
          combustibleId: r.combustible_id,
        }))
        setData(ventas)
        setLoading(false)
      })
  }, [])

  return { data, loading, error }
}
