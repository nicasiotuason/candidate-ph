import React, { useState, useEffect } from 'react';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, ShieldCheck, UserPlus, LogIn } from 'lucide-react';

export default function AuthPage({ initialEmail = '', onLoginSuccess, onStartOnboarding }) {
  const [isSignUp, setIsSignUp] = useState(true);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState(initialEmail || '');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (initialEmail) {
      setEmail(initialEmail);
    }
  }, [initialEmail]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      if (isSignUp) {
        onStartOnboarding({ 
          email: email.trim() || 'new.applicant@email.com',
          name: fullName.trim() || (email ? email.split('@')[0] : 'Applicant'),
          password 
        });
      } else {
        onLoginSuccess({ email: email.trim() || 'juan.delacruz@email.com' });
      }
    }, 450);
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-2 sm:py-4 grid-dot-pattern">
      <div className="bg-white rounded-3xl shadow-elevated border border-slate-200 w-full max-w-md p-5 sm:p-6 relative">
        
        {/* Brand Header */}
        <div className="text-center mb-2.5">
          <div className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-blue-600 text-white font-black text-lg shadow-md mb-1.5">
            C
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {isSignUp ? 'Join CANDIDATE.ph' : 'Welcome Back'}
          </h2>
          <p className="text-xs text-slate-800 font-medium mt-0.5">
            {isSignUp
              ? 'Create your candidate account to search 15,443+ professional roles.'
              : 'Log in to your dashboard and review active matched roles.'}
          </p>
        </div>

        {/* ₱250 Welcome Credits Promotion Banner */}
        {isSignUp && (
          <div className="mb-3 p-2.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-2 text-xs text-emerald-950 font-semibold shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
            <span>
              🎉 <strong>₱250 welcome credit added automatically.</strong> Your first 5 applications are on us.
            </span>
          </div>
        )}

        {/* Mode Switcher Tabs */}
        <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-2xl mb-3 text-xs font-bold border border-slate-200">
          <button
            type="button"
            onClick={() => setIsSignUp(true)}
            className={`py-1.5 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              isSignUp ? 'bg-white text-blue-700 shadow-sm font-black' : 'text-slate-700 hover:text-slate-950 font-semibold'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Create Account</span>
          </button>
          <button
            type="button"
            onClick={() => setIsSignUp(false)}
            className={`py-1.5 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              !isSignUp ? 'bg-white text-blue-700 shadow-sm font-black' : 'text-slate-700 hover:text-slate-950 font-semibold'
            }`}
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Sign In</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-2.5">
          {/* Full Name field (Only for Sign Up) */}
          {isSignUp && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-black text-slate-900">
                  Full Legal Name:
                </label>
                <span className="text-[11px] text-slate-700 font-semibold">As shown on your resume</span>
              </div>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-2.5 pointer-events-none" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Juan Dela Cruz"
                  className="w-full pl-10 pr-3 py-2 text-xs text-slate-900 font-medium placeholder:text-slate-500 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-600 focus:outline-none transition-all"
                />
              </div>
            </div>
          )}

          {/* Email field */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-black text-slate-900">
                Professional Email Address:
              </label>
              <span className="text-[11px] text-blue-700 font-bold">Direct reply target</span>
            </div>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-2.5 pointer-events-none" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="juan.delacruz@email.com"
                className="w-full pl-10 pr-3 py-2 text-xs text-slate-900 font-medium placeholder:text-slate-500 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-600 focus:outline-none transition-all"
              />
            </div>
            <p className="text-[11px] sm:text-xs text-slate-700 font-medium mt-1 leading-normal">
              Employers reply straight to this inbox. We never stand in between.
            </p>
          </div>

          {/* Password field */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-black text-slate-900">
                Password:
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-xs text-blue-700 hover:text-blue-900 font-bold flex items-center gap-1 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                <span>{showPassword ? 'Hide' : 'Show'}</span>
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-2.5 pointer-events-none" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-10 py-2 text-xs text-slate-900 font-medium placeholder:text-slate-500 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-600 focus:outline-none transition-all"
              />
            </div>
            <p className="text-[11px] sm:text-xs text-slate-700 font-medium mt-1">
              Must be at least 8 characters
            </p>
          </div>

          {/* Terms & Privacy Guarantee micro-copy */}
          {isSignUp && (
            <p className="text-[11px] sm:text-xs text-slate-700 leading-normal text-center pt-0.5 font-medium">
              By creating an account, you agree to CANDIDATE.ph's Terms of Service & Privacy Guarantee. Your profile is private and never broadcast without your consent.
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-extrabold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-1.5"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : isSignUp ? (
              <div className="flex flex-col items-center justify-center leading-tight py-0.5">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs sm:text-sm font-black tracking-wide">Sign up</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </div>
                <span className="text-[10px] sm:text-[11px] font-semibold text-blue-100">Get your free applications</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 py-1">
                <span className="text-xs sm:text-sm font-bold">Log In to Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            )}
          </button>
        </form>

        {/* Trust Guarantees */}
        <div className="mt-3.5 text-center text-xs text-slate-700 font-semibold">
          <p className="flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Encrypted credentials • Zero third-party trackers</span>
          </p>
        </div>

      </div>
    </div>
  );
}
