"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function sendMagicLink(email: string) {
  if (!email || !email.includes("@")) {
    return { success: false, message: "Please enter a valid email address" };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/auth/confirm`,
    },
  });

  if (error) {
    return { success: false, message: error.message };
  }

  return { success: true, message: "Check your email!" };
}

export async function loginWithMagicLink(formData: FormData) {
  const email = formData.get("email") as string;
  const result = await sendMagicLink(email);
  if (!result.success) return { error: result.message };
  return { success: true };
}
