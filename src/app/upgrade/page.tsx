import Link from "next/link";
import { PricingCards } from "@/components/ui/PricingCards";
import "../landing.css"; // Satisfies the custom UI class dependencies stored centrally for the Grid

export default function UpgradePage() {
  return (
    <div className="min-h-[100vh] bg-[#FAFAF9] flex items-center justify-center py-20 px-6">
      <div className="w-full max-w-[1200px] flex flex-col items-center">
        
        {/* Gateway Heading */}
        <div className="text-center mb-16">
          <p className="font-outfit text-[#c4a484] tracking-[4px] uppercase text-xs mb-4">
            Tier Gateway
          </p>
          <h1 className="text-4xl md:text-5xl font-['Cormorant_Garamond'] font-medium text-[#1A1A1A] tracking-tight leading-tight mb-4">
            Unlock the Studio
          </h1>
          <p className="text-[#666666] text-lg font-['Outfit'] font-light leading-relaxed max-w-2xl mx-auto">
            Upgrade to Professional today to heavily expand your digital footprint. Cancel instantly anytime, risk-free.
          </p>
        </div>

        {/* DRY Pricing Block Injection */}
        <div className="w-full">
          <PricingCards isUpgradeFlow={true} />
        </div>

        {/* Egress */}
        <div className="mt-16 text-center">
          <Link href="/dashboard" className="text-sm font-['Outfit'] text-[#999999] hover:text-[#1A1A1A] transition-colors border-b border-transparent hover:border-[#1A1A1A] pb-1">
            &larr; Return to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
