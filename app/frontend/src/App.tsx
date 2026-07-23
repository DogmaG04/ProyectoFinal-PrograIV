import { useState, useCallback } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Login from './components/Login'
import LoadingScreen from './components/LoadingScreen'
import ToastContainer from './components/Toast'
import Dashboard from './views/Dashboard'
import Surtidores from './views/Surtidores'
import Ventas from './views/Ventas'
import Alertas from './views/Alertas'
import Reportes from './views/Reportes'
import { AdapterProvider } from './services/adapterContext'
import { SupabaseAdapter } from './patterns/adapter/SupabaseAdapter'
import { ThemeProvider } from './services/ThemeContext'

const adapter = new SupabaseAdapter()

export default function App() {
  const [loggedIn, setLoggedIn] = useState(() => localStorage.getItem('loggedIn') === 'true')

  const handleLogout = useCallback(() => {
    localStorage.removeItem('loggedIn')
    setLoggedIn(false)
  }, [])

  const handleLogin = useCallback(() => {
    localStorage.setItem('loggedIn', 'true')
    setLoggedIn(true)
  }, [])

  if (!loggedIn) {
    return <Login onLogin={handleLogin} />
  }

  return (
    <ThemeProvider>
      <LoadingScreen />
      <AdapterProvider adapter={adapter}>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout onLogout={handleLogout} />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/surtidores" element={<Surtidores />} />
              <Route path="/ventas" element={<Ventas />} />
              <Route path="/alertas" element={<Alertas />} />
              <Route path="/reportes" element={<Reportes />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <ToastContainer />
      </AdapterProvider>
    </ThemeProvider>
  )
}
