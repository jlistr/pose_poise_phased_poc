"use client";
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  ChevronDown, Camera, ExternalLink, Maximize2, Info, 
  LayoutGrid, Layers, ChevronRight, ChevronLeft, LogOut, 
  Palette, Sparkles, Globe, Eye, Zap, Moon, Sun, Type, Droplets, Pipette,
  ArrowUp, Star, GripVertical, X, Music, Mail, ShieldCheck, Trash2, AlertTriangle,
  RefreshCw, Cloud, CloudOff, Check, Box, Tally3,
  Clock, CreditCard, MapPin, FileText, Plus, Minus, Target
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { DragDropProvider } from '@dnd-kit/react';
import { useSortable } from '@dnd-kit/react/sortable';

// Supabase Client
import { createClient } from '@/lib/supabase/client';

// Initial Static Data
interface GalleryItem {
  id: string;
  url: string;
  title: string;
  category: string;
  photoshoot: string;
  date: string;
  isStarred?: boolean;
  colSpan?: number;
  rowSpan?: number;
}

const SEED_IMAGES: GalleryItem[] = [
  { id: "1", url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop', title: 'Editorial Noir', category: 'Editorial', photoshoot: 'Shadow & Light', date: '2023-05-12' },
  { id: "2", url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop', title: 'Street Style', category: 'Urban', photoshoot: 'Downtown Motion', date: '2023-08-22' },
  { id: "3", url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1000&auto=format&fit=crop', title: 'Golden Hour', category: 'Fashion', photoshoot: 'Sunset Series', date: '2024-02-10' },
  { id: "4", url: 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?q=80&w=1000&auto=format&fit=crop', title: 'Vogue Concept', category: 'Editorial', photoshoot: 'Shadow & Light', date: '2023-05-12' },
  { id: "5", url: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1000&auto=format&fit=crop', title: 'Minimalist Portrait', category: 'Beauty', photoshoot: 'Pure Form', date: '2024-01-05' },
  { id: "6", url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop', title: 'Summer Collection', category: 'Commercial', photoshoot: 'Coastal Breeze', date: '2023-07-15' },
  { id: "7", url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop', title: 'Classic Suit', category: 'Classic', photoshoot: 'The Gentleman', date: '2023-11-30' },
  { id: "8", url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1000&auto=format&fit=crop', title: 'Neon Nights', category: 'Avant Garde', photoshoot: 'Cyberpunk Tokyo', date: '2024-04-12' },
  { id: "9", url: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?q=80&w=1000&auto=format&fit=crop', title: 'High Fashion', category: 'Editorial', photoshoot: 'Sunset Series', date: '2024-02-10' },
  { id: "10", url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop', title: 'Urban Jungle', category: 'Streetwear', photoshoot: 'Downtown Motion', date: '2023-08-22' },
  { id: "11", url: 'https://images.unsplash.com/photo-1529139513477-42f56679ac92?q=80&w=1000&auto=format&fit=crop', title: 'Silhouette', category: 'Fine Art', photoshoot: 'Pure Form', date: '2024-01-05' },
  { id: "12", url: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1000&auto=format&fit=crop', title: 'Monochrome', category: 'Commercial', photoshoot: 'The Gentleman', date: '2023-11-30' },
  { id: "13", url: '/hero_vid_neon_nights.mp4', title: 'Neon Action', category: 'Motion', photoshoot: 'Cyberpunk Tokyo', date: '2024-04-13' },
];

const LAYOUTS = { 
  CLASSIC: 'classic',
  MASONRY: 'masonry', 
  BENTO: 'bento', 
  HIERARCHICAL: 'hierarchical' 
};

const VIEW_MODES = { GALLERY: 'gallery', PHOTOSHOOTS: 'photoshoots' };

const FONT_OPTIONS = {
  INTER: "'Inter', sans-serif",
  SERIF: "'Cormorant Garamond', Georgia, serif",
  OUTFIT: "'Outfit', sans-serif",
  PLAYFAIR: "'Playfair Display', serif",
  MONTSERRAT: "'Montserrat', sans-serif",
  SYNE: "'Syne', sans-serif",
  BODONI: "'Bodoni Moda', serif",
  FRAUNCES: "'Fraunces', serif"
};

const WEIGHT_OPTIONS = {
  [FONT_OPTIONS.INTER]: [{ label: 'Regular 400', value: '400', style: 'normal' }, { label: 'Bold 700', value: '700', style: 'normal' }, { label: 'Black 900', value: '900', style: 'normal' }],
  [FONT_OPTIONS.SERIF]: [{ label: 'Light 300', value: '300', style: 'normal' }, { label: 'Regular 400', value: '400', style: 'normal' }, { label: 'SemiBold 600', value: '600', style: 'normal' }],
  [FONT_OPTIONS.OUTFIT]: [{ label: 'Light 300', value: '300', style: 'normal' }, { label: 'Regular 400', value: '400', style: 'normal' }, { label: 'Medium 500', value: '500', style: 'normal' }],
  [FONT_OPTIONS.PLAYFAIR]: [{ label: 'Regular 400', value: '400', style: 'normal' }, { label: 'Bold 700', value: '700', style: 'normal' }, { label: 'Black 900', value: '900', style: 'normal' }],
  [FONT_OPTIONS.MONTSERRAT]: [{ label: 'Regular 400', value: '400', style: 'normal' }, { label: 'SemiBold 600', value: '600', style: 'normal' }, { label: 'Bold 800', value: '800', style: 'normal' }],
  [FONT_OPTIONS.SYNE]: [{ label: 'Regular 400', value: '400', style: 'normal' }, { label: 'Bold 700', value: '700', style: 'normal' }, { label: 'ExtraBold 800', value: '800', style: 'normal' }],
  [FONT_OPTIONS.BODONI]: [{ label: 'Regular 400', value: '400', style: 'normal' }, { label: 'SemiBold 600', value: '600', style: 'normal' }, { label: 'Bold 900', value: '900', style: 'normal' }],
  [FONT_OPTIONS.FRAUNCES]: [{ label: 'Regular 400', value: '400', style: 'normal' }, { label: 'SemiBold 600', value: '600', style: 'normal' }, { label: 'Black 900', value: '900', style: 'normal' }]
};

// Gemini API Helper with Exponential Backoff
const generateWithRetry = async (prompt: string, maxRetries = 5) => {
  const apiKey = ""; 
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
  const payload = {
    contents: [{ parts: [{ text: prompt }] }],
    systemInstruction: { parts: [{ text: "You are an elite high-fashion editorial copywriter and creative director. Keep responses concise, sophisticated, and highly impactful." }] }
  };

  let delay = 1000;
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, delay));
      delay *= 2;
    }
  }
};

// --- Custom Social Icons & Components ---
const CustomIcons = {
  INSTAGRAM: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="5"></rect>
      <circle cx="12" cy="12" r="4"></circle>
      <path d="M17.5 6.5h.01"></path>
    </svg>
  ),
  FACEBOOK: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
    </svg>
  ),
  TIKTOK: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 12a4 4 0 1 0 4 4V2a5 5 0 0 0 5 5v3a8 8 0 0 1-5-3v9"></path>
    </svg>
  ),
  X_TWITTER: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4l6 8m6-8l-12 16m16 0l-6-8"></path>
    </svg>
  ),
  PINTEREST: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="8" x2="12" y2="16"></line>
      <line x1="8" y1="12" x2="16" y2="12"></line>
      <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"></path>
    </svg>
  ),
  YOUTUBE: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.11 1 12 1 12s0 3.89.46 5.58a2.78 2.78 0 0 0 1.94 2c1.72.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.89 23 12 23 12s0-3.89-.46-5.58z"></path>
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"></polygon>
    </svg>
  ),
};

interface Profile {
  instagram?: string;
  facebook?: string;
  tiktok?: string;
  twitter?: string;
  pinterest?: string;
  youtube?: string;
}

const MARIA_PROFILE: Profile = {
  instagram: 'maria_stevens',
  tiktok: 'maria_stevens_official',
  twitter: 'mariastevens',
};

interface SocialIconConfig {
  id: string;
  name: string;
  handle: string;
  svg: React.ReactNode;
  brandColor: string;
  glowColor: string;
  url: string;
}

const CompactInteractiveCard = ({ icon, index, isMounted }: { icon: SocialIconConfig, index: number, isMounted: boolean }) => {
  const [transform, setTransform] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -15;
    const rotateY = ((x - centerX) / centerX) * 15;
    setTransform(`perspective(400px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.1)`);
  };

  const delayStr = isMounted ? '0ms' : `${index * 40}ms`;

  return (
    <a
      href={icon.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setTransform(''); setIsHovered(false); }}
      className={`
        group relative flex items-center justify-center
        w-11 h-11 rounded-[12px] bg-white dark:bg-white/5
        shadow-[0_2px_10px_rgb(0,0,0,0.04)] dark:shadow-[0_2px_10px_rgb(0,0,0,0.2)]
        border border-black/5 dark:border-white/10
        text-neutral-500 dark:text-neutral-400
        transition-all duration-300 ease-out cursor-pointer
        will-change-transform
      `}
      style={{
        opacity: isMounted ? 1 : 0,
        transform: isMounted 
          ? (transform || 'perspective(400px) rotateX(0deg) rotateY(0deg) scale(1)')
          : 'translateY(10px) scale(0.95)',
        transition: transform 
          ? 'transform 0.1s ease-out 0ms' 
          : `transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1) ${delayStr}, opacity 0.4s ease-out ${delayStr}`,
        zIndex: isHovered ? 10 : 1,
        boxShadow: isHovered 
          ? `0 10px 20px -5px ${icon.glowColor}, 0 0 0 1px ${icon.glowColor}` 
          : undefined
      }}
    >
      <motion.div 
        animate={isHovered ? { x: [-1, 1, -1, 1, 0] } : {}}
        transition={{ duration: 0.4, repeat: Infinity }}
        className={`transition-colors duration-300 ${icon.brandColor}`}
      >
        {icon.svg}
      </motion.div>
      
      <div className="absolute -top-10 flex flex-col items-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:-translate-y-1 pointer-events-none">
        <span className="text-[9px] font-bold uppercase tracking-widest text-white whitespace-nowrap bg-black dark:bg-neutral-800 backdrop-blur-sm px-2 py-1 rounded shadow-xl border border-white/10">
          {icon.handle}
        </span>
      </div>
    </a>
  );
};

