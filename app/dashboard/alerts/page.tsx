"use client";

import Link from "next/link";

import {
  ArrowRight,
  ChevronRight,
} from "@/components/icons/terr-iq-icons";

type AlertPriority = "High" | "Medium" | "Low";

type Alert = {
  id: string;
  title: string;
  site: string;
  timing: string;
  priority: AlertPriority;
  impact: string;
  recommendation: string;
};

type UpcomingAlert = {
  title: string;
  timing: string;
  impact: string;
};

type HistoryAlert = {
  date: string;
  title: string;
  status: string;
};

const alerts: Alert[] = [
  {
    id: "heavy-rainfall-ikeja",
    title: "Heavy rainfall expected",
    site: "Ikeja Warehouse",
    timing: "Next 36 hours",
    priority: "High",
    impact: "drainage + site access",
    recommendation:
      "Inspect drainage and adjust inbound movement.",
  },
];

const upcoming: UpcomingAlert[] = [
  {
    title: "Elevated heat",
    timing: "Today",
    impact: "Storage",
  },
  {
    title: "Rainfall",
    timing: "Friday",
    impact: "Delivery access",
  },
];

const history: HistoryAlert[] = [
  {
    date: "Aug 18",
    title: "Heavy rainfall",
    status: "Reviewed",
  },
  {
    date: "Aug 15",
    title: "Heat exposure",
    status: "Action completed",
  },
];

const priorityStyles: Record<AlertPriority, string> = {
  High: "text-[#B66A45]",
  Medium: "text-[#6D7069]",
  Low: "text-[#92958D]",
};

export default function AlertsPage() {
  return (
    <div className="min-h-screen bg-[#F5F3ED] text-[#171A17]">
      <main className="min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-[#D9D7CE] bg-[#F5F3ED]/95 px-6 backdrop-blur lg:px-10">
          <span className="text-sm font-medium">Alerts</span>

          <button
            type="button"
            className="text-sm font-medium text-[#23483A] transition hover:text-[#171A17]"
          >
            Mark all reviewed
          </button>
        </header>

        <div className="mx-auto max-w-[1180px] px-6 py-10 lg:px-10 lg:py-14">
          {/* Intro */}
          <section className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#B66A45]">
              Environmental alerts
            </p>

            <h1 className="mt-3 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">
              Alerts
            </h1>

            <p className="mt-4 text-base leading-7 text-[#6D7069]">
              Changes that may require a decision or action across your
              monitored sites and operations.
            </p>
          </section>

          {/* Requires attention */}
          <section className="mt-12">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#B66A45]">
                Requires attention
              </p>

              <span className="text-xs text-[#92958D]">
                {alerts.length} active
              </span>
            </div>

            <div className="mt-5 space-y-4">
              {alerts.map((alert) => (
                <article
                  key={alert.id}
                  className="border border-[#B66A45]/40 bg-[#FBFAF6]"
                >
                  <div className="border-b border-[#D9D7CE] px-6 py-4 lg:px-8">
                    <span
                      className={`text-xs font-medium uppercase tracking-[0.14em] ${priorityStyles[alert.priority]}`}
                    >
                      {alert.priority} priority
                    </span>
                  </div>

                  <div className="p-6 lg:p-8">
                    <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
                      <div className="max-w-2xl">
                        <h2 className="text-2xl font-medium tracking-[-0.035em]">
                          {alert.title}
                        </h2>

                        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[#6D7069]">
                          <span>{alert.site}</span>

                          <span className="h-1 w-1 bg-[#92958D]" />

                          <span>{alert.timing}</span>
                        </div>
                      </div>

                      <div className="hidden h-10 w-10 items-center justify-center border border-[#D9D7CE] text-[#B66A45] lg:flex">
                        !
                      </div>
                    </div>

                    <div className="mt-8 grid gap-6 border-t border-[#D9D7CE] pt-6 lg:grid-cols-2">
                      <div>
                        <p className="text-xs uppercase tracking-[0.12em] text-[#92958D]">
                          Potential impact
                        </p>

                        <p className="mt-2 text-sm leading-6 text-[#4F554F]">
                          {alert.impact}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs uppercase tracking-[0.12em] text-[#92958D]">
                          Recommended
                        </p>

                        <p className="mt-2 text-sm leading-6 text-[#4F554F]">
                          {alert.recommendation}
                        </p>
                      </div>
                    </div>

                    <div className="mt-7">
                      <Link
                        href="/dashboard/sites/ikeja-warehouse"
                        className="group inline-flex items-center gap-2 text-sm font-medium text-[#23483A]"
                      >
                        Review assessment
                        <ArrowRight
                          size={15}
                          className="transition-transform group-hover:translate-x-1"
                        />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Upcoming */}
          <section className="mt-16 border-t border-[#D9D7CE] pt-10">
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#B66A45]">
              Upcoming
            </p>

            <div className="mt-6 border-y border-[#D9D7CE]">
              {upcoming.map((alert) => (
                <div
                  key={alert.title}
                  className="grid gap-3 border-b border-[#D9D7CE] py-5 last:border-b-0 sm:grid-cols-[1fr_150px_200px_20px] sm:items-center"
                >
                  <span className="text-sm font-medium">
                    {alert.title}
                  </span>

                  <span className="text-sm text-[#6D7069]">
                    {alert.timing}
                  </span>

                  <span className="text-sm text-[#6D7069]">
                    {alert.impact}
                  </span>

                  <ChevronRight
                    size={16}
                    className="hidden text-[#92958D] sm:block"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* History */}
          <section className="mt-16 pb-16 border-t border-[#D9D7CE] pt-10">
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#B66A45]">
              History
            </p>

            <div className="mt-6 border-y border-[#D9D7CE]">
              {history.map((alert) => (
                <div
                  key={`${alert.date}-${alert.title}`}
                  className="grid gap-3 border-b border-[#D9D7CE] py-5 last:border-b-0 sm:grid-cols-[100px_1fr_180px_20px] sm:items-center"
                >
                  <span className="text-sm text-[#92958D]">
                    {alert.date}
                  </span>

                  <span className="text-sm font-medium">
                    {alert.title}
                  </span>

                  <span className="text-sm text-[#6D7069]">
                    {alert.status}
                  </span>

                  <span className="flex h-5 w-5 items-center justify-center border border-[#23483A] text-xs text-[#23483A]">
                    ✓
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}