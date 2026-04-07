import PortfolioPreview from "@/components/portfolio/PortfolioPreview";

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const resolvedParams = await params;

  return (
    <main>
      <PortfolioPreview username={resolvedParams.username} />
    </main>
  );
}
