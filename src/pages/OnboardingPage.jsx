import React, { useState, useEffect } from 'react';
import { 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  ShieldCheck, 
  User, 
  Calendar, 
  Flag, 
  Clock, 
  Check, 
  AlertCircle,
  Briefcase,
  DollarSign,
  GraduationCap,
  MapPin,
  Mail,
  Layers,
  Sparkles,
  Zap,
  Building2,
  Lock
} from 'lucide-react';
import ResumeBuilderModal from '../components/ResumeBuilderModal';

const CATEGORIES = [
  { id: 'all', label: '🌐 Open to All Domains', count: '15,443+ active roles' },
  { id: 'tech', label: 'Tech & Engineering', count: '4,210 jobs' },
  { id: 'bpo', label: 'BPO, Customer Support & CX', count: '3,820 jobs' },
  { id: 'finance', label: 'Finance, Banking & Accounting', count: '2,890 jobs' },
  { id: 'sales', label: 'Sales & Business Development', count: '2,150 jobs' },
  { id: 'marketing', label: 'Marketing, Growth & Creative', count: '1,940 jobs' },
  { id: 'admin', label: 'Virtual Assistance & Admin', count: '2,410 jobs' },
  { id: 'hr', label: 'HR, Talent Ops & People', count: '1,320 jobs' },
  { id: 'healthcare', label: 'Healthcare & Medical Ops', count: '1,180 jobs' },
];

const SENIORITY_LEVELS = [
  { id: 'entry', label: 'Entry / Fresh Grad', exp: '0–1 year' },
  { id: 'junior', label: 'Junior', exp: '1–3 years' },
  { id: 'mid', label: 'Mid-Level', exp: '3–5 years' },
  { id: 'senior', label: 'Senior', exp: '5–8 years' },
  { id: 'lead', label: 'Lead / Executive', exp: '8+ years' },
];

