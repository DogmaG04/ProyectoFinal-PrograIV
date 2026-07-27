import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAdapter } from '../services/adapterContext'
import { useAlertas } from '../controllers/useAlertas'
import CriticalAlertsModal from './CriticalAlertsModal'

const STORAGE_KEY = 'criticalAlertsShown'

export default function CriticalAlertsGuard() {
  const adapter = useAdapter()
  const { data: alertas } = useAlertas(adapter)
  const navigate = useNavigate()
  const [abierto, setAbierto] = useState(false)

  useEffect(() => {
    if (alertas.length === 0) return
    if (localStorage.getItem(STORAGE_KEY)) return

    const criticas = alertas.filter(a => a.tipo === 'critica')
    if (criticas.length > 0) {
      setAbierto(true)
      localStorage.setItem(STORAGE_KEY, 'true')
    }
  }, [alertas])

  function handleClose() {
    setAbierto(false)
  }

  function handleIrAlertas() {
    setAbierto(false)
    navigate('/alertas')
  }

  const criticas = alertas.filter(a => a.tipo === 'critica')

  return (
    <CriticalAlertsModal
      abierto={abierto}
      alertas={criticas}
      onClose={handleClose}
      onIrAlertas={handleIrAlertas}
    />
  )
}
