# ADR-003: Migración a React + TypeScript + Vite + TailwindCSS

## Estado
Aceptado

## Contexto
El frontend original era estático (HTML/CSS/JS) con manipulación directa del DOM, jQuery para interactividad, y lógica mezclada en archivos JavaScript. El código era difícil de mantener, no tenía seguridad de tipos, y no seguía prácticas modernas de desarrollo frontend. La actualización del UI requería manipulación manual del DOM y no existía reactividad.

## Opciones Consideradas

### Opción 1: Mantener frontend estático (HTML/CSS/JS)
- **Ventajas**: Sin curva de aprendizaje, código existente funciona
- **Desventajas**: Difícil de mantener, sin seguridad de tipos, manipulación manual del DOM, no escalable

### Opción 2: Migrar a React + TypeScript + Vite + TailwindCSS
- **Ventajas**: Seguridad de tipos, componentes reutilizables, hot reload, build tool moderno, estilos utility-first
- **Desventajas**: Curva de aprendizaje, refactorización completa del código existente

## Decisión
Migrar a **React + TypeScript + Vite + TailwindCSS** con:
- React 18 con hooks funcionales (useState, useEffect)
- TypeScript para seguridad de tipos
- Vite como build tool (hot reload, builds rápidos)
- TailwindCSS para estilos utility-first
- React Router para navegación
- Context API para gestión de estado global (autenticación)

## Consecuencias

### Positivas
- **Corto plazo**: Seguridad de tipos, hot reload, desarrollo más rápido
- **Largo plazo**: Código mantenible, componentes reutilizables, ecosistema React extenso, mejor DX

### Negativas
- **Corto plazo**: Tiempo de migración significativo, curva de aprendizaje
- **Largo plazo**: Bundle size mayor que HTML estático, requiere build step

## Implementación
- Creación de apps/frontend/ con proyecto Vite + React + TypeScript
- Configuración de TailwindCSS para estilos
- Migración de páginas HTML a componentes React (Login, Catalog, Inventory, etc.)
- Creación de API service centralizado (api.ts) con métodos tipados
- Implementación de AuthContext para gestión de sesión
- Uso de React Router para navegación entre páginas
