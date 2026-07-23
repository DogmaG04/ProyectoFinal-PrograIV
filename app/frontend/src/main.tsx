import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { verificarConexion, sembrarDatos } from './services/supabase'

verificarConexion().then(ok => { if (ok) sembrarDatos() })

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
