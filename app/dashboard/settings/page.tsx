"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [alerts, setAlerts] = useState(true);

  return (
    <div className="mx-auto max-w-5xl px-5 py-8 sm:px-8 lg:px-10 lg:py-12">
      <header>
        <p className="text-sm uppercase tracking-[0.15em] text-[#B66A45]">
          Settings
        </p>

        <h1 className="mt-3 text-4xl font-medium tracking-[-0.045em] text-[#171A17] sm:text-5xl">
          Make TerrIQ work for you.
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-[#6D7069]">
          Manage your profile, locations, and the environmental changes you
          want TerrIQ to keep an eye on.
        </p>
      </header>

      <div className="mt-10 space-y-8">
        {/* Profile */}
        <section className="border-t border-[#D9D7CE] pt-7">
          <div className="mb-5">
            <h2 className="text-lg font-medium text-[#171A17]">
              Profile
            </h2>

            <p className="mt-1 text-sm text-[#6D7069]">
              Basic information associated with your TerrIQ account.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-[#26332B]"
              >
                Name
              </label>

              <input
                id="name"
                type="text"
                defaultValue="Pearl"
                className="h-12 w-full rounded-xl border border-[#D9D7CE] bg-white px-4 text-sm text-[#171A17] outline-none transition focus:border-[#23483A] focus:ring-2 focus:ring-[#23483A]/10"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-[#26332B]"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                defaultValue="pearl@example.com"
                disabled
                className="h-12 w-full rounded-xl border border-[#D9D7CE] bg-[#F0EFE9] px-4 text-sm text-[#7B8079] outline-none"
              />
            </div>
          </div>
        </section>

        {/* Location */}
        <section className="border-t border-[#D9D7CE] pt-7">
          <div className="mb-5">
            <h2 className="text-lg font-medium text-[#171A17]">
              Default location
            </h2>

            <p className="mt-1 text-sm text-[#6D7069]">
              This is the location TerrIQ uses when showing your primary
              environmental context.
            </p>
          </div>

          <div className="border border-[#D9D7CE] bg-[#FBFAF6] p-5">
            <p className="text-sm font-medium text-[#26332B]">
              Lagos, Nigeria
            </p>

            <p className="mt-1 text-xs text-[#7B8079]">
              Primary location
            </p>

            <button
              type="button"
              className="mt-4 text-sm font-medium text-[#23483A] transition hover:text-[#B66A45]"
            >
              Change location →
            </button>
          </div>
        </section>

        {/* Notifications */}
        <section className="border-t border-[#D9D7CE] pt-7">
          <div className="mb-5">
            <h2 className="text-lg font-medium text-[#171A17]">
              Notifications
            </h2>

            <p className="mt-1 text-sm text-[#6D7069]">
              Control when TerrIQ should bring important changes to your
              attention.
            </p>
          </div>

          <div className="divide-y divide-[#D9D7CE] border-y border-[#D9D7CE]">
            <SettingToggle
              title="TerrIQ updates"
              description="Receive useful updates about your saved places and recommendations."
              enabled={notifications}
              onChange={setNotifications}
            />

            <SettingToggle
              title="Environmental alerts"
              description="Be notified when significant environmental conditions change around your monitored places."
              enabled={alerts}
              onChange={setAlerts}
            />
          </div>
        </section>

        {/* Account */}
        <section className="border-t border-[#D9D7CE] pt-7">
          <div>
            <h2 className="text-lg font-medium text-[#171A17]">
              Account
            </h2>

            <p className="mt-1 text-sm text-[#6D7069]">
              Manage your TerrIQ account.
            </p>
          </div>

          <button
            type="button"
            className="mt-5 border border-[#D9D7CE] bg-[#FBFAF6] px-5 py-3 text-sm font-medium text-[#23483A] transition hover:border-[#B9B7AE]"
          >
            Sign out
          </button>
        </section>
      </div>
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
    <div className="flex items-center justify-between gap-6 py-5">
      <div>
        <p className="text-sm font-medium text-[#26332B]">{title}</p>

        <p className="mt-1 max-w-xl text-sm leading-6 text-[#6D7069]">
          {description}
        </p>
      </div>

      <button
        type="button"
        aria-pressed={enabled}
        onClick={() => onChange(!enabled)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
          enabled ? "bg-[#23483A]" : "bg-[#C9CBC4]"
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