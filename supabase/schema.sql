create extension if not exists "pgcrypto";

-- Perfiles de usuarios autenticados o registrados para el MVP.
create table if not exists profiles (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid unique,
  full_name text not null,
  email text not null unique,
  role text not null check (role in ('citizen', 'vendor', 'inspector', 'admin')),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Vendedores ambulantes asociados a un perfil de usuario.
create table if not exists vendors (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null unique references profiles(id) on delete cascade,
  document_number text not null unique,
  phone text not null,
  address text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists vendors_profile_id_unique
on vendors(profile_id);

-- Puestos de venta de ceviche de pota registrados para supervision.
create table if not exists stalls (
  id uuid primary key default gen_random_uuid(),
  vendor_id uuid not null references vendors(id) on delete cascade,
  name text not null,
  location_reference text not null,
  district text not null,
  sanitary_status text not null default 'pending'
    check (sanitary_status in ('pending', 'authorized', 'observed', 'suspended', 'closed')),
  is_public boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Licencias municipales asociadas a puestos registrados.
create table if not exists licenses (
  id uuid primary key default gen_random_uuid(),
  stall_id uuid not null references stalls(id) on delete cascade,
  license_number text not null unique,
  issued_at date,
  expires_at date not null,
  status text not null default 'active'
    check (status in ('active', 'expired', 'revoked')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (issued_at is null or expires_at >= issued_at)
);

create unique index if not exists licenses_stall_id_unique
on licenses(stall_id);

-- Reportes ciudadanos de riesgos sanitarios observados.
create table if not exists sanitary_reports (
  id uuid primary key default gen_random_uuid(),
  stall_id uuid references stalls(id) on delete set null,
  reporter_profile_id uuid references profiles(id) on delete set null,
  description text not null,
  risk_type text not null check (risk_type in ('hygiene', 'license', 'cold_chain', 'mislabeling', 'other')),
  status text not null default 'pending'
    check (status in ('pending', 'in_review', 'resolved', 'dismissed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Inspecciones sanitarias realizadas por inspectores municipales.
create table if not exists inspections (
  id uuid primary key default gen_random_uuid(),
  stall_id uuid not null references stalls(id) on delete cascade,
  inspector_profile_id uuid not null references profiles(id) on delete restrict,
  inspection_date date not null default current_date,
  checklist_result jsonb not null default '{}'::jsonb,
  observations text,
  result_status text not null check (result_status in ('authorized', 'observed', 'suspended', 'closed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Evidencias adjuntas a reportes o inspecciones.
create table if not exists evidence_files (
  id uuid primary key default gen_random_uuid(),
  sanitary_report_id uuid references sanitary_reports(id) on delete cascade,
  inspection_id uuid references inspections(id) on delete cascade,
  storage_path text not null,
  file_type text not null check (file_type in ('image', 'document')),
  description text,
  created_at timestamptz not null default now(),
  check (
    sanitary_report_id is not null
    or inspection_id is not null
  )
);

-- Historial auditable de cambios de estado sanitario por puesto.
create table if not exists status_history (
  id uuid primary key default gen_random_uuid(),
  stall_id uuid not null references stalls(id) on delete cascade,
  changed_by_profile_id uuid references profiles(id) on delete set null,
  previous_status text check (previous_status in ('pending', 'authorized', 'observed', 'suspended', 'closed')),
  new_status text not null check (new_status in ('pending', 'authorized', 'observed', 'suspended', 'closed')),
  reason text,
  created_at timestamptz not null default now()
);

-- Avisos internos para vendedores, inspectores o administradores.
create table if not exists internal_notifications (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references profiles(id) on delete cascade,
  stall_id uuid references stalls(id) on delete cascade,
  title text not null,
  message text not null,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists profiles_set_updated_at on profiles;
create trigger profiles_set_updated_at
before update on profiles
for each row execute function set_updated_at();

drop trigger if exists vendors_set_updated_at on vendors;
create trigger vendors_set_updated_at
before update on vendors
for each row execute function set_updated_at();

alter table vendors enable row level security;

drop policy if exists "Vendors can read own vendor data" on vendors;
create policy "Vendors can read own vendor data"
on vendors
for select
to authenticated
using (
  exists (
    select 1
    from profiles
    where profiles.id = vendors.profile_id
      and profiles.auth_user_id = auth.uid()
      and profiles.role = 'vendor'
      and profiles.is_active = true
  )
);

drop policy if exists "Vendors can create own vendor data" on vendors;
create policy "Vendors can create own vendor data"
on vendors
for insert
to authenticated
with check (
  exists (
    select 1
    from profiles
    where profiles.id = vendors.profile_id
      and profiles.auth_user_id = auth.uid()
      and profiles.role = 'vendor'
      and profiles.is_active = true
  )
);

drop trigger if exists stalls_set_updated_at on stalls;
create trigger stalls_set_updated_at
before update on stalls
for each row execute function set_updated_at();

alter table stalls enable row level security;

drop policy if exists "Vendors can read own stalls" on stalls;
create policy "Vendors can read own stalls"
on stalls
for select
to authenticated
using (
  exists (
    select 1
    from vendors
    inner join profiles on profiles.id = vendors.profile_id
    where vendors.id = stalls.vendor_id
      and profiles.auth_user_id = auth.uid()
      and profiles.role = 'vendor'
      and profiles.is_active = true
  )
);

drop policy if exists "Public can read authorized stalls" on stalls;
create policy "Public can read authorized stalls"
on stalls
for select
to anon, authenticated
using (
  is_public = true
  and sanitary_status = 'authorized'
);

drop policy if exists "Vendors can create own stalls" on stalls;
create policy "Vendors can create own stalls"
on stalls
for insert
to authenticated
with check (
  exists (
    select 1
    from vendors
    inner join profiles on profiles.id = vendors.profile_id
    where vendors.id = stalls.vendor_id
      and profiles.auth_user_id = auth.uid()
      and profiles.role = 'vendor'
      and profiles.is_active = true
  )
);

drop trigger if exists licenses_set_updated_at on licenses;
create trigger licenses_set_updated_at
before update on licenses
for each row execute function set_updated_at();

alter table licenses enable row level security;

drop policy if exists "Vendors can read own licenses" on licenses;
create policy "Vendors can read own licenses"
on licenses
for select
to authenticated
using (
  exists (
    select 1
    from stalls
    inner join vendors on vendors.id = stalls.vendor_id
    inner join profiles on profiles.id = vendors.profile_id
    where stalls.id = licenses.stall_id
      and profiles.auth_user_id = auth.uid()
      and profiles.role = 'vendor'
      and profiles.is_active = true
  )
);

drop policy if exists "Public can read licenses for authorized stalls" on licenses;
create policy "Public can read licenses for authorized stalls"
on licenses
for select
to anon, authenticated
using (
  exists (
    select 1
    from stalls
    where stalls.id = licenses.stall_id
      and stalls.is_public = true
      and stalls.sanitary_status = 'authorized'
  )
);

drop policy if exists "Vendors can create own licenses" on licenses;
create policy "Vendors can create own licenses"
on licenses
for insert
to authenticated
with check (
  exists (
    select 1
    from stalls
    inner join vendors on vendors.id = stalls.vendor_id
    inner join profiles on profiles.id = vendors.profile_id
    where stalls.id = licenses.stall_id
      and profiles.auth_user_id = auth.uid()
      and profiles.role = 'vendor'
      and profiles.is_active = true
  )
);

drop policy if exists "Vendors can update own licenses" on licenses;
create policy "Vendors can update own licenses"
on licenses
for update
to authenticated
using (
  exists (
    select 1
    from stalls
    inner join vendors on vendors.id = stalls.vendor_id
    inner join profiles on profiles.id = vendors.profile_id
    where stalls.id = licenses.stall_id
      and profiles.auth_user_id = auth.uid()
      and profiles.role = 'vendor'
      and profiles.is_active = true
  )
)
with check (
  exists (
    select 1
    from stalls
    inner join vendors on vendors.id = stalls.vendor_id
    inner join profiles on profiles.id = vendors.profile_id
    where stalls.id = licenses.stall_id
      and profiles.auth_user_id = auth.uid()
      and profiles.role = 'vendor'
      and profiles.is_active = true
  )
);

drop trigger if exists sanitary_reports_set_updated_at on sanitary_reports;
create trigger sanitary_reports_set_updated_at
before update on sanitary_reports
for each row execute function set_updated_at();

drop trigger if exists inspections_set_updated_at on inspections;
create trigger inspections_set_updated_at
before update on inspections
for each row execute function set_updated_at();
