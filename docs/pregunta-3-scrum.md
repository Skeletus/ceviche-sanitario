# Pregunta 3 - Planificación con Scrum

## Introducción contextualizada

El proyecto corresponde a un sistema web para la supervisión sanitaria de vendedores ambulantes de ceviche de pota. El problema principal es que la venta de pota cruda en puestos ambulantes puede realizarse sin cadena de frío, sin licencia visible o sin control sanitario suficiente. Por ello, el MVP se enfoca en registrar vendedores y puestos, consultar puestos autorizados, reportar riesgos sanitarios, registrar inspecciones municipales, cambiar estados sanitarios y visualizar información operativa para la toma de decisiones.

La solución se planifica con Scrum porque el producto requiere entregas incrementales, validación frecuente con usuarios y capacidad de adaptación. El enfoque permite priorizar primero las funcionalidades base, luego la gestión sanitaria y finalmente el panel administrativo, evidencias, exportación básica, pruebas finales, despliegue y pulido de experiencia de usuario.

## Aplicación de Scrum al MVP

Scrum se aplicará mediante un Product Backlog priorizado, tres sprints de dos semanas, Sprint Planning, Daily Scrum, Sprint Review y Sprint Retrospective. Cada sprint entrega valor funcional verificable:

- Sprint 1: base de acceso, roles, perfil, registro de vendedor, registro de puesto y consulta inicial de puestos autorizados.
- Sprint 2: inspecciones sanitarias, cambios de estado sanitario y reportes ciudadanos de riesgo.
- Sprint 3: panel administrativo, exportación CSV básica, avisos internos, trazabilidad, pruebas finales, despliegue y ajustes de experiencia.

## Roles Scrum

| Rol Scrum | Nombre ficticio | Responsabilidad en el proyecto |
|---|---|---|
| Product Owner | Laura Medina | Prioriza el backlog según valor sanitario, riesgo operativo y alcance del MVP. |
| Scrum Master | Andrés Salazar | Facilita ceremonias, elimina impedimentos y protege el foco del sprint. |
| Frontend Dev | Camila Torres | Implementa interfaces en Next.js, React, TypeScript y Tailwind CSS. |
| Backend Dev | Diego Ramos | Implementa API/server-side functions, Supabase Auth, PostgreSQL y Storage. |
| QA | Valeria Paredes | Define pruebas, valida criterios de aceptación y verifica flujos por rol. |

## Product Backlog completo

