create extension if not exists pgcrypto;

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null unique,
  kind text not null check (kind in ('contact', 'audit')),
  name text not null check (char_length(name) between 2 and 80),
  email text not null check (char_length(email) <= 254),
  phone text not null check (char_length(phone) between 7 and 32),
  website_url text,
  source_path text not null default '/',
  status text not null default 'new' check (status in ('new', 'contacted', 'closed')),
  notification_status text not null default 'pending'
    check (notification_status in ('pending', 'sent', 'failed')),
  notification_provider_id text,
  notification_error_code text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint audit_requires_website check (
    kind <> 'audit' or website_url is not null
  )
);

create index if not exists leads_created_at_idx
  on public.leads (created_at desc);

create index if not exists leads_status_created_at_idx
  on public.leads (status, created_at desc);

alter table public.leads enable row level security;

revoke all on table public.leads from anon, authenticated;
grant select, insert, update on table public.leads to service_role;

create or replace function public.set_leads_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_leads_updated_at on public.leads;
create trigger set_leads_updated_at
before update on public.leads
for each row execute function public.set_leads_updated_at();
