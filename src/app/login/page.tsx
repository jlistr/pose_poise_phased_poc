"use client";

import { useTransition, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { loginWithMagicLink } from "./actions";
import { colors, fonts } from "@/components/onboarding/types";
import { Suspense } from "react";

function LoginForm() {
  const searchParams = useSearchParams();
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [isPending, setIsPending] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">(searchParams.has("error") ? "error" : "idle");
  const [errorMessage, setErrorMessage] = useState(searchParams.get("error") || "");

  // Restore cooldown after refresh
  useEffect(() => {
    const until = Number(localStorage.getItem("magic_link_cooldown_until") || 0);
    const now = Date.now();
    if (until > now) {
      setSecondsLeft(Math.ceil((until - now) / 1000));
    }
  }, []);

  // Countdown timer
  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          localStorage.removeItem("magic_link_cooldown_until");
          return 0;
        }
        return s - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsLeft]);

  const handleSubmit = async (formData: FormData) => {
    if (secondsLeft > 0) return;
    
    setStatus("idle");
    setErrorMessage("");
    setIsPending(true);

    const email = formData.get("email") as string;
    if (!email) {
      setErrorMessage("Email is required");
      setIsPending(false);
      return;
    }

    const { createBrowserClient } = await import("@supabase/ssr");
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/auth/confirm?next=/dashboard`,
      },
    });

    setIsPending(false);

    if (error) {
      setStatus("error");
      if (error.message.toLowerCase().includes("rate limit")) {
        setErrorMessage("Too many attempts. Please wait and try again.");
      } else {
        setErrorMessage(error.message);
      }
    } else {
      setStatus("success");
      const COOLDOWN_SECONDS = 60;
      const until = Date.now() + COOLDOWN_SECONDS * 1000;
      localStorage.setItem("magic_link_cooldown_until", String(until));
      setSecondsLeft(COOLDOWN_SECONDS);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.cream,
        fontFamily: fonts.body,
        padding: "1rem",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          backgroundColor: colors.white,
          padding: "3rem 2.5rem",
          borderRadius: "12px",
          boxShadow: "0 10px 40px rgba(0,0,0,0.05)",
          border: `1px solid ${colors.border}`,
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontFamily: fonts.heading,
            fontSize: "2rem",
            color: colors.charcoal,
            marginBottom: "0.5rem",
            fontWeight: "normal",
          }}
        >
          Pose & Poise Studio
        </h1>
        <p style={{ color: colors.textSecondary, fontSize: "14px", marginBottom: "2.5rem" }}>
          Enter your email to sign in to your dashboard.
        </p>

        {status === "success" ? (
          <div
            style={{
              padding: "1.5rem",
              backgroundColor: colors.successLight,
              color: colors.success,
              borderRadius: "8px",
              fontSize: "14px",
              border: `1px solid ${colors.success}`,
            }}
          >
            Check your email for the magic link to sign in!
          </div>
        ) : (
          <form action={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div style={{ textAlign: "left" }}>
              <label
                htmlFor="email"
                style={{ display: "block", fontSize: "12px", letterSpacing: "0.05em", color: colors.charcoal, marginBottom: "0.5rem", textTransform: "uppercase", fontWeight: 600 }}
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="hello@example.com"
                style={{
                  width: "100%",
                  padding: "0.875rem 1rem",
                  fontSize: "15px",
                  borderRadius: "6px",
                  border: `1px solid ${colors.border}`,
                  outline: "none",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "var(--color-brand-gold)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = colors.border)}
              />
            </div>

            {status === "error" && (
              <div style={{ color: colors.error, fontSize: "13px", textAlign: "left" }}>
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={isPending || secondsLeft > 0}
              style={{
                width: "100%",
                padding: "1rem",
                backgroundColor: "var(--color-brand-dark)",
                color: colors.white,
                border: "none",
                borderRadius: "6px",
                fontSize: "14px",
                fontWeight: 600,
                letterSpacing: "0.05em",
                cursor: (isPending || secondsLeft > 0) ? "wait" : "pointer",
                opacity: (isPending || secondsLeft > 0) ? 0.7 : 1,
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                if (!isPending && secondsLeft <= 0) {
                  e.currentTarget.style.backgroundColor = "var(--color-brand-gold)";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isPending && secondsLeft <= 0) {
                  e.currentTarget.style.backgroundColor = "var(--color-brand-dark)";
                  e.currentTarget.style.transform = "translateY(0)";
                }
              }}
            >
              {isPending
                ? "SENDING..."
                : secondsLeft > 0
                ? `TRY AGAIN IN ${secondsLeft}S`
                : "SEND MAGIC LINK"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", backgroundColor: colors.cream }} />}>
      <LoginForm />
    </Suspense>
  );
}
