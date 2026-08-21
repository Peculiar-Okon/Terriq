"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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
  { label: "Workspace", href: "/dashboard/workspace" },
  { label: "Settings", href: "/dashboard/settings" },
  { label: "Help", href: "/dashboard/help" },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || (href !== "/dashboard" && pathname.startsWith(href));

  return (
    <aside className="hidden h-screen w-[240px] shrink-0 border-r border-[#D9D7CE] bg-[#F5F3ED] lg:flex lg:flex-col">
      <div className="px-7 py-6">
        <Link href="/dashboard" className="block">
          <span className="text-[18px] font-semibold tracking-[-0.03em] text-[#171A17]">
            Terr<span className="text-[#B66A45]">IQ</span>
          </span>
        </Link>
        <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-[#92958D]">
          Environmental Intelligence
        </p>
      </div>

      <nav className="flex-1 px-3">
        <div className="space-y-0.5">
          {navigation.map((item) => {
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-3 py-2 text-[13px] transition ${
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

        <div className="my-5 border-t border-[#D9D7CE]" />

        <div className="space-y-0.5">
          {workspaceNavigation.map((item) => {
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-3 py-2 text-[13px] transition ${
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

      <div className="border-t border-[#D9D7CE] px-7 py-5">
        <p className="text-[13px] font-medium text-[#26332B]">Pearl</p>
        <p className="mt-0.5 text-[11px] text-[#7B8079]">Personal workspace</p>
      </div>
    </aside>
  );
}