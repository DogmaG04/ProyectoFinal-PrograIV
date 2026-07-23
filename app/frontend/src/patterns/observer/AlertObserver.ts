import { DBAlerta } from '../adapter/DatabaseAdapter'

export type { DBAlerta }

export interface Observer {
  notificar(alerta: DBAlerta): void
}

export class AlertSubject {
  private observers: Observer[] = []
  private historial: DBAlerta[] = []

  suscribir(observer: Observer): () => void {
    this.observers.push(observer)
    return () => {
      this.observers = this.observers.filter(o => o !== observer)
    }
  }

  notificarTodos(alerta: DBAlerta): void {
    this.historial.push(alerta)
    this.observers.forEach(o => o.notificar(alerta))
  }

  notificarMuchas(alertas: DBAlerta[]): void {
    alertas.forEach(a => this.notificarTodos(a))
  }

  obtenerHistorial(): DBAlerta[] {
    return [...this.historial]
  }

  cantidadObservers(): number {
    return this.observers.length
  }
}

export const alertSubject = new AlertSubject()
