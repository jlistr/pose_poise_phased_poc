"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FeatureCard, SectionLabel } from "@/components/ui";
import type { Feature } from "@/types";
import { Navbar, Footer, OnboardingBannerAuto } from "@/components/layout";
import { EmailSignupForm, ContactForm } from "@/components/forms";
import { CheckIcon } from "@/components/icons/Icons";
import "./landing.css";

// ═══════════════════════════════════════════════════════════════════════════════
// FEATURE FLAG: Set to false to hide the hero image
// ═══════════════════════════════════════════════════════════════════════════════
const SHOW_HERO_IMAGE = true;
const HERO_IMAGE_PATH = "/hero-model.jpg";

const FEATURES: Feature[] = [
  {
    num: "01",
    title: "Instant Portfolio",
    desc: "Upload your photos, add your stats, and have a polished portfolio live in minutes.",
  },
  {
    num: "02",
    title: "Digital Comp Cards",
    desc: "Generate beautiful, shareable comp cards that update automatically.",
  },
  {
    num: "03",
    title: "Agency Discovery",
    desc: "Get noticed by agencies and brands actively searching for fresh talent.",
  },
];

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

export default function LandingPage() {
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  // Scroll animation observer
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px 0px -100px 0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, observerOptions);

    // Observe all elements with scroll animation classes
    const animatedElements = document.querySelectorAll(
      ".scroll-fade-up, .scroll-fade-in, .scroll-scale-in"
    );
    animatedElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="landing-page-wrapper">
      {/* Onboarding Banner - shows for logged-in users who haven't completed setup */}
      <OnboardingBannerAuto />

      {/* Navigation */}
      <Navbar isAuthenticated={false} />

      {/* Hero Section */}
      <section className="hero-section max-w-[1200px] mx-auto w-full">
        {/* Hero Image - subtle lifestyle photo */}
        {SHOW_HERO_IMAGE && (
          <div
            className={`hero-image-container ${loaded ? "fade-in delay-3" : ""}`}
          >
            {/* Soft cream overlay for blend */}
            <div className="hero-image-overlay" />
            {/* Subtle border frame */}
            <div className="hero-image-frame" />
            <img
              src={HERO_IMAGE_PATH}
              alt="Model in urban setting"
              className="hero-image"
            />
          </div>
        )}
        
        {/* Fallback decorative element when image is hidden */}
        {!SHOW_HERO_IMAGE && (
          <div className={`hero-decorative-fallback ${loaded ? "fade-in delay-3" : ""}`} />
        )}
        
        {/* Decorative circle */}
        <div className={`decorative-circle ${loaded ? "fade-in delay-4" : ""}`} />

        <div className="hero-content">
          <SectionLabel>
            <span className={loaded ? "fade-up delay-1" : ""}>
              The Portfolio Platform for Models
            </span>
          </SectionLabel>

          <h1 className={`hero-heading ${loaded ? "fade-up delay-2" : ""}`}>
            Your craft,
            <br />
            <em className="font-light">beautifully</em> presented
          </h1>

          <p className={`hero-subtitle ${loaded ? "fade-up delay-3" : ""}`}>
            Create a stunning portfolio that captures your essence. Share your comp cards, get
            discovered by top agencies, and book your next opportunity—all in one place.
          </p>

          <EmailSignupForm />
          
          <p className={`hero-social-proof ${loaded ? "fade-up delay-5" : ""}`}>
            Join 2,400+ models already on the platform
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding features-section">
        <div className="section-container">
          <div className="features-header scroll-fade-up">
            <div>
              <SectionLabel>Why Choose Us</SectionLabel>
              <h2 className="features-heading">
                Built for the
                <br />
                modern model
              </h2>
            </div>
            <p className="features-description">
              Everything you need to showcase your work, connect with clients, and manage your
              modeling career.
            </p>
          </div>

          <div className="features-grid">
            {FEATURES.map((feature, index) => (
              <div 
                key={feature.num} 
                className={`scroll-fade-up stagger-${index + 1}`}
              >
                <FeatureCard
                  num={feature.num}
                  title={feature.title}
                  description={feature.desc}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="section-padding pricing-section">
        <div className="section-container">
          {/* Pricing Header */}
          <div className="pricing-header scroll-fade-up">
            <SectionLabel>Pricing</SectionLabel>
            <h2 className="pricing-heading">
              Simple, transparent pricing
            </h2>
            <p className="pricing-subtitle">
              Start for free, upgrade when you're ready. No hidden fees.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="pricing-grid">
            {PRICING_TIERS.map((tier, index) => (
              <div
                key={tier.name}
                className={`pp-pricing-card scroll-scale-in stagger-${index + 1} ${tier.highlighted ? 'highlighted' : ''}`}
              >
                {/* Popular Badge */}
                {tier.highlighted && (
                  <div className="pricing-badge">
                    Most Popular
                  </div>
                )}

                {/* Tier Name */}
                <h3 className="pricing-card-heading">
                  {tier.name}
                </h3>

                {/* Description */}
                <p className="pricing-card-desc">
                  {tier.description}
                </p>

                {/* Price */}
                <div className="mb-10">
                  <div className="pricing-price-group">
                    <span className="pricing-price-value">
                      ${tier.price}
                    </span>
                    <span className="pricing-price-unit">
                      /month
                    </span>
                  </div>

                  {/* Yearly pricing */}
                  {tier.yearlyPrice > 0 && (
                    <p className="pricing-yearly-info">
                      ${tier.yearlyPrice}/year — Save ${tier.yearlySavings}
                    </p>
                  )}

                  {/* Note */}
                  {tier.note && (
                    <p className="pricing-note">
                      {tier.note}
                    </p>
                  )}
                </div>

                {/* CTA Button */}
                <Link
                  href={tier.ctaHref}
                  className="pp-pricing-cta"
                >
                  {tier.cta}
                </Link>

                {/* Divider */}
                <div className="pricing-divider" />

                {/* Features List */}
                <ul className="pricing-features-list">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="pricing-feature-item">
                      <span className="pricing-feature-icon">
                        <CheckIcon size={16} />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding cta-section">
        <div className="scroll-fade-up">
          <SectionLabel color="#c4a484">Ready to Begin?</SectionLabel>
          <h2 className="cta-heading">
            Your portfolio awaits
          </h2>
          <p className="cta-subtitle">
            Free to start. No credit card required.
          </p>
          <Link href="/signup" className="pp-button-accent">
            Create Your Portfolio
          </Link>
        </div>
      </section>

      {/* Contact Form */}
      <section 
        id="contact" 
        className="section-padding contact-section"
      >
        <div className="contact-container scroll-fade-up">
          <SectionLabel>Get in Touch</SectionLabel>
          <h2 className="features-heading mb-10">
            Contact Us
          </h2>
          <ContactForm />
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
