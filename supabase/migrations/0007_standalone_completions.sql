-- 0007_standalone_completions.sql
-- Allow lesson_completions to track standalone lessons (course_id is null)
-- and simplify the unique key to (user_id, lesson_key) since lesson ids
-- are already globally unique.

alter table public.lesson_completions
  alter column course_id drop not null;

alter table public.lesson_completions
  drop constraint if exists lesson_completions_user_id_course_id_lesson_key_key;

create unique index if not exists lesson_completions_user_lesson_unique
  on public.lesson_completions (user_id, lesson_key);