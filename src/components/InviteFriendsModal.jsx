import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  Gift, 
  Share2, 
  Users, 
  Sparkles, 
  ArrowRight, 
  Wallet,
  ShieldCheck,
  MessageCircle,
  Mail,
  CheckCircle2
} from 'lucide-react';

export default function InviteFriendsModal({ 
  isOpen, 
  onClose, 
  user 
}) {
  if (!isOpen) return null;

  const [isCopied, setIsCopied] = useState(false);

  // Deterministic user referral code based on user's name or fallback
  const userFirst = (user?.name?.split(' ')[0] || 'JUAN').toUpperCase();
  const referralCode = user?.referralCode || `${userFirst}-PH88`;
  const referralUrl = `https://candidate.ph/join?ref=${referralCode}`;

  const shareText = `Hey! I'm using CANDIDATE.ph to get matched directly with Philippine hiring managers and skip the middleman. Use my link to get a free ₱50 credit for your first application: ${referralUrl}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralUrl);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2200);
  };

  const handleShare = (channel) => {
    let url = '';
    const encodedUrl = encodeURIComponent(referralUrl);
    const encodedText = encodeURIComponent(shareText);

    switch (channel) {
      case 'telegram':
        url = `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`;
        break;
      case 'whatsapp':
        url = `https://api.whatsapp.com/send?text=${encodedText}`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
      case 'email':
        url = `mailto:?subject=${encodeURIComponent('Here is ₱50 credit for CANDIDATE.ph')}&body=${encodedText}`;
        break;
      default:
        handleCopyLink();
        return;
    }

    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Mocked referral activity telemetry
  const referralStats = {
    totalInvited: 3,
    creditsEarned: 150,
    friends: [
      { name: 'Maria Santos', role: 'UX Designer', date: 'Yesterday', status: 'Completed', reward: '+₱50.00' },
      { name: 'Carlos Mendoza', role: 'Full Stack Dev', date: '3 days ago', status: 'Completed', reward: '+₱50.00' },
      { name: 'Althea Reyes', role: 'Customer Success', date: 'Oct 12', status: 'Completed', reward: '+₱50.00' }
    ]
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto animate-in slide-in-from-bottom sm:slide-in-from-bottom-0 sm:fade-in duration-200">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200 w-full max-w-xl my-0 sm:my-8 overflow-hidden transition-all flex flex-col max-h-[92dvh] sm:max-h-[90vh]">
        
        {/* ================= MODAL HEADER ================= */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 text-white p-5 sm:p-6 relative shrink-0">
          {/* Mobile Bottom-Sheet Grab Indicator */}
          <div className="w-12 h-1.5 bg-white/30 rounded-full mx-auto mb-3 sm:hidden" />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shrink-0">
                <Gift className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <span className="text-[10px] font-black text-amber-300 uppercase tracking-widest block">
                  Give ₱50 • Get ₱50
                </span>
                <h3 className="text-lg sm:text-xl font-black text-white">
                  Refer a Colleague or Friend
                </h3>
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

          <p className="text-xs text-blue-100 mt-2.5 leading-relaxed font-medium">
            Know someone job hunting in Tech, BPO, or Remote? Gift them <strong>₱50.00 welcome credits</strong> for their first application. When they <strong>complete their account sign-up</strong>, you automatically receive <strong>₱50.00</strong> credited directly to your wallet.
          </p>
        </div>

        {/* ================= MODAL BODY ================= */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 sm:space-y-5 flex-1">
          
          {/* 3-Step Mechanics Visual */}
          <div className="grid grid-cols-3 gap-2 p-3 sm:p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
            <div className="space-y-1">
              <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 font-black text-xs flex items-center justify-center mx-auto">
                1
              </div>
              <p className="text-[11px] font-extrabold text-slate-800">Share Link</p>
              <p className="text-[10px] text-slate-500 leading-tight">Send personal invite code</p>
            </div>

            <div className="space-y-1">
              <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-700 font-black text-xs flex items-center justify-center mx-auto">
                2
              </div>
              <p className="text-[11px] font-extrabold text-slate-800">Friend Signs Up</p>
              <p className="text-[10px] text-slate-500 leading-tight">Registers & gets free ₱50</p>
            </div>

            <div className="space-y-1">
              <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 font-black text-xs flex items-center justify-center mx-auto">
                3
              </div>
              <p className="text-[11px] font-extrabold text-slate-800">You Get ₱50</p>
              <p className="text-[10px] text-slate-500 leading-tight">Earned upon their signup</p>
            </div>
          </div>

          {/* Referral Link Copy Box */}
          <div className="space-y-2">
            <label className="block text-xs font-black text-slate-800 uppercase tracking-wider">
              Your Personal Invite Link:
            </label>
            <div className="flex items-center gap-2 p-1.5 sm:p-2 bg-slate-100 rounded-2xl border border-slate-300">
              <input
                type="text"
                readOnly
                value={referralUrl}
                className="flex-1 bg-transparent px-2.5 py-1 text-xs font-mono font-bold text-slate-800 truncate focus:outline-none select-all"
              />
              <button
                type="button"
                onClick={handleCopyLink}
                className={`px-4 py-2.5 rounded-xl font-extrabold text-xs transition-all flex items-center gap-1.5 cursor-pointer shrink-0 shadow-xs ${
                  isCopied
                    ? 'bg-emerald-600 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white active:scale-95'
                }`}
              >
                {isCopied ? (
                  <>
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* 1-Tap Social Share Channels */}
          <div>
            <label className="block text-xs font-black text-slate-800 uppercase tracking-wider mb-2">
              Share Directly:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              
              <button
                type="button"
                onClick={() => handleShare('telegram')}
                className="p-2.5 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 flex items-center justify-center gap-2 text-xs font-bold text-slate-700 transition-all cursor-pointer"
              >
                <span className="w-2 h-2 rounded-full bg-sky-500"></span>
                <span>Telegram</span>
              </button>

              <button
                type="button"
                onClick={() => handleShare('whatsapp')}
                className="p-2.5 rounded-xl border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/50 flex items-center justify-center gap-2 text-xs font-bold text-slate-700 transition-all cursor-pointer"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>WhatsApp / Viber</span>
              </button>

              <button
                type="button"
                onClick={() => handleShare('facebook')}
                className="p-2.5 rounded-xl border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/50 flex items-center justify-center gap-2 text-xs font-bold text-slate-700 transition-all cursor-pointer"
              >
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                <span>Messenger</span>
              </button>

              <button
                type="button"
                onClick={() => handleShare('linkedin')}
                className="p-2.5 rounded-xl border border-slate-200 hover:border-blue-600 hover:bg-blue-50/50 flex items-center justify-center gap-2 text-xs font-bold text-slate-700 transition-all cursor-pointer"
              >
                <span className="w-2 h-2 rounded-full bg-blue-700"></span>
                <span>LinkedIn</span>
              </button>

            </div>
          </div>

          {/* Referral Earnings Status Widget */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3.5 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-blue-600" />
                <span>Your Referral Rewards</span>
              </span>
              <span className="text-xs font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                +₱{referralStats.creditsEarned}.00 Earned
              </span>
            </div>

            <div className="space-y-1.5 divide-y divide-slate-100">
              {referralStats.friends.map((friend, idx) => (
                <div key={idx} className="pt-1.5 first:pt-0 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <div>
                      <span className="font-bold text-slate-800">{friend.name}</span>
                      <span className="text-[10px] text-slate-500 ml-1.5">• {friend.role}</span>
                    </div>
                  </div>
                  <span className="font-extrabold text-emerald-700 text-xs">{friend.reward}</span>
                </div>
              ))}
            </div>

            <p className="text-[10px] text-slate-500 pt-1 border-t border-slate-200 font-medium">
              💡 <strong>Verified Sign-Up Rule:</strong> ₱50 is credited to your wallet the moment your invited friend actually completes their account registration (not for just sending out the link). Credits never expire.
            </p>
          </div>

        </div>

        {/* ================= MODAL FOOTER ================= */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Credited upon verified friend account sign-up</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs rounded-xl shadow-xs transition-all cursor-pointer min-h-[44px]"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
}
