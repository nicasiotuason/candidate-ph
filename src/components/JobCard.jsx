import React from 'react';
import { 
  CheckCircle2, 
  Check, 
  Zap, 
  Star, 
  Clock, 
  Users, 
  Briefcase, 
  ShieldCheck, 
  TrendingUp, 
  MapPin,
  Heart
} from 'lucide-react';

export default function JobCard({ 
  job, 
  isSaved, 
  onToggleSave, 
  onQuickApply, 
  isApplied = false,
  footerChildren = null
}) {
  if (!job) return null;

  // Calculate score and matching labels
  const score = job.matchPercentage || job.matchScore || 95;
  const matchLabel = job.matchLabel || (score >= 95 ? 'EXCEPTIONAL MATCH' : score >= 85 ? 'STRONG MATCH' : 'HIGH MATCH');

  // Fit reasons matching the Hero two-zone style
  const fitReasons = job.fitReasons || [
    `Core stack: ${job.coreCount || (job.matchingSkills?.slice(0, 2).join(', ') + ' matched') || 'Full stack match'}`,
    `Salary floor met (${job.salary})`,
    `${job.setup || 'Hybrid / Remote'} • ${job.portalBadge || 'Direct ATS Queue'}`
  ];

  const logoText = job.logoText || job.logo || job.company?.charAt(0) || 'C';
  const logoColor = job.logoColor || 'bg-blue-600 text-white';
  const postedInfo = job.postedHeader || (job.postedAgo ? `Early Applicant • ${job.postedAgo} • ${job.applicantCount || '< 15 applicants'}` : 'Discovered recently • Early Bird');

  return (
    <div className="relative bg-white rounded-3xl p-5 sm:p-6 shadow-elevated border border-slate-200 hover:border-blue-400 transition-all text-left flex flex-col justify-between group">
      
      {/* Top Timing & Urgency Header */}
      <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
        <div className="flex items-center gap-2 truncate">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse shrink-0"></span>
          <span className="text-xs font-bold text-amber-900 truncate">
            {postedInfo}
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="inline-flex items-center gap-1 text-[11px] font-black text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>ACTIVE ROLE</span>
          </span>

          {/* Bookmark Star Button */}
          {onToggleSave && (
            <button
              type="button"
              onClick={() => onToggleSave(job.id)}
              className={`p-1.5 rounded-xl border transition-all cursor-pointer ${
                isSaved 
                  ? 'bg-amber-50 border-amber-200 text-amber-500' 
                  : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-amber-500 hover:bg-amber-50/50'
              }`}
              title={isSaved ? "Saved in Bookmarks" : "Star to Bookmark Job"}
              aria-label="Bookmark job"
            >
              <Star className={`w-3.5 h-3.5 ${isSaved ? 'fill-amber-500 text-amber-500' : ''}`} />
            </button>
          )}
        </div>
      </div>

      {/* The Two-Zone Grid */}
      <div className="pt-4 grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch flex-1">
        
        {/* Zone 1: Left 7-Cols (Job Metadata & Application Action) */}
        <div className="md:col-span-7 flex flex-col justify-between space-y-4">
          
          {/* Company Header */}
          <div className="flex items-start gap-3">
            <div className={`w-12 h-12 rounded-2xl ${logoColor} font-black text-xl flex items-center justify-center shadow-xs shrink-0`}>
              {logoText}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 text-xs text-slate-700 font-semibold truncate">
                <span className="font-bold text-slate-900">{job.company}</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 fill-blue-500 shrink-0" />
                <span className="text-slate-500 truncate">• {job.industry}</span>
                {job.portal && (
                  <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-1.5 py-0.2 rounded border border-slate-200 shrink-0">
                    {job.portal}
                  </span>
                )}
              </div>
              <h3 className="font-black text-slate-900 text-base sm:text-lg leading-snug mt-0.5 line-clamp-2">
                {job.title}
              </h3>
            </div>
          </div>

          {/* 2-Row Metadata Grid */}
          <div className="space-y-2 pt-1 text-xs">
            {/* Row 1: Location & Employment Type */}
            <div className="flex flex-wrap items-center gap-2 text-slate-800">
              <span className="inline-flex items-center gap-1 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200/80 font-medium">
                <MapPin className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                <span>{job.location || 'Metro Manila'} • {job.setup}</span>
              </span>
              <span className="inline-flex items-center gap-1 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200/80 font-medium">
                <Briefcase className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                <span>{job.type || 'Full-Time'}</span>
              </span>
            </div>

            {/* Row 2: Seniority & Experience */}
            <div className="flex flex-wrap items-center gap-2 text-slate-800">
              <span className="inline-flex items-center gap-1 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200/80 font-medium">
                <TrendingUp className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                <span>{job.level || 'Mid-Senior'}</span>
              </span>
              <span className="inline-flex items-center gap-1 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200/80 font-medium">
                <Clock className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                <span>{job.experience || '3+ yrs exp'}</span>
              </span>
            </div>

            {/* Salary Row: Option A Rule */}
            <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/80 text-amber-950 font-bold text-xs sm:text-[13px] flex items-center gap-2">
              <span className="text-sm">💰</span>
              <span className="font-extrabold">{job.salary}</span>
            </div>

            {/* Matching Skills Breakdown */}
            {job.matchingSkills && job.matchingSkills.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {job.matchingSkills.slice(0, 3).map((skill, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-lg"
                  >
                    <Check className="w-3 h-3 text-emerald-600 stroke-[3]" />
                    <span>{skill}</span>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Action Bar */}
          <div className="pt-2 flex items-center gap-2">
            {isApplied ? (
              <div className="flex-1 py-3 px-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-center gap-2 text-emerald-800 font-extrabold text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Applied ✓</span>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => onQuickApply && onQuickApply(job)}
                className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-extrabold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer text-sm group/btn"
              >
                <Zap className="w-4 h-4 text-amber-300 fill-amber-300 group-hover/btn:scale-110 transition-transform" />
                <span>Apply (₱50)</span>
              </button>
            )}
          </div>

        </div>

        {/* Zone 2: Right 5-Cols (Circular Match Gauge & Fit Reasons in Dark Slate-900 Panel) */}
        <div className="md:col-span-5 bg-slate-900 text-white rounded-2xl p-4 sm:p-5 flex flex-col justify-between space-y-3.5 shadow-md border border-slate-800 text-left">
          
          {/* Top: Circular Gauge */}
          <div className="text-center pt-1">
            <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-800"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-emerald-400 transition-all duration-700"
                  strokeDasharray={`${score}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl font-black text-white tracking-tight">{score}%</span>
              </div>
            </div>
            <p className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400 mt-1">
              {matchLabel}
            </p>
            <p className="text-[10px] text-slate-400 font-medium">Smart Match Score</p>
          </div>

          {/* 3 Checkmark Reasons */}
          <div className="space-y-2 py-1 border-t border-slate-800/80">
            {fitReasons.map((reason, idx) => (
              <div key={idx} className="flex items-start gap-1.5 text-[11px] leading-snug">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-slate-200">{reason}</span>
              </div>
            ))}
          </div>

          {/* Bottom Zero Middleman Pill */}
          <div className="pt-2 border-t border-slate-800/80 flex items-center gap-1.5 text-[10px] text-slate-400 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Zero Middleman: Reply lands in your personal email</span>
          </div>

        </div>

      </div>

      {/* Optional custom footer (e.g. switcher in hero) */}
      {footerChildren}

      {/* Card Micro-Footnote: Zero Middleman / Recruiter Portal */}
      {!footerChildren && (
        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600">
          <span className="flex items-center gap-1 text-slate-700 font-medium truncate">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span className="truncate">Dispatched directly to {job.company}'s official recruiter portal</span>
          </span>
          <span className="text-[10px] font-bold text-slate-600 shrink-0">
            Receipt: {job.portalBadge || 'DIRECT ATS'}
          </span>
        </div>
      )}

    </div>
  );
}
