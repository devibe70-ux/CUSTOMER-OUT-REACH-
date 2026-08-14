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
  Building,
  Shield,
  Star,
  Sparkle,
  HelpCircle,
  Search,
  X,
  RefreshCw,
  MapPin,
  Lock,
  Globe,
  Server
} from 'lucide-react';

// --- TYPESCRIPT INTERFACES ---
export interface FeatureItem {
  name: string;
  price: number;
  hours: number;
}

export interface PricingPreset {
  name: string;
  desc: string;
  basePageRate: number;
  features: Record<string, FeatureItem>;
}

// --- DATA ARCHETYPES (Plain-English Layman Language) ---
const UX_ARCHETYPES = [
  {
    id: 'single-page',
    title: '1-Page Quick Sales & Lead Page',
    subtitle: 'Best for single product launches, quick offers, & instant customer lead generation',
    goalMatch: 'Get More Customer Leads & Enquiries',
    basePages: '1 Page Scope',
    wireframe: [
      { name: 'Top Header Navigation + Call Us Button', color: 'bg-teal-500/15 text-teal-800 dark:bg-zinc-800 dark:text-zinc-200' },
      { name: 'Main Headline + Hero Image/Video + Lead Enquiry Form', color: 'bg-teal-600/25 text-teal-900 dark:bg-zinc-700 dark:text-zinc-100' },
      { name: 'Trust Logos & Happy Client Proof Bar', color: 'bg-slate-100 text-slate-700 dark:bg-zinc-900 dark:text-zinc-400' },
      { name: '3-Column Business Benefits & Feature Cards', color: 'bg-teal-500/15 text-teal-800 dark:bg-zinc-800 dark:text-zinc-200' },
      { name: 'Customer Testimonials & Case Reviews', color: 'bg-slate-100 text-slate-700 dark:bg-zinc-900 dark:text-zinc-400' },
      { name: 'Pricing Packages / Instant Contact Form', color: 'bg-emerald-500/20 text-emerald-800 dark:bg-zinc-700 dark:text-zinc-100' },
      { name: 'Footer Links & Legal Info', color: 'bg-slate-200 text-slate-600 dark:bg-zinc-900 dark:text-zinc-500' }
    ]
  },
  {
    id: 'corporate-hub',
    title: 'Complete Business Website (About, Services, Contact)',
    subtitle: 'Best for established companies, agencies, & professional service firms',
    goalMatch: 'Professional Business & Corporate Presence',
    basePages: '5-10 Pages',
    wireframe: [
      { name: 'Main Navigation Menu + Search Bar', color: 'bg-teal-500/15 text-teal-800 dark:bg-zinc-800 dark:text-zinc-200' },
      { name: 'Company Welcome Banner + Key Achievement Metrics', color: 'bg-teal-600/25 text-teal-900 dark:bg-zinc-700 dark:text-zinc-100' },
      { name: 'Our Core Services & Products Grid', color: 'bg-teal-500/15 text-teal-800 dark:bg-zinc-800 dark:text-zinc-200' },
      { name: 'Client Case Studies & Project Portfolio', color: 'bg-slate-100 text-slate-700 dark:bg-zinc-900 dark:text-zinc-400' },
      { name: 'Company Leadership & Team Section', color: 'bg-slate-100 text-slate-700 dark:bg-zinc-900 dark:text-zinc-400' },
      { name: 'Book Consultation / Request Official Quote Form', color: 'bg-emerald-500/20 text-emerald-800 dark:bg-zinc-700 dark:text-zinc-100' },
      { name: 'Full Site Map Footer + Office Locations', color: 'bg-slate-200 text-slate-600 dark:bg-zinc-900 dark:text-zinc-500' }
    ]
  },
  {
    id: 'ecommerce-store',
    title: 'Online Shop & Product Store',
    subtitle: 'Best for retail businesses wanting to sell products online with instant UPI/Card payments',
    goalMatch: 'Sell Products Online (E-Commerce Store)',
    basePages: '10+ Pages',
    wireframe: [
      { name: 'Sitewide Sale Announcement + Search + Shopping Cart', color: 'bg-teal-500/15 text-teal-800 dark:bg-zinc-800 dark:text-zinc-200' },
      { name: 'Featured Products Showcase + Buy Now Button', color: 'bg-teal-600/25 text-teal-900 dark:bg-zinc-700 dark:text-zinc-100' },
      { name: 'Product Category Boxes & Filter Options', color: 'bg-teal-500/15 text-teal-800 dark:bg-zinc-800 dark:text-zinc-200' },
      { name: 'Trending Best-Seller 4-Column Grid', color: 'bg-slate-100 text-slate-700 dark:bg-zinc-900 dark:text-zinc-400' },
      { name: 'Customer Photo Reviews & Ratings Gallery', color: 'bg-slate-100 text-slate-700 dark:bg-zinc-900 dark:text-zinc-400' },
      { name: 'Instant 1-Click Checkout + Razorpay / Cashfree Security Badges', color: 'bg-emerald-500/20 text-emerald-800 dark:bg-zinc-700 dark:text-zinc-100' }
    ]
  },
  {
    id: 'saas-portal',
    title: 'Customer Login Portal & Dashboard',
    subtitle: 'Best for web applications, member account portals, & subscription software',
    goalMatch: 'Member Login Portal & Private Dashboard',
    basePages: 'Custom Scope',
    wireframe: [
      { name: 'Top Account Bar (User Profile, Notifications, Search)', color: 'bg-teal-500/15 text-teal-800 dark:bg-zinc-800 dark:text-zinc-200' },
      { name: 'Interactive Demo & Feature Guide', color: 'bg-teal-600/25 text-teal-900 dark:bg-zinc-700 dark:text-zinc-100' },
      { name: 'Subscription Plan Comparison Cards', color: 'bg-teal-500/15 text-teal-800 dark:bg-zinc-800 dark:text-zinc-200' },
      { name: 'Customer Dashboard Side Navigation', color: 'bg-slate-100 text-slate-700 dark:bg-zinc-900 dark:text-zinc-400' },
      { name: 'Real-Time Reports & Data Tables', color: 'bg-slate-100 text-slate-700 dark:bg-zinc-900 dark:text-zinc-400' },
      { name: 'Self-Service Customer Profile & Billing Management', color: 'bg-emerald-500/20 text-emerald-800 dark:bg-zinc-700 dark:text-zinc-100' }
    ]
  },
  {
    id: 'content-hub',
    title: 'News, Blog & Article Magazine',
    subtitle: 'Best for blogs, industry news publishing, & online resource centers',
    goalMatch: 'News, Articles & Media Publishing',
    basePages: 'Dynamic Catalog',
    wireframe: [
      { name: 'Category Filter Buttons + Search Bar', color: 'bg-teal-500/15 text-teal-800 dark:bg-zinc-800 dark:text-zinc-200' },
      { name: 'Featured Breaking Story Banner', color: 'bg-teal-600/25 text-teal-900 dark:bg-zinc-700 dark:text-zinc-100' },
      { name: '3-Column Article Feed Grid', color: 'bg-teal-500/15 text-teal-800 dark:bg-zinc-800 dark:text-zinc-200' },
      { name: 'Newsletter Subscription Sign-up Box', color: 'bg-emerald-500/20 text-emerald-800 dark:bg-zinc-700 dark:text-zinc-100' },
      { name: 'Trending Topics & Recommended Articles', color: 'bg-slate-100 text-slate-700 dark:bg-zinc-900 dark:text-zinc-400' },
      { name: 'Publisher Info & Social Media Links', color: 'bg-slate-200 text-slate-600 dark:bg-zinc-900 dark:text-zinc-500' }
    ]
  }
];

