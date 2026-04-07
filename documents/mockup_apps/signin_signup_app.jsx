import React, { useState } from 'react';
import { 
  Mail, 
  Lock, 
  User, 
  ArrowRight, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  ChevronRight, 
  ArrowLeft 
} from 'lucide-react';

/**
 * POSE & POISE BRAND CONSTANTS
 */
const COLORS = {
  cream: '#FAF9F7',
  charcoal: '#1A1A1A',
  camel: '#C4A484',
  white: '#FFFFFF',
  charcoalSecondary: 'rgba(26, 26, 26, 0.7)',
  charcoalTertiary: 'rgba(26, 26, 26, 0.6)',
  charcoalMuted: 'rgba(26, 26, 26, 0.4)',
  borderLight: 'rgba(26, 26, 26, 0.2)',
};

const PoseLogo = ({ className = "w-12 h-12" }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="13" cy="3" r="1.2" fill="currentColor" stroke="none"></circle>
    <path d="M13 4.5c-1 0-2.5.5-3.5 2s-1 3-1 3"></path>
    <path d="M13 4.5c.8 3 0 7-2 9"></path>
    <path d="M11 13.5c-2 3-5 5-6 9.5h14c-1-5-4-7-6-9.5"></path>
    <path d="M11 15l1 7" opacity="0.3" strokeWidth="0.8"></path>
    <path d="M11 7.5l3.5 1.5-1 4"></path>
  </svg>
);

const GoogleIcon = () => (
  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);

