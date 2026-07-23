import { Combustible, Surtidor } from '../models/Surtidor'
import { Venta } from '../models/Venta'
import { Alerta } from '../models/Alerta'

export const COMBUSTIBLES: Combustible[] = [
  { id: 1, nombre: 'Gasolina Especial', color: '#1428a0', precioLitro: 6.96 },
  { id: 2, nombre: 'Gasolina Premium', color: '#0d9488', precioLitro: 11.00 },
  { id: 3, nombre: 'Diésel Oíl', color: '#d97706', precioLitro: 9.80 },
]

export const SURTIMIENTOS = [
  { id: 1, nombre: 'Gasolina Especial', color: '#1428a0', precio: 6.96 },
  { id: 2, nombre: 'Gasolina Premium', color: '#0d9488', precio: 11.00 },
  { id: 3, nombre: 'Diésel Oíl', color: '#d97706', precio: 9.80 },
]

export const mockSurtidores: Surtidor[] = [
  new Surtidor({
    id: 1, codigo: 'S-001', ubicacion: 'Bomba 1 — Villa Fátima', estado: 'activo',
    surtidos: [
      { combustibleId: 1, nivel: 72, capacidad: 10000 },
      { combustibleId: 2, nivel: 45, capacidad: 8000 },
      { combustibleId: 3, nivel: 88, capacidad: 12000 },
    ],
  }),
  new Surtidor({
    id: 2, codigo: 'S-002', ubicacion: 'Bomba 1 — Villa Fátima', estado: 'activo',
    surtidos: [
      { combustibleId: 1, nivel: 55, capacidad: 10000 },
      { combustibleId: 2, nivel: 30, capacidad: 8000 },
      { combustibleId: 3, nivel: 12, capacidad: 12000 },
    ],
  }),
  new Surtidor({
    id: 3, codigo: 'S-003', ubicacion: 'Bomba 2 — Zona Sur', estado: 'activo',
    surtidos: [
      { combustibleId: 1, nivel: 90, capacidad: 10000 },
      { combustibleId: 2, nivel: 67, capacidad: 8000 },
      { combustibleId: 3, nivel: 41, capacidad: 12000 },
    ],
  }),
  new Surtidor({
    id: 4, codigo: 'S-004', ubicacion: 'Bomba 2 — Zona Sur', estado: 'mantenimiento',
    surtidos: [
      { combustibleId: 1, nivel: 15, capacidad: 10000 },
      { combustibleId: 2, nivel: 8, capacidad: 8000 },
      { combustibleId: 3, nivel: 52, capacidad: 12000 },
    ],
  }),
  new Surtidor({
    id: 5, codigo: 'S-005', ubicacion: 'Bomba 3 — Cochabamba', estado: 'activo',
    surtidos: [
      { combustibleId: 1, nivel: 38, capacidad: 10000 },
      { combustibleId: 2, nivel: 60, capacidad: 8000 },
      { combustibleId: 3, nivel: 95, capacidad: 12000 },
    ],
  }),
  new Surtidor({
    id: 6, codigo: 'S-006', ubicacion: 'Bomba 3 — Cochabamba', estado: 'fuera de servicio',
    surtidos: [
      { combustibleId: 1, nivel: 0, capacidad: 10000 },
      { combustibleId: 2, nivel: 0, capacidad: 8000 },
      { combustibleId: 3, nivel: 0, capacidad: 12000 },
    ],
  }),
]

