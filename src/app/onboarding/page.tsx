import { OnboardingWizard } from "@/components/onboarding";

export default function OnboardingPage() {
  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <OnboardingWizard
        userEmail="model@example.com"
        userId="dummy-id-123"
        subscriptionTier="FREE"
      />
    </div>
  );
}
