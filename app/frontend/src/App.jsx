import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Dashboard from './views/Dashboard'
import Surtidores from './views/Surtidores'
import Ventas from './views/Ventas'
import Alertas from './views/Alertas'
import Reportes from './views/Reportes'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/surtidores" element={<Surtidores />} />
          <Route path="/ventas" element={<Ventas />} />
          <Route path="/alertas" element={<Alertas />} />
          <Route path="/reportes" element={<Reportes />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
