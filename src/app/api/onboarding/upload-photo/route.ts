import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const tempId = formData.get("tempId") as string;
    const currentCount = parseInt((formData.get("currentCount") as string) || "0", 10);
    
    if (currentCount >= 10) {
      return NextResponse.json(
        { error: "Maximum limit of 10 photos reached for free tier." },
        { status: 403 }
      );
    }
    
    // MOCK: pretend we uploaded the photo successfully and returned a URL
    return NextResponse.json({
      success: true,
      url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800",
      id: tempId || Date.now().toString(),
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Failed to upload photo" }, { status: 500 });
  }
}
