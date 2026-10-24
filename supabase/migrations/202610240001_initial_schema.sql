begin;

create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid unique references auth.users(id) on delete set null,
  full_name text not null,
  role text not null default 'owner' check (role in ('owner', 'admin', 'editor')),
  public_title text,
  email text,
  phone text,
  bio text,
  avatar_path text,
  specialties text[] not null default '{}',
  is_public boolean not null default false,
  is_active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.developers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  website_url text,
  is_featured boolean not null default true,
  is_active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.developer_assets (
  id uuid primary key default gen_random_uuid(),
  developer_id uuid not null references public.developers(id) on delete cascade,
  asset_type text not null check (asset_type in ('logo', 'image', 'brochure', 'document')),
  storage_path text not null,
  file_name text not null,
  mime_type text,
  title text,
  alt_text text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.properties (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  developer_id uuid references public.developers(id) on delete set null,
  managed_by uuid references public.profiles(id) on delete set null,
  location_key text not null check (location_key in ('sargasan', 'kudasan', 'raysan', 'gift_city', 'pdeu_palm_road')),
  location_label text not null,
  address text,
  property_type text not null default 'Apartment',
  listing_status text not null default 'draft' check (listing_status in ('draft', 'published', 'sold', 'archived')),
  description text,
  price_min numeric(14,2),
  price_max numeric(14,2),
  bedrooms_min smallint,
  bedrooms_max smallint,
  bathrooms smallint,
  area_min_sqft integer,
  area_max_sqft integer,
  rera_number text,
  is_featured boolean not null default false,
  sort_order integer not null default 0,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (price_min is null or price_min >= 0),
  check (price_max is null or price_max >= coalesce(price_min, 0)),
  check (area_max_sqft is null or area_max_sqft >= coalesce(area_min_sqft, 0)),
  check (bedrooms_max is null or bedrooms_max >= coalesce(bedrooms_min, 0))
);

create table if not exists public.property_assets (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.properties(id) on delete cascade,
  asset_type text not null check (asset_type in ('portrait_image', 'landscape_image', 'gallery_image', 'floor_plan', 'brochure_pdf', 'video')),
  storage_path text not null,
  file_name text not null,
  mime_type text,
  alt_text text,
  is_cover boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.property_features (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.properties(id) on delete cascade,
  name text not null,
  sort_order integer not null default 0
);

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  inquiry_type text not null check (inquiry_type in ('contact', 'property_inquiry', 'whatsapp')),
  property_id uuid references public.properties(id) on delete set null,
  assigned_to uuid references public.profiles(id) on delete set null,
  name text not null,
  email text,
  phone text,
  subject text,
  message text,
  status text not null default 'new' check (status in ('new', 'contacted', 'qualified', 'visit_booked', 'won', 'lost')),
  source text not null default 'website',
  follow_up_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (coalesce(nullif(trim(email), ''), nullif(trim(phone), '')) is not null)
);

create table if not exists public.lead_notes (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads(id) on delete cascade,
  author_id uuid not null references public.profiles(id) on delete restrict,
  note text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.clients (
  id uuid primary key default gen_random_uuid(),
  source_lead_id uuid unique references public.leads(id) on delete set null,
  name text not null,
  email text,
  phone text not null,
  billing_address text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.invoices (
  id uuid primary key default gen_random_uuid(),
  invoice_number text not null unique,
  client_id uuid not null references public.clients(id) on delete restrict,
  property_id uuid references public.properties(id) on delete set null,
  status text not null default 'draft' check (status in ('draft', 'issued', 'partially_paid', 'paid', 'cancelled')),
  issue_date date not null default current_date,
  due_date date,
  billing_name text not null,
  billing_phone text not null,
  billing_address text,
  notes text,
  created_by uuid not null references public.profiles(id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.invoice_items (
  id uuid primary key default gen_random_uuid(),
  invoice_id uuid not null references public.invoices(id) on delete cascade,
  particulars text not null,
  details text,
  quantity numeric(10,2) not null default 1 check (quantity > 0),
  unit_amount numeric(14,2) not null default 0 check (unit_amount >= 0),
  sort_order integer not null default 0
);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  invoice_id uuid not null references public.invoices(id) on delete cascade,
  amount numeric(14,2) not null check (amount > 0),
  payment_mode text not null check (payment_mode in ('cash', 'upi', 'bank_transfer', 'cheque')),
  reference_number text,
  paid_at timestamptz not null default now(),
  recorded_by uuid not null references public.profiles(id) on delete restrict,
  notes text
);

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text,
  content text not null,
  rating smallint not null default 5 check (rating between 1 and 5),
  image_path text,
  is_approved boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists properties_public_idx on public.properties(listing_status, sort_order, published_at desc);
create index if not exists properties_location_idx on public.properties(location_key);
create index if not exists property_assets_property_idx on public.property_assets(property_id, sort_order);
create index if not exists property_features_property_idx on public.property_features(property_id, sort_order);
create index if not exists leads_status_created_idx on public.leads(status, created_at desc);
create index if not exists invoices_client_idx on public.invoices(client_id, issue_date desc);
create index if not exists invoice_items_invoice_idx on public.invoice_items(invoice_id);
create index if not exists payments_invoice_idx on public.payments(invoice_id);

create trigger profiles_updated_at before update on public.profiles for each row execute function public.set_updated_at();
create trigger developers_updated_at before update on public.developers for each row execute function public.set_updated_at();
create trigger properties_updated_at before update on public.properties for each row execute function public.set_updated_at();
create trigger leads_updated_at before update on public.leads for each row execute function public.set_updated_at();
create trigger clients_updated_at before update on public.clients for each row execute function public.set_updated_at();
create trigger invoices_updated_at before update on public.invoices for each row execute function public.set_updated_at();
create trigger testimonials_updated_at before update on public.testimonials for each row execute function public.set_updated_at();

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where user_id = auth.uid()
      and is_active = true
      and role in ('owner', 'admin', 'editor')
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;

create or replace view public.invoice_totals
with (security_invoker = true)
as
select
  i.id as invoice_id,
  coalesce(items.total, 0)::numeric(14,2) as total,
  coalesce(payments.received, 0)::numeric(14,2) as received,
  greatest(coalesce(items.total, 0) - coalesce(payments.received, 0), 0)::numeric(14,2) as balance
from public.invoices i
left join (
  select invoice_id, sum(quantity * unit_amount) as total
  from public.invoice_items group by invoice_id
) items on items.invoice_id = i.id
left join (
  select invoice_id, sum(amount) as received
  from public.payments group by invoice_id
) payments on payments.invoice_id = i.id;

alter table public.profiles enable row level security;
alter table public.developers enable row level security;
alter table public.developer_assets enable row level security;
alter table public.properties enable row level security;
alter table public.property_assets enable row level security;
alter table public.property_features enable row level security;
alter table public.leads enable row level security;
alter table public.lead_notes enable row level security;
alter table public.clients enable row level security;
alter table public.invoices enable row level security;
alter table public.invoice_items enable row level security;
alter table public.payments enable row level security;
alter table public.testimonials enable row level security;

create policy "public profiles are readable" on public.profiles for select using (is_public and is_active);
create policy "admins manage profiles" on public.profiles for all using (public.is_admin()) with check (public.is_admin());
create policy "active developers are readable" on public.developers for select using (is_active);
create policy "admins manage developers" on public.developers for all using (public.is_admin()) with check (public.is_admin());
create policy "active developer assets are readable" on public.developer_assets for select using (exists (select 1 from public.developers d where d.id = developer_id and d.is_active));
create policy "admins manage developer assets" on public.developer_assets for all using (public.is_admin()) with check (public.is_admin());
create policy "published properties are readable" on public.properties for select using (listing_status = 'published');
create policy "admins manage properties" on public.properties for all using (public.is_admin()) with check (public.is_admin());
create policy "published property assets are readable" on public.property_assets for select using (exists (select 1 from public.properties p where p.id = property_id and p.listing_status = 'published'));
create policy "admins manage property assets" on public.property_assets for all using (public.is_admin()) with check (public.is_admin());
create policy "published property features are readable" on public.property_features for select using (exists (select 1 from public.properties p where p.id = property_id and p.listing_status = 'published'));
create policy "admins manage property features" on public.property_features for all using (public.is_admin()) with check (public.is_admin());
create policy "visitors submit leads" on public.leads for insert to anon, authenticated with check (status = 'new' and assigned_to is null);
create policy "admins manage leads" on public.leads for all using (public.is_admin()) with check (public.is_admin());
create policy "admins manage lead notes" on public.lead_notes for all using (public.is_admin()) with check (public.is_admin());
create policy "admins manage clients" on public.clients for all using (public.is_admin()) with check (public.is_admin());
create policy "admins manage invoices" on public.invoices for all using (public.is_admin()) with check (public.is_admin());
create policy "admins manage invoice items" on public.invoice_items for all using (public.is_admin()) with check (public.is_admin());
create policy "admins manage payments" on public.payments for all using (public.is_admin()) with check (public.is_admin());
create policy "approved testimonials are readable" on public.testimonials for select using (is_approved);
create policy "admins manage testimonials" on public.testimonials for all using (public.is_admin()) with check (public.is_admin());

grant usage on schema public to anon, authenticated;
grant select on public.profiles, public.developers, public.developer_assets, public.properties, public.property_assets, public.property_features, public.testimonials to anon;
grant insert on public.leads to anon;
grant all on public.profiles, public.developers, public.developer_assets, public.properties, public.property_assets, public.property_features, public.leads, public.lead_notes, public.clients, public.invoices, public.invoice_items, public.payments, public.testimonials to authenticated;
grant select on public.invoice_totals to authenticated;

insert into storage.buckets (id, name, public)
values
  ('developer-assets', 'developer-assets', true),
  ('property-assets', 'property-assets', true),
  ('profile-images', 'profile-images', true),
  ('testimonial-images', 'testimonial-images', true),
  ('invoice-documents', 'invoice-documents', false)
on conflict (id) do update set public = excluded.public;

create policy "public media is readable"
on storage.objects for select
using (bucket_id in ('developer-assets', 'property-assets', 'profile-images', 'testimonial-images'));

create policy "admins upload media"
on storage.objects for insert to authenticated
with check (bucket_id in ('developer-assets', 'property-assets', 'profile-images', 'testimonial-images', 'invoice-documents') and public.is_admin());

create policy "admins update media"
on storage.objects for update to authenticated
using (public.is_admin()) with check (public.is_admin());

create policy "admins delete media"
on storage.objects for delete to authenticated
using (public.is_admin());

commit;
