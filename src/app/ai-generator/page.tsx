'use client';

import React, { useState } from 'react';
import { 
  Sparkles, 
  Copy, 
  Check, 
  Send, 
  Zap, 
  RefreshCw, 
  User, 
  Building, 
  SlidersHorizontal 
} from 'lucide-react';

export default function AIGeneratorPage() {
  const [tone, setTone] = useState('Executive & Direct');
  const [leadName, setLeadName] = useState('Sarah Jenkins');
  const [company, setCompany] = useState('Nexus Health');
  const [painPoint, setPainPoint] = useState('low website lead conversion rate');
  const [serviceOffering, setServiceOffering] = useState('Next.js web redesign & automated discovery pipeline');
  const [copied, setCopied] = useState(false);

  const generatedSubject = `Quick question regarding ${company}'s digital growth strategy`;
  const generatedBody = `Hi ${leadName},

I noticed ${company} has been expanding rapidly in the healthtech space recently—congrats on the recent momentum!

While reviewing your current digital footprint, I caught a couple of key friction points related to ${painPoint} that might be capping your inbound lead volume.

We recently helped Apex Healthtech solve a similar issue using our ${serviceOffering}, driving a 34% increase in qualified consultation bookings within 30 days.

Would you be open to a brief 10-minute audit call this Thursday to see the exact blueprint we used?

Best regards,
Outreach Admin`;

  const copyGenerated = () => {
    navigator.clipboard.writeText(`Subject: ${generatedSubject}\n\n${generatedBody}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6">
        <div className="flex items-center gap-2 text-purple-400 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-4 h-4" /> AI Outreach Personalization Studio
        </div>
        <h1 className="text-3xl font-extrabold text-white mt-1">AI Cold Copy Assistant</h1>
        <p className="text-slate-400 text-sm mt-1">Generate hyper-personalized cold outreach emails and messages using dynamic variables.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Controls Input Form */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
          <h3 className="font-bold text-white text-base flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-purple-400" /> Personalization Parameters
          </h3>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase text-slate-400">Tone & Personality</label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:border-purple-500 focus:outline-none"
              >
                <option>Executive & Direct</option>
                <option>Friendly & Consultative</option>
                <option>Bold & High Impact</option>
                <option>Casual Nudge</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase text-slate-400">Lead Name</label>
                <input
                  type="text"
                  value={leadName}
                  onChange={(e) => setLeadName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase text-slate-400">Company Name</label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white focus:border-purple-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase text-slate-400">Core Pain Point / Opportunity</label>
              <input
                type="text"
                value={painPoint}
                onChange={(e) => setPainPoint(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white focus:border-purple-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase text-slate-400">Your Value Offer / Service</label>
              <input
                type="text"
                value={serviceOffering}
                onChange={(e) => setServiceOffering(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white focus:border-purple-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Live Output Preview */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 flex flex-col">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="font-bold text-white text-base">Generated AI Copy</h3>
              <p className="text-xs text-slate-400">Ready to inject into active sequence</p>
            </div>

            <button
              onClick={copyGenerated}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-xl text-xs transition-all shadow-md shadow-purple-600/20"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied to Clipboard!' : 'Copy Copy'}
            </button>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 font-sans text-xs text-slate-200 space-y-4 flex-1">
            <div className="border-b border-slate-800 pb-3">
              <span className="text-slate-500 font-mono uppercase text-[10px] block">Subject Line</span>
              <span className="font-bold text-white text-sm">{generatedSubject}</span>
            </div>

            <div className="whitespace-pre-line text-slate-300 leading-relaxed font-sans">
              {generatedBody}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
