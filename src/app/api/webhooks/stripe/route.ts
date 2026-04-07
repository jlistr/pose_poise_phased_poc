import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.text();
    // Stripe Signature verification will go here once Stripe is configured
    
    console.log("Received Stripe Webhook", body.substring(0, 50) + "...");
    
    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Stripe webhook error:", err);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 400 }
    );
  }
}
