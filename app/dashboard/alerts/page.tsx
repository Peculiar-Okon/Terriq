const alerts = [
  {
    severity: "HIGH",
    label: "Heat conditions rising",
    location: "Lagos, Nigeria",
    timing: "Today · 1–4 PM",
    description:
      "Temperatures are expected to remain unusually high through the afternoon and may take longer to ease in the evening.",
    affected: ["Outdoor work", "Clothing", "Energy", "Movement"],
    response:
      "Consider shifting outdoor activity earlier and choosing lighter, breathable materials for the afternoon.",
    action: "See recommended actions",
  },
  {
    severity: "WATCH",
    label: "Heavy rainfall approaching",
    location: "Lagos, Nigeria",
    timing: "Today · Evening",
    description:
      "Increased rainfall may create runoff and raise exposure in poorly drained areas around your location.",
    affected: ["Movement", "Land", "Farming", "Infrastructure"],
    response:
      "Check drainage paths and consider routes that are less exposed to flooding.",
    action: "Review drainage actions",
  },
];

const recentChanges = [
  {
    title: "Rain probability increased",
    location: "Lagos, Nigeria",
    time: "4 hours ago",
  },
  {
    title: "Temperature trend changed",
    location: "Lagos, Nigeria",
    time: "Yesterday",
  },
  {
    title: "Air conditions remain stable",
    location: "Lagos, Nigeria",
    time: "Yesterday",
  },
];

export default function AlertsPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10 lg:py-12">
      {/* Header */}
      <header>
        <p className="text-sm uppercase tracking-[0.15em] text-[#B66A45]">
          Environmental monitoring
        </p>

        <h1 className="mt-3 text-4xl font-medium tracking-[-0.045em] text-[#171A17] sm:text-5xl">
          Changes worth noticing.
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-[#6D7069]">
          TerrIQ watches for meaningful environmental changes around your
          locations and highlights what they could affect.
        </p>
      </header>

      {/* Important changes */}
      <section className="mt-10">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-sm uppercase tracking-[0.15em] text-[#B66A45]">
              Important changes
            </p>

            <h2 className="mt-2 text-2xl font-medium tracking-[-0.03em] text-[#171A17]">
              Something changed.
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-6 text-[#6D7069]">
              Here&apos;s what it could affect and what may be worth doing
              next.
            </p>
          </div>

          <span className="hidden text-xs text-[#92958D] sm:block">
            2 active alerts
          </span>
        </div>

        <div className="mt-6 space-y-4">
          {alerts.map((alert) => (
            <article
              key={alert.label}
              className="border border-[#D9D7CE] bg-[#FBFAF6] p-6 sm:p-8"
            >
              <div className="flex flex-col gap-6 lg:flex-row lg:justify-between">
                <div className="max-w-3xl">
                  <div className="flex flex-wrap items-center gap-3">
                    <span
                      className={`border px-3 py-1.5 text-[11px] font-medium tracking-[0.12em] ${
                        alert.severity === "HIGH"
                          ? "border-[#B66A45]/40 text-[#A65D3B]"
                          : "border-[#B8A66A]/40 text-[#806F38]"
                      }`}
                    >
                      {alert.severity}
                    </span>

                    <span className="text-xs text-[#92958D]">
                      {alert.timing}
                    </span>
                  </div>

                  <h3 className="mt-5 text-2xl font-medium tracking-[-0.03em] text-[#171A17]">
                    {alert.label}
                  </h3>

                  <p className="mt-2 text-xs text-[#7B8079]">
                    {alert.location}
                  </p>

                  <p className="mt-5 max-w-2xl text-sm leading-7 text-[#6D7069]">
                    {alert.description}
                  </p>
                </div>

                <div className="w-full border-t border-[#D9D7CE] pt-5 lg:w-[310px] lg:border-l lg:border-t-0 lg:pl-7 lg:pt-0">
                  <p className="text-xs uppercase tracking-[0.14em] text-[#B66A45]">
                    Could affect
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {alert.affected.map((item) => (
                      <span
                        key={item}
                        className="border border-[#D9D7CE] bg-[#F5F3ED] px-3 py-2 text-xs text-[#536057]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-7 grid gap-6 border-t border-[#D9D7CE] pt-6 lg:grid-cols-[1fr_auto] lg:items-end">
                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-[#B66A45]">
                    What may help
                  </p>

                  <p className="mt-2 max-w-2xl text-sm leading-6 text-[#536057]">
                    {alert.response}
                  </p>
                </div>

                <a
                  href="/dashboard/actions"
                  className="inline-flex items-center text-sm font-medium text-[#23483A] transition hover:text-[#B66A45]"
                >
                  {alert.action} →
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Recent changes */}
      <section className="mt-12">
        <div>
          <p className="text-sm uppercase tracking-[0.15em] text-[#B66A45]">
            Environmental activity
          </p>

          <h2 className="mt-2 text-2xl font-medium tracking-[-0.03em] text-[#171A17]">
            Recent changes.
          </h2>

          <p className="mt-2 max-w-xl text-sm leading-6 text-[#6D7069]">
            Not every change needs an alert. TerrIQ keeps track of meaningful
            shifts so you can understand how your surroundings are evolving.
          </p>
        </div>

        <div className="mt-6 divide-y divide-[#D9D7CE] border-y border-[#D9D7CE]">
          {recentChanges.map((change) => (
            <article
              key={change.title}
              className="grid gap-2 py-5 sm:grid-cols-[1fr_auto] sm:items-center"
            >
              <div>
                <h3 className="text-sm font-medium text-[#26332B]">
                  {change.title}
                </h3>

                <p className="mt-1 text-xs text-[#7B8079]">
                  {change.location}
                </p>
              </div>

              <p className="text-xs text-[#92958D]">{change.time}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Notification prompt */}
      <section className="mt-12 border border-[#D9D7CE] bg-[#23483A] p-6 text-[#F5F3ED] sm:p-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-[#A9B9AF]">
              Stay informed
            </p>

            <h2 className="mt-3 text-2xl font-medium tracking-[-0.03em]">
              Know when something important changes.
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#C7D1CB]">
              Get notified when environmental conditions around your saved
              locations change enough to affect the things you care about.
            </p>
          </div>

          <a
            href="/dashboard/settings"
            className="inline-flex h-11 items-center justify-center border border-white/20 px-5 text-sm font-medium text-white transition hover:bg-white/10"
          >
            Notification settings →
          </a>
        </div>
      </section>
    </div>
  );
}