"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { getAuthCallbackUrl } from "@/lib/utils/url";
import { EyeIcon, EyeOffIcon } from "@/components/icons/Icons";
import "./signup.css";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: getAuthCallbackUrl(),
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  };

  if (success) {
    return (
      <div className="signup-page-container">
        <div className="signup-content-center">
          <Link href="/" className="signup-logo-link">
            Pose & Poise
          </Link>

          <div className="success-icon-container">
            ✓
          </div>

          <h1 className="auth-heading">
            Check your email
          </h1>
          <p className="auth-subheading success-paragraph">
            We&apos;ve sent a confirmation link to <strong>{email}</strong>.
            Click the link to activate your account.
          </p>

          <Link href="/login" className="auth-link back-to-signin">
            Back to sign in
          </Link>

          <div className="decorative-divider" />
        </div>
      </div>
    );
  }

  return (
    <div className="signup-page-container">
      <div className="signup-content-container">
        {/* Logo */}
        <Link href="/" className="signup-logo-link signup-logo-center fade-up">
          Pose & Poise
        </Link>

        {/* Header */}
        <div className="form-header fade-up delay-1">
          <h1 className="auth-heading auth-heading-large">
            Create your portfolio
          </h1>
          <p className="auth-subheading">
            Start showcasing your work in minutes
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="fade-up delay-2">
          <div className="form-layout">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="auth-input"
              required
            />
            <div className="input-container">
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
                className="password-toggle-btn"
              >
                {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
              </button>
            </div>
            <div className="input-container">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="auth-input password-input"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="password-toggle-btn"
              >
                {showConfirmPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
              </button>
            </div>

            {error && (
              <p className="auth-error-message">
                {error}
              </p>
            )}

            <button type="submit" className="auth-button" disabled={loading}>
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </div>
        </form>

        {/* Terms */}
        <p className="auth-terms fade-up delay-3">
          By signing up, you agree to our{" "}
          <Link href="/terms" className="auth-link">
            Terms
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="auth-link">
            Privacy Policy
          </Link>
        </p>

        {/* Footer links */}
        <div className="auth-footer-links fade-up delay-3">
          <p>
            Already have an account?{" "}
            <Link href="/login" className="auth-link">
              Sign in
            </Link>
          </p>
        </div>

        {/* Decorative element */}
        <div className="decorative-divider" />
      </div>
    </div>
  );
}
