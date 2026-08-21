"use client";

import Link from "next/link";

import { ArrowRight } from "@/components/icons/terr-iq-icons";
import { operations } from "@/lib/data/operations";

const statusStyles = {
  Monitor: "text-[#B66A45]",
  Attention: "text-[#B66A45]",
  Normal: "text-[#5F7167]",
};

export default function OperationsPage() {
  return (
    <div className="min-h-screen bg-[#F5F3ED] text-[#171A17]">
      <main className="min-h-screen">
        <div className="mx-auto max-w-[1400px] px-6 py-10 lg:px-10 lg:py-14">
          {/* Header */}
          <section className="flex flex-col gap-6 border-b border-[#D9D7CE] pb-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#B66A45]">
                Operations
              </p>

              <h1 className="mt-3 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                Your operations
              </h1>

              <p className="mt-3 max-w-xl text-base leading-7 text-[#6D7069]">
                Monitor environmental exposure across your business
                activities.
              </p>
            </div>

            <Link
              href="/dashboard/operations/new"
              className="inline-flex items-center justify-center gap-2 self-start border border-[#23483A] bg-[#23483A] px-5 py-3 text-sm font-medium text-[#F5F3ED] transition hover:bg-[#19382D] sm:self-auto"
            >
              + Add operation
            </Link>
          </section>

          {/* Operations */}
          <section className="mt-10">
            <div className="space-y-4">
              {operations.map((operation) => (
                <article
                  key={operation.id}
                  className="border border-[#D9D7CE] bg-[#FBFAF6] transition hover:border-[#B9B7AE] hover:bg-white"
                >
                  <div className="p-6 lg:p-8">
                    <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
                      {/* Main information */}
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-4">
                          <h2 className="text-2xl font-medium tracking-[-0.03em]">
                            {operation.name}
                          </h2>

                          <span
                            className={`text-xs font-medium uppercase tracking-[0.12em] ${
                              statusStyles[operation.status]
                            }`}
                          >
                            ● {operation.status}
                          </span>
                        </div>

                        <p className="mt-3 text-sm text-[#6D7069]">
                          {operation.assets} · {operation.type} ·{" "}
                          {operation.frequency} operation
                        </p>

                        {/* Concerns */}
                        {operation.concerns.length > 0 && (
                          <div className="mt-8">
                            <p className="text-xs font-medium uppercase tracking-[0.13em] text-[#92958D]">
                              Upcoming concerns
                            </p>

                            <div className="mt-4 space-y-3">
                              {operation.concerns.map((concern) => (
                                <div
                                  key={concern.title}
                                  className="grid gap-1 text-sm sm:grid-cols-[180px_100px_1fr]"
                                >
                                  <span className="font-medium">
                                    <span className="mr-2 text-[#B66A45]">
                                      ⚠
                                    </span>
                                    {concern.title}
                                  </span>

                                  <span className="text-[#6D7069]">
                                    {concern.timing}
                                  </span>

                                  <span className="text-[#6D7069]">
                                    {concern.impact}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Recommendation */}
                        <div className="mt-7 border-t border-[#D9D7CE] pt-5">
                          <p className="text-xs uppercase tracking-[0.12em] text-[#92958D]">
                            Recommended
                          </p>

                          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#4F554F]">
                            {operation.recommendation}
                          </p>
                        </div>
                      </div>

                      {/* Action */}
                      <div className="lg:pt-1">
                        <Link
                          href={`/dashboard/operations/${operation.id}`}
                          className="group inline-flex items-center gap-2 text-sm font-medium text-[#23483A]"
                        >
                          View operation
                          <ArrowRight
                            size={15}
                            className="transition-transform group-hover:translate-x-1"
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Add operation */}
          <section className="py-10 text-center">
            <Link
              href="/dashboard/operations/new"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#23483A]"
            >
              + Add another operation
              <ArrowRight size={15} />
            </Link>
          </section>
        </div>
      </main>
    </div>
  );
}