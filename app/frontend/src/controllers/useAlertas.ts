import { useState, useEffect, useCallback, useRef } from 'react'
import { Alerta } from '../models/Alerta'
import { DatabaseAdapter } from '../patterns/adapter/DatabaseAdapter'
import { alertSubject } from '../patterns/observer/AlertObserver'

export function useAlertas(adapter: DatabaseAdapter | null = null) {
  const [data, setData] = useState<Alerta[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const primeraCarga = useRef(true)

  const cargar = useCallback(() => {
    if (!adapter) { setLoading(false); return }
    adapter.obtenerAlertas().then(rows => {
      const alertas = rows.map(r => new Alerta(r))
      setData(alertas)
      alertSubject.notificarMuchas(rows)
      if (primeraCarga.current) {
        primeraCarga.current = false
        alertSubject.marcarCargaInicialCompletada()
      }
      setLoading(false)
    }).catch(err => {
      setError(err.message)
      setLoading(false)
    })
  }, [adapter])

  useEffect(() => { cargar() }, [cargar])

  const crear = useCallback(async (tipo: 'critica' | 'advertencia' | 'info', surtidorId: number, mensaje: string) => {
    if (!adapter) return false
    const result = await adapter.crearAlerta(tipo, surtidorId, mensaje)
    if (result) {
      cargar()
      alertSubject.notificarTodos(result)
      return true
    }
    return false
  }, [adapter, cargar])

  const eliminar = useCallback(async (id: number) => {
    if (!adapter) return false
    const ok = await adapter.eliminarAlerta(id)
    if (ok) cargar()
    return ok
  }, [adapter, cargar])

  return { data, loading, error, crear, eliminar, recargar: cargar }
}
