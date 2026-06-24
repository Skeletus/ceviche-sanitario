# Estructura del tablero Trello - Pregunta 3

## Nombre del tablero

**Scrum MVP - Supervisión sanitaria de vendedores de ceviche de pota**

## Objetivo del tablero

El tablero permite gestionar el Product Backlog, planificar el Sprint 1 y evidenciar el avance Scrum del MVP. Cada tarjeta representa una historia de usuario con actor, prioridad, story points, sprint asignado y checklist de criterios de aceptación. El tablero debe usarse como evidencia para capturas del backlog, sprint backlog, flujo To Do / In Progress / Review / Done y burndown chart.

## Columnas exactas del tablero

1. Product Backlog
2. Sprint 1 Backlog
3. To Do
4. In Progress
5. Review
6. Done

## Etiquetas sugeridas

### Etiquetas por actor

- Ciudadano
- Vendedor
- Inspector
- Administrador
- Transversal

### Etiquetas por prioridad

- Alta
- Media
- Baja

## Tarjetas por columna

### Product Backlog

Esta columna contiene las historias planificadas para Sprint 2 y Sprint 3.

#### HU04 - Reportar riesgo sanitario

- **Actor:** Ciudadano
- **Story points:** 5
- **Sprint asignado:** Sprint 2
- **Prioridad:** Alta
- **Descripción:** Como Ciudadano, quiero reportar un riesgo sanitario observado en un puesto, para alertar a la municipalidad sobre una posible amenaza.
- **Etiquetas:** Ciudadano, Alta
- **Checklist de criterios de aceptación:**
  - Registra descripción del riesgo.
  - Exige puesto o referencia.
  - Guarda estado pendiente.

#### HU05 - Adjuntar evidencia visual

- **Actor:** Ciudadano
- **Story points:** 3
- **Sprint asignado:** Sprint 2
- **Prioridad:** Media
- **Descripción:** Como Ciudadano, quiero adjuntar evidencia visual a un reporte sanitario, para mejorar la verificabilidad del caso reportado.
- **Etiquetas:** Ciudadano, Media
- **Checklist de criterios de aceptación:**
  - Permite adjuntar imagen.
  - Valida tipo de archivo.
  - Vincula evidencia al reporte.

#### HU09 - Consultar estado sanitario propio

- **Actor:** Vendedor
- **Story points:** 3
- **Sprint asignado:** Sprint 3
- **Prioridad:** Media
- **Descripción:** Como Vendedor, quiero consultar el estado sanitario de mi puesto, para conocer si estoy autorizado, observado o suspendido.
- **Etiquetas:** Vendedor, Media
- **Checklist de criterios de aceptación:**
  - Muestra estado propio.
  - Muestra observaciones.
  - Restringe consulta al vendedor propietario.

#### HU10 - Recibir avisos internos

- **Actor:** Vendedor
- **Story points:** 3
- **Sprint asignado:** Sprint 3
- **Prioridad:** Media
- **Descripción:** Como Vendedor, quiero recibir avisos internos sobre observaciones sanitarias, para corregirlas antes de una nueva inspección.
- **Etiquetas:** Vendedor, Media
- **Checklist de criterios de aceptación:**
  - Muestra avisos internos.
  - Marca avisos como leídos.
  - Relaciona aviso con puesto observado.

#### HU11 - Consultar puestos pendientes

- **Actor:** Inspector sanitario/municipal
- **Story points:** 5
- **Sprint asignado:** Sprint 2
- **Prioridad:** Alta
- **Descripción:** Como Inspector sanitario/municipal, quiero consultar puestos pendientes de inspección, para organizar mi jornada de supervisión.
- **Etiquetas:** Inspector, Alta
- **Checklist de criterios de aceptación:**
  - Lista puestos pendientes.
  - Permite filtrar por zona.
  - Muestra prioridad operativa.

#### HU12 - Registrar inspección sanitaria

