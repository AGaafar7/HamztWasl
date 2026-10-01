alter table public.profiles
  add column if not exists subscription_cancelled boolean not null default false;