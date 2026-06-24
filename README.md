# Ceviche Sanitario

Sistema web para la supervision sanitaria de vendedores ambulantes de ceviche de pota.

Aplicacion desplegada: https://ceviche-sanitario.vercel.app/

Repositorio: https://github.com/Skeletus/ceviche-sanitario

## Descripcion general

**Ceviche Sanitario** es un MVP web orientado a apoyar el registro, control y consulta sanitaria de puestos ambulantes de ceviche de pota. El sistema permite trabajar con usuarios autenticados por rol, registrar vendedores, registrar puestos, gestionar licencias municipales y consultar publicamente puestos autorizados.

El proyecto fue desarrollado con Next.js, React, TypeScript, Tailwind CSS y Supabase, y se encuentra desplegado en Vercel con validacion de CI/CD mediante GitHub Actions.

## Problema que resuelve

La venta ambulatoria de ceviche de pota puede presentar riesgos sanitarios cuando no existe trazabilidad sobre vendedores, ubicacion de puestos, licencia municipal o estado sanitario. Este MVP propone una base digital para que vendedores registren informacion operativa y ciudadanos consulten puestos autorizados antes de comprar.

## Funcionalidades principales del MVP

| Modulo | Descripcion | Estado |
| --- | --- | --- |
| Autenticacion | Login con Supabase Auth y cierre de sesion. | Implementado |
| Roles | Acceso diferenciado para ciudadano, vendedor, inspector y administrador. | Implementado |
| Vendedores | Registro de datos de vendedor. | Implementado |
| Puestos | Registro y consulta de puestos ambulantes. | Implementado |
| Licencias | Registro y actualizacion de licencia municipal. | Implementado |
| Consulta publica | Listado de puestos autorizados, filtros y detalle sanitario. | Implementado |
| Base de datos | Modelo relacional en Supabase PostgreSQL. | Implementado |
| Despliegue | Aplicacion desplegada en Vercel. | Implementado |
| CI/CD | Validacion mediante GitHub Actions. | Implementado |
| Reportes sanitarios | Modelo y documentacion preparados para Sprint 2. | Preparado para extension |
| Inspecciones | Modelo y menu por rol preparados para Sprint 2. | Preparado para extension |
| Panel administrativo | Acceso protegido y verificacion de permisos para administrador. | Parcial |

## Stack tecnologico

- Next.js con App Router
- React
- TypeScript
- Tailwind CSS
- Supabase Auth
- Supabase PostgreSQL
- Supabase Storage
- Vercel
- GitHub Actions

## Arquitectura general resumida

La aplicacion usa una arquitectura web basada en Next.js:

- **Frontend:** paginas y componentes React con App Router.
- **Autenticacion:** Supabase Auth para login y sesion.
- **Autorizacion:** perfiles internos en `profiles` con roles `citizen`, `vendor`, `inspector` y `admin`.
- **Base de datos:** Supabase PostgreSQL con tablas relacionales para perfiles, vendedores, puestos, licencias, reportes, inspecciones y trazabilidad.
- **Seguridad de datos:** politicas RLS en Supabase para restringir acceso a datos privados y permitir consulta publica solo de puestos autorizados.
- **Despliegue:** Vercel para hosting de la aplicacion Next.js.
- **CI/CD:** GitHub Actions para ejecutar lint y build en Pull Requests.

## URL del despliegue

La version desplegada se encuentra en:

```txt
https://ceviche-sanitario.vercel.app/
```

## Rutas principales

| Ruta | Proposito | Acceso |
| --- | --- | --- |
| `/` | Portada del MVP y accesos principales. | Publico |
| `/stalls` | Consulta publica de puestos autorizados. | Publico |
| `/stalls/[id]` | Detalle sanitario publico de un puesto. | Publico |
| `/login` | Inicio de sesion con Supabase Auth. | Publico |
| `/dashboard` | Dashboard privado segun rol autenticado. | Autenticado |
| `/dashboard/vendor` | Resumen operativo del vendedor. | Vendedor |
| `/vendor/register` | Registro de datos del vendedor. | Vendedor |
| `/vendor/stalls/new` | Registro de puesto ambulante. | Vendedor |
| `/dashboard/vendor/stalls` | Consulta de puestos propios. | Vendedor |
| `/vendor/licenses` | Registro y actualizacion de licencias. | Vendedor |
| `/dashboard/vendor/licenses` | Consulta de licencias propias. | Vendedor |
| `/dashboard/admin` | Verificacion de acceso administrativo. | Administrador |

## Credenciales de prueba

Todos los usuarios de prueba usan la misma contrasena:

