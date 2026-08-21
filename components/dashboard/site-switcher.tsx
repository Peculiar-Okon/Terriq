"use client";

import { useState } from "react";
import { ChevronDown } from "@/components/icons/terr-iq-icons";
import { sites } from "@/lib/data/overview";

type SiteSwitcherProps = {
  selectedSite: string;
  onChange: (siteId: string) => void;
};

export function SiteSwitcher({
  selectedSite,
  onChange,
}: SiteSwitcherProps) {
  const [open, setOpen] = useState(false);

  const site = sites.find((item) => item.id === selectedSite) ?? sites[0];

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex items-center gap-2 text-sm font-medium text-[#23483A]"
      >
        {site.name}
        <ChevronDown
          size={15}
          className={`transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-8 z-50 w-64 border border-[#D9D7CE] bg-[#FBFAF6] py-1 shadow-[0_12px_30px_rgba(23,26,23,0.08)]">
          {sites.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                onChange(item.id);
                setOpen(false);
              }}
              className={`block w-full px-4 py-3 text-left transition hover:bg-[#F5F3ED] ${
                item.id === selectedSite
                  ? "bg-[#F5F3ED]"
                  : ""
              }`}
            >
              <p className="text-sm font-medium text-[#171A17]">
                {item.name}
              </p>

              <p className="mt-1 text-xs text-[#6D7069]">
                {item.location} · {item.type}
              </p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}