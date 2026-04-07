import { EmailSignupForm } from "@/components/auth/EmailSignupForm";
import { colors, fonts } from "@/components/onboarding/types";
import Link from "next/link";

export default function SignupPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.cream,
        fontFamily: fonts.body,
        padding: "2rem",
      }}
    >
      <div 
        style={{
          width: "100%",
          maxWidth: "480px",
          backgroundColor: colors.white,
          padding: "3rem 2rem",
          borderRadius: "12px",
          boxShadow: "0 10px 40px rgba(0,0,0,0.05)",
          border: `1px solid ${colors.border}`,
          textAlign: "center"
        }}
      >
        <h1 
          style={{ 
            fontFamily: fonts.heading, 
            fontSize: "2rem", 
            marginBottom: "1rem", 
            color: colors.charcoal 
          }}
        >
          Create an Account
        </h1>
        <p style={{ color: colors.textSecondary, marginBottom: "2.5rem" }}>
          Enter your email below to receive a secure magic link to get started. No password required.
        </p>

        {/* Instantiating the Component directly from components/auth per Supabase instructions */}
        <EmailSignupForm buttonText="Send Magic Link" placeholder="your@email.com" />

        <div style={{ marginTop: "2.5rem", fontSize: "14px", color: colors.textSecondary }}>
          Already have an account?{" "}
          <Link href="/login" style={{ color: "var(--color-brand-gold)", textDecoration: "none", fontWeight: 600 }}>
            Log in instead
          </Link>
        </div>
      </div>
    </main>
  );
}
