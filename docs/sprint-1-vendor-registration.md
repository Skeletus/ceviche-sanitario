# Sprint 1 - Registro de vendedor

## Historia implementada

HU06 - Registrar datos de vendedor.

Como Vendedor, quiero registrar mis datos de identificacion y contacto, para iniciar mi proceso de formalizacion sanitaria.

## Descripcion tecnica

La rama `feature/vendor-registration` implementa el flujo para que un usuario autenticado con rol `vendor` registre sus datos operativos de vendedor. El acceso se controla con `ProtectedRoute` y los datos se guardan en Supabase PostgreSQL usando el cliente existente de `src/lib/supabase.ts`, sin usar `SUPABASE_SERVICE_ROLE_KEY` en el frontend.

## Archivos creados

- `src/types/vendor.ts`
- `src/lib/vendors.ts`
- `src/components/vendor/VendorRegistrationForm.tsx`
- `src/app/vendor/register/page.tsx`
- `src/app/dashboard/vendor/page.tsx`
- `docs/sprint-1-vendor-registration.md`

## Archivos modificados

- `src/lib/roles.ts`
- `supabase/schema.sql`
- `docs/pregunta-4-implementacion.md`

## Flujo de registro de vendedor

1. El usuario inicia sesion con Supabase Auth.
2. La aplicacion carga su perfil desde `profiles`.
3. La ruta `/vendor/register` permite acceso solo al rol `vendor`.
4. El formulario muestra nombre y correo desde `profiles`.
5. El vendedor registra documento, telefono y direccion o referencia.
6. Antes de insertar, la aplicacion consulta si ya existe un registro en `vendors` para el `profile_id` autenticado.
7. Si no existe, inserta el registro en `vendors`.
8. Si ya existe, muestra los datos y evita crear duplicados.

## Relacion con Supabase

La tabla `vendors` se relaciona con `profiles` mediante `vendors.profile_id`. Para reforzar la regla de negocio, el esquema deja `profile_id` como unico, de modo que un perfil autenticado tenga como maximo un registro de vendedor.

Campos usados:

- `profile_id`
- `document_number`
- `phone`
- `address`

El esquema tambien incluye politicas RLS para permitir que usuarios autenticados con rol `vendor` lean e inserten solo su propio registro de vendedor. Estas politicas dependen de que `profiles.auth_user_id` este vinculado con `auth.users.id`.

## Pruebas manuales

1. Usuario sin sesion intentando entrar a `/vendor/register`: debe redirigir a `/login`.
2. Usuario con rol `citizen` intentando entrar a `/vendor/register`: debe redirigir a `/unauthorized`.
3. Usuario con rol `vendor` entrando a `/vendor/register`: debe ver el formulario.
4. Envio del formulario con campos vacios: debe mostrar mensajes de validacion.
5. Registro exitoso de vendedor: debe mostrar confirmacion visual.
6. Consulta en Supabase: debe existir una fila en `vendors` con el `profile_id` del usuario autenticado.
7. Reingreso a `/vendor/register`: debe mostrar los datos existentes y no crear duplicado.
8. Visualizacion de `/dashboard/vendor`: debe mostrar nombre, rol, estado del registro y datos guardados.

## Evidencias sugeridas

- Captura del formulario de registro de vendedor.
- Captura de validacion de campos obligatorios.
- Captura del registro exitoso.
- Captura de datos guardados en Supabase.
- Captura del dashboard de vendedor mostrando datos.
- Captura del Pull Request de `feature/vendor-registration` hacia `develop`.
- Captura de checks aprobados del PR.
- Captura de terminal con `npm run build` exitoso.

## Cumplimiento de criterios de aceptacion

- El vendedor registra documento, telefono y direccion o referencia obligatoria: cumplido.
- El sistema valida campos requeridos antes de guardar: cumplido.
- El vendedor registrado queda vinculado al perfil autenticado: cumplido mediante `vendors.profile_id`.
- Usuario sin sesion no accede al formulario: cumplido mediante `ProtectedRoute`.
- Usuario con otro rol no registra datos de vendedor: cumplido mediante `allowedRoles`.
- Se evita duplicar registro: cumplido con consulta previa y unicidad por `profile_id`.
