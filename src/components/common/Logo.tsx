import Link from "next/link";

interface LogoProps {
  color?: string;
  textColor?: string;
  subtextColor?: string;
  accentColor?: string;
  className?: string;
  showSubtitle?: boolean;
  stacked?: boolean;
  micro?: boolean;
}

export default function Logo({
  color = "#1A1A1A",
  textColor = "#1A1A1A",
  subtextColor = "rgba(26, 26, 26, 0.6)",
  accentColor = "#C4A484",
  className = "fade-up",
  showSubtitle = true,
  stacked = false,
  micro = false,
}: LogoProps) {
  const iconSize = micro ? "32" : stacked ? "48" : "40";

  return (
    <Link
      href="/"
      style={{
        textDecoration: "none",
        display: "flex",
        flexDirection: stacked ? "column" : "row",
        alignItems: "center",
        gap: stacked ? "16px" : "12px",
        minWidth: micro ? "auto" : stacked ? "auto" : "240px",
      }}
      className={className}
    >
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ transition: "color 0.5s" }}
      >
        <circle
          cx="13"
          cy="3"
          r="1.2"
          fill={accentColor}
          stroke="none"
        ></circle>
        <path d="M13 4.5c-1 0-2.5.5-3.5 2s-1 3-1 3"></path>
        <path d="M13 4.5c.8 3 0 7-2 9"></path>
        <path d="M11 13.5c-2 3-5 5-6 9.5h14c-1-5-4-7-6-9.5"></path>
        <path d="M11 15l1 7" opacity="0.3" strokeWidth="0.8"></path>
        <path d="M11 7.5l3.5 1.5-1 4"></path>
      </svg>
      {!micro && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            textAlign: stacked ? "center" : "left",
          }}
        >
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: stacked ? "24px" : "18px",
              fontWeight: 300,
              lineHeight: 1.4,
              letterSpacing: stacked ? "6px" : "4px",
              textTransform: "uppercase",
              color: textColor,
              margin: 0,
            }}
          >
            Pose & Poise
          </h1>
          {showSubtitle && (
            <span
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "11px",
                fontWeight: 400,
                lineHeight: 1.4,
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: subtextColor,
                margin: 0,
              }}
            >
              Relentlessly Refined
            </span>
          )}
        </div>
      )}
    </Link>
  );
}
