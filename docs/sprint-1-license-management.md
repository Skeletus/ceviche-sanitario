# Sprint 1 - Gestion de licencia municipal

## Historia implementada

HU08 - Cargar y actualizar licencia municipal.

Como Vendedor, quiero cargar y actualizar mi licencia municipal, para demostrar que mi puesto cuenta con autorizacion vigente.

## Descripcion tecnica

La rama `feature/license-management` implementa el flujo para registrar y actualizar licencias municipales de puestos asociados al vendedor autenticado. La solucion reutiliza `ProtectedRoute`, `getVendorByProfileId`, `getStallsByVendorId` y el cliente existente de Supabase, sin usar `SUPABASE_SERVICE_ROLE_KEY` en el frontend.

## Archivos creados

- `src/types/license.ts`
- `src/lib/licenses.ts`
- `src/components/licenses/LicenseManagementPanel.tsx`
- `src/app/vendor/licenses/page.tsx`
- `src/app/vendor/licenses/new/page.tsx`
- `src/app/dashboard/vendor/licenses/page.tsx`
- `docs/sprint-1-license-management.md`

## Archivos modificados

- `src/lib/roles.ts`
- `src/app/dashboard/vendor/page.tsx`
- `supabase/schema.sql`
- `docs/pregunta-4-implementacion.md`

## Flujo de registro y actualizacion de licencia

1. El usuario inicia sesion con Supabase Auth.
2. La aplicacion carga su perfil desde `profiles`.
3. Las rutas de licencia permiten acceso solo al rol `vendor`.
4. La aplicacion verifica que exista un registro en `vendors` para el perfil autenticado.
5. Si no existe vendedor asociado, muestra el mensaje "Primero debes registrar tus datos de vendedor".
6. Si el vendedor no tiene puestos, muestra el mensaje "Primero debes registrar un puesto antes de cargar una licencia".
7. Si existen puestos, el formulario permite seleccionar uno de los puestos del vendedor.
8. El vendedor registra numero de licencia, fecha de emision, fecha de vencimiento y estado.
9. Si el puesto no tiene licencia, se inserta un registro en `licenses`.
10. Si el puesto ya tiene licencia, se actualiza el registro existente.
11. El listado muestra las licencias registradas con nombre del puesto, estado de licencia y estado sanitario del puesto.

## Relacion con Supabase

La tabla `licenses` se relaciona con `stalls` mediante `licenses.stall_id`. Como `stalls` se relaciona con `vendors`, el flujo permite validar que una licencia solo se gestione para puestos pertenecientes al vendedor autenticado.

Campos usados:

- `stall_id`
- `license_number`
- `issued_at`
- `expires_at`
- `status`

Valores permitidos para `status` segun el esquema SQL:

- `active`
- `expired`
- `revoked`

Para el MVP se definio una licencia por puesto. El esquema agrega un indice unico sobre `licenses.stall_id` para evitar duplicados innecesarios y el helper `saveLicense` actualiza la licencia existente cuando corresponde.

El esquema tambien incluye politicas RLS para que usuarios autenticados con rol `vendor` lean, inserten y actualicen solo licencias asociadas a sus propios puestos.

## Validaciones aplicadas

- Puesto obligatorio.
- Numero de licencia obligatorio.
- Fecha de vencimiento obligatoria.
- Fecha de emision opcional, pero no puede ser posterior a la fecha de vencimiento.
- Estado de licencia compatible con el `CHECK` de base de datos.
- Selector limitado a puestos del vendedor autenticado.
- Actualizacion de licencia existente por puesto, sin crear duplicados.

## Pruebas manuales

1. Usuario sin sesion intentando entrar a `/vendor/licenses`: debe redirigir a `/login`.
2. Usuario con rol `citizen` intentando entrar a `/vendor/licenses`: debe redirigir a `/unauthorized`.
3. Usuario con rol `vendor` sin datos de vendedor: debe ver el mensaje para registrar datos de vendedor.
4. Usuario con rol `vendor` sin puesto: debe ver el mensaje para registrar un puesto primero.
5. Usuario con rol `vendor` y puesto registrado: debe ver el formulario.
6. Envio del formulario con campos vacios: debe mostrar mensajes de validacion.
7. Registro exitoso de licencia: debe mostrar confirmacion visual.
8. Actualizacion exitosa de licencia existente: debe mostrar confirmacion visual.
9. Verificacion en Supabase: la licencia debe tener el `stall_id` correcto.
10. Verificacion de seguridad: un vendedor no debe poder editar licencias de puestos ajenos por RLS.
11. Consulta en Supabase: la licencia debe existir en `licenses`.
12. Visualizacion de `/dashboard/vendor/licenses`: debe mostrar el listado de licencias del vendedor.

## Evidencias sugeridas

- Captura del formulario de licencia municipal.
- Captura del selector de puesto.
- Captura de validacion de campos obligatorios.
- Captura del mensaje cuando el vendedor no tiene puesto registrado.
- Captura del registro exitoso de licencia.
- Captura de actualizacion exitosa de licencia.
- Captura de datos guardados en Supabase.
- Captura del listado de licencias del vendedor.
- Captura del Pull Request de `feature/license-management` hacia `develop`.
- Captura de checks aprobados del PR.
- Captura de terminal con `npm run build` exitoso.

## Cumplimiento de criterios de aceptacion

- El vendedor registra numero de licencia y fecha de vencimiento: cumplido.
- El sistema permite actualizar la licencia asociada al puesto: cumplido.
- La licencia queda visible para validacion sanitaria posterior: cumplido mediante helper y listado con datos de puesto.
- Usuario sin sesion no accede: cumplido mediante `ProtectedRoute`.
- Usuario con otro rol no gestiona licencias: cumplido mediante `allowedRoles`.
- Usuario sin vendedor o sin puesto recibe mensaje controlado: cumplido.
- Se evita editar puestos ajenos: cumplido por selector filtrado y politicas RLS.
