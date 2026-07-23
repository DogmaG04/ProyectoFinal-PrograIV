import { useState, useEffect } from 'react'
import { supabase } from '../services/supabase'
import { Alerta } from '../models/Alerta'
import { mockAlertas } from '../services/mockData'
import { formatTimestamp } from '../utils/formatDate'

export function useAlertas() {
  const [data, setData] = useState<Alerta[]>(mockAlertas)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    supabase
      .from('alertas')
      .select('*, surtidores!inner(codigo)')
      .then(({ data: rows, error: err }) => {
        if (err) {
          setError(err.message)
          setLoading(false)
          return
        }
        if (!rows?.length) { setLoading(false); return }
        const alertas = rows.map((r: any) => new Alerta({
          id: r.id,
          tipo: r.tipo,
          surtidor: r.surtidores?.codigo || '',
          mensaje: r.mensaje,
          timestamp: formatTimestamp(r.timestamp),
        }))
        setData(alertas)
        setLoading(false)
      })
  }, [])

  return { data, loading, error }
}
