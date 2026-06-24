# Sprint 1 - Registro de puesto ambulante

## Historia implementada

HU07 - Registrar puesto ambulante.

Como Vendedor, quiero registrar la ubicacion y caracteristicas de mi puesto, para que pueda ser evaluado por la municipalidad.

## Descripcion tecnica

La rama `feature/stall-registration` implementa el flujo para que un usuario autenticado con rol `vendor` registre puestos ambulantes asociados a su registro de vendedor. La funcionalidad reutiliza `ProtectedRoute`, `getVendorByProfileId` y el cliente existente de Supabase, sin usar `SUPABASE_SERVICE_ROLE_KEY` en el frontend.

## Archivos creados

- `src/types/stall.ts`
- `src/lib/stalls.ts`
- `src/components/stalls/StallRegistrationForm.tsx`
- `src/app/vendor/stalls/new/page.tsx`
- `src/app/dashboard/vendor/stalls/page.tsx`
- `docs/sprint-1-stall-registration.md`

## Archivos modificados

- `src/lib/roles.ts`
- `src/app/dashboard/vendor/page.tsx`
- `supabase/schema.sql`
- `docs/pregunta-4-implementacion.md`

## Flujo de registro de puesto

1. El usuario inicia sesion con Supabase Auth.
2. La aplicacion carga su perfil desde `profiles`.
3. La ruta `/vendor/stalls/new` permite acceso solo al rol `vendor`.
4. La aplicacion verifica que exista un registro en `vendors` para el perfil autenticado.
5. Si no existe vendedor asociado, muestra el mensaje “Primero debes registrar tus datos de vendedor”.
6. Si existe vendedor asociado, muestra el formulario de puesto.
7. El vendedor registra nombre, referencia de ubicacion y distrito.
8. La aplicacion inserta el puesto en `stalls` con el `vendor_id` del vendedor autenticado.
9. El puesto inicia con `sanitary_status = 'pending'` e `is_public = false`.
10. El vendedor puede consultar sus puestos desde `/dashboard/vendor/stalls`.

## Relacion con Supabase

La tabla `stalls` se relaciona con `vendors` mediante `stalls.vendor_id`. El flujo obtiene primero el vendedor por `profiles.id` y luego usa `vendors.id` para insertar y listar puestos.

Campos usados:

- `vendor_id`
- `name`
- `location_reference`
- `district`
- `sanitary_status`
- `is_public`

El esquema actual no incluye un campo separado para descripcion o caracteristicas del puesto. Por eso la implementacion guarda la referencia textual principal en `location_reference` y mantiene el alcance del MVP sin modificar el modelo de datos fuera de HU07.

El esquema tambien incluye politicas RLS para que usuarios autenticados con rol `vendor` lean e inserten solo puestos asociados a su propio registro de vendedor.

## Validaciones aplicadas

- Nombre del puesto obligatorio.
- Referencia de ubicacion obligatoria.
- Distrito obligatorio.
- Verificacion previa de que exista un vendedor asociado al perfil autenticado.
- Asociacion del puesto solo con el `vendor_id` del vendedor autenticado.
- Estado inicial permitido por el `CHECK` de base de datos: `pending`.
- Visibilidad inicial no publica: `is_public = false`.

## Pruebas manuales

1. Usuario sin sesion intentando entrar a `/vendor/stalls/new`: debe redirigir a `/login`.
2. Usuario con rol `citizen` intentando entrar a `/vendor/stalls/new`: debe redirigir a `/unauthorized`.
3. Usuario con rol `vendor` sin registro en `vendors`: debe ver el mensaje “Primero debes registrar tus datos de vendedor”.
4. Usuario con rol `vendor` y registro de vendedor: debe ver el formulario.
5. Envio del formulario con campos vacios: debe mostrar mensajes de validacion.
6. Registro exitoso de puesto: debe mostrar confirmacion visual.
7. Verificacion en Supabase: el puesto debe tener el `vendor_id` correcto.
8. Verificacion de estado sanitario inicial: `sanitary_status = 'pending'`.
9. Consulta del puesto creado desde Supabase: debe existir en `stalls`.
10. Visualizacion de `/dashboard/vendor/stalls`: debe mostrar el listado de puestos del vendedor.

## Evidencias sugeridas

- Captura del formulario de registro de puesto.
- Captura de validacion de campos obligatorios.
- Captura del mensaje cuando el vendedor no tiene datos registrados.
- Captura del registro exitoso de puesto.
- Captura de datos guardados en Supabase.
- Captura del listado de puestos del vendedor.
- Captura del Pull Request de `feature/stall-registration` hacia `develop`.
- Captura de checks aprobados del PR.
- Captura de terminal con `npm run build` exitoso.

## Cumplimiento de criterios de aceptacion

- El vendedor registra direccion o referencia de ubicacion del puesto: cumplido mediante `location_reference`.
- El puesto queda asociado a un vendedor existente: cumplido mediante `stalls.vendor_id`.
- El puesto inicia con estado sanitario pendiente: cumplido mediante `sanitary_status = 'pending'`.
- Usuario sin sesion no accede al formulario: cumplido mediante `ProtectedRoute`.
- Usuario con otro rol no registra puestos: cumplido mediante `allowedRoles`.
- Usuario vendedor sin registro en `vendors` recibe mensaje controlado: cumplido.
- Se muestra listado basico de puestos del vendedor: cumplido.
