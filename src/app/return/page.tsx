"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

function ReturnContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const paymentIntentClientSecret = searchParams.get("payment_intent_client_secret");
  const setupIntentClientSecret = searchParams.get("setup_intent_client_secret");
  const clientSecret = paymentIntentClientSecret || setupIntentClientSecret;

  const [status, setStatus] = useState<string>("loading");

  useEffect(() => {
    if (!clientSecret) {
      router.push("/dashboard");
      return;
    }

    stripePromise.then(async (stripe) => {
      if (!stripe) {
        setStatus("error");
        return;
      }

      const isSetup = clientSecret.startsWith("seti_");
      let stripeStatus: string | undefined;

      if (isSetup) {
        const { setupIntent, error } = await stripe.retrieveSetupIntent(clientSecret);
        if (error) { setStatus("error"); return; }
        stripeStatus = setupIntent?.status;
      } else {
        const { paymentIntent, error } = await stripe.retrievePaymentIntent(clientSecret);
        if (error) { setStatus("error"); return; }
        stripeStatus = paymentIntent?.status;
      }

      if (stripeStatus === 'succeeded') {
        // Confirm the subscription in the database immediately
        const subscriptionId = sessionStorage.getItem('pp_subscription_id');
        if (subscriptionId) {
          try {
            await fetch('/api/confirm-subscription', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ subscriptionId }),
            });
            sessionStorage.removeItem('pp_subscription_id');
          } catch (e) {
            console.error('Failed to confirm subscription in DB:', e);
          }
        }
        setStatus('complete');
      } else if (stripeStatus === 'processing') {
        setStatus('open');
      } else {
        setStatus('error');
      }
    });
  }, [clientSecret, router]);

  return (
    <div className="min-h-[100vh] bg-[#FAFAF9] py-20 px-6 flex flex-col items-center justify-center">
      <div className="max-w-xl mx-auto bg-white p-10 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.05)] border border-[#EAEAED] text-center w-full">
        
        {status === "loading" && (
          <div className="flex flex-col items-center py-6">
            <div className="w-8 h-8 border-2 border-[#1A1A1A] border-t-transparent rounded-full animate-spin mb-6"></div>
            <p className="text-[#666666] font-['Outfit'] uppercase tracking-widest text-sm">Verifying Sequence...</p>
          </div>
        )}
        
        {status === "complete" && (
          <div className="py-2">
            <div className="w-16 h-16 bg-[#F3F4F6] text-[#1A1A1A] rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">✓</div>
            <h1 className="text-3xl font-['Cormorant_Garamond'] mb-3 text-[#1A1A1A]">Subscription Activated</h1>
            <p className="text-[#666666] mb-8 font-['Outfit'] leading-relaxed">
              Welcome to the Professional tier. Your dashboard tooling has been instantly upgraded.
            </p>
            <Link 
              href="/dashboard"
              className="inline-block px-8 py-3 bg-[#1A1A1A] text-white rounded font-['Outfit'] text-sm tracking-wider uppercase hover:bg-black transition-colors w-full md:w-auto"
            >
              Enter Studio Dashboard
            </Link>
          </div>
        )}

        {status === "open" && (
          <div className="py-2">
            <div className="w-16 h-16 bg-yellow-50 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">!</div>
            <h1 className="text-3xl font-['Cormorant_Garamond'] mb-3 text-[#1A1A1A]">Payment Processing</h1>
            <p className="text-[#666666] mb-8 font-['Outfit'] leading-relaxed">
              Your payment is still processing through the network. We'll automatically unlock your Professional tools the moment it clears.
            </p>
            <Link 
              href="/dashboard"
              className="inline-block px-8 py-3 border border-[#EAEAED] text-[#1A1A1A] rounded font-['Outfit'] text-sm tracking-wider uppercase hover:bg-[#FAFAF9] transition-colors w-full md:w-auto"
            >
              Return to Profile
            </Link>
          </div>
        )}

        {status === "error" && (
          <div className="py-2">
            <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">✕</div>
            <h1 className="text-3xl font-['Cormorant_Garamond'] mb-3 text-[#1A1A1A]">Validation Interrupted</h1>
            <p className="text-[#666666] mb-8 font-['Outfit'] leading-relaxed">
              We couldn't securely process this transaction state. Please try another payment method.
            </p>
            <Link 
              href="/checkout"
              className="inline-block px-8 py-3 border border-[#EAEAED] text-[#1A1A1A] rounded font-['Outfit'] text-sm tracking-wider uppercase hover:bg-[#FAFAF9] transition-colors w-full md:w-auto"
            >
              Retry Checkout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

// NextJS 14 expects useSearchParams hooks to be formally scoped within Suspense boundaries during build-time
export default function ReturnPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FAFAF9] flex items-center justify-center">
        <p className="text-[#999999] font-['Outfit'] tracking-[2px] uppercase text-xs">Authenticating State...</p>
      </div>
    }>
      <ReturnContent />
    </Suspense>
  );
}
