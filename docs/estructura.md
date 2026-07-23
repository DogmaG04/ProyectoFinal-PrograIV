# Estructura del Proyecto

## Arquitectura general

El proyecto tiene una separación clara entre **backend** (servidor Express con API REST) y **frontend** (React SPA):

```
ProyectoFinal-PrograIV/
├── app/
│   ├── package.json            # Concurrently para ejecutar ambos servicios
│   ├── backend/                # Servidor Express (Node.js + TypeScript)
│   │   ├── controllers/        # Lógica CRUD → Supabase (MVC - Controller)
│   │   ├── models/             # Interfaces TypeScript (MVC - Model)
│   │   ├── services/           # Cliente Supabase
│   │   ├── migrations/         # SQL de tablas PostgreSQL
│   │   ├── index.ts            # Servidor Express con rutas REST /api/*
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── .env
│   └── frontend/               # React SPA (Vite + TypeScript)
│       └── src/
│           ├── models/         # Modelos de datos frontend (MVC - Model)
│           ├── views/          # Pantallas principales (MVC - View)
│           ├── controllers/    # Custom hooks con CRUD (MVC - Controller)
│           ├── components/     # Componentes reutilizables (Modal, Toast, etc.)
│           ├── patterns/       # Patrones de diseño
│           │   ├── factory/    # Factory para Surtidores
│           │   ├── adapter/    # Adapter para conexión a API
│           │   └── observer/   # Observer para Alertas
│           ├── services/       # Adapter Context (React context)
│           ├── utils/          # Aritmética binaria, decoders, helpers
│           ├── App.tsx         # Rutas y layout principal
│           ├── main.tsx        # Punto de entrada
│           └── index.css       # Estilos globales (Tailwind)
├── docs/
│   ├── BD.md                   # Documentación de tablas
│   └── estructura.md           # Este archivo
├── desarrollo/
│   └── avance.md               # Registro de avance
├── README.md
└── .gitignore
```

## MVC separado Backend / Frontend

### Backend (Express API REST)

| Capa | Carpeta | Responsabilidad |
|------|---------|-----------------|
| **Model** | `backend/models/` | Interfaces TypeScript: `Combustible`, `Surtidor`, `Surtido`, `Venta`, `Alerta` |
| **Controller** | `backend/controllers/` | Funciones CRUD que consultan Supabase y transforman datos |
| **Service** | `backend/services/` | Cliente Supabase singleton + verificación de conexión |
| **Routes** | `backend/index.ts` | Rutas REST Express: `/api/surtidores`, `/api/ventas`, `/api/alertas` |

### Frontend (React SPA)

| Capa | Carpeta | Responsabilidad |
|------|---------|-----------------|
| **Model** | `frontend/src/models/` | Modelos frontend tipados |
| **View** | `frontend/src/views/` | Pantallas: Dashboard, Surtidores, Ventas, Alertas, Reportes |
| **Controller** | `frontend/src/controllers/` | Custom hooks: `useSurtidores`, `useVentas`, `useAlertas`, `useCombustibles` |
| **Service** | `frontend/src/services/` | React Context para inyección del Adapter |
| **Adapter** | `frontend/src/patterns/adapter/` | `SupabaseAdapter` que llama al backend por HTTP (`fetch('/api/...')`) |

## Patrones de diseño

| Patrón | Carpeta | Uso |
|--------|---------|-----|
| **Factory** | `patterns/factory/` | Crear surtidores con tipos predefinidos (estacionario, portátil, industrial) |
| **Adapter** | `patterns/adapter/` | Interfaz `DatabaseAdapter` + `SupabaseAdapter` que llama a la API REST |
| **Observer** | `patterns/observer/` | `AlertSubject` que notifica suscriptores cuando hay nuevas alertas |

## Flujo de datos

```
Usuario → Vista (React) → Controller (hook) → SupabaseAdapter (fetch)
                                                        ↓
                                            Backend Express (REST API)
                                                        ↓
                                              Supabase Client (PostgreSQL)
```

## Pantallas

| Pantalla | Ruta | Descripción |
|----------|------|-------------|
| Login | `/login` | Autenticación mock (`operador` / `CELERON2026`) |
| Dashboard | `/` | KPIs + gráficos Chart.js + Observer de alertas |
| Surtidores | `/surtidores` | CRUD completo + Factory para crear + gauges multi-combustible |
| Ventas | `/ventas` | CRUD + aritmética binaria en vivo + gráfico por hora |
| Alertas | `/alertas` | CRUD + Observer en tiempo real + filtros por tipo |
| Reportes | `/reportes` | Decoders + toggle binario + cards por combustible/surtidor |

## API REST

| Método | Ruta | Descripción |
|--------|------|-------------|
| `GET` | `/api/health` | Verificar conexión |
| `POST` | `/api/seed` | Sembrar datos |
| `GET` | `/api/combustibles` | Listar combustibles |
| `GET` | `/api/surtidores` | Listar surtidores |
| `POST` | `/api/surtidores` | Crear surtidor |
| `PUT` | `/api/surtidores/:id` | Editar surtidor |
| `DELETE` | `/api/surtidores/:id` | Eliminar surtidor |
| `GET` | `/api/ventas` | Listar ventas |
| `POST` | `/api/ventas` | Registrar venta |
| `DELETE` | `/api/ventas/:id` | Eliminar venta |
| `GET` | `/api/alertas` | Listar alertas |
| `POST` | `/api/alertas` | Crear alerta |
| `DELETE` | `/api/alertas/:id` | Eliminar alerta |

## Tecnologías

- **Frontend:** React 19 + Vite 8 + TypeScript
- **Estilos:** Tailwind CSS 4
- **Navegación:** React Router 7
- **Backend:** Express 4 + TypeScript + tsx
- **Base de datos:** Supabase (PostgreSQL)
- **Gráficos:** Chart.js + react-chartjs-2
- **Gestor de paquetes:** pnpm
- **Concurrencia:** concurrently (backend + frontend)
