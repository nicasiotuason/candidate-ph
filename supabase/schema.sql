-- =========================================================================
-- CANDIDATE.ph — Production PostgreSQL Database Schema (Supabase)
-- High-Speed Direct Job Matching & Micro-Transaction Platform
-- =========================================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- =========================================================================
-- 1. PROFILES TABLE (Linked to auth.users)
-- =========================================================================
create table if not exists public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  email text not null,
  name text,
  headline text,
  summary text,
  target_role text default 'Senior Full Stack Engineer',
  target_category text default 'Engineering & Tech',
  seniority text default 'Mid-Senior Level',
  desired_salary text default '₱160,000 – ₱220,000 / mo',
  salary_floor text default '₱160,000 / mo',
  notice_period text default '30 Days (Standard Philippine Corporate)',
  citizenship text default 'Filipino Citizen',
  setup_preference text default 'Hybrid • BGC / Makati / Remote',
  education text default 'Bachelor''s Degree (Computer Science)',
  skills text[] default array['React', 'Node.js', 'TypeScript', 'Next.js', 'PostgreSQL', 'TailwindCSS'],
  master_resume_url text,
  master_resume_filename text default 'Juan_Dela_Cruz_Master_Resume.pdf',
  profile_strength integer default 85,
  wallet_balance numeric(10, 2) default 250.00, -- Starts with ₱250 welcome credits
  referral_code text unique,
  referred_by text,
  is_onboarded boolean default false,
  is_paused boolean default false,
  created_at timestamptz default timezone('utc'::text, now()) not null,
  updated_at timestamptz default timezone('utc'::text, now()) not null
);

-- Index for referral lookups
create index if not exists profiles_referral_code_idx on public.profiles(referral_code);

-- Enable Row Level Security (RLS)
alter table public.profiles enable row level security;

-- Profiles Policies
create policy "Public profiles are viewable by owner." on public.profiles
  for select using (auth.uid() = id);

create policy "Users can insert their own profile." on public.profiles
  for insert with check (auth.uid() = id);

create policy "Users can update their own profile." on public.profiles
  for update using (auth.uid() = id);

-- =========================================================================
-- 2. AUTOMATIC PROFILE CREATION TRIGGER ON SIGNUP
-- =========================================================================
create or replace function public.handle_new_user()
returns trigger as $$
declare
  ref_code text;
