import { z } from 'zod'

export const ventaSchema = z.object({
  surtidorId: z.number().min(1, 'Seleccioná un surtidor'),
  combustibleId: z.number().min(1, 'Seleccioná un combustible'),
  litros: z
    .number()
    .min(0.01, 'Los litros deben ser mayor a 0')
    .max(99999, 'Máximo 99,999 litros'),
})

export type VentaFormData = z.infer<typeof ventaSchema>
