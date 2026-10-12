import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  Radar, 
  Send, 
  Mail, 
  ArrowRight, 
  Check, 
  CheckCircle2, 
  AlertCircle, 
  Users, 
  ChevronLeft, 
  ChevronRight, 
  ShieldCheck, 
  Clock, 
  CreditCard,
  Building2,
  Sparkles,
  Lock,
  XCircle,
  HelpCircle
} from 'lucide-react';
import { MOCK_JOBS } from '../services/mockData';

export default function LandingPage({ 
  onStartSignUp, 
  onLoginClick, 
  onOpenDashboard, 
  onQuickApplyFromLanding 
}) {
  const [currentJobIdx, setCurrentJobIdx] = useState(0);
  const [emailInput, setEmailInput] = useState('');
  const [tickerCount, setTickerCount] = useState(15443);
  const [cardTimerSeconds, setCardTimerSeconds] = useState(4706);

  const activeJob = MOCK_JOBS[currentJobIdx % MOCK_JOBS.length];

  // Dynamic seconds ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setCardTimerSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Ticker roles fluctuation
  useEffect(() => {
    const tickerInterval = setInterval(() => {
      setTickerCount(prev => prev + (Math.floor(Math.random() * 5) - 2));
    }, 4500);
    return () => clearInterval(tickerInterval);
  }, []);

  const formatTimer = (totalSec) => {
    const hrs = Math.floor(totalSec / 3600).toString().padStart(2, '0');
    const mins = Math.floor((totalSec % 3600) / 60).toString().padStart(2, '0');
    const secs = (totalSec % 60).toString().padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    onStartSignUp(emailInput || 'applicant@email.com');
  };

  const nextJob = () => {
    setCurrentJobIdx(prev => (prev + 1) % MOCK_JOBS.length);
  };

  const prevJob = () => {
    setCurrentJobIdx(prev => (prev - 1 + MOCK_JOBS.length) % MOCK_JOBS.length);
  };

  return (
    <div className="bg-[#F8FAFC]">

      {/* ========================================================================= */}
      {/* 1. HERO SECTION: SPEED & THE COMPLETE SAMPLE MATCHER CARD */}
      {/* ========================================================================= */}
      <section className="relative pt-8 pb-16 md:pt-14 md:pb-24 overflow-hidden grid-dot-pattern">
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
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-50 border border-blue-100 text-blue-600 text-xs font-extrabold uppercase tracking-wider">
                  <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>THE EARLY BIRD ADVANTAGE</span>
                </div>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-black text-slate-900 tracking-tight leading-[1.12]">
                Be <span className="text-blue-600">CANDIDATE #1.</span><br />
                Land the interview before the other 200 applicants arrive.
              </h1>

              {/* Subheadline */}
              <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed max-w-xl">
                We scan Philippine and remote tech jobs 24/7, so you can apply within the hour a role goes live. Scanning and matching are <strong className="text-slate-900 font-bold">100% free, forever</strong>. You only pay ₱50 per application pack, and only when you choose to apply.
              </p>

              {/* 2 Mini Highlight Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl pt-1">
                <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-center">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-700 uppercase tracking-wider">
                    <Radar className="w-3.5 h-3.5 text-amber-600" />
                    <span>SCAN + MATCH 24/7</span>
                  </div>
                  <p className="text-lg font-black text-slate-900 mt-0.5">
                    ₱0 <span className="text-xs font-semibold text-amber-700">Free Forever</span>
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-center">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-blue-600 uppercase tracking-wider">
                    <Send className="w-3.5 h-3.5 text-blue-600" />
                    <span>ONLY WHEN YOU APPLY</span>
                  </div>
                  <p className="text-lg font-black text-slate-900 mt-0.5">
                    ₱50 <span className="text-xs font-semibold text-slate-500">per application</span>
                  </p>
                </div>
              </div>

              {/* Signup Input Form */}
              <div className="max-w-xl pt-1">
                <form onSubmit={handleEmailSubmit} className="bg-white p-1.5 sm:p-2 rounded-2xl shadow-elevated border border-slate-200 flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1 flex items-center">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                    <input 
                      type="email" 
                      required
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder="you@email.com" 
                      className="w-full pl-10 pr-3 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none rounded-xl"
                    />
                  </div>
                  <button 
                    type="submit"
                    className="px-5 py-3 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-md whitespace-nowrap"
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
                    <div className={`w-12 h-12 rounded-2xl ${activeJob.logoColor} text-white font-black text-xl flex items-center justify-center shadow-xs`}>
                      {activeJob.logoText}
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
                      <span className="inline-block mt-0.5 text-[9px] px-1.5 py-0.2 rounded font-black uppercase tracking-wider border bg-orange-100 text-orange-800 border-orange-200">
                        {activeJob.portalBadge}
                      </span>
                    </div>
                  </div>

                  {/* THE SAMPLE MATCHER BOX */}
                  <div className="p-4 rounded-2xl bg-white border border-amber-200/90 space-y-2.5 shadow-xs">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-orange-600 text-white">
                        <Check className="w-3.5 h-3.5" />
                        <span>{activeJob.matchPercentage}% Strong Match</span>
                      </span>
                      <span className="text-xs text-slate-500 font-semibold">{activeJob.coreCount}</span>
                    </div>

                    {/* Skill Tags Grid */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {activeJob.matchingSkills.map((s, i) => (
                        <span key={i} className="inline-flex items-center gap-1 text-[11px] font-semibold bg-white text-slate-700 border border-amber-200/90 px-2.5 py-1 rounded-lg">
                          <Check className="w-3 h-3 text-amber-600" />
                          <span>{s}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Referral Contacts Box */}
                  <div className="p-3 rounded-2xl bg-slate-50/90 border border-slate-200/70 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="flex -space-x-1.5 overflow-hidden">
                        {activeJob.avatars?.map((av, i) => (
                          <span key={i} className={`inline-flex items-center justify-center w-7 h-7 rounded-full ${av.bg} text-[10px] font-black border-2 border-white`}>{av.text}</span>
                        ))}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-blue-600" />
                          <span>{activeJob.referralHeadline}</span>
                        </p>
                        <p className="text-[11px] text-slate-500">{activeJob.referralSubtext}</p>
                      </div>
                    </div>
                    <span className="text-xs text-blue-600 font-bold shrink-0">
                      Verified
                    </span>
                  </div>

                </div>

                {/* Live Timer & Timeline Slider */}
                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium">
                      Live for <span className="font-mono font-bold text-amber-600">{formatTimer(cardTimerSeconds)}</span>
                    </span>
                    <span className="font-bold text-blue-600 text-xs">
                      {activeJob.estQueue}
                    </span>
                  </div>

                  <div className="relative pt-1 pb-2">
                    <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-amber-400 to-amber-500 w-1/2 rounded-full"></div>
                    </div>
                    <div className="absolute top-1 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white border-4 border-amber-500 shadow-xs pointer-events-none"></div>
                    
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
                    className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-bold rounded-2xl shadow-lg transition-all flex flex-col items-center justify-center"
                  >
                    <div className="flex items-center gap-2 text-sm sm:text-base font-extrabold">
                      <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
                      <span>1-Click Autofill Apply</span>
                    </div>
                    <span className="text-[11px] font-medium text-white/80 mt-0.5">
                      ₱50 • debited only upon confirmed ATS receipt
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

                {/* Bottom Controls */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1">
                    <button onClick={prevJob} aria-label="Previous job" className="w-8 h-8 rounded-full border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-50 flex items-center justify-center transition-colors">
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button onClick={nextJob} aria-label="Next job" className="w-8 h-8 rounded-full border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-50 flex items-center justify-center transition-colors">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  <span className="text-xs text-slate-400 font-medium">
                    Showing Job {currentJobIdx + 1} of {MOCK_JOBS.length}
                  </span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. THE CONTRAST: THE USUAL WAY VS CANDIDATE.PH */}
      {/* ========================================================================= */}
      <section className="py-20 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              The Contrast
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              How Everyone Else Searches vs. How CANDIDATE.ph Does It
            </h2>
            <p className="text-slate-500 text-sm sm:text-base">
              The traditional job hunt is slow, demoralizing, and filled with ghost jobs. Here is how we flip the script in your favor.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* The Usual Way */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center">
                  <XCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-lg">The Old Way</h3>
                  <p className="text-xs text-slate-500">Endless manual forms and radio silence</p>
                </div>
              </div>

              <ul className="space-y-3 text-xs sm:text-sm text-slate-600">
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-500 font-black">✕</span>
                  <span>Applying days or weeks after the role was posted, lost in 300+ resumes.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-500 font-black">✕</span>
                  <span>Filling out redundant Workday & Taleo forms for 45 minutes per application.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-500 font-black">✕</span>
                  <span>Expensive monthly subscriptions just to message recruiters or see salary stats.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-500 font-black">✕</span>
                  <span>Sending untailored resumes that get filtered out by primitive keyword filters.</span>
                </li>
              </ul>
            </div>

            {/* Candidate.ph Way */}
            <div className="p-8 rounded-3xl bg-blue-50/70 border border-blue-200 space-y-5 relative">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center">
                  <Zap className="w-6 h-6 text-amber-300" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-lg">With CANDIDATE.ph</h3>
                  <p className="text-xs text-blue-700 font-semibold">Candidate #1 advantage & 1-click ATS dispatch</p>
                </div>
              </div>

              <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Early Bird Advantage:</strong> Apply within the first 60 minutes while recruiter queues are empty.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>AI Match Score & Tailoring:</strong> View exact qualification overlap $\ge 60\%$ and tailor bullets before sending.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>₱0 to Search, ₱50 per Send:</strong> Pay only when you choose to apply via PayMongo wallet reload.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Direct Employer Reply:</strong> Companies reply directly to your personal email, not a middleman.</span>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. CTA FOOTER SECTION */}
      {/* ========================================================================= */}
      <section className="py-16 bg-slate-900 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800 text-amber-400 text-xs font-bold border border-slate-700">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ready to land your next tech offer in the Philippines?</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
            Be Candidate #1 on tomorrow's 6:00 AM job scrape.
          </h2>

          <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
            Create your account in 60 seconds, upload your resume, and let our AI matcher deliver high-compatibility roles directly to your dashboard.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => onStartSignUp('new.applicant@email.com')}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-extrabold rounded-2xl text-sm transition-all flex items-center gap-2 shadow-lg"
            >
              <span>Get Started • 50 Bonus Credits</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenDashboard}
              className="px-6 py-4 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-bold rounded-2xl text-sm border border-slate-700 transition-all"
            >
              View Sample Dashboard
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
