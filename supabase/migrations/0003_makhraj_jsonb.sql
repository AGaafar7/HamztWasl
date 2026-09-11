-- 0003_makhraj_jsonb.sql
-- Makhraj was a plain English string. Convert to a JSONB { en, ar, zh }
-- object so the letter page can render it in the user's language.
-- Existing rows get the English text copied into all three keys; a
-- re-seed will fill in the real Arabic/Chinese translations.

alter table public.letters
  alter column makhraj type jsonb using
    case
      when makhraj is null then null
      else jsonb_build_object('en', makhraj, 'ar', makhraj, 'zh', makhraj)
    end;