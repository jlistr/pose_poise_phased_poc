import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // MOCK: pretend we saved to Supabase
    return NextResponse.json({
      success: true,
      message: "Template saved successfully.",
    });
  } catch (error) {
    console.error("Template save error:", error);
    return NextResponse.json({ error: "Failed to save template" }, { status: 500 });
  }
}
