"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Search,
} from "@/components/icons/terr-iq-icons";
import { MobileSidebar } from "@/components/dashboard/mobile-nav";
import { DashReveal } from "@/components/dashboard/dashboard-motion";

const helpSections = [
  {
    title: "Getting started",
    articles: [
      "What is TerrIQ?",
      "Creating your first assessment",
      "Understanding your dashboard",
    ],
  },
  {
    title: "Assessments",
    articles: [
      "Understanding an assessment",
      "Understanding exposure levels",
      "Understanding recommendations",
    ],
  },
  {
    title: "Monitoring",
    articles: [
      "Managing sites",
      "Managing operations",
      "Understanding alerts",
    ],
  },
  {
    title: "Plans",
    articles: [
      "Creating a resilience plan",
      "Understanding estimated costs",
      "Finding local resources",
    ],
  },
];

export default function HelpPage() {
  const [search, setSearch] = useState("");

  const normalizedSearch = search.toLowerCase().trim();

  const filteredSections = helpSections
    .map((section) => ({
      ...section,
      articles: section.articles.filter((article) =>
        article.toLowerCase().includes(normalizedSearch)
      ),
    }))
    .filter((section) => section.articles.length > 0);

  return (
    <div className="min-h-screen bg-[#F5F3ED] text-[#171A17]">
      <main className="min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-[#D9D7CE] bg-[#F5F3ED]/95 pl-16 pr-6 backdrop-blur lg:px-10">
          <MobileSidebar />

          <span className="text-sm font-medium">Help</span>
        </header>

        <div className="w-full px-6 py-6 sm:py-10 lg:px-10 lg:py-14">
          {/* Hero */}
          <DashReveal>
            <section className="max-w-3xl">
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#B66A45]">
                TerrIQ Help
              </p>

              <h1 className="mt-3 text-2xl font-semibold tracking-[-0.04em] sm:text-5xl sm:tracking-[-0.045em]">
                How can we help?
              </h1>

              <p className="mt-2 text-sm leading-6 text-[#6D7069] sm:mt-3 sm:text-base sm:leading-7">
                Learn how TerrIQ assessments, monitoring, alerts, and plans work.
              </p>

            {/* Search */}
            <div className="relative mt-8 max-w-2xl">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#92958D]"
              />

              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search TerrIQ"
                className="h-12 w-full border border-[#D9D7CE] bg-[#FBFAF6] pl-12 pr-4 text-sm outline-none transition placeholder:text-[#92958D] focus:border-[#23483A] sm:h-14"
              />
            </div>
            </section>
          </DashReveal>

          {/* Help articles */}
          <section className="mt-14 max-w-5xl">
            {filteredSections.length > 0 ? (
              <div className="grid gap-x-10 gap-y-12 md:grid-cols-2">
                {filteredSections.map((section) => (
                  <div key={section.title}>
                    <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#92958D]">
                      {section.title}
                    </p>

                    <div className="mt-4 divide-y divide-[#D9D7CE] border-y border-[#D9D7CE]">
                      {section.articles.map((article) => (
                        <Link
                          key={article}
                          href="#"
                          className="group flex items-center justify-between gap-5 py-5"
                        >
                          <span className="text-sm font-medium">
                            {article}
                          </span>

                          <ArrowRight
                            size={15}
                            className="shrink-0 text-[#92958D] transition-transform group-hover:translate-x-1 group-hover:text-[#23483A]"
                          />
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="border border-[#D9D7CE] bg-[#FBFAF6] px-6 py-12 text-center">
                <p className="text-sm font-medium">
                  No articles found
                </p>

                <p className="mt-2 text-sm text-[#6D7069]">
                  Try searching for something like “assessment”, “alerts”, or
                  “plans”.
                </p>
              </div>
            )}
          </section>

          {/* Support */}
          <section className="mt-16 max-w-5xl border-t border-[#D9D7CE] pt-10 pb-16">
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#B66A45]">
              Need more help?
            </p>

            <div className="mt-4 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <div>
                <h2 className="text-2xl font-medium tracking-[-0.03em]">
                  Talk to TerrIQ support
                </h2>

                <p className="mt-2 max-w-lg text-sm leading-6 text-[#6D7069]">
                  If something isn't clear or something isn't working,
                  we're here to help.
                </p>
              </div>

              <Link
                href="mailto:support@terriq.com"
                className="inline-flex items-center gap-2 text-sm font-medium text-[#23483A]"
              >
                Contact support
                <ArrowRight size={15} />
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}