import React, { useState } from 'react';
import { Wallet, Plus, LogOut, ArrowRight, User, LayoutDashboard, Sparkles, ArrowLeft, Menu, X } from 'lucide-react';
import { formatProperName } from '../utils/formatters';

export default function Navbar({ currentView, setCurrentView, user, onOpenTopUp, onLogout }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
            onClick={() => {
              setCurrentView('landing');
              setMobileMenuOpen(false);
            }}
            className="flex items-center gap-2 group text-left cursor-pointer shrink-0"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <span className="font-black text-base sm:text-lg">C</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-base sm:text-xl font-extrabold tracking-wider text-slate-900">CANDIDATE</span>
              <span className="text-[10px] sm:text-xs px-1 sm:px-1.5 py-0.5 rounded bg-blue-50 text-blue-600 font-bold border border-blue-200">.ph</span>
            </div>
          </button>

          {/* 1. PUBLIC LANDING PAGE NAVIGATION (Only shown to public visitors) */}
          {isLanding && (
            <>
              {/* Desktop Nav - only visible at lg and up to prevent any wrapping */}
              <nav className="hidden lg:flex items-center space-x-1 xl:space-x-3 text-sm font-medium text-slate-700">
                <a 
                  href="#how-it-works" 
                  className="px-3 py-2 rounded-lg hover:text-slate-900 hover:bg-slate-50 transition-colors whitespace-nowrap"
                >
                  How It Works
                </a>
                <a 
                  href="#comparison" 
                  className="px-3 py-2 rounded-lg hover:text-slate-900 hover:bg-slate-50 transition-colors whitespace-nowrap"
                >
                  Old Way vs Candidate
                </a>
                <a 
                  href="#dashboard-preview" 
                  className="px-3 py-2 rounded-lg hover:text-slate-900 hover:bg-slate-50 transition-colors whitespace-nowrap"
                >
                  Inside the Dashboard
                </a>
                <a 
                  href="#the-science" 
                  className="px-3 py-2 rounded-lg hover:text-slate-900 hover:bg-slate-50 transition-colors whitespace-nowrap"
                >
                  The Strategy
                </a>
                <a 
                  href="#pricing" 
                  className="px-3 py-2 rounded-lg hover:text-slate-900 hover:bg-slate-50 transition-colors whitespace-nowrap"
                >
                  Pricing
                </a>
                <a 
                  href="#faq" 
                  className="px-3 py-2 rounded-lg hover:text-slate-900 hover:bg-slate-50 transition-colors whitespace-nowrap"
                >
                  FAQ
                </a>
              </nav>

              <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
                <button
                  onClick={() => setCurrentView('auth')}
                  className="px-3 sm:px-3.5 py-2 text-xs sm:text-sm font-semibold text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer whitespace-nowrap"
                >
                  Log In
                </button>
                <button
                  onClick={() => setCurrentView('auth')}
                  className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-white bg-blue-600 hover:bg-blue-700 active:scale-95 rounded-xl shadow-sm transition-all cursor-pointer whitespace-nowrap"
                >
                  <div className="flex flex-col text-left leading-tight">
                    <span className="text-xs sm:text-[13px] font-black tracking-wide">SIGN UP</span>
                    <span className="text-[9px] sm:text-[10px] font-semibold text-blue-100">Get 5 free applications</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 text-amber-300" />
                </button>

                {/* Mobile Menu Hamburger (visible below lg) */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors lg:hidden"
                  aria-label="Toggle Navigation Menu"
                >
                  {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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
                <span className="text-slate-700 font-medium">
                  Candidate ID: <strong className="text-slate-900">{user?.id || 'USR-01'}</strong>
                </span>
              </nav>

              <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
                {/* Wallet Pill */}
                <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl p-0.5 sm:p-1 pr-1 sm:pr-1.5">
                  <div className="flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-2.5 py-1 text-xs">
                    <Wallet className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span className="text-slate-700 font-medium hidden md:inline">Wallet:</span>
                    <span className="font-extrabold text-slate-900 text-xs sm:text-sm">
                      ₱{user?.walletBalance ?? 250}
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium hidden sm:inline">
                      ({Math.floor((user?.walletBalance ?? 250) / 50)} apps)
                    </span>
                  </div>
                  <button
                    onClick={onOpenTopUp}
                    className="inline-flex items-center gap-0.5 sm:gap-1 px-2 sm:px-2.5 py-1 text-[11px] sm:text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg sm:rounded-xl shadow-xs transition-colors cursor-pointer shrink-0"
                    title="Buy Credits via PayMongo"
                  >
                    <Plus className="w-3 h-3 stroke-[3]" />
                    <span className="hidden sm:inline">Buy Credits</span>
                    <span className="sm:hidden">Top Up</span>
                  </button>
                </div>

                {/* Profile Pill & Log Out */}
                <div className="flex items-center gap-1 sm:gap-2 pl-1 border-l border-slate-200 shrink-0">
                  <div className="flex items-center gap-1.5 p-0.5 sm:p-1.5 text-left">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shadow-xs shrink-0">
                      {formatProperName(user?.name || 'Juan Dela Cruz').split(' ').map(w => w[0]).slice(0, 2).join('')}
                    </div>
                    <div className="hidden lg:block">
                      <p className="text-xs font-bold text-slate-900 leading-none">{formatProperName(user?.name || 'Juan Dela Cruz')}</p>
                      <p className="text-[10px] text-slate-600 leading-none mt-1">Verified Candidate</p>
                    </div>
                  </div>

                  <button
                    onClick={onLogout}
                    className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
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

      {/* Mobile Drawer Menu on Landing Page */}
      {isLanding && mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-5 space-y-2 shadow-lg animate-in slide-in-from-top-2 duration-150">
          <nav className="flex flex-col space-y-1 text-sm font-semibold text-slate-700">
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors"
            >
              How It Works
            </a>
            <a
              href="#comparison"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors"
            >
              Old Way vs Candidate
            </a>
            <a
              href="#dashboard-preview"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors"
            >
              Inside the Dashboard
            </a>
            <a
              href="#the-science"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors"
            >
              The Strategy
            </a>
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors"
            >
              Pricing (₱0 to Search)
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors"
            >
              FAQ
            </a>
          </nav>
        </div>
      )}

    </header>
  );
}
