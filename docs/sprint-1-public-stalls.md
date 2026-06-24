# Sprint 1 - Consulta publica de puestos autorizados

## Historias implementadas

- HU01 - Consultar puestos autorizados.
- HU02 - Filtrar puestos por ubicacion y estado sanitario.
- HU03 - Ver detalle sanitario del puesto.

## Descripcion tecnica

La rama `feature/public-stalls` implementa el modulo publico para consultar puestos autorizados de ceviche de pota. La funcionalidad no requiere inicio de sesion y usa el cliente existente de Supabase para leer solo datos publicos de `stalls` y `licenses`.

## Archivos creados

- `src/lib/public-stalls.ts`
- `src/components/stalls/PublicStallList.tsx`
- `src/components/stalls/StallFilters.tsx`
- `src/components/stalls/StallCard.tsx`
- `src/components/stalls/StallDetail.tsx`
- `src/app/stalls/page.tsx`
- `src/app/stalls/[id]/page.tsx`
- `docs/sprint-1-public-stalls.md`

## Archivos modificados

- `src/types/stall.ts`
- `src/app/page.tsx`
- `supabase/schema.sql`
- `docs/pregunta-4-implementacion.md`

## Flujo de consulta publica

1. El ciudadano ingresa a `/stalls`.
2. La aplicacion consulta puestos con `is_public = true` y `sanitary_status = 'authorized'`.
3. El listado muestra nombre, referencia de ubicacion, distrito, estado sanitario, estado de licencia y fecha de actualizacion.
4. El ciudadano puede filtrar por texto de ubicacion o distrito.
5. El ciudadano puede filtrar por estado sanitario visible.
6. Desde cada tarjeta puede abrir `/stalls/[id]`.
7. El detalle muestra ubicacion, distrito, estado sanitario y licencia municipal si existe.
8. Si no hay licencia visible, se muestra un mensaje de informacion sanitaria insuficiente.

## Filtros implementados

- Texto de ubicacion: busca en `location_reference` y `district`.
- Estado sanitario: usa los estados publicos disponibles. En esta version se publica `authorized`.
- Boton para limpiar filtros.

La busqueda se realiza en cliente porque el volumen esperado para el MVP academico es bajo.

## Detalle sanitario del puesto

La pagina `/stalls/[id]` muestra:

- Nombre del puesto.
- Referencia de ubicacion.
- Distrito.
- Estado sanitario.
- Numero de licencia, fecha de emision, fecha de vencimiento y estado, cuando existe.
- Mensaje si no hay licencia publicada.
- Boton para volver al listado.

## Relacion con Supabase

La consulta publica usa:

- `stalls.id`
- `stalls.name`
- `stalls.location_reference`
- `stalls.district`
- `stalls.sanitary_status`
- `stalls.is_public`
- `stalls.updated_at`
- `licenses.license_number`
- `licenses.issued_at`
- `licenses.expires_at`
- `licenses.status`

El esquema agrega politicas RLS de solo lectura para `anon` y `authenticated`, limitadas a puestos publicos y autorizados. Las licencias solo se leen si pertenecen a un puesto publico autorizado.

## Validaciones aplicadas

- La consulta principal oculta puestos no publicos.
- La consulta principal oculta puestos no autorizados.
- El detalle tambien valida que el puesto sea publico y autorizado.
- Los filtros manejan resultados encontrados y sin coincidencias.
- Los errores de consulta muestran mensaje controlado.

## Consideraciones de privacidad

No se muestran:

- Documento del vendedor.
- Telefono del vendedor.
- Correo del vendedor.
- ID interno de perfiles o usuarios de Supabase.
- Observaciones privadas de inspeccion.
- Datos internos de administracion.

Solo se expone informacion util para el ciudadano: nombre del puesto, ubicacion, distrito, estado sanitario y licencia publica.

## Pruebas manuales

1. Usuario no autenticado entra a `/stalls`: debe ver la consulta publica.
2. Usuario autenticado entra a `/stalls`: debe ver la misma consulta publica.
3. La lista muestra solo puestos con `is_public = true` y `sanitary_status = 'authorized'`.
4. Puestos no autorizados o no publicos no aparecen.
5. Filtro por ubicacion o distrito devuelve resultados correctos.
6. Filtro por estado sanitario devuelve resultados correctos.
7. Combinacion de filtros mantiene claridad visual.
8. Sin coincidencias, se muestra estado vacio.
9. El usuario puede abrir el detalle desde una tarjeta.
10. El detalle muestra licencia y estado sanitario si existen.
11. El detalle maneja puestos sin licencia visible.
12. El detalle no expone datos sensibles del vendedor.
13. El boton volver regresa a `/stalls`.
14. `npm run build` finaliza correctamente.

## Evidencias sugeridas

- Captura de `/stalls` con listado de puestos autorizados.
- Captura de filtro por ubicacion.
- Captura de filtro por estado sanitario.
- Captura de estado vacio sin resultados.
- Captura de detalle sanitario del puesto.
- Captura de detalle mostrando licencia.
- Captura de detalle sin exposicion de datos sensibles.
- Captura del Pull Request de `feature/public-stalls` hacia `develop`.
- Captura de checks aprobados del PR.
- Captura de terminal con `npm run build` exitoso.

## Cumplimiento de criterios de aceptacion

- HU01: lista de puestos autorizados con nombre, ubicacion y estado sanitario: cumplido.
- HU01: puestos no autorizados no aparecen en la consulta principal: cumplido.
- HU02: filtro por texto de ubicacion: cumplido.
- HU02: filtro por estado sanitario disponible: cumplido.
- HU02: resultados se actualizan con estados vacios claros: cumplido.
- HU03: detalle accesible desde listado: cumplido.
- HU03: detalle muestra licencia, ubicacion y estado sanitario: cumplido.
- HU03: mensaje si no existe informacion sanitaria suficiente: cumplido.
