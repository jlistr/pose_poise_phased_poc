import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // MOCK: pretend we saved to Supabase and finished onboarding
    return NextResponse.json({
      success: true,
      message: "Onboarding completed successfully.",
    });
  } catch (error) {
    console.error("Onboarding complete error:", error);
    return NextResponse.json({ error: "Failed to complete onboarding" }, { status: 500 });
  }
}
