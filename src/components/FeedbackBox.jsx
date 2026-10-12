import React, { useState } from 'react';
import { Heart, Send, MessageSquareQuote, Sparkles, CheckCircle2 } from 'lucide-react';

export default function FeedbackBox({ testimonials, onAddTestimonial, userName }) {
  const [commentText, setCommentText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    onAddTestimonial(commentText.trim(), userName || 'Applicant');
    setCommentText('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3500);
  };

  return (
    <section className="mt-14 pt-10 border-t border-slate-200">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold">
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            <span>COMMUNITY WALL</span>
          </div>
          <h3 className="text-2xl font-black text-slate-900 tracking-tight">
            Nice Things Said About Us
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            Real feedback from Filipino tech candidates who got interview invites through CANDIDATE.ph.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {testimonials.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between space-y-3"
            >
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-full ${item.avatarBg} font-black text-xs flex items-center justify-center shrink-0`}>
                  {item.avatarText}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{item.author}</h4>
                  <p className="text-[10px] text-slate-500">{item.role}</p>
                </div>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed italic">
                "{item.comment}"
              </p>

              <div className="text-[10px] text-slate-400 font-medium pt-1 border-t border-slate-100 flex items-center justify-between">
                <span>Verified Candidate</span>
                <span>{item.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Small Interactive Comment Box */}
        <div className="max-w-2xl mx-auto bg-white p-5 rounded-3xl border border-slate-200 shadow-elevated">
          <div className="flex items-center gap-2 mb-3">
            <MessageSquareQuote className="w-4 h-4 text-blue-600" />
            <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
              Share your interview win or a kind word:
            </h4>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <textarea
              rows={2}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="e.g. Received a reply from Maya within 2 hours! Loving the ₱50 quick apply..."
              className="w-full p-3 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-slate-400 resize-none"
            />

            <div className="flex items-center justify-between">
              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-500" />
                <span>Posted as <strong>{userName || 'Verified Candidate'}</strong></span>
              </span>

              <button
                type="submit"
                disabled={!commentText.trim()}
                className={`px-4 py-2 rounded-xl text-xs font-bold text-white flex items-center gap-1.5 transition-all ${
                  commentText.trim()
                    ? 'bg-blue-600 hover:bg-blue-700 shadow-sm'
                    : 'bg-slate-300 cursor-not-allowed'
                }`}
              >
                <Send className="w-3 h-3" />
                <span>Post Kind Word</span>
              </button>
            </div>
          </form>

          {submitted && (
            <div className="mt-3 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Thank you! Your feedback has been added to our community wall.</span>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
