import Link from "next/link";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterProps {
  links?: FooterLink[];
  showLinks?: boolean;
}

const defaultLinks: FooterLink[] = [
  { label: "Pricing", href: "/#pricing" },
  { label: "Contact", href: "/#contact" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

export function Footer({
  links = defaultLinks,
  showLinks = true,
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="section-padding bg-brand-light"
      style={{
        padding: `40px 48px`,
        borderTop: `1px solid rgba(33, 37, 41, 0.1)`,
      }}
    >
      <div className="w-full max-w-7xl mx-auto flex justify-between items-center flex-wrap gap-8">
        <Link
          href="/"
          style={{
            letterSpacing: "3px",
            textTransform: "uppercase",
            textDecoration: "none",
          }}
          className="text-sm font-light text-brand-dark font-cormorant"
        >
          Pose & Poise
        </Link>

        {showLinks && links && links.length > 0 && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
            className="gap-8"
          >
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="pp-nav-link font-outfit text-xs text-brand-dark/40"
                style={{
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}

        <p className="font-outfit text-xs text-brand-dark/40">
          © {currentYear} Pose & Poise. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
