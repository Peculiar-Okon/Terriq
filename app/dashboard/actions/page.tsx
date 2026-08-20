"use client";

import { useState } from "react";
import Link from "next/link";

type Action = {
  id: string;
  number: string;
  category: string;
  title: string;
  description: string;
  impact: "Low" | "Medium" | "High";
  effort: "Low" | "Medium" | "High";
  cost: string;
  availability: string;
  resources: string[];
  steps: {
    title: string;
    description: string;
  }[];
};

const actions: Action[] = [
  {
    id: "drainage",
    number: "01",
    category: "LAND · WATER",
    title: "Improve drainage",
    description:
      "Heavy rainfall can increase runoff around poorly drained areas. Improving drainage can reduce standing water and localized flood exposure.",
    impact: "High",
    effort: "Low",
    cost: "₦10,000 – ₦40,000",
    availability: "Drainage materials and local services may be available nearby.",
    resources: [
      "Drainage channels",
      "Gravel",
      "Drainage grates",
    ],
    steps: [
      {
        title: "Inspect your surroundings",
        description:
          "Look for blocked drains, standing water, or areas where rainfall regularly collects.",
      },
      {
        title: "Identify the problem area",
        description:
          "Determine where water enters, collects, or fails to drain properly.",
      },
      {
        title: "Clear existing drainage",
        description:
          "Remove leaves, sediment, waste, and other obstructions where appropriate.",
      },
      {
        title: "Consider an improvement",
        description:
          "Where existing drainage is insufficient, consider a suitable channel or runoff solution.",
      },
    ],
  },
  {
    id: "clothing",
    number: "02",
    category: "CLOTHING",
    title: "Choose more suitable clothing",
    description:
      "Heat and humidity are elevated today. Lighter, breathable materials may make outdoor activity more comfortable.",
    impact: "Medium",
    effort: "Low",
    cost: "₦5,000 – ₦20,000",
    availability: "Lightweight cotton, linen, and other breathable fabrics may be available locally.",
    resources: [
      "Lightweight cotton",
      "Linen",
      "Breathable fabric blends",
    ],
    steps: [
      {
        title: "Check today's conditions",
        description:
          "Consider heat and humidity before choosing what to wear for outdoor activity.",
      },
      {
        title: "Choose a suitable fabric",
        description:
          "Look for lightweight and breathable materials that are appropriate for warm conditions.",
      },
      {
        title: "Compare local options",
        description:
          "Check nearby fabric sellers and clothing providers for suitable materials.",
      },
    ],
  },
  {
    id: "crops",
    number: "03",
    category: "FARMING",
    title: "Protect heat-sensitive crops",
    description:
      "High temperatures combined with limited rainfall can increase water stress for exposed crops.",
    impact: "High",
    effort: "Medium",
    cost: "₦15,000 – ₦60,000",
    availability: "Mulch, shade materials, and water-storage solutions may be available locally.",
    resources: [
      "Mulching materials",
      "Shade structures",
      "Water storage",
    ],
    steps: [
      {
        title: "Identify exposed crops",
        description:
          "Determine which crops are most affected by heat or limited moisture.",
      },
      {
        title: "Reduce moisture loss",
        description:
          "Consider suitable mulching or ground-cover methods to retain soil moisture.",
      },
      {
        title: "Provide protection",
        description:
          "Where appropriate, use shade or other methods to reduce excessive heat exposure.",
      },
      {
        title: "Plan water use",
        description:
          "Adjust watering timing and storage around expected environmental conditions.",
      },
    ],
  },
  {
    id: "outdoor-work",
    number: "04",
    category: "OUTDOOR WORK",
    title: "Shift outdoor work",
    description:
      "Peak afternoon heat may increase physical strain and reduce comfortable working time.",
    impact: "High",
    effort: "Low",
    cost: "No direct cost",
    availability: "No materials required.",
    resources: [],
    steps: [
      {
        title: "Check the day's conditions",
        description:
          "Review when environmental conditions are expected to be most demanding.",
      },
      {
        title: "Move intensive tasks",
        description:
          "Where possible, schedule physically demanding outdoor work during cooler periods.",
      },
      {
        title: "Review the schedule",
        description:
          "Use future environmental conditions when planning recurring outdoor work.",
      },
    ],
  },
];

function ImpactBadge({ value }: { value: Action["impact"] }) {
  return (
    <span className="text-xs font-medium uppercase tracking-[0.08em] text-[#23483A]">
      {value} impact
    </span>
  );
}

