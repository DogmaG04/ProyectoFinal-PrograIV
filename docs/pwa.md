# PWA - Progressive Web App

Documentación de la implementación de PWA en el proyecto Surtidor de Gasolina.

## Descripción

La aplicación está configurada como una **Progressive Web App (PWA)**, lo que permite:

- **Instalación** en el dispositivo del usuario (escritorio o móvil)
- **Funcionamiento offline** para la interfaz de usuario
- **Actualizaciones automáticas** en segundo plano
- **Experiencia nativa** con pantalla completa sin barra de navegador

## Tecnologías

| Tecnología | Versión | Uso |
|------------|---------|-----|
| `vite-plugin-pwa` | 1.3.0 | Generación automática de service worker y manifest |
| `workbox-window` | 7.4.1 | Runtime de caching para service workers |

## Archivos PWA

### Archivos creados

| Archivo | Tamaño | Propósito |
|---------|--------|-----------|
| `public/pwa-192x192.png` | 192x192 | Icono para Android (mínimo requerido) |
| `public/pwa-512x512.png` | 512x512 | Icono para splash screen y Android HD |
| `public/pwa-maskable-512x512.png` | 512x512 | Icono adaptativo con zona segura |

### Archivos auto-generados (en build)

| Archivo | Propósito |
|---------|-----------|
| `dist/manifest.webmanifest` | Web App Manifest |
| `dist/sw.js` | Service Worker |
| `dist/workbox-*.js` | Workbox runtime |

## Configuración

### Manifest Web App

```json
{
  "name": "Surtidor de Gasolina",
  "short_name": "Surtidor",
  "description": "Sistema web para la gestión de surtidores de gasolina",
  "theme_color": "#0f172a",
  "background_color": "#0f172a",
  "display": "standalone",
  "start_url": "/",
  "scope": "/",
  "icons": [
    { "src": "pwa-192x192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "pwa-512x512.png", "sizes": "512x512", "type": "image/png" },
    { "src": "pwa-maskable-512x512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
  ]
}
```

### Service Worker (Workbox)

| Recurso | Estrategia | Descripción |
|---------|------------|-------------|
| `/api/*` | NetworkFirst | Intenta red, fallback a cache (10s timeout) |
| Imágenes (png, jpg, svg) | CacheFirst | Sirve desde cache, actualiza en background |
| JS, CSS, HTML | Precache | Precacheado automático durante instalación |

## Funcionamiento Offline

### Lo que funciona sin conexión

- Navegación entre vistas (Dashboard, Surtidores, Ventas, Alertas, Reportes)
- Interfaz de usuario completa
- Datos cacheados de la API (si se cargaron previamente)

### Lo que NO funciona sin conexión

- Llamadas nuevas a la API (`/api/*`) si no están cacheadas
- Crear/eliminar registros (requiere conexión al backend)
- Datos en tiempo real

## Testing

### Verificar PWA en Chrome DevTools

1. **Application > Manifest** — Verificar que el manifest carga correctamente
2. **Application > Service Workers** — Verificar que el SW está "Activated and running"
3. **Application > Cache Storage** — Verificar que existen los caches (`precache-v2`, `api-cache`, `image-cache`)
4. **Lighthouse > PWA** — Ejecutar auditoría, debería pasar todos los checks

### Probar offline

1. Abrir Chrome DevTools > Network
2. Marcar "Offline"
3. Recargar la página
4. La interfaz debería cargar correctamente

### Build de prueba

```bash
# Construir para producción
pnpm build

# Previsualizar build de producción
pnpm preview
```

> **Nota:** La PWA solo funciona en builds de producción, no en `pnpm dev`.

## Instalación en dispositivos

### Android (Chrome)

1. Abrir la app en Chrome
2. Tocar el menú (3 puntos) > "Instalar aplicación" o "Añadir a pantalla de inicio"
3. Seguir las instrucciones

### iOS (Safari)

1. Abrir la app en Safari
2. Tocar el botón de compartir > "Añadir a pantalla de inicio"
3. Nombrar y confirmar

### Escritorio (Chrome/Edge)

1. Abrir la app en el navegador
2. Hacer clic en el icono de instalación en la barra de direcciones
3. Confirmar la instalación

## Actualizaciones

Con `registerType: 'autoUpdate'`, las actualizaciones se aplican silenciosamente:

1. El usuario visita la app
2. Se detecta una nueva versión
3. El service worker se actualiza en background
4. La próxima visita usa la nueva versión

## Solución de problemas

### El service worker no se registra

- Verificar que estás en modo producción (`pnpm build && pnpm preview`)
- Verificar la pestaña Application > Service Workers en DevTools

### Los iconos no aparecen

- Verificar que los archivos PNG existen en `public/`
- Verificar las rutas en `vite.config.js`

### La app no funciona offline

- Verificar que el service worker está activado
- Verificar que los caches existen en Application > Cache Storage
- La primera visita a una página debe ser online para cachearla

## Referencias

- [vite-plugin-pwa](https://vite-pwa-org.netlify.app/)
- [Workbox](https://developer.chrome.com/docs/workbox/)
- [PWA Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest)
