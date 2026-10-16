import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import OnboardingPage from './pages/OnboardingPage';
import DashboardPage from './pages/DashboardPage';
import TopUpModal from './components/TopUpModal';
import ReviewSignOffModal from './components/ReviewSignOffModal';
import { api } from './services/api';

export default function App() {
  const getInitialView = () => {
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    if (path.includes('signup') || path.includes('auth') || hash.includes('auth') || hash.includes('signup')) {
      return 'auth';
    }
    if (path.includes('onboarding') || hash.includes('onboarding')) {
      return 'onboarding';
    }
    if (path.includes('dashboard') || hash.includes('dashboard')) {
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
  const [jobs, setJobs] = useState([]);
  const [savedJobIds, setSavedJobIds] = useState(api.getSavedJobIds());
  const [appliedJobs, setAppliedJobs] = useState(api.getAppliedJobs());
  const [testimonials, setTestimonials] = useState(api.getTestimonials());

  // Global modals
  const [isTopUpOpen, setIsTopUpOpen] = useState(false);
  const [selectedJobForLandingApply, setSelectedJobForLandingApply] = useState(null);
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

  // Load initial jobs and self-heal demo state if needed
  useEffect(() => {
    const curUser = api.getUser();
    const curApplied = api.getAppliedJobs();
    if ((curUser && curUser.walletBalance < 250) || (curApplied && curApplied.length > 1)) {
      api.resetDemoState();
      setUser(api.getUser());
      setAppliedJobs(api.getAppliedJobs());
    }
    api.getJobs(60).then(data => setJobs(data));
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
      setSelectedJobForLandingApply(null);
    } catch (err) {
      triggerToast(`⚠️ ${err.message}`);
    }
  };

  // Handle PayMongo credit purchase
  const handleTopUpSuccess = async (amount) => {
    const res = await api.topUpWallet(amount);
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
  const handleLoginSuccess = (loginData) => {
    api.login(loginData.email);
    refreshUser();
    setCurrentView('dashboard');
    triggerToast(`👋 Welcome back, ${loginData.email.split('@')[0]}!`);
  };

  const handleStartOnboarding = (signupData) => {
    api.register(signupData.email, signupData.password, signupData.name);
    refreshUser();
    setCurrentView('onboarding');
    triggerToast(`🎉 Account created for ${signupData.name || signupData.email}! Let's set up your profile and parse your resume.`);
  };

  const handleCompleteOnboarding = async (formData) => {
    await api.submitOnboarding(formData);
    refreshUser();
    setCurrentView('dashboard');
    triggerToast(`✨ Onboarding complete! 18 High-Match roles ready for review.`);
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
            onQuickApplyFromLanding={(job) => setSelectedJobForLandingApply(job)}
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
        currentBalance={user?.walletBalance ?? 250}
        onTopUpSuccess={handleTopUpSuccess}
      />

      {/* Quick Apply Sign-Off Modal triggered from Landing Page */}
      {selectedJobForLandingApply && (
        <ReviewSignOffModal
          job={selectedJobForLandingApply}
          user={user}
          isOpen={Boolean(selectedJobForLandingApply)}
          onClose={() => setSelectedJobForLandingApply(null)}
          onConfirmApply={handleConfirmApply}
          onOpenTopUp={() => {
            setSelectedJobForLandingApply(null);
            setIsTopUpOpen(true);
          }}
        />
      )}

    </div>
  );
}
