import { supabase } from '../lib/supabase';

export const supabaseService = {
  // ================= AUTHENTICATION =================
  async signUp(email, password, name) {
    if (!supabase) throw new Error('Supabase is not configured');

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name || email.split('@')[0]
        }
      }
    });

    if (error) throw error;
    return data;
  },

  async signIn(email, password) {
    if (!supabase) throw new Error('Supabase is not configured');

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;
    return data;
  },

  async signOut() {
    if (!supabase) return;
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async getCurrentUser() {
    if (!supabase) return null;
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  },

  // ================= PROFILES =================
  async getProfile(userId) {
    if (!supabase) throw new Error('Supabase is not configured');

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return this.mapProfileFromDb(data);
  },

  async updateProfile(userId, updates) {
    if (!supabase) throw new Error('Supabase is not configured');

    const dbPayload = this.mapProfileToDb(updates);
    dbPayload.updated_at = new Date().toISOString();

    const { data, error } = await supabase
      .from('profiles')
      .update(dbPayload)
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    return this.mapProfileFromDb(data);
  },

  // Helper mappers between frontend camelCase and DB snake_case
  mapProfileToDb(updates) {
    const mapping = {
      targetRole: 'target_role',
      targetCategory: 'target_category',
      desiredSalary: 'desired_salary',
      salaryFloor: 'salary_floor',
      noticePeriod: 'notice_period',
      setupPreference: 'setup_preference',
      profileStrength: 'profile_strength',
      walletBalance: 'wallet_balance',
      referralCode: 'referral_code',
      referredBy: 'referred_by',
      isOnboarded: 'is_onboarded',
      isPaused: 'is_paused',
      masterResumeUrl: 'master_resume_url',
      masterResumeFilename: 'master_resume_filename'
    };

    const payload = {};
    for (const [key, val] of Object.entries(updates)) {
      if (val !== undefined) {
        const dbCol = mapping[key] || key;
        payload[dbCol] = val;
      }
    }
    return payload;
  },

  mapProfileFromDb(data) {
    if (!data) return null;
    return {
      id: data.id,
      email: data.email,
      name: data.name,
      headline: data.headline,
      summary: data.summary,
      targetRole: data.target_role,
      targetCategory: data.target_category,
      seniority: data.seniority,
      desiredSalary: data.desired_salary,
      salaryFloor: data.salary_floor,
      noticePeriod: data.notice_period,
      citizenship: data.citizenship,
      setupPreference: data.setup_preference,
      education: data.education,
      skills: data.skills || [],
      masterResumeUrl: data.master_resume_url,
      masterResumeFilename: data.master_resume_filename,
      profileStrength: data.profile_strength,
      walletBalance: Number(data.wallet_balance || 0),
      referralCode: data.referral_code,
      referredBy: data.referred_by,
      isOnboarded: Boolean(data.is_onboarded),
      isPaused: Boolean(data.is_paused),
      createdAt: data.created_at,
      updatedAt: data.updated_at
    };
  },

  // ================= JOBS =================
  async getJobs(minMatch = 60) {
    if (!supabase) throw new Error('Supabase is not configured');

    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .eq('active', true)
      .gte('match_score', minMatch)
      .order('match_score', { ascending: false });

    if (error) throw error;
    return data;
  },

  // ================= APPLICATIONS =================
  async getApplications(userId) {
    if (!supabase) throw new Error('Supabase is not configured');

    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .eq('user_id', userId)
      .order('applied_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async createApplication(userId, appData) {
    if (!supabase) throw new Error('Supabase is not configured');

    const { data, error } = await supabase
      .from('applications')
      .insert({
        id: appData.id || `app_${Date.now()}`,
        user_id: userId,
        job_id: appData.jobId,
        company: appData.company,
        title: appData.title,
        salary: appData.salary,
        portal: appData.portal,
        deduction_php: 50.00,
        ats_receipt_id: appData.atsReceiptId,
        status: 'Delivered to ATS',
        employer_reply_target: appData.employerReplyTarget,
        resume_choice: appData.resumeChoice || 'tailored',
        tailored_headline: appData.tailoredHeadline,
        tailored_summary: appData.tailoredSummary,
        cover_letter: appData.coverLetter,
        cover_letter_tone: appData.coverLetterTone || 'technical',
        screening_answers: appData.screeningAnswers || []
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Atomic stored procedure call for ₱50 balance deduction, ATS dispatch, and audit logging
  async dispatchApplication(job, tailoredData, user) {
    if (!supabase) throw new Error('Supabase is not configured');

    const { data, error } = await supabase.rpc('dispatch_application', {
      p_job_id: job.id,
      p_company: job.company,
      p_title: job.title,
      p_salary: job.salary,
      p_portal: job.portal || 'Direct Employer ATS',
      p_employer_reply_target: user.email,
      p_resume_choice: tailoredData.resumeChoice || 'tailored',
      p_tailored_headline: tailoredData.headline || user.headline,
      p_tailored_summary: tailoredData.summary || user.summary,
      p_cover_letter: tailoredData.coverLetter || '',
      p_cover_letter_tone: tailoredData.coverLetterTone || 'technical',
      p_screening_answers: tailoredData.screeningAnswers || []
    });

    if (error) throw error;
    return data;
  },

  // ================= SAVED JOBS =================
  async getSavedJobIds(userId) {
    if (!supabase) throw new Error('Supabase is not configured');

    const { data, error } = await supabase
      .from('saved_jobs')
      .select('job_id')
      .eq('user_id', userId);

    if (error) throw error;
    return data ? data.map(item => item.job_id) : [];
  },

  async saveJob(userId, jobId) {
    if (!supabase) throw new Error('Supabase is not configured');

    const { error } = await supabase
      .from('saved_jobs')
      .insert({ user_id: userId, job_id: jobId });

    if (error) throw error;
  },

  async unsaveJob(userId, jobId) {
    if (!supabase) throw new Error('Supabase is not configured');

    const { error } = await supabase
      .from('saved_jobs')
      .delete()
      .eq('user_id', userId)
      .eq('job_id', jobId);

    if (error) throw error;
  },

  // ================= WALLET TRANSACTIONS =================
  async logWalletTransaction(userId, txData) {
    if (!supabase) throw new Error('Supabase is not configured');

    const { data, error } = await supabase
      .from('wallet_transactions')
      .insert({
        id: txData.id || `tx_${Date.now()}`,
        user_id: userId,
        amount: txData.amount,
        type: txData.type,
        description: txData.description,
        balance_after: txData.balanceAfter,
        payment_method: txData.paymentMethod || 'PayMongo',
        paymongo_payment_id: txData.paymongoPaymentId || null
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getWalletTransactions(userId) {
    if (!supabase) throw new Error('Supabase is not configured');

    const { data, error } = await supabase
      .from('wallet_transactions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  // ================= REFERRALS =================
  async getReferralStats(userId) {
    if (!supabase) throw new Error('Supabase is not configured');

    const { data, error } = await supabase
      .from('referrals')
      .select('*, profiles:referee_id(name, target_role, created_at)')
      .eq('referrer_id', userId);

    if (error) throw error;
    return data;
  },

  // ================= TESTIMONIALS =================
  async getTestimonials() {
    if (!supabase) throw new Error('Supabase is not configured');

    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async addTestimonial(testimonial) {
    if (!supabase) throw new Error('Supabase is not configured');

    const { data, error } = await supabase
      .from('testimonials')
      .insert(testimonial)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};
