import { useState, useEffect } from 'react'
import { Combustible } from '../models/Surtidor'
import { DatabaseAdapter } from '../patterns/adapter/DatabaseAdapter'

export function useCombustibles(adapter: DatabaseAdapter | null = null) {
  const [data, setData] = useState<Combustible[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!adapter) { setLoading(false); return }
    adapter.obtenerCombustibles().then(rows => {
      setData(rows.map(r => ({ id: r.id, nombre: r.nombre, color: r.color, precioLitro: r.precioLitro })))
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [adapter])

  return { data, loading }
}
