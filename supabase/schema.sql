-- Maestro — Supabase schema
-- Optional for the demo: the app runs on in-repo seed data when Supabase is not
-- configured. Run this in the Supabase SQL editor to back the app with a real DB.
-- Localized text columns store JSON like {"es": "...", "en": "..."}.

create table if not exists trades (
  id text primary key,
  slug text unique not null,
  name jsonb not null,
  description jsonb not null,
  icon text not null,
  color text not null
);

create table if not exists sub_categories (
  id text primary key,
  trade_id text not null references trades(id) on delete cascade,
  name jsonb not null
);

create table if not exists service_items (
  id text primary key,
  sub_category_id text not null references sub_categories(id) on delete cascade,
  trade_id text not null references trades(id) on delete cascade,
  name jsonb not null,
  description jsonb not null,
  base_price integer not null,
  duration_min integer not null
);

create table if not exists handymen (
  id text primary key,
  name text not null,
  trade_id text not null references trades(id) on delete cascade,
  avatar text not null,
  bio jsonb not null,
  specialties jsonb not null,
  district text not null,
  service_areas jsonb not null,
  years_experience integer not null,
  rating numeric(2,1) not null,
  review_count integer not null,
  jobs_done integer not null,
  responds_in_min integer not null,
  verified boolean not null default true
);

create table if not exists bookings (
  id text primary key,
  service_item_id text not null references service_items(id),
  handyman_id text not null references handymen(id),
  customer_name text not null,
  customer_phone text not null,
  address text not null,
  district text not null,
  date date not null,
  time text not null,
  notes text default '',
  service_price integer not null,
  platform_fee integer not null,
  total integer not null,
  status text not null default 'confirmed',
  created_at timestamptz not null default now()
);

create table if not exists reviews (
  id text primary key,
  handyman_id text not null references handymen(id) on delete cascade,
  author text not null,
  rating integer not null,
  comment jsonb not null,
  date date not null
);

create table if not exists chat_messages (
  id text primary key,
  booking_id text not null references bookings(id) on delete cascade,
  sender text not null,
  body text not null,
  created_at timestamptz not null default now()
);

create table if not exists payments (
  id text primary key,
  booking_id text not null references bookings(id) on delete cascade,
  amount integer not null,
  provider text not null default 'culqi',
  status text not null default 'paid',
  reference text not null,
  created_at timestamptz not null default now()
);
