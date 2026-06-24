create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  role text not null check (role in ('citizen', 'firefighter', 'administrator')),
  phone text,
  created_at timestamptz not null default now()
);

create table if not exists public.incidents (
  id uuid primary key default gen_random_uuid(),
  reporter_name text not null,
  reporter_contact text not null,
  incident_type text not null,
  location text not null,
  severity text not null default 'high' check (severity in ('low', 'medium', 'high', 'critical')),
  description text not null,
  status text not null default 'reported' check (status in ('reported', 'assigned', 'responding', 'contained', 'closed')),
  assigned_unit text,
  response_minutes integer,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  incident_id uuid references public.incidents(id) on delete cascade,
  recipient_role text not null check (recipient_role in ('firefighter', 'administrator')),
  message text not null,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.generated_reports (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  report_details jsonb not null default '{}'::jsonb,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists incidents_set_updated_at on public.incidents;
create trigger incidents_set_updated_at
before update on public.incidents
for each row execute function public.set_updated_at();

create index if not exists incidents_status_idx on public.incidents(status);
create index if not exists incidents_severity_idx on public.incidents(severity);
create index if not exists incidents_created_at_idx on public.incidents(created_at desc);
create index if not exists notifications_incident_id_idx on public.notifications(incident_id);

alter table public.profiles enable row level security;
alter table public.incidents enable row level security;
alter table public.notifications enable row level security;
alter table public.generated_reports enable row level security;

drop policy if exists "Public can submit fire incident reports" on public.incidents;
create policy "Public can submit fire incident reports"
on public.incidents
for insert
to anon, authenticated
with check (true);

drop policy if exists "Authenticated users can view incidents" on public.incidents;
create policy "Authenticated users can view incidents"
on public.incidents
for select
to authenticated
using (true);

drop policy if exists "Responders and admins can update incidents" on public.incidents;
create policy "Responders and admins can update incidents"
on public.incidents
for update
to authenticated
using (
  exists (
    select 1
    from public.profiles
    where profiles.id = auth.uid()
      and profiles.role in ('firefighter', 'administrator')
  )
)
with check (
  exists (
    select 1
    from public.profiles
    where profiles.id = auth.uid()
      and profiles.role in ('firefighter', 'administrator')
  )
);

drop policy if exists "Users can read own profile" on public.profiles;
create policy "Users can read own profile"
on public.profiles
for select
to authenticated
using (id = auth.uid());

drop policy if exists "Admins can manage profiles" on public.profiles;
create policy "Admins can manage profiles"
on public.profiles
for all
to authenticated
using (
  exists (
    select 1
    from public.profiles admin_profile
    where admin_profile.id = auth.uid()
      and admin_profile.role = 'administrator'
  )
)
with check (
  exists (
    select 1
    from public.profiles admin_profile
    where admin_profile.id = auth.uid()
      and admin_profile.role = 'administrator'
  )
);

drop policy if exists "Authenticated users can view notifications" on public.notifications;
create policy "Authenticated users can view notifications"
on public.notifications
for select
to authenticated
using (true);

drop policy if exists "Admins can manage generated reports" on public.generated_reports;
create policy "Admins can manage generated reports"
on public.generated_reports
for all
to authenticated
using (
  exists (
    select 1
    from public.profiles
    where profiles.id = auth.uid()
      and profiles.role = 'administrator'
  )
)
with check (
  exists (
    select 1
    from public.profiles
    where profiles.id = auth.uid()
      and profiles.role = 'administrator'
  )
);
