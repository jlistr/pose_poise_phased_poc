import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { colors, fonts } from "@/components/onboarding/types";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: colors.cream,
        fontFamily: fonts.body,
      }}
    >
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem 2rem",
          borderBottom: `1px solid ${colors.border}`,
          backgroundColor: colors.white,
        }}
      >
        <span style={{ fontFamily: fonts.heading, fontSize: "18px", letterSpacing: "0.15em" }}>
          POSE & POISE
        </span>
        
        <form action="/auth/signout" method="POST">
          <button
            type="submit"
            style={{
              padding: "0.5rem 1rem",
              fontSize: "12px",
              backgroundColor: "transparent",
              border: `1px solid ${colors.border}`,
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Sign Out
          </button>
        </form>
      </header>

      <main style={{ padding: "4rem 2rem", maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
        <div 
          style={{
            backgroundColor: colors.white,
            padding: "3rem",
            borderRadius: "12px",
            boxShadow: "0 10px 40px rgba(0,0,0,0.05)",
            border: `1px solid ${colors.border}`,
          }}
        >
          <div 
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              backgroundColor: "var(--color-brand-light)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1.5rem",
              fontSize: "24px",
              color: "var(--color-brand-gold)",
            }}
          >
            ✓
          </div>
          <h1 style={{ fontFamily: fonts.heading, fontSize: "2rem", marginBottom: "1rem", color: colors.charcoal }}>
            Zero-to-Auth PoC Verified!
          </h1>
          <p style={{ color: colors.textSecondary, marginBottom: "2rem" }}>
            You are securely authenticated into your active session via Supabase Magic Link.
          </p>

          <div style={{ backgroundColor: "#F9FAFB", padding: "1rem", borderRadius: "6px", textAlign: "left", fontSize: "14px", fontFamily: "monospace", color: "#374151" }}>
            <strong>Session Authenticated Email:</strong><br />
            {user.email}
          </div>
          
          <div style={{ marginTop: "2rem" }}>
            <a 
              href="/onboarding"
              style={{
                display: "inline-block",
                padding: "0.875rem 2rem",
                backgroundColor: "var(--color-brand-gold)",
                color: colors.white,
                textDecoration: "none",
                borderRadius: "6px",
                fontSize: "14px",
                fontWeight: 600,
                letterSpacing: "0.05em",
                transition: "opacity 0.2s",
              }}
            >
              PROCEED TO ONBOARDING WIZARD →
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