const CompactSocialCanvas = ({ profile, className = "" }: { profile: Profile, className?: string }) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const getUrl = (platform: string, handle: string) => {
    const cleanHandle = handle.replace('@', '');
    switch(platform) {
      case 'instagram': return `https://instagram.com/${cleanHandle}`;
      case 'tiktok': return `https://tiktok.com/@${cleanHandle}`;
      case 'twitter': return `https://twitter.com/${cleanHandle}`;
      default: return '#';
    }
  };

  const socials: SocialIconConfig[] = [
    { id: 'instagram', name: 'Instagram', handle: `@${profile.instagram}`, svg: CustomIcons.INSTAGRAM, brandColor: 'group-hover:text-pink-500', glowColor: 'rgba(236, 72, 153, 0.2)', url: getUrl('instagram', profile.instagram || '') },
    { id: 'tiktok', name: 'TikTok', handle: `@${profile.tiktok}`, svg: CustomIcons.TIKTOK, brandColor: 'group-hover:text-black dark:group-hover:text-white', glowColor: 'rgba(100, 116, 139, 0.25)', url: getUrl('tiktok', profile.tiktok || '') },
    { id: 'twitter', name: 'X / Twitter', handle: `@${profile.twitter}`, svg: CustomIcons.X_TWITTER, brandColor: 'group-hover:text-black dark:group-hover:text-white', glowColor: 'rgba(100, 116, 139, 0.25)', url: getUrl('twitter', profile.twitter || '') },
  ].filter(s => !!s.handle);

  return (
    <div className={`flex flex-wrap items-center justify-center gap-3 ${className}`}>
      {socials.map((icon, index) => (
        <CompactInteractiveCard key={icon.id} icon={icon} index={index} isMounted={isMounted} />
      ))}
    </div>
  );
};