begin
  -- Generate unique referral code (e.g. CAND-AB12)
  ref_code := 'CAND-' || upper(substring(md5(random()::text) from 1 for 6));

  insert into public.profiles (
    id,
    email,
    name,
    wallet_balance,
    referral_code,
    is_onboarded
  )
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    250.00, -- Welcome ₱250 credit bundle
    ref_code,
    false
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger execution
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- =========================================================================
-- 3. JOBS TABLE (Active Corporate Openings)
-- =========================================================================
create table if not exists public.jobs (
  id text primary key,
  company text not null,
  industry text not null,
  logo text not null,
  logo_color text not null,
  title text not null,
  salary text not null,
  location text not null,
  setup text not null,
  type text default 'Full-Time',
  level text default 'Mid-Senior Level',
  experience text default '3+ yrs exp',
  portal text default 'Direct ATS',
  posted_ago text default 'Discovered recently',
  applicant_count text default '< 20 applicants',
  match_score integer default 90,
  match_label text default 'STRONG MATCH',
  experience_score integer default 95,
  skill_score integer default 92,
  industry_score integer default 94,
  job_description text,
  ats_spec jsonb default '{}'::jsonb,
  matching_skills text[] default array[]::text[],
  missing_skills text[] default array[]::text[],
  fit_reasons text[] default array[]::text[],
  hub text,
  headcount text,
  leadership text,
  founded text,
  active boolean default true,
  created_at timestamptz default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.jobs enable row level security;

-- Anyone can view active jobs
create policy "Anyone can read active jobs." on public.jobs
  for select using (active = true);

-- =========================================================================
-- 4. APPLICATIONS TABLE (Dispatched to ATS with ₱50 Receipt)
-- =========================================================================
create table if not exists public.applications (
  id text primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  job_id text not null,
  company text not null,
  title text not null,
  salary text,
  portal text default 'Direct Employer ATS',
  deduction_php numeric(10, 2) default 50.00,
  ats_receipt_id text not null,
  status text default 'Delivered to ATS',
  employer_reply_target text not null,
  resume_choice text default 'tailored',
  tailored_headline text,
  tailored_summary text,
  cover_letter text,
  cover_letter_tone text default 'technical',
  screening_answers jsonb default '[]'::jsonb,
  applied_at timestamptz default timezone('utc'::text, now()) not null
);

create index if not exists applications_user_idx on public.applications(user_id);
create index if not exists applications_ats_receipt_idx on public.applications(ats_receipt_id);

-- Enable RLS
alter table public.applications enable row level security;

create policy "Users can view their own dispatched applications." on public.applications
  for select using (auth.uid() = user_id);

create policy "Users can insert their own dispatched applications." on public.applications
  for insert with check (auth.uid() = user_id);

-- =========================================================================
-- 5. SAVED JOBS (Bookmarks)
-- =========================================================================
create table if not exists public.saved_jobs (
  user_id uuid references public.profiles(id) on delete cascade not null,
  job_id text not null,
  created_at timestamptz default timezone('utc'::text, now()) not null,
  primary key (user_id, job_id)
);

-- Enable RLS
alter table public.saved_jobs enable row level security;

create policy "Users can view their own saved jobs." on public.saved_jobs
  for select using (auth.uid() = user_id);

create policy "Users can save jobs." on public.saved_jobs
  for insert with check (auth.uid() = user_id);

create policy "Users can delete their saved jobs." on public.saved_jobs
  for delete using (auth.uid() = user_id);

-- =========================================================================
-- 6. WALLET TRANSACTIONS & PAYMONGO AUDIT TRAIL
-- =========================================================================
create table if not exists public.wallet_transactions (
  id text primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  amount numeric(10, 2) not null,
  type text not null check (type in ('topup', 'application_fee', 'referral_bonus', 'welcome_credit', 'refund')),
  description text not null,
  balance_after numeric(10, 2) not null,
  payment_method text default 'PayMongo',
  paymongo_payment_id text,
  paymongo_fee numeric(10, 2) default 0.00,
  created_at timestamptz default timezone('utc'::text, now()) not null
);

create index if not exists wallet_tx_user_idx on public.wallet_transactions(user_id);

-- Enable RLS
alter table public.wallet_transactions enable row level security;

create policy "Users can view their own wallet transactions." on public.wallet_transactions
  for select using (auth.uid() = user_id);

create policy "Service can log wallet transactions." on public.wallet_transactions
  for insert with check (auth.uid() = user_id);

-- =========================================================================
-- 7. REFERRALS (Give ₱50, Get ₱50 Viral Loop)
-- =========================================================================
create table if not exists public.referrals (
  id uuid default uuid_generate_v4() primary key,
  referrer_id uuid references public.profiles(id) on delete cascade not null,
  referee_id uuid references public.profiles(id) on delete cascade not null,
  referral_code text not null,
  reward_amount numeric(10, 2) default 50.00,
  reward_credited boolean default false,
  created_at timestamptz default timezone('utc'::text, now()) not null
);

create index if not exists referrals_referrer_idx on public.referrals(referrer_id);

-- Enable RLS
alter table public.referrals enable row level security;

create policy "Users can view their referrals." on public.referrals
  for select using (auth.uid() = referrer_id);

-- =========================================================================
-- 8. TESTIMONIALS & FEEDBACK
-- =========================================================================
create table if not exists public.testimonials (
  id text primary key,
  author text not null,
  role text default 'Candidate.ph Member',
  comment text not null,
  avatar_bg text default 'bg-blue-100 text-blue-800',
  avatar_text text default 'CP',
  created_at timestamptz default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.testimonials enable row level security;

create policy "Anyone can read testimonials." on public.testimonials
  for select using (true);

create policy "Authenticated users can submit testimonials." on public.testimonials
  for insert with check (auth.role() = 'authenticated');

-- =========================================================================
-- 9. INITIAL SEED DATA FOR JOBS FEED
-- =========================================================================
insert into public.jobs (
  id, company, industry, logo, logo_color, title, salary, location, setup, type, level, experience, portal, posted_ago, applicant_count, match_score, match_label, experience_score, skill_score, industry_score, job_description, matching_skills, fit_reasons, hub, headcount, leadership, founded
) values
(
  'job_01', 'Maya', 'Digital Banking & Payments', 'M', 'bg-emerald-600 text-white',
  'Senior Full Stack Engineer (FinTech)', '₱180,000 – ₱240,000 / mo', 'BGC, Taguig', 'Hybrid (2 days on-site)',
  'Full-Time', 'Mid-Senior Level', '5+ yrs exp', 'Workday ATS', 'Discovered 1 hour ago', '< 20 applicants',
  98, 'EXCEPTIONAL MATCH', 99, 96, 98,
  'Architect and scale high-throughput digital wallet architectures, QR payment gateways, and checkout micro-frontends serving 10M+ daily consumer transactions.',
  array['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'High Throughput'],
  array['Core stack: React, TypeScript, Node.js matched', 'Salary floor exceeded (₱180k–₱240k vs ₱160k floor)', 'Preferred BGC Hybrid setup • Direct ATS queue'],
  'BGC, Taguig', '1,000–5,000', 'VP of Technology', '2013'
),
(
  'job_02', 'Coins.ph', 'Crypto & Blockchain Infrastructure', 'C', 'bg-blue-600 text-white',
  'Senior Frontend Developer (Web3 & React)', '₱160,000 – ₱210,000 / mo', 'Ortigas / Remote', '100% Remote',
  'Full-Time', 'Mid-Senior Level', '4+ yrs exp', 'Greenhouse ATS', 'Discovered 3 hours ago', '< 25 applicants',
  95, 'STRONG MATCH', 96, 94, 95,
  'Lead frontend engineering on institutional crypto trading desks, order books, and real-time biometric KYC verification flows using modern React and WebSocket pipelines.',
  array['React', 'TypeScript', 'Next.js', 'WebSockets', 'TailwindCSS'],
  array['Core stack: React, Next.js, WebSockets matched', 'Salary floor met (₱160k–₱210k vs ₱160k floor)', '100% Remote (PH) • Direct ATS queue'],
  'Ortigas / Remote', '200–500', 'Head of Engineering', '2014'
),
(
  'job_03', 'Canva Philippines', 'Design Tech & Global SaaS', 'C', 'bg-cyan-600 text-white',
  'Frontend Engineer (Growth & Localization)', '₱150,000 – ₱200,000 / mo', 'Makati City', 'Hybrid (1 day on-site)',
  'Full-Time', 'Mid-Senior Level', '3+ yrs exp', 'Lever ATS', 'Discovered 5 hours ago', '< 30 applicants',
  92, 'STRONG MATCH', 93, 91, 92,
  'Build and test viral acquisition funnels, localized subscription payment integrations, and editor onboarding experiences for 170M+ global active monthly users.',
  array['React', 'TypeScript', 'TailwindCSS', 'A/B Testing', 'Growth Systems'],
  array['Core stack: React, TypeScript, UI Architecture matched', 'Salary meets baseline range (₱150k–₱200k)', 'Makati City Hybrid (1 day on-site) • Direct ATS queue'],
  'Makati City', '1,000+', 'Engineering Lead', '2012'
),
(
  'job_04', 'Sprout Solutions', 'HR Tech & Enterprise SaaS', 'S', 'bg-emerald-700 text-white',
  'Senior Full-Stack Developer', '₱140,000 – ₱190,000 / mo', 'BGC, Taguig', 'Hybrid (2 days on-site)',
  'Full-Time', 'Senior Level', '5+ yrs exp', 'Direct Employer ATS', 'Discovered yesterday', '< 15 applicants',
  89, 'HIGH MATCH', 91, 88, 89,
  'Build enterprise Philippine payroll engines, tax computation microservices (BIR compliant), and real-time automated timesheet ingestion for 1,000+ top corporations.',
  array['React', 'Node.js', 'PostgreSQL', 'Microservices', 'Enterprise Architecture'],
  array['Core stack: React, Node.js, PostgreSQL matched', 'Strong Philippine enterprise compensation package', 'BGC Taguig Hybrid • Early Review Batch (< 15 applicants)'],
  'BGC, Taguig', '500–1,000', 'Chief Technology Officer', '2015'
)
on conflict (id) do nothing;
