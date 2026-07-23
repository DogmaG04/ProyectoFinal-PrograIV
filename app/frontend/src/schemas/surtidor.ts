import { z } from 'zod'

export const surtidorSchema = z.object({
  tipo: z.enum(['estacionario', 'portatil', 'industrial']),
  codigo: z
    .string()
    .min(1, 'El código es requerido')
    .max(20, 'Máximo 20 caracteres'),
  ubicacion: z
    .string()
    .min(1, 'La ubicación es requerida')
    .max(100, 'Máximo 100 caracteres'),
})

export const editarSurtidorSchema = z.object({
  estado: z.enum(['activo', 'mantenimiento', 'fuera de servicio']),
})

export type SurtidorFormData = z.infer<typeof surtidorSchema>
export type EditarSurtidorFormData = z.infer<typeof editarSurtidorSchema>
