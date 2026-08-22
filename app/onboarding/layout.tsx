"use client";

import { usePathname } from "next/navigation";
import { TerrIQLogo } from "@/components/brands/terriq-logo";
import {
  StepProgress,
  StepTransition,
} from "@/components/onboarding/onboarding-motion";

const STEPS = [
  "/onboarding/Use-case",
  "/onboarding/place",
  "/onboarding/snapshot",
];

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const currentStep = Math.max(
    STEPS.findIndex((step) =>
      pathname.toLowerCase().startsWith(step.toLowerCase())
    ) + 1,
    1
  );

  return (
    <main className="min-h-screen bg-[#F5F3ED]">
      <header className="border-b border-[#D9D7CE] bg-[#FBFAF6]">
        <div className="mx-auto max-w-3xl px-6 py-5">
          <TerrIQLogo />

          <div className="mt-4">
            <StepProgress steps={STEPS.length} current={currentStep} />
          </div>
        </div>
      </header>

      <StepTransition>{children}</StepTransition>
    </main>
  );
}