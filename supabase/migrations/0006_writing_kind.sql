-- 0006_writing_kind.sql
-- Add 'writing' as a valid lesson kind.
alter table public.course_lessons
  drop constraint if exists course_lessons_kind_check;

alter table public.course_lessons
  add constraint course_lessons_kind_check
  check (kind in ('text','tested','video','listening','reading','speaking','writing'));