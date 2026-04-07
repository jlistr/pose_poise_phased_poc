"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { EyeIcon, EyeOffIcon } from "@/components/icons/Icons";
import "./login.css";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  };

  return (
    <div className="login-container">
      
      <div className="login-content">
        {/* Logo */}
        <Link
          href="/"
          className="fade-up login-logo"
        >
          Pose & Poise
        </Link>

        {/* Header */}
        <div className="fade-up delay-1 login-header">
          <h1 className="login-title">
            Welcome back
          </h1>
          <p className="login-subtitle">
            Sign in to manage your portfolio
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="fade-up delay-2">
          <div className="login-form">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="auth-input"
              required
            />
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="auth-input password-input"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle"
              >
                {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
              </button>
            </div>

            {error && (
              <p className="error-message">
                {error}
              </p>
            )}

            <button type="submit" className="auth-button" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </button>
            
            <Link
              href="/auth/forgot-password"
              className="auth-link forgot-password-link"
            >
              Forgot your password?
            </Link>
          </div>
        </form>

        {/* Footer links */}
        <div className="fade-up delay-3 footer-links">
          <p>
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="auth-link">
              Sign up
            </Link>
          </p>
        </div>

        {/* Decorative element */}
        <div className="decorative-rule" />
      </div>
    </div>
  );
}
