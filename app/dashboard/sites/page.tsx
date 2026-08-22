"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

import {
  ArrowRight,
  Location,
} from "@/components/icons/terr-iq-icons";
import { MobileSidebar } from "@/components/dashboard/mobile-nav";
import {
  DashReveal,
  StaggerList,
  staggerItem,
} from "@/components/dashboard/dashboard-motion";

import { siteRecords } from "@/lib/data/site";

type Filter = "All" | "Active" | "Assessments";

export default function SitesPage() {
  const [filter, setFilter] = useState<Filter>("All");

  const filteredSites = siteRecords.filter((site) => {
    if (filter === "All") return true;
    if (filter === "Active") return site.status === "Active";
    return site.status === "Assessment";
  });

  return (
    <div className="min-h-screen bg-[#F5F3ED] text-[#171A17]">
      <main className="min-h-screen">
        {/* Header */}
        <header className="relative border-b border-[#D9D7CE]">
          <div className="flex min-h-[72px] items-center justify-between pl-16 pr-6 lg:px-10">
            <MobileSidebar />
            <h1 className="text-sm font-medium">Sites</h1>

            <Link
              href="/dashboard/assess"
              className="inline-flex items-center gap-2 bg-[#23483A] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#18362B]"
            >
              <span className="text-lg leading-none">+</span>
              New site assessment
            </Link>
          </div>
        </header>

        <div className="w-full px-6 py-6 sm:py-10 lg:px-10 lg:py-14">
          <div className="mx-auto max-w-[1200px]">
            {/* Intro */}
            <DashReveal>
              <section>
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#B66A45]">
                  Your places
                </p>

                <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em] sm:text-5xl sm:tracking-[-0.045em]">
                  Sites
                </h2>

                <p className="mt-3 max-w-xl text-sm leading-6 text-[#6D7069] sm:mt-4 sm:text-base sm:leading-7">
                  Monitor environmental conditions and exposure across the
                  locations your business depends on.
                </p>
              </section>
            </DashReveal>

            {/* Filters */}
            <div className="mt-10 flex gap-6 border-b border-[#D9D7CE]">
              {(["All", "Active", "Assessments"] as Filter[]).map(
                (item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setFilter(item)}
                    className={`relative pb-4 text-sm transition ${
                      filter === item
                        ? "font-medium text-[#23483A]"
                        : "text-[#92958D] hover:text-[#4F554F]"
                    }`}
                  >
                    {item}

                    {filter === item && (
                      <span className="absolute bottom-0 left-0 h-px w-full bg-[#23483A]" />
                    )}
                  </button>
                ),
              )}
            </div>

            {/* Site list */}
            <StaggerList className="mt-8 space-y-4">
              {filteredSites.map((site) => (
                <motion.article
                  key={site.id}
                  variants={staggerItem}
                  whileHover={{ y: -3 }}
                  className="group border border-[#D9D7CE] bg-[#FBFAF6] transition hover:border-[#B9B7AE]"
                >
                  <div className="p-5 sm:p-8">
                    <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
                      {/* Site identity */}
                      <div>
                        <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#B66A45]">
                          {site.status === "Active"
                            ? "Monitored site"
                            : "Assessment"}
                        </p>

                        <h3 className="mt-4 text-xl font-medium tracking-[-0.03em] sm:text-2xl">
                          {site.name}
                        </h3>

                        <div className="mt-2 flex items-center gap-2 text-sm text-[#6D7069]">
                          <Location size={15} />
                          {site.location}
                        </div>

                        <p className="mt-1 text-sm text-[#92958D]">
                          {site.type}
                        </p>
                      </div>

                      {/* Exposure */}
                      <div className="min-w-[220px] lg:text-right">
                        <p className="text-xs uppercase tracking-[0.12em] text-[#92958D]">
                          Current exposure
                        </p>

                        <div className="mt-3 flex items-center gap-2 lg:justify-end">
                          <span className="h-2 w-2 rounded-full bg-[#B66A45]" />

                          <span className="text-base font-medium sm:text-lg">
                            {site.exposure}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom information */}
                    <div className="mt-8 grid gap-8 border-t border-[#D9D7CE] pt-6 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
                      <div>
                        <p className="text-xs uppercase tracking-[0.12em] text-[#92958D]">
                          {site.concernCount > 0
                            ? `${site.concernCount} active ${
                                site.concernCount === 1
                                  ? "concern"
                                  : "concerns"
                              }`
                            : "No active concerns"}
                        </p>

                        {site.concerns.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                            {site.concerns.map((concern) => (
                              <span
                                key={concern}
                                className="flex items-center gap-2 text-sm text-[#4F554F]"
                              >
                                <span className="h-1.5 w-1.5 rounded-full bg-[#B66A45]" />
                                {concern}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      <div>
                        <p className="text-xs uppercase tracking-[0.12em] text-[#92958D]">
                          Last assessed
                        </p>

                        <p className="mt-2 text-sm text-[#4F554F]">
                          {site.lastAssessed}
                        </p>
                      </div>

                      <Link
                        href={`/dashboard/sites/${site.id}`}
                        className="inline-flex items-center gap-2 text-sm font-medium text-[#23483A]"
                      >
                        Open site
                        <ArrowRight
                          size={15}
                          className="transition-transform group-hover:translate-x-1"
                        />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </StaggerList>

            {/* Empty state */}
            {filteredSites.length === 0 && (
              <div className="border border-dashed border-[#C8C6BC] px-6 py-16 text-center">
                <p className="text-lg font-medium">No sites here yet.</p>
                <p className="mt-2 text-sm text-[#6D7069]">
                  Start an assessment to begin monitoring a location.
                </p>

                <Link
                  href="/dashboard/assess"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#23483A]"
                >
                  Start assessment
                  <ArrowRight size={15} />
                </Link>
              </div>
            )}

            {/* Add another */}
            <div className="flex justify-center py-12">
              <Link
                href="/dashboard/assess"
                className="text-sm font-medium text-[#23483A] transition hover:text-[#B66A45]"
              >
                + Add another site
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}