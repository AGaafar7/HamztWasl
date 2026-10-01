-- 0011_subscription_expires.sql
-- Adds a single column to profiles that tracks when the user's
-- subscription lapses. NULL or a date in the past = not subscribed.

alter table public.profiles
  add column if not exists subscription_expires_at timestamptz;

create index if not exists profiles_sub_expires_idx
  on public.profiles (subscription_expires_at)
  where subscription_expires_at is not null;