| Código | Actor | Historia de usuario | Prioridad | Story points | Sprint |
|---|---|---|---|---:|---|
| HU01 | Ciudadano | Como Ciudadano, quiero consultar puestos autorizados de ceviche de pota, para identificar opciones seguras antes de comprar. | Alta | 5 | Sprint 1 |
| HU02 | Ciudadano | Como Ciudadano, quiero filtrar puestos por ubicación y estado sanitario, para reducir el tiempo de búsqueda de puestos seguros. | Media | 3 | Sprint 1 |
| HU03 | Ciudadano | Como Ciudadano, quiero ver el detalle sanitario de un puesto autorizado, para confirmar su licencia y última condición registrada. | Media | 3 | Sprint 1 |
| HU04 | Ciudadano | Como Ciudadano, quiero reportar un riesgo sanitario observado en un puesto, para alertar a la municipalidad sobre una posible amenaza. | Alta | 5 | Sprint 2 |
| HU05 | Ciudadano | Como Ciudadano, quiero adjuntar evidencia visual a un reporte sanitario, para mejorar la verificabilidad del caso reportado. | Media | 3 | Sprint 2 |
| HU06 | Vendedor | Como Vendedor, quiero registrar mis datos de identificación y contacto, para iniciar mi proceso de formalización sanitaria. | Alta | 5 | Sprint 1 |
| HU07 | Vendedor | Como Vendedor, quiero registrar la ubicación y características de mi puesto, para que pueda ser evaluado por la municipalidad. | Alta | 5 | Sprint 1 |
| HU08 | Vendedor | Como Vendedor, quiero cargar y actualizar mi licencia municipal, para demostrar que mi puesto cuenta con autorización vigente. | Alta | 5 | Sprint 1 |
| HU09 | Vendedor | Como Vendedor, quiero consultar el estado sanitario de mi puesto, para conocer si estoy autorizado, observado o suspendido. | Media | 3 | Sprint 3 |
| HU10 | Vendedor | Como Vendedor, quiero recibir avisos internos sobre observaciones sanitarias, para corregirlas antes de una nueva inspección. | Media | 3 | Sprint 3 |
| HU11 | Inspector sanitario/municipal | Como Inspector sanitario/municipal, quiero consultar puestos pendientes de inspección, para organizar mi jornada de supervisión. | Alta | 5 | Sprint 2 |
| HU12 | Inspector sanitario/municipal | Como Inspector sanitario/municipal, quiero registrar una inspección sanitaria con checklist básico, para dejar evidencia estructurada del control realizado. | Alta | 8 | Sprint 2 |
| HU13 | Inspector sanitario/municipal | Como Inspector sanitario/municipal, quiero cambiar el estado sanitario de un puesto, para reflejar el resultado de la inspección. | Alta | 5 | Sprint 2 |
| HU14 | Inspector sanitario/municipal | Como Inspector sanitario/municipal, quiero revisar reportes ciudadanos pendientes, para priorizar casos con mayor riesgo sanitario. | Alta | 5 | Sprint 2 |
| HU15 | Inspector sanitario/municipal | Como Inspector sanitario/municipal, quiero vincular un reporte ciudadano a un puesto o inspección, para mantener trazabilidad del caso. | Media | 5 | Sprint 2 |
| HU16 | Inspector sanitario/municipal | Como Inspector sanitario/municipal, quiero registrar evidencia de inspección, para sustentar decisiones sanitarias tomadas en campo. | Media | 3 | Sprint 2 |
| HU17 | Administrador | Como Administrador, quiero visualizar un panel con indicadores sanitarios, para monitorear el estado general de puestos y reportes. | Alta | 8 | Sprint 3 |
| HU18 | Administrador | Como Administrador, quiero gestionar reportes sanitarios desde el panel, para dar seguimiento a casos abiertos y cerrados. | Alta | 5 | Sprint 3 |
| HU19 | Administrador | Como Administrador, quiero exportar reportes e inspecciones en CSV, para elaborar evidencia básica para el informe municipal. | Media | 3 | Sprint 3 |
| HU20 | Administrador | Como Administrador, quiero revisar la trazabilidad de cambios por puesto, para auditar las decisiones sanitarias registradas. | Media | 5 | Sprint 3 |
| HU21 | Transversal | Como Transversal, quiero autenticar usuarios con correo y contraseña, para permitir acceso seguro al sistema según identidad registrada. | Alta | 5 | Sprint 1 |
| HU22 | Transversal | Como Transversal, quiero aplicar roles y perfil básico de usuario, para restringir funcionalidades según ciudadano, vendedor, inspector o administrador. | Alta | 8 | Sprint 1 |

**Total del Product Backlog:** 105 story points.

## Estimación con Planning Poker

La estimación se realizó con escala Fibonacci: 1, 2, 3, 5, 8 y 13. Participaron Product Owner, Frontend Dev, Backend Dev y QA. La estimación final corresponde al consenso del equipo después de discutir incertidumbre técnica, esfuerzo de interfaz, persistencia de datos, validaciones y pruebas.

