-- ============================================================
-- 0001_init.sql — Huroof schema
-- ============================================================

create extension if not exists "pgcrypto";

-- ------------------------------------------------------------
-- profiles (extends auth.users)
-- ------------------------------------------------------------
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  avatar_url text,
  role text not null default 'student'
    check (role in ('student','instructor','admin')),
  bio text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name',
             new.raw_user_meta_data->>'name'),
    coalesce(new.raw_user_meta_data->>'role', 'student')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_touch
  before update on public.profiles
  for each row execute function public.touch_updated_at();

-- ------------------------------------------------------------
-- courses
-- ------------------------------------------------------------
create table public.courses (
  id            text primary key,              -- 'alphabet-101'
  glyph         text,
  theme         text,
  level         text check (level in ('beginner','intermediate','advanced')),
  type          text check (type in ('free','paid')),
  price         numeric(10,2) not null default 0,
  lessons_count int not null default 0,
  status        text not null default 'draft'
                check (status in ('draft','published','archived')),
  instructor_id uuid references public.profiles(id) on delete set null,
  title   jsonb not null,   -- { en, ar, zh }
  "desc"  jsonb not null,   -- { en, ar, zh }
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index courses_instructor_idx on public.courses (instructor_id);
create index courses_status_idx on public.courses (status);

create trigger courses_touch
  before update on public.courses
  for each row execute function public.touch_updated_at();

-- ------------------------------------------------------------
-- alphabet
-- ------------------------------------------------------------
create table public.letters (
  id              text primary key,            -- 'alif','baa'
  position        int not null,
  arabic          text not null,
  name            text not null,
  transliteration text not null,
  makhraj         text,
  video_id        text,
  start_time      numeric default 0,
  mouth_image     text,
  created_at      timestamptz not null default now()
);

create table public.letter_examples (
  id              uuid primary key default gen_random_uuid(),
  letter_id       text references public.letters(id) on delete cascade,
  word            text not null,
  transliteration text,
  meaning         text,
  sort_order      int not null default 0
);
create index letter_examples_letter_idx on public.letter_examples (letter_id);

-- OPTIONAL per-dialect recordings. Rows are added as you get real audio;
-- missing rows fall back to TTS in the app.
create table public.letter_pronunciations (
  id         uuid primary key default gen_random_uuid(),
  letter_id  text references public.letters(id) on delete cascade,
  dialect    text not null
             check (dialect in ('msa','egyptian','levantine','gulf','darija','iraqi')),
  audio_url  text not null,
  created_at timestamptz not null default now(),
  unique (letter_id, dialect)
);

-- ------------------------------------------------------------
-- videos + transcript
-- ------------------------------------------------------------
create table public.videos (
  id         text primary key,                 -- 'easy-arabic-craziest-thing'
  youtube_id text not null,
  watch_url  text,
  title      jsonb not null,                   -- { en, ar, zh }
  dialects   text[] not null default '{}',
  level      text check (level in ('novice','beginner','intermediate','advanced')),
  theme      text,
  created_at timestamptz not null default now()
);

create table public.video_transcript_lines (
  id         uuid primary key default gen_random_uuid(),
  video_id   text references public.videos(id) on delete cascade,
  sort_order int not null,
  time_label text,
  start_sec  numeric,
  end_sec    numeric,
  arabic     text not null,
  gloss      jsonb                             -- { en, ar, zh }
);
create index video_lines_video_idx on public.video_transcript_lines (video_id, sort_order);

create table public.video_transcript_words (
  id         uuid primary key default gen_random_uuid(),
  line_id    uuid references public.video_transcript_lines(id) on delete cascade,
  sort_order int not null,
  arabic     text not null,
  start_sec  numeric,
  end_sec    numeric,
  gloss      jsonb,
  grammar    jsonb
);
create index video_words_line_idx on public.video_transcript_words (line_id, sort_order);

-- ------------------------------------------------------------
-- dictionary
-- ------------------------------------------------------------
create table public.dictionary_entries (
  id           text primary key,
  search_terms text[] not null default '{}',
  arabic       text not null,
  gloss        jsonb not null,
  grammar      jsonb,
  root         text
);

create table public.dictionary_forms (
  id       uuid primary key default gen_random_uuid(),
  entry_id text references public.dictionary_entries(id) on delete cascade,
  dialect  text not null,
  arabic   text not null,
  unique (entry_id, dialect)
);

create table public.dictionary_conjugations (
  id         uuid primary key default gen_random_uuid(),
  entry_id   text references public.dictionary_entries(id) on delete cascade,
  tense      text not null check (tense in ('present','past')),
  sort_order int not null default 0,
  arabic     text not null,
  label      jsonb not null
);

create table public.dictionary_examples (
  id         uuid primary key default gen_random_uuid(),
  entry_id   text references public.dictionary_entries(id) on delete cascade,
  sort_order int not null default 0,
  arabic     text not null,
  gloss      jsonb not null,
  dialect    text
);

-- ------------------------------------------------------------
-- comprehension (reading practice)
-- ------------------------------------------------------------
create table public.comprehension_exercises (
  id      text primary key,
  title   jsonb not null,
  passage jsonb not null
);

create table public.comprehension_questions (
  id               uuid primary key default gen_random_uuid(),
  exercise_id      text references public.comprehension_exercises(id) on delete cascade,
  sort_order       int not null default 0,
  question         jsonb not null,
  reference_answer jsonb not null
);

-- ------------------------------------------------------------
-- per-user state
-- ------------------------------------------------------------
create table public.enrollments (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid references public.profiles(id) on delete cascade,
  course_id   text references public.courses(id) on delete cascade,
  progress    int not null default 0 check (progress between 0 and 100),
  enrolled_at timestamptz not null default now(),
  unique (user_id, course_id)
);

create table public.lesson_completions (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid references public.profiles(id) on delete cascade,
  course_id    text references public.courses(id) on delete cascade,
  lesson_key   text not null,       -- 'letter-alif', 'video:xxx', ...
  completed_at timestamptz not null default now(),
  unique (user_id, course_id, lesson_key)
);

create table public.favorites (
  user_id    uuid references public.profiles(id) on delete cascade,
  video_id   text references public.videos(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, video_id)
);

create table public.practice_attempts (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid references public.profiles(id) on delete cascade,
  practice_type text not null check (practice_type in ('listening','reading','speaking')),
  ref_id        text,                        -- video_id / exercise_id / word
  score         int,
  details       jsonb,
  created_at    timestamptz not null default now()
);
create index practice_attempts_user_idx on public.practice_attempts (user_id, practice_type, created_at desc);

-- ------------------------------------------------------------
-- instructor
-- ------------------------------------------------------------
create table public.practices (
  id            text primary key,
  instructor_id uuid references public.profiles(id) on delete set null,
  course_id     text references public.courses(id) on delete set null,
  title         text not null,
  type          text not null check (type in ('listening','reading','speaking')),
  status        text not null default 'draft'
                check (status in ('draft','published')),
  content       jsonb,
  created_at    timestamptz not null default now()
);

create table public.transactions (
  id            uuid primary key default gen_random_uuid(),
  instructor_id uuid references public.profiles(id) on delete cascade,
  course_id     text references public.courses(id) on delete set null,
  student_email text,
  amount        numeric(10,2) not null,
  currency      text not null default 'USD',
  status        text not null default 'paid'
                check (status in ('pending','paid','refunded')),
  created_at    timestamptz not null default now()
);
create index transactions_instructor_idx on public.transactions (instructor_id, created_at desc);

-- ============================================================
-- Row Level Security
-- ============================================================
alter table public.profiles                enable row level security;
alter table public.courses                 enable row level security;
alter table public.letters                 enable row level security;
alter table public.letter_examples         enable row level security;
alter table public.letter_pronunciations   enable row level security;
alter table public.videos                  enable row level security;
alter table public.video_transcript_lines  enable row level security;
alter table public.video_transcript_words  enable row level security;
alter table public.dictionary_entries      enable row level security;
alter table public.dictionary_forms        enable row level security;
alter table public.dictionary_conjugations enable row level security;
alter table public.dictionary_examples     enable row level security;
alter table public.comprehension_exercises enable row level security;
alter table public.comprehension_questions enable row level security;
alter table public.enrollments             enable row level security;
alter table public.lesson_completions      enable row level security;
alter table public.favorites               enable row level security;
alter table public.practice_attempts       enable row level security;
alter table public.practices               enable row level security;
alter table public.transactions            enable row level security;

-- Helper: current user's role, cached per query.
create or replace function public.current_role()
returns text
language sql stable
as $$
  select role from public.profiles where id = auth.uid()
$$;

-- profiles: anyone can read the public fields; only the owner can update.
create policy "profiles_public_read" on public.profiles
  for select using (true);
create policy "profiles_self_update" on public.profiles
  for update using (auth.uid() = id);
create policy "profiles_admin_all" on public.profiles
  for all using (public.current_role() = 'admin');

-- courses: published ones are public; instructors own theirs; admin all.
create policy "courses_public_read" on public.courses
  for select using (status = 'published' or instructor_id = auth.uid()
                    or public.current_role() = 'admin');
create policy "courses_instructor_insert" on public.courses
  for insert with check (instructor_id = auth.uid()
                         or public.current_role() = 'admin');
create policy "courses_instructor_update" on public.courses
  for update using (instructor_id = auth.uid()
                    or public.current_role() = 'admin');
create policy "courses_instructor_delete" on public.courses
  for delete using (instructor_id = auth.uid()
                    or public.current_role() = 'admin');

-- Content tables: public read, instructor/admin write.
do $$
declare t text;
begin
  foreach t in array array[
    'letters','letter_examples','letter_pronunciations',
    'videos','video_transcript_lines','video_transcript_words',
    'dictionary_entries','dictionary_forms','dictionary_conjugations','dictionary_examples',
    'comprehension_exercises','comprehension_questions'
  ] loop
    execute format($f$
      create policy %1$s_public_read on public.%1$s
        for select using (true);
      create policy %1$s_editor_write on public.%1$s
        for all using (public.current_role() in ('instructor','admin'))
        with check (public.current_role() in ('instructor','admin'));
    $f$, t);
  end loop;
end $$;

-- Per-user state: owner-only.
create policy "enrollments_owner_all" on public.enrollments
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "lesson_completions_owner_all" on public.lesson_completions
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "favorites_owner_all" on public.favorites
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "practice_attempts_owner_all" on public.practice_attempts
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- practices: instructor owns; admin all; published ones readable by enrolled users.
create policy "practices_read" on public.practices
  for select using (
    status = 'published'
    or instructor_id = auth.uid()
    or public.current_role() = 'admin'
  );
create policy "practices_instructor_write" on public.practices
  for all using (instructor_id = auth.uid() or public.current_role() = 'admin')
  with check (instructor_id = auth.uid() or public.current_role() = 'admin');

-- transactions: instructor sees their own; admin all.
create policy "transactions_read" on public.transactions
  for select using (instructor_id = auth.uid() or public.current_role() = 'admin');