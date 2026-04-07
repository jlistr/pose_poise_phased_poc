import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
// NOTE: AuthProvider and QueryProvider require creating src/providers/ directory first
// Uncomment these imports after running: mkdir -p src/providers
// import { AuthProvider } from "@/providers/AuthProvider";
// import { QueryProvider } from "@/providers/QueryProvider";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pose & Poise — Professional Model Portfolios",
  description: "Create a stunning portfolio that captures your essence.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${outfit.variable}`}>
      <body>
        {/* TODO: Wrap with QueryProvider > AuthProvider after creating src/providers/ */}
        {/* <QueryProvider><AuthProvider> */}
        {children}
        {/* </AuthProvider></QueryProvider> */}
        <Analytics />
      </body>
    </html>
  );
}
