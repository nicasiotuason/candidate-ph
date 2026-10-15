export const INITIAL_USER = {
  id: "usr_01",
  name: "Juan Dela Cruz",
  email: "juan.delacruz@email.com",
  phone: "+63 917 123 4567",
  age: 28,
  birthdate: "1998-05-14",
  citizenship: "Filipino Citizen",
  headline: "Senior Frontend Engineer & React Specialist",
  targetRole: "Senior Frontend / Full-Stack Engineer",
  targetCategory: "tech",
  seniority: "senior",
  experienceYears: 6,
  desiredSalary: "₱160,000 / mo",
  salaryFloor: "₱160,000 / mo",
  noticePeriod: "30 Days (Standard Philippine Corporate)",
  education: "Bachelor's Degree (Computer Science)",
  setupPreference: "Hybrid • BGC / Makati / Remote",
  walletBalance: 250, // ₱250 = 5 applications (with welcome balance)
  profileStrength: 85,
  isPaused: false,
  lastActive: "Just now",
  skills: [
    "React 18",
    "TypeScript",
    "Next.js SSR",
    "Tailwind CSS",
    "Node.js",
    "REST APIs",
    "Payments Integration",
    "State Management",
    "Git",
    "UI/UX Design Systems"
  ],
  summary: "Results-driven Frontend Engineer with 6+ years specializing in high-performance React and Next.js web applications in fintech and e-commerce. Proven track record building secure checkout flows and scalable design systems.",
  resumeFileName: "Juan_DelaCruz_Senior_Frontend_Resume.pdf",
  isOnboarded: true
};

