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
    industry: "Fintech & Digital Banking",
    logoText: "M",
    logoColor: "bg-emerald-600",
    title: "Senior React Developer",
    salary: "₱180,000 – ₱240,000 / mo",
    setup: "Hybrid • BGC, Taguig",
    portal: "Direct Employer ATS",
    portalBadge: "VERIFIED DIRECT",
    postedHeader: "Posted 1h 18m ago • First Review Batch",
    liveSinceHours: 1.3,
    matchPercentage: 98,
    companyDescription: "Maya is the #1 digital bank and payments ecosystem in the Philippines, powering millions of consumer wallets and enterprise merchants.",
    jobDescription: "Lead the frontend architecture for next-generation consumer merchant wallets, QR checkout modules, and financial dashboards using React 18, TypeScript, and micro-frontends.",
    aboutRole: "Maya is the undisputed leader in Philippine digital banking and consumer finance. We are expanding our Merchant & Consumer Checkout engineering squad in BGC. In this role, you will lead the frontend architecture for mission-critical web applications handling millions of daily financial transactions. You will partner with product designers, staff backend engineers, and compliance teams to ship robust, accessible, and ultra-responsive payment experiences.",
    responsibilities: [
      "Architect, develop, and maintain high-throughput React 18 & TypeScript web applications with strict SLAs for performance and uptime.",
      "Build modular micro-frontend components that integrate seamlessly across Maya Checkout, merchant settlement portals, and QR payments.",
      "Collaborate closely with UI/UX product designers and design system engineers to ensure WCAG 2.1 AA accessibility and brand consistency.",
      "Optimize Core Web Vitals (LCP < 1.8s, INP < 150ms) across mobile and desktop viewports under variable Philippine telecom network conditions.",
      "Author comprehensive unit, component, and integration tests using Vitest and React Testing Library maintaining > 85% coverage.",
      "Conduct rigorous code reviews, establish engineering best practices, and mentor mid-level and junior frontend developers.",
      "Partner with SecOps and compliance teams to ensure all client-side financial flows comply with PCI-DSS and BSP cybersecurity standards."
    ],
    qualifications: [
      "5+ years of production experience in frontend software engineering, with at least 3 years specialized in React and modern TypeScript.",
      "Deep understanding of modern state management, React Hooks, concurrency features, and SSR/SSG patterns (Next.js).",
      "Proven track record building secure, high-availability web applications with token management and REST/GraphQL APIs.",
      "Strong proficiency in modern CSS architectures, Tailwind CSS, responsive design, and cross-browser performance tuning.",
      "Solid experience with frontend build tooling (Vite, Webpack), CI/CD pipelines (GitHub Actions), and monitoring tools (Datadog/Sentry).",
      "Bachelor's degree in Computer Science, Information Technology, or equivalent practical industry experience."
    ],
    preferredQualifications: [
      "Previous domain experience in fintech, digital banking, payment gateways, or high-volume transactional e-commerce.",
      "Hands-on experience implementing micro-frontends (Module Federation) and design token architectures.",
      "Familiarity with containerized local development (Docker) and cloud deployments on AWS/GCP."
    ],
    benefits: [
      "Comprehensive HMO from Day 1 with ₱300,000 MBL covering you and up to 2 dependents.",
      "Competitive base salary (₱180,000 – ₱240,000 / mo) + guaranteed 14th-month pay and annual performance bonus.",
      "Hybrid work setup (2 days on-site in BGC, Taguig; 3 days work-from-home).",
      "₱35,000 annual tech & home-office allowance + brand new M3 MacBook Pro.",
      "₱30,000 annual learning and certification budget (AWS, React Summit, O'Reilly).",
      "20 days paid annual leave + 10 days sick leave with cash conversion."
    ],
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
    industry: "Crypto & Financial Technology",
    logoText: "C",
    logoColor: "bg-blue-600",
    title: "Lead Web Application Engineer",
    salary: "₱200,000 – ₱260,000 / mo",
    setup: "Fully Remote (PH)",
    portal: "Direct ATS Queue",
    portalBadge: "DIRECT ATS",
    postedHeader: "Posted 42m ago • Early Bird Window",
    liveSinceHours: 0.7,
    matchPercentage: 94,
    companyDescription: "Coins.ph is Southeast Asia's leading fiat and crypto wallet platform serving over 18 million verified Filipino users.",
    jobDescription: "Architect high-reliability financial interfaces, real-time order books, and Web3 authentication dashboards with sub-second responsiveness.",
    aboutRole: "Coins.ph is Southeast Asia's leading fiat and crypto wallet platform serving over 18 million verified Filipino users. We are expanding our core web engineering division to architect our next-generation exchange interface, Web3 asset staking dashboards, and institutional trading desks. As a Lead Web Application Engineer, you will own the end-to-end technical roadmap for our web portal, championing code quality, sub-second latency, and state-of-the-art security.",
    responsibilities: [
      "Lead the frontend architectural design for Coins.ph web trading portals, real-time WebSocket order books, and KYC verification funnels.",
      "Implement real-time market data streaming with sub-50ms latency using WebSockets, Web Workers, and optimized rendering engines.",
      "Drive frontend engineering best practices, establishing reusable patterns for state management, caching, and error telemetry.",
      "Work with product leadership to scope, plan, and deliver quarterly technical roadmaps aligned with business milestones.",
      "Enforce rigorous security standards including CSP policies, biometric WebAuthn flows, and cryptographic key management.",
      "Mentor a squad of 6 frontend engineers through pair programming, 1-on-1 coaching, and structured architectural RFCs.",
      "Collaborate with backend engineers to define type-safe API contracts via OpenAPI / Protocol Buffers."
    ],
    qualifications: [
      "6+ years of professional web engineering experience with a demonstrated track record as a Senior or Lead Engineer.",
      "Expert-level mastery of JavaScript (ES2022+), TypeScript, React 18, and modern reactivity patterns.",
      "Extensive experience with WebSocket client architectures, data streaming, and managing high-frequency state updates.",
      "Deep understanding of browser rendering pipelines, memory leak profiling, and Web Performance APIs.",
      "Demonstrated technical leadership, code review rigor, and experience driving engineering standards across teams.",
      "Strong communication skills in both English and Filipino, with ability to articulate technical tradeoffs to non-engineers."
    ],
    preferredQualifications: [
      "Experience in crypto exchanges, fintech trading systems, or online brokerage platforms.",
      "Familiarity with Web3 wallets, Ethers.js / Wagmi, and blockchain RPC node interactions.",
      "Hands-on experience with modern testing frameworks (Playwright, Vitest) and trunk-based deployment."
    ],
    benefits: [
      "Top-tier HMO coverage from Day 1 for employee and immediate dependents (₱400,000 MBL).",
      "₱200,000 – ₱260,000 monthly compensation + token incentive pool + annual performance bonus.",
      "100% Fully Remote work model with optional hot-desking at partner hubs in BGC and Ortigas.",
      "₱40,000 one-time remote workstation setup grant + yearly internet subsidy (₱2,500/mo).",
      "Unlimited PTO policy with mandatory minimum 15 days wellness leave per year.",
      "Annual wellness stipend (gym, mental health, ergonomics) and company offsites."
    ],
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
    industry: "Visual Communications & SaaS",
    logoText: "CA",
    logoColor: "bg-cyan-600",
    title: "Frontend Platform Engineer",
    salary: "₱170,000 – ₱230,000 / mo",
    setup: "Hybrid • Makati City",
    portal: "Direct Company Portal",
    portalBadge: "VERIFIED DIRECT",
    postedHeader: "Posted 3h ago • First Review Batch",
    liveSinceHours: 3.1,
    matchPercentage: 89,
    companyDescription: "Empowering the world to design. Canva Manila is a vibrant product engineering hub developing global design features.",
    jobDescription: "Build component libraries, canvas rendering utilities, and collaborative editing tools used daily by 150M+ active creators worldwide.",
    aboutRole: "Canva's mission is to empower the whole world to design. Canva Manila is a key global product hub building core editing experiences used by over 170 million monthly active users across 190 countries. As a Frontend Platform Engineer on the Core Experience team in Makati, you will build foundational web infrastructure, reusable canvas components, and collaboration engines that power the world's most accessible design software.",
    responsibilities: [
      "Build and maintain high-performance frontend components and rendering primitives powering Canva's web design editor.",
      "Develop reusable design tokens and micro-interactions for Canva's global design system across web and desktop wrappers.",
      "Optimize client-side canvas rendering, DOM virtualizations, and asset loading to achieve smooth 60fps manipulation.",
      "Collaborate with UX designers in Sydney, London, and Manila to ship delight-driven features with high Polish standard.",
      "Instrument telemetry for real-time frontend performance metrics, crash reporting, and user interaction analytics.",
      "Write clean, self-documenting code with unit, visual regression, and end-to-end automated tests.",
      "Participate in on-call rotation schedules for web deployment pipeline health and critical release rollouts."
    ],
    qualifications: [
      "4+ years of hands-on frontend web engineering experience building production SaaS applications.",
      "Strong proficiency in TypeScript, React, modern web standards (HTML5/CSS3), and web browser APIs.",
      "Experience with complex client-side state, custom hooks, and component lifecycle optimizations.",
      "Demonstrated eye for design fidelity, typography, animation curves, and pixel-perfect UI execution.",
      "Experience with automated testing (Jest, Cypress or Playwright) and continuous integration.",
      "Strong collaborative mindset and ability to communicate effectively with distributed global teams."
    ],
    preferredQualifications: [
      "Experience working with HTML5 Canvas, WebGL, WebAssembly, or SVG vector manipulation.",
      "Previous contributions to open-source libraries or published design systems.",
      "Experience in collaborative multi-user editing architectures (CRDTs, operational transformation)."
    ],
    benefits: [
      "Canva global equity (options) grant + competitive base salary (₱170,000 – ₱230,000 / mo).",
      "Comprehensive HMO from Day 1 with ₱500,000 MBL with dependent coverage and dental + optical.",
      "Hybrid flexible model based at Canva Space Makati with daily chef-prepared breakfast, lunch, and barista coffee.",
      "₱50,000 annual Vibe & Thrive allowance (fitness, wellness, travel, home office).",
      "Generous parental leave (18 weeks paid for primary carers) and life insurance.",
      "Access to Canva University, mentoring programs, and annual global hackathons."
    ],
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
    portal: "Direct Employer ATS",
    portalBadge: "FAST-TRACK",
    postedHeader: "Posted 5h ago • High Match Pool",
    liveSinceHours: 5.2,
    matchPercentage: 84,
    companyDescription: "Sprout Solutions is the premier B2B HR, payroll, and benefits software suite for Philippine enterprises.",
    jobDescription: "Develop seamless employee management dashboards, automated biometric clock-in integrations, and real-time payroll calculation engines.",
    aboutRole: "Sprout Solutions is the market leader in Philippine B2B HR, payroll, and benefits SaaS, serving over 1,000+ top enterprises and processing payroll for millions of Filipino employees. We are seeking a Senior Full-Stack Developer to lead development on our NextGen Payroll and Workforce Management suite. You will solve complex computational problems around statutory deductions (BIR, SSS, PhilHealth, Pag-IBIG), real-time biometric attendance, and seamless mobile-responsive HR portals.",
    responsibilities: [
      "Design and implement scalable full-stack features using React 18, TypeScript, Node.js, and PostgreSQL.",
      "Architect resilient payroll calculation microservices capable of processing 100,000+ payslips in under 3 minutes.",
      "Build accessible employee self-service interfaces for clock-in/out, leave applications, and government statutory tax views.",
      "Implement automated integration adapters for biometric hardware, bank disbursement APIs, and ERP systems.",
      "Conduct code reviews, mentor junior full-stack developers, and champion software engineering best practices.",
      "Optimize relational database queries, indexes, and connection pooling to ensure fast page loads under payroll surge days.",
      "Collaborate with product managers and customer success teams to resolve production issues within SLA."
    ],
    qualifications: [
      "5+ years of full-stack web application development experience with React and Node.js.",
      "Solid understanding of relational database schema design, migrations, and indexing in PostgreSQL or MySQL.",
      "Experience building and consuming RESTful and GraphQL APIs with token-based authentication (OAuth2/JWT).",
      "Strong knowledge of Philippine business software contexts or payroll/HR domain rules is a huge plus.",
      "Proven experience with Docker, cloud infrastructure (AWS), and CI/CD automated deployments.",
      "Strong analytical problem-solving skills and rigorous attention to data accuracy and security."
    ],
    preferredQualifications: [
      "Prior experience in fintech, HR tech, payroll software, or ERP SaaS platforms.",
      "Knowledge of Philippine labor compliance rules, BIR tax tables, and statutory withholding calculations.",
      "Experience with Redis caching and asynchronous job queues (BullMQ / RabbitMQ)."
    ],
    benefits: [
      "Competitive salary (₱140,000 – ₱190,000 / mo) with guaranteed 13th and 14th-month pay.",
      "Comprehensive HMO with 2 dependents covered upon hiring + group life insurance.",
      "Hybrid work setup (Ortigas / Pasig office 1-2 days/week, work from home remainder).",
      "₱25,000 annual tech & home workspace subsidy.",
      "Annual merit increases and company performance bonuses.",
      "15 days VL + 15 days SL with unused leave monetized at year-end."
    ],
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
    portal: "Direct ATS Queue",
    portalBadge: "VERIFIED DIRECT",
    postedHeader: "Posted 6h ago • Active Screening",
    liveSinceHours: 6.0,
    matchPercentage: 76,
    companyDescription: "High-growth logistics intelligence platform providing route optimization and warehouse telemetry across Southeast Asia.",
    jobDescription: "Build mobile-first Progressive Web Apps for dispatchers, live GPS fleet map dashboards, and driver performance portals.",
    aboutRole: "Voyage Digital is powering modern e-commerce delivery across Southeast Asia. We provide intelligent dispatch, route optimization, and real-time tracking for thousands of fleet operators. We need a React & Mobile Web Specialist to build high-performance Progressive Web Apps (PWAs) that run seamlessly on low-bandwidth mobile devices in the field.",
    responsibilities: [
      "Build and optimize mobile-first PWAs with offline data sync for logistics drivers and field hub operators.",
      "Develop interactive GPS fleet maps rendering live telemetry for hundreds of concurrent vehicles using Leaflet / Mapbox.",
      "Implement client-side IndexedDB caching and background sync workers to handle flaky 3G/4G network zones.",
      "Work closely with backend logistics engineers to stream MQTT / WebSocket location updates efficiently.",
      "Ensure fast boot-up times (TBT < 200ms) on budget Android smartphones and mobile browsers.",
      "Write unit tests and end-to-end integration tests for critical route completion flows."
    ],
    qualifications: [
      "4+ years of web application development specializing in React and modern responsive CSS (Tailwind).",
      "Deep understanding of Service Workers, Progressive Web App manifests, and offline-first storage patterns.",
      "Experience with mapping libraries (Leaflet, Mapbox, or Google Maps JavaScript API).",
      "Demonstrated ability to profile and optimize frontend bundle sizes and memory usage.",
      "Strong team player who thrives in an asynchronous, remote-first engineering culture."
    ],
    preferredQualifications: [
      "Experience with logistics, ride-hailing, or delivery tracking applications.",
      "Familiarity with WebSockets or MQTT streaming over cellular networks.",
      "Knowledge of React Native or Capacitor for hybrid mobile packaging."
    ],
    benefits: [
      "₱130,000 – ₱175,000 / mo compensation + 13th-month pay.",
      "100% Work from Anywhere in the Philippines (Manila timezone).",
      "HMO from Day 1 with dependent coverage (₱250,000 MBL).",
      "₱3,000 monthly high-speed internet and electricity allowance.",
      "Flexible working hours with core overlap window (10 AM - 4 PM)."
    ],
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
    industry: "Social Entertainment & Streaming",
    logoText: "K",
    logoColor: "bg-rose-500",
    title: "Frontend Interactive Engineer",
    salary: "₱120,000 – ₱160,000 / mo",
    setup: "Hybrid • Taguig",
    portal: "Direct ATS Queue",
    portalBadge: "DIRECT ATS",
    postedHeader: "Posted 8h ago",
    liveSinceHours: 8.5,
    matchPercentage: 71,
    companyDescription: "The leading Pinoy livestreaming app bringing global Filipino communities together with social audio, games, and streaming.",
    jobDescription: "Build dynamic web livestreaming viewers, virtual gifting checkout flows, and gamified community leaderboards.",
    aboutRole: "Kumu connects millions of Filipinos worldwide through live audio, interactive game shows, and community livestreaming. As a Frontend Interactive Engineer on the Web Experience team, you will build social web viewing experiences, interactive coin/diamond gifting modules, and real-time creator dashboards.",
    responsibilities: [
      "Develop high-performance web livestream players utilizing WebRTC and HLS low-latency video feeds.",
      "Build engaging interactive animation layers for virtual gifting using CSS transforms and lightweight canvas renders.",
      "Implement secure checkout and coin top-up modals integrating local Philippine payment gateways (GCash, Maya).",
      "Collaborate with game designers and stream producers to build live quiz show widgets and real-time voting overlays.",
      "Ensure web apps maintain smooth 60fps animations during peak live streams with 50,000+ concurrent viewers.",
      "Work with security teams to prevent fraudulent gifting activities and bot abuse on web endpoints."
    ],
    qualifications: [
      "3+ years of frontend engineering experience with React, TypeScript, and modern state management.",
      "Experience with real-time browser technologies (WebSockets, WebRTC, Server-Sent Events).",
      "Strong skills in animation performance, CSS transitions, and SVG/Canvas rendering.",
      "Familiarity with digital payments integration and secure transaction modal flows.",
      "Passion for Filipino pop culture, live entertainment, and creator economy platforms."
    ],
    preferredQualifications: [
      "Experience in video streaming technologies (HLS, DASH, Video.js).",
      "Familiarity with Socket.io or Pusher real-time pub/sub infrastructure.",
      "Knowledge of micro-interactions and Framer Motion animation libraries."
    ],
    benefits: [
      "₱120,000 – ₱160,000 / mo base salary + performance bonuses.",
      "HMO from Day 1 with 1 dependent + optical and dental benefits.",
      "Hybrid setup with pet-friendly office in BGC, Taguig.",
      "Free catered lunch and snacks during on-site days.",
      "Creator allowance and tickets to Kumu live events and concerts."
    ],
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
    industry: "Digital Lending & SME Credit",
    logoText: "FB",
    logoColor: "bg-teal-600",
    title: "UI Engineer (Loan Servicing)",
    salary: "₱110,000 – ₱150,000 / mo",
    setup: "Hybrid • Alabang, Muntinlupa",
    portal: "Direct Employer ATS",
    portalBadge: "VERIFIED DIRECT",
    postedHeader: "Posted 10h ago",
    liveSinceHours: 10.2,
    matchPercentage: 65,
    companyDescription: "Fast-growing consumer credit platform providing micro-loans and SME credit line financing.",
    jobDescription: "Design high-conversion customer loan application steps, KYC identity document verification widgets, and payment schedule tables.",
    aboutRole: "FinTech Bay Manila provides accessible credit lines and micro-financing to underserved Filipino entrepreneurs and MSMEs. We are looking for a UI Engineer to lead our Customer Onboarding and Loan Servicing web portals, focusing on high-conversion application flows, seamless document uploads, and clear repayment dashboards.",
    responsibilities: [
      "Build step-by-step loan application forms with comprehensive client-side validation and autosave.",
      "Implement responsive document upload widgets with client-side image compression and ID boundary cropping.",
      "Develop clear amortization schedule tables and automated payment breakdown calculators.",
      "Partner with Risk & Fraud teams to integrate automated liveness and KYC verification checks.",
      "Maintain cross-device compatibility across desktop browsers and budget mobile devices.",
      "Track funnel drop-off analytics and conduct A/B tests to optimize application completion rates."
    ],
    qualifications: [
      "3+ years of professional React development experience.",
      "Expertise in complex form architectures, schema validation (Zod / Yup), and state management.",
      "Solid knowledge of RESTful API consumption and handling asynchronous network states gracefully.",
      "Strong understanding of responsive UI design, accessible markup, and clean CSS.",
      "High attention to detail regarding financial calculations, rounding accuracy, and currency formatting."
    ],
    preferredQualifications: [
      "Experience in consumer lending, banking KYC, or fintech onboarding flows.",
      "Familiarity with client-side image manipulation (HTML5 Canvas / Web Workers).",
      "Experience with Formik, React Hook Form, and Tailwind CSS."
    ],
    benefits: [
      "₱110,000 – ₱150,000 / mo salary + 13th-month pay.",
      "Comprehensive HMO coverage from Day 1 for employee + 1 dependent.",
      "Hybrid setup (2 days Alabang office, 3 days WFH).",
      "₱15,000 annual medical and wellness reimbursement.",
      "15 days VL + 15 days SL with cash conversion options."
    ],
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
    portal: "Direct Company Portal",
    portalBadge: "VERIFIED DIRECT",
    postedHeader: "Posted 12h ago",
    liveSinceHours: 12.0,
    matchPercentage: 62,
    companyDescription: "AWS and GCP consulting partner supporting Philippine tech scale-ups with cloud security and cloud-native observability.",
    jobDescription: "Create internal monitoring portals, billing utilization dashboards, and alert notification interfaces.",
    aboutRole: "Archipelago Cloud helps Philippine enterprises migrate, secure, and monitor modern cloud infrastructure across AWS and Google Cloud. We are looking for an ambitious Junior-to-Mid Frontend Developer to join our Cloud Management Platform squad, building customer telemetry dashboards, billing breakdown tables, and real-time cloud alert feeds.",
    responsibilities: [
      "Develop responsive dashboard interfaces for cloud resource utilization, server health, and monthly AWS/GCP billing summaries.",
      "Implement data visualization charts (line graphs, donut charts, heatmaps) using Chart.js / Recharts.",
      "Integrate backend APIs to display real-time system alerts and automated incident reports.",
      "Collaborate with senior DevOps architects to translate complex infrastructure metrics into clean, human-friendly UIs.",
      "Write clean, modular React components following team linting and styling guidelines.",
      "Participate in weekly sprint planning and demonstrate completed features during team demos."
    ],
    qualifications: [
      "1.5 - 3 years of frontend development experience with React and JavaScript/TypeScript.",
      "Experience working with RESTful APIs, JSON data structures, and asynchronous data fetching.",
      "Familiarity with modern CSS frameworks (Tailwind CSS or styled-components).",
      "Basic understanding of Git workflow (branches, pull requests, merge conflict resolution).",
      "Eager to learn cloud technologies and develop full-stack capabilities over time."
    ],
    preferredQualifications: [
      "Experience with data visualization libraries (Recharts, Chart.js, or D3.js).",
      "Basic understanding of cloud concepts (AWS EC2, S3, RDS or GCP Compute Engine).",
      "Knowledge of Next.js or Vite build tooling."
    ],
    benefits: [
      "₱85,000 – ₱115,000 / mo compensation + 13th-month pay.",
      "100% Remote work anywhere in the Philippines.",
      "HMO from Day 1 for employee.",
      "₱20,000 annual cloud certification sponsorship (AWS Certified Solutions Architect, GCP).",
      "Company laptop provided upon joining."
    ],
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
