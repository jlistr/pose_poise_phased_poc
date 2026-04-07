"use client";
import {
  type ButtonHTMLAttributes,
  forwardRef,
  type InputHTMLAttributes,
} from "react";
import type { ButtonVariant } from "@/types";

export * from "./PricingCards";

/**
 * Button Component
 */
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = "primary", style, ...props }, ref) => {
    const baseStyles: React.CSSProperties = {
      border: "none",
      padding: `24px 48px`,
      fontFamily: "var(--font-outfit)",
      fontSize: "13px",
      fontWeight: 400,
      letterSpacing: "2px",
      textTransform: "uppercase",
      cursor: "pointer",
      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      position: "relative",
      overflow: "hidden",
    };

    const variants: Record<ButtonVariant, React.CSSProperties> = {
      primary: {
        background: "var(--color-brand-dark)",
        color: "var(--color-brand-light)",
      },
      accent: {
        background: "var(--color-brand-gold)",
        color: "var(--color-brand-dark)",
      },
      outline: {
        background: "transparent",
        color: "var(--color-brand-dark)",
        border: "1px solid rgba(33, 37, 41, 0.2)",
      },
      ghost: {
        background: "transparent",
        color: "var(--color-brand-dark)",
      },
    };

    return (
      <button
        ref={ref}
        style={{ ...baseStyles, ...variants[variant], ...style }}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

/**
 * Input Component
 */
interface InputComponentProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, InputComponentProps>(
  ({ style, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className="pp-input py-6 px-6 font-outfit text-sm"
        style={{
          background: "transparent",
          border: "1px solid rgba(33, 37, 41, 0.2)",
          width: "100%",
          maxWidth: "320px",
          outline: "none",
          transition: "all 0.2s ease",
          ...style,
        }}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";

/**
 * Feature Card Component
 */
interface FeatureCardProps {
  num: string;
  title: string;
  description: string;
}

export function FeatureCard({ num, title, description }: FeatureCardProps) {
  return (
    <div
      className="pp-feature-card p-10 bg-white/60"
      style={{
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(33, 37, 41, 0.1)",
        transition: "all 0.4s ease-out",
      }}
    >
      <span className="font-outfit text-[11px] tracking-[2px] text-brand-gold">
        {num}
      </span>
      <div
        style={{
          width: "40px",
          height: "1px",
          margin: `24px 0`,
        }}
        className="bg-brand-gold"
      />
      <h3 className="font-cormorant text-2xl font-normal mb-4 text-brand-dark">
        {title}
      </h3>
      <p className="font-outfit text-sm font-light text-brand-dark/60 leading-[1.7]">
        {description}
      </p>
    </div>
  );
}

/**
 * Section Label Component
 */
interface SectionLabelProps {
  children: React.ReactNode;
  color?: string;
}

export function SectionLabel({
  children,
  color = "var(--color-brand-gold)",
}: SectionLabelProps) {
  return (
    <p
      style={{
        textTransform: "uppercase",
        color,
      }}
      className="font-outfit text-xs tracking-[4px] mb-8"
    >
      {children}
    </p>
  );
}

/**
 * Nav Link Component
 */
interface NavLinkProps {
  children: React.ReactNode;
  href?: string;
  className?: string;
}

export function NavLink({ children, href = "#", className }: NavLinkProps) {
  return (
    <a
      href={href}
      className={`pp-nav-link ${className || ""} font-outfit text-xs tracking-[2px] text-brand-dark`}
      style={{
        textTransform: "uppercase",
        textDecoration: "none",
        transition: "all 0.2s ease",
        cursor: "pointer",
      }}
    >
      {children}
    </a>
  );
}

/**
 * Accent Line Component
 */
interface AccentLineProps {
  width?: string;
  margin?: string;
}

export function AccentLine({
  width = "40px",
  margin = `24px 0`,
}: AccentLineProps) {
  return (
    <div
      style={{
        width,
        height: "1px",
        margin,
      }}
      className="bg-brand-gold"
    />
  );
}
