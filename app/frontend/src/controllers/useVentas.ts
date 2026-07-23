import { useState, useEffect, useCallback } from 'react'
import { Venta } from '../models/Venta'
import { DatabaseAdapter } from '../patterns/adapter/DatabaseAdapter'

export function useVentas(adapter: DatabaseAdapter | null = null) {
  const [data, setData] = useState<Venta[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const cargar = useCallback(() => {
    if (!adapter) { setLoading(false); return }
    adapter.obtenerVentas().then(rows => {
      setData(rows.map(r => new Venta(r)))
      setLoading(false)
    }).catch(err => {
      setError(err.message)
      setLoading(false)
    })
  }, [adapter])

  useEffect(() => { cargar() }, [cargar])

  const crear = useCallback(async (surtidorId: number, combustibleId: number, litros: number, total: number) => {
    if (!adapter) return false
    const result = await adapter.crearVenta(surtidorId, combustibleId, litros, total)
    if (result) { cargar(); return true }
    return false
  }, [adapter, cargar])

  const eliminar = useCallback(async (id: number) => {
    if (!adapter) return false
    const ok = await adapter.eliminarVenta(id)
    if (ok) cargar()
    return ok
  }, [adapter, cargar])

  return { data, loading, error, crear, eliminar, recargar: cargar }
}
