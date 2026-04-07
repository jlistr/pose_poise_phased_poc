import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    // Execute a hard database mutation to officially finalize the telemetry loop
    // BYPASS RLS to ensure we update regardless of nested permissions
    const supabaseAdmin = createAdminClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { error: profileError } = await supabaseAdmin
      .from("profiles")
      .update({ onboarding_completed: true })
      .eq("id", user.id);

    const { error: progressError } = await supabaseAdmin
      .from("onboarding_progress")
      .update({ completed: true })
      .eq("id", user.id);

    if (profileError || progressError) {
      console.error("Supabase Onboarding Complete Mutation Error:", profileError || progressError);
      return NextResponse.json({ error: "Database Mutation failed" }, { status: 500 });
    }

    // Provision a free-tier subscription row so the user always has a tracked plan
    await supabaseAdmin
      .from("subscriptions")
      .upsert({
        id: user.id,
        status: "trialing",
        plan_tier: "free",
      }, { onConflict: "id" });

    return NextResponse.json({
      success: true,
      message: "Onboarding completed successfully.",
    });
  } catch (error) {
    console.error("Onboarding complete error:", error);
    return NextResponse.json({ error: "Failed to complete onboarding" }, { status: 500 });
  }
}
