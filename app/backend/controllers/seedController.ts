import { supabase } from '../services/supabaseClient'

export async function sembrarDatos() {
  console.log('🌱 Sembrando datos en Supabase...')

  const { data: existe } = await supabase.from('combustibles').select('id').limit(1)
  if (existe?.length) {
    console.log('⚠️  Los datos ya existen, no se insertan duplicados')
    return
  }

  const { error: e1 } = await supabase.from('combustibles').insert([
    { nombre: 'Gasolina Especial', color: '#34d399', precio_litro: 6.96 },
    { nombre: 'Gasolina Premium', color: '#4d7cfe', precio_litro: 11.00 },
    { nombre: 'Diésel Oíl', color: '#fbbf24', precio_litro: 9.80 },
  ])
  if (e1) { console.error('❌ Error al insertar combustibles:', e1); return }
  console.log('✅ Combustibles insertados')

  const { error: e2 } = await supabase.from('surtidores').insert([
    { codigo: 'S-001', ubicacion: 'Isla 1 — Lateral Este', estado: 'activo' },
    { codigo: 'S-002', ubicacion: 'Isla 1 — Lateral Oeste', estado: 'activo' },
    { codigo: 'S-003', ubicacion: 'Isla 2 — Lateral Este', estado: 'activo' },
    { codigo: 'S-004', ubicacion: 'Isla 2 — Lateral Oeste', estado: 'fuera de servicio' },
    { codigo: 'S-005', ubicacion: 'Isla 3 — Lateral Este', estado: 'activo' },
    { codigo: 'S-006', ubicacion: 'Isla 3 — Lateral Oeste', estado: 'mantenimiento' },
  ])
  if (e2) { console.error('❌ Error al insertar surtidores:', e2); return }
  console.log('✅ Surtidores insertados')

  const { data: surtidores } = await supabase.from('surtidores').select('id, codigo')
  const { data: combustibles } = await supabase.from('combustibles').select('id, nombre')
  if (!surtidores?.length || !combustibles?.length) return

  const getId = (codigo: string) => surtidores.find((s: any) => s.codigo === codigo)!.id
  const getCombId = (nombre: string) => combustibles.find((c: any) => c.nombre === nombre)!.id

  const { error: e3 } = await supabase.from('surtidos').insert([
    { surtidor_id: getId('S-001'), combustible_id: getCombId('Gasolina Especial'), nivel: 4800, capacidad: 6000 },
    { surtidor_id: getId('S-001'), combustible_id: getCombId('Gasolina Premium'), nivel: 3200, capacidad: 4000 },
    { surtidor_id: getId('S-002'), combustible_id: getCombId('Diésel Oíl'), nivel: 1440, capacidad: 12000 },
    { surtidor_id: getId('S-002'), combustible_id: getCombId('Gasolina Premium'), nivel: 2400, capacidad: 8000 },
    { surtidor_id: getId('S-003'), combustible_id: getCombId('Gasolina Especial'), nivel: 4500, capacidad: 6000 },
    { surtidor_id: getId('S-004'), combustible_id: getCombId('Gasolina Especial'), nivel: 1500, capacidad: 10000 },
    { surtidor_id: getId('S-004'), combustible_id: getCombId('Gasolina Premium'), nivel: 640, capacidad: 8000 },
    { surtidor_id: getId('S-005'), combustible_id: getCombId('Diésel Oíl'), nivel: 8000, capacidad: 10000 },
    { surtidor_id: getId('S-006'), combustible_id: getCombId('Gasolina Especial'), nivel: 4000, capacidad: 6000 },
  ])
  if (e3) { console.error('❌ Error al insertar surtidos:', e3); return }
  console.log('✅ Surtidos insertados')

  const { error: e4 } = await supabase.from('ventas').insert([
    { fecha: '2026-07-22T12:15:00', surtidor_id: getId('S-001'), combustible_id: getCombId('Gasolina Especial'), litros: 42.5, total: 295.80 },
    { fecha: '2026-07-22T12:32:00', surtidor_id: getId('S-001'), combustible_id: getCombId('Gasolina Premium'), litros: 30.0, total: 330.00 },
    { fecha: '2026-07-22T13:05:00', surtidor_id: getId('S-002'), combustible_id: getCombId('Gasolina Especial'), litros: 55.2, total: 384.19 },
    { fecha: '2026-07-22T13:20:00', surtidor_id: getId('S-003'), combustible_id: getCombId('Diésel Oíl'), litros: 80.0, total: 784.00 },
    { fecha: '2026-07-22T13:45:00', surtidor_id: getId('S-003'), combustible_id: getCombId('Gasolina Especial'), litros: 38.7, total: 269.35 },
    { fecha: '2026-07-22T14:10:00', surtidor_id: getId('S-001'), combustible_id: getCombId('Diésel Oíl'), litros: 62.3, total: 610.54 },
    { fecha: '2026-07-22T14:30:00', surtidor_id: getId('S-005'), combustible_id: getCombId('Gasolina Premium'), litros: 25.0, total: 275.00 },
    { fecha: '2026-07-22T14:55:00', surtidor_id: getId('S-002'), combustible_id: getCombId('Diésel Oíl'), litros: 47.8, total: 468.44 },
    { fecha: '2026-07-22T15:15:00', surtidor_id: getId('S-005'), combustible_id: getCombId('Gasolina Especial'), litros: 60.1, total: 418.30 },
    { fecha: '2026-07-22T15:40:00', surtidor_id: getId('S-003'), combustible_id: getCombId('Gasolina Premium'), litros: 35.4, total: 389.40 },
  ])
  if (e4) { console.error('❌ Error al insertar ventas:', e4); return }
  console.log('✅ Ventas insertadas')

  const { error: e5 } = await supabase.from('alertas').insert([
    { tipo: 'critica', surtidor_id: getId('S-004'), mensaje: 'Surtidor fuera de servicio — mantenimiento programado por Celeron', timestamp: '2026-07-22T11:00:00' },
    { tipo: 'critica', surtidor_id: getId('S-006'), mensaje: 'Surtidor fuera de servicio — fallo mecánico en dispensador', timestamp: '2026-07-22T10:30:00' },
    { tipo: 'advertencia', surtidor_id: getId('S-002'), mensaje: 'Nivel bajo de Diésel Oíl — 12% restante (1,440 L)', timestamp: '2026-07-22T13:15:00' },
    { tipo: 'advertencia', surtidor_id: getId('S-002'), mensaje: 'Nivel bajo de Gasolina Premium — 30% restante (2,400 L)', timestamp: '2026-07-22T14:00:00' },
    { tipo: 'advertencia', surtidor_id: getId('S-004'), mensaje: 'Nivel crítico de Gasolina Premium — 8% restante (640 L)', timestamp: '2026-07-22T14:30:00' },
    { tipo: 'info', surtidor_id: getId('S-001'), mensaje: 'Mantenimiento preventivo completado — checklist Celeron aprobado', timestamp: '2026-07-22T11:45:00' },
    { tipo: 'advertencia', surtidor_id: getId('S-004'), mensaje: 'Nivel bajo de Gasolina Especial — 15% restante (1,500 L)', timestamp: '2026-07-22T15:00:00' },
    { tipo: 'info', surtidor_id: getId('S-003'), mensaje: 'Reabastecimiento registrado — tanquero Celeron #4521', timestamp: '2026-07-22T15:30:00' },
    { tipo: 'critica', surtidor_id: getId('S-002'), mensaje: 'Nivel crítico de Diésel Oíl — requiere reabastecimiento urgente', timestamp: '2026-07-22T16:45:00' },
    { tipo: 'info', surtidor_id: getId('S-005'), mensaje: 'Cierre de turno registrado — boletín diario generado', timestamp: '2026-07-22T17:00:00' },
  ])
  if (e5) { console.error('❌ Error al insertar alertas:', e5); return }
  console.log('✅ Alertas insertadas')

  console.log('🌱✅ Todos los datos fueron sembrados correctamente')
}
