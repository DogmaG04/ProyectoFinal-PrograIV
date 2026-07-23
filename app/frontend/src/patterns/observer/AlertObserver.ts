import { DBAlerta } from '../adapter/DatabaseAdapter'

export type { DBAlerta }

export interface Observer {
  notificar(alerta: DBAlerta): void
}

export class AlertSubject {
  private observers: Observer[] = []
  private nuevosObservers: Observer[] = []
  private historial: DBAlerta[] = []
  private _cargaInicial = true

  suscribir(observer: Observer): () => void {
    this.observers.push(observer)
    return () => {
      this.observers = this.observers.filter(o => o !== observer)
    }
  }

  suscribirNuevos(observer: Observer): () => void {
    this.nuevosObservers.push(observer)
    return () => {
      this.nuevosObservers = this.nuevosObservers.filter(o => o !== observer)
    }
  }

  marcarCargaInicialCompletada(): void {
    this._cargaInicial = false
  }

  notificarTodos(alerta: DBAlerta): void {
    this.historial.push(alerta)
    if (!this._cargaInicial) {
      this.nuevosObservers.forEach(o => o.notificar(alerta))
    }
  }

  notificarMuchas(alertas: DBAlerta[]): void {
    alertas.forEach(a => this.historial.push(a))
  }

  obtenerHistorial(): DBAlerta[] {
    return [...this.historial]
  }

  cantidadObservers(): number {
    return this.observers.length
  }
}

export const alertSubject = new AlertSubject()