export default function OnboardingPage({ initialEmail, initialName, onCompleteOnboarding }) {
  const [step, setStep] = useState(1); // 1: Resume / Credentials, 2: Role & Domain, 3: Universal ATS Fields, 4: Matching Telemetry & Celebration

  // Step 1: Resume / Credentials Selection
  const [cvChoice, setCvChoice] = useState(null); // 'uploaded' | 'choice_a' | 'choice_b' | null
  const [uploadedResume, setUploadedResume] = useState(null);
  const [isSimulatingUpload, setIsSimulatingUpload] = useState(false);
  const [showResumeBuilderModal, setShowResumeBuilderModal] = useState(false);

  const handleResumeBuilt = (builtResume) => {
    setUploadedResume(builtResume);
    setResumeFile({
      name: builtResume.name,
      size: builtResume.size,
      parsedSkills: builtResume.parsedSkills
    });
    if (builtResume.resumeData?.roleTitle) {
      setTargetRole(builtResume.resumeData.roleTitle);
    }
    setCvChoice('choice_a');
    setShowResumeBuilderModal(false);
    setStep(2); // Automatically advance to Step 2
  };

  // Step 2: Role & Domain
  const [targetCategories, setTargetCategories] = useState(['tech']);
  const [targetRole, setTargetRole] = useState('Senior Frontend Engineer');
  const [seniority, setSeniority] = useState('senior');

  const toggleCategory = (catId) => {
    if (catId === 'all') {
      setTargetCategories(['all']);
      return;
    }
    if (targetCategories.includes('all')) {
      setTargetCategories([catId]);
      return;
    }
    if (targetCategories.includes(catId)) {
      const remaining = targetCategories.filter(c => c !== catId);
      setTargetCategories(remaining.length === 0 ? ['all'] : remaining);
    } else {
      setTargetCategories([...targetCategories, catId]);
    }
  };

  // Step 3: Pareto 6 Universal Asterisk Fields
  const [salaryFloor, setSalaryFloor] = useState('₱160,000 / mo');
  const [noticePeriod, setNoticePeriod] = useState('30 Days');
  const [workAuth, setWorkAuth] = useState('Filipino Citizen');
  const [preferredSetup, setPreferredSetup] = useState('Hybrid • BGC / Makati / Remote');
  const [education, setEducation] = useState("Bachelor's Degree");
  const [contactEmail, setContactEmail] = useState(initialEmail || 'juan.delacruz@email.com');

  // Resume File representation (persisted to profile)
  const [resumeFile, setResumeFile] = useState({
    name: 'Juan_DelaCruz_Senior_Frontend_Resume.pdf',
    size: '148 KB',
    parsedSkills: [
      'React 18',
      'TypeScript',
      'Next.js SSR',
      'Tailwind CSS',
      'Node.js',
      'REST APIs',
      'Payments Integration',
      'Design Systems'
    ]
  });

  // Step 4: Telemetry simulation
  const [telemetryProgress, setTelemetryProgress] = useState(0);
  const [telemetryStage, setTelemetryStage] = useState('Initiating search across 15,443+ career portals...');
  const [isScanningComplete, setIsScanningComplete] = useState(false);

  // Trigger telemetry animation on step 4
  useEffect(() => {
    if (step === 4) {
      setTelemetryProgress(15);
      setTelemetryStage('Querying direct employer portals (Greenhouse, Lever, Workday)...');

      const t1 = setTimeout(() => {
        setTelemetryProgress(48);
        setTelemetryStage('Matching your Pareto 6 criteria & verified skills...');
      }, 700);

      const t2 = setTimeout(() => {
        setTelemetryProgress(82);
        setTelemetryStage('Filtering roles with 60%+ qualification match...');
      }, 1500);

      const t3 = setTimeout(() => {
        setTelemetryProgress(100);
        setTelemetryStage('Matching complete! Verified high-match roles ready.');
        setIsScanningComplete(true);
      }, 2200);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    }
  }, [step]);

  const handleFinishOnboarding = () => {
    onCompleteOnboarding({
      name: initialName,
      targetRole,
      targetCategory: targetCategories.includes('all') ? 'All Industries' : targetCategories.join(', '),
      targetCategories,
      seniority,
      desiredSalary: salaryFloor,
      noticePeriod,
      citizenship: workAuth,
      setupPreference: preferredSetup,
      education,
      email: contactEmail,
      resumeFileName: uploadedResume ? uploadedResume.name : resumeFile.name,
      skills: resumeFile.parsedSkills,
      cvChoice: cvChoice || 'uploaded'
    });
  };

  return (
    <div className="min-h-[80vh] py-4 sm:py-6 px-4 sm:px-6 max-w-3xl mx-auto grid-dot-pattern">
      <div className="bg-white rounded-3xl shadow-elevated border border-slate-200 p-5 sm:p-7 relative">
        
        {/* Step Progress Indicator */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
            <span>Fast-Track Candidate Setup</span>
            <span className="text-blue-700 font-extrabold">Step {step} of 4</span>
          </div>

          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-blue-600 h-full rounded-full transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            ></div>
          </div>

          <div className="grid grid-cols-4 text-xs font-bold text-slate-700 mt-2 text-center">
            <span className={step >= 1 ? 'text-blue-700 font-extrabold' : 'text-slate-500'}>1. Resume / CV</span>
            <span className={step >= 2 ? 'text-blue-700 font-extrabold' : 'text-slate-500'}>2. Target Role</span>
            <span className={step >= 3 ? 'text-blue-700 font-extrabold' : 'text-slate-500'}>3. Universal Fields</span>
            <span className={step >= 4 ? 'text-blue-700 font-extrabold' : 'text-slate-500'}>4. Live Matches</span>
          </div>
        </div>

        {/* ================= STEP 1: RESUME & CREDENTIALS ================= */}
        {step === 1 && (
          <div className="space-y-4 sm:space-y-5">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold mb-1.5">
                <FileText className="w-3.5 h-3.5 text-blue-600" />
                <span>STEP 1: YOUR RESUME & CREDENTIALS</span>
              </div>
              <h2 className="text-2xl font-black text-slate-900">
                How would you like to start?
              </h2>
              <p className="text-xs text-slate-800 font-medium mt-1">
                Upload your existing resume for instant auto-fill, or choose how you'd like us to prepare one for you.
              </p>
            </div>

            {/* TOP OPTION: Upload Existing CV */}
            <div 
              onClick={() => {
                if (!uploadedResume) {
                  setIsSimulatingUpload(true);
                  setTimeout(() => {
                    setUploadedResume({
                      name: 'Juan_DelaCruz_Resume.pdf',
                      size: '148 KB',
                      parsedSkills: ['React 18', 'TypeScript', 'Node.js', 'REST APIs']
                    });
                    setCvChoice('uploaded');
                    setIsSimulatingUpload(false);
                  }, 400);
                } else {
                  setCvChoice('uploaded');
                }
              }}
              className={`p-5 sm:p-6 rounded-2xl border-2 border-dashed transition-all cursor-pointer text-center ${
                cvChoice === 'uploaded'
                  ? 'border-blue-600 bg-blue-100/60 ring-2 ring-blue-500/20'
                  : 'border-blue-300 hover:border-blue-500 bg-blue-50/50 hover:bg-blue-50/80'
              }`}
            >
              <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center mx-auto mb-2.5 shadow-md">
                <UploadCloud className="w-6 h-6" />
              </div>

              <h3 className="text-sm sm:text-base font-black text-slate-900">
                Upload Existing CV (PDF or Word)
              </h3>
              <p className="text-xs text-slate-700 font-semibold mt-1">
                Already have a resume? Upload for instant 5-second auto-fill
              </p>

              {isSimulatingUpload && (
                <div className="mt-3 flex items-center justify-center gap-2 text-xs font-bold text-blue-700">
                  <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  <span>Parsing CV credentials...</span>
                </div>
              )}

              {uploadedResume && !isSimulatingUpload && (
                <div className="mt-3.5 p-3 bg-white rounded-xl border border-emerald-300 shadow-xs flex items-center justify-between text-left max-w-md mx-auto">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-black text-slate-900">{uploadedResume.name}</p>
                      <p className="text-[11px] text-slate-600 font-semibold">{uploadedResume.size} • Verified ✓</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    Ready to Auto-Fill
                  </span>
                </div>
              )}

              {!uploadedResume && !isSimulatingUpload && (
                <p className="text-[11px] text-slate-600 font-medium mt-2">
                  Accepted formats: PDF or DOCX (Max 10MB)
                </p>
              )}
            </div>

            {/* DIVIDER: OR */}
            <div className="relative flex items-center justify-center">
              <div className="border-t border-slate-300 w-full"></div>
              <span className="bg-white px-3 text-xs font-black text-slate-600 tracking-wider shrink-0 uppercase">
                OR
              </span>
              <div className="border-t border-slate-300 w-full"></div>
            </div>

            {/* BOTTOM SECTION: Don't have an updated CV ready? */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-3">
              <h3 className="text-sm font-black text-slate-900">
                Don't have an updated CV ready?
              </h3>

              {/* Informational Callout */}
              <div className="p-3.5 rounded-xl bg-amber-50/90 border border-amber-200 flex items-start gap-2.5 text-xs">
                <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <p className="text-slate-800 font-semibold leading-relaxed">
                  A Resume File is <strong className="text-slate-950 font-black">100% Mandatory</strong> across every single <strong className="text-slate-950 font-black">Applicant Tracking System (ATS)</strong>. We cannot dispatch your Application to any employer without an attached CV file.
                </p>
              </div>

              <p className="text-xs font-black text-slate-800">
                You have two options:
              </p>

              {/* Option A & Option B Buttons */}
              <div className="grid grid-cols-1 gap-2.5">
                
                {/* Option A */}
                <div
                  onClick={() => setCvChoice('choice_a')}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                    cvChoice === 'choice_a'
                      ? 'border-blue-600 bg-blue-50/90 ring-2 ring-blue-500/30'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-xs font-black text-slate-900">
                          Option A: Build one now with our Resume Builder in 5 minutes
                        </p>
                        <span className="text-[10px] font-black uppercase tracking-wider bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                          Candidate Resume Studio
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-700 font-medium mt-0.5">
                        Interactive guided builder with real-time document preview and automated ATS bullet optimization.
                      </p>

                      {/* Attached badge if built */}
                      {uploadedResume && cvChoice === 'choice_a' && (
                        <div className="mt-2.5 p-2 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span className="text-xs font-black text-emerald-950">
                              {uploadedResume.name} (Ready & Attached)
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowResumeBuilderModal(true);
                            }}
                            className="text-[11px] font-black text-blue-700 hover:text-blue-900 underline cursor-pointer"
                          >
                            Edit in Studio
                          </button>
                        </div>
                      )}

                      {/* Launch Button when selected and not yet attached */}
                      {(!uploadedResume || cvChoice !== 'choice_a') && cvChoice === 'choice_a' && (
                        <div className="mt-2.5">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowResumeBuilderModal(true);
                            }}
                            className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs rounded-lg transition-all inline-flex items-center gap-1.5 shadow-xs cursor-pointer active:scale-95"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                            <span>Launch Candidate Resume Studio ⚡</span>
                          </button>
                        </div>
                      )}
                    </div>

                    {cvChoice === 'choice_a' && (
                      <span className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-black shrink-0 ml-2">
                        ✓
                      </span>
                    )}
                  </div>
                </div>

                {/* Option B */}
                <button
                  type="button"
                  onClick={() => setCvChoice('choice_b')}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    cvChoice === 'choice_b'
                      ? 'border-blue-600 bg-blue-50/90 ring-2 ring-blue-500/30'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs font-black text-slate-900">
                        Option B: Build one together as we complete your onboarding questions
                      </p>
                      <p className="text-[11px] text-slate-700 font-medium mt-0.5">
                        Answer your career, role, and clearance questions—we compile your ATS resume automatically.
                      </p>
                    </div>
                    {cvChoice === 'choice_b' && (
                      <span className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-black shrink-0">
                        ✓
                      </span>
                    )}
                  </div>
                </button>

              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-2 flex items-center justify-between">
              <span className="text-[11px] text-slate-700 font-bold">
                {cvChoice === 'uploaded' && '✓ CV attached for auto-fill'}
                {cvChoice === 'choice_a' && (uploadedResume ? '✓ Studio Resume Attached' : 'Selected: Option A (Resume Builder)')}
                {cvChoice === 'choice_b' && 'Selected: Option B (Build Together as We Go)'}
                {!cvChoice && 'Select an option above to proceed'}
              </span>

              <button
                type="button"
                disabled={!cvChoice}
                onClick={() => {
                  if (cvChoice === 'choice_a' && !uploadedResume) {
                    setShowResumeBuilderModal(true);
                  } else {
                    setStep(2);
                  }
                }}
                className={`px-5 py-2.5 font-extrabold rounded-xl text-xs sm:text-sm transition-all flex items-center gap-2 shadow-md cursor-pointer ${
                  cvChoice 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white active:scale-95' 
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                }`}
              >
                <span>{cvChoice === 'choice_a' && !uploadedResume ? 'Launch Resume Studio' : 'Continue'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 2: TARGET ROLE & DOMAIN ================= */}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold mb-1.5">
                <Briefcase className="w-3.5 h-3.5 text-blue-600" />
                <span>STEP 2: CAREER FOCUS</span>
              </div>
              <h2 className="text-2xl font-black text-slate-900">
                What role are you targeting next?
              </h2>
              <p className="text-xs text-slate-800 font-medium mt-1">
                Our matching engine monitors direct career portals across the Philippines twice daily. Tell us what to watch for.
              </p>
            </div>

            {/* Target Job Title Input */}
            <div>
              <label className="block text-xs font-black text-slate-900 mb-1.5">
                Target Job Title:
              </label>
              <div className="relative">
                <Briefcase className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  placeholder="e.g. Senior Frontend / Full-Stack Engineer, BPO Team Lead, Account Executive"
                  className="w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none font-medium text-slate-900 placeholder:text-slate-500"
                />
              </div>
            </div>

            {/* Industry / Category Selection (Multi-Select) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-black text-slate-900">
                  Industry & Functional Domain:
                </label>
                <span className="text-[11px] text-blue-700 font-bold">
                  {targetCategories.includes('all') ? 'Open to All Domains' : `${targetCategories.length} selected (multi-select)`}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {CATEGORIES.map((cat) => {
                  const isSelected = targetCategories.includes(cat.id);
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => toggleCategory(cat.id)}
                      className={`p-2 sm:p-2.5 rounded-2xl border text-left transition-all cursor-pointer relative ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50/80 shadow-xs ring-2 ring-blue-500/20'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-1.5">
                        <p className={`text-xs font-bold leading-snug ${isSelected ? 'text-blue-950 font-black' : 'text-slate-900'}`}>
                          {cat.label}
                        </p>
                        {isSelected && (
                          <span className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5 shadow-xs">
                            ✓
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-600 font-semibold mt-0.5">{cat.count}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Seniority Level */}
            <div>
              <label className="block text-xs font-black text-slate-900 mb-1.5">
                Seniority Level:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 sm:gap-2">
                {SENIORITY_LEVELS.map((lvl) => (
                  <button
                    key={lvl.id}
                    type="button"
                    onClick={() => setSeniority(lvl.id)}
                    className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                      seniority === lvl.id
                        ? 'border-blue-600 bg-blue-600 text-white font-black shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-white text-slate-800 font-bold'
                    }`}
                  >
                    <p className="text-xs">{lvl.label}</p>
                    <p className={`text-[11px] font-semibold mt-0.5 ${seniority === lvl.id ? 'text-blue-100' : 'text-slate-600'}`}>
                      {lvl.exp}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-extrabold rounded-xl text-xs sm:text-sm transition-all flex items-center gap-2 shadow-md cursor-pointer"
              >
                <span>Continue to Universal Fields</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 3: PARETO 6 UNIVERSAL ASTERISK FIELDS ================= */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold mb-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>STEP 3: UNIVERSAL ATS CLEARANCE</span>
              </div>
              <h2 className="text-2xl font-black text-slate-900">
                The Universal Asterisk Fields
              </h2>
              <p className="text-xs text-slate-700 mt-1">
                Corporate career portals (Greenhouse, Lever, Workday) always mandate these 6 answers. Fill them once here, and your applications will never get stuck.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* 1. Monthly Salary Floor */}
              <div>
                <label className="block text-xs font-black text-slate-900 mb-1 flex items-center justify-between">
                  <span>1. Expected Monthly Salary Floor (₱): *</span>
                  <span className="text-[11px] text-slate-600 font-semibold">Never disclosed to peers</span>
                </label>
                <div className="relative">
                  <DollarSign className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={salaryFloor}
                    onChange={(e) => setSalaryFloor(e.target.value)}
                    placeholder="e.g. ₱160,000 / mo"
                    className="w-full pl-10 pr-3 py-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none font-medium text-slate-900 placeholder:text-slate-500"
                  />
                </div>
              </div>

              {/* 2. Notice Period */}
              <div>
                <label className="block text-xs font-black text-slate-900 mb-1">
                  2. Notice Period / Availability: *
                </label>
                <div className="relative">
                  <Clock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <select
                    value={noticePeriod}
                    onChange={(e) => setNoticePeriod(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white font-medium text-slate-900"
                  >
                    <option value="Immediate / Available Now">Immediate / Available Now</option>
                    <option value="15 Days">15 Days</option>
                    <option value="30 Days">30 Days (Standard Philippine Corporate)</option>
                    <option value="60 Days">60 Days</option>
                  </select>
                </div>
              </div>

              {/* 3. Work Authorization */}
              <div>
                <label className="block text-xs font-black text-slate-900 mb-1">
                  3. Philippine Work Authorization: *
                </label>
                <div className="relative">
                  <Flag className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <select
                    value={workAuth}
                    onChange={(e) => setWorkAuth(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white font-medium text-slate-900"
                  >
                    <option value="Filipino Citizen">Filipino Citizen (Default)</option>
                    <option value="Dual Citizen">Dual Citizen (PH / Other)</option>
                    <option value="Foreign National with PH Work Visa">Foreign National (Valid PH Visa)</option>
                  </select>
                </div>
              </div>

              {/* 4. Preferred Setup */}
              <div>
                <label className="block text-xs font-black text-slate-900 mb-1">
                  4. Preferred Work Setup & Hub: *
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <select
                    value={preferredSetup}
                    onChange={(e) => setPreferredSetup(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white font-medium text-slate-900"
                  >
                    <option value="Hybrid • BGC / Makati / Remote">Hybrid • BGC / Makati / Remote</option>
                    <option value="Fully Remote (PH or Worldwide)">Fully Remote (PH or Worldwide)</option>
                    <option value="Ortigas / Pasig / Mandaluyong">Ortigas / Pasig / Mandaluyong</option>
                    <option value="Alabang / Muntinlupa Hub">Alabang / Muntinlupa Hub</option>
                    <option value="Open to Any Setup">Open to Any Setup</option>
                  </select>
                </div>
              </div>

              {/* 5. Highest Educational Attainment */}
              <div>
                <label className="block text-xs font-black text-slate-900 mb-1">
                  5. Highest Educational Attainment: *
                </label>
                <div className="relative">
                  <GraduationCap className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <select
                    value={education}
                    onChange={(e) => setEducation(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white font-medium text-slate-900"
                  >
                    <option value="Bachelor's Degree">Bachelor's Degree (College Graduate)</option>
                    <option value="Master's Degree">Master's Degree</option>
                    <option value="Doctorate / PhD">Doctorate / PhD</option>
                    <option value="College Undergraduate">College Undergraduate</option>
                  </select>
                </div>
              </div>

              {/* 6. Application Contact Email */}
              <div>
                <label className="block text-xs font-black text-slate-900 mb-1 flex items-center justify-between">
                  <span>6. Application Contact Email: *</span>
                  <span className="text-[11px] text-blue-700 font-extrabold">Zero Middleman</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="juan.delacruz@email.com"
                    className="w-full pl-10 pr-3 py-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none font-medium text-slate-900 placeholder:text-slate-500"
                  />
                </div>
                <p className="text-xs text-slate-700 font-medium mt-1">
                  Employers reply directly to this inbox — we never intercept your communications.
                </p>
              </div>

            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={() => setStep(4)}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-extrabold rounded-xl text-sm transition-all flex items-center gap-2 shadow-md cursor-pointer"
              >
                <Zap className="w-4 h-4 text-amber-300" />
                <span>Run Matching Engine</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 4: LIVE TELEMETRY SCAN & CELEBRATION ================= */}
        {step === 4 && (
          <div className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold mb-2">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>MATCHING ENGINE TELEMETRY</span>
              </div>
              <h2 className="text-2xl font-black text-slate-900">
                {isScanningComplete ? '🎉 18 High-Match Roles Found!' : 'Scanning 15,443+ Philippine Job Portals...'}
              </h2>
              <p className="text-xs text-slate-700 mt-1">
                {isScanningComplete 
                  ? 'We have matched your profile against live employer career portals with 60%+ qualification compatibility.'
                  : 'Matching your Pareto 6 criteria and skills against fresh roles posted in the last 14 days.'}
              </p>
            </div>

            {/* Live Telemetry Progress Bar */}
            <div className="p-6 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-blue-900">
                <span className="flex items-center gap-2">
                  {!isScanningComplete && (
                    <div className="w-3.5 h-3.5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  )}
                  {telemetryStage}
                </span>
                <span>{telemetryProgress}%</span>
              </div>

              <div className="w-full bg-blue-200 h-2.5 rounded-full overflow-hidden">
                <div 
                  className="bg-blue-600 h-full rounded-full transition-all duration-300"
                  style={{ width: `${telemetryProgress}%` }}
                ></div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                <span>Direct ATS Portals: Greenhouse • Lever • Workday • Ashby</span>
                <span className="font-bold text-slate-700">14-Day Freshness Filter</span>
              </div>
            </div>

            {/* Celebration Preview of Top Matches */}
            {isScanningComplete && (
              <div className="space-y-3 animate-in fade-in slide-in-from-bottom-3 duration-300">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                    Top Verified Roles Ready for You:
                  </span>
                  <span className="text-xs font-bold text-blue-600">Showing 60%+ matches</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  
                  {/* Match 1: Maya */}
                  <div className="p-4 rounded-2xl bg-white border border-emerald-200 shadow-xs relative">
                    <span className="absolute top-3 right-3 text-[10px] font-black bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                      98% Match
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white font-black text-sm flex items-center justify-center mb-2.5">
                      M
                    </div>
                    <p className="text-xs font-black text-slate-900 truncate">Senior React Developer</p>
                    <p className="text-[11px] font-bold text-emerald-700">Maya</p>
                    <p className="text-[11px] text-slate-700 font-semibold mt-1 truncate">₱180,000 – ₱240,000 / mo</p>
                  </div>

                  {/* Match 2: Coins.ph */}
                  <div className="p-4 rounded-2xl bg-white border border-blue-200 shadow-xs relative">
                    <span className="absolute top-3 right-3 text-[10px] font-black bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                      94% Match
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-blue-600 text-white font-black text-sm flex items-center justify-center mb-2.5">
                      C
                    </div>
                    <p className="text-xs font-black text-slate-900 truncate">Lead Web App Engineer</p>
                    <p className="text-[11px] font-bold text-blue-700">Coins.ph</p>
                    <p className="text-[11px] text-slate-700 font-semibold mt-1 truncate">₱200,000 – ₱260,000 / mo</p>
                  </div>

                  {/* Match 3: Canva */}
                  <div className="p-4 rounded-2xl bg-white border border-cyan-200 shadow-xs relative">
                    <span className="absolute top-3 right-3 text-[10px] font-black bg-cyan-100 text-cyan-800 px-2 py-0.5 rounded-full">
                      89% Match
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-cyan-600 text-white font-black text-sm flex items-center justify-center mb-2.5">
                      CA
                    </div>
                    <p className="text-xs font-black text-slate-900 truncate">Frontend Platform Dev</p>
                    <p className="text-[11px] font-bold text-cyan-700">Canva Manila</p>
                    <p className="text-[11px] text-slate-700 font-semibold mt-1 truncate">₱170,000 – ₱230,000 / mo</p>
                  </div>

                </div>

                <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 flex items-center gap-2.5 text-xs text-amber-900 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  <span>
                    Your <strong>₱50 Welcome Balance</strong> is ready — your 1st application is 100% on us!
                  </span>
                </div>
              </div>
            )}

            {/* Big Primary CTA: "See My Matches" */}
            <div className="pt-4 flex justify-end">
              <button
                type="button"
                disabled={!isScanningComplete}
                onClick={handleFinishOnboarding}
                className={`w-full sm:w-auto px-8 py-4 text-white font-extrabold rounded-2xl text-base transition-all flex items-center justify-center gap-2.5 shadow-xl ${
                  isScanningComplete
                    ? 'bg-blue-600 hover:bg-blue-700 active:scale-95 cursor-pointer'
                    : 'bg-slate-300 cursor-not-allowed'
                }`}
              >
                <span>See My Matches</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* CANDIDATE.ph Resume Studio Modal (Option A) */}
        <ResumeBuilderModal
          isOpen={showResumeBuilderModal}
          onClose={() => setShowResumeBuilderModal(false)}
          candidateName={initialName || 'Juan Dela Cruz'}
          candidateEmail={contactEmail || initialEmail || 'juan.delacruz@email.com'}
          onAttachResume={handleResumeBuilt}
        />

      </div>
    </div>
  );
}