- **Actor:** Inspector sanitario/municipal
- **Story points:** 8
- **Sprint asignado:** Sprint 2
- **Prioridad:** Alta
- **Descripción:** Como Inspector sanitario/municipal, quiero registrar una inspección sanitaria con checklist básico, para dejar evidencia estructurada del control realizado.
- **Etiquetas:** Inspector, Alta
- **Checklist de criterios de aceptación:**
  - Registra checklist.
  - Guarda resultado.
  - Exige inspector autenticado.

#### HU13 - Cambiar estado sanitario

- **Actor:** Inspector sanitario/municipal
- **Story points:** 5
- **Sprint asignado:** Sprint 2
- **Prioridad:** Alta
- **Descripción:** Como Inspector sanitario/municipal, quiero cambiar el estado sanitario de un puesto, para reflejar el resultado de la inspección.
- **Etiquetas:** Inspector, Alta
- **Checklist de criterios de aceptación:**
  - Cambia estado sanitario.
  - Exige inspección asociada.
  - Registra trazabilidad.

#### HU14 - Revisar reportes pendientes

- **Actor:** Inspector sanitario/municipal
- **Story points:** 5
- **Sprint asignado:** Sprint 2
- **Prioridad:** Alta
- **Descripción:** Como Inspector sanitario/municipal, quiero revisar reportes ciudadanos pendientes, para priorizar casos con mayor riesgo sanitario.
- **Etiquetas:** Inspector, Alta
- **Checklist de criterios de aceptación:**
  - Lista reportes pendientes.
  - Permite priorizar.
  - Muestra datos del riesgo reportado.

#### HU15 - Vincular reporte a puesto o inspección

- **Actor:** Inspector sanitario/municipal
- **Story points:** 5
- **Sprint asignado:** Sprint 2
- **Prioridad:** Media
- **Descripción:** Como Inspector sanitario/municipal, quiero vincular un reporte ciudadano a un puesto o inspección, para mantener trazabilidad del caso.
- **Etiquetas:** Inspector, Media
- **Checklist de criterios de aceptación:**
  - Vincula reporte con puesto o inspección.
  - Evita duplicados.
  - Conserva historial del caso.

#### HU16 - Registrar evidencia de inspección

- **Actor:** Inspector sanitario/municipal
- **Story points:** 3
- **Sprint asignado:** Sprint 2
- **Prioridad:** Media
- **Descripción:** Como Inspector sanitario/municipal, quiero registrar evidencia de inspección, para sustentar decisiones sanitarias tomadas en campo.
- **Etiquetas:** Inspector, Media
- **Checklist de criterios de aceptación:**
  - Adjunta evidencia de inspección.
  - Valida archivo.
  - Vincula evidencia al acta.

#### HU17 - Visualizar panel administrativo

- **Actor:** Administrador
- **Story points:** 8
- **Sprint asignado:** Sprint 3
- **Prioridad:** Alta
- **Descripción:** Como Administrador, quiero visualizar un panel con indicadores sanitarios, para monitorear el estado general de puestos y reportes.
- **Etiquetas:** Administrador, Alta
- **Checklist de criterios de aceptación:**
  - Muestra indicadores.
  - Permite lectura por estado.
  - Usa datos reales del sistema.

#### HU18 - Gestionar reportes desde panel

- **Actor:** Administrador
- **Story points:** 5
- **Sprint asignado:** Sprint 3
- **Prioridad:** Alta
- **Descripción:** Como Administrador, quiero gestionar reportes sanitarios desde el panel, para dar seguimiento a casos abiertos y cerrados.
- **Etiquetas:** Administrador, Alta
- **Checklist de criterios de aceptación:**
  - Cambia estado de reportes.
  - Registra responsable.
  - Separa casos abiertos y cerrados.

#### HU19 - Exportar CSV básico

