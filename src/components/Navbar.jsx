import React from 'react';
import { Zap, Wallet, Plus, User, LogOut, ArrowRight, LayoutDashboard, Compass, Sparkles } from 'lucide-react';

export default function Navbar({ currentView, setCurrentView, user, onOpenTopUp, onLogout }) {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      {/* Dev / Demo Quick Navigation Bar */}
      <div className="bg-slate-900 text-slate-300 px-4 py-1.5 text-xs flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-semibold text-white tracking-wide">CANDIDATE.ph Live Preview</span>
          <span className="text-slate-400 hidden sm:inline">• Switch views:</span>
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto">
          <button
            onClick={() => setCurrentView('landing')}
            className={`px-2.5 py-0.5 rounded text-[11px] font-medium transition-colors ${
              currentView === 'landing' ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 text-slate-300'
            }`}
          >
            Landing Page
          </button>
          <button
            onClick={() => setCurrentView('auth')}
            className={`px-2.5 py-0.5 rounded text-[11px] font-medium transition-colors ${
              currentView === 'auth' ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 text-slate-300'
            }`}
          >
            Login / Sign-up
          </button>
          <button
            onClick={() => setCurrentView('onboarding')}
            className={`px-2.5 py-0.5 rounded text-[11px] font-medium transition-colors ${
              currentView === 'onboarding' ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 text-slate-300'
            }`}
          >
            Onboarding Wizard
          </button>
          <button
            onClick={() => setCurrentView('dashboard')}
            className={`px-2.5 py-0.5 rounded text-[11px] font-medium transition-colors ${
              currentView === 'dashboard' ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 text-slate-300'
            }`}
          >
            Customer Dashboard
          </button>
        </div>
      </div>

      {/* Main Brand Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Wordmark */}
          <button
            onClick={() => setCurrentView('landing')}
            className="flex items-center gap-2.5 group text-left"
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

          {/* Center Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-3 text-sm font-medium text-slate-600">
            <button
              onClick={() => setCurrentView('landing')}
              className={`px-3 py-2 rounded-lg transition-colors ${
                currentView === 'landing' ? 'text-blue-600 bg-blue-50/70 font-semibold' : 'hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Explore
            </button>
            <button
              onClick={() => setCurrentView('dashboard')}
              className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
                currentView === 'dashboard' ? 'text-blue-600 bg-blue-50/70 font-bold' : 'hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-blue-600" />
              <span>Dashboard</span>
              <span className="text-[10px] bg-orange-100 text-orange-700 px-1.5 py-0.2 rounded-full font-bold">60%+ Match</span>
            </button>
            <button
              onClick={() => setCurrentView('onboarding')}
              className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1 ${
                currentView === 'onboarding' ? 'text-blue-600 bg-blue-50/70 font-semibold' : 'hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>AI Resume Profile</span>
            </button>
          </nav>

          {/* Right Header Controls: Wallet & Account */}
          <div className="flex items-center space-x-3">
            {/* Wallet Pill */}
            <div className="flex items-center bg-slate-50 hover:bg-slate-100/90 border border-slate-200 rounded-2xl p-1 pr-1.5 transition-all">
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
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition-colors"
                title="Reload via PayMongo"
              >
                <Plus className="w-3 h-3 stroke-[3]" />
                <span>Top Up</span>
              </button>
            </div>

            {/* Profile or Login CTA */}
            {user?.isOnboarded ? (
              <div className="flex items-center gap-2 pl-1">
                <button
                  onClick={() => setCurrentView('dashboard')}
                  className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 transition-colors text-left"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                    {user.name ? user.name.substring(0, 2).toUpperCase() : 'JD'}
                  </div>
                  <div className="hidden lg:block">
                    <p className="text-xs font-bold text-slate-900 leading-none">{user.name}</p>
                    <p className="text-[10px] text-slate-500 leading-none mt-1">Verified Candidate</p>
                  </div>
                </button>
              </div>
            ) : (
              <button
                onClick={() => setCurrentView('auth')}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition-all"
              >
                <span>Log In</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}
