"use client";

import Link from "next/link";

import {
  ArrowRight,
  ChevronRight,
} from "@/components/icons/terr-iq-icons";

type PlanStatus = "Complete" | "In progress" | "Pending";

type Plan = {
  id: string;
  name: string;
  site: string;
  completed: number;
  total: number;
  investment: string;
  actions: {
    title: string;
    status: PlanStatus;
  }[];
  outcome: string;
};

const plans: Plan[] = [
  {
    id: "ikeja-warehouse-resilience",
    name: "Ikeja Warehouse Resilience Plan",
    site: "Ikeja Warehouse",
    completed: 2,
    total: 3,
    investment: "₦480k – ₦1.05m",
    actions: [
      {
        title: "Drainage improvement",
        status: "Complete",
      },
      {
        title: "Delivery scheduling",
        status: "Complete",
      },
      {
        title: "Storage cooling",
        status: "Pending",
      },
    ],
    outcome:
      "Reduce exposure to rainfall, heat and access disruption.",
  },
];

const statusStyles: Record<PlanStatus, string> = {
  Complete: "text-[#23483A]",
  "In progress": "text-[#B66A45]",
  Pending: "text-[#92958D]",
};

export default function PlansPage() {
  return (
    <div className="min-h-screen bg-[#F5F3ED] text-[#171A17]">
      <main className="min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-[#D9D7CE] bg-[#F5F3ED]/95 px-6 backdrop-blur lg:px-10">
          <span className="text-sm font-medium">Plans</span>

          <Link
            href="/dashboard/plans/create"
            className="inline-flex items-center gap-2 bg-[#23483A] px-4 py-2.5 text-sm font-medium text-[#F5F3ED] transition hover:bg-[#1B392E]"
          >
            <span className="text-base leading-none">+</span>
            Create plan
          </Link>
        </header>

        <div className="mx-auto max-w-[1180px] px-6 py-10 lg:px-10 lg:py-14">
          {/* Intro */}
          <section className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#B66A45]">
              Decision support
            </p>

            <h1 className="mt-3 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">
              Plans
            </h1>

            <p className="mt-4 text-base leading-7 text-[#6D7069]">
              Turn recommendations into actions.
            </p>
          </section>

          {/* Plans */}
          <section className="mt-12">
            <div className="space-y-5">
              {plans.map((plan) => {
                const percentage = (plan.completed / plan.total) * 100;

                return (
                  <article
                    key={plan.id}
                    className="border border-[#D9D7CE] bg-[#FBFAF6]"
                  >
                    {/* Plan heading */}
                    <div className="border-b border-[#D9D7CE] px-6 py-5 lg:px-8">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#92958D]">
                            {plan.site}
                          </p>

                          <h2 className="mt-2 text-2xl font-medium tracking-[-0.035em]">
                            {plan.name}
                          </h2>
                        </div>

                        <span className="text-xs font-medium uppercase tracking-[0.12em] text-[#23483A]">
                          Active
                        </span>
                      </div>
                    </div>

                    {/* Progress + investment */}
                    <div className="grid lg:grid-cols-[1fr_280px]">
                      <div className="p-6 lg:p-8">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">
                            {plan.completed} / {plan.total} actions complete
                          </p>

                          <span className="text-xs text-[#92958D]">
                            {Math.round(percentage)}%
                          </span>
                        </div>

                        <div className="mt-4 h-1 bg-[#D9D7CE]">
                          <div
                            className="h-full bg-[#23483A]"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>

                      <div className="border-t border-[#D9D7CE] p-6 lg:border-l lg:border-t-0 lg:p-8">
                        <p className="text-xs uppercase tracking-[0.13em] text-[#92958D]">
                          Estimated investment
                        </p>

                        <p className="mt-3 text-xl font-medium tracking-[-0.025em]">
                          {plan.investment}
                        </p>
                      </div>
                    </div>

                    {/* Action list */}
                    <div className="border-t border-[#D9D7CE]">
                      {plan.actions.map((action, index) => (
                        <div
                          key={action.title}
                          className="grid gap-3 border-b border-[#D9D7CE] px-6 py-4 last:border-b-0 sm:grid-cols-[40px_1fr_auto] sm:items-center lg:px-8"
                        >
                          <span className="text-xs text-[#B66A45]">
                            {String(index + 1).padStart(2, "0")}
                          </span>

                          <span className="text-sm font-medium">
                            {action.title}
                          </span>

                          <span
                            className={`text-xs font-medium ${
                              statusStyles[action.status]
                            }`}
                          >
                            {action.status}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Outcome */}
                    <div className="grid border-t border-[#D9D7CE] lg:grid-cols-[1fr_auto] lg:items-end">
                      <div className="p-6 lg:p-8">
                        <p className="text-xs uppercase tracking-[0.13em] text-[#92958D]">
                          Expected outcome
                        </p>

                        <p className="mt-3 max-w-2xl text-sm leading-6 text-[#4F554F]">
                          {plan.outcome}
                        </p>
                      </div>

                      <div className="border-t border-[#D9D7CE] p-6 lg:border-l lg:border-t-0 lg:px-8">
                        <Link
                          href={`/dashboard/plans/${plan.id}`}
                          className="group inline-flex items-center gap-2 text-sm font-medium text-[#23483A]"
                        >
                          View plan
                          <ArrowRight
                            size={15}
                            className="transition-transform group-hover:translate-x-1"
                          />
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Empty / add another plan action */}
            <Link
              href="/dashboard/plans/create"
              className="group mt-5 flex min-h-[100px] items-center justify-center border border-dashed border-[#C8C5BB] bg-transparent text-sm font-medium text-[#6D7069] transition hover:border-[#23483A] hover:bg-[#FBFAF6] hover:text-[#23483A]"
            >
              <span className="mr-2 text-lg font-normal">+</span>
              Create another plan
              <ChevronRight
                size={15}
                className="ml-2 transition-transform group-hover:translate-x-1"
              />
            </Link>
          </section>
        </div>
      </main>
    </div>
  );
}