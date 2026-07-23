# Base de Datos — Supabase

Proyecto backend alojado en [Supabase](https://supabase.com/) usando PostgreSQL.

El backend Express conecta a Supabase usando `@supabase/supabase-js`. Las credenciales se encuentran en `app/backend/.env`.

---

## Tabla: `combustibles`

Catálogo de combustibles disponibles.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | `serial` (PK) | Identificador único |
| `nombre` | `text` | Nombre del combustible |
| `color` | `text` | Color hexadecimal para UI |
| `precio_litro` | `decimal(10,2)` | Precio por litro (ANH) |

---

## Tabla: `surtidores`

Almacena la información de cada surtidor de gasolina.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | `serial` (PK) | Identificador único |
| `codigo` | `text` (UNIQUE) | Código identificador (S-001, S-002, ...) |
| `ubicacion` | `text` | Ubicación física del surtidor |
| `estado` | `text` | Estado: `activo`, `mantenimiento`, `fuera de servicio` |

**Check:** `estado IN ('activo', 'mantenimiento', 'fuera de servicio')`

---

## Tabla: `surtidos`

Relación muchos-a-muchos entre surtidores y combustibles, con nivel y capacidad.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | `serial` (PK) | Identificador único |
| `surtidor_id` | `integer` (FK) | Referencia a `surtidores.id` |
| `combustible_id` | `integer` (FK) | Referencia a `combustibles.id` |
| `nivel` | `decimal(10,2)` | Nivel actual en litros |
| `capacidad` | `decimal(10,2)` | Capacidad total en litros |

**Relaciones:**
- `surtidor_id` → `surtidores(id)` ON DELETE CASCADE
- `combustible_id` → `combustibles(id)` ON DELETE RESTRICT
- Unique constraint: `(surtidor_id, combustible_id)`

---

## Tabla: `ventas`

Registra cada venta realizada en el surtidor.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | `serial` (PK) | Identificador único |
| `fecha` | `timestamp` | Fecha y hora de la venta |
| `surtidor_id` | `integer` (FK) | Referencia a `surtidores.id` |
| `combustible_id` | `integer` (FK) | Referencia a `combustibles.id` |
| `litros` | `decimal(10,2)` | Litros vendidos |
| `total` | `decimal(10,2)` | Monto total de la venta |

**Relaciones:**
- `surtidor_id` → `surtidores(id)` ON DELETE RESTRICT
- `combustible_id` → `combustibles(id)` ON DELETE RESTRICT

---

## Tabla: `alertas`

Registra alertas generadas por los surtidores.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | `serial` (PK) | Identificador único |
| `tipo` | `text` | Tipo: `critica`, `advertencia`, `info` |
| `surtidor_id` | `integer` (FK) | Referencia a `surtidores.id` |
| `mensaje` | `text` | Descripción de la alerta |
| `timestamp` | `timestamp` | Fecha y hora de la alerta |

**Check:** `tipo IN ('critica', 'advertencia', 'info')`

**Relaciones:**
- `surtidor_id` → `surtidores(id)` ON DELETE CASCADE

---

## Índices

| Índice | Tabla | Campo(s) | Propósito |
|--------|-------|----------|-----------|
| `idx_ventas_fecha` | `ventas` | `fecha` | Búsqueda rápida de ventas por fecha |
| `idx_ventas_surtidor` | `ventas` | `surtidor_id` | Filtrar ventas por surtidor |
| `idx_alertas_timestamp` | `alertas` | `timestamp` | Ordenar alertas por fecha/hora |

---

## Diagrama de relaciones

```
combustibles (1) ──── (N) surtidos (N) ──── (1) surtidores
surtidores   (1) ──── (N) ventas
combustibles (1) ──── (N) ventas
surtidores   (1) ──── (N) alertas
```

- Un combustible puede estar en muchos surtidores (a través de `surtidos`)
- Un surtidor puede tener múltiples combustibles (a través de `surtidos`)
- Cada venta pertenece a un surtidor y a un combustible
- Cada alerta pertenece a un surtidor

---

## Migraciones

Las migraciones SQL se encuentran en `app/backend/migrations/001_create_tables.sql`. El seed de datos iniciales se ejecuta automáticamente al iniciar el backend (si las tablas están vacías) a través del endpoint `POST /api/seed`.
