# Biblioteca App

Aplicación de gestión de biblioteca construida con **TypeScript** siguiendo los principios de **Arquitectura Limpia** y desarrollada bajo la metodología **TDD (Test-Driven Development)**. El proyecto separa la lógica de negocio (dominio) de la infraestructura y del framework, permitiendo testear las reglas del negocio sin depender de una base de datos o un servidor HTTP.

## Contexto

Este proyecto es un trabajo práctico que consiste en elegir un dominio de negocio e implementarlo como monorepo de Node.js + TypeScript. El dominio elegido fue un **sistema de gestión de biblioteca**, con el objetivo de construir primero el dominio (entidades, casos de uso, repositorios) y luego una API backend que exponga su funcionalidad.

## Estructura del proyecto

```
biblioteca-app/
├── domain/                 # Lógica de negocio pura (sin dependencias externas)
│   └── src/
│       ├── entities/       # Entidades del dominio (Book, User, Loan)
│       ├── repositories/   # Interfaces (puertos) de persistencia
│       └── use-cases/      # Casos de uso de la aplicación
└── apps/
    └── backend/            # API HTTP (en desarrollo)
```

Se utiliza **npm workspaces** para manejar el monorepo.

## Funcionalidades planeadas

- **Autenticación y autorización**
  - [ ] Registro de usuarios
  - [ ] Login
  - [ ] Roles (`admin` / `user`) y permisos por rol
- **Gestión de libros**
  - [ ] Alta, baja y modificación de libros (rol `admin`)
  - [ ] Listado y búsqueda de libros
  - [ ] Control de disponibilidad
- **Préstamos (funcionalidad específica del dominio)**
  - [ ] Solicitar préstamo de un libro disponible
  - [ ] Devolución de un libro
  - [ ] Listado de préstamos activos por usuario
  - [ ] Límite de préstamos simultáneos por usuario

## Stack

- **TypeScript** como lenguaje principal
- **Vitest** para testing unitario
- **npm workspaces** para organizar el monorepo
- **ts-node-dev** para desarrollo del backend

## Estado actual del proyecto

### Dominio (`domain/`)

**Entidades implementadas:**

- ✅ `Book` — con validaciones de id, título, autor e ISBN. Disponibilidad por defecto.
- ✅ `User` — con validaciones de id, nombre, email (formato) y contraseña. Roles: `admin` / `user`.
- ✅ `Loan` — con validaciones de id, userId y bookId. Calcula automáticamente la fecha de devolución (14 días desde el préstamo).

**Interfaces de repositorios (puertos):**

- ✅ `UserRepository` — `findByEmail`, `save`
- ✅ `BookRepository` — `findById`, `findActiveByUserId`, `save`
- ✅ `LoanRepository` — `findById`, `save`

**Casos de uso:**

- ✅ `registerUser` — registra un usuario validando que el email no exista.
- 🚧 `borrowBook` — en desarrollo.

### Backend (`apps/backend/`)

- ⏳ Pendiente de implementación. Por el momento solo está configurado el scaffolding del paquete.

## Cómo ejecutarlo

**Instalar dependencias:**

```bash
npm install
```

**Correr los tests de todo el monorepo:**

```bash
npm run test
```

**Correr solo los tests del dominio:**

```bash
npm run test:domain
```

**Compilar todos los paquetes:**

```bash
npm run build
```

**Correr el backend en modo desarrollo (cuando esté listo):**

```bash
npm run dev -w @biblioteca/backend
```

## Decisiones de diseño

- **Separación dominio / infraestructura**: el paquete `domain` no depende de ningún framework ni de detalles de persistencia. Define interfaces (puertos) que serán implementadas por adaptadores concretos en la capa de infraestructura.
- **Entidades como funciones fábrica**: en lugar de clases, se usan funciones (`createUser`, `createBook`, `createLoan`) que validan y devuelven el objeto del dominio. Más simples de testear y de componer.
- **Inyección de dependencias en casos de uso**: los casos de uso reciben los repositorios como parámetro, facilitando tests con implementaciones en memoria.
- **Tests unitarios por entidad y caso de uso**: cada archivo tiene su contraparte `.test.ts` con Vitest.
- **TDD**: cada funcionalidad se desarrolla escribiendo primero el test que describe el comportamiento esperado, y luego la implementación mínima para hacerlo pasar.

## Próximos pasos

- [ ] Completar el caso de uso `borrowBook`
- [ ] Agregar casos de uso de `returnBook`, `listBooks`, `login`
- [ ] Implementar adaptadores de repositorio (ej. en memoria, luego base de datos)
- [ ] Exponer API REST desde `apps/backend`
- [ ] Autenticación y autorización por rol
