-- supabase/migrations/auth_schema.sql
-- Run this in the Supabase SQL Editor

-- create profiles table
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  role varchar default 'pengguna',
  full_name varchar,
  avatar_url varchar
);

-- set up row level security
alter table public.profiles enable row level security;

create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );

-- create a trigger to automatically insert a profile for new users
create or replace function public.handle_new_user()
returns trigger
security definer set search_path = ''
language plpgsql
as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
