-- 0004_course_lessons.sql
-- Lessons belonging to a course, OR standalone lessons authored
-- independently. Visibility of a lesson depends on where it lives:
--   * standalone               → public
--   * free published course    → public
--   * paid published course    → enrolled students + instructor only
--   * draft course             → instructor only

create table public.course_lessons (
  id             uuid primary key default gen_random_uuid(),
  course_id      text references public.courses(id) on delete cascade,
  instructor_id  uuid not null references public.profiles(id) on delete cascade,
  sort_order     int  not null default 0,
  kind           text not null
                 check (kind in ('text','tested','video','listening','reading','speaking')),
  content        jsonb not null default '{}'::jsonb,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

create index course_lessons_course_idx
  on public.course_lessons (course_id, sort_order);
create index course_lessons_instructor_idx
  on public.course_lessons (instructor_id, created_at desc);

create trigger course_lessons_touch
  before update on public.course_lessons
  for each row execute function public.touch_updated_at();

alter table public.course_lessons enable row level security;

create policy "course_lessons_read" on public.course_lessons
  for select using (
    case
      when instructor_id = auth.uid() then true
      when public.current_role() = 'admin' then true
      when course_id is null then true
      else exists (
        select 1 from public.courses c
        where c.id = course_lessons.course_id
          and c.status = 'published'
          and (
            c.type = 'free'
            or exists (
              select 1 from public.enrollments e
              where e.user_id = auth.uid() and e.course_id = c.id
            )
          )
      )
    end
  );

create policy "course_lessons_write" on public.course_lessons
  for all using (instructor_id = auth.uid() or public.current_role() = 'admin')
  with check (instructor_id = auth.uid() or public.current_role() = 'admin');