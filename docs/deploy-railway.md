# Deploy en Railway — Guía y Errores Solucionados

Guía completa del deploy del proyecto en Railway, incluyendo errores encontrados y soluciones aplicadas.

---

## Configuración del servicio en Railway

1. Conectar el repositorio de GitHub
2. En **Settings** > **Service**:
   - **Builder:** Dockerfile
   - **Docker Path:** `/` (raíz del repo)
3. **Variables de entorno** (en el tab Variables):

| Variable | Valor |
|----------|-------|
| `SUPABASE_URL` | `https://viewkcsgveuctgycvccq.supabase.co` |
| `SUPABASE_ANON_KEY` | `sb_publishable_dpdwAHZWzLLUdRVB-BUbHw_yutYZ6Pu` |
| `NODE_ENV` | `production` |

---

## Errores encontrados y soluciones

### 1. "Railpack could not determine how to build the app"

**Causa:** Railway analizaba la raíz del repo en lugar de `app/`. No encontraba `package.json`.

**Solución:** Configurar **Root Directory** a `app` en Settings (aunque no siempre funciona).

---

### 2. "Script start.sh not found"

**Causa:** Railpack no detectaba el proyecto porque no había `package.json` en la raíz.

**Solución:** Crear `railway.toml` con la configuración explícita del builder.

---

### 3. "pnpm: command not found" (con Nixpacks)

**Causa:** El entorno Nixpacks no incluye `pnpm` por defecto.

**Solución:** Crear `nixpacks.toml` con `nixPkgs = ["nodejs_20"]` y phases personalizadas.

---

### 4. "undefined variable 'corepack'" (con Nixpacks)

**Causa:** `corepack` no es un paquete Nix independiente, viene incluido con Node.js.

**Solución:** Quitar `corepack` de `nixPkgs` y solo usar `nodejs_20`.

---

### 5. Nixpacks ignora `phases.build.cmds`

**Causa:** Nixpacks auto-detecta Node.js y genera su propio comando de build, sobreescribiendo la configuración manual.

**Solución:** Abandonar Nixpacks y usar un **Dockerfile** para control total del build.

---

### 6. "pnpm@latest requires Node.js v22.13"

**Causa:** `pnpm@latest` (v11) requiere Node.js 22+, pero el Dockerfile usaba `node:20-slim`.

**Solución:** Cambiar a `node:22-slim` en el Dockerfile.

---

### 7. "ERR_PNPM_IGNORED_BUILDS: Ignored build scripts"

**Causa:** pnpm v11 requiere aprobar scripts de build explícitamente con `pnpm approve-builds`.

**Solución:** Fijar pnpm a v9 (`corepack prepare pnpm@9 --activate`), que no tiene esta restricción.

---

### 8. "The executable `cd` could not be found"

**Causa:** `railway.toml` tenía un `startCommand` que sobreescribía el `CMD` del Dockerfile. Railway intentaba ejecutar `cd` directamente.

**Solución:** Quitar `startCommand` de `railway.toml` y dejar que el `CMD` del Dockerfile maneje el inicio.

---

## Archivos de configuración finales

### `railway.toml`

```toml
[build]
builder = "dockerfile"
```

### `Dockerfile`

```dockerfile
FROM node:22-slim

RUN corepack enable && corepack prepare pnpm@9 --activate

WORKDIR /project

COPY app/ app/

RUN cd app/backend && pnpm install
RUN cd app/frontend && pnpm install
RUN cd app/frontend && pnpm build

EXPOSE 3001

CMD ["sh", "-c", "cd app/backend && pnpm start"]
```

### `.dockerignore`

```
app/backend/node_modules
app/frontend/node_modules
app/frontend/dist
app/node_modules
.git
desarrollo
docs
```
