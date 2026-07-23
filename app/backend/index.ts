export { supabase, verificarConexion } from './services/supabaseClient'
export { sembrarDatos } from './controllers/seedController'
export {
  obtenerCombustibles,
  obtenerSurtidores,
  crearSurtidor,
  editarSurtidor,
  eliminarSurtidor,
  obtenerVentas,
  crearVenta,
  eliminarVenta,
  obtenerAlertas,
  crearAlerta,
  eliminarAlerta,
} from './controllers'
export type { Combustible, Surtido, Surtidor, Venta, Alerta, EstadoSurtidor, TipoAlerta } from './models'