| Código | Product Owner | Frontend Dev | Backend Dev | QA | Final | Justificación de consenso |
|---|---:|---:|---:|---:|---:|---|
| HU01 | 5 | 5 | 5 | 3 | 5 | Requiere consulta pública, listado y validación de datos publicados. |
| HU02 | 3 | 3 | 3 | 3 | 3 | Filtros simples sobre datos ya disponibles. |
| HU03 | 3 | 3 | 3 | 3 | 3 | Pantalla de detalle con información sanitaria ya modelada. |
| HU04 | 5 | 5 | 5 | 5 | 5 | Incluye formulario, validaciones y persistencia del reporte. |
| HU05 | 3 | 3 | 5 | 3 | 3 | Carga simple de evidencia usando Supabase Storage. |
| HU06 | 5 | 5 | 5 | 5 | 5 | Registro con validaciones y relación con perfil de vendedor. |
| HU07 | 5 | 5 | 5 | 5 | 5 | Requiere formulario, ubicación y vínculo con vendedor. |
| HU08 | 5 | 5 | 5 | 5 | 5 | Incluye archivo o datos de licencia y actualización de vigencia. |
| HU09 | 3 | 3 | 3 | 3 | 3 | Consulta controlada del estado sanitario propio. |
| HU10 | 3 | 3 | 3 | 3 | 3 | Avisos internos simples dentro del sistema. |
| HU11 | 5 | 5 | 5 | 5 | 5 | Lista filtrada por estado y necesidad operativa del inspector. |
| HU12 | 8 | 8 | 8 | 8 | 8 | Checklist de inspección con reglas y mayor cantidad de pruebas. |
| HU13 | 5 | 5 | 5 | 5 | 5 | Cambio de estado con control de permisos y trazabilidad. |
| HU14 | 5 | 5 | 5 | 5 | 5 | Bandeja de reportes pendientes con priorización básica. |
| HU15 | 5 | 5 | 5 | 5 | 5 | Vincula entidades y exige trazabilidad del caso. |
| HU16 | 3 | 3 | 3 | 3 | 3 | Evidencia de inspección similar a carga de archivo ya definida. |
| HU17 | 8 | 8 | 8 | 8 | 8 | Panel con indicadores agregados y consultas resumidas. |
| HU18 | 5 | 5 | 5 | 5 | 5 | Gestión de estados de reportes desde panel administrativo. |
| HU19 | 3 | 3 | 3 | 3 | 3 | Exportación CSV básica sin procesamiento avanzado. |
| HU20 | 5 | 5 | 5 | 5 | 5 | Requiere historial de cambios y consulta auditable. |
| HU21 | 5 | 5 | 5 | 5 | 5 | Autenticación base con Supabase Auth y validaciones de acceso. |
| HU22 | 8 | 8 | 8 | 8 | 8 | Roles afectan navegación, API y pruebas de permisos. |

## Velocidad esperada del equipo

La velocidad esperada del equipo es de **39 story points por sprint**. Esta velocidad se define considerando un equipo pequeño de Frontend Dev, Backend Dev y QA, sprints de dos semanas y una capacidad realista para construir funcionalidades completas con pruebas y documentación básica.

El Product Backlog suma 105 puntos. La distribución deja Sprint 1 y Sprint 2 con 39 puntos cada uno, mientras que Sprint 3 queda con 27 puntos funcionales y reserva capacidad para pruebas finales, despliegue, correcciones menores y pulido de experiencia de usuario.

## Distribución por sprint

| Sprint | Duración | Historias | Story points | Sprint Goal |
|---|---|---|---:|---|
| Sprint 1 | 2 semanas | HU21, HU22, HU06, HU07, HU08, HU01, HU02, HU03 | 39 | Habilitar la base operativa del sistema para que usuarios autenticados registren vendedores y puestos, y los ciudadanos consulten puestos autorizados. |
| Sprint 2 | 2 semanas | HU04, HU05, HU11, HU12, HU13, HU14, HU15, HU16 | 39 | Permitir la supervisión sanitaria activa mediante reportes ciudadanos, inspecciones municipales y cambio de estado sanitario con evidencia. |
| Sprint 3 | 2 semanas | HU09, HU10, HU17, HU18, HU19, HU20 | 27 | Consolidar la gestión administrativa, trazabilidad, consulta del vendedor y evidencia exportable para cerrar el MVP desplegable. |

