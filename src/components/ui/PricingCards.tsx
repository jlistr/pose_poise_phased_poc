"use client";

import React from "react";
import Link from "next/link";
import { CheckIcon } from "@/components/icons/Icons";

interface PricingCardsProps {
  isUpgradeFlow?: boolean;
}

const PRICING_TIERS = [
  {
    name: "Free",
    price: 0,
    yearlyPrice: 0,
    yearlySavings: 0,
    description: "Perfect for getting started",
    cta: "Get Started",
    ctaHref: "/signup",
    highlighted: false,
    features: [
      "Up to 10 portfolio images",
      "Subdomain portfolio URL",
      "Basic comp card generator",
      "Portfolio analytics",
      "Read community posts",
    ],
    note: "No credit card required",
  },
  {
    name: "Professional",
    price: 20,
    yearlyPrice: 200,
    yearlySavings: 40,
    description: "For serious models building their career",
    cta: "Start Free Trial",
    ctaHref: "/signup?plan=professional",
    highlighted: true,
    features: [
      "Everything in Free",
      "Up to 50 portfolio images",
      "Choose from layout templates",
      "Choose from color themes",
      "All comp card templates",
      "PDF export",
      "Priority support",
      "Read & write community posts",
    ],
    note: null,
  },
  {
    name: "Deluxe",
    price: 30,
    yearlyPrice: 300,
    yearlySavings: 60,
    description: "For professionals who want it all",
    cta: "Start Free Trial",
    ctaHref: "/signup?plan=deluxe",
    highlighted: false,
    features: [
      "Everything in Professional",
      "Unlimited portfolio images",
      "Custom domain support",
      "Central message hub",
      "SMS notifications",
      "Calendar & event planning",
      "Promote photographers & agencies",
    ],
    note: null,
  },
];

export function PricingCards({ isUpgradeFlow = false }: PricingCardsProps) {
  return (
    <div className="pricing-grid">
      {PRICING_TIERS.map((tier, index) => {
        const isProfessional = tier.name === "Professional";
        const isFree = tier.name === "Free";
        const isDeluxe = tier.name === "Deluxe";
        
        // Disable actions outside the exact intent for this specific flow
        const isDisabledInFlow = isUpgradeFlow && (isFree || isDeluxe);

        return (
          <div
            key={tier.name}
            className={
              "pp-pricing-card " +
              (!isUpgradeFlow ? "scroll-scale-in stagger-" + (index + 1) : "visible opacity-100 scale-100") +
              " " + (tier.highlighted ? "highlighted" : "") +
              " " + (isDisabledInFlow ? "opacity-60 cursor-not-allowed" : "")
            }
            style={isDisabledInFlow ? { filter: "grayscale(100%)" } : undefined}
          >
            {/* Popular Badge */}
            {tier.highlighted && <div className="pricing-badge">Most Popular</div>}

            {/* Tier Name */}
            <h3 className="pricing-card-heading">{tier.name}</h3>

            {/* Description */}
            <p className="pricing-card-desc">{tier.description}</p>

            {/* Price */}
            <div className="mb-10">
              <div className="pricing-price-group">
                <span className="pricing-price-value">${tier.price}</span>
                <span className="pricing-price-unit">/month</span>
              </div>

              {/* Yearly pricing */}
              {tier.yearlyPrice > 0 && (
                <p className="pricing-yearly-info">
                  ${tier.yearlyPrice}/year — Save ${tier.yearlySavings}
                </p>
              )}

              {/* Note */}
              {tier.note && <p className="pricing-note">{tier.note}</p>}
            </div>

            {/* CTA Strategy */}
            {isUpgradeFlow ? (
              isProfessional ? (
                // In Upgrade flow, Professional is the active trigger launching the local Embedded Checkout session
                <Link href="/checkout" className="w-full block" style={{ textDecoration: 'none' }}>
                  <button type="button" className="pp-pricing-cta w-full" style={{ padding: "12px 24px", height: "auto" }}>
                    <span style={{ display: 'block', fontWeight: 'bold' }}>UPGRADE TO PROFESSIONAL</span>
                    <span style={{ display: 'block', fontSize: '0.7rem', opacity: 0.8, marginTop: '4px', letterSpacing: '0.1em' }}>
                      Start 7-Day Free Trial
                    </span>
                  </button>
                </Link>
              ) : (
                // In Upgrade flow, others are rendered inactive
                <button disabled className="pp-pricing-cta w-full opacity-50 cursor-not-allowed">
                  {isFree ? "Current Plan" : "Coming Soon"}
                </button>
              )
            ) : (
              // On default Landing Page, behave normally
              <Link href={tier.ctaHref} className="pp-pricing-cta">
                {tier.cta}
              </Link>
            )}

            {/* Divider */}
            <div className="pricing-divider" />

            {/* Features List */}
            <ul className="pricing-features-list">
              {tier.features.map((feature, idx) => (
                <li key={idx} className="pricing-feature-item">
                  <span className="pricing-feature-icon">
                    <CheckIcon size={16} />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
