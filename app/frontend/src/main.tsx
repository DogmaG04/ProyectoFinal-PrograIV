import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { verificarConexion } from './backend'
import { sembrarDatos } from './backend'

verificarConexion().then(ok => { if (ok) sembrarDatos() })

const root = document.getElementById('root')
if (root) {
  createRoot(root).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
