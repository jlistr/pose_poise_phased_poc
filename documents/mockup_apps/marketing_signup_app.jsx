'use client';

import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Sparkles, 
  Zap, 
  Star, 
  ArrowRight,
  Shield,
  Palette,
  Eye,
  Camera
} from 'lucide-react';

// --- CUSTOM LOW-RES SVG ICONS FROM STYLE GUIDE ---
const PoseIcon = ({ size = 24, strokeWidth = 1.5, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <circle cx="13" cy="3" r="1.2" fill={color} stroke="none" />
    <path d="M13 4.5c-1 0-2.5.5-3.5 2s-1 3-1 3" />
    <path d="M13 4.5c.8 3 0 7-2 9" />
    <path d="M11 13.5c-2 3-5 5-6 9.5h14c-1-5-4-7-6-9.5" />
    <path d="M11 15l1 7" opacity="0.3" strokeWidth={strokeWidth * 0.8} />
    <path d="M11 7.5l3.5 1.5-1 4" />
  </svg>
);

const App = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const plans = [
    {
      name: "Free",
      description: "For aspiring models securing their first digital footprint.",
      monthlyPrice: "$0",
      annualPrice: "$0",
      features: [
        "Standard Digital Comp Card",
        "Pose & Poise Subdomain",
        "Up to 10 High-Res Images",
        "Basic Physical Stats",
        "Standard Chat Support"
      ],
      notIncluded: [
        "Custom Domain Name",
        "AI Image Curation",
        "Analytics Dashboard",
        "Unbranded Showcase"
      ],
      cta: "Start Free",
      popular: false,
      color: "#1A1A1A",
      bg: "#FAF9F7"
    },
    {
      name: "Pro",
      description: "For working freelancers needing a polished, agency-level aesthetic.",
      monthlyPrice: "$19",
      annualPrice: "$15",
      features: [
        "Advanced Dynamic Comp Cards",
        "Connect Custom Domain",
        "Unlimited High-Res Images",
        "AI Image Curation Tool",
        "Social Media Canvas Builder",
        "Priority Email Support"
      ],
      notIncluded: [
        "Analytics Dashboard",
        "Unbranded Showcase"
      ],
      cta: "Upgrade to Pro",
      popular: true,
      color: "#FAF9F7",
      bg: "#1A1A1A"
    },
    {
      name: "Premium",
      description: "For established professionals demanding absolute control and insights.",
      monthlyPrice: "$39",
      annualPrice: "$29",
      features: [
        "Everything in Pro",
        "Unbranded Showcase",
        "Advanced Analytics Dashboard",
        "Client Proofing & Download Logs",
        "Custom Video Backgrounds",
        "24/7 Dedicated Support"
      ],
      notIncluded: [],
      cta: "Go Premium",
      popular: false,
      color: "#1A1A1A",
      bg: "#FAF9F7"
    }
  ];

  return (
    <div className="font-sans min-h-screen selection:bg-[#C4A484] selection:text-white" style={{ backgroundColor: '#FAF9F7', color: '#1A1A1A' }}>
      
      {/* Import the required fonts */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Outfit:wght@300;400;500;700&display=swap');
        
        .font-cormorant { font-family: 'Cormorant Garamond', Georgia, serif; }
        .font-outfit { font-family: 'Outfit', sans-serif; }
      `}} />

      {/* --- NAVIGATION --- */}
      <nav className="fixed w-full z-50 bg-[#FAF9F7]/80 backdrop-blur-md border-b border-[#1A1A1A]/10">
        <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="p-2 bg-[#1A1A1A] rounded-full text-[#FAF9F7] transition-transform duration-500 group-hover:rotate-[360deg]">
              <PoseIcon size={20} />
            </div>
            <span className="font-cormorant text-2xl tracking-widest uppercase">Pose & Poise</span>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-10">
            {['Features', 'Templates', 'Agencies', 'Pricing'].map((link) => (
              <a key={link} href="#" className="font-outfit text-xs uppercase tracking-[0.2em] font-medium text-[#1A1A1A]/70 hover:text-[#C4A484] transition-colors">
                {link}
              </a>
            ))}
          </div>

          {/* Auth Actions */}
          <div className="flex items-center gap-4">
            <a href="#" className="hidden sm:block font-outfit text-xs uppercase tracking-[0.2em] font-medium hover:text-[#C4A484] transition-colors">
              Sign In
            </a>
            <button className="bg-[#1A1A1A] text-[#FAF9F7] hover:bg-[#C4A484] font-outfit text-[11px] font-medium tracking-[0.2em] uppercase px-6 py-3 transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="pt-40 pb-20 px-6 sm:px-12 max-w-[1400px] mx-auto text-center relative overflow-hidden">
        
        {/* Decorative Background Elements */}
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-[#C4A484]/10 rounded-full blur-[80px] -z-10" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-[#C4A484]/5 rounded-full blur-[100px] -z-10" />

        <div className="inline-flex items-center gap-2 px-4 py-2 border border-[#C4A484]/30 rounded-full mb-8 bg-white/50 backdrop-blur-sm animate-fade-in-up">
          <Sparkles className="w-4 h-4 text-[#C4A484]" />
          <span className="font-outfit text-[10px] uppercase tracking-[0.2em] font-medium text-[#1A1A1A]/70">The New Standard for Portfolios</span>
        </div>

        <h1 className="font-cormorant text-[clamp(48px,8vw,96px)] leading-[1.05] font-light tracking-tight mb-8 max-w-5xl mx-auto">
          Your image, <span className="italic text-[#C4A484]">refined.</span> <br className="hidden md:block"/> Elevate your digital presence.
        </h1>

        <p className="font-outfit text-[clamp(16px,2vw,20px)] leading-[1.8] font-light text-[#1A1A1A]/70 max-w-2xl mx-auto mb-12">
          Step into a portfolio platform designed for the modern aesthetic. Present your composite cards with elegance, attract top agencies, and secure your next booking with a flawless digital identity.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="w-full sm:w-auto bg-[#1A1A1A] text-[#FAF9F7] hover:bg-[#C4A484] hover:scale-105 font-outfit text-[13px] font-medium tracking-[0.2em] uppercase px-12 py-5 transition-all duration-300 shadow-[0_10px_40px_rgba(26,26,26,0.2)]">
            Create Portfolio
          </button>
          <button className="w-full sm:w-auto bg-transparent text-[#1A1A1A] border-border-[#1A1A1A]/20 border hover:border-[#C4A484] hover:text-[#C4A484] font-outfit text-[13px] font-medium tracking-[0.2em] uppercase px-12 py-5 transition-all duration-300 flex items-center justify-center gap-3">
            <Camera className="w-4 h-4" /> View Examples
          </button>
        </div>

        <div className="mt-16 flex items-center justify-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          <span className="font-outfit text-xs uppercase tracking-widest font-medium">Trusted by industry professionals:</span>
          <div className="flex gap-6 items-center">
            {/* Fake logos */}
            <span className="font-cormorant italic text-xl font-bold">VOGUE</span>
            <span className="font-outfit font-black tracking-tighter text-2xl">ELLE</span>
            <span className="font-cormorant text-2xl tracking-[0.3em]">GQ</span>
          </div>
        </div>
      </section>

      {/* --- PRICING SECTION --- */}
      <section className="py-24 px-6 sm:px-12 bg-white relative">
        <div className="max-w-[1400px] mx-auto">
          
          {/* Section Header */}
          <div className="mb-20 text-center max-w-3xl mx-auto">
            <span className="font-outfit text-[11px] uppercase tracking-[0.2em] text-[#C4A484] font-medium">01 // Subscription Plans</span>
            <h2 className="font-cormorant text-[clamp(36px,5vw,56px)] font-light leading-[1.15] mt-4 mb-6">
              Invest in your career.
            </h2>
            <p className="font-outfit text-base font-light text-[#1A1A1A]/70">
              Select a tier that aligns with your professional journey. Upgrade seamlessly as your portfolio expands.
            </p>
          </div>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center mb-16 gap-4">
            <span className={`font-outfit text-xs uppercase tracking-widest font-medium transition-colors ${!isAnnual ? 'text-[#1A1A1A]' : 'text-[#1A1A1A]/40'}`}>Pay Monthly</span>
            <button 
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative w-14 h-8 bg-[#1A1A1A] rounded-full p-1 transition-colors"
            >
              <div 
                className={`w-6 h-6 bg-[#C4A484] rounded-full transition-transform duration-300 shadow-sm ${isAnnual ? 'translate-x-6' : 'translate-x-0'}`}
              />
            </button>
            <div className="flex items-center gap-2">
              <span className={`font-outfit text-xs uppercase tracking-widest font-medium transition-colors ${isAnnual ? 'text-[#1A1A1A]' : 'text-[#1A1A1A]/40'}`}>Pay Annually</span>
              <span className="bg-[#C4A484]/20 text-[#C4A484] text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider animate-pulse">Save 20%</span>
            </div>
          </div>

          {/* Pricing Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, i) => (
              <div 
                key={plan.name}
                className={`
                  relative p-10 flex flex-col transition-all duration-500 hover:-translate-y-2
                  ${plan.popular ? 'border-[#C4A484] border-2 shadow-[0_20px_60px_rgba(196,164,132,0.15)] scale-100 md:scale-105 z-10' : 'border border-[#1A1A1A]/10 hover:shadow-[0_20px_60px_rgba(0,0,0,0.06)] scale-100'}
                `}
                style={{ backgroundColor: plan.bg, color: plan.color }}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#C4A484] text-[#1A1A1A] px-4 py-1 flex items-center gap-2 shadow-lg">
                    <Star className="w-3 h-3 fill-current" />
                    <span className="font-outfit text-[10px] uppercase tracking-widest font-bold">Most Popular</span>
                  </div>
                )}

                {/* Card Header */}
                <div className="mb-8 border-b border-current/10 pb-8">
                  <h3 className="font-cormorant text-4xl mb-2">{plan.name}</h3>
                  <p className="font-outfit text-sm font-light opacity-70 min-h-[40px]">
                    {plan.description}
                  </p>
                  <div className="mt-6 flex items-baseline gap-2">
                    <span className="font-outfit text-5xl font-light tracking-tighter">
                      {isAnnual ? plan.annualPrice : plan.monthlyPrice}
                    </span>
                    {plan.monthlyPrice !== "$0" && (
                      <span className="font-outfit text-xs uppercase tracking-widest opacity-50">/ month</span>
                    )}
                  </div>
                  {isAnnual && plan.monthlyPrice !== "$0" && (
                    <p className="font-outfit text-[11px] text-[#C4A484] mt-2 uppercase tracking-wide">Billed annually</p>
                  )}
                </div>

                {/* Card Features */}
                <div className="flex-1">
                  <p className="font-outfit text-[11px] uppercase tracking-widest font-medium opacity-50 mb-6">What's included</p>
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#C4A484] shrink-0" />
                        <span className="font-outfit text-[15px] font-light leading-snug">{feature}</span>
                      </li>
                    ))}
                    {plan.notIncluded.map((feature, idx) => (
                      <li key={`not-${idx}`} className="flex items-start gap-3 opacity-30">
                        <Zap className="w-5 h-5 shrink-0 line-through" />
                        <span className="font-outfit text-[15px] font-light leading-snug line-through">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card CTA */}
                <button 
                  className={`
                    w-full py-5 font-outfit text-[11px] font-medium tracking-[0.2em] uppercase transition-all duration-300 flex justify-center items-center gap-2 group
                    ${plan.popular ? 'bg-[#C4A484] text-[#1A1A1A] hover:bg-white' : 'bg-transparent border border-current hover:bg-current hover:text-[#FAF9F7]'}
                  `}
                >
                  {plan.cta} 
                  <ArrowRight className={`w-4 h-4 transition-transform duration-300 group-hover:translate-x-2 ${plan.popular ? '' : 'group-hover:text-white'}`} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FEATURE HIGHLIGHTS TO BUILD TRUST --- */}
      <section className="py-24 px-6 sm:px-12 max-w-[1400px] mx-auto border-t border-[#1A1A1A]/5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            {
              icon: <Eye className="w-8 h-8 text-[#C4A484] mb-6" />,
              title: "Intelligent Curation",
              desc: "Ensure your best work is always front and center. Our tools help you arrange your portfolio for maximum impact with casting directors."
            },
            {
              icon: <Palette className="w-8 h-8 text-[#C4A484] mb-6" />,
              title: "Editorial Aesthetic",
              desc: "Impeccable typography and minimalist layouts inspired by high-fashion editorial design create a premium viewing experience."
            },
            {
              icon: <Shield className="w-8 h-8 text-[#C4A484] mb-6" />,
              title: "Secure Sharing Protocol",
              desc: "Share targeted portfolios with exclusive agencies using password protection and precise access controls. Your image remains yours."
            }
          ].map((feat, i) => (
            <div key={i} className="group cursor-default">
              {feat.icon}
              <h4 className="font-cormorant text-2xl mb-4 group-hover:text-[#C4A484] transition-colors">{feat.title}</h4>
              <p className="font-outfit text-[15px] font-light leading-[1.7] text-[#1A1A1A]/70">
                {feat.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-[#1A1A1A] text-[#FAF9F7] py-20 px-6 sm:px-12 border-t-4 border-[#C4A484]">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-12">
          <div className="text-center md:text-left">
            <div className="flex items-center gap-3 justify-center md:justify-start mb-6">
              <div className="p-2 bg-[#C4A484] rounded-full text-[#1A1A1A]">
                <PoseIcon size={24} />
              </div>
              <span className="font-cormorant text-3xl tracking-widest uppercase">Pose & Poise</span>
            </div>
            <p className="font-outfit text-sm font-light opacity-60 max-w-sm">
              The premium digital portfolio platform, empowering creatives to present their best work effortlessly.
            </p>
          </div>
          <div className="flex gap-16 text-center md:text-left font-outfit text-sm">
            <div className="flex flex-col gap-4">
              <span className="uppercase tracking-widest text-[#C4A484] font-medium text-[11px] mb-2">Product</span>
              <a href="#" className="opacity-60 hover:opacity-100 hover:text-[#C4A484] transition-colors">Pricing</a>
              <a href="#" className="opacity-60 hover:opacity-100 hover:text-[#C4A484] transition-colors">Features</a>
              <a href="#" className="opacity-60 hover:opacity-100 hover:text-[#C4A484] transition-colors">Templates</a>
            </div>
            <div className="flex flex-col gap-4">
              <span className="uppercase tracking-widest text-[#C4A484] font-medium text-[11px] mb-2">Legal</span>
              <a href="#" className="opacity-60 hover:opacity-100 hover:text-[#C4A484] transition-colors">Terms of Service</a>
              <a href="#" className="opacity-60 hover:opacity-100 hover:text-[#C4A484] transition-colors">Privacy Policy</a>
            </div>
          </div>
        </div>
        <div className="max-w-[1400px] mx-auto mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-outfit text-xs font-light opacity-40">
            © {new Date().getFullYear()} Pose & Poise Studio. All rights reserved. 
          </p>
          <div className="flex gap-4 opacity-40">
            <span className="font-outfit text-xs">Elevate Your Presence.</span>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default App;
