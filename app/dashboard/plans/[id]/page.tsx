"use client";

import Link from "next/link";

import {
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
} from "@/components/icons/terr-iq-icons";

const plan = {
  name: "Ikeja Warehouse Resilience Plan",
  site: "Ikeja Warehouse",
  status: "Active",
  investment: "₦480k – ₦1.05m",

  actions: [
    {
      number: "01",
      title: "Improve drainage",
      cost: "₦180k–₦350k",
      status: "Complete",
    },
    {
      number: "02",
      title: "Review storage cooling",
      cost: "₦300k–₦700k",
      status: "In progress",
    },
    {
      number: "03",
      title: "Adjust delivery schedule",
      cost: "Low cost",
      status: "Pending",
    },
  ],

  impact: [
    "Flood/drainage exposure",
    "Heat-related storage risk",
    "Movement disruption",
  ],

  resources: [
    {
      name: "Drainage contractors",
      location: "Lagos",
    },
    {
      name: "Drainage materials",
      location: "Nearby suppliers",
    },
    {
      name: "Cooling equipment",
      location: "Lagos",
    },
    {
      name: "Waterproofing materials",
      location: "Nearby suppliers",
    },
  ],
};

const statusStyles: Record<string, string> = {
  Complete: "text-[#23483A]",
  "In progress": "text-[#B66A45]",
  Pending: "text-[#92958D]",
};

export default function PlanDetailPage() {
  return (
    <div className="min-h-screen bg-[#F5F3ED] text-[#171A17]">
      <main className="min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-[72px] items-center border-b border-[#D9D7CE] bg-[#F5F3ED]/95 px-6 backdrop-blur lg:px-10">
          <Link
            href="/dashboard/plans"
            className="group inline-flex items-center gap-3 text-sm text-[#6D7069] transition hover:text-[#171A17]"
          >
            <span className="transition-transform group-hover:-translate-x-1">
              ←
            </span>
            Plans
          </Link>
        </header>

        <div className="mx-auto max-w-[1180px] px-6 py-10 lg:px-10 lg:py-14">
          {/* Heading */}
          <section>
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#B66A45]">
                  {plan.site}
                </p>

                <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">
                  {plan.name}
                </h1>
              </div>

              <span className="inline-flex w-fit items-center gap-2 text-xs font-medium uppercase tracking-[0.12em] text-[#23483A]">
                <span className="h-1.5 w-1.5 bg-[#23483A]" />
                {plan.status}
              </span>
            </div>
          </section>

          {/* Investment */}
          <section className="mt-12 border-y border-[#D9D7CE] py-8">
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#92958D]">
              Estimated investment
            </p>

            <p className="mt-3 text-4xl font-medium tracking-[-0.045em] sm:text-5xl">
              {plan.investment}
            </p>
          </section>

          {/* Action plan */}
          <section className="mt-16">
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#B66A45]">
              Execution
            </p>

            <h2 className="mt-2 text-2xl font-medium tracking-[-0.035em]">
              Action plan
            </h2>

            <div className="mt-7 border-y border-[#D9D7CE]">
              {plan.actions.map((action) => (
                <button
                  key={action.number}
                  type="button"
                  className="group grid w-full gap-4 border-b border-[#D9D7CE] py-6 text-left last:border-b-0 sm:grid-cols-[48px_1fr_180px_130px_20px] sm:items-center"
                >
                  <span className="text-xs text-[#B66A45]">
                    {action.number}
                  </span>

                  <span className="text-sm font-medium">
                    {action.title}
                  </span>

                  <span className="text-sm text-[#4F554F]">
                    {action.cost}
                  </span>

                  <span
                    className={`text-xs font-medium ${
                      statusStyles[action.status]
                    }`}
                  >
                    {action.status}
                  </span>

                  <ChevronRight
                    size={16}
                    className="text-[#92958D] transition-transform group-hover:translate-x-1"
                  />
                </button>
              ))}
            </div>
          </section>

          {/* Expected impact */}
          <section className="mt-16 border-t border-[#D9D7CE] pt-10">
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#B66A45]">
              Outcome
            </p>

            <h2 className="mt-2 text-2xl font-medium tracking-[-0.035em]">
              Expected impact
            </h2>

            <div className="mt-7 grid gap-px border border-[#D9D7CE] bg-[#D9D7CE] sm:grid-cols-3">
              {plan.impact.map((item) => (
                <div
                  key={item}
                  className="bg-[#FBFAF6] p-6"
                >
                  <span className="text-lg text-[#23483A]">↓</span>

                  <p className="mt-8 text-sm font-medium leading-6">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Local resources */}
          <section className="mt-16 border-t border-[#D9D7CE] pt-10 pb-16">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#B66A45]">
                  Sourcing
                </p>

                <h2 className="mt-2 text-2xl font-medium tracking-[-0.035em]">
                  Local options
                </h2>
              </div>

              <Link
                href="/dashboard/resources"
                className="group inline-flex items-center gap-2 text-sm font-medium text-[#23483A]"
              >
                View local resources
                <ArrowRight
                  size={15}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>

            <div className="mt-7 border-y border-[#D9D7CE]">
              {plan.resources.map((resource) => (
                <div
                  key={resource.name}
                  className="grid gap-2 border-b border-[#D9D7CE] py-5 last:border-b-0 sm:grid-cols-[1fr_1fr_20px]"
                >
                  <span className="text-sm font-medium">
                    {resource.name}
                  </span>

                  <span className="text-sm text-[#6D7069]">
                    {resource.location}
                  </span>

                  <ArrowUpRight
                    size={15}
                    className="hidden text-[#92958D] sm:block"
                  />
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}