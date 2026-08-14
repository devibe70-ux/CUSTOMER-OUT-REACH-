'use client';

import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Search, 
  MoreVertical, 
  Mail, 
  Phone, 
  Building, 
  Tag, 
  CheckCircle2, 
  Clock, 
  ArrowRight,
  Filter
} from 'lucide-react';

interface Lead {
  id: string;
  name: string;
  title: string;
  company: string;
  email: string;
  value: number;
  stage: 'new' | 'contacted' | 'replied' | 'meeting' | 'won';
  tags: string[];
}

const INITIAL_LEADS: Lead[] = [
  { id: '1', name: 'Alexander Wright', title: 'VP of Engineering', company: 'Apex Healthtech', email: 'alex@apexhealth.io', value: 12500, stage: 'new', tags: ['SaaS', 'High Intent'] },
  { id: '2', name: 'Elena Rostova', title: 'Head of Product', company: 'CyberTech Labs', email: 'elena@cybertech.com', value: 8400, stage: 'contacted', tags: ['Enterprise'] },
  { id: '3', name: 'Marcus Vance', title: 'Managing Director', company: 'Vance Capital', email: 'marcus@vancecap.com', value: 24000, stage: 'replied', tags: ['Finance', 'Hot Lead'] },
  { id: '4', name: 'Sarah Jenkins', title: 'Chief Marketing Officer', company: 'Nexus Health', email: 'sarah@nexushealth.org', value: 16000, stage: 'meeting', tags: ['Agency Scope'] },
  { id: '5', name: 'David Chen', title: 'CTO', company: 'CloudFlow Inc.', email: 'dchen@cloudflow.dev', value: 19500, stage: 'won', tags: ['Signed'] },
];

const STAGES = [
  { id: 'new', title: 'New Leads', color: 'border-blue-500/50 text-blue-400 bg-blue-500/10' },
  { id: 'contacted', title: 'Contacted', color: 'border-yellow-500/50 text-yellow-400 bg-yellow-500/10' },
  { id: 'replied', title: 'Replied', color: 'border-purple-500/50 text-purple-400 bg-purple-500/10' },
  { id: 'meeting', title: 'Meeting Scheduled', color: 'border-indigo-500/50 text-indigo-400 bg-indigo-500/10' },
  { id: 'won', title: 'Closed Won', color: 'border-emerald-500/50 text-emerald-400 bg-emerald-500/10' },
];

export default function LeadsPipelinePage() {
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
  const [searchQuery, setSearchQuery] = useState('');

  const moveLead = (leadId: string, direction: 'left' | 'right') => {
    const stageOrder: Lead['stage'][] = ['new', 'contacted', 'replied', 'meeting', 'won'];
    setLeads(prev => prev.map(lead => {
      if (lead.id !== leadId) return lead;
      const currentIndex = stageOrder.indexOf(lead.stage);
      const newIndex = direction === 'right' ? Math.min(currentIndex + 1, stageOrder.length - 1) : Math.max(currentIndex - 1, 0);
      return { ...lead, stage: stageOrder[newIndex] };
    }));
  };

  const filteredLeads = leads.filter(l => 
    l.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    l.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
            <Users className="w-4 h-4" /> Lead Management & Pipeline
          </div>
          <h1 className="text-3xl font-extrabold text-white mt-1">Outreach Kanban Board</h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Filter leads..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-xs shadow-md shadow-indigo-600/20 transition-all">
            <Plus className="w-4 h-4" /> Add Lead
          </button>
        </div>
      </div>

      {/* Kanban Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-x-auto pb-4">
        {STAGES.map(stage => {
          const stageLeads = filteredLeads.filter(l => l.stage === stage.id);
          const stageTotal = stageLeads.reduce((acc, l) => acc + l.value, 0);

          return (
            <div key={stage.id} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 flex flex-col min-w-[240px] space-y-3">
              {/* Stage Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${stage.color}`}>
                    {stage.title}
                  </span>
                </div>
                <span className="text-xs font-mono font-bold text-slate-400">
                  ${stageTotal.toLocaleString()}
                </span>
              </div>

              {/* Cards Container */}
              <div className="flex-1 space-y-3 overflow-y-auto max-h-[600px] pr-1">
                {stageLeads.map(lead => (
                  <div key={lead.id} className="bg-slate-950 border border-slate-800 hover:border-indigo-500/40 rounded-xl p-4 space-y-3 shadow-sm transition-all group">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-white group-hover:text-indigo-300">{lead.name}</h4>
                        <p className="text-[11px] text-slate-400">{lead.title}</p>
                      </div>
                      <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        ${lead.value.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-[11px] text-slate-400">
                      <Building className="w-3 h-3 text-indigo-400" />
                      <span>{lead.company}</span>
                    </div>

                    <div className="flex flex-wrap gap-1 pt-1">
                      {lead.tags.map((tag, idx) => (
                        <span key={idx} className="text-[9px] px-2 py-0.5 bg-slate-900 text-slate-400 rounded border border-slate-800 font-mono">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Quick Move Buttons */}
                    <div className="flex justify-between items-center pt-2 border-t border-slate-800/80 text-[10px]">
                      <button 
                        onClick={() => moveLead(lead.id, 'left')}
                        disabled={stage.id === 'new'}
                        className="px-2 py-1 bg-slate-900 hover:bg-slate-800 text-slate-400 disabled:opacity-30 rounded border border-slate-800"
                      >
                        ← Prev
                      </button>
                      <button 
                        onClick={() => moveLead(lead.id, 'right')}
                        disabled={stage.id === 'won'}
                        className="px-2 py-1 bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-300 border border-indigo-500/30 rounded"
                      >
                        Next →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
