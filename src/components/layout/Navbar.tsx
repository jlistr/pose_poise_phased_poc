"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Logo from "@/components/common/Logo";

interface NavLink {
  label: string;
  href: string;
}

interface UserInfo {
  name?: string;
  email?: string;
  avatarUrl?: string;
}

type UserPlan = "free" | "professional" | "deluxe" | "trial";

interface NavbarProps {
  links?: NavLink[];
  showLinks?: boolean;
  variant?: "transparent" | "solid";
  isAuthenticated?: boolean;
  user?: UserInfo;
  userPlan?: UserPlan;
  onSignOut?: () => void;
}

const publicLinks: NavLink[] = [
  { label: "Pricing", href: "/#pricing" },
  { label: "Examples", href: "/examples" },
  { label: "Contact", href: "/#contact" },
];

const authenticatedLinks: NavLink[] = [
  { label: "Pricing", href: "/#pricing" },
  { label: "Examples", href: "/examples" },
  { label: "Support", href: "/support" },
];

function getInitials(name?: string, email?: string): string {
  if (name) {
    const parts = name.split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  }
  if (email) {
    return email.substring(0, 2).toUpperCase();
  }
  return "U";
}

export function Navbar({
  links,
  showLinks = true,
  variant = "transparent",
  isAuthenticated = false,
  user,
  userPlan = "free",
  onSignOut,
}: NavbarProps) {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks =
    links ?? (isAuthenticated ? authenticatedLinks : publicLinks);
  const initials = getInitials(user?.name, user?.email);

  const handleSignOut = async () => {
    setDropdownOpen(false);
    if (onSignOut) {
      onSignOut();
    } else {
      try {
        await fetch("/api/auth/logout", { method: "POST" });
        router.push("/login");
      } catch (error) {
        console.error("Sign out failed:", error);
      }
    }
  };

  const navClasses = [
    "py-8 flex justify-center items-center w-full z-[100]",
    variant === "transparent"
      ? "fixed top-0 left-0 right-0 bg-gradient-to-b from-brand-light from-60% to-transparent"
      : "relative top-0 left-0 right-0 bg-brand-light border-b border-brand-dark/10",
  ].join(" ");

  return (
    <nav className={navClasses}>
      <div className="w-full max-w-7xl mx-auto px-6 md:px-8 lg:px-12 flex justify-between items-center">
        <Logo
          className={loaded ? "fade-up delay-1" : ""}
          color="#1A1A1A"
          textColor="#1A1A1A"
        />

      {showLinks && (
        <div className="flex items-center gap-10">
          {navLinks.map((link, i) => (
            <Link
              key={link.label}
              href={link.href}
              className={`font-outfit text-[14px] text-brand-dark/60 no-underline transition-colors duration-200 hover:text-brand-gold ${loaded ? `fade-up delay-${i + 2}` : ""}`}
            >
              {link.label}
            </Link>
          ))}

          {/* Auth Links */}
          {isAuthenticated ? (
            <div className="flex items-center gap-8">
              {/* Upgrade CTA */}
              {(userPlan === "free" ||
                userPlan === "professional" ||
                userPlan === "trial") && (
                <Link
                  href="/pricing"
                  className={`flex items-center gap-[6px] font-outfit text-xs font-medium uppercase tracking-wider px-4 py-2 bg-gradient-to-br from-[#FF7AA2] to-brand-gold text-white rounded-md no-underline transition-all duration-300 shadow-[0_2px_8px_rgba(255,122,162,0.25)] hover:-translate-y-[1px] hover:shadow-[0_4px_12px_rgba(255,122,162,0.35)] ${loaded ? "fade-up delay-5" : ""}`}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                  {userPlan === "professional" ? "Go Deluxe" : "Upgrade"}
                </Link>
              )}

              {/* User Avatar with Dropdown */}
              <div
                ref={dropdownRef}
                className={`relative ${loaded ? "fade-up delay-6" : ""}`}
              >
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2.5 bg-transparent border-none cursor-pointer p-1 rounded-full transition-colors duration-200 hover:bg-black/5"
                >
                  {user?.avatarUrl ? (
                    <Image
                      src={user.avatarUrl}
                      alt={user.name || "Profile"}
                      width={36}
                      height={36}
                      className="w-9 h-9 min-w-9 min-h-9 max-w-9 max-h-9 rounded-full object-cover border-2 border-brand-dark/10"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-brand-dark text-brand-light flex items-center justify-center font-outfit text-xs font-medium tracking-[0.5px]">
                      {initials}
                    </div>
                  )}
                  {/* Dropdown arrow */}
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180" : "rotate-0"}`}
                  >
                    <path
                      d="M2.5 4.5L6 8L9.5 4.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute top-[calc(100%+8px)] right-0 min-w-[200px] bg-brand-light rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.12)] border border-brand-dark/10 overflow-hidden z-[200]">
                    {/* User Info Header */}
                    <div className="p-4 border-b border-brand-dark/10">
                      <p className="font-outfit text-sm font-medium text-brand-dark m-0">
                        {user?.name || "User"}
                      </p>
                      {user?.email && (
                        <p className="font-outfit text-xs text-brand-dark/40 mt-1 mb-0">
                          {user.email}
                        </p>
                      )}
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      <Link
                        href="/dashboard"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 font-outfit text-sm text-brand-dark/70 no-underline transition-colors duration-150 hover:bg-black/5"
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        >
                          <rect x="3" y="3" width="7" height="9" rx="1" />
                          <rect x="14" y="3" width="7" height="5" rx="1" />
                          <rect x="14" y="12" width="7" height="9" rx="1" />
                          <rect x="3" y="16" width="7" height="5" rx="1" />
                        </svg>
                        Dashboard
                      </Link>

                      <Link
                        href="/settings"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 font-outfit text-sm text-brand-dark/70 no-underline transition-colors duration-150 hover:bg-black/5"
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        >
                          <circle cx="12" cy="12" r="3" />
                          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                        </svg>
                        Settings
                      </Link>

                      <Link
                        href="/support"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 font-outfit text-sm text-brand-dark/70 no-underline transition-colors duration-150 hover:bg-black/5"
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                          <line x1="12" y1="17" x2="12.01" y2="17" />
                        </svg>
                        Help & Support
                      </Link>
                    </div>

                    {/* Sign Out */}
                    <div className="py-2 border-t border-brand-dark/10">
                      <button
                        onClick={handleSignOut}
                        className="w-full text-left flex items-center gap-3 px-4 py-2.5 font-outfit text-sm text-red-600 bg-transparent border-none cursor-pointer transition-colors duration-150 hover:bg-red-600/5 hover:text-red-700"
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        >
                          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                          <polyline points="16,17 21,12 16,7" />
                          <line x1="21" y1="12" x2="9" y2="12" />
                        </svg>
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <Link
              href="/login"
              className={`font-outfit text-sm text-brand-dark/60 no-underline transition-colors duration-200 hover:text-brand-gold ${loaded ? "fade-up delay-5" : ""}`}
            >
              Sign In
            </Link>
          )}
        </div>
      )}
      </div>
    </nav>
  );
}
