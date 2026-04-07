import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const currentCount = parseInt((formData.get("currentCount") as string) || "0", 10);
    
    if (currentCount >= 10) {
      return NextResponse.json(
        { error: "Maximum limit of 10 photos reached for free tier." },
        { status: 403 }
      );
    }

    if (!file) {
      return NextResponse.json({ error: "No physical file buffer was received by the API layer." }, { status: 400 });
    }
    
    // MOCK: Return proper Object structure expected by the front-end PhotoUploadSuccessResponse type.
    return NextResponse.json({
      success: true,
      photo: {
        id: "mock_photo_id_" + Date.now().toString(),
        url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800",
      }
    });
  } catch (error: any) {
    console.error("API ROUTE UPLOAD CRASH:", error);
    return NextResponse.json({ error: error?.message || "Failed to parse upload request entirely." }, { status: 500 });
  }
}
