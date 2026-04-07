import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // MOCK: basic responses
    return NextResponse.json({
      success: true,
      message: "This is a mocked AI response from the PoC.",
      extractedData: {
        bio: "Mock generated biography. You are an incredible model with massive potential!"
      },
      confidence: "high"
    });
  } catch (error) {
    console.error("AI error:", error);
    return NextResponse.json({ error: "Failed to process AI" }, { status: 500 });
  }
}
