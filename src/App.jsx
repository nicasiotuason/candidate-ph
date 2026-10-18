import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import OnboardingPage from './pages/OnboardingPage';
import DashboardPage from './pages/DashboardPage';
import TopUpModal from './components/TopUpModal';
import { api } from './services/api';
import { MOCK_JOBS } from './services/mockData';

export default function App() {
  const getInitialView = () => {
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    const search = window.location.search.toLowerCase();
    if (path.includes('signup') || path.includes('auth') || hash === '#auth' || hash === '#signup') {
      return 'auth';
    }
    if (path.includes('onboarding') || hash === '#onboarding') {
      return 'onboarding';
    }
    // Route to dashboard on path /dashboard, hash #dashboard, or search params like modal= or view=applied
    if (path.startsWith('/dashboard') || hash === '#dashboard' || search.includes('modal=') || search.includes('view=applied')) {
      return 'dashboard';
    }
    return 'landing';
  };

  const [currentView, setCurrentViewState] = useState(getInitialView);

  const setCurrentView = (view) => {
    setCurrentViewState(view);
    const pathMap = {
      landing: '/',
      auth: '/signup',
      onboarding: '/onboarding',
      dashboard: '/dashboard'
    };
    const targetPath = pathMap[view] || '/';
    if (window.location.pathname !== targetPath) {
      window.history.pushState({ view }, '', targetPath);
    }
  };

  // Listen to browser Back/Forward navigation
  useEffect(() => {
    const handlePopState = () => {
      setCurrentViewState(getInitialView());
    };
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  const [user, setUser] = useState(api.getUser());
  const [jobs, setJobs] = useState(MOCK_JOBS);
  const [savedJobIds, setSavedJobIds] = useState(api.getSavedJobIds());
  const [appliedJobs, setAppliedJobs] = useState(api.getAppliedJobs());
  const [testimonials, setTestimonials] = useState(api.getTestimonials());

  // Global modals
  const [isTopUpOpen, setIsTopUpOpen] = useState(false);
  const [initialAuthEmail, setInitialAuthEmail] = useState('');

  // Toast Notification state
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 4500);
  };

  // Load initial jobs and sync Supabase data
  useEffect(() => {
    api.getJobs(60).then(data => setJobs(data));
    api.syncFromSupabase().then(res => {
      if (res?.success) {
        setSavedJobIds(api.getSavedJobIds());
        setAppliedJobs(api.getAppliedJobs());
        setTestimonials(api.getTestimonials());
      }
    });
  }, []);

  // Sync user state
  const refreshUser = () => {
    setUser(api.getUser());
  };

  // Toggle bookmark star
  const handleToggleSaveJob = (jobId) => {
    const updated = api.toggleSaveJob(jobId);
    setSavedJobIds(updated);
    const isNowSaved = updated.includes(jobId);
    triggerToast(isNowSaved ? '⭐ Job saved to your Bookmarks tab!' : 'Job removed from Bookmarks.');
  };

  // Execute Quick Apply with ₱50 wallet deduction & ATS dispatch
  const handleConfirmApply = async (job, tailoredData) => {
    try {
      const res = await api.applyToJob(job, tailoredData);
      setUser(api.getUser());
      setAppliedJobs(api.getAppliedJobs());
      triggerToast(`🚀 Application submitted to ${job.company}! Recruiter receipt confirmed • ₱50 debited from wallet.`);
    } catch (err) {
      triggerToast(`⚠️ ${err.message}`);
    }
  };

  // Handle PayMongo credit purchase UI refresh (wallet is credited inside TopUpModal by paymongoService)
  const handleTopUpSuccess = (amount) => {
    setUser(api.getUser());
    triggerToast(`💳 PayMongo Payment Successful! +₱${amount}.00 credits added to your wallet.`);
  };

  // Add community testimonial
  const handleAddTestimonial = (text, author) => {
    const updated = api.addTestimonial(text, author);
    setTestimonials(updated);
    triggerToast(`🎉 Thank you for sharing your feedback on the Community Wall!`);
  };

  // Auth flow callbacks
  const handleLoginSuccess = async (loginData) => {
    try {
      await api.login(loginData.email, loginData.password);
      refreshUser();
      setCurrentView('dashboard');
      triggerToast(`👋 Welcome back, ${(loginData.name || loginData.email).split('@')[0]}!`);
    } catch (err) {
      triggerToast(`⚠️ ${err.message || 'Login failed'}`);
    }
  };

  const handleStartOnboarding = async (signupData) => {
    try {
      await api.register(signupData.email, signupData.password, signupData.name);
      refreshUser();
      setCurrentView('onboarding');
      triggerToast(`🎉 Account created for ${signupData.name || signupData.email}! Let's set up your profile and parse your resume.`);
    } catch (err) {
      triggerToast(`⚠️ ${err.message || 'Registration failed'}`);
    }
  };

  const handleCompleteOnboarding = async (formData) => {
    await api.submitOnboarding(formData);
    refreshUser();
    setCurrentView('dashboard');
    triggerToast(`✨ Onboarding complete! High-match roles ready for review.`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-800">
      
      {/* Toast Notification Banner */}
      {showToast && (
        <div className="fixed top-20 right-4 z-50 animate-in fade-in slide-in-from-top-4 duration-200 max-w-md">
          <div className="bg-slate-900 text-white text-xs sm:text-sm font-bold px-4 py-3 rounded-2xl shadow-elevated border border-slate-700 flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0 animate-ping"></span>
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Main Navbar */}
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        user={user}
        onOpenTopUp={() => setIsTopUpOpen(true)}
        onLogout={() => {
          setCurrentView('landing');
          triggerToast('Logged out.');
        }}
      />

      {/* Active View Container */}
      <main className="flex-1">
        {currentView === 'landing' && (
          <LandingPage
            user={user}
            jobs={jobs}
            savedJobIds={savedJobIds}
            appliedJobs={appliedJobs}
            testimonials={testimonials}
            onToggleSaveJob={handleToggleSaveJob}
            onConfirmApply={handleConfirmApply}
            onTopUpSuccess={handleTopUpSuccess}
            onAddTestimonial={handleAddTestimonial}
            onStartSignUp={(email) => {
              setInitialAuthEmail(email || '');
              setCurrentView('auth');
            }}
            onLoginClick={() => setCurrentView('auth')}
            onOpenDashboard={() => setCurrentView('dashboard')}
          />
        )}

        {currentView === 'auth' && (
          <AuthPage
            initialEmail={initialAuthEmail}
            onLoginSuccess={handleLoginSuccess}
            onStartOnboarding={handleStartOnboarding}
          />
        )}

        {currentView === 'onboarding' && (
          <OnboardingPage
            initialEmail={user?.email}
            initialName={user?.name}
            onCompleteOnboarding={handleCompleteOnboarding}
          />
        )}

        {currentView === 'dashboard' && (
          <DashboardPage
            user={user}
            jobs={jobs}
            savedJobIds={savedJobIds}
            appliedJobs={appliedJobs}
            testimonials={testimonials}
            onToggleSaveJob={handleToggleSaveJob}
            onConfirmApply={handleConfirmApply}
            onTopUpSuccess={handleTopUpSuccess}
            onAddTestimonial={handleAddTestimonial}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 px-4 text-center text-xs text-slate-700 font-medium">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-slate-900">CANDIDATE.ph</span>
            <span className="text-slate-700">• High-Speed Job Matching Platform</span>
          </div>
          <div className="flex items-center gap-4 text-slate-600 font-semibold">
            <span>₱0 Free Forever to Scan & Match</span>
            <span className="text-slate-400">•</span>
            <span>₱50 per Quick Apply</span>
            <span className="text-slate-400">•</span>
            <span>Secured via PayMongo</span>
          </div>
        </div>
      </footer>

      {/* Global Top Up Modal */}
      <TopUpModal
        isOpen={isTopUpOpen}
        onClose={() => setIsTopUpOpen(false)}
        currentBalance={user?.walletBalance ?? 50}
        onTopUpSuccess={handleTopUpSuccess}
      />


    </div>
  );
}
