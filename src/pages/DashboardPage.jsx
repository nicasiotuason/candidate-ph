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
  Building2
} from 'lucide-react';
import JobCard from '../components/JobCard';
import ReviewSignOffModal from '../components/ReviewSignOffModal';
import TopUpModal from '../components/TopUpModal';
import FeedbackBox from '../components/FeedbackBox';

export default function DashboardPage({ 
  user, 
  jobs, 
  savedJobIds, 
  appliedJobs, 
  testimonials, 
  onToggleSaveJob, 
  onConfirmApply, 
  onTopUpSuccess, 
  onAddTestimonial 
}) {
  const [activeTab, setActiveTab] = useState('matched'); // 'matched' | 'saved' | 'applied'
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMatchLevel, setFilterMatchLevel] = useState(60); // min match % (default 60%)
  const [selectedSetup, setSelectedSetup] = useState('all');

  // Modal triggers
  const [selectedJobForApply, setSelectedJobForApply] = useState(null);
  const [isTopUpOpen, setIsTopUpOpen] = useState(false);

  // Filter jobs logic
  const filteredMatchedJobs = jobs.filter(job => {
    // Match threshold: Must be >= 60%
    if (job.matchPercentage < filterMatchLevel) return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchText = `${job.title} ${job.company} ${job.skills.join(' ')} ${job.industry}`.toLowerCase();
      if (!matchText.includes(q)) return false;
    }

    // Work setup
    if (selectedSetup === 'remote' && !job.setup.toLowerCase().includes('remote')) return false;
    if (selectedSetup === 'hybrid' && !job.setup.toLowerCase().includes('hybrid')) return false;

    return true;
  });

  // Saved jobs list
  const savedJobs = jobs.filter(j => savedJobIds.includes(j.id));

  // Applied job IDs set for quick check
  const appliedJobIds = new Set(appliedJobs.map(a => a.jobId));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      
      {/* 1. TOP HEADER & TELEMETRY BAR */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-elevated mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          {/* User Welcome & Profile Recap */}
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold mb-2">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
              <span>Scraper Sync: Twice Daily (6:00 AM & 6:00 PM PHT)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Welcome back, {user?.name || 'Juan Dela Cruz'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
              Targeting: <strong className="text-slate-800">{user?.targetRole || 'Senior Frontend Engineer'}</strong> • Matching {user?.citizenship || 'Filipino'} candidates with ATS roles scanning 60%+ qualification overlap.
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
                {Math.floor((user?.walletBalance ?? 250) / 50)} Quick Applies remaining (₱50/app)
              </p>
            </div>

            <button
              onClick={() => setIsTopUpOpen(true)}
              className="px-4 py-3 bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-extrabold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Reload (PayMongo)</span>
            </button>
          </div>

        </div>

        {/* 4 Summary Stats Pills */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-6 mt-6 border-t border-slate-100">
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">SCRAPED JOBS SCANNED</span>
            <span className="text-lg font-black text-slate-900 mt-0.5 block">15,443+</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">MATCHED (≥ 60%)</span>
            <span className="text-lg font-black text-blue-600 mt-0.5 block">{jobs.length} Opportunities</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">STARRED JOBS</span>
            <span className="text-lg font-black text-amber-500 mt-0.5 block">{savedJobIds.length} Saved</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">APPLICATIONS SENT</span>
            <span className="text-lg font-black text-emerald-600 mt-0.5 block">{appliedJobs.length} Sent to ATS</span>
          </div>
        </div>

      </div>

      {/* 2. TABS & FILTER CONTROLS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2 md:pb-0 md:border-b-0">
          <button
            onClick={() => setActiveTab('matched')}
            className={`px-4 py-2.5 rounded-2xl font-extrabold text-xs sm:text-sm transition-all flex items-center gap-2 ${
              activeTab === 'matched'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Matched Jobs (60%+)</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
              activeTab === 'matched' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
            }`}>
              {filteredMatchedJobs.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('saved')}
            className={`px-4 py-2.5 rounded-2xl font-extrabold text-xs sm:text-sm transition-all flex items-center gap-2 ${
              activeTab === 'saved'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            <Star className={`w-4 h-4 ${savedJobIds.length > 0 ? 'fill-amber-400 text-amber-400' : ''}`} />
            <span>Saved Jobs</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
              activeTab === 'saved' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
            }`}>
              {savedJobs.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('applied')}
            className={`px-4 py-2.5 rounded-2xl font-extrabold text-xs sm:text-sm transition-all flex items-center gap-2 ${
              activeTab === 'applied'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            <Send className="w-4 h-4" />
            <span>Applied Jobs</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
              activeTab === 'applied' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
            }`}>
              {appliedJobs.length}
            </span>
          </button>
        </div>

        {/* Search & Filters */}
        {activeTab !== 'applied' && (
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-60">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search role, company..."
                className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 bg-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Match Level Filter Selector */}
            <select
              value={filterMatchLevel}
              onChange={(e) => setFilterMatchLevel(Number(e.target.value))}
              className="px-3 py-2 text-xs border border-slate-200 bg-white rounded-xl font-bold text-slate-700 focus:outline-none"
            >
              <option value={60}>Min Match: 60%+</option>
              <option value={75}>Min Match: 75%+</option>
              <option value={90}>Min Match: 90%+ Only</option>
            </select>

            {/* Work Setup Filter */}
            <select
              value={selectedSetup}
              onChange={(e) => setSelectedSetup(e.target.value)}
              className="px-3 py-2 text-xs border border-slate-200 bg-white rounded-xl font-bold text-slate-700 focus:outline-none"
            >
              <option value="all">All Setups</option>
              <option value="remote">Remote Only</option>
              <option value="hybrid">Hybrid Only</option>
            </select>
          </div>
        )}

      </div>

      {/* 3. TAB CONTENT */}

      {/* TAB A: MATCHED JOBS FEED */}
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredMatchedJobs.map((job) => (
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
          )}
        </div>
      )}

      {/* TAB B: SAVED (STARRED) JOBS */}
      {activeTab === 'saved' && (
        <div>
          {savedJobs.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
              <Star className="w-10 h-10 text-amber-300 mx-auto mb-3" />
              <h3 className="text-base font-extrabold text-slate-800">No Saved Jobs Yet</h3>
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

      {/* TAB C: APPLIED JOBS (AUDIT TRAIL & RECEIPTS) */}
      {activeTab === 'applied' && (
        <div className="space-y-4">
          {/* Trust Banner on Applied Jobs */}
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
            <Mail className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-xs text-emerald-950">
              <span className="font-bold block text-emerald-900">Direct Employer Response Policy:</span>
              These applications were dispatched directly to the employer's official ATS. <strong>Employers will email you directly at your personal address: {user?.email}</strong>. Once sent, CANDIDATE.ph does not intercept or delay communication.
            </div>
          </div>

          {appliedJobs.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
              <Send className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-extrabold text-slate-800">No Applications Sent Yet</h3>
              <p className="text-xs text-slate-400 mt-1">Use the 1-Click Quick Apply on any 60%+ matched card to send your resume for ₱50.</p>
              <button
                onClick={() => setActiveTab('matched')}
                className="mt-4 px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl"
              >
                Find Jobs to Apply
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-slate-200 shadow-elevated overflow-hidden">
              <div className="divide-y divide-slate-100">
                {appliedJobs.map((app) => (
                  <div key={app.id} className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
                    
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-black text-slate-900 text-base">{app.company}</span>
                        <span className="text-xs font-bold text-slate-400">• {app.portal} ATS</span>
                        <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>{app.status}</span>
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-blue-700">{app.title}</h4>
                      
                      <p className="text-xs text-slate-500">
                        Salary: <strong className="text-slate-700">{app.salary}</strong> • Employer reply destination: <strong className="text-slate-800">{app.employerReplyTarget}</strong>
                      </p>

                      {app.tailoredHeadline && (
                        <p className="text-[11px] text-slate-400 italic">
                          Signed-off headline: "{app.tailoredHeadline}"
                        </p>
                      )}
                    </div>

                    <div className="sm:text-right shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100 space-y-1">
                      <div className="inline-flex items-center gap-1 text-xs font-black text-rose-600 bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-100">
                        <Receipt className="w-3.5 h-3.5" />
                        <span>-₱{app.deductionPhp}.00 Debited</span>
                      </div>
                      
                      <div className="text-[11px] font-mono text-slate-400">
                        Receipt: {app.atsReceiptId}
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

                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 4. BOTTOM COMMUNITY WALL & COMMENT BOX */}
      <FeedbackBox
        testimonials={testimonials}
        onAddTestimonial={onAddTestimonial}
        userName={user?.name}
      />

      {/* 5. REVIEW, TWEAK & SIGN-OFF MODAL (THE KEY USER REQUIREMENT) */}
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

      {/* 6. PAYMONGO TOP UP MODAL */}
      <TopUpModal
        isOpen={isTopUpOpen}
        onClose={() => setIsTopUpOpen(false)}
        currentBalance={user?.walletBalance ?? 250}
        onTopUpSuccess={onTopUpSuccess}
      />

    </div>
  );
}
