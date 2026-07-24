import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { registerSW } from 'virtual:pwa-register'
import './index.css'
import App from './App'

const updateSW = registerSW({
  onNeedRefresh() {
    updateSW(true)
  },
  onOfflineReady() {
    console.log('App lista para funcionar sin conexion')
  },
})

fetch('/api/health')
  .then(r => r.json())
  .then(({ connected }) => {
    if (connected) fetch('/api/seed', { method: 'POST' })
  })
  .catch(() => console.warn('Backend no disponible'))

const root = document.getElementById('root')
if (root) {
  createRoot(root).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
