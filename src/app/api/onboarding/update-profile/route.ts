import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const contentType = request.headers.get("content-type") || "";
    let updates: Record<string, any> = {};

    if (contentType.includes("application/json")) {
      updates = await request.json();
    } else {
      const formData = await request.formData();
      const stringFields = ["username", "display_name", "location", "instagram", "facebook", "tiktok", "website", "agency", "bio", "shoe_size", "dress_size", "hair_color", "eye_color"];
      const numericFields = ["height_cm", "bust_cm", "waist_cm", "hips_cm"];

      stringFields.forEach(field => {
        if (formData.has(field)) updates[field] = formData.get(field);
      });

      numericFields.forEach(field => {
        if (formData.has(field)) {
          const value = formData.get(field);
          if (value && !isNaN(Number(value))) {
            updates[field] = Number(value);
          }
        }
      });
    }

    const { error: updateError } = await (supabase as any)
      .from("profiles")
      .update(updates)
      .eq("id", user.id);

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully.",
    });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}
