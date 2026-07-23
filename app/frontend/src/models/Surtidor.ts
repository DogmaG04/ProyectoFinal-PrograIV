export interface SurtidorData {
  id: number
  numero: number
  combustible: string
  capacidad: number
  nivel: number
}

export class Surtidor {
  id: number
  numero: number
  combustible: string
  capacidad: number
  nivel: number

  constructor({ id, numero, combustible, capacidad, nivel }: SurtidorData) {
    this.id = id
    this.numero = numero
    this.combustible = combustible
    this.capacidad = capacidad
    this.nivel = nivel
  }

  get porcentajeNivel(): string {
    return ((this.nivel / this.capacidad) * 100).toFixed(1)
  }

  get estadoNivel(): 'critico' | 'bajo' | 'normal' {
    const pct = parseFloat(this.porcentajeNivel)
    if (pct <= 20) return 'critico'
    if (pct <= 50) return 'bajo'
    return 'normal'
  }
}
