import Link from "next/link";

const savedItems = [
  {
    type: "Action",
    title: "Improve drainage around your property",
    description:
      "Heavy rainfall can increase runoff and expose poorly drained areas to flooding.",
    meta: "High impact · Medium effort",
    href: "/dashboard/actions",
  },
  {
    type: "Action",
    title: "Choose lighter materials for hot weather",
    description:
      "Breathable, lightweight materials may be more comfortable under current heat and humidity conditions.",
    meta: "Low cost · Immediate",
    href: "/dashboard/actions",
  },
  {
    type: "Alert",
    title: "Heavy rainfall expected",
    description:
      "Rainfall may increase localized flood exposure in vulnerable areas.",
    meta: "Watch · Today",
    href: "/dashboard/alerts",
  },
];

export default function SavedPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 lg:px-10 lg:py-12">
      <header>
        <p className="text-sm uppercase tracking-[0.15em] text-[#B66A45]">
          Saved
        </p>

        <h1 className="mt-3 text-4xl font-medium tracking-[-0.045em] text-[#171A17] sm:text-5xl">
          Things worth coming back to.
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-[#6D7069]">
          Keep useful recommendations, alerts, and decisions close at hand.
        </p>
      </header>

      <section className="mt-10">
        <div className="divide-y divide-[#D9D7CE] border-y border-[#D9D7CE]">
          {savedItems.map((item, index) => (
            <article
              key={item.title}
              className="grid gap-5 py-7 sm:grid-cols-[60px_1fr_auto]"
            >
              <span className="text-xs uppercase tracking-[0.12em] text-[#B66A45]">
                0{index + 1}
              </span>

              <div>
                <p className="text-xs uppercase tracking-[0.12em] text-[#7B8079]">
                  {item.type}
                </p>

                <h2 className="mt-2 text-lg font-medium text-[#171A17]">
                  {item.title}
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-[#6D7069]">
                  {item.description}
                </p>

                <p className="mt-3 text-xs font-medium uppercase tracking-[0.08em] text-[#7B8079]">
                  {item.meta}
                </p>
              </div>

              <Link
                href={item.href}
                className="self-start text-sm font-medium text-[#23483A] transition hover:text-[#B66A45]"
              >
                View →
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-10 border border-[#D9D7CE] bg-[#FBFAF6] p-6">
        <p className="text-sm font-medium text-[#26332B]">
          Saved items are connected to your TerrIQ decisions.
        </p>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#6D7069]">
          As you explore places, alerts, and recommendations, you can keep
          the things that are useful for later.
        </p>
      </section>
    </div>
  );
}