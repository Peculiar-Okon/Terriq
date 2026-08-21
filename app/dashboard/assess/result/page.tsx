"use client";

import Link from "next/link";

import {
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
  Location,
} from "@/components/icons/terr-iq-icons";

const assessment = {
  location: "Ikeja, Lagos",
  type: "Warehouse operation",
  status: "Moderate exposure",
  summary:
    "Generally suitable, but several environmental considerations should be addressed before operation.",
  factors: [
    {
      name: "Heat",
      level: "High",
    },
    {
      name: "Rainfall",
      level: "Elevated",
    },
    {
      name: "Flooding",
      level: "Moderate",
    },
    {
      name: "Water",
      level: "Low",
    },
  ],
  meaning:
    "Heat exposure may increase cooling requirements and affect temperature-sensitive inventory. Heavy rainfall may increase drainage and access concerns.",
  considerations: [
    {
      number: "01",
      title: "Storage cooling",
      priority: "High",
    },
    {
      number: "02",
      title: "Drainage around loading area",
      priority: "High",
    },
    {
      number: "03",
      title: "Delivery access during rainfall",
      priority: "Medium",
    },
  ],
  actions: [
    {
      title: "Improve drainage",
      cost: "₦180k–₦350k",
      timing: "Before operation",
    },
    {
      title: "Review cooling",
      cost: "₦300k–₦700k",
      timing: "Before operation",
    },
    {
      title: "Schedule deliveries",
      cost: "Low cost",
      timing: "During rainfall events",
    },
  ],
};

const levelStyles: Record<string, string> = {
  High: "text-[#B66A45]",
  Elevated: "text-[#B66A45]",
  Moderate: "text-[#6D7069]",
  Low: "text-[#92958D]",
};

