import Link from "next/link";
import { notFound } from "next/navigation";

import { ArrowRight } from "@/components/icons/terr-iq-icons";
import { getOperation } from "@/lib/data/operations";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

const levelStyles = {
  high: {
    text: "text-[#B66A45]",
    line: "bg-[#B66A45]",
  },
  moderate: {
    text: "text-[#6D7069]",
    line: "bg-[#92958D]",
  },
  low: {
    text: "text-[#5F7167]",
    line: "bg-[#5F7167]",
  },
};

export default async function OperationDetailPage({
  params,
}: PageProps) {
  const { id } = await params;

  const operation = getOperation(id);

  if (!operation) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#F5F3ED] text-[#171A17]">
      <main className="min-h-screen">
        <div className="mx-auto max-w-[1400px] px-6 py-10 lg:px-10 lg:py-14">
          {/* Back */}
          <Link
            href="/dashboard/operations"
            className="inline-flex items-center gap-2 text-sm text-[#6D7069] transition hover:text-[#171A17]"
          >
            ← Operations
          </Link>

          {/* Header */}
          <section className="mt-10 border-b border-[#D9D7CE] pb-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#B66A45]">
                  Operation
                </p>

                <h1 className="mt-3 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                  {operation.name}
                </h1>

                <p className="mt-3 text-base text-[#6D7069]">
                  {operation.type} · {operation.frequency} ·{" "}
                  {operation.assets}
                </p>
              </div>

              <div className="flex items-center gap-5 text-sm">
                <button className="text-[#23483A]">Edit</button>
                <button className="text-[#6D7069]">•••</button>
              </div>
            </div>
          </section>

          {/* Status */}
          <section className="mt-10">
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#B66A45]">
              Status
            </p>

            <div className="mt-5 border border-[#B9B7AE] bg-[#FBFAF6] p-7 lg:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xl font-medium">
                    ● {operation.status.toUpperCase()}
                  </p>

                  <p className="mt-3 max-w-2xl text-sm leading-6 text-[#6D7069]">
                    {operation.description}
                  </p>
                </div>

                <span className="text-xs uppercase tracking-[0.12em] text-[#92958D]">
                  48h outlook
                </span>
              </div>
            </div>
          </section>

          {/* Environmental factors */}
          <section className="mt-16">
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#B66A45]">
              Environmental factors
            </p>

            <div className="mt-6 grid gap-px overflow-hidden border border-[#D9D7CE] bg-[#D9D7CE] md:grid-cols-3">
              {operation.factors.map((factor) => {
                const level =
                  factor.level.toLowerCase() as keyof typeof levelStyles;

                return (
                  <article
                    key={factor.name}
                    className="bg-[#FBFAF6] p-7"
                  >
                    <p className="text-xs uppercase tracking-[0.12em] text-[#92958D]">
                      {factor.name}
                    </p>

                    <p
                      className={`mt-8 text-xl font-medium ${levelStyles[level]?.text ?? "text-[#6D7069]"}`}
                    >
                      {factor.level.toUpperCase()}
                    </p>
                  </article>
                );
              })}
            </div>
          </section>

          {/* Potential impact */}
          <section className="mt-16">
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#B66A45]">
              Potential impact
            </p>

            <div className="mt-5 flex flex-wrap border-y border-[#D9D7CE]">
              {operation.impacts.map((impact) => (
                <div
                  key={impact}
                  className="border-b border-[#D9D7CE] px-5 py-4 text-sm text-[#4F554F] last:border-b-0 sm:border-r sm:last:border-r-0"
                >
                  {impact}
                </div>
              ))}
            </div>
          </section>

          {/* Upcoming risk */}
          <section className="mt-16">
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#B66A45]">
              Upcoming risk
            </p>

            <div className="mt-6 border border-[#D9D7CE] bg-[#FBFAF6]">
              <div className="grid lg:grid-cols-[1fr_1.2fr]">
                <div className="border-b border-[#D9D7CE] p-7 lg:border-b-0 lg:border-r lg:p-8">
                  <p className="text-xs uppercase tracking-[0.12em] text-[#92958D]">
                    Event
                  </p>

                  <h2 className="mt-4 text-2xl font-medium tracking-[-0.03em]">
                    {operation.upcomingRisk.title}
                  </h2>

                  <p className="mt-2 text-sm text-[#B66A45]">
                    {operation.upcomingRisk.timing}
                  </p>
                </div>

                <div className="p-7 lg:p-8">
                  <p className="text-xs uppercase tracking-[0.12em] text-[#92958D]">
                    Potential impact
                  </p>

                  <p className="mt-3 text-sm leading-6 text-[#4F554F]">
                    {operation.upcomingRisk.impact}
                  </p>

                  <div className="mt-7 border-t border-[#D9D7CE] pt-5">
                    <p className="text-xs uppercase tracking-[0.12em] text-[#92958D]">
                      Recommendation
                    </p>

                    <p className="mt-3 text-sm leading-6 text-[#4F554F]">
                      {operation.upcomingRisk.recommendation}
                    </p>
                  </div>

                  <div className="mt-7 flex flex-wrap gap-5">
                    <button className="inline-flex items-center gap-2 border border-[#23483A] bg-[#23483A] px-5 py-3 text-sm font-medium text-[#F5F3ED]">
                      Review route
                      <ArrowRight size={15} />
                    </button>

                    <button className="inline-flex items-center gap-2 px-2 py-3 text-sm font-medium text-[#23483A]">
                      Add to plan
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Outlook */}
          <section className="mt-16 pb-16">
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#B66A45]">
              Operation outlook
            </p>

            <h2 className="mt-2 text-2xl font-medium tracking-[-0.03em]">
              The next 7 days
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#6D7069]">
              Environmental conditions translated into potential
              operational consequences.
            </p>

            <div className="mt-6 overflow-x-auto border border-[#D9D7CE] bg-[#FBFAF6]">
              <div className="grid min-w-[700px] grid-cols-5 divide-x divide-[#D9D7CE]">
                {operation.outlook.map((day, index) => {
                  const style = levelStyles[day.level];

                  return (
                    <article
                      key={day.day}
                      className={`p-5 ${
                        index === 0 ? "bg-[#23483A] text-[#F5F3ED]" : ""
                      }`}
                    >
                      <p
                        className={`text-xs uppercase tracking-[0.12em] ${
                          index === 0
                            ? "text-[#A9B9AF]"
                            : "text-[#92958D]"
                        }`}
                      >
                        {day.day}
                      </p>

                      <h3 className="mt-10 text-lg font-medium">
                        {day.condition}
                      </h3>

                      <div
                        className={`mt-3 h-px w-8 ${
                          index === 0
                            ? "bg-[#D99A78]"
                            : style.line
                        }`}
                      />

                      <p
                        className={`mt-4 text-sm leading-6 ${
                          index === 0
                            ? "text-[#C7D1CB]"
                            : "text-[#6D7069]"
                        }`}
                      >
                        {day.impact}
                      </p>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}