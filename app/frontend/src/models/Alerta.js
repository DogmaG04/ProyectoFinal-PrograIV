export class Alerta {
  constructor({ id, surtidor_id, tipo, fecha, estado }) {
    this.id = id
    this.surtidor_id = surtidor_id
    this.tipo = tipo
    this.fecha = fecha
    this.estado = estado
  }

  get esUrgente() {
    return this.tipo === 'nivel_critico' || this.tipo === 'fuga'
  }
}
