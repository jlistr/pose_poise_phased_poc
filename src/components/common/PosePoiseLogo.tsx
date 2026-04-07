import React from "react";

interface PosePoiseLogoProps {
  className?: string;
  onDark?: boolean;
}

export const PosePoiseLogo: React.FC<PosePoiseLogoProps> = ({ 
  className = "", 
  onDark = false 
}) => {
  const primaryColor = onDark ? "#FFFFFF" : "#1A1A1A";
  const sublineColor = onDark 
    ? "rgba(255, 255, 255, 0.6)" 
    : "rgba(26, 26, 26, 0.6)";

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        stroke={primaryColor}
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-colors duration-500"
      >
        <circle cx="13" cy="3" r="1.2" fill="#C4A484" stroke="none" />
        <path d="M13 4.5c-1 0-2.5.5-3.5 2s-1 3-1 3" />
        <path d="M13 4.5c.8 3 0 7-2 9" />
        <path d="M11 13.5c-2 3-5 5-6 9.5h14c-1-5-4-7-6-9.5" />
        <path d="M11 15l1 7" opacity="0.3" strokeWidth="0.8" />
        <path d="M11 7.5l3.5 1.5-1 4" />
      </svg>
      <div className="flex flex-col">
        <h1
          className="font-medium tracking-tight leading-none uppercase"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "18px",
            fontWeight: 300,
            lineHeight: 1.4,
            letterSpacing: "4px",
            color: primaryColor,
            margin: 0,
          }}
        >
          Pose &amp; Poise
        </h1>
        <span
          className="uppercase"
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "11px",
            fontWeight: 400,
            lineHeight: 1.4,
            letterSpacing: "2px",
            color: sublineColor,
            margin: 0,
          }}
        >
          Relentlessly Refined
        </span>
      </div>
    </div>
  );
};
