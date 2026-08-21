"use client";

import { useState } from "react";
import Link from "next/link";

import {
  ArrowRight,
  Bell,
  ChevronRight,
  Location,

  TrendingUp,
} from "@/components/icons/terr-iq-icons";


import { SiteSwitcher } from "@/components/dashboard/site-switcher";

import {
  overviewData,
  sites,
  type Priority,
} from "@/lib/data/overview";

export default function DashboardPage() {
  const [selectedSite, setSelectedSite] = useState(sites[0].id);

  const site =
    sites.find((item) => item.id === selectedSite) ?? sites[0];

  const data = overviewData[selectedSite as keyof typeof overviewData];

  const completedPercentage =
    (data.plan.completed / data.plan.total) * 100;

  const priorityStyles: Record<Priority, string> = {
    High: "text-[#B66A45]",
    Medium: "text-[#6D7069]",
    Low: "text-[#92958D]",
  };

  return (
    <div className="min-h-screen bg-[#F5F3ED] text-[#171A17]">


      <main className="min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-[#D9D7CE] bg-[#F5F3ED]/95 px-6 backdrop-blur lg:px-10">
          <div className="flex items-center gap-3">


            <span className="text-sm font-medium text-[#171A17]">
              Overview
            </span>
          </div>

          <div className="flex items-center gap-5">
            <SiteSwitcher
              selectedSite={selectedSite}
              onChange={setSelectedSite}
            />

            <button
              type="button"
              className="relative flex h-9 w-9 items-center justify-center text-[#6D7069] transition hover:text-[#171A17]"
              aria-label="Notifications"
            >
              <Bell size={18} />

              <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 bg-[#B66A45]" />
            </button>

            <div className="hidden h-8 w-8 items-center justify-center bg-[#23483A] text-xs font-medium text-white sm:flex">
              P
            </div>
          </div>
        </header>

        {/* <div className="mx-auto max-w-[1400px] px-6 py-10 lg:px-10 lg:py-14"> */}
        <div className="w-full px-6 py-10 lg:px-10 lg:py-14">
          {/* Intro */}
          <section>
            <p className="text-sm font-medium uppercase tracking-[0.14em] text-[#B66A45]">
              Site overview
            </p>

            <h1 className="mt-3 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
              Good morning, Pearl
            </h1>

            <p className="mt-3 text-base leading-7 text-[#6D7069]">
              Here&apos;s what could affect your operation.
            </p>
          </section>

          {/* Monitoring */}
          <section className="mt-10 border border-[#D9D7CE] bg-[#FBFAF6]">
            <div className="border-b border-[#D9D7CE] px-6 py-4">
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#92958D]">
                Monitoring
              </p>
            </div>

            <div className="grid lg:grid-cols-[1.3fr_1fr]">
              <div className="p-6 lg:p-8">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <h2 className="text-2xl font-medium tracking-[-0.03em]">
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

                  <button
                    type="button"
                    onClick={() => setSelectedSite(selectedSite)}
                    className="hidden text-sm font-medium text-[#23483A] sm:block"
                  >
                    Change site →
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 border-t border-[#D9D7CE] lg:border-l lg:border-t-0">
                <div className="border-r border-[#D9D7CE] p-6">
                  <p className="text-xs uppercase tracking-[0.12em] text-[#92958D]">
                    Current
                  </p>

                  <p className="mt-3 text-3xl font-medium tracking-[-0.04em]">
                    {site.currentTemperature}°C
                  </p>
                </div>

                <div className="p-6">
                  <p className="text-xs uppercase tracking-[0.12em] text-[#92958D]">
                    Humidity
                  </p>

                  <p className="mt-3 text-3xl font-medium tracking-[-0.04em]">
                    {site.humidity}%
                  </p>
                </div>

                <div className="border-r border-t border-[#D9D7CE] p-6">
                  <p className="text-xs uppercase tracking-[0.12em] text-[#92958D]">
                    Rainfall
                  </p>

                  <p className="mt-3 text-lg font-medium text-[#B66A45]">
                    {site.rainfall}
                  </p>
                </div>

                <div className="border-t border-[#D9D7CE] p-6">
                  <p className="text-xs uppercase tracking-[0.12em] text-[#92958D]">
                    Conditions
                  </p>

                  <p className="mt-3 text-lg font-medium">
                    {site.exposure}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Attention */}
          <section className="mt-14">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#B66A45]">
                  Attention required
                </p>

                <h2 className="mt-2 text-2xl font-medium tracking-[-0.03em]">
                  What may need action
                </h2>
              </div>

              <Link
                href="/dashboard/alerts"
                className="hidden items-center gap-1 text-sm font-medium text-[#23483A] sm:flex"
              >
                {data.concerns.length} concerns
                <ArrowRight size={15} />
              </Link>
            </div>

            <div className="mt-6 grid gap-px overflow-hidden border border-[#D9D7CE] bg-[#D9D7CE] md:grid-cols-3">
              {data.concerns.map((concern) => (
                <article
                  key={concern.number}
                  className="group bg-[#FBFAF6] p-6 transition hover:bg-white lg:p-7"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#B66A45]">
                      {concern.number}
                    </span>

                    <span
                      className={`text-xs font-medium ${priorityStyles[concern.priority]}`}
                    >
                      {concern.priority} priority
                    </span>
                  </div>

                  <h3 className="mt-10 text-xl font-medium tracking-[-0.025em]">
                    {concern.title}
                  </h3>

                  <p className="mt-2 text-sm text-[#6D7069]">
                    {concern.timing}
                  </p>

                  <div className="mt-8 border-t border-[#D9D7CE] pt-5">
                    <p className="text-xs uppercase tracking-[0.12em] text-[#92958D]">
                      May affect
                    </p>

                    <p className="mt-2 text-sm leading-6 text-[#4F554F]">
                      {concern.impact}
                    </p>
                  </div>

                  <button
                    type="button"
                    className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-[#23483A]"
                  >
                    Review
                    <ArrowRight
                      size={15}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </button>
                </article>
              ))}
            </div>
          </section>

          {/* Conditions */}
          <section className="mt-16">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#B66A45]">
                Environmental conditions
              </p>

              <h2 className="mt-2 text-2xl font-medium tracking-[-0.03em]">
                Conditions affecting your site
              </h2>
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

                  <button
                    type="button"
                    className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-[#23483A]"
                  >
                    View assessment
                    <ArrowRight size={15} />
                  </button>
                </article>
              ))}
            </div>
          </section>

          {/* Outlook */}
          <section className="mt-16">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#B66A45]">
                Environmental outlook
              </p>

              <h2 className="mt-2 text-2xl font-medium tracking-[-0.03em]">
                The next 7 days
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#6D7069]">
                Environmental conditions translated into what they could
                mean for this operation.
              </p>
            </div>

            <div className="mt-6 overflow-x-auto border border-[#D9D7CE] bg-[#FBFAF6]">
              <div className="grid min-w-[700px] grid-cols-5 divide-x divide-[#D9D7CE]">
                {data.outlook.map((day, index) => (
                  <div
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
          </section>

          {/* Actions */}
          <section className="mt-16">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#B66A45]">
                  Decision support
                </p>

                <h2 className="mt-2 text-2xl font-medium tracking-[-0.03em]">
                  Recommended actions
                </h2>
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
                    className={`text-xs font-medium ${priorityStyles[action.priority]}`}
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

          {/* Active plan */}
          <section className="mt-16 pb-16">
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#B66A45]">
              Active plan
            </p>

            <div className="mt-6 border border-[#23483A] bg-[#23483A] p-7 text-[#F5F3ED] lg:p-8">
              <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-xl">
                  <h2 className="text-2xl font-medium tracking-[-0.03em]">
                    {data.plan.name}
                  </h2>

                  <div className="mt-7">
                    <div className="flex items-center justify-between text-xs text-[#A9B9AF]">
                      <span>
                        {data.plan.completed} of {data.plan.total} actions
                        completed
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
        </div>
      </main>
    </div>
  );
}