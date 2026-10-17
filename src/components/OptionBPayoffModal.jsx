import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Download, 
  Check, 
  ShieldCheck, 
  Building2, 
  GraduationCap, 
  Wrench,
  Layers
} from 'lucide-react';

export default function OptionBPayoffModal({
  isOpen,
  onProceedToMatching,
  onOpenResumeStudio,
  candidateName = 'Juan Dela Cruz',
  candidateEmail = 'juan.delacruz@email.com',
  roleTitle = 'Customer Service Representative',
  companyName = 'Concentrix Philippines',
  yearsExp = '1–2 years',
  skills = ['Customer Support', 'Zendesk', 'CRM Escalations', 'Communication'],
  duty = 'Handled 40+ inbound customer inquiries daily, maintaining 96% CSAT rating',
  degree = "Bachelor's Degree",
  school = 'Polytechnic University of the Philippines'
}) {
  if (!isOpen) return null;

  const [assemblyStep, setAssemblyStep] = useState(0); // 0 to 4
  const [isAssemblyComplete, setIsAssemblyComplete] = useState(false);

  // Parse skills into array if it's a string
  const skillsList = Array.isArray(skills) 
    ? skills 
    : String(skills).split(/[,/]/).map(s => s.trim()).filter(Boolean);

  const displaySkills = skillsList.length > 0 
    ? skillsList 
    : ['Customer Communication', 'Problem Resolution', 'Zendesk', 'CRM Management'];

  // 1.5s simulated compilation sequence
  useEffect(() => {
    setAssemblyStep(1);
    const t1 = setTimeout(() => setAssemblyStep(2), 400);
    const t2 = setTimeout(() => setAssemblyStep(3), 850);
    const t3 = setTimeout(() => setAssemblyStep(4), 1300);
    const t4 = setTimeout(() => {
      setIsAssemblyComplete(true);
    }, 1600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  const generatedFileName = `${candidateName.replace(/\s+/g, '_')}_Base_ATS_Resume.pdf`;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-5 animate-in slide-in-from-bottom sm:slide-in-from-bottom-0 sm:fade-in duration-200">
      <div className="bg-white w-full max-w-4xl max-h-[94dvh] sm:max-h-[92vh] rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden">
        
        {/* ================= MODAL HEADER ================= */}
        <div className="bg-slate-50 px-4 sm:px-7 py-3.5 sm:py-4 border-b border-slate-200 shrink-0">
          {/* Mobile Bottom-Sheet Pull Indicator */}
          <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto mb-3 sm:hidden" />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-sm shadow-sm shrink-0">
                C#1
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-xs sm:text-base font-black text-slate-900 tracking-tight">
                    CANDIDATE.ph <span className="text-blue-700">Automated Resume Engine</span>
                  </h2>
                  <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-300">
                    Option B Payoff
                  </span>
                </div>
                <p className="text-[11px] text-slate-700 font-semibold truncate sm:whitespace-normal">
                  Your onboarding answers have been automatically assembled into an ATS-compliant resume.
                </p>
              </div>
            </div>

            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 shrink-0">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              100% Parser Compliant
            </span>
          </div>
        </div>

        {/* ================= MAIN CONTENT ================= */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6">
          
          {/* Phase 1: Real-time Assembly Progress */}
          {!isAssemblyComplete && (
            <div className="py-8 space-y-5 text-center max-w-md mx-auto">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center mx-auto text-blue-600 shadow-xs">
                <Layers className="w-7 h-7 animate-pulse" />
              </div>

              <div>
                <h3 className="text-base font-black text-slate-900">
                  Assembling Your Base ATS Resume...
                </h3>
                <p className="text-xs text-slate-700 font-medium mt-1">
                  Converting your role, background, and clearance answers into an employer-ready CV
                </p>
              </div>

              {/* Step Checklist */}
              <div className="space-y-2 text-left bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs font-semibold text-slate-800">
                <div className="flex items-center gap-2.5">
                  {assemblyStep >= 1 ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border-2 border-slate-300 shrink-0"></div>
                  )}
                  <span>Generated Profile Header & Contact Details</span>
                </div>

                <div className="flex items-center gap-2.5">
                  {assemblyStep >= 2 ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border-2 border-slate-300 shrink-0"></div>
                  )}
                  <span>Elevated Experience Bullets for {companyName}</span>
                </div>

                <div className="flex items-center gap-2.5">
                  {assemblyStep >= 3 ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border-2 border-slate-300 shrink-0"></div>
                  )}
                  <span>Integrated {displaySkills.length} Verified Skills & Tools</span>
                </div>

                <div className="flex items-center gap-2.5">
                  {assemblyStep >= 4 ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border-2 border-slate-300 shrink-0"></div>
                  )}
                  <span>Applied Universal Single-Column ATS Formatting</span>
                </div>
              </div>
            </div>
          )}

          {/* Phase 2: Completed Reveal & Payoff */}
          {isAssemblyComplete && (
            <div className="space-y-5 animate-in fade-in duration-300">
              
              {/* Payoff Banner */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-blue-50 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3.5 text-center sm:text-left">
                  <div className="w-11 h-11 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md">
                    <Check className="w-6 h-6 stroke-[3]" />
                  </div>
                  <div>
                    <div className="flex items-center justify-center sm:justify-start gap-2">
                      <h3 className="text-sm sm:text-base font-black text-slate-900">
                        Base ATS Resume Generated & Attached!
                      </h3>
                      <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-200 text-emerald-950 px-2 py-0.5 rounded-full">
                        Ready
                      </span>
                    </div>
                    <p className="text-xs text-slate-800 font-medium mt-0.5 leading-relaxed">
                      You’re 100% dispatch-ready. When our matching technology applies to direct employer career portals on your behalf, we attach this ATS-compliant resume automatically.
                    </p>
                  </div>
                </div>

                <div className="bg-white border border-emerald-300 rounded-xl px-3.5 py-2 shrink-0 shadow-xs text-center sm:text-right">
                  <p className="text-xs font-black text-slate-900">{generatedFileName}</p>
                  <p className="text-[11px] text-emerald-700 font-bold">138 KB • Verified Clean Format</p>
                </div>
              </div>

              {/* Clean Single-Column Paper Document Preview */}
              <div className="bg-slate-100 p-4 sm:p-6 rounded-2xl border border-slate-300 flex justify-center">
                <div className="w-full max-w-2xl bg-white rounded-xl shadow-md border border-slate-300 p-5 sm:p-7 space-y-4 font-sans text-slate-900 text-left">
                  
                  {/* Document Header */}
                  <div className="border-b-2 border-slate-900 pb-2.5">
                    <h1 className="text-xl font-black text-slate-950 uppercase tracking-tight">
                      {candidateName}
                    </h1>
                    <p className="text-xs font-bold text-blue-700 mt-0.5 uppercase tracking-wider">
                      {roleTitle}
                    </p>
                    <div className="flex flex-wrap gap-x-3 text-[11px] font-medium text-slate-700 mt-1">
                      <span>{candidateEmail}</span>
                      <span>•</span>
                      <span>+63 917 XXX XXXX</span>
                      <span>•</span>
                      <span>Metro Manila, Philippines</span>
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="space-y-1">
                    <h2 className="text-[10px] font-black text-slate-950 uppercase tracking-wider border-b border-slate-200 pb-0.5">
                      Professional Summary
                    </h2>
                    <p className="text-xs text-slate-800 font-medium leading-relaxed">
                      Experienced {roleTitle} with a strong track record of operational support and customer success at {companyName}. Proficient in {displaySkills.slice(0, 3).join(', ')}, demonstrating consistent attention to detail and high service standards.
                    </p>
                  </div>

                  {/* Experience */}
                  <div className="space-y-1.5">
                    <h2 className="text-[10px] font-black text-slate-950 uppercase tracking-wider border-b border-slate-200 pb-0.5">
                      Work Experience
                    </h2>
                    <div className="flex items-center justify-between text-xs font-black text-slate-900">
                      <span>{roleTitle}</span>
                      <span className="text-[11px] font-bold text-slate-600">{yearsExp}</span>
                    </div>
                    <p className="text-xs font-bold text-slate-700 italic">
                      {companyName}
                    </p>
                    <div className="space-y-1 pt-1 text-xs text-slate-800 font-medium">
                      <div className="flex items-start gap-2">
                        <span className="text-slate-950 font-black">•</span>
                        <span>{duty}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-slate-950 font-black">•</span>
                        <span>Collaborated with team supervisors to maintain high response quality and adhere to standard operating procedures.</span>
                      </div>
                    </div>
                  </div>

                  {/* Education */}
                  <div className="space-y-1">
                    <h2 className="text-[10px] font-black text-slate-950 uppercase tracking-wider border-b border-slate-200 pb-0.5">
                      Education & Credentials
                    </h2>
                    <div className="flex items-center justify-between text-xs font-black text-slate-900">
                      <span>{degree}</span>
                      <span className="text-[11px] font-bold text-slate-600">Verified</span>
                    </div>
                    <p className="text-xs font-semibold text-slate-700">
                      {school}
                    </p>
                  </div>

                  {/* Skills */}
                  <div className="space-y-1">
                    <h2 className="text-[10px] font-black text-slate-950 uppercase tracking-wider border-b border-slate-200 pb-0.5">
                      Core Skills & Tools
                    </h2>
                    <div className="flex flex-wrap gap-1 text-[11px] text-slate-800 font-semibold">
                      {displaySkills.map((sk) => (
                        <span key={sk} className="bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>
              </div>

            </div>
          )}

        </div>

        {/* ================= MODAL FOOTER ================= */}
        {isAssemblyComplete && (
          <div className="bg-slate-50 px-4 sm:px-7 py-3.5 sm:py-4 border-t border-slate-200 flex flex-col-reverse sm:flex-row items-center justify-between gap-3 shrink-0">
            <button
              type="button"
              onClick={onOpenResumeStudio}
              className="w-full sm:w-auto text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center justify-center gap-1.5 cursor-pointer py-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Optional: Fine-Tune in Candidate Resume Studio</span>
            </button>

            <button
              type="button"
              onClick={onProceedToMatching}
              className="w-full sm:w-auto px-6 py-3.5 sm:py-3 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-extrabold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer min-h-[48px]"
            >
              <span>See My Live Job Matches (Next Step)</span>
              <ArrowRight className="w-4 h-4 text-amber-300" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
