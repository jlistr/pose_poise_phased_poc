"use client";

import React, { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Return URL must resolve fully, even pointing back to localhost inside Next
        return_url: `${window.location.origin}/return`,
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message ?? "An expected error occurred.");
    } else {
      setMessage("An unexpected error occurred during checkout.");
    }

    setIsLoading(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit} className="w-full">
      {/* 
        This is where Stripe securely injects the iFrames and dynamically
        listens to our Layout parameters supplied in page.tsx 
      */}
      <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
      
      <button 
        disabled={isLoading || !stripe || !elements} 
        id="submit"
        className="w-full bg-[#1A1A1A] text-white mt-8 py-4 rounded-md font-['Outfit'] tracking-widest font-semibold hover:bg-black transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
      >
        <span id="button-text">
          {isLoading ? (
            <div className="border-t-transparent border-[#EAEAED] border-2 rounded-full w-5 h-5 mx-auto animate-spin"></div>
          ) : (
            <span className="flex justify-center items-center gap-2">
              <svg className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              SECURE CHECKOUT
            </span>
          )}
        </span>
      </button>
      
      {/* Show any error or success messages */}
      {message && (
        <div id="payment-message" className="mt-4 text-center text-red-500 font-['Outfit'] text-sm">
          {message}
        </div>
      )}
      
      <div className="mt-6 text-center">
         <p className="text-xs text-[#999999] font-['Outfit']">Payments are secured by 256-bit Stripe military encryption.</p>
      </div>
    </form>
  );
}
