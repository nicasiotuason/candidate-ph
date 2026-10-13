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
  RotateCcw
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

  // Editable fields for tweaking
  const [isTweaking, setIsTweaking] = useState(false);
  const [headline, setHeadline] = useState(user?.headline || `${job.title} Specialist`);
  const [summary, setSummary] = useState(
    user?.summary || 
    `Experienced engineer passionate about building high-impact products at ${job.company}. Skilled in ${job.matchingSkills?.join(', ')}.`
  );
  const [highlightedSkills, setHighlightedSkills] = useState(
    job.matchingSkills || user?.skills?.slice(0, 4) || []
  );
  const [newSkillInput, setNewSkillInput] = useState('');
  const [hasSignedOff, setHasSignedOff] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const canAfford = (user?.walletBalance ?? 0) >= 50;

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (newSkillInput.trim() && !highlightedSkills.includes(newSkillInput.trim())) {
      setHighlightedSkills([...highlightedSkills, newSkillInput.trim()]);
      setNewSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setHighlightedSkills(highlightedSkills.filter(s => s !== skillToRemove));
  };

  const handleSubmit = async () => {
    if (!canAfford) {
      onOpenTopUp();
      return;
    }
    if (!hasSignedOff) return;

    setIsSubmitting(true);
    await onConfirmApply(job, {
      headline,
      summary,
      highlightedSkills
    });
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-2xl my-8 overflow-hidden transition-all animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Top Bar */}
        <div className="bg-slate-900 text-white p-5 sm:p-6 flex items-center justify-between relative">
          <div className="flex items-center gap-3">
            <div className={`w-11 h-11 rounded-2xl ${job.logoColor} text-white font-black text-lg flex items-center justify-center shadow-md`}>
              {job.logoText}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Step 1 of 1 • Final Review & Sign-Off
                </span>
                <span className="text-xs text-slate-400">• Direct Career Portal</span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-white">
                {job.title} @ {job.company}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
            title="Exit without applying"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-7 max-h-[70vh] overflow-y-auto space-y-6">

          {/* Wallet & Pricing Notice Banner */}
          <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                <Wallet className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">
                  Wallet Deduction: <span className="text-blue-700 font-extrabold">₱50.00</span> upon confirmed delivery to employer
                </p>
                <p className="text-[11px] text-slate-600">
                  Current Balance: ₱{user?.walletBalance ?? 250}.00 → Balance After: ₱{(user?.walletBalance ?? 250) - 50}.00
                </p>
              </div>
            </div>

            {!canAfford && (
              <button
                onClick={onOpenTopUp}
                className="px-3.5 py-1.5 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-xl shadow-xs shrink-0"
              >
                Reload with PayMongo
              </button>
            )}
          </div>

          {/* Employer Email Direct Reply Trust Guarantee */}
          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
            <Mail className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-xs text-emerald-950">
              <span className="font-bold block text-emerald-900">Direct Employer Communication:</span>
              {job.company}'s recruitment team will receive this application directly into their hiring portal and will email you directly at{' '}
              <strong className="font-bold underline">{user?.email || 'your personal email'}</strong>. Once sent, we step back.
            </div>
          </div>

          {/* Mode Selector: Preview vs Tweak */}
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                <Eye className="w-4 h-4 text-blue-600" />
                <span>What is going to be sent to {job.company} ATS</span>
              </h3>
              <p className="text-[11px] text-slate-500">
                {isTweaking ? 'Edit your application details below, then click "One Last Look".' : 'Verify your details below before signing off.'}
              </p>
            </div>

            <button
              onClick={() => setIsTweaking(!isTweaking)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              {isTweaking ? (
                <>
                  <Eye className="w-3.5 h-3.5 text-blue-600" />
                  <span>One Last Look Preview</span>
                </>
              ) : (
                <>
                  <Edit3 className="w-3.5 h-3.5 text-amber-600" />
                  <span>Tweak Resume for this Role</span>
                </>
              )}
            </button>
          </div>

          {/* IF TWEAKING MODE IS ACTIVE: The Inline Resume Tweaker */}
          {isTweaking ? (
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Customize Resume Specifically for {job.company}</span>
                </span>
                <span className="text-[10px] text-amber-700 font-medium">Changes apply only to this application</span>
              </div>

              {/* Target Headline */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Application Headline:
                </label>
                <input
                  type="text"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                  placeholder="e.g. Senior React Developer with Fintech Experience"
                />
              </div>

              {/* Tailored Professional Summary */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Tailored Professional Summary:
                </label>
                <textarea
                  rows={3}
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                  placeholder="Summarize your experience tailored to this role..."
                />
              </div>

              {/* Highlighted Skills */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Highlighted Skills Spotlight:
                </label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {highlightedSkills.map((skill, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 text-xs bg-white text-slate-800 border border-amber-300 px-2.5 py-1 rounded-lg"
                    >
                      <span>{skill}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
                        className="text-slate-400 hover:text-rose-500 ml-0.5"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <form onSubmit={handleAddSkill} className="flex gap-2">
                  <input
                    type="text"
                    value={newSkillInput}
                    onChange={(e) => setNewSkillInput(e.target.value)}
                    placeholder="Add custom skill tag (press Enter)..."
                    className="flex-1 px-3 py-1.5 text-xs border border-slate-300 rounded-xl focus:outline-none bg-white"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 text-xs font-bold bg-amber-600 text-white rounded-xl hover:bg-amber-700"
                  >
                    Add
                  </button>
                </form>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsTweaking(false)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-xs"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Save Tweaks & Take One Last Look</span>
                </button>
              </div>
            </div>
          ) : (
            /* PREVIEW MODE: Exact ATS Dossier Preview */
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 text-left">
              
              {/* Applicant Header */}
              <div className="flex items-start justify-between pb-3 border-b border-slate-200">
                <div>
                  <h4 className="text-sm font-black text-slate-900">{user?.name || "Juan Dela Cruz"}</h4>
                  <p className="text-xs font-bold text-blue-600 mt-0.5">{headline}</p>
                  <p className="text-[11px] text-slate-500 mt-1">
                    {user?.citizenship || 'Filipino'} • Age {user?.age || '28'} • {user?.phone || '+63 917 123 4567'}
                  </p>
                </div>
                <div className="p-2 rounded-xl bg-white border border-slate-200 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-600" />
                  <span className="text-[11px] font-bold text-slate-800">
                    {user?.resumeFileName || 'Juan_DelaCruz_Resume.pdf'}
                  </span>
                </div>
              </div>

              {/* Summary */}
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Candidate Summary:
                </p>
                <p className="text-xs text-slate-700 leading-relaxed bg-white p-3 rounded-xl border border-slate-200">
                  {summary}
                </p>
              </div>

              {/* Highlighted Skills */}
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Skills Spotlight ({job.company} match):
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {highlightedSkills.map((skill, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-lg"
                    >
                      <Check className="w-3 h-3 text-emerald-600 stroke-[3]" />
                      <span>{skill}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Packaging Badge */}
              <div className="p-2.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1.5 font-medium">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  <span>Package Formatted for <strong>Direct Career Portal Submission</strong></span>
                </span>
                <span className="font-mono text-[10px] text-emerald-600 font-bold">READY TO SEND</span>
              </div>

            </div>
          )}

          {/* Applicant Sign-Off Checkbox */}
          <div className="p-3.5 rounded-2xl bg-slate-100/80 border border-slate-200">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={hasSignedOff}
                onChange={(e) => setHasSignedOff(e.target.checked)}
                className="w-4 h-4 mt-0.5 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
              />
              <span className="text-xs text-slate-700 leading-normal">
                <strong>Applicant Sign-Off:</strong> I approve this application package and authorize CANDIDATE.ph to deliver it directly to <strong>{job.company}</strong>'s hiring team. I understand <strong>₱50</strong> will be deducted from my wallet balance upon confirmed delivery, and the employer will reply directly to my personal email.
              </span>
            </label>
          </div>

        </div>

        {/* Modal Action Footer */}
        <div className="p-5 sm:p-6 bg-slate-50 border-t border-slate-200 flex flex-col-reverse sm:flex-row items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-bold text-xs transition-colors"
          >
            Exit / Cancel (₱0 deducted)
          </button>

          <div className="w-full sm:w-auto flex items-center gap-2">
            {!isTweaking && (
              <button
                onClick={() => setIsTweaking(true)}
                className="px-4 py-3 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center gap-1.5"
              >
                <Edit3 className="w-3.5 h-3.5 text-amber-600" />
                <span>Tweak Resume</span>
              </button>
            )}

            <button
              disabled={!hasSignedOff || isSubmitting || !canAfford}
              onClick={handleSubmit}
              className={`w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 shadow-md transition-all ${
                !hasSignedOff || !canAfford
                  ? 'bg-slate-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 active:scale-95'
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Delivering to Employer...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 text-amber-300" />
                  <span>Sign Off & Send to Employer (-₱50)</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
