"use client";

import React, { useState, useRef, useEffect } from "react";
import { Zap } from 'lucide-react';

interface IconProps {
  size: number;
  strokeWidth: number;
  color?: string;
}

interface IconEntry {
  name: string;
  Component: React.FC<IconProps>;
}

// --- CUSTOM HIGH-FASHION LINE ART ICONS ---
const PoseIcon: React.FC<IconProps> = ({ size, strokeWidth, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <circle cx="13" cy="3" r="1.2" fill={color} stroke="none" />
    <path d="M13 4.5c-1 0-2.5.5-3.5 2s-1 3-1 3" />
    <path d="M13 4.5c.8 3 0 7-2 9" />
    <path d="M11 13.5c-2 3-5 5-6 9.5h14c-1-5-4-7-6-9.5" />
    <path d="M11 15l1 7" opacity="0.3" strokeWidth={strokeWidth * 0.8} />
    <path d="M11 7.5l3.5 1.5-1 4" />
  </svg>
);

const InstagramIcon: React.FC<IconProps> = ({ size, strokeWidth, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <path d="M17.5 6.5h.01" />
  </svg>
);

const FacebookIcon: React.FC<IconProps> = ({ size, strokeWidth, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 4h-3a4 4 0 00-4 4v12M6 12h8" />
  </svg>
);

const TikTokIcon: React.FC<IconProps> = ({ size, strokeWidth, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12a4 4 0 104 4V2a5 5 0 005 5v3a8 8 0 01-5-3v9" />
  </svg>
);

const XIcon: React.FC<IconProps> = ({ size, strokeWidth, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4l6 8m6-8l-12 16m16 0l-6-8" />
  </svg>
);

const YouTubeIcon: React.FC<IconProps> = ({ size, strokeWidth, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="6" width="20" height="12" rx="3" />
    <path d="M10 9.5l5 2.5-5 2.5v-5z" />
  </svg>
);

const PinterestIcon: React.FC<IconProps> = ({ size, strokeWidth, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 21v-8c0-2 1.5-3.5 3-3.5 1.5 0 2.5 1 2.5 2.5 0 2-1.5 3.5-3 3.5-1 0-1.5-.5-1.5-1.5" />
  </svg>
);

const EditorialIcon: React.FC<IconProps> = ({ size, strokeWidth, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 4v12a2 2 0 0 0 2 2h10" />
    <path d="M16 20V8a2 2 0 0 0-2-2H4" />
  </svg>
);

const CommercialIcon: React.FC<IconProps> = ({ size, strokeWidth, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 8h12l-1 12H7L6 8Z" />
    <path d="M9 8V5a3 3 0 0 1 6 0v3" />
  </svg>
);

const BridalIcon: React.FC<IconProps> = ({ size, strokeWidth, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 6C10.5 5 11.5 5 12 6C12.5 5 13.5 5 15 6C16 8 15.5 11 14.5 13C16.5 16 18.5 20 18.5 22H5.5C5.5 20 7.5 16 9.5 13C8.5 11 8 8 9 6Z" />
    <path d="M12 13v9" />
    <path d="M9.5 14.5l-1.5 7.5" />
    <path d="M14.5 14.5l1.5 7.5" />
  </svg>
);

const SwimIcon: React.FC<IconProps> = ({ size, strokeWidth, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 10c3-3 6-3 9 0s6 3 9 0" />
    <path d="M2 15c3-3 6-3 9 0s6 3 9 0" />
  </svg>
);

const ActiveWearIcon: React.FC<IconProps> = ({ size, strokeWidth, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="13" r="8" />
    <path d="M12 9v4l2 2" />
    <path d="M10 3h4" />
  </svg>
);

const LifestyleIcon: React.FC<IconProps> = ({ size, strokeWidth, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="7" width="18" height="12" rx="2" />
    <circle cx="12" cy="13" r="3" />
    <path d="M8 7V5a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2" />
  </svg>
);

const HighFashionIcon: React.FC<IconProps> = ({ size, strokeWidth, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2 2-6z" />
  </svg>
);

const BeautyIcon: React.FC<IconProps> = ({ size, strokeWidth, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12h6v8H9v-8Z" />
    <path d="M10 12V7l2-3 2 3v5" />
    <path d="M7 20h10" />
  </svg>
);

const PortraitIcon: React.FC<IconProps> = ({ size, strokeWidth, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" />
    <path d="M6 20v-2a6 6 0 1 1 12 0v2" />
  </svg>
);

const RunwayIcon: React.FC<IconProps> = ({ size, strokeWidth, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 22L10 2h4l5 20" />
    <path d="M12 2v20" />
  </svg>
);

const StreetStyleIcon: React.FC<IconProps> = ({ size, strokeWidth, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="10" width="7" height="5" rx="1" />
    <rect x="14" y="10" width="7" height="5" rx="1" />
    <path d="M10 12h4" />
    <path d="M3 10l-1-2" />
    <path d="M21 10l1-2" />
  </svg>
);

const EdgyIcon: React.FC<IconProps> = ({ size, strokeWidth, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 16A3 3 0 1 0 6 20l12-12a2 2 0 0 0-3-3L6 14" />
  </svg>
);

const UrbanIcon: React.FC<IconProps> = ({ size, strokeWidth, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 20V10l4-4 4 4v10" />
    <path d="M12 14h4v6" />
    <path d="M16 20v-8h4v8" />
  </svg>
);

const WebPortfolioIcon: React.FC<IconProps> = ({ size, strokeWidth, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-500 group-hover:rotate-12">
    <path d="M4 22L10 6h4l6 16" />
    <path d="M10 6L12 3l2 3" opacity="0.4" />
    <circle cx="12" cy="7.5" r="1.2" fill={color} stroke="none" />
    <path d="M12 9c-0.8 0-1.5 0.5-2 1.5s-0.5 2.5-0.5 2.5" opacity="0.8" />
    <path d="M12 9c.5 2 0 4.5-1 6" opacity="0.8" />
    <path d="M2 4l4 2" opacity="0.3" />
    <path d="M22 4l-4 2" opacity="0.3" />
  </svg>
);

const CompositeCardIcon: React.FC<IconProps> = ({ size, strokeWidth, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-500 group-hover:-rotate-12">
    <rect x="4" y="2" width="16" height="20" rx="1" />
    <path d="M4 13h16" />
    <path d="M9 13v9" />
    <path d="M15 13v9" />
    <path d="M4 17.5h16" />
    <circle cx="12" cy="7" r="1" fill={color} stroke="none" />
    <path d="M12 8.5c-0.5 0-1 0.2-1.5 0.8s-0.5 1.2-0.5 1.2" opacity="0.6" />
    <path d="M12 8.5c0.4 1.2 0 2.5-0.8 3.5" opacity="0.6" />
  </svg>
);

// --- ICON CARD COMPONENT ---
interface IconCardProps {
  icon: IconEntry;
  size: number;
  strokeWidth: number;
  color: string;
}

const IconCard: React.FC<IconCardProps> = ({ icon, size, strokeWidth, color }) => {
  const [copied, setCopied] = useState(false);
  const svgWrapperRef = useRef<HTMLDivElement>(null);

  const handleCopy = async () => {
    if (svgWrapperRef.current) {
      const svgCode = svgWrapperRef.current.innerHTML;
      try {
        await navigator.clipboard.writeText(svgCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        // Fallback for non-secure contexts
        const textArea = document.createElement('textarea');
        textArea.value = svgCode;
        textArea.style.cssText = 'position:fixed;top:0;left:0;opacity:0';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

  return (
    <div
      onClick={handleCopy}
      className="relative flex flex-col items-center justify-center p-12 border border-gray-100 hover:border-black transition-all duration-300 group cursor-pointer bg-white overflow-hidden"
    >
      {/* Copied overlay */}
      <div className={`absolute inset-0 bg-black text-white flex flex-col items-center justify-center z-10 transition-transform duration-300 ${copied ? 'translate-y-0' : 'translate-y-full'}`}>
        <span className="text-[10px] font-bold uppercase tracking-[0.2em]">SVG Copied!</span>
      </div>

      <div
        ref={svgWrapperRef}
        className="h-[120px] flex items-center justify-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
        style={{ color }}
      >
        <icon.Component size={size} strokeWidth={strokeWidth} color={color} />
      </div>

      <span 
        className="text-[9px] font-bold uppercase tracking-[0.2em] mt-8 transition-colors duration-500"
        style={{ color: color === '#000000' || color === 'currentColor' ? undefined : color }}
      >
        {icon.name}
      </span>

      {/* Hover prompt */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="bg-gray-100 text-gray-500 text-[8px] uppercase tracking-widest px-2 py-1 rounded-full font-bold">
          Click to Copy
        </span>
      </div>
    </div>
  );
};

// --- ICON SET ---
const iconSet: IconEntry[] = [
  { name: 'Pose Logo', Component: PoseIcon },
  { name: 'Instagram', Component: InstagramIcon },
  { name: 'Facebook', Component: FacebookIcon },
  { name: 'TikTok', Component: TikTokIcon },
  { name: 'X / Twitter', Component: XIcon },
  { name: 'YouTube', Component: YouTubeIcon },
  { name: 'Pinterest', Component: PinterestIcon },
  { name: 'Editorial', Component: EditorialIcon },
  { name: 'Commercial', Component: CommercialIcon },
  { name: 'Bridal', Component: BridalIcon },
  { name: 'Swim', Component: SwimIcon },
  { name: 'Active Wear', Component: ActiveWearIcon },
  { name: 'Lifestyle', Component: LifestyleIcon },
  { name: 'High Fashion', Component: HighFashionIcon },
  { name: 'Beauty', Component: BeautyIcon },
  { name: 'Portrait', Component: PortraitIcon },
  { name: 'Runway', Component: RunwayIcon },
  { name: 'Street Style', Component: StreetStyleIcon },
  { name: 'Edgy', Component: EdgyIcon },
  { name: 'Urban', Component: UrbanIcon },
  { name: 'Web Portfolio', Component: WebPortfolioIcon },
  { name: 'Composite Card', Component: CompositeCardIcon },
];

// --- SOCIAL CANVAS ICONS & CONFIG ---
const SocialCustomIcons = {
  INSTAGRAM: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="5"></rect>
      <circle cx="12" cy="12" r="4"></circle>
      <path d="M17.5 6.5h.01"></path>
    </svg>
  ),
  FACEBOOK: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 4h-3a4 4 0 00-4 4v12M6 12h8"></path>
    </svg>
  ),
  TIKTOK: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 12a4 4 0 104 4V2a5 5 0 005 5v3a8 8 0 01-5-3v9"></path>
    </svg>
  ),
  X_TWITTER: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4l6 8m6-8l-12 16m16 0l-6-8"></path>
    </svg>
  ),
  PINTEREST: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9"></circle>
      <path d="M12 21v-8c0-2 1.5-3.5 3-3.5 1.5 0 2.5 1 2.5 2.5 0 2-1.5 3.5-3 3.5-1 0-1.5-.5-1.5-1.5"></path>
    </svg>
  ),
  YOUTUBE: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="20" height="12" rx="3"></rect>
      <path d="M10 9.5l5 2.5-5 2.5v-5z"></path>
    </svg>
  ),
};

const SOCIAL_CONFIG = [
  { id: 'instagram', name: 'Instagram', handle: '@creative.pulse', svg: SocialCustomIcons.INSTAGRAM, brandColor: 'group-hover:text-pink-500', glowColor: 'rgba(236, 72, 153, 0.15)' },
  { id: 'facebook', name: 'Facebook', handle: '/creativepulse', svg: SocialCustomIcons.FACEBOOK, brandColor: 'group-hover:text-blue-600', glowColor: 'rgba(37, 99, 235, 0.15)' },
  { id: 'tiktok', name: 'TikTok', handle: '@creative_pulse', svg: SocialCustomIcons.TIKTOK, brandColor: 'group-hover:text-black dark:group-hover:text-white', glowColor: 'rgba(100, 116, 139, 0.2)' },
  { id: 'x', name: 'X / Twitter', handle: '@CreativePulse', svg: SocialCustomIcons.X_TWITTER, brandColor: 'group-hover:text-black dark:group-hover:text-white', glowColor: 'rgba(100, 116, 139, 0.2)' },
  { id: 'pinterest', name: 'Pinterest', handle: '@creativepulse', svg: SocialCustomIcons.PINTEREST, brandColor: 'group-hover:text-red-600', glowColor: 'rgba(220, 38, 38, 0.15)' },
  { id: 'youtube', name: 'YouTube', handle: '@CreativePulseStudio', svg: SocialCustomIcons.YOUTUBE, brandColor: 'group-hover:text-red-500', glowColor: 'rgba(239, 68, 68, 0.15)' },
];

const InteractiveCard = ({ icon, index, isMounted }: { icon: typeof SOCIAL_CONFIG[0], index: number, isMounted: boolean }) => {
  const [transform, setTransform] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -12; 
    const rotateY = ((x - centerX) / centerX) * 12;
    setTransform(`perspective(500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`);
  };

  const handleMouseLeave = () => {
    setTransform('');
    setIsHovered(false);
  };

  const delayStr = isMounted ? '0ms' : `${index * 50}ms`;

  return (
    <a
      href={`#${icon.id}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`
        group relative flex items-center justify-center
        w-24 h-24 rounded-2xl bg-white dark:bg-[#24292e]
        shadow-[0_4px_20px_rgb(0,0,0,0.03)] dark:shadow-[0_4px_20px_rgb(0,0,0,0.2)]
        border border-slate-100 dark:border-slate-800/80
        text-[#666666] dark:text-slate-400
        transition-all duration-300 ease-out cursor-pointer
        will-change-transform no-print
      `}
      style={{
        opacity: isMounted ? 1 : 0,
        transform: isMounted 
          ? (transform || 'perspective(500px) rotateX(0deg) rotateY(0deg) scale(1) translateY(0px)')
          : 'translateY(20px) scale(0.95)',
        transition: transform 
          ? 'transform 0.1s ease-out 0ms' 
          : `transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1) ${delayStr}, opacity 0.5s ease-out ${delayStr}`,
        zIndex: isHovered ? 10 : 1,
        boxShadow: isHovered 
          ? `0 20px 40px -10px ${icon.glowColor}, 0 0 0 1px ${icon.glowColor}` 
          : undefined
      }}
    >
      <div className={`transition-colors duration-300 ${icon.brandColor}`}>
        {icon.svg}
      </div>
      <div className="absolute -bottom-14 flex flex-col items-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 pointer-events-none">
        <span className="text-[11px] font-bold uppercase tracking-widest text-slate-700 dark:text-slate-300 whitespace-nowrap">
          {icon.name}
        </span>
        <span className="text-[10px] font-medium tracking-wide text-slate-400 dark:text-slate-500 whitespace-nowrap mt-0.5">
          {icon.handle}
        </span>
      </div>
    </a>
  );
};

export default function PoseAndPoiseStyleGuide() {
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const guideRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // SVG Generator State
  const [strokeWidth, setStrokeWidth] = useState(1);
  const [size, setSize] = useState(48);
  const [color, setColor] = useState('#1A1A1A');

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(id);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  const handleDownloadPDF = () => {
    window.print();
  };

  const CodeBlock = ({ code, id }: { code: string, id: string }) => (
    <div 
      onClick={() => copyToClipboard(code, id)}
      style={{
        background: '#1A1A1A',
        color: '#FAF9F7',
        padding: '12px 16px',
        fontFamily: "'SF Mono', 'Fira Code', monospace",
        fontSize: '12px',
        borderRadius: '4px',
        cursor: 'pointer',
        position: 'relative',
        marginTop: '8px',
        overflowX: 'auto',
      }}
    >
      {code}
      <span style={{
        position: 'absolute',
        right: '12px',
        top: '50%',
        transform: 'translateY(-50%)',
        fontSize: '10px',
        color: '#C4A484',
        opacity: copiedItem === id ? 1 : 0.5,
      }}>
        {copiedItem === id ? '✓ Copied' : 'Click to copy'}
      </span>
    </div>
  );

  const SectionTitle = ({ children, num }: { children: React.ReactNode, num: string }) => (
    <div style={{ marginBottom: '48px' }}>
      <span style={{
        fontFamily: "'Outfit', sans-serif",
        fontSize: '11px',
        letterSpacing: '2px',
        color: '#C4A484',
      }}>{num}</span>
      <h2 style={{
        fontSize: '32px',
        fontWeight: 300,
        marginTop: '8px',
        fontFamily: "'Cormorant Garamond', Georgia, serif",
      }}>{children}</h2>
      <div style={{ width: '40px', height: '1px', background: '#C4A484', marginTop: '16px' }} />
    </div>
  );

  const colors = [
    { name: 'Cream / Background', hex: '#FAF9F7', rgb: 'rgb(250, 249, 247)', usage: 'Primary background, light sections' },
    { name: 'Charcoal / Primary', hex: '#1A1A1A', rgb: 'rgb(26, 26, 26)', usage: 'Text, buttons, dark sections' },
    { name: 'Camel / Accent', hex: '#C4A484', rgb: 'rgb(196, 164, 132)', usage: 'Highlights, CTAs, decorative elements' },
    { name: 'White', hex: '#FFFFFF', rgb: 'rgb(255, 255, 255)', usage: 'Cards, feature section background' },
  ];

  const opacities = [
    { name: 'Text Secondary', value: 'rgba(26, 26, 26, 0.7)', usage: 'Body text, descriptions' },
    { name: 'Text Tertiary', value: 'rgba(26, 26, 26, 0.6)', usage: 'Feature descriptions' },
    { name: 'Text Muted', value: 'rgba(26, 26, 26, 0.4)', usage: 'Captions, fine print' },
    { name: 'Border Light', value: 'rgba(26, 26, 26, 0.2)', usage: 'Input borders' },
    { name: 'Border Subtle', value: 'rgba(26, 26, 26, 0.05)', usage: 'Card borders' },
    { name: 'Accent Transparent', value: 'rgba(196, 164, 132, 0.3)', usage: 'Hover states' },
    { name: 'Accent Light', value: 'rgba(196, 164, 132, 0.2)', usage: 'Decorative circles' },
    { name: 'Accent Wash', value: 'rgba(196, 164, 132, 0.1)', usage: 'Decorative rectangles' },
    { name: 'Light Text Secondary', value: 'rgba(250, 249, 247, 0.6)', usage: 'Dark section body text' },
  ];

  return (
    <div ref={guideRef} style={{
      minHeight: '100vh',
      backgroundColor: '#FAF9F7',
      fontFamily: "'Cormorant Garamond', Georgia, serif",
      color: '#1A1A1A',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Outfit:wght@300;400;500&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }

        @media print {
          #pdf-download-btn { display: none !important; }
          .no-print { display: none !important; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }

        .color-swatch {
          transition: transform 0.2s ease;
        }
        .color-swatch:hover {
          transform: scale(1.02);
        }
        
        .sample-button {
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
        }
        .sample-button:hover {
          background: #C4A484;
          transform: translateY(-2px);
          box-shadow: 0 10px 40px rgba(196, 164, 132, 0.3);
        }
        
        .sample-button-accent {
          background: #C4A484;
          color: #1A1A1A;
        }
        .sample-button-accent:hover {
          background: #1A1A1A;
          color: #FAF9F7;
        }
        
        .sample-input {
          background: transparent;
          border: 1px solid rgba(26, 26, 26, 0.2);
          padding: 18px 24px;
          font-family: 'Outfit', sans-serif;
          font-size: 14px;
          width: 100%;
          max-width: 320px;
          outline: none;
          transition: border-color 0.3s ease;
        }
        .sample-input:focus {
          border-color: #C4A484;
        }
        .sample-input::placeholder {
          color: rgba(26, 26, 26, 0.4);
          letter-spacing: 1px;
        }
        
        .sample-card {
          padding: 40px;
          background: rgba(255, 255, 255, 0.6);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(26, 26, 26, 0.05);
          transition: all 0.4s ease;
        }
        .sample-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.06);
          border-color: rgba(196, 164, 132, 0.3);
        }
        
        .nav-link-sample {
          font-family: 'Outfit', sans-serif;
          font-size: 12px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #1A1A1A;
          text-decoration: none;
          transition: color 0.3s ease;
          cursor: pointer;
        }
        .nav-link-sample:hover {
          color: #C4A484;
        }

        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 14px;
          width: 14px;
          border-radius: 50%;
          background: black;
          cursor: pointer;
        }
        input[type=range]::-moz-range-thumb {
          height: 14px;
          width: 14px;
          border-radius: 50%;
          background: black;
          cursor: pointer;
          border: none;
        }
        input[type=color]::-webkit-color-swatch-wrapper {
          padding: 0;
        }
        input[type=color]::-webkit-color-swatch {
          border: 1px solid #1A1A1A;
          border-radius: 4px;
        }
      `}</style>

      {/* Header */}
      <header style={{
        padding: '48px',
        borderBottom: '1px solid rgba(26, 26, 26, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
      }}>
        {/* PDF Download Button */}
        <button
          id="pdf-download-btn"
          onClick={handleDownloadPDF}
          style={{
            position: 'absolute',
            top: '48px',
            right: '48px',
            background: '#C4A484',
            color: '#1A1A1A',
            border: 'none',
            padding: '12px 24px',
            fontFamily: "'Outfit', sans-serif",
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          Download PDF Guide
        </button>

        <p style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: '11px',
          letterSpacing: '3px',
          textTransform: 'uppercase',
          color: '#C4A484',
          marginBottom: '16px',
        }}>
          Brand Guidelines
        </p>
        <h1 style={{
          fontSize: 'clamp(36px, 5vw, 56px)',
          fontWeight: 300,
          letterSpacing: '-1px',
        }}>
          Pose & Poise
        </h1>
        <p style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: '14px',
          fontWeight: 300,
          color: 'rgba(26, 26, 26, 0.6)',
          marginTop: '16px',
        }}>
          Visual Style Guide — poseandpoise.studio
        </p>
      </header>

      <main style={{ padding: '80px 48px', maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* TYPOGRAPHY */}
        <section style={{ marginBottom: '120px' }}>
          <SectionTitle num="01">Typography</SectionTitle>
          
          {/* Font Families */}
          <div style={{ marginBottom: '64px' }}>
            <h3 style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '12px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              marginBottom: '24px',
              color: 'rgba(26, 26, 26, 0.6)',
            }}>Font Families</h3>
            
            <div style={{ display: 'grid', gap: '32px' }}>
              <div style={{ padding: '32px', background: '#fff', border: '1px solid rgba(26,26,26,0.05)' }}>
                <p style={{ fontSize: '48px', fontWeight: 300, marginBottom: '16px' }}>
                  Cormorant Garamond
                </p>
                <p style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '13px',
                  color: 'rgba(26, 26, 26, 0.5)',
                  marginBottom: '16px',
                }}>Primary / Display / Headlines</p>
                <CodeBlock 
                  code={`font-family: 'Cormorant Garamond', Georgia, serif;`} 
                  id="font-primary" 
                />
                <div style={{ marginTop: '24px', display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
                  <span style={{ fontWeight: 300 }}>Light 300</span>
                  <span style={{ fontWeight: 400 }}>Regular 400</span>
                  <span style={{ fontWeight: 500 }}>Medium 500</span>
                  <span style={{ fontWeight: 600 }}>SemiBold 600</span>
                  <span style={{ fontStyle: 'italic', fontWeight: 300 }}><em>Light Italic</em></span>
                  <span style={{ fontStyle: 'italic', fontWeight: 400 }}><em>Regular Italic</em></span>
                </div>
              </div>
              
              <div style={{ padding: '32px', background: '#fff', border: '1px solid rgba(26,26,26,0.05)' }}>
                <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '48px', fontWeight: 300, marginBottom: '16px' }}>
                  Outfit
                </p>
                <p style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '13px',
                  color: 'rgba(26, 26, 26, 0.5)',
                  marginBottom: '16px',
                }}>Secondary / Body / UI Elements</p>
                <CodeBlock 
                  code={`font-family: 'Outfit', sans-serif;`} 
                  id="font-secondary" 
                />
                <div style={{ marginTop: '24px', display: 'flex', gap: '32px', fontFamily: "'Outfit', sans-serif", flexWrap: 'wrap' }}>
                  <span style={{ fontWeight: 300 }}>Light 300</span>
                  <span style={{ fontWeight: 400 }}>Regular 400</span>
                  <span style={{ fontWeight: 500 }}>Medium 500</span>
                </div>
              </div>
            </div>
            
            <div style={{ marginTop: '24px' }}>
              <CodeBlock 
                code={`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Outfit:wght@300;400;500&display=swap');`} 
                id="font-import" 
              />
            </div>
          </div>

          {/* Type Scale */}
          <div>
            <h3 style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '12px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              marginBottom: '24px',
              color: 'rgba(26, 26, 26, 0.6)',
            }}>Type Scale</h3>
            
            <div style={{ display: 'grid', gap: '24px' }}>
              {[
                { name: 'Hero H1', size: 'clamp(48px, 8vw, 96px)', weight: 300, line: 1.05, spacing: '-1px', font: 'display' },
                { name: 'Section H2', size: 'clamp(36px, 6vw, 64px)', weight: 300, line: 1.15, spacing: '0', font: 'display' },
                { name: 'Feature H2', size: 'clamp(36px, 5vw, 56px)', weight: 300, line: 1.15, spacing: '0', font: 'display' },
                { name: 'Card H3', size: '24px', weight: 400, line: 1.3, spacing: '0', font: 'display' },
                { name: 'Logo / Brand', size: '18px', weight: 300, line: 1.4, spacing: '4px', font: 'display', transform: 'uppercase' },
                { name: 'Body Large', size: '17px', weight: 300, line: 1.8, spacing: '0', font: 'body' },
                { name: 'Body', size: '15px-16px', weight: 300, line: 1.7, spacing: '0', font: 'body' },
                { name: 'Body Small', size: '14px', weight: 300, line: 1.7, spacing: '0', font: 'body' },
                { name: 'Label / Overline', size: '12px', weight: 400, line: 1.4, spacing: '4px', font: 'body', transform: 'uppercase' },
                { name: 'Caption / Fine Print', size: '12px', weight: 400, line: 1.4, spacing: '0', font: 'body' },
                { name: 'Micro Label', size: '11px', weight: 400, line: 1.4, spacing: '2px', font: 'body', transform: 'uppercase' },
              ].map((type, i) => (
                <div key={i} style={{
                  display: 'grid',
                  gridTemplateColumns: '200px 1fr',
                  gap: '24px',
                  alignItems: 'center',
                  padding: '16px 0',
                  borderBottom: '1px solid rgba(26,26,26,0.05)',
                }}>
                  <div>
                    <p style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: '13px',
                      fontWeight: 500,
                      marginBottom: '4px',
                    }}>{type.name}</p>
                    <p style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: '11px',
                      color: 'rgba(26, 26, 26, 0.4)',
                    }}>
                      {type.size} / {type.weight} / {type.line} / {type.spacing}
                    </p>
                  </div>
                  <p style={{
                    fontFamily: type.font === 'display' ? "'Cormorant Garamond', Georgia, serif" : "'Outfit', sans-serif",
                    fontSize: type.size.includes('clamp') ? '32px' : type.size,
                    fontWeight: type.weight,
                    lineHeight: type.line,
                    letterSpacing: type.spacing,
                    textTransform: type.transform as any || 'none',
                  }}>
                    {type.transform === 'uppercase' ? 'THE QUICK BROWN FOX' : 'The quick brown fox jumps over the lazy dog'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SPACING & LAYOUT */}
        <section style={{ marginBottom: '120px' }}>
          <SectionTitle num="02">Spacing & Layout</SectionTitle>
          
          <div style={{ marginBottom: '64px' }}>
            <h3 style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '12px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              marginBottom: '24px',
              color: 'rgba(26, 26, 26, 0.6)',
            }}>Padding & Margins</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
              {[
                { name: 'xs', value: '8px', tw: '2' },
                { name: 'sm', value: '16px', tw: '4' },
                { name: 'md', value: '24px', tw: '6' },
                { name: 'lg', value: '32px', tw: '8' },
                { name: 'xl', value: '40px', tw: '10' },
                { name: '2xl', value: '48px', tw: '12' },
                { name: '3xl', value: '80px', tw: '20' },
                { name: '4xl', value: '120px', tw: '30' },
                { name: '5xl', value: '140px', tw: '35' },
              ].map((space, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px', borderBottom: '1px solid rgba(26,26,26,0.05)', paddingBottom: '16px' }}>
                  <div style={{ width: space.value, height: '24px', background: '#C4A484', opacity: 0.5 }} />
                  <div>
                    <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '14px', fontWeight: 500 }}>{space.name} ({space.value})</p>
                    <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '11px', color: 'rgba(26, 26, 26, 0.4)' }}>Tailwind: p-{space.tw} / m-{space.tw}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '12px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              marginBottom: '24px',
              color: 'rgba(26, 26, 26, 0.6)',
            }}>Component Sizing</h3>
            <div style={{ display: 'grid', gap: '24px' }}>
              <div style={{ padding: '24px', background: '#fff', border: '1px solid rgba(26,26,26,0.05)' }}>
                <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>Input Fields</p>
                <CodeBlock code={`padding: 18px 24px; /* Tailwind: px-[24px] py-[18px] or px-6 py-[18px] */`} id="input-sizing" />
              </div>
              <div style={{ padding: '24px', background: '#fff', border: '1px solid rgba(26,26,26,0.05)' }}>
                <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>Buttons</p>
                <CodeBlock code={`padding: 24px 48px; /* Tailwind: px-[48px] py-[24px] or px-12 py-6 */`} id="button-sizing" />
              </div>
              <div style={{ padding: '24px', background: '#fff', border: '1px solid rgba(26,26,26,0.05)' }}>
                <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>Auth Forms Layout</p>
                <CodeBlock code={`max-width: 400px; padding: 48px 24px; /* No outer card component! Transparent column */`} id="auth-sizing" />
              </div>
            </div>
          </div>
        </section>

        {/* COLORS */}
        <section style={{ marginBottom: '120px' }}>
          <SectionTitle num="03">Colors</SectionTitle>
          
          {/* Primary Colors */}
          <div style={{ marginBottom: '64px' }}>
            <h3 style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '12px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              marginBottom: '24px',
              color: 'rgba(26, 26, 26, 0.6)',
            }}>Primary Palette</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
              {colors.map((color, i) => (
                <div 
                  key={i} 
                  className="color-swatch"
                  style={{ 
                    background: '#fff',
                    border: '1px solid rgba(26,26,26,0.05)',
                    overflow: 'hidden',
                  }}
                >
                  <div style={{
                    height: '120px',
                    background: color.hex,
                    border: color.hex === '#FFFFFF' ? '1px solid rgba(26,26,26,0.1)' : 'none',
                  }} />
                  <div style={{ padding: '24px' }}>
                    <p style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: '14px',
                      fontWeight: 500,
                      marginBottom: '8px',
                    }}>{color.name}</p>
                    <p style={{
                      fontFamily: "'SF Mono', monospace",
                      fontSize: '13px',
                      color: 'rgba(26,26,26,0.6)',
                      marginBottom: '4px',
                    }}>{color.hex}</p>
                    <p style={{
                      fontFamily: "'SF Mono', monospace",
                      fontSize: '12px',
                      color: 'rgba(26,26,26,0.4)',
                      marginBottom: '12px',
                    }}>{color.rgb}</p>
                    <p style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: '12px',
                      color: 'rgba(26,26,26,0.5)',
                    }}>{color.usage}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Opacity Values */}
          <div>
            <h3 style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '12px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              marginBottom: '24px',
              color: 'rgba(26, 26, 26, 0.6)',
            }}>Opacity & Transparency</h3>
            
            <div style={{ display: 'grid', gap: '12px' }}>
              {opacities.map((op, i) => (
                <div key={i} style={{
                  display: 'grid',
                  gridTemplateColumns: '200px 60px 1fr auto',
                  gap: '24px',
                  alignItems: 'center',
                  padding: '16px 24px',
                  background: '#fff',
                  border: '1px solid rgba(26,26,26,0.05)',
                }}>
                  <p style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: '13px',
                    fontWeight: 500,
                  }}>{op.name}</p>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    background: op.value,
                    border: '1px solid rgba(26,26,26,0.1)',
                  }} />
                  <p style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: '12px',
                    color: 'rgba(26,26,26,0.5)',
                  }}>{op.usage}</p>
                  <code style={{
                    fontFamily: "'SF Mono', monospace",
                    fontSize: '11px',
                    color: '#C4A484',
                    background: 'rgba(196,164,132,0.1)',
                    padding: '4px 8px',
                    borderRadius: '4px',
                  }}>{op.value}</code>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SPACING */}
        <section style={{ marginBottom: '120px' }}>
          <SectionTitle num="03">Spacing</SectionTitle>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px' }}>
            <div>
              <h3 style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '12px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                marginBottom: '24px',
                color: 'rgba(26, 26, 26, 0.6)',
              }}>Padding Scale</h3>
              
              <div style={{ display: 'grid', gap: '16px' }}>
                {[
                  { name: 'Section XL', value: '140px', usage: 'CTA sections' },
                  { name: 'Section L', value: '120px', usage: 'Feature sections' },
                  { name: 'Section M', value: '80px', usage: 'Main content' },
                  { name: 'Container', value: '48px', usage: 'Page padding, nav, footer' },
                  { name: 'Card', value: '40px', usage: 'Feature cards' },
                  { name: 'Component L', value: '32px', usage: 'Large spacing' },
                  { name: 'Component M', value: '24px', usage: 'Medium spacing' },
                  { name: 'Component S', value: '16px', usage: 'Small spacing' },
                  { name: 'Element', value: '8px', usage: 'Tight spacing' },
                ].map((space, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                  }}>
                    <div style={{
                      width: '80px',
                      height: '24px',
                      background: '#C4A484',
                      opacity: 1 - (i * 0.08),
                    }} />
                    <span style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: '13px',
                      fontWeight: 500,
                      width: '100px',
                    }}>{space.name}</span>
                    <code style={{
                      fontFamily: "'SF Mono', monospace",
                      fontSize: '12px',
                      color: 'rgba(26,26,26,0.6)',
                    }}>{space.value}</code>
                    <span style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: '12px',
                      color: 'rgba(26,26,26,0.4)',
                    }}>{space.usage}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '12px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                marginBottom: '24px',
                color: 'rgba(26, 26, 26, 0.6)',
              }}>Gap Scale</h3>
              
              <div style={{ display: 'grid', gap: '16px' }}>
                {[
                  { name: 'Section Gap', value: '80px' },
                  { name: 'Grid Gap L', value: '48px' },
                  { name: 'Grid Gap M', value: '40px' },
                  { name: 'Card Gap', value: '24px' },
                  { name: 'Element Gap', value: '16px' },
                  { name: 'Tight Gap', value: '8px' },
                ].map((gap, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                  }}>
                    <span style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: '13px',
                      fontWeight: 500,
                      width: '120px',
                    }}>{gap.name}</span>
                    <code style={{
                      fontFamily: "'SF Mono', monospace",
                      fontSize: '12px',
                      color: 'rgba(26,26,26,0.6)',
                    }}>{gap.value}</code>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* COMPONENTS */}
        <section style={{ marginBottom: '120px' }}>
          <SectionTitle num="04">Components</SectionTitle>
          
          {/* Logo Brands */}
          <div style={{ marginBottom: '64px' }}>
            <h3 style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '12px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              marginBottom: '24px',
              color: 'rgba(26, 26, 26, 0.6)',
            }}>Brand Logo</h3>
                     <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '24px' }}>
              {/* Color Version */}
              <div style={{ padding: '48px', background: '#FAF9F7', border: '1px solid rgba(26,26,26,0.05)', display: 'flex', flexDirection: 'column', gap: '32px' }}>
                {/* Horizontal */}
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'color 0.5s' }}>
                      <circle cx="13" cy="3" r="1.2" fill="#C4A484" stroke="none"></circle>
                      <path d="M13 4.5c-1 0-2.5.5-3.5 2s-1 3-1 3"></path>
                      <path d="M13 4.5c.8 3 0 7-2 9"></path>
                      <path d="M11 13.5c-2 3-5 5-6 9.5h14c-1-5-4-7-6-9.5"></path>
                      <path d="M11 15l1 7" opacity="0.3" strokeWidth="0.8"></path>
                      <path d="M11 7.5l3.5 1.5-1 4"></path>
                    </svg>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '18px', fontWeight: 300, lineHeight: 1.4, letterSpacing: '4px', textTransform: 'uppercase', color: '#1A1A1A', margin: 0 }}>Pose &amp; Poise</h1>
                      <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: '11px', fontWeight: 400, lineHeight: 1.4, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(26, 26, 26, 0.6)', margin: 0 }}>Relentlessly Refined</span>
                    </div>
                  </div>
                </div>
                {/* No Subtitle */}
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '32px 0', borderTop: '1px solid rgba(26,26,26,0.05)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'color 0.5s' }}>
                      <circle cx="13" cy="3" r="1.2" fill="#C4A484" stroke="none"></circle>
                      <path d="M13 4.5c-1 0-2.5.5-3.5 2s-1 3-1 3"></path>
                      <path d="M13 4.5c.8 3 0 7-2 9"></path>
                      <path d="M11 13.5c-2 3-5 5-6 9.5h14c-1-5-4-7-6-9.5"></path>
                      <path d="M11 15l1 7" opacity="0.3" strokeWidth="0.8"></path>
                      <path d="M11 7.5l3.5 1.5-1 4"></path>
                    </svg>
                    <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '18px', fontWeight: 300, lineHeight: 1.4, letterSpacing: '4px', textTransform: 'uppercase', color: '#1A1A1A', margin: 0 }}>Pose &amp; Poise</h1>
                  </div>
                </div>
                {/* Stacked */}
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '32px 0', borderTop: '1px solid rgba(26,26,26,0.05)' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'color 0.5s' }}>
                      <circle cx="13" cy="3" r="1.2" fill="#C4A484" stroke="none"></circle>
                      <path d="M13 4.5c-1 0-2.5.5-3.5 2s-1 3-1 3"></path>
                      <path d="M13 4.5c.8 3 0 7-2 9"></path>
                      <path d="M11 13.5c-2 3-5 5-6 9.5h14c-1-5-4-7-6-9.5"></path>
                      <path d="M11 15l1 7" opacity="0.3" strokeWidth="0.8"></path>
                      <path d="M11 7.5l3.5 1.5-1 4"></path>
                    </svg>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '24px', fontWeight: 300, lineHeight: 1.4, letterSpacing: '6px', textTransform: 'uppercase', color: '#1A1A1A', margin: 0 }}>Pose &amp; Poise</h1>
                    </div>
                  </div>
                </div>
                {/* Micro */}
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '32px 0', borderTop: '1px solid rgba(26,26,26,0.05)' }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'color 0.5s' }}>
                    <circle cx="13" cy="3" r="1.2" fill="#C4A484" stroke="none"></circle>
                    <path d="M13 4.5c-1 0-2.5.5-3.5 2s-1 3-1 3"></path>
                    <path d="M13 4.5c.8 3 0 7-2 9"></path>
                    <path d="M11 13.5c-2 3-5 5-6 9.5h14c-1-5-4-7-6-9.5"></path>
                    <path d="M11 15l1 7" opacity="0.3" strokeWidth="0.8"></path>
                    <path d="M11 7.5l3.5 1.5-1 4"></path>
                  </svg>
                </div>
              </div>

              {/* B&W Version */}
              <div style={{ padding: '48px', background: '#1A1A1A', display: 'flex', flexDirection: 'column', gap: '32px' }}>
                {/* Horizontal */}
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'color 0.5s' }}>
                      <circle cx="13" cy="3" r="1.2" fill="#FFF" stroke="none"></circle>
                      <path d="M13 4.5c-1 0-2.5.5-3.5 2s-1 3-1 3"></path>
                      <path d="M13 4.5c.8 3 0 7-2 9"></path>
                      <path d="M11 13.5c-2 3-5 5-6 9.5h14c-1-5-4-7-6-9.5"></path>
                      <path d="M11 15l1 7" opacity="0.3" strokeWidth="0.8"></path>
                      <path d="M11 7.5l3.5 1.5-1 4"></path>
                    </svg>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '18px', fontWeight: 300, lineHeight: 1.4, letterSpacing: '4px', textTransform: 'uppercase', color: '#FFF', margin: 0 }}>Pose &amp; Poise</h1>
                      <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: '11px', fontWeight: 400, lineHeight: 1.4, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.6)', margin: 0 }}>Relentlessly Refined</span>
                    </div>
                  </div>
                </div>
                {/* No Subtitle */}
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '32px 0', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'color 0.5s' }}>
                      <circle cx="13" cy="3" r="1.2" fill="#FFF" stroke="none"></circle>
                      <path d="M13 4.5c-1 0-2.5.5-3.5 2s-1 3-1 3"></path>
                      <path d="M13 4.5c.8 3 0 7-2 9"></path>
                      <path d="M11 13.5c-2 3-5 5-6 9.5h14c-1-5-4-7-6-9.5"></path>
                      <path d="M11 15l1 7" opacity="0.3" strokeWidth="0.8"></path>
                      <path d="M11 7.5l3.5 1.5-1 4"></path>
                    </svg>
                    <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '18px', fontWeight: 300, lineHeight: 1.4, letterSpacing: '4px', textTransform: 'uppercase', color: '#FFF', margin: 0 }}>Pose &amp; Poise</h1>
                  </div>
                </div>
                {/* Stacked */}
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '32px 0', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'color 0.5s' }}>
                      <circle cx="13" cy="3" r="1.2" fill="#FFF" stroke="none"></circle>
                      <path d="M13 4.5c-1 0-2.5.5-3.5 2s-1 3-1 3"></path>
                      <path d="M13 4.5c.8 3 0 7-2 9"></path>
                      <path d="M11 13.5c-2 3-5 5-6 9.5h14c-1-5-4-7-6-9.5"></path>
                      <path d="M11 15l1 7" opacity="0.3" strokeWidth="0.8"></path>
                      <path d="M11 7.5l3.5 1.5-1 4"></path>
                    </svg>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '24px', fontWeight: 300, lineHeight: 1.4, letterSpacing: '6px', textTransform: 'uppercase', color: '#FFF', margin: 0 }}>Pose &amp; Poise</h1>
                    </div>
                  </div>
                </div>
                {/* Micro */}
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '32px 0', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'color 0.5s' }}>
                    <circle cx="13" cy="3" r="1.2" fill="#FFF" stroke="none"></circle>
                    <path d="M13 4.5c-1 0-2.5.5-3.5 2s-1 3-1 3"></path>
                    <path d="M13 4.5c.8 3 0 7-2 9"></path>
                    <path d="M11 13.5c-2 3-5 5-6 9.5h14c-1-5-4-7-6-9.5"></path>
                    <path d="M11 15l1 7" opacity="0.3" strokeWidth="0.8"></path>
                    <path d="M11 7.5l3.5 1.5-1 4"></path>
                  </svg>
                </div>
              </div>
            </div>
            <CodeBlock 
              code={`<!-- Standard Title Version -->
<div class="flex items-center gap-3">
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="transition-colors duration-500">
    <circle cx="13" cy="3" r="1.2" fill="#C4A484" stroke="none"></circle>
    <path d="M13 4.5c-1 0-2.5.5-3.5 2s-1 3-1 3"></path>
    <path d="M13 4.5c.8 3 0 7-2 9"></path>
    <path d="M11 13.5c-2 3-5 5-6 9.5h14c-1-5-4-7-6-9.5"></path>
    <path d="M11 15l1 7" opacity="0.3" stroke-width="0.8"></path>
    <path d="M11 7.5l3.5 1.5-1 4"></path>
  </svg>
  <div class="flex flex-col">
    <h1 class="font-medium tracking-tight leading-none uppercase" style="font-family: 'Cormorant Garamond', serif; font-size: 18px; font-weight: 300; line-height: 1.4; letter-spacing: 4px; color: #1A1A1A; margin: 0;">Pose &amp; Poise</h1>
    <span class="uppercase" style="font-family: 'Outfit', sans-serif; font-size: 11px; font-weight: 400; line-height: 1.4; letter-spacing: 2px; color: rgba(26, 26, 26, 0.6); margin: 0;">Relentlessly Refined</span>
  </div>
</div>`}
              id="logo-color-html"
            />
            <CodeBlock 
              code={`<!-- No Subtitle Version -->
<div class="flex items-center gap-3">
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="transition-colors duration-500">
    <circle cx="13" cy="3" r="1.2" fill="#C4A484" stroke="none"></circle>
    <path d="M13 4.5c-1 0-2.5.5-3.5 2s-1 3-1 3"></path>
    <path d="M13 4.5c.8 3 0 7-2 9"></path>
    <path d="M11 13.5c-2 3-5 5-6 9.5h14c-1-5-4-7-6-9.5"></path>
    <path d="M11 15l1 7" opacity="0.3" stroke-width="0.8"></path>
    <path d="M11 7.5l3.5 1.5-1 4"></path>
  </svg>
  <h1 class="font-medium tracking-tight leading-none uppercase" style="font-family: 'Cormorant Garamond', serif; font-size: 18px; font-weight: 300; line-height: 1.4; letter-spacing: 4px; color: #1A1A1A; margin: 0;">Pose &amp; Poise</h1>
</div>`}
              id="logo-no-subtitle-html"
            />
            <CodeBlock 
              code={`<!-- Stacked Version -->
<div class="flex flex-col items-center gap-4">
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="transition-colors duration-500">
    <circle cx="13" cy="3" r="1.2" fill="#C4A484" stroke="none"></circle>
    <path d="M13 4.5c-1 0-2.5.5-3.5 2s-1 3-1 3"></path>
    <path d="M13 4.5c.8 3 0 7-2 9"></path>
    <path d="M11 13.5c-2 3-5 5-6 9.5h14c-1-5-4-7-6-9.5"></path>
    <path d="M11 15l1 7" opacity="0.3" stroke-width="0.8"></path>
    <path d="M11 7.5l3.5 1.5-1 4"></path>
  </svg>
  <div class="flex flex-col items-center text-center">
    <h1 class="font-medium tracking-widest leading-none uppercase" style="font-family: 'Cormorant Garamond', serif; font-size: 24px; font-weight: 300; line-height: 1.4; letter-spacing: 6px; color: #1A1A1A; margin: 0;">Pose &amp; Poise</h1>
  </div>
</div>`}
              id="logo-stacked-html"
            />
            <CodeBlock 
              code={`<!-- Micro Version -->
<div class="flex items-center justify-center">
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="transition-colors duration-500">
    <circle cx="13" cy="3" r="1.2" fill="#C4A484" stroke="none"></circle>
    <path d="M13 4.5c-1 0-2.5.5-3.5 2s-1 3-1 3"></path>
    <path d="M13 4.5c.8 3 0 7-2 9"></path>
    <path d="M11 13.5c-2 3-5 5-6 9.5h14c-1-5-4-7-6-9.5"></path>
    <path d="M11 15l1 7" opacity="0.3" stroke-width="0.8"></path>
    <path d="M11 7.5l3.5 1.5-1 4"></path>
  </svg>
</div>`}
              id="logo-color-micro-html"
            />
            <CodeBlock 
              code={`<!-- B&W Standard Version -->
<div class="flex items-center gap-3">
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#FFF" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="transition-colors duration-500">
    <circle cx="13" cy="3" r="1.2" fill="#FFF" stroke="none"></circle>
    <path d="M13 4.5c-1 0-2.5.5-3.5 2s-1 3-1 3"></path>
    <path d="M13 4.5c.8 3 0 7-2 9"></path>
    <path d="M11 13.5c-2 3-5 5-6 9.5h14c-1-5-4-7-6-9.5"></path>
    <path d="M11 15l1 7" opacity="0.3" stroke-width="0.8"></path>
    <path d="M11 7.5l3.5 1.5-1 4"></path>
  </svg>
  <div class="flex flex-col">
    <h1 class="font-medium tracking-tight leading-none uppercase" style="font-family: 'Cormorant Garamond', serif; font-size: 18px; font-weight: 300; line-height: 1.4; letter-spacing: 4px; color: #FFF; margin: 0;">Pose &amp; Poise</h1>
    <span class="uppercase" style="font-family: 'Outfit', sans-serif; font-size: 11px; font-weight: 400; line-height: 1.4; letter-spacing: 2px; color: rgba(255, 255, 255, 0.6); margin: 0;">Relentlessly Refined</span>
  </div>
</div>`}
              id="logo-bw-html"
            />
            <CodeBlock 
              code={`<!-- B&W Micro Version -->
<div class="flex items-center justify-center">
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FFF" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="transition-colors duration-500">
    <circle cx="13" cy="3" r="1.2" fill="#FFF" stroke="none"></circle>
    <path d="M13 4.5c-1 0-2.5.5-3.5 2s-1 3-1 3"></path>
    <path d="M13 4.5c.8 3 0 7-2 9"></path>
    <path d="M11 13.5c-2 3-5 5-6 9.5h14c-1-5-4-7-6-9.5"></path>
    <path d="M11 15l1 7" opacity="0.3" stroke-width="0.8"></path>
    <path d="M11 7.5l3.5 1.5-1 4"></path>
  </svg>
</div>`}
              id="logo-bw-micro-html"
            />
          </div>
          
          {/* Buttons */}
          <div style={{ marginBottom: '64px' }}>
            <h3 style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '12px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              marginBottom: '24px',
              color: 'rgba(26, 26, 26, 0.6)',
            }}>Buttons</h3>
            
            <div style={{ display: 'flex', gap: '24px', marginBottom: '24px', flexWrap: 'wrap' }}>
              <button className="sample-button">Primary Button</button>
              <button className="sample-button sample-button-accent">Accent Button</button>
            </div>
            
            <CodeBlock 
              code={`.button {
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
}

.button:hover {
  background: #C4A484;
  transform: translateY(-2px);
  box-shadow: 0 10px 40px rgba(196, 164, 132, 0.3);
}`} 
              id="button-code" 
            />
          </div>

          {/* Inputs */}
          <div style={{ marginBottom: '64px' }}>
            <h3 style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '12px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              marginBottom: '24px',
              color: 'rgba(26, 26, 26, 0.6)',
            }}>Inputs</h3>
            
            <input 
              className="sample-input" 
              placeholder="Enter your email" 
              style={{ marginBottom: '24px' }}
            />
            
            <CodeBlock 
              code={`.input {
  background: transparent;
  border: 1px solid rgba(26, 26, 26, 0.2);
  padding: 18px 24px;
  font-family: 'Outfit', sans-serif;
  font-size: 14px;
  width: 100%;
  max-width: 320px;
  outline: none;
  transition: border-color 0.3s ease;
}

.input:focus {
  border-color: #C4A484;
}

.input::placeholder {
  color: rgba(26, 26, 26, 0.4);
  letter-spacing: 1px;
}`} 
              id="input-code" 
            />
          </div>

          {/* Cards */}
          <div style={{ marginBottom: '64px' }}>
            <h3 style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '12px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              marginBottom: '24px',
              color: 'rgba(26, 26, 26, 0.6)',
            }}>Feature Cards</h3>
            
            <div className="sample-card" style={{ maxWidth: '360px', marginBottom: '24px' }}>
              <span style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '11px',
                letterSpacing: '2px',
                color: '#C4A484',
              }}>01</span>
              <div style={{ width: '40px', height: '1px', background: '#C4A484', margin: '24px 0' }} />
              <h3 style={{ fontSize: '24px', fontWeight: 400, marginBottom: '16px' }}>Feature Title</h3>
              <p style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '14px',
                fontWeight: 300,
                color: 'rgba(26, 26, 26, 0.6)',
                lineHeight: 1.7,
              }}>
                Feature description text goes here with details about the functionality.
              </p>
            </div>
            
            <CodeBlock 
              code={`.feature-card {
  padding: 40px;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(26, 26, 26, 0.05);
  transition: all 0.4s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.06);
  border-color: rgba(196, 164, 132, 0.3);
}`} 
              id="card-code" 
            />
          </div>

          {/* Nav Links */}
          <div>
            <h3 style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '12px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              marginBottom: '24px',
              color: 'rgba(26, 26, 26, 0.6)',
            }}>Navigation Links</h3>
            
            <div style={{ display: 'flex', gap: '48px', marginBottom: '24px' }}>
              <span className="nav-link-sample">Features</span>
              <span className="nav-link-sample">Portfolios</span>
              <span className="nav-link-sample">Pricing</span>
            </div>
            
            <CodeBlock 
              code={`.nav-link {
  font-family: 'Outfit', sans-serif;
  font-size: 12px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #1A1A1A;
  text-decoration: none;
  transition: color 0.3s ease;
  cursor: pointer;
}

.nav-link:hover {
  color: #C4A484;
}`} 
              id="nav-code" 
            />
          </div>
        </section>

        {/* EFFECTS */}
        <section style={{ marginBottom: '120px' }}>
          <SectionTitle num="05">Effects & Animations</SectionTitle>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '48px' }}>
            {/* Shadows */}
            <div>
              <h3 style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '12px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                marginBottom: '24px',
                color: 'rgba(26, 26, 26, 0.6)',
              }}>Shadows</h3>
              
              <div style={{ display: 'grid', gap: '24px' }}>
                {[
                  { name: 'Button Hover', value: '0 10px 40px rgba(196, 164, 132, 0.3)' },
                  { name: 'Card Hover', value: '0 20px 60px rgba(0, 0, 0, 0.06)' },
                ].map((shadow, i) => (
                  <div key={i} style={{
                    padding: '24px',
                    background: '#fff',
                    boxShadow: shadow.value,
                  }}>
                    <p style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: '13px',
                      fontWeight: 500,
                      marginBottom: '8px',
                    }}>{shadow.name}</p>
                    <code style={{
                      fontFamily: "'SF Mono', monospace",
                      fontSize: '11px',
                      color: 'rgba(26,26,26,0.5)',
                    }}>{shadow.value}</code>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Blur */}
            <div>
              <h3 style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '12px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                marginBottom: '24px',
                color: 'rgba(26, 26, 26, 0.6)',
              }}>Blur & Backdrop</h3>
              
              <div style={{
                padding: '24px',
                background: 'rgba(255, 255, 255, 0.6)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(26, 26, 26, 0.05)',
              }}>
                <p style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '13px',
                  fontWeight: 500,
                  marginBottom: '8px',
                }}>Glass Effect</p>
                <code style={{
                  fontFamily: "'SF Mono', monospace",
                  fontSize: '11px',
                  color: 'rgba(26,26,26,0.5)',
                }}>backdrop-filter: blur(10px)</code>
              </div>
            </div>
          </div>
          
          {/* Transitions */}
          <div style={{ marginTop: '48px' }}>
            <h3 style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '12px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              marginBottom: '24px',
              color: 'rgba(26, 26, 26, 0.6)',
            }}>Transitions & Easings</h3>
            
            <CodeBlock 
              code={`/* Primary Easing - Buttons, Cards */
transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

/* Simple Easing - Links, Borders */
transition: all 0.3s ease;

/* Keyframe Animations */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Animation Delays (staggered entrance) */
.delay-1 { animation-delay: 0.2s; }
.delay-2 { animation-delay: 0.4s; }
.delay-3 { animation-delay: 0.6s; }
.delay-4 { animation-delay: 0.8s; }
.delay-5 { animation-delay: 1s; }`} 
              id="transitions-code" 
            />
          </div>
        </section>

        {/* DECORATIVE */}
        <section style={{ marginBottom: '120px' }}>
          <SectionTitle num="06">Decorative Elements</SectionTitle>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '48px' }}>
            <div>
              <h3 style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '12px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                marginBottom: '24px',
                color: 'rgba(26, 26, 26, 0.6)',
              }}>Accent Line</h3>
              
              <div style={{ width: '40px', height: '1px', background: '#C4A484', marginBottom: '24px' }} />
              
              <CodeBlock 
                code={`.accent-line {
  width: 40px;
  height: 1px;
  background: #C4A484;
  margin: 24px 0;
}`} 
                id="accent-line" 
              />
            </div>
            
            <div>
              <h3 style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '12px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                marginBottom: '24px',
                color: 'rgba(26, 26, 26, 0.6)',
              }}>Decorative Shapes</h3>
              
              <div style={{ display: 'flex', gap: '24px', alignItems: 'center', marginBottom: '24px' }}>
                <div style={{
                  width: '100px',
                  height: '140px',
                  background: 'linear-gradient(135deg, rgba(196, 164, 132, 0.1) 0%, rgba(196, 164, 132, 0.03) 100%)',
                }} />
                <div style={{
                  width: '60px',
                  height: '60px',
                  border: '1px solid rgba(196, 164, 132, 0.2)',
                  borderRadius: '50%',
                }} />
              </div>
              
              <CodeBlock 
                code={`/* Rectangle */
background: linear-gradient(135deg, 
  rgba(196, 164, 132, 0.1) 0%, 
  rgba(196, 164, 132, 0.03) 100%);

/* Circle */
border: 1px solid rgba(196, 164, 132, 0.2);
border-radius: 50%;`} 
                id="shapes" 
              />
            </div>
          </div>
        </section>

        {/* BORDERS */}
        <section style={{ marginBottom: '120px' }}>
          <SectionTitle num="07">Borders & Radius</SectionTitle>
          
          <div style={{ display: 'grid', gap: '16px' }}>
            {[
              { name: 'Card Border', value: '1px solid rgba(26, 26, 26, 0.05)' },
              { name: 'Card Border Hover', value: '1px solid rgba(196, 164, 132, 0.3)' },
              { name: 'Input Border', value: '1px solid rgba(26, 26, 26, 0.2)' },
              { name: 'Input Border Focus', value: '1px solid #C4A484' },
              { name: 'Divider', value: '1px solid rgba(26, 26, 26, 0.1)' },
              { name: 'Decorative Circle', value: '1px solid rgba(196, 164, 132, 0.2)' },
            ].map((border, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '24px',
                padding: '16px 24px',
                background: '#fff',
                border: '1px solid rgba(26,26,26,0.05)',
              }}>
                <span style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '13px',
                  fontWeight: 500,
                  width: '180px',
                }}>{border.name}</span>
                <code style={{
                  fontFamily: "'SF Mono', monospace",
                  fontSize: '12px',
                  color: 'rgba(26,26,26,0.6)',
                }}>{border.value}</code>
              </div>
            ))}
          </div>
          
          <div style={{ marginTop: '32px', padding: '24px', background: '#fff', border: '1px solid rgba(26,26,26,0.05)' }}>
            <p style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '13px',
              fontWeight: 500,
              marginBottom: '8px',
            }}>Border Radius</p>
            <p style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '14px',
              color: 'rgba(26,26,26,0.6)',
            }}>
              The design uses <code style={{ fontFamily: "'SF Mono', monospace", fontSize: '12px', background: 'rgba(26,26,26,0.05)', padding: '2px 6px' }}>border-radius: 0</code> throughout for a sharp, editorial aesthetic. 
              The only exception is <code style={{ fontFamily: "'SF Mono', monospace", fontSize: '12px', background: 'rgba(26,26,26,0.05)', padding: '2px 6px' }}>border-radius: 50%</code> for decorative circles and 
              <code style={{ fontFamily: "'SF Mono', monospace", fontSize: '12px', background: 'rgba(26,26,26,0.05)', padding: '2px 6px' }}>border-radius: 4px</code> for code blocks.
            </p>
          </div>
        </section>

        {/* ICONS */}
        <section>
          <SectionTitle num="08">Icons & Glyphs</SectionTitle>
          <p style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: '14px',
            fontWeight: 300,
            color: 'rgba(26, 26, 26, 0.6)',
            marginBottom: '48px',
            maxWidth: '600px',
            lineHeight: 1.7,
          }}>
            A highly-specialized, thin-stroke icon set designed for the Pose & Poise brand. Configure the settings below to adjust the vector stroke, size, and accent color.
          </p>

          <div className="flex flex-col lg:flex-row items-center justify-start gap-12 mb-16 p-8 bg-[#fff] border shadow-sm" style={{ borderColor: 'rgba(26,26,26,0.05)' }}>
            <div className="flex flex-col w-full max-w-[200px]">
              <label className="text-[9px] font-bold uppercase tracking-[0.2em] mb-4 flex justify-between" style={{ fontFamily: "'Outfit', sans-serif" }}>
                <span>Stroke Width</span>
                <span className="text-black">{strokeWidth.toFixed(1)}px</span>
              </label>
              <input
                type="range" min="0.5" max="3" step="0.1"
                value={strokeWidth}
                onChange={(e) => setStrokeWidth(parseFloat(e.target.value))}
                className="w-full accent-black h-1 bg-gray-200 rounded-none appearance-none cursor-pointer"
              />
            </div>

            <div className="flex flex-col w-full max-w-[200px]">
              <label className="text-[9px] font-bold uppercase tracking-[0.2em] mb-4 flex justify-between" style={{ fontFamily: "'Outfit', sans-serif" }}>
                <span>Icon Size</span>
                <span className="text-black">{size}px</span>
              </label>
              <input
                type="range" min="16" max="120" step="4"
                value={size}
                onChange={(e) => setSize(parseInt(e.target.value))}
                className="w-full accent-black h-1 bg-gray-200 rounded-none appearance-none cursor-pointer"
              />
            </div>

            <div className="flex flex-col w-full max-w-[200px]">
              <label className="text-[9px] font-bold uppercase tracking-[0.2em] mb-4 flex justify-between" style={{ fontFamily: "'Outfit', sans-serif" }}>
                <span>Brand Color</span>
                <span className="text-black uppercase">{color}</span>
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-full h-8 bg-transparent border-0 cursor-pointer p-0 block"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {iconSet.map((icon, idx) => (
              <IconCard key={idx} icon={icon} size={size} strokeWidth={strokeWidth} color={color} />
            ))}
          </div>

        </section>

        {/* SOCIAL CANVAS AREA */}
        <section style={{ marginBottom: '120px' }} className="no-print">
          <SectionTitle num="09">Interactive Canvas</SectionTitle>
          <div className="relative w-full py-32 flex flex-col items-center justify-center bg-[#FAF9F7] font-sans border border-black/5 rounded-[32px] overflow-hidden">
            
            {/* Refined Grid Pattern Background */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '64px 64px' }}>
            </div>



            {/* Subtle Footer Info */}
            <div className="mb-24 text-center pointer-events-none relative z-10">
              <p className="text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase" style={{ fontFamily: "'Outfit', sans-serif" }}>
                Hover for 3D perspective &bull; Brand Color Injection
              </p>
            </div>

            {/* Icons Container */}
            <div className="flex flex-wrap items-center justify-center gap-8 px-10 max-w-4xl relative z-10">
              {SOCIAL_CONFIG.map((icon, index) => (
                <InteractiveCard 
                  key={icon.id} 
                  icon={icon} 
                  index={index} 
                  isMounted={isMounted} 
                />
              ))}
            </div>
          </div>
        </section>

        {/* TAILWIND DESIGN SYSTEM */}
        <section style={{ marginBottom: '120px' }} className="no-print">
          <SectionTitle num="10">Tailwind Implementation</SectionTitle>
          <p style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: '14px',
            fontWeight: 300,
            color: 'rgba(26, 26, 26, 0.6)',
            marginBottom: '48px',
            maxWidth: '600px',
            lineHeight: 1.7,
          }}>
            The style guide is implemented using Tailwind CSS v4. Below are the core mappings and component recipes to ensure consistency across the application. These combinations can be abstracted cleanly into @layer components inside globals.css.
          </p>

          {/* Color Tokens */}
          <div style={{ marginBottom: '64px' }}>
            <h3 style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '12px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              marginBottom: '24px',
              color: 'rgba(26, 26, 26, 0.6)',
            }}>Theme Colors</h3>
            <div style={{ display: 'grid', gap: '16px' }}>
              {[
                { token: 'Brand Dark', class: 'bg-brand-dark / text-brand-dark / border-brand-dark', hex: '#1a1a1a' },
                { token: 'Brand Light', class: 'bg-brand-light / text-brand-light / border-brand-light', hex: '#faf9f7' },
                { token: 'Brand Gold', class: 'bg-brand-gold / text-brand-gold / border-brand-gold', hex: '#c4a484' },
              ].map((c, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '24px', padding: '16px 24px', background: '#fff', border: '1px solid rgba(26,26,26,0.05)' }}>
                  <div style={{ width: '40px', height: '40px', background: c.hex, border: '1px solid rgba(26,26,26,0.1)' }} />
                  <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: '13px', fontWeight: 500, width: '150px' }}>{c.token}</span>
                  <code style={{ fontFamily: "'SF Mono', monospace", fontSize: '12px', color: 'rgba(26,26,26,0.6)' }}>{c.class}</code>
                </div>
              ))}
            </div>
          </div>

          {/* Typography Tokens */}
          <div style={{ marginBottom: '64px' }}>
            <h3 style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '12px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              marginBottom: '24px',
              color: 'rgba(26, 26, 26, 0.6)',
            }}>Typography Variables</h3>
            <div style={{ display: 'grid', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '24px', padding: '16px 24px', background: '#fff', border: '1px solid rgba(26,26,26,0.05)' }}>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '20px', width: '200px' }}>Cormorant Garamond</span>
                <code style={{ fontFamily: "'SF Mono', monospace", fontSize: '12px', color: 'rgba(26,26,26,0.6)' }}>font-cormorant</code>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '24px', padding: '16px 24px', background: '#fff', border: '1px solid rgba(26,26,26,0.05)' }}>
                <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: '20px', width: '200px' }}>Outfit</span>
                <code style={{ fontFamily: "'SF Mono', monospace", fontSize: '12px', color: 'rgba(26,26,26,0.6)' }}>font-outfit</code>
              </div>
            </div>
          </div>

          {/* Component Recipes */}
          <div>
            <h3 style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '12px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              marginBottom: '24px',
              color: 'rgba(26, 26, 26, 0.6)',
            }}>Component Recipes (Copy & Paste code snippet)</h3>
            
            <div style={{ display: 'grid', gap: '48px' }}>
              {/* Auth Button */}
              <div>
                <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '14px', fontWeight: 500, marginBottom: '16px' }}>Primary Button</p>
                <div style={{ display: 'flex', gap: '24px', marginBottom: '16px' }}>
                  <button className="sample-button">Primary Button</button>
                </div>
                <CodeBlock 
                  code={`<button className="bg-brand-dark text-brand-light font-outfit text-[13px] font-normal tracking-[2px] uppercase px-12 py-[18px] transition-all duration-300 hover:bg-brand-gold hover:-translate-y-0.5 hover:shadow-[0_10px_40px_rgba(196,164,132,0.3)] disabled:opacity-60 disabled:cursor-not-allowed">
  Primary Button
</button>`}
                  id="tw-primary-btn"
                />
              </div>

              {/* Accent Button */}
              <div>
                <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '14px', fontWeight: 500, marginBottom: '16px' }}>Accent Button</p>
                <div style={{ display: 'flex', gap: '24px', marginBottom: '16px' }}>
                  <button className="sample-button sample-button-accent">Accent Button</button>
                </div>
                <CodeBlock 
                  code={`<button className="bg-brand-gold text-brand-dark font-outfit text-[13px] font-normal tracking-[2px] uppercase px-12 py-[18px] transition-all duration-300 hover:bg-brand-dark hover:text-brand-light hover:-translate-y-0.5 hover:shadow-[0_10px_40px_rgba(196,164,132,0.3)] disabled:opacity-60 disabled:cursor-not-allowed">
  Accent Button
</button>`}
                  id="tw-accent-btn"
                />
              </div>

              {/* Input */}
              <div>
                <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '14px', fontWeight: 500, marginBottom: '16px' }}>Form Input</p>
                <div style={{ marginBottom: '16px' }}>
                  <input placeholder="Email Address" className="sample-input" />
                </div>
                <CodeBlock 
                  code={`<input 
  type="email" 
  placeholder="Email Address" 
  className="w-full max-w-[320px] bg-transparent border border-brand-dark/20 py-[18px] px-6 font-outfit text-[14px] outline-none transition-colors duration-300 focus:border-brand-gold text-brand-dark placeholder:text-brand-dark/40 placeholder:tracking-[0.5px]" 
/>`}
                  id="tw-form-input"
                />
              </div>
              
               {/* Hero Form Input Combo */}
              <div>
                <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '14px', fontWeight: 500, marginBottom: '16px' }}>Hero Email Form Flow</p>
                <CodeBlock 
                  code={`<form className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full max-w-[580px] relative">
  <input
    type="email"
    placeholder="Enter your email"
    required
    className="w-full flex-1 bg-transparent border border-brand-dark/20 py-[18px] px-6 font-outfit text-[14px] outline-none transition-colors duration-300 focus:border-brand-gold text-brand-dark placeholder:text-brand-dark/40 placeholder:tracking-[0.5px]"
  />
  <button
    type="submit"
    className="bg-brand-dark text-brand-light border border-brand-dark font-outfit text-[13px] font-normal tracking-[2px] uppercase px-10 sm:px-14 py-[18px] w-full sm:w-auto sm:min-w-[220px] transition-all duration-300 hover:bg-brand-gold hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
  >
    Get Started Free
  </button>
</form>`}
                  id="tw-hero-form"
                />
              </div>

            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer style={{
        padding: '48px',
        borderTop: '1px solid rgba(26, 26, 26, 0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '24px',
      }}>
        <div style={{
          fontSize: '14px',
          fontWeight: 300,
          letterSpacing: '3px',
          textTransform: 'uppercase',
        }}>
          Pose & Poise
        </div>
        <p style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: '12px',
          color: 'rgba(26, 26, 26, 0.4)',
        }}>
          Style Guide v1.0 — poseandpoise.studio
        </p>
      </footer>
    </div>
  );
}
