# ADR-001: Adopción de Clean Architecture

## Estado
Aceptado

## Contexto
El sistema legacy Flask tenía lógica mezclada en controllers, sin separación clara entre dominio, aplicación e infraestructura. El código era difícil de mantener, probar y escalar debido al acoplamiento entre capas. No existía separación de responsabilidades y la lógica de negocio estaba distribuida de forma inconsistente.

## Opciones Consideradas

### Opción 1: Mantener arquitectura tradicional MVC (Model-View-Controller)
- **Ventajas**: Curva de aprendizaje menor, estructura familiar para desarrolladores Flask
- **Desventajas**: Acoplamiento fuerte entre capas, difícil de testear, lógica de negocio en controllers

### Opción 2: Adoptar Clean Architecture con capas separadas
- **Ventajas**: Separación clara de responsabilidades, fácil de testear, independiente de frameworks, escalable
- **Desventajas**: Curva de aprendizaje inicial, más boilerplate, requiere disciplina

## Decisión
Adoptar **Clean Architecture** con las siguientes capas:
- **Domain**: Entidades de dominio e interfaces de repositorios
- **Application**: Use cases y DTOs
- **Infrastructure**: Implementaciones concretas (TypeORM, SQLite)
- **Presentation**: Controllers HTTP

## Consecuencias

### Positivas
- **Corto plazo**: Código más organizado y mantenible
- **Largo plazo**: Fácil migración de tecnologías (ej: cambiar TypeORM por Prisma), testabilidad mejorada, escalabilidad

### Negativas
- **Corto plazo**: Mayor tiempo de desarrollo inicial, curva de aprendizaje
- **Largo plazo**: Requiere disciplina para mantener separación de capas

## Implementación
- Configuración de NestJS con provider tokens para inyección de dependencias
- TypeScript strict mode para seguridad de tipos
- Separación física de carpetas por capa (domain/, application/, infrastructure/, presentation/)
