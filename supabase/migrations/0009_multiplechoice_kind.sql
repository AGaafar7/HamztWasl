-- 0009_multiplechoice_kind.sql
-- Add 'multiplechoice' as a valid lesson kind.
alter table public.course_lessons
  drop constraint if exists course_lessons_kind_check;

alter table public.course_lessons
  add constraint course_lessons_kind_check
  check (kind in (
    'text','tested','video','listening','reading','speaking','writing',
    'multiplechoice'
  ));