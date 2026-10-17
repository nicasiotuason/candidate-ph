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
    return data;
  },

  async updateProfile(userId, updates) {
    if (!supabase) throw new Error('Supabase is not configured');

    const { data, error } = await supabase
      .from('profiles')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
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
