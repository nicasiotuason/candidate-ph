# CANDIDATE.ph — High-Speed Job Matching Platform

> **Be Candidate #1.** Land the interview before the other 200 applicants arrive.

CANDIDATE.ph is a Philippine-first tech job matching platform that continuously scans open roles across major ATS platforms (Greenhouse, Lever, Workday, Sprout, SmartRecruiters) twice daily, matches them with candidates based on their onboarding profile and resume, and allows 1-click Quick Apply with automatic ₱50 micro-transaction deductions.

---

## 🚀 Key Features

1. **Landing Page (`/`)**
   - High-fidelity conversion landing page based on `CandidatePH.html`.
   - Real-time scanning telemetry ticker (15,443+ Philippine roles).
   - Interactive sample matcher card with live timer and quick apply simulation.
   - Value contrast table: *"The Old Way vs CANDIDATE.ph"*.

2. **Authentication (`/auth`)**
   - Dual-mode: Sign Up (with ₱250 welcome credits / 5 applications) & Log In.
   - Progressive Supabase Auth with seamless local JWT fallback.
   - 1-Click quick demo shortcuts for instantaneous local testing.

3. **3-Step Candidate Onboarding (`/onboarding`)**
   - **Step 1: Bio & Preferences**: Legal Name, Age, Birthdate, Citizenship (*Filipino / Dual*), Target Role, Desired Salary.
   - **Step 2: Resume Upload**: Drag-and-drop zone for PDF/DOCX resumes (with pre-loaded sample resume).
   - **Step 3: AI Resume Parser**: Dynamic parsing animation, extracted skill chips tag editor, and editable candidate summary.

4. **Customer Dashboard (`/dashboard`)**
   - **Telemetry**: Twice-daily scraper sync notice (6:00 AM & 6:00 PM PHT), total scanned roles, and live wallet balance.
   - **The "NICE CARD" Component**:
     - Company Name, Verified Badge, Industry, and Logo.
     - Role Title, Description, and Responsibilities.
     - 3 Metadata Tiles: Salary (₱180k–240k/mo), Setup (Hybrid BGC / Remote), and ATS Portal (Greenhouse / Lever).
     - **Skills Match Box**: Color-coded match badge ($\ge 60\%$), requirements counter, and green skill tags.
     - **Star Bookmark**: Save jobs to the Bookmarks tab.
     - **Quick Apply Trigger**: Opens the Review and Sign-Off screen.
   - **Sub-Tabs**:
     - **Recommended (60%+ Only)**: Filterable by match threshold ($\ge 60\%$, $\ge 75\%$, $\ge 90\%$), work setup, and search query.
     - **Saved Bookmarks (⭐)**: Filtered view of bookmarked jobs.
     - **Applications Sent**: Full audit trail of dispatched applications, delivery timestamps, ATS receipt IDs, and ₱50 debit logs.

5. **Review, Tweak Resume & Role-Tailored Cover Letter (Included in ₱50 Price)**
   - **Customizable Cover Letter Generator**: Automatically tailored to employer requisitions with 3 selectable tones:
     - *Technical & Direct*
     - *Impact & Results-Driven*
     - *Collaborative & Culture Fit*
   - Displays the exact dossier dispatched to the employer's ATS.
   - **Direct Employer Communication Guarantee**: Reminds the applicant that employers reply directly to their personal email address.
   - **Tweak Resume Mode**: In-place resume editor to tailor headline, summary, and skills specifically for that employer.
   - **Applicant Sign-Off Checkbox**: Explicit authorization before sending.
   - **₱50 Wallet Deduction**: Debited only upon confirmed delivery to the ATS. If delivery fails, fee is ₱0.

6. **Viral Referral Program ("Give ₱50, Get ₱50")**
   - 1-click unique invite link & referral code copy.
   - 1-tap sharing via Telegram, WhatsApp/Viber, Facebook Messenger, and LinkedIn.
   - **Strict Verification Condition**: Credits are awarded **only when the invited friend actually signs up**, preventing link-spamming fraud.

7. **PayMongo Instant Gateway Reload Modal**
   - Bundles:
     - ₱200 (4 Apps @ ₱50/app)
     - ₱500 (11 Apps, +1 Free App, Save 10%)
     - ₱1,000 (24 Apps, +4 Free Apps, Save 17%)
   - Channels: **GCash**, **Maya**, **Visa/Mastercard Cards**, and **QR Ph**.
   - Interactive simulated sandbox checkout drawer with OTP confirmation in demo mode.
   - Official PayMongo transaction receipts (`RCP-PM-...`).
   - Serverless Supabase Edge Functions for live checkout session creation and webhook signature verification (`paymongo-webhook`).

8. **Founders' Command Center Telemetry**
   - Real-time operational metrics: Registered Users, Dispatched Applications, PayMongo GMV, Delivery Success (99.8%), Interview Callbacks.
   - Live Dispatch Stream.
   - **Infrastructure Diagnostics Panel**: Displays live database status (`PostgreSQL Supabase Live` vs `Local Demo Mode`) and PayMongo payment rails.

