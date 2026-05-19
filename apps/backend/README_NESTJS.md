# Legacy Nexus - NestJS Backend

Migración del backend Flask a NestJS + TypeScript con Clean Architecture y principios SOLID.

## Stack Tecnológico

- **Runtime**: Node.js 20+
- **Lenguaje**: TypeScript (strict: true)
- **Framework**: NestJS
- **ORM**: TypeORM
- **Base de datos**: SQLite
- **Validación**: class-validator, class-transformer

## Arquitectura

El proyecto sigue Clean Architecture con las siguientes capas:

```
src/
├── domain/                 # Lógica de negocio pura
│   ├── entities/          # Entidades del dominio
│   ├── interfaces/        # Interfaces de repositorios y servicios
│   ├── services/          # Servicios de dominio (FinanceService)
│   └── hooks/             # Hooks de pricing (IvaHook)
├── application/           # Casos de uso y DTOs
│   ├── use-cases/         # Use cases (LoginUseCase, CreateSaleUseCase, etc.)
│   ├── dto/               # Data Transfer Objects
│   └── config/            # Configuración de aplicación
├── infrastructure/        # Implementaciones concretas
│   ├── database/          # TypeORM entities y DatabaseModule
│   ├── repositories/      # Implementaciones de repositorios
│   ├── services/          # Servicios externos (EmailService)
│   └── cache/             # Cache en memoria
└── presentation/          # Capa de presentación
    ├── controllers/       # Controladores HTTP
    ├── modules/           # Módulos NestJS
    └── app.module.ts      # Módulo raíz
```

## Principios SOLID Aplicados

- **SRP**: Cada clase tiene una única responsabilidad
- **OCP**: Extensible sin modificar código existente (uso de interfaces)
- **LSP**: Las implementaciones son sustituibles por sus abstracciones
- **ISP**: Interfaces pequeñas y específicas
- **DIP**: Las capas superiores dependen de abstracciones, no de implementaciones concretas

## Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run start:dev

# Ejecutar en producción
npm run build
npm run start:prod

# Ejecutar tests
npm test
```

## Configuración

Las variables de entorno se configuran a través de ConfigModule. La base de datos SQLite se encuentra en `data/legacy.db`.

## Endpoints HTTP (Compatibles con el backend Flask)

### Auth
- `POST /api/login` - Login de usuario

### Health
- `GET /api/health` - Health check

### Sales
- `POST /api/sales` - Crear venta
- `POST /api/sales/:sid/return` - Devolver venta
- `GET /api/sales/by-user/:uid` - Ventas por usuario

### Purchases
- `POST /api/purchases` - Crear compra
- `POST /api/purchases/:pid/reconcile` - Reconciliar compra
- `GET /api/purchases` - Listar compras

### Refunds
- `POST /api/refunds` - Crear reembolso
- `POST /api/refunds/:rid/approve` - Aprobar reembolso

### Reports
- `GET /api/reports/monthly?year=2024&month=5` - Reporte mensual
- `GET /api/reports/totals` - Totales de ventas y compras

### Exports
- `GET /api/exports/csv?start=2024-01-01&end=2024-12-31` - Exportar CSV

### Notifications
- `POST /api/notifications` - Enviar notificación

## Módulos Migrados

✅ Configuración (app.config.ts)
✅ Autenticación (auth)
✅ Finanzas (finance) con sistema de hooks
✅ Inventario (inventory)
✅ Ventas (sales)
✅ Compras (purchases)
✅ Reembolsos (refunds)
✅ Reportes (reports)
✅ Exportaciones (exports)
✅ Notificaciones (notifications)
✅ Email service (stub)
✅ Cache en memoria

## Sistema de Hooks de Pricing

El módulo de finanzas implementa un sistema de hooks extensible:

```typescript
// Registrar un nuevo hook
financeService.registerPricingHook(new CustomHook());

// El hook se ejecuta automáticamente al calcular IVA
const iva = financeService.calcIva(amount);
```

## Inyección de Dependencias

NestJS maneja la inyección de dependencias automáticamente. Los repositorios se inyectan a través de tokens personalizados:

```typescript
{
  provide: 'IUserRepository',
  useClass: UserTypeOrmRepository,
}
```

## Tests

Los tests unitarios para los use cases se encuentran en `src/application/use-cases/**/*.spec.ts`.

## Notas Importantes

- No se usa `any` en TypeScript (strict mode activado)
- La lógica de negocio no se mezcla en controllers
- Se mantienen los mismos endpoints y contratos HTTP que el backend original
- El sistema de caché en memoria reemplaza a los diccionarios globales de Python
- Todos los módulos principales han sido migrados siguiendo Clean Architecture
