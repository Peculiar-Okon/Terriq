"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { TerrIQLogo } from "@/components/brands/terriq-logo";
import {
  StepReveal,
  OptionCard,
  CheckDot,
} from "@/components/onboarding/onboarding-motion";

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
    <div className="mx-auto flex min-h-screen max-w-3xl flex-col px-6 py-8">
      <TerrIQLogo />

      <div className="mt-10 flex-1 pb-10 sm:mt-16">
        <StepReveal className="mb-8 sm:mb-10">
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#B66A45] sm:text-sm">
            01 / 03 · Use case
          </p>

          <h1 className="mt-3 text-2xl font-medium tracking-[-0.03em] text-[#171A17] sm:mt-4 sm:text-5xl sm:tracking-[-0.04em]">
            What are you looking to assess?
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-[#6D7069] sm:mt-4 sm:text-base sm:leading-7">
            Tell us what you're trying to understand. TerrIQ will use
            this context to make environmental information more useful.
          </p>
        </StepReveal>

        <StepReveal index={1}>
        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
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
                <OptionCard
                  key={item.value}
                  selected={selected}
                  onClick={() => handleUseCaseChange(item.value)}
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

                    <CheckDot selected={selected} />
                  </div>
                </OptionCard>
              );
            })}
          </div>

          <AnimatePresence initial={false}>
          {showSite && (
            <motion.div
              key="site"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <p className="mb-3 text-sm font-medium text-[#26332B]">
                What are you planning?
              </p>

              <div className="grid gap-3 sm:grid-cols-2">
                {siteContexts.map((context) => {
                  const selected = siteContext === context;

                  return (
                    <OptionCard
                      key={context}
                      selected={selected}
                      onClick={() => setSiteContext(context)}
                      className="rounded-xl px-4 py-4"
                    >
                      <span className="flex items-center justify-between gap-3">
                        {context}
                        {selected && (
                          <span className="text-[#23483A]">✓</span>
                        )}
                      </span>
                    </OptionCard>
                  );
                })}
              </div>
            </motion.div>
          )}

          {showOperation && (
            <motion.div
              key="operation"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <p className="mb-3 text-sm font-medium text-[#26332B]">
                What do you operate?
              </p>

              <div className="grid gap-3 sm:grid-cols-2">
                {operationContexts.map((context) => {
                  const selected = operationContext === context;

                  return (
                    <OptionCard
                      key={context}
                      selected={selected}
                      onClick={() => setOperationContext(context)}
                      className="rounded-xl px-4 py-4"
                    >
                      <span className="flex items-center justify-between gap-3">
                        {context}
                        {selected && (
                          <span className="text-[#23483A]">✓</span>
                        )}
                      </span>
                    </OptionCard>
                  );
                })}
              </div>
            </motion.div>
          )}
          </AnimatePresence>

          {error && (
            <div className="rounded-xl border border-[#E8B7B2] bg-[#FDF3F2] px-4 py-3">
              <p className="text-sm text-[#A9443D]">{error}</p>
            </div>
          )}

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.99 }}
            className="h-12 w-full rounded-xl bg-[#23483A] text-sm font-medium text-white transition hover:bg-[#1B392E] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Saving..." : "Continue"}
          </motion.button>
        </form>
        </StepReveal>
      </div>
    </div>
  );
}