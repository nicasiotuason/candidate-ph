import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, Zap, CheckCircle2, ShieldCheck, Sparkles, UserPlus, LogIn } from 'lucide-react';

export default function AuthPage({ onLoginSuccess, onStartOnboarding }) {
  const [isSignUp, setIsSignUp] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      if (isSignUp) {
        onStartOnboarding({ email: email || 'new.applicant@email.com' });
      } else {
        onLoginSuccess({ email: email || 'juan.delacruz@email.com' });
      }
    }, 450);
  };

  // Demo shortcut helper
  const handleQuickDemo = (type) => {
    if (type === 'existing') {
      setEmail('juan.delacruz@email.com');
      setPassword('password123');
      onLoginSuccess({ email: 'juan.delacruz@email.com' });
    } else {
      setEmail('maria.santos@email.com');
      setPassword('password123');
      onStartOnboarding({ email: 'maria.santos@email.com' });
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 grid-dot-pattern">
      <div className="bg-white rounded-3xl shadow-elevated border border-slate-200 w-full max-w-md p-6 sm:p-8 relative">
        
        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-600 text-white font-black text-2xl shadow-md mb-3">
            C
          </div>
          <h2 className="text-2xl font-black text-slate-900">
            {isSignUp ? 'Join CANDIDATE.ph' : 'Welcome Back'}
          </h2>
          <p className="text-xs text-slate-700 mt-1">
            {isSignUp
              ? 'Create an account to search 15,443+ professional roles and get matched.'
              : 'Log in to your dashboard and review active matched roles.'}
          </p>
        </div>

        {/* ₱50 Welcome Balance Promotion Banner */}
        {isSignUp && (
          <div className="mb-6 p-3 rounded-2xl bg-amber-50 border border-amber-200 flex items-center gap-2.5 text-xs text-amber-900 font-semibold">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse shrink-0"></span>
            <span>
              🎉 <strong>₱50 Welcome Balance</strong> included automatically (1st application is 100% on us).
            </span>
          </div>
        )}

        {/* Mode Switcher Tabs */}
        <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-2xl mb-6 text-xs font-bold">
          <button
            type="button"
            onClick={() => setIsSignUp(true)}
            className={`py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              isSignUp ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Create Account</span>
          </button>
          <button
            type="button"
            onClick={() => setIsSignUp(false)}
            className={`py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              !isSignUp ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Sign In</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold text-slate-700">
                Professional Email Address:
              </label>
              <span className="text-[10px] text-blue-600 font-medium">Direct reply target</span>
            </div>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="juan.delacruz@email.com"
                className="w-full pl-10 pr-3 py-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Employers will reply directly to this inbox — CANDIDATE.ph never acts as a middleman.
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold text-slate-700">
                Password:
              </label>
              <span className="text-[10px] text-slate-400">Min. 8 characters</span>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
              <input
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-3 py-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-extrabold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <span>{isSignUp ? 'SIGN UP — Claim ₱50 First Application' : 'Log In to Dashboard'}</span>
                <ArrowRight className="w-4 h-4 text-amber-300" />
              </>
            )}
          </button>
        </form>

        {/* Quick Demo Pre-fill Box for Pair Programming Testing */}
        <div className="mt-6 pt-5 border-t border-slate-200">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 text-center">
            ⚡ Quick Demo Buttons (One-Click Test):
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={() => handleQuickDemo('existing')}
              className="p-2.5 rounded-xl border border-blue-200 bg-blue-50/60 hover:bg-blue-100/60 text-blue-800 font-bold text-left transition-colors"
            >
              <div className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-blue-600" />
                <span>Existing User</span>
              </div>
              <p className="text-[10px] text-blue-600/80 font-normal mt-0.5">Juan (Go to Dashboard)</p>
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemo('new')}
              className="p-2.5 rounded-xl border border-emerald-200 bg-emerald-50/60 hover:bg-emerald-100/60 text-emerald-800 font-bold text-left transition-colors"
            >
              <div className="flex items-center gap-1">
                <UserPlus className="w-3 h-3 text-emerald-600" />
                <span>New Applicant</span>
              </div>
              <p className="text-[10px] text-emerald-600/80 font-normal mt-0.5">Try Onboarding Flow</p>
            </button>
          </div>
        </div>

        {/* Trust Guarantees */}
        <div className="mt-5 text-center text-[11px] text-slate-400 font-medium space-y-1">
          <p className="flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Encrypted data • Never sold to third parties</span>
          </p>
        </div>

      </div>
    </div>
  );
}
