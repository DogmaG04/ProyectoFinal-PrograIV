export class Surtidor {
  constructor({ id, numero, combustible, capacidad, nivel }) {
    this.id = id
    this.numero = numero
    this.combustible = combustible
    this.capacidad = capacidad
    this.nivel = nivel
  }

  get porcentajeNivel() {
    return ((this.nivel / this.capacidad) * 100).toFixed(1)
  }

  get estadoNivel() {
    const pct = this.porcentajeNivel
    if (pct <= 20) return 'critico'
    if (pct <= 50) return 'bajo'
    return 'normal'
  }
}
