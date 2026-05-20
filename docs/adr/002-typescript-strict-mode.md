# ADR-002: TypeScript Strict Mode

## Estado
Aceptado

## Contexto
Al configurar el proyecto NestJS, existía la opción de usar TypeScript en modo estricto o modo permisivo. El modo estricto impone reglas más rigurosas de tipado, prohibiendo el uso de `any` y `unknown` sin casting explícito, y requiere que todos los tipos estén correctamente definidos. El modo permisivo permite mayor flexibilidad pero puede ocultar errores de tipo que se manifiestan en runtime.

## Opciones Consideradas

### Opción 1: Usar TypeScript en modo permisivo (strict: false)
- **Ventajas**: Curva de aprendizaje menor, permite usar `any` temporalmente, desarrollo inicial más rápido
- **Desventajas**: Errores de tipo en runtime, menos seguridad, deuda técnica acumulada

### Opción 2: Usar TypeScript strict mode (strict: true)
- **Ventajas**: Seguridad de tipos garantizada en compile-time, errores detectados temprano, código más robusto
- **Desventajas**: Curva de aprendizaje inicial, requiere definición de tipos explícitos, desarrollo inicial más lento

## Decisión
Usar **TypeScript strict mode** con configuración estricta:
- Habilitar `strict: true` en tsconfig.json
- Prohibir uso de `any` y `unknown` sin casting explícito
- Definir tipos específicos para todas las entidades de dominio
- Usar tipos opcionales (string | null) para campos que pueden ser null

## Consecuencias

### Positivas
- **Corto plazo**: Errores de tipo detectados en compile-time, código más seguro desde el inicio
- **Largo plazo**: Mejor mantenibilidad, refactorizaciones más seguras, documentación autogenerada vía tipos

### Negativas
- **Corto plazo**: Tiempo adicional inicial para definir tipos, curva de aprendizaje para equipo
- **Largo plazo**: Requiere disciplina para mantener tipos actualizados

## Implementación
- Configuración de tsconfig.json con strict mode habilitado
- Definición de tipos de dominio en interfaces (Supplier, Sale, Purchase, etc.)
- Eliminación progresiva de todos los usos de `any` en el código base
- Casting explícito en repositorios TypeORM para satisfacer TypeScript
- Verificación continua con `npm run build` para asegurar compilación sin errores