function ActionCard({
  action,
  expanded,
  onToggle,
}: {
  action: Action;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <article className="border-y border-[#D9D7CE] first:border-t-0">
      <div className="py-7 sm:py-8">
        <div className="grid gap-5 lg:grid-cols-[60px_1fr_auto] lg:gap-8">
          <span className="text-sm text-[#B66A45]">{action.number}</span>

          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-[#B66A45]">
              {action.category}
            </p>

            <h2 className="mt-2 text-2xl font-medium tracking-[-0.03em] text-[#171A17]">
              {action.title}
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#6D7069]">
              {action.description}
            </p>

            <div className="mt-6 grid grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.12em] text-[#92958D]">
                  Impact
                </p>
                <div className="mt-1">
                  <ImpactBadge value={action.impact} />
                </div>
              </div>

              <div>
                <p className="text-[11px] uppercase tracking-[0.12em] text-[#92958D]">
                  Effort
                </p>
                <p className="mt-1 text-sm font-medium text-[#26332B]">
                  {action.effort}
                </p>
              </div>

              <div>
                <p className="text-[11px] uppercase tracking-[0.12em] text-[#92958D]">
                  Estimated cost
                </p>
                <p className="mt-1 text-sm font-medium text-[#26332B]">
                  {action.cost}
                </p>
              </div>

              <div>
                <p className="text-[11px] uppercase tracking-[0.12em] text-[#92958D]">
                  Availability
                </p>
                <p className="mt-1 text-sm font-medium text-[#26332B]">
                  Local
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onToggle}
            aria-expanded={expanded}
            className="self-start border border-[#D9D7CE] px-4 py-2.5 text-sm font-medium text-[#23483A] transition hover:border-[#B9B7AE] hover:bg-[#FBFAF6]"
          >
            {expanded ? "Close plan" : "View plan"}
          </button>
        </div>

        {expanded && (
          <div className="mt-8 border-t border-[#D9D7CE] pt-8 lg:ml-[92px]">
            <div className="grid gap-10 lg:grid-cols-[1fr_.8fr]">
              <div>
                <p className="text-xs uppercase tracking-[0.15em] text-[#B66A45]">
                  Step-by-step
                </p>

                <h3 className="mt-2 text-xl font-medium tracking-[-0.02em] text-[#171A17]">
                  A practical way to approach it.
                </h3>

                <div className="mt-6 divide-y divide-[#D9D7CE] border-y border-[#D9D7CE]">
                  {action.steps.map((step, index) => (
                    <div
                      key={step.title}
                      className="grid gap-3 py-5 sm:grid-cols-[42px_1fr]"
                    >
                      <span className="text-sm text-[#B66A45]">
                        0{index + 1}
                      </span>

                      <div>
                        <h4 className="text-sm font-medium text-[#26332B]">
                          {step.title}
                        </h4>

                        <p className="mt-1 text-sm leading-6 text-[#6D7069]">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.15em] text-[#B66A45]">
                  Local options
                </p>

                <h3 className="mt-2 text-xl font-medium tracking-[-0.02em] text-[#171A17]">
                  What you may need.
                </h3>

                <p className="mt-3 text-sm leading-6 text-[#6D7069]">
                  {action.availability}
                </p>

                {action.resources.length > 0 && (
                  <div className="mt-5 divide-y divide-[#D9D7CE] border-y border-[#D9D7CE]">
                    {action.resources.map((resource) => (
                      <div
                        key={resource}
                        className="flex items-center justify-between gap-4 py-4"
                      >
                        <span className="text-sm text-[#26332B]">
                          {resource}
                        </span>

                        <Link
                          href="/dashboard/marketplace"
                          className="text-xs font-medium text-[#23483A] hover:text-[#B66A45]"
                        >
                          Find locally →
                        </Link>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-6 border border-[#D9D7CE] bg-[#FBFAF6] p-5">
                  <p className="text-xs uppercase tracking-[0.12em] text-[#92958D]">
                    Budget
                  </p>

                  <p className="mt-2 text-lg font-medium text-[#26332B]">
                    {action.cost}
                  </p>

                  <p className="mt-2 text-sm leading-6 text-[#6D7069]">
                    Use your budget to compare suitable options and build a
                    realistic plan.
                  </p>

                  <Link
                    href="/dashboard/marketplace"
                    className="mt-4 inline-flex text-sm font-medium text-[#23483A] hover:text-[#B66A45]"
                  >
                    Explore local options →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}

export default function ActionsPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10 lg:py-12">
      <header className="max-w-3xl">
        <p className="text-sm uppercase tracking-[0.15em] text-[#B66A45]">
          Actions
        </p>

        <h1 className="mt-3 text-4xl font-medium tracking-[-0.045em] text-[#171A17] sm:text-5xl">
          What can you do about it?
        </h1>

        <p className="mt-4 text-sm leading-7 text-[#6D7069]">
          TerrIQ connects environmental conditions around you with practical
          interventions, realistic costs, local resources, and steps you can
          actually take.
        </p>
      </header>

      <section className="mt-12">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-[#B66A45]">
              Recommended interventions
            </p>

            <h2 className="mt-2 text-2xl font-medium tracking-[-0.03em] text-[#171A17]">
              Relevant to your environment.
            </h2>
          </div>

          <p className="hidden text-xs text-[#92958D] sm:block">
            Lagos, Nigeria · Updated recently
          </p>
        </div>

        <div className="mt-7">
          {actions.map((action) => (
            <ActionCard
              key={action.id}
              action={action}
              expanded={expandedId === action.id}
              onToggle={() =>
                setExpandedId(
                  expandedId === action.id ? null : action.id,
                )
              }
            />
          ))}
        </div>
      </section>

      <section className="mt-14 border-t border-[#D9D7CE] pt-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-[#B66A45]">
              Planning
            </p>

            <h2 className="mt-2 text-2xl font-medium tracking-[-0.03em] text-[#171A17]">
              Turn an intervention into a plan.
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#6D7069]">
              Choose what you want to address, set a realistic budget, and
              work through the steps and resources needed to make it happen.
            </p>
          </div>

          <button
            type="button"
            className="border border-[#23483A] bg-[#23483A] px-5 py-3.5 text-sm font-medium text-white transition hover:bg-[#18362B]"
          >
            Build a plan →
          </button>
        </div>
      </section>

      <section className="mt-12 border-t border-[#D9D7CE] pt-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-[#26332B]">
              Local resources
            </p>

            <p className="mt-1 max-w-xl text-xs leading-5 text-[#7B8079]">
              TerrIQ can connect recommendations to materials, services, and
              providers available around you.
            </p>
          </div>

          <Link
            href="/dashboard/marketplace"
            className="text-sm font-medium text-[#23483A] hover:text-[#B66A45]"
          >
            Explore marketplace →
          </Link>
        </div>
      </section>
    </div>
  );
}