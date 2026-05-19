# Legacy Nexus

Retail management system - Monorepo with NestJS Backend and React Frontend.

## Structure

```
legacy-nexus-monorepo/
├── apps/
│   ├── backend/          # Backend NestJS con Clean Architecture
│   └── frontend/        # Frontend React + TypeScript + Vite + TailwindCSS
├── packages/            # Paquetes compartidos (si se necesitan)
└── package.json         # Configuración raíz del monorepo
```

## Configuración y Ejecución

### Requisitos Previos
- Node.js 20+ 
- npm

### Paso 1: Instalar Dependencias

```bash
# Instalar dependencias del monorepo
npm install

# Instalar dependencias del backend
cd apps/backend
npm install
cd ../..

# Instalar dependencias del frontend
cd apps/frontend
npm install
cd ../..
```

### Paso 2: Ejecutar Backend (NestJS)

```bash
# Desde la raíz del proyecto
cd apps/backend
npm run start:dev
```

El backend corre en: **http://localhost:3000**

### Paso 3: Ejecutar Frontend (React + Vite)

```bash
# Desde la raíz del proyecto
cd apps/frontend
npm run dev
```

El frontend corre en: **http://localhost:8080**

### Paso 4: Acceder a la Aplicación

1. Abre tu navegador en: **http://localhost:8080**
2. Usa las credenciales para login:
   - **admin / 1234**
   - **user / 1234**

### Notas Importantes

- El backend API está configurado en http://localhost:3000
- El frontend está configurado para hacer llamadas API al backend automáticamente
- Ambos servicios deben estar corriendo simultáneamente
- El frontend usa localStorage para mantener la sesión del usuario

## Credenciales

- admin / 1234
- user / 1234

## Stack Tecnológico

### Backend
- **Runtime**: Node.js 20+
- **Language**: TypeScript (strict: true)
- **Framework**: NestJS
- **ORM**: TypeORM
- **Database**: SQLite

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **Components**: shadcn/ui
- **Icons**: Lucide React
- **Routing**: React Router DOM

## Arquitectura del Backend

Clean Architecture con capas:
- `domain/` - Lógica de negocio
- `application/` - Casos de uso y DTOs
- `infrastructure/` - Implementaciones concretas
- `presentation/` - Controladores HTTP

Ver [apps/backend/README_NESTJS.md](apps/backend/README_NESTJS.md) para documentación detallada del backend.

## Características del Frontend

### Páginas Principales
- **Login**: Sistema de autenticación con roles (admin/user)
- **Catálogo**: Visualización y búsqueda de productos
- **Inventario**: Gestión de inventario por almacén
- **Carrito**: Carrito de compras y checkout
- **Historial de Ventas**: Registro de ventas realizadas
- **Compras**: Gestión de compras a proveedores
- **Reportes**: Reportes mensuales y totales
- **Notificaciones**: Sistema de notificaciones
- **Devoluciones**: Gestión de reembolsos
- **Exportes**: Exportación de datos con múltiples opciones

### Funcionalidad de Exportes (Solo Admin)
- **Pivot Tables**: Generación de tablas dinámicas con:
  - Selección de año
  - Dimensión A: customer_type, status, user_id
  - Dimensión B: category, supplier_id, warehouse_id
  - Métricas: ventas, gross, effective, after_volume
  - Resumen con total gross y número de filas

- **Totales**: Cálculo de totales por año con filtro opcional de customer_type

- **Descarga CSV**: Exportación de datos con filtro SQL personalizado (solo administradores)

### Autenticación y Autorización
- Sistema de login con credenciales
- Gestión de sesión con localStorage
- Protección de rutas basada en roles (admin/user)
- Contexto de autenticación global
