-- ============================================================
-- Migración 001: Creación de tablas principales
-- Sistema: Gestión de Surtidores de Gasolina
-- Fecha: 2026-07-23
-- ============================================================

-- -----------------------------------------------------------
-- 1. Catálogo de combustibles
-- -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS combustibles (
  id          SERIAL          PRIMARY KEY,
  nombre      TEXT            NOT NULL UNIQUE,
  color       TEXT            NOT NULL,
  precio_litro DECIMAL(10,2)  NOT NULL CHECK (precio_litro > 0)
);

-- -----------------------------------------------------------
-- 2. Surtidores
-- -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS surtidores (
  id          SERIAL  PRIMARY KEY,
  codigo      TEXT    NOT NULL UNIQUE,
  ubicacion   TEXT    NOT NULL,
  estado      TEXT    NOT NULL DEFAULT 'activo'
                      CHECK (estado IN ('activo', 'mantenimiento', 'fuera de servicio'))
);

-- -----------------------------------------------------------
-- 3. Surticos (combustible por surtidor con nivel/capacidad)
-- -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS surtidos (
  id              SERIAL          PRIMARY KEY,
  surtidor_id     INTEGER         NOT NULL REFERENCES surtidores(id) ON DELETE CASCADE,
  combustible_id  INTEGER         NOT NULL REFERENCES combustibles(id) ON DELETE RESTRICT,
  nivel           DECIMAL(10,2)   NOT NULL DEFAULT 0 CHECK (nivel >= 0),
  capacidad       DECIMAL(10,2)   NOT NULL CHECK (capacidad > 0),
  UNIQUE (surtidor_id, combustible_id)
);

-- -----------------------------------------------------------
-- 4. Ventas
-- -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS ventas (
  id              SERIAL          PRIMARY KEY,
  fecha           TIMESTAMP       NOT NULL DEFAULT NOW(),
  surtidor_id     INTEGER         NOT NULL REFERENCES surtidores(id) ON DELETE RESTRICT,
  combustible_id  INTEGER         NOT NULL REFERENCES combustibles(id) ON DELETE RESTRICT,
  litros          DECIMAL(10,2)   NOT NULL CHECK (litros > 0),
  total           DECIMAL(10,2)   NOT NULL CHECK (total > 0)
);

CREATE INDEX idx_ventas_fecha     ON ventas (fecha);
CREATE INDEX idx_ventas_surtidor  ON ventas (surtidor_id);

-- -----------------------------------------------------------
-- 5. Alertas
-- -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS alertas (
  id            SERIAL      PRIMARY KEY,
  tipo          TEXT        NOT NULL CHECK (tipo IN ('critica', 'advertencia', 'info')),
  surtidor_id   INTEGER     NOT NULL REFERENCES surtidores(id) ON DELETE CASCADE,
  mensaje       TEXT        NOT NULL,
  timestamp     TIMESTAMP   NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_alertas_timestamp ON alertas (timestamp);

-- ============================================================
-- Datos iniciales
-- ============================================================

-- Combustibles (precios ANH Bolivia 2026)
INSERT INTO combustibles (nombre, color, precio_litro) VALUES
  ('Gasolina Especial', '#34d399', 6.96),
  ('Gasolina Premium',  '#4d7cfe', 11.00),
  ('Diésel Oíl',        '#fbbf24', 9.80);

-- Surtidores
INSERT INTO surtidores (codigo, ubicacion, estado) VALUES
  ('S-001', 'Isla 1 — Lateral Este',  'activo'),
  ('S-002', 'Isla 1 — Lateral Oeste', 'activo'),
  ('S-003', 'Isla 2 — Lateral Este',  'activo'),
  ('S-004', 'Isla 2 — Lateral Oeste', 'fuera de servicio'),
  ('S-005', 'Isla 3 — Lateral Este',  'activo'),
  ('S-006', 'Isla 3 — Lateral Oeste', 'mantenimiento');

-- Surtidos (combustible por surtidor con niveles)
INSERT INTO surtidos (surtidor_id, combustible_id, nivel, capacidad) VALUES
  (1, 1,  4800,  6000),   -- S-001 → Gasolina Especial
  (1, 2,  3200,  4000),   -- S-001 → Gasolina Premium
  (2, 3,  1440, 12000),   -- S-002 → Diésel Oíl
  (2, 2,  2400,  8000),   -- S-002 → Gasolina Premium
  (3, 1,  4500,  6000),   -- S-003 → Gasolina Especial
  (4, 1,  1500, 10000),   -- S-004 → Gasolina Especial (fuera de servicio)
  (4, 2,   640,  8000),   -- S-004 → Gasolina Premium (fuera de servicio)
  (5, 3,  8000, 10000),   -- S-005 → Diésel Oíl
  (6, 1,  4000,  6000);   -- S-006 → Gasolina Especial (mantenimiento)
