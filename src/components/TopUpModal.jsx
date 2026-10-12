import React, { useState } from 'react';
import { X, Check, ShieldCheck, Wallet, ArrowRight, Zap, CreditCard, Smartphone } from 'lucide-react';

export default function TopUpModal({ isOpen, onClose, currentBalance, onTopUpSuccess }) {
  if (!isOpen) return null;

  const [selectedAmount, setSelectedAmount] = useState(250);
  const [paymentMethod, setPaymentMethod] = useState('gcash');
  const [isProcessing, setIsProcessing] = useState(false);

  const PACKS = [
    { amount: 100, apps: 2, label: 'Starter', popular: false },
    { amount: 250, apps: 5, label: 'Standard', popular: true },
    { amount: 500, apps: 10, label: 'Pro Searcher', popular: false },
    { amount: 1000, apps: 20, label: 'Executive', popular: false },
  ];

  const handlePay = async () => {
    setIsProcessing(true);
    // Simulate PayMongo checkout redirect / instant webhook
    setTimeout(() => {
      setIsProcessing(false);
      onTopUpSuccess(selectedAmount);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Header */}
        <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white p-6 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                <Wallet className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <span className="text-xs font-bold text-blue-200 uppercase tracking-wider">
                  PayMongo Checkout
                </span>
                <h3 className="text-xl font-black text-white">Reload Wallet Credits</h3>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
            <span className="text-blue-200">Current Balance:</span>
            <span className="font-extrabold text-white text-sm">₱{currentBalance}.00</span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">

          {/* Value Proposition Reminder */}
          <div className="text-xs text-slate-600 bg-slate-50 p-3 rounded-2xl border border-slate-200 flex items-center gap-2.5">
            <Zap className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0" />
            <span>
              Searching and matching are <strong>100% free</strong>. You only spend ₱50 per application when you choose to Quick Apply.
            </span>
          </div>

          {/* Select Top-Up Amount */}
          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5">
              Select Top-Up Amount:
            </label>
            <div className="grid grid-cols-2 gap-3">
              {PACKS.map((pack) => (
                <button
                  key={pack.amount}
                  type="button"
                  onClick={() => setSelectedAmount(pack.amount)}
                  className={`p-3.5 rounded-2xl border text-left relative transition-all ${
                    selectedAmount === pack.amount
                      ? 'border-blue-600 bg-blue-50/70 shadow-sm ring-2 ring-blue-500/20'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  {pack.popular && (
                    <span className="absolute -top-2.5 right-3 bg-orange-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                      Best Value
                    </span>
                  )}
                  <div className="text-base font-black text-slate-900">
                    ₱{pack.amount}
                  </div>
                  <div className="text-xs text-blue-700 font-bold mt-0.5">
                    {pack.apps} Applications
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    (₱50 / application)
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Payment Channels (PayMongo) */}
          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5 flex items-center justify-between">
              <span>Payment Channel:</span>
              <span className="text-[10px] text-slate-400 font-semibold">Secured by PayMongo</span>
            </label>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setPaymentMethod('gcash')}
                className={`p-3 rounded-2xl border font-bold flex flex-col items-center justify-center gap-1 transition-all ${
                  paymentMethod === 'gcash'
                    ? 'border-blue-600 bg-blue-50 text-blue-700 ring-2 ring-blue-500/20'
                    : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Smartphone className="w-4 h-4 text-blue-600" />
                <span>GCash</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('maya')}
                className={`p-3 rounded-2xl border font-bold flex flex-col items-center justify-center gap-1 transition-all ${
                  paymentMethod === 'maya'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-700 ring-2 ring-emerald-500/20'
                    : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Smartphone className="w-4 h-4 text-emerald-600" />
                <span>Maya</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-2xl border font-bold flex flex-col items-center justify-center gap-1 transition-all ${
                  paymentMethod === 'card'
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-700 ring-2 ring-indigo-500/20'
                    : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <CreditCard className="w-4 h-4 text-indigo-600" />
                <span>Cards</span>
              </button>
            </div>
          </div>

          {/* Pay Button */}
          <div className="pt-2">
            <button
              onClick={handlePay}
              disabled={isProcessing}
              className="w-full py-4 px-6 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-extrabold rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Connecting to PayMongo Gateway...</span>
                </>
              ) : (
                <>
                  <span>Pay ₱{selectedAmount}.00 with {paymentMethod.toUpperCase()}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 font-medium mt-3">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Credits never expire • Instant balance update</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