## Sprint Backlog detallado del Sprint 1

### HU21

**Historia:** Como Transversal, quiero autenticar usuarios con correo y contraseña, para permitir acceso seguro al sistema según identidad registrada.

**Story points:** 5  
**Prioridad:** Alta  
**Responsable sugerido:** Ambos

**Criterios de aceptación:**

- El usuario puede iniciar sesión con correo y contraseña válidos.
- El sistema muestra un mensaje visual cuando las credenciales son incorrectas.
- La sesión autenticada permite acceder a rutas protegidas según rol.

**Tareas técnicas:**

- Frontend: crear formularios de inicio de sesión y cierre de sesión.
- Backend/API: integrar Supabase Auth y validar sesión en funciones server-side.
- Base de datos: relacionar usuario autenticado con perfil interno.
- Pruebas: validar login exitoso, login fallido y cierre de sesión.

**Definition of Done específica:** la autenticación funciona en ambiente de prueba, las rutas protegidas rechazan usuarios no autenticados y QA valida los tres criterios de aceptación.

### HU22

**Historia:** Como Transversal, quiero aplicar roles y perfil básico de usuario, para restringir funcionalidades según ciudadano, vendedor, inspector o administrador.

**Story points:** 8  
**Prioridad:** Alta  
**Responsable sugerido:** Ambos

**Criterios de aceptación:**

- Cada usuario tiene un rol asignado: ciudadano, vendedor, inspector o administrador.
- El menú muestra solo opciones permitidas para el rol autenticado.
- La API rechaza operaciones no permitidas aunque el usuario intente acceder manualmente.

**Tareas técnicas:**

- Frontend: condicionar navegación y vistas por rol.
- Backend/API: crear validadores de permisos para operaciones protegidas.
- Base de datos: crear tabla de perfiles con rol y estado activo.
- Pruebas: ejecutar casos de acceso permitido y denegado por cada rol.

**Definition of Done específica:** los permisos están aplicados en interfaz y API, no solo en el frontend, y QA documenta pruebas por rol.

### HU06

**Historia:** Como Vendedor, quiero registrar mis datos de identificación y contacto, para iniciar mi proceso de formalización sanitaria.

**Story points:** 5  
**Prioridad:** Alta  
**Responsable sugerido:** Ambos

**Criterios de aceptación:**

- El vendedor registra nombres, documento, teléfono y datos de contacto obligatorios.
- El sistema valida campos requeridos antes de guardar.
- El vendedor registrado queda vinculado al perfil autenticado.

**Tareas técnicas:**

- Frontend: construir formulario de registro de vendedor con validaciones visibles.
- Backend/API: crear endpoint o función server-side para registrar vendedor.
- Base de datos: crear tabla de vendedores y relación con perfil.
- Pruebas: validar registro exitoso, campos obligatorios y duplicidad básica.

**Definition of Done específica:** el registro persiste correctamente en PostgreSQL, muestra confirmación visual y no permite datos incompletos.

### HU07

**Historia:** Como Vendedor, quiero registrar la ubicación y características de mi puesto, para que pueda ser evaluado por la municipalidad.

**Story points:** 5  
**Prioridad:** Alta  
**Responsable sugerido:** Ambos

**Criterios de aceptación:**

- El vendedor registra dirección o referencia de ubicación del puesto.
- El puesto queda asociado a un vendedor existente.
- El puesto inicia con estado sanitario pendiente u observado según regla definida.

**Tareas técnicas:**

- Frontend: crear formulario de puesto con ubicación, horario y descripción.
- Backend/API: validar que el vendedor exista antes de registrar el puesto.
- Base de datos: crear tabla de puestos con llave foránea hacia vendedor.
- Pruebas: validar asociación vendedor-puesto y campos mínimos requeridos.

