import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  Search, 
  Send, 
  Mail, 
  ArrowRight, 
  Check, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  ShieldCheck, 
  Clock, 
  Sparkles, 
  Gift, 
  Filter, 
  Lock, 
  UserCheck, 
  ChevronLeft, 
  ChevronRight,
  Briefcase,
  FileCheck2,
  Building2,
  Heart,
  ChevronDown,
  MapPin,
  HelpCircle,
  TrendingUp,
  X
} from 'lucide-react';
import DashboardPage from './DashboardPage';
import JobCard from '../components/JobCard';
import { formatProperName } from '../utils/formatters';

const THEMES = {
  'indigo-mint': {
    name: 'Electric Indigo & Mint',
    primary: '#4F46E5',
    primaryHover: '#4338CA',
    primaryLight: '#EEF2FF',
    primaryBorder: '#C7D2FE',
    secondary: '#10B981',
    secondaryHover: '#059669',
    secondaryLight: '#ECFDF5',
    secondaryBorder: '#A7F3D0'
  },
  'cobalt-tangerine': {
    name: 'Velocity Cobalt & Tangerine',
    primary: '#2563EB',
    primaryHover: '#1D4ED8',
    primaryLight: '#EFF6FF',
    primaryBorder: '#BFDBFE',
    secondary: '#F97316',
    secondaryHover: '#EA580C',
    secondaryLight: '#FFF7ED',
    secondaryBorder: '#FED7AA'
  },
  'teal-emerald': {
    name: 'Deep Teal & Emerald',
    primary: '#0F766E',
    primaryHover: '#115E59',
    primaryLight: '#F0FDFA',
    primaryBorder: '#99F6E4',
    secondary: '#059669',
    secondaryHover: '#047857',
    secondaryLight: '#ECFDF5',
    secondaryBorder: '#A7F3D0'
  },
  'violet-lime': {
    name: 'Royal Violet & Neon Lime',
    primary: '#7C3AED',
    primaryHover: '#6D28D9',
    primaryLight: '#F5F3FF',
    primaryBorder: '#DDD6FE',
    secondary: '#84CC16',
    secondaryHover: '#65A30D',
    secondaryLight: '#F7FEE7',
    secondaryBorder: '#D9F99D'
  }
};

const LIVE_HERO_JOBS = [
  {
    id: "job_01",
    company: "Maya",
    industry: "Digital Banking & Payments",
    logo: "M",
    logoColor: "bg-emerald-600 text-white",
    title: "Senior Full Stack Engineer (FinTech)",
    salary: "₱180,000 – ₱240,000 / mo",
    location: "BGC, Taguig",
    setup: "Hybrid (2 days on-site)",
    type: "Full-Time",
    level: "Mid-Senior Level",
    experience: "5+ yrs exp",
    postedAgo: "Discovered 1 hour ago",
    applicantCount: "< 20 applicants",
    matchScore: 98,
    matchLabel: "STRONG MATCH",
    jobDescription: "Architect and scale high-throughput digital wallet architectures, QR payment gateways, and checkout micro-frontends serving 10M+ daily consumer transactions.",
    responsibilities: [
      "Design secure React 18 & Go payment microservices with sub-second latency",
      "Optimize web client performance and core user checkout flows"
    ],
    fitReasons: [
      "4/4 Core Skills Met (React 18, TypeScript, Node.js, Go)",
      "Salary exceeds your ₱150k monthly floor",
      "Matches your preferred BGC Hybrid setup"
    ]
  },
  {
    id: "job_02",
    company: "Globe Telecom",
    industry: "Telecommunications & Tech",
    logo: "G",
    logoColor: "bg-blue-600 text-white",
    title: "Growth Marketing & Retention Lead",
    salary: "₱130,000 – ₱170,000 / mo",
    location: "BGC, Taguig",
    setup: "Hybrid (1 day on-site)",
    type: "Full-Time",
    level: "Senior / Lead",
    experience: "6+ yrs exp",
    postedAgo: "Discovered 45m ago",
    applicantCount: "< 15 applicants",
    matchScore: 94,
    matchLabel: "STRONG MATCH",
    jobDescription: "Own end-to-end subscriber retention, churn prediction experiments, and automated lifecycle CRM campaigns across postpaid and broadband digital subscribers.",
    responsibilities: [
      "Lead omni-channel campaigns across push, SMS, and in-app triggers",
      "Analyze cohort retention metrics with data science and product teams"
    ],
    fitReasons: [
      "Verified B2C retention & lifecycle marketing skills",
      "Salary exceeds your ₱120k monthly floor",
      "Direct match with consumer digital apps"
    ]
  },
  {
    id: "job_03",
    company: "Canva Philippines",
    industry: "Design Tech & Global SaaS",
    logo: "C",
    logoColor: "bg-cyan-600 text-white",
    title: "Product Operations & Strategy Lead",
    salary: "Salary not disclosed • Est. Market: ₱110,000 – ₱150,000 / mo",
    location: "Makati CBD / Remote",
    setup: "Flexible Hub",
    type: "Full-Time",
    level: "Lead Level",
    experience: "5+ yrs exp",
    postedAgo: "Discovered 2 hours ago",
    applicantCount: "< 25 applicants",
    matchScore: 96,
    matchLabel: "STRONG MATCH",
    jobDescription: "Lead operational cadences, cross-functional tooling readiness, and product release enablement across Canva’s Asia-Pacific design platform.",
    responsibilities: [
      "Streamline engineering-to-product roadmaps and release gates",
      "Drive cross-hub operational alignment between Manila and Sydney"
    ],
    fitReasons: [
      "Product operations & cross-functional leadership fit",
      "Salary estimated in top-quartile market band",
      "Work From Home friendly flexible arrangement"
    ]
  },
  {
    id: "job_04",
    company: "SeaMoney",
    industry: "ShopeePay & Digital Finance",
    logo: "S",
    logoColor: "bg-orange-600 text-white",
    title: "Lead Cloud & Microservices Architect",
    salary: "₱190,000 – ₱260,000 / mo",
    location: "Ortigas Center",
    setup: "Hybrid or Remote",
    type: "Full-Time",
    level: "Staff / Principal",
    experience: "8+ yrs exp",
    postedAgo: "Discovered 15m ago",
    applicantCount: "< 5 applicants",
    matchScore: 99,
    matchLabel: "EXCEPTIONAL MATCH",
    jobDescription: "Architect scalable cloud infrastructure, Kafka event-streaming pipelines, and low-latency microservices for ShopeePay digital lending and consumer credit.",
    responsibilities: [
      "Lead zero-downtime database migrations and microservice decoupled architecture",
      "Maintain 99.99% system availability during national 11.11 / 12.12 flash sales"
    ],
    fitReasons: [
      "High-concurrency systems expertise (Kafka, Go, AWS)",
      "Top-tier compensation exceeding senior band",
      "Early bird opening (< 5 total submissions)"
    ]
  }
];

