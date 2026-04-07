import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // MOCK: pretend we saved to Supabase
    return NextResponse.json({
      success: true,
      message: "Photo credits updated successfully.",
    });
  } catch (error) {
    console.error("Photo credits update error:", error);
    return NextResponse.json({ error: "Failed to update photo credits" }, { status: 500 });
  }
}