- **Actor:** Administrador
- **Story points:** 3
- **Sprint asignado:** Sprint 3
- **Prioridad:** Media
- **Descripción:** Como Administrador, quiero exportar reportes e inspecciones en CSV, para elaborar evidencia básica para el informe municipal.
- **Etiquetas:** Administrador, Media
- **Checklist de criterios de aceptación:**
  - Exporta CSV básico.
  - Incluye reportes o inspecciones.
  - Respeta filtros aplicados.

#### HU20 - Revisar trazabilidad por puesto

- **Actor:** Administrador
- **Story points:** 5
- **Sprint asignado:** Sprint 3
- **Prioridad:** Media
- **Descripción:** Como Administrador, quiero revisar la trazabilidad de cambios por puesto, para auditar las decisiones sanitarias registradas.
- **Etiquetas:** Administrador, Media
- **Checklist de criterios de aceptación:**
  - Muestra historial de cambios.
  - Identifica usuario responsable.
  - Ordena eventos por fecha.

### Sprint 1 Backlog

Esta columna contiene las historias comprometidas para el Sprint 1.

#### HU21 - Autenticar usuarios

- **Actor:** Transversal
- **Story points:** 5
- **Sprint asignado:** Sprint 1
- **Prioridad:** Alta
- **Descripción:** Como Transversal, quiero autenticar usuarios con correo y contraseña, para permitir acceso seguro al sistema según identidad registrada.
- **Etiquetas:** Transversal, Alta
- **Checklist de criterios de aceptación:**
  - Permite login.
  - Rechaza credenciales inválidas.
  - Mantiene sesión protegida.

#### HU22 - Aplicar roles y perfil básico

- **Actor:** Transversal
- **Story points:** 8
- **Sprint asignado:** Sprint 1
- **Prioridad:** Alta
- **Descripción:** Como Transversal, quiero aplicar roles y perfil básico de usuario, para restringir funcionalidades según ciudadano, vendedor, inspector o administrador.
- **Etiquetas:** Transversal, Alta
- **Checklist de criterios de aceptación:**
  - Asigna rol.
  - Restringe menú.
  - Bloquea API sin permiso.

#### HU06 - Registrar datos de vendedor

- **Actor:** Vendedor
- **Story points:** 5
- **Sprint asignado:** Sprint 1
- **Prioridad:** Alta
- **Descripción:** Como Vendedor, quiero registrar mis datos de identificación y contacto, para iniciar mi proceso de formalización sanitaria.
- **Etiquetas:** Vendedor, Alta
- **Checklist de criterios de aceptación:**
  - Guarda datos obligatorios.
  - Valida documento y contacto.
  - Vincula vendedor con perfil.

#### HU07 - Registrar puesto ambulante

- **Actor:** Vendedor
- **Story points:** 5
- **Sprint asignado:** Sprint 1
- **Prioridad:** Alta
- **Descripción:** Como Vendedor, quiero registrar la ubicación y características de mi puesto, para que pueda ser evaluado por la municipalidad.
- **Etiquetas:** Vendedor, Alta
- **Checklist de criterios de aceptación:**
  - Registra ubicación y características.
  - Vincula puesto con vendedor.
  - Asigna estado inicial.

#### HU08 - Actualizar licencia municipal

- **Actor:** Vendedor
- **Story points:** 5
- **Sprint asignado:** Sprint 1
- **Prioridad:** Alta
- **Descripción:** Como Vendedor, quiero cargar y actualizar mi licencia municipal, para demostrar que mi puesto cuenta con autorización vigente.
- **Etiquetas:** Vendedor, Alta
- **Checklist de criterios de aceptación:**
  - Registra licencia y vencimiento.
  - Permite actualización.
  - Deja licencia visible para consulta.

#### HU01 - Consultar puestos autorizados

- **Actor:** Ciudadano
- **Story points:** 5
- **Sprint asignado:** Sprint 1
- **Prioridad:** Alta
- **Descripción:** Como Ciudadano, quiero consultar puestos autorizados de ceviche de pota, para identificar opciones seguras antes de comprar.
- **Etiquetas:** Ciudadano, Alta
- **Checklist de criterios de aceptación:**
  - Lista puestos autorizados.
  - Muestra ubicación y estado.
  - Oculta puestos no autorizados.

