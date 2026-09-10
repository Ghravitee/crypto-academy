-- ============================================================
-- Crypto Academy — Supabase schema
-- Run this in the Supabase SQL editor (or via `supabase db push`)
-- ============================================================

-- --------------------------------------------------------------
-- profiles: one row per auth user, extends auth.users
-- --------------------------------------------------------------
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text not null,
  phone text,
  role text not null default 'student' check (role in ('student', 'admin')),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Admins can view all profiles"
  on public.profiles for select
  using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

-- Auto-create a profile row whenever a new auth user signs up
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, phone)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'phone'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- --------------------------------------------------------------
-- courses: cohort-based, one-month live courses taught over Zoom
-- --------------------------------------------------------------
create table public.courses (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  description text,
  price_kobo integer not null default 2000000, -- ₦20,000 in kobo
  duration_weeks integer not null default 4,
  sessions_per_week integer not null default 2,
  session_length_minutes integer not null default 120,
  cohort_start_date date,
  published boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.courses enable row level security;

create policy "Published courses are viewable by everyone"
  on public.courses for select
  using (published = true);

create policy "Admins can manage courses"
  on public.courses for all
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'))
  with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

-- --------------------------------------------------------------
-- class_sessions: individual live Zoom classes within a course
-- --------------------------------------------------------------
create table public.class_sessions (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  title text not null,
  topic text,
  session_number integer not null,
  scheduled_at timestamptz not null,
  duration_minutes integer not null default 120,
  created_at timestamptz not null default now()
);

alter table public.class_sessions enable row level security;

create policy "Sessions viewable by enrolled students"
  on public.class_sessions for select
  using (
    exists (
      select 1 from public.enrollments e
      where e.course_id = class_sessions.course_id
        and e.user_id = auth.uid()
        and e.status = 'active'
    )
  );

create policy "Admins can manage sessions"
  on public.class_sessions for all
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'))
  with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

-- --------------------------------------------------------------
-- session_links: each paid student's personal Zoom link for a class.
-- Only visible to that student — never a shared/public link, so it
-- can't be passed around to people who haven't paid.
-- --------------------------------------------------------------
create table public.session_links (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.class_sessions(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  zoom_link text not null,
  sent_at timestamptz,
  created_at timestamptz not null default now(),
  unique (session_id, user_id)
);

alter table public.session_links enable row level security;

create policy "Students can view their own session link"
  on public.session_links for select
  using (auth.uid() = user_id);

create policy "Admins can manage session links"
  on public.session_links for all
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'))
  with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

-- --------------------------------------------------------------
-- enrollments: created by the Paystack webhook after payment
-- --------------------------------------------------------------
create table public.enrollments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  course_id uuid not null references public.courses(id) on delete cascade,
  status text not null default 'active' check (status in ('active', 'refunded')),
  paystack_reference text unique not null,
  amount_kobo integer not null,
  enrolled_at timestamptz not null default now(),
  unique (user_id, course_id)
);

alter table public.enrollments enable row level security;

create policy "Users can view their own enrollments"
  on public.enrollments for select
  using (auth.uid() = user_id);

create policy "Admins can view all enrollments"
  on public.enrollments for select
  using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

-- No general insert/update policy for students — enrollments are only
-- ever written by the webhook route using the service-role key
-- (bypasses RLS), which only fires after a verified Paystack payment.

-- --------------------------------------------------------------
-- faqs: editable from the admin dashboard, shown on the landing page
-- --------------------------------------------------------------
create table public.faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  position integer not null default 0,
  published boolean not null default true
);

alter table public.faqs enable row level security;

create policy "Published FAQs are viewable by everyone"
  on public.faqs for select
  using (published = true);

create policy "Admins can manage FAQs"
  on public.faqs for all
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'))
  with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));
