"use client";

import React, { useEffect, useState } from "react";
import {
  OnboardingData,
  TEMPLATES,
  fonts,
} from "@/components/onboarding/types";
import Image from "next/image";

interface PortfolioPreviewProps {
  username: string;
}

export default function PortfolioPreview({ username }: PortfolioPreviewProps) {
  const [data, setData] = useState<OnboardingData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 1. Scan localStorage for the user's data (Mock API)
    const findUser = () => {
      try {
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key?.startsWith("onboarding_")) {
            const raw = localStorage.getItem(key);
            if (raw) {
              const parsed = JSON.parse(raw) as OnboardingData;
              if (parsed?.profile?.username?.toLowerCase() === username.toLowerCase()) {
                setData(parsed);
                return;
              }
            }
          }
        }
      } catch (error) {
        console.error("Error reading localStorage", error);
      }
    };

    findUser();
    setIsLoading(false);
  }, [username]);

  if (isLoading) {
    return (
      <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        Loading portfolio...
      </div>
    );
  }

  if (!data) {
    return (
      <div style={{ height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: fonts.body }}>
        <h2>Portfolio Not Found</h2>
        <p>No user goes by the name <strong>@{username}</strong></p>
      </div>
    );
  }

  // 2. Resolve the selected template (fallback to altar)
  const templateId = data.selectedTemplate || "altar";
  const template = TEMPLATES.find((t) => t.id === templateId) || TEMPLATES[1];

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: template.bgColor,
        color: template.textColor,
        fontFamily: fonts.body,
        transition: "background-color 0.3s ease",
      }}
    >
      {/* Navbar Minimal */}
      <nav style={{ padding: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontFamily: fonts.heading, fontSize: "24px", letterSpacing: "0.1em" }}>
          {data.profile.displayName || username}
        </div>
        <div style={{ display: "flex", gap: "1rem", fontSize: "14px" }}>
          {data.profile.instagram && <a href={`https://instagram.com/${data.profile.instagram}`} target="_blank" rel="noreferrer" style={{color: "inherit", textDecoration: "none"}}>Instagram</a>}
          {data.profile.tiktok && <a href={`https://tiktok.com/@${data.profile.tiktok}`} target="_blank" rel="noreferrer" style={{color: "inherit", textDecoration: "none"}}>TikTok</a>}
        </div>
      </nav>

      {/* Hero Section */}
      <header
        style={{
          padding: "4rem 2rem",
          maxWidth: "1200px",
          margin: "0 auto",
          textAlign: template.heroStyle === "centered" ? "center" : "left",
        }}
      >
        <h1 style={{ fontFamily: fonts.heading, fontSize: "4rem", marginBottom: "1rem", fontWeight: "normal" }}>
          {data.profile.displayName}
        </h1>
        <p style={{ fontSize: "1.2rem", opacity: 0.8, maxWidth: "600px", margin: template.heroStyle === "centered" ? "0 auto 2rem" : "0 0 2rem" }}>
          {data.profile.location && `${data.profile.location} • `}
          {data.services.experienceLevel.charAt(0).toUpperCase() + data.services.experienceLevel.slice(1)} Model
        </p>

        {data.about.bio && (
          <p style={{ fontSize: "1rem", lineHeight: 1.6, maxWidth: "800px", margin: template.heroStyle === "centered" ? "0 auto" : "0", opacity: 0.9 }}>
            {data.about.bio}
          </p>
        )}
      </header>

      {/* Stats Section */}
      <section style={{ backgroundColor: "rgba(0,0,0,0.02)", borderTop: `1px solid ${template.accentColor}20`, borderBottom: `1px solid ${template.accentColor}20`}}>
        <div style={{ padding: "3rem 2rem", maxWidth: "1200px", margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "2rem", justifyContent: "center" }}>
          {Object.entries(data.about.stats).map(([k, v]) => {
            if (!v) return null;
            return (
              <div key={k} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em", opacity: 0.6, marginBottom: "0.5rem" }}>
                  {k}
                </div>
                <div style={{ fontSize: "1.1rem", fontFamily: fonts.heading }}>{v}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Photo Grid */}
      <main style={{ padding: "4rem 2rem", maxWidth: "1200px", margin: "0 auto" }}>
        <h2 style={{ fontFamily: fonts.heading, fontSize: "2rem", marginBottom: "3rem", textAlign: "center" }}>
          Portfolio
        </h2>
        
        {data.photos.length === 0 ? (
          <p style={{ textAlign: "center", opacity: 0.6 }}>No photos available yet.</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "2rem",
            }}
          >
            {data.photos.slice(0, 10).map((photo) => (
              <div key={photo.id} style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden", borderRadius: "4px" }}>
                <Image
                  src={photo.url}
                  alt="Portfolio shot"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  unoptimized={true}
                  style={{ objectFit: "cover", transition: "transform 0.5s ease" }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                />
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer style={{ padding: "4rem 2rem", textAlign: "center", borderTop: `1px solid ${template.accentColor}20` }}>
        <p style={{ opacity: 0.7, fontSize: "0.9rem" }}>
          © {new Date().getFullYear()} {data.profile.displayName}. Built with Pose & Poise.
        </p>
      </footer>
    </div>
  );
}
