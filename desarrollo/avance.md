# Registro de Desarrollo — Surtidor de Gasolina

Seguimiento del avance del proyecto. Última actualización: 2026-07-23

---

## Lo que ya está implementado

### Setup y configuración
- [x] Repositorio GitHub creado
- [x] Estructura de carpetas (`app/backend`, `app/frontend`, `docs`, `desarrollo`)
- [x] `.gitignore` configurado
- [x] README.md con badges, descripción, link del prototipo e instalación
- [x] Documentación en `docs/BD.md` (tablas: combustibles, surtidores, surtidos, ventas, alertas)
- [x] Documentación en `docs/estructura.md` (arquitectura MVC)

### Frontend — Base
- [x] React + Vite inicializado con pnpm
- [x] Tailwind CSS configurado
- [x] React Router configurado con rutas
- [x] TypeScript configurado (`tsconfig.json`)
- [x] Dependencias: `react-router-dom`, `tailwindcss`, `@tailwindcss/vite`
- [x] Dependencias: `chart.js`, `react-chartjs-2` (gráficos)

### Frontend — Estructura MVC
- [x] Models tipados: `Surtidor.ts`, `Venta.ts`, `Alerta.ts` (con interfaces)
- [x] Models reestructurados para multi-combustible por surtidor
- [x] Services: `mockData.ts` con constante `COMBUSTIBLES` y datos extendidos

### Frontend — Controllers
- [x] Custom hooks: `useCombustibles`, `useSurtidores`, `useVentas`, `useAlertas`
- [x] Utilidad `formatDate.ts` para formateo de timestamps
- [x] Cada hook carga datos desde Supabase con fallback a mockData

### Frontend — UI
- [x] Login page con autenticación mock
- [x] Sidebar izquierdo con navegación e iconos SVG
- [x] Layout con grid, header con reloj y estado del sistema
- [x] Dashboard — KPIs + gráficos Bar/Doughnut (Chart.js) + alertas recientes
- [x] Surtidores — Cards con gauges multi-combustible y estados (activo/mantenimiento/fuera de servicio)
- [x] Ventas — KPIs + gráfico Line de ventas por hora + tabla con totales
- [x] Alertas — Filtros por tipo (crítica/advertencia/info) con badges de color
- [x] Reportes — Cards por combustible y surtidor + charts Bar horizontales
- [x] Tema oscuro global (Plus Jakarta Sans, colores personalizados, scrollbar)

### Backend — Base de datos
- [x] Migración SQL en `app/backend/migrations/001_create_tables.sql`
- [x] Esquema con 5 tablas: combustibles, surtidores, surtidos, ventas, alertas
- [x] Datos iniciales (combustibles ANH 2026, surtidores, surtidos)

### Backend — Conexión
- [x] Cliente Supabase en `services/supabase.ts`
- [x] Función `verificarConexion()` con try/catch y mensajes en consola
- [x] Función `sembrarDatos()` para poblar Supabase desde el navegador
- [x] Variables de entorno en `.env.example`
- [x] Dependencia `@supabase/supabase-js`

### Prototipo
- [x] Prototipo visual en repo separado (GitHub Pages)
- [x] Link del prototipo en README

### Patrones de diseño
- [ ] Factory para Surtidores
- [ ] Adapter para conexión a BD
- [ ] Observer para Alertas

---

## Lo que falta por implementar

### Backend (Supabase)
- [ ] Implementar CRUD para surtidores
- [ ] Implementar CRUD para ventas
- [ ] Implementar CRUD para alertas
- [ ] Implementar Adapter pattern para abstraer la BD

### Funcionalidad
- [x] Vistas conectadas a Supabase a través de custom hooks
- [x] Fallback automático a mockData si Supabase no está disponible o sin datos
- [x] Tablas, gráficos y filtros funcionan con datos reales desde Supabase
- [ ] Sistema de ventas con aritmética binaria
- [ ] Decodificadores para reportes
- [ ] Generación de reportes avanzada

### Patrones de diseño
- [ ] Factory pattern en `patterns/factory/`
- [ ] Adapter pattern en `patterns/adapter/`
- [ ] Observer pattern en `patterns/observer/`

### Calidad y deploy
- [ ] Pruebas unitarias
- [ ] Configurar SonarQube
- [ ] Refactorización general
- [ ] Deploy en Vercel/Render
- [ ] Variables de entorno configuradas

---

## Commits del proyecto

| Hash | Descripción |
|------|-------------|
| `5fd60a5` | feat(backend): add seed function to populate Supabase with initial data |
| `aa3b3a7` | feat(frontend): integrate all views with Supabase via custom hooks |
| `e3162f7` | feat(frontend): call verificarConexion on app startup |
| `2eadff5` | chore(frontend): add vite env types for TypeScript |
| `a180321` | feat(backend): add supabase client with connection verification |
| `fa22cab` | feat(backend): create SQL migration for multi-combustible schema |
| `8fa8641` | feat(frontend): redesign all views with charts, stats cards, and modern dark UI |
| `c5f2714` | feat(frontend): update app shell with new sidebar, header, and dark theme |
| `e315a21` | feat(frontend): add login page component |
| `8762f21` | feat(frontend): enrich mock data with COMBUSTIBLES constant and extended records |
| `85192b2` | refactor(frontend): restructure models with new field schemas for surtidor multi-combustible |
| `517938c` | chore(frontend): add chart.js and react-chartjs-2 dependencies |
| `3ca2da0` | docs: add development tracking file |
| `33e1ed4` | chore(frontend): remove old JSX files |
| `25e2d57` | refactor(frontend): rename all JSX to TSX files |
| `761ca08` | refactor(frontend): migrate mock data service to TypeScript |
| `c7d5175` | refactor(frontend): migrate data models to TypeScript with interfaces |
| `a00804c` | feat(frontend): add TypeScript configuration and dependencies |
| `acdd096` | chore(frontend): remove old Navbar component |
| `d1119b4` | refactor(frontend): rewrite all views with dark theme aesthetic |
| `1cdffe4` | refactor(frontend): use layout routes with sidebar |
| `b63fd70` | feat(frontend): add sidebar navigation and layout component |
| `9aa1fe9` | feat(frontend): add dark theme global styles and custom fonts |
| `c610948` | Actualizar link del prototipo a GitHub Pages |
| `ea8addd` | feat(frontend): add Reportes view |
| `ce638ec` | feat(frontend): add Alertas view |
| `29a16cc` | feat(frontend): add Ventas view |
| `795b770` | feat(frontend): add Surtidores view |
| `787e484` | feat(frontend): add Dashboard view |
| `dd3566d` | feat(frontend): add MVC data models and mock data service |
| `8f61577` | feat(frontend): initialize React + Vite with Tailwind CSS |
| `03f5562` | chore: add project documentation and gitignore |
