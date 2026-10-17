import React, { useState } from 'react';
import { X, Check, ShieldCheck, Wallet, ArrowRight, Zap, CreditCard, Smartphone, Sparkles, Gift } from 'lucide-react';

export default function TopUpModal({ isOpen, onClose, currentBalance, onTopUpSuccess, onOpenInvite }) {
  if (!isOpen) return null;

  const [selectedAmount, setSelectedAmount] = useState(500);
  const [paymentMethod, setPaymentMethod] = useState('gcash');
  const [isProcessing, setIsProcessing] = useState(false);

  // PayMongo application bundles
  const BUNDLES = [
    {
      amount: 200,
      apps: 4,
      bonus: 'Standard Rate',
      unitPrice: '₱50.00 / app',
      label: 'Starter Bundle',
      popular: false
    },
    {
      amount: 500,
      apps: 11,
      bonus: '+1 Free App (Save 10%)',
      unitPrice: '₱45.45 / app',
      label: 'Job Hunter Pack',
      popular: true
    },
    {
      amount: 1000,
      apps: 24,
      bonus: '+4 Free Apps (Save 17%)',
      unitPrice: '₱41.67 / app',
      label: 'Career Sprint Bundle',
      popular: false
    }
  ];

  const handlePay = async () => {
    setIsProcessing(true);
    // Simulate PayMongo instant checkout callback
    setTimeout(() => {
      setIsProcessing(false);
      onTopUpSuccess(selectedAmount);
      onClose();
    }, 700);
  };

  const selectedBundle = BUNDLES.find(b => b.amount === selectedAmount) || BUNDLES[1];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200 w-full max-w-lg my-0 sm:my-8 overflow-hidden transition-all animate-in slide-in-from-bottom sm:slide-in-from-bottom-0 sm:fade-in sm:zoom-in-95 duration-200 flex flex-col max-h-[92dvh] sm:max-h-[90vh]">
        
        {/* Top Header */}
        <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white p-4 sm:p-6 relative shrink-0">
          {/* Mobile Bottom-Sheet Pull Indicator */}
          <div className="w-12 h-1.5 bg-white/30 rounded-full mx-auto mb-3 sm:hidden" />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shrink-0">
                <Wallet className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold text-blue-200 uppercase tracking-wider block">
                  PayMongo Instant Checkout
                </span>
                <h3 className="text-lg sm:text-xl font-black text-white">Buy Credits</h3>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0 ml-2"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-white/10 flex items-center justify-between text-xs">
            <span className="text-blue-200">Current Wallet Balance:</span>
            <span className="font-black text-white text-base">₱{currentBalance}.00</span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 sm:space-y-5 flex-1">

          {/* Unit Economics Reassurance */}
          <div className="text-xs text-slate-600 bg-slate-50 p-3.5 rounded-2xl border border-slate-200 flex items-start gap-2.5">
            <Zap className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <p className="font-bold text-slate-800">₱0 Scanning & Matching Free Forever</p>
              <p className="text-[11px] text-slate-500">
                Credits are debited at ₱50 per application <strong>only upon verified delivery to the employer</strong>. If delivery fails, cost is ₱0.
              </p>
            </div>
          </div>

          {/* Select Credit Bundle */}
          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5">
              Select Credit Bundle:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {BUNDLES.map((bundle) => (
                <button
                  key={bundle.amount}
                  type="button"
                  onClick={() => setSelectedAmount(bundle.amount)}
                  className={`p-3.5 rounded-2xl border text-left relative transition-all flex flex-col justify-between ${
                    selectedAmount === bundle.amount
                      ? 'border-blue-600 bg-blue-50/70 shadow-sm ring-2 ring-blue-500/20'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  {bundle.popular && (
                    <span className="absolute -top-2.5 right-2.5 bg-blue-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                      Popular
                    </span>
                  )}
                  {bundle.bonus && !bundle.popular && bundle.amount === 1000 && (
                    <span className="absolute -top-2.5 right-2.5 bg-emerald-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                      Best Value
                    </span>
                  )}

                  <div>
                    <div className="text-lg font-black text-slate-900">
                      ₱{bundle.amount}
                    </div>
                    <div className="text-xs text-blue-700 font-extrabold mt-0.5">
                      {bundle.apps} Applications
                    </div>
                  </div>

                  <div className="mt-2 pt-2 border-t border-slate-100">
                    <p className="text-[10px] text-slate-400 font-medium">
                      {bundle.unitPrice}
                    </p>
                    {bundle.bonus && (
                      <p className="text-[10px] font-bold text-emerald-700 mt-0.5">
                        {bundle.bonus}
                      </p>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Transparent Feature Guarantee Across All Tiers */}
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs text-slate-700 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-slate-900">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>All bundles include 100% of CANDIDATE.ph capabilities:</span>
            </div>
            <p className="text-[11px] text-slate-600 pl-5.5 leading-relaxed">
              Direct Employer ATS Dispatch • ATS Resume Tailoring & Tailored Cover Letter • Official Recruiter Receipts • Credits Never Expire. Loading more simply unlocks higher volume discounts.
            </p>
          </div>

          {/* Want Free Credits? Viral Referral Callout */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-blue-50 via-indigo-50 to-slate-50 border border-blue-200/80 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Gift className="w-4 h-4 text-amber-300" />
              </div>
              <div>
                <p className="font-extrabold text-slate-900">Want free credits instead?</p>
                <p className="text-[11px] text-slate-600">Get ₱50 added to your wallet when your invited friend signs up.</p>
              </div>
            </div>
            {onOpenInvite && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenInvite();
                }}
                className="px-3 py-1.5 bg-white hover:bg-blue-50 text-blue-700 font-extrabold text-xs rounded-xl border border-blue-300 shadow-xs cursor-pointer shrink-0 transition-colors"
              >
                Invite Friend
              </button>
            )}
          </div>

          {/* Payment Channels (PayMongo) */}
          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5 flex items-center justify-between">
              <span>Payment Channel:</span>
              <span className="text-[10px] text-slate-400 font-semibold">Processed securely via PayMongo</span>
            </label>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setPaymentMethod('gcash')}
                className={`p-3 min-h-[52px] rounded-2xl border font-bold flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                  paymentMethod === 'gcash'
                    ? 'border-blue-600 bg-blue-50 text-blue-700 ring-2 ring-blue-500/20 shadow-xs'
                    : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Smartphone className="w-4 h-4 text-blue-600" />
                <span>GCash</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('maya')}
                className={`p-3 min-h-[52px] rounded-2xl border font-bold flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                  paymentMethod === 'maya'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-700 ring-2 ring-emerald-500/20 shadow-xs'
                    : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Smartphone className="w-4 h-4 text-emerald-600" />
                <span>Maya</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3 min-h-[52px] rounded-2xl border font-bold flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                  paymentMethod === 'card'
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-700 ring-2 ring-indigo-500/20 shadow-xs'
                    : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <CreditCard className="w-4 h-4 text-indigo-600" />
                <span>Card (Visa/MC)</span>
              </button>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-2">
            <button
              type="button"
              disabled={isProcessing}
              onClick={handlePay}
              className="w-full min-h-[52px] py-4 px-4 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-extrabold rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
            >
              {isProcessing ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Connecting to PayMongo...</span>
                </div>
              ) : (
                <>
                  <span>Pay ₱{selectedAmount}.00 for {selectedBundle.apps} Applications</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          {/* Trust Guarantees */}
          <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>256-Bit SSL Encrypted • Instant Crediting to Wallet</span>
          </div>

        </div>

      </div>
    </div>
  );
}
