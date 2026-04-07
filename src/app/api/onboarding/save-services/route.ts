import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // MOCK: pretend we saved to Supabase
    return NextResponse.json({
      success: true,
      message: "Services saved successfully.",
    });
  } catch (error) {
    console.error("Services save error:", error);
    return NextResponse.json({ error: "Failed to save services" }, { status: 500 });
  }
}
