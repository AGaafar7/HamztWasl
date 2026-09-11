-- 0002_rls_hardening.sql
-- Prevent non-admins from changing their own role. The trigger silently
-- reverts any role change attempted by a non-admin, so the profiles_self_update
-- policy can stay simple (owner can update their own row) without opening a
-- privilege-escalation hole.

create or replace function public.prevent_role_change()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  caller_role text;
begin
  if new.role is distinct from old.role then
    select role into caller_role from public.profiles where id = auth.uid();
    if caller_role is null or caller_role <> 'admin' then
      new.role := old.role;
    end if;
  end if;
  return new;
end;
$$;

drop trigger if exists profiles_prevent_role_change on public.profiles;
create trigger profiles_prevent_role_change
  before update on public.profiles
  for each row execute function public.prevent_role_change();