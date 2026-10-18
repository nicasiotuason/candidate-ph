import React, { useState } from 'react';
import { 
  X, 
  Check, 
  ShieldCheck, 
  Wallet, 
  ArrowRight, 
  Zap, 
  CreditCard, 
  Smartphone, 
  Sparkles, 
  Gift, 
  QrCode, 
  CheckCircle2, 
  Lock, 
  ExternalLink,
  ChevronLeft,
  Receipt
} from 'lucide-react';
import { paymongoService } from '../services/paymongoService';

export default function TopUpModal({ 
  isOpen, 
  onClose, 
  currentBalance = 250, 
  user = null, 
  onTopUpSuccess, 
  onOpenInvite 
}) {
  if (!isOpen) return null;

  const [selectedAmount, setSelectedAmount] = useState(500);
  const [paymentMethod, setPaymentMethod] = useState('gcash');
  const [step, setStep] = useState('select'); // 'select' | 'checkout' | 'success'
  const [isProcessing, setIsProcessing] = useState(false);
  const [otpCode, setOtpCode] = useState('892144');
  const [lastPaymentResult, setLastPaymentResult] = useState(null);

  const BUNDLES = paymongoService.BUNDLES;
  const selectedBundle = BUNDLES.find(b => b.amount === selectedAmount) || BUNDLES[1];
  const isPayMongoLive = paymongoService.isConfigured();

  // Reset state when closing
  const handleClose = () => {
    setStep('select');
    setIsProcessing(false);
    onClose();
  };

  // Launch checkout session
  const handleProceedToPayment = async () => {
    setIsProcessing(true);
    try {
      const session = await paymongoService.createCheckoutSession({
        amount: selectedAmount,
        method: paymentMethod,
        user: user
      });

      if (session.type === 'redirect' && session.checkoutUrl) {
        window.location.href = session.checkoutUrl;
        return;
      }

      // Enter interactive PayMongo checkout drawer/view
      setStep('checkout');
    } catch (err) {
      console.error("PayMongo session error:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  // Authorize and complete payment in checkout view
  const handleAuthorizePayment = async () => {
    setIsProcessing(true);
    try {
      // Simulate real-time PayMongo transaction verification
      await new Promise(resolve => setTimeout(resolve, 800));

      const result = await paymongoService.completePayment({
        amount: selectedAmount,
        method: paymentMethod,
        user: user
      });

      setLastPaymentResult(result);
      setStep('success');

      if (onTopUpSuccess) {
        onTopUpSuccess(selectedAmount);
      }
    } catch (err) {
      console.error("Payment authorization error:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200 w-full max-w-lg my-0 sm:my-8 overflow-hidden transition-all animate-in slide-in-from-bottom sm:slide-in-from-bottom-0 sm:fade-in sm:zoom-in-95 duration-200 flex flex-col max-h-[92dvh] sm:max-h-[90vh]">
        
        {/* ================= HEADER ================= */}
        <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white p-4 sm:p-6 relative shrink-0">
          {/* Mobile Bottom-Sheet Pull Indicator */}
          <div className="w-12 h-1.5 bg-white/30 rounded-full mx-auto mb-3 sm:hidden" />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              {step === 'checkout' ? (
                <button
                  type="button"
                  onClick={() => setStep('select')}
                  className="w-9 h-9 rounded-2xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              ) : (
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shrink-0">
                  <Wallet className="w-5 h-5 text-amber-300" />
                </div>
              )}

              <div>
                <span className="text-[10px] font-extrabold text-blue-200 uppercase tracking-wider block">
                  {step === 'success' ? 'Payment Verified' : 'PayMongo Instant Gateway'}
                </span>
                <h3 className="text-lg sm:text-xl font-black text-white">
                  {step === 'checkout' ? 'Authorize Payment' : step === 'success' ? 'Credits Added to Wallet' : 'Buy Application Credits'}
                </h3>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0 ml-2"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {step !== 'success' && (
            <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-white/10 flex items-center justify-between text-xs">
              <span className="text-blue-200">Current Wallet Balance:</span>
              <span className="font-black text-white text-base">₱{currentBalance}.00</span>
            </div>
          )}
        </div>

        {/* ================= STEP 1: BUNDLE & CHANNEL SELECTION ================= */}
        {step === 'select' && (
          <div className="p-4 sm:p-6 overflow-y-auto space-y-4 sm:space-y-5 flex-1">
            
            {/* Unit Economics Guarantee */}
            <div className="text-xs text-slate-600 bg-slate-50 p-3.5 rounded-2xl border border-slate-200 flex items-start gap-2.5">
              <Zap className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <p className="font-bold text-slate-800">₱0 Scanning & Matching Free Forever</p>
                <p className="text-[11px] text-slate-500">
                  Credits are debited at ₱50 per application <strong>only upon verified delivery to the employer's ATS</strong>. If delivery fails, fee is ₱0.
                </p>
              </div>
            </div>

            {/* Bundle Options */}
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
                    className={`p-3.5 rounded-2xl border text-left relative transition-all flex flex-col justify-between cursor-pointer ${
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

            {/* Feature Guarantee Across All Tiers */}
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs text-slate-700 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-slate-900">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>All bundles include 100% of CANDIDATE.ph capabilities:</span>
              </div>
              <p className="text-[11px] text-slate-600 pl-5.5 leading-relaxed">
                Direct Employer ATS Dispatch • Tailored Cover Letter • Official Recruiter Delivery Receipts • Credits Never Expire.
              </p>
            </div>

            {/* Viral Referral Cross-Promotion ("Give ₱50, Get ₱50") */}
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
                    handleClose();
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
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
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
                  <span>Cards</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('qrph')}
                  className={`p-3 min-h-[52px] rounded-2xl border font-bold flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                    paymentMethod === 'qrph'
                      ? 'border-purple-600 bg-purple-50 text-purple-700 ring-2 ring-purple-500/20 shadow-xs'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <QrCode className="w-4 h-4 text-purple-600" />
                  <span>QR Ph</span>
                </button>
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-2">
              <button
                type="button"
                disabled={isProcessing}
                onClick={handleProceedToPayment}
                className="w-full min-h-[52px] py-4 px-4 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-extrabold rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
              >
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Initializing PayMongo...</span>
                  </div>
                ) : (
                  <>
                    <span>Pay ₱{selectedAmount}.00 for {selectedBundle.apps} Applications</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            {/* Trust Footer */}
            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>PayMongo PCI-DSS Level 1 Compliant • 256-Bit SSL Encrypted</span>
            </div>

          </div>
        )}

        {/* ================= STEP 2: PAYMONGO INTERACTIVE CHECKOUT ================= */}
        {step === 'checkout' && (
          <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
            
            {/* PayMongo Merchant Card */}
            <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-3">
              <div className="flex items-center justify-between text-xs border-b border-slate-800 pb-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-blue-500 flex items-center justify-center font-black text-[10px]">
                    PM
                  </div>
                  <span className="font-bold text-slate-300">CANDIDATE.ph Inc.</span>
                </div>
                <span className="font-mono text-emerald-400 font-bold">₱{selectedAmount}.00 PHP</span>
              </div>

              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Item:</span>
                  <span className="text-white font-bold">{selectedBundle.label}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Applications:</span>
                  <span className="text-white font-bold">{selectedBundle.apps} Direct Dispatches</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Target Candidate:</span>
                  <span className="text-white font-medium">{user?.email || 'candidate@gmail.com'}</span>
                </div>
              </div>
            </div>

            {/* CHANNEL SPECIFIC FORM */}

            {/* 1. GCash Checkout Screen */}
            {paymentMethod === 'gcash' && (
              <div className="p-4 rounded-2xl border-2 border-blue-500/30 bg-blue-50/50 space-y-3.5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-xl bg-blue-600 text-white flex items-center justify-center text-xs font-black">
                    G
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-blue-900">GCash Express Payment</h4>
                    <p className="text-[10px] text-blue-700">Enter OTP sent to registered GCash number</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block">
                    Mobile Number
                  </label>
                  <input
                    type="text"
                    readOnly
                    value="+63 917 ••• ••••"
                    className="w-full px-3 py-2 text-xs font-mono font-bold bg-white border border-blue-200 rounded-xl text-slate-700"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-bold">
                    <span className="text-slate-600 uppercase tracking-wider">6-Digit Verification Code (OTP)</span>
                    <span className="text-blue-600">Simulated: 892144</span>
                  </div>
                  <input
                    type="text"
                    maxLength={6}
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    className="w-full px-3 py-2.5 text-center tracking-widest text-base font-mono font-black bg-white border border-blue-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}

            {/* 2. Maya Checkout Screen */}
            {paymentMethod === 'maya' && (
              <div className="p-4 rounded-2xl border-2 border-emerald-500/30 bg-emerald-50/50 space-y-3.5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-xl bg-emerald-600 text-white flex items-center justify-center text-xs font-black">
                    M
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-emerald-900">Maya Instant Pay</h4>
                    <p className="text-[10px] text-emerald-700">One-tap confirmation via Maya App</p>
                  </div>
                </div>

                <div className="p-3 bg-white rounded-xl border border-emerald-200 text-xs text-slate-700 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Account:</span>
                    <span className="font-mono font-bold">0917-***-0192</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Authorized Merchant:</span>
                    <span className="font-bold text-emerald-800">CANDIDATE.ph</span>
                  </div>
                </div>
              </div>
            )}

            {/* 3. Card Checkout Screen */}
            {paymentMethod === 'card' && (
              <div className="p-4 rounded-2xl border-2 border-indigo-500/30 bg-indigo-50/50 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-indigo-900">Credit / Debit Card</span>
                  <span className="text-[10px] text-indigo-600 font-bold">Visa / Mastercard / JCB</span>
                </div>

                <div className="space-y-2">
                  <input
                    type="text"
                    readOnly
                    value="4242 •••• •••• 4242"
                    className="w-full px-3 py-2 text-xs font-mono font-bold bg-white border border-indigo-200 rounded-xl text-slate-700"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      readOnly
                      value="12 / 28"
                      className="px-3 py-2 text-xs font-mono font-bold bg-white border border-indigo-200 rounded-xl text-slate-700"
                    />
                    <input
                      type="text"
                      readOnly
                      value="••• (CVV)"
                      className="px-3 py-2 text-xs font-mono font-bold bg-white border border-indigo-200 rounded-xl text-slate-700"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 4. QR Ph Screen */}
            {paymentMethod === 'qrph' && (
              <div className="p-4 rounded-2xl border-2 border-purple-500/30 bg-purple-50/50 text-center space-y-3">
                <div className="w-36 h-36 mx-auto bg-white p-3 rounded-2xl border border-purple-200 shadow-xs flex flex-col items-center justify-center">
                  <QrCode className="w-24 h-24 text-slate-800" />
                  <span className="text-[9px] font-black text-purple-700 uppercase tracking-widest mt-1">QR Ph Standard</span>
                </div>
                <p className="text-[11px] text-purple-900 font-bold">
                  Open any Philippine banking app (BDO, BPI, UnionBank, GCash, Maya) and scan this QR to pay ₱{selectedAmount}.00.
                </p>
              </div>
            )}

            {/* Authorize Button */}
            <button
              type="button"
              disabled={isProcessing}
              onClick={handleAuthorizePayment}
              className="w-full min-h-[52px] py-4 px-4 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white font-black rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
            >
              {isProcessing ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Authorizing via PayMongo...</span>
                </div>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Authorize ₱{selectedAmount}.00 Payment</span>
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-slate-500 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>256-bit Bank-Grade Encryption • Official PayMongo Gateway</span>
            </div>

          </div>
        )}

        {/* ================= STEP 3: PAYMENT SUCCESS & OFFICIAL RECEIPT ================= */}
        {step === 'success' && (
          <div className="p-4 sm:p-6 overflow-y-auto space-y-4 text-center flex-1">
            
            <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-xl font-black text-slate-900">Payment Successful!</h3>
              <p className="text-xs text-slate-500 mt-1">
                Your wallet has been credited with <strong>₱{selectedAmount}.00</strong> ({selectedBundle.apps} Applications).
              </p>
            </div>

            {/* Official PayMongo Receipt Card */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs space-y-2.5">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200 font-bold text-slate-800">
                <div className="flex items-center gap-1.5">
                  <Receipt className="w-4 h-4 text-blue-600" />
                  <span>PayMongo Official Receipt</span>
                </div>
                <span className="text-[10px] text-emerald-700 font-mono bg-emerald-100 px-2 py-0.5 rounded-full">PAID</span>
              </div>

              <div className="space-y-1.5 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-500">Transaction ID:</span>
                  <span className="font-mono font-bold text-slate-800">{lastPaymentResult?.paymentId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Receipt Number:</span>
                  <span className="font-mono font-bold text-slate-800">{lastPaymentResult?.receiptNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Channel:</span>
                  <span className="font-bold text-slate-800 uppercase">{paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Amount Paid:</span>
                  <span className="font-black text-blue-700 font-mono">₱{selectedAmount}.00</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-slate-200 font-bold">
                  <span className="text-slate-700">New Available Balance:</span>
                  <span className="text-emerald-700 font-black text-xs font-mono">₱{lastPaymentResult?.newBalance}.00</span>
                </div>
              </div>
            </div>

            {/* Return Button */}
            <button
              type="button"
              onClick={handleClose}
              className="w-full min-h-[50px] py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white font-extrabold rounded-2xl shadow-md transition-all text-sm cursor-pointer"
            >
              Done — Return to Job Matches
            </button>

          </div>
        )}

      </div>
    </div>
  );
}
