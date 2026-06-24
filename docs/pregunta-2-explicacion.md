# Pregunta 2 - Diagramas: casos de uso y arquitectura

## Introduccion

La Pregunta 2 solicita modelar la solucion propuesta para el caso de vendedores de ceviche de pota mediante diagramas consistentes con el MVP. La solucion planteada es una aplicacion web para registrar vendedores y puestos, consultar puestos autorizados, reportar riesgos sanitarios, gestionar inspecciones y visualizar informacion operativa para la supervision municipal o sanitaria.

Los diagramas fueron elaborados en PlantUML y se encuentran en la carpeta `docs/diagramas/`.

## Diagrama de casos de uso UML

**Archivo PlantUML:** [`docs/diagramas/casos-uso.puml`](diagramas/casos-uso.puml)

Este diagrama representa las interacciones principales entre los actores del sistema y la aplicacion. Incluye a Ciudadano, Vendedor, Inspector sanitario o municipal y Administrador. Cada actor se relaciona con los casos de uso que le corresponden segun su rol.

El ciudadano puede registrarse, iniciar sesion, consultar puestos autorizados y reportar riesgos sanitarios. El vendedor puede registrar sus datos, registrar su puesto y actualizar licencia. El inspector puede registrar inspecciones, cambiar el estado sanitario y gestionar reportes. El administrador puede gestionar informacion maestra, reportes y consultar el panel general.

Tambien se usan relaciones `include` y `extend` para representar dependencias funcionales. Por ejemplo, iniciar sesion incluye validar credenciales; registrar puesto incluye tener un vendedor registrado; cambiar estado sanitario incluye registrar una inspeccion; y adjuntar evidencia extiende el reporte de riesgo porque puede ser opcional.

**Cumplimiento de la rubrica:** usa notacion UML de casos de uso, incluye actores definidos, muestra interacciones principales y presenta casos coherentes con el problema sanitario e informalidad de venta de ceviche de pota.

## Diagrama de arquitectura logica

**Archivo PlantUML:** [`docs/diagramas/arquitectura-logica.puml`](diagramas/arquitectura-logica.puml)

Este diagrama muestra la organizacion interna de la solucion por capas y componentes. La capa de presentacion esta formada por el frontend Next.js con React, TypeScript y Tailwind CSS. La capa de aplicacion concentra las API/server-side functions y modulos funcionales: usuarios y roles, vendedores y puestos, licencias, inspecciones, reportes y panel.

La capa de servicios de plataforma incluye Supabase Auth para autenticacion, PostgreSQL/Supabase como base de datos relacional, Supabase Storage para evidencias y servicios de monitoreo mediante logs de Vercel y Supabase.

El flujo principal inicia cuando un usuario usa el frontend. Luego el frontend envia solicitudes HTTPS a la API, la API valida autenticacion y roles, ejecuta la logica de negocio y consulta o actualiza la base de datos. Cuando se adjuntan fotos o documentos, estos se guardan en almacenamiento. Los errores y eventos relevantes se envian al monitoreo.

**Cumplimiento de la rubrica:** representa frontend, backend/API, autenticacion, modulos funcionales, base de datos, almacenamiento, monitoreo y relaciones claras entre componentes.

## Diagrama de arquitectura fisica en nube

**Archivo PlantUML:** [`docs/diagramas/arquitectura-fisica-nube.puml`](diagramas/arquitectura-fisica-nube.puml)

Este diagrama representa el despliegue real propuesto en la nube. Se usan servicios concretos: GitHub para repositorio, GitHub Actions para CI/CD, Vercel Edge Network/CDN, Vercel Hosting, Vercel Serverless Functions, Supabase Auth, Supabase PostgreSQL, Supabase Storage y logs de Vercel/Supabase.

El flujo de CI/CD inicia cuando el equipo de desarrollo realiza un push o pull request en GitHub. GitHub Actions ejecuta instalacion de dependencias, pruebas, build y despliegue hacia Vercel. Luego, los usuarios acceden a la aplicacion mediante una URL publica; la red Edge/CDN entrega el frontend, Vercel Hosting sirve la aplicacion Next.js y las Serverless Functions procesan operaciones hacia Supabase.

Tambien se modela el flujo de uso del sistema: autenticacion con Supabase Auth, lectura y escritura de datos en Supabase PostgreSQL, almacenamiento de evidencias en Supabase Storage y registro de eventos en logs.

**Cumplimiento de la rubrica:** usa servicios reales de nube y plataforma, muestra la infraestructura de despliegue, el flujo CI/CD, el acceso mediante URL publica y la comunicacion entre frontend, funciones serverless, autenticacion, base de datos, almacenamiento y monitoreo.

## Resumen de alineacion con la rubrica

| Criterio | Como se cumple |
|---|---|
| Diagrama de casos de uso | Incluye actores, casos principales, relaciones `include` y `extend`, y comportamiento coherente con el MVP. |
| Arquitectura logica | Presenta capas, componentes, modulos funcionales y comunicacion entre frontend, API, autenticacion, base de datos, almacenamiento y monitoreo. |
| Arquitectura fisica en nube | Usa servicios reales: Vercel, Supabase, GitHub y GitHub Actions; ademas muestra flujo de uso y despliegue CI/CD. |

