export class Venta {
  constructor({ id, fecha, combustible, litros, precio, total, surtidor_id }) {
    this.id = id
    this.fecha = fecha
    this.combustible = combustible
    this.litros = litros
    this.precio = precio
    this.total = total
    this.surtidor_id = surtidor_id
  }
}
