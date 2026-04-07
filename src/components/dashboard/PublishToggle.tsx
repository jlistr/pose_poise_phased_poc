"use client";

import React, { useState, useTransition } from "react";
import { Globe, Lock, CheckCircle2, Copy } from "lucide-react";
import { togglePublishStatus } from "@/app/actions/publish";

interface PublishToggleProps {
  initialIsPublic: boolean;
  username: string;
}

export function PublishToggle({ initialIsPublic, username }: PublishToggleProps) {
  const [isPending, startTransition] = useTransition();
  const [isPublic, setIsPublic] = useState(initialIsPublic);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Derive the public URL. Provide a localhost fallback if not in production.
  const isLocal = typeof window !== "undefined" && window.location.hostname === "localhost";
  const baseUrl = isLocal ? "http://localhost:3000" : "https://poseandpoise.studio";
  
  // Note: in production, domains will be username.poseandpoise.studio 
  // On localhost, it will simply be localhost:3000/username
  const publicUrl = isLocal 
    ? `${baseUrl}/${username}`
    : `https://${username}.poseandpoise.studio`;

  const handleToggle = () => {
    setError(null);
    const nextState = !isPublic;
    
    // Optimistic UI update
    setIsPublic(nextState);

    startTransition(async () => {
      const result = await togglePublishStatus(nextState);
      if (result.error) {
        // Revert on error
        setIsPublic(!nextState);
        setError(result.error);
      }
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{
      backgroundColor: "#FFFFFF",
      border: "1px solid #E5E7EB",
      borderRadius: "8px",
      padding: "1.5rem",
      marginBottom: "2rem",
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h3 style={{ 
            fontFamily: "'Outfit', sans-serif", 
            fontSize: "1.125rem", 
            fontWeight: 600, 
            color: "#111827",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            margin: 0
          }}>
            Portfolio Visibility
            {isPublic ? (
              <Globe size={18} color="#059669" />
            ) : (
              <Lock size={18} color="#6B7280" />
            )}
          </h3>
          <p style={{ margin: "0.25rem 0 0", fontSize: "0.875rem", color: "#6B7280" }}>
            {isPublic 
              ? "Your portfolio is live and visible to the public." 
              : "Your portfolio is currently hidden from the public."}
          </p>
        </div>

        <button
          onClick={handleToggle}
          disabled={isPending}
          style={{
            position: "relative",
            width: "56px",
            height: "32px",
            borderRadius: "9999px",
            border: "none",
            backgroundColor: isPublic ? "#1A1A1A" : "#E5E7EB",
            cursor: isPending ? "not-allowed" : "pointer",
            transition: "background-color 0.3s ease",
            padding: "4px"
          }}
          aria-pressed={isPublic}
        >
          <span 
            style={{
              display: "block",
              width: "24px",
              height: "24px",
              borderRadius: "50%",
              backgroundColor: "#FFFFFF",
              transform: isPublic ? "translateX(24px)" : "translateX(0)",
              transition: "transform 0.3s ease",
              boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
            }} 
          />
        </button>
      </div>

      {error && (
        <div style={{ color: "#DC2626", fontSize: "0.875rem" }}>
          {error}
        </div>
      )}

      {isPublic && (
        <div style={{
          backgroundColor: "#F9FAFB",
          border: "1px solid #E5E7EB",
          borderRadius: "6px",
          padding: "1rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <div style={{ overflow: "hidden" }}>
            <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "0.25rem" }}>
              Public URL
            </span>
            <a 
              href={publicUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "monospace",
                color: "#2563EB",
                textDecoration: "none",
                wordBreak: "break-all"
              }}
            >
              {publicUrl}
            </a>
          </div>
          
          <button 
            onClick={copyToClipboard}
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: copied ? "#059669" : "#6B7280",
              cursor: "pointer",
              padding: "0.5rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              transition: "color 0.2s"
            }}
            title="Copy to clipboard"
          >
            {copied ? <CheckCircle2 size={20} /> : <Copy size={20} />}
          </button>
        </div>
      )}
    </div>
  );
}