export const mockVentas: Venta[] = [
  new Venta({ id: 1,  fecha: '22/07/2026 08:15', surtidor: 'S-001', combustible: 'Gasolina Especial', litros: 42.5,  total: 295.80, surtidorId: 1, combustibleId: 1 }),
  new Venta({ id: 2,  fecha: '22/07/2026 08:32', surtidor: 'S-001', combustible: 'Gasolina Premium',   litros: 30.0,  total: 330.00, surtidorId: 1, combustibleId: 2 }),
  new Venta({ id: 3,  fecha: '22/07/2026 09:05', surtidor: 'S-002', combustible: 'Gasolina Especial', litros: 55.2,  total: 384.19, surtidorId: 2, combustibleId: 1 }),
  new Venta({ id: 4,  fecha: '22/07/2026 09:20', surtidor: 'S-003', combustible: 'Diésel Oíl',         litros: 80.0,  total: 784.00, surtidorId: 3, combustibleId: 3 }),
  new Venta({ id: 5,  fecha: '22/07/2026 09:45', surtidor: 'S-003', combustible: 'Gasolina Especial', litros: 38.7,  total: 269.35, surtidorId: 3, combustibleId: 1 }),
  new Venta({ id: 6,  fecha: '22/07/2026 10:10', surtidor: 'S-001', combustible: 'Diésel Oíl',         litros: 62.3,  total: 610.54, surtidorId: 1, combustibleId: 3 }),
  new Venta({ id: 7,  fecha: '22/07/2026 10:30', surtidor: 'S-005', combustible: 'Gasolina Premium',   litros: 25.0,  total: 275.00, surtidorId: 5, combustibleId: 2 }),
  new Venta({ id: 8,  fecha: '22/07/2026 10:55', surtidor: 'S-002', combustible: 'Diésel Oíl',         litros: 47.8,  total: 468.44, surtidorId: 2, combustibleId: 3 }),
  new Venta({ id: 9,  fecha: '22/07/2026 11:15', surtidor: 'S-005', combustible: 'Gasolina Especial', litros: 60.1,  total: 418.30, surtidorId: 5, combustibleId: 1 }),
  new Venta({ id: 10, fecha: '22/07/2026 11:40', surtidor: 'S-003', combustible: 'Gasolina Premium',   litros: 35.4,  total: 389.40, surtidorId: 3, combustibleId: 2 }),
  new Venta({ id: 11, fecha: '22/07/2026 12:00', surtidor: 'S-001', combustible: 'Gasolina Especial', litros: 28.9,  total: 201.14, surtidorId: 1, combustibleId: 1 }),
  new Venta({ id: 12, fecha: '22/07/2026 12:25', surtidor: 'S-002', combustible: 'Gasolina Premium',   litros: 19.6,  total: 215.60, surtidorId: 2, combustibleId: 2 }),
  new Venta({ id: 13, fecha: '22/07/2026 12:50', surtidor: 'S-005', combustible: 'Diésel Oíl',         litros: 71.2,  total: 697.76, surtidorId: 5, combustibleId: 3 }),
  new Venta({ id: 14, fecha: '22/07/2026 13:10', surtidor: 'S-003', combustible: 'Gasolina Especial', litros: 44.0,  total: 306.24, surtidorId: 3, combustibleId: 1 }),
  new Venta({ id: 15, fecha: '22/07/2026 13:35', surtidor: 'S-001', combustible: 'Gasolina Premium',   litros: 50.2,  total: 552.20, surtidorId: 1, combustibleId: 2 }),
]

export const mockAlertas: Alerta[] = [
  new Alerta({ id: 1, tipo: 'critica',     surtidor: 'S-004', mensaje: 'Surtidor fuera de servicio — mantenimiento programado por Celeron', timestamp: '22/07/2026 07:00' }),
  new Alerta({ id: 2, tipo: 'critica',     surtidor: 'S-006', mensaje: 'Surtidor fuera de servicio — fallo mecánico en dispensador', timestamp: '22/07/2026 06:30' }),
  new Alerta({ id: 3, tipo: 'advertencia', surtidor: 'S-002', mensaje: 'Nivel bajo de Diésel Oíl — 12% restante (1,440 L)', timestamp: '22/07/2026 09:15' }),
  new Alerta({ id: 4, tipo: 'advertencia', surtidor: 'S-002', mensaje: 'Nivel bajo de Gasolina Premium — 30% restante (2,400 L)', timestamp: '22/07/2026 10:00' }),
  new Alerta({ id: 5, tipo: 'advertencia', surtidor: 'S-004', mensaje: 'Nivel crítico de Gasolina Premium — 8% restante (640 L)', timestamp: '22/07/2026 10:30' }),
  new Alerta({ id: 6, tipo: 'info',        surtidor: 'S-001', mensaje: 'Mantenimiento preventivo completado — checklist Celeron aprobado', timestamp: '22/07/2026 07:45' }),
  new Alerta({ id: 7, tipo: 'advertencia', surtidor: 'S-004', mensaje: 'Nivel bajo de Gasolina Especial — 15% restante (1,500 L)', timestamp: '22/07/2026 11:00' }),
  new Alerta({ id: 8, tipo: 'info',        surtidor: 'S-003', mensaje: 'Reabastecimiento registrado — tanquero Celeron #4521', timestamp: '22/07/2026 11:30' }),
  new Alerta({ id: 9, tipo: 'critica',     surtidor: 'S-002', mensaje: 'Nivel crítico de Diésel Oíl — requiere reabastecimiento urgente', timestamp: '22/07/2026 12:45' }),
  new Alerta({ id: 10, tipo: 'info',       surtidor: 'S-005', mensaje: 'Cierre de turno registrado — boletín diario generado', timestamp: '22/07/2026 13:00' }),
]
