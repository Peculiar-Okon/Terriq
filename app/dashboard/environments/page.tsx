const environmentalConditions = [
  {
    category: "Heat",
    value: "38°C",
    status: "High",
    description:
      "Temperatures are significantly elevated around your location.",
    detail: "Peak conditions expected between 1 PM and 4 PM.",
    accent: "high",
  },
  {
    category: "Rain",
    value: "62%",
    status: "Watch",
    description:
      "Rain is likely later today and may increase localized flooding risk.",
    detail: "Heavier rainfall is possible this evening.",
    accent: "watch",
  },
  {
    category: "Air",
    value: "Fair",
    status: "Moderate",
    description:
      "Air conditions are currently acceptable but should be monitored.",
    detail: "Conditions can change throughout the day.",
    accent: "normal",
  },
  {
    category: "Water",
    value: "Stable",
    status: "Normal",
    description:
      "No significant water-related environmental concern detected.",
    detail: "Monitoring continues.",
    accent: "normal",
  },
];

const outlook = [
  {
    time: "Now",
    temperature: "38°C",
    condition: "High heat",
  },
  {
    time: "3 PM",
    temperature: "39°C",
    condition: "Peak heat",
  },
  {
    time: "6 PM",
    temperature: "35°C",
    condition: "Cooling slowly",
  },
  {
    time: "9 PM",
    temperature: "31°C",
    condition: "Warm evening",
  },
];

function statusClasses(accent: string) {
  if (accent === "high") {
    return "border-[#E8B7B2] bg-[#FDF3F2] text-[#A9443D]";
  }

  if (accent === "watch") {
    return "border-[#E3C7B7] bg-[#F8F0EB] text-[#9A5B3B]";
  }

  return "border-[#D7D8D1] bg-[#F3F5F0] text-[#39745A]";
}