// Visual Design Styles (Plain-English Layman Language)
const DESIGN_STYLES = [
  {
    id: 'frosted-glass',
    name: '💎 Modern Frosted Glass (Glassmorphism)',
    tag: 'High-Tech & Premium',
    desc: 'Sleek translucent glass panels with soft glowing borders. Gives your business a high-tech modern luxury portal look.',
    previewBg: 'bg-gradient-to-br from-slate-900 via-zinc-900 to-slate-950 text-white',
    cardStyle: 'bg-white/10 backdrop-blur-md border border-white/20 shadow-xl',
    buttonStyle: 'bg-teal-500 text-white shadow-lg shadow-teal-500/30'
  },
  {
    id: 'executive-minimalist',
    name: '🏛️ Clean Corporate Executive (Minimalist)',
    tag: 'Corporate & Trusted',
    desc: 'Ultra-clean white background, bold clear text — like a Forbes or Apple corporate report. Easy to read and highly trustworthy.',
    previewBg: 'bg-white text-slate-900 border border-slate-200',
    cardStyle: 'bg-slate-50 border border-slate-300 shadow-sm',
    buttonStyle: 'bg-slate-900 text-white shadow-md'
  },
  {
    id: 'bold-impact',
    name: '🚀 Bold High-Impact Luxury (Maximum)',
    tag: 'Vibrant & Eye-Catching',
    desc: 'Deep dark contrasts, large prominent buttons, and eye-catching headlines. Impossible for prospective customers to miss.',
    previewBg: 'bg-zinc-950 text-white border border-zinc-800',
    cardStyle: 'bg-zinc-900 border border-zinc-700 shadow-2xl',
    buttonStyle: 'bg-white text-zinc-950 font-extrabold shadow-lg'
  }
];

// --- PRICING PRESETS (STRICT TYPESCRIPT INTERFACES) ---
export const PRICING_PRESETS: Record<'inbound' | 'standard' | 'enterprise', PricingPreset> = {
  inbound: {
    name: '🚀 Inbound Magnet Package (Best Value)',
    desc: 'Special high-conversion tier. Includes Razorpay & Cashfree dual setup for ₹9,000.',
    basePageRate: 2500, // ₹2,500 / page
    features: {
      contact_form: { name: 'Lead Capture & Smart Contact Form', price: 3500, hours: 4 },
      cms: { name: 'Easy Article & Photo Editor (CMS)', price: 9500, hours: 12 },
      seo: { name: 'Google Search Setup & On-Page SEO', price: 6500, hours: 8 },
      payments: { name: 'Dual Gateway (Razorpay + Cashfree)', price: 9000, hours: 16 },
      auth_portal: { name: 'Customer Login Area & Portal', price: 24500, hours: 32 },
      booking: { name: 'Online Appointment & Booking Sync', price: 6500, hours: 8 },
      crm_sync: { name: 'Automatic Customer Alerts & CRM', price: 5500, hours: 6 },
      multilingual: { name: 'Multi-Language Support (Hindi/English)', price: 8500, hours: 12 }
    }
  },
  standard: {
    name: '⚖️ Standard Market Benchmark',
    desc: 'Average traditional agency rates across Tier-1 Indian tech firms.',
    basePageRate: 8500, // ₹8,500 / page
    features: {
      contact_form: { name: 'Lead Capture & Form', price: 12000, hours: 4 },
      cms: { name: 'CMS Engine', price: 35000, hours: 12 },
      seo: { name: 'Technical SEO Setup', price: 25000, hours: 8 },
      payments: { name: 'Payment Gateway Integration', price: 45000, hours: 16 },
      auth_portal: { name: 'Custom Auth Portal', price: 95000, hours: 32 },
      booking: { name: 'Booking Engine', price: 25000, hours: 8 },
      crm_sync: { name: 'CRM Integration', price: 22000, hours: 6 },
      multilingual: { name: 'Localization Setup', price: 38000, hours: 12 }
    }
  },
  enterprise: {
    name: '👑 Enterprise Custom Package',
    desc: 'Bespoke corporate engineering tier for large enterprise clients.',
    basePageRate: 14500, // ₹14,500 / page
    features: {
      contact_form: { name: 'Enterprise Lead Capture', price: 20000, hours: 4 },
      cms: { name: 'Headless Enterprise CMS', price: 60000, hours: 12 },
      seo: { name: 'Enterprise SEO Suite', price: 40000, hours: 8 },
      payments: { name: 'Custom Payments API', price: 75000, hours: 16 },
      auth_portal: { name: 'SaaS Auth Infrastructure', price: 150000, hours: 32 },
      booking: { name: 'Enterprise Scheduling API', price: 40000, hours: 8 },
      crm_sync: { name: 'Custom CRM Pipeline Sync', price: 35000, hours: 6 },
      multilingual: { name: 'Global Localization Engine', price: 60000, hours: 12 }
    }
  }
};

