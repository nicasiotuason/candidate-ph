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
  is_admin boolean default false,
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

-- Trigger to protect wallet_balance from unauthorized client-side tampering
create or replace function public.protect_wallet_balance()
returns trigger as $$
begin
  -- Prevent client from directly overwriting wallet_balance via regular profile updates
  -- Allow balance modification only via security definer RPCs with internal config override
  if new.wallet_balance is distinct from old.wallet_balance and coalesce(current_setting('candidate.rpc_override', true), 'false') <> 'true' then
    new.wallet_balance := old.wallet_balance;
  end if;
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_protect_wallet_balance on public.profiles;
create trigger trg_protect_wallet_balance
  before update on public.profiles
  for each row execute procedure public.protect_wallet_balance();

-- =========================================================================
-- 2. AUTOMATIC PROFILE CREATION TRIGGER ON SIGNUP WITH REFERRAL CREDITING
-- =========================================================================
create or replace function public.handle_new_user()
returns trigger as $$
declare
  ref_code text;
  ref_by text;
  v_referrer_id uuid;
begin
  -- Generate unique referral code (e.g. CAND-AB12)
  ref_code := 'CAND-' || upper(substring(md5(random()::text) from 1 for 6));
  ref_by := new.raw_user_meta_data->>'referred_by';

  insert into public.profiles (
    id,
    email,
    name,
    wallet_balance,
    referral_code,
    referred_by,
    is_onboarded
  )
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    250.00, -- Welcome ₱250 credit bundle (5 apps)
    ref_code,
    ref_by,
    false
  );

  -- If referred by a valid colleague code, credit the referrer ₱50 upon verified signup
  if ref_by is not null and ref_by <> '' then
    select id into v_referrer_id from public.profiles where referral_code = upper(trim(ref_by));
    if v_referrer_id is not null then
      -- Enable RPC override for balance update
      perform set_config('candidate.rpc_override', 'true', true);

      update public.profiles
      set wallet_balance = wallet_balance + 50.00,
          updated_at = now()
      where id = v_referrer_id;

      insert into public.referrals (referrer_id, referee_id, referral_code, reward_amount, reward_credited, created_at)
      values (v_referrer_id, new.id, upper(trim(ref_by)), 50.00, true, now());

      insert into public.wallet_transactions (id, user_id, amount, type, description, balance_after, payment_method, created_at)
      values (
        'tx_ref_' || extract(epoch from now())::bigint || '_' || lower(substring(md5(random()::text) from 1 for 4)),
        v_referrer_id,
        50.00,
        'referral_bonus',
        'Referral reward: Invited friend completed signup (' || new.email || ')',
        (select wallet_balance from public.profiles where id = v_referrer_id),
        'Referral Program',
        now()
      );
    end if;
  end if;

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

-- Only service role or security definer RPC can insert into wallet transactions
create policy "Service can log wallet transactions." on public.wallet_transactions
  for insert with check (auth.role() = 'service_role' or coalesce(current_setting('candidate.rpc_override', true), 'false') = 'true');

-- Unique index to prevent duplicate credit processing from retried PayMongo webhooks
create unique index if not exists wallet_tx_paymongo_payment_id_uniq on public.wallet_transactions(paymongo_payment_id) where paymongo_payment_id is not null;

-- =========================================================================
-- ATOMIC STORED PROCEDURE: DISPATCH APPLICATION (₱50 Debit + ATS Queue)
-- =========================================================================
create or replace function public.dispatch_application(
  p_job_id text,
  p_company text,
  p_title text,
  p_salary text,
  p_portal text,
  p_employer_reply_target text,
  p_resume_choice text default 'tailored',
  p_tailored_headline text default null,
  p_tailored_summary text default null,
  p_cover_letter text default null,
  p_cover_letter_tone text default 'technical',
  p_screening_answers jsonb default '[]'::jsonb
)
returns jsonb as $$
declare
  v_user_id uuid := auth.uid();
  v_cur_balance numeric(10, 2);
  v_new_balance numeric(10, 2);
  v_app_id text;
  v_receipt_id text;
  v_cost numeric(10, 2) := 50.00;
