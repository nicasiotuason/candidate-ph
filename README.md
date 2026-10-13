# CANDIDATE.ph — High-Speed Job Matching Platform

> **Be Candidate #1.** Land the interview before the other 200 applicants arrive.

CANDIDATE.ph is a Philippine-first tech job matching platform that continuously scans open roles across major ATS platforms (Greenhouse, Lever, Workday, Ashby) twice daily, matches them with candidates based on their onboarding profile and resume, and allows 1-click Quick Apply with automatic wallet deductions.

---

## 🚀 Key Features

1. **Landing Page (`/`)**
   - High-fidelity conversion landing page based on `CandidatePH.html`.
   - Real-time scanning telemetry ticker (15,443+ roles).
   - Interactive sample matcher card with live timer and quick apply simulation.
   - Value contrast table: "The Old Way vs CANDIDATE.ph".

2. **Authentication (`/auth`)**
   - Dual-mode: Sign Up (with 50 free bonus credits banner) & Log In.
   - 1-Click quick demo shortcuts for fast local testing.

3. **3-Step Candidate Onboarding (`/onboarding`)**
   - **Step 1: Bio & Preferences**: Legal Name, Age, Birthdate, Citizenship (*Filipino / Dual*), Target Role, and Desired Salary.
   - **Step 2: Resume Upload**: Drag-and-drop zone for PDF/DOCX resumes (with pre-loaded sample resume for testing).
   - **Step 3: AI Resume Parser**: Dynamic parsing progress animation, extracted skill chips tag editor, and editable candidate summary.

4. **Customer Dashboard (`/dashboard`)**
   - **Telemetry**: Twice-daily scraper sync notice (6:00 AM & 6:00 PM PHT), total scanned roles, and live wallet balance.
   - **The "NICE CARD" Component**:
     - Company Name, Verified Badge, Industry, and Logo.
     - Role Title, Description, and Responsibilities.
     - 3 Metadata Tiles: Salary (₱180k–240k/mo), Setup (Hybrid BGC / Remote), and ATS Portal (Greenhouse / Lever).
     - **Skills Match Box**: Color-coded match badge ($\ge 60\%$), requirements counter, and green skill tags.
     - **Star Bookmark**: Save jobs to the Bookmarks tab.
     - **Quick Apply Trigger**: Opens the Review and Sign-Off screen.
   - **Tabs**:
     - **Matched Jobs (60%+ Only)**: Filterable by match threshold ($\ge 60\%$, $\ge 75\%$, $\ge 90\%$), work setup, and search query.
     - **Saved Jobs (⭐)**: Filtered view of bookmarked jobs.
     - **Applied Jobs**: Full audit trail of dispatched applications, delivery timestamps, ATS receipt IDs, and ₱50 debit logs.

5. **Review, Tweak Resume & Sign-Off Screen**
   - Displays the exact dossier to be dispatched to the employer's ATS.
   - **Direct Employer Communication Guarantee**: Reminds the applicant that employers reply directly to their personal email address.
   - **Tweak Resume Mode**: In-place resume editor to tailor headline, summary, and skills specifically for that employer.
   - **Applicant Sign-Off Checkbox**: Explicit authorization before sending.
   - **₱50 Wallet Deduction**: Debited only upon confirmed delivery to the ATS.
   - **Exit / Cancel**: Returns to the dashboard with ₱0 debited.

6. **PayMongo Wallet Reload Modal**
   - Reload presets: ₱100, ₱250 (*Most Popular*), ₱500, ₱1,000.
   - Channels: GCash, Maya, GrabPay, Credit/Debit Cards.
   - Real-time wallet credit and receipt generation.

7. **Community Wall ("Nice Things Said About Us")**
   - Applicant quotes and interview win stories.
   - Interactive comment box to post feedback in real time.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom design tokens (`Plus Jakarta Sans`, Cobalt & Tangerine palette)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State & Service Layer**: Decoupled `src/services/api.js` ready for REST/GraphQL backend plug-in

---

## 📁 Project Structure

```text
candidate-ph/
├── index.html                   # HTML entry with Plus Jakarta Sans & SEO meta
├── tailwind.config.js           # Tailwind configuration & brand tokens
├── src/
│   ├── components/
│   │   ├── Navbar.jsx           # Global header with wallet pill & view switcher
│   │   ├── JobCard.jsx          # The "NICE CARD" component (60%+ match feed)
│   │   ├── ReviewSignOffModal.jsx # Review, Tweak Resume & Sign-Off modal
│   │   ├── TopUpModal.jsx       # PayMongo reload modal (GCash, Maya, Cards)
│   │   └── FeedbackBox.jsx      # Community wall and comment box
│   ├── pages/
│   │   ├── LandingPage.jsx      # Landing page integrated from CandidatePH.html
│   │   ├── AuthPage.jsx         # Sign Up & Sign In with demo shortcuts
│   │   ├── OnboardingPage.jsx   # 3-step onboarding wizard & AI parser
│   │   └── DashboardPage.jsx    # Matched (60%+), Saved, and Applied jobs dashboard
│   ├── services/
│   │   ├── api.js               # Unified service layer (Mock ⇄ Live backend ready)
│   │   └── mockData.js          # Realistic Philippine tech roles, user profile & reviews
│   ├── App.jsx                  # Main application state & routing
│   ├── main.jsx
│   └── index.css                # Tailwind directives & CSS variable tokens
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

## 🔌 Connecting to Your Live Backend

In `src/services/api.js`, swap the mock handlers with your live backend URLs:
- `POST /api/auth/login` and `/api/auth/register`
- `POST /api/onboarding` (submits form data & PDF resume)
- `GET /api/jobs/matched` (returns scraped jobs $\ge 60\%$)
- `POST /api/jobs/:id/apply` (deducts ₱50 from wallet & dispatches to ATS)
- `POST /api/wallet/topup` (creates PayMongo checkout session)

---

## 📄 License
Private & Confidential — CANDIDATE.ph
