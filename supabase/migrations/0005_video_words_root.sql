-- 0005_video_words_root.sql
-- Adds an optional `root` field to transcript words so instructors can
-- annotate e.g. "ك ت ب" for a word like "يكتب". Shows in the click-a-word
-- popup alongside the existing gloss + grammar.

alter table public.video_transcript_words
  add column if not exists root text;