**Definition of Done específica:** un vendedor autenticado puede registrar un puesto válido y el sistema mantiene la relación con el vendedor sin inconsistencias.

### HU08

**Historia:** Como Vendedor, quiero cargar y actualizar mi licencia municipal, para demostrar que mi puesto cuenta con autorización vigente.

**Story points:** 5  
**Prioridad:** Alta  
**Responsable sugerido:** Ambos

**Criterios de aceptación:**

- El vendedor registra número de licencia y fecha de vencimiento.
- El sistema permite actualizar la licencia asociada al puesto.
- La licencia queda visible para validación sanitaria posterior.

**Tareas técnicas:**

- Frontend: crear sección de licencia dentro del flujo de puesto.
- Backend/API: guardar datos de licencia y controlar edición por propietario.
- Base de datos: modelar licencia con vigencia y relación al puesto.
- Pruebas: validar creación, actualización y consulta de licencia.

**Definition of Done específica:** la licencia puede crearse y actualizarse sin duplicar registros, y queda disponible para consulta de ciudadanos e inspectores.

### HU01

**Historia:** Como Ciudadano, quiero consultar puestos autorizados de ceviche de pota, para identificar opciones seguras antes de comprar.

**Story points:** 5  
**Prioridad:** Alta  
**Responsable sugerido:** Frontend Dev y Backend Dev

**Criterios de aceptación:**

- El ciudadano visualiza una lista de puestos con estado autorizado.
- La lista muestra nombre del puesto, ubicación y estado sanitario.
- Los puestos no autorizados no aparecen en la consulta pública principal.

**Tareas técnicas:**

- Frontend: construir vista pública de listado de puestos autorizados.
- Backend/API: exponer consulta segura de puestos autorizados.
- Base de datos: preparar consulta por estado sanitario.
- Pruebas: verificar que solo se listen puestos autorizados.

**Definition of Done específica:** la consulta pública muestra datos correctos, no expone información sensible y QA valida el filtrado de estados.

### HU02

**Historia:** Como Ciudadano, quiero filtrar puestos por ubicación y estado sanitario, para reducir el tiempo de búsqueda de puestos seguros.

**Story points:** 3  
**Prioridad:** Media  
**Responsable sugerido:** Frontend Dev

**Criterios de aceptación:**

- El ciudadano filtra puestos por texto de ubicación.
- El ciudadano filtra puestos por estado sanitario disponible.
- Los resultados se actualizan sin perder claridad visual.

**Tareas técnicas:**

- Frontend: implementar controles de filtro y estado de búsqueda.
- Backend/API: aceptar parámetros de búsqueda simples.
- Base de datos: optimizar consulta básica por ubicación y estado.
- Pruebas: validar combinaciones de filtros y resultados vacíos.

**Definition of Done específica:** los filtros funcionan de manera consistente y no rompen la consulta pública de puestos.

### HU03

**Historia:** Como Ciudadano, quiero ver el detalle sanitario de un puesto autorizado, para confirmar su licencia y última condición registrada.

**Story points:** 3  
**Prioridad:** Media  
**Responsable sugerido:** Frontend Dev

**Criterios de aceptación:**

- El ciudadano puede abrir el detalle desde el listado de puestos.
- El detalle muestra licencia, ubicación y estado sanitario.
- El sistema indica si no existe información sanitaria suficiente.

**Tareas técnicas:**

- Frontend: crear vista de detalle de puesto.
- Backend/API: consultar datos públicos del puesto seleccionado.
- Base de datos: relacionar puesto con licencia y estado.
- Pruebas: validar detalle existente y caso de información incompleta.

**Definition of Done específica:** el detalle es accesible desde el listado, presenta información pública verificable y maneja datos incompletos sin errores.

## Ceremonias Scrum aplicadas al proyecto

### Sprint Planning

