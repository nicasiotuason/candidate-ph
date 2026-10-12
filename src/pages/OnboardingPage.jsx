import React, { useState } from 'react';
import { 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  User, 
  Calendar, 
  Flag, 
  Clock, 
  Check, 
  AlertCircle,
  Briefcase
} from 'lucide-react';

export default function OnboardingPage({ initialEmail, onCompleteOnboarding }) {
  const [step, setStep] = useState(1); // 1: Personal Info, 2: Resume Upload, 3: AI Parser Verification

  // Form states
  const [name, setName] = useState('Juan Dela Cruz');
  const [age, setAge] = useState(28);
  const [birthdate, setBirthdate] = useState('1998-05-14');
  const [citizenship, setCitizenship] = useState('Filipino');
  const [targetRole, setTargetRole] = useState('Senior Frontend Developer');
  const [desiredSalary, setDesiredSalary] = useState('₱160k - ₱220k/mo');
  const [setupPreference, setSetupPreference] = useState('Hybrid • BGC / Remote');

  // Resume state
  const [resumeFile, setResumeFile] = useState({
    name: 'Juan_DelaCruz_Senior_Frontend_Resume.pdf',
    size: '142 KB'
  });

  // AI Parser simulation state
  const [isParsing, setIsParsing] = useState(false);
  const [parseProgress, setParseProgress] = useState(0);
  const [parsedSkills, setParsedSkills] = useState([
    'React 18',
    'TypeScript',
    'Next.js SSR',
    'Tailwind CSS',
    'Node.js',
    'REST APIs',
    'Payments Integration',
    'Design Systems'
  ]);
  const [newSkill, setNewSkill] = useState('');
  const [summary, setSummary] = useState(
    'Results-driven Senior Frontend Engineer with 6+ years specializing in high-performance React and Next.js web applications in fintech and e-commerce. Proven track record building secure checkout flows and scalable design systems.'
  );

  // Trigger parsing animation when moving from step 2 to step 3
  const handleStartParsing = () => {
    setStep(3);
    setIsParsing(true);
    setParseProgress(20);

    setTimeout(() => setParseProgress(55), 400);
    setTimeout(() => setParseProgress(85), 800);
    setTimeout(() => {
      setParseProgress(100);
      setIsParsing(false);
    }, 1200);
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (newSkill.trim() && !parsedSkills.includes(newSkill.trim())) {
      setParsedSkills([...parsedSkills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skill) => {
    setParsedSkills(parsedSkills.filter(s => s !== skill));
  };

  const handleFinalSubmit = () => {
    onCompleteOnboarding({
      name,
      age,
      birthdate,
      citizenship,
      targetRole,
      desiredSalary,
      setupPreference,
      resumeFileName: resumeFile.name,
      skills: parsedSkills,
      summary
    });
  };

  return (
    <div className="min-h-[85vh] py-10 px-4 sm:px-6 max-w-3xl mx-auto grid-dot-pattern">
      <div className="bg-white rounded-3xl shadow-elevated border border-slate-200 p-6 sm:p-10 relative">
        
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3 text-xs font-bold text-slate-400 uppercase tracking-wider">
            <span>Candidate Onboarding</span>
            <span className="text-blue-600">Step {step} of 3</span>
          </div>

          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-blue-600 h-full rounded-full transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>

          <div className="flex justify-between text-[11px] font-bold text-slate-500 mt-2">
            <span className={step >= 1 ? 'text-blue-600' : ''}>1. Personal Info</span>
            <span className={step >= 2 ? 'text-blue-600' : ''}>2. Resume Upload</span>
            <span className={step >= 3 ? 'text-blue-600' : ''}>3. AI Matcher Scan</span>
          </div>
        </div>

        {/* STEP 1: Personal Details */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                Tell us about yourself
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                These core details are required by Philippine employers and ATS portals to route your application.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Legal Name:
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Juan Dela Cruz"
                    className="w-full pl-10 pr-3 py-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Age */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Age:
                </label>
                <input
                  type="number"
                  min="18"
                  max="80"
                  required
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Birthdate */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Birthdate:
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="date"
                    required
                    value={birthdate}
                    onChange={(e) => setBirthdate(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Citizenship */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Citizenship:
                </label>
                <div className="relative">
                  <Flag className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <select
                    value={citizenship}
                    onChange={(e) => setCitizenship(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                  >
                    <option value="Filipino">Filipino</option>
                    <option value="Dual Citizen">Dual Citizen (PH / Other)</option>
                    <option value="Foreign National with PH Work Visa">Foreign National (PH Visa)</option>
                  </select>
                </div>
              </div>

              {/* Target Role */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Target Job Title / Domain:
                </label>
                <div className="relative">
                  <Briefcase className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                    placeholder="e.g. Senior Frontend / Full-Stack"
                    className="w-full pl-10 pr-3 py-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Preferred Setup */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Preferred Work Setup:
                </label>
                <select
                  value={setupPreference}
                  onChange={(e) => setSetupPreference(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                >
                  <option value="Hybrid • BGC / Remote">Hybrid • BGC / Remote</option>
                  <option value="Fully Remote (PH or Global)">Fully Remote (PH or Global)</option>
                  <option value="Makati / Ortigas / Alabang Hybrid">Makati / Ortigas / Alabang Hybrid</option>
                </select>
              </div>

              {/* Desired Salary */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Expected Salary Range:
                </label>
                <input
                  type="text"
                  value={desiredSalary}
                  onChange={(e) => setDesiredSalary(e.target.value)}
                  placeholder="e.g. ₱160,000 - ₱220,000 / mo"
                  className="w-full px-3 py-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-extrabold rounded-xl text-sm transition-all flex items-center gap-2 shadow-md"
              >
                <span>Continue to Resume Upload</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Resume Upload */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                Upload your Resume
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Our AI parser will read your skills, years of experience, and ATS keywords to match open roles twice a day.
              </p>
            </div>

            {/* Drag & Drop Area */}
            <div className="border-2 border-dashed border-blue-200 hover:border-blue-400 bg-blue-50/40 rounded-3xl p-8 sm:p-10 text-center transition-all flex flex-col items-center justify-center">
              <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md mb-4">
                <UploadCloud className="w-7 h-7" />
              </div>
              <h3 className="text-base font-extrabold text-slate-900">
                Drag and drop your resume file here
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Supports PDF or DOCX (Max 10MB)
              </p>

              {/* Current File Card */}
              {resumeFile && (
                <div className="mt-5 p-3.5 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3 w-full max-w-sm text-left">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-900 truncate">{resumeFile.name}</p>
                    <p className="text-[10px] text-slate-400">{resumeFile.size} • Ready for AI Parse</p>
                  </div>
                  <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                    Loaded ✓
                  </span>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-600 hover:bg-slate-50"
              >
                Back to Details
              </button>

              <button
                type="button"
                onClick={handleStartParsing}
                className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-extrabold rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Parse Resume with AI</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: AI Resume Parsing & Verification */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold mb-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>AI PARSER SUMMARY</span>
              </div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                Review Your Parsed Profile
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                We've extracted your qualifications. You can tweak skills or summary before entering your matched jobs feed.
              </p>
            </div>

            {/* Dynamic Scanning Status Bar */}
            {isParsing ? (
              <div className="p-6 rounded-2xl bg-blue-50 border border-blue-200 text-center space-y-3">
                <div className="flex items-center justify-center gap-2 text-blue-700 font-extrabold text-sm">
                  <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  <span>AI Agent is parsing {resumeFile.name}...</span>
                </div>
                <div className="w-full bg-blue-200 h-2 rounded-full overflow-hidden max-w-md mx-auto">
                  <div 
                    className="bg-blue-600 h-full rounded-full transition-all duration-300"
                    style={{ width: `${parseProgress}%` }}
                  ></div>
                </div>
                <p className="text-xs text-slate-500 font-medium">
                  {parseProgress < 40 && "Extracting candidate profile and contact details..."}
                  {parseProgress >= 40 && parseProgress < 80 && "Cataloging 6+ years of technical experience..."}
                  {parseProgress >= 80 && "Calculating ATS matching fingerprints against 15,443+ scraped jobs..."}
                </p>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <div>
                    <h4 className="text-xs font-bold text-emerald-950">Resume Successfully Parsed</h4>
                    <p className="text-[11px] text-emerald-800">8 High-Demand Skills Found • 98% Highest Match (Maya)</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-white px-2.5 py-1 rounded-lg border border-emerald-200">
                  Ready to Match
                </span>
              </div>
            )}

            {/* Extracted Skills Chips */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3">
              <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                Extracted Skills & Competencies:
              </label>
              
              <div className="flex flex-wrap gap-1.5">
                {parsedSkills.map((skill, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 text-xs bg-slate-50 text-slate-800 border border-slate-200 px-3 py-1.5 rounded-xl font-medium"
                  >
                    <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                    <span>{skill}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="text-slate-400 hover:text-rose-500 ml-1 text-sm font-bold"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>

              {/* Add custom skill input */}
              <form onSubmit={handleAddSkill} className="flex gap-2 pt-1">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add another skill (e.g. GraphQL, AWS, Docker)..."
                  className="flex-1 px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl"
                >
                  Add Skill
                </button>
              </form>
            </div>

            {/* Professional Summary */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
              <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                AI Generated Candidate Summary:
              </label>
              <textarea
                rows={3}
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                className="w-full p-3 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Submit to Dashboard */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-600 hover:bg-slate-50"
              >
                Back to Upload
              </button>

              <button
                type="button"
                onClick={handleFinalSubmit}
                className="w-full sm:w-auto px-7 py-3.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-extrabold rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Complete Onboarding & Unlock Matched Jobs</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
