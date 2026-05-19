# Legacy Nexus

Retail management system - Monorepo with NestJS Backend and Static Frontend.

## Sructuree

```
legacy-nexus-monorepo/
├── apps/
│   ├── backend/          # Backend NestJS con Clean Architecture
│   └── frontend/        # Frontend HTML/CSS/JS estático
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

### Paso 3: Ejecutar Frontend (Archivos Estáticos)

```bash
# Desde la raíz del proyecto
npm run frontend:serve
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
- **Static**: HTML5, CSS3, JavaScript (ES6+)

## Arquitectura del Backend

Clean Architecture con capas:
- `domain/` - Lógica de negocio
- `application/` - Casos de uso y DTOs
- `infrastructure/` - Implementaciones concretas
- `presentation/` - Controladores HTTP

Ver [apps/backend/README_NESTJS.md](apps/backend/README_NESTJS.md) para documentación detallada del backend.
