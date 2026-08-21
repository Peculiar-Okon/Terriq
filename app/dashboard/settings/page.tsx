"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ChevronRight,
} from "@/components/icons/terr-iq-icons";

export default function SettingsPage() {
  const [environmentalAlerts, setEnvironmentalAlerts] = useState(true);
  const [highPriority, setHighPriority] = useState(true);
  const [weeklySummary, setWeeklySummary] = useState(true);

  return (
    <div className="min-h-screen bg-[#F5F3ED] text-[#171A17]">
      <main className="min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-[#D9D7CE] bg-[#F5F3ED]/95 px-6 backdrop-blur lg:px-10">
          <span className="text-sm font-medium">Settings</span>
        </header>

        <div className="w-full px-6 py-10 lg:px-10 lg:py-14">
          {/* Intro */}
          <section>
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#B66A45]">
              Configuration
            </p>

            <h1 className="mt-3 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
              Settings
            </h1>

            <p className="mt-3 max-w-xl text-base leading-7 text-[#6D7069]">
              Manage your workspace, notifications, and account preferences.
            </p>
          </section>

          {/* Workspace */}
          <section className="mt-12 max-w-4xl">
            <div className="border-b border-[#D9D7CE] pb-4">
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#92958D]">
                Workspace
              </p>
            </div>

            <div className="divide-y divide-[#D9D7CE] border-b border-[#D9D7CE]">
              <div className="flex items-center justify-between gap-8 py-6">
                <div>
                  <p className="text-sm font-medium">Workspace name</p>
                  <p className="mt-1 text-sm text-[#6D7069]">
                    The name used across your TerrIQ workspace.
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-sm font-medium">Pearl Logistics</p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-8 py-6">
                <div>
                  <p className="text-sm font-medium">Industry</p>
                  <p className="mt-1 text-sm text-[#6D7069]">
                    Helps TerrIQ contextualize your recommendations.
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-sm font-medium">Logistics</p>
                </div>
              </div>
            </div>
          </section>

          {/* Notifications */}
          <section className="mt-12 max-w-4xl">
            <div className="border-b border-[#D9D7CE] pb-4">
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#92958D]">
                Notifications
              </p>
            </div>

            <div className="divide-y divide-[#D9D7CE] border-b border-[#D9D7CE]">
              <SettingToggle
                title="Environmental alerts"
                description="Receive alerts when environmental conditions may affect your sites or operations."
                enabled={environmentalAlerts}
                onChange={setEnvironmentalAlerts}
              />

              <SettingToggle
                title="High-priority recommendations"
                description="Get notified when TerrIQ identifies an action that requires attention."
                enabled={highPriority}
                onChange={setHighPriority}
              />

              <SettingToggle
                title="Weekly operational summary"
                description="Receive a weekly summary of environmental conditions, risks, and recommended actions."
                enabled={weeklySummary}
                onChange={setWeeklySummary}
              />
            </div>
          </section>

          {/* Account */}
          <section className="mt-12 max-w-4xl pb-16">
            <div className="border-b border-[#D9D7CE] pb-4">
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#92958D]">
                Account
              </p>
            </div>

            <div className="divide-y divide-[#D9D7CE] border-b border-[#D9D7CE]">
              <SettingsLink
                title="Profile"
                description="Manage your personal information."
              />

              <SettingsLink
                title="Security"
                description="Manage your password and account security."
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

function SettingToggle({
  title,
  description,
  enabled,
  onChange,
}: {
  title: string;
  description: string;
  enabled: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-8 py-6">
      <div className="max-w-2xl">
        <p className="text-sm font-medium">{title}</p>

        <p className="mt-1 text-sm leading-6 text-[#6D7069]">
          {description}
        </p>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        onClick={() => onChange(!enabled)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
          enabled ? "bg-[#23483A]" : "bg-[#C8C6BC]"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
            enabled ? "left-6" : "left-1"
          }`}
        />
      </button>
    </div>
  );
}

function SettingsLink({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <Link
      href="#"
      className="group flex items-center justify-between gap-6 py-6 transition hover:bg-[#FBFAF6]"
    >
      <div>
        <p className="text-sm font-medium">{title}</p>

        <p className="mt-1 text-sm text-[#6D7069]">
          {description}
        </p>
      </div>

      <ChevronRight
        size={17}
        className="shrink-0 text-[#92958D] transition-transform group-hover:translate-x-1"
      />
    </Link>
  );
}