'use client';

import React, { useState } from 'react';
import { 
  Send, 
  Plus, 
  Mail, 
  MessageSquare, 
  Clock, 
  Play, 
  Pause, 
  BarChart2, 
  Users, 
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState([
    { id: '1', name: 'Q3 SaaS Decision Makers', status: 'Active', leadsCount: 450, openRate: '42.5%', replyRate: '12.8%', channel: 'Email + LinkedIn' },
    { id: '2', name: 'Healthtech Agency Outreach', status: 'Active', leadsCount: 280, openRate: '58.1%', replyRate: '19.4%', channel: 'Email Sequence' },
    { id: '3', name: 'E-Commerce Enterprise Nudge', status: 'Paused', leadsCount: 600, openRate: '34.2%', replyRate: '8.1%', channel: 'WhatsApp Direct' },
  ]);

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
            <Send className="w-4 h-4" /> Multi-Channel Outreach Sequences
          </div>
          <h1 className="text-3xl font-extrabold text-white mt-1">Campaign Manager</h1>
        </div>

        <button className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-xs shadow-lg shadow-indigo-600/20 transition-all">
          <Plus className="w-4 h-4" /> Create New Campaign
        </button>
      </div>

      {/* Campaigns List */}
      <div className="space-y-4">
        {campaigns.map((camp) => (
          <div key={camp.id} className="bg-slate-900 border border-slate-800 hover:border-indigo-500/40 rounded-2xl p-6 transition-all space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="font-bold text-white text-base">{camp.name}</h3>
                  <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-mono font-semibold border ${
                    camp.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                  }`}>
                    {camp.status}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">Targeting {camp.leadsCount} qualified prospects • Channel: <span className="text-indigo-400 font-medium">{camp.channel}</span></p>
              </div>

              <div className="flex items-center gap-2">
                <button className="p-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded-xl transition-colors">
                  {camp.status === 'Active' ? <Pause className="w-4 h-4 text-amber-400" /> : <Play className="w-4 h-4 text-emerald-400" />}
                </button>
                <button className="px-3 py-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-semibold rounded-xl transition-colors">
                  Sequence Steps
                </button>
              </div>
            </div>

            {/* Sequence Steps Flow */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-800/80">
              <div className="p-3 bg-slate-950 border border-slate-800/80 rounded-xl flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-indigo-400" />
                  <div>
                    <div className="font-bold text-white">Step 1: Cold Email</div>
                    <div className="text-[10px] text-slate-500">Day 1 • Value Pitch</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-600" />
              </div>

              <div className="p-3 bg-slate-950 border border-slate-800/80 rounded-xl flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-purple-400" />
                  <div>
                    <div className="font-bold text-white">Step 2: Follow-up Nudge</div>
                    <div className="text-[10px] text-slate-500">Day 3 • Case Study</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-600" />
              </div>

              <div className="p-3 bg-slate-950 border border-slate-800/80 rounded-xl flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <div>
                    <div className="font-bold text-white">Step 3: LinkedIn Connect</div>
                    <div className="text-[10px] text-slate-500">Day 6 • Direct Demo</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-3 gap-4 pt-2 text-center text-xs">
              <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase">Total Prospecting</span>
                <span className="block font-bold text-white text-sm">{camp.leadsCount} Leads</span>
              </div>
              <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase">Open Rate</span>
                <span className="block font-bold text-emerald-400 text-sm">{camp.openRate}</span>
              </div>
              <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase">Reply Rate</span>
                <span className="block font-bold text-indigo-400 text-sm">{camp.replyRate}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
