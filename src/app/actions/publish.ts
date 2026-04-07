"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function togglePublishStatus(isPublic: boolean) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return { error: "Unauthorized access" };
    }

    const { error: updateError } = await (supabase as any)
      .from("profiles")
      .update({ is_public: isPublic })
      .eq("id", user.id);

    if (updateError) {
      console.error("Failed to update publish status:", updateError);
      return { error: updateError.message };
    }

    // Revalidate paths that rely on the profile data
    revalidatePath("/dashboard");
    revalidatePath("/[username]", "page");

    return { success: true, is_public: isPublic };
  } catch (err) {
    console.error("Unexpected error in togglePublishStatus:", err);
    return { error: "An unexpected error occurred." };
  }
}
