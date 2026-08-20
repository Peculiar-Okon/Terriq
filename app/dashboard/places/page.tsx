const places = [
  {
    name: "Home",
    type: "Home",
    location: "Lagos, Nigeria",
    status: "Monitoring active",
    conditions: [
      { label: "Heat", value: "High" },
      { label: "Rain", value: "Watch" },
    ],
  },
  {
    name: "Campus",
    type: "Campus",
    location: "Yaba, Lagos",
    status: "Monitoring active",
    conditions: [
      { label: "Heat", value: "Moderate" },
      { label: "Rain", value: "Low" },
    ],
  },
];

const placeTypes = [
  {
    label: "Home",
    description: "Understand conditions where you live.",
    icon: "⌂",
  },
  {
    label: "Work",
    description: "Monitor conditions around your workplace.",
    icon: "▣",
  },
  {
    label: "Campus",
    description: "Keep track of conditions around school.",
    icon: "◇",
  },
  {
    label: "Farm",
    description: "Understand conditions affecting crops and land.",
    icon: "✦",
  },
  {
    label: "Other",
    description: "Add any location that matters to you.",
    icon: "＋",
  },
];

export default function PlacesPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10 lg:py-12">
      {/* Header */}
      <header>
        <p className="text-sm uppercase tracking-[0.15em] text-[#B66A45]">
          Your locations
        </p>

        <h1 className="mt-3 text-4xl font-medium tracking-[-0.045em] text-[#171A17] sm:text-5xl">
          Places that matter to you.
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-[#6D7069]">
          Add the places you live, work, study, grow, or spend time. TerrIQ
          uses each location to understand its environmental context.
        </p>
      </header>

      {/* Places */}
      <section className="mt-10">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-sm uppercase tracking-[0.15em] text-[#B66A45]">
              Your places
            </p>

            <h2 className="mt-2 text-2xl font-medium tracking-[-0.03em] text-[#171A17]">
              Environmental context, by location.
            </h2>
          </div>

          <p className="hidden text-xs text-[#92958D] sm:block">
            {places.length} monitored places
          </p>
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          {places.map((place) => (
            <article
              key={place.name}
              className="border border-[#D9D7CE] bg-[#FBFAF6] p-6 transition hover:border-[#B9B7AE] sm:p-7"
            >
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-[#B66A45]">
                    {place.type}
                  </p>

                  <h3 className="mt-3 text-2xl font-medium tracking-[-0.03em] text-[#171A17]">
                    {place.name}
                  </h3>

                  <p className="mt-1 text-sm text-[#7B8079]">
                    {place.location}
                  </p>
                </div>

                <span className="flex items-center gap-2 text-xs text-[#6D7069]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#5E806B]" />
                  {place.status}
                </span>
              </div>

              <div className="mt-7 grid grid-cols-2 border-y border-[#D9D7CE]">
                {place.conditions.map((condition, index) => (
                  <div
                    key={condition.label}
                    className={`py-4 ${
                      index === 0
                        ? "border-r border-[#D9D7CE] pr-4"
                        : "pl-4"
                    }`}
                  >
                    <p className="text-xs uppercase tracking-[0.1em] text-[#92958D]">
                      {condition.label}
                    </p>

                    <p className="mt-1 text-lg font-medium text-[#23483A]">
                      {condition.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-between">
                <p className="max-w-xs text-xs leading-5 text-[#7B8079]">
                  Conditions, risks, and recommendations are evaluated for
                  this location.
                </p>

                <button
                  type="button"
                  className="shrink-0 text-sm font-medium text-[#23483A] transition hover:text-[#B66A45]"
                >
                  View place →
                </button>
              </div>
            </article>
          ))}

          {/* Add place */}
          <button
            type="button"
            className="group flex min-h-[260px] flex-col items-center justify-center border border-dashed border-[#C8C7BE] bg-[#F8F7F2] px-6 text-center transition hover:border-[#23483A] hover:bg-[#FBFAF6]"
          >
            <span className="flex h-12 w-12 items-center justify-center border border-[#D9D7CE] text-2xl font-light text-[#23483A] transition group-hover:border-[#23483A]">
              +
            </span>

            <h3 className="mt-5 text-lg font-medium text-[#26332B]">
              Add another place
            </h3>

            <p className="mt-2 max-w-xs text-sm leading-6 text-[#7B8079]">
              Add a workplace, farm, campus, business, or any location that
              matters to you.
            </p>
          </button>
        </div>
      </section>

      {/* Context */}
      <section className="mt-12 border-t border-[#D9D7CE] pt-10">
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.15em] text-[#B66A45]">
              More than a location
            </p>

            <h2 className="mt-3 text-3xl font-medium tracking-[-0.04em] text-[#171A17]">
              Every place has different environmental needs.
            </h2>
          </div>

          <div className="grid gap-px border border-[#D9D7CE] bg-[#D9D7CE] sm:grid-cols-2">
            {placeTypes.map((type) => (
              <div
                key={type.label}
                className="bg-[#FBFAF6] p-6"
              >
                <span className="text-xl text-[#B66A45]">{type.icon}</span>

                <h3 className="mt-4 text-lg font-medium text-[#26332B]">
                  {type.label}
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#6D7069]">
                  {type.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Future context */}
      <section className="mt-12 bg-[#23483A] p-7 text-[#F5F3ED] sm:p-9">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-[#A9B9AF]">
              TerrIQ context
            </p>

            <h2 className="mt-3 max-w-2xl text-2xl font-medium tracking-[-0.03em] sm:text-3xl">
              The same environmental change can mean different things in
              different places.
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#C7D1CB]">
              Heat that affects outdoor work may mean something different for
              a farm, a classroom, a construction site, or a home. TerrIQ
              keeps the location and its context in the picture.
            </p>
          </div>

          <p className="text-sm text-[#D7DED9]">
            Environment → Context → Decision
          </p>
        </div>
      </section>
    </div>
  );
}