Para el Sprint 1 se seleccionaron las historias HU21, HU22, HU06, HU07, HU08, HU01, HU02 y HU03. Se eligieron porque habilitan la base técnica y funcional del MVP: autenticación, roles, perfil, registro de vendedor, registro de puesto, licencia y consulta ciudadana básica. Sin estas historias no sería posible implementar inspecciones o reportes con control de permisos en el Sprint 2.

La reunión tiene una duración estimada de 2 horas. El equipo se compromete a entregar flujos completos y verificables, no solo pantallas aisladas. También se acuerda que cada historia debe cumplir su Definition of Done, tener validaciones mínimas, persistir datos en Supabase PostgreSQL y ser revisada por QA.

**Sprint Goal del Sprint 1:** Habilitar la base operativa del sistema para que usuarios autenticados registren vendedores y puestos, y los ciudadanos consulten puestos autorizados.

### Daily Scrum

**Día 1**

- Qué hice ayer: se revisó el alcance del Sprint 1 y se confirmó el modelo inicial de roles, vendedores, puestos y licencias.
- Qué haré hoy: Frontend iniciará pantallas de autenticación y Backend configurará Supabase Auth y la tabla de perfiles.
- Impedimentos: falta confirmar los nombres finales de los estados sanitarios iniciales.

**Día 2**

- Qué hice ayer: se creó el flujo base de login y se definió la estructura de perfiles por rol.
- Qué haré hoy: se conectará el formulario de login con Supabase Auth y se agregará control de rutas protegidas.
- Impedimentos: QA necesita datos de prueba para validar accesos por rol.

**Día 3**

- Qué hice ayer: se validó el inicio de sesión con usuarios de prueba y se avanzó el registro de vendedor.
- Qué haré hoy: se implementará el formulario de puesto y la relación vendedor-puesto en base de datos.
- Impedimentos: se detectó demora en la definición del campo obligatorio para ubicación del puesto.

### Sprint Review

Al final del Sprint 1 se demuestra el inicio de sesión, control básico por roles, registro de vendedor, registro de puesto, actualización de licencia, consulta de puestos autorizados, filtros básicos y vista de detalle sanitario. Asisten Product Owner, Scrum Master, equipo técnico, un representante municipal ficticio y un usuario ciudadano de prueba.

El feedback esperado es que la consulta ciudadana debe priorizar claridad visual del estado sanitario y que el registro de puesto debe pedir una referencia de ubicación entendible para inspección en campo. Para el Sprint 2 se propone ajustar etiquetas visuales de estado y preparar los reportes ciudadanos para que puedan vincularse a puestos existentes.

### Sprint Retrospective

**Qué salió bien:** el equipo logró construir primero autenticación y roles, lo que redujo retrabajo en las funcionalidades protegidas. También se validó temprano la relación entre vendedor, puesto y licencia.

**Qué se debe mejorar:** los criterios de ubicación del puesto deben definirse antes de iniciar formularios y pruebas. Además, QA necesita datos de prueba desde el primer día del sprint.

**Impedimentos:** hubo demora en confirmar estados sanitarios iniciales y campos mínimos de ubicación.

**Acción concreta para Sprint 2:** antes de iniciar desarrollo, el equipo creará una matriz breve de estados sanitarios, checklist de inspección y datos de prueba para reportes ciudadanos.

## Definition of Done global

Una historia se considera terminada cuando cumple estas condiciones:

- La funcionalidad está implementada en frontend y backend/API cuando corresponde.
- Los datos se guardan o consultan desde Supabase PostgreSQL o Storage según el caso.
- Se aplican permisos por rol cuando la funcionalidad no es pública.
- Los criterios de aceptación fueron validados por QA.
- La interfaz muestra mensajes visuales claros en éxito, error y estados vacíos.
- No se exponen datos sensibles en vistas públicas.
- La historia puede demostrarse en Sprint Review con datos de prueba.
- La documentación del tablero Trello está actualizada con estado, responsable y evidencia.

