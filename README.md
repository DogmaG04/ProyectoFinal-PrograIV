# Proyecto Final - Surtidor de Gasolina

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![ReactRouter](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white)

Sistema web para la gestión de un surtidor de gasolina. Permite registrar ventas diarias, controlar el inventario de combustibles y visualizar reportes a través de un dashboard con gráficas.

## Prototipo

> 🔗 [Ver prototipo en Figma](https://www.figma.com/proto/XXX) <!-- Reemplazar con el link real del prototipo -->

## Herramientas

| Herramienta | Uso |
|-------------|-----|
| **React** | Framework de frontend |
| **Vite** | Bundler y servidor de desarrollo |
| **Tailwind CSS** | Estilos CSS utility-first |
| **React Router** | Navegación entre pantallas |
| **pnpm** | Gestor de paquetes |
| **Supabase** | Backend (PostgreSQL, Auth, Realtime) |

## Estructura del proyecto

Ver documentación completa en [`docs/estructura.md`](docs/estructura.md)

```
ProyectoFinal-PrograIV/
├── app/
│   ├── backend/              # Supabase, SQL, migrations
│   └── frontend/             # React + Vite (src/ con patrón MVC)
├── docs/
│   ├── BD.md
│   └── estructura.md
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
cd ProyectoFinal-PrograIV

# Instalar dependencias del frontend
cd app/frontend
pnpm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales de Supabase

# Iniciar servidor de desarrollo
pnpm dev
```

### Variables de entorno

Crear un archivo `.env` en `app/frontend/`:

```
VITE_SUPABASE_URL=tu_url_de_supabase
VITE_SUPABASE_ANON_KEY=tu_anon_key
```

Obtener estos valores desde el panel de Supabase > **Settings > API**.
