import { Surtidor } from '../models/Surtidor'
import { Venta } from '../models/Venta'
import { Alerta } from '../models/Alerta'

export const mockSurtidores = [
  new Surtidor({ id: 1, numero: 1, combustible: 'Regular', capacidad: 10000, nivel: 7500 }),
  new Surtidor({ id: 2, numero: 2, combustible: 'Premium', capacidad: 10000, nivel: 2000 }),
  new Surtidor({ id: 3, numero: 3, combustible: 'Diesel', capacidad: 8000, nivel: 1200 }),
  new Surtidor({ id: 4, numero: 4, combustible: 'Regular', capacidad: 10000, nivel: 8500 }),
  new Surtidor({ id: 5, numero: 5, combustible: 'Premium', capacidad: 10000, nivel: 5000 }),
]

export const mockVentas = [
  new Venta({ id: 1, fecha: '2026-07-20 08:30', combustible: 'Regular', litros: 45.5, precio: 1.10, total: 50.05, surtidor_id: 1 }),
  new Venta({ id: 2, fecha: '2026-07-20 09:15', combustible: 'Premium', litros: 30.0, precio: 1.35, total: 40.50, surtidor_id: 2 }),
  new Venta({ id: 3, fecha: '2026-07-20 10:00', combustible: 'Diesel', litros: 60.2, precio: 0.95, total: 57.19, surtidor_id: 3 }),
  new Venta({ id: 4, fecha: '2026-07-20 11:45', combustible: 'Regular', litros: 25.0, precio: 1.10, total: 27.50, surtidor_id: 1 }),
  new Venta({ id: 5, fecha: '2026-07-20 13:20', combustible: 'Premium', litros: 50.0, precio: 1.35, total: 67.50, surtidor_id: 5 }),
  new Venta({ id: 6, fecha: '2026-07-20 14:10', combustible: 'Regular', litros: 40.0, precio: 1.10, total: 44.00, surtidor_id: 4 }),
  new Venta({ id: 7, fecha: '2026-07-20 15:30', combustible: 'Diesel', litros: 35.8, precio: 0.95, total: 34.01, surtidor_id: 3 }),
  new Venta({ id: 8, fecha: '2026-07-20 16:45', combustible: 'Regular', litros: 20.0, precio: 1.10, total: 22.00, surtidor_id: 1 }),
]

export const mockAlertas = [
  new Alerta({ id: 1, surtidor_id: 3, tipo: 'nivel_critico', fecha: '2026-07-20 10:30', estado: 'activa' }),
  new Alerta({ id: 2, surtidor_id: 2, tipo: 'nivel_bajo', fecha: '2026-07-20 09:00', estado: 'activa' }),
  new Alerta({ id: 3, surtidor_id: 1, tipo: 'mantenimiento', fecha: '2026-07-19 14:00', estado: 'resuelta' }),
  new Alerta({ id: 4, surtidor_id: 4, tipo: 'nivel_bajo', fecha: '2026-07-20 12:00', estado: 'activa' }),
  new Alerta({ id: 5, surtidor_id: 5, tipo: 'fuga', fecha: '2026-07-18 08:00', estado: 'resuelta' }),
]
