import React, { useState } from 'react';
import { 
  X, 
  Check, 
  Edit3, 
  Send, 
  FileText, 
  Mail, 
  ShieldCheck, 
  Wallet, 
  AlertCircle, 
  CheckCircle2, 
  Eye, 
  Sparkles,
  ArrowRight,
  RotateCcw,
  Layers,
  HelpCircle
} from 'lucide-react';

export default function ReviewSignOffModal({ 
  job, 
  user, 
  isOpen, 
  onClose, 
  onConfirmApply,
  onOpenTopUp 
}) {
  if (!isOpen || !job) return null;

  // Resume version selection: 'tailored' | 'master'
  const [resumeChoice, setResumeChoice] = useState('tailored');

  // Editable fields for tweaking
  const [headline, setHeadline] = useState(user?.headline || `${job.title} Specialist`);
  const [summary, setSummary] = useState(
    user?.summary || 
    `Results-driven engineer specializing in high-performance web applications, passionate about accelerating fintech products at ${job.company}. Direct hands-on expertise in ${job.matchingSkills?.join(', ')}.`
  );

  // Pre-drafted 2-sentence answers for recruiter screening questions (Layer 4)
  const [answer1, setAnswer1] = useState(
    `I have built production-grade systems in the ${job.industry} sector for over ${user?.experienceYears || 6} years, and ${job.company}'s market impact directly matches my technical focus.`
  );
  const [answer2, setAnswer2] = useState(
    `My primary stack includes ${job.matchingSkills?.slice(0, 3).join(', ')}, allowing me to immediately contribute to your sprint velocity from day one.`
  );

  const [hasSignedOff, setHasSignedOff] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const canAfford = (user?.walletBalance ?? 0) >= 50;

  const handleSubmit = async () => {
    if (!canAfford) {
      onOpenTopUp();
      return;
    }
    if (!hasSignedOff) return;

    setIsSubmitting(true);
    await onConfirmApply(job, {
      resumeChoice,
      headline,
      summary,
      screeningAnswers: [
        { question: `Why are you interested in joining ${job.company}?`, answer: answer1 },
        { question: `Describe your hands-on experience with ${job.matchingSkills?.[0] || 'the core stack'}.`, answer: answer2 }
      ]
    });
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-2xl my-8 overflow-hidden transition-all animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Top Bar */}
        <div className="bg-slate-900 text-white p-5 sm:p-6 flex items-center justify-between relative">
          <div className="flex items-center gap-3">
            <div className={`w-11 h-11 rounded-2xl ${job.logoColor} text-white font-black text-lg flex items-center justify-center shadow-md shrink-0`}>
              {job.logoText}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black text-amber-400 uppercase tracking-wider">
                  Final Review & Sign-Off
                </span>
                <span className="text-[10px] text-slate-400">• {job.portal} Portal</span>
              </div>
              <h2 className="text-base sm:text-lg font-black text-white">
                {job.title} @ {job.company}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
            title="Cancel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-7 max-h-[72vh] overflow-y-auto space-y-5">

          {/* Wallet & Pricing Notice Banner */}
          <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                <Wallet className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">
                  Application Fee: <span className="text-blue-700 font-extrabold">₱50.00</span> (debited upon recruiter receipt)
                </p>
                <p className="text-[11px] text-slate-600">
                  Current Balance: ₱{user?.walletBalance ?? 250}.00 → Balance After: ₱{Math.max(0, (user?.walletBalance ?? 250) - 50)}.00
                </p>
              </div>
            </div>

            {!canAfford && (
              <button
                onClick={onOpenTopUp}
                className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-xs shrink-0"
              >
                Buy Credits
              </button>
            )}
          </div>

          {/* Employer Direct Reply Guarantee */}
          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-2.5 text-xs text-emerald-950">
            <Mail className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block text-emerald-900">Zero Middleman Guarantee:</span>
              <span>
                {job.company}'s recruitment team will receive this dispatch in their {job.portal} queue and will contact you directly at <strong className="underline">{user?.email}</strong>.
              </span>
            </div>
          </div>

          {/* 1. RESUME VERSION SELECTION */}
          <div>
            <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-2">
              1. Select Resume Version to Send:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              
              {/* Option A: Tailored Resume */}
              <button
                type="button"
                onClick={() => setResumeChoice('tailored')}
                className={`p-3.5 rounded-2xl border text-left transition-all relative ${
                  resumeChoice === 'tailored'
                    ? 'border-blue-600 bg-blue-50/70 shadow-xs ring-2 ring-blue-500/20'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-black text-slate-900">
                    Tailored Resume (ATS Optimized)
                  </span>
                  <span className="text-[9px] font-black bg-blue-600 text-white px-2 py-0.5 rounded-full uppercase">
                    Recommended
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Emphasizes {job.matchingSkills?.slice(0, 3).join(', ')} directly to maximize keyword pass-through on {job.portal}.
                </p>
              </button>

              {/* Option B: Original Master Resume */}
              <button
                type="button"
                onClick={() => setResumeChoice('master')}
                className={`p-3.5 rounded-2xl border text-left transition-all ${
                  resumeChoice === 'master'
                    ? 'border-blue-600 bg-blue-50/70 shadow-xs ring-2 ring-blue-500/20'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-black text-slate-900">
                    Original Master Resume
                  </span>
                  <span className="text-[9px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                    Unmodified
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Dispatches your baseline master resume PDF without role-specific keyword re-ordering.
                </p>
              </button>

            </div>
          </div>

          {/* 2. ROLE HEADLINE & SUMMARY TWEAK */}
          <div className="space-y-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                2. Application Headline & Summary:
              </label>
              <span className="text-[10px] text-slate-400">Editable before sign-off</span>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">
                Candidate Headline:
              </label>
              <input
                type="text"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white font-medium"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">
                Targeted Executive Summary:
              </label>
              <textarea
                rows={2}
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                className="w-full p-3 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white font-medium"
              />
            </div>
          </div>

          {/* 3. CONTEXTUAL SCREENING QUESTION PREVIEWS (LAYER 4) */}
          <div className="space-y-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                3. Recruiter Screening Answers (Pre-Drafted):
              </label>
              <span className="text-[10px] text-emerald-700 font-bold">2-Sentence Precision</span>
            </div>

            <div className="space-y-2.5">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                  <HelpCircle className="w-3 h-3 text-blue-600" />
                  <span>"Why are you interested in joining {job.company}?"</span>
                </label>
                <textarea
                  rows={2}
                  value={answer1}
                  onChange={(e) => setAnswer1(e.target.value)}
                  className="w-full p-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white font-medium"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                  <HelpCircle className="w-3 h-3 text-blue-600" />
                  <span>"Describe your hands-on experience with {job.matchingSkills?.[0] || 'the core stack'}."</span>
                </label>
                <textarea
                  rows={2}
                  value={answer2}
                  onChange={(e) => setAnswer2(e.target.value)}
                  className="w-full p-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white font-medium"
                />
              </div>
            </div>
          </div>

          {/* 4. SIGN-OFF AUTHORIZATION CHECKBOX */}
          <div className="p-3.5 rounded-2xl bg-white border border-slate-200 flex items-start gap-3">
            <input
              type="checkbox"
              id="signoff-check"
              checked={hasSignedOff}
              onChange={(e) => setHasSignedOff(e.target.checked)}
              className="mt-1 w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300 cursor-pointer"
            />
            <label htmlFor="signoff-check" className="text-xs text-slate-700 font-medium cursor-pointer">
              I authorize CANDIDATE.ph to dispatch my application directly to <strong>{job.company}</strong>'s official career portal and debit ₱50 from my wallet upon verified employer receipt.
            </label>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-5 sm:p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-600 hover:bg-slate-100"
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={!hasSignedOff || !canAfford || isSubmitting}
            onClick={handleSubmit}
            className={`w-full sm:w-auto px-7 py-3.5 text-white font-extrabold rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-lg ${
              !hasSignedOff || !canAfford || isSubmitting
                ? 'bg-slate-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 active:scale-95 cursor-pointer'
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Dispatching to {job.portal}...</span>
              </div>
            ) : (
              <>
                <Send className="w-4 h-4 text-amber-300" />
                <span>Approve & Send (₱50)</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
