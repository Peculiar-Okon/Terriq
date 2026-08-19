import {
  Bolt,
  Leaf,
  Location,
  Sun,
  Water,
} from "@/components/icons/terr-iq-icons";
import { TerrIQLogo } from "@/components/brands/terriq-logo";

const metrics = [
  {
    label: "Heat exposure",
    value: "High",
    detail: "Needs attention",
    icon: Sun,
  },
  {
    label: "Energy",
    value: "High",
    detail: "Potential to improve",
    icon: Bolt,
  },
  {
    label: "Water",
    value: "Moderate",
    detail: "Room for improvement",
    icon: Water,
  },
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#F5F3ED]">
      <aside className="fixed hidden h-screen w-64 border-r border-[#D9D7CE] bg-[#FBFAF6] p-6 lg:block">
        <TerrIQLogo />

        <nav className="mt-14 space-y-1">
          {["Overview", "Assessment", "Plans", "Sources"].map(
            (item, index) => (
              <a
                key={item}
                href="#"
                className={`block px-3 py-2.5 text-sm ${
                  index === 0
                    ? "bg-[#23483A] text-white"
                    : "text-[#6D7069] hover:bg-[#EBE9E1] hover:text-[#171A17]"
                }`}
              >
                {item}
              </a>
            )
          )}
        </nav>

        <div className="absolute bottom-6 left-6 right-6 border-t border-[#D9D7CE] pt-5">
          <p className="text-xs text-[#92958D]">Your location</p>

          <div className="mt-2 flex items-center gap-2 text-sm">
            <Location size={16} className="text-[#B66A45]" />
            Lagos, Nigeria
          </div>
        </div>
      </aside>

      <section className="lg:ml-64">
        <header className="flex items-center justify-between border-b border-[#D9D7CE] bg-[#FBFAF6] px-6 py-5 lg:px-10">
          <div>
            <p className="text-sm text-[#92958D]">Wednesday, August 19</p>
            <h1 className="mt-1 text-xl font-semibold tracking-tight">
              Your environment
            </h1>
          </div>

          <div className="flex h-9 w-9 items-center justify-center bg-[#23483A] text-sm font-medium text-white">
            P
          </div>
        </header>

        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-10 lg:py-10">
          <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
            <section className="bg-[#23483A] p-7 text-[#F5F3ED] lg:p-9">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.15em] text-[#A9B9AF]">
                    Environmental profile
                  </p>

                  <h2 className="mt-3 text-3xl font-semibold tracking-[-0.035em]">
                    Your home has room to become more resilient.
                  </h2>
                </div>

                <Leaf
                  size={36}
                  strokeWidth={1.3}
                  className="hidden text-[#B66A45] sm:block"
                />
              </div>

              <p className="mt-4 max-w-xl text-sm leading-6 text-[#C3CEC7]">
                Based on your location and current profile, heat exposure is
                the biggest opportunity to address first.
              </p>

              <button className="mt-7 bg-[#F5F3ED] px-5 py-3 text-sm font-medium text-[#23483A] transition hover:bg-white">
                Start assessment
              </button>
            </section>

            <section className="border border-[#D9D7CE] bg-[#FBFAF6] p-7">
              <p className="text-xs uppercase tracking-[0.15em] text-[#92958D]">
                Location
              </p>

              <div className="mt-4 flex items-center gap-3">
                <Location size={20} className="text-[#B66A45]" />

                <div>
                  <p className="font-medium">Lagos, Nigeria</p>
                  <p className="text-sm text-[#92958D]">
                    Your current environment
                  </p>
                </div>
              </div>

              <div className="mt-7 border-t border-[#D9D7CE] pt-5">
                <p className="text-xs text-[#92958D]">
                  Profile completeness
                </p>

                <div className="mt-3 h-1 bg-[#EBE9E1]">
                  <div className="h-full w-[65%] bg-[#B66A45]" />
                </div>

                <p className="mt-2 text-xs text-[#6D7069]">
                  65% complete
                </p>
              </div>
            </section>
          </div>

          <section className="mt-10">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.15em] text-[#92958D]">
                  Current conditions
                </p>

                <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em]">
                  What needs attention
                </h2>
              </div>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {metrics.map((metric) => {
                const Icon = metric.icon;

                return (
                  <div
                    key={metric.label}
                    className="border border-[#D9D7CE] bg-[#FBFAF6] p-6"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[#6D7069]">
                        {metric.label}
                      </span>

                      <Icon
                        size={20}
                        strokeWidth={1.5}
                        className="text-[#B66A45]"
                      />
                    </div>

                    <p className="mt-7 text-2xl font-semibold">
                      {metric.value}
                    </p>

                    <p className="mt-1 text-sm text-[#92958D]">
                      {metric.detail}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="mt-10 border-t border-[#D9D7CE] pt-8">
            <div className="flex items-center gap-3">
              <div className="h-8 w-1 bg-[#B66A45]" />

              <div>
                <p className="text-xs uppercase tracking-[0.15em] text-[#92958D]">
                  Recommended next step
                </p>

                <h2 className="mt-1 text-xl font-semibold">
                  Assess your home's heat exposure
                </h2>
              </div>
            </div>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-[#6D7069]">
              A short assessment will help TerrIQ understand what is driving
              the heat in your home and identify practical solutions.
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}