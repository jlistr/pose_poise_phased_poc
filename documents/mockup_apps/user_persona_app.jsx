import React, { useState, useRef, useEffect } from 'react';
import { 
  User, 
  Briefcase, 
  Target, 
  AlertCircle, 
  Zap, 
  Download, 
  ChevronRight, 
  Camera, 
  Star, 
  Users, 
  Smartphone, 
  Globe,
  FileText,
  ImageIcon
} from 'lucide-react';

// Load external libraries for export functionality
const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = resolve;
    document.head.appendChild(script);
  });
};

const personas = [
  {
    id: 1,
    title: "The Aspiring/Freelance Model",
    name: "Jana Lister",
    role: "New Entry / Freelancer",
    color: "bg-orange-50",
    borderColor: "border-orange-200",
    accentColor: "text-orange-600",
    icon: <User className="w-6 h-6" />,
    background: "Just starting out in the modeling industry or doing freelance commercial work.",
    goal: "Needs a clean, digital 'composite card' to share physical stats and basic headshots with local photographers or open casting calls.",
    painPoints: "Limited budget, doesn't know how to code a website, just needs the 'essential requirements'.",
    appBehavior: "Will use the free tier because they are cost-conscious. They will use the default Pose & Poise domain (e.g., poseandpoise.com/janalister) rather than buying their own.",
    tags: ["Free Tier", "Cost-Conscious", "Essential Features"]
  },
  {
    id: 2,
    title: "The Established Freelancer",
    name: "Chloe Davis",
    role: "Full-time Independent",
    color: "bg-emerald-50",
    borderColor: "border-emerald-200",
    accentColor: "text-emerald-600",
    icon: <Briefcase className="w-6 h-6" />,
    background: "Has a solid portfolio of freelance work and regular clients, but operates independently without major agency representation. Treats modeling as a primary source of income.",
    goal: "Wants to achieve a flawless, professional aesthetic in the least amount of time possible. Wants to leverage advanced features like AI curation.",
    painPoints: "Time-poor and stretched thin. No agency to handle admin. Gets frustrated by tedious updates but needs to look agency-represented.",
    appBehavior: "Will invest in a paid subscription (Middle/Top plan). Likely pays for own domain to look legitimate to direct clients and relies on Web Portfolio features.",
    tags: ["Paid Subscription", "Custom Domain", "AI Curation"]
  },
  {
    id: 3,
    title: "The Established Agency Model",
    name: "Marcus Thorne",
    role: "Signed Professional",
    color: "bg-blue-50",
    borderColor: "border-blue-200",
    accentColor: "text-blue-600",
    icon: <Star className="w-6 h-6" />,
    background: "Represented by a major agency and regularly books high-end campaigns.",
    goal: "Needs a flawless, professional web portfolio with 'AI curation' to maintain a premium personal brand.",
    painPoints: "Needs to stand out to top-tier casting directors; needs to seamlessly link portfolio to social media and agency profile.",
    appBehavior: "Will gladly pay the annual price to use 'Bring your own domain' because owning their professional identity is an investment.",
    tags: ["Premium Brand", "Agency Represented", "Annual Plan"]
  },
  {
    id: 4,
    title: "The Casting Director / Booker",
    name: "Rachel Smith",
    role: "Industry Decision Maker",
    color: "bg-purple-50",
    borderColor: "border-purple-200",
    accentColor: "text-purple-600",
    icon: <Target className="w-6 h-6" />,
    background: "Works at a casting agency or production company. Looks through hundreds of portfolios a day.",
    goal: "Needs to assess a model's look, range, and physical stats as quickly as possible without clunky menus or heavy images.",
    painPoints: "Hates disorganized portfolios, missing measurements, and websites not optimized for mobile sets.",
    appBehavior: "Interacts with published URLs or downloaded cards. Requires the UI to be intuitive, fast-loading, and strictly professional.",
    tags: ["Viewer Only", "Mobile Critical", "Efficiency First"]
  },
  {
    id: 5,
    title: "The Talent Manager / Momager",
    name: "Leo Rodriguez",
    role: "Administrative Lead",
    color: "bg-rose-50",
    borderColor: "border-rose-200",
    accentColor: "text-rose-600",
    icon: <Users className="w-6 h-6" />,
    background: "Handles administrative and booking for talent (often youth or teen models).",
    goal: "Needs to easily update physical stats for growing teens, swap test shoots, and manage multiple digital presences efficiently.",
    painPoints: "Keeping track of multiple logins, constantly updating rapidly changing measurements across several profiles.",
    appBehavior: "Will look for multi-profile management features. Likely to pay for a premium tier that allows managing several custom domains under one master account.",
    tags: ["Multi-Profile", "Data Management", "Admin Power User"]
  },
  {
    id: 6,
    title: "The Fashion Influencer",
    name: "Sasha V",
    role: "Digital Content Creator",
    color: "bg-pink-50",
    borderColor: "border-pink-200",
    accentColor: "text-pink-600",
    icon: <Smartphone className="w-6 h-6" />,
    background: "Makes a living through Instagram/TikTok. Partners with clothing brands for sponsored posts.",
    goal: "Needs a polished 'Media Kit' or landing page to send to PR agencies and brands to share clothing sizes for PR packages.",
    painPoints: "Traditional link-in-bio tools don't have built-in architecture for physical stats or high-res modeling digitals.",
    appBehavior: "Heavily utilizes 'link in bio' aspects. Likely to pay for custom domain and premium features with deep social media integration.",
    tags: ["Media Kit", "Link-in-Bio", "PR Ready"]
  },
  {
    id: 7,
    title: "The Industry Creative",
    name: "Samira Khan",
    role: "Photographer / Stylist",
    color: "bg-slate-50",
    borderColor: "border-slate-200",
    accentColor: "text-slate-600",
    icon: <Camera className="w-6 h-6" />,
    background: "Service provider (Photographer/MUA/Stylist) behind the camera conceptualizing campaigns.",
    goal: "Needs a hyper-minimalist, visually stunning portfolio organized by project.",
    painPoints: "Traditional builders are too bloated. Wants a 'plug-and-play' portfolio that looks like a high-end fashion magazine.",
    appBehavior: "Ignores 'Composite Card' stats. Solely uses 'Web Portfolio' deployment. Subscribes to Top-Tier for maximum resolution and zero branding.",
    tags: ["Minimalist", "High-Res", "Project Based"]
  }
];

