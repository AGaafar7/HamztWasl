-- 0008_letter_vocabulary_and_expressions.sql
-- Adds two new content tables for the letter detail page:
--   letter_vocabulary  — additional words containing the letter (any position)
--   letter_expressions — short beginner expressions containing the letter

create table if not exists public.letter_vocabulary (
  id              uuid primary key default gen_random_uuid(),
  letter_id       text not null references public.letters(id) on delete cascade,
  sort_order      int  not null default 0,
  arabic          text not null,
  transliteration text,
  meaning         text,
  created_at      timestamptz not null default now()
);
create index if not exists letter_vocabulary_letter_idx
  on public.letter_vocabulary (letter_id, sort_order);

create table if not exists public.letter_expressions (
  id              uuid primary key default gen_random_uuid(),
  letter_id       text not null references public.letters(id) on delete cascade,
  sort_order      int  not null default 0,
  arabic          text not null,
  transliteration text,
  meaning         text,
  created_at      timestamptz not null default now()
);
create index if not exists letter_expressions_letter_idx
  on public.letter_expressions (letter_id, sort_order);

alter table public.letter_vocabulary  enable row level security;
alter table public.letter_expressions enable row level security;

-- Public read, instructor/admin write — same pattern as the other content tables.
create policy letter_vocabulary_public_read
  on public.letter_vocabulary for select using (true);
create policy letter_vocabulary_editor_write
  on public.letter_vocabulary for all
  using (public.current_role() in ('instructor','admin'))
  with check (public.current_role() in ('instructor','admin'));

create policy letter_expressions_public_read
  on public.letter_expressions for select using (true);
create policy letter_expressions_editor_write
  on public.letter_expressions for all
  using (public.current_role() in ('instructor','admin'))
  with check (public.current_role() in ('instructor','admin'));