"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

import {
  ArrowRight,
  Bell,
  ChevronRight,
  Location,
  TrendingUp,
} from "@/components/icons/terr-iq-icons";

import { SiteSwitcher } from "@/components/dashboard/site-switcher";
import { MobileSidebar } from "@/components/dashboard/mobile-nav";
import {
  DashReveal,
  StaggerList,
  staggerItem,
} from "@/components/dashboard/dashboard-motion";

import {
  overviewData,
  sites,
  type Priority,
} from "@/lib/data/overview";

export default function DashboardPage() {
  const [selectedSite, setSelectedSite] = useState(sites[0].id);

  const site =
    sites.find((item) => item.id === selectedSite) ?? sites[0];

  const data =
    overviewData[selectedSite as keyof typeof overviewData];

  const completedPercentage =
    data.plan.total > 0
      ? (data.plan.completed / data.plan.total) * 100
      : 0;

  const priorityStyles: Record<Priority, string> = {
    High: "text-[#B66A45]",
    Medium: "text-[#6D7069]",
    Low: "text-[#92958D]",
  };

  return (
    <div className="min-h-screen bg-[#F5F3ED] text-[#171A17]">
      <main className="min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-[#D9D7CE] bg-[#F5F3ED]/95 pl-16 pr-6 backdrop-blur lg:px-10">
          <MobileSidebar />

          <div>
            <span className="text-sm font-medium text-[#171A17]">
              Overview
            </span>
          </div>

          <div className="flex items-center gap-5">
            <SiteSwitcher
              selectedSite={selectedSite}
              onChange={setSelectedSite}
            />

            <Link
              href="/dashboard/alerts"
              className="relative flex h-9 w-9 items-center justify-center text-[#6D7069] transition hover:text-[#171A17]"
              aria-label="Alerts"
            >
              <Bell size={18} />

              {data.concerns.length > 0 && (
                <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 bg-[#B66A45]" />
              )}
            </Link>

            <div className="hidden h-8 w-8 items-center justify-center bg-[#23483A] text-xs font-medium text-white sm:flex">
              P
            </div>
          </div>
        </header>

        <div className="w-full px-6 py-6 sm:py-10 lg:px-10 lg:py-14">
          {/* ========================================================= */}
          {/* INTRO */}
          {/* ========================================================= */}

          <DashReveal>
            <section>
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#B66A45] sm:text-sm">
                Operational intelligence
              </p>

              <h1 className="mt-2 text-2xl font-semibold tracking-[-0.04em] sm:mt-3 sm:text-5xl sm:tracking-[-0.045em]">
                Good morning, Pearl
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#6D7069] sm:mt-3 sm:text-base sm:leading-7">
                Environmental conditions translated into what they could
                mean for your sites, operations, and decisions.
              </p>
            </section>
          </DashReveal>

          {/* ========================================================= */}
          {/* CURRENT ENVIRONMENTAL PICTURE */}
          {/* ========================================================= */}

          <DashReveal index={1}>
          <section className="mt-8 border border-[#D9D7CE] bg-[#FBFAF6] sm:mt-10">
            <div className="border-b border-[#D9D7CE] px-6 py-4">
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#92958D]">
                Current environmental picture
              </p>
            </div>

            <div className="grid lg:grid-cols-[1fr_1.2fr]">
              {/* Site identity */}
              <div className="border-b border-[#D9D7CE] p-6 lg:border-b-0 lg:border-r lg:p-8">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <p className="text-xs uppercase tracking-[0.12em] text-[#92958D]">
                      Monitoring
                    </p>

                    <h2 className="mt-4 text-xl font-medium tracking-[-0.03em] sm:text-2xl">
                      {site.name}
                    </h2>

                    <div className="mt-2 flex items-center gap-2 text-sm text-[#6D7069]">
                      <Location size={15} />
                      {site.location}
                    </div>

                    <p className="mt-1 text-sm text-[#92958D]">
                      {site.type}
                    </p>
                  </div>
                </div>

                <Link
                  href={`/dashboard/sites/${site.id}`}
                  className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-[#23483A]"
                >
                  Open site
                  <ArrowRight size={15} />
                </Link>
              </div>

              {/* Intelligence */}
              <div className="p-6 lg:p-8">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <p className="text-xs uppercase tracking-[0.12em] text-[#92958D]">
                      Exposure
                    </p>

                    <p className="mt-3 text-2xl font-medium tracking-[-0.04em] sm:text-3xl">
                      {site.exposure}
                    </p>
                  </div>

                  <TrendingUp
                    size={18}
                    className="text-[#B66A45]"
                  />
                </div>

                <div className="mt-8 border-t border-[#D9D7CE] pt-5">
                  <p className="text-xs uppercase tracking-[0.12em] text-[#92958D]">
                    What this could mean
                  </p>

                  <p className="mt-3 max-w-2xl text-sm leading-7 text-[#4F554F]">
                    {data.concerns.length > 0
                      ? `${data.concerns.length} environmental condition${
                          data.concerns.length === 1 ? "" : "s"
                        } currently deserve attention because they may affect how this site operates.`
                      : "No major environmental concern currently requires action."}
                  </p>
                </div>
              </div>
            </div>
          </section>
          </DashReveal>

          {/* ========================================================= */}
          {/* ATTENTION */}
          {/* ========================================================= */}

          <section className="mt-14">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#B66A45]">
                  What needs attention
                </p>

                <h2 className="mt-2 text-2xl font-medium tracking-[-0.03em]">
                  Environmental conditions that could affect you
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-[#6D7069]">
                  TerrIQ prioritizes conditions based on their potential
                  effect on your business, not just how unusual the
                  weather looks.
                </p>
              </div>

              <Link
                href="/dashboard/alerts"
                className="hidden items-center gap-1 text-sm font-medium text-[#23483A] sm:flex"
              >
                View all alerts
                <ArrowRight size={15} />
              </Link>
            </div>

            <StaggerList className="mt-6 grid gap-px overflow-hidden border border-[#D9D7CE] bg-[#D9D7CE] md:grid-cols-3">
              {data.concerns.map((concern) => (
                <motion.article
                  key={concern.number}
                  variants={staggerItem}
                  whileHover={{ y: -3 }}
                  className="group cursor-default bg-[#FBFAF6] p-5 transition hover:bg-white sm:p-6 lg:p-7"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#B66A45]">
                      {concern.number}
                    </span>

                    <span
                      className={`text-xs font-medium ${
                        priorityStyles[concern.priority]
                      }`}
                    >
                      {concern.priority} priority
                    </span>
                  </div>

                  <h3 className="mt-8 text-lg font-medium tracking-[-0.025em] sm:mt-10 sm:text-xl">
                    {concern.title}
                  </h3>

                  <p className="mt-2 text-sm text-[#6D7069]">
                    {concern.timing}
                  </p>

                  <div className="mt-8 border-t border-[#D9D7CE] pt-5">
                    <p className="text-xs uppercase tracking-[0.12em] text-[#92958D]">
                      Potential business impact
                    </p>

                    <p className="mt-2 text-sm leading-6 text-[#4F554F]">
                      {concern.impact}
                    </p>
                  </div>

                  <Link
                    href="/dashboard/alerts"
                    className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-[#23483A]"
                  >
                    Review
                    <ArrowRight
                      size={15}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                </motion.article>
              ))}
            </StaggerList>
          </section>

          {/* ========================================================= */}
          {/* CONDITIONS → CONSEQUENCES */}
          {/* ========================================================= */}

          <section className="mt-16">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#B66A45]">
                Environmental intelligence
              </p>

              <h2 className="mt-2 text-2xl font-medium tracking-[-0.03em]">
                What the conditions could affect
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#6D7069]">
                Instead of stopping at temperature and rainfall, TerrIQ
                connects environmental signals to the parts of your
                business that matter.
              </p>
            </div>

            <div className="mt-6 grid gap-px overflow-hidden border border-[#D9D7CE] bg-[#D9D7CE] md:grid-cols-2">
              {data.conditions.map((condition) => (
                <article
                  key={condition.type}
                  className="bg-[#FBFAF6] p-7 lg:p-8"
                >
                  <div className="flex items-start justify-between">
                    <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#92958D]">
                      {condition.type}
                    </p>

                    <TrendingUp
                      size={17}
                      className="text-[#B66A45]"
                    />
                  </div>

                  <h3 className="mt-8 text-3xl font-medium tracking-[-0.04em]">
                    {condition.status}
                  </h3>

                  <p className="mt-2 text-sm text-[#6D7069]">
                    {condition.detail}
                  </p>

                  <div className="mt-8 border-t border-[#D9D7CE] pt-5">
                    <p className="text-xs uppercase tracking-[0.12em] text-[#92958D]">
                      Could affect
                    </p>

                    <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
                      {condition.affects.map((item) => (
                        <span
                          key={item}
                          className="text-sm text-[#4F554F]"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link
                    href={`/dashboard/sites/${site.id}`}
                    className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-[#23483A]"
                  >
                    View site evidence
                    <ArrowRight size={15} />
                  </Link>
                </article>
              ))}
            </div>
          </section>

          {/* ========================================================= */}
          {/* OPERATIONAL OUTLOOK */}
          {/* ========================================================= */}

          <section className="mt-16">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#B66A45]">
                Operational outlook
              </p>

              <h2 className="mt-2 text-2xl font-medium tracking-[-0.03em]">
                What could change over the next 7 days
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#6D7069]">
                A forward view of environmental conditions and the
                operational pressure they may create.
              </p>
            </div>

            <div className="mt-6 overflow-x-auto border border-[#D9D7CE] bg-[#FBFAF6]">
              <div className="grid min-w-[700px] grid-cols-5 divide-x divide-[#D9D7CE]">
                {data.outlook.map((day, index) => (
                  <div
                    key={day.day}
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
                      {day.day}
                    </p>

                    <div className="mt-10">
                      <p className="text-lg font-medium">
                        {day.condition}
                      </p>

                      <div
                        className={`mt-3 h-px w-8 ${
                          day.level === "high"
                            ? "bg-[#B66A45]"
                            : index === 0
                              ? "bg-[#A9B9AF]"
                              : "bg-[#D9D7CE]"
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
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <Link
                href={`/dashboard/sites/${site.id}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-[#23483A]"
              >
                View detailed environmental history
                <ArrowRight size={15} />
              </Link>
            </div>
          </section>

          {/* ========================================================= */}
          {/* RECOMMENDED ACTIONS */}
          {/* ========================================================= */}

          <section className="mt-16">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#B66A45]">
                  Decision support
                </p>

                <h2 className="mt-2 text-2xl font-medium tracking-[-0.03em]">
                  What you can do now
                </h2>

                <p className="mt-2 text-sm leading-6 text-[#6D7069]">
                  Recommendations turn environmental intelligence
                  into concrete decisions.
                </p>
              </div>

              <Link
                href="/dashboard/plans"
                className="hidden items-center gap-1 text-sm font-medium text-[#23483A] sm:flex"
              >
                View plans
                <ArrowRight size={15} />
              </Link>
            </div>

            <div className="mt-6 border-y border-[#D9D7CE]">
              {data.actions.map((action) => (
                <div
                  key={action.number}
                  className="group grid gap-4 border-b border-[#D9D7CE] py-5 last:border-b-0 sm:grid-cols-[48px_1fr_100px_150px_20px] sm:items-center"
                >
                  <span className="text-xs text-[#B66A45]">
                    {action.number}
                  </span>

                  <p className="text-sm font-medium">
                    {action.title}
                  </p>

                  <span
                    className={`text-xs font-medium ${
                      priorityStyles[action.priority]
                    }`}
                  >
                    {action.priority}
                  </span>

                  <span className="text-sm text-[#6D7069]">
                    {action.timing}
                  </span>

                  <ChevronRight
                    size={16}
                    className="text-[#92958D] transition-transform group-hover:translate-x-1"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* ========================================================= */}
          {/* ACTIVE PLAN */}
          {/* ========================================================= */}

          <section className="mt-16">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#B66A45]">
                  Execution
                </p>

                <h2 className="mt-2 text-2xl font-medium tracking-[-0.03em]">
                  Active resilience plan
                </h2>
              </div>

              <Link
                href="/dashboard/plans"
                className="hidden items-center gap-1 text-sm font-medium text-[#23483A] sm:flex"
              >
                All plans
                <ArrowRight size={15} />
              </Link>
            </div>

            <div className="mt-6 border border-[#23483A] bg-[#23483A] p-7 text-[#F5F3ED] lg:p-8">
              <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-xl">
                  <h2 className="text-2xl font-medium tracking-[-0.03em]">
                    {data.plan.name}
                  </h2>

                  <div className="mt-7">
                    <div className="flex items-center justify-between text-xs text-[#A9B9AF]">
                      <span>
                        {data.plan.completed} of {data.plan.total}{" "}
                        actions completed
                      </span>

                      <span>
                        {Math.round(completedPercentage)}%
                      </span>
                    </div>

                    <div className="mt-3 h-1 bg-white/15">
                      <div
                        className="h-full bg-[#D99A78]"
                        style={{
                          width: `${completedPercentage}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-end justify-between gap-8 lg:min-w-[300px]">
                  <div>
                    <p className="text-xs uppercase tracking-[0.12em] text-[#A9B9AF]">
                      Estimated investment
                    </p>

                    <p className="mt-2 text-lg font-medium">
                      {data.plan.investment}
                    </p>
                  </div>

                  <Link
                    href="/dashboard/plans"
                    className="inline-flex items-center gap-2 text-sm font-medium text-[#D99A78]"
                  >
                    View plan
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* ========================================================= */}
          {/* TERRIQ NAVIGATION */}
          {/* ========================================================= */}

          <section className="mt-20 border-t border-[#D9D7CE] pt-12 pb-16">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#B66A45]">
                Go deeper
              </p>

              <h2 className="mt-2 text-2xl font-medium tracking-[-0.03em]">
                What are you trying to do?
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#6D7069]">
                The overview gives you the signal. These areas give you
                the tools to investigate, decide, and act.
              </p>
            </div>

            <div className="mt-6 grid gap-px overflow-hidden border border-[#D9D7CE] bg-[#D9D7CE] sm:grid-cols-2 lg:grid-cols-4">
              <Link
                href="/dashboard/sites"
                className="group bg-[#FBFAF6] p-7 transition hover:bg-white"
              >
                <p className="text-xs uppercase tracking-[0.12em] text-[#92958D]">
                  Monitor
                </p>

                <h3 className="mt-8 text-xl font-medium">
                  Sites
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#6D7069]">
                  Monitor environmental exposure across your locations.
                </p>

                <ArrowRight
                  size={16}
                  className="mt-7 text-[#23483A] transition-transform group-hover:translate-x-1"
                />
              </Link>

              <Link
                href="/dashboard/operations"
                className="group bg-[#FBFAF6] p-7 transition hover:bg-white"
              >
                <p className="text-xs uppercase tracking-[0.12em] text-[#92958D]">
                  Operate
                </p>

                <h3 className="mt-8 text-xl font-medium">
                  Operations
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#6D7069]">
                  See how environmental conditions could disrupt
                  business activities.
                </p>

                <ArrowRight
                  size={16}
                  className="mt-7 text-[#23483A] transition-transform group-hover:translate-x-1"
                />
              </Link>

              <Link
                href="/dashboard/assess"
                className="group bg-[#FBFAF6] p-7 transition hover:bg-white"
              >
                <p className="text-xs uppercase tracking-[0.12em] text-[#92958D]">
                  Decide
                </p>

                <h3 className="mt-8 text-xl font-medium">
                  Assess
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#6D7069]">
                  Evaluate a location before you build, acquire,
                  store, or operate there.
                </p>

                <ArrowRight
                  size={16}
                  className="mt-7 text-[#23483A] transition-transform group-hover:translate-x-1"
                />
              </Link>

              <Link
                href="/dashboard/plans"
                className="group bg-[#FBFAF6] p-7 transition hover:bg-white"
              >
                <p className="text-xs uppercase tracking-[0.12em] text-[#92958D]">
                  Execute
                </p>

                <h3 className="mt-8 text-xl font-medium">
                  Plans
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#6D7069]">
                  Turn recommendations into budgets, actions, and
                  measurable resilience.
                </p>

                <ArrowRight
                  size={16}
                  className="mt-7 text-[#23483A] transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}