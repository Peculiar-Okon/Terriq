"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { TerrIQLogo } from "@/components/brands/terriq-logo";

const goals = [
  "Reduce heat exposure",
  "Lower energy costs",
  "Prepare for flooding",
  "Improve water management",
  "Reduce environmental impact",
  "Make better local decisions",
];

const contexts = [
  "Where I live",
  "Where I work",
  "Where I study",
  "My neighbourhood",
  "A place I'm planning",
];

export default function PrioritiesPage() {
  const router = useRouter();
  const supabase = createClient();

  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [usageContext, setUsageContext] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function toggleGoal(goal: string) {
    setSelectedGoals((current) =>
      current.includes(goal)
        ? current.filter((item) => item !== goal)
        : [...current, goal]
    );
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (selectedGoals.length === 0) {
      setError("Choose at least one goal.");
      return;
    }

    if (!usageContext) {
      setError("Choose where this information matters to you.");
      return;
    }

    setLoading(true);
    setError("");

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    const { error: upsertError } = await supabase
      .from("profiles")
      .upsert({
        id: user.id,
        goals: selectedGoals,
        usage_context: usageContext,
        onboarding_completed: true,
      });

    if (upsertError) {
      setError(upsertError.message);
      setLoading(false);
      return;
    }

    router.push("/onboarding/snapshot");
  }

  return (
    <main className="min-h-screen bg-[#F5F3ED]">
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col px-6 py-8">
        <TerrIQLogo />

        <div className="mt-16 flex-1">
          <div className="mb-10">
            <p className="text-sm font-medium uppercase tracking-[0.15em] text-[#B66A45]">
              02 / 03
            </p>

            <h1 className="mt-4 text-4xl font-medium tracking-[-0.04em] text-[#171A17] sm:text-5xl">
              What should we help you understand?
            </h1>

            <p className="mt-4 max-w-xl text-base leading-7 text-[#6D7069]">
              Your priorities help TerrIQ turn environmental data into
              useful information instead of throwing a giant pile of
              numbers at you.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <div className="mb-3">
                <p className="text-sm font-medium text-[#26332B]">
                  Your priorities
                </p>

                <p className="mt-1 text-sm text-[#6D7069]">
                  Pick the outcomes you care about.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {goals.map((goal) => {
                  const selected = selectedGoals.includes(goal);

                  return (
                    <button
                      key={goal}
                      type="button"
                      onClick={() => toggleGoal(goal)}
                      className={`rounded-xl border px-4 py-4 text-left text-sm transition ${
                        selected
                          ? "border-[#23483A] bg-[#EAF0EB] text-[#23483A]"
                          : "border-[#D7D8D1] bg-white text-[#26332B] hover:border-[#AEB3AC]"
                      }`}
                    >
                      <span className="flex items-center justify-between">
                        {goal}

                        {selected && (
                          <span className="text-[#23483A]">✓</span>
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <div className="mb-3">
                <p className="text-sm font-medium text-[#26332B]">
                  Where will you use TerrIQ?
                </p>

                <p className="mt-1 text-sm text-[#6D7069]">
                  This can change as TerrIQ expands.
                </p>
              </div>

              <div className="space-y-3">
                {contexts.map((context) => {
                  const selected = usageContext === context;

                  return (
                    <button
                      key={context}
                      type="button"
                      onClick={() => setUsageContext(context)}
                      className={`w-full rounded-xl border px-4 py-4 text-left text-sm transition ${
                        selected
                          ? "border-[#23483A] bg-[#EAF0EB] text-[#23483A]"
                          : "border-[#D7D8D1] bg-white text-[#26332B] hover:border-[#AEB3AC]"
                      }`}
                    >
                      <span className="flex items-center justify-between">
                        {context}

                        {selected && (
                          <span className="text-[#23483A]">✓</span>
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {error && (
              <div className="rounded-xl border border-[#E8B7B2] bg-[#FDF3F2] px-4 py-3">
                <p className="text-sm text-[#A9443D]">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="h-12 w-full rounded-xl bg-[#23483A] text-sm font-medium text-white transition hover:bg-[#1B392E] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Setting things up..." : "See my environment"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}