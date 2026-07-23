# Registro de Desarrollo — Surtidor de Gasolina

Seguimiento del avance del proyecto. Última actualización: 2026-07-23

---

## Lo que ya está implementado

### Setup y configuración
- [x] Repositorio GitHub creado
- [x] Estructura de carpetas (`app/backend`, `app/frontend`, `docs`, `desarrollo`)
- [x] `.gitignore` configurado
- [x] README.md con badges, descripción, link del prototipo e instalación
- [x] Documentación en `docs/BD.md` (tablas: surtidores, ventas, alertas)
- [x] Documentación en `docs/estructura.md` (arquitectura MVC)

### Frontend — Base
- [x] React + Vite inicializado con pnpm
- [x] Tailwind CSS configurado
- [x] React Router configurado con rutas
- [x] TypeScript configurado (`tsconfig.json`)
- [x] Dependencias: `react-router-dom`, `tailwindcss`, `@tailwindcss/vite`

### Frontend — Estructura MVC
- [x] Models tipados: `Surtidor.ts`, `Venta.ts`, `Alerta.ts` (con interfaces)
- [x] Services: `mockData.ts` con datos de prueba
- [x] Controllers/ (carpeta creada, pendiente implementar)

### Frontend — UI
- [x] Sidebar izquierdo con navegación (estilo terminal)
- [x] Layout con `<Outlet />` para rutas
- [x] Dashboard — KPI cards + estado surtidores + alertas
- [x] Surtidores — Cards con gauge bars de nivel
- [x] Ventas — Tabla de ventas + KPIs
- [x] Alertas — Panel con bordes de color por tipo
- [x] Reportes — Tablas de resumen por combustible y surtidor
- [x] Tema oscuro global (colores, JetBrains Mono, scrollbar)

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
- [ ] Crear migraciones SQL en `app/backend/`
- [ ] Configurar conexión Supabase en `services/supabase.ts`
- [ ] Implementar CRUD para surtidores
- [ ] Implementar CRUD para ventas
- [ ] Implementar CRUD para alertas
- [ ] Implementar Adapter pattern para abstraer la BD

### Funcionalidad
- [ ] Conectar vistas con Supabase (reemplazar mock data)
- [ ] Sistema de ventas con aritmética binaria
- [ ] Decodificadores para reportes
- [ ] Generación de reportes avanzada
- [ ] Controllers (custom hooks) para cada entidad

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