#### HU02 - Filtrar puestos por ubicación y estado

- **Actor:** Ciudadano
- **Story points:** 3
- **Sprint asignado:** Sprint 1
- **Prioridad:** Media
- **Descripción:** Como Ciudadano, quiero filtrar puestos por ubicación y estado sanitario, para reducir el tiempo de búsqueda de puestos seguros.
- **Etiquetas:** Ciudadano, Media
- **Checklist de criterios de aceptación:**
  - Filtra por ubicación.
  - Filtra por estado.
  - Muestra resultados vacíos claramente.

#### HU03 - Ver detalle sanitario del puesto

- **Actor:** Ciudadano
- **Story points:** 3
- **Sprint asignado:** Sprint 1
- **Prioridad:** Media
- **Descripción:** Como Ciudadano, quiero ver el detalle sanitario de un puesto autorizado, para confirmar su licencia y última condición registrada.
- **Etiquetas:** Ciudadano, Media
- **Checklist de criterios de aceptación:**
  - Abre detalle desde listado.
  - Muestra licencia y estado.
  - Maneja información incompleta.

### To Do

Al iniciar la ejecución del Sprint 1, mover aquí las historias seleccionadas desde Sprint 1 Backlog antes de empezar su desarrollo. Estado inicial recomendado: sin tarjetas duplicadas.

### In Progress

Mover aquí cada historia cuando Frontend Dev, Backend Dev o ambos estén desarrollando tareas activas. Estado inicial recomendado: sin tarjetas.

### Review

Mover aquí cada historia cuando el desarrollo esté completo y falte revisión de QA o validación del Product Owner. Estado inicial recomendado: sin tarjetas.

### Done

Mover aquí cada historia cuando cumpla sus criterios de aceptación y Definition of Done. Estado inicial recomendado: sin tarjetas.

## Guía paso a paso para configurar el tablero desde cero en Trello

1. Crear un tablero llamado **Scrum MVP - Supervisión sanitaria de vendedores de ceviche de pota**.
2. Crear las columnas exactas: Product Backlog, Sprint 1 Backlog, To Do, In Progress, Review y Done.
3. Crear etiquetas por actor: Ciudadano, Vendedor, Inspector, Administrador y Transversal.
4. Crear etiquetas por prioridad: Alta, Media y Baja.
5. Registrar cada historia como tarjeta usando el código HU y el nombre corto.
6. Copiar en la descripción de cada tarjeta la historia completa en formato "Como [actor], quiero [acción concreta], para [beneficio medible]."
7. Agregar story points en el título, descripción o campo personalizado de la tarjeta.
8. Agregar la prioridad y el sprint asignado en la descripción o campos personalizados.
9. Crear checklist de criterios de aceptación en cada tarjeta.
10. Ubicar HU04, HU05, HU09, HU10, HU11, HU12, HU13, HU14, HU15, HU16, HU17, HU18, HU19 y HU20 en Product Backlog.
11. Ubicar HU21, HU22, HU06, HU07, HU08, HU01, HU02 y HU03 en Sprint 1 Backlog.
12. Durante la ejecución del sprint, mover tarjetas a To Do, In Progress, Review y Done según corresponda.
13. Al cierre del sprint, tomar capturas del tablero y del avance para el informe.

## Recomendación de capturas para el informe

- Captura del Product Backlog con las 22 historias visibles o filtradas por sprint.
- Captura del Sprint 1 Backlog con HU21, HU22, HU06, HU07, HU08, HU01, HU02 y HU03.
- Captura del flujo To Do / In Progress / Review / Done durante la ejecución.
- Captura de tarjetas con checklist de criterios de aceptación.
- Captura del burndown chart del Sprint 1 usando los datos de `docs/burndown-data.csv`.