begin
  if v_user_id is null then
    raise exception 'Not authenticated';
  end if;

  -- Row-level lock on profile prevents concurrent race condition debits
  select wallet_balance into v_cur_balance
  from public.profiles
  where id = v_user_id
  for update;

  if v_cur_balance is null then
    raise exception 'Profile not found';
  end if;

  if v_cur_balance < v_cost then
    raise exception 'Insufficient balance: ₱% available, ₱% required.', v_cur_balance, v_cost;
  end if;

  v_new_balance := v_cur_balance - v_cost;
  v_app_id := 'app_' || extract(epoch from now())::bigint || '_' || lower(substring(md5(random()::text) from 1 for 6));
  v_receipt_id := 'ATS-' || upper(coalesce(substring(p_portal from 1 for 3), 'DIR')) || '-' || floor(100000 + random() * 900000)::text;

  -- Allow internal balance override
  perform set_config('candidate.rpc_override', 'true', true);

  -- 1. Deduct ₱50
  update public.profiles
  set wallet_balance = v_new_balance,
      updated_at = now()
  where id = v_user_id;

  -- 2. Insert application
  insert into public.applications (
    id, user_id, job_id, company, title, salary, portal, deduction_php,
    ats_receipt_id, status, employer_reply_target, resume_choice,
    tailored_headline, tailored_summary, cover_letter, cover_letter_tone,
    screening_answers, applied_at
  ) values (
    v_app_id, v_user_id, p_job_id, p_company, p_title, p_salary, p_portal, v_cost,
    v_receipt_id, 'Delivered to ATS', p_employer_reply_target, p_resume_choice,
    p_tailored_headline, p_tailored_summary, p_cover_letter, p_cover_letter_tone,
    p_screening_answers, now()
  );

  -- 3. Insert transaction audit log
  insert into public.wallet_transactions (
    id, user_id, amount, type, description, balance_after, payment_method, created_at
  ) values (
    'tx_' || extract(epoch from now())::bigint || '_' || lower(substring(md5(random()::text) from 1 for 6)),
    v_user_id, -v_cost, 'application_fee',
    'Dispatched application for ' || p_title || ' at ' || p_company,
    v_new_balance, 'Wallet Balance', now()
  );

  return jsonb_build_object(
    'success', true,
    'application_id', v_app_id,
    'ats_receipt_id', v_receipt_id,
    'balance_after', v_new_balance
  );
end;
$$ language plpgsql security definer;

-- =========================================================================
-- ATOMIC STORED PROCEDURE: CREDIT WALLET (PayMongo Topup Webhook)
-- =========================================================================
create or replace function public.credit_wallet(
  p_user_id uuid,
  p_amount numeric,
  p_payment_method text,
  p_payment_id text,
  p_description text default 'PayMongo Wallet Topup'
)
returns jsonb as $$
declare
  v_cur_balance numeric(10, 2);
  v_new_balance numeric(10, 2);
  v_tx_id text;
begin
  -- Row-level lock to prevent race conditions
  select wallet_balance into v_cur_balance
  from public.profiles
  where id = p_user_id
  for update;

  if v_cur_balance is null then
    raise exception 'Profile % not found', p_user_id;
  end if;

  v_new_balance := v_cur_balance + p_amount;
  v_tx_id := 'tx_' || extract(epoch from now())::bigint || '_' || lower(substring(md5(random()::text) from 1 for 6));

  -- Allow internal balance override
  perform set_config('candidate.rpc_override', 'true', true);

  update public.profiles
  set wallet_balance = v_new_balance,
      updated_at = now()
  where id = p_user_id;

  insert into public.wallet_transactions (
    id, user_id, amount, type, description, balance_after, payment_method, paymongo_payment_id, created_at
  ) values (
    v_tx_id, p_user_id, p_amount, 'topup', p_description, v_new_balance, p_payment_method, p_payment_id, now()
  );

  return jsonb_build_object(
    'success', true,
    'new_balance', v_new_balance,
    'transaction_id', v_tx_id
  );
end;
$$ language plpgsql security definer;

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
