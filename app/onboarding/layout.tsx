import { TerrIQLogo } from "@/components/brands/terriq-logo";

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#F5F3ED]">
      <header className="border-b border-[#D9D7CE] bg-[#FBFAF6]">
        <div className="mx-auto max-w-4xl px-6 py-5">
          <TerrIQLogo />
        </div>
      </header>

      {children}
    </main>
  );
}