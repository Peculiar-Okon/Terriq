"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { TerrIQLogo } from "@/components/brands/terriq-logo";

const navigation = [
  {
    label: "Overview",
    href: "/dashboard",
  },
  // Insights removed from dashboard
  {
    label: "Alerts",
    href: "/dashboard/alerts",
  },
  {
    label: "Actions",
    href: "/dashboard/actions",
  },
  {
    label: "Places",
    href: "/dashboard/places",
  },
];

const secondaryNavigation = [
  {
    label: "Saved",
    href: "/dashboard/saved",
  },
];

const tertiaryNavigation = [
  {
    label: "Settings",
    href: "/dashboard/settings",
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden h-screen w-[240px] shrink-0 border-r border-[#D9D7CE] bg-[#F5F3ED] lg:flex lg:flex-col">
      <div className="px-7 py-7">
        <TerrIQLogo />
      </div>

      <nav className="flex-1 px-4">
        <div className="space-y-1">
          {navigation.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== "/dashboard" &&
                pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-3 py-2.5 text-sm transition ${
                  active
                    ? "bg-[#E7E9E2] font-medium text-[#23483A]"
                    : "text-[#6D7069] hover:bg-[#ECEBE5] hover:text-[#171A17]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="my-6 border-t border-[#D9D7CE]" />

        <div className="space-y-1">
          {secondaryNavigation.map((item) => {
            const active = pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-3 py-2.5 text-sm transition ${
                  active
                    ? "bg-[#E7E9E2] font-medium text-[#23483A]"
                    : "text-[#6D7069] hover:bg-[#ECEBE5] hover:text-[#171A17]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="my-6 border-t border-[#D9D7CE]" />

        <div className="space-y-1">
          {tertiaryNavigation.map((item) => {
            const active = pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-3 py-2.5 text-sm transition ${
                  active
                    ? "bg-[#E7E9E2] font-medium text-[#23483A]"
                    : "text-[#6D7069] hover:bg-[#ECEBE5] hover:text-[#171A17]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="border-t border-[#D9D7CE] px-7 py-6">
        <p className="text-sm font-medium text-[#26332B]">
          Your environment
        </p>

        <p className="mt-1 text-xs text-[#7B8079]">
          Lagos, Nigeria
        </p>
      </div>
    </aside>
  );
}