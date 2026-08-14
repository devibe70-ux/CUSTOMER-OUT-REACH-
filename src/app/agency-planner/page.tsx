'use client';

import React, { useState, useMemo } from 'react';
import { 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  Copy, 
  Check, 
  Layers, 
  FileText, 
  DollarSign, 
  Compass, 
  Code, 
  ShieldCheck, 
  Sparkles,
  Layout,
  ExternalLink,
  Laptop,
  ArrowRight,
  Receipt,
  TrendingDown,
  Zap,
  Award,
  CreditCard,
  Eye,
  Sparkle,
  Building,
  Shield,
  Star
} from 'lucide-react';

// --- DATA ARCHETYPES ---
const UX_ARCHETYPES = [
  {
    id: 'single-page',
    title: 'Single-Page Conversion Funnel',
    subtitle: 'Best for product launches, lead magnets, & single services',
    goalMatch: 'Lead Generation',
    basePages: '1-3 Pages',
    wireframe: [
      { name: 'Sticky Header + CTA', color: 'bg-teal-500/15 text-teal-800 dark:bg-zinc-800 dark:text-zinc-200' },
      { name: 'Hero (Headline + Video/Image + Form)', color: 'bg-teal-600/25 text-teal-900 dark:bg-zinc-700 dark:text-zinc-100' },
      { name: 'Trust Logos & Social Proof Bar', color: 'bg-slate-100 text-slate-700 dark:bg-zinc-900 dark:text-zinc-400' },
      { name: '3-Column Value Proposition Grid', color: 'bg-teal-500/15 text-teal-800 dark:bg-zinc-800 dark:text-zinc-200' },
      { name: 'Testimonials & Case Highlights', color: 'bg-slate-100 text-slate-700 dark:bg-zinc-900 dark:text-zinc-400' },
      { name: 'Interactive Pricing / Lead Capture Form', color: 'bg-emerald-500/20 text-emerald-800 dark:bg-zinc-700 dark:text-zinc-100' },
      { name: 'Minimal Legal Footer', color: 'bg-slate-200 text-slate-600 dark:bg-zinc-900 dark:text-zinc-500' }
    ]
  },
  {
    id: 'corporate-hub',
    title: 'Multi-Page Corporate & B2B Hub',
    subtitle: 'Best for established businesses, agencies, & consulting firms',
    goalMatch: 'Corporate Presence',
    basePages: '5-10 Pages',
    wireframe: [
      { name: 'Global Megamenu Navigation + Search', color: 'bg-teal-500/15 text-teal-800 dark:bg-zinc-800 dark:text-zinc-200' },
      { name: 'Hero Value Prop + Client Metrics', color: 'bg-teal-600/25 text-teal-900 dark:bg-zinc-700 dark:text-zinc-100' },
      { name: 'Core Services Interactive Grid', color: 'bg-teal-500/15 text-teal-800 dark:bg-zinc-800 dark:text-zinc-200' },
      { name: 'Case Studies / Client Portfolio Showcase', color: 'bg-slate-100 text-slate-700 dark:bg-zinc-900 dark:text-zinc-400' },
      { name: 'Leadership & Culture Spotlight', color: 'bg-slate-100 text-slate-700 dark:bg-zinc-900 dark:text-zinc-400' },
      { name: 'Consultation Booking / Request Quote Hub', color: 'bg-emerald-500/20 text-emerald-800 dark:bg-zinc-700 dark:text-zinc-100' },
      { name: 'Expanded Site Map Footer + Compliance', color: 'bg-slate-200 text-slate-600 dark:bg-zinc-900 dark:text-zinc-500' }
    ]
  },
  {
    id: 'ecommerce-store',
    title: 'E-Commerce Storefront & Catalog',
    subtitle: 'Best for retail, direct-to-consumer, & digital commerce',
    goalMatch: 'E-Commerce Retail',
    basePages: '10+ Pages',
    wireframe: [
      { name: 'Sitewide Banner + Search + Slide-out Cart', color: 'bg-teal-500/15 text-teal-800 dark:bg-zinc-800 dark:text-zinc-200' },
      { name: 'Hero Seasonal Showcase + Quick Shop CTA', color: 'bg-teal-600/25 text-teal-900 dark:bg-zinc-700 dark:text-zinc-100' },
      { name: 'Category Tiles & Filter Bar', color: 'bg-teal-500/15 text-teal-800 dark:bg-zinc-800 dark:text-zinc-200' },
      { name: 'Trending Products 4-Column Grid', color: 'bg-slate-100 text-slate-700 dark:bg-zinc-900 dark:text-zinc-400' },
      { name: 'Reviews & Social UGC Gallery', color: 'bg-slate-100 text-slate-700 dark:bg-zinc-900 dark:text-zinc-400' },
      { name: 'One-Click Checkout & Secure Badge Footer', color: 'bg-emerald-500/20 text-emerald-800 dark:bg-zinc-700 dark:text-zinc-100' }
    ]
  },
  {
    id: 'saas-portal',
    title: 'SaaS Platform & Authenticated Web App',
    subtitle: 'Best for digital products, member portals, & dashboard tools',
    goalMatch: 'SaaS / Client Portal',
    basePages: 'Custom Scope',
    wireframe: [
      { name: 'Top App Bar (Auth State, Notifications, Search)', color: 'bg-teal-500/15 text-teal-800 dark:bg-zinc-800 dark:text-zinc-200' },
      { name: 'Interactive Product Demo / Feature Highlights', color: 'bg-teal-600/25 text-teal-900 dark:bg-zinc-700 dark:text-zinc-100' },
      { name: 'Dynamic Tiered Pricing Matrix (Monthly/Annual)', color: 'bg-teal-500/15 text-teal-800 dark:bg-zinc-800 dark:text-zinc-200' },
      { name: 'Collapsible Dashboard Sidebar (App View)', color: 'bg-slate-100 text-slate-700 dark:bg-zinc-900 dark:text-zinc-400' },
      { name: 'Real-Time Analytics Widgets & Tables', color: 'bg-slate-100 text-slate-700 dark:bg-zinc-900 dark:text-zinc-400' },
      { name: 'Self-Service Onboarding / Stripe Billing Portal', color: 'bg-emerald-500/20 text-emerald-800 dark:bg-zinc-700 dark:text-zinc-100' }
    ]
  },
  {
    id: 'content-hub',
    title: 'Content & Editorial Publishing Hub',
    subtitle: 'Best for blogs, industry news outlets, & resource directories',
    goalMatch: 'Publishing & Media',
    basePages: 'Dynamic Catalog',
    wireframe: [
      { name: 'Sticky Category Filter Bar + Search', color: 'bg-teal-500/15 text-teal-800 dark:bg-zinc-800 dark:text-zinc-200' },
      { name: 'Hero Featured Editorial Story', color: 'bg-teal-600/25 text-teal-900 dark:bg-zinc-700 dark:text-zinc-100' },
      { name: 'Masonry / 3-Column Article Feed', color: 'bg-teal-500/15 text-teal-800 dark:bg-zinc-800 dark:text-zinc-200' },
      { name: 'Inline Newsletter Subscription Break', color: 'bg-emerald-500/20 text-emerald-800 dark:bg-zinc-700 dark:text-zinc-100' },
      { name: 'Topic Cloud & Recommended Reads', color: 'bg-slate-100 text-slate-700 dark:bg-zinc-900 dark:text-zinc-400' },
      { name: 'RSS, Syndication, & Legal Footer', color: 'bg-slate-200 text-slate-600 dark:bg-zinc-900 dark:text-zinc-500' }
    ]
  }
];

