# Estructura del Proyecto

## Arquitectura general

```
ProyectoFinal-PrograIV/
├── app/
│   ├── backend/              # Supabase, migraciones SQL, configuración
│   └── frontend/             # React + Vite
│       └── src/
│           ├── models/           # Modelos de datos (MVC - Model)
│           ├── views/            # Pantallas principales (MVC - View)
│           ├── controllers/      # Lógica de negocio, custom hooks (MVC - Controller)
│           ├── components/       # Componentes reutilizables (Navbar, Cards, etc.)
│           ├── patterns/         # Patrones de diseño
│           │   ├── factory/      # Factory para Surtidores
│           │   ├── adapter/      # Adapter para conexión a BD
│           │   └── observer/     # Observer para Alertas
│           ├── services/         # Conexión con Supabase, datos mock
│           ├── utils/            # Funciones auxiliares
│           ├── App.jsx           # Rutas y layout principal
│           ├── main.jsx          # Punto de entrada
│           └── index.css         # Estilos globales (Tailwind)
├── docs/
│   ├── BD.md                 # Documentación de tablas Supabase
│   └── estructura.md         # Este archivo
├── README.md
└── .gitignore
```

## Patrón MVC en React

| Capa | Carpeta | Responsabilidad |
|------|---------|-----------------|
| **Model** | `models/` | Estructuras de datos: `Surtidor.js`, `Venta.js`, `Alerta.js` |
| **View** | `views/` | Pantallas: `Dashboard.jsx`, `Surtidores.jsx`, `Ventas.jsx`, `Alertas.jsx`, `Reportes.jsx` |
| **Controller** | `controllers/` | Lógica y estado: custom hooks para CRUD |

## Patrones de diseño

| Patrón | Carpeta | Uso |
|--------|---------|-----|
| **Factory** | `patterns/factory/` | Crear surtidores con diferentes tipos de combustible |
| **Adapter** | `patterns/adapter/` | Adaptar conexión a Supabase (intercambiable con otra BD) |
| **Observer** | `patterns/observer/` | Notificar cambios en alertas en tiempo real |

## Pantallas

| Pantalla | Ruta | Descripción |
|----------|------|-------------|
| Dashboard | `/` | Resumen general de surtidores y ventas |
| Surtidores | `/surtidores` | Gestión y estado de cada surtidor |
| Ventas | `/ventas` | Registro de ventas realizadas |
| Alertas | `/alertas` | Panel de alertas activas y resueltas |
| Reportes | `/reportes` | Resumen de ventas por combustible y surtidor |

## Tecnologías

- **Frontend:** React 19 + Vite 8
- **Estilos:** Tailwind CSS 4
- **Navegación:** React Router 7
- **Gestor de paquetes:** pnpm
- **Backend:** Supabase (PostgreSQL + Auth + Realtime)
