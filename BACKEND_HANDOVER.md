# CANDIDATE.ph — Backend Handover & Integration Guide
**From:** Antigravity / Front-End Architect  
**To:** Nicky (Backend Engineer)  
**Target Codebase:** `/Users/nicktuason/.gemini/antigravity-ide/scratch/candidate-ph`  
**Git Branch:** `main`

---

## 1. Executive Summary & Golden Rules

The frontend for **CANDIDATE.ph** is complete, responsive, and signed off. It features a progressive degradation architecture: when no Supabase backend is configured, it falls back seamlessly to an offline/demo state (`localStorage`).

### The 4 Non-Negotiable Product Rules (Do Not Change):
1. **Welcome Credit**: Every new account receives exactly **₱50 FREE** (1 free application). **DO NOT change this to ₱250**.
2. **Per-Application Fee**: Each direct ATS submission costs **₱50**, debited only upon verified receipt.
3. **PayMongo Paid Bundles**:
   * **Starter**: ₱250 for 5 applications (₱50.00/app)
   * **Job Hunter**: ₱500 for 11 applications (₱45.45/app, +1 Free)
   * **Career Sprint**: ₱1,000 for 24 applications (₱41.67/app, +4 Free)
4. **Zero Middleman Architecture**: Employers reply directly to the candidate's personal inbox (`juan.delacruz@email.com`). Never gate message replies behind a platform inbox.

---

## 2. Existing File Structure & Architecture

The connection points are already scaffolded and located at:

```
src/
├── services/
│   ├── api.js              # Unified data layer. Automatically toggles between Supabase and LocalStorage
│   ├── supabaseService.js  # Pre-written Supabase client queries & mutations (auth, profile, applications)
│   ├── paymongoService.js  # Pre-written PayMongo bundle configs & checkout session creators
│   └── mockData.js         # Fallback data when database is offline
supabase/
├── schema.sql              # Complete PostgreSQL schema (profiles, jobs, applications, RLS, triggers)
└── functions/
    ├── create-checkout-session/index.ts   # Edge function to securely call PayMongo API
    └── paymongo-webhook/index.ts          # Edge function handling payment webhooks & wallet credits
.env.example                # Template for environment keys
```

---

## 3. Step-by-Step Backend Connection Instructions

### Step 1: Initialize Supabase Database
1. Create a new project in the [Supabase Dashboard](https://supabase.com).
2. Open the **SQL Editor** in your Supabase project.
3. Open `supabase/schema.sql` from the repository, paste the entire file into the SQL Editor, and click **Run**.
4. **What this executes**:
   * Creates tables: `public.profiles`, `public.jobs`, `public.applications`, `public.saved_jobs`, `public.credit_transactions`, `public.testimonials`.
   * Enforces Row-Level Security (RLS) policies.
   * Sets the `handle_new_user` trigger: when a user registers via Supabase Auth, a profile row is created automatically with `wallet_balance = 50.00`.
   * Creates the security trigger `protect_wallet_balance` so clients cannot tamper with their wallet directly.
   * Creates the stored procedure `deduct_application_fee(job_id, tailored_data)` for atomic, race-condition-safe ₱50 fee deductions.

### Step 2: Configure Environment Variables
In the project root (`/Users/nicktuason/.gemini/antigravity-ide/scratch/candidate-ph/`), copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Fill in the keys:
```env
# 1. Supabase (From Project Settings -> API)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOi...

# 2. PayMongo Public Key (From Developers -> API Keys)
VITE_PAYMONGO_PUBLIC_KEY=pk_test_...

# 3. PayMongo Edge Function (Once deployed in Step 3)
VITE_PAYMONGO_CHECKOUT_FUNCTION_URL=https://your-project.supabase.co/functions/v1/create-checkout-session

# 4. PayMongo Server Secrets (Deploy to Supabase Secrets, NOT frontend)
PAYMONGO_SECRET_KEY=sk_test_...
PAYMONGO_WEBHOOK_SECRET=whsec_...
```

Once `.env` has valid `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`, restart the dev server (`npm run dev`). `api.isLiveDatabase()` will return `true`, and the app will instantly query live Supabase!

### Step 3: Deploy PayMongo Edge Functions & Webhooks
1. Install Supabase CLI (if not already installed):
   ```bash
   brew install supabase/tap/supabase
   supabase login
   supabase link --project-ref your-project-ref
   ```
2. Set backend secrets in Supabase:
   ```bash
   supabase secrets set PAYMONGO_SECRET_KEY=sk_test_your_secret_key
   supabase secrets set PAYMONGO_WEBHOOK_SECRET=whsec_your_webhook_secret
   ```
3. Deploy the checkout creation Edge Function:
   ```bash
   supabase functions deploy create-checkout-session --no-verify-jwt
   ```
4. Deploy the payment webhook listener:
   ```bash
   supabase functions deploy paymongo-webhook --no-verify-jwt
   ```
5. In the [PayMongo Dashboard](https://dashboard.paymongo.com) -> Developers -> Webhooks:
   * Add endpoint URL: `https://your-project.supabase.co/functions/v1/paymongo-webhook`
   * Select events: `checkout_session.payment.paid`
   * Copy the Signing Secret to `PAYMONGO_WEBHOOK_SECRET`.

### Step 4: Seed Initial Jobs
To populate the live `public.jobs` table with our vetted Philippine roles:
* In `supabase/schema.sql`, Section 7 contains initial seed jobs (Coins.ph, SGV & Co. / Ernst & Young, Canva, Sprout Solutions).
* Running `schema.sql` automatically inserts these initial roles.

### Step 5: Test the End-to-End Live Loop
1. **Sign Up**: Register a real email at `http://localhost:5173/#/auth`. Check Supabase `auth.users` and `public.profiles`—verify `wallet_balance` is `50.00`.
2. **First Application**: Go to Dashboard, click **Quick Apply (₱50)** on Coins.ph, sign off, and submit.
   * Verify an entry is inserted into `public.applications`.
   * Verify `wallet_balance` in `public.profiles` decrements to `0.00`.
3. **Top Up**: Click **+ Buy Credits**, choose Starter (₱250 for 5 apps) or Job Hunter (₱500 for 11 apps).
   * Pay with PayMongo test GCash/Cards.
   * Verify webhook triggers, and `wallet_balance` increases by the purchased amount.

---

## 4. Frontend Code Guardrails for Nicky

* **Do not edit `src/components/Navbar.jsx`** or **`src/pages/LandingPage.jsx`** copy—these have been approved by Critiquito and Nick.
* **All API calls flow through `src/services/api.js`**:
  * `api.getUser()`
  * `api.login(email, password)`
  * `api.register(email, password, name)`
  * `api.applyToJob(job, tailoredData)`
  * `api.getJobs(limit)`
  * If you need to tweak database column mappings, update `src/services/supabaseService.js`.

---
*Ready for handover.*