// Visual Design Styles (Plain-English for Senior Executives)
const DESIGN_STYLES = [
  {
    id: 'frosted-glass',
    name: '💎 Modern Frosted Glass (Glassmorphism)',
    tag: 'High-Tech & Premium',
    desc: 'Sleek translucent panels with subtle metallic borders and soft glow. Gives your brand a cutting-edge, high-tech luxury feel.',
    previewBg: 'bg-gradient-to-br from-slate-900 via-zinc-900 to-slate-950 text-white',
    cardStyle: 'bg-white/10 backdrop-blur-md border border-white/20 shadow-xl',
    buttonStyle: 'bg-teal-500 text-white shadow-lg shadow-teal-500/30'
  },
  {
    id: 'executive-minimalist',
    name: '🏛️ Clean Corporate Executive (Minimalist)',
    tag: 'Corporate & Trusted',
    desc: 'Ultra-clean white space, bold typography, and crisp contrast — similar to Forbes or Apple corporate websites. Highly authoritative.',
    previewBg: 'bg-white text-slate-900 border border-slate-200',
    cardStyle: 'bg-slate-50 border border-slate-300 shadow-sm',
    buttonStyle: 'bg-slate-900 text-white shadow-md'
  },
  {
    id: 'bold-impact',
    name: '🚀 Bold High-Impact Luxury (Maximum)',
    tag: 'High Conversion & Vibrant',
    desc: 'Deep rich contrasts, prominent call-to-action buttons, and large bold headlines. Impossible for prospective customers to miss.',
    previewBg: 'bg-zinc-950 text-white border border-zinc-800',
    cardStyle: 'bg-zinc-900 border border-zinc-700 shadow-2xl',
    buttonStyle: 'bg-white text-zinc-950 font-extrabold shadow-lg'
  }
];

const PRICING_PRESETS = {
  inbound: {
    name: '🚀 Inbound Magnet Rate (Razorpay & Cashfree Included)',
    desc: 'Ultra-competitive pricing designed to convert clients instantly with ₹9,000 dual payment gateways.',
    basePageRate: 2500, // ₹2,500 / page
    features: {
      contact_form: { price: 3500, hours: 4 },
      cms: { price: 9500, hours: 12 },
      seo: { price: 6500, hours: 8 },
      payments: { price: 9000, hours: 16 }, // ₹9,000 for Razorpay & Cashfree!
      auth_portal: { price: 24500, hours: 32 },
      booking: { price: 6500, hours: 8 },
      crm_sync: { price: 5500, hours: 6 },
      multilingual: { price: 8500, hours: 12 }
    }
  },
  standard: {
    name: '⚖️ Standard Agency Market Rate',
    desc: 'Average traditional market pricing across Indian web agencies.',
    basePageRate: 8500, // ₹8,500 / page
    features: {
      contact_form: { price: 12000, hours: 4 },
      cms: { price: 35000, hours: 12 },
      seo: { price: 25000, hours: 8 },
      payments: { price: 45000, hours: 16 },
      auth_portal: { price: 95000, hours: 32 },
      booking: { price: 25000, hours: 8 },
      crm_sync: { price: 22000, hours: 6 },
      multilingual: { price: 38000, hours: 12 }
    }
  },
  enterprise: {
    name: '👑 Enterprise Custom Tier',
    desc: 'Premium bespoke engineering tier for large corporate clients.',
    basePageRate: 14500, // ₹14,500 / page
    features: {
      contact_form: { price: 20000, hours: 4 },
      cms: { price: 60000, hours: 12 },
      seo: { price: 40000, hours: 8 },
      payments: { price: 75000, hours: 16 },
      auth_portal: { price: 150000, hours: 32 },
      booking: { price: 40000, hours: 8 },
      crm_sync: { price: 35000, hours: 6 },
      multilingual: { price: 60000, hours: 12 }
    }
  }
};

