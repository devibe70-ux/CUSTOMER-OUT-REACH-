import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import { ThemeProvider } from "@/components/ThemeProvider";
import ThemeToggle from "@/components/ThemeToggle";
import { Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Website & Project Planner | Instant Customer Quotation Engine",
  description: "Easy Website Scoping, Visual Look Selector, Clear Price Engine & Official Contract Generator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="bg-white dark:bg-zinc-950 text-slate-900 dark:text-slate-100 min-h-screen flex antialiased transition-colors">
        <ThemeProvider>
          <Sidebar />
          
          <div className="flex-1 flex flex-col min-w-0">
            {/* Top Header */}
            <header className="h-16 border-b border-slate-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/60 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-20 transition-colors">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-teal-600 dark:text-slate-300" />
                <span className="text-xs font-bold text-slate-900 dark:text-white tracking-wide uppercase">
                  Website & Project Planner (Instant Customer Quotation Tool)
                </span>
              </div>

              <div className="flex items-center gap-4">
                {/* Theme Toggle Button */}
                <ThemeToggle />

                <span className="text-[11px] px-3 py-1 bg-teal-500/10 dark:bg-zinc-800 text-teal-700 dark:text-slate-200 border border-teal-500/30 dark:border-zinc-700 rounded-full font-mono font-semibold">
                  Status: Ready for Client Intake
                </span>
              </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
