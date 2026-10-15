import { INITIAL_USER, MOCK_JOBS, INITIAL_TESTIMONIALS } from './mockData';

// Storage keys
const STORAGE_USER_KEY = 'candidate_ph_user';
const STORAGE_APPLIED_KEY = 'candidate_ph_applied';
const STORAGE_SAVED_KEY = 'candidate_ph_saved';
const STORAGE_TESTIMONIALS_KEY = 'candidate_ph_testimonials';

// Initialize local storage helpers
function getStored(key, fallback) {
  try {
    const val = localStorage.getItem(key);
    return val ? JSON.parse(val) : fallback;
  } catch {
    return fallback;
  }
}

function setStored(key, val) {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) {
    console.error("Storage error:", e);
  }
}

export const api = {
  // Current user state
  getUser() {
    return getStored(STORAGE_USER_KEY, INITIAL_USER);
  },

  updateUser(updates) {
    const current = this.getUser();
    const updated = { ...current, ...updates };
    setStored(STORAGE_USER_KEY, updated);
    return updated;
  },

  login(email, password) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = this.getUser();
        user.email = email || user.email;
        setStored(STORAGE_USER_KEY, user);
        resolve({ success: true, user, token: 'mock-jwt-token-12345' });
      }, 400);
    });
  },

  register(email, password) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser = {
          ...INITIAL_USER,
          email,
          name: email.split('@')[0],
          isOnboarded: false,
          walletBalance: 250 // 50 bonus credits = 5 applications
        };
        setStored(STORAGE_USER_KEY, newUser);
        resolve({ success: true, user: newUser, token: 'mock-jwt-token-new' });
      }, 500);
    });
  },

  // Onboarding submission simulation
  submitOnboarding(formData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = this.updateUser({
          name: formData.name || formData.email?.split('@')[0] || 'Applicant',
          targetRole: formData.targetRole,
          targetCategory: formData.targetCategory,
          seniority: formData.seniority,
          desiredSalary: formData.desiredSalary,
          salaryFloor: formData.desiredSalary,
          noticePeriod: formData.noticePeriod,
          citizenship: formData.citizenship,
          setupPreference: formData.setupPreference,
          education: formData.education,
          email: formData.email || this.getUser().email,
          skills: formData.skills || INITIAL_USER.skills,
          summary: formData.summary || INITIAL_USER.summary,
          resumeFileName: formData.resumeFileName || "Uploaded_Resume.pdf",
          profileStrength: 90,
          isOnboarded: true,
          isPaused: false,
          lastActive: "Just now"
        });
        resolve({ success: true, user });
      }, 500);
    });
  },

  // Get jobs (scraped twice a day, showing 60%+ matches)
  getJobs(minMatch = 60) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const jobs = MOCK_JOBS.filter(j => j.matchPercentage >= minMatch);
        resolve(jobs);
      }, 200);
    });
  },

  // Saved / Starred jobs
  getSavedJobIds() {
    return getStored(STORAGE_SAVED_KEY, ["job_01"]);
  },

  toggleSaveJob(jobId) {
    const saved = this.getSavedJobIds();
    const exists = saved.includes(jobId);
    const updated = exists ? saved.filter(id => id !== jobId) : [...saved, jobId];
    setStored(STORAGE_SAVED_KEY, updated);
    return updated;
  },

  // Applied jobs
  getAppliedJobs() {
    return getStored(STORAGE_APPLIED_KEY, [
      {
        id: "app_prev_01",
        jobId: "job_04",
        company: "Sprout Solutions",
        title: "Senior Full-Stack Developer",
        salary: "₱140,000 – ₱190,000 / mo",
        portal: "Greenhouse",
        appliedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
        deductionPhp: 50,
        atsReceiptId: "ATS-GRN-998241",
        status: "Delivered to ATS",
        employerReplyTarget: "juan.delacruz@email.com",
        tailoredHeadline: "Full-Stack Engineer with React & Node.js expertise"
      }
    ]);
  },

  // Quick Apply execution: deducts ₱50 from wallet and dispatches to ATS
  applyToJob(job, tailoredData = {}) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = this.getUser();
        const cost = 50;

        if (user.walletBalance < cost) {
          return reject(new Error("Insufficient balance. Please top up your wallet with PayMongo to submit this application."));
        }

        const newBalance = user.walletBalance - cost;
        this.updateUser({ walletBalance: newBalance });

        const appliedRecord = {
          id: `app_${Date.now()}`,
          jobId: job.id,
          company: job.company,
          title: job.title,
          salary: job.salary,
          portal: job.portal,
          appliedAt: new Date().toISOString(),
          deductionPhp: 50,
          atsReceiptId: `ATS-${job.portal.substring(0, 3).toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`,
          status: "Delivered to ATS",
          employerReplyTarget: user.email,
          tailoredHeadline: tailoredData.headline || user.headline,
          tailoredSummary: tailoredData.summary || user.summary
        };

        const currentApplied = this.getAppliedJobs();
        const updatedApplied = [appliedRecord, ...currentApplied];
        setStored(STORAGE_APPLIED_KEY, updatedApplied);

        resolve({
          success: true,
          appliedRecord,
          newBalance
        });
      }, 800);
    });
  },

  // Wallet top up via PayMongo simulation
  topUpWallet(amount, method = 'PayMongo (GCash / Maya)') {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = this.getUser();
        const newBalance = (user.walletBalance || 0) + Number(amount);
        this.updateUser({ walletBalance: newBalance });
        resolve({
          success: true,
          amountAdded: Number(amount),
          newBalance,
          transactionId: `PAYMONGO_TX_${Date.now()}`
        });
      }, 600);
    });
  },

  // Community feedback / testimonials
  getTestimonials() {
    return getStored(STORAGE_TESTIMONIALS_KEY, INITIAL_TESTIMONIALS);
  },

  addTestimonial(text, authorName = "Applicant") {
    const list = this.getTestimonials();
    const newEntry = {
      id: `t_${Date.now()}`,
      author: authorName,
      role: "Candidate.ph Member",
      date: "Just now",
      avatarBg: "bg-blue-100 text-blue-800",
      avatarText: authorName.substring(0, 2).toUpperCase(),
      comment: text
    };
    const updated = [newEntry, ...list];
    setStored(STORAGE_TESTIMONIALS_KEY, updated);
    return updated;
  }
};
