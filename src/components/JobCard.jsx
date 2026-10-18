import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Check, 
  Zap, 
  Star, 
  Clock, 
  Briefcase, 
  ShieldCheck, 
  TrendingUp, 
  MapPin,
  ChevronDown,
  Building2,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function JobCard({ 
  job, 
  isSaved, 
  onToggleSave, 
  onQuickApply, 
  isApplied = false,
  appliedDate = null,
  footerChildren = null,
  isDashboard = false,
  isLandingPreview = false
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  if (!job) return null;

  // Calculate score and matching labels
  const score = job.matchPercentage || job.matchScore || 95;
  const matchLabel = job.matchLabel || (score >= 95 ? 'EXCEPTIONAL MATCH' : score >= 85 ? 'STRONG MATCH' : 'HIGH MATCH');

  const logoText = job.logoText || job.logo || job.company?.charAt(0) || 'C';
  const logoColor = job.logoColor || 'bg-blue-600 text-white';
  const postedInfo = job.postedHeader || (job.postedAgo ? `Early Applicant • ${job.postedAgo}` : 'Early Bird Review Batch');
  const appliedDateDisplay = appliedDate || job.appliedDate || 'Sent Oct 18';

  return (
    <div className={`relative rounded-3xl p-5 sm:p-6 transition-all text-left flex flex-col justify-between group ${
      isApplied 
        ? 'bg-slate-100/75 border border-slate-200/90 shadow-none opacity-90 hover:opacity-100' 
        : 'bg-white border border-slate-200 shadow-sm hover:border-blue-400 hover:shadow-md'
    }`}>
      
      {/* 1. Header: Company Info, Match Score & Bookmark */}
      <div className="flex items-start justify-between gap-3 pb-3.5 border-b border-slate-100">
        <div className="flex items-start gap-3 min-w-0">
          <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl ${logoColor} font-black text-lg sm:text-xl flex items-center justify-center shadow-xs shrink-0 ${isApplied ? 'opacity-85' : ''}`}>
            {logoText}
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-700 font-semibold">
              <span className="font-bold text-slate-900">{job.company}</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 fill-blue-600 shrink-0" />
              <span className="text-slate-500">• {job.industry}</span>
            </div>
            <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-slate-600">
              <span className="inline-flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-500" />
                <span>{job.location || 'Metro Manila'}</span>
              </span>
              <span className="text-slate-300">•</span>
              <span className="font-medium">{job.setup || 'Hybrid / Remote'}</span>
            </div>
          </div>
        </div>

        {/* Right Header Status: Match Score Pill & Save Star */}
        <div className="flex items-center gap-2 shrink-0">
          {isApplied && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 font-extrabold text-xs">
              <Check className="w-3.5 h-3.5 text-emerald-700 stroke-[3]" />
              <span>Applied • {appliedDateDisplay}</span>
            </span>
          )}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 font-extrabold text-xs shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>{score}% Match</span>
          </div>

          {onToggleSave && !isLandingPreview && (
            <button
              type="button"
              onClick={() => onToggleSave(job.id)}
              className={`p-1.5 min-w-[32px] min-h-[32px] flex items-center justify-center rounded-xl border transition-all cursor-pointer ${
                isSaved 
                  ? 'bg-amber-50 border-amber-200 text-amber-500' 
                  : 'bg-white border-slate-200 text-slate-400 hover:text-amber-500 hover:bg-amber-50/50'
              }`}
              title={isSaved ? "Saved in Bookmarks" : "Star to Bookmark Job"}
              aria-label="Bookmark job"
            >
              <Star className={`w-3.5 h-3.5 ${isSaved ? 'fill-amber-500 text-amber-500' : ''}`} />
            </button>
          )}
        </div>
      </div>

      {/* 2. Main Title, Salary & Key Matching Skills */}
      <div className="py-4 space-y-3 flex-1">
        <div>
          <span className="text-[11px] font-bold text-amber-700 block mb-1">
            ⚡ {postedInfo}
          </span>
          <h3 className="font-black text-slate-900 text-base sm:text-xl leading-snug">
            {job.title}
          </h3>
        </div>

        {/* High-Contrast Salary Pill */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="p-2 sm:p-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-900 font-extrabold text-xs sm:text-sm inline-flex items-center gap-1.5">
            <span>💰</span>
            <span>{job.salary}</span>
          </div>
          
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 text-xs font-medium">
            <Briefcase className="w-3.5 h-3.5 text-slate-500" />
            <span>{job.type || 'Full-Time'}</span>
          </span>

          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 text-xs font-medium">
            <TrendingUp className="w-3.5 h-3.5 text-slate-500" />
            <span>{job.level || 'Mid-Senior'}</span>
          </span>
        </div>

        {/* Matching Skills Badges */}
        {job.matchingSkills && job.matchingSkills.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-xs font-bold text-slate-600 mr-1">Stack:</span>
            {job.matchingSkills.slice(0, 4).map((skill, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200/80 px-2 py-0.5 rounded-md"
              >
                <Check className="w-3 h-3 text-emerald-600 stroke-[2.5]" />
                <span>{skill}</span>
              </span>
            ))}
          </div>
        )}

        {/* Short Role Summary & Expand Button */}
        {job.jobDescription && (
          <div className="pt-1 space-y-2">
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
              {job.jobDescription}
            </p>

            <button
              type="button"
              disabled={isLandingPreview}
              onClick={isLandingPreview ? undefined : () => setIsExpanded(!isExpanded)}
              className={`inline-flex items-center gap-1.5 text-xs font-extrabold text-blue-600 hover:text-blue-800 transition-colors ${
                isLandingPreview ? 'cursor-default pointer-events-none' : 'cursor-pointer'
              }`}
            >
              <span>{isExpanded ? '▲ Hide Full Job Requirements' : '▼ View Full Role & ATS Requirements'}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
            </button>
          </div>
        )}

        {/* Collapsible Requirements Spec (Light, Clean, Non-blocking) */}
        {isExpanded && (
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3.5 text-xs text-slate-800 animate-in fade-in duration-200">
            {job.responsibilities && job.responsibilities.length > 0 && (
              <div>
                <h4 className="font-bold text-slate-900 mb-1.5 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                  Key Responsibilities:
                </h4>
                <ul className="space-y-1 pl-3 text-slate-700">
                  {job.responsibilities.map((resp, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {job.qualifications && job.qualifications.length > 0 && (
              <div className="pt-2 border-t border-slate-200">
                <h4 className="font-bold text-slate-900 mb-1.5 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                  Minimum Qualifications:
                </h4>
                <ul className="space-y-1 pl-3 text-slate-700">
                  {job.qualifications.map((qual, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{qual}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 3. Action Section: Distinct Applied State vs Single Blue CTA */}
      <div className="pt-3 border-t border-slate-100 space-y-2">
        {isApplied ? (
          <div className="p-3 bg-emerald-50/90 border border-emerald-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2 text-emerald-950 font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>✓ Application sent to {job.company}</span>
            </div>
            <span className="text-[11px] text-emerald-800 font-semibold">
              Replies come straight to your inbox
            </span>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span className="text-xs text-slate-600 font-medium flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Tailored resume + cover letter included</span>
            </span>

            <button
              type="button"
              disabled={isLandingPreview || !onQuickApply}
              onClick={() => !isLandingPreview && onQuickApply && onQuickApply(job)}
              className={`w-full sm:w-auto px-6 py-2.5 bg-blue-600 text-white font-extrabold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 ${
                isLandingPreview 
                  ? 'cursor-default pointer-events-none opacity-95' 
                  : 'hover:bg-blue-700 active:scale-95 cursor-pointer'
              }`}
            >
              <span>Apply (₱50)</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </div>
        )}
      </div>

      {/* Custom footer (used by landing page preview switcher) */}
      {footerChildren}

    </div>
  );
}
