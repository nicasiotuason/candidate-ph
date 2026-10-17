import { INITIAL_USER, MOCK_JOBS, INITIAL_TESTIMONIALS } from './mockData';
import { isSupabaseConfigured } from '../lib/supabase';
import { supabaseService } from './supabaseService';

// Storage keys for localStorage caching & offline/demo fallback
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
  // Check if live Supabase database is active
  isLiveDatabase() {
    return isSupabaseConfigured();
  },

  // Reset demo state back to pristine ₱250 balance and 1 sample application
  resetDemoState() {
    try {
      localStorage.removeItem(STORAGE_USER_KEY);
      localStorage.removeItem(STORAGE_APPLIED_KEY);
      localStorage.removeItem(STORAGE_SAVED_KEY);
    } catch (e) {
      console.error("Storage reset error:", e);
    }
  },

  // Current user state
  getUser() {
    return getStored(STORAGE_USER_KEY, INITIAL_USER);
  },

  async updateUser(updates) {
    const current = this.getUser();
    const updated = { ...current, ...updates };
    setStored(STORAGE_USER_KEY, updated);

    // If live Supabase is configured and user has an ID, sync to database
    if (this.isLiveDatabase() && current.id && current.id.includes('-')) {
      try {
        await supabaseService.updateProfile(current.id, updates);
      } catch (err) {
        console.warn("Supabase profile sync error (falling back to local):", err);
      }
    }

    return updated;
  },

  async login(email, password) {
    if (this.isLiveDatabase()) {
      try {
        const authData = await supabaseService.signIn(email, password);
        let profile = null;
        try {
          profile = await supabaseService.getProfile(authData.user.id);
        } catch {
          profile = {
            id: authData.user.id,
            email: authData.user.email,
            name: authData.user.user_metadata?.name || email.split('@')[0],
            walletBalance: 250,
            isOnboarded: false
          };
        }
        setStored(STORAGE_USER_KEY, profile);
        return { success: true, user: profile, token: authData.session?.access_token };
      } catch (err) {
        console.warn("Supabase login error, falling back to local credentials:", err);
      }
    }

    // Local / Demo Mode fallback
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = this.getUser();
        user.email = email || user.email;
        setStored(STORAGE_USER_KEY, user);
        resolve({ success: true, user, token: 'mock-jwt-token-12345' });
      }, 350);
    });
  },

  async register(email, password, name) {
    if (this.isLiveDatabase()) {
      try {
        const authData = await supabaseService.signUp(email, password, name);
        const newUser = {
          id: authData.user?.id || `user_${Date.now()}`,
          email,
          name: name || (email ? email.split('@')[0] : 'Applicant'),
          isOnboarded: false,
          walletBalance: 250,
          referralCode: `CAND-${Math.random().toString(36).substring(2, 8).toUpperCase()}`
        };
        setStored(STORAGE_USER_KEY, newUser);
        return { success: true, user: newUser, token: authData.session?.access_token };
      } catch (err) {
        console.warn("Supabase register error, falling back to local:", err);
      }
    }

    // Local / Demo Mode fallback
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser = {
          ...INITIAL_USER,
          email,
          name: name || (email ? email.split('@')[0] : 'Applicant'),
          isOnboarded: false,
          walletBalance: 250 // includes ₱50 bonus credits
        };
        setStored(STORAGE_USER_KEY, newUser);
        resolve({ success: true, user: newUser, token: 'mock-jwt-token-new' });
      }, 400);
    });
  },

  // Onboarding submission simulation
  async submitOnboarding(formData) {
    const user = await this.updateUser({
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

    return { success: true, user };
  },

  // Get jobs (scraped twice a day, showing 60%+ matches)
  async getJobs(minMatch = 60) {
    if (this.isLiveDatabase()) {
      try {
        const dbJobs = await supabaseService.getJobs(minMatch);
        if (dbJobs && dbJobs.length > 0) {
          // Map DB columns to frontend camelCase expectations
          return dbJobs.map(j => ({
            id: j.id,
            company: j.company,
            industry: j.industry,
            logo: j.logo,
            logoText: j.logo,
            logoColor: j.logo_color,
            title: j.title,
            salary: j.salary,
            location: j.location,
            setup: j.setup,
            type: j.type,
            level: j.level,
            experience: j.experience,
            portal: j.portal,
            postedAgo: j.posted_ago,
            applicantCount: j.applicant_count,
            matchPercentage: j.match_score,
            matchScore: j.match_score,
            matchLabel: j.match_label,
            experienceScore: j.experience_score,
            skillScore: j.skill_score,
            industryScore: j.industry_score,
            jobDescription: j.job_description,
            atsSpec: j.ats_spec,
            matchingSkills: j.matching_skills,
            missingSkills: j.missing_skills,
            fitReasons: j.fit_reasons,
            hub: j.hub,
            headcount: j.headcount,
            leadership: j.leadership,
            founded: j.founded
          }));
        }
      } catch (err) {
        console.warn("Supabase getJobs error, loading curated local jobs:", err);
      }
    }

    // Default curated jobs feed
    return MOCK_JOBS.filter(j => j.matchPercentage >= minMatch);
  },

  // Saved / Starred jobs
  async getSavedJobIds() {
    const user = this.getUser();
    if (this.isLiveDatabase() && user.id && user.id.includes('-')) {
      try {
        return await supabaseService.getSavedJobIds(user.id);
      } catch (err) {
        console.warn("Supabase getSavedJobIds error:", err);
      }
    }

    return getStored(STORAGE_SAVED_KEY, ["job_01"]);
  },

  async toggleSaveJob(jobId) {
    const user = this.getUser();
    const currentSaved = getStored(STORAGE_SAVED_KEY, ["job_01"]);
    const exists = currentSaved.includes(jobId);
    const updated = exists ? currentSaved.filter(id => id !== jobId) : [...currentSaved, jobId];
    setStored(STORAGE_SAVED_KEY, updated);

    if (this.isLiveDatabase() && user.id && user.id.includes('-')) {
      try {
        if (exists) {
          await supabaseService.unsaveJob(user.id, jobId);
        } else {
          await supabaseService.saveJob(user.id, jobId);
        }
      } catch (err) {
        console.warn("Supabase toggleSaveJob error:", err);
      }
    }

    return updated;
  },

  // Applied jobs
  async getAppliedJobs() {
    const user = this.getUser();
    if (this.isLiveDatabase() && user.id && user.id.includes('-')) {
      try {
        const dbApps = await supabaseService.getApplications(user.id);
        if (dbApps && dbApps.length > 0) {
          return dbApps.map(a => ({
            id: a.id,
            jobId: a.job_id,
            company: a.company,
            title: a.title,
            salary: a.salary,
            portal: a.portal,
            appliedAt: a.applied_at,
            deductionPhp: a.deduction_php,
            atsReceiptId: a.ats_receipt_id,
            status: a.status,
            employerReplyTarget: a.employer_reply_target,
            tailoredHeadline: a.tailored_headline,
            tailoredSummary: a.tailored_summary,
            coverLetter: a.cover_letter,
            coverLetterTone: a.cover_letter_tone,
            resumeChoice: a.resume_choice
          }));
        }
      } catch (err) {
        console.warn("Supabase getAppliedJobs error:", err);
      }
    }

    return getStored(STORAGE_APPLIED_KEY, [
      {
        id: "app_prev_01",
        jobId: "job_04",
        company: "Sprout Solutions",
        title: "Senior Full-Stack Developer",
        salary: "₱140,000 – ₱190,000 / mo",
        portal: "Direct Employer ATS",
        appliedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
        deductionPhp: 50,
        atsReceiptId: "ATS-DIR-998241",
        status: "Delivered to ATS",
        employerReplyTarget: "juan.delacruz@email.com",
        tailoredHeadline: "Full-Stack Engineer with React & Node.js expertise",
        coverLetter: `Juan Dela Cruz\njuan.delacruz@email.com • +63 917 555 0192 • Metro Manila, Philippines\n\nTo the Hiring Team at Sprout Solutions,\n\nI am writing to express my immediate interest in the Senior Full-Stack Developer opening at Sprout Solutions. With over 6 years of hands-on experience building high-throughput web applications and specialized expertise in React, Node.js, TypeScript, Next.js, and modern cloud architectures, I am confident in my ability to hit the ground running with zero ramp-up time.\n\nThroughout my career, I have focused on building resilient, performant frontend and backend architectures that handle mission-critical traffic without degrading user experience. My recent work closely mirrors the responsibilities outlined in Sprout Solutions's requisition—specifically orchestrating modular micro-frontends, enforcing strict TypeScript type safety, and optimizing Core Web Vitals for maximum responsiveness.\n\nWhat excites me about joining Sprout Solutions is your commitment to engineering excellence within the Philippine HR tech and SaaS space. I take pride in delivering maintainable codebases, establishing rigorous testing standards, and partnering closely with product designers and backend teams to ship features on cadence.\n\nI welcome the opportunity to discuss how my technical foundation and problem-solving mindset can accelerate Sprout Solutions's upcoming roadmap. Thank you for your time and consideration.\n\nSincerely,\nJuan Dela Cruz`,
        coverLetterTone: "technical"
      }
    ]);
  },

  // Quick Apply execution: deducts ₱50 from wallet and dispatches to ATS
  async applyToJob(job, tailoredData = {}) {
    const user = this.getUser();
    const cost = 50;

    if ((user.walletBalance ?? 0) < cost) {
      throw new Error("Insufficient balance. Please top up your wallet with PayMongo to submit this application.");
    }

    const newBalance = (user.walletBalance ?? 250) - cost;
    await this.updateUser({ walletBalance: newBalance });

    const appliedRecord = {
      id: `app_${Date.now()}`,
      jobId: job.id,
      company: job.company,
      title: job.title,
      salary: job.salary,
      portal: job.portal,
      appliedAt: new Date().toISOString(),
      deductionPhp: 50,
      atsReceiptId: `ATS-${(job.portal || 'DIR').substring(0, 3).toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`,
      status: "Delivered to ATS",
      employerReplyTarget: user.email,
      tailoredHeadline: tailoredData.headline || user.headline,
      tailoredSummary: tailoredData.summary || user.summary,
      coverLetter: tailoredData.coverLetter || "",
      coverLetterTone: tailoredData.coverLetterTone || "technical",
      resumeChoice: tailoredData.resumeChoice || "tailored",
      screeningAnswers: tailoredData.screeningAnswers || []
    };

    const currentApplied = await this.getAppliedJobs();
    const updatedApplied = [appliedRecord, ...currentApplied];
    setStored(STORAGE_APPLIED_KEY, updatedApplied);

    // If Supabase is active, persist to database
    if (this.isLiveDatabase() && user.id && user.id.includes('-')) {
      try {
        await supabaseService.createApplication(user.id, appliedRecord);
        await supabaseService.logWalletTransaction(user.id, {
          amount: -50.00,
          type: 'application_fee',
          description: `Dispatched application for ${job.title} at ${job.company}`,
          balanceAfter: newBalance
        });
      } catch (err) {
        console.warn("Supabase applyToJob error:", err);
      }
    }

    return {
      success: true,
      appliedRecord,
      newBalance
    };
  },

  // Wallet top up via PayMongo simulation / webhook
  async topUpWallet(amount, method = 'PayMongo (GCash / Maya)', paymentId = null) {
    const user = this.getUser();
    const newBalance = (user.walletBalance || 0) + Number(amount);
    await this.updateUser({ walletBalance: newBalance });

    if (this.isLiveDatabase() && user.id && user.id.includes('-')) {
      try {
        await supabaseService.logWalletTransaction(user.id, {
          amount: Number(amount),
          type: 'topup',
          description: `PayMongo Instant Checkout (${amount >= 1000 ? '24 Apps' : amount >= 500 ? '11 Apps' : '4 Apps'})`,
          balanceAfter: newBalance,
          paymentMethod: method,
          paymongoPaymentId: paymentId || `paymongo_${Date.now()}`
        });
      } catch (err) {
        console.warn("Supabase topUpWallet error:", err);
      }
    }

    return {
      success: true,
      amountAdded: Number(amount),
      newBalance,
      transactionId: paymentId || `PAYMONGO_TX_${Date.now()}`
    };
  },

  // Community feedback / testimonials
  async getTestimonials() {
    if (this.isLiveDatabase()) {
      try {
        const dbTestimonials = await supabaseService.getTestimonials();
        if (dbTestimonials && dbTestimonials.length > 0) {
          return dbTestimonials.map(t => ({
            id: t.id,
            author: t.author,
            role: t.role,
            date: new Date(t.created_at).toLocaleDateString(),
            avatarBg: t.avatar_bg,
            avatarText: t.avatar_text,
            comment: t.comment
          }));
        }
      } catch (err) {
        console.warn("Supabase getTestimonials error:", err);
      }
    }

    return getStored(STORAGE_TESTIMONIALS_KEY, INITIAL_TESTIMONIALS);
  },

  async addTestimonial(text, authorName = "Applicant") {
    const newEntry = {
      id: `t_${Date.now()}`,
      author: authorName,
      role: "Candidate.ph Member",
      date: "Just now",
      avatarBg: "bg-blue-100 text-blue-800",
      avatarText: authorName.substring(0, 2).toUpperCase(),
      comment: text
    };

    const current = await this.getTestimonials();
    const updated = [newEntry, ...current];
    setStored(STORAGE_TESTIMONIALS_KEY, updated);

    if (this.isLiveDatabase()) {
      try {
        await supabaseService.addTestimonial({
          id: newEntry.id,
          author: authorName,
          role: newEntry.role,
          comment: text,
          avatar_bg: newEntry.avatarBg,
          avatar_text: newEntry.avatarText
        });
      } catch (err) {
        console.warn("Supabase addTestimonial error:", err);
      }
    }

    return updated;
  }
};
