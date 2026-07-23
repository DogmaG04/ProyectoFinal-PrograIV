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

app.get('/api/health', async (_req, res) => {
  const ok = await verificarConexion()
  res.json({ connected: ok })
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
  const data = await obtenerCombustibles()
  res.json(data)
})

app.get('/api/surtidores', async (_req, res) => {
  const data = await obtenerSurtidores()
  res.json(data)
})

app.post('/api/surtidores', async (req, res) => {
  const { codigo, ubicacion, estado, surtidos } = req.body
  const result = await crearSurtidor(codigo, ubicacion, estado, surtidos)
  if (!result) return res.status(400).json({ error: 'No se pudo crear el surtidor' })
  res.status(201).json(result)
})

app.put('/api/surtidores/:id', async (req, res) => {
  const id = Number(req.params.id)
  const ok = await editarSurtidor(id, req.body)
  if (!ok) return res.status(400).json({ error: 'No se pudo editar el surtidor' })
  res.json({ ok: true })
})

app.delete('/api/surtidores/:id', async (req, res) => {
  const id = Number(req.params.id)
  const ok = await eliminarSurtidor(id)
  if (!ok) return res.status(400).json({ error: 'No se pudo eliminar el surtidor' })
  res.json({ ok: true })
})

app.get('/api/ventas', async (_req, res) => {
  const data = await obtenerVentas()
  res.json(data)
})

app.post('/api/ventas', async (req, res) => {
  const { surtidorId, combustibleId, litros, total } = req.body
  const result = await crearVenta(surtidorId, combustibleId, litros, total)
  if (!result) return res.status(400).json({ error: 'No se pudo registrar la venta' })
  res.status(201).json(result)
})

app.delete('/api/ventas/:id', async (req, res) => {
  const id = Number(req.params.id)
  const ok = await eliminarVenta(id)
  if (!ok) return res.status(400).json({ error: 'No se pudo eliminar la venta' })
  res.json({ ok: true })
})

app.get('/api/alertas', async (_req, res) => {
  const data = await obtenerAlertas()
  res.json(data)
})

app.post('/api/alertas', async (req, res) => {
  const { tipo, surtidorId, mensaje } = req.body
  const result = await crearAlerta(tipo, surtidorId, mensaje)
  if (!result) return res.status(400).json({ error: 'No se pudo crear la alerta' })
  res.status(201).json(result)
})

app.delete('/api/alertas/:id', async (req, res) => {
  const id = Number(req.params.id)
  const ok = await eliminarAlerta(id)
  if (!ok) return res.status(400).json({ error: 'No se pudo eliminar la alerta' })
  res.json({ ok: true })
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