const FAQ_ITEMS = [
  {
    q: "How does CANDIDATE.ph work?",
    a: "Upload your master resume once and set your preferences (minimum monthly salary in ₱ and preferred Metro Manila hub or remote). Our engine searches open roles across top Philippine employers daily at ₱0 cost, matches them to your background, and prepares an ATS-tailored application package. You review and sign off on every detail before anything is sent."
  },
  {
    q: "What does the ₱50 fee cover, and when am I charged?",
    a: "Searching and matching is ₱0 free forever. You only pay ₱50 when you decide to apply to a specific role. Crucially, the ₱50 is only deducted once the employer's official career portal verifies successful receipt. Every new account receives ₱50 in free starting balance, so your first application is 100% on us."
  },
  {
    q: "What is the Zero Middleman Guarantee?",
    a: "Employers receive your application with your personal email as the direct contact point. When a recruiter or hiring manager invites you to interview, their reply lands directly in your private inbox (Gmail, Outlook, Yahoo). We never gatekeep your messages, hide employer contact details, or take a percentage of your salary."
  },
  {
    q: "How does the Resume Tweak work? Does it invent experience?",
    a: "Never. Our engine never invents fake credentials or hallucinates experience. It simply re-orders and highlights your authentic skills and accomplishments to match the specific keywords the employer's ATS screening filter is searching for. Before sending, you can choose between the Tailored Resume or your Original Master Resume."
  },
  {
    q: "How do I buy application credits? Is there a monthly subscription?",
    a: "There are zero recurring monthly subscriptions. You buy application credits on-demand via PayMongo using GCash, Maya, or Debit/Credit cards. You can purchase 4 applications for ₱200, 11 for ₱500, or 24 for ₱1,000. Your credits never expire."
  },
  {
    q: "Can I edit my profile and salary floor after signing up?",
    a: "Yes, at any time. You have full editing control over your target salary, preferred hubs, work experience, education, and skill tags. Updating your profile immediately re-calibrates your matched job feed in real time."
  }
];

