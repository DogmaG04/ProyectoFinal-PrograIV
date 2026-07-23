import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

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
