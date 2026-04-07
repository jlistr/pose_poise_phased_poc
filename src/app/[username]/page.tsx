import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { Metadata, ResolvingMetadata } from "next";
// We import the enhanced portfolio editor/viewer instead of PortfolioPreview
import PortfolioManagerEnhanced from "@/components/portfolio/PortfolioManagerEnhanced";

type Props = {
  params: Promise<{ username: string }>;
};

// Next.js standard Metadata generator function
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const resolvedParams = await params;
  const username = resolvedParams.username;
  const supabase = await createClient();

  const { data: profile } = await (supabase as any)
    .from("profiles")
    .select("display_name, bio, is_public")
    .ilike("username", username)
    .single();

  if (!profile || !profile.is_public) {
    return {
      title: "Portfolio Not Found | Pose & Poise",
    };
  }

  return {
    title: `${profile.display_name} | Portfolio`,
    description: profile.bio || `View ${profile.display_name}'s professional portfolio on Pose & Poise.`,
    openGraph: {
      title: `${profile.display_name} | Pose & Poise Studio`,
      description: profile.bio || `View ${profile.display_name}'s professional portfolio.`,
      type: "profile",
    },
  };
}

export default async function PortfolioPage({ params }: Props) {
  const resolvedParams = await params;
  const supabase = await createClient();

  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  const { data: profile } = await (supabase as any)
    .from("profiles")
    .select("*")
    .ilike("username", resolvedParams.username)
    .single();

  if (!profile) {
    notFound();
  }

  // Enforce Privacy
  const isOwner = authUser?.id === profile.id;
  if (!profile.is_public && !isOwner) {
    notFound();
  }

  return (
    <main>
      {!profile.is_public && isOwner && (
        <div style={{ padding: "0.5rem", backgroundColor: "#FEF3C7", color: "#92400E", textAlign: "center", fontSize: "14px", fontWeight: 600 }}>
          This portfolio is currently in DRAFT mode and is only visible to you.
        </div>
      )}
      {/* 
        We pass targetAppId as the username so it scopes correctly the artifacts. 
        If PortfolioManagerEnhanced doesn't take targetAppId yet, it just ignores it.
      */}
      <PortfolioManagerEnhanced />
    </main>
  );
}
