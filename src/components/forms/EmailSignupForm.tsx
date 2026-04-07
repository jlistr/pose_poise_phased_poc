"use client";
import { type FormEvent, useState, useEffect } from "react";

interface EmailSignupFormProps {
  buttonText?: string;
  placeholder?: string;
  className?: string;
}

export function EmailSignupForm({
  buttonText = "Get Started Free",
  placeholder = "Enter your email",
  className = "",
}: EmailSignupFormProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(0);

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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (secondsLeft > 0) return;

    setError(null);
    setLoading(true);

    const { createBrowserClient } = await import("@supabase/ssr");
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/onboarding`,
      },
    });

    setLoading(false);

    if (!error) {
      setSubmitted(true);
      const COOLDOWN_SECONDS = 60;
      const until = Date.now() + COOLDOWN_SECONDS * 1000;
      localStorage.setItem("magic_link_cooldown_until", String(until));
      setSecondsLeft(COOLDOWN_SECONDS);
    } else {
      if (error.message?.toLowerCase().includes("rate limit")) {
        setError("Too many attempts. Please wait and try again.");
      } else {
        setError(error.message);
      }
    }
  };

  if (submitted) {
    return (
      <div
        style={{
          background: "rgba(196, 164, 132, 0.08)",
          borderRadius: "8px",
          border: "1px solid rgba(196, 164, 132, 0.2)",
        }}
        className="font-outfit text-[15px] py-8 px-10"
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "8px",
          }}
        >
          <span
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "16px",
            }}
            className="bg-brand-gold text-brand-light"
          >
            ✓
          </span>
          <span
            style={{
              fontWeight: 500,
            }}
            className="text-brand-dark text-[15px]"
          >
            Check your inbox!
          </span>
        </div>
        <p
          style={{
            color: "rgba(26, 26, 26, 0.7)",
            margin: 0,
            paddingLeft: "44px",
            lineHeight: 1.6,
          }}
          className="text-sm"
        >
          We&apos;ve sent a verification link to <strong>{email}</strong>. Click
          the link to create your free account and start building your
          portfolio.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`hero-form ${className} flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full max-w-[580px] relative`}
    >
      <input
        type="email"
        placeholder={placeholder}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full flex-1 bg-transparent border border-brand-dark/20 py-[18px] px-6 font-outfit text-[14px] outline-none transition-colors duration-300 focus:border-brand-gold text-brand-dark placeholder:text-brand-dark/40 placeholder:tracking-[0.5px]"
      />
      <button
        type="submit"
        disabled={loading || secondsLeft > 0}
        className="bg-brand-dark text-brand-light border border-brand-dark font-outfit text-[13px] font-normal tracking-[2px] uppercase px-10 sm:px-14 py-[18px] w-full sm:w-auto sm:min-w-[220px] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
      >
        {loading ? "Sending..." : secondsLeft > 0 ? `Try again in ${secondsLeft}s` : buttonText}
      </button>
      {error && (
        <p className="w-full font-outfit text-xs text-[#D64545] mt-2 sm:absolute sm:-bottom-8 left-0">
          {error}
        </p>
      )}
    </form>
  );
}