const App = () => {
  // Config
  // @ts-ignore
  const appId = typeof __app_id !== 'undefined' ? __app_id : 'portfolio-demo';
  const supabase = createClient();

  // Supabase State
  const [userId, setUserId] = useState<string | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [syncStatus, setSyncStatus] = useState('idle');

  // Global App States
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [viewMode, setViewMode] = useState(VIEW_MODES.GALLERY);
  const [currentLayout, setCurrentLayout] = useState(LAYOUTS.BENTO);
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [imageToRemove, setImageToRemove] = useState<any>(null);
  const [activeSectionId, setActiveSectionId] = useState("");
  
  // Data State
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(SEED_IMAGES);
  const [isDragging, setIsDragging] = useState(false);
  const isDirty = useRef(false);
  
  // Customization States
  const [fontFamily, setFontFamily] = useState(FONT_OPTIONS.INTER);
  const [fontWeight, setFontWeight] = useState(WEIGHT_OPTIONS[FONT_OPTIONS.INTER][0]); 
  const [h1Color, setH1Color] = useState('#ffffff');
  const [accentColor, setAccentColor] = useState('#D4AF37');
  const [isPublic, setIsPublic] = useState(false);
  const [showFeaturedHero, setShowFeaturedHero] = useState(false);
  const [featuredImageId, setFeaturedImageId] = useState("3"); 
  
  // Content Engine State
  const [bioText, setBioText] = useState("Specializing in high-fashion editorial narratives and avant-garde runway. Representation: Elite Management Worldwide.");
  const [bioTone, setBioTone] = useState("Avant-Garde");
  const [isGeneratingBio, setIsGeneratingBio] = useState(false);
  const [generatedConcept, setGeneratedConcept] = useState("");
  const [isGeneratingConcept, setIsGeneratingConcept] = useState(false);

  /**
   * STUDIO PANEL STATE
   * Controls the expansion and interactive state of the sidebar customization tool.
   */
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const ANIMATION_MODES = ['none', 'spin', 'breathe', 'glow'];
  const [logoAnimation, setLogoAnimation] = useState('breathe');

  const cycleLogoAnimation = () => {
    const currentIndex = ANIMATION_MODES.indexOf(logoAnimation);
    const nextIndex = (currentIndex + 1) % ANIMATION_MODES.length;
    setLogoAnimation(ANIMATION_MODES[nextIndex]);
  };


  // 1. Initialize Supabase Auth
  useEffect(() => {
    let subscription: any;
    
    // Check session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setUserId(session.user.id);
        setIsAuthReady(true);
      } else {
        // Fallback for local view
        setIsAuthReady(true);
      }
    }).catch(() => setIsAuthReady(true));

    const authRes = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setUserId(session.user.id);
        setIsAuthReady(true);
      }
    });
    
    subscription = authRes.data.subscription;
    
    return () => {
      if (subscription) subscription.unsubscribe();
    };
  }, []);

  // 2. Real-time Synchronization (Incoming)
  useEffect(() => {
    if (!isAuthReady || !userId || isDragging) return;
    
    // Use Supabase realtime mapping where applicable
    const channel = supabase.channel(`artifacts-${appId}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'artifacts', filter: `id=eq.${appId}` }, (payload) => {
         const data = (payload.new as any).data_json || {};
         if (data.items && JSON.stringify(data.items) !== JSON.stringify(galleryItems)) setGalleryItems(data.items);
         if (data.theme !== undefined && data.theme !== isDarkMode) setIsDarkMode(data.theme);
         if (data.fontFamily && data.fontFamily !== fontFamily) {
           setFontFamily(data.fontFamily);
           // Look up corresponding object for fontWeight
           const options = WEIGHT_OPTIONS[data.fontFamily] || WEIGHT_OPTIONS[FONT_OPTIONS.INTER];
           const match = options.find((o: any) => o.value === data.fontWeight) || options[0];
           setFontWeight(match);
         }
         if (data.h1Color && data.h1Color !== h1Color) setH1Color(data.h1Color);
         if (data.accentColor && data.accentColor !== accentColor) setAccentColor(data.accentColor);
         if (data.isPublic !== undefined && data.isPublic !== isPublic) setIsPublic(data.isPublic);
         if (data.showFeaturedHero !== undefined && data.showFeaturedHero !== showFeaturedHero) setShowFeaturedHero(data.showFeaturedHero);
         if (data.featuredImageId && data.featuredImageId !== featuredImageId) setFeaturedImageId(data.featuredImageId);
         if (data.currentLayout && data.currentLayout !== currentLayout) setCurrentLayout(data.currentLayout);
         if (data.bioText && data.bioText !== bioText) setBioText(data.bioText);
      })
      .subscribe();
      
    return () => {
      supabase.removeChannel(channel);
    };
  }, [isAuthReady, userId, isDragging, appId, galleryItems, isDarkMode, fontFamily, h1Color, accentColor, isPublic, showFeaturedHero, featuredImageId, currentLayout, bioText]);

  // 3. Debounced Persistence (Outgoing)
  useEffect(() => {
    if (!isAuthReady || !userId || isDragging || !isDirty.current) return;
    const saveTimeout = setTimeout(async () => {
      setSyncStatus('syncing');
      try {
        const payload = {
          items: galleryItems,
          theme: isDarkMode,
          fontFamily,
          fontWeight: (fontWeight as any)?.value || '400',
          h1Color,
          accentColor,
          isPublic,
          showFeaturedHero,
          featuredImageId,
          currentLayout,
          bioText,
          lastUpdated: new Date().toISOString()
        };
        
        await (supabase as any)
          .from('artifacts')
          .upsert({ id: appId, user_id: userId, data_json: payload }, { onConflict: 'id' });
          
        isDirty.current = false;
        setSyncStatus('saved');
        setTimeout(() => setSyncStatus('idle'), 2000);
      } catch (err) {
        console.error("Supabase Persistence Error:", err);
        setSyncStatus('error');
      }
    }, 1500);
    return () => clearTimeout(saveTimeout);
  }, [galleryItems, isDarkMode, fontFamily, fontWeight, h1Color, accentColor, isPublic, showFeaturedHero, featuredImageId, currentLayout, bioText, appId, isAuthReady, userId, isDragging]);

  const triggerUserAction = (updateFn: any) => {
    isDirty.current = true;
    updateFn();
  };

  const photoshoots = useMemo(() => {
    const grouped = galleryItems.reduce((acc: any, img: any) => {
      if (!acc[img.photoshoot]) {
        acc[img.photoshoot] = { id: img.photoshoot.replace(/\s+/g, '-').toLowerCase(), name: img.photoshoot, date: img.date, images: [] };
      }
      acc[img.photoshoot].images.push(img);
      return acc;
    }, {});
    return Object.values(grouped).sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [galleryItems]);

  const featuredImage = useMemo(() => {
    return galleryItems.find(img => img.id === featuredImageId) || galleryItems[0];
  }, [featuredImageId, galleryItems]);

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Outfit:wght@300;400;500&family=Playfair+Display:wght@400;700;900&family=Montserrat:wght@400;600;800&family=Syne:wght@400;700;800&family=Bodoni+Moda:wght@400;600;900&family=Fraunces:wght@400;600;900&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => { if (document.head.contains(link)) document.head.removeChild(link); };
  }, []);

  useEffect(() => {
    if (viewMode !== VIEW_MODES.PHOTOSHOOTS) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) setActiveSectionId(entry.target.id); });
    }, { threshold: 0.3, rootMargin: "-10% 0px -70% 0px" });
    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));
    return () => sections.forEach((section) => observer.unobserve(section));
  }, [viewMode, photoshoots]);

  const handleFontChange = (val: string) => {
    triggerUserAction(() => {
        setFontFamily(val);
        const options = WEIGHT_OPTIONS[val] || WEIGHT_OPTIONS[FONT_OPTIONS.INTER];
        const defaults = { 
          [FONT_OPTIONS.INTER]: options[1], 
          [FONT_OPTIONS.SERIF]: options[1], 
          [FONT_OPTIONS.OUTFIT]: options[1]
        };
        setFontWeight(defaults[val] || options[0]);
        if (h1Color === '#ffffff' || h1Color === '#000000') setH1Color(isDarkMode ? '#ffffff' : '#000000');
    });
  };

  const handleDragEnd = (event: any) => {
    setIsDragging(false);
    if (event.canceled) return;
    const { source, target } = event.operation;
    if (source && target && source.id !== target.id) {
        moveItem(source.id, target.id);
    }
  };

  const toggleItemFocus = (id: string) => {
    triggerUserAction(() => {
        setGalleryItems(prev => prev.map(img => {
            if (img.id === id) {
                const isNowFocused = !img.isStarred;
                // If focusing, default to a larger presence if it's currently small
                if (isNowFocused && (!img.colSpan || img.colSpan < 2)) {
                    return { ...img, isStarred: true, colSpan: 2, rowSpan: 2 };
                }
                return { ...img, isStarred: isNowFocused };
            }
            return img;
        }));
    });
  };

  const cycleItemSize = (id: string) => {
    triggerUserAction(() => {
        setGalleryItems(prev => prev.map(img => {
            if (img.id === id) {
                const current = img.colSpan || 2;
                // Cycle through uniform squares: 1x1 -> 2x2 -> 4x4 -> 1x1
                let next = 2;
                if (current === 1) next = 2;
                else if (current === 2) next = 4;
                else next = 1;
                return { ...img, colSpan: next, rowSpan: next };
            }
            return img;
        }));
    });
  };

  const updateItemSize = (id: string, dimension: 'col' | 'row', delta: number) => {
    triggerUserAction(() => {
        setGalleryItems(prev => prev.map(img => {
            if (img.id === id) {
                const current = (dimension === 'col' ? img.colSpan : img.rowSpan) || 2;
                const newVal = Math.max(1, Math.min(4, current + delta));
                return { ...img, [dimension === 'col' ? 'colSpan' : 'rowSpan']: newVal };
            }
            return img;
        }));
    });
  };

  const moveItem = (draggedId: string, targetId: string) => {
    triggerUserAction(() => {
        setGalleryItems((prev) => {
            const fromIndex = prev.findIndex(item => item.id === draggedId);
            const targetIndex = prev.findIndex(item => item.id === targetId);
            if (fromIndex === targetIndex || fromIndex === -1 || targetIndex === -1) return prev;
            const newItems = [...prev];
            const temp = newItems[fromIndex];
            newItems[fromIndex] = newItems[targetIndex];
            newItems[targetIndex] = temp;
            return newItems;
        });
    });
  };

  const confirmRemoval = () => {
    if (!imageToRemove) return;
    triggerUserAction(() => {
        setGalleryItems(prev => prev.filter(item => item.id !== imageToRemove.id));
        setImageToRemove(null);
    });
  };

  const openEyeDropper = async (setter: Function) => {
    if (!(window as any).EyeDropper) return;
    const dropper = new (window as any).EyeDropper();
    try { 
        const result = await dropper.open(); 
        triggerUserAction(() => setter(result.sRGBHex));
    } catch (e) {}
  };

  const handleRewriteBio = async () => {
    if (isGeneratingBio) return;
    setIsGeneratingBio(true);
    try {
      const prompt = `Rewrite the following model portfolio bio in a ${bioTone} tone. Make it exactly 1 to 2 sentences. Do not use quotes. Keep it highly professional and striking. Current bio: "${bioText}"`;
      const newBio = await generateWithRetry(prompt);
      if (newBio) {
        triggerUserAction(() => setBioText(newBio));
      }
    } catch(e) {
      console.error("Failed to generate bio", e);
    } finally {
      setIsGeneratingBio(false);
    }
  };

  const handleGenerateConcept = async () => {
    if (isGeneratingConcept) return;
    setIsGeneratingConcept(true);
    try {
      const categories = [...new Set(galleryItems.map(item => item.category))].join(", ");
      const prompt = `Based on the following successful portfolio categories: ${categories}. Suggest a highly creative, 2-sentence concept for a new high-fashion photoshoot. Include a bold title, location, and aesthetic vibe.`;
      const concept = await generateWithRetry(prompt);
      if (concept) setGeneratedConcept(concept);
    } catch(e) {
      console.error("Failed to generate concept", e);
    } finally {
      setIsGeneratingConcept(false);
    }
  };

  const scrollTo = (id: string, offset = 120) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - offset, behavior: 'smooth' });
  };

  const getBentoSpan = (idx: number) => {
    const spans = ['col-span-2 row-span-2', 'col-span-1 row-span-1', 'col-span-1 row-span-2', 'col-span-1 row-span-1', 'col-span-2 row-span-1', 'col-span-1 row-span-1', 'col-span-1 row-span-1', 'col-span-2 row-span-2', 'col-span-1 row-span-1', 'col-span-1 row-span-1', 'col-span-1 row-span-1', 'col-span-1 row-span-1'];
    return spans[idx % spans.length];
  };

  const getHierarchicalSpan = (idx: number) => (idx === 0 ? 'md:col-span-3 md:row-span-2 h-[600px]' : 'md:col-span-1 md:row-span-1 h-[300px]');

  const renderGallery = () => {
    if (viewMode === VIEW_MODES.PHOTOSHOOTS) {
      return (
        <div className="space-y-48">
          {photoshoots.map((shoot: any, idx: number) => (
            <motion.section key={shoot.name} id={shoot.id} initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} className="scroll-mt-32">
              <div className={`flex flex-col md:flex-row md:items-end justify-between border-b pb-6 ${isDarkMode ? 'border-neutral-800' : 'border-neutral-200'}`}>
                <div>
                  <span className={`${isDarkMode ? 'text-neutral-600' : 'text-neutral-400'} text-[11px] uppercase tracking-[0.4em] font-black`}>{new Date(shoot.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</span>
                  <h3 style={{ fontFamily, fontWeight: fontWeight?.value || '900' }} className="text-5xl font-black uppercase tracking-tighter mt-2">{shoot.name}</h3>
                </div>
                <div className="flex items-center gap-8 mt-6 md:mt-0">
                    <span className={`text-4xl font-black italic opacity-40`} style={{ color: accentColor, fontFamily }}>/ 0{idx + 1}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                {shoot.images.map((img: any) => (
                  <div key={img.id} className="aspect-[3/4]">
                    <PortfolioCard img={img} isDarkMode={isDarkMode} isFullHeight onClick={() => setSelectedImage(img)} onRemove={() => setImageToRemove(img)} fontFamily={fontFamily} fontWeight={fontWeight} />
                  </div>
                ))}
              </div>
            </motion.section>
          ))}
        </div>
      );
    }

    const getAspectSpan = (col: number, row: number, isStarred?: boolean) => {
        const base = `col-span-${col || 2} row-span-${row || 2}`;
        return isStarred ? `${base} ring-4 ring-white ring-offset-4 ring-offset-black/20 shadow-[0_0_50px_rgba(255,255,255,0.2)]` : base;
    };

    const layoutClasses = currentLayout === LAYOUTS.MASONRY ? "columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6" : 
                         currentLayout === LAYOUTS.HIERARCHICAL ? "grid grid-cols-1 md:grid-cols-4 gap-6 grid-flow-row-dense" : 
                         currentLayout === LAYOUTS.CLASSIC ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 grid-flow-row-dense" :
                         "grid grid-cols-1 md:grid-cols-4 auto-rows-[220px] gap-6 grid-flow-row-dense";

    return (
      <div className="relative">
        <DragDropProvider onDragStart={() => setIsDragging(true)} onDragEnd={handleDragEnd}>
          <div className={layoutClasses}>
            {galleryItems.map((img, idx) => {
              return (
                <SortableItem key={img.id} id={img.id} index={idx} spanClass={(img as any).colSpan ? getAspectSpan((img as any).colSpan, (img as any).rowSpan, img.isStarred) : currentLayout === LAYOUTS.BENTO ? getBentoSpan(idx) : currentLayout === LAYOUTS.HIERARCHICAL ? getHierarchicalSpan(idx) : ""}>
                  {(handleRef: any) => (
                    <PortfolioCard img={img} isDarkMode={isDarkMode} isFullHeight={currentLayout !== LAYOUTS.MASONRY} onClick={() => setSelectedImage(img)} isDraggable handleRef={handleRef} onRemove={() => setImageToRemove(img)} onCycleSize={() => cycleItemSize(img.id)} onUpdateSize={(dim: 'col' | 'row', delta: number) => updateItemSize(img.id, dim, delta)} onToggleFocus={() => toggleItemFocus(img.id)} fontFamily={fontFamily} fontWeight={fontWeight} />
                  )}
                </SortableItem>
              );
            })}
          </div>
        </DragDropProvider>
      </div>
    );
  };

  const borderClasses = isDarkMode ? "border-white/10" : "border-black/5";
  const glassClasses = isDarkMode ? "bg-neutral-900/60 backdrop-blur-xl border-white/10" : "bg-white/60 backdrop-blur-xl border-black/5";

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-neutral-950 text-neutral-100" : "bg-neutral-50 text-neutral-900"} transition-colors duration-500 font-sans selection:bg-neutral-500 overflow-x-hidden`}>
      
      {/* Featured Hero */}
      <AnimatePresence>
        {showFeaturedHero && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-screen w-full relative overflow-hidden bg-black z-[70]">
            {featuredImage.url.endsWith('.mp4') ? (
              <motion.video key={featuredImage.url} initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 15, ease: "linear" }} src={featuredImage.url} autoPlay loop muted playsInline className="w-full h-full object-cover opacity-80" />
            ) : (
              <motion.img key={featuredImage.url} initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 15, ease: "linear" }} src={featuredImage.url} className="w-full h-full object-cover opacity-80" alt="Hero" />
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/90 flex flex-col items-center justify-center text-center p-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                <span className="text-white/40 text-xs uppercase tracking-[0.6em] mb-6 block font-black">Featured Entry</span>
                <h2 style={{ fontFamily: fontFamily, fontWeight: fontWeight?.value || '400', color: 'white' }} className="text-6xl md:text-[10rem] uppercase tracking-tighter leading-[0.8] drop-shadow-2xl">{featuredImage.title}</h2>
              </motion.div>
            </div>
            <motion.div animate={{ y: [0, 15, 0] }} transition={{ repeat: Infinity, duration: 2.5 }} className="absolute bottom-12 left-1/2 -translate-x-1/2 cursor-pointer flex flex-col items-center gap-3 group" onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}>
              <span className="text-[10px] uppercase tracking-[0.5em] text-white/40 font-black group-hover:text-white transition-colors">Discover Gallery</span>
              <ChevronDown className="w-7 h-7 text-white/50 group-hover:text-white transition-colors" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ANTHOLOGY TIMELINE */}
      <AnimatePresence>
          {viewMode === VIEW_MODES.PHOTOSHOOTS && (
            <motion.aside initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="fixed right-6 top-1/2 -translate-y-1/2 z-[95] flex flex-col items-center py-10 pointer-events-none xl:pointer-events-auto">
              <div className={`relative w-[2px] h-[350px] bg-white flex flex-col items-center justify-between py-8 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.4)]`}>
                  {photoshoots.map((shoot: any) => {
                      const dateObj = new Date(shoot.date);
                      const mm = (dateObj.getMonth() + 1).toString().padStart(2, '0');
                      const yy = dateObj.getFullYear().toString().slice(-2);
                      const isActive = activeSectionId === shoot.id;

                      return (
                          <div key={shoot.id} onClick={() => scrollTo(shoot.id, 140)} className="relative group flex items-center justify-center p-4 -my-4 cursor-pointer">
                              <div className={`absolute right-full mr-4 px-4 py-3 rounded-2xl text-[10px] font-mono tracking-[0.2em] pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0 whitespace-nowrap shadow-2xl z-20 ${isDarkMode ? 'bg-black/80 backdrop-blur-xl border border-white/10 text-white' : 'bg-white/80 backdrop-blur-xl border border-black/10 text-black'}`}>
                                  <span className="opacity-40 font-bold mr-2">{mm}/{yy}</span> {shoot.name}
                              </div>
                              <div className={`w-3 h-3 rounded-full transition-all duration-500 relative z-10 border-2 border-black/20 ${isActive ? 'scale-[1.8]' : 'scale-100 group-hover:scale-150 group-hover:animate-pulse'}`} style={{ backgroundColor: isActive ? accentColor : 'white', boxShadow: isActive ? `0 0 15px ${accentColor}` : 'none' }} />
                          </div>
                      );
                  })}
              </div>
              <p className="text-[8px] uppercase tracking-[0.5em] vertical-rl font-black rotate-180 mt-10 text-white drop-shadow-md opacity-40">Anthology Index</p>
            </motion.aside>
          )}
      </AnimatePresence>

      {/* STUDIO PANEL START */}
      <motion.aside 
        initial={false} 
        /* The expansion animation handles the transformation from the oval handle to the full panel */
        animate={{ 
          width: isSidebarExpanded ? 340 : 64, 
          height: isSidebarExpanded ? 'auto' : 80, 
          borderRadius: isSidebarExpanded ? "2.5rem" : "32px" 
        }} 
        className={`fixed left-4 top-1/2 -translate-y-1/2 z-[100] ${glassClasses} border shadow-2xl overflow-hidden flex flex-col transition-all duration-500 group`}
      >
        {/* OVAL EXPANSION HANDLE: Visible only when panel is collapsed */}
        {!isSidebarExpanded && (
          <button 
            onClick={() => setIsSidebarExpanded(true)} 
            className={`w-full h-full flex items-center justify-center cursor-pointer transition-colors ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/5'}`}
          >
            <Palette className="w-6 h-6 opacity-60 group-hover:opacity-100 transition-opacity" />
          </button>
        )}

        <AnimatePresence>
          {isSidebarExpanded && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-10 pr-12 space-y-10 max-h-[85vh] overflow-y-auto custom-scrollbar relative">
              {/* CLOSE BUTTON */}
              <button onClick={() => setIsSidebarExpanded(false)} className={`absolute top-8 right-8 p-2 rounded-full transition-colors ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/5'}`}><X className="w-4 h-4 opacity-50" /></button>
              
              {/* BRANDING HEADER */}
              <div className="flex items-center gap-5">
                <div className={`w-14 h-14 ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'} rounded-3xl flex items-center justify-center shadow-xl`}><Camera className="w-7 h-7" /></div>
                <div><h4 className="text-sm font-black uppercase tracking-widest leading-none">Studio Panel</h4><p className="text-[10px] opacity-40 uppercase tracking-tight mt-1.5 font-bold">Identity Engine</p></div>
              </div>

              <div className="space-y-10">
                {/* CURATION LAYOUT: Switcher for 2D grid logic (Classic, Masonry, Bento, Focus) */}
                <div>
                  <label className="text-[10px] opacity-40 uppercase tracking-[0.3em] font-black mb-5 block">Curation Layout</label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { id: LAYOUTS.CLASSIC, icon: LayoutGrid, label: 'Classic' },
                      { id: LAYOUTS.MASONRY, icon: Tally3, label: 'Masonry' },
                      { id: LAYOUTS.BENTO, icon: Box, label: 'Bento' },
                      { id: LAYOUTS.HIERARCHICAL, icon: Layers, label: 'Focus' },
                    ].map(layout => (
                      <button 
                        key={layout.id}
                        onClick={() => triggerUserAction(() => setCurrentLayout(layout.id))}
                        className={`flex flex-col items-center gap-2.5 p-4 rounded-2xl border transition-all duration-300 ${currentLayout === layout.id ? (isDarkMode ? 'bg-white text-black border-white shadow-xl scale-105' : 'bg-black text-white border-black shadow-xl scale-105') : (isDarkMode ? 'bg-white/5 border-white/5 text-neutral-400 hover:bg-white/10' : 'bg-black/5 border-black/5 text-neutral-500 hover:bg-black/10')}`}
                      >
                        <layout.icon className="w-4 h-4" />
                        <span className="text-[9px] font-black uppercase tracking-widest">{layout.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* VISUAL PRESENTATION: Controls for the full-screen hero and featured content selection */}
                <div>
                  <label className="text-[10px] opacity-40 uppercase tracking-[0.3em] font-black mb-5 block">Visual Presentation</label>
                  <div className="space-y-4">
                    <div className={`flex items-center justify-between p-5 rounded-[1.5rem] border ${borderClasses} ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}>
                      <div className="flex items-center gap-4"><Star className={`w-4 h-4 ${showFeaturedHero ? 'text-amber-400' : 'text-neutral-400'}`} /><span className="text-[11px] font-black uppercase tracking-widest">Hero Entry</span></div>
                      <button onClick={() => triggerUserAction(() => setShowFeaturedHero(!showFeaturedHero))} className={`w-12 h-6 rounded-full relative transition-all duration-300 ${showFeaturedHero ? 'bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.4)]' : 'bg-neutral-600'}`}><motion.div animate={{ x: showFeaturedHero ? 26 : 4 }} className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-md" /></button>
                    </div>
                    {showFeaturedHero && (
                      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="relative">
                        <select 
                          value={featuredImageId} 
                          onChange={(e) => triggerUserAction(() => setFeaturedImageId(e.target.value))} 
                          className={`w-full appearance-none p-4 pl-10 text-[11px] font-black uppercase tracking-widest rounded-[1.5rem] border focus:outline-none transition-colors ${isDarkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-black/5 border-black/10 text-black'}`}
                        >
                          {galleryItems.map(img => <option key={img.id} value={img.id}>{img.title}</option>)}
                        </select>
                        <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-30 pointer-events-none" />
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-20 pointer-events-none" />
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* BRANDING SCHEMA: Customizes typography, interface colors, and the global brand hue */}
                <div>
                  <label className="text-[10px] opacity-40 uppercase tracking-[0.3em] font-black mb-5 block">Branding Schema</label>
                  <div className="space-y-4">
                    <div className={`flex items-center justify-between p-5 rounded-[1.5rem] border ${borderClasses} ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}>
                        <div className="flex items-center gap-4">{isDarkMode ? <Moon className="w-4 h-4 text-indigo-400" /> : <Sun className="w-4 h-4 text-amber-500" />}<span className="text-[11px] font-black uppercase tracking-widest">Interface</span></div>
                        <button onClick={() => triggerUserAction(() => setIsDarkMode(!isDarkMode))} className={`w-12 h-6 rounded-full relative transition-all duration-300 ${isDarkMode ? 'bg-indigo-600 shadow-[0_0_15px_rgba(79,70,229,0.4)]' : 'bg-neutral-400'}`}><motion.div animate={{ x: isDarkMode ? 26 : 4 }} className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-md" /></button>
                    </div>
                    {/* TYPOGRAPHY SELECTOR: Dynamically loads Google Fonts including Cormorant Garamond */}
                    <div className="relative">
                        <select value={fontFamily} onChange={(e) => handleFontChange(e.target.value)} className={`w-full appearance-none p-5 text-[11px] font-black uppercase tracking-widest rounded-[1.5rem] border focus:outline-none transition-colors ${isDarkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-black/5 border-black/10 text-black'}`}>
                          <option value={FONT_OPTIONS.INTER}>Inter Modern</option>
                          <option value={FONT_OPTIONS.SERIF}>Pose & Poise - Cormorant Garamond</option>
                          <option value={FONT_OPTIONS.OUTFIT}>Outfit Geometric</option>
                          <option value={FONT_OPTIONS.PLAYFAIR}>Playfair Display</option>
                          <option value={FONT_OPTIONS.MONTSERRAT}>Montserrat Universal</option>
                          <option value={FONT_OPTIONS.SYNE}>Syne Edgy</option>
                          <option value={FONT_OPTIONS.BODONI}>Bodoni Moda Luxury</option>
                          <option value={FONT_OPTIONS.FRAUNCES}>Fraunces Craft</option>
                        </select>
                        <Type className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 opacity-20 pointer-events-none" />
                    </div>
                    {/* COLOR PICKERS: Updates the primary branding color and accent color */}
                    <div className="grid grid-cols-2 gap-4">
                      {/* Primary Color */}
                      <div className={`flex flex-col gap-3 p-4 rounded-[1.5rem] border ${borderClasses} ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}>
                          <span className="text-[10px] font-black uppercase tracking-widest">Primary</span>
                          <div className="flex items-center gap-3">
                              <div className="relative w-8 h-8 overflow-hidden rounded-xl border shrink-0"><input type="color" value={h1Color} onChange={(e) => triggerUserAction(() => setH1Color(e.target.value))} className="absolute inset-[-10px] w-[200%] h-[200%] cursor-pointer border-none p-0 opacity-0 z-10" /><div className="w-full h-full" style={{ backgroundColor: h1Color }} /></div>
                              <div className="flex-1"><input type="text" value={h1Color} onChange={(e) => triggerUserAction(() => setH1Color(e.target.value))} className="bg-transparent text-[10px] font-mono tracking-widest uppercase outline-none w-full font-black opacity-60" /></div>
                              {typeof window !== 'undefined' && (window as any).EyeDropper && <button onClick={() => openEyeDropper(setH1Color)} className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/10'}`}><Pipette className="w-3 h-3 opacity-60" /></button>}
                          </div>
                      </div>
                      
                      {/* Accent Color */}
                      <div className={`flex flex-col gap-3 p-4 rounded-[1.5rem] border ${borderClasses} ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}>
                          <span className={`text-[10px] font-black uppercase tracking-widest`} style={{ color: accentColor }}>Accent</span>
                          <div className="flex items-center gap-3">
                              <div className="relative w-8 h-8 overflow-hidden rounded-xl border shrink-0"><input type="color" value={accentColor} onChange={(e) => triggerUserAction(() => setAccentColor(e.target.value))} className="absolute inset-[-10px] w-[200%] h-[200%] cursor-pointer border-none p-0 opacity-0 z-10" /><div className="w-full h-full" style={{ backgroundColor: accentColor }} /></div>
                              <div className="flex-1"><input type="text" value={accentColor} onChange={(e) => triggerUserAction(() => setAccentColor(e.target.value))} className="bg-transparent text-[10px] font-mono tracking-widest uppercase outline-none w-full font-black opacity-60" /></div>
                              {typeof window !== 'undefined' && (window as any).EyeDropper && <button onClick={() => openEyeDropper(setAccentColor)} className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/10'}`}><Pipette className="w-3 h-3 opacity-60" /></button>}
                          </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* NEW: Gemini Content Engine */}
                <div>
                  <label className="text-[10px] opacity-40 uppercase tracking-[0.3em] font-black mb-5 flex items-center gap-2">
                    Content Engine <Sparkles className="w-3 h-3 text-amber-400" />
                  </label>
                  <div className={`p-5 rounded-[1.5rem] border ${borderClasses} ${isDarkMode ? 'bg-white/5' : 'bg-black/5'} space-y-5`}>
                     <div>
                         <div className="flex items-center justify-between mb-3">
                             <span className="text-[10px] font-black uppercase tracking-widest">Bio Identity</span>
                         </div>
                         <textarea 
                           value={bioText}
                           onChange={(e) => triggerUserAction(() => setBioText(e.target.value))}
                           className={`w-full p-4 text-[11px] font-medium leading-relaxed rounded-2xl focus:outline-none resize-none h-24 border ${borderClasses} ${isDarkMode ? 'bg-black/40 text-white' : 'bg-white/40 text-black'}`}
                         />
                         <div className="flex gap-3 mt-3">
                           <select 
                             value={bioTone} 
                             onChange={(e) => setBioTone(e.target.value)}
                             className={`flex-1 appearance-none p-4 text-[10px] font-black uppercase tracking-widest rounded-2xl border focus:outline-none ${borderClasses} ${isDarkMode ? 'bg-black/40 text-white' : 'bg-white/40 text-black'}`}
                           >
                             <option value="Avant-Garde">Avant-Garde</option>
                             <option value="Minimalist">Minimalist</option>
                             <option value="High-Fashion">High-Fashion</option>
                             <option value="Commercial">Commercial</option>
                           </select>
                           <button 
                             onClick={handleRewriteBio}
                             disabled={isGeneratingBio}
                             className={`px-5 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center transition-all shadow-xl ${isGeneratingBio ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95'} ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'}`}
                           >
                             {isGeneratingBio ? <RefreshCw className="w-4 h-4 animate-spin" /> : 'Rewrite ✨'}
                           </button>
                         </div>
                     </div>

                     <div className={`pt-5 border-t ${borderClasses}`}>
                       <div className="flex items-center justify-between mb-4">
                          <span className="text-[10px] font-black uppercase tracking-widest">Creative Direction</span>
                          <button 
                             onClick={handleGenerateConcept}
                             disabled={isGeneratingConcept}
                             className={`px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-2 transition-all border ${isGeneratingConcept ? 'opacity-50 cursor-not-allowed' : 'hover:bg-neutral-800/10 dark:hover:bg-white/10'} ${borderClasses}`}
                          >
                             {isGeneratingConcept ? <RefreshCw className="w-3 h-3 animate-spin" /> : <><Sparkles className="w-3 h-3 text-amber-400" /> Concept ✨</>}
                          </button>
                       </div>
                       {generatedConcept && (
                         <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20">
                           <p className="text-[11px] leading-relaxed font-medium text-amber-600 dark:text-amber-200">
                             {generatedConcept}
                           </p>
                         </motion.div>
                       )}
                     </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <div className={`flex items-center justify-between p-5 rounded-[1.5rem] border ${borderClasses} ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}>
                    <div className="flex items-center gap-4">
                      <Globe className={`w-5 h-5 ${isPublic ? 'text-green-500' : 'text-neutral-500'}`} />
                      <div className="flex flex-col">
                        <span className="text-[11px] font-black uppercase tracking-widest">{isPublic ? 'Live / Public' : 'Private'}</span>
                        <span className="text-[9px] opacity-40 uppercase tracking-widest font-bold">{isPublic ? 'Visible to everybody' : 'Only visible to you'}</span>
                      </div>
                    </div>
                    <button onClick={() => triggerUserAction(() => setIsPublic(!isPublic))} className={`w-14 h-7 rounded-full relative transition-all duration-300 shrink-0 ${isPublic ? 'bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.4)]' : 'bg-neutral-600'}`}>
                      <motion.div animate={{ x: isPublic ? 30 : 4 }} className="absolute top-1 w-5 h-5 bg-white rounded-full shadow-md" />
                    </button>
                  </div>
                  <button onClick={() => setIsSidebarExpanded(false)} className={`w-full flex items-center justify-center gap-4 p-6 rounded-[1.5rem] transition-all shadow-2xl hover:scale-[1.02] active:scale-[0.98] font-black uppercase tracking-[0.2em] text-[11px] ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>
                    <Eye className="w-5 h-5" /> View Portfolio
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.aside>

      {/* Main Header */}
      <nav className={`fixed top-0 w-full z-[80] transition-all duration-500 border-b ${glassClasses}`}>
        <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4 min-w-[200px]">
            <div className="relative group cursor-pointer" onClick={cycleLogoAnimation}>
              <style>{`
                @keyframes logo-breathe {
                  0%, 100% { transform: scale(0.92); opacity: 0.6; }
                  50% { transform: scale(1.18); opacity: 1; }
                }
                @keyframes logo-glow {
                  0%, 100% { filter: drop-shadow(0 0 4px rgba(196, 164, 132, 0.6)) drop-shadow(0 0 8px rgba(196, 164, 132, 0.2)); }
                  50% { filter: drop-shadow(0 0 20px rgba(196, 164, 132, 1)) drop-shadow(0 0 35px rgba(196, 164, 132, 0.4)); }
                }
                .animate-logo-breathe { animation: logo-breathe 5s ease-in-out infinite; }
                .animate-logo-glow { animation: logo-glow 2.5s ease-in-out infinite; }
              `}</style>
              
              <svg 
                width="32" height="32" viewBox="0 0 24 24" fill="none" 
                stroke={isDarkMode ? '#FFF' : '#000'} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" 
                className={`
                  ${logoAnimation === 'spin' ? 'group-hover:animate-[spin_4s_linear_infinite]' : ''}
                  ${logoAnimation === 'breathe' ? 'animate-logo-breathe' : ''}
                  ${logoAnimation === 'glow' ? 'animate-logo-glow' : ''}
                `}
              >
                <circle cx="13" cy="3" r="1.2" fill={isDarkMode ? '#FFF' : '#000'} stroke="none"></circle>
                <path d="M13 4.5c-1 0-2.5.5-3.5 2s-1 3-1 3"></path>
                <path d="M13 4.5c.8 3 0 7-2 9"></path>
                <path d="M11 13.5c-2 3-5 5-6 9.5h14c-1-5-4-7-6-9.5"></path>
                <path d="M11 15l1 7" opacity="0.3" strokeWidth="0.8"></path>
                <path d="M11 7.5l3.5 1.5-1 4"></path>
              </svg>
            </div>
          </div>
          <div className="flex flex-1 items-center justify-center gap-10 md:gap-14">{[{ name: 'Bio', id: 'bio' }, { name: 'Portfolio', id: 'gallery-anchor' }, { name: 'The Terms', id: 'terms' }, { name: 'Inquire', id: 'inquire' }].map(tab => (<button key={tab.name} onClick={() => scrollTo(tab.id, 100)} className="text-[11px] uppercase tracking-[0.4em] font-black opacity-40 hover:opacity-100 transition-opacity whitespace-nowrap">{tab.name}</button>))}</div>
          <div className="flex items-center justify-end gap-6 min-w-[280px]">
            <CompactSocialCanvas profile={MARIA_PROFILE} />
            <div className="flex items-center gap-3">
              <button 
                onClick={cycleLogoAnimation}
                className={`flex items-center gap-2 p-2 rounded-xl transition-all duration-300 ${logoAnimation !== 'none' ? 'bg-amber-500/10 text-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.2)]' : 'bg-neutral-800 text-neutral-500'}`}
                title={`Animation: ${logoAnimation.toUpperCase()}`}
              >
                <Sparkles className={`w-4 h-4 ${logoAnimation !== 'none' ? 'animate-pulse' : ''}`} />
                <span className="text-[10px] font-black uppercase tracking-tighter px-1">{logoAnimation}</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Header */}
      <header className="pt-56 pb-24 px-8 max-w-7xl mx-auto" id="bio">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
          <div className="overflow-visible">
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`${isDarkMode ? 'text-neutral-500' : 'text-neutral-400'} text-[13px] uppercase tracking-[0.5em] mb-6 font-black`}>International Creative / Talent</motion.p>
            <motion.h1 key={`${fontFamily}-${fontWeight?.label || ''}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ fontFamily: fontFamily, fontWeight: fontWeight?.value || '400', fontStyle: fontWeight?.style || 'normal', color: h1Color }} className="text-8xl md:text-[11rem] tracking-tighter uppercase leading-[0.7] transition-all duration-700">MARIA <br /> <span className="block mt-4 opacity-20" style={{ color: h1Color }}>STEVENS</span></motion.h1>
          </div>
          <div className="max-w-sm md:mb-6">
            <p className={`${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'} text-base leading-relaxed mb-10 font-medium tracking-tight`}>{bioText}</p>
            <button onClick={() => scrollTo('inquire')} className={`flex items-center gap-4 px-12 py-5 text-[11px] font-black uppercase tracking-[0.4em] rounded-full transition-all w-full md:w-auto justify-center shadow-2xl hover:scale-105 active:scale-95`} style={{ background: `linear-gradient(135deg, ${h1Color}, ${accentColor})`, color: isDarkMode ? '#000000' : '#ffffff' }}>Book Talent <ExternalLink className="w-4 h-4" /></button>
          </div>
        </div>
      </header>

      <main className="px-8 pb-32 max-w-7xl mx-auto relative">
        <div className="flex items-center justify-center mb-24 pt-12 scroll-mt-24" id="gallery-anchor">
          <div className={`flex items-center gap-2 p-2.5 rounded-full border shadow-2xl ${glassClasses}`}>
            <button onClick={() => triggerUserAction(() => setViewMode(VIEW_MODES.GALLERY))} className={`flex items-center gap-4 px-10 py-4 rounded-full text-xs uppercase font-black tracking-widest transition-all ${viewMode === VIEW_MODES.GALLERY ? 'shadow-xl' : 'text-neutral-500 hover:text-neutral-300'}`} style={viewMode === VIEW_MODES.GALLERY ? { backgroundColor: accentColor, color: '#ffffff' } : {}}><LayoutGrid className="w-4 h-4" /> Gallery</button>
            <button onClick={() => triggerUserAction(() => setViewMode(VIEW_MODES.PHOTOSHOOTS))} className={`flex items-center gap-4 px-10 py-4 rounded-full text-xs uppercase font-black tracking-widest transition-all ${viewMode === VIEW_MODES.PHOTOSHOOTS ? 'shadow-xl' : 'text-neutral-500 hover:text-neutral-300'}`} style={viewMode === VIEW_MODES.PHOTOSHOOTS ? { backgroundColor: accentColor, color: '#ffffff' } : {}}><Layers className="w-4 h-4" /> The Anthology</button>
          </div>
        </div>

        <div className={`flex items-center justify-between mb-12 pb-8 border-b`} style={{ borderColor: `${accentColor}30` }}><h2 style={{ fontFamily }} className={`text-xs uppercase tracking-[0.8em] font-black ${isDarkMode ? 'text-neutral-600' : 'text-neutral-300'}`}>{viewMode === VIEW_MODES.GALLERY ? 'Signature Portfolio' : 'The Anthology'}</h2><div className={`flex gap-8 text-[11px] uppercase tracking-widest font-black`} style={{ color: accentColor }}><span style={{ fontFamily }}>{galleryItems.length} Frames</span><span>/</span><span style={{ fontFamily }}>Archives 23:25</span></div></div>
        <AnimatePresence mode="wait"><motion.div key={`${viewMode}-${currentLayout}-${isDarkMode}`} initial={{ opacity: 0, scale: 0.99 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>{renderGallery()}</motion.div></AnimatePresence>
        <section id="terms" className="mt-72 pt-32 border-t border-neutral-800/10">
          <div className="flex flex-col mb-16">
            <span className={`text-[11px] uppercase tracking-[0.5em] mb-4 font-black`} style={{ color: accentColor }}>Engagement Protocols</span>
            <h3 style={{ fontFamily, fontWeight: fontWeight?.value || '900' }} className="text-6xl font-black uppercase tracking-tighter flex items-center gap-6">
              <ShieldCheck className="w-14 h-14 opacity-20" /> The Terms
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Services Column */}
            <div className={`p-8 rounded-[3rem] border ${borderClasses} ${isDarkMode ? 'bg-white/5' : 'bg-black/5'} flex flex-col`}>
              <div className="flex items-center gap-4 mb-8">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>
                  <Layers className="w-6 h-6" />
                </div>
                <h4 style={{ fontFamily, fontWeight: fontWeight?.value || '900' }} className="text-lg font-black uppercase tracking-widest">Professional Services</h4>
              </div>
              <ul className="space-y-6 flex-1">
                {[
                  { title: 'High-Fashion Editorial', desc: 'Conceptual narratives and magazine features.' },
                  { title: 'Commercial Campaigns', desc: 'Brand identity and global marketing assets.' },
                  { title: 'Runway / Presentation', desc: 'International fashion weeks and showroom.' },
                  { title: 'Fitting / Technical', desc: 'Garment testing and precision development.' }
                ].map((s, i) => (
                  <li key={i} className="group cursor-default">
                    <div className="flex gap-4">
                      <div className="mt-1"><Check className="w-4 h-4" style={{ color: accentColor }} /></div>
                      <div>
                        <p className="text-[11px] font-black uppercase tracking-widest leading-none mb-1.5">{s.title}</p>
                        <p className={`text-[10px] font-bold opacity-40 uppercase tracking-tight`}>{s.desc}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Rates Column */}
            <div className={`p-8 rounded-[3rem] border ${borderClasses} ${isDarkMode ? 'bg-white/5' : 'bg-black/5'} flex flex-col`}>
              <div className="flex items-center gap-4 mb-8">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>
                  <CreditCard className="w-6 h-6" />
                </div>
                <h4 style={{ fontFamily, fontWeight: fontWeight?.value || '900' }} className="text-lg font-black uppercase tracking-widest">Standard Rates</h4>
              </div>
              <div className="space-y-6 flex-1">
                {[
                  { label: 'Full Day Rate (8h)', price: '$2,500+', sub: 'Editorial / Commercial' },
                  { label: 'Half Day Rate (4h)', price: '$1,400+', sub: 'Minimum Booking' },
                  { label: 'Hourly Rate', price: '$400/hr', sub: 'Post-overtime only' }
                ].map((r, i) => (
                  <div key={i} className="flex justify-between items-start border-b border-neutral-500/10 pb-4 last:border-0 transition-all hover:translate-x-1">
                    <div>
                      <p className="text-[11px] font-black uppercase tracking-widest leading-none mb-1.5">{r.label}</p>
                      <p className={`text-[10px] font-bold opacity-40 uppercase tracking-tight`}>{r.sub}</p>
                    </div>
                    <span className="text-base font-black italic tracking-tighter" style={{ color: accentColor }}>{r.price}</span>
                  </div>
                ))}
                <div className={`p-4 rounded-2xl ${isDarkMode ? 'bg-black/40' : 'bg-white/40'} border ${borderClasses} mt-4`}>
                    <p className="text-[9px] font-black uppercase tracking-widest leading-relaxed opacity-60">
                      * Usage fees for advertising and buyouts are calculated based on market, medium, and duration.
                    </p>
                </div>
              </div>
            </div>

            {/* Logistics Column */}
            <div className={`p-8 rounded-[3rem] border ${borderClasses} ${isDarkMode ? 'bg-white/5' : 'bg-black/5'} flex flex-col`}>
              <div className="flex items-center gap-4 mb-8">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>
                  <Globe className="w-6 h-6" />
                </div>
                <h4 style={{ fontFamily, fontWeight: fontWeight?.value || '900' }} className="text-lg font-black uppercase tracking-widest">Booking Logistics</h4>
              </div>
              <div className="space-y-8 flex-1">
                <div className="flex gap-4">
                  <Clock className="w-5 h-5 shrink-0 opacity-40" />
                  <div>
                    <h5 className="text-[11px] font-black uppercase tracking-widest mb-1.5">Advance Notice</h5>
                    <p className="text-[10px] font-bold opacity-50 uppercase leading-relaxed">Bookings typically require 14 days lead time for coordination.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <MapPin className="w-5 h-5 shrink-0 opacity-40" />
                  <div>
                    <h5 className="text-[11px] font-black uppercase tracking-widest mb-1.5">Travel & Lodging</h5>
                    <p className="text-[10px] font-bold opacity-50 uppercase leading-relaxed">International bookings require business-class travel and standard per diems.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <FileText className="w-5 h-5 shrink-0 opacity-40" />
                  <div>
                    <h5 className="text-[11px] font-black uppercase tracking-widest mb-1.5">Cancellation Policy</h5>
                    <p className="text-[10px] font-bold opacity-50 uppercase leading-relaxed">100% refund with 72h+ notice. 50% fee within 48h of call time.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="inquire" className="mt-48 mb-64 pt-24">
          <div className={`p-10 md:p-20 rounded-[4rem] text-left border shadow-2xl transition-all duration-700 ${glassClasses}`} style={{ borderColor: `${accentColor}30` }}>
            <div className="flex flex-col lg:flex-row gap-16">
              <div className="flex-1">
                <Mail className="w-12 h-12 mb-8 opacity-20" />
                <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6 italic" style={{ fontFamily, fontWeight: fontWeight?.value || '900', color: h1Color }}>Inquire.</h3>
                <p className={`text-base leading-relaxed ${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'} font-medium max-w-sm`}>
                  For bookings, editorial campaigns, and collaborative inquiries, please provide comprehensive details regarding your project scope, timeline, and expectations.
                </p>
              </div>
              <div className="flex-[1.5]">
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-[10px] opacity-40 uppercase tracking-[0.3em] font-black mb-3 block">From (Name / Agency)</label>
                      <input type="text" placeholder="Your Name or Representing Agency" className={`w-full p-5 text-sm font-medium rounded-2xl border focus:outline-none transition-colors ${isDarkMode ? 'bg-black/40 border-white/10 text-white focus:border-white/30' : 'bg-white/40 border-black/10 text-black focus:border-black/30'}`} />
                    </div>
                    <div>
                      <label className="text-[10px] opacity-40 uppercase tracking-[0.3em] font-black mb-3 block">Official Email</label>
                      <input type="email" placeholder="contact@agency.com" className={`w-full p-5 text-sm font-medium rounded-2xl border focus:outline-none transition-colors ${isDarkMode ? 'bg-black/40 border-white/10 text-white focus:border-white/30' : 'bg-white/40 border-black/10 text-black focus:border-black/30'}`} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-[10px] opacity-40 uppercase tracking-[0.3em] font-black mb-3 block">Project Type</label>
                      <select className={`w-full lg:appearance-none p-5 text-sm font-medium rounded-2xl border focus:outline-none transition-colors ${isDarkMode ? 'bg-black/40 border-white/10 text-white focus:border-white/30' : 'bg-white/40 border-black/10 text-black focus:border-black/30'}`}>
                        <option value="editorial">Editorial / High Fashion</option>
                        <option value="commercial">Commercial Campaign</option>
                        <option value="runway">Runway / Show</option>
                        <option value="collaboration">Creative Collaboration</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] opacity-40 uppercase tracking-[0.3em] font-black mb-3 block">Proposed Dates & Location</label>
                      <input type="text" placeholder="e.g. Oct 12-14, Paris" className={`w-full p-5 text-sm font-medium rounded-2xl border focus:outline-none transition-colors ${isDarkMode ? 'bg-black/40 border-white/10 text-white focus:border-white/30' : 'bg-white/40 border-black/10 text-black focus:border-black/30'}`} />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] opacity-40 uppercase tracking-[0.3em] font-black mb-3 block">Detailed Brief & Scope</label>
                    <textarea placeholder="Outline the creative concept, deliverables, usage rights needed, and estimated budget/rate." rows={5} className={`w-full p-5 text-sm font-medium rounded-2xl border focus:outline-none resize-none transition-colors ${isDarkMode ? 'bg-black/40 border-white/10 text-white focus:border-white/30' : 'bg-white/40 border-black/10 text-black focus:border-black/30'}`}></textarea>
                  </div>
                  <button type="button" className={`w-full py-6 mt-4 rounded-full text-[11px] font-black uppercase tracking-[0.4em] transition-all shadow-2xl hover:scale-[1.02] active:scale-[0.98]`} style={{ backgroundColor: accentColor, color: '#ffffff' }}>Submit Inquiry</button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className={`py-24 px-8 border-t border-neutral-800/10 opacity-30 text-[11px] font-black uppercase tracking-[0.5em] text-center`}>© MARIA STEVENS 2025 — ELITE MANAGEMENT</footer>
      
      {/* Modals & Syncing Status */}
      <AnimatePresence>
        {syncStatus !== 'idle' && (
          <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -50, opacity: 0 }} className="fixed top-24 right-8 z-[110] flex items-center gap-3 px-6 py-3 rounded-full bg-black/80 backdrop-blur-2xl border border-white/10 text-[10px] uppercase font-black tracking-widest text-white shadow-2xl">
            {syncStatus === 'syncing' ? <RefreshCw className="w-3 h-3 animate-spin" /> : syncStatus === 'saved' ? <Check className="w-3 h-3 text-green-400" /> : <CloudOff className="w-3 h-3 text-red-400" />}
            {syncStatus === 'syncing' ? 'Cloud Syncing...' : syncStatus === 'saved' ? 'Saved' : 'Error'}
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>{selectedImage && <ImageModal image={selectedImage} isDarkMode={isDarkMode} onClose={() => setSelectedImage(null)} fontFamily={fontFamily} fontWeight={fontWeight} />}</AnimatePresence>
      <AnimatePresence>{imageToRemove && <ConfirmRemoveModal image={imageToRemove} onConfirm={confirmRemoval} onCancel={() => setImageToRemove(null)} isDarkMode={isDarkMode} fontFamily={fontFamily} fontWeight={fontWeight} />}</AnimatePresence>
    </div>
  );
};

// --- CORE REORDERING LOGIC ---

const SortableItem = ({ children, id, index, spanClass }: any) => {
  const { ref, handleRef, isDragging } = useSortable({ id, index });
  return (
    <motion.div ref={ref} layout data-id={id} className={`${spanClass} gallery-item h-full w-full relative group`} style={{ opacity: isDragging ? 0.7 : 1, zIndex: isDragging ? 99 : 1, scale: isDragging ? 1.05 : 1 }}>
        {children(handleRef)}
    </motion.div>
  );
};

const EdgeResizeHandle = ({ side, onResize }: { side: 'left' | 'right' | 'top' | 'bottom', onResize: (delta: number) => void }) => {
    const isVertical = side === 'top' || side === 'bottom';
    
    const handlePointerDown = (e: React.PointerEvent) => {
        e.preventDefault();
        e.stopPropagation();
        let startPos = isVertical ? e.clientY : e.clientX;
        
        const handlePointerMove = (moveEvent: PointerEvent) => {
            const currentPos = isVertical ? moveEvent.clientY : moveEvent.clientX;
            const delta = currentPos - startPos;
            // Rows are shorter (~220px vs ~300px cols), so we use a more sensitive threshold for vertical snapping
            const threshold = isVertical ? 60 : 100;
            let gridDelta = Math.round(delta / threshold);
            
            if (side === 'left' || side === 'top') gridDelta = -gridDelta;
            
            if (gridDelta !== 0) {
               onResize(gridDelta);
               startPos = currentPos;
            }
        };
        
        const handlePointerUp = () => {
            window.removeEventListener('pointermove', handlePointerMove);
            window.removeEventListener('pointerup', handlePointerUp);
        };
        
        window.addEventListener('pointermove', handlePointerMove);
        window.addEventListener('pointerup', handlePointerUp);
    };

    const containerClasses = isVertical 
        ? `absolute left-20 right-20 ${side}-0 h-10 cursor-ns-resize`
        : `absolute top-20 bottom-20 ${side}-0 w-10 cursor-ew-resize`;

    return (
        <div 
            onPointerDown={handlePointerDown}
            className={`${containerClasses} z-40 opacity-0 group-hover:opacity-100 hover:bg-white/30 transition-all pointer-events-auto flex items-center justify-center`}
        >
            <div className={isVertical ? "h-1.5 w-12 rounded-full bg-white/60 shadow-[0_0_10px_rgba(255,255,255,0.3)]" : "w-1.5 h-12 rounded-full bg-white/60 shadow-[0_0_10px_rgba(255,255,255,0.3)]"} />
        </div>
    );
};

const PortfolioCard = ({ img, isDarkMode, onClick, isDraggable, onRemove, onCycleSize, onUpdateSize, onToggleFocus, handleRef, fontFamily, fontWeight }: any) => (
  <div className={`group relative overflow-hidden rounded-[3rem] w-full h-full ${isDarkMode ? 'bg-neutral-900 border-white/10' : 'bg-white border-black/5'} border shadow-sm transition-all duration-700 ${img.isStarred ? 'ring-2 ring-white/20' : ''}`}>
    {isDraggable && onUpdateSize && (
      <>
        <EdgeResizeHandle side="left" onResize={(d) => onUpdateSize('col', d)} />
        <EdgeResizeHandle side="right" onResize={(d) => onUpdateSize('col', d)} />
        {/* Row height is now controlled by buttons for more precision */}
      </>
    )}
    <div onClick={onClick} className="w-full h-full cursor-zoom-in relative">
        {img.url.endsWith('.mp4') ? (
          <motion.video layout src={img.url} autoPlay loop muted playsInline className="w-full h-full object-cover pointer-events-none transition-all duration-1000 group-hover:scale-110" style={{ filter: isDarkMode ? 'grayscale(0.7)' : 'none' }} />
        ) : (
          <motion.img layout src={img.url} alt={img.title} className="w-full h-full object-cover pointer-events-none transition-all duration-1000 group-hover:scale-110" style={{ filter: isDarkMode ? 'grayscale(0.7)' : 'none' }} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-12 pointer-events-none"><span className="text-[10px] text-white/40 uppercase tracking-[0.4em] font-black mb-2" style={{ fontFamily }}>{img.category}</span><h3 style={{ fontFamily, fontWeight: fontWeight?.value || '900' }} className="text-2xl font-black uppercase tracking-widest text-white leading-tight">{img.title}</h3></div>
    </div>
    <div className="absolute top-8 left-8 right-8 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-3 group-hover:translate-y-0 z-20 pointer-events-none">
        <div className="flex gap-2 pointer-events-auto">
            {isDraggable && handleRef && <div ref={handleRef} style={{ touchAction: 'none' }} className="bg-black/60 cursor-grab active:cursor-grabbing backdrop-blur-2xl p-4 rounded-2xl border border-white/10 shadow-2xl"><GripVertical className="w-4 h-4 text-white pointer-events-none" /></div>}
            {isDraggable && onToggleFocus && (
              <button 
                onClick={(e) => { e.stopPropagation(); onToggleFocus(); }} 
                className={`transition-all p-4 rounded-2xl border border-white/10 shadow-2xl ${img.isStarred ? 'bg-white text-black' : 'bg-black/60 text-white hover:bg-black/80'}`}
              >
                <Target className="w-4 h-4" />
              </button>
            )}
            {isDraggable && onCycleSize && <button onClick={(e) => { e.stopPropagation(); onCycleSize(); }} className="bg-black/60 hover:bg-black/80 backdrop-blur-2xl p-4 rounded-2xl border border-white/10 shadow-2xl transition-all"><Maximize2 className="w-4 h-4 text-white" /></button>}
        </div>
        <button onClick={(e) => { e.stopPropagation(); onRemove(); }} className="bg-red-500/80 hover:bg-red-600 backdrop-blur-2xl p-4 rounded-2xl border border-white/10 shadow-2xl transition-all scale-90 hover:scale-100 pointer-events-auto"><Trash2 className="w-4 h-4 text-white" /></button>
    </div>

    {/* Height Controls - Intuitive +/- logic */}
    {isDraggable && onUpdateSize && (
      <div className="absolute bottom-8 right-8 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-3 group-hover:translate-x-0 z-20 pointer-events-auto">
        <button 
          onClick={(e) => { e.stopPropagation(); onUpdateSize('row', 1); }}
          className="bg-white/10 hover:bg-white/20 backdrop-blur-md p-3 rounded-xl border border-white/10 text-white transition-all active:scale-95"
          title="Increase Height"
        >
          <Plus className="w-4 h-4" />
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); onUpdateSize('row', -1); }}
          className="bg-white/10 hover:bg-white/20 backdrop-blur-md p-3 rounded-xl border border-white/10 text-white transition-all active:scale-95"
          title="Decrease Height"
        >
          <Minus className="w-4 h-4" />
        </button>
      </div>
    )}
  </div>
);

const ImageModal = ({ image, onClose, isDarkMode, fontFamily, fontWeight }: any) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-black/98 backdrop-blur-md flex items-center justify-center p-8" onClick={onClose}>
    <motion.div initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative max-w-6xl w-full flex flex-col items-center gap-12" onClick={e => e.stopPropagation()}>
      {image.url.endsWith('.mp4') ? (
        <video src={image.url} autoPlay loop muted playsInline className="max-w-full max-h-[70vh] object-contain rounded-[4rem] shadow-[0_0_120px_rgba(255,255,255,0.1)] border border-white/5" />
      ) : (
        <img src={image.url} className="max-w-full max-h-[70vh] object-contain rounded-[4rem] shadow-[0_0_120px_rgba(255,255,255,0.1)] border border-white/5" alt={image.title} />
      )}
      <div className="text-center"><span className="text-white/20 text-[11px] uppercase tracking-[0.8em] mb-4 block font-black" style={{ fontFamily }}>{image.photoshoot}</span><h3 style={{ fontFamily, fontWeight: fontWeight?.value || '900' }} className="text-6xl font-black uppercase tracking-tighter text-white drop-shadow-2xl">{image.title}</h3></div>
      <button onClick={onClose} className="mt-4 px-16 py-6 bg-white text-black rounded-full text-[11px] font-black uppercase tracking-[0.4em] shadow-2xl hover:scale-105 active:scale-95 transition-all" style={{ fontFamily }}>Dismiss View</button>
    </motion.div>
  </motion.div>
);

