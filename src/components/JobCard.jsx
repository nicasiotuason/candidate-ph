import React from 'react';
import { 
  CheckCircle2, 
  Check, 
  AlertCircle, 
  Zap, 
  Star, 
  Clock, 
  Users, 
  Building2, 
  Briefcase, 
  ShieldCheck, 
  ArrowRight,
  TrendingUp,
  Mail,
  Receipt
} from 'lucide-react';

export default function JobCard({ 
  job, 
  isSaved, 
  onToggleSave, 
  onQuickApply, 
  isApplied = false 
}) {
  // Score-based coloring
  const score = job.matchPercentage;
  const strokeColor = score >= 90 ? '#059669' : score >= 75 ? '#2563EB' : '#D97706';
  const strokeBg = score >= 90 ? '#D1FAE5' : score >= 75 ? '#DBEAFE' : '#FEF3C7';
  const badgeTextColor = score >= 90 ? 'text-emerald-700' : score >= 75 ? 'text-blue-700' : 'text-amber-700';
  const badgeBgColor = score >= 90 ? 'bg-emerald-50 border-emerald-200' : score >= 75 ? 'bg-blue-50 border-blue-200' : 'bg-amber-50 border-amber-200';
  const matchLabel = score >= 90 ? 'Strong Match' : score >= 75 ? 'High Match' : 'Good Match';

  // SVG Gauge calculations
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-elevated border border-slate-200 hover:border-blue-400 transition-all group flex flex-col justify-between">
      
      {/* TWO-ZONE LAYOUT */}
      <div className="flex flex-col lg:flex-row gap-5">
        
        {/* LEFT ZONE: 75% Details */}
        <div className="flex-1 min-w-0 space-y-3.5">
          
          {/* Scraped Info Header + Live Indicator + Star */}
          <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              <span className="text-[11px] font-bold text-amber-900 truncate">
                {job.postedHeader}
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="inline-flex items-center gap-1 text-[10px] font-black text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-100">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-ping"></span>
                <span>• LIVE</span>
              </span>

              {/* Bookmark Star Button */}
              <button
                type="button"
                onClick={() => onToggleSave(job.id)}
                className={`p-1.5 rounded-xl border transition-all ${
                  isSaved 
                    ? 'bg-amber-50 border-amber-200 text-amber-500' 
                    : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-amber-500 hover:bg-amber-50/50'
                }`}
                title={isSaved ? "Saved in Bookmarks" : "Star to Bookmark Job"}
              >
                <Star className={`w-3.5 h-3.5 ${isSaved ? 'fill-amber-500 text-amber-500' : ''}`} />
              </button>
            </div>
          </div>

          {/* Company Brand & Role Title */}
          <div className="flex items-start gap-3">
            <div className={`w-11 h-11 rounded-2xl ${job.logoColor} text-white font-black text-lg flex items-center justify-center shadow-xs shrink-0`}>
              {job.logoText}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                <span className="font-extrabold text-slate-900">{job.company}</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span className="text-slate-400">• {job.industry}</span>
                <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded border border-slate-200">
                  {job.portal}
                </span>
              </div>
              <h3 className="font-black text-slate-900 text-base sm:text-lg leading-snug mt-0.5 truncate">
                {job.title}
              </h3>
            </div>
          </div>

          {/* Description */}
          <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
            {job.companyDescription}
          </p>

          {/* Metadata Grid: Salary (Option A) & Work Setup */}
          <div className="grid grid-cols-2 gap-2 text-left">
            <div className="p-2.5 rounded-xl bg-slate-50/80 border border-slate-100">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">SALARY</p>
              <p className="text-xs sm:text-sm font-extrabold text-slate-900 mt-0.5 truncate">
                {job.salary}
              </p>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-50/80 border border-slate-100">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">WORK SETUP</p>
              <p className="text-xs sm:text-sm font-extrabold text-slate-900 mt-0.5 truncate">
                {job.setup}
              </p>
            </div>
          </div>

          {/* Matching Skills Breakdown */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[11px] text-slate-500">
              <span className="font-bold text-slate-700">Matched Skills ({job.coreCount}):</span>
              <span className="text-emerald-700 font-bold">14-day freshness window</span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {job.matchingSkills.map((skill, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-lg"
                >
                  <Check className="w-3 h-3 text-emerald-600 stroke-[3]" />
                  <span>{skill}</span>
                </span>
              ))}
              {job.optionalSkills?.slice(0, 1).map((skill, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold bg-slate-50 text-slate-500 border border-slate-200 px-2 py-0.5 rounded-lg"
                >
                  <span>Optional: {skill}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Referral Network Hint */}
          {job.referralHeadline && (
            <div className="p-2 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Users className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span className="font-bold text-slate-800 truncate">{job.referralHeadline}</span>
              </div>
              <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded shrink-0">
                Insider
              </span>
            </div>
          )}

        </div>

        {/* RIGHT ZONE: 25% Circular Gauge & Primary CTA */}
        <div className="lg:w-48 shrink-0 flex flex-col justify-between items-center p-4 rounded-2xl bg-slate-50/70 border border-slate-100 text-center">
          
          {/* Circular SVG Gauge */}
          <div className="flex flex-col items-center">
            <div className="relative w-20 h-20 flex items-center justify-center">
              <svg className="w-20 h-20 -rotate-90">
                <circle
                  cx="40"
                  cy="40"
                  r={radius}
                  stroke={strokeBg}
                  strokeWidth="6"
                  fill="transparent"
                />
                <circle
                  cx="40"
                  cy="40"
                  r={radius}
                  stroke={strokeColor}
                  strokeWidth="6"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-700"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-lg font-black text-slate-900 leading-none">
                  {score}%
                </span>
                <span className="text-[9px] font-bold text-slate-400 uppercase mt-0.5">
                  MATCH
                </span>
              </div>
            </div>

            <span className={`inline-block mt-2 text-[10px] font-black uppercase px-2 py-0.5 rounded-full border ${badgeBgColor} ${badgeTextColor}`}>
              {matchLabel}
            </span>
          </div>

          {/* 3 Key Checkmarks */}
          <div className="w-full my-3 space-y-1 text-left text-[11px] font-semibold text-slate-600">
            <div className="flex items-center gap-1.5 truncate">
              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 stroke-[3]" />
              <span className="truncate">Core Stack 4/4</span>
            </div>
            <div className="flex items-center gap-1.5 truncate">
              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 stroke-[3]" />
              <span className="truncate">Salary Floor Met</span>
            </div>
            <div className="flex items-center gap-1.5 truncate">
              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 stroke-[3]" />
              <span className="truncate">Work Setup Aligned</span>
            </div>
          </div>

          {/* CTA: Uniform "Apply (₱50)" Button */}
          <div className="w-full">
            {isApplied ? (
              <div className="w-full py-2.5 px-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-center gap-1.5 text-emerald-800 font-extrabold text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Applied ✓</span>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => onQuickApply(job)}
                className="w-full py-3 px-3 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-black text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 group/btn"
              >
                <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300 group-hover/btn:scale-110 transition-transform" />
                <span>Apply (₱50)</span>
              </button>
            )}

            <p className="text-[10px] text-slate-400 mt-1.5 text-center">
              Recruiter email reply • ₱0 if undelivered
            </p>
          </div>

        </div>

      </div>

      {/* Card Micro-Footnote: Zero Middleman */}
      <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
        <span className="flex items-center gap-1 text-slate-500 font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>Dispatched directly to {job.company}'s official recruiter portal</span>
        </span>
        <span className="text-[10px] font-bold text-slate-400">
          Receipt: {job.portalBadge}
        </span>
      </div>

    </div>
  );
}
