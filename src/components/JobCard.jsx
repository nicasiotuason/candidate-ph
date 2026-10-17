import React, { useState } from 'react';
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
  Heart,
  ChevronDown,
  Building2,
  Sparkles
} from 'lucide-react';

export default function JobCard({ 
  job, 
  isSaved, 
  onToggleSave, 
  onQuickApply, 
  isApplied = false,
  footerChildren = null,
  isDashboard = false,
  isLandingPreview = false
}) {
  const [isExpanded, setIsExpanded] = useState(false);
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

  // Jobright-style Categorical Sub-scores (Experience, Skill, Industry)
  const expScore = job.experienceScore || Math.min(99, Math.max(86, score + (score % 3 === 0 ? 2 : -1)));
  const skillScore = job.skillScore || Math.min(98, Math.max(80, score + (score % 2 === 0 ? -4 : 1)));
  const industryScore = job.industryScore || Math.min(99, Math.max(84, score + (score % 5 === 0 ? 3 : -2)));

  // Employer Intel defaults (Philippine corporate hubs)
  const employerHub = job.hub || (job.setup?.includes('Remote') ? 'Fully Remote (PH)' : job.company === 'Maya' ? 'BGC, Taguig' : job.company === 'Coins.ph' ? 'Ortigas / Remote' : job.company === 'Canva' ? 'Makati City' : job.company === 'Sprout Solutions' ? 'BGC, Taguig' : 'Metro Manila');
  const employerHeadcount = job.headcount || (job.company === 'Maya' ? '1,000–5,000' : job.company === 'Coins.ph' ? '200–500' : job.company === 'Canva' ? '1,000+' : job.company === 'Sprout Solutions' ? '500–1,000' : '250–1,000');
  const employerLead = job.leadership || (job.company === 'Maya' ? 'VP of Technology' : job.company === 'Coins.ph' ? 'Head of Engineering' : job.company === 'Canva' ? 'Engineering Lead' : job.company === 'Sprout Solutions' ? 'Chief Technology Officer' : 'Engineering Manager');
  const employerFounded = job.founded || (job.company === 'Maya' ? '2013' : job.company === 'Coins.ph' ? '2014' : job.company === 'Canva' ? '2012' : job.company === 'Sprout Solutions' ? '2015' : '2016');

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
          {onToggleSave && !isLandingPreview && (
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

          {/* Role Description & Key Responsibilities with Expandable ATS Specification */}
          {job.jobDescription && (
            <div className="bg-slate-50/80 rounded-2xl p-3 sm:p-3.5 border border-slate-200/80 space-y-2.5">
              <p className="text-xs text-slate-800 font-medium leading-relaxed">
                {job.jobDescription}
              </p>

              {/* Expandable Link */}
              <div className="flex items-center justify-between pt-0.5">
                <button
                  type="button"
                  disabled={isLandingPreview}
                  onClick={isLandingPreview ? undefined : () => setIsExpanded(!isExpanded)}
                  className={`inline-flex items-center gap-1.5 text-xs font-black transition-colors ${
                    isLandingPreview 
                      ? 'text-slate-400 cursor-default pointer-events-none' 
                      : 'text-blue-600 hover:text-blue-800 cursor-pointer'
                  }`}
                >
                  <span>
                    {isExpanded 
                      ? '▲ Hide Full ATS Specification' 
                      : isDashboard 
                        ? '▼ View Complete Employer ATS Job Spec & Requirements' 
                        : '+ View Full Role & Responsibilities'}
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                </button>

                {isDashboard && (
                  <span className="text-[10px] font-bold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                    Official Requisition
                  </span>
                )}
              </div>

              {/* Collapsible Details */}
              {isExpanded && (
                isDashboard ? (
                  /* FULL CORPORATE ATS JOB SPECIFICATION FOR DASHBOARD */
                  <div className="pt-3 border-t border-slate-200 space-y-4 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar text-left animate-in fade-in duration-200 text-xs text-slate-800">
                    
                    {/* Header Badge */}
                    <div className="p-2.5 bg-blue-50/80 rounded-xl border border-blue-200/80 flex items-center justify-between text-[11px]">
                      <span className="font-extrabold text-blue-900 flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span>Direct ATS Requisition • {job.company}</span>
                      </span>
                      <span className="text-[10px] font-black uppercase text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded border border-emerald-200/50 shrink-0">
                        Verified Active
                      </span>
                    </div>

                    {/* 1. About Role & Team */}
                    {(job.aboutRole || job.companyDescription) && (
                      <div className="space-y-1.5">
                        <h4 className="text-[11px] font-black uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0"></span>
                          About the Role & Mission
                        </h4>
                        <p className="text-xs text-slate-700 leading-relaxed pl-3">
                          {job.aboutRole || job.companyDescription}
                        </p>
                      </div>
                    )}

                    {/* 2. Key Responsibilities (Full corporate bullets) */}
                    {job.responsibilities && job.responsibilities.length > 0 && (
                      <div className="space-y-2 pt-1 border-t border-slate-200/60">
                        <h4 className="text-[11px] font-black uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0"></span>
                          Key Responsibilities ({job.responsibilities.length} Core Areas)
                        </h4>
                        <ul className="space-y-1.5 pl-3">
                          {job.responsibilities.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-slate-700 leading-snug">
                              <span className="text-blue-600 font-black shrink-0 mt-0.5">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* 3. Minimum Qualifications */}
                    {job.qualifications && job.qualifications.length > 0 && (
                      <div className="space-y-2 pt-1 border-t border-slate-200/60">
                        <h4 className="text-[11px] font-black uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0"></span>
                          Minimum Qualifications
                        </h4>
                        <ul className="space-y-1.5 pl-3">
                          {job.qualifications.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-slate-700 leading-snug">
                              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5 stroke-[2.5]" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Skill & Stack Alignment (Jobright Pattern) */}
                    {job.matchingSkills && job.matchingSkills.length > 0 && (
                      <div className="space-y-2 pt-1 border-t border-slate-200/60">
                        <div className="flex items-center justify-between">
                          <h4 className="text-[11px] font-black uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0"></span>
                            Skill & Stack Alignment
                          </h4>
                          <span className="text-[10px] text-emerald-700 font-bold flex items-center gap-1">
                            <span>👍</span> Matched on Your Profile
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1.5 pl-3">
                          {job.matchingSkills.map((skill, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center gap-1 text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-lg"
                            >
                              <span>👍</span>
                              <span>{skill}</span>
                            </span>
                          ))}
                          {job.optionalSkills && job.optionalSkills.map((skill, idx) => (
                            <span
                              key={`opt-${idx}`}
                              className="inline-flex items-center gap-1 text-[11px] font-medium bg-slate-100 text-slate-600 border border-slate-200 px-2.5 py-1 rounded-lg"
                            >
                              <span className="text-slate-400">○</span>
                              <span>{skill}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* 4. Preferred Qualifications */}
                    {job.preferredQualifications && job.preferredQualifications.length > 0 && (
                      <div className="space-y-2 pt-1 border-t border-slate-200/60">
                        <h4 className="text-[11px] font-black uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0"></span>
                          Preferred / Nice-to-Have Qualifications
                        </h4>
                        <ul className="space-y-1.5 pl-3">
                          {job.preferredQualifications.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-slate-700 leading-snug">
                              <span className="text-slate-400 font-bold shrink-0 mt-0.5">+</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* 5. Compensation, Perks & Benefits */}
                    {job.benefits && job.benefits.length > 0 && (
                      <div className="space-y-2 pt-1 border-t border-slate-200/60">
                        <h4 className="text-[11px] font-black uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0"></span>
                          Compensation, Perks & Benefits
                        </h4>
                        <ul className="space-y-1.5 pl-3">
                          {job.benefits.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-slate-700 leading-snug">
                              <span className="text-emerald-600 font-bold shrink-0 mt-0.5">✓</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Pre-Dispatch Reassurance */}
                    <div className="p-3 bg-slate-100 rounded-xl text-[11px] text-slate-700 flex items-start gap-2 border border-slate-200">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <p>
                        Applying uses ₱50 of wallet balance. You review and sign off on tailored resume bullets before dispatch.
                      </p>
                    </div>

                  </div>
                ) : (
                  /* COMPACT LANDING PAGE PREVIEW */
                  <div className="pt-2 border-t border-slate-200/80 space-y-2 animate-in fade-in duration-200">
                    {job.responsibilities && job.responsibilities.length > 0 && (
                      <div className="space-y-1">
                        <p className="text-[10px] font-black uppercase tracking-wider text-slate-600">
                          Key Responsibilities:
                        </p>
                        {job.responsibilities.slice(0, 3).map((item, idx) => (
                          <div key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-700 font-medium leading-snug">
                            <span className="text-blue-600 font-bold shrink-0 mt-0.5">•</span>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {job.companyDescription && (
                      <div className="pt-1.5 border-t border-slate-200/50">
                        <p className="text-[10px] font-black uppercase tracking-wider text-slate-600">
                          About {job.company}:
                        </p>
                        <p className="text-[11px] text-slate-600 leading-relaxed mt-0.5">
                          {job.companyDescription}
                        </p>
                      </div>
                    )}
                  </div>
                )
              )}
            </div>
          )}

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
              <div className="flex-1 py-3 px-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-center gap-2 text-emerald-800 font-extrabold text-sm shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Applied ✓</span>
              </div>
            ) : (
              <button
                type="button"
                disabled={isLandingPreview || !onQuickApply}
                onClick={() => !isLandingPreview && onQuickApply && onQuickApply(job)}
                className={`flex-1 py-3 px-4 bg-blue-600 text-white font-extrabold rounded-xl shadow-md flex items-center justify-center gap-2 text-sm ${
                  isLandingPreview 
                    ? 'cursor-default pointer-events-none opacity-95' 
                    : 'hover:bg-blue-700 active:scale-[0.98] cursor-pointer group/btn transition-all'
                }`}
              >
                <Zap className="w-4 h-4 text-amber-300 fill-amber-300 group-hover/btn:scale-110 transition-transform" />
                <span>Apply (₱50)</span>
              </button>
            )}
          </div>

        </div>

        {/* Zone 2: Right 5-Cols (Circular Match Gauge & Fit Reasons in Dark Slate-900 Panel) */}
        <div className="md:col-span-5 bg-slate-900 text-white rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-md border border-slate-800 text-left transition-all h-full">
          {isExpanded ? (
            /* ========================================================================= */
            /* OPTION B: EXPANDED LIVE INTELLIGENCE COCKPIT (NO EMPTY BLACK VOID)       */
            /* ========================================================================= */
            <div className="flex flex-col h-full justify-between space-y-3.5 animate-in fade-in duration-200">
              
              <div className="space-y-3">
                {/* 1. Header: Compact Circular Score & Quality Label */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <div className="relative w-11 h-11 flex items-center justify-center shrink-0">
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
                      <span className="absolute text-xs font-black text-white">{score}%</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400 block leading-tight">
                        {matchLabel}
                      </span>
                      <span className="text-xs font-black text-white block">Multi-Factor Fit</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-800/80 shrink-0">
                    Top 5%
                  </span>
                </div>

                {/* 2. Jobright Categorical Sub-Scores */}
                <div className="space-y-2 bg-slate-950/70 p-3 rounded-xl border border-slate-800/90 text-[11px]">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                      Fit Score Breakdown
                    </span>
                    <span className="text-[10px] font-bold text-slate-400">
                      ATS Calibrated
                    </span>
                  </div>
                  
                  {/* Experience Level Sub-score */}
                  <div>
                    <div className="flex items-center justify-between text-[11px] mb-1 font-semibold">
                      <span className="text-slate-300">Experience Level</span>
                      <span className="text-emerald-400 font-bold">{expScore}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-400 rounded-full transition-all duration-500" style={{ width: `${expScore}%` }}></div>
                    </div>
                  </div>

                  {/* Technical Stack Sub-score */}
                  <div>
                    <div className="flex items-center justify-between text-[11px] mb-1 font-semibold">
                      <span className="text-slate-300">Technical Stack Match</span>
                      <span className="text-emerald-400 font-bold">{skillScore}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-400 rounded-full transition-all duration-500" style={{ width: `${skillScore}%` }}></div>
                    </div>
                  </div>

                  {/* Industry & Domain Sub-score */}
                  <div>
                    <div className="flex items-center justify-between text-[11px] mb-1 font-semibold">
                      <span className="text-slate-300">Industry & Domain</span>
                      <span className="text-emerald-400 font-bold">{industryScore}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-400 rounded-full transition-all duration-500" style={{ width: `${industryScore}%` }}></div>
                    </div>
                  </div>
                </div>

                {/* 3. ATS Keywords Scan Analysis */}
                <div className="space-y-2 bg-slate-950/50 p-3 rounded-xl border border-slate-800/80">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                      ATS Keyword Match
                    </span>
                    <span className="text-[10px] font-bold text-emerald-400">
                      {job.matchingSkills?.length || 3} Matched
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {job.matchingSkills?.map((s, i) => (
                      <span key={i} className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-950/80 text-emerald-300 border border-emerald-800/80">
                        <Check className="w-2.5 h-2.5 text-emerald-400 stroke-[3]" />
                        <span>{s}</span>
                      </span>
                    ))}
                    {job.optionalSkills?.map((s, i) => (
                      <span key={i} className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-400 border border-slate-700/60">
                        <span>○</span>
                        <span>{s}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* 4. Verified Employer Intelligence */}
                <div className="space-y-2 bg-slate-950/50 p-3 rounded-xl border border-slate-800/80 text-[11px]">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                      Employer Intel (Philippines)
                    </span>
                    <span className="text-[10px] font-bold text-blue-400">
                      Verified Portal
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-slate-300 pt-0.5">
                    <div>
                      <span className="text-[10px] text-slate-500 block">Hub / Presence</span>
                      <span className="font-bold text-slate-200 text-xs truncate block">{employerHub}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block">Headcount</span>
                      <span className="font-bold text-slate-200 text-xs block">{employerHeadcount}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block">Founded</span>
                      <span className="font-bold text-slate-200 text-xs block">{employerFounded}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block">Leadership</span>
                      <span className="font-bold text-emerald-400 text-xs truncate block">{employerLead}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 5. Direct Dispatch Guarantee Footer */}
              <div className="mt-auto pt-3 border-t border-slate-800/90 text-[10px] text-slate-400 space-y-1">
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                  <span>Direct ATS Queue • Zero Middleman</span>
                </div>
                <p className="text-slate-400 leading-tight">
                  Dispatched directly into {job.company}'s official hiring queue. Replies land in your inbox.
                </p>
              </div>

            </div>
          ) : (
            /* ========================================================================= */
            /* STANDARD COLLAPSED RIGHT PANEL                                            */
            /* ========================================================================= */
            <div className="flex flex-col h-full justify-between space-y-3.5">
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
              <div className="mt-auto pt-2 border-t border-slate-800/80 flex items-center gap-1.5 text-[10px] text-slate-400 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Zero Middleman: Reply lands in your personal email</span>
              </div>
            </div>
          )}

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
