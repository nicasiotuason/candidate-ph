import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  Radar, 
  Send, 
  Mail, 
  ArrowRight, 
  Check, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Users, 
  ChevronLeft, 
  ChevronRight, 
  ShieldCheck, 
  Clock, 
  Coins, 
  FileCheck2, 
  Sparkles, 
  Gift, 
  Filter, 
  Lock, 
  UserCheck
} from 'lucide-react';

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
    industry: "Fintech",
    logo: "M",
    logoColor: "bg-emerald-600 text-white",
    title: "Senior React Developer",
    salary: "₱180k–240k/mo",
    setup: "Hybrid • BGC",
    portal: "Greenhouse",
    portalBadge: "SEAMLESS",
    portalBadgeColor: "bg-orange-100 text-orange-800 border-orange-200",
    postedHeader: "Posted 1h 18m ago • First Review Batch (< 25 applicants)",
    matchPillText: "98% Strong Match",
    matchPillColor: "bg-orange-600 text-white",
    coreCount: "4/4 core requirements met",
    skills: ["React 18 + TypeScript", "Next.js SSR", "Payments domain", "Design systems"],
    amberSkill: "Optional: GraphQL",
    referralHeadline: "2 Insider Referral Contacts Available",
    referralSubtext: "Ex-colleagues in your LinkedIn network",
    avatars: [
      { text: "JC", bg: "bg-blue-100 text-blue-800" },
      { text: "AR", bg: "bg-orange-100 text-orange-800" }
    ],
    estQueue: "First Review Batch",
    timelinePercent: "50%",
    initialSeconds: 4706
  },
  {
    id: "job_02",
    company: "SeaMoney",
    industry: "ShopeePay",
    logo: "S",
    logoColor: "bg-orange-600 text-white",
    title: "Lead Cloud & Backend Architect",
    salary: "₱140k–195k/mo",
    setup: "Hybrid • Ortigas Center",
    portal: "Workday",
    portalBadge: "ASSISTED BETA",
    portalBadgeColor: "bg-amber-100 text-amber-800 border-amber-200",
    postedHeader: "Posted 12m ago • Early Bird Batch (< 5 applicants)",
    matchPillText: "99% Strong Match",
    matchPillColor: "bg-purple-600 text-white",
    coreCount: "5/5 core requirements met",
    skills: ["Golang / Microservices", "Kafka Queues", "High-Concurrency", "AWS Architecture"],
    amberSkill: "Optional: Payment latency tuning",
    referralHeadline: "4 Insider Referral Contacts Available",
    referralSubtext: "UP Diliman CS alumni inside engineering",
    avatars: [
      { text: "DL", bg: "bg-purple-100 text-purple-800" },
      { text: "RT", bg: "bg-emerald-100 text-emerald-800" }
    ],
    estQueue: "Early Bird Batch",
    timelinePercent: "15%",
    initialSeconds: 720
  },
  {
    id: "job_03",
    company: "GCash",
    industry: "Fintech / Mynt",
    logo: "G",
    logoColor: "bg-blue-600 text-white",
    title: "Junior Web Developer",
    salary: "₱45k–60k/mo",
    setup: "Hybrid • BGC",
    portal: "Lever",
    portalBadge: "SEAMLESS",
    portalBadgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
    postedHeader: "Posted 25m ago • Early Bird Batch (< 10 applicants)",
    matchPillText: "96% Strong Match",
    matchPillColor: "bg-blue-600 text-white",
    coreCount: "3/3 core requirements met",
    skills: ["React Basics", "JavaScript ES6+", "HTML5 / Tailwind", "Git Workflow"],
    amberSkill: "Optional: TypeScript",
    referralHeadline: "2 Insider Referral Contacts Available",
    referralSubtext: "UST & UP Diliman alumni in engineering",
    avatars: [
      { text: "MR", bg: "bg-blue-100 text-blue-800" },
      { text: "KV", bg: "bg-emerald-100 text-emerald-800" }
    ],
    estQueue: "Early Bird Batch",
    timelinePercent: "20%",
    initialSeconds: 1500
  },
  {
    id: "job_04",
    company: "Canva Manila",
    industry: "Design Tech",
    logo: "C",
    logoColor: "bg-cyan-600 text-white",
    title: "Associate UI/UX Designer",
    salary: "₱40k–55k/mo",
    setup: "Flexible • Makati Hub",
    portal: "Greenhouse",
    portalBadge: "SEAMLESS",
    portalBadgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
    postedHeader: "Posted 42m ago • Early Bird Batch (< 15 applicants)",
    matchPillText: "97% Strong Match",
    matchPillColor: "bg-cyan-600 text-white",
    coreCount: "4/4 core requirements met",
    skills: ["Figma Components", "Design Systems", "Wireframing", "User Flows"],
    amberSkill: "Optional: ProtoPie",
    referralHeadline: "1 Insider Referral Contact Available",
    referralSubtext: "1 DLSU alumni connection in design team",
    avatars: [
      { text: "AL", bg: "bg-cyan-100 text-cyan-800" }
    ],
    estQueue: "Early Bird Batch",
    timelinePercent: "35%",
    initialSeconds: 2520
  }
];