const App = () => {
  // SETTING 'register' AS DEFAULT VIEW
  const [view, setView] = useState('register'); 
  const [regStep, setRegStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState('Deluxe');

  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "Ideal for fresh faces establishing their first digital lookbook.",
      features: ["1 Active Portfolio", "10 High-Res Uploads", "Basic AI Styling", "Community Access"],
      accent: false
    },
    {
      name: "Deluxe",
      price: "$29",
      description: "Advanced tools for the career-driven professional creator.",
      features: ["5 Active Portfolios", "Unlimited Uploads", "Custom Domain AI", "Advanced Post-Processing", "Priority Support"],
      accent: true
    },
    {
      name: "Premiere",
      price: "$59",
      description: "Exclusive editorial power for high-fashion agencies and top talent.",
      features: ["Unlimited Portfolios", "8K Content Hosting", "Dedicated Stylist AI", "White-label Analytics", "Agency Hub Access"],
      accent: false
    }
  ];

  const handleToggleView = () => {
    setView(view === 'signin' ? 'register' : 'signin');
    setRegStep(1);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F7] text-[#1A1A1A] font-['Outfit'] selection:bg-[#C4A484] selection:text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Outfit:wght@300;400;500&display=swap');
        
        .font-cormorant { font-family: 'Cormorant Garamond', serif; }
        .font-outfit { font-family: 'Outfit', sans-serif; }
        
        .btn-primary {
          background: #1A1A1A;
          color: #FAF9F7;
          border: none;
          padding: 18px 48px;
          font-family: 'Outfit', sans-serif;
          font-size: 13px;
          font-weight: 400;
          letter-spacing: 2px;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          border-radius: 0 !important;
        }
        
        .btn-primary:hover {
          background: #C4A484;
          transform: translateY(-2px);
          box-shadow: 0 10px 40px rgba(196, 164, 132, 0.3);
        }

        .input-field {
          background: transparent;
          border: 1px solid rgba(26, 26, 26, 0.2);
          padding: 18px 24px;
          font-family: 'Outfit', sans-serif;
          font-size: 14px;
          width: 100%;
          outline: none;
          transition: all 0.3s ease;
          border-radius: 0 !important;
        }

        .input-field:focus {
          border-color: #C4A484;
          background: rgba(255, 255, 255, 0.5);
        }

        .nav-link {
          font-family: 'Outfit', sans-serif;
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #1A1A1A;
          text-decoration: none;
          transition: color 0.3s ease;
          cursor: pointer;
        }

        .nav-link:hover {
          color: #C4A484;
        }

        .accent-line {
          width: 40px;
          height: 1px;
          background: #C4A484;
          margin: 24px 0;
        }

        .sharp-border {
          border-radius: 0 !important;
        }

        .step-line {
          height: 1px;
          flex-grow: 1;
          background: rgba(26, 26, 26, 0.1);
          position: relative;
        }

        .step-line-active::after {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 100%;
          background: #C4A484;
          transform-origin: left;
          animation: scaleX 0.6s ease forwards;
        }

        @keyframes scaleX {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
      `}</style>

      {/* Navigation */}
      <nav className="p-8 md:p-12 flex justify-between items-center max-w-[1440px] mx-auto">
        <div className="flex items-center gap-6 group cursor-pointer" onClick={() => { setView('signin'); setRegStep(1); }}>
          <div className="text-[#1A1A1A] transition-colors duration-500 group-hover:text-[#C4A484]">
            <PoseLogo className="w-10 h-10" />
          </div>
          <div className="flex flex-col">
            <span className="font-outfit text-[18px] font-light tracking-[4px] uppercase leading-none">Pose & Poise</span>
            <span className="text-[9px] uppercase tracking-[2px] text-[#C4A484] mt-1 font-medium">AI Studio</span>
          </div>
        </div>
        
        <div className="hidden md:flex gap-12 items-center">
          <a href="#" className="nav-link">Editorial</a>
          <a href="#" className="nav-link">Curation</a>
          <button 
            onClick={handleToggleView}
            className="border border-charcoal/20 px-6 py-2 text-[11px] tracking-[2px] uppercase hover:bg-charcoal hover:text-white transition-all duration-300 sharp-border"
          >
            {view === 'signin' ? 'Sign Up' : 'Log In'}
          </button>
        </div>
      </nav>

      <main className="max-w-[1440px] mx-auto px-8 md:px-12 py-8 flex flex-col items-center">
        
        {/* Progress Indicator for Registration */}
        {view === 'register' && (
          <div className="w-full max-w-lg mb-16 flex items-center gap-4">
            <div className={`text-[10px] tracking-[2px] uppercase ${regStep === 1 ? 'text-charcoal' : 'text-charcoalMuted'}`}>01 Info</div>
            <div className={`step-line ${regStep >= 2 ? 'step-line-active' : ''}`}></div>
            <div className={`text-[10px] tracking-[2px] uppercase ${regStep === 2 ? 'text-charcoal' : 'text-charcoalMuted'}`}>02 Tier</div>
          </div>
        )}

        <div className="w-full transition-all duration-500 ease-in-out flex flex-col items-center">
          
          {/* STEP 1: Account Info (Register) OR Sign In */}
          {(view === 'signin' || (view === 'register' && regStep === 1)) && (
            <section className="w-full max-w-xl animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="mb-14 text-center md:text-left">
                <span className="font-outfit text-[12px] font-normal tracking-[4px] uppercase text-[#C4A484]">
                  {view === 'signin' ? 'Member Portal' : 'Phase One'}
                </span>
                <h1 className="font-cormorant text-[56px] md:text-[72px] font-light leading-[1.05] mt-6 mb-2">
                  {view === 'signin' ? 'Return to the collective' : 'Establish your digital identity'}
                </h1>
                <div className="accent-line mx-auto md:mx-0"></div>
              </div>

              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); if(view === 'register') setRegStep(2); }}>
                {view === 'register' && (
                  <div className="space-y-2">
                    <label className="text-[11px] uppercase tracking-[2px] font-medium text-charcoalTertiary">Studio Username</label>
                    <div className="relative">
                      <span className="absolute left-6 top-1/2 -translate-y-1/2 text-charcoalMuted">
                        <User size={18} strokeWidth={1} />
                      </span>
                      <input type="text" placeholder="e.g. creative_collective" className="input-field pl-16" />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-[11px] uppercase tracking-[2px] font-medium text-charcoalTertiary">Email Address</label>
                  <div className="relative">
                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-charcoalMuted">
                      <Mail size={18} strokeWidth={1} />
                    </span>
                    <input type="email" placeholder="name@studio.com" className="input-field pl-16" />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-[11px] uppercase tracking-[2px] font-medium text-charcoalTertiary">Password</label>
                    {view === 'signin' && (
                      <button className="text-[10px] uppercase tracking-[1px] text-charcoalMuted hover:text-camel transition-colors">Recovery</button>
                    )}
                  </div>
                  <div className="relative">
                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-charcoalMuted">
                      <Lock size={18} strokeWidth={1} />
                    </span>
                    <input type="password" placeholder="••••••••" className="input-field pl-16" />
                  </div>
                </div>

                <button className="btn-primary w-full flex items-center justify-center gap-3 mt-4">
                  {view === 'signin' ? 'Open Studio' : 'Continue to Tier Selection'}
                  <ArrowRight size={16} />
                </button>

                <div className="flex items-center gap-4 py-4">
                  <div className="h-[1px] bg-charcoalMuted opacity-20 flex-1"></div>
                  <span className="text-[10px] uppercase tracking-[2px] text-charcoalMuted">Social Link</span>
                  <div className="h-[1px] bg-charcoalMuted opacity-20 flex-1"></div>
                </div>

                <button className="w-full bg-white border border-charcoalMuted/20 py-[18px] flex items-center justify-center text-[12px] uppercase tracking-[2px] hover:bg-cream transition-all sharp-border">
                  <GoogleIcon />
                  Continue with Google
                </button>

                <p className="text-center text-charcoalTertiary text-[14px] pt-12">
                  {view === 'signin' ? "First time here?" : "Joined us before?"}{' '}
                  <button 
                    onClick={handleToggleView}
                    className="text-charcoal font-medium underline underline-offset-4 hover:text-[#C4A484] transition-colors"
                  >
                    {view === 'signin' ? 'Create a Studio' : 'Sign In Instead'}
                  </button>
                </p>
              </form>
            </section>
          )}

          {/* STEP 2: Tier Selection (Only for Register) */}
          {view === 'register' && regStep === 2 && (
            <section className="w-full animate-in fade-in slide-in-from-right-10 duration-700">
              <div className="mb-14 text-center">
                <button 
                  onClick={() => setRegStep(1)}
                  className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[2px] text-charcoalMuted hover:text-charcoal mb-8 transition-colors"
                >
                  <ArrowLeft size={14} /> Back to Details
                </button>
                <span className="font-outfit text-[12px] font-normal tracking-[4px] uppercase text-[#C4A484] block">Phase Two</span>
                <h2 className="font-cormorant text-[56px] font-light leading-[1.1] mt-6">Select your membership</h2>
              </div>

              <div className="grid md:grid-cols-3 gap-8 max-w-[1200px] mx-auto">
                {plans.map((plan) => (
                  <div 
                    key={plan.name} 
                    onClick={() => setSelectedPlan(plan.name)}
                    className={`group relative p-12 border transition-all duration-500 cursor-pointer flex flex-col h-full bg-white sharp-border
                      ${selectedPlan === plan.name 
                        ? 'border-[#C4A484] shadow-[0_30px_70px_rgba(196,164,132,0.12)] scale-[1.02]' 
                        : 'border-charcoal/5 hover:border-[#C4A484]/20'
                      }`}
                  >
                    {plan.accent && (
                      <div className="absolute top-0 right-0 bg-[#C4A484] text-white px-5 py-1.5 text-[9px] uppercase tracking-[3px]">
                        Featured
                      </div>
                    )}
                    
                    <div className="flex justify-between items-start mb-10">
                      <h3 className="text-[12px] uppercase tracking-[4px] font-semibold">{plan.name}</h3>
                      {plan.accent && <Sparkles size={18} className="text-[#C4A484]" />}
                    </div>
                    
                    <div className="mb-8">
                      <span className="font-cormorant text-[64px] font-light leading-none">{plan.price}</span>
                      <span className="text-[14px] text-charcoalTertiary font-light ml-3">per month</span>
                    </div>

                    <p className="text-[15px] leading-[1.8] text-charcoalSecondary mb-10 font-light">
                      {plan.description}
                    </p>

                    <ul className="space-y-5 mb-14 flex-grow border-t border-charcoal/5 pt-10">
                      {plan.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-4 text-[13px] text-charcoalSecondary font-light">
                          <Check size={14} className="text-[#C4A484] mt-1 shrink-0" strokeWidth={2} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <button 
                      className={`w-full py-5 text-[11px] uppercase tracking-[3px] transition-all duration-400 border sharp-border
                        ${selectedPlan === plan.name 
                          ? 'bg-[#1A1A1A] text-white border-charcoal' 
                          : 'bg-transparent text-charcoal border-charcoal/10 group-hover:border-charcoal'
                        }`}
                    >
                      {selectedPlan === plan.name ? 'Tier Selected' : 'Choose Membership'}
                    </button>
                  </div>
                ))}
              </div>

              {/* Secure Transaction Footer */}
              <div className="mt-20 max-w-[1200px] mx-auto p-12 bg-white border border-charcoal/5 flex flex-col md:flex-row justify-between items-center gap-12 sharp-border">
                <div className="flex gap-10">
                  <div className="w-16 h-16 border border-[#C4A484]/20 flex items-center justify-center bg-[#FAF9F7] sharp-border shrink-0">
                    <ShieldCheck size={32} className="text-[#C4A484]" strokeWidth={1} />
                  </div>
                  <div>
                    <h4 className="text-[14px] uppercase tracking-[2px] font-semibold mb-2">Encrypted Checkout</h4>
                    <p className="text-[13px] text-charcoalTertiary font-light max-w-sm leading-relaxed">
                      Transactions are finalized via Stripe® editorial grade security protocols. Membership starts immediately.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-12 w-full md:w-auto pt-8 md:pt-0 border-t md:border-t-0 border-charcoal/5">
                   <div className="text-right">
                      <p className="text-[10px] uppercase tracking-[2px] text-charcoalMuted mb-2">Final Summary</p>
                      <p className="text-[28px] font-light font-outfit">
                        {plans.find(p => p.name === selectedPlan)?.price}.00
                      </p>
                   </div>
                   <button className="h-20 w-56 btn-primary flex items-center justify-center gap-4 transition-all duration-500">
                     <span>Complete</span>
                     <ChevronRight size={20} />
                   </button>
                </div>
              </div>
            </section>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-32 border-t border-charcoal/5 pt-20 pb-16 px-8 md:px-12 bg-white">
        <div className="max-w-[1440px] mx-auto grid md:grid-cols-4 gap-16 mb-20">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-4 mb-8">
               <PoseLogo className="w-10 h-10" />
               <span className="font-outfit text-[18px] font-light tracking-[4px] uppercase">Pose & Poise</span>
            </div>
            <p className="text-charcoalTertiary text-[15px] max-w-sm leading-relaxed font-light">
              Crafting high-impact digital presence through minimalist AI curation. Join the worldwide collective of elite creative talent.
            </p>
          </div>
          <div className="flex flex-col gap-6">
             <span className="text-[11px] uppercase tracking-[3px] font-semibold">Studio</span>
             <a href="#" className="nav-link text-[12px] lowercase tracking-normal font-light">Portfolios</a>
             <a href="#" className="nav-link text-[12px] lowercase tracking-normal font-light">AI Tools</a>
             <a href="#" className="nav-link text-[12px] lowercase tracking-normal font-light">Support</a>
          </div>
          <div className="flex flex-col gap-6">
             <span className="text-[11px] uppercase tracking-[3px] font-semibold">Legal</span>
             <a href="#" className="nav-link text-[12px] lowercase tracking-normal font-light">Privacy</a>
             <a href="#" className="nav-link text-[12px] lowercase tracking-normal font-light">Terms</a>
             <a href="#" className="nav-link text-[12px] lowercase tracking-normal font-light">Licensing</a>
          </div>
        </div>
        <div className="max-w-[1440px] mx-auto pt-12 border-t border-charcoal/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[10px] uppercase tracking-[4px] text-charcoalMuted">© 2026 Pose & Poise Studio / Paris / London / Tokyo</p>
          <div className="flex gap-12">
            <a href="#" className="nav-link text-[10px]">Instagram</a>
            <a href="#" className="nav-link text-[10px]">TikTok</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;