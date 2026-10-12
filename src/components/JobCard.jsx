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
  TrendingUp
} from 'lucide-react';

export default function JobCard({ 
  job, 
  isSaved, 
  onToggleSave, 
  onQuickApply, 
  isApplied = false 
}) {
  // Determine badge styling based on match %
  const matchColorClass = job.matchPercentage >= 90
    ? 'bg-emerald-600 text-white border-emerald-500'
    : job.matchPercentage >= 75
    ? 'bg-blue-600 text-white border-blue-500'
    : 'bg-amber-600 text-white border-amber-500';

  const matchLabel = job.matchPercentage >= 90
    ? 'Strong Match'
    : job.matchPercentage >= 75
    ? 'High Match'
    : 'Potential Match';

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-elevated border border-slate-200 hover:border-blue-300 transition-all flex flex-col justify-between group">
      
      {/* Top Header Row: Status, Scraped Info & Star Bookmark */}
      <div>
        <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
            <span className="text-xs font-bold text-amber-900">
              {job.postedHeader}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs font-black text-rose-600">
              <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping"></span>
              <span>• LIVE</span>
            </div>

            {/* Bookmark Star Button */}
            <button
              onClick={() => onToggleSave(job.id)}
              className={`p-1.5 rounded-xl border transition-all ${
                isSaved 
                  ? 'bg-amber-50 border-amber-200 text-amber-500 fill-amber-500' 
                  : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-amber-500 hover:bg-amber-50/50'
              }`}
              title={isSaved ? "Saved in Bookmarks" : "Star to Save Job"}
              aria-label="Star this job"
            >
              <Star className={`w-4 h-4 ${isSaved ? 'fill-amber-500 text-amber-500' : ''}`} />
            </button>
          </div>
        </div>

        {/* Company & Role Header */}
        <div className="pt-4 flex items-start gap-3.5">
          <div className={`w-12 h-12 rounded-2xl ${job.logoColor} text-white font-black text-xl flex items-center justify-center shadow-xs shrink-0`}>
            {job.logoText}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
              <span className="font-bold text-slate-900">{job.company}</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span className="text-slate-400">• {job.industry}</span>
            </div>
            <h3 className="font-black text-slate-900 text-lg sm:text-xl leading-snug mt-0.5 truncate">
              {job.title}
            </h3>
          </div>
        </div>

        {/* Company Description */}
        <p className="text-xs text-slate-500 font-normal leading-relaxed mt-2 line-clamp-2">
          {job.companyDescription}
        </p>

        {/* 3 Key Metadata Tiles: Salary, Setup, ATS Portal */}
        <div className="grid grid-cols-3 gap-2 pt-3 text-left">
          <div className="p-2.5 rounded-xl bg-slate-50/80 border border-slate-100">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">SALARY</p>
            <p className="text-xs sm:text-sm font-extrabold text-slate-900 mt-0.5 truncate">
              {job.salary}
            </p>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50/80 border border-slate-100">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">SETUP</p>
            <p className="text-xs sm:text-sm font-extrabold text-slate-900 mt-0.5 truncate">
              {job.setup}
            </p>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50/80 border border-slate-100">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">PORTAL</p>
            <p className="text-xs sm:text-sm font-extrabold text-slate-900 mt-0.5 truncate">
              {job.portal}
            </p>
            <span className="inline-block mt-0.5 text-[9px] px-1.5 py-0.2 rounded font-black uppercase tracking-wider border bg-orange-100 text-orange-800 border-orange-200">
              {job.portalBadge}
            </span>
          </div>
        </div>

        {/* Job Responsibilities Snippet */}
        <div className="mt-3 bg-slate-50/60 p-3 rounded-2xl border border-slate-100 text-xs text-slate-600 leading-relaxed">
          <span className="font-semibold text-slate-900 block mb-0.5">Role Summary:</span>
          {job.jobDescription}
        </div>

        {/* THE SAMPLE MATCHER BOX (Match % & Skills Breakdown) */}
        <div className="mt-3.5 p-3.5 rounded-2xl bg-white border border-amber-200/90 space-y-2.5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black border ${matchColorClass}`}>
              <Check className="w-3.5 h-3.5 stroke-[3]" />
              <span>{job.matchPercentage}% {matchLabel}</span>
            </span>
            <span className="text-xs text-slate-500 font-semibold">
              {job.coreCount}
            </span>
          </div>

          {/* Matched Skills Chips */}
          <div className="flex flex-wrap gap-1.5 pt-0.5">
            {job.matchingSkills.map((skill, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-lg"
              >
                <Check className="w-3 h-3 text-emerald-600 stroke-[3]" />
                <span>{skill}</span>
              </span>
            ))}
            {job.optionalSkills?.map((skill, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 text-[11px] font-semibold bg-slate-50 text-slate-600 border border-slate-200 px-2.5 py-1 rounded-lg"
              >
                <AlertCircle className="w-3 h-3 text-slate-400" />
                <span>Optional: {skill}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Referral Network Hint */}
        {job.referralHeadline && (
          <div className="mt-3 p-2.5 rounded-xl bg-slate-50/90 border border-slate-200/70 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <div className="flex -space-x-1.5 overflow-hidden">
                {job.avatars?.map((av, i) => (
                  <span
                    key={i}
                    className={`inline-flex items-center justify-center w-6 h-6 rounded-full ${av.bg} text-[9px] font-black border-2 border-white`}
                  >
                    {av.text}
                  </span>
                ))}
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 flex items-center gap-1">
                  <Users className="w-3 h-3 text-blue-600" />
                  <span>{job.referralHeadline}</span>
                </p>
                <p className="text-[10px] text-slate-500">{job.referralSubtext}</p>
              </div>
            </div>
            <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md font-bold">
              Insider
            </span>
          </div>
        )}
      </div>

      {/* Card Action Footer */}
      <div className="pt-4 mt-2">
        {isApplied ? (
          <div className="w-full py-3 px-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-center gap-2 text-emerald-700 font-bold text-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Applied • Sent to ATS</span>
          </div>
        ) : (
          <button
            onClick={() => onQuickApply(job)}
            className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-bold rounded-2xl shadow-md hover:shadow-lg transition-all flex flex-col items-center justify-center group/btn"
          >
            <div className="flex items-center gap-2 text-sm sm:text-base font-extrabold">
              <Zap className="w-4 h-4 text-amber-300 fill-amber-300 group-hover/btn:scale-110 transition-transform" />
              <span>Quick Apply</span>
              <span className="text-white/60">•</span>
              <span className="text-xs font-semibold text-blue-100">₱50 from Wallet</span>
            </div>
            <span className="text-[11px] font-medium text-white/80 mt-0.5">
              Review & Sign Off before sending
            </span>
          </button>
        )}

        <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2.5 px-1">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Employer replies directly to your email</span>
          </span>
          <span className="text-slate-400 font-medium">
            Receipt confirmed
          </span>
        </div>
      </div>

    </div>
  );
}
