import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './views/Dashboard'
import Surtidores from './views/Surtidores'
import Ventas from './views/Ventas'
import Alertas from './views/Alertas'
import Reportes from './views/Reportes'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/surtidores" element={<Surtidores />} />
          <Route path="/ventas" element={<Ventas />} />
          <Route path="/alertas" element={<Alertas />} />
          <Route path="/reportes" element={<Reportes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