## Criterios de aceptación resumidos por historia

| Código | Criterios de aceptación |
|---|---|
| HU01 | Lista puestos autorizados; muestra ubicación y estado; oculta puestos no autorizados. |
| HU02 | Filtra por ubicación; filtra por estado; muestra resultados vacíos claramente. |
| HU03 | Abre detalle desde listado; muestra licencia y estado; maneja información incompleta. |
| HU04 | Registra descripción del riesgo; exige puesto o referencia; guarda estado pendiente. |
| HU05 | Permite adjuntar imagen; valida tipo de archivo; vincula evidencia al reporte. |
| HU06 | Guarda datos obligatorios; valida documento y contacto; vincula vendedor con perfil. |
| HU07 | Registra ubicación y características; vincula puesto con vendedor; asigna estado inicial. |
| HU08 | Registra licencia y vencimiento; permite actualización; deja licencia visible para consulta. |
| HU09 | Muestra estado propio; muestra observaciones; restringe consulta al vendedor propietario. |
| HU10 | Muestra avisos internos; marca avisos como leídos; relaciona aviso con puesto observado. |
| HU11 | Lista puestos pendientes; permite filtrar por zona; muestra prioridad operativa. |
| HU12 | Registra checklist; guarda resultado; exige inspector autenticado. |
| HU13 | Cambia estado sanitario; exige inspección asociada; registra trazabilidad. |
| HU14 | Lista reportes pendientes; permite priorizar; muestra datos del riesgo reportado. |
| HU15 | Vincula reporte con puesto o inspección; evita duplicados; conserva historial del caso. |
| HU16 | Adjunta evidencia de inspección; valida archivo; vincula evidencia al acta. |
| HU17 | Muestra indicadores; permite lectura por estado; usa datos reales del sistema. |
| HU18 | Cambia estado de reportes; registra responsable; separa casos abiertos y cerrados. |
| HU19 | Exporta CSV básico; incluye reportes o inspecciones; respeta filtros aplicados. |
| HU20 | Muestra historial de cambios; identifica usuario responsable; ordena eventos por fecha. |
| HU21 | Permite login; rechaza credenciales inválidas; mantiene sesión protegida. |
| HU22 | Asigna rol; restringe menú; bloquea API sin permiso. |

## Descripción del tablero Trello

El tablero Trello se usará como evidencia visual de planificación y seguimiento Scrum. Tendrá las columnas Product Backlog, Sprint 1 Backlog, To Do, In Progress, Review y Done. Cada tarjeta debe tener código de historia, actor, story points, prioridad, sprint asignado, descripción y checklist de criterios de aceptación.

Durante la planificación, las 22 historias se registran en Product Backlog. Al iniciar Sprint 1, las historias HU21, HU22, HU06, HU07, HU08, HU01, HU02 y HU03 se mueven a Sprint 1 Backlog. Durante la ejecución, las tarjetas pasan a To Do, In Progress, Review y Done según avance. Para el informe, se deben capturar el Product Backlog completo, Sprint 1 Backlog, tablero operativo y burndown chart.

## Burndown chart del Sprint 1

El Sprint 1 inicia con 39 story points. El burndown chart se simula para 10 días hábiles. El equipo avanza bien los dos primeros días, se retrasa en el día 4 por un impedimento relacionado con definición de ubicación y datos de prueba, y luego se recupera parcialmente. El último día queda 1 punto pendiente, justificable como ajuste menor de validación visual, sin bloquear la demostración principal del sprint.

## Evidencias

### Captura 1: Product Backlog en Trello
[Insertar captura del Product Backlog]

### Captura 2: Sprint 1 Backlog
[Insertar captura del Sprint 1 Backlog]

### Captura 3: Tablero To Do / In Progress / Review / Done
[Insertar captura del tablero Scrum]

### Captura 4: Burndown Chart del Sprint 1
[Insertar captura del gráfico burndown]