export default function LandingPage({ 
  user,
  jobs,
  savedJobIds,
  appliedJobs,
  testimonials,
  onToggleSaveJob,
  onConfirmApply,
  onTopUpSuccess,
  onAddTestimonial,
  onStartSignUp, 
  onLoginClick, 
  onOpenDashboard, 
  onQuickApplyFromLanding 
}) {
  const [currentJobIdx, setCurrentJobIdx] = useState(0);
  const [heroEmail, setHeroEmail] = useState('');
  const [footerEmail, setFooterEmail] = useState('');
  const [activeThemeKey, setActiveThemeKey] = useState('cobalt-tangerine');
  const [cardTimerSeconds, setCardTimerSeconds] = useState(4706);
  const [tickerCount, setTickerCount] = useState(15443);
  const [openFaqIdx, setOpenFaqIdx] = useState(null);

  const toggleFaq = (idx) => {
    setOpenFaqIdx(openFaqIdx === idx ? null : idx);
  };

  const activeJob = LIVE_HERO_JOBS[currentJobIdx % LIVE_HERO_JOBS.length];

  // Theme switcher
  const applyTheme = (key) => {
    setActiveThemeKey(key);
    const theme = THEMES[key];
    if (!theme) return;
    const root = document.documentElement;
    root.style.setProperty('--theme-primary', theme.primary);
    root.style.setProperty('--theme-primary-hover', theme.primaryHover);
    root.style.setProperty('--theme-primary-light', theme.primaryLight);
    root.style.setProperty('--theme-primary-border', theme.primaryBorder);
    root.style.setProperty('--theme-secondary', theme.secondary);
    root.style.setProperty('--theme-secondary-hover', theme.secondaryHover);
    root.style.setProperty('--theme-secondary-light', theme.secondaryLight);
    root.style.setProperty('--theme-secondary-border', theme.secondaryBorder);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCardTimerSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTickerCount(prev => prev + (Math.floor(Math.random() * 5) - 2));
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const formatTimer = (totalSec) => {
    const hrs = Math.floor(totalSec / 3600).toString().padStart(2, '0');
    const mins = Math.floor((totalSec % 3600) / 60).toString().padStart(2, '0');
    const secs = (totalSec % 60).toString().padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
  };

  const nextJob = () => {
    const nextIdx = (currentJobIdx + 1) % LIVE_HERO_JOBS.length;
    setCurrentJobIdx(nextIdx);
    setCardTimerSeconds(LIVE_HERO_JOBS[nextIdx].initialSeconds);
  };

  const prevJob = () => {
    const prevIdx = (currentJobIdx - 1 + LIVE_HERO_JOBS.length) % LIVE_HERO_JOBS.length;
    setCurrentJobIdx(prevIdx);
    setCardTimerSeconds(LIVE_HERO_JOBS[prevIdx].initialSeconds);
  };

  return (
    <div className="bg-[#F8FAFC] text-slate-800 font-sans antialiased">

      {/* ========================================================================= */}
      {/* 1. HERO SECTION: SPEED & COMPLETE SAMPLE MATCHER CARD */}
      {/* ========================================================================= */}
      <section className="relative pt-8 pb-16 md:pt-14 md:pb-24 overflow-hidden grid-dot-pattern" id="live-jobs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
            
            {/* Left: Value Proposition */}
            <div className="lg:col-span-6 space-y-5 text-left">
              
              {/* Intelligent Search Telemetry Pill */}
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50/90 border border-amber-200/90 text-amber-900 text-xs font-semibold">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                  <span>Monitoring <strong className="text-amber-950 font-bold">{tickerCount.toLocaleString()}</strong> + Philippine Professional & Tech Roles</span>
                </div>
              </div>

              {/* Eyebrow Badge */}
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-50 border border-blue-100 text-theme-primary text-xs font-extrabold uppercase tracking-wider">
                  <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>THE EARLY BIRD ADVANTAGE</span>
                </div>
              </div>

              {/* Main Headline with Breathing Room & Font Hierarchy */}
              <div className="space-y-4">
                <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-slate-900 leading-[1.2]">
                  The Smart Job Matching Engine for <span className="text-theme-primary">Filipino Professionals.</span>
                </h1>
                <div className="pt-2">
                  <p className="text-xl sm:text-2xl lg:text-[25px] font-extrabold text-slate-900 leading-snug">
                    Be <span className="text-theme-primary">Candidate #1</span> before the role gets flooded.
                  </p>
                </div>
              </div>

              {/* Subheadline with clear applicant control */}
              <p className="text-sm sm:text-base text-slate-800 font-normal leading-relaxed max-w-xl pt-2">
                Upload your resume once. We search open roles at top employers, match them to your qualifications and skills, and deliver your tailored application directly to the hiring team when you decide to apply.
              </p>

              {/* 2 Mini Value Proposition Cards (Larger titles, prices, and high-contrast darker text) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl pt-3">
                <div className="p-4 sm:p-4.5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between space-y-2 text-left">
                  <div className="flex items-center gap-1.5 text-xs sm:text-[13px] font-extrabold text-amber-800 uppercase tracking-wider">
                    <Search className="w-4 h-4 text-amber-600" />
                    <span>SMART SEARCH & MATCH</span>
                  </div>
                  <p className="text-2xl font-black text-slate-900 flex items-baseline gap-2">
                    ₱0 <span className="text-sm sm:text-base font-bold text-amber-700">Free Forever</span>
                  </p>
                  <p className="text-xs sm:text-[13px] text-slate-800 font-normal leading-relaxed">
                    Always turned on. Our engine searches open roles and matches them to your background daily at zero cost.
                  </p>
                </div>

                <div className="p-4 sm:p-4.5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between space-y-2 text-left">
                  <div className="flex items-center gap-1.5 text-xs sm:text-[13px] font-extrabold text-theme-primary uppercase tracking-wider">
                    <Send className="w-4 h-4 text-theme-primary" />
                    <span>YOU ONLY PAY WHEN YOU APPLY</span>
                  </div>
                  <p className="text-2xl font-black text-slate-900 flex items-baseline gap-2">
                    ₱50 <span className="text-sm sm:text-base font-bold text-slate-800">per application</span>
                  </p>
                  <p className="text-xs sm:text-[13px] text-slate-800 font-normal leading-relaxed">
                    Zero subscriptions or monthly lock-ins. You only spend ₱50 when you decide to send your tailored application.
                  </p>
                </div>
              </div>

              {/* Signup Input Form */}
              <div className="max-w-xl pt-1">
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    onStartSignUp(heroEmail || 'applicant@email.com');
                  }} 
                  className="bg-white p-1.5 sm:p-2 rounded-2xl shadow-elevated border border-slate-200 flex flex-col sm:flex-row gap-2"
                >
                  <div className="relative flex-1 flex items-center">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                    <input 
                      type="email" 
                      required
                      value={heroEmail}
                      onChange={(e) => setHeroEmail(e.target.value)}
                      placeholder="you@email.com" 
                      className="w-full pl-10 pr-3 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none rounded-xl"
                    />
                  </div>
                  <button 
                    type="submit"
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-md whitespace-nowrap cursor-pointer"
                  >
                    <div className="flex flex-col text-left leading-tight">
                      <span className="text-xs sm:text-sm font-black tracking-wide">SIGN UP</span>
                      <span className="text-[10px] sm:text-[11px] font-semibold text-blue-100">Claim ₱50 First Application</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-amber-300" />
                  </button>
                </form>

                <div className="flex flex-wrap items-center gap-4 sm:gap-5 mt-3 text-xs text-slate-700 font-medium">
                  <span className="flex items-center gap-1 text-amber-800 font-medium"><Check className="w-3.5 h-3.5 text-amber-600" /> 1st Application 100% Free</span>
                  <span className="flex items-center gap-1 text-amber-800 font-medium"><Check className="w-3.5 h-3.5 text-amber-600" /> No credit card required</span>
                  <span className="flex items-center gap-1 text-amber-800 font-medium"><Check className="w-3.5 h-3.5 text-amber-600" /> Balance never expires</span>
                </div>
              </div>

            </div>

            {/* Right: The Two-Zone Match Card (Jobright-Inspired Pattern) */}
            <div className="lg:col-span-6 w-full">
              <JobCard
                job={activeJob}
                isSaved={savedJobIds?.includes(activeJob.id)}
                onToggleSave={() => onToggleSaveJob && onToggleSaveJob(activeJob.id)}
                onQuickApply={() => onQuickApplyFromLanding(activeJob)}
                footerChildren={
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={prevJob} 
                        aria-label="Previous sample role" 
                        className="w-8 h-8 rounded-lg border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-50 flex items-center justify-center transition-colors cursor-pointer"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={nextJob} 
                        aria-label="Next sample role" 
                        className="w-8 h-8 rounded-lg border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-50 flex items-center justify-center transition-colors cursor-pointer"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                      <span className="text-slate-700 font-medium pl-1">
                        Sample <strong className="text-slate-900 font-bold">{currentJobIdx + 1}</strong> of {LIVE_HERO_JOBS.length}
                      </span>
                    </div>

                    <span className="text-[11px] font-semibold text-slate-700 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
                      <span>Real-Time Philippine Role Preview</span>
                    </span>
                  </div>
                }
              />
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. HOW IT WORKS: 3 SIMPLE STEPS + ZERO MIDDLEMAN GUARANTEE */}
      {/* ========================================================================= */}
      <section id="how-it-works" className="py-20 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-theme-primary bg-theme-primary-light px-3 py-1 rounded-full border border-theme-primary-border">
              Frictionless Setup
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">
              Ready In 3 Minutes
            </h2>
            <p className="text-slate-800 text-base mt-2">
              Upload your resume once. Let our matching engine search openings and deliver tailored applications on your command.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            
            <div className="bg-slate-50 p-7 rounded-3xl border border-slate-200 flex flex-col justify-between shadow-xs">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-black text-lg flex items-center justify-center mb-5 shadow-xs">
                  1
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Upload Your Master Resume</h3>
                <p className="text-sm text-slate-800 leading-relaxed mb-4">
                  Upload your current resume once. Our engine extracts your real skills, years of experience, and credentials in 3 seconds.
                </p>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-800 flex items-center gap-2">
                <Gift className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>₱50 Free Balance unlocked automatically on sign-up.</span>
              </div>
            </div>

            <div className="bg-slate-50 p-7 rounded-3xl border border-slate-200 flex flex-col justify-between shadow-xs">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-black text-lg flex items-center justify-center mb-5 shadow-xs">
                  2
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Set Your Salary & Hubs</h3>
                <p className="text-sm text-slate-800 leading-relaxed mb-4">
                  Specify your target monthly salary in ₱ (e.g. minimum ₱80,000/mo) and preferred setup (BGC, Makati, or 100% Remote). Lowball offers are hidden.
                </p>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-800 flex items-center gap-2">
                <Filter className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Strict 60%+ Match: Only qualified roles appear in your feed.</span>
              </div>
            </div>

            <div className="bg-slate-50 p-7 rounded-3xl border border-slate-200 flex flex-col justify-between shadow-xs">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-black text-lg flex items-center justify-center mb-5 shadow-xs">
                  3
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Review, Tweak & Apply</h3>
                <p className="text-sm text-slate-800 leading-relaxed mb-4">
                  When a matched role appears, preview the tailored resume alongside your original. Approve every word, then dispatch directly to the employer for ₱50.
                </p>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-800 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Always ₱0 to search; only ₱50 when you choose to apply.</span>
              </div>
            </div>

          </div>

          {/* Prominent Zero-Middleman / We Don't Own The Employer Callout */}
          <div className="mt-12 max-w-4xl mx-auto p-6 sm:p-7 rounded-3xl bg-emerald-50 border-2 border-emerald-200 text-emerald-950 flex flex-col sm:flex-row items-start sm:items-center gap-4 text-left shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="space-y-1 flex-1">
              <h4 className="text-base font-extrabold text-emerald-900">
                Zero Middleman Guarantee: We Don't Own the Employer
              </h4>
              <p className="text-xs sm:text-sm text-emerald-800 leading-relaxed">
                Employers receive your application directly in their official hiring channel with your personal email address. When they invite you to interview, their reply lands straight in your private inbox (Gmail, Outlook, Yahoo). We never intercept messages, gatekeep communications, or take a percentage of your salary. You maintain 100% direct control.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. THE CONTRAST: THE USUAL WAY VS CANDIDATE.PH */}
      {/* ========================================================================= */}
      <section id="comparison" className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-theme-primary bg-theme-primary-light px-3 py-1 rounded-full border border-theme-primary-border">
              The Contrast
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              How Everyone Else Searches vs. How CANDIDATE.ph Does It
            </h2>
            <p className="text-slate-800 text-base sm:text-lg">
              If you've spent weeks browsing job boards only to get zero responses, here is why your current approach feels exhausting—and how our matching engine fixes it.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
            
            {/* The Usual Way */}
            <div className="rounded-3xl p-7 sm:p-8 bg-slate-50 border-2 border-red-200/80 space-y-6 flex flex-col justify-between text-left">
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-red-200/60">
                  <span className="text-base font-extrabold text-red-700 flex items-center gap-2">
                    <XCircle className="w-5 h-5 text-red-500" />
                    The Usual Job Hunt
                  </span>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-red-100 text-red-800">Tiring & Slow</span>
                </div>

                <div className="space-y-1.5">
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-red-100 text-red-700 text-xs flex items-center justify-center font-bold">1</span>
                    Opening 15 browser tabs every single day
                  </h4>
                  <p className="text-xs text-slate-800 leading-relaxed pl-7">
                    You manually check JobStreet, LinkedIn, and Indeed hoping to find openings before they get flooded.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-red-100 text-red-700 text-xs flex items-center justify-center font-bold">2</span>
                    Re-typing your resume into 40 company forms
                  </h4>
                  <p className="text-xs text-slate-800 leading-relaxed pl-7">
                    Every employer forces you to create a new login, then spend 45 minutes re-typing your school, work dates, and references from scratch.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-red-100 text-red-700 text-xs flex items-center justify-center font-bold">3</span>
                    Sending one generic resume everywhere
                  </h4>
                  <p className="text-xs text-slate-800 leading-relaxed pl-7">
                    Because tailoring takes too long, you submit the same PDF everywhere—and automated company filters discard it.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-red-100 text-red-700 text-xs flex items-center justify-center font-bold">4</span>
                    Applying days too late
                  </h4>
                  <p className="text-xs text-slate-800 leading-relaxed pl-7">
                    By the time you see the job, hundreds of applicants have already applied, and the recruiter has stopped reviewing new resumes.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-red-200/60 text-xs font-semibold text-red-600 text-center">
                Result: Weeks of exhausting work with almost zero interview callbacks.
              </div>
            </div>

            {/* The Candidate.ph Way */}
            <div className="rounded-3xl p-7 sm:p-8 bg-white border-2 border-theme-primary shadow-elevated space-y-6 flex flex-col justify-between text-left">
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-theme-primary-border">
                  <span className="text-base font-extrabold text-theme-primary flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    The CANDIDATE.ph Way
                  </span>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-theme-primary-light text-theme-primary">Fast & Easy</span>
                </div>

                <div className="space-y-1.5">
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-xs flex items-center justify-center font-bold">1</span>
                    Intelligent Search & Match Engine
                  </h4>
                  <p className="text-xs text-slate-800 leading-relaxed pl-7">
                    Upload your resume once and set your target salary. We search open roles and present only the ones matching 60%+ of your stack.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-xs flex items-center justify-center font-bold">2</span>
                    Review & Tweak Before You Send
                  </h4>
                  <p className="text-xs text-slate-800 leading-relaxed pl-7">
                    Never send blindly. You get a full preview and can tailor your headline, summary, and skills specifically for that role before sign-off.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-xs flex items-center justify-center font-bold">3</span>
                    Direct to the Employer's Hiring Team
                  </h4>
                  <p className="text-xs text-slate-800 leading-relaxed pl-7">
                    We deliver your packaged application straight into the employer's official candidate portal, and they reply directly to your personal email.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-xs flex items-center justify-center font-bold">4</span>
                    The Early Bird Advantage
                  </h4>
                  <p className="text-xs text-slate-800 leading-relaxed pl-7">
                    Apply within hours of the opening going live—while the applicant pool is still very small and the hiring manager is reviewing every submission.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-theme-primary-border text-xs font-bold text-emerald-700 text-center flex items-center justify-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                Result: 6x higher interview callbacks with 90% less manual effort.
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. INSIDE THE DASHBOARD: INTERACTIVE APP PREVIEW */}
      {/* ========================================================================= */}
      <section id="dashboard-preview" className="py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Live Product Experience
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Inside Your Candidate.ph Dashboard
            </h2>
            <p className="text-slate-800 text-base sm:text-lg">
              Here is the actual Dashboard you experience as a verified candidate. Real-time matched roles, application tracking, and direct recruiter delivery receipts.
            </p>
          </div>

          {/* The Actual Live Dashboard */}
          <div className="bg-white/80 rounded-3xl border border-slate-200/90 shadow-elevated p-2 sm:p-6">
            <DashboardPage
              user={user}
              jobs={jobs || []}
              savedJobIds={savedJobIds || []}
              appliedJobs={appliedJobs || []}
              testimonials={testimonials || []}
              onToggleSaveJob={onToggleSaveJob}
              onConfirmApply={onConfirmApply}
              onTopUpSuccess={onTopUpSuccess}
              onAddTestimonial={onAddTestimonial}
              isLandingPreview={true}
            />
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. THE STRATEGY: WHY TIMING & RELEVANCE WORK */}
      {/* ========================================================================= */}
      <section id="the-science" className="py-20 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-theme-primary bg-theme-primary-light px-3 py-1 rounded-full border border-theme-primary-border">
              The Strategy
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              Why CANDIDATE.ph Gets You Invited to More Interviews
            </h2>
            <p className="text-slate-800 text-base sm:text-lg">
              Landing an interview is not just about qualifications—it is about timing, relevance, and being in the first batch reviewed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 hover:border-theme-primary transition-all space-y-4 shadow-xs flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-theme-primary-light text-theme-primary flex items-center justify-center font-bold">
                  <Clock className="w-6 h-6" />
                </div>
                <div className="text-3xl font-black text-slate-900">4x–8x Callbacks</div>
                <h3 className="text-base font-bold text-slate-900">The Early Bird Advantage</h3>
                <p className="text-xs text-slate-800 leading-relaxed font-normal">
                  Hiring teams don't read through 300 resumes—they interview qualified candidates from the first batch that arrives. Applying within the first few hours places your name on the recruiter's desk while their calendar is still completely open.
                </p>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200 text-[11px] text-slate-800 font-medium">
                <span className="font-bold text-slate-900">TalentWorks Recruitment Study:</span> Applicants who submit within the first 96 hours are up to 8x more likely to secure an interview.
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 hover:border-emerald-300 transition-all space-y-4 shadow-xs flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  <FileCheck2 className="w-6 h-6" />
                </div>
                <div className="text-3xl font-black text-emerald-600">First 25 Applicants</div>
                <h3 className="text-base font-bold text-slate-900">The Critical Review Window</h3>
                <p className="text-xs text-slate-800 leading-relaxed font-normal">
                  Recruiters lock in their candidate shortlists rapidly. Being Candidate #1 to #25 gives you priority evaluation before hiring managers stop reviewing inbound resumes due to volume.
                </p>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200 text-[11px] text-slate-800 font-medium">
                <span className="font-bold text-slate-900">LinkedIn Talent Insights:</span> Over 70% of professional hires are scheduled from the first 25 applicants reviewed.
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 hover:border-amber-300 transition-all space-y-4 shadow-xs flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div className="text-3xl font-black text-amber-600">100% Direct Replies</div>
                <h3 className="text-base font-bold text-slate-900">Zero Middleman Delivery</h3>
                <p className="text-xs text-slate-800 leading-relaxed font-normal">
                  Your tailored application package lands directly in the company's official hiring inbox. Recruiters reply straight to your personal email address—giving you 100% direct control over your interview process.
                </p>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200 text-[11px] text-slate-800 font-medium">
                <span className="font-bold text-slate-900">Direct Recruiter Channel:</span> Zero platform message gating and zero salary commissions taken from your compensation.
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. ACTIVELY MONITORED COMPANIES */}
      {/* ========================================================================= */}
      <section className="py-16 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600">Actively Monitored Tech & Corporate Hubs</h3>
            <p className="text-lg font-extrabold text-slate-900">We continuously search open roles at top employers across the Philippines.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
            
            <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center flex flex-col items-center justify-center shadow-xs">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black text-sm mb-2 shadow-xs">M</div>
              <span className="font-bold text-slate-900 text-xs">Maya</span>
              <span className="text-[10px] text-slate-600">Fintech</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center flex flex-col items-center justify-center shadow-xs">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-sm mb-2 shadow-xs">G</div>
              <span className="font-bold text-slate-900 text-xs">GCash</span>
              <span className="text-[10px] text-slate-600">Mynt</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center flex flex-col items-center justify-center shadow-xs">
              <div className="w-9 h-9 rounded-xl bg-cyan-600 text-white flex items-center justify-center font-black text-sm mb-2 shadow-xs">C</div>
              <span className="font-bold text-slate-900 text-xs">Canva Manila</span>
              <span className="text-[10px] text-slate-600">Makati Hub</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center flex flex-col items-center justify-center shadow-xs">
              <div className="w-9 h-9 rounded-xl bg-orange-600 text-white flex items-center justify-center font-black text-sm mb-2 shadow-xs">S</div>
              <span className="font-bold text-slate-900 text-xs">SeaMoney</span>
              <span className="text-[10px] text-slate-600">ShopeePay</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center flex flex-col items-center justify-center shadow-xs">
              <div className="w-9 h-9 rounded-xl bg-blue-900 text-white flex items-center justify-center font-black text-sm mb-2 shadow-xs">GL</div>
              <span className="font-bold text-slate-900 text-xs">Globe Telecom</span>
              <span className="text-[10px] text-slate-600">BGC Corporate</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center flex flex-col items-center justify-center shadow-xs">
              <div className="w-9 h-9 rounded-xl bg-purple-700 text-white flex items-center justify-center font-black text-sm mb-2 shadow-xs">&gt;</div>
              <span className="font-bold text-slate-900 text-xs">Accenture PH</span>
              <span className="text-[10px] text-slate-600">Technology</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center flex flex-col items-center justify-center shadow-xs">
              <div className="w-9 h-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-black text-sm mb-2 shadow-xs">🪙</div>
              <span className="font-bold text-slate-900 text-xs">Coins.ph</span>
              <span className="text-[10px] text-slate-600">Crypto & Fiat</span>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. PRICING & THE 3 ZERO-RISK COMMITMENTS */}
      {/* ========================================================================= */}
      <section id="pricing" className="py-20 md:py-28 bg-[#F8FAFC] border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Fair Pay-As-You-Go Pricing
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900">
              Searching is Free Forever. <br />Pay Only ₱50 When You Apply.
            </h2>
            <p className="text-slate-800 text-base sm:text-lg">
              No monthly lock-ins or subscriptions. Reload your wallet with PayMongo when you need to send applications; your balance never expires.
            </p>

            <div className="inline-flex items-center gap-3 p-3 px-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-sm font-semibold shadow-xs mt-2">
              <span className="text-xl">🎁</span>
              <span>Every new account receives <strong>₱50 Free Balance</strong> (Your 1st application is 100% on us).</span>
            </div>
          </div>

          {/* Pricing Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch text-left">
            
            {/* Tier 1: Starter */}
            <div className="bg-white rounded-3xl p-8 border-2 border-slate-200 hover:border-slate-300 transition-all flex flex-col justify-between shadow-card">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-700 uppercase tracking-wider">Starter Bundle</span>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-900">Targeted Hunt</span>
                </div>
                
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-slate-900">₱200</span>
                    <span className="text-slate-700 font-medium text-sm">one-time</span>
                  </div>
                  <p className="text-xs text-slate-800 mt-1">₱50.00 per direct application</p>
                </div>

                <div className="pt-4 pb-2 border-y border-slate-100">
                  <span className="text-2xl font-black text-theme-primary">4 Applications</span>
                  <p className="text-xs text-slate-800 font-medium">Includes in-place resume tailoring & sign-off</p>
                </div>

                <ul className="space-y-3 text-xs text-slate-800">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>4 Direct Employer Dispatches</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Preview & Tweak Before Every Send</span>
                  </li>
                  <li className="flex items-center gap-2 font-bold text-slate-900">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Balance never expires</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6 mt-6">
                <button 
                  onClick={() => onStartSignUp('applicant@email.com')} 
                  className="w-full py-3 rounded-xl border-2 border-slate-300 font-bold text-slate-900 text-sm hover:border-slate-800 transition-colors cursor-pointer"
                >
                  Select ₱200 Bundle
                </button>
              </div>
            </div>

            {/* Tier 2: Job Hunter (Featured) */}
            <div className="bg-white rounded-3xl p-8 border-2 border-theme-primary relative flex flex-col justify-between shadow-elevated transform md:-translate-y-2">
              
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-theme-primary text-white text-[11px] font-extrabold uppercase tracking-wider py-1 px-4 rounded-full shadow-md">
                Most Popular • +1 Free App
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-theme-primary uppercase tracking-wider">Job Hunter</span>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-theme-primary-light text-theme-primary">Recommended</span>
                </div>
                
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-slate-900">₱500</span>
                    <span className="text-slate-700 font-medium text-sm">one-time</span>
                  </div>
                  <p className="text-xs text-theme-secondary font-semibold mt-1">₱45.45 per application (Includes 1 Free Application)</p>
                </div>

                <div className="pt-4 pb-2 border-y border-slate-100">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-theme-primary">11 Applications</span>
                    <span className="text-xs font-bold text-theme-secondary bg-theme-secondary-light px-2 py-0.5 rounded">+1 Free</span>
                  </div>
                  <p className="text-xs text-slate-800 font-medium">Reload seamlessly via PayMongo GCash / Maya</p>
                </div>

                <ul className="space-y-3 text-xs text-slate-800">
                  <li className="flex items-center gap-2 font-medium text-slate-900">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>11 Direct Employer Dispatches</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>In-place resume tailoring & review</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Full application history & audit receipts</span>
                  </li>
                  <li className="flex items-center gap-2 font-bold text-slate-900">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Balance never expires</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6 mt-6">
                <button 
                  onClick={() => onStartSignUp('applicant@email.com')} 
                  className="w-full py-3 rounded-xl bg-theme-primary hover:bg-theme-primary-hover text-white font-bold text-sm shadow-md transition-all cursor-pointer"
                >
                  Claim ₱500 Bundle
                </button>
              </div>
            </div>

            {/* Tier 3: Blitz Pack */}
            <div className="bg-white rounded-3xl p-8 border-2 border-slate-200 hover:border-slate-300 transition-all flex flex-col justify-between shadow-card">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-700 uppercase tracking-wider">Career Sprint</span>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-950 font-bold">+4 Free Apps</span>
                </div>
                
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-slate-900">₱1,000</span>
                    <span className="text-slate-700 font-medium text-sm">one-time</span>
                  </div>
                  <p className="text-xs text-theme-secondary font-semibold mt-1">₱41.67 per application (Includes 4 Free Applications)</p>
                </div>

                <div className="pt-4 pb-2 border-y border-slate-100">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-theme-primary">24 Applications</span>
                    <span className="text-xs font-bold text-theme-secondary bg-theme-secondary-light px-2 py-0.5 rounded">+4 Free</span>
                  </div>
                  <p className="text-xs text-slate-800 font-medium">Best for intensive career hunts</p>
                </div>

                <ul className="space-y-3 text-xs text-slate-800">
                  <li className="flex items-center gap-2 font-medium text-slate-900">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>24 Direct Employer Dispatches</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>In-place resume tailoring before every send</span>
                  </li>
                  <li className="flex items-center gap-2 font-bold text-slate-900">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Balance never expires</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6 mt-6">
                <button 
                  onClick={() => onStartSignUp('applicant@email.com')} 
                  className="w-full py-3 rounded-xl border-2 border-slate-300 font-bold text-slate-900 text-sm hover:border-slate-800 transition-colors cursor-pointer"
                >
                  Select ₱1,000 Pack
                </button>
              </div>
            </div>

          </div>

          {/* The 3 Zero-Risk Commitments */}
          <div className="mt-14 max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs text-left">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-5 text-center">
              Our Zero-Risk Commitments to Every Applicant
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-800">
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Zero-Risk Billing</span>
                </div>
                <p className="leading-relaxed">
                  ₱50 is <strong>only debited when your application is confirmed received</strong> by the employer's portal. If an employer's link fails, ₱0 is deducted.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                  <UserCheck className="w-4 h-4 text-theme-primary" />
                  <span>You Approve Every Send</span>
                </div>
                <p className="leading-relaxed">
                  We never submit blindly. You preview and approve every resume adjustment, bullet point, and headline before authorizing transmission.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                  <Clock className="w-4 h-4 text-amber-600" />
                  <span>Balance Never Expires</span>
                </div>
                <p className="leading-relaxed">
                  Use your balance this week or five months from now. Continuous searching and matching stays 100% free regardless of your balance.
                </p>
              </div>

            </div>
          </div>

          {/* Supported Gateways */}
          <div className="mt-12 text-center">
            <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-4">Official Philippine Payment Channels</p>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-slate-800 font-bold text-xs sm:text-sm">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-slate-200 shadow-xs">
                <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                <span>GCash</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-slate-200 shadow-xs">
                <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                <span>Maya</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-slate-200 shadow-xs">
                <span className="w-3 h-3 rounded-full bg-indigo-500"></span>
                <span>Visa & Mastercard</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-slate-200 shadow-xs">
                <span className="w-3 h-3 rounded-full bg-slate-700"></span>
                <span>BPI & BDO Online</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 shadow-xs text-xs font-medium text-slate-600">
                <Lock className="w-3.5 h-3.5 text-emerald-600" />
                <span>PayMongo 256-bit SSL</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. ACCORDION FAQ */}
      {/* ========================================================================= */}
      <section id="faq" className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-theme-primary bg-theme-primary-light px-3 py-1 rounded-full border border-theme-primary-border">
              Frequently Asked Questions
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              Everything You Need to Know
            </h2>
            <p className="text-slate-800 text-sm sm:text-base">
              Clear, transparent answers about how CANDIDATE.ph works, our ₱50 unit economics, and our Zero Middleman Guarantee.
            </p>
          </div>

          <div className="space-y-3 text-left">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div 
                  key={idx}
                  className={`rounded-2xl border transition-all overflow-hidden ${
                    isOpen 
                      ? 'border-blue-500 bg-blue-50/20 shadow-xs' 
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full py-4 px-6 flex items-center justify-between gap-4 text-left font-bold text-slate-900 text-sm sm:text-base cursor-pointer"
                  >
                    <span>{item.q}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-blue-600' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-800 leading-relaxed border-t border-slate-100">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. FINAL CTA & 5-COLUMN FOOTER */}
      {/* ========================================================================= */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-8 relative z-10">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-emerald-400 text-xs font-bold border border-slate-700">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Zero Subscriptions • ₱50 Free Balance on Sign-up
          </div>

          <h2 className="text-3xl sm:text-5xl font-black leading-tight text-white">
            Land the interview before the other 200 applicants arrive.
          </h2>

          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto font-normal">
            Get matched with open Philippine and remote tech roles. Tailor your resume and apply in 1 click for just ₱50 per application.
          </p>

          <form 
            onSubmit={(e) => {
              e.preventDefault();
              onStartSignUp(footerEmail || 'applicant@email.com');
            }} 
            className="max-w-md mx-auto flex flex-col sm:flex-row gap-2.5"
          >
            <input 
              type="email" 
              required
              value={footerEmail}
              onChange={(e) => setFooterEmail(e.target.value)}
              placeholder="Enter your email to claim ₱50 free balance..." 
              className="flex-1 px-4 py-3.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
              type="submit" 
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-md whitespace-nowrap cursor-pointer flex items-center justify-center gap-2"
            >
              <div className="flex flex-col text-left leading-tight">
                <span className="text-xs sm:text-sm font-black tracking-wide">SIGN UP</span>
                <span className="text-[10px] sm:text-[11px] font-semibold text-blue-100">Claim ₱50 First Application</span>
              </div>
              <ArrowRight className="w-4 h-4 text-amber-300" />
            </button>
          </form>

          <p className="text-xs text-slate-400 font-medium">
            Takes 60 seconds • Upload your CV anytime • PayMongo GCash & Maya ready
          </p>
        </div>
      </section>

      {/* Complete 5-Column Brand Footer */}
      <footer className="bg-slate-950 text-slate-300 text-xs py-12 border-t border-slate-800 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            
            <div className="col-span-2 space-y-3">
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-black tracking-wider text-white">CANDIDATE</span>
                <span className="text-xs px-1.5 py-0.2 rounded bg-slate-800 text-slate-200 font-bold border border-slate-700">.ph</span>
              </div>
              <p className="text-slate-300 text-xs max-w-xs leading-relaxed">
                The job matching platform engineered to make professional job hunting fast, fair, and direct for Philippine talent.
              </p>
              <p className="text-slate-400 text-[11px]">
                Proudly built for professionals in Metro Manila, Cebu, and remote Philippines.
              </p>
            </div>

            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Product</h4>
              <ul className="space-y-2">
                <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#comparison" className="hover:text-white transition-colors">Old Way vs Candidate</a></li>
                <li><button onClick={onOpenDashboard} className="hover:text-white transition-colors text-left cursor-pointer">Inside the Dashboard</button></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">₱50 Application Pricing</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Target Hubs</h4>
              <ul className="space-y-2">
                <li><span className="text-slate-400">BGC (Taguig) Corporate & Tech</span></li>
                <li><span className="text-slate-400">Makati & Ortigas Business Districts</span></li>
                <li><span className="text-slate-400">Cebu IT Park Opportunities</span></li>
                <li><span className="text-slate-400">Global Remote (US & Singapore)</span></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Legal & Trust</h4>
              <ul className="space-y-2">
                <li><span className="text-slate-400">RA 10173 Privacy Compliance</span></li>
                <li><span className="text-slate-400">Terms of Service</span></li>
                <li><span className="text-slate-400">PayMongo Security Standard</span></li>
                <li><span className="text-slate-400">Candidate Protection Policy</span></li>
              </ul>
            </div>

          </div>

          <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
            <p>© 2026 CANDIDATE.ph. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Active Matching Engine</span>
              <span>Manila, Philippines (PHT / GMT+8)</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
