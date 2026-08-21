"use client";

import Link from "next/link";

import {
  ArrowRight,
  ChevronDown,
} from "@/components/icons/terr-iq-icons";

type Resource = {
  category: string;
  title: string;
  providers: string;
  cost?: string;
  description: string;
};

const resources: Resource[] = [
  {
    category: "Drainage",
    title: "Drainage contractors",
    providers: "12 providers around Lagos",
    cost: "₦150k–₦400k",
    description:
      "Contractors for drainage improvement, runoff management and site water control.",
  },
  {
    category: "Cooling",
    title: "Industrial cooling / ventilation",
    providers: "8 providers around Lagos",
    description:
      "Cooling and ventilation providers for temperature-sensitive storage and facilities.",
  },
];

const categories = [
  "Drainage",
  "Cooling",
  "Waterproofing",
  "Building materials",
  "Solar",
  "Insulation",
  "Pumps",
  "Construction",
];

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-[#F5F3ED] text-[#171A17]">
      <main className="min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-[#D9D7CE] bg-[#F5F3ED]/95 px-6 backdrop-blur lg:px-10">
          <span className="text-sm font-medium">Local Resources</span>

          <Link
            href="/dashboard/resources"
            className="hidden text-sm text-[#6D7069] transition hover:text-[#171A17] sm:block"
          >
            Lagos, Nigeria
          </Link>
        </header>

        <div className="mx-auto max-w-[1180px] px-6 py-10 lg:px-10 lg:py-14">
          {/* Intro */}
          <section className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#B66A45]">
              Sourcing
            </p>

            <h1 className="mt-3 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">
              Local Resources
            </h1>

            <p className="mt-4 text-base leading-7 text-[#6D7069]">
              Find materials and services relevant to your recommendations.
            </p>
          </section>

          {/* Site context */}
          <section className="mt-10 flex flex-col gap-3 border-y border-[#D9D7CE] py-5 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-xs uppercase tracking-[0.13em] text-[#92958D]">
              For
            </span>

            <button
              type="button"
              className="group inline-flex items-center gap-2 text-left text-sm font-medium text-[#23483A]"
            >
              Ikeja Warehouse
              <ChevronDown
                size={16}
                className="text-[#6D7069] transition-transform group-hover:translate-y-0.5"
              />
            </button>
          </section>

          {/* Recommended */}
          <section className="mt-14">
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#B66A45]">
              Recommended for your site
            </p>

            <div className="mt-6 grid gap-5">
              {resources.map((resource) => (
                <article
                  key={resource.category}
                  className="border border-[#D9D7CE] bg-[#FBFAF6]"
                >
                  <div className="grid lg:grid-cols-[180px_1fr]">
                    {/* Category */}
                    <div className="border-b border-[#D9D7CE] bg-[#F0EEE7] p-6 lg:border-b-0 lg:border-r lg:p-7">
                      <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#92958D]">
                        {resource.category}
                      </p>
                    </div>

                    {/* Resource */}
                    <div className="p-6 lg:p-7">
                      <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
                        <div className="max-w-2xl">
                          <h2 className="text-xl font-medium tracking-[-0.025em]">
                            {resource.title}
                          </h2>

                          <p className="mt-2 text-sm text-[#6D7069]">
                            {resource.providers}
                          </p>

                          <p className="mt-5 max-w-xl text-sm leading-6 text-[#4F554F]">
                            {resource.description}
                          </p>

                          {resource.cost && (
                            <div className="mt-6 border-t border-[#D9D7CE] pt-5">
                              <p className="text-xs uppercase tracking-[0.12em] text-[#92958D]">
                                Typical cost
                              </p>

                              <p className="mt-2 text-sm font-medium">
                                {resource.cost}
                              </p>
                            </div>
                          )}
                        </div>

                        <Link
                          href={`/dashboard/resources/${resource.category.toLowerCase()}`}
                          className="group inline-flex shrink-0 items-center gap-2 text-sm font-medium text-[#23483A]"
                        >
                          View providers
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

          {/* Categories */}
          <section className="mt-16 border-t border-[#D9D7CE] pt-10 pb-16">
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#B66A45]">
              Browse
            </p>

            <h2 className="mt-2 text-2xl font-medium tracking-[-0.035em]">
              Categories
            </h2>

            <div className="mt-6 flex flex-wrap gap-2">
              {categories.map((category) => (
                <Link
                  key={category}
                  href={`/dashboard/resources/${category
                    .toLowerCase()
                    .replaceAll(" ", "-")}`}
                  className="border border-[#D9D7CE] bg-[#FBFAF6] px-4 py-3 text-sm text-[#4F554F] transition hover:border-[#23483A] hover:text-[#23483A]"
                >
                  {category}
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}