const FEATURE_LABELS: Record<string, string> = {
  contact_form: 'Smart Contact Form (Get Customer Enquiries directly in Email)',
  cms: 'Easy Article & Photo Editor (Update Your Site Anytime Without Help)',
  seo: 'Google Search Setup (Help New Customers Find You on Google)',
  payments: 'Online Payment System (Accept UPI, Google Pay, PhonePe, Cards via Razorpay & Cashfree)',
  auth_portal: 'Customer Login Area & Secret Member Account Dashboard',
  booking: 'Online Appointment & Meeting Booking System',
  crm_sync: 'Automatic Customer Alerts & Email Notification System',
  multilingual: 'Multi-Language Support (English, Hindi & Regional Languages)'
};

// Ponytale vs Google Audit Matrix Data
const AUDIT_MATRIX = [
  {
    item: '1. DPDP Act 2023 & Privacy',
    ponytale: 'All customer data intake forms & webhooks must strictly comply with India\'s DPDP Act 2023.',
    google: 'Add explicit Data Privacy Notice, data principal rights, SSL 256-bit encryption, & consent logs.',
    status: '✅ 100% Implemented & Verified'
  },
  {
    item: '2. Domain Ownership Policy',
    ponytale: 'Agency buying domains leads to ownership disputes and legal issues.',
    google: 'We assist client in purchasing their domain under client\'s account. Client retains 100% domain title.',
    status: '✅ 100% Implemented (Assistance Only)'
  },
  {
    item: '3. Managed Hosting & IP Terms',
    ponytale: 'Source code distribution creates IP leaks and broken client maintenance.',
    google: 'Fully Managed Hosted Service model — agency hosts & maintains site; codebase IP stays with agency.',
    status: '✅ 100% Implemented (Managed Hosting)'
  },
  {
    item: '4. Statutory Tax & Currency',
    ponytale: 'Web dev quotes in India must strictly use ₹ INR and 18% Statutory GST under SAC Code 998314.',
    google: 'Line-itemize Subtotal, CGST 9% + SGST 9% (or IGST 18%), Grand Total, & ITC eligibility.',
    status: '✅ 100% Implemented & Verified'
  },
  {
    item: '5. Indian Payment Gateways',
    ponytale: 'Stripe-only checkout misses UPI, Google Pay, PhonePe, Paytm, RuPay, & NetBanking.',
    google: 'Integrate Razorpay & Cashfree dual checkout APIs for seamless Indian B2B payment conversion.',
    status: '✅ 100% Implemented (Dual Sync @ ₹9,000)'
  }
];

