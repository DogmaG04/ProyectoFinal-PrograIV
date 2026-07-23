import { z } from 'zod'

export const alertaSchema = z.object({
  tipo: z.enum(['critica', 'advertencia', 'info']),
  surtidorId: z.number().min(1, 'Seleccioná un surtidor'),
  mensaje: z
    .string()
    .min(1, 'El mensaje es requerido')
    .min(5, 'Mínimo 5 caracteres')
    .max(500, 'Máximo 500 caracteres'),
})

export type AlertaFormData = z.infer<typeof alertaSchema>
