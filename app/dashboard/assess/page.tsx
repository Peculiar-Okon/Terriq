"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Location,
} from "@/components/icons/terr-iq-icons";
import { MobileSidebar } from "@/components/dashboard/mobile-nav";

import {
  contextualQuestions,
  purposeOptions,
  type AssessmentAnswers,
  type AssessmentPurpose,
} from "@/lib/data/assessment";

export default function AssessPage() {
  const router = useRouter();

  const [step, setStep] = useState(1);

  const [answers, setAnswers] = useState<AssessmentAnswers>({
    purpose: null,
    location: "",
    context: {},
  });

  const purpose = answers.purpose;

  const questions = purpose
    ? contextualQuestions[purpose]
    : [];

  const selectPurpose = (value: AssessmentPurpose) => {
    setAnswers((current) => ({
      ...current,
      purpose: value,
      context: {},
    }));
  };

  const setContextAnswer = (id: string, value: string) => {
    setAnswers((current) => ({
      ...current,
      context: {
        ...current.context,
        [id]: value,
      },
    }));
  };

  const canContinueStep1 = Boolean(answers.purpose);
  const canContinueStep2 = Boolean(answers.location);

  const canContinueStep3 =
    questions.length === 0 ||
    questions.every((question) => answers.context[question.id]);

  const continueAssessment = () => {
    if (step === 1 && canContinueStep1) {
      setStep(2);
      return;
    }

    if (step === 2 && canContinueStep2) {
      setStep(3);
      return;
    }

    if (step === 3 && canContinueStep3) {
      router.push("/dashboard/assess/result");
    }
  };

  return (
    <main className="min-h-screen bg-[#F5F3ED] text-[#171A17]">
      <header className="sticky top-0 z-30 flex h-[72px] items-center border-b border-[#D9D7CE] bg-[#F5F3ED]/95 pl-16 pr-6 backdrop-blur lg:hidden">
        <MobileSidebar />
      </header>

      <div className="mx-auto max-w-[1100px] px-6 py-10 lg:px-12 lg:py-16">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#D9D7CE] pb-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#B66A45]">
              TerrIQ assessment
            </p>

            <p className="mt-2 text-sm text-[#6D7069]">
              Step {step} of 3
            </p>
          </div>

          <div className="flex gap-1">
            {[1, 2, 3].map((item) => (
              <span
                key={item}
                className={`h-[2px] w-12 ${
                  item <= step
                    ? "bg-[#23483A]"
                    : "bg-[#D9D7CE]"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Step 1 */}
        {step === 1 && (
          <section className="mx-auto max-w-[850px] py-16 lg:py-24">
            <p className="text-sm font-medium uppercase tracking-[0.14em] text-[#B66A45]">
              Assess a location
            </p>

            <h1 className="mt-4 text-4xl font-medium tracking-[-0.045em] sm:text-5xl">
              What are you trying to decide?
            </h1>

            <p className="mt-4 max-w-xl text-base leading-7 text-[#6D7069]">
              TerrIQ will assess the environmental conditions that
              matter to the decision you're making.
            </p>

            <div className="mt-12 grid gap-px border border-[#D9D7CE] bg-[#D9D7CE] sm:grid-cols-2">
              {purposeOptions.map((option) => {
                const selected = purpose === option.id;

                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => selectPurpose(option.id)}
                    className={`group min-h-[150px] bg-[#FBFAF6] p-7 text-left transition ${
                      selected
                        ? "bg-[#23483A] text-[#F5F3ED]"
                        : "hover:bg-white"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <span className="text-lg font-medium tracking-[-0.025em]">
                        {option.title}
                      </span>

                      <ArrowUpRight
                        size={17}
                        className={
                          selected
                            ? "text-[#D99A78]"
                            : "text-[#92958D]"
                        }
                      />
                    </div>

                    <p
                      className={`mt-6 max-w-xs text-sm leading-6 ${
                        selected
                          ? "text-[#C7D1CB]"
                          : "text-[#6D7069]"
                      }`}
                    >
                      {option.description}
                    </p>
                  </button>
                );
              })}

              <button
                type="button"
                onClick={() => selectPurpose("logistics")}
                className={`sm:col-span-2 min-h-[100px] p-7 text-left ${
                  purpose === "logistics"
                    ? "bg-[#23483A] text-[#F5F3ED]"
                    : "bg-[#FBFAF6] hover:bg-white"
                }`}
              >
                <span className="text-lg font-medium">
                  Plan movement / logistics
                </span>

                <p className="mt-2 text-sm text-[#6D7069]">
                  Routes, deliveries, or movement between locations
                </p>
              </button>
            </div>

            <div className="mt-10 flex justify-end">
              <button
                type="button"
                disabled={!canContinueStep1}
                onClick={continueAssessment}
                className="inline-flex items-center gap-3 bg-[#23483A] px-6 py-3.5 text-sm font-medium text-[#F5F3ED] transition hover:bg-[#1B392E] disabled:cursor-not-allowed disabled:opacity-30"
              >
                Continue
                <ArrowRight size={16} />
              </button>
            </div>
          </section>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <section className="mx-auto max-w-[850px] py-16 lg:py-24">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-sm text-[#6D7069] hover:text-[#171A17]"
            >
              ← Back
            </button>

            <p className="mt-12 text-sm font-medium uppercase tracking-[0.14em] text-[#B66A45]">
              Location
            </p>

            <h1 className="mt-4 text-4xl font-medium tracking-[-0.045em] sm:text-5xl">
              Where is the site?
            </h1>

            <div className="mt-12">
              <label className="text-xs font-medium uppercase tracking-[0.12em] text-[#92958D]">
                Search address
              </label>

              <div className="mt-3 flex items-center border border-[#C9C7BE] bg-[#FBFAF6] px-5">
                <Location
                  size={18}
                  className="text-[#92958D]"
                />

                <input
                  value={answers.location}
                  onChange={(event) =>
                    setAnswers((current) => ({
                      ...current,
                      location: event.target.value,
                    }))
                  }
                  placeholder="Search an address"
                  className="w-full bg-transparent px-4 py-4 text-sm outline-none placeholder:text-[#92958D]"
                />
              </div>
            </div>

            {/* Map placeholder */}
            <div className="relative mt-8 h-[360px] overflow-hidden border border-[#D9D7CE] bg-[#E8E6DD]">
              <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(#B8B6AD_1px,transparent_1px),linear-gradient(90deg,#B8B6AD_1px,transparent_1px)] [background-size:40px_40px]" />

              <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#23483A] text-[#F5F3ED]">
                  <Location size={20} />
                </div>
              </div>
            </div>

            {answers.location && (
              <div className="mt-6 border-l-2 border-[#B66A45] pl-4">
                <p className="text-xs uppercase tracking-[0.12em] text-[#92958D]">
                  Location confirmed
                </p>

                <p className="mt-2 text-sm font-medium">
                  {answers.location}
                </p>
              </div>
            )}

            <div className="mt-10 flex justify-end">
              <button
                type="button"
                disabled={!canContinueStep2}
                onClick={continueAssessment}
                className="inline-flex items-center gap-3 bg-[#23483A] px-6 py-3.5 text-sm font-medium text-[#F5F3ED] disabled:opacity-30"
              >
                Continue
                <ArrowRight size={16} />
              </button>
            </div>
          </section>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <section className="mx-auto max-w-[850px] py-16 lg:py-24">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="text-sm text-[#6D7069] hover:text-[#171A17]"
            >
              ← Back
            </button>

            <p className="mt-12 text-sm font-medium uppercase tracking-[0.14em] text-[#B66A45]">
              Context
            </p>

            <h1 className="mt-4 text-4xl font-medium tracking-[-0.045em] sm:text-5xl">
              Tell us about the decision.
            </h1>

            <p className="mt-4 text-base leading-7 text-[#6D7069]">
              These answers help TerrIQ focus the assessment on
              what actually matters to you.
            </p>

            <div className="mt-12 space-y-12">
              {questions.map((question) => (
                <div
                  key={question.id}
                  className="border-t border-[#D9D7CE] pt-7"
                >
                  <h2 className="text-xl font-medium tracking-[-0.025em]">
                    {question.question}
                  </h2>

                  <div className="mt-5 grid gap-2">
                    {question.options.map((option) => {
                      const selected =
                        answers.context[question.id] === option;

                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() =>
                            setContextAnswer(
                              question.id,
                              option
                            )
                          }
                          className={`flex items-center justify-between border px-5 py-4 text-left text-sm transition ${
                            selected
                              ? "border-[#23483A] bg-[#23483A] text-[#F5F3ED]"
                              : "border-[#D9D7CE] bg-[#FBFAF6] hover:bg-white"
                          }`}
                        >
                          {option}

                          {selected && (
                            <span className="text-[#D99A78]">
                              ✓
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 flex justify-end">
              <button
                type="button"
                disabled={!canContinueStep3}
                onClick={continueAssessment}
                className="inline-flex items-center gap-3 bg-[#23483A] px-6 py-3.5 text-sm font-medium text-[#F5F3ED] disabled:opacity-30"
              >
                Generate assessment
                <ArrowRight size={16} />
              </button>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}