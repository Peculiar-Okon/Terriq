"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { TerrIQLogo } from "@/components/brands/terriq-logo";

type UseCase = "site" | "operation" | "both";

const siteContexts = [
  "Residential development",
  "Commercial property",
  "Warehouse / facility",
  "Industrial site",
  "Agricultural site",
  "Other",
];

const operationContexts = [
  "Logistics / transportation",
  "Warehouse / storage",
  "Retail / distribution",
  "Agriculture / food supply",
  "Manufacturing",
  "Other",
];

export default function UseCasePage() {
  const router = useRouter();

  const [useCase, setUseCase] = useState<UseCase | "">("");
  const [siteContext, setSiteContext] = useState("");
  const [operationContext, setOperationContext] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleUseCaseChange(value: UseCase) {
    setUseCase(value);

    if (value === "site") {
      setOperationContext("");
    }

    if (value === "operation") {
      setSiteContext("");
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!useCase) {
      setError("Choose what you want to assess.");
      return;
    }

    if ((useCase === "site" || useCase === "both") && !siteContext) {
      setError("Tell us what you are planning.");
      return;
    }

    if (
      (useCase === "operation" || useCase === "both") &&
      !operationContext
    ) {
      setError("Tell us what you operate.");
      return;
    }

    setLoading(true);
    setError("");

    const supabase = createClient();

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
        primary_use_case: useCase,
        site_context: siteContext || null,
        operation_context: operationContext || null,
      });

    if (upsertError) {
      setError(upsertError.message);
      setLoading(false);
      return;
    }

    router.push("/onboarding/place");
  }

  const showSite = useCase === "site" || useCase === "both";
  const showOperation = useCase === "operation" || useCase === "both";

  return (
    <main className="min-h-screen bg-[#F5F3ED]">
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col px-6 py-8">
        <TerrIQLogo />

        <div className="mt-16 flex-1 pb-10">
          <div className="mb-10">
            <p className="text-sm font-medium uppercase tracking-[0.15em] text-[#B66A45]">
              01 / 03 · Use case
            </p>

            <h1 className="mt-4 text-4xl font-medium tracking-[-0.04em] text-[#171A17] sm:text-5xl">
              What are you looking to assess?
            </h1>

            <p className="mt-4 max-w-xl text-base leading-7 text-[#6D7069]">
              Tell us what you&apos;re trying to understand. TerrIQ will use
              this context to make environmental information more useful.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-3">
              {[
                {
                  value: "site" as const,
                  title: "A site I'm considering",
                  description:
                    "Understand environmental risks before I build or invest.",
                },
                {
                  value: "operation" as const,
                  title: "An existing operation",
                  description:
                    "Monitor conditions that could affect how I operate.",
                },
                {
                  value: "both" as const,
                  title: "Both",
                  description:
                    "Assess sites and manage existing operations.",
                },
              ].map((item) => {
                const selected = useCase === item.value;

                return (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => handleUseCaseChange(item.value)}
                    className={`w-full rounded-2xl border px-5 py-5 text-left transition ${
                      selected
                        ? "border-[#23483A] bg-[#EAF0EB]"
                        : "border-[#D7D8D1] bg-white hover:border-[#AEB3AC]"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p
                          className={`text-sm font-medium ${
                            selected ? "text-[#23483A]" : "text-[#26332B]"
                          }`}
                        >
                          {item.title}
                        </p>

                        <p className="mt-1 text-sm leading-6 text-[#6D7069]">
                          {item.description}
                        </p>
                      </div>

                      <span
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-xs ${
                          selected
                            ? "border-[#23483A] bg-[#23483A] text-white"
                            : "border-[#C9CCC6] text-transparent"
                        }`}
                      >
                        ✓
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {showSite && (
              <div>
                <p className="mb-3 text-sm font-medium text-[#26332B]">
                  What are you planning?
                </p>

                <div className="grid gap-3 sm:grid-cols-2">
                  {siteContexts.map((context) => {
                    const selected = siteContext === context;

                    return (
                      <button
                        key={context}
                        type="button"
                        onClick={() => setSiteContext(context)}
                        className={`rounded-xl border px-4 py-4 text-left text-sm transition ${
                          selected
                            ? "border-[#23483A] bg-[#EAF0EB] text-[#23483A]"
                            : "border-[#D7D8D1] bg-white text-[#26332B] hover:border-[#AEB3AC]"
                        }`}
                      >
                        <span className="flex items-center justify-between gap-3">
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
            )}

            {showOperation && (
              <div>
                <p className="mb-3 text-sm font-medium text-[#26332B]">
                  What do you operate?
                </p>

                <div className="grid gap-3 sm:grid-cols-2">
                  {operationContexts.map((context) => {
                    const selected = operationContext === context;

                    return (
                      <button
                        key={context}
                        type="button"
                        onClick={() => setOperationContext(context)}
                        className={`rounded-xl border px-4 py-4 text-left text-sm transition ${
                          selected
                            ? "border-[#23483A] bg-[#EAF0EB] text-[#23483A]"
                            : "border-[#D7D8D1] bg-white text-[#26332B] hover:border-[#AEB3AC]"
                        }`}
                      >
                        <span className="flex items-center justify-between gap-3">
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
            )}

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
              {loading ? "Saving..." : "Continue"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}