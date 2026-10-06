alter table public.videos
  add column if not exists topics text[] not null default '{}';

create index if not exists videos_topics_idx
  on public.videos using gin (topics);