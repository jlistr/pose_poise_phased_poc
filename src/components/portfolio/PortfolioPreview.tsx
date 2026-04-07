"use client";

import React from "react";
import Image from "next/image";
import { TEMPLATES, fonts, colors } from "@/components/onboarding/types";
import Link from "next/link";

interface PortfolioPreviewProps {
  profile: any;
  images: any[];
  isOwner?: boolean;
}

export default function PortfolioPreview({ profile, images, isOwner }: PortfolioPreviewProps) {
  // Resolve the selected template (fallback to altar)
  const templateId = profile.selected_template || "altar";
  const template = TEMPLATES.find((t) => t.id === templateId) || TEMPLATES[1];

  const displayName = profile.display_name || profile.username;

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
      <nav style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 10, padding: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center", color: "white" }}>
        <div style={{ fontFamily: fonts.heading, fontSize: "24px", letterSpacing: "0.1em", textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>
          {displayName}
        </div>
        <div style={{ display: "flex", gap: "1.5rem", fontSize: "14px", alignItems: "center", textShadow: "0 1px 5px rgba(0,0,0,0.5)" }}>
          {isOwner && (
            <Link 
              href="/dashboard/portfolio" 
              style={{
                fontWeight: 600,
                color: colors.charcoal,
                backgroundColor: colors.white,
                textDecoration: "none",
                padding: "6px 16px",
                borderRadius: "20px",
                textShadow: "none"
              }}
            >
              Edit Portfolio
            </Link>
          )}
          {profile.instagram && <a href={`https://instagram.com/${profile.instagram}`} target="_blank" rel="noreferrer" style={{color: "inherit", textDecoration: "none"}}>Instagram</a>}
          {profile.tiktok && <a href={`https://tiktok.com/@${profile.tiktok}`} target="_blank" rel="noreferrer" style={{color: "inherit", textDecoration: "none"}}>TikTok</a>}
        </div>
      </nav>

      {/* Hero Section */}
      <header
        style={{
          position: "relative",
          width: "100vw",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          textAlign: template.heroStyle === "centered" ? "center" : "left",
          overflow: "hidden",
          color: "white",
        }}
      >
        <video 
          autoPlay loop muted playsInline
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0, filter: "brightness(0.6)" }}
        >
          <source src="/hero_vid_neon_nights.mp4" type="video/mp4" />
        </video>
        
        <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: "1200px", margin: "0 auto", display: "flex", flexDirection: "column", alignItems: template.heroStyle === "centered" ? "center" : "flex-start", padding: "0 2rem" }}>
          <h1 style={{ fontFamily: fonts.heading, fontSize: "6rem", marginBottom: "1rem", fontWeight: "normal", textShadow: "0 4px 20px rgba(0,0,0,0.5)" }}>
            {displayName}
          </h1>
          <p style={{ fontSize: "1.4rem", opacity: 0.9, maxWidth: "600px", margin: template.heroStyle === "centered" ? "0 auto 2rem" : "0 0 2rem", textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>
            {profile.location && `${profile.location}`}
          </p>

          {profile.bio && (
            <p style={{ fontSize: "1.1rem", lineHeight: 1.6, maxWidth: "800px", margin: template.heroStyle === "centered" ? "0 auto" : "0", opacity: 0.95, backgroundColor: "rgba(0,0,0,0.4)", padding: "1.5rem", borderRadius: "8px", backdropFilter: "blur(10px)" }}>
              {profile.bio}
            </p>
          )}
        </div>
      </header>

      {/* Stats Section */}
      <section style={{ backgroundColor: "rgba(0,0,0,0.02)", borderTop: `1px solid ${template.accentColor}20`, borderBottom: `1px solid ${template.accentColor}20`}}>
        <div style={{ padding: "3rem 2rem", maxWidth: "1200px", margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "2rem", justifyContent: "center" }}>
          {[
            { label: 'Height', val: profile.height_cm ? `${profile.height_cm} cm` : '' },
            { label: 'Bust', val: profile.bust_cm ? `${profile.bust_cm} cm` : '' },
            { label: 'Waist', val: profile.waist_cm ? `${profile.waist_cm} cm` : '' },
            { label: 'Hips', val: profile.hips_cm ? `${profile.hips_cm} cm` : '' },
            { label: 'Shoes', val: profile.shoe_size || '' },
            { label: 'Hair', val: profile.hair_color || '' },
            { label: 'Eyes', val: profile.eye_color || '' },
          ].map(({ label, val }) => {
            if (!val) return null;
            return (
              <div key={label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em", opacity: 0.6, marginBottom: "0.5rem" }}>
                  {label}
                </div>
                <div style={{ fontSize: "1.1rem", fontFamily: fonts.heading }}>{val}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Photo Grid */}
      <main style={{ padding: "4rem 2rem", maxWidth: "1200px", margin: "0 auto" }}>
        
        {images.length === 0 ? (
          <p style={{ textAlign: "center", opacity: 0.6 }}>No photos available yet.</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "2rem",
            }}
          >
            {images.map((photo) => (
              <div key={photo.id} style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden", borderRadius: "4px" }}>
                <Image
                  src={photo.storage_path}
                  alt={photo.caption || "Portfolio shot"}
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
          © {new Date().getFullYear()} {displayName}. Built with Pose & Poise.
        </p>
      </footer>
    </div>
  );
}
