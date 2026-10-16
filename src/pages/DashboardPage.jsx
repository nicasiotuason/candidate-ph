import React, { useState } from 'react';
import { 
  Briefcase, 
  Star, 
  Send, 
  Filter, 
  Search, 
  Wallet, 
  Plus, 
  Clock, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  AlertCircle,
  Mail,
  Receipt,
  RotateCw,
  Building2,
  FileText,
  User,
  Settings,
  Activity,
  DollarSign,
  Flag,
  MapPin,
  GraduationCap,
  TrendingUp,
  MessageSquare,
  ThumbsUp,
  Award,
  Layers,
  PauseCircle,
  PlayCircle,
  ArrowRight
} from 'lucide-react';
import JobCard from '../components/JobCard';
import ReviewSignOffModal from '../components/ReviewSignOffModal';
import TopUpModal from '../components/TopUpModal';
import FeedbackBox from '../components/FeedbackBox';
import { api } from '../services/api';
import { formatProperName } from '../utils/formatters';

export default function DashboardPage({ 
  user, 
  jobs, 
  savedJobIds, 
  appliedJobs, 
  testimonials, 
  onToggleSaveJob, 
  onConfirmApply, 
  onTopUpSuccess, 
  onAddTestimonial,
  isLandingPreview = false
}) {
  // Main view navigation: 'jobs' | 'resume' | 'profile' | 'admin'
  const [mainNav, setMainNav] = useState('jobs');

  // Jobs sub-tab: 'matched' | 'saved' | 'applied'
  const [activeTab, setActiveTab] = useState('matched');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMatchLevel, setFilterMatchLevel] = useState(60); // 60% match floor
  const [selectedSetup, setSelectedSetup] = useState('all');

  // Modal triggers
  const [selectedJobForApply, setSelectedJobForApply] = useState(null);
  const [isTopUpOpen, setIsTopUpOpen] = useState(false);

  // Interview reporting modal
  const [reportingInterviewApp, setReportingInterviewApp] = useState(null);
  const [interviewStage, setInterviewStage] = useState('Recruiter Screening');
  const [interviewDate, setInterviewDate] = useState('This week');
  const [interviewNote, setInterviewNote] = useState('');
  const [interviewReportedSuccess, setInterviewReportedSuccess] = useState(false);

  // Master Resume polish simulation state
  const [isPolishingResume, setIsPolishingResume] = useState(false);
  const [resumePolished, setResumePolished] = useState(false);

  // Profile editable form state (Pareto 6)
  const [profileForm, setProfileForm] = useState({
    name: user?.name ? formatProperName(user.name) : 'Juan Dela Cruz',
    email: user?.email || 'juan.delacruz@email.com',
    targetRole: user?.targetRole || 'Senior Frontend Engineer',
    salaryFloor: user?.salaryFloor || user?.desiredSalary || '₱160,000 / mo',
    noticePeriod: user?.noticePeriod || '30 Days (Standard Philippine Corporate)',
    citizenship: user?.citizenship || 'Filipino Citizen',
    setupPreference: user?.setupPreference || 'Hybrid • BGC / Makati / Remote',
    education: user?.education || "Bachelor's Degree (Computer Science)",
    isPaused: user?.isPaused || false
  });
  const [profileSaveMsg, setProfileSaveMsg] = useState(false);

  // Filter jobs logic (≥ 60% match floor)
  const filteredMatchedJobs = jobs.filter(job => {
    if (job.matchPercentage < filterMatchLevel) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchText = `${job.title} ${job.company} ${job.matchingSkills?.join(' ')} ${job.industry}`.toLowerCase();
      if (!matchText.includes(q)) return false;
    }

    if (selectedSetup === 'remote' && !job.setup.toLowerCase().includes('remote')) return false;
    if (selectedSetup === 'hybrid' && !job.setup.toLowerCase().includes('hybrid')) return false;

    return true;
  });

  const savedJobs = jobs.filter(j => savedJobIds.includes(j.id));
  const appliedJobIds = new Set(appliedJobs.map(a => a.jobId));

  // Handle interview report submission (Zero credit bounty, per user directive)
  const handleSubmitInterviewReport = (e) => {
    e.preventDefault();
    if (!reportingInterviewApp) return;

    onAddTestimonial(
      `🎉 Received an interview invite from ${reportingInterviewApp.company} for ${reportingInterviewApp.title} (${interviewStage})! ${interviewNote ? `Tip: "${interviewNote}"` : 'Direct ATS dispatch worked seamlessly.'}`,
      formatProperName(user?.name || 'Juan Dela Cruz')
    );

    setInterviewReportedSuccess(true);
    setTimeout(() => {
      setInterviewReportedSuccess(false);
      setReportingInterviewApp(null);
      setInterviewNote('');
    }, 2200);
  };

  // Handle Master Resume Polish (100% Free)
  const handlePolishMasterResume = () => {
    setIsPolishingResume(true);
    setTimeout(() => {
      setIsPolishingResume(false);
      setResumePolished(true);
    }, 1200);
  };

  // Save profile changes
  const handleSaveProfile = (e) => {
    e.preventDefault();
    api.updateUser(profileForm);
    setProfileSaveMsg(true);
    setTimeout(() => setProfileSaveMsg(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
      
      {/* 1. TOP TELEMETRY & WALLET HEADER */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-elevated">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          {/* Welcome & Profile Focus */}
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold mb-2">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
              <span>Search & Match Drop: Twice Daily (6:00 AM & 6:00 PM PHT)</span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 flex items-center gap-2.5">
              <span>Welcome, {formatProperName(user?.name || 'Juan Dela Cruz')}</span>
              {profileForm.isPaused ? (
                <span className="text-xs font-bold bg-amber-100 text-amber-800 px-2.5 py-1 rounded-full border border-amber-200 flex items-center gap-1">
                  <PauseCircle className="w-3.5 h-3.5" />
                  <span>Matching Paused</span>
                </span>
              ) : (
                <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
                  <span>Active Match Feed</span>
                </span>
              )}
            </h1>

            <p className="text-xs sm:text-sm text-slate-700 mt-1 max-w-2xl">
              Targeting: <strong className="text-slate-900">{user?.targetRole || 'Senior Frontend / Full-Stack Engineer'}</strong> • Showing roles with ≥ 60% match score posted in the last 14 days.
            </p>
          </div>

          {/* Wallet Action Box */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white flex items-center justify-between gap-6 shadow-md shrink-0">
            <div>
              <div className="flex items-center gap-1.5 text-xs text-slate-300 font-semibold">
                <Wallet className="w-3.5 h-3.5 text-amber-400" />
                <span>Application Wallet</span>
              </div>
              <div className="text-2xl font-black text-white mt-1">
                ₱{user?.walletBalance ?? 250}.00
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {Math.floor((user?.walletBalance ?? 250) / 50)} Direct Applications available (₱50/app)
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsTopUpOpen(true)}
              className="px-4 py-3 bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-black text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 shrink-0"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Buy Credits</span>
            </button>
          </div>

        </div>

        {/* 4 Summary Telemetry Pills */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-6 mt-6 border-t border-slate-100">
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block">ACTIVE PORTALS MONITORED</span>
            <span className="text-lg font-black text-slate-900 mt-0.5 block">15,443+</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block">MATCHED (≥ 60%)</span>
            <span className="text-lg font-black text-blue-600 mt-0.5 block">{jobs.length} Opportunities</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block">BOOKMARKS</span>
            <span className="text-lg font-black text-amber-500 mt-0.5 block">{savedJobIds.length} Saved</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block">APPLICATIONS SENT</span>
            <span className="text-lg font-black text-emerald-600 mt-0.5 block">{appliedJobs.length} Dispatched</span>
          </div>
        </div>

      </div>

      {/* 2. PRIMARY NAVIGATION TABS */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
        <button
          type="button"
          onClick={() => setMainNav('jobs')}
          className={`px-4 py-2.5 rounded-2xl font-extrabold text-xs sm:text-sm transition-all flex items-center gap-2 ${
            mainNav === 'jobs'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Jobs Feed</span>
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
            mainNav === 'jobs' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
          }`}>
            {jobs.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setMainNav('resume')}
          className={`px-4 py-2.5 rounded-2xl font-extrabold text-xs sm:text-sm transition-all flex items-center gap-2 ${
            mainNav === 'resume'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Master Resume</span>
          <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            Free Polish
          </span>
        </button>

        <button
          type="button"
          onClick={() => setMainNav('profile')}
          className={`px-4 py-2.5 rounded-2xl font-extrabold text-xs sm:text-sm transition-all flex items-center gap-2 ${
            mainNav === 'profile'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Profile (Pareto 6)</span>
          <span className="text-[10px] font-extrabold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
            {user?.profileStrength || 85}%
          </span>
        </button>

        <button
          type="button"
          onClick={() => setMainNav('admin')}
          className={`px-4 py-2.5 rounded-2xl font-extrabold text-xs sm:text-sm transition-all flex items-center gap-2 ml-auto ${
            mainNav === 'admin'
              ? 'bg-slate-900 text-white shadow-md'
              : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
          }`}
        >
          <Activity className="w-4 h-4 text-emerald-400" />
          <span>Founders' Telemetry</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        </button>
      </div>

      {/* ================= VIEW 1: JOBS FEED ================= */}
      {mainNav === 'jobs' && (
        <div className="space-y-6">
          
          {/* Sub-Tabs: Matched (60%+), Saved, Applied History */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('matched')}
                className={`px-3.5 py-2 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 ${
                  activeTab === 'matched'
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>Recommended (≥ 60%)</span>
                <span className="px-1.5 py-0.2 rounded-full bg-white/20 text-[10px]">
                  {filteredMatchedJobs.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('saved')}
                className={`px-3.5 py-2 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 ${
                  activeTab === 'saved'
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                }`}
              >
                <Star className={`w-3.5 h-3.5 ${savedJobIds.length > 0 ? 'fill-amber-400 text-amber-400' : ''}`} />
                <span>Saved Bookmarks</span>
                <span className="px-1.5 py-0.2 rounded-full bg-white/20 text-[10px]">
                  {savedJobs.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('applied')}
                className={`px-3.5 py-2 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 ${
                  activeTab === 'applied'
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                }`}
              >
                <Send className="w-3.5 h-3.5" />
                <span>Applications Sent</span>
                <span className="px-1.5 py-0.2 rounded-full bg-white/20 text-[10px]">
                  {appliedJobs.length}
                </span>
              </button>
            </div>

            {/* Search & Filter Controls */}
            {activeTab !== 'applied' && (
              <div className="flex flex-wrap items-center gap-2.5">
                <div className="relative flex-1 sm:w-56">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search role, company..."
                    className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-200 bg-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <select
                  value={filterMatchLevel}
                  onChange={(e) => setFilterMatchLevel(Number(e.target.value))}
                  className="px-3 py-1.5 text-xs border border-slate-200 bg-white rounded-xl font-bold text-slate-700 focus:outline-none"
                >
                  <option value={60}>Min Match: 60%+</option>
                  <option value={75}>Min Match: 75%+</option>
                  <option value={90}>Min Match: 90%+ Only</option>
                </select>

                <select
                  value={selectedSetup}
                  onChange={(e) => setSelectedSetup(e.target.value)}
                  className="px-3 py-1.5 text-xs border border-slate-200 bg-white rounded-xl font-bold text-slate-700 focus:outline-none"
                >
                  <option value="all">All Setups</option>
                  <option value="remote">Remote Only</option>
                  <option value="hybrid">Hybrid Only</option>
                </select>
              </div>
            )}
          </div>

          {/* TAB A: MATCHED FEED */}
          {activeTab === 'matched' && (
            <div>
              {filteredMatchedJobs.length === 0 ? (
                <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
                  <Briefcase className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                  <h3 className="text-base font-extrabold text-slate-800">No jobs match your filter</h3>
                  <p className="text-xs text-slate-400 mt-1">Try lowering the minimum match filter or clearing the search box.</p>
                  <button
                    onClick={() => { setFilterMatchLevel(60); setSearchQuery(''); setSelectedSetup('all'); }}
                    className="mt-4 px-4 py-2 bg-blue-50 text-blue-600 text-xs font-bold rounded-xl"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Freshness Lifespan Notice */}
                  <div className="flex items-center justify-between text-xs text-slate-500 px-1">
                    <span>Showing top verified roles (filtered by 14-day freshness lifespan)</span>
                    <span className="font-bold text-slate-700">{filteredMatchedJobs.length} active roles</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {(isLandingPreview ? filteredMatchedJobs.slice(0, 6) : filteredMatchedJobs).map((job) => (
                      <JobCard
                        key={job.id}
                        job={job}
                        isSaved={savedJobIds.includes(job.id)}
                        isApplied={appliedJobIds.has(job.id)}
                        onToggleSave={onToggleSaveJob}
                        onQuickApply={(j) => setSelectedJobForApply(j)}
                      />
                    ))}
                  </div>

                  {isLandingPreview && (
                    <div className="mt-8 p-5 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-xs">
                      <div>
                        <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-black text-blue-950 uppercase tracking-wider mb-1">
                          <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                          <span>Showing 3 Rows (6 of 18 Live Matched Roles)</span>
                        </div>
                        <p className="text-xs text-slate-700 font-medium max-w-xl">
                          This is a curated preview. Sign up in 60 seconds to unlock your full verified feed and claim your ₱50 welcome balance.
                        </p>
                      </div>
                      <a
                        href="/signup"
                        className="px-5 py-3 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md transition-all whitespace-nowrap cursor-pointer flex items-center gap-2"
                      >
                        <span>Sign Up & Unlock Full Dashboard</span>
                        <ArrowRight className="w-4 h-4 text-amber-300" />
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB B: SAVED BOOKMARKS */}
          {activeTab === 'saved' && (
            <div>
              {savedJobs.length === 0 ? (
                <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
                  <Star className="w-10 h-10 text-amber-300 mx-auto mb-3" />
                  <h3 className="text-base font-extrabold text-slate-800">No Bookmarked Jobs</h3>
                  <p className="text-xs text-slate-400 mt-1">Click the star icon on any Job Card to bookmark roles for later review.</p>
                  <button
                    onClick={() => setActiveTab('matched')}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl"
                  >
                    Explore Matched Jobs
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {savedJobs.map((job) => (
                    <JobCard
                      key={job.id}
                      job={job}
                      isSaved={true}
                      isApplied={appliedJobIds.has(job.id)}
                      onToggleSave={onToggleSaveJob}
                      onQuickApply={(j) => setSelectedJobForApply(j)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB C: APPLIED JOBS & DELIVERY RECEIPTS */}
          {activeTab === 'applied' && (
            <div className="space-y-4">
              
              {/* Trust & Zero Middleman Policy Banner */}
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
                <Mail className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs text-emerald-950">
                  <span className="font-bold block text-emerald-900">Direct Employer Communication & Zero Middleman:</span>
                  All applications below were verified as delivered to the employer's official career portal queue. <strong>Recruiters will reply directly to your email: {user?.email}</strong>. Once sent, CANDIDATE.ph never intercepts or takes a cut of your compensation.
                </div>
              </div>

              {appliedJobs.length === 0 ? (
                <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
                  <Send className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                  <h3 className="text-base font-extrabold text-slate-800">No Applications Sent Yet</h3>
                  <p className="text-xs text-slate-400 mt-1">Use the 1-Click Apply on any 60%+ matched card to send your resume for ₱50.</p>
                  <button
                    onClick={() => setActiveTab('matched')}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl"
                  >
                    Find Roles to Apply
                  </button>
                </div>
              ) : (
                <div className="bg-white rounded-3xl border border-slate-200 shadow-elevated overflow-hidden divide-y divide-slate-100">
                  {appliedJobs.map((app) => (
                    <div key={app.id} className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
                      
                      <div className="space-y-1.5 flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-black text-slate-900 text-base">{app.company}</span>
                          <span className="text-xs font-bold text-slate-400">• {app.portal || 'Direct Portal'}</span>
                          <span className="text-[10px] font-extrabold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            <span>Delivered to Recruiter Queue</span>
                          </span>
                        </div>

                        <h4 className="text-sm font-bold text-blue-700">{app.title}</h4>
                        
                        <p className="text-xs text-slate-500">
                          Salary: <strong className="text-slate-700">{app.salary}</strong> • Employer reply destination: <strong className="text-slate-800">{app.employerReplyTarget}</strong>
                        </p>

                        {app.tailoredHeadline && (
                          <p className="text-[11px] text-slate-500 italic">
                            Signed-off: "{app.tailoredHeadline}"
                          </p>
                        )}
                      </div>

                      {/* Right Side: Receipt & "I Got an Interview!" Action */}
                      <div className="sm:text-right shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100 space-y-2">
                        <div className="flex sm:flex-col items-center sm:items-end justify-between gap-1">
                          <div className="inline-flex items-center gap-1 text-xs font-black text-rose-600 bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-100">
                            <Receipt className="w-3.5 h-3.5" />
                            <span>-₱{app.deductionPhp}.00 Debited</span>
                          </div>
                          
                          <div className="text-[11px] font-mono text-slate-400">
                            Receipt: {app.atsReceiptId || `REC-DIR-${app.id}`}
                          </div>

                          <div className="text-[10px] text-slate-400">
                            {new Date(app.appliedAt).toLocaleDateString('en-PH', { 
                              month: 'short', 
                              day: 'numeric', 
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </div>
                        </div>

                        {/* "Got an Interview!" 1-Click Reporting Button (No credit bounty, pure candidate joy) */}
                        <button
                          type="button"
                          onClick={() => setReportingInterviewApp(app)}
                          className="w-full sm:w-auto px-3.5 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1.5"
                        >
                          <Award className="w-3.5 h-3.5 text-amber-600" />
                          <span>Got an Interview!</span>
                        </button>
                      </div>

                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      )}

      {/* ================= VIEW 2: MASTER RESUME ================= */}
      {mainNav === 'resume' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-elevated space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold mb-2">
                <FileText className="w-3.5 h-3.5 text-blue-600" />
                <span>SINGLE SOURCE OF TRUTH</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Master Resume on File
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Your Master Resume is kept on file. At application time, you decide whether to dispatch this exact document or an ATS Tailored version.
              </p>
            </div>

            {/* Optimize Master Resume (100% Free - Never charged) */}
            <button
              type="button"
              disabled={isPolishingResume}
              onClick={handlePolishMasterResume}
              className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 shrink-0"
            >
              {isPolishingResume ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Polishing Bullets...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Optimize Master Resume (Free)</span>
                </>
              )}
            </button>
          </div>

          {resumePolished && (
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-2 text-xs font-bold text-emerald-800 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Master Resume polished! Bullet points streamlined with measurable action verbs. Free of charge.</span>
            </div>
          )}

          {/* Current Master Resume Card */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-black">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-extrabold text-slate-900">{user?.resumeFileName || "Juan_DelaCruz_Senior_Frontend_Resume.pdf"}</p>
                <p className="text-xs text-slate-500">Last verified: Today • 148 KB • PDF Format</p>
              </div>
            </div>

            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
              Active Master ✓
            </span>
          </div>

          {/* Extracted Core Competencies */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
              Verified Technical Competencies on File:
            </h4>
            <div className="flex flex-wrap gap-2">
              {user?.skills?.map((skill, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 text-xs bg-white text-slate-800 border border-slate-200 px-3 py-1.5 rounded-xl font-medium shadow-xs"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{skill}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Summary Statement */}
          <div className="space-y-2">
            <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
              Executive Profile Summary:
            </h4>
            <p className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              {user?.summary}
            </p>
          </div>
        </div>
      )}

      {/* ================= VIEW 3: PROFILE & PARETO 6 ================= */}
      {mainNav === 'profile' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-elevated space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold mb-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>PROGRESSIVE PROFILE & PARETO 6</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Candidate Profile Settings
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Keep your universal screening answers up to date so direct applications dispatch without friction.
              </p>
            </div>

            {/* Profile Strength Meter */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3 shrink-0">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-xs">
                {user?.profileStrength || 85}%
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">Profile Clearance</p>
                <p className="text-[10px] text-emerald-700 font-semibold">Ready for Direct ATS Portals</p>
              </div>
            </div>
          </div>

          {/* Account Status: Active vs Auto-Pause Toggle */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-0.5">
              <p className="text-xs font-bold text-amber-950 flex items-center gap-2">
                <span>Account Matching Status:</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                  profileForm.isPaused ? 'bg-amber-200 text-amber-900' : 'bg-emerald-200 text-emerald-900'
                }`}>
                  {profileForm.isPaused ? 'PAUSED' : 'ACTIVE MATCHING'}
                </span>
              </p>
              <p className="text-[11px] text-amber-800">
                Accounts without logins for 30 consecutive days automatically pause matching to conserve resources. You can toggle anytime.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setProfileForm({ ...profileForm, isPaused: !profileForm.isPaused })}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                profileForm.isPaused
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                  : 'bg-amber-600 text-white hover:bg-amber-700'
              }`}
            >
              {profileForm.isPaused ? 'Resume Matching' : 'Pause Matching'}
            </button>
          </div>

          {profileSaveMsg && (
            <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Profile settings saved successfully!</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Legal Name:</label>
                <input
                  type="text"
                  value={profileForm.name}
                  onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 font-medium"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Contact Email (Direct Replies):</label>
                <input
                  type="email"
                  value={profileForm.email}
                  onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 font-medium"
                />
              </div>

              {/* Target Role */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Target Job Title:</label>
                <input
                  type="text"
                  value={profileForm.targetRole}
                  onChange={(e) => setProfileForm({ ...profileForm, targetRole: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 font-medium"
                />
              </div>

              {/* Monthly Salary Floor */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Expected Monthly Salary Floor (₱):</label>
                <input
                  type="text"
                  value={profileForm.salaryFloor}
                  onChange={(e) => setProfileForm({ ...profileForm, salaryFloor: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 font-medium"
                />
              </div>

              {/* Notice Period */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Notice Period:</label>
                <select
                  value={profileForm.noticePeriod}
                  onChange={(e) => setProfileForm({ ...profileForm, noticePeriod: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white font-medium"
                >
                  <option value="Immediate / Available Now">Immediate / Available Now</option>
                  <option value="15 Days">15 Days</option>
                  <option value="30 Days (Standard Philippine Corporate)">30 Days (Standard Philippine Corporate)</option>
                  <option value="60 Days">60 Days</option>
                </select>
              </div>

              {/* Work Authorization */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Work Authorization:</label>
                <select
                  value={profileForm.citizenship}
                  onChange={(e) => setProfileForm({ ...profileForm, citizenship: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white font-medium"
                >
                  <option value="Filipino Citizen">Filipino Citizen</option>
                  <option value="Dual Citizen">Dual Citizen (PH / Other)</option>
                  <option value="Foreign National with PH Work Visa">Foreign National with PH Work Visa</option>
                </select>
              </div>

              {/* Preferred Setup */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Preferred Work Setup:</label>
                <select
                  value={profileForm.setupPreference}
                  onChange={(e) => setProfileForm({ ...profileForm, setupPreference: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white font-medium"
                >
                  <option value="Hybrid • BGC / Makati / Remote">Hybrid • BGC / Makati / Remote</option>
                  <option value="Fully Remote (PH or Worldwide)">Fully Remote (PH or Worldwide)</option>
                  <option value="Ortigas / Pasig / Mandaluyong">Ortigas / Pasig / Mandaluyong</option>
                  <option value="Alabang / Muntinlupa Hub">Alabang / Muntinlupa Hub</option>
                </select>
              </div>

              {/* Highest Education */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Highest Educational Attainment:</label>
                <select
                  value={profileForm.education}
                  onChange={(e) => setProfileForm({ ...profileForm, education: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white font-medium"
                >
                  <option value="Bachelor's Degree (Computer Science)">Bachelor's Degree (Computer Science)</option>
                  <option value="Bachelor's Degree (Other)">Bachelor's Degree (Other)</option>
                  <option value="Master's Degree">Master's Degree</option>
                  <option value="Doctorate / PhD">Doctorate / PhD</option>
                  <option value="College Undergraduate">College Undergraduate</option>
                </select>
              </div>

            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-all"
              >
                Save Profile Changes
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ================= VIEW 4: FOUNDERS' TELEMETRY DASHBOARD ================= */}
      {mainNav === 'admin' && (
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold mb-2">
                <Activity className="w-3.5 h-3.5 text-emerald-400" />
                <span>FOUNDERS' COMMAND CENTER</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                CANDIDATE.ph Platform Telemetry
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Real-time operational metrics across candidate registrations, PayMongo wallet GMV, and verified ATS dispatches.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="text-xs font-bold text-emerald-400">All Systems Operational</span>
            </div>
          </div>

          {/* 5 Core Metric Cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">REGISTERED USERS</span>
              <span className="text-2xl font-black text-white mt-1 block">4,892</span>
              <span className="text-[10px] text-emerald-400 font-bold mt-1 block">+18.4% this week</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">DISPATCHED (₱50)</span>
              <span className="text-2xl font-black text-blue-400 mt-1 block">11,420</span>
              <span className="text-[10px] text-slate-400 font-medium mt-1 block">Across Direct Employer Portals</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">PAYMONGO GMV</span>
              <span className="text-2xl font-black text-amber-400 mt-1 block">₱571,000</span>
              <span className="text-[10px] text-amber-300/80 font-bold mt-1 block">GCash / Maya / Cards</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">DELIVERY SUCCESS</span>
              <span className="text-2xl font-black text-emerald-400 mt-1 block">99.8%</span>
              <span className="text-[10px] text-slate-400 font-medium mt-1 block">₱0 refunded if undelivered</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">INTERVIEW CALLBACKS</span>
              <span className="text-2xl font-black text-rose-400 mt-1 block">342</span>
              <span className="text-[10px] text-rose-300 font-bold mt-1 block">Voluntary candidate reports</span>
            </div>
          </div>

          {/* Top In-Demand Roles Leaderboard */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            
            <div className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700 space-y-3">
              <h4 className="text-xs font-black text-white uppercase tracking-wider">
                Top Companies by Application Volume:
              </h4>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2 rounded-xl bg-slate-800">
                  <span className="font-bold text-white">1. Maya (Digital Bank)</span>
                  <span className="text-emerald-400 font-mono font-bold">1,842 applications</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-xl bg-slate-800">
                  <span className="font-bold text-white">2. Canva Philippines</span>
                  <span className="text-cyan-400 font-mono font-bold">1,419 applications</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-xl bg-slate-800">
                  <span className="font-bold text-white">3. Coins.ph</span>
                  <span className="text-blue-400 font-mono font-bold">1,105 applications</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-xl bg-slate-800">
                  <span className="font-bold text-white">4. Sprout Solutions</span>
                  <span className="text-emerald-400 font-mono font-bold">894 applications</span>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700 space-y-3">
              <h4 className="text-xs font-black text-white uppercase tracking-wider">
                Live Dispatch Telemetry Stream:
              </h4>
              <div className="space-y-2 text-[11px] font-mono text-slate-300">
                <div className="p-2 rounded-xl bg-slate-800/80 flex items-center justify-between">
                  <span>[12s ago] Maya • Sr React Dev</span>
                  <span className="text-emerald-400 font-bold">Delivered (ATS-GRN-9982)</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-800/80 flex items-center justify-between">
                  <span>[45s ago] Coins.ph • Lead Web Dev</span>
                  <span className="text-emerald-400 font-bold">Delivered (ATS-LVR-3341)</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-800/80 flex items-center justify-between">
                  <span>[2m ago] Canva • Platform Eng</span>
                  <span className="text-emerald-400 font-bold">Delivered (ATS-WRK-5519)</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-800/80 flex items-center justify-between">
                  <span>[4m ago] Sprout • Full-Stack</span>
                  <span className="text-emerald-400 font-bold">Delivered (ATS-GRN-4412)</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 3. COMMUNITY WALL & KIND WORDS (Hidden in Landing Preview) */}
      {!isLandingPreview && (
        <FeedbackBox
          testimonials={testimonials}
          onAddTestimonial={onAddTestimonial}
          userName={user?.name}
        />
      )}

      {/* 4. MODALS */}

      {/* Review & Sign-Off Modal */}
      <ReviewSignOffModal
        job={selectedJobForApply}
        user={user}
        isOpen={Boolean(selectedJobForApply)}
        onClose={() => setSelectedJobForApply(null)}
        onConfirmApply={async (job, tailoredData) => {
          await onConfirmApply(job, tailoredData);
          setSelectedJobForApply(null);
        }}
        onOpenTopUp={() => {
          setSelectedJobForApply(null);
          setIsTopUpOpen(true);
        }}
      />

      {/* Buy Credits Modal (PayMongo) */}
      <TopUpModal
        isOpen={isTopUpOpen}
        onClose={() => setIsTopUpOpen(false)}
        currentBalance={user?.walletBalance ?? 250}
        onTopUpSuccess={onTopUpSuccess}
      />

      {/* "I Got an Interview!" Modal (Zero ₱50 credit bounty per user instruction) */}
      {reportingInterviewApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-md p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
            
            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-3 shadow-xs">
                <Award className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-xl font-black text-slate-900">
                You Landed an Interview!
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Tell us about your interview callback with <strong>{reportingInterviewApp.company}</strong> for {reportingInterviewApp.title}.
              </p>
            </div>

            {interviewReportedSuccess ? (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <h4 className="text-sm font-black text-emerald-950">Awesome News Logged!</h4>
                <p className="text-xs text-emerald-800">Your win has been shared with the community. Galing mo!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitInterviewReport} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Interview Stage:
                  </label>
                  <select
                    value={interviewStage}
                    onChange={(e) => setInterviewStage(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white font-medium"
                  >
                    <option value="Recruiter Screening">Recruiter Screening</option>
                    <option value="Hiring Manager Chat">Hiring Manager Chat</option>
                    <option value="Technical Round / Live Coding">Technical Round / Live Coding</option>
                    <option value="Executive / Founder Final Round">Executive / Founder Final Round</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Callback Timeline:
                  </label>
                  <input
                    type="text"
                    value={interviewDate}
                    onChange={(e) => setInterviewDate(e.target.value)}
                    placeholder="e.g. Received email 2 days after applying"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Quick Tip or Encouragement for Fellow Candidates (Optional):
                  </label>
                  <textarea
                    rows={2}
                    value={interviewNote}
                    onChange={(e) => setInterviewNote(e.target.value)}
                    placeholder="e.g. Reviewed their public GitHub repos before the call!"
                    className="w-full p-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 font-medium resize-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setReportingInterviewApp(null)}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-600 hover:bg-slate-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-black text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Celebrate My Interview!</span>
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
