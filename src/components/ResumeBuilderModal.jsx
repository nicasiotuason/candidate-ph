import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Download, 
  Send, 
  Plus, 
  X, 
  Building2, 
  GraduationCap, 
  Wrench, 
  Award, 
  ChevronRight,
  HelpCircle,
  ShieldCheck,
  Check
} from 'lucide-react';

const SUGGESTED_ROLES = [
  'Customer Service Representative',
  'Technical Support Specialist',
  'Virtual Assistant',
  'Junior Frontend Developer',
  'Accountant / Bookkeeper',
  'Sales Development Rep',
  'Operations Associate'
];

const SUGGESTED_TOOL_CATEGORIES = {
  ai: {
    label: '✨ AI & Automation',
    tools: ['ChatGPT / Prompting', 'Claude (Anthropic)', 'OpenAI Codex / Copilot', 'Cursor AI', 'Midjourney', 'Zapier Automation']
  },
  creative: {
    label: '🎨 Design & Adobe',
    tools: ['Adobe Photoshop', 'Adobe Illustrator', 'Adobe InDesign', 'Premiere Pro', 'Figma', 'Canva', 'Meta Ads', 'Google Ads']
  },
  support: {
    label: '🎧 BPO & Ops',
    tools: ['Zendesk', 'Salesforce CRM', 'Microsoft Excel', 'Google Workspace', 'HubSpot', 'Jira', 'Slack', 'Shopify']
  },
  finance: {
    label: '📊 Finance & VA',
    tools: ['QuickBooks Online', 'Xero', 'Bookkeeping', 'Asana', 'Notion', 'Data Entry (50+ WPM)']
  }
};

const DEFAULT_SKILLS = [
  'Customer Communication',
  'Problem Resolution',
  'Fast Typing (50+ WPM)',
  'Active Listening',
  'CRM Management',
  'Team Collaboration'
];

