# Base de Datos - Supabase

Proyecto backend alojado en [Supabase](https://supabase.com/) usando PostgreSQL.

---

## Tabla: `surtidores`

Almacena la información de cada surtidor de gasolina.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | `uuid` (PK) | Identificador único |
| `numero` | `integer` | Número identificador del surtidor |
| `combustible` | `text` | Tipo de combustible (Regular, Premium, Diesel) |
| `capacidad` | `decimal(10,2)` | Capacidad total en litros |
| `nivel` | `decimal(10,2)` | Nivel actual en litros |

---

## Tabla: `ventas`

Registra cada venta realizada en el surtidor.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | `uuid` (PK) | Identificador único |
| `fecha` | `timestamp` | Fecha y hora de la venta |
| `combustible` | `text` | Tipo de combustible vendido |
| `litros` | `decimal(10,2)` | Litros vendidos |
| `precio` | `decimal(10,2)` | Precio por litro |
| `total` | `decimal(10,2)` | Monto total de la venta |
| `surtidor_id` | `uuid` (FK) | Referencia a `surtidores.id` |

**Relaciones:**
- Cada venta pertenece a un `surtidor`

---

## Tabla: `alertas`

Registra alertas generadas por los surtidores.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | `uuid` (PK) | Identificador único |
| `surtidor_id` | `uuid` (FK) | Referencia a `surtidores.id` |
| `tipo` | `text` | Tipo de alerta (nivel bajo, mantenimiento, etc.) |
| `fecha` | `timestamp` | Fecha de la alerta |
| `estado` | `text` | Estado (activa, resuelta, etc.) |

**Relaciones:**
- Cada alerta pertenece a un `surtidor`

---

## Diagrama de relaciones

```
surtidores (1) ──────── (N) ventas
surtidores (1) ──────── (N) alertas
```

Un surtidor puede tener muchas ventas y muchas alertas. Cada venta y alerta pertenece a un solo surtidor.