```txt
Test123456!
```

| Rol | Correo | Contrasena |
| --- | --- | --- |
| Ciudadano | [ana.ciudadana@example.com](mailto:ana.ciudadana@example.com) | Test123456! |
| Vendedor | [carlos.vendedor@example.com](mailto:carlos.vendedor@example.com) | Test123456! |
| Inspector | [rosa.inspectora@example.com](mailto:rosa.inspectora@example.com) | Test123456! |
| Administrador | [mario.admin@example.com](mailto:mario.admin@example.com) | Test123456! |

Con estas cuentas se puede probar:

- **Ciudadano:** consulta de puestos autorizados y vista publica.
- **Vendedor:** dashboard de vendedor, registro de datos, puestos y licencias.
- **Inspector:** acceso autenticado con rol inspector y opciones preparadas para inspeccion sanitaria.
- **Administrador:** acceso al panel administrativo protegido y verificacion de permisos.

## Instalacion local

```bash
git clone https://github.com/Skeletus/ceviche-sanitario.git
cd ceviche-sanitario
npm install
npm run dev
```

La aplicacion corre localmente en:

```txt
http://localhost:3000
```

## Estructura de carpetas

```txt
proyecto3-pc2/
|-- src/
|   |-- app/              # Rutas App Router, dashboards y API interna
|   |-- components/       # Formularios, navegacion y vistas reutilizables
|   |-- lib/              # Clientes, consultas y reglas de dominio
|   `-- types/            # Tipos TypeScript del dominio
|-- docs/                 # Evidencias, Scrum, Trello y documentacion del curso
|-- supabase/             # Schema SQL y seed de datos
|-- .github/workflows/    # Pipeline CI/CD
|-- .env.example
|-- README.md
`-- package.json
```

## Variables de entorno

Crear un archivo `.env.local` en la raiz del proyecto y configurar las variables del proyecto Supabase:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Las credenciales reales no deben subirse al repositorio. `SUPABASE_SERVICE_ROLE_KEY` solo debe usarse en tareas administrativas del servidor; no debe exponerse en el frontend ni compartirse publicamente.

## Base de datos

Los archivos SQL se encuentran en `supabase/`:

| Archivo | Contenido |
| --- | --- |
| `supabase/schema.sql` | Tablas, relaciones, indices, triggers y politicas RLS. |
| `supabase/seed.sql` | Datos de prueba para perfiles, vendedores, puestos, licencias, reportes e inspecciones. |

El modelo principal incluye `profiles`, `vendors`, `stalls`, `licenses`, `sanitary_reports`, `inspections`, evidencias, historial de estado y notificaciones.

## Comandos disponibles

```bash
npm run dev
npm run lint
npm run build
npm run start
```

| Comando | Uso |
| --- | --- |
| `npm run dev` | Inicia el servidor de desarrollo local. |
| `npm run lint` | Ejecuta ESLint para validar calidad del codigo. |
| `npm run build` | Compila la aplicacion para produccion. |
| `npm run start` | Ejecuta la version compilada de produccion. |

## Flujo de ramas usado

- `main`: rama estable y despliegue.
- `develop`: rama de integracion.
- `feature/auth-roles`: autenticacion y roles.
- `feature/vendor-registration`: registro de vendedor.
- `feature/stall-registration`: registro de puestos.
- `feature/license-management`: gestion de licencias.
- `feature/public-stalls`: consulta publica de puestos.

Las funcionalidades se desarrollan en ramas `feature/*`, se integran mediante Pull Requests hacia `develop` y luego se consolidan hacia `main` para despliegue estable.

## Evidencias de evaluacion

El proyecto cuenta con evidencias para:

- Modelo ER en Supabase.
- Datos de prueba.
- Pull Requests por funcionalidad.
- Branches por historia o modulo.
- Checks de GitHub Actions.
- Despliegue en Vercel.
- URL publica funcional.
- Documentacion de Sprint 1 en la carpeta `docs/`.

## Estado actual del proyecto

El Sprint 1 deja implementada la base funcional del MVP:

- Login y control de acceso por rol.
- Registro de datos de vendedor.
- Registro de puestos ambulantes.
- Gestion de licencias municipales.
- Consulta publica de puestos autorizados con filtros.
- Detalle sanitario publico del puesto.
- Despliegue en Vercel y validacion por CI/CD.

Los modulos de reportes ciudadanos, inspecciones municipales, evidencias y panel administrativo completo quedan preparados a nivel de modelo/documentacion para siguientes iteraciones.

## Autor o responsable

Proyecto desarrollado por **Skeletus** como parte del curso Proyecto Final de Carrera III.