const journeys = [
  {
    id: 1,
    title: "Onboarding & Free Comp Card Creation",
    personaIds: [1],
    icon: <User className="w-6 h-6" />,
    color: "bg-orange-50",
    accentColor: "text-orange-600",
    description: "The initial path a cost-conscious model takes to get a basic digital presence online.",
    steps: [
      "Lands on marketing website, clicks 'Create Free Comp Card'.",
      "Creates account via Email or Google Auth.",
      "Completes essential onboarding (Name, basic physical stats).",
      "Uploads 4-6 high-quality digitals to the Asset Library.",
      "Publishes the free-tier public link (poseandpoise.com/username)."
    ]
  },
  {
    id: 2,
    title: "Premium Portfolio Setup & Custom Domain",
    personaIds: [2, 3], 
    icon: <Briefcase className="w-6 h-6" />,
    color: "bg-emerald-50",
    accentColor: "text-emerald-600",
    description: "An established professional upgrading their account to unlock advanced brand-building features.",
    steps: [
      "Selects 'Upgrade to Pro' from the dashboard.",
      "Completes Stripe checkout for the monthly/annual subscription.",
      "Navigates to Settings > Domains and connects a custom URL.",
      "Uses AI Curation tool to automatically select the best portfolio images.",
      "Customizes the Web Portfolio theme to match their personal brand."
    ]
  },
  {
    id: 3,
    title: "Multi-Profile Agency Management",
    personaIds: [5], 
    icon: <Users className="w-6 h-6" />,
    color: "bg-rose-50",
    accentColor: "text-rose-600",
    description: "A manager or agency admin administering multiple talent profiles from a single master account.",
    steps: [
      "Logs in as an Agency Administrator.",
      "Clicks 'Add New Talent' from the master dashboard.",
      "Enters stats and headshots for the new model.",
      "Switches seamlessly between different talent profiles without re-authenticating.",
      "Generates and emails PDF comp cards to casting directors in bulk."
    ]
  },
  {
    id: 4,
    title: "Casting Director Review & Download",
    personaIds: [4, 7], 
    icon: <Target className="w-6 h-6" />,
    color: "bg-purple-50",
    accentColor: "text-purple-600",
    description: "An industry professional reviewing a talent's link for an upcoming project or campaign.",
    steps: [
      "Receives the model's public URL via email or social media.",
      "Opens the link on mobile while on a shoot set.",
      "Quickly scans 'Physical Stats' and scrolls through the high-res gallery.",
      "Clicks 'Download Comp Card' to save a PDF version for their files.",
      "Clicks 'Contact' to send a direct booking inquiry."
    ]
  }
];

