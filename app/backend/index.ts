import 'dotenv/config'
import path from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
import cors from 'cors'
import { verificarConexion } from './services/supabaseClient'
import {
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
import { sembrarDatos } from './controllers/seedController'

const app = express()
const PORT = process.env.PORT || 3001

const isProd = process.env.NODE_ENV === 'production'

app.use(cors(isProd ? {} : { origin: ['http://localhost:5173', 'http://localhost:4173'] }))
app.use(express.json())

function parseId(req: express.Request, res: express.Response): number | null {
  const id = Number(req.params.id)
  if (isNaN(id)) {
    res.status(400).json({ error: 'ID inválido' })
    return null
  }
  return id
}

app.get('/api/health', async (_req, res) => {
  try {
    const ok = await verificarConexion()
    res.json({ connected: ok })
  } catch (err) {
    res.status(500).json({ error: String(err) })
  }
})

app.post('/api/seed', async (_req, res) => {
  try {
    await sembrarDatos()
    res.json({ ok: true })
  } catch (err) {
    res.status(500).json({ error: String(err) })
  }
})

app.get('/api/combustibles', async (_req, res) => {
  try {
    const data = await obtenerCombustibles()
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: String(err) })
  }
})

app.get('/api/surtidores', async (_req, res) => {
  try {
    const data = await obtenerSurtidores()
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: String(err) })
  }
})

app.post('/api/surtidores', async (req, res) => {
  try {
    const { codigo, ubicacion, estado, surtidos } = req.body
    const result = await crearSurtidor(codigo, ubicacion, estado, surtidos)
    if (!result) return res.status(400).json({ error: 'No se pudo crear el surtidor' })
    res.status(201).json(result)
  } catch (err) {
    res.status(500).json({ error: String(err) })
  }
})

app.put('/api/surtidores/:id', async (req, res) => {
  try {
    const id = parseId(req, res)
    if (id === null) return
    const ok = await editarSurtidor(id, req.body)
    if (!ok) return res.status(400).json({ error: 'No se pudo editar el surtidor' })
    res.json({ ok: true })
  } catch (err) {
    res.status(500).json({ error: String(err) })
  }
})

app.delete('/api/surtidores/:id', async (req, res) => {
  try {
    const id = parseId(req, res)
    if (id === null) return
    const ok = await eliminarSurtidor(id)
    if (!ok) return res.status(400).json({ error: 'No se pudo eliminar el surtidor' })
    res.json({ ok: true })
  } catch (err) {
    res.status(500).json({ error: String(err) })
  }
})

app.get('/api/ventas', async (_req, res) => {
  try {
    const data = await obtenerVentas()
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: String(err) })
  }
})

app.post('/api/ventas', async (req, res) => {
  try {
    const { surtidorId, combustibleId, litros, total } = req.body
    const result = await crearVenta(surtidorId, combustibleId, litros, total)
    if (!result) return res.status(400).json({ error: 'No se pudo registrar la venta' })
    res.status(201).json(result)
  } catch (err) {
    res.status(500).json({ error: String(err) })
  }
})

app.delete('/api/ventas/:id', async (req, res) => {
  try {
    const id = parseId(req, res)
    if (id === null) return
    const ok = await eliminarVenta(id)
    if (!ok) return res.status(400).json({ error: 'No se pudo eliminar la venta' })
    res.json({ ok: true })
  } catch (err) {
    res.status(500).json({ error: String(err) })
  }
})

app.get('/api/alertas', async (_req, res) => {
  try {
    const data = await obtenerAlertas()
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: String(err) })
  }
})

app.post('/api/alertas', async (req, res) => {
  try {
    const { tipo, surtidorId, mensaje } = req.body
    const result = await crearAlerta(tipo, surtidorId, mensaje)
    if (!result) return res.status(400).json({ error: 'No se pudo crear la alerta' })
    res.status(201).json(result)
  } catch (err) {
    res.status(500).json({ error: String(err) })
  }
})

app.delete('/api/alertas/:id', async (req, res) => {
  try {
    const id = parseId(req, res)
    if (id === null) return
    const ok = await eliminarAlerta(id)
    if (!ok) return res.status(400).json({ error: 'No se pudo eliminar la alerta' })
    res.json({ ok: true })
  } catch (err) {
    res.status(500).json({ error: String(err) })
  }
})

if (isProd) {
  const __dirname = path.dirname(fileURLToPath(import.meta.url))
  const distPath = path.join(__dirname, '../frontend/dist')
  app.use(express.static(distPath))
  app.get('*', (_req, res) => {
    res.sendFile(path.join(distPath, 'index.html'))
  })
}

app.listen(PORT, async () => {
  console.log(`🚀 Backend corriendo en http://localhost:${PORT}`)
  const connected = await verificarConexion()
  if (connected) {
    await sembrarDatos()
  }
})
