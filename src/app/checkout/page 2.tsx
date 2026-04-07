"use client";

import { useEffect, useState, useRef } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import Link from "next/link";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

export default function CheckoutPage() {
  const [clientSecret, setClientSecret] = useState<string>('');
  const [error, setError] = useState<string>('');
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    fetch("/api/create-subscription", {
      method: "POST",
    })
      .then((res) => {
        if (!res.ok) {
           return res.json().then(e => { throw new Error(e.error) });
        }
        return res.json();
      })
      .then((data) => {
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        } else {
          setError("Failed to generate secure context locally.");
        }
      })
      .catch((err) => {
        console.error("Failed to fetch intent:", err);
        setError(err.message || "Failed to initialize secure checkout. Please try again.");
      });
  }, []);

  const appearance = {
    theme: 'stripe' as const,
    variables: {
      colorPrimary: '#1A1A1A',
      colorBackground: '#ffffff',
      colorText: '#1A1A1A',
      fontFamily: 'Outfit, system-ui, sans-serif',
      borderRadius: '6px',
      spacingGridRow: '18px',
    },
    rules: {
      '.Label': {
        color: '#666666',
        fontWeight: '500',
        fontSize: '13px',
        textTransform: 'uppercase' as const,
        letterSpacing: '1px'
      },
      '.Input': {
        border: '1px solid #EAEAED',
        boxShadow: 'none',
        padding: '14px',
        fontSize: '16px',
        color: '#1A1A1A'
      },
      '.Input:focus': {
        border: '1px solid #1A1A1A',
        boxShadow: '0 0 0 1px #1A1A1A',
      },
      '.Tab': {
        border: '1px solid #EAEAED',
        boxShadow: 'none',
        padding: '12px',
      },
      '.Tab:focus': {
        border: '1px solid #1A1A1A',
      },
      '.Tab--selected': {
        border: '1px solid #1A1A1A',
        color: '#1A1A1A',
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAF9] py-16 px-6 flex flex-col items-center">
      
      {/* Brand Header */}
      <div className="mb-12 text-center w-full max-w-xl relative flex justify-center">
        <Link href="/dashboard" className="flex flex-col items-center gap-4 hover:opacity-80 transition-opacity">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="transition-colors duration-500">
            <circle cx="13" cy="3" r="1.2" fill="#C4A484" stroke="none"></circle>
            <path d="M13 4.5c-1 0-2.5.5-3.5 2s-1 3-1 3"></path>
            <path d="M13 4.5c.8 3 0 7-2 9"></path>
            <path d="M11 13.5c-2 3-5 5-6 9.5h14c-1-5-4-7-6-9.5"></path>
            <path d="M11 15l1 7" opacity="0.3" strokeWidth="0.8"></path>
            <path d="M11 7.5l3.5 1.5-1 4"></path>
          </svg>
          <div className="flex flex-col items-center text-center">
            <h1 className="font-['Cormorant_Garamond'] uppercase text-[24px] font-[300] leading-[1.4] tracking-[6px] text-[#1A1A1A] m-0">Pose & Poise</h1>
          </div>
        </Link>
        <div className="absolute right-0 top-0 bg-[#1A1A1A] text-white text-[10px] uppercase font-['Outfit'] tracking-widest px-3 py-1 rounded-sm hidden sm:block">
          Secure
        </div>
      </div>

      <div className="max-w-xl w-full">
        {error ? (
          <div className="bg-red-50 border border-red-100 text-red-600 p-6 rounded-lg text-center font-['Outfit'] shadow-[0_10px_40px_rgba(0,0,0,0.05)]">
            <p className="font-semibold mb-2">Configuration Validation Error</p>
            <p className="text-sm">{error}</p>
          </div>
        ) : clientSecret ? (
          <div className="bg-white p-8 md:p-12 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.05)] border border-[#EAEAED]">
            <div className="mb-8 border-b border-[#EAEAED] pb-6">
              <h2 className="text-3xl font-['Cormorant_Garamond'] text-[#1A1A1A] mb-2 leading-tight">Professional Subscription</h2>
              <p className="text-[#666666] font-['Outfit'] text-sm tracking-wide">Enter your credentials below to unlock complete dashboard tooling.</p>
            </div>
            
            <Elements options={{ clientSecret, appearance }} stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center h-80 bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.05)] border border-[#EAEAED]">
            <div className="w-8 h-8 border-2 border-[#1A1A1A] border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-[#666666] font-['Outfit'] text-sm tracking-widest uppercase">Initializing Context...</p>
          </div>
        )}
      </div>
      
      <div className="mt-12 text-[#999999] font-['Outfit'] text-sm flex gap-4 text-center">
         <Link href="#" className="hover:text-[#1A1A1A]">Terms of Service</Link>
         <span>|</span>
         <Link href="#" className="hover:text-[#1A1A1A]">Privacy Policy</Link>
      </div>
    </div>
  );
}
