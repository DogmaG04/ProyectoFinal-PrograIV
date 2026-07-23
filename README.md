# Proyecto Final - Surtidor de Gasolina

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white)

Sistema web para la gestión de un surtidor de gasolina. Permite registrar ventas diarias, controlar el inventario de combustibles y visualizar reportes a través de un dashboard con gráficas.

## Deploy

[![Prototipo](https://img.shields.io/badge/Acceso_al_Prototipo-1a1a2e?style=for-the-badge&logo=rocket&logoColor=white&labelColor=1a1a2e&color=16213e)](https://dogmag04.github.io/prototipos-pf/)

## Estructura del proyecto

Ver documentación completa en [`docs/estructura.md`](docs/estructura.md)

```
ProyectoFinal-PrograIV/
├── app/
│   ├── package.json            # Concurrently: ejecuta backend + frontend
│   ├── backend/                # Express API REST (Node.js)
│   │   ├── controllers/        # Lógica CRUD con Supabase
│   │   ├── models/             # Interfaces TypeScript
│   │   ├── services/           # Cliente Supabase
│   │   ├── migrations/         # SQL de tablas
│   │   ├── index.ts            # Servidor Express con rutas REST
│   │   ├── package.json
│   │   └── .env
│   └── frontend/               # React + Vite
│       └── src/
│           ├── models/         # Modelos de datos (MVC)
│           ├── views/          # Pantallas principales (MVC)
│           ├── controllers/    # Custom hooks con CRUD (MVC)
│           ├── components/     # Componentes reutilizables
│           ├── patterns/       # Patrones de diseño
│           ├── services/       # Adapter Context
│           ├── utils/          # Aritmética binaria, decoders, helpers
│           └── App.tsx
├── docs/
│   ├── BD.md
│   └── estructura.md
├── desarrollo/
│   └── avance.md
├── README.md
└── .gitignore
```

## Base de datos

Ver documentación de tablas en [`docs/BD.md`](docs/BD.md)

## Instalación

### Requisitos

- [Node.js](https://nodejs.org/) >= 18
- [pnpm](https://pnpm.io/) (instalar con `corepack enable && pnpm -v`)

### Pasos

```bash
# Clonar el repositorio
git clone https://github.com/TU_USUARIO/ProyectoFinal-PrograIV.git
cd ProyectoFinal-PrograIV/app

# Instalar dependencias de backend, frontend y concurrently
pnpm run install:all
pnpm install

# Configurar variables de entorno del backend
cp backend/.env.example backend/.env
# Editar backend/.env con tus credenciales de Supabase

# Iniciar backend + frontend juntos
pnpm dev
```

### Comandos disponibles

| Comando | Descripción |
|---------|-------------|
| `pnpm dev` | Arranca backend (puerto 3001) + frontend (puerto 5173) |
| `pnpm build` | Build de producción del frontend |
| `pnpm run install:all` | Instala dependencias de backend y frontend |

### Variables de entorno

Crear un archivo `.env` en `app/backend/`:

```
SUPABASE_URL=tu_url_de_supabase
SUPABASE_ANON_KEY=tu_anon_key
PORT=3001
```

Obtener estos valores desde el panel de Supabase > **Settings > API**.

## API REST

El backend expone una API REST en `http://localhost:3001`:

| Método | Ruta | Descripción |
|--------|------|-------------|
| `GET` | `/api/health` | Verificar conexión a Supabase |
| `POST` | `/api/seed` | Sembrar datos iniciales |
| `GET` | `/api/combustibles` | Listar combustibles |
| `GET` | `/api/surtidores` | Listar surtidores con surtidos |
| `POST` | `/api/surtidores` | Crear surtidor (Factory) |
| `PUT` | `/api/surtidores/:id` | Editar estado/ubicación |
| `DELETE` | `/api/surtidores/:id` | Eliminar surtidor |
| `GET` | `/api/ventas` | Listar ventas |
| `POST` | `/api/ventas` | Registrar venta |
| `DELETE` | `/api/ventas/:id` | Eliminar venta |
| `GET` | `/api/alertas` | Listar alertas |
| `POST` | `/api/alertas` | Crear alerta (Observer) |
| `DELETE` | `/api/alertas/:id` | Eliminar alerta |