export default function LandingPage({ 
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

  // Live timer tick
  useEffect(() => {
    const timer = setInterval(() => {
      setCardTimerSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Ticker fluctuation
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
      {/* 2. HERO SECTION: SPEED & COMPLETE SAMPLE MATCHER CARD */}
      {/* ========================================================================= */}
      <section className="relative pt-8 pb-16 md:pt-14 md:pb-24 overflow-hidden grid-dot-pattern" id="live-jobs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
            
            {/* Left: Value Proposition */}
            <div className="lg:col-span-6 space-y-5 text-left">
              
              {/* Scanning Ticker Pill */}
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50/90 border border-amber-200/90 text-amber-900 text-xs font-semibold">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                  <span>Scanning <strong className="text-amber-950 font-bold">{tickerCount.toLocaleString()}</strong> + PH & Remote tech roles 24/7</span>
                </div>
              </div>

              {/* Eyebrow Badge */}
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-50 border border-blue-100 text-theme-primary text-xs font-extrabold uppercase tracking-wider">
                  <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>THE EARLY BIRD ADVANTAGE</span>
                </div>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-black text-slate-900 tracking-tight leading-[1.12]">
                Be <span className="text-theme-primary">CANDIDATE #1.</span><br />
                Land the interview before the other 200 applicants arrive.
              </h1>

              {/* Subheadline */}
              <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed max-w-xl">
                We scan Philippine and remote tech jobs 24/7, so you can apply within the hour a role goes live. Scanning and matching are <strong className="text-slate-900 font-bold">100% free, forever</strong>. You only pay ₱50 per application pack, and only when you choose to apply.
              </p>

              {/* 2 Mini Highlight Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl pt-1">
                <div className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-center">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-700 uppercase tracking-wider">
                    <Radar className="w-3.5 h-3.5 text-amber-600" />
                    <span>SCAN + MATCH 24/7</span>
                  </div>
                  <p className="text-lg font-black text-slate-900 mt-0.5">
                    ₱0 <span className="text-xs font-semibold text-amber-700">Free Forever</span>
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-center">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-theme-primary uppercase tracking-wider">
                    <Send className="w-3.5 h-3.5 text-theme-primary" />
                    <span>ONLY WHEN YOU APPLY</span>
                  </div>
                  <p className="text-lg font-black text-slate-900 mt-0.5">
                    ₱50 <span className="text-xs font-semibold text-slate-500">per pack</span>
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
                    className="px-5 py-3 bg-theme-primary hover:bg-theme-primary-hover active:scale-95 text-white font-bold rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-md whitespace-nowrap"
                  >
                    <span>Claim 50 Free Credits</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>

                <div className="flex flex-wrap items-center gap-4 sm:gap-5 mt-3 text-xs text-slate-500 font-medium">
                  <span className="flex items-center gap-1 text-amber-700 font-medium"><Check className="w-3.5 h-3.5 text-amber-600" /> No credit card required</span>
                  <span className="flex items-center gap-1 text-amber-700 font-medium"><Check className="w-3.5 h-3.5 text-amber-600" /> No subscription, ever</span>
                  <span className="flex items-center gap-1 text-amber-700 font-medium"><Check className="w-3.5 h-3.5 text-amber-600" /> Credits never expire</span>
                </div>
              </div>

            </div>

            {/* Right: The Complete Sample Matcher Card */}
            <div className="lg:col-span-6 w-full">
              <div className="relative bg-white rounded-3xl p-5 sm:p-6 shadow-elevated border border-slate-200 transition-all">
                
                {/* Top Status Row */}
                <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                    <span className="text-xs font-bold text-amber-900">
                      {activeJob.postedHeader}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-black text-rose-600">
                    <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping"></span>
                    <span>• LIVE</span>
                  </div>
                </div>

                {/* Dynamic Content Area */}
                <div className="pt-4 space-y-4">
                  
                  {/* Company Header Block */}
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-2xl ${activeJob.logoColor} font-black text-xl flex items-center justify-center shadow-xs`}>
                      {activeJob.logo}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                        <span className="font-bold text-slate-900">{activeJob.company}</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                        <span className="text-slate-400">• {activeJob.industry}</span>
                      </div>
                      <h3 className="font-black text-slate-900 text-lg sm:text-xl leading-tight mt-0.5">
                        {activeJob.title}
                      </h3>
                    </div>
                  </div>

                  {/* 3 Metadata Tiles */}
                  <div className="grid grid-cols-3 gap-2 pt-1 text-left">
                    <div className="p-3 rounded-2xl bg-slate-50/80 border border-slate-100">
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">SALARY</p>
                      <p className="text-xs sm:text-sm font-extrabold text-slate-900 mt-0.5">{activeJob.salary}</p>
                    </div>

                    <div className="p-3 rounded-2xl bg-slate-50/80 border border-slate-100">
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">SETUP</p>
                      <p className="text-xs sm:text-sm font-extrabold text-slate-900 mt-0.5">{activeJob.setup}</p>
                    </div>

                    <div className="p-3 rounded-2xl bg-slate-50/80 border border-slate-100">
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">PORTAL</p>
                      <p className="text-xs sm:text-sm font-extrabold text-slate-900 mt-0.5">{activeJob.portal}</p>
                      <span className={`inline-block mt-0.5 text-[9px] px-1.5 py-0.2 rounded font-black uppercase tracking-wider border ${activeJob.portalBadgeColor}`}>
                        {activeJob.portalBadge}
                      </span>
                    </div>
                  </div>

                  {/* THE SAMPLE MATCHER BOX */}
                  <div className="p-4 rounded-2xl bg-white border border-amber-200/90 space-y-2.5 shadow-xs">
                    <div className="flex items-center justify-between">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-extrabold ${activeJob.matchPillColor}`}>
                        <Check className="w-3.5 h-3.5" />
                        <span>{activeJob.matchPillText}</span>
                      </span>
                      <span className="text-xs text-slate-500 font-semibold">{activeJob.coreCount}</span>
                    </div>

                    {/* Skill Tags Grid */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {activeJob.skills.map((s, i) => (
                        <span key={i} className="inline-flex items-center gap-1 text-[11px] font-semibold bg-white text-slate-700 border border-amber-200/90 px-2.5 py-1 rounded-lg">
                          <Check className="w-3 h-3 text-amber-600" />
                          <span>{s}</span>
                        </span>
                      ))}
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-white text-amber-800 border border-amber-200/90 px-2.5 py-1 rounded-lg">
                        <AlertCircle className="w-3 h-3 text-amber-600" />
                        <span>{activeJob.amberSkill}</span>
                      </span>
                    </div>
                  </div>

                  {/* Referral Contacts Box */}
                  <div className="p-3 rounded-2xl bg-slate-50/90 border border-slate-200/70 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="flex -space-x-1.5 overflow-hidden">
                        {activeJob.avatars.map((av, i) => (
                          <span key={i} className={`inline-flex items-center justify-center w-7 h-7 rounded-full ${av.bg} text-[10px] font-black border-2 border-white`}>{av.text}</span>
                        ))}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-theme-primary" />
                          <span>{activeJob.referralHeadline}</span>
                        </p>
                        <p className="text-[11px] text-slate-500">{activeJob.referralSubtext}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => onQuickApplyFromLanding(activeJob)}
                      className="text-xs text-theme-primary font-bold hover:underline shrink-0"
                    >
                      View
                    </button>
                  </div>

                </div>

                {/* Live Timer & Timeline Slider */}
                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium">
                      Live for <span className="font-mono font-bold text-amber-600">{formatTimer(cardTimerSeconds)}</span>
                    </span>
                    <span className="font-bold text-theme-primary text-xs">
                      Est. queue: {activeJob.estQueue}
                    </span>
                  </div>

                  <div className="relative pt-1 pb-2">
                    <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full" style={{ width: activeJob.timelinePercent }}></div>
                    </div>
                    <div className="absolute top-1 -translate-x-1/2 w-4 h-4 rounded-full bg-white border-4 border-amber-500 shadow-xs pointer-events-none" style={{ left: activeJob.timelinePercent }}></div>
                    
                    <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold pt-1.5 uppercase tracking-wider">
                      <span>Early Bird</span>
                      <span className="text-amber-700">First Review</span>
                      <span>Open Pool</span>
                    </div>
                  </div>
                </div>

                {/* Primary 1-Click Apply Button */}
                <div className="pt-2">
                  <button 
                    onClick={() => onQuickApplyFromLanding(activeJob)}
                    className="w-full py-3.5 px-4 bg-theme-primary hover:bg-theme-primary-hover active:scale-[0.99] text-white font-bold rounded-2xl shadow-lg transition-all flex flex-col items-center justify-center cursor-pointer"
                  >
                    <div className="flex items-center gap-2 text-sm sm:text-base font-extrabold">
                      <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
                      <span>1-Click Autofill Apply</span>
                    </div>
                    <span className="text-[11px] font-medium text-white/80 mt-0.5">
                      50 Credits • debited only on confirmed receipt
                    </span>
                  </button>
                </div>

                {/* Trust Microcopy */}
                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-3 px-1">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                    <span>You approve every pack before it's sent</span>
                  </span>
                  <span className="font-bold text-slate-700">
                    Wallet: <strong className="text-slate-900 font-extrabold">50 credits</strong>
                  </span>
                </div>

                {/* Bottom Controls & Embedded Theme Switcher */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1">
                    <button onClick={prevJob} aria-label="Previous job" className="w-8 h-8 rounded-full border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-50 flex items-center justify-center transition-colors">
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button onClick={nextJob} aria-label="Next job" className="w-8 h-8 rounded-full border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-50 flex items-center justify-center transition-colors">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Theme Switcher */}
                  <div className="flex items-center gap-2 bg-slate-50 px-2.5 py-1 rounded-full border border-slate-200 text-xs">
                    <span className="text-[11px] font-semibold text-slate-600 hidden sm:inline">
                      {THEMES[activeThemeKey]?.name}
                    </span>
                    
                    <div className="flex items-center gap-1.5">
                      <button 
                        onClick={() => applyTheme('indigo-mint')} 
                        aria-label="Indigo & Mint" 
                        className={`w-5 h-5 rounded-full border-2 hover:scale-110 flex overflow-hidden cursor-pointer transition-all ${activeThemeKey === 'indigo-mint' ? 'border-slate-900 ring-2 ring-blue-400' : 'border-transparent'}`} 
                        title="Indigo & Mint"
                      >
                        <span className="w-1/2 h-full bg-[#4F46E5]"></span>
                        <span className="w-1/2 h-full bg-[#10B981]"></span>
                      </button>
                      <button 
                        onClick={() => applyTheme('cobalt-tangerine')} 
                        aria-label="Cobalt & Tangerine" 
                        className={`w-5 h-5 rounded-full border-2 hover:scale-110 flex overflow-hidden cursor-pointer transition-all ${activeThemeKey === 'cobalt-tangerine' ? 'border-slate-900 ring-2 ring-blue-400' : 'border-transparent'}`} 
                        title="Cobalt & Tangerine"
                      >
                        <span className="w-1/2 h-full bg-[#2563EB]"></span>
                        <span className="w-1/2 h-full bg-[#F97316]"></span>
                      </button>
                      <button 
                        onClick={() => applyTheme('teal-emerald')} 
                        aria-label="Teal & Emerald" 
                        className={`w-5 h-5 rounded-full border-2 hover:scale-110 flex overflow-hidden cursor-pointer transition-all ${activeThemeKey === 'teal-emerald' ? 'border-slate-900 ring-2 ring-blue-400' : 'border-transparent'}`} 
                        title="Teal & Emerald"
                      >
                        <span className="w-1/2 h-full bg-[#0F766E]"></span>
                        <span className="w-1/2 h-full bg-[#059669]"></span>
                      </button>
                      <button 
                        onClick={() => applyTheme('violet-lime')} 
                        aria-label="Violet & Lime" 
                        className={`w-5 h-5 rounded-full border-2 hover:scale-110 flex overflow-hidden cursor-pointer transition-all ${activeThemeKey === 'violet-lime' ? 'border-slate-900 ring-2 ring-blue-400' : 'border-transparent'}`} 
                        title="Violet & Lime"
                      >
                        <span className="w-1/2 h-full bg-[#7C3AED]"></span>
                        <span className="w-1/2 h-full bg-[#84CC16]"></span>
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. THE RELATABLE CONTRAST: THE USUAL WAY VS CANDIDATE.PH */}
      {/* ========================================================================= */}
      <section id="comparison" class="py-20 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-theme-primary bg-theme-primary-light px-3 py-1 rounded-full border border-theme-primary-border">
              The Contrast
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              How Everyone Else Searches vs. How Candidate.ph Does It
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              If you've spent weeks browsing job boards only to get zero responses, here is why your current approach feels exhausting—and how our matching engine fixes it.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
            
            {/* The Usual Way (Left Column) */}
            <div className="rounded-3xl p-7 sm:p-8 bg-slate-50 border-2 border-red-200/80 space-y-6 flex flex-col justify-between">
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
                  <p className="text-xs text-slate-600 leading-relaxed pl-7">
                    You manually check JobStreet, LinkedIn, and Indeed hoping to find openings before they get flooded.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-red-100 text-red-700 text-xs flex items-center justify-center font-bold">2</span>
                    Re-typing your resume into 40 company forms
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed pl-7">
                    Every employer forces you to create a new login, then spend 45 minutes re-typing your school, work dates, and references from scratch.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-red-100 text-red-700 text-xs flex items-center justify-center font-bold">3</span>
                    Sending one generic resume to 50 companies
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed pl-7">
                    Because tailoring takes too long, you submit the same PDF everywhere—and automated company filters discard it.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-red-100 text-red-700 text-xs flex items-center justify-center font-bold">4</span>
                    Applying days too late
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed pl-7">
                    By the time you see the job, hundreds of applicants have already applied, and the recruiter has stopped reviewing new resumes.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-red-200/60 text-xs font-semibold text-red-600 text-center">
                Result: Weeks of exhausting work with almost zero interview callbacks.
              </div>
            </div>

            {/* The Candidate.ph Way (Right Column) */}
            <div className="rounded-3xl p-7 sm:p-8 bg-white border-2 border-theme-primary shadow-elevated space-y-6 flex flex-col justify-between">
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
                    Continuous 24/7 scanning and matching
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed pl-7">
                    Upload your resume once and set your target salary. Our system watches thousands of verified openings and matches you automatically.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-xs flex items-center justify-center font-bold">2</span>
                    1-Click Form Autofill
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed pl-7">
                    Say goodbye to repetitive typing. When you like a matched job, our platform populates the employer's application form in seconds.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-xs flex items-center justify-center font-bold">3</span>
                    Resume tailored to each job's requirements
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed pl-7">
                    We format and highlight your real matching skills for that specific opening so company screening software doesn't filter you out.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-xs flex items-center justify-center font-bold">4</span>
                    Early Bird Advantage
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed pl-7">
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
      {/* 4. INSIDE THE DASHBOARD: INTERACTIVE APP PREVIEW */}
      {/* ========================================================================= */}
      <section id="dashboard-preview" className="py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Product Experience
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Inside Your Candidate.ph Dashboard
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Here is what candidates see when they log in. Browse your real-time matches, track application stages, and review your Early Bird timestamps.
            </p>
          </div>

          {/* Dashboard Mockup Frame */}
          <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-elevated border border-slate-200 overflow-hidden">
            
            {/* Window Top Bar */}
            <div className="bg-slate-900 text-white p-3.5 sm:px-6 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500"></span>
                  <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                  <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                </div>
                <div className="h-4 w-px bg-slate-700 mx-1"></div>
                <span className="text-xs font-mono text-slate-400">candidate.ph/app/dashboard</span>
              </div>

              <div className="flex items-center gap-3 text-xs">
                <span className="hidden sm:inline text-slate-400">Candidate: <strong className="text-white">Patricia M. (UST Alumni)</strong></span>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-950 text-emerald-300 border border-emerald-800 font-semibold">
                  <Coins className="w-3.5 h-3.5 text-emerald-400" />
                  <span>50 Free Credits</span>
                </div>
              </div>
            </div>

            {/* Dashboard Sub-Navigation Tabs */}
            <div className="bg-slate-50 border-b border-slate-200 px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-2 text-xs font-semibold text-slate-600">
              <div className="flex items-center gap-4">
                <button onClick={onOpenDashboard} className="text-theme-primary border-b-2 border-theme-primary py-1 font-bold">Live Matched Roles (4)</button>
                <button onClick={onOpenDashboard} className="hover:text-slate-900 py-1 text-slate-500">Applications Sent (3)</button>
                <button onClick={onOpenDashboard} className="hover:text-slate-900 py-1 text-slate-500 hidden sm:inline">Preferences & Salary Floor</button>
              </div>
              <div className="flex items-center gap-1 text-[11px] text-slate-500">
                <span>Floor:</span>
                <span className="font-bold text-slate-800 bg-white px-2 py-0.5 rounded border border-slate-200">₱45,000/mo min</span>
              </div>
            </div>

            {/* Dashboard Grid: Live Matches + Live Tracker */}
            <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left 7 Cols: Matches Feed */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center justify-between pb-2">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Your Live Matches</h3>
                  <span className="text-xs text-slate-400">Sorted by match score</span>
                </div>

                {/* Card 1: SeaMoney */}
                <div className="p-4 rounded-2xl border-2 border-slate-100 hover:border-theme-primary bg-white hover:shadow-card transition-all space-y-3 text-left">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-orange-600 text-white font-bold text-base flex items-center justify-center">S</div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">Lead Cloud & Backend Architect</h4>
                        <p className="text-xs text-slate-500 font-medium">SeaMoney • Ortigas or Remote</p>
                      </div>
                    </div>
                    <span className="text-xs font-extrabold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200">
                      99% Match
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center justify-between text-xs pt-1 border-t border-slate-100 text-slate-600 gap-2">
                    <span className="font-black text-emerald-600 text-sm">₱140,000 – ₱195,000 / mo</span>
                    <span className="text-amber-700 font-semibold bg-amber-50 px-2 py-0.5 rounded text-[11px]">Posted 12m ago • Early Bird</span>
                    <button 
                      onClick={() => onQuickApplyFromLanding(LIVE_HERO_JOBS[1])} 
                      className="px-3 py-1.5 bg-theme-primary text-white rounded-lg font-bold text-xs hover:bg-theme-primary-hover transition-colors"
                    >
                      Apply 1-Click
                    </button>
                  </div>
                </div>

                {/* Card 2: Maya */}
                <div className="p-4 rounded-2xl border-2 border-slate-100 hover:border-theme-primary bg-white hover:shadow-card transition-all space-y-3 text-left">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white font-bold text-base flex items-center justify-center">M</div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">Senior React Developer</h4>
                        <p className="text-xs text-slate-500 font-medium">Maya (Voyager) • Hybrid BGC</p>
                      </div>
                    </div>
                    <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      98% Match
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center justify-between text-xs pt-1 border-t border-slate-100 text-slate-600 gap-2">
                    <span className="font-black text-emerald-600 text-sm">₱180,000 – ₱240,000 / mo</span>
                    <span className="text-amber-700 font-semibold bg-amber-50 px-2 py-0.5 rounded text-[11px]">Posted 1h ago • Batch #1</span>
                    <button 
                      onClick={() => onQuickApplyFromLanding(LIVE_HERO_JOBS[0])} 
                      className="px-3 py-1.5 bg-theme-primary text-white rounded-lg font-bold text-xs hover:bg-theme-primary-hover transition-colors"
                    >
                      Apply 1-Click
                    </button>
                  </div>
                </div>

                {/* Card 3: GCash */}
                <div className="p-4 rounded-2xl border-2 border-slate-100 hover:border-theme-primary bg-white hover:shadow-card transition-all space-y-3 text-left">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-bold text-base flex items-center justify-center">G</div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">Junior Web Developer</h4>
                        <p className="text-xs text-slate-500 font-medium">GCash (Mynt) • Hybrid BGC</p>
                      </div>
                    </div>
                    <span className="text-xs font-extrabold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                      96% Match
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center justify-between text-xs pt-1 border-t border-slate-100 text-slate-600 gap-2">
                    <span className="font-black text-emerald-600 text-sm">₱45,000 – ₱60,000 / mo</span>
                    <span className="text-amber-700 font-semibold bg-amber-50 px-2 py-0.5 rounded text-[11px]">Posted 25m ago • Early Bird</span>
                    <button 
                      onClick={() => onQuickApplyFromLanding(LIVE_HERO_JOBS[2])} 
                      className="px-3 py-1.5 bg-theme-primary text-white rounded-lg font-bold text-xs hover:bg-theme-primary-hover transition-colors"
                    >
                      Apply 1-Click
                    </button>
                  </div>
                </div>

              </div>

              {/* Right 5 Cols: Application Tracker Widget */}
              <div className="lg:col-span-5 space-y-4 text-left">
                <div className="flex items-center justify-between pb-2">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Live Application Tracker</h3>
                  <span className="text-xs font-bold text-emerald-600">3 Submissions</span>
                </div>

                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-4 text-xs">
                  
                  {/* Item 1: Interview Scheduled */}
                  <div className="p-3 bg-white rounded-xl border border-emerald-200 shadow-xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">Canva Manila</span>
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                        Interview Requested 📅
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500">Associate UI/UX Designer • ₱40k–₱55k/mo</p>
                    <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-100">
                      <span>Applied: 18 mins after listing</span>
                      <span className="text-emerald-600 font-bold">Early Bird Verified</span>
                    </div>
                  </div>

                  {/* Item 2: Recruiter Reviewing */}
                  <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">Maya (Voyager)</span>
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                        Recruiter Reviewing
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500">Junior QA Automation • ₱38k–₱52k/mo</p>
                    <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-100">
                      <span>Applied: 40 mins after listing</span>
                      <span className="text-slate-600">Batch 1 (&lt; 25 applicants)</span>
                    </div>
                  </div>

                  {/* Item 3: Confirmed Received */}
                  <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">Globe Telecom</span>
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                        Receipt Confirmed 200 OK
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500">Digital Solutions Analyst • ₱50k–₱70k/mo</p>
                    <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-100">
                      <span>Workday Assisted Autofill</span>
                      <span className="text-emerald-600 font-bold">50 Credits debited</span>
                    </div>
                  </div>

                </div>

                {/* Zero-Risk Standard */}
                <div className="p-3.5 bg-theme-primary-light rounded-xl border border-theme-primary-border text-[11px] text-slate-700 space-y-1">
                  <p className="font-bold text-slate-900 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-theme-primary" />
                    <span>Candidate Protection Guarantee:</span>
                  </p>
                  <p>Credits are only deducted once the employer's portal officially returns a 200 OK submission receipt.</p>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. THE SCIENCE: WHY TIMING & FILTER ALIGNMENT WORK */}
      {/* ========================================================================= */}
      <section id="the-science" className="py-20 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-theme-primary bg-theme-primary-light px-3 py-1 rounded-full border border-theme-primary-border">
              The Strategy
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Why Candidate.ph Gets You Invited to More Interviews
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Landing an interview is not just about qualifications—it is about timing, relevance, and internal connections.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 hover:border-theme-primary transition-all space-y-4 shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-theme-primary-light text-theme-primary flex items-center justify-center font-bold">
                <Clock className="w-6 h-6" />
              </div>
              <div className="text-3xl font-black text-slate-900">6x Callback Rate</div>
              <h3 className="text-base font-bold text-slate-900">The Early Bird Advantage</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Hiring managers don't read through 300 resumes. They review the first 25 that come in. Applying within the first 24 hours places your name on the recruiter's desk before the role is closed.
              </p>
              <p className="text-[11px] text-slate-400 italic pt-2 border-t border-slate-200">
                * Source: TalentWorks Employment Velocity & Hiring Benchmark Study.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 hover:border-emerald-300 transition-all space-y-4 shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <FileCheck2 className="w-6 h-6" />
              </div>
              <div className="text-3xl font-black text-emerald-600">No Auto-Rejection</div>
              <h3 className="text-base font-bold text-slate-900">Screening Software Alignment</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Company hiring systems scan for specific skills. If a job asks for "React" and your resume only says "Frontend," a computer might throw your application away. We ensure your genuine achievements match what they are searching for.
              </p>
              <p className="text-[11px] text-slate-400 italic pt-2 border-t border-slate-200">
                * Clean single-column layout readable by modern hiring portals.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 hover:border-amber-300 transition-all space-y-4 shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                <Users className="w-6 h-6" />
              </div>
              <div className="text-3xl font-black text-amber-600">4x Referral Boost</div>
              <h3 className="text-base font-bold text-slate-900">Alumni & Colleague Routes</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Applications backed by internal connections convert to interviews at 4x higher rates. We scan LinkedIn to show you if someone from your university (UP, UST, DLSU, Ateneo) or previous company works there.
              </p>
              <p className="text-[11px] text-slate-400 italic pt-2 border-t border-slate-200">
                * Source: LinkedIn Talent Solutions Global Recruiting Trends.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. ACTIVELY MONITORED COMPANIES */}
      {/* ========================================================================= */}
      <section className="py-16 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Actively Monitored Tech & Corporate Hubs</h3>
            <p className="text-lg font-extrabold text-slate-900">We continuously scan open roles at top employers across the Philippines.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
            
            <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center flex flex-col items-center justify-center shadow-xs">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black text-sm mb-2 shadow-xs">M</div>
              <span className="font-bold text-slate-900 text-xs">Maya</span>
              <span className="text-[10px] text-slate-400">Voyager</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center flex flex-col items-center justify-center shadow-xs">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-sm mb-2 shadow-xs">G</div>
              <span className="font-bold text-slate-900 text-xs">GCash</span>
              <span className="text-[10px] text-slate-400">Mynt</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center flex flex-col items-center justify-center shadow-xs">
              <div className="w-9 h-9 rounded-xl bg-cyan-600 text-white flex items-center justify-center font-black text-sm mb-2 shadow-xs">C</div>
              <span className="font-bold text-slate-900 text-xs">Canva Manila</span>
              <span className="text-[10px] text-slate-400">Makati Hub</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center flex flex-col items-center justify-center shadow-xs">
              <div className="w-9 h-9 rounded-xl bg-orange-600 text-white flex items-center justify-center font-black text-sm mb-2 shadow-xs">S</div>
              <span className="font-bold text-slate-900 text-xs">SeaMoney</span>
              <span className="text-[10px] text-slate-400">ShopeePay</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center flex flex-col items-center justify-center shadow-xs">
              <div className="w-9 h-9 rounded-xl bg-blue-900 text-white flex items-center justify-center font-black text-sm mb-2 shadow-xs">GL</div>
              <span className="font-bold text-slate-900 text-xs">Globe Telecom</span>
              <span className="text-[10px] text-slate-400">BGC Corporate</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center flex flex-col items-center justify-center shadow-xs">
              <div className="w-9 h-9 rounded-xl bg-purple-700 text-white flex items-center justify-center font-black text-sm mb-2 shadow-xs">&gt;</div>
              <span className="font-bold text-slate-900 text-xs">Accenture PH</span>
              <span className="text-[10px] text-slate-400">Technology</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center flex flex-col items-center justify-center shadow-xs">
              <div className="w-9 h-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-black text-sm mb-2 shadow-xs">🪙</div>
              <span className="font-bold text-slate-900 text-xs">Coins.ph</span>
              <span className="text-[10px] text-slate-400">Fintech</span>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. HOW IT WORKS: 3 SIMPLE STEPS */}
      {/* ========================================================================= */}
      <section id="how-it-works" className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-theme-primary bg-theme-primary-light px-3 py-1 rounded-full border border-theme-primary-border">
              Frictionless Setup
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
              Ready In 3 Minutes
            </h2>
            <p className="text-slate-600 text-base mt-2">
              Configure your master credentials once. Let the engine monitor openings and prepare tailored packs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            
            <div className="bg-slate-50 p-7 rounded-3xl border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-theme-primary text-white font-black text-lg flex items-center justify-center mb-5 shadow-xs">
                  1
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Upload Your Base Resume</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  Upload your current resume once. Our matching engine reads your real skills, graduation year, and work experience to find matching openings.
                </p>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-500 flex items-center gap-2">
                <Gift className="w-4 h-4 text-emerald-600" />
                <span>50 Free Credits unlocked automatically on sign-up.</span>
              </div>
            </div>

            <div className="bg-slate-50 p-7 rounded-3xl border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-theme-primary text-white font-black text-lg flex items-center justify-center mb-5 shadow-xs">
                  2
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Set Your Salary & Dealbreakers</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  Specify your minimum monthly salary in ₱ (e.g., minimum ₱45,000/mo) and preferred setup (Remote, Hybrid BGC, or Makati). We hide underpaid roles.
                </p>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-500 flex items-center gap-2">
                <Filter className="w-4 h-4 text-theme-primary" />
                <span>Strict filtering: Only jobs that meet your criteria appear.</span>
              </div>
            </div>

            <div className="bg-slate-50 p-7 rounded-3xl border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-theme-primary text-white font-black text-lg flex items-center justify-center mb-5 shadow-xs">
                  3
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Review & Apply in 1 Click</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  When a fresh job goes live, click "Apply". We generate a tailored resume pack, autofill the company's application form, and let you review before sending.
                </p>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-500 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Always ₱0 to search; only ₱50 when you choose to apply.</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. PRICING & THE 3 ZERO-RISK COMMITMENTS */}
      {/* ========================================================================= */}
      <section id="pricing" className="py-20 md:py-28 bg-[#F8FAFC] border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Fair Pay-As-You-Go Credits
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              Searching is Free Forever. <br />Pay Only ₱50 When You Apply.
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              No monthly lock-ins. Buy credits when you need them; keep unused credits permanently.
            </p>

            <div className="inline-flex items-center gap-3 p-3 px-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-sm font-semibold shadow-xs mt-2">
              <span className="text-xl">🎁</span>
              <span>Every new account receives <strong>50 Free Credits</strong> (Your 1st application is 100% on us).</span>
            </div>
          </div>

          {/* Pricing Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch text-left">
            
            {/* Tier 1: Starter */}
            <div className="bg-white rounded-3xl p-8 border-2 border-slate-200 hover:border-slate-300 transition-all flex flex-col justify-between shadow-card">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Starter Pack</span>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">Targeted Hunt</span>
                </div>
                
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-slate-900">₱250</span>
                    <span className="text-slate-500 font-medium text-sm">one-time</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">₱50.00 per tailored application pack</p>
                </div>

                <div className="pt-4 pb-2 border-y border-slate-100">
                  <span className="text-2xl font-black text-theme-primary">250 Credits</span>
                  <p className="text-xs text-slate-600 font-medium">Generates <strong>5 Complete Applications</strong></p>
                </div>

                <ul className="space-y-3 text-xs text-slate-600">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>5 Tailored Resumes & Cover Letters</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>1-Click Company Form Autofill</span>
                  </li>
                  <li className="flex items-center gap-2 font-bold text-slate-800">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Credits never expire</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6 mt-6">
                <button 
                  onClick={() => onStartSignUp('applicant@email.com')} 
                  className="w-full py-3 rounded-xl border-2 border-slate-300 font-bold text-slate-800 text-sm hover:border-slate-800 transition-colors"
                >
                  Select ₱250 Pack
                </button>
              </div>
            </div>

            {/* Tier 2: Job Hunter (Featured) */}
            <div className="bg-white rounded-3xl p-8 border-2 border-theme-primary relative flex flex-col justify-between shadow-elevated transform md:-translate-y-2">
              
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-theme-primary text-white text-[11px] font-extrabold uppercase tracking-wider py-1 px-4 rounded-full shadow-md">
                Most Popular • +10% Bonus
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-theme-primary uppercase tracking-wider">Job Hunter</span>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-theme-primary-light text-theme-primary">Recommended</span>
                </div>
                
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-slate-900">₱500</span>
                    <span className="text-slate-500 font-medium text-sm">one-time</span>
                  </div>
                  <p className="text-xs text-theme-secondary font-semibold mt-1">₱45.45 per pack (Includes +1 Free Pack)</p>
                </div>

                <div className="pt-4 pb-2 border-y border-slate-100">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-theme-primary">550 Credits</span>
                    <span className="text-xs font-bold text-theme-secondary bg-theme-secondary-light px-2 py-0.5 rounded">+50 Free</span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium">Generates <strong>11 Complete Applications</strong></p>
                </div>

                <ul className="space-y-3 text-xs text-slate-600">
                  <li className="flex items-center gap-2 font-medium text-slate-800">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>11 Tailored Application Packs</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Instant Early Bird alerts via Telegram / SMS</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>LinkedIn Alumni & Referral Route Finder</span>
                  </li>
                  <li className="flex items-center gap-2 font-bold text-slate-800">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Credits never expire</span>
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
                  <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Blitz Pack</span>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold">+20% Bonus</span>
                </div>
                
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-slate-900">₱1,000</span>
                    <span className="text-slate-500 font-medium text-sm">one-time</span>
                  </div>
                  <p className="text-xs text-theme-secondary font-semibold mt-1">₱41.60 per pack (Includes +4 Free Packs)</p>
                </div>

                <div className="pt-4 pb-2 border-y border-slate-100">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-theme-primary">1,200 Credits</span>
                    <span className="text-xs font-bold text-theme-secondary bg-theme-secondary-light px-2 py-0.5 rounded">+200 Free</span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium">Generates <strong>24 Complete Applications</strong></p>
                </div>

                <ul className="space-y-3 text-xs text-slate-600">
                  <li className="flex items-center gap-2 font-medium text-slate-800">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>24 Tailored Application Packs</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Global Remote USD Salary Benchmark Data</span>
                  </li>
                  <li className="flex items-center gap-2 font-bold text-slate-800">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Credits never expire</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6 mt-6">
                <button 
                  onClick={() => onStartSignUp('applicant@email.com')} 
                  className="w-full py-3 rounded-xl border-2 border-slate-300 font-bold text-slate-800 text-sm hover:border-slate-800 transition-colors"
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-600">
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Zero-Risk Billing</span>
                </div>
                <p className="leading-relaxed">
                  Credits are <strong>only debited when your application is confirmed received</strong> by the employer's portal. If an employer's website fails, 0 credits are deducted.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                  <UserCheck className="w-4 h-4 text-theme-primary" />
                  <span>You Approve Every Pack</span>
                </div>
                <p className="leading-relaxed">
                  We never submit blindly. You preview and approve every resume adjustment, bullet point, and letter before authorizing transmission.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                  <Clock className="w-4 h-4 text-amber-600" />
                  <span>Credits Never Expire</span>
                </div>
                <p className="leading-relaxed">
                  Use your credits this week or five months from now. Continuous scanning and matching stays 100% free regardless of your credit balance.
                </p>
              </div>

            </div>
          </div>

          {/* Supported Gateways */}
          <div className="mt-12 text-center">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Official Philippine Payment Gateways</p>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-slate-600 font-bold text-xs sm:text-sm">
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
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 shadow-xs text-xs font-medium text-slate-400">
                <Lock className="w-3.5 h-3.5 text-emerald-600" />
                <span>PayMongo 256-bit SSL</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. FINAL CTA & 5-COLUMN FOOTER */}
      {/* ========================================================================= */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-8 relative z-10">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-emerald-400 text-xs font-bold border border-slate-700">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Zero Subscriptions • 50 Free Credits on Sign-up
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Land the interview before the other 200 applicants arrive.
          </h2>

          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto font-normal">
            Get matched with open Philippine and remote tech roles. Apply with a tailored resume in 1 click for just ₱50 per pack.
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
              placeholder="Enter your email to claim 50 free credits..." 
              className="flex-1 px-4 py-3.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
              type="submit" 
              className="px-6 py-3.5 bg-theme-primary hover:bg-theme-primary-hover text-white font-bold text-sm rounded-xl transition-all shadow-md whitespace-nowrap cursor-pointer"
            >
              Claim 50 Credits
            </button>
          </form>

          <p className="text-xs text-slate-500">
            Takes 60 seconds • Upload your CV anytime • PayMongo GCash & Maya ready
          </p>
        </div>
      </section>

      {/* Complete 5-Column Brand Footer from CandidatePH.html */}
      <footer className="bg-slate-950 text-slate-400 text-xs py-12 border-t border-slate-800 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            
            <div className="col-span-2 space-y-3">
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-black tracking-tight text-white">CANDIDATE</span>
                <span className="text-xs px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 font-bold border border-slate-700">.ph</span>
              </div>
              <p className="text-slate-400 text-xs max-w-xs leading-relaxed">
                The job matching platform engineered to make professional job hunting fast, fair, and easy for Philippine talent.
              </p>
              <p className="text-slate-500 text-[11px]">
                Proudly built for professionals in Metro Manila, Cebu, and remote Philippines.
              </p>
            </div>

            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Product</h4>
              <ul className="space-y-2">
                <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#comparison" className="hover:text-white transition-colors">Old Way vs Candidate</a></li>
                <li><button onClick={onOpenDashboard} className="hover:text-white transition-colors text-left">Inside the Dashboard</button></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">₱50 Pack Pricing</a></li>
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
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Continuous Scanner Active</span>
              <span>Manila, Philippines (PHT / GMT+8)</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