const FEATURE_LABELS: Record<string, string> = {
  contact_form: 'Lead Capture & Smart Contact Form',
  cms: 'CMS Engine (Blog / Case Studies / News)',
  seo: 'Technical On-Page SEO & Schema Markup',
  payments: 'Dual Payment Gateway Sync (Razorpay & Cashfree Checkout)',
  auth_portal: 'User Authentication & Client Portal Dashboard',
  booking: 'Interactive Calendar / Booking Sync',
  crm_sync: 'CRM / Email Marketing Webhooks',
  multilingual: 'Multilingual / Localization Support'
};

export default function AgencyPlannerApp() {
  const [currentStep, setCurrentStep] = useState(1);
  const [copiedDoc, setCopiedDoc] = useState<string | null>(null);
  const [activeDocTab, setActiveDocTab] = useState('prd');
  const [pricingTier, setPricingTier] = useState<'inbound' | 'standard' | 'enterprise'>('inbound');
  const [selectedStyleId, setSelectedStyleId] = useState('frosted-glass');

  // Form State
  const [discovery, setDiscovery] = useState({
    clientName: 'Apex Healthtech India',
    industry: 'Health & Wellness SaaS',
    primaryGoal: 'SaaS / Client Portal',
    targetAudience: 'Health clinics & B2B medical providers',
    pageCount: 6,
    turnaround: 'Standard (3-4 weeks)',
    selectedFeatures: ['contact_form', 'cms', 'seo', 'auth_portal', 'payments']
  });

  const [selectedArchetypeId, setSelectedArchetypeId] = useState('saas-portal');

  const activePreset = PRICING_PRESETS[pricingTier];
  const standardPreset = PRICING_PRESETS.standard;
  const activeDesignStyle = DESIGN_STYLES.find(s => s.id === selectedStyleId) || DESIGN_STYLES[0];

  // Handle Feature Checkbox Toggle
  const toggleFeature = (id: string) => {
    setDiscovery(prev => {
      const exists = prev.selectedFeatures.includes(id);
      return {
        ...prev,
        selectedFeatures: exists 
          ? prev.selectedFeatures.filter(f => f !== id)
          : [...prev.selectedFeatures, id]
      };
    });
  };

  // Sync Archetype recommendation when Goal changes
  const handleGoalChange = (newGoal: string) => {
    setDiscovery(prev => ({ ...prev, primaryGoal: newGoal }));
    const match = UX_ARCHETYPES.find(a => a.goalMatch === newGoal);
    if (match) setSelectedArchetypeId(match.id);
  };

  // Pricing & 18% GST Calculation Engine (INR)
  const quoteCalculation = useMemo(() => {
    const basePageRate = activePreset.basePageRate;
    const pageCost = discovery.pageCount * basePageRate;
    
    const featureCost = discovery.selectedFeatures.reduce((acc, featId) => {
      const featData = activePreset.features[featId as keyof typeof activePreset.features];
      return acc + (featData ? featData.price : 0);
    }, 0);

    const totalHours = (discovery.pageCount * 3) + discovery.selectedFeatures.reduce((acc, featId) => {
      const featData = activePreset.features[featId as keyof typeof activePreset.features];
      return acc + (featData ? featData.hours : 0);
    }, 0);

    let speedMultiplier = 1.0;
    if (discovery.turnaround.includes('Expedited')) speedMultiplier = 1.35;
    if (discovery.turnaround.includes('Phased')) speedMultiplier = 0.95;

    const subtotal = Math.round((pageCost + featureCost) * speedMultiplier);
    const gstAmount = Math.round(subtotal * 0.18); // 18% GST Under Indian GST Law
    const total = subtotal + gstAmount;

    // Benchmark Market Standard Calculation
    const marketPageCost = discovery.pageCount * standardPreset.basePageRate;
    const marketFeatureCost = discovery.selectedFeatures.reduce((acc, featId) => {
      const featData = standardPreset.features[featId as keyof typeof standardPreset.features];
      return acc + (featData ? featData.price : 0);
    }, 0);
    const marketSubtotal = Math.round((marketPageCost + marketFeatureCost) * speedMultiplier);
    const marketGst = Math.round(marketSubtotal * 0.18);
    const marketTotal = marketSubtotal + marketGst;

    const savingsAmount = Math.max(0, marketTotal - total);
    const savingsPercent = marketTotal > 0 ? Math.round((savingsAmount / marketTotal) * 100) : 0;

    return {
      pageCost,
      featureCost,
      subtotal,
      gstAmount,
      totalHours,
      total,
      marketTotal,
      savingsAmount,
      savingsPercent,
      deposit: Math.round(total * 0.50),
      midpoint: Math.round(total * 0.25),
      final: Math.round(total * 0.25)
    };
  }, [discovery, activePreset, standardPreset]);

  const currentArchetype = UX_ARCHETYPES.find(a => a.id === selectedArchetypeId) || UX_ARCHETYPES[0];

  // Document Generator Templates (INR & 18% GST Compliance)
  const prdContent = useMemo(() => {
    return `# PRODUCT REQUIREMENTS DOCUMENT (PRD)
**Project Name:** ${discovery.clientName} Website Redesign & Build
**Client:** ${discovery.clientName} (${discovery.industry})
**Date:** ${new Date().toLocaleDateString('en-IN')}
**Selected Layout Archetype:** ${currentArchetype.title}
**Visual Design Theme:** ${activeDesignStyle.name}
**Pricing Strategy:** ${activePreset.name}

---

## 1. Executive Summary & Objectives
The primary goal of this project is to build a responsive, high-performance web platform tailored for **${discovery.primaryGoal}**. 
Target Audience: ${discovery.targetAudience}.
Estimated Scope: ${discovery.pageCount} bespoke responsive pages.

---

## 2. Core Functional Requirements
${discovery.selectedFeatures.map(fid => {
  const label = FEATURE_LABELS[fid];
  return `### ${label}
- **Scope:** Complete implementation and testing (Includes Razorpay & Cashfree integration if selected).
- **Acceptance Criteria:** Fully responsive, error-handled, cross-browser verified.`;
}).join('\n\n')}

---

## 3. Visual Design Style & Layout Hierarchy
- **Visual Design Theme:** ${activeDesignStyle.name} (${activeDesignStyle.tag})
- **Information Architecture:** ${currentArchetype.title}
- **Key Page Sections:**
${currentArchetype.wireframe.map((wf, idx) => `  ${idx + 1}. ${wf.name}`).join('\n')}

---

## 4. Statutory & Quality Standards
- **Tax Classification:** 18% GST Applicable under SAC Code 998314 (IT Design & Development Services).
- **Performance:** Google Core Web Vitals score >= 90 on mobile & desktop.
- **Security:** 100% SSL encryption, secure environment variables, sanitized form inputs.
- **Accessibility:** WCAG 2.1 AA compliant typography and contrast ratios.`;
  }, [discovery, currentArchetype, activeDesignStyle, activePreset]);

  const trdContent = useMemo(() => {
    return `# TECHNICAL REQUIREMENTS DOCUMENT (TRD)
**Project:** ${discovery.clientName} Technical Blueprint
**Architecture:** Modern Jamstack / Full-Stack SSR
**Selected Visual Style:** ${activeDesignStyle.name}
**Estimated Development Effort:** ~${quoteCalculation.totalHours} Engineering Hours

---

## 1. System Architecture & Tech Stack
- **Frontend Framework:** Next.js (App Router) / React 19 / TypeScript
- **Styling & UI:** Tailwind CSS + Radix UI primitives (${activeDesignStyle.name} Tokens)
- **Hosting & Edge Delivery:** Vercel Edge Network / Cloudflare CDN
- **Database & Backend:** Supabase (PostgreSQL) or Headless CMS (Sanity/Strapi)
- **Authentication:** NextAuth.js / Supabase Auth (OAuth + Magic Links)
- **Payment Gateway Sync:** Razorpay SDK + Cashfree Payments API (Dual Gateway Integration @ ₹9,000)

---

## 2. Page Hierarchy & Routing Strategy
- \`/ (Root):\` Main Landing page with dynamic hero, social proof, and value proposition.
- \`/features:\` Detailed feature breakdown & capabilities.
- \`/pricing:\` Interactive tiered calculation and INR checkout initiation.
- \`/portal:\` Authenticated user space and dashboard views.
- \`/api/webhooks:\` Edge-based API handlers for Razorpay/Cashfree & CRM events.

---

## 3. Security & Operational Checklist
- [x] Environment variable isolation (\`.env.local\`)
- [x] Rate limiting on public API endpoints
- [x] Automated weekly database snapshots
- [x] Strict CSP (Content Security Policy) and CORS rules`;
  }, [discovery, quoteCalculation, activeDesignStyle]);

  const contractContent = useMemo(() => {
    return `# STATEMENT OF WORK & SERVICE AGREEMENT

**Client:** ${discovery.clientName}
**Service Provider:** Web Development Agency
**Effective Date:** ${new Date().toLocaleDateString('en-IN')}
**Selected Visual Theme:** ${activeDesignStyle.name}
**Selected Pricing Strategy:** ${activePreset.name}
**Taxable Subtotal:** ₹${quoteCalculation.subtotal.toLocaleString('en-IN')} INR
**Goods & Services Tax (18% GST):** ₹${quoteCalculation.gstAmount.toLocaleString('en-IN')} INR (SAC Code: 998314)
**Total Fixed Contract Sum (Incl. 18% GST):** ₹${quoteCalculation.total.toLocaleString('en-IN')} INR
${quoteCalculation.savingsAmount > 0 ? `**Estimated Client Savings:** ₹${quoteCalculation.savingsAmount.toLocaleString('en-IN')} INR (${quoteCalculation.savingsPercent}% Below Average Market Agency Rates)` : ''}

---

### 1. Scope of Deliverables
The Service Provider agrees to design, develop, and deploy the digital web solution according to the following specifications:
- Visual Theme: ${activeDesignStyle.name}
- Architecture: ${currentArchetype.title}
- Total Page Scope: ${discovery.pageCount} Pages
- Included Modules: ${discovery.selectedFeatures.map(f => FEATURE_LABELS[f]).join(', ')}
- Delivery Timeline: ${discovery.turnaround}

---

### 2. Payment Terms & Milestone Schedule (Incl. 18% GST)
Payments shall be rendered in three (3) milestone installments upon issuance of GST-compliant Tax Invoices:
1. **Initial Project Deposit (50%):** ₹${quoteCalculation.deposit.toLocaleString('en-IN')} INR (Due upon signing before sprint kickoff)
2. **Design & Midpoint Approval (25%):** ₹${quoteCalculation.midpoint.toLocaleString('en-IN')} INR (Due upon UX/UI signoff)
3. **Pre-Launch Final Balance (25%):** ₹${quoteCalculation.final.toLocaleString('en-IN')} INR (Due prior to domain DNS cutover & production launch)

---

### 3. Statutory GST Law Compliance (18% GST)
- All fees quoted under this Statement of Work are subject to 18% Goods & Services Tax (GST) as per the Central Goods & Services Tax (CGST) and State Goods & Services Tax (SGST) / IGST Acts, 2017.
- Tax invoices will be issued under SAC Code 998314 (*Information Technology Design & Development Services*).

---

### 4. Signatures & GSTIN Details

**For Service Provider:** ________________________ &nbsp;&nbsp;&nbsp;&nbsp; **Date:** ____________
**GSTIN:** 27AAAAA0000A1Z5

**For Client (${discovery.clientName}):** ________________________ &nbsp;&nbsp;&nbsp;&nbsp; **Date:** ____________
**GSTIN:** ________________________`;
  }, [discovery, currentArchetype, quoteCalculation, activePreset, activeDesignStyle]);

  const copyToClipboard = (text: string, docKey: string) => {
    navigator.clipboard.writeText(text);
    setCopiedDoc(docKey);
    setTimeout(() => setCopiedDoc(null), 2500);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-slate-900 dark:text-slate-100 font-sans antialiased p-4 md:p-8 transition-colors">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* TOP HEADER */}
        <header className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-200 dark:border-zinc-800 pb-6 gap-4">
          <div>
            <div className="flex items-center gap-2 text-teal-600 dark:text-slate-300 text-sm font-semibold tracking-wide uppercase">
              <Sparkles className="w-4 h-4" /> Agency Planning Engine (Executive Guide & 18% GST)
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-1">
              Website Discovery & Architecture Suite
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs px-3 py-1 bg-slate-100 dark:bg-zinc-800 rounded-full border border-slate-200 dark:border-zinc-700 text-slate-700 dark:text-slate-300 font-mono shadow-sm">
              Razorpay & Cashfree @ ₹9,000
            </span>
          </div>
        </header>

        {/* STEP PROGRESS BAR */}
        <nav className="grid grid-cols-4 gap-2 md:gap-4">
          {[
            { num: 1, label: 'Discovery Intake', icon: Compass },
            { num: 2, label: 'Visual Style & Layout', icon: Eye },
            { num: 3, label: 'Quote & 18% GST', icon: Receipt },
            { num: 4, label: 'PRD, TRD & SOW', icon: FileText },
          ].map(step => {
            const Icon = step.icon;
            const isActive = currentStep === step.num;
            const isDone = currentStep > step.num;
            return (
              <button
                key={step.num}
                onClick={() => setCurrentStep(step.num)}
                className={`flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
                  isActive
                    ? 'bg-teal-600 text-white dark:bg-white dark:text-slate-900 border-teal-600 dark:border-white shadow-md'
                    : isDone
                    ? 'bg-teal-50/80 dark:bg-zinc-900 border-teal-200 dark:border-zinc-700 text-teal-950 dark:text-slate-300 hover:border-teal-300 dark:hover:border-zinc-600'
                    : 'bg-slate-50 dark:bg-zinc-900/40 border-slate-200 dark:border-zinc-800/80 text-slate-400 dark:text-slate-500'
                }`}
              >
                <div className={`p-2 rounded-lg ${isActive ? 'bg-teal-700 text-white dark:bg-slate-200 dark:text-slate-900' : isDone ? 'bg-teal-200 text-teal-900 dark:bg-zinc-800 dark:text-slate-100' : 'bg-slate-200 dark:bg-zinc-800 text-slate-500'}`}>
                  {isDone ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                </div>
                <div className="hidden md:block">
                  <div className="text-[11px] uppercase tracking-wider opacity-70">Step 0{step.num}</div>
                  <div className="text-xs font-semibold">{step.label}</div>
                </div>
              </button>
            );
          })}
        </nav>

        {/* STEP 1: DISCOVERY & PRICING PRESET SELECTION */}
        {currentStep === 1 && (
          <div className="bg-slate-50/60 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-6 md:p-8 space-y-6 shadow-sm transition-colors">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Compass className="w-5 h-5 text-teal-600 dark:text-slate-300" /> Client Discovery & Business Objectives
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                Enter your client requirements with Razorpay & Cashfree integration at ₹9,000.
              </p>
            </div>

            {/* Pricing Strategy Selector Card */}
            <div className="space-y-3">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-teal-600 dark:text-slate-300" /> Investment Rate Strategy
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {(['inbound', 'standard', 'enterprise'] as const).map(tierKey => {
                  const preset = PRICING_PRESETS[tierKey];
                  const isSelected = pricingTier === tierKey;
                  return (
                    <div
                      key={tierKey}
                      onClick={() => setPricingTier(tierKey)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-teal-50 dark:bg-zinc-800 border-teal-500 dark:border-zinc-600 text-slate-900 dark:text-white ring-1 ring-teal-500 dark:ring-zinc-600'
                          : 'bg-white dark:bg-zinc-950 border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-zinc-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-xs text-slate-900 dark:text-white">{preset.name}</h4>
                        {tierKey === 'inbound' && (
                          <span className="text-[9px] px-2 py-0.5 rounded bg-teal-600 text-white font-mono font-bold">
                            High Conversion
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5 leading-snug">{preset.desc}</p>
                      <div className="mt-3 pt-2 border-t border-slate-200 dark:border-zinc-800 text-xs font-mono font-bold text-teal-700 dark:text-slate-200">
                        ₹{preset.basePageRate.toLocaleString('en-IN')} / Page Base Rate
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">Client / Brand Name</label>
                <input
                  type="text"
                  value={discovery.clientName}
                  onChange={(e) => setDiscovery({ ...discovery, clientName: e.target.value })}
                  className="w-full bg-white dark:bg-zinc-950 border border-slate-300 dark:border-zinc-800 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-teal-500 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">Industry / Niche</label>
                <input
                  type="text"
                  value={discovery.industry}
                  onChange={(e) => setDiscovery({ ...discovery, industry: e.target.value })}
                  className="w-full bg-white dark:bg-zinc-950 border border-slate-300 dark:border-zinc-800 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-teal-500 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">Primary Objective</label>
                <select
                  value={discovery.primaryGoal}
                  onChange={(e) => handleGoalChange(e.target.value)}
                  className="w-full bg-white dark:bg-zinc-950 border border-slate-300 dark:border-zinc-800 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-teal-500 transition-colors"
                >
                  <option>Lead Generation</option>
                  <option>Corporate Presence</option>
                  <option>E-Commerce Retail</option>
                  <option>SaaS / Client Portal</option>
                  <option>Publishing & Media</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">Target Delivery Schedule</label>
                <select
                  value={discovery.turnaround}
                  onChange={(e) => setDiscovery({ ...discovery, turnaround: e.target.value })}
                  className="w-full bg-white dark:bg-zinc-950 border border-slate-300 dark:border-zinc-800 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-teal-500 transition-colors"
                >
                  <option>Standard (3-4 weeks)</option>
                  <option>Expedited (1-2 weeks) [+35% rush fee]</option>
                  <option>Phased Deployment (6+ weeks)</option>
                </select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">Target Audience & Buyer Persona</label>
                <input
                  type="text"
                  value={discovery.targetAudience}
                  onChange={(e) => setDiscovery({ ...discovery, targetAudience: e.target.value })}
                  className="w-full bg-white dark:bg-zinc-950 border border-slate-300 dark:border-zinc-800 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-teal-500 transition-colors"
                />
              </div>

              <div className="space-y-3 md:col-span-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">Estimated Page Count Scope</label>
                  <span className="text-sm font-bold text-teal-700 dark:text-white px-3 py-1 bg-teal-50 dark:bg-zinc-800 rounded-lg border border-teal-200 dark:border-zinc-700">
                    {discovery.pageCount} Pages (₹{(discovery.pageCount * activePreset.basePageRate).toLocaleString('en-IN')})
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="25"
                  value={discovery.pageCount}
                  onChange={(e) => setDiscovery({ ...discovery, pageCount: parseInt(e.target.value) })}
                  className="w-full h-2 bg-slate-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-teal-600 dark:accent-white"
                />
              </div>

              <div className="space-y-3 md:col-span-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">Required Functional Features</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {Object.keys(FEATURE_LABELS).map(featId => {
                    const isChecked = discovery.selectedFeatures.includes(featId);
                    const featData = activePreset.features[featId as keyof typeof activePreset.features];
                    return (
                      <div
                        key={featId}
                        onClick={() => toggleFeature(featId)}
                        className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                          isChecked 
                            ? 'bg-teal-50 dark:bg-zinc-800 border-teal-500 dark:border-zinc-600 text-slate-900 dark:text-white shadow-sm' 
                            : 'bg-white dark:bg-zinc-950/60 border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-zinc-700'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded flex items-center justify-center border ${isChecked ? 'bg-teal-600 dark:bg-white border-teal-600 dark:border-white text-white dark:text-slate-900' : 'border-slate-300 dark:border-zinc-700'}`}>
                            {isChecked && <Check className="w-3 h-3" />}
                          </div>
                          <span className="text-sm font-medium">{FEATURE_LABELS[featId]}</span>
                        </div>
                        <span className={`text-xs font-mono font-bold ${featId === 'payments' ? 'text-emerald-700 dark:text-emerald-400' : 'text-teal-700 dark:text-slate-300'}`}>
                          +₹{featData?.price.toLocaleString('en-IN')}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={() => setCurrentStep(2)}
                className="flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-500 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-semibold rounded-xl transition-all shadow-md"
              >
                Proceed to Visual Design Style Selector <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: VISUAL DESIGN STYLE & LAYOUT SELECTOR (EXECUTIVE FRIENDLY) */}
        {currentStep === 2 && (
          <div className="bg-slate-50/60 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-6 md:p-8 space-y-6 shadow-sm transition-colors">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Eye className="w-5 h-5 text-teal-600 dark:text-slate-300" /> Visual Design Style & Website Structure
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                Choose the visual design theme and page layout structure for your business website.
              </p>
            </div>

            {/* Visual Design Theme Cards */}
            <div className="space-y-3">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                1. Select Visual Design Look & Feel
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {DESIGN_STYLES.map(style => {
                  const isSelected = selectedStyleId === style.id;
                  return (
                    <div
                      key={style.id}
                      onClick={() => setSelectedStyleId(style.id)}
                      className={`p-5 rounded-2xl border cursor-pointer transition-all space-y-3 ${
                        isSelected
                          ? 'bg-teal-50 dark:bg-zinc-800 border-teal-500 dark:border-zinc-600 text-slate-900 dark:text-white ring-2 ring-teal-500 dark:ring-zinc-600 shadow-md'
                          : 'bg-white dark:bg-zinc-950 border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-zinc-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white">{style.name}</h4>
                        <span className="text-[10px] px-2 py-0.5 rounded font-mono font-bold bg-slate-200 dark:bg-zinc-700 text-slate-800 dark:text-slate-200">
                          {style.tag}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{style.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* LIVE SAMPLE VISUAL PREVIEW BOX */}
            <div className="space-y-3 pt-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 flex items-center justify-between">
                <span>2. Live Website Visual Style Preview</span>
                <span className="text-teal-700 dark:text-slate-300 font-mono text-[11px]">Selected: {activeDesignStyle.name}</span>
              </label>

              {/* Sample Live Website Hero Container */}
              <div className={`rounded-2xl p-6 md:p-8 space-y-6 overflow-hidden transition-all border ${activeDesignStyle.previewBg}`}>
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2">
                    <Building className="w-5 h-5 text-teal-400" />
                    <span className="font-extrabold text-sm tracking-tight">{discovery.clientName}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-medium opacity-80">
                    <span>Services</span>
                    <span>About</span>
                    <button className={`px-3 py-1.5 rounded-lg text-xs font-bold ${activeDesignStyle.buttonStyle}`}>
                      Get Started
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                  <div className="md:col-span-2 space-y-3">
                    <span className="text-[10px] uppercase font-mono px-2.5 py-1 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30">
                      {discovery.industry}
                    </span>
                    <h3 className="text-2xl font-extrabold leading-tight">
                      Transforming {discovery.clientName}'s Digital Growth
                    </h3>
                    <p className="text-xs opacity-80 leading-relaxed">
                      Custom responsive web platform built for {discovery.targetAudience} with instant Razorpay & Cashfree checkout.
                    </p>
                  </div>

                  {/* Sample Interactive Card */}
                  <div className={`p-4 rounded-xl space-y-3 ${activeDesignStyle.cardStyle}`}>
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-amber-400 fill-current" />
                      <span className="text-xs font-bold">Client Trust Score 99.8%</span>
                    </div>
                    <p className="text-[11px] opacity-80">"Next-gen design with 18% GST statutory invoice compliance."</p>
                    <button className={`w-full py-2 rounded-lg text-xs font-bold ${activeDesignStyle.buttonStyle}`}>
                      Request Consultation
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Page Wireframe Structure List */}
            <div className="space-y-3 pt-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                3. Page Layout Structure ({currentArchetype.title})
              </label>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Archetype Cards List */}
                <div className="space-y-3">
                  {UX_ARCHETYPES.map(arch => {
                    const isSelected = selectedArchetypeId === arch.id;
                    const isRecommended = arch.goalMatch === discovery.primaryGoal;
                    return (
                      <div
                        key={arch.id}
                        onClick={() => setSelectedArchetypeId(arch.id)}
                        className={`p-4 rounded-xl border cursor-pointer transition-all ${
                          isSelected 
                            ? 'bg-teal-50 dark:bg-zinc-800 border-teal-500 dark:border-zinc-600 text-slate-900 dark:text-white ring-1 ring-teal-500 dark:ring-zinc-600' 
                            : 'bg-white dark:bg-zinc-950 border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-zinc-700'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-sm text-slate-900 dark:text-white">{arch.title}</h3>
                          {isRecommended && (
                            <span className="text-[10px] bg-teal-100 dark:bg-zinc-700 text-teal-800 dark:text-slate-200 border border-teal-300 dark:border-zinc-600 px-2 py-0.5 rounded-full font-mono font-semibold">
                              Auto-Match
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{arch.subtitle}</p>
                      </div>
                    );
                  })}
                </div>

                {/* Wireframe Preview Canvas */}
                <div className="md:col-span-2 bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-xl p-6 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-200 dark:border-zinc-800 pb-3">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">{currentArchetype.title} Layout</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Page structure blocks from top to bottom</p>
                    </div>
                    <span className="text-xs font-mono text-teal-700 dark:text-white bg-teal-50 dark:bg-zinc-800 px-2.5 py-1 rounded border border-teal-200 dark:border-zinc-700 font-bold">
                      {currentArchetype.basePages}
                    </span>
                  </div>

                  <div className="space-y-2.5 pt-2">
                    {currentArchetype.wireframe.map((section, idx) => (
                      <div
                        key={idx}
                        className={`p-3.5 rounded-lg border border-slate-200 dark:border-zinc-700 flex items-center justify-between text-xs font-medium ${section.color}`}
                      >
                        <span className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-white dark:bg-zinc-900 flex items-center justify-center font-mono text-[10px] shadow-sm">
                            {idx + 1}
                          </span>
                          {section.name}
                        </span>
                        <span className="text-[10px] uppercase font-mono opacity-70">Block #{idx + 1}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-between">
              <button
                onClick={() => setCurrentStep(1)}
                className="flex items-center gap-2 px-5 py-2.5 bg-slate-200 dark:bg-zinc-800 hover:bg-slate-300 dark:hover:bg-zinc-700 text-slate-800 dark:text-slate-300 font-medium rounded-xl transition-all"
              >
                <ChevronLeft className="w-4 h-4" /> Back to Discovery
              </button>
              <button
                onClick={() => setCurrentStep(3)}
                className="flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-500 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-semibold rounded-xl transition-all shadow-md"
              >
                Calculate Quote & 18% GST <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: QUOTE & 18% GST BREAKDOWN */}
        {currentStep === 3 && (
          <div className="bg-slate-50/60 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-6 md:p-8 space-y-6 shadow-sm transition-colors">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Receipt className="w-5 h-5 text-teal-600 dark:text-slate-300" /> Quotation & Statutory 18% GST Engine
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                Itemized breakdown in Indian Rupees (₹ INR) including compulsory 18% GST under SAC Code 998314.
              </p>
            </div>

            {/* Inbound Savings Callout Banner */}
            {quoteCalculation.savingsAmount > 0 && (
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-emerald-900 dark:text-emerald-300">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 font-bold">
                    <TrendingDown className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-extrabold text-sm text-slate-900 dark:text-white block">Inbound Magnet Pricing Advantage</span>
                    <span>Your client saves <strong className="font-mono text-emerald-700 dark:text-emerald-400">₹{quoteCalculation.savingsAmount.toLocaleString('en-IN')} INR ({quoteCalculation.savingsPercent}%)</strong> compared to standard market agency quotes!</span>
                  </div>
                </div>

                <span className="text-[10px] uppercase font-mono px-3 py-1 bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 rounded-full font-bold self-start sm:self-center">
                  Razorpay & Cashfree @ ₹9,000
                </span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Cost Summary Box */}
              <div className="bg-gradient-to-br from-teal-50 to-slate-100 dark:from-zinc-950 dark:to-zinc-900 border border-teal-200 dark:border-zinc-800 rounded-xl p-6 space-y-4 shadow-sm">
                <span className="text-xs font-semibold uppercase tracking-wider text-teal-800 dark:text-slate-400">Total Fixed Investment (Incl. 18% GST)</span>
                <div className="text-3xl font-extrabold text-slate-900 dark:text-white">
                  ₹{quoteCalculation.total.toLocaleString('en-IN')}
                  <span className="text-xs font-normal text-slate-500 dark:text-slate-400 ml-1.5">INR</span>
                </div>
                <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-zinc-800 text-xs text-slate-700 dark:text-slate-300">
                  <div className="flex justify-between">
                    <span>Base Pages ({discovery.pageCount} pgs):</span>
                    <span className="font-mono text-slate-900 dark:text-white font-bold">₹{quoteCalculation.pageCost.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Module Addons ({discovery.selectedFeatures.length}):</span>
                    <span className="font-mono text-slate-900 dark:text-white font-bold">₹{quoteCalculation.featureCost.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-200/80 dark:border-zinc-800/80 pt-2 font-bold">
                    <span>Taxable Subtotal:</span>
                    <span className="font-mono text-slate-900 dark:text-white">₹{quoteCalculation.subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-teal-700 dark:text-teal-400 font-bold">
                    <span>GST @ 18% (SAC 998314):</span>
                    <span className="font-mono">+₹{quoteCalculation.gstAmount.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-200/80 dark:border-zinc-800/80 pt-2">
                    <span>Estimated Dev Effort:</span>
                    <span className="font-mono text-teal-700 dark:text-white font-bold">~{quoteCalculation.totalHours} Hours</span>
                  </div>
                </div>
              </div>

              {/* Milestones Box */}
              <div className="md:col-span-2 bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-xl p-6 space-y-4">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Payment Milestone Schedule (Incl. 18% GST)</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm">
                    <span className="text-[10px] uppercase font-mono text-teal-700 dark:text-slate-400 font-bold">Milestone 1 (50%)</span>
                    <div className="text-base font-bold text-slate-900 dark:text-white mt-1">₹{quoteCalculation.deposit.toLocaleString('en-IN')}</div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Deposit upon signing to begin sprint</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm">
                    <span className="text-[10px] uppercase font-mono text-teal-700 dark:text-slate-400 font-bold">Milestone 2 (25%)</span>
                    <div className="text-base font-bold text-slate-900 dark:text-white mt-1">₹{quoteCalculation.midpoint.toLocaleString('en-IN')}</div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Design signoff & core dev build</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm">
                    <span className="text-[10px] uppercase font-mono text-teal-700 dark:text-slate-400 font-bold">Milestone 3 (25%)</span>
                    <div className="text-base font-bold text-slate-900 dark:text-white mt-1">₹{quoteCalculation.final.toLocaleString('en-IN')}</div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Pre-launch QA & DNS handover</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-between">
              <button
                onClick={() => setCurrentStep(2)}
                className="flex items-center gap-2 px-5 py-2.5 bg-slate-200 dark:bg-zinc-800 hover:bg-slate-300 dark:hover:bg-zinc-700 text-slate-800 dark:text-slate-300 font-medium rounded-xl transition-all"
              >
                <ChevronLeft className="w-4 h-4" /> Back to Style Selector
              </button>
              <button
                onClick={() => setCurrentStep(4)}
                className="flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-500 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-semibold rounded-xl transition-all shadow-md"
              >
                Generate PRD, TRD & GST SOW Contract <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: SPECS & GST CONTRACT HUB */}
        {currentStep === 4 && (
          <div className="bg-slate-50/60 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-6 md:p-8 space-y-6 shadow-sm transition-colors">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-teal-600 dark:text-slate-300" /> Specification & Legal Hub
                </h2>
                <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                  Ready-to-export documents generated dynamically from your scoping data in INR and 18% GST compliance.
                </p>
              </div>

              {/* Document Tabs */}
              <div className="flex items-center gap-2 bg-slate-200 dark:bg-zinc-950 p-1 rounded-xl border border-slate-300 dark:border-zinc-800">
                {[
                  { id: 'prd', label: '1. PRD (Product)' },
                  { id: 'trd', label: '2. TRD (Tech Stack)' },
                  { id: 'sow', label: '3. GST SOW Contract' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveDocTab(tab.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      activeDocTab === tab.id
                        ? 'bg-teal-600 text-white dark:bg-white dark:text-slate-900 shadow-sm'
                        : 'text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Document Content Box */}
            <div className="relative bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-xl p-6 font-mono text-xs text-slate-800 dark:text-slate-300 leading-relaxed overflow-x-auto max-h-[480px]">
              <div className="absolute top-4 right-4">
                <button
                  onClick={() => {
                    const content = activeDocTab === 'prd' ? prdContent : activeDocTab === 'trd' ? trdContent : contractContent;
                    copyToClipboard(content, activeDocTab);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-800 dark:text-slate-200 rounded-lg border border-slate-300 dark:border-zinc-700 transition-all text-xs shadow-sm"
                >
                  {copiedDoc === activeDocTab ? <Check className="w-3.5 h-3.5 text-teal-600 dark:text-white" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedDoc === activeDocTab ? 'Copied!' : 'Copy Markdown'}
                </button>
              </div>

              <pre className="whitespace-pre-wrap">
                {activeDocTab === 'prd' && prdContent}
                {activeDocTab === 'trd' && trdContent}
                {activeDocTab === 'sow' && contractContent}
              </pre>
            </div>

            <div className="pt-4 flex justify-between items-center">
              <button
                onClick={() => setCurrentStep(3)}
                className="flex items-center gap-2 px-5 py-2.5 bg-slate-200 dark:bg-zinc-800 hover:bg-slate-300 dark:hover:bg-zinc-700 text-slate-800 dark:text-slate-300 font-medium rounded-xl transition-all"
              >
                <ChevronLeft className="w-4 h-4" /> Back to Quote
              </button>

              <button
                onClick={() => copyToClipboard(`--- PRD ---\n${prdContent}\n\n--- TRD ---\n${trdContent}\n\n--- SOW CONTRACT ---\n${contractContent}`, 'all')}
                className="flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-500 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-bold rounded-xl transition-all shadow-md"
              >
                {copiedDoc === 'all' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copiedDoc === 'all' ? 'All 3 Docs Copied!' : 'Export All 3 GST Docs'}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
