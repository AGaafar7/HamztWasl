-- 0014_lessons_count_trigger.sql
-- Keeps courses.lessons_count in sync with the real lesson count in
-- course_lessons. The column is a cache — the UI reads live counts via
-- lib/queries/courses.js — but the column itself should never lie.
--
-- The alphabet course is special: it renders from letters, not
-- course_lessons, so the backfill below uses a different source for it.
-- If a future course ever sources its content from a third table, this
-- backfill's CASE needs another branch.

create or replace function public.bump_lessons_count()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if tg_op = 'INSERT' and new.course_id is not null then
    update public.courses
      set lessons_count = lessons_count + 1
      where id = new.course_id;
  elsif tg_op = 'DELETE' and old.course_id is not null then
    update public.courses
      set lessons_count = greatest(0, lessons_count - 1)
      where id = old.course_id;
  end if;
  return null;
end;
$$;

drop trigger if exists course_lessons_count on public.course_lessons;
create trigger course_lessons_count
  after insert or delete on public.course_lessons
  for each row execute function public.bump_lessons_count();

-- One-time backfill: correct the existing drift.
-- alphabet gets its count from letters (it has zero rows in course_lessons);
-- everything else gets it from course_lessons.
update public.courses c
set lessons_count = case
  when c.id = 'alphabet' then (select count(*) from public.letters)
  else (select count(*) from public.course_lessons l where l.course_id = c.id)
end;