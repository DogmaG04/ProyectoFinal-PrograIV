import { useState, useEffect, useCallback } from 'react'
import { Surtidor } from '../models/Surtidor'
import { mockSurtidores } from '../services/mockData'
import { DatabaseAdapter } from '../patterns/adapter/DatabaseAdapter'

export function useSurtidores(adapter: DatabaseAdapter | null = null) {
  const [data, setData] = useState<Surtidor[]>(mockSurtidores)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const cargar = useCallback(() => {
    if (!adapter) { setLoading(false); return }
    adapter.obtenerSurtidores().then(rows => {
      if (rows.length) {
        setData(rows.map(r => new Surtidor(r)))
      }
      setLoading(false)
    }).catch(err => {
      setError(err.message)
      setLoading(false)
    })
  }, [adapter])

  useEffect(() => { cargar() }, [cargar])

  const crear = useCallback(async (codigo: string, ubicacion: string, estado: 'activo' | 'mantenimiento' | 'fuera de servicio', surtidos: { combustibleId: number; nivel: number; capacidad: number }[]) => {
    if (!adapter) return false
    const result = await adapter.crearSurtidor(codigo, ubicacion, estado, surtidos)
    if (result) { cargar(); return true }
    return false
  }, [adapter, cargar])

  const editar = useCallback(async (id: number, cambios: Partial<{ ubicacion: string; estado: 'activo' | 'mantenimiento' | 'fuera de servicio' }>) => {
    if (!adapter) return false
    const ok = await adapter.editarSurtidor(id, cambios)
    if (ok) cargar()
    return ok
  }, [adapter, cargar])

  const eliminar = useCallback(async (id: number) => {
    if (!adapter) return false
    const ok = await adapter.eliminarSurtidor(id)
    if (ok) cargar()
    return ok
  }, [adapter, cargar])

  return { data, loading, error, crear, editar, eliminar, recargar: cargar }
}