export default function AssessmentResultPage() {
  return (
    <div className="min-h-screen bg-[#F5F3ED] text-[#171A17]">
      <main className="min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-[#D9D7CE] bg-[#F5F3ED]/95 px-6 backdrop-blur lg:px-10">
          <Link
            href="/dashboard/assess"
            className="group inline-flex items-center gap-3 text-sm text-[#6D7069] transition hover:text-[#171A17]"
          >
            <span className="transition-transform group-hover:-translate-x-1">
              ←
            </span>
            Assess
          </Link>

          <span className="text-xs font-medium uppercase tracking-[0.14em] text-[#92958D]">
            Decision brief
          </span>
        </header>

        <div className="mx-auto max-w-[1180px] px-6 py-10 lg:px-10 lg:py-14">
          {/* Header */}
          <section className="max-w-3xl">
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#B66A45]">
              Site assessment
            </p>

            <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl lg:text-6xl">
              {assessment.location}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[#6D7069]">
              <span className="inline-flex items-center gap-2">
                <Location size={15} />
                {assessment.location}, Nigeria
              </span>

              <span className="h-1 w-1 bg-[#92958D]" />

              <span>{assessment.type}</span>
            </div>
          </section>

          {/* Summary */}
          <section className="mt-12 border border-[#D9D7CE] bg-[#FBFAF6]">
            <div className="border-b border-[#D9D7CE] px-6 py-4">
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#92958D]">
                Assessment summary
              </p>
            </div>

            <div className="p-6 lg:p-8">
              <div className="max-w-3xl">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#B66A45]">
                  Overall exposure
                </p>

                <h2 className="mt-3 text-3xl font-medium tracking-[-0.04em] sm:text-4xl">
                  {assessment.status}
                </h2>

                <p className="mt-4 max-w-2xl text-base leading-7 text-[#6D7069]">
                  {assessment.summary}
                </p>
              </div>

              <div className="mt-10 grid border border-[#D9D7CE] sm:grid-cols-2 lg:grid-cols-4">
                {assessment.factors.map((factor, index) => (
                  <div
                    key={factor.name}
                    className={`p-5 ${
                      index !== 0
                        ? "border-t border-[#D9D7CE] sm:border-l sm:border-t-0"
                        : ""
                    }`}
                  >
                    <p className="text-xs uppercase tracking-[0.13em] text-[#92958D]">
                      {factor.name}
                    </p>

                    <p
                      className={`mt-7 text-sm font-medium uppercase tracking-[0.08em] ${
                        levelStyles[factor.level]
                      }`}
                    >
                      {factor.level}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* What this means */}
          <section className="mt-16 border-t border-[#D9D7CE] pt-10">
            <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#B66A45]">
                  Interpretation
                </p>

                <h2 className="mt-2 text-2xl font-medium tracking-[-0.035em]">
                  What this means for your decision
                </h2>
              </div>

              <p className="max-w-2xl text-lg leading-8 text-[#4F554F]">
                {assessment.meaning}
              </p>
            </div>
          </section>

          {/* Top considerations */}
          <section className="mt-16 border-t border-[#D9D7CE] pt-10">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#B66A45]">
                Priorities
              </p>

              <h2 className="mt-2 text-2xl font-medium tracking-[-0.035em]">
                Top considerations
              </h2>
            </div>

            <div className="mt-7 border-y border-[#D9D7CE]">
              {assessment.considerations.map((item) => (
                <div
                  key={item.number}
                  className="group grid gap-4 border-b border-[#D9D7CE] py-5 last:border-b-0 sm:grid-cols-[48px_1fr_100px_20px] sm:items-center"
                >
                  <span className="text-xs text-[#B66A45]">
                    {item.number}
                  </span>

                  <span className="text-sm font-medium">{item.title}</span>

                  <span
                    className={`text-xs font-medium uppercase tracking-[0.08em] ${
                      levelStyles[item.priority]
                    }`}
                  >
                    {item.priority}
                  </span>

                  <ChevronRight
                    size={16}
                    className="text-[#92958D] transition-transform group-hover:translate-x-1"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Action plan */}
          <section className="mt-16 border-t border-[#D9D7CE] pt-10">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#B66A45]">
                Decision support
              </p>

              <h2 className="mt-2 text-2xl font-medium tracking-[-0.035em]">
                Recommended action plan
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-6 text-[#6D7069]">
                Practical steps to reduce the environmental exposure identified
                in this assessment.
              </p>
            </div>

            <div className="mt-7 border-y border-[#D9D7CE]">
              {assessment.actions.map((action, index) => (
                <div
                  key={action.title}
                  className="grid gap-4 border-b border-[#D9D7CE] py-6 last:border-b-0 lg:grid-cols-[48px_1fr_180px_200px_20px] lg:items-center"
                >
                  <span className="text-xs text-[#B66A45]">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="text-sm font-medium">
                    {action.title}
                  </span>

                  <span className="text-sm text-[#4F554F]">
                    {action.cost}
                  </span>

                  <span className="text-sm text-[#6D7069]">
                    {action.timing}
                  </span>

                  <ChevronRight
                    size={16}
                    className="hidden text-[#92958D] lg:block"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Decision */}
          <section className="mt-16 pb-16">
            <div className="border border-[#23483A] bg-[#23483A] p-7 text-[#F5F3ED] lg:p-10">
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#A9B9AF]">
                Decision
              </p>

              <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
                <div>
                  <h2 className="text-3xl font-medium tracking-[-0.04em] sm:text-4xl">
                    Proceed with conditions
                  </h2>

                  <p className="mt-4 max-w-xl text-sm leading-7 text-[#C7D1CB]">
                    The site appears suitable for the intended operation,
                    provided the identified heat, drainage, and access
                    considerations are addressed.
                  </p>
                </div>

                <div className="text-sm text-[#A9B9AF]">
                  Assessment generated
                  <br />
                  <span className="text-[#F5F3ED]">Today, 9:42 AM</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <button
                type="button"
                className="group flex items-center justify-between border border-[#D9D7CE] bg-[#FBFAF6] px-5 py-4 text-sm font-medium transition hover:border-[#23483A]"
              >
                Save site
                <ArrowRight
                  size={16}
                  className="text-[#6D7069] transition-transform group-hover:translate-x-1"
                />
              </button>

              <Link
                href="/dashboard/plans"
                className="group flex items-center justify-between border border-[#D9D7CE] bg-[#FBFAF6] px-5 py-4 text-sm font-medium transition hover:border-[#23483A]"
              >
                Create plan
                <ArrowRight
                  size={16}
                  className="text-[#6D7069] transition-transform group-hover:translate-x-1"
                />
              </Link>

              <button
                type="button"
                className="group flex items-center justify-between border border-[#D9D7CE] bg-[#FBFAF6] px-5 py-4 text-sm font-medium transition hover:border-[#23483A]"
              >
                Export assessment
                <ArrowUpRight
                  size={16}
                  className="text-[#6D7069] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}