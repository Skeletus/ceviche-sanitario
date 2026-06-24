# Pregunta 4 — Implementación y despliegue en nube

## 1. Descripción del MVP implementado

El MVP corresponde a un sistema web para la supervisión sanitaria de vendedores ambulantes de ceviche de pota. La versión base prepara la arquitectura inicial con Next.js, TypeScript, Tailwind CSS, Supabase y GitHub Actions. En las siguientes iteraciones se implementarán los flujos de registro de vendedores, registro de puestos, consulta pública, reportes sanitarios, inspecciones y panel administrativo.

[Insertar captura de la pantalla inicial del MVP]

## 2. Base de datos

### 2.1 Modelo entidad-relación

El modelo entidad-relación considera perfiles de usuario, vendedores, puestos, licencias, reportes sanitarios, inspecciones, evidencias, historial de estados y notificaciones internas. Estas entidades cubren las necesidades del MVP sin agregar complejidad innecesaria.

[Insertar diagrama entidad-relación]

### 2.2 Esquema normalizado

El esquema se encuentra en `supabase/schema.sql`. Las tablas separan responsabilidades y usan claves primarias, claves foráneas, restricciones `CHECK` y campos de auditoría como `created_at` y `updated_at`.

[Insertar captura del esquema en Supabase]

### 2.3 Implementación en Supabase PostgreSQL

La base de datos será implementada en Supabase PostgreSQL. Supabase también proporcionará autenticación y almacenamiento para evidencias de reportes o inspecciones.

[Insertar captura de tablas creadas en Supabase]

### 2.4 Datos de prueba

Los datos de prueba se encuentran en `supabase/seed.sql`. Incluyen perfiles ficticios, un vendedor, dos puestos, una licencia, un reporte sanitario, una inspección, un historial de estado y una notificación interna.

[Insertar captura de datos de prueba]

### 2.5 Justificación de base de datos relacional frente a NoSQL

Se eligió una base de datos relacional porque el dominio requiere integridad entre vendedores, puestos, licencias, inspecciones y reportes. PostgreSQL permite modelar relaciones, aplicar restricciones y mantener trazabilidad sanitaria de manera más adecuada que una estructura NoSQL para este MVP académico.

## 3. MVP funcional

### 3.1 Funcionalidades núcleo implementadas

En la fase base se deja preparada la estructura para implementar las funcionalidades núcleo: consulta de puestos autorizados, registro de vendedores, registro de puestos, reportes sanitarios, inspecciones municipales y panel administrativo.

La rama `feature/vendor-registration` implementa la HU06 del Sprint 1: registro de datos de vendedor vinculado al perfil autenticado. El flujo protege las rutas por sesión y rol `vendor`, valida documento, teléfono y dirección antes de guardar, persiste los datos en `vendors` mediante `profile_id` y evita duplicados mostrando el registro existente cuando ya fue creado.

La rama `feature/stall-registration` implementa la HU07 del Sprint 1: registro de puestos ambulantes vinculados a vendedores existentes. El flujo exige sesión activa, rol `vendor` y datos de vendedor registrados, valida nombre, referencia de ubicación y distrito, persiste el puesto en `stalls` con `vendor_id`, estado inicial `pending` y visibilidad no pública hasta evaluación municipal.

[Completar con funcionalidades implementadas]

### 3.2 Evidencia de pantallas

[Insertar captura de pantalla inicial]

[Insertar captura de consulta de puestos]

[Insertar captura de registro de vendedor]

[Insertar captura de reportes sanitarios]

[Insertar captura de inspecciones]

## 4. Estrategia de branching

### 4.1 Flujo de ramas

El repositorio usará las ramas `main`, `develop` y `feature/*`. La rama `main` contendrá versiones estables, `develop` integrará avances validados y cada funcionalidad se desarrollará en ramas `feature/*`.

### 4.2 Commits descriptivos

Los commits seguirán mensajes claros, por ejemplo: `chore: initialize proyecto3-pc2 base structure`, `feat: add vendor registration form` o `fix: validate sanitary report status`.

### 4.3 Pull Requests revisados

Cada rama `feature/*` deberá integrarse mediante Pull Request hacia `develop`, con revisión de cambios, validación del pipeline y evidencia de aprobación.

### 4.4 Evidencias del repositorio

[Insertar captura de ramas]

[Insertar captura de commits]

[Insertar captura de Pull Requests]

## 5. Despliegue en la nube

### 5.1 Plataforma de despliegue

El despliegue se realizará en Vercel, usando Vercel Hosting para la aplicación Next.js y Vercel Serverless Functions para la lógica server-side. Supabase se usará como servicio gestionado de autenticación, base de datos y almacenamiento.

### 5.2 URL pública

[Insertar URL pública de Vercel]

### 5.3 Evidencia de despliegue

[Insertar captura del dashboard de Vercel]

[Insertar captura de la aplicación desplegada]

## 6. Pipeline CI/CD

### 6.1 Descripción del pipeline

El pipeline se define en `.github/workflows/ci-cd.yml`. Se ejecuta en eventos `push` y `pull_request`, instala dependencias, ejecuta lint y compila la aplicación.

### 6.2 Build, pruebas y despliegue

En esta fase el pipeline valida lint y build. El despliegue real a Vercel se gestionará posteriormente mediante la integración GitHub + Vercel y sus secretos de proyecto.

### 6.3 Evidencia de ejecuciones exitosas

[Insertar captura de GitHub Actions]

[Insertar captura del build exitoso]

## 7. Conclusión

La estructura inicial deja preparado el proyecto para continuar con la implementación del MVP. El stack elegido es coherente con la planificación DevOps, los diagramas de arquitectura y el enfoque Scrum documentado en las preguntas anteriores.
