# Proyecto Final - Surtidor de Gasolina

![React](https://img.shields.io/badge/React-19-555555?style=flat&labelColor=61DAFB&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-555555?style=flat&labelColor=646CFF&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4-555555?style=flat&labelColor=06B6D4&logo=tailwindcss&logoColor=white)
![Express](https://img.shields.io/badge/Express-4-555555?style=flat&labelColor=000000&logo=express&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-7-555555?style=flat&labelColor=3178C6&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-22-555555?style=flat&labelColor=339933&logo=node.js&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-11-555555?style=flat&labelColor=F69220&logo=pnpm&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-2-555555?style=flat&labelColor=3FCF8E&logo=supabase&logoColor=white)
![Chart.js](https://img.shields.io/badge/Chart.js-4-555555?style=flat&labelColor=FF6384&logo=chart.js&logoColor=white)
![Railway](https://img.shields.io/badge/Railway-555555?style=flat&labelColor=0B0D0E&logo=railway&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-555555?style=flat&labelColor=2496ED&logo=docker&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-4-555555?style=flat&labelColor=3068B7&logo=zod&logoColor=white)

Sistema web para la gestión de un surtidor de gasolina. Permite registrar ventas diarias, controlar el inventario de combustibles y visualizar reportes a través de un dashboard con gráficas.

## Deploy

[![Railway](https://img.shields.io/badge/Deploy_en_Railway-0B0D0E?style=for-the-badge&logo=railway&logoColor=white)](https://nicolas-reguerin-actividad-final.up.railway.app)
[![Prototipo](https://img.shields.io/badge/Acceso_al_Prototipo-1a1a2e?style=for-the-badge&logo=rocket&logoColor=white&labelColor=1a1a2e&color=16213e)](https://dogmag04.github.io/prototipos-pf/)

Deploy en Railway con Dockerfile (Node.js 22 + pnpm v9). El backend sirve los archivos estáticos del frontend en producción. Ver configuración y errores solucionados en [`docs/deploy-railway.md`](docs/deploy-railway.md).

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
│   └── frontend/               # React + Vite + TypeScript
│       ├── public/
│       │   └── favicon.svg     # Icono minimalista bomba de gasolina
│       └── src/
│           ├── models/         # Modelos de datos (MVC)
│           ├── views/          # Pantallas principales (MVC)
│           ├── controllers/    # Custom hooks con CRUD (MVC)
│           ├── components/     # Componentes reutilizables
│           │   ├── Layout.tsx          # Layout responsive con sidebar
│           │   ├── Sidebar.tsx         # Navegación lateral
│           │   ├── Login.tsx           # Login con validación Zod
│           │   ├── ThemeToggle.tsx     # Toggle modo oscuro/claro
│           │   ├── NotificationBell.tsx
│           │   ├── Pagination.tsx      # Paginación reutilizable
│           │   ├── LoadingScreen.tsx   # Splash screen
│           │   ├── Modal.tsx
│           │   ├── ConfirmDialog.tsx
│           │   ├── Toast.tsx
│           │   └── ...
│           ├── schemas/        # Validación con Zod
│           ├── patterns/       # Patrones de diseño
│           ├── services/       # Adapter Context + ThemeContext
│           ├── utils/          # Aritmética binaria, decoders, helpers
│           ├── index.css       # Tema oscuro + modo claro
│           └── App.tsx
├── docs/
│   ├── BD.md
│   ├── estructura.md
│   └── deploy-railway.md      # Guía de deploy y errores solucionados
├── desarrollo/
│   └── avance.md
├── Dockerfile                  # Build para Railway (Node.js 22 + pnpm v9)
├── .dockerignore
├── railway.toml                # Configuración de Railway
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
| `pnpm start` | Inicia backend en producción |
| `pnpm run install:all` | Instala dependencias de backend y frontend |

### Variables de entorno

Crear un archivo `.env` en `app/backend/`:

```
SUPABASE_URL=tu_url_de_supabase
SUPABASE_ANON_KEY=tu_anon_key
PORT=3001
```

Obtener estos valores desde el panel de Supabase > **Settings > API**.

## Funcionalidades, patrones de diseño y API REST

Ver secciones detalladas en [`docs/estructura.md`](docs/estructura.md)
