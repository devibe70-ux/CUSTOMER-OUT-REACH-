'use client';

import React, { useState } from 'react';
import { 
  MessageSquare, 
  Search, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  Mail, 
  User, 
  Building, 
  Paperclip,
  Tag
} from 'lucide-react';

export default function UnifiedInboxPage() {
  const [conversations, setConversations] = useState([
    { id: '1', name: 'Sarah Jenkins', company: 'Nexus Health', channel: 'Email', lastMsg: 'Thanks for reaching out! We are actually looking to rebuild our portal this month.', time: '10m ago', unread: true, sentiment: 'Hot Lead' },
    { id: '2', name: 'Marcus Vance', company: 'Vance Capital', channel: 'LinkedIn', lastMsg: 'Let’s set up a call for Tuesday at 2 PM EST.', time: '45m ago', unread: true, sentiment: 'Meeting Set' },
    { id: '3', name: 'Elena Rostova', company: 'CyberTech Labs', channel: 'WhatsApp', lastMsg: 'Could you send over the SOW document for review?', time: '2h ago', unread: false, sentiment: 'SOW Requested' },
  ]);

  const [activeId, setActiveId] = useState('1');
  const [replyText, setReplyText] = useState('');

  const activeConv = conversations.find(c => c.id === activeId) || conversations[0];

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto h-[calc(100vh-5rem)] flex flex-col">
      {/* Header */}
      <div className="border-b border-slate-800 pb-4 flex justify-between items-center">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
            <MessageSquare className="w-4 h-4" /> Multi-Channel Communication
          </div>
          <h1 className="text-2xl font-extrabold text-white mt-1">Unified Lead Inbox</h1>
        </div>
      </div>

      {/* Main Inbox Container */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl flex-1 flex overflow-hidden">
        {/* Left Conversation List */}
        <div className="w-80 border-r border-slate-800 flex flex-col bg-slate-950/40">
          <div className="p-3 border-b border-slate-800">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-800/60">
            {conversations.map(conv => (
              <div
                key={conv.id}
                onClick={() => setActiveId(conv.id)}
                className={`p-4 cursor-pointer transition-all ${
                  activeId === conv.id ? 'bg-indigo-600/10 border-l-2 border-indigo-500' : 'hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-white">{conv.name}</h4>
                  <span className="text-[10px] text-slate-500">{conv.time}</span>
                </div>
                <p className="text-[11px] text-slate-400 font-medium truncate mt-0.5">{conv.company}</p>
                <p className="text-[11px] text-slate-300 truncate mt-1">{conv.lastMsg}</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-[9px] px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono">
                    {conv.channel}
                  </span>
                  <span className="text-[9px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono font-semibold">
                    {conv.sentiment}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Active Message Thread */}
        <div className="flex-1 flex flex-col bg-slate-900">
          {/* Thread Header */}
          <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/40">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-xs text-indigo-400">
                {activeConv.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-xs font-bold text-white">{activeConv.name}</h3>
                <p className="text-[11px] text-slate-400">{activeConv.company} • <span className="text-indigo-400">{activeConv.channel}</span></p>
              </div>
            </div>

            <span className="text-xs px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-full font-mono">
              Status: {activeConv.sentiment}
            </span>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-6 space-y-4 overflow-y-auto bg-slate-950/20">
            <div className="flex flex-col items-start max-w-lg space-y-1">
              <div className="bg-slate-800 text-slate-200 text-xs p-3.5 rounded-2xl rounded-tl-none border border-slate-700/60 leading-relaxed">
                {activeConv.lastMsg}
              </div>
              <span className="text-[10px] text-slate-500 pl-1">{activeConv.time}</span>
            </div>
          </div>

          {/* Quick Reply Bar */}
          <div className="p-4 border-t border-slate-800 bg-slate-950/60 space-y-3">
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Type your reply or use AI quick nudge..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
              <button className="p-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition-all shadow-md shadow-indigo-600/20">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
