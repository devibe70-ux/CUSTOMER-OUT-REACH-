'use client';

import React, { useState } from 'react';
import { 
  FileCode, 
  Copy, 
  Check, 
  Sparkles, 
  Tag, 
  ArrowUpRight 
} from 'lucide-react';

const TEMPLATES = [
  {
    id: '1',
    category: 'Agency Pitch',
    title: 'The Next.js Web Redesign & Conversion Pitch',
    description: 'High-converting email template focused on performance and lead conversion bottlenecks.',
    subject: 'Quick query regarding {{company}}\'s conversion performance',
    body: `Hi {{first_name}},\n\nI noticed {{company}} has been scaling up quickly! While reviewing your site, I saw a few UX bottlenecks that might be impacting your lead conversion rate.\n\nWe recently built a custom Next.js web application for a client in {{industry}} that boosted inbound conversions by 34% in 30 days.\n\nWould you be open to a 10-minute quick audit call this week?`
  },
  {
    id: '2',
    category: 'SaaS Outbound',
    title: 'Executive Pain-Point & Demo Nudge',
    description: 'Direct, value-first email designed for C-suite decision makers.',
    subject: 'Solving {{pain_point}} at {{company}}',
    body: `Hi {{first_name}},\n\nMost executives in {{industry}} we speak with are struggling with {{pain_point}}.\n\nOur platform automates this workflow directly, saving ~15 engineering hours per sprint.\n\nAre you free for a quick 5-minute interactive demo on Wednesday?`
  },
  {
    id: '3',
    category: 'Follow-Up',
    title: 'Case Study & Social Proof Nudge',
    description: 'Non-pushy step-2 follow-up with concrete metric proof.',
    subject: 'Re: Quick query regarding {{company}}',
    body: `Hi {{first_name}},\n\nFollowing up on my previous message. Wanted to share a quick case breakdown of how we solved this exact problem for another team in your space.\n\nHappy to share the full blueprint if you\'re interested!`
  }
];

export default function TemplatesPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyTemplate = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6">
        <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
          <FileCode className="w-4 h-4" /> Outreach Library
        </div>
        <h1 className="text-3xl font-extrabold text-white mt-1">High-Converting Templates</h1>
        <p className="text-slate-400 text-sm mt-1">Battle-tested cold outreach templates with dynamic variable tags.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {TEMPLATES.map(t => (
          <div key={t.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 flex flex-col">
            <div className="flex items-center justify-between">
              <span className="text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {t.category}
              </span>
              <button
                onClick={() => copyTemplate(t.id, `Subject: ${t.subject}\n\n${t.body}`)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs transition-all border border-slate-700"
              >
                {copiedId === t.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedId === t.id ? 'Copied!' : 'Copy Template'}
              </button>
            </div>

            <div>
              <h3 className="font-bold text-white text-base">{t.title}</h3>
              <p className="text-xs text-slate-400 mt-1">{t.description}</p>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs text-slate-300 space-y-3 flex-1">
              <div>
                <span className="text-[10px] uppercase text-slate-500 block">Subject</span>
                <span className="text-white font-bold">{t.subject}</span>
              </div>
              <div className="whitespace-pre-line border-t border-slate-800/80 pt-2 text-slate-400 font-sans leading-relaxed">
                {t.body}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
