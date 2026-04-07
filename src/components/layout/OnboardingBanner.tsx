"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

interface OnboardingBannerProps {
  userName?: string | null;
}

/**
 * Static banner component - renders when data is provided
 */
export function OnboardingBanner({ userName }: OnboardingBannerProps) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,

        // Above nav (which is 100)
        zIndex: 150,
      }}
      className="bg-brand-gold py-4 px-8"
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
        className="gap-8"
      >
        {/* Icon */}
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke={"var(--color-brand-dark)"}
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>

        {/* Message */}
        <p
          style={{
            margin: 0,
            textAlign: "center",
          }}
          className="font-outfit text-sm text-brand-dark"
        >
          {userName ? `Hey ${userName}! ` : ""}
          Complete your profile setup to unlock your dashboard, portfolio
          builder, and more.
        </p>

        {/* CTA Button */}
        <Link
          href="/onboarding"
          style={{
            fontWeight: 500,
            textTransform: "uppercase",
            padding: "8px 16px",
            borderRadius: "6px",
            border: "none",
            textDecoration: "none",
            whiteSpace: "nowrap",
            transition: "all 0.2s ease",
          }}
          className="font-outfit text-xs tracking-[2px] bg-brand-dark text-brand-light"
        >
          Continue Setup
        </Link>
      </div>
    </div>
  );
}

/**
 * Self-contained banner that fetches its own status
 * Use this when you can't pass props from a server component
 * Includes a spacer to push content down when banner is visible
 */
export function OnboardingBannerAuto() {
  const [status, setStatus] = useState<{
    isLoggedIn: boolean;
    onboardingCompleted: boolean | null;
    displayName: string | null;
  } | null>(null);

  useEffect(() => {
    async function fetchStatus() {
      try {
        const res = await fetch("/api/user/onboarding-status");
        const data = await res.json();
        setStatus(data);
      } catch {
        // Silently fail - don't show banner if we can't fetch
        setStatus({
          isLoggedIn: false,
          onboardingCompleted: null,
          displayName: null,
        });
      }
    }
    fetchStatus();
  }, []);

  // Don't render anything while loading or if not applicable
  if (!status || !status.isLoggedIn || status.onboardingCompleted) {
    return null;
  }

  return (
    <>
      <OnboardingBanner userName={status.displayName} />
      {/* Spacer to push content below the fixed banner */}
      <div style={{ height: "52px" }} />
    </>
  );
}
