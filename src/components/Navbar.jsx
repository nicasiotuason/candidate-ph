import React from 'react';
import { Wallet, Plus, LogOut, ArrowRight, User, LayoutDashboard, Sparkles, ArrowLeft } from 'lucide-react';

export default function Navbar({ currentView, setCurrentView, user, onOpenTopUp, onLogout }) {
  const isLanding = currentView === 'landing';
  const isAuth = currentView === 'auth';
  const isOnboarding = currentView === 'onboarding';
  const isDashboard = currentView === 'dashboard';

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Wordmark */}
          <button
            onClick={() => setCurrentView('landing')}
            className="flex items-center gap-2.5 group text-left cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <span className="font-black text-lg">C</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className="text-xl font-extrabold tracking-tight text-slate-900">CANDIDATE</span>
                <span className="text-xs px-1.5 py-0.5 rounded bg-blue-50 text-blue-600 font-bold border border-blue-200">.ph</span>
              </div>
            </div>
          </button>

          {/* 1. PUBLIC LANDING PAGE NAVIGATION (Only shown to public visitors) */}
          {isLanding && (
            <>
              <nav className="hidden md:flex items-center space-x-1 lg:space-x-3 text-sm font-medium text-slate-600">
                <a 
                  href="#how-it-works" 
                  className="px-3 py-2 rounded-lg hover:text-slate-900 hover:bg-slate-50 transition-colors"
                >
                  How It Works
                </a>
                <a 
                  href="#comparison" 
                  className="px-3 py-2 rounded-lg hover:text-slate-900 hover:bg-slate-50 transition-colors"
                >
                  Old Way vs Candidate
                </a>
                <a 
                  href="#dashboard-preview" 
                  className="px-3 py-2 rounded-lg text-blue-600 font-bold hover:bg-blue-50 transition-colors"
                >
                  Inside the Dashboard
                </a>
                <a 
                  href="#the-science" 
                  className="px-3 py-2 rounded-lg hover:text-slate-900 hover:bg-slate-50 transition-colors"
                >
                  The Strategy
                </a>
                <a 
                  href="#pricing" 
                  className="px-3 py-2 rounded-lg hover:text-slate-900 hover:bg-slate-50 transition-colors"
                >
                  Pricing (<span className="text-amber-600 font-bold">₱0 to Search</span>)
                </a>
              </nav>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setCurrentView('auth')}
                  className="px-3.5 py-2 text-sm font-semibold text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Log In
                </button>
                <button
                  onClick={() => setCurrentView('auth')}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 rounded-xl shadow-sm transition-all cursor-pointer"
                >
                  <span>Claim ₱50 Free Balance</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </>
          )}

          {/* 2. AUTHENTICATED CUSTOMER DASHBOARD NAVIGATION */}
          {isDashboard && (
            <>
              <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 text-xs font-bold text-slate-600">
                <span className="px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-1.5">
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>Applicant Portal</span>
                </span>
                <span className="text-slate-400">•</span>
                <span className="text-slate-500 font-medium">
                  Candidate ID: <strong className="text-slate-800">{user?.id || 'USR-01'}</strong>
                </span>
              </nav>

              <div className="flex items-center space-x-3">
                {/* Wallet Pill */}
                <div className="flex items-center bg-slate-50 border border-slate-200 rounded-2xl p-1 pr-1.5">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 text-xs">
                    <Wallet className="w-3.5 h-3.5 text-blue-600" />
                    <span className="text-slate-500 font-medium">Wallet:</span>
                    <span className="font-extrabold text-slate-900 text-sm">
                      ₱{user?.walletBalance ?? 250}.00
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium hidden sm:inline">
                      ({Math.floor((user?.walletBalance ?? 250) / 50)} apps)
                    </span>
                  </div>
                  <button
                    onClick={onOpenTopUp}
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition-colors cursor-pointer"
                    title="Reload with PayMongo"
                  >
                    <Plus className="w-3 h-3 stroke-[3]" />
                    <span>Top Up</span>
                  </button>
                </div>

                {/* Profile Pill & Log Out */}
                <div className="flex items-center gap-2 pl-1 border-l border-slate-200">
                  <div className="flex items-center gap-2 p-1.5 text-left">
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                      {user?.name ? user.name.substring(0, 2).toUpperCase() : 'JD'}
                    </div>
                    <div className="hidden lg:block">
                      <p className="text-xs font-bold text-slate-900 leading-none">{user?.name || 'Juan Dela Cruz'}</p>
                      <p className="text-[10px] text-slate-500 leading-none mt-1">Verified Candidate</p>
                    </div>
                  </div>

                  <button
                    onClick={onLogout}
                    className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                    title="Sign Out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </>
          )}

          {/* 3. ONBOARDING & AUTH VIEW HEADERS */}
          {(isAuth || isOnboarding) && (
            <div className="flex items-center gap-3">
              <button
                onClick={() => setCurrentView('landing')}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 px-3 py-2 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
              </button>
            </div>
          )}

        </div>
      </div>

      {/* Discrete Floating Preview Navigator for Testing (Bottom Right Corner) */}
      <div className="fixed bottom-4 right-4 z-50 bg-slate-900/90 backdrop-blur-md text-slate-300 p-1.5 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-1 text-[11px]">
        <span className="text-[10px] font-bold text-slate-400 px-2 uppercase tracking-wider hidden sm:inline">Preview:</span>
        <button
          onClick={() => setCurrentView('landing')}
          className={`px-2.5 py-1 rounded-xl font-bold transition-all ${
            isLanding ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 text-slate-400'
          }`}
        >
          Landing
        </button>
        <button
          onClick={() => setCurrentView('auth')}
          className={`px-2.5 py-1 rounded-xl font-bold transition-all ${
            isAuth ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 text-slate-400'
          }`}
        >
          Login
        </button>
        <button
          onClick={() => setCurrentView('onboarding')}
          className={`px-2.5 py-1 rounded-xl font-bold transition-all ${
            isOnboarding ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 text-slate-400'
          }`}
        >
          Onboarding
        </button>
        <button
          onClick={() => setCurrentView('dashboard')}
          className={`px-2.5 py-1 rounded-xl font-bold transition-all ${
            isDashboard ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 text-slate-400'
          }`}
        >
          Dashboard
        </button>
      </div>

    </header>
  );
}
