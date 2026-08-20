const insights = [
  {
    category: "Heat",
    signal: "Elevated",
    title: "Heat is building through the afternoon",
    summary:
      "Temperatures are running well above the seasonal average and are expected to peak between 1 PM and 4 PM.",
    meaning:
      "Outdoor activity will be more demanding than usual today. Cooling demand in your home will rise, and heat may linger into the evening.",
    action: "Shift outdoor activity to early morning or after 6 PM.",
    impact: "High",
    accent: "high",
  },
  {
    category: "Rain",
    signal: "Watch",
    title: "Rain is likely later today",
    summary:
      "There is a 62% chance of rain this evening, with heavier bursts possible in flood-prone areas.",
    meaning:
      "Local drainage and low-lying areas may become stressed. If you manage a property, this is worth planning around.",
    action: "Clear nearby drainage paths before rainfall increases.",
    impact: "Medium",
    accent: "watch",
  },
  {
    category: "Air",
    signal: "Moderate",
    title: "Air quality is acceptable but could shift",
    summary:
      "Current air conditions are fair, but they can change quickly with wind and traffic patterns.",
    meaning:
      "No immediate concern, but sensitive groups may want to monitor conditions through the day.",
    action: "Keep windows closed during peak traffic hours if sensitive.",
    impact: "Low",
    accent: "normal",
  },
];

function accentClasses(accent: string) {
  if (accent === "high") {
    return "border-[#E8B7B2] bg-[#FDF3F2] text-[#A9443D]";
  }

  if (accent === "watch") {
    return "border-[#E3C7B7] bg-[#F8F0EB] text-[#9A5B3B]";
  }

  return "border-[#D7D8D1] bg-[#F3F5F0] text-[#39745A]";
}

export default function InsightsPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10 lg:py-12">
      <header>
        <p className="text-sm uppercase tracking-[0.15em] text-[#B66A45]">
          Environmental intelligence
        </p>

        <div className="mt-3 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-4xl font-medium tracking-[-0.045em] text-[#171A17] sm:text-5xl">
              What's changing around you.
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#6D7069]">
              What is happening, what it means, and what you can do.
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

      <section className="mt-10 space-y-6">
        {insights.map((insight) => (
          <article
            key={insight.title}
            className="border border-[#D9D7CE] bg-[#FBFAF6] p-7 sm:p-8"
          >
            <div className="flex flex-wrap items-center gap-3">
              <span
                className={`border px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.08em] ${accentClasses(
                  insight.accent
                )}`}
              >
                {insight.signal}
              </span>

              <span className="text-xs uppercase tracking-[0.12em] text-[#92958D]">
                {insight.category}
              </span>

              <span className="ml-auto text-xs text-[#92958D]">
                {insight.impact} impact
              </span>
            </div>

            <h2 className="mt-5 text-2xl font-medium tracking-[-0.03em] text-[#171A17]">
              {insight.title}
            </h2>

            <p className="mt-3 max-w-3xl text-sm leading-6 text-[#6D7069]">
              {insight.summary}
            </p>

            <div className="mt-6 grid gap-6 border-t border-[#D9D7CE] pt-6 lg:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-[0.15em] text-[#B66A45]">
                  What it means
                </p>

                <p className="mt-2 text-sm leading-6 text-[#26332B]">
                  {insight.meaning}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.15em] text-[#B66A45]">
                  What you can do
                </p>

                <p className="mt-2 text-sm leading-6 text-[#26332B]">
                  {insight.action}
                </p>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="mt-12 border-t border-[#D9D7CE] pt-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-[#26332B]">
              Want to act on these insights?
            </p>

            <p className="mt-1 text-xs text-[#7B8079]">
              See practical actions tailored to your environment.
            </p>
          </div>

          <a
            href="/dashboard/actions"
            className="text-sm font-medium text-[#23483A] hover:text-[#B66A45]"
          >
            View actions →
          </a>
        </div>
      </section>
    </div>
  );
}