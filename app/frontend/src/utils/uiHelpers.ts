export function statusTagClass(estado: string): string {
  const map: Record<string, string> = {
    activo: 'text-success bg-success-light',
    mantenimiento: 'text-warning bg-warning-light',
    'fuera de servicio': 'text-danger bg-danger-light',
  }
  return map[estado] || ''
}

export function getNivelClass(nivel: number): string {
  return nivel <= 20 ? 'animate-pulse' : ''
}

export function getNivelColor(nivel: number): string {
  if (nivel <= 20) return '#f87171'
  if (nivel <= 40) return '#fbbf24'
  return '#4d7cfe'
}

export function fmt(n: number): string {
  return 'Bs. ' + n.toLocaleString('es-BO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export function fmtNum(n: number): string {
  return n.toLocaleString('es-BO', { minimumFractionDigits: 1, maximumFractionDigits: 1 })
}