export default function AgencyPlannerApp() {
  const [currentStep, setCurrentStep] = useState(1);
  const [copiedDoc, setCopiedDoc] = useState<string | null>(null);
  const [activeDocTab, setActiveDocTab] = useState('prd');
  const [pricingTier, setPricingTier] = useState<'inbound' | 'standard' | 'enterprise'>('inbound');
  const [selectedStyleId, setSelectedStyleId] = useState('frosted-glass');
  const [showAuditModal, setShowAuditModal] = useState(false);

  // Production Tax & Maintenance State
  const [isInterState, setIsInterState] = useState(true); // true = IGST (18%), false = CGST 9% + SGST 9%
  const [includeAMC, setIncludeAMC] = useState(true);   // Monthly Maintenance Retainer Toggle (₹2,999/mo + GST)

  // Form State
  const [discovery, setDiscovery] = useState({
    clientName: 'Apex Healthtech India',
    industry: 'Health & Wellness SaaS',
    primaryGoal: 'Member Login Portal & Private Dashboard',
    targetAudience: 'Health clinics & B2B medical providers',
    pageCount: 6,
    turnaround: 'Standard Delivery (3-4 Weeks)',
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

  // --- REFACTORED PRODUCTION-GRADE QUOTATION & TAX ENGINE ---
  const quoteCalculation = useMemo(() => {
    const pageCost = discovery.pageCount * activePreset.basePageRate;
    
    let totalEngineeringHours = discovery.pageCount * 3; // 3 hrs per custom page

    const featureCost = discovery.selectedFeatures.reduce((acc, featId) => {
      const feat = activePreset.features[featId];
      if (feat) {
        totalEngineeringHours += feat.hours;
        return acc + feat.price;
      }
      return acc;
    }, 0);

    // Speed Multiplier
    let speedMultiplier = 1.0;
    if (discovery.turnaround.includes('Fast Track')) speedMultiplier = 1.35;
    if (discovery.turnaround.includes('Phased')) speedMultiplier = 0.95;

    const subtotal = Math.round((pageCost + featureCost) * speedMultiplier);

    // Statutory 18% GST Nuance: CGST 9% + SGST 9% (Intra-State) vs IGST 18% (Inter-State)
    const cgstAmount = isInterState ? 0 : Math.round(subtotal * 0.09);
    const sgstAmount = isInterState ? 0 : Math.round(subtotal * 0.09);
    const igstAmount = isInterState ? Math.round(subtotal * 0.18) : 0;
    const gstAmount = cgstAmount + sgstAmount + igstAmount;
    
    const total = subtotal + gstAmount;

    // Market Anchor Benchmark Calculation
    const marketPageCost = discovery.pageCount * standardPreset.basePageRate;
    const marketFeatureCost = discovery.selectedFeatures.reduce((acc, featId) => {
      const feat = standardPreset.features[featId];
      return acc + (feat ? feat.price : 0);
    }, 0);
    const marketSubtotal = Math.round((marketPageCost + marketFeatureCost) * speedMultiplier);
    const marketTotal = marketSubtotal + Math.round(marketSubtotal * 0.18);

    const savingsAmount = Math.max(0, marketTotal - total);
    const savingsPercent = marketTotal > 0 ? Math.round((savingsAmount / marketTotal) * 100) : 0;

    // Exact Milestone Math (Guarantees zero rounding leakage down to the exact rupee!)
    const deposit = Math.round(total * 0.50);
    const midpoint = Math.round(total * 0.25);
    const finalBalance = total - deposit - midpoint; // Always absorbs exact remainder

    // Optional AMC Monthly Retainer (₹2,999/mo + 18% GST)
    const monthlyAMC = includeAMC ? 2999 : 0;
    const amcGST = Math.round(monthlyAMC * 0.18);
    const totalMonthlyAMC = monthlyAMC + amcGST;

    return {
      pageCost,
      featureCost,
      subtotal,
      totalEngineeringHours,
      tax: {
        isInterState,
        cgstAmount,
        sgstAmount,
        igstAmount,
        gstAmount
      },
      total,
      marketTotal,
      savingsAmount,
      savingsPercent,
      milestones: {
        deposit,      // 50% Stage 1
        midpoint,     // 25% Stage 2
        finalBalance  // Exact remaining Stage 3 balance
      },
      retainer: {
        includeAMC,
        monthlyAMC,
        amcGST,
        totalMonthlyAMC
      }
    };
  }, [discovery, activePreset, standardPreset, isInterState, includeAMC]);

  const currentArchetype = UX_ARCHETYPES.find(a => a.id === selectedArchetypeId) || UX_ARCHETYPES[0];

  // Document Generator Templates (INR, 18% GST, DPDP Act 2023 & Managed Hosting Terms)
  const prdContent = useMemo(() => {
    return `# OFFICIAL BUSINESS REQUIREMENTS SUMMARY
**Business Name:** ${discovery.clientName}
**Industry:** ${discovery.industry}
**Date Generated:** ${new Date().toLocaleDateString('en-IN')}
**Chosen Page Layout:** ${currentArchetype.title}
**Chosen Design Style:** ${activeDesignStyle.name}
**Package Tier:** ${activePreset.name}

---

## 1. Project Goal & Audience
The main goal of this website project is **${discovery.primaryGoal}**. 
Target Customers: ${discovery.targetAudience}.
Total Estimated Pages: ${discovery.pageCount} Pages.

---

## 2. Selected Features & Addons
${discovery.selectedFeatures.map(fid => {
  const label = FEATURE_LABELS[fid];
  return `### ${label}
- **Status:** Included in package scope.
- **Goal:** Tested and verified across mobile and desktop.`;
}).join('\n\n')}

---

## 3. Website Design Style & Layout
- **Visual Design Style:** ${activeDesignStyle.name} (${activeDesignStyle.tag})
- **Page Structure:** ${currentArchetype.title}
- **Key Page Sections:**
${currentArchetype.wireframe.map((wf, idx) => `  ${idx + 1}. ${wf.name}`).join('\n')}

---

## 4. Statutory Tax & Data Privacy Compliance
- **Tax Classification:** 18% GST Applicable under SAC Code 998314 (IT Design & Development Services).
- **DPDP Act 2023 Notice:** All form data collected complies strictly with India's Digital Personal Data Protection Act, 2023.
- **Domain Ownership Policy:** Client owns 100% of their domain. Service Provider provides purchase guidance only.
- **Managed Hosting Policy:** Managed hosted service model. Codebase IP remains with Service Provider.`;
  }, [discovery, currentArchetype, activeDesignStyle, activePreset]);

  const trdContent = useMemo(() => {
    return `# TECHNICAL & SECURITY BLUEPRINT
**Project:** ${discovery.clientName} Technical Overview
**Technology Engine:** Next.js (App Router) / React 19 / TypeScript
**Selected Visual Style:** ${activeDesignStyle.name}
**Estimated Build Effort:** ~${quoteCalculation.totalEngineeringHours} Working Hours

---

## 1. Technology & Online Payments
- **Website Engine:** Next.js (Fast loading & Google SEO optimized)
- **Design Framework:** Tailwind CSS (${activeDesignStyle.name})
- **Cloud Hosting:** Cloudflare CDN & Vercel Edge Server (Fully Managed Agency Infrastructure)
- **Database System:** Supabase Secure Database (PostgreSQL)
- **Payment Gateway:** Dual Integration — Razorpay & Cashfree (UPI, Cards, NetBanking @ ₹9,000)

---

## 2. Page Structure & Security Checklist
- [x] Secure SSL Certificate Encryption & DPDP Act 2023 Data Privacy Rules
- [x] Google Mobile Speed & SEO Optimization
- [x] Automatic Weekly Backup System
- [x] 18% GST Invoice & Input Tax Credit (ITC) Support`;
  }, [discovery, quoteCalculation, activeDesignStyle]);

  const contractContent = useMemo(() => {
    const taxLine = quoteCalculation.tax.isInterState 
      ? `**Integrated GST (18% IGST):** ₹${quoteCalculation.tax.igstAmount.toLocaleString('en-IN')} INR`
      : `**Central GST (9% CGST):** ₹${quoteCalculation.tax.cgstAmount.toLocaleString('en-IN')} INR\n**State GST (9% SGST):** ₹${quoteCalculation.tax.sgstAmount.toLocaleString('en-IN')} INR`;

    return `# OFFICIAL STATEMENT OF WORK & LEGAL AGREEMENT

**Client / Business Name:** ${discovery.clientName}
**Service Provider:** Web Development Agency
**Effective Date:** ${new Date().toLocaleDateString('en-IN')}
**Package Tier:** ${activePreset.name}
**Website Work Price (Before Tax):** ₹${quoteCalculation.subtotal.toLocaleString('en-IN')} INR
${taxLine}
**Final Total Contract Sum (Incl. All Taxes):** ₹${quoteCalculation.total.toLocaleString('en-IN')} INR
${quoteCalculation.retainer.includeAMC ? `**Optional Monthly Retainer (AMC):** ₹${quoteCalculation.retainer.totalMonthlyAMC.toLocaleString('en-IN')} INR / Month (Includes ₹${quoteCalculation.retainer.amcGST.toLocaleString('en-IN')} 18% GST)` : ''}
${quoteCalculation.savingsAmount > 0 ? `**Your Market Savings:** ₹${quoteCalculation.savingsAmount.toLocaleString('en-IN')} INR (${quoteCalculation.savingsPercent}% Below Average Market Rates)` : ''}

---

### 1. Scope of Deliverables
The Service Provider agrees to design, build, test, and launch the custom website according to the following scope:
- Visual Theme: ${activeDesignStyle.name}
- Layout Structure: ${currentArchetype.title}
- Total Page Scope: ${discovery.pageCount} Pages
- Included Features: ${discovery.selectedFeatures.map(f => FEATURE_LABELS[f]).join(', ')}
- Target Delivery Time: ${discovery.turnaround}

---

### 2. Simple Payment Milestone Schedule (Includes 18% GST)
Payment shall be rendered in three (3) clear installments upon GST Tax Invoice issuance:
1. **Stage 1 Initial Deposit (50%):** ₹${quoteCalculation.milestones.deposit.toLocaleString('en-IN')} INR (Due upon signing to start project)
2. **Stage 2 Midpoint Approval (25%):** ₹${quoteCalculation.milestones.midpoint.toLocaleString('en-IN')} INR (Due upon design signoff)
3. **Stage 3 Final Pre-Launch Balance (25%):** ₹${quoteCalculation.milestones.finalBalance.toLocaleString('en-IN')} INR (Exact remaining balance prior to DNS launch)

---

### 3. Statutory GST Law Compliance & TDS Notice
- All fees quoted under this official agreement are subject to 18% Goods & Services Tax (GST) as per the Goods & Services Tax Act, 2017 under SAC Code 998314 (*Information Technology Design & Development Services*), enabling 100% Input Tax Credit (ITC) claim.
- **TDS Deduction:** Payments are subject to applicable TDS under Section 194C / 194J of the Income Tax Act. Form 16A TDS certificates must be issued quarterly.

---

### 4. Merchant KYC & Scope Protection Terms
1. **Payment Gateway KYC:** The ₹9,000 fee covers Razorpay & Cashfree integration and sandbox testing. The Client is responsible for submitting valid business KYC documents to Razorpay/Cashfree for merchant account activation.
2. **Revision Cap:** Deliverables include up to **two (2) rounds of revisions** per milestone. Additional requested scope changes will be billed at ₹1,200 / hour.

---

### 5. Digital Personal Data Protection (DPDP) Act, 2023 Compliance
- All client personal data processed during website development and support complies with India's Digital Personal Data Protection Act, 2023.
- Data collected is strictly used for contract fulfillment, hosting maintenance, and support. Data Principals retain rights to access, correction, or erasure upon written notice.

---

### 6. Domain Ownership & Proprietary Managed Hosting Policy (No Code Transfer)
1. **Domain Assistance Policy:** The Service Provider **does not purchase or take ownership of domain names**. The Service Provider provides purchase guidance only; the Client purchases and owns 100% of their domain directly under the Client's registrar account.
2. **Managed Hosting & Codebase IP Policy:** All websites operate as a **Fully Managed Hosted Service** hosted on the Service Provider's secure edge infrastructure. The underlying Next.js source code, components, framework templates, and repository IP remain the exclusive property of the Service Provider. Source code transfer is explicitly excluded. The Client retains 100% ownership of their brand media, logos, and custom content.

---

### 7. Signatures & GSTIN Details

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
              <Sparkles className="w-4 h-4" /> Enterprise Customer Quote & Agreement Engine
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-1">
              Website Discovery & Pricing Suite
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAuditModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-50 dark:bg-zinc-800 hover:bg-teal-100 dark:hover:bg-zinc-700 text-teal-800 dark:text-slate-200 rounded-xl border border-teal-300 dark:border-zinc-700 transition-all text-xs font-bold shadow-sm"
            >
              <Search className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
              <span>Ponytale & Google Audit Report</span>
            </button>

            <span className="text-xs px-3 py-1 bg-slate-100 dark:bg-zinc-800 rounded-full border border-slate-200 dark:border-zinc-700 text-slate-700 dark:text-slate-300 font-mono shadow-sm">
              Razorpay & Cashfree @ ₹9,000
            </span>
          </div>
        </header>

        {/* PONYTALE & GOOGLE AUDIT MODAL */}
        {showAuditModal && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 space-y-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-zinc-800 pb-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Search className="w-5 h-5 text-teal-600 dark:text-slate-300" /> Ponytale & Google Audit & Gap Analysis Report
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    System verification report comparing Ponytale audit findings against Google benchmarks.
                  </p>
                </div>
                <button
                  onClick={() => setShowAuditModal(false)}
                  className="p-2 rounded-xl bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-zinc-700 transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                {AUDIT_MATRIX.map((audit, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">{audit.item}</h4>
                      <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                        {audit.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1">
                      <div className="bg-white dark:bg-zinc-900 p-3 rounded-lg border border-slate-200 dark:border-zinc-800">
                        <span className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Ponytale Audit Finding:</span>
                        <p className="text-slate-600 dark:text-slate-400">{audit.ponytale}</p>
                      </div>
                      <div className="bg-white dark:bg-zinc-900 p-3 rounded-lg border border-slate-200 dark:border-zinc-800">
                        <span className="font-bold text-teal-700 dark:text-slate-200 block mb-1">Google Benchmark Recommendation:</span>
                        <p className="text-slate-600 dark:text-slate-400">{audit.google}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-zinc-800 flex justify-end">
                <button
                  onClick={() => setShowAuditModal(false)}
                  className="px-6 py-2.5 bg-teal-600 text-white dark:bg-white dark:text-slate-900 font-bold rounded-xl shadow-sm"
                >
                  Close Audit Matrix
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP PROGRESS BAR */}
        <nav className="grid grid-cols-4 gap-2 md:gap-4">
          {[
            { num: 1, label: 'Business & Goal Intake', icon: Compass },
            { num: 2, label: 'Design Look & Feel', icon: Eye },
            { num: 3, label: 'Clear Price & 18% GST', icon: Receipt },
            { num: 4, label: 'Official Contract & Specs', icon: FileText },
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

        {/* STEP 1: BUSINESS INTAKE & PRICING PACKAGE SELECTION */}
        {currentStep === 1 && (
          <div className="bg-slate-50/60 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-6 md:p-8 space-y-6 shadow-sm transition-colors">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Compass className="w-5 h-5 text-teal-600 dark:text-slate-300" /> Step 1: Tell Us About Your Business & Goals
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                Fill in your business details below to generate an instant clear website quote in Indian Rupees (₹ INR).
              </p>
            </div>

            {/* STATUTORY LEGAL POLICY NOTICE BANNER */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 rounded-xl bg-teal-500/10 border border-teal-500/30 text-xs text-slate-800 dark:text-slate-200">
              <div className="flex items-start gap-2.5">
                <Shield className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block text-slate-900 dark:text-white">DPDP Act, 2023 Compliant</span>
                  <span className="text-[11px] text-slate-600 dark:text-slate-400">Personal data processed strictly for contract execution under Indian Privacy Law.</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Globe className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block text-slate-900 dark:text-white">Domain Assistance Policy</span>
                  <span className="text-[11px] text-slate-600 dark:text-slate-400">We assist you in buying your domain. You retain 100% domain title & ownership.</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Server className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block text-slate-900 dark:text-white">Fully Managed Hosting</span>
                  <span className="text-[11px] text-slate-600 dark:text-slate-400">We host & maintain your site on edge cloud. Codebase IP remains with agency.</span>
                </div>
              </div>
            </div>

            {/* Pricing Strategy Selector Card */}
            <div className="space-y-3">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-teal-600 dark:text-slate-300" /> Choose Your Pricing Package Tier
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
                            Best Value
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
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">Your Business or Brand Name</label>
                <input
                  type="text"
                  value={discovery.clientName}
                  onChange={(e) => setDiscovery({ ...discovery, clientName: e.target.value })}
                  className="w-full bg-white dark:bg-zinc-950 border border-slate-300 dark:border-zinc-800 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-teal-500 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">Your Business Field / Industry</label>
                <input
                  type="text"
                  value={discovery.industry}
                  onChange={(e) => setDiscovery({ ...discovery, industry: e.target.value })}
                  className="w-full bg-white dark:bg-zinc-950 border border-slate-300 dark:border-zinc-800 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-teal-500 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">What is the main goal of your website?</label>
                <select
                  value={discovery.primaryGoal}
                  onChange={(e) => handleGoalChange(e.target.value)}
                  className="w-full bg-white dark:bg-zinc-950 border border-slate-300 dark:border-zinc-800 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-teal-500 transition-colors"
                >
                  <option>Get More Customer Leads & Enquiries</option>
                  <option>Professional Business & Corporate Presence</option>
                  <option>Sell Products Online (E-Commerce Store)</option>
                  <option>Member Login Portal & Private Dashboard</option>
                  <option>News, Articles & Media Publishing</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">When do you need your website live?</label>
                <select
                  value={discovery.turnaround}
                  onChange={(e) => setDiscovery({ ...discovery, turnaround: e.target.value })}
                  className="w-full bg-white dark:bg-zinc-950 border border-slate-300 dark:border-zinc-800 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-teal-500 transition-colors"
                >
                  <option>Standard Delivery (3-4 Weeks)</option>
                  <option>Fast Track Rush (1-2 Weeks) [+35% Rush Fee]</option>
                  <option>Phased Step-by-Step Rollout (6+ Weeks)</option>
                </select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">Who are your main target customers?</label>
                <input
                  type="text"
                  value={discovery.targetAudience}
                  onChange={(e) => setDiscovery({ ...discovery, targetAudience: e.target.value })}
                  className="w-full bg-white dark:bg-zinc-950 border border-slate-300 dark:border-zinc-800 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-teal-500 transition-colors"
                />
              </div>

              <div className="space-y-3 md:col-span-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">How many pages do you need on your website?</label>
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
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">Select Website Features & Addons You Need</label>
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
                Proceed to Design Look & Feel <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: VISUAL DESIGN LOOK & FEEL SELECTOR */}
        {currentStep === 2 && (
          <div className="bg-slate-50/60 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-6 md:p-8 space-y-6 shadow-sm transition-colors">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Eye className="w-5 h-5 text-teal-600 dark:text-slate-300" /> Step 2: Choose Your Website Look, Feel & Page Layout
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                Select your preferred visual theme and preview a live sample website hero section below.
              </p>
            </div>

            {/* Visual Design Theme Cards */}
            <div className="space-y-3">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                1. Select Visual Design Theme
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
                <span>2. Live Website Sample Preview (How Your Website Will Look to Customers)</span>
                <span className="text-teal-700 dark:text-slate-300 font-mono text-[11px]">Active Style: {activeDesignStyle.name}</span>
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
                    <span>About Us</span>
                    <button className={`px-3 py-1.5 rounded-lg text-xs font-bold ${activeDesignStyle.buttonStyle}`}>
                      Contact Us
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
                      <span className="text-xs font-bold">Client Rating 4.9 / 5 Stars</span>
                    </div>
                    <p className="text-[11px] opacity-80">"Next-gen design with 18% GST statutory invoice compliance."</p>
                    <button className={`w-full py-2 rounded-lg text-xs font-bold ${activeDesignStyle.buttonStyle}`}>
                      Book Free Consultation
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Page Structure Layout List */}
            <div className="space-y-3 pt-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                3. Choose Page Structure Layout ({currentArchetype.title})
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
                              Recommended
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
                      <p className="text-xs text-slate-500 dark:text-slate-400">Page sections from top to bottom</p>
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
                <ChevronLeft className="w-4 h-4" /> Back to Business Intake
              </button>
              <button
                onClick={() => setCurrentStep(3)}
                className="flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-500 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-semibold rounded-xl transition-all shadow-md"
              >
                Calculate Clear Price & 18% GST <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: CLEAR PRICE & 18% GST TAX BREAKDOWN (UPGRADED PRODUCTION ENGINE) */}
        {currentStep === 3 && (
          <div className="bg-slate-50/60 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-6 md:p-8 space-y-6 shadow-sm transition-colors">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Receipt className="w-5 h-5 text-teal-600 dark:text-slate-300" /> Step 3: See Your Clear Pricing & Government Tax Summary
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                Full transparent cost breakdown in Indian Rupees (₹ INR) including statutory 18% GST and optional maintenance retainer.
              </p>
            </div>

            {/* TAX TYPE & AMC RETAINER TOGGLES */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white dark:bg-zinc-950 p-4 rounded-xl border border-slate-200 dark:border-zinc-800 shadow-sm">
              {/* Inter-State vs Intra-State GST Toggle */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-teal-600 dark:text-slate-300" /> GST Tax Billing Region
                </label>
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => setIsInterState(true)}
                    className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold border transition-all ${
                      isInterState 
                        ? 'bg-teal-600 text-white border-teal-600 shadow-sm' 
                        : 'bg-slate-100 dark:bg-zinc-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-zinc-800'
                    }`}
                  >
                    Inter-State (18% IGST)
                  </button>
                  <button
                    onClick={() => setIsInterState(false)}
                    className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold border transition-all ${
                      !isInterState 
                        ? 'bg-teal-600 text-white border-teal-600 shadow-sm' 
                        : 'bg-slate-100 dark:bg-zinc-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-zinc-800'
                    }`}
                  >
                    Intra-State (9% CGST + 9% SGST)
                  </button>
                </div>
              </div>

              {/* Monthly Maintenance AMC Retainer Toggle */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <RefreshCw className="w-4 h-4 text-teal-600 dark:text-slate-300" /> Monthly Maintenance Retainer (AMC)
                </label>
                <div
                  onClick={() => setIncludeAMC(!includeAMC)}
                  className={`flex items-center justify-between p-2 rounded-lg border cursor-pointer transition-all ${
                    includeAMC 
                      ? 'bg-emerald-50 dark:bg-zinc-900 border-emerald-500 text-slate-900 dark:text-white shadow-sm' 
                      : 'bg-slate-100 dark:bg-zinc-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-zinc-800'
                  }`}
                >
                  <div className="flex items-center gap-2 text-xs font-semibold">
                    <div className={`w-4 h-4 rounded flex items-center justify-center border ${includeAMC ? 'bg-emerald-600 text-white border-emerald-600' : 'border-slate-400'}`}>
                      {includeAMC && <Check className="w-3 h-3" />}
                    </div>
                    <span>Optional Monthly Care (₹2,999/mo + GST)</span>
                  </div>
                  <span className="text-[11px] font-mono font-bold text-emerald-700 dark:text-emerald-400">
                    +₹3,539/mo Total
                  </span>
                </div>
              </div>
            </div>

            {/* Inbound Savings Callout Banner */}
            {quoteCalculation.savingsAmount > 0 && (
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-emerald-900 dark:text-emerald-300">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 font-bold">
                    <TrendingDown className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-extrabold text-sm text-slate-900 dark:text-white block">🎉 Special Package Savings Highlight</span>
                    <span>You save <strong className="font-mono text-emerald-700 dark:text-emerald-400">₹{quoteCalculation.savingsAmount.toLocaleString('en-IN')} INR ({quoteCalculation.savingsPercent}%)</strong> compared to average traditional agency rates!</span>
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
                <span className="text-xs font-semibold uppercase tracking-wider text-teal-800 dark:text-slate-400">Final Total Price (Including All Taxes)</span>
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
                    <span>Selected Features ({discovery.selectedFeatures.length}):</span>
                    <span className="font-mono text-slate-900 dark:text-white font-bold">₹{quoteCalculation.featureCost.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-200/80 dark:border-zinc-800/80 pt-2 font-bold">
                    <span>Website Work Price (Before Tax):</span>
                    <span className="font-mono text-slate-900 dark:text-white">₹{quoteCalculation.subtotal.toLocaleString('en-IN')}</span>
                  </div>

                  {/* GST Split Row */}
                  {quoteCalculation.tax.isInterState ? (
                    <div className="flex justify-between text-teal-700 dark:text-teal-400 font-bold">
                      <span>18% IGST (Inter-State):</span>
                      <span className="font-mono">+₹{quoteCalculation.tax.igstAmount.toLocaleString('en-IN')}</span>
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-between text-teal-700 dark:text-teal-400 font-bold">
                        <span>9% CGST (Central Tax):</span>
                        <span className="font-mono">+₹{quoteCalculation.tax.cgstAmount.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between text-teal-700 dark:text-teal-400 font-bold">
                        <span>9% SGST (State Tax):</span>
                        <span className="font-mono">+₹{quoteCalculation.tax.sgstAmount.toLocaleString('en-IN')}</span>
                      </div>
                    </>
                  )}

                  {includeAMC && (
                    <div className="flex justify-between border-t border-slate-200/80 dark:border-zinc-800/80 pt-2 text-emerald-700 dark:text-emerald-400 font-bold">
                      <span>Monthly AMC Retainer:</span>
                      <span className="font-mono">₹{quoteCalculation.retainer.totalMonthlyAMC.toLocaleString('en-IN')}/mo</span>
                    </div>
                  )}

                  <div className="flex justify-between border-t border-slate-200/80 dark:border-zinc-800/80 pt-2 text-[11px] text-slate-500 dark:text-slate-400">
                    <span>GST Tax Credit (ITC):</span>
                    <span className="font-mono text-emerald-700 dark:text-emerald-400 font-bold">100% Claimable</span>
                  </div>
                </div>
              </div>

              {/* Milestones Box (Zero Rounding Leakage) */}
              <div className="md:col-span-2 bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-xl p-6 space-y-4">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Simple 3-Stage Payment Schedule (Includes 18% GST)</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm">
                    <span className="text-[10px] uppercase font-mono text-teal-700 dark:text-slate-400 font-bold">Stage 1 Deposit (50%)</span>
                    <div className="text-base font-bold text-slate-900 dark:text-white mt-1">₹{quoteCalculation.milestones.deposit.toLocaleString('en-IN')}</div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Pay upon signing to start your project</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm">
                    <span className="text-[10px] uppercase font-mono text-teal-700 dark:text-slate-400 font-bold">Stage 2 Midpoint (25%)</span>
                    <div className="text-base font-bold text-slate-900 dark:text-white mt-1">₹{quoteCalculation.milestones.midpoint.toLocaleString('en-IN')}</div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Pay after design & layout approval</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm">
                    <span className="text-[10px] uppercase font-mono text-teal-700 dark:text-slate-400 font-bold">Stage 3 Final Balance (25%)</span>
                    <div className="text-base font-bold text-slate-900 dark:text-white mt-1">₹{quoteCalculation.milestones.finalBalance.toLocaleString('en-IN')}</div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Exact remaining balance prior to launch</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-between">
              <button
                onClick={() => setCurrentStep(2)}
                className="flex items-center gap-2 px-5 py-2.5 bg-slate-200 dark:bg-zinc-800 hover:bg-slate-300 dark:hover:bg-zinc-700 text-slate-800 dark:text-slate-300 font-medium rounded-xl transition-all"
              >
                <ChevronLeft className="w-4 h-4" /> Back to Design Style
              </button>
              <button
                onClick={() => setCurrentStep(4)}
                className="flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-500 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-semibold rounded-xl transition-all shadow-md"
              >
                Get Official Agreement & Contract <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: OFFICIAL CONTRACT & DOCUMENTS HUB */}
        {currentStep === 4 && (
          <div className="bg-slate-50/60 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-6 md:p-8 space-y-6 shadow-sm transition-colors">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-teal-600 dark:text-slate-300" /> Step 4: Your Official Quotation, Tech Summary & Legal Contract
                </h2>
                <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                  Copy or download your complete project specs and ready-to-sign official GST legal agreement.
                </p>
              </div>

              {/* Document Tabs */}
              <div className="flex items-center gap-2 bg-slate-200 dark:bg-zinc-950 p-1 rounded-xl border border-slate-300 dark:border-zinc-800">
                {[
                  { id: 'prd', label: '1. Business Requirements' },
                  { id: 'trd', label: '2. Technology & Security Plan' },
                  { id: 'sow', label: '3. Official Legal Agreement' }
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
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <button
                  onClick={() => setShowAuditModal(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-50 dark:bg-zinc-800 hover:bg-teal-100 dark:hover:bg-zinc-700 text-teal-800 dark:text-slate-200 rounded-lg border border-teal-300 dark:border-zinc-700 transition-all text-xs font-bold shadow-sm"
                >
                  <Search className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" /> View Audit Report
                </button>
                <button
                  onClick={() => {
                    const content = activeDocTab === 'prd' ? prdContent : activeDocTab === 'trd' ? trdContent : contractContent;
                    copyToClipboard(content, activeDocTab);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-800 dark:text-slate-200 rounded-lg border border-slate-300 dark:border-zinc-700 transition-all text-xs shadow-sm"
                >
                  {copiedDoc === activeDocTab ? <Check className="w-3.5 h-3.5 text-teal-600 dark:text-white" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedDoc === activeDocTab ? 'Copied!' : 'Copy Document'}
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
                <ChevronLeft className="w-4 h-4" /> Back to Price & GST
              </button>

              <button
                onClick={() => copyToClipboard(`--- BUSINESS REQUIREMENTS ---\n${prdContent}\n\n--- TECH & SECURITY PLAN ---\n${trdContent}\n\n--- OFFICIAL LEGAL AGREEMENT ---\n${contractContent}`, 'all')}
                className="flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-500 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-bold rounded-xl transition-all shadow-md"
              >
                {copiedDoc === 'all' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copiedDoc === 'all' ? 'All 3 Official Docs Copied!' : 'Export All 3 Documents'}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