export default function ResumeBuilderModal({ 
  isOpen, 
  onClose, 
  candidateName = 'Juan Dela Cruz', 
  candidateEmail = 'juan.delacruz@email.com',
  onAttachResume 
}) {
  if (!isOpen) return null;

  // Mode: 'experienced' | 'fresh_grad'
  const [expMode, setExpMode] = useState('experienced');

  // Phase 1 Stepper: 1: Role & Experience, 2: Duties & Polish, 3: Education, 4: Skills
  const [phase1Step, setPhase1Step] = useState(1);
  const [isPhase2Active, setIsPhase2Active] = useState(false);

  // Resume Data State
  const [roleTitle, setRoleTitle] = useState('Customer Service Representative');
  const [companyName, setCompanyName] = useState('Concentrix Philippines');
  const [duration, setDuration] = useState('2022 – Present');
  const [roughNotes, setRoughNotes] = useState('Handled inbound customer calls, resolved billing and tech issues, maintained customer satisfaction');
  const [polishedBullets, setPolishedBullets] = useState([
    'Handled inbound customer calls and inquiries with high first-call resolution rate.',
    'Assisted clients with billing inquiries, account troubleshooting, and technical escalations.',
    'Maintained high customer satisfaction (CSAT) ratings across all customer interactions.'
  ]);
  const [isPolishing, setIsPolishing] = useState(false);

  // Education
  const [degree, setDegree] = useState('BS in Business Administration');
  const [school, setSchool] = useState('Polytechnic University of the Philippines');
  const [gradYear, setGradYear] = useState('2022');

  // Skills
  const [skills, setSkills] = useState(DEFAULT_SKILLS);
  const [customSkillInput, setCustomSkillInput] = useState('');
  const [activeToolTab, setActiveToolTab] = useState('ai');

  // Phase 2: Engine Follow-up Assistant Conversation
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: 'engine',
      text: `Hello ${candidateName.split(' ')[0]}! Your baseline resume is generated on the right. Let's optimize it for ATS parsers: At ${companyName}, roughly what was your daily call or ticket volume?`
    }
  ]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // 0: volume, 1: tools, 2: awards
  const [userChatInput, setUserChatInput] = useState('');
  const [atsScore, setAtsScore] = useState(78); // climbs to 96%
  const [isEngineTyping, setIsEngineTyping] = useState(false);

  // Polish raw notes into high-impact action bullets
  const handlePolishNotes = () => {
    setIsPolishing(true);
    setTimeout(() => {
      let bullets = [];
      if (expMode === 'fresh_grad') {
        bullets = [
          `Collaborated on academic and capstone projects focused on ${roleTitle || 'core coursework'}, delivering project milestones ahead of schedule.`,
          `Applied strong theoretical foundations and research methodologies to solve real-world problem scenarios.`,
          `Presented analytical findings and deliverables to faculty panels with clear documentation and attention to detail.`
        ];
      } else {
        bullets = [
          `Managed day-to-day ${roleTitle.toLowerCase() || 'operational'} responsibilities at ${companyName || 'the organization'}, consistently meeting service level agreements (SLAs).`,
          `Resolved complex customer inquiries and technical troubleshooting requests with accuracy and empathy.`,
          `Coordinated with cross-functional team leads to streamline daily workflow efficiency and ensure compliance with internal standards.`
        ];
      }
      setPolishedBullets(bullets);
      setIsPolishing(false);
      setAtsScore(prev => Math.min(prev + 6, 96));
    }, 450);
  };

  const handleAddCustomSkill = (e) => {
    e?.preventDefault();
    if (customSkillInput.trim() && !skills.includes(customSkillInput.trim())) {
      setSkills([...skills, customSkillInput.trim()]);
      setCustomSkillInput('');
      setAtsScore(prev => Math.min(prev + 3, 96));
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  const handleAddToolToSkills = (toolName) => {
    if (!skills.includes(toolName)) {
      setSkills([...skills, toolName]);
    }
  };

  // Handle Assistant Follow-up Answers
  const handleAnswerAssistant = (answerText) => {
    if (!answerText.trim()) return;

    const newMsg = {
      id: Date.now(),
      sender: 'user',
      text: answerText
    };

    setChatMessages(prev => [...prev, newMsg]);
    setUserChatInput('');
    setIsEngineTyping(true);

    setTimeout(() => {
      if (currentQuestionIndex === 0) {
        // Question 1 answered: update bullet 1 with metric
        setPolishedBullets(prev => {
          const next = [...prev];
          next[0] = `Handled 45+ daily interactions (${answerText.trim()}), maintaining a 96% first-contact resolution rate and minimizing escalations.`;
          return next;
        });
        setAtsScore(88);

        setChatMessages(prev => [
          ...prev,
          {
            id: Date.now() + 1,
            sender: 'engine',
            text: `Perfect! I've updated your first bullet point with that metric on your resume. Next question: What specific software, platforms, or tools did you use on the job daily?`
          }
        ]);
        setCurrentQuestionIndex(1);
      } else if (currentQuestionIndex === 1) {
        // Question 2 answered: add tool to skills and bullet 2
        const toolList = answerText.trim();
        handleAddToolToSkills(toolList.split(/[,/]/)[0]?.trim() || toolList);
        
        setPolishedBullets(prev => {
          const next = [...prev];
          next[1] = `Utilized ${toolList} and internal CRM systems to document client interactions and track issues end-to-end.`;
          return next;
        });
        setAtsScore(94);

        setChatMessages(prev => [
          ...prev,
          {
            id: Date.now() + 1,
            sender: 'engine',
            text: `Awesome! ${toolList} has been added to your verified tools. One final boost: Did you receive any recognitions, metrics achievements, or special projects at ${companyName}?`
          }
        ]);
        setCurrentQuestionIndex(2);
      } else {
        // Question 3 answered
        setPolishedBullets(prev => {
          const next = [...prev];
          next[2] = `Recognized for high performance: ${answerText.trim()}, demonstrating consistent reliability and team contribution.`;
          return next;
        });
        setAtsScore(98);

        setChatMessages(prev => [
          ...prev,
          {
            id: Date.now() + 1,
            sender: 'engine',
            text: `Your resume is now 98% ATS-Optimized! The formatting is single-column, parser-certified, and ready for direct employer dispatch.`
          }
        ]);
        setCurrentQuestionIndex(3);
      }
      setIsEngineTyping(false);
    }, 600);
  };

  // Submit and Attach Resume
  const handleFinalAttach = () => {
    const generatedFileName = `${candidateName.replace(/\s+/g, '_')}_ATS_Resume.pdf`;
    onAttachResume({
      name: generatedFileName,
      size: '142 KB',
      parsedSkills: skills,
      resumeData: {
        candidateName,
        candidateEmail,
        roleTitle,
        companyName,
        duration,
        polishedBullets,
        degree,
        school,
        gradYear,
        skills,
        atsScore
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-slate-100 w-full max-w-7xl h-[94vh] rounded-3xl shadow-2xl border border-slate-300 flex flex-col overflow-hidden">
        
        {/* ================= MODAL TOP BAR ================= */}
        <div className="bg-white px-5 py-3.5 border-b border-slate-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-sm shadow-sm">
              C#1
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
                  Candidate <span className="text-blue-700">Resume Studio</span>
                </h2>
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full border border-blue-200">
                  <ShieldCheck className="w-3 h-3 text-blue-600" />
                  100% ATS Compliant Engine
                </span>
              </div>
              <p className="text-[11px] text-slate-700 font-semibold">
                High-speed 5-minute resume generator • Live real-time document preview
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* ATS Score Meter */}
            <div className="hidden sm:flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl">
              <span className="text-[11px] font-bold text-slate-700">ATS Readiness:</span>
              <div className="w-20 bg-slate-200 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${atsScore}%` }}
                ></div>
              </div>
              <span className="text-xs font-black text-emerald-700">{atsScore}%</span>
            </div>

            {/* Quick Finish Button */}
            <button
              type="button"
              onClick={handleFinalAttach}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-extrabold text-xs rounded-xl shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Attach & Continue</span>
            </button>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
              title="Close without saving"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ================= MAIN SPLIT VIEW ================= */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
          
          {/* ================= LEFT PANE: BUILDER & ASSISTANT (7 Cols) ================= */}
          <div className="lg:col-span-6 xl:col-span-7 bg-white border-r border-slate-200 flex flex-col h-full overflow-y-auto">
            
            {/* Phase Tabs / Switcher */}
            <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50/70 shrink-0">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 p-1 bg-slate-200/80 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setIsPhase2Active(false)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
                      !isPhase2Active 
                        ? 'bg-white text-blue-700 shadow-xs' 
                        : 'text-slate-700 hover:text-slate-900'
                    }`}
                  >
                    1. Core 4-Step Setup
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsPhase2Active(true)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1 cursor-pointer ${
                      isPhase2Active 
                        ? 'bg-white text-blue-700 shadow-xs' 
                        : 'text-slate-700 hover:text-slate-900'
                    }`}
                  >
                    <span>2. Engine Polish & Q&A</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded-full font-bold">
                      {atsScore}%
                    </span>
                  </button>
                </div>

                <div className="text-[11px] font-bold text-slate-700">
                  {!isPhase2Active ? `Step ${phase1Step} of 4` : 'Interactive Assistant'}
                </div>
              </div>
            </div>

            {/* Left Content Area */}
            <div className="p-4 sm:p-6 flex-1 overflow-y-auto space-y-6">

              {/* ---------------- PHASE 1: 4-STEP FAST SETUP ---------------- */}
              {!isPhase2Active && (
                <div className="space-y-5 animate-in fade-in duration-150">
                  
                  {/* Step 1: Status & Role */}
                  {phase1Step === 1 && (
                    <div className="space-y-4">
                      <div>
                        <span className="text-xs font-black text-blue-700 uppercase tracking-wider">Step 1: Career Baseline</span>
                        <h3 className="text-lg font-black text-slate-900 mt-0.5">
                          What is your current or target role?
                        </h3>
                        <p className="text-xs text-slate-700 font-medium mt-0.5">
                          Select your experience status and primary job title.
                        </p>
                      </div>

                      {/* Experience Mode Toggle */}
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setExpMode('experienced')}
                          className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                            expMode === 'experienced'
                              ? 'border-blue-600 bg-blue-50/80 ring-2 ring-blue-500/20'
                              : 'border-slate-200 hover:border-slate-300 bg-white'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <Building2 className="w-4 h-4 text-blue-600" />
                            <span className="text-xs font-black text-slate-900">I have Work Experience</span>
                          </div>
                          <p className="text-[11px] text-slate-700 font-medium mt-1">
                            BPO, Office, Tech, Sales, VA or Freelance
                          </p>
                        </button>

                        <button
                          type="button"
                          onClick={() => setExpMode('fresh_grad')}
                          className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                            expMode === 'fresh_grad'
                              ? 'border-blue-600 bg-blue-50/80 ring-2 ring-blue-500/20'
                              : 'border-slate-200 hover:border-slate-300 bg-white'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <GraduationCap className="w-4 h-4 text-emerald-600" />
                            <span className="text-xs font-black text-slate-900">Fresh Grad / Student</span>
                          </div>
                          <p className="text-[11px] text-slate-700 font-medium mt-1">
                            OJT, Academic Capstone, Campus Projects
                          </p>
                        </button>
                      </div>

                      {/* Role Title Input */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-black text-slate-800">
                          {expMode === 'experienced' ? 'Job Title / Role' : 'Target Role / Specialty'}
                        </label>
                        <input
                          type="text"
                          value={roleTitle}
                          onChange={(e) => setRoleTitle(e.target.value)}
                          placeholder="e.g. Customer Support Specialist, Junior Developer"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-xs sm:text-sm font-semibold text-slate-900 bg-white"
                        />
                        {/* Quick role pills */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {SUGGESTED_ROLES.slice(0, 4).map((role) => (
                            <button
                              key={role}
                              type="button"
                              onClick={() => setRoleTitle(role)}
                              className="text-[10px] font-bold bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200 transition-colors cursor-pointer"
                            >
                              + {role}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Company Name & Duration */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <label className="text-xs font-black text-slate-800">
                            {expMode === 'experienced' ? 'Company Name' : 'University / College'}
                          </label>
                          <input
                            type="text"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            placeholder={expMode === 'experienced' ? 'e.g. Concentrix, TaskUs, Accenture' : 'e.g. PUP, UST, DLSU'}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-xs sm:text-sm font-semibold text-slate-900 bg-white"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-black text-slate-800">Duration / Years</label>
                          <input
                            type="text"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            placeholder="e.g. 2022 – Present"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-xs sm:text-sm font-semibold text-slate-900 bg-white"
                          />
                        </div>
                      </div>

                      {/* Step 1 Next Button */}
                      <div className="pt-2 flex justify-end">
                        <button
                          type="button"
                          onClick={() => setPhase1Step(2)}
                          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                        >
                          <span>Next: Duties & Achievements</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Duties & Smart Polish */}
                  {phase1Step === 2 && (
                    <div className="space-y-4">
                      <div>
                        <span className="text-xs font-black text-blue-700 uppercase tracking-wider">Step 2: Experience & Duties</span>
                        <h3 className="text-lg font-black text-slate-900 mt-0.5">
                          What were your primary responsibilities?
                        </h3>
                        <p className="text-xs text-slate-700 font-medium mt-0.5">
                          Type rough notes. You don't need fancy words—our engine polishes them into ATS action bullets.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <textarea
                          rows={3}
                          value={roughNotes}
                          onChange={(e) => setRoughNotes(e.target.value)}
                          placeholder="e.g. handled customer tickets, helped angry callers, reached quota, used zendesk..."
                          className="w-full p-3.5 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-xs sm:text-sm font-medium text-slate-900 bg-white"
                        />

                        {/* Polish Button */}
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] text-slate-600 font-medium">
                            Rough notes automatically elevated to action verbs
                          </span>
                          <button
                            type="button"
                            onClick={handlePolishNotes}
                            disabled={isPolishing}
                            className="px-3.5 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 font-bold text-xs rounded-lg transition-all flex items-center gap-1.5 cursor-pointer"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                            <span>{isPolishing ? 'Polishing...' : '✨ Polish into ATS Bullets'}</span>
                          </button>
                        </div>
                      </div>

                      {/* Current Polished Bullets Preview */}
                      <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2">
                        <p className="text-[11px] font-black uppercase tracking-wider text-slate-700">
                          Current ATS Bullets (Live on Resume):
                        </p>
                        <div className="space-y-1.5">
                          {polishedBullets.map((bullet, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-xs text-slate-800 font-medium leading-relaxed">
                              <span className="text-blue-600 font-black">•</span>
                              <span>{bullet}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Navigation */}
                      <div className="pt-2 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => setPhase1Step(1)}
                          className="px-4 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl transition-all flex items-center gap-1 cursor-pointer"
                        >
                          <ArrowLeft className="w-3.5 h-3.5" />
                          <span>Back</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setPhase1Step(3)}
                          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                        >
                          <span>Next: Education</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Education */}
                  {phase1Step === 3 && (
                    <div className="space-y-4">
                      <div>
                        <span className="text-xs font-black text-blue-700 uppercase tracking-wider">Step 3: Education</span>
                        <h3 className="text-lg font-black text-slate-900 mt-0.5">
                          Where did you study?
                        </h3>
                        <p className="text-xs text-slate-700 font-medium mt-0.5">
                          Employers look for degree completion or highest educational attainment.
                        </p>
                      </div>

                      <div className="space-y-3">
                        <div className="space-y-1.5">
                          <label className="text-xs font-black text-slate-800">Degree or Certificate</label>
                          <input
                            type="text"
                            value={degree}
                            onChange={(e) => setDegree(e.target.value)}
                            placeholder="e.g. BS in Information Technology, High School Diploma"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-xs sm:text-sm font-semibold text-slate-900 bg-white"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="space-y-1.5">
                            <label className="text-xs font-black text-slate-800">College / University / School</label>
                            <input
                              type="text"
                              value={school}
                              onChange={(e) => setSchool(e.target.value)}
                              placeholder="e.g. PUP Manila, UST, Ateneo"
                              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-xs sm:text-sm font-semibold text-slate-900 bg-white"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-xs font-black text-slate-800">Graduation Year</label>
                            <input
                              type="text"
                              value={gradYear}
                              onChange={(e) => setGradYear(e.target.value)}
                              placeholder="e.g. 2022 or Expected 2025"
                              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-xs sm:text-sm font-semibold text-slate-900 bg-white"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Navigation */}
                      <div className="pt-2 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => setPhase1Step(2)}
                          className="px-4 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl transition-all flex items-center gap-1 cursor-pointer"
                        >
                          <ArrowLeft className="w-3.5 h-3.5" />
                          <span>Back</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setPhase1Step(4)}
                          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                        >
                          <span>Next: Core Skills</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 4: Skills */}
                  {phase1Step === 4 && (
                    <div className="space-y-4">
                      <div>
                        <span className="text-xs font-black text-blue-700 uppercase tracking-wider">Step 4: Verified Skills</span>
                        <h3 className="text-lg font-black text-slate-900 mt-0.5">
                          Select your top skills & competencies
                        </h3>
                        <p className="text-xs text-slate-700 font-medium mt-0.5">
                          ATS systems scan your skills section to match job descriptions.
                        </p>
                      </div>

                      {/* Custom Skill Input */}
                      <form onSubmit={handleAddCustomSkill} className="flex gap-2">
                        <input
                          type="text"
                          value={customSkillInput}
                          onChange={(e) => setCustomSkillInput(e.target.value)}
                          placeholder="Type a skill (e.g. Inbound Voice, Zendesk, Excel)..."
                          className="flex-1 px-3.5 py-2 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-xs sm:text-sm font-semibold text-slate-900 bg-white"
                        />
                        <button
                          type="submit"
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl flex items-center gap-1 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add</span>
                        </button>
                      </form>

                      {/* Active Skills List */}
                      <div className="space-y-2">
                        <p className="text-[11px] font-black uppercase tracking-wider text-slate-700">
                          Active Skills on Resume ({skills.length}):
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {skills.map((skill) => (
                            <span 
                              key={skill}
                              className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-900 border border-blue-200 rounded-full text-xs font-bold"
                            >
                              <span>{skill}</span>
                              <button
                                type="button"
                                onClick={() => handleRemoveSkill(skill)}
                                className="text-blue-500 hover:text-blue-800 transition-colors"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Suggested Tools Quick-Add with Category Switcher */}
                      <div className="pt-2 space-y-2">
                        <div className="flex items-center justify-between">
                          <p className="text-[11px] font-bold text-slate-700">Quick-Add Popular Tools & AI:</p>
                          <span className="text-[10px] text-blue-700 font-bold">Click category tab to switch</span>
                        </div>

                        {/* Category Tabs */}
                        <div className="flex flex-wrap gap-1">
                          {Object.entries(SUGGESTED_TOOL_CATEGORIES).map(([key, cat]) => (
                            <button
                              key={key}
                              type="button"
                              onClick={() => setActiveToolTab(key)}
                              className={`text-[10px] font-bold px-2 py-1 rounded-lg transition-all cursor-pointer ${
                                activeToolTab === key
                                  ? 'bg-blue-600 text-white shadow-xs'
                                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                              }`}
                            >
                              {cat.label}
                            </button>
                          ))}
                        </div>

                        {/* Tool Chips for active category */}
                        <div className="flex flex-wrap gap-1.5 p-2 bg-slate-50 rounded-xl border border-slate-200">
                          {SUGGESTED_TOOL_CATEGORIES[activeToolTab].tools.map((tool) => {
                            const isIncluded = skills.includes(tool);
                            return (
                              <button
                                key={tool}
                                type="button"
                                onClick={() => handleAddToolToSkills(tool)}
                                className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border transition-colors cursor-pointer ${
                                  isIncluded
                                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                    : 'bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-800 border-slate-200'
                                }`}
                              >
                                {isIncluded ? `✓ ${tool}` : `+ ${tool}`}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Navigation & Transition to Phase 2 */}
                      <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => setPhase1Step(3)}
                          className="px-4 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl transition-all flex items-center gap-1 cursor-pointer"
                        >
                          <ArrowLeft className="w-3.5 h-3.5" />
                          <span>Back</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setIsPhase2Active(true);
                            setAtsScore(prev => Math.max(prev, 84));
                          }}
                          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                        >
                          <span>Proceed to Engine Tuning (Q&A)</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}

                </div>
              )}

              {/* ---------------- PHASE 2: ENGINE FOLLOW-UP Q&A ---------------- */}
              {isPhase2Active && (
                <div className="space-y-4 animate-in fade-in duration-150 flex flex-col h-full">
                  
                  {/* Phase 2 Header Callout */}
                  <div className="p-3.5 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                          Candidate Resume Engine
                        </h4>
                        <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                          Live Auto-Populate
                        </span>
                      </div>
                      <p className="text-xs text-slate-700 font-medium mt-0.5">
                        Answer 2 quick questions to add verified metrics and software tools directly into your resume document.
                      </p>
                    </div>
                  </div>

                  {/* Chat Stream */}
                  <div className="space-y-3 min-h-[220px] max-h-[340px] overflow-y-auto p-1">
                    {chatMessages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        {msg.sender === 'engine' && (
                          <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                            C
                          </div>
                        )}
                        <div
                          className={`max-w-[85%] rounded-2xl p-3.5 text-xs font-semibold leading-relaxed ${
                            msg.sender === 'user'
                              ? 'bg-blue-600 text-white rounded-tr-xs'
                              : 'bg-slate-100 text-slate-900 border border-slate-200 rounded-tl-xs shadow-xs'
                          }`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    ))}

                    {isEngineTyping && (
                      <div className="flex items-center gap-2 text-xs font-bold text-blue-700 py-1">
                        <div className="w-3.5 h-3.5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                        <span>Engine updating resume bullets live...</span>
                      </div>
                    )}
                  </div>

                  {/* Contextual Quick-Reply Chips for Current Question */}
                  <div className="space-y-2 pt-2 border-t border-slate-200">
                    <p className="text-[11px] font-black text-slate-700 uppercase tracking-wider">
                      Quick Tap Responses:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {currentQuestionIndex === 0 && (
                        <>
                          <button
                            type="button"
                            onClick={() => handleAnswerAssistant('40–50 inbound calls per shift')}
                            className="text-xs font-bold bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
                          >
                            📞 40–50 calls/shift
                          </button>
                          <button
                            type="button"
                            onClick={() => handleAnswerAssistant('25–35 support tickets resolved daily')}
                            className="text-xs font-bold bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
                          >
                            ✉️ 25–35 tickets daily
                          </button>
                          <button
                            type="button"
                            onClick={() => handleAnswerAssistant('96% CSAT rating with 0 escalations')}
                            className="text-xs font-bold bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
                          >
                            ⭐ 96% CSAT rating
                          </button>
                        </>
                      )}

                      {currentQuestionIndex === 1 && (
                        <>
                          <button
                            type="button"
                            onClick={() => handleAnswerAssistant('Zendesk, Salesforce CRM, and MS Excel')}
                            className="text-xs font-bold bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
                          >
                            🛠️ Zendesk & Salesforce
                          </button>
                          <button
                            type="button"
                            onClick={() => handleAnswerAssistant('Google Workspace, Slack, and Jira')}
                            className="text-xs font-bold bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
                          >
                            💼 Google Workspace & Jira
                          </button>
                          <button
                            type="button"
                            onClick={() => handleAnswerAssistant('HubSpot CRM and Shopify Support')}
                            className="text-xs font-bold bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
                          >
                            🛒 HubSpot & Shopify
                          </button>
                        </>
                      )}

                      {currentQuestionIndex >= 2 && (
                        <>
                          <button
                            type="button"
                            onClick={() => handleAnswerAssistant('Awarded Top Quality Performer for Q3')}
                            className="text-xs font-bold bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
                          >
                            🏆 Top Quality Performer
                          </button>
                          <button
                            type="button"
                            onClick={() => handleAnswerAssistant('Maintained 100% Perfect Attendance award')}
                            className="text-xs font-bold bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
                          >
                            🕒 Perfect Attendance
                          </button>
                          <button
                            type="button"
                            onClick={() => handleAnswerAssistant('Promoted to Senior Representative')}
                            className="text-xs font-bold bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
                          >
                            🚀 Promoted in 6 months
                          </button>
                        </>
                      )}
                    </div>

                    {/* Chat Text Input */}
                    <form 
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleAnswerAssistant(userChatInput);
                      }} 
                      className="flex gap-2 pt-1"
                    >
                      <input
                        type="text"
                        value={userChatInput}
                        onChange={(e) => setUserChatInput(e.target.value)}
                        placeholder="Or type a custom reply or ask a question..."
                        className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-xs sm:text-sm font-semibold text-slate-900 bg-white"
                      />
                      <button
                        type="submit"
                        disabled={!userChatInput.trim()}
                        className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 text-white rounded-xl transition-all cursor-pointer"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </form>
                  </div>

                </div>
              )}

            </div>

            {/* Bottom Action Footer */}
            <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-xs font-bold text-slate-800">
                  Ready to attach to your profile ({atsScore}% ATS Score)
                </span>
              </div>

              <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-3.5 py-2 rounded-xl border border-slate-300 hover:bg-white text-slate-700 font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                  title="Print or save as PDF"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Download PDF</span>
                </button>

                <button
                  type="button"
                  onClick={handleFinalAttach}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-black text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Attach Resume & Proceed to Step 2</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

          {/* ================= RIGHT PANE: LIVE ATS DOCUMENT PREVIEW (5 Cols) ================= */}
          <div className="lg:col-span-6 xl:col-span-5 bg-slate-200/90 p-4 sm:p-6 overflow-y-auto flex flex-col items-center">
            
            <div className="w-full flex items-center justify-between mb-3 text-xs font-bold text-slate-700">
              <span className="flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-slate-600" />
                <span>Live ATS Paper Preview (Standard A4)</span>
              </span>
              <span className="text-[11px] font-black text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300">
                Verified Clean ATS Format
              </span>
            </div>

            {/* Simulated Clean Single-Column ATS Paper Document */}
            <div className="w-full max-w-lg bg-white rounded-lg shadow-xl border border-slate-300 p-6 sm:p-8 space-y-5 font-sans text-slate-900 transition-all duration-300 animate-in fade-in">
              
              {/* Header */}
              <div className="border-b-2 border-slate-900 pb-3 text-center sm:text-left">
                <h1 className="text-xl sm:text-2xl font-black text-slate-950 uppercase tracking-wide">
                  {candidateName}
                </h1>
                <p className="text-xs font-bold text-blue-700 mt-0.5 uppercase tracking-wider">
                  {roleTitle}
                </p>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-3 gap-y-1 text-[11px] font-medium text-slate-700 mt-1.5">
                  <span>{candidateEmail}</span>
                  <span>•</span>
                  <span>+63 917 XXX XXXX</span>
                  <span>•</span>
                  <span>Metro Manila, Philippines</span>
                </div>
              </div>

              {/* Summary Statement */}
              <div className="space-y-1">
                <h2 className="text-[11px] font-black text-slate-950 uppercase tracking-wider border-b border-slate-200 pb-0.5">
                  Professional Summary
                </h2>
                <p className="text-xs text-slate-800 leading-relaxed font-medium">
                  Results-driven {roleTitle} with proven competencies in {skills.slice(0, 3).join(', ')}. Demonstrated track record of operational excellence, team collaboration, and adherence to company standards at {companyName}.
                </p>
              </div>

              {/* Work Experience */}
              <div className="space-y-2">
                <h2 className="text-[11px] font-black text-slate-950 uppercase tracking-wider border-b border-slate-200 pb-0.5">
                  {expMode === 'experienced' ? 'Work Experience' : 'Projects & Internship Experience'}
                </h2>

                <div>
                  <div className="flex items-center justify-between text-xs font-black text-slate-900">
                    <span>{roleTitle}</span>
                    <span className="text-[11px] font-bold text-slate-600">{duration}</span>
                  </div>
                  <p className="text-xs font-bold text-slate-700 italic">
                    {companyName}
                  </p>

                  <div className="mt-2 space-y-1.5">
                    {polishedBullets.map((bullet, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-800 leading-snug">
                        <span className="text-slate-950 font-black mt-0.5">•</span>
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Education */}
              <div className="space-y-1">
                <h2 className="text-[11px] font-black text-slate-950 uppercase tracking-wider border-b border-slate-200 pb-0.5">
                  Education & Credentials
                </h2>
                <div className="flex items-center justify-between text-xs font-black text-slate-900">
                  <span>{degree}</span>
                  <span className="text-[11px] font-bold text-slate-600">{gradYear}</span>
                </div>
                <p className="text-xs font-semibold text-slate-700">
                  {school}
                </p>
              </div>

              {/* Core Competencies & Skills */}
              <div className="space-y-1.5">
                <h2 className="text-[11px] font-black text-slate-950 uppercase tracking-wider border-b border-slate-200 pb-0.5">
                  Core Skills & Technical Competencies
                </h2>
                <div className="flex flex-wrap gap-1 text-[11px] text-slate-800 font-semibold leading-relaxed">
                  {skills.map((skill, idx) => (
                    <span key={skill} className="bg-slate-100 text-slate-900 px-2 py-0.5 rounded border border-slate-200">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* ATS Parser Stamp */}
              <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-600 font-semibold">
                <span>Single-Column Standard Layout • UTF-8 Safe</span>
                <span className="text-emerald-700 font-bold">✓ 0 Parsing Errors</span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