export const MOCK_JOBS = [
  {
    id: "job_01",
    company: "Maya",
    industry: "Fintech",
    logoText: "M",
    logoColor: "bg-emerald-600",
    title: "Senior React Developer",
    salary: "₱180,000 – ₱240,000 / mo",
    setup: "Hybrid • BGC, Taguig",
    portal: "Greenhouse",
    portalBadge: "SEAMLESS",
    postedHeader: "Posted 1h 18m ago • First Review Batch",
    liveSinceHours: 1.3,
    matchPercentage: 98,
    companyDescription: "Maya is the #1 digital bank and payments ecosystem in the Philippines, powering millions of users and enterprise merchants.",
    jobDescription: "Lead the frontend architecture for next-generation consumer merchant wallets and checkout modules using React 18, TypeScript, and micro-frontends.",
    coreCount: "4/4 core requirements met",
    matchingSkills: [
      "React 18 + TypeScript",
      "Next.js SSR",
      "Payments domain",
      "Design systems"
    ],
    optionalSkills: ["GraphQL", "Micro-frontends"],
    referralHeadline: "2 Insider Referral Contacts Available",
    referralSubtext: "Ex-colleagues in your network at Maya",
    avatars: [
      { text: "JC", bg: "bg-blue-100 text-blue-800" },
      { text: "AR", bg: "bg-orange-100 text-orange-800" }
    ],
    estQueue: "Early Bird Batch (< 25 applicants)"
  },
  {
    id: "job_02",
    company: "Coins.ph",
    industry: "Crypto & Payments",
    logoText: "C",
    logoColor: "bg-blue-600",
    title: "Lead Web Application Engineer",
    salary: "₱200,000 – ₱260,000 / mo",
    setup: "Fully Remote (PH)",
    portal: "Lever",
    portalBadge: "DIRECT ATS",
    postedHeader: "Posted 42m ago • Early Bird Window",
    liveSinceHours: 0.7,
    matchPercentage: 94,
    companyDescription: "Coins.ph is Southeast Asia's leading fiat and crypto wallet platform serving over 18 million verified Filipino users.",
    jobDescription: "Architect high-reliability financial interfaces, real-time order books, and Web3 authentication dashboards with sub-second responsiveness.",
    coreCount: "4/4 core requirements met",
    matchingSkills: [
      "React 18",
      "TypeScript",
      "REST APIs",
      "State Management"
    ],
    optionalSkills: ["WebSockets", "Ethers.js"],
    referralHeadline: "1 Senior Tech Lead Connection",
    referralSubtext: "UP Diliman Alumni connection",
    avatars: [
      { text: "MP", bg: "bg-violet-100 text-violet-800" }
    ],
    estQueue: "Early Bird Batch (< 15 applicants)"
  },
  {
    id: "job_03",
    company: "Canva Philippines",
    industry: "Visual Communications",
    logoText: "CA",
    logoColor: "bg-cyan-600",
    title: "Frontend Platform Engineer",
    salary: "₱170,000 – ₱230,000 / mo",
    setup: "Hybrid • Makati City",
    portal: "Workday",
    portalBadge: "VERIFIED",
    postedHeader: "Posted 3h ago • First Review Batch",
    liveSinceHours: 3.1,
    matchPercentage: 89,
    companyDescription: "Empowering the world to design. Canva Manila is a vibrant product engineering hub developing global design features.",
    jobDescription: "Build component libraries, canvas rendering utilities, and collaborative editing tools used daily by 150M+ active creators worldwide.",
    coreCount: "3/4 core requirements met",
    matchingSkills: [
      "TypeScript",
      "UI/UX Design Systems",
      "React 18"
    ],
    optionalSkills: ["WebGL / Canvas API", "WebAssembly"],
    referralHeadline: "3 Canva Manila Connections",
    referralSubtext: "Former teammates from DLSU network",
    avatars: [
      { text: "KL", bg: "bg-amber-100 text-amber-800" },
      { text: "TN", bg: "bg-pink-100 text-pink-800" },
      { text: "RM", bg: "bg-emerald-100 text-emerald-800" }
    ],
    estQueue: "First Review Batch"
  },
  {
    id: "job_04",
    company: "Sprout Solutions",
    industry: "SaaS & HR Tech",
    logoText: "S",
    logoColor: "bg-emerald-500",
    title: "Senior Full-Stack Developer",
    salary: "₱140,000 – ₱190,000 / mo",
    setup: "Hybrid • Ortigas / Pasig",
    portal: "Greenhouse",
    portalBadge: "FAST-TRACK",
    postedHeader: "Posted 5h ago • High Match Pool",
    liveSinceHours: 5.2,
    matchPercentage: 84,
    companyDescription: "Sprout Solutions is the premier B2B HR, payroll, and benefits software suite for Philippine enterprises.",
    jobDescription: "Develop seamless employee management dashboards, automated biometric clock-in integrations, and real-time payroll calculation engines.",
    coreCount: "3/4 core requirements met",
    matchingSkills: [
      "React 18",
      "Node.js",
      "Tailwind CSS",
      "REST APIs"
    ],
    optionalSkills: ["PostgreSQL", "Docker"],
    referralHeadline: "1 HR Tech Recruiter Link",
    referralSubtext: "Active Sprout talent partner",
    avatars: [
      { text: "GV", bg: "bg-indigo-100 text-indigo-800" }
    ],
    estQueue: "Standard Review Batch"
  },
  {
    id: "job_05",
    company: "Voyage Digital",
    industry: "E-Commerce Logistics",
    logoText: "V",
    logoColor: "bg-indigo-600",
    title: "React & Mobile Web Specialist",
    salary: "₱130,000 – ₱175,000 / mo",
    setup: "Remote (Manila Timezone)",
    portal: "Ashby",
    portalBadge: "SEAMLESS",
    postedHeader: "Posted 6h ago • Active Screening",
    liveSinceHours: 6.0,
    matchPercentage: 76,
    companyDescription: "High-growth logistics intelligence platform providing route optimization and warehouse telemetry across Southeast Asia.",
    jobDescription: "Build mobile-first Progressive Web Apps for dispatchers, live GPS fleet map dashboards, and driver performance portals.",
    coreCount: "3/4 core requirements met",
    matchingSkills: [
      "React 18",
      "Tailwind CSS",
      "State Management"
    ],
    optionalSkills: ["Leaflet / Mapbox", "PWA Offline"],
    referralHeadline: "Mutual connection on LinkedIn",
    referralSubtext: "Senior Engineering Manager",
    avatars: [
      { text: "DM", bg: "bg-blue-100 text-blue-800" }
    ],
    estQueue: "Standard Review Batch"
  },
  {
    id: "job_06",
    company: "Kumu",
    industry: "Social Entertainment",
    logoText: "K",
    logoColor: "bg-rose-500",
    title: "Frontend Interactive Engineer",
    salary: "₱120,000 – ₱160,000 / mo",
    setup: "Hybrid • Taguig",
    portal: "Lever",
    portalBadge: "DIRECT ATS",
    postedHeader: "Posted 8h ago",
    liveSinceHours: 8.5,
    matchPercentage: 71,
    companyDescription: "The leading Pinoy livestreaming app bringing global Filipino communities together with social audio, games, and streaming.",
    jobDescription: "Build dynamic web livestreaming viewers, virtual gifting checkout flows, and gamified community leaderboards.",
    coreCount: "2/4 core requirements met",
    matchingSkills: [
      "React 18",
      "Payments Integration"
    ],
    optionalSkills: ["WebRTC", "Socket.io", "Animation CSS"],
    referralHeadline: "1 Connection Available",
    referralSubtext: "Content Creator relations",
    avatars: [
      { text: "BC", bg: "bg-rose-100 text-rose-800" }
    ],
    estQueue: "Open Applicant Pool"
  },
  {
    id: "job_07",
    company: "FinTech Bay Manila",
    industry: "Digital Lending",
    logoText: "FB",
    logoColor: "bg-teal-600",
    title: "UI Engineer (Loan Servicing)",
    salary: "₱110,000 – ₱150,000 / mo",
    setup: "Hybrid • Alabang, Muntinlupa",
    portal: "Greenhouse",
    portalBadge: "SEAMLESS",
    postedHeader: "Posted 10h ago",
    liveSinceHours: 10.2,
    matchPercentage: 65,
    companyDescription: "Fast-growing consumer credit platform providing micro-loans and SME credit line financing.",
    jobDescription: "Design high-conversion customer loan application steps, KYC identity document verification widgets, and payment schedule tables.",
    coreCount: "2/4 core requirements met",
    matchingSkills: [
      "React 18",
      "REST APIs"
    ],
    optionalSkills: ["Formik / Zod", "Jest Unit Testing"],
    referralHeadline: "Alabang tech community contact",
    referralSubtext: "Founding engineer connection",
    avatars: [
      { text: "NT", bg: "bg-teal-100 text-teal-800" }
    ],
    estQueue: "Open Applicant Pool"
  },
  {
    id: "job_08",
    company: "Archipelago Cloud",
    industry: "DevOps & Cloud MSP",
    logoText: "AC",
    logoColor: "bg-sky-600",
    title: "Junior-to-Mid Frontend Developer",
    salary: "₱85,000 – ₱115,000 / mo",
    setup: "Fully Remote (PH)",
    portal: "Workday",
    portalBadge: "VERIFIED",
    postedHeader: "Posted 12h ago",
    liveSinceHours: 12.0,
    matchPercentage: 62,
    companyDescription: "AWS and GCP consulting partner supporting Philippine tech scale-ups with cloud security and cloud-native observability.",
    jobDescription: "Create internal monitoring portals, billing utilization dashboards, and alert notification interfaces.",
    coreCount: "2/4 core requirements met",
    matchingSkills: [
      "React 18",
      "Git"
    ],
    optionalSkills: ["AWS CloudWatch", "Python basics"],
    referralHeadline: "Direct recruiter email available",
    referralSubtext: "Technical Talent Acquisition",
    avatars: [
      { text: "PL", bg: "bg-sky-100 text-sky-800" }
    ],
    estQueue: "Open Applicant Pool"
  }
];

export const INITIAL_TESTIMONIALS = [
  {
    id: "t_01",
    author: "Bea Alcantara",
    role: "Frontend Engineer at Maya",
    date: "Yesterday",
    avatarBg: "bg-emerald-100 text-emerald-800",
    avatarText: "BA",
    comment: "I applied at 7:15 AM within 30 minutes of Maya posting the role. Recruiter emailed me directly by 2 PM! The ₱50 quick apply was the best investment I made."
  },
  {
    id: "t_02",
    author: "Kenneth Sy",
    role: "Full-Stack Dev at Coins.ph",
    date: "3 days ago",
    avatarBg: "bg-blue-100 text-blue-800",
    avatarText: "KS",
    comment: "Being able to tweak my resume bullets right before signing off and sending gave me total peace of mind. Landed the interview and signed my offer last Friday!"
  },
  {
    id: "t_03",
    author: "Patricia Gomez",
    role: "Product Designer in BGC",
    date: "5 days ago",
    avatarBg: "bg-orange-100 text-orange-800",
    avatarText: "PG",
    comment: "No endless forms or spam applications. It only showed jobs matching 60%+ of my stack, and the PayMongo reload with GCash took 10 seconds."
  }
];
