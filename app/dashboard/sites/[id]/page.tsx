import Link from "next/link";
import { notFound } from "next/navigation";

import {
  ArrowRight,
  ChevronRight,
  Location,
} from "@/components/icons/terr-iq-icons";
import { MobileSidebar } from "@/components/dashboard/mobile-nav";

import {
  siteDetails,
  siteRecords,
} from "@/lib/data/site";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

const levelStyles = {
  Low: {
    text: "text-[#6D7069]",
    dot: "bg-[#92958D]",
  },
  Moderate: {
    text: "text-[#6D7069]",
    dot: "bg-[#B66A45]",
  },
  Elevated: {
    text: "text-[#B66A45]",
    dot: "bg-[#B66A45]",
  },
  High: {
    text: "text-[#B66A45]",
    dot: "bg-[#B66A45]",
  },
};

export default async function SiteDetailPage({
  params,
}: PageProps) {
  const { id } = await params;

  const site = siteRecords.find((item) => item.id === id);
  const data = siteDetails[id];

  if (!site || !data) {
    notFound();
  }

  const statusStyle = levelStyles[data.status];

  return (
    <div className="min-h-screen bg-[#F5F3ED] text-[#171A17]">
      <main className="min-h-screen">
        {/* Header */}
        <header className="relative border-b border-[#D9D7CE]">
          <div className="py-6 pl-16 pr-6 lg:px-10">
            <div className="mx-auto max-w-[1200px]">
              <MobileSidebar />

              <Link
                href="/dashboard/sites"
                className="inline-flex items-center gap-2 text-sm text-[#6D7069] transition hover:text-[#23483A]"
              >
                <span>←</span>
                Sites
              </Link>

              <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <div className="flex items-center gap-2 text-sm text-[#6D7069]">
                    <Location size={15} />
                    {site.location}
                  </div>

                  <h1 className="mt-3 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                    {site.name}
                  </h1>

                  <p className="mt-2 text-sm text-[#92958D]">
                    {site.type}
                  </p>
                </div>

                <div className="flex items-center gap-5">
                  <button
                    type="button"
                    className="text-sm font-medium text-[#23483A]"
                  >
                    Edit site
                  </button>

                  <button
                    type="button"
                    aria-label="More site options"
                    className="text-xl leading-none text-[#92958D]"
                  >
                    ·••
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="w-full px-6 py-10 lg:px-10 lg:py-14">
          <div className="mx-auto max-w-[1200px]">
            {/* Status */}
            <section className="border border-[#D9D7CE] bg-[#FBFAF6]">
              <div className="border-b border-[#D9D7CE] px-6 py-4">
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#92958D]">
                  Site status
                </p>
              </div>

              <div className="p-6 lg:p-8">
                <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`h-2.5 w-2.5 rounded-full ${statusStyle.dot}`}
                      />

                      <p
                        className={`text-2xl font-medium tracking-[-0.03em] ${statusStyle.text}`}
                      >
                        {data.status} exposure
                      </p>
                    </div>

                    <p className="mt-3 max-w-xl text-sm leading-7 text-[#6D7069]">
                      {data.conditions.length} conditions currently deserve
                      attention.
                    </p>
                  </div>

                  <div className="grid grid-cols-3 border border-[#D9D7CE]">
                    {data.conditions.map((condition, index) => {
                      const style = levelStyles[condition.level];

                      return (
                        <div
                          key={condition.name}
                          className={`min-w-[110px] px-4 py-4 ${
                            index !== 0
                              ? "border-l border-[#D9D7CE]"
                              : ""
                          }`}
                        >
                          <p className="text-xs text-[#92958D]">
                            {condition.name}
                          </p>

                          <div className="mt-2 flex items-center gap-2">
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${style.dot}`}
                            />

                            <span
                              className={`text-xs font-medium uppercase tracking-[0.08em] ${style.text}`}
                            >
                              {condition.level}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>

            {/* Tabs */}
            <nav className="mt-10 flex gap-7 overflow-x-auto border-b border-[#D9D7CE]">
              {[
                "Overview",
                "Conditions",
                "Exposure",
                "Recommendations",
                "History",
              ].map((tab, index) => (
                <button
                  key={tab}
                  type="button"
                  className={`relative whitespace-nowrap pb-4 text-sm ${
                    index === 0
                      ? "font-medium text-[#23483A]"
                      : "text-[#92958D] hover:text-[#4F554F]"
                  }`}
                >
                  {tab}

                  {index === 0 && (
                    <span className="absolute bottom-0 left-0 h-px w-full bg-[#23483A]" />
                  )}
                </button>
              ))}
            </nav>

            {/* Meaning */}
            <section className="mt-12">
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#B66A45]">
                Decision context
              </p>

              <h2 className="mt-3 text-2xl font-medium tracking-[-0.03em]">
                What this means
              </h2>

              <p className="mt-5 max-w-3xl text-lg leading-8 text-[#4F554F]">
                {data.summary}
              </p>
            </section>

            {/* Conditions */}
            <section className="mt-12">
              <div className="grid gap-px overflow-hidden border border-[#D9D7CE] bg-[#D9D7CE] md:grid-cols-3">
                {data.conditions.map((condition) => {
                  const style = levelStyles[condition.level];

                  return (
                    <article
                      key={condition.name}
                      className="bg-[#FBFAF6] p-6 lg:p-7"
                    >
                      <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#92958D]">
                        {condition.name}
                      </p>

                      <div className="mt-8 flex items-center gap-2">
                        <span
                          className={`h-2 w-2 rounded-full ${style.dot}`}
                        />

                        <h3
                          className={`text-sm font-medium uppercase tracking-[0.1em] ${style.text}`}
                        >
                          {condition.level}
                        </h3>
                      </div>

                      <p className="mt-4 text-lg font-medium tracking-[-0.02em]">
                        {condition.detail}
                      </p>

                      <div className="mt-8 border-t border-[#D9D7CE] pt-5">
                        <p className="text-xs uppercase tracking-[0.12em] text-[#92958D]">
                          Potential effect
                        </p>

                        <p className="mt-2 text-sm leading-6 text-[#4F554F]">
                          {condition.impact}
                        </p>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>

            {/* Affected */}
            <section className="mt-14">
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#B66A45]">
                Business impact
              </p>

              <h2 className="mt-3 text-2xl font-medium tracking-[-0.03em]">
                What could be affected
              </h2>

              <div className="mt-6 flex flex-wrap border-y border-[#D9D7CE]">
                {data.affectedAreas.map((area, index) => (
                  <div
                    key={area}
                    className={`px-5 py-4 text-sm text-[#4F554F] ${
                      index !== 0
                        ? "border-l border-[#D9D7CE]"
                        : ""
                    }`}
                  >
                    {area}
                  </div>
                ))}
              </div>
            </section>

            {/* Actions */}
            <section className="mt-14">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#B66A45]">
                    Decision support
                  </p>

                  <h2 className="mt-3 text-2xl font-medium tracking-[-0.03em]">
                    Priority actions
                  </h2>
                </div>

                <Link
                  href="/dashboard/plans"
                  className="hidden items-center gap-2 text-sm font-medium text-[#23483A] sm:flex"
                >
                  View plans
                  <ArrowRight size={15} />
                </Link>
              </div>

              <div className="mt-6 border-y border-[#D9D7CE]">
                {data.actions.map((action, index) => (
                  <Link
                    key={action.title}
                    href="/dashboard/plans"
                    className="group grid gap-3 border-b border-[#D9D7CE] py-5 last:border-b-0 sm:grid-cols-[48px_1fr_auto_20px] sm:items-center"
                  >
                    <span className="text-xs text-[#B66A45]">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="text-sm font-medium">
                      {action.title}
                    </span>

                    <span
                      className={`text-xs font-medium uppercase tracking-[0.08em] ${
                        action.priority === "High"
                          ? "text-[#B66A45]"
                          : "text-[#6D7069]"
                      }`}
                    >
                      {action.priority}
                    </span>

                    <ChevronRight
                      size={16}
                      className="text-[#92958D] transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                ))}
              </div>
            </section>

            {/* Outlook */}
            <section className="mt-14 pb-16">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#B66A45]">
                  Environmental outlook
                </p>

                <h2 className="mt-3 text-2xl font-medium tracking-[-0.03em]">
                  What the next 7 days could mean
                </h2>

                <p className="mt-2 max-w-xl text-sm leading-6 text-[#6D7069]">
                  Environmental conditions are shown here through their
                  potential effect on this site.
                </p>
              </div>

              <div className="mt-6 overflow-x-auto border border-[#D9D7CE] bg-[#FBFAF6]">
                <div className="grid min-w-[840px] grid-cols-7 divide-x divide-[#D9D7CE]">
                  {data.outlook.map((day, index) => (
                    <div
                      key={day.period}
                      className={`p-5 ${
                        index === 0
                          ? "bg-[#23483A] text-[#F5F3ED]"
                          : ""
                      }`}
                    >
                      <p
                        className={`text-xs uppercase tracking-[0.12em] ${
                          index === 0
                            ? "text-[#A9B9AF]"
                            : "text-[#92958D]"
                        }`}
                      >
                        {day.period}
                      </p>

                      <div className="mt-8">
                        <p className="text-sm font-medium">
                          {day.condition}
                        </p>

                        <div
                          className={`mt-4 h-px w-8 ${
                            day.level === "high"
                              ? "bg-[#B66A45]"
                              : index === 0
                                ? "bg-[#A9B9AF]"
                                : "bg-[#D9D7CE]"
                          }`}
                        />

                        <p
                          className={`mt-4 text-xs leading-5 ${
                            index === 0
                              ? "text-[#C7D1CB]"
                              : "text-[#6D7069]"
                          }`}
                        >
                          {day.impact}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href="/dashboard/sites"
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#23483A]"
              >
                View detailed environmental history
                <ArrowRight size={15} />
              </Link>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}