const App = () => {
  const [viewMode, setViewMode] = useState('personas'); // 'personas' or 'journeys'
  const [selectedPersonaId, setSelectedPersonaId] = useState(1);
  const [selectedJourneyId, setSelectedJourneyId] = useState(1);
  const [exporting, setExporting] = useState(false);
  const profileRef = useRef(null);
  
  const currentPersona = personas.find(p => p.id === selectedPersonaId);
  const currentJourney = journeys.find(j => j.id === selectedJourneyId);

  useEffect(() => {
    // Pre-load export scripts
    loadScript('https://cdnjs.cloudflare.com/ajax/libs/html-to-image/1.11.11/html-to-image.min.js');
    loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js');
  }, []);

  const handleDownloadImage = async () => {
    if (!window.htmlToImage || !profileRef.current) return;
    setExporting(true);
    try {
      const dataUrl = await window.htmlToImage.toPng(profileRef.current, {
        backgroundColor: '#ffffff',
        pixelRatio: 2
      });
      const link = document.createElement('a');
      const filename = viewMode === 'personas' 
        ? `Persona_${currentPersona.name.replace(/\s+/g, '_')}` 
        : `Journey_${currentJourney.title.replace(/\s+/g, '_')}`;
      link.download = `PosePoise_${filename}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Export failed', err);
    } finally {
      setExporting(false);
    }
  };

  const handleDownloadPDF = async () => {
    if (!window.htmlToImage || !window.jspdf || !profileRef.current) return;
    setExporting(true);
    try {
      const { jsPDF } = window.jspdf;
      const canvas = await window.htmlToImage.toCanvas(profileRef.current, {
        pixelRatio: 2
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      const filename = viewMode === 'personas' 
        ? `Persona_${currentPersona.name.replace(/\s+/g, '_')}` 
        : `Journey_${currentJourney.title.replace(/\s+/g, '_')}`;
      pdf.save(`PosePoise_${filename}.pdf`);
    } catch (err) {
      console.error('PDF export failed', err);
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8 font-sans text-slate-900">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Sidebar Selector */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center text-white font-bold">P</div>
              <div>
                <h1 className="text-xl font-bold tracking-tight">Pose & Poise</h1>
                <p className="text-xs text-slate-500 uppercase font-semibold">User Personas</p>
              </div>
            </div>
            
            <div className="flex bg-slate-100 p-1 rounded-xl mb-6">
              <button 
                onClick={() => setViewMode('personas')}
                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${viewMode === 'personas' ? 'bg-white shadow-sm text-slate-900 border border-slate-200' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Personas
              </button>
              <button 
                onClick={() => setViewMode('journeys')}
                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${viewMode === 'journeys' ? 'bg-white shadow-sm text-slate-900 border border-slate-200' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Journeys
              </button>
            </div>

            <nav className="space-y-2">
              {viewMode === 'personas' ? personas.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedPersonaId(p.id)}
                  className={`w-full text-left p-4 rounded-xl transition-all flex items-center justify-between group ${
                    selectedPersonaId === p.id 
                    ? 'bg-slate-900 text-white shadow-lg shadow-slate-200' 
                    : 'bg-white text-slate-600 hover:bg-slate-50 border border-transparent hover:border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${selectedPersonaId === p.id ? 'bg-white/10' : 'bg-slate-100'}`}>
                      {React.cloneElement(p.icon, { className: `w-5 h-5 ${selectedPersonaId === p.id ? 'text-white' : p.accentColor}` })}
                    </div>
                    <div>
                      <p className="text-sm font-bold leading-none mb-1">{p.title}</p>
                      <p className={`text-xs ${selectedPersonaId === p.id ? 'text-slate-400' : 'text-slate-400'}`}>{p.role}</p>
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 transition-transform ${selectedPersonaId === p.id ? 'translate-x-1' : 'opacity-0 group-hover:opacity-100'}`} />
                </button>
              )) : journeys.map((j) => (
                <button
                  key={j.id}
                  onClick={() => setSelectedJourneyId(j.id)}
                  className={`w-full text-left p-4 rounded-xl transition-all flex items-center justify-between group ${
                    selectedJourneyId === j.id 
                    ? 'bg-slate-900 text-white shadow-lg shadow-slate-200' 
                    : 'bg-white text-slate-600 hover:bg-slate-50 border border-transparent hover:border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${selectedJourneyId === j.id ? 'bg-white/10' : 'bg-slate-100'}`}>
                      {React.cloneElement(j.icon, { className: `w-5 h-5 ${selectedJourneyId === j.id ? 'text-white' : j.accentColor}` })}
                    </div>
                    <div>
                      <p className="text-sm font-bold leading-none mb-1">{j.title}</p>
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 transition-transform ${selectedJourneyId === j.id ? 'translate-x-1' : 'opacity-0 group-hover:opacity-100'}`} />
                </button>
              ))}
            </nav>
          </div>

          {/* Export Actions */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="text-sm font-bold uppercase text-slate-400 mb-4">Export Tools</h3>
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={handleDownloadImage}
                disabled={exporting}
                className="flex flex-col items-center justify-center gap-2 p-4 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors text-slate-700 disabled:opacity-50"
              >
                <ImageIcon className="w-6 h-6" />
                <span className="text-xs font-bold">PNG Image</span>
              </button>
              <button 
                onClick={handleDownloadPDF}
                disabled={exporting}
                className="flex flex-col items-center justify-center gap-2 p-4 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors text-slate-700 disabled:opacity-50"
              >
                <FileText className="w-6 h-6" />
                <span className="text-xs font-bold">PDF Doc</span>
              </button>
            </div>
            {exporting && (
              <p className="text-center text-xs mt-3 text-blue-600 animate-pulse font-medium">Processing export...</p>
            )}
          </div>
        </div>

        {/* Profile View Area */}
        <div className="lg:col-span-8">
          <div 
            ref={profileRef}
            className={`bg-white rounded-3xl shadow-xl overflow-hidden border-t-8 border-slate-900 transition-all duration-500`}
          >
            {viewMode === 'personas' ? (
              <>
                {/* Header / Intro */}
                <div className="p-8 md:p-12 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${currentPersona.color} ${currentPersona.accentColor}`}>
                        Persona Profile #{currentPersona.id}
                      </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-1">{currentPersona.title}</h2>
                    <div className="flex items-center gap-3">
                      <p className="text-xl text-slate-500 font-medium">{currentPersona.name}</p>
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                      <p className="text-lg text-slate-400 font-normal">{currentPersona.role}</p>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                     <div className={`w-24 h-24 md:w-32 md:h-32 rounded-3xl flex items-center justify-center border-4 border-white shadow-xl ${currentPersona.color} ${currentPersona.accentColor}`}>
                       {React.cloneElement(currentPersona.icon, { className: "w-12 h-12 md:w-16 md:h-16" })}
                     </div>
                  </div>
                </div>

                {/* Grid Content */}
                <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-10">
                  {/* Background */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-slate-400">
                      <Briefcase className="w-4 h-4" />
                      <h4 className="text-xs font-bold uppercase tracking-widest">Background</h4>
                    </div>
                    <p className="text-slate-700 leading-relaxed font-medium">
                      {currentPersona.background}
                    </p>
                  </div>

                  {/* Goal */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-slate-400">
                      <Target className="w-4 h-4" />
                      <h4 className="text-xs font-bold uppercase tracking-widest">Core Goal</h4>
                    </div>
                    <p className="text-slate-700 leading-relaxed font-medium">
                      {currentPersona.goal}
                    </p>
                  </div>

                  {/* Pain Points */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-slate-400">
                      <AlertCircle className="w-4 h-4" />
                      <h4 className="text-xs font-bold uppercase tracking-widest text-rose-500">Pain Points</h4>
                    </div>
                    <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl">
                      <p className="text-rose-900 leading-relaxed text-sm font-bold italic">
                        "{currentPersona.painPoints}"
                      </p>
                    </div>
                  </div>

                  {/* App Behavior */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-slate-400">
                      <Zap className="w-4 h-4" />
                      <h4 className="text-xs font-bold uppercase tracking-widest text-blue-600">Product Interaction</h4>
                    </div>
                    <p className="text-slate-700 leading-relaxed font-medium">
                      {currentPersona.appBehavior}
                    </p>
                  </div>
                </div>

                {/* Tags / Metadata */}
                <div className="px-8 md:px-12 py-6 bg-slate-50 border-t border-slate-100 flex flex-wrap items-center gap-3">
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-tighter mr-2">Target Keywords:</span>
                  {currentPersona.tags.map((tag, idx) => (
                    <span key={idx} className="bg-white border border-slate-200 text-slate-600 px-3 py-1 rounded-lg text-xs font-bold shadow-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </>
            ) : (
              <>
                {/* Header / Intro */}
                <div className="p-8 md:p-12 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${currentJourney.color} ${currentJourney.accentColor}`}>
                        User Journey #{currentJourney.id}
                      </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-2">{currentJourney.title}</h2>
                    <p className="text-lg text-slate-500 font-medium leading-relaxed">{currentJourney.description}</p>
                  </div>
                  <div className="flex-shrink-0">
                     <div className={`w-24 h-24 md:w-32 md:h-32 rounded-3xl flex items-center justify-center border-4 border-white shadow-xl ${currentJourney.color} ${currentJourney.accentColor}`}>
                       {React.cloneElement(currentJourney.icon, { className: "w-12 h-12 md:w-16 md:h-16" })}
                     </div>
                  </div>
                </div>

                {/* Path / Steps Content */}
                <div className="p-8 md:p-12">
                  <div className="flex items-center gap-2 text-slate-400 mb-8">
                    <Zap className="w-5 h-5" />
                    <h4 className="text-sm font-bold uppercase tracking-widest text-slate-900">Step-by-Step Flow</h4>
                  </div>

                  <div className="space-y-8 relative">
                    {/* Timeline line */}
                    <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-slate-200"></div>

                    {currentJourney.steps.map((step, idx) => (
                      <div key={idx} className="relative flex gap-6 items-start">
                        {/* Timeline dot */}
                        <div className={`flex items-center justify-center w-12 h-12 rounded-full border-4 border-white ${currentJourney.color} ${currentJourney.accentColor} font-bold text-lg shadow-sm z-10 shrink-0`}>
                          {idx + 1}
                        </div>
                        
                        {/* Content card */}
                        <div className="flex-1 pt-1.5">
                          <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                            <p className="text-slate-700 font-medium leading-relaxed">{step}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Associated Personas Footer */}
                <div className="px-8 md:px-12 py-6 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center gap-4">
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-tighter shrink-0">Primary Actors:</span>
                  <div className="flex flex-wrap gap-2">
                    {currentJourney.personaIds.map(pid => {
                      const p = personas.find(p => p.id === pid);
                      return p ? (
                        <div key={pid} className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-sm">
                          {React.cloneElement(p.icon, { className: `w-4 h-4 ${p.accentColor}` })}
                          <span className="text-xs font-bold text-slate-700">{p.title}</span>
                        </div>
                      ) : null;
                    })}
                  </div>
                </div>
              </>
            )}

            {/* Footer Branding */}
            <div className="px-8 py-4 bg-slate-900 text-white flex justify-between items-center">
              <span className="text-[10px] font-bold opacity-50 uppercase tracking-widest">Pose & Poise Strategy Document v1.2</span>
              <div className="flex items-center gap-1">
                 <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                 <span className="text-[10px] font-bold uppercase tracking-widest">Proprietary & Confidential</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default App;