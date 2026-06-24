insert into profiles (id, full_name, email, role)
values
  ('00000000-0000-0000-0000-000000000001', 'Ana Ciudadana', 'ana.ciudadana@example.com', 'citizen'),
  ('00000000-0000-0000-0000-000000000002', 'Carlos Vendedor', 'carlos.vendedor@example.com', 'vendor'),
  ('00000000-0000-0000-0000-000000000003', 'Rosa Inspectora', 'rosa.inspectora@example.com', 'inspector'),
  ('00000000-0000-0000-0000-000000000004', 'Mario Administrador', 'mario.admin@example.com', 'admin')
on conflict (id) do nothing;

insert into vendors (id, profile_id, document_number, phone, address)
values (
  '10000000-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000002',
  'DNI-45678912',
  '987654321',
  'Av. Principal 120, Lima'
)
on conflict (document_number) do nothing;

insert into stalls (id, vendor_id, name, location_reference, district, sanitary_status, is_public)
values
  (
    '20000000-0000-0000-0000-000000000001',
    '10000000-0000-0000-0000-000000000001',
    'Ceviche de Pota Carlos',
    'Frente al mercado municipal',
    'Lima Cercado',
    'authorized',
    true
  ),
  (
    '20000000-0000-0000-0000-000000000002',
    '10000000-0000-0000-0000-000000000001',
    'Pota al Paso',
    'Esquina de Jr. Salud con Av. Central',
    'Lima Cercado',
    'observed',
    false
  )
on conflict (id) do nothing;

insert into licenses (id, stall_id, license_number, issued_at, expires_at, status)
values (
  '30000000-0000-0000-0000-000000000001',
  '20000000-0000-0000-0000-000000000001',
  'LIC-MUN-2026-001',
  '2026-01-10',
  '2026-12-31',
  'active'
)
on conflict (license_number) do nothing;

insert into sanitary_reports (id, stall_id, reporter_profile_id, description, risk_type, status)
values (
  '40000000-0000-0000-0000-000000000001',
  '20000000-0000-0000-0000-000000000002',
  '00000000-0000-0000-0000-000000000001',
  'Se observo manipulacion de pota sin cadena de frio visible.',
  'cold_chain',
  'pending'
)
on conflict (id) do nothing;

insert into inspections (id, stall_id, inspector_profile_id, inspection_date, checklist_result, observations, result_status)
values (
  '50000000-0000-0000-0000-000000000001',
  '20000000-0000-0000-0000-000000000002',
  '00000000-0000-0000-0000-000000000003',
  '2026-06-20',
  '{"higiene": false, "cadena_frio": false, "licencia_visible": true}',
  'Se requiere corregir conservacion en frio y limpieza del area.',
  'observed'
)
on conflict (id) do nothing;

insert into status_history (id, stall_id, changed_by_profile_id, previous_status, new_status, reason)
values (
  '60000000-0000-0000-0000-000000000001',
  '20000000-0000-0000-0000-000000000002',
  '00000000-0000-0000-0000-000000000003',
  'pending',
  'observed',
  'Resultado de inspeccion con observaciones sanitarias.'
)
on conflict (id) do nothing;

insert into internal_notifications (id, profile_id, stall_id, title, message, is_read)
values (
  '70000000-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000002',
  '20000000-0000-0000-0000-000000000002',
  'Observacion sanitaria registrada',
  'Debe corregir la cadena de frio y solicitar nueva revision municipal.',
  false
)
on conflict (id) do nothing;
