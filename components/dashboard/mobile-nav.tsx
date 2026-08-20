"use client";

import { useState } from "react";
import Link from "next/link";
import { TerrIQLogo } from "@/components/brands/terriq-logo";

const navigation = [
  { label: "Overview", href: "/dashboard" },
  // Insights removed from mobile-nav
  { label: "Alerts", href: "/dashboard/alerts" },
  { label: "Actions", href: "/dashboard/actions" },
  { label: "Places", href: "/dashboard/places" },
];

const secondaryNavigation = [
  { label: "Saved", href: "/dashboard/saved" },
  { label: "Settings", href: "/dashboard/settings" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="flex h-16 items-center justify-between border-b border-[#D9D7CE] bg-[#F5F3ED] px-5 lg:hidden">
        <TerrIQLogo />

        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open navigation"
          className="flex h-10 w-10 items-center justify-center text-[#23483A]"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            className="h-5 w-5"
            aria-hidden="true"
          >
            <path d="M4 7h16" />
            <path d="M4 12h16" />
            <path d="M4 17h16" />
          </svg>
        </button>
      </header>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close navigation"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-[#171A17]/20"
          />

          <aside className="relative h-full w-[280px] bg-[#F5F3ED] px-6 py-7 shadow-xl">
            <div className="flex items-center justify-between">
              <TerrIQLogo />

              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close navigation"
                className="text-[#23483A]"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <path d="m6 6 12 12" />
                  <path d="m18 6-12 12" />
                </svg>
              </button>
            </div>

            <nav className="mt-10 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-3 text-sm text-[#6D7069] transition hover:bg-[#E7E9E2] hover:text-[#23483A]"
                >
                  {item.label}
                </Link>
              ))}

              <div className="my-4 border-t border-[#D9D7CE]" />

              {secondaryNavigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-3 text-sm text-[#6D7069] transition hover:bg-[#E7E9E2] hover:text-[#23483A]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="absolute bottom-7 left-6 right-6 border-t border-[#D9D7CE] pt-5">
              <p className="text-sm font-medium text-[#26332B]">
                Your environment
              </p>

              <p className="mt-1 text-xs text-[#7B8079]">
                Lagos, Nigeria
              </p>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}