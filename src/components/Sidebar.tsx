'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Compass, Sparkles } from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white/95 dark:bg-zinc-900/90 border-r border-slate-200 dark:border-zinc-800 flex flex-col h-screen sticky top-0 z-30 transition-colors">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-200 dark:border-zinc-800 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-teal-600 dark:bg-slate-100 flex items-center justify-center text-white dark:text-slate-900 shadow-md">
          <Sparkles className="w-5 h-5 fill-current" />
        </div>
        <div>
          <h1 className="font-extrabold text-slate-900 dark:text-white text-base tracking-tight leading-tight">Agency Engine</h1>
          <p className="text-[11px] text-teal-600 dark:text-slate-400 font-semibold">Discovery & Scope Suite</p>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="flex-1 px-3 py-4 space-y-2 overflow-y-auto">
        <div className="px-3 mb-2 text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
          Architecture Steps
        </div>

        <Link
          href="/"
          className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-semibold transition-all ${
            pathname === '/' || pathname === '/agency-planner'
              ? 'bg-teal-600 text-white dark:bg-white dark:text-slate-900 shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-zinc-800/60'
          }`}
        >
          <div className="flex items-center gap-3">
            <Compass className="w-4 h-4" />
            <span>Discovery & Scoping</span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-full font-mono bg-teal-700 dark:bg-slate-200 text-white dark:text-slate-900 font-bold">
            Active
          </span>
        </Link>
      </nav>

      {/* Footer Info */}
      <div className="p-4 border-t border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-950/50 transition-colors">
        <div className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl p-3 text-center space-y-1">
          <div className="text-xs font-bold text-slate-900 dark:text-white">Agency Discovery Engine</div>
          <div className="text-[10px] text-slate-500 dark:text-slate-400">PRD • TRD • SOW Generator</div>
        </div>
      </div>
    </aside>
  );
}