export default function EnvironmentPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10 lg:py-12">
      {/* Header */}
      <header>
        <p className="text-sm uppercase tracking-[0.15em] text-[#B66A45]">
          Environmental intelligence
        </p>

        <div className="mt-3 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-4xl font-medium tracking-[-0.045em] text-[#171A17] sm:text-5xl">
              Your environment.
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#6D7069]">
              Current environmental conditions and what they could mean
              for your location.
            </p>
          </div>

          <div className="text-left sm:text-right">
            <p className="text-sm font-medium text-[#26332B]">
              Lagos, Nigeria
            </p>

            <p className="mt-1 text-xs text-[#92958D]">
              Updated recently
            </p>
          </div>
        </div>
      </header>

      {/* Main environmental signal */}
      <section className="mt-10 grid gap-5 lg:grid-cols-[1.2fr_.8fr]">
        <div className="bg-[#23483A] p-7 text-[#F5F3ED] sm:p-9">
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-[#A9B9AF]">
                Dominant condition
              </p>

              <h2 className="mt-5 text-3xl font-medium tracking-[-0.035em]">
                Elevated heat
              </h2>

              <p className="mt-2 text-6xl font-medium tracking-[-0.055em]">
                38°C
              </p>
            </div>

            <span className="border border-[#B66A45]/50 px-3 py-1.5 text-xs font-medium tracking-[0.08em] text-[#D99A78]">
              HIGH
            </span>
          </div>

          <div className="mt-10 border-t border-white/15 pt-6">
            <p className="max-w-xl text-sm leading-7 text-[#D7DED9]">
              Your location is experiencing unusually high temperatures.
              Heat is expected to remain elevated through the afternoon
              and may take longer to ease in the evening.
            </p>

            <a
              href="/dashboard/alerts"
              className="mt-6 inline-flex text-sm font-medium text-[#D99A78] transition hover:text-white"
            >
              See what this means →
            </a>
          </div>
        </div>

        {/* Environmental summary */}
        <div className="border border-[#D9D7CE] bg-[#FBFAF6] p-7">
          <p className="text-xs uppercase tracking-[0.16em] text-[#B66A45]">
            At a glance
          </p>

          <div className="mt-6 divide-y divide-[#D9D7CE]">
            {environmentalConditions.map((condition) => (
              <div
                key={condition.category}
                className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
              >
                <div>
                  <p className="text-sm font-medium text-[#26332B]">
                    {condition.category}
                  </p>

                  <p className="mt-1 text-xs text-[#7B8079]">
                    {condition.description}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-lg font-medium text-[#23483A]">
                    {condition.value}
                  </p>

                  <span
                    className={`mt-1 inline-block border px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.08em] ${statusClasses(
                      condition.accent
                    )}`}
                  >
                    {condition.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Outlook */}
      <section className="mt-12">
        <div>
          <p className="text-sm uppercase tracking-[0.15em] text-[#B66A45]">
            Today&apos;s outlook
          </p>

          <h2 className="mt-2 text-2xl font-medium tracking-[-0.03em] text-[#171A17]">
            How conditions may change.
          </h2>
        </div>

        <div className="mt-6 grid border-y border-[#D9D7CE] sm:grid-cols-2 lg:grid-cols-4">
          {outlook.map((item, index) => (
            <div
              key={item.time}
              className={`py-6 ${
                index > 0
                  ? "border-t border-[#D9D7CE] sm:border-l sm:border-t-0"
                  : ""
              }`}
            >
              <div className="px-5 lg:px-6">
                <p className="text-xs uppercase tracking-[0.1em] text-[#92958D]">
                  {item.time}
                </p>

                <p className="mt-4 text-3xl font-medium tracking-[-0.04em] text-[#23483A]">
                  {item.temperature}
                </p>

                <p className="mt-2 text-sm text-[#6D7069]">
                  {item.condition}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* What it means */}
      <section className="mt-12 grid gap-8 border-t border-[#D9D7CE] pt-10 lg:grid-cols-[0.7fr_1.3fr]">
        <div>
          <p className="text-sm uppercase tracking-[0.15em] text-[#B66A45]">
            What this means
          </p>

          <h2 className="mt-3 text-2xl font-medium tracking-[-0.03em] text-[#171A17]">
            Environmental conditions are useful when they change a
            decision.
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="border border-[#D9D7CE] bg-[#FBFAF6] p-6">
            <p className="text-sm font-medium text-[#26332B]">
              Heat exposure
            </p>

            <p className="mt-2 text-sm leading-6 text-[#6D7069]">
              Outdoor activity during peak heat may be more demanding
              than usual today.
            </p>
          </div>

          <div className="border border-[#D9D7CE] bg-[#FBFAF6] p-6">
            <p className="text-sm font-medium text-[#26332B]">
              Rainfall
            </p>

            <p className="mt-2 text-sm leading-6 text-[#6D7069]">
              Increased rainfall could make drainage and flood-prone
              areas more important to monitor.
            </p>
          </div>

          <div className="border border-[#D9D7CE] bg-[#FBFAF6] p-6">
            <p className="text-sm font-medium text-[#26332B]">
              Energy
            </p>

            <p className="mt-2 text-sm leading-6 text-[#6D7069]">
              Higher temperatures can increase cooling demand and
              influence when energy is used.
            </p>
          </div>

          <div className="border border-[#D9D7CE] bg-[#FBFAF6] p-6">
            <p className="text-sm font-medium text-[#26332B]">
              Planning
            </p>

            <p className="mt-2 text-sm leading-6 text-[#6D7069]">
              Environmental conditions can help you decide when and
              where to carry out activities.
            </p>
          </div>
        </div>
      </section>

      {/* Footer status */}
      <section className="mt-12 border-t border-[#D9D7CE] pt-7">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <p className="text-xs text-[#92958D]">
            TerrIQ monitors environmental conditions around your
            selected places.
          </p>

          <a
            href="/dashboard/alerts"
            className="text-sm font-medium text-[#23483A] hover:text-[#B66A45]"
          >
            View alerts →
          </a>
        </div>
      </section>
    </div>
  );
}