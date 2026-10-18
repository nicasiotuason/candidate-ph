import React, { useState, useEffect } from 'react';
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
  HelpCircle,
  Copy,
  ChevronDown
} from 'lucide-react';
import { generateTailoredCoverLetter, COVER_LETTER_TONES } from '../utils/coverLetterGenerator';

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

  // Cover Letter states (100% included in ₱50)
  const [coverLetterTone, setCoverLetterTone] = useState('technical');
  const [coverLetterText, setCoverLetterText] = useState(() => 
    generateTailoredCoverLetter(job, user, 'technical').fullLetter
  );
  const [isCopiedCoverLetter, setIsCopiedCoverLetter] = useState(false);
  const [isEditingCoverLetter, setIsEditingCoverLetter] = useState(false);
  const [isCoverLetterOpen, setIsCoverLetterOpen] = useState(true);

  // Editable fields for tweaking
  const [headline, setHeadline] = useState(user?.headline || `${job.title} Specialist`);
  const [summary, setSummary] = useState(
    user?.summary || 
    `Results-driven engineer specializing in high-performance web applications, passionate about accelerating products at ${job.company}. Direct hands-on expertise in ${job.matchingSkills?.join(', ')}.`
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

  // Sync when job changes
  useEffect(() => {
    if (job) {
      setHeadline(user?.headline || `${job.title} Specialist`);
      setSummary(
        user?.summary || 
        `Results-driven engineer specializing in high-performance web applications, passionate about accelerating products at ${job.company}. Direct hands-on expertise in ${job.matchingSkills?.join(', ')}.`
      );
      setAnswer1(
        `I have built production-grade systems in the ${job.industry} sector for over ${user?.experienceYears || 6} years, and ${job.company}'s market impact directly matches my technical focus.`
      );
      setAnswer2(
        `My primary stack includes ${job.matchingSkills?.slice(0, 3).join(', ')}, allowing me to immediately contribute to your sprint velocity from day one.`
      );
      const generated = generateTailoredCoverLetter(job, user, coverLetterTone);
      setCoverLetterText(generated.fullLetter);
      setIsEditingCoverLetter(false);
    }
  }, [job?.id]);

  const handleToneChange = (toneId) => {
    setCoverLetterTone(toneId);
    const generated = generateTailoredCoverLetter(job, user, toneId);
    setCoverLetterText(generated.fullLetter);
    setIsEditingCoverLetter(false);
  };

  const handleCopyCoverLetter = () => {
    navigator.clipboard.writeText(coverLetterText);
    setIsCopiedCoverLetter(true);
    setTimeout(() => setIsCopiedCoverLetter(false), 2000);
  };

  const handleResetCoverLetter = () => {
    const generated = generateTailoredCoverLetter(job, user, coverLetterTone);
    setCoverLetterText(generated.fullLetter);
    setIsEditingCoverLetter(false);
  };

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
      coverLetter: coverLetterText,
      coverLetterTone,
      screeningAnswers: [
        { question: `Why are you interested in joining ${job.company}?`, answer: answer1 },
        { question: `Describe your hands-on experience with ${job.matchingSkills?.[0] || 'the core stack'}.`, answer: answer2 }
      ]
    });
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200 w-full max-w-2xl my-0 sm:my-8 overflow-hidden transition-all animate-in slide-in-from-bottom sm:slide-in-from-bottom-0 sm:fade-in sm:zoom-in-95 duration-200 flex flex-col max-h-[92dvh] sm:max-h-[90vh]">
        
        {/* Modal Top Bar */}
        <div className="bg-slate-900 text-white p-4 sm:p-6 relative shrink-0">
          {/* Mobile Bottom-Sheet Pull Indicator */}
          <div className="w-12 h-1.5 bg-slate-700/80 rounded-full mx-auto mb-3 sm:hidden" />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
              <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-2xl ${job.logoColor} text-white font-black text-base sm:text-lg flex items-center justify-center shadow-md shrink-0`}>
                {job.logoText}
              </div>
              <div className="min-w-0">
                <span className="text-[11px] font-extrabold text-amber-400 uppercase tracking-wider block">
                  Review your application
                </span>
                <h2 className="text-sm sm:text-lg font-black text-white truncate">
                  {job.title} @ {job.company}
                </h2>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0 ml-2"
              title="Cancel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-7 overflow-y-auto space-y-4 sm:space-y-5 flex-1">

          {/* Employer Direct Reply Guarantee */}
          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-2.5 text-xs text-emerald-950">
            <Mail className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <p className="text-emerald-900 leading-relaxed">
              <strong>{job.company}'s hiring team</strong> will get your application directly and reply to <strong className="underline text-emerald-950 font-bold">{user?.email || 'your email'}</strong>.
            </p>
          </div>

          {/* 1. RESUME VERSION SELECTION (Default: Tailored, discreet link for Original) */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                1. Resume to Submit:
              </label>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded">
                Included in ₱50
              </span>
            </div>

            {resumeChoice === 'tailored' ? (
              <div className="p-3.5 rounded-xl bg-white border-2 border-blue-600 shadow-xs flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-slate-900">Tailored Resume (ATS Optimized)</span>
                    <span className="text-[9px] font-black bg-blue-600 text-white px-2 py-0.5 rounded-full uppercase">Recommended</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Custom-aligned to {job.company}'s requirements for {job.matchingSkills?.slice(0, 3).join(', ')} to maximize your score on their ATS.
                  </p>
                </div>
                <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              </div>
            ) : (
              <div className="p-3.5 rounded-xl bg-white border border-slate-300 shadow-xs flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <span className="text-xs font-black text-slate-900">Original Master Resume</span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Submitting your default unedited master profile without role-specific keyword tuning.
                  </p>
                </div>
                <CheckCircle2 className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
              </div>
            )}

            <div className="text-right pt-0.5">
              <button
                type="button"
                onClick={() => setResumeChoice(resumeChoice === 'tailored' ? 'master' : 'tailored')}
                className="text-xs text-blue-600 hover:text-blue-800 font-bold underline cursor-pointer"
              >
                {resumeChoice === 'tailored' 
                  ? 'Switch to sending original master resume' 
                  : 'Switch back to recommended tailored resume'}
              </button>
            </div>
          </div>

          {/* 2. TAILORED COVER LETTER (INCLUDED IN ₱50 QUICK APPLY) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-blue-50/90 via-slate-50 to-indigo-50/60 border border-blue-200/90 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-xs shrink-0">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <label className="text-xs font-black text-slate-900 uppercase tracking-wider">
                      2. Tailored Cover Letter
                    </label>
                    <span className="text-[9px] font-black bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-300 uppercase">
                      Included in ₱50 • 0 Extra Fee
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    Written for {job.company}'s requirements, at no extra cost.
                  </p>
                </div>
              </div>

              {/* Expand / Collapse Button */}
              <button
                type="button"
                onClick={() => setIsCoverLetterOpen(!isCoverLetterOpen)}
                className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1 self-start sm:self-auto cursor-pointer shrink-0"
              >
                <span>{isCoverLetterOpen ? 'Collapse Letter' : 'Expand & Edit'}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isCoverLetterOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {isCoverLetterOpen && (
              <div className="space-y-3 pt-2">
                {/* Recruiter Pitch Tone Switcher */}
                <div>
                  <span className="text-[10px] font-extrabold text-slate-600 uppercase tracking-wider block mb-1.5">
                    Select Pitch Tone:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {COVER_LETTER_TONES.map((tone) => (
                      <button
                        key={tone.id}
                        type="button"
                        onClick={() => handleToneChange(tone.id)}
                        className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                          coverLetterTone === tone.id
                            ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <span className="text-xs font-black block">{tone.label}</span>
                        <span className={`text-[10px] block leading-tight mt-0.5 line-clamp-2 ${
                          coverLetterTone === tone.id ? 'text-blue-100' : 'text-slate-500'
                        }`}>
                          {tone.description}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Letterhead Container with live editable textarea */}
                <div className="bg-white rounded-xl border border-slate-300 shadow-inner overflow-hidden">
                  {/* Top Letterhead Bar */}
                  <div className="bg-slate-100 px-3.5 py-2 border-b border-slate-200 flex items-center justify-between text-[11px] text-slate-600">
                    <span className="font-bold text-slate-800 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      <span>Letterhead Recruiter Dispatch Preview</span>
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500 font-medium">
                        {coverLetterText.split(/\s+/).filter(Boolean).length} words
                      </span>
                      <span className="text-slate-300">•</span>
                      <button
                        type="button"
                        onClick={handleCopyCoverLetter}
                        className="text-blue-700 hover:text-blue-900 font-bold flex items-center gap-1 cursor-pointer"
                        title="Copy letter to clipboard"
                      >
                        {isCopiedCoverLetter ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600 stroke-[3]" />
                            <span className="text-emerald-700 font-black">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                      {isEditingCoverLetter && (
                        <>
                          <span className="text-slate-300">•</span>
                          <button
                            type="button"
                            onClick={handleResetCoverLetter}
                            className="text-slate-500 hover:text-slate-800 font-semibold flex items-center gap-1 cursor-pointer"
                            title="Reset to fresh AI draft"
                          >
                            <RotateCcw className="w-3 h-3" />
                            <span>Reset</span>
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Textarea */}
                  <textarea
                    rows={8}
                    value={coverLetterText}
                    onChange={(e) => {
                      setCoverLetterText(e.target.value);
                      setIsEditingCoverLetter(true);
                    }}
                    className="w-full p-3.5 text-sm sm:text-xs font-sans text-slate-800 leading-relaxed border-none focus:ring-0 focus:outline-none resize-y"
                    placeholder="Your tailored cover letter will be generated here..."
                  />
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-500">
                  <span>💡 Direct edit enabled. Feel free to tweak any sentence before approving.</span>
                  {isEditingCoverLetter && (
                    <span className="text-amber-700 font-bold">Custom edits detected</span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* 3. APPLICATION HEADLINE & SUMMARY */}
          <div className="space-y-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                3. Application Headline & Summary:
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
                className="w-full px-3 py-2.5 sm:py-2 text-sm sm:text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white font-medium"
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
                className="w-full p-3 text-sm sm:text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white font-medium"
              />
            </div>
          </div>

          {/* 4. CONTEXTUAL SCREENING QUESTION PREVIEWS (LAYER 4) */}
          <div className="space-y-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                4. Recruiter Screening Answers (Pre-Drafted):
              </label>
              <span className="text-[10px] text-emerald-700 font-bold">2-Sentence Precision</span>
            </div>

            <div className="space-y-2.5">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                  <HelpCircle className="w-3 h-3 text-blue-600 shrink-0" />
                  <span>"Why are you interested in joining {job.company}?"</span>
                </label>
                <textarea
                  rows={2}
                  value={answer1}
                  onChange={(e) => setAnswer1(e.target.value)}
                  className="w-full p-2.5 text-sm sm:text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white font-medium"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                  <HelpCircle className="w-3 h-3 text-blue-600 shrink-0" />
                  <span>"Describe your hands-on experience with {job.matchingSkills?.[0] || 'the core stack'}."</span>
                </label>
                <textarea
                  rows={2}
                  value={answer2}
                  onChange={(e) => setAnswer2(e.target.value)}
                  className="w-full p-2.5 text-sm sm:text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white font-medium"
                />
              </div>
            </div>
          </div>

          {/* 5. SIGN-OFF AUTHORIZATION CHECKBOX */}
          <div className="p-3.5 rounded-2xl bg-white border border-slate-200 flex items-start gap-3">
            <input
              type="checkbox"
              id="signoff-check"
              checked={hasSignedOff}
              onChange={(e) => setHasSignedOff(e.target.checked)}
              className="mt-1 w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300 cursor-pointer shrink-0"
            />
            <label htmlFor="signoff-check" className="text-xs text-slate-700 font-medium cursor-pointer">
              I authorize CANDIDATE.ph to dispatch my <strong>tailored resume and role-specific cover letter</strong> directly to <strong>{job.company}</strong>'s official career portal and debit ₱50 from my wallet upon verified employer receipt.
            </label>
          </div>

        </div>

        {/* Modal Sticky Footer */}
        <div className="sticky bottom-0 bg-white border-t border-slate-200 p-4 sm:p-5 z-20 shadow-xl shrink-0 flex flex-col gap-3">
          {/* Explicit Fee & Balance Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm font-semibold text-slate-800 bg-slate-50 px-3.5 py-2.5 rounded-xl border border-slate-200 gap-1.5">
            <span className="flex items-center gap-1.5 font-bold text-slate-900">
              <span className="text-blue-700 font-black">₱50 will be deducted</span>
              <span className="text-slate-400 font-normal">•</span>
              <span className="text-slate-700 font-medium">Balance after: <strong className="text-slate-900">₱{Math.max(0, (user?.walletBalance ?? 50) - 50)}.00</strong></span>
            </span>
            <span className="text-[11px] font-bold text-emerald-700">
              ✓ If your application doesn't reach the employer, you won't be charged.
            </span>
          </div>

          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 cursor-pointer transition-colors"
            >
              Cancel
            </button>

            <button
              type="button"
              disabled={!hasSignedOff || !canAfford || isSubmitting}
              onClick={handleSubmit}
              className={`flex-1 px-7 py-3 text-white font-extrabold rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-md min-h-[46px] ${
                !hasSignedOff || !canAfford || isSubmitting
                  ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
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
                  <Send className="w-4 h-4 text-white" />
                  <span>Send application (₱50)</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
