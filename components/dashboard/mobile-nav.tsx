"use client";

import { useState } from "react";
import Link from "next/link";

const navigation = [
  { label: "Overview", href: "/dashboard" },
  { label: "Sites", href: "/dashboard/sites" },
  { label: "Operations", href: "/dashboard/operations" },
  { label: "Assess", href: "/dashboard/assess" },
  { label: "Plans", href: "/dashboard/plans" },
  { label: "Alerts", href: "/dashboard/alerts" },
  { label: "Local Resources", href: "/dashboard/resources" },
];

const workspaceNavigation = [
  { label: "Settings", href: "/dashboard/settings" },
  { label: "Help", href: "/dashboard/help" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="flex h-16 items-center justify-between border-b border-[#D9D7CE] bg-[#F5F3ED] px-5 lg:hidden">
        <Link href="/dashboard">
          <span className="text-[18px] font-semibold tracking-[-0.03em] text-[#171A17]">
            Terr<span className="text-[#B66A45]">IQ</span>
          </span>
        </Link>

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

          <aside className="relative h-full w-[280px] bg-[#F5F3ED] px-5 py-6 shadow-xl">
            <div className="flex items-center justify-between">
              <Link href="/dashboard" onClick={() => setOpen(false)}>
                <span className="text-[18px] font-semibold tracking-[-0.03em] text-[#171A17]">
                  Terr<span className="text-[#B66A45]">IQ</span>
                </span>
              </Link>

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

            <p className="mt-2 text-[10px] uppercase tracking-[0.15em] text-[#92958D]">
              Environmental Intelligence
            </p>

            <nav className="mt-6 flex-1 overflow-y-auto">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2.5 text-[13px] text-[#6D7069] transition hover:bg-[#E7E9E2] hover:text-[#23483A]"
                >
                  {item.label}
                </Link>
              ))}

              <div className="my-4 border-t border-[#D9D7CE]" />

              {workspaceNavigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2.5 text-[13px] text-[#6D7069] transition hover:bg-[#E7E9E2] hover:text-[#23483A]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="absolute bottom-6 left-5 right-5 border-t border-[#D9D7CE] pt-4">
              <p className="text-[13px] font-medium text-[#26332B]">Pearl</p>
              <p className="mt-0.5 text-[11px] text-[#7B8079]">
                Personal workspace
              </p>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}