9. **Mobile Responsiveness Hardened**
   - 100% responsive across standard viewports (down to 390x844 iPhone 12/13/14).
   - Bottom-sheet drawer modals with drag indicators on mobile.
   - 44px+ thumb-accessible touch targets and 14px+ minimum input fonts to prevent iOS Safari auto-zoom.

---

## 🛠️ Tech Stack

- **Frontend**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with brand design tokens (`Plus Jakarta Sans`, Cobalt, Tangerine, Emerald)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Database**: [Supabase](https://supabase.com/) PostgreSQL with Row Level Security (RLS)
- **Payment Gateway**: [PayMongo](https://paymongo.com/) (GCash, Maya, Cards, QR Ph)
- **Edge Functions**: Deno / TypeScript serverless functions for PayMongo checkout & webhooks

---

## 📁 Project Structure

```text
candidate-ph/
├── index.html                   # HTML entry with Plus Jakarta Sans & SEO meta
├── tailwind.config.js           # Tailwind configuration & brand tokens
├── .env.example                 # Environment variable template for Supabase & PayMongo
├── src/
│   ├── components/
│   │   ├── Navbar.jsx           # Global header with wallet pill & view switcher
│   │   ├── JobCard.jsx          # The "NICE CARD" component (60%+ match feed)
│   │   ├── ReviewSignOffModal.jsx # Review, Tweak Resume & Role-Tailored Cover Letter
│   │   ├── TopUpModal.jsx       # PayMongo reload modal (GCash, Maya, Cards, QR Ph)
│   │   ├── InviteFriendsModal.jsx # "Give ₱50, Get ₱50" Viral Referral Modal
│   │   └── FeedbackBox.jsx      # Community wall and comment box
│   ├── pages/
│   │   ├── LandingPage.jsx      # Landing page integrated from CandidatePH.html
│   │   ├── AuthPage.jsx         # Sign Up & Sign In with demo shortcuts
│   │   ├── OnboardingPage.jsx   # 3-step onboarding wizard & AI parser
│   │   └── DashboardPage.jsx    # Matched, Saved, Applied jobs & Founders' Telemetry
│   ├── lib/
│   │   └── supabase.js          # Supabase client initializer & config detector
│   ├── services/
│   │   ├── api.js               # Optimistic hybrid bridge (Supabase ⇄ Local Storage)
│   │   ├── supabaseService.js   # Supabase typed queries (Auth, Profiles, Jobs, RLS)
│   │   ├── paymongoService.js   # PayMongo gateway service & bundle definitions
│   │   └── mockData.js          # Curated Philippine tech roles, user profile & reviews
│   ├── utils/
│   │   ├── coverLetterGenerator.js # Role-tailored cover letter generator (3 tones)
│   │   └── formatters.js        # Formatting helpers (PHP currency, dates)
│   ├── App.jsx                  # Main application state & routing
│   ├── main.jsx
│   └── index.css                # Tailwind directives & CSS variable tokens
├── supabase/
│   ├── schema.sql               # Complete PostgreSQL schema, tables, triggers & RLS
│   └── functions/
│       ├── create-checkout-session/index.ts # Edge function for PayMongo sessions
│       └── paymongo-webhook/index.ts        # Edge function with HMAC-SHA256 verification
└── package.json
```

---

## 💻 Local Development

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Build for production
npm run build
```

Open `http://localhost:5173/` in your browser.

---

## 🔌 Nicky's Handover Checklist

To connect CANDIDATE.ph to live production backends:

### 1. Supabase Setup
1. Create a project on [Supabase.com](https://supabase.com).
2. Open the **SQL Editor** in Supabase and paste the contents of `supabase/schema.sql`. Run the script. This creates all tables, triggers, and RLS policies.
3. Retrieve your **Project URL** and **Anon Public Key** from *Project Settings -> API*.

### 2. PayMongo Setup
1. Create an account on [PayMongo.com](https://paymongo.com).
2. Retrieve your **Public Key** (`pk_live_...` or `pk_test_...`) and **Secret Key** (`sk_live_...` or `sk_test_...`) from *Developers -> API Keys*.
3. Deploy the webhook Edge Function:
   ```bash
   supabase functions deploy paymongo-webhook --no-verify-jwt
   supabase functions deploy create-checkout-session --no-verify-jwt
   ```
4. In PayMongo Dashboard -> *Webhooks*, add the endpoint URL:
   `https://<your-project>.supabase.co/functions/v1/paymongo-webhook`
   and copy your **Webhook Signing Secret** (`whsec_...`).

### 3. Configure `.env`
Create `.env` in the root directory:

```env
# Supabase PostgreSQL
VITE_SUPABASE_URL=https://<your-project>.supabase.co
VITE_SUPABASE_ANON_KEY=<your-anon-key>

# PayMongo Gateway
VITE_PAYMONGO_PUBLIC_KEY=pk_test_<your-public-key>
PAYMONGO_SECRET_KEY=sk_test_<your-secret-key>
PAYMONGO_WEBHOOK_SECRET=whsec_<your-webhook-secret>
```

CANDIDATE.ph will automatically detect these credentials and transition seamlessly from demo mode to live production!

---

## 📄 License
Private & Confidential — CANDIDATE.ph