const ConfirmRemoveModal = ({ image, onConfirm, onCancel, isDarkMode, fontFamily, fontWeight }: any) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[300] bg-black/80 backdrop-blur-2xl flex items-center justify-center p-8">
    <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className={`max-w-lg w-full p-12 rounded-[4rem] border shadow-[0_40px_100px_rgba(0,0,0,0.8)] ${isDarkMode ? 'bg-black/90 border-white/10 text-white' : 'bg-white border-black/5 text-black'}`}>
        <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-[2rem] bg-red-500/10 flex items-center justify-center mb-8"><AlertTriangle className="w-10 h-10 text-red-500" /></div>
            <h3 style={{ fontFamily, fontWeight: fontWeight?.value || '900' }} className="text-3xl font-black uppercase tracking-tighter mb-4 italic">Curation Decision.</h3>
            <p className="text-base opacity-60 mb-12 leading-relaxed">You are about to remove <span className="font-bold underline italic text-red-500">{image.title}</span> from the active gallery.</p>
            <div className="grid grid-cols-2 gap-5 w-full"><button onClick={onCancel} className={`py-6 rounded-full text-[11px] font-black uppercase tracking-widest border transition-all ${isDarkMode ? 'border-white/10 hover:bg-white/10' : 'border-black/5 hover:bg-black/5'}`}>Cancel</button><button onClick={onConfirm} className="py-6 rounded-full text-[11px] font-black uppercase tracking-widest bg-red-600 text-white hover:bg-red-700 transition-all shadow-xl shadow-red-600/20">Delete Item</button></div>
        </div>
    </motion.div>
  </motion.div>
);

export default App;