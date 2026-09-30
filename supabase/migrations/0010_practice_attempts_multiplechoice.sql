-- 0010_practice_attempts_multiplechoice.sql
-- Allow multiplechoice (and writing) as practice_attempts.practice_type
-- values so we can persist quiz answers and writing attempts.

alter table public.practice_attempts
  drop constraint if exists practice_attempts_practice_type_check;

alter table public.practice_attempts
  add constraint practice_attempts_practice_type_check
  check (practice_type in ('listening','reading','speaking','writing','multiplechoice'));

create index if not exists practice_attempts_type_ref_idx
  on public.practice_attempts (user_id, practice_type, ref_id);