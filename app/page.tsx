
import Link from "next/link";
import {
  ArrowRight,
  Location,
} from "@/components/icons/terr-iq-icons";
import { TerrIQLogo } from "@/components/brands/terriq-logo";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F5F3ED]">
      {/* Navigation */}
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        <TerrIQLogo />

        <div className="hidden items-center gap-8 text-sm text-[#6D7069] md:flex">
          <a
            href="#how-it-works"
            className="transition hover:text-[#171A17]"
          >
            How it works
          </a>

          <a
            href="#use-cases"
            className="transition hover:text-[#171A17]"
          >
            Use cases
          </a>
        </div>

        <Link
          href="/login"
          className="text-sm font-medium text-[#23483A] transition hover:text-[#B66A45]"
        >
          Sign in
        </Link>
      </nav>

      {/* Hero */}
      <section className="mx-auto grid max-w-7xl gap-14 px-6 pb-24 pt-16 lg:grid-cols-[1.02fr_.98fr] lg:px-10 lg:pt-24">
        <div className="flex flex-col justify-center">
          <div className="mb-6 flex items-center gap-2 text-sm font-medium text-[#B66A45]">
            <span className="h-px w-8 bg-[#B66A45]" />
            Environmental intelligence for sites & businesses
          </div>

          <h1 className="max-w-4xl text-5xl font-semibold leading-[0.97] tracking-[-0.06em] text-[#171A17] sm:text-6xl lg:text-7xl">
            Know how the environment could affect your next decision.
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-8 text-[#6D7069]">
            TerrIQ helps businesses assess locations and operations against
            environmental conditions before they become costly problems.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="/signup"
              className="group inline-flex items-center gap-3 bg-[#23483A] px-5 py-3.5 text-sm font-medium text-white transition hover:bg-[#18362B]"
            >
              Explore TerrIQ
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>

            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 border border-[#D9D7CE] bg-[#FBFAF6] px-5 py-3.5 text-sm font-medium text-[#23483A] transition hover:border-[#B9B7AE]"
            >
              See how it works
            </a>
          </div>
        </div>

        {/* Decision Snapshot */}
        <div className="relative min-h-[500px] overflow-hidden bg-[#23483A] p-7 text-[#F5F3ED] sm:p-9">
          <div className="absolute inset-0 opacity-[0.08]">
            <svg
              viewBox="0 0 600 600"
              className="h-full w-full"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M-80 430C80 330 120 500 270 390C410 287 440 400 680 230"
                stroke="currentColor"
                strokeWidth="1"
              />
              <path
                d="M-100 500C60 390 150 560 300 450C450 340 500 440 700 290"
                stroke="currentColor"
                strokeWidth="1"
              />
              <path
                d="M80 0C130 150 240 140 220 300C200 450 360 480 500 620"
                stroke="currentColor"
                strokeWidth="1"
              />
              <path
                d="M260 -30C300 110 420 140 390 270C360 410 500 480 590 560"
                stroke="currentColor"
                strokeWidth="1"
              />
              <circle cx="330" cy="300" r="105" stroke="currentColor" />
              <circle cx="330" cy="300" r="55" stroke="currentColor" />
            </svg>
          </div>

          <div className="relative flex h-full flex-col justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-[#A9B9AF]">
                Decision snapshot
              </p>

              <div className="mt-8 flex items-center gap-2 text-sm text-[#D7DED9]">
                <Location size={17} />
                Lagos, Nigeria
              </div>
            </div>

            <div className="mt-16">
              <p className="text-xs uppercase tracking-[0.16em] text-[#A9B9AF]">
                Site assessment
              </p>

              <h2 className="mt-3 max-w-md text-3xl font-medium tracking-[-0.035em]">
                This location has conditions worth considering before you build.
              </h2>

              <div className="mt-8 border-t border-white/15">
                <div className="grid grid-cols-2 divide-x divide-white/15">
                  <div className="py-5 pr-5">
                    <p className="text-xs uppercase tracking-[0.12em] text-[#A9B9AF]">
                      Exposure
                    </p>

                    <p className="mt-2 text-lg font-medium">
                      Elevated
                    </p>

                    <p className="mt-1 text-sm leading-6 text-[#C7D1CB]">
                      Heat and rainfall may increase site and drainage
                      considerations.
                    </p>
                  </div>

                  <div className="py-5 pl-5">
                    <p className="text-xs uppercase tracking-[0.12em] text-[#A9B9AF]">
                      Consider
                    </p>

                    <p className="mt-2 text-lg font-medium">
                      Site design
                    </p>

                    <p className="mt-1 text-sm leading-6 text-[#C7D1CB]">
                      Plan drainage, cooling, materials, and other
                      interventions.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-white/15 pt-5">
                <span className="text-xs text-[#A9B9AF]">
                  Location → Risk → Decision
                </span>

                <span className="text-sm font-medium text-[#D99A78]">
                  Assess the site →
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section
        id="why"
        className="border-t border-[#D9D7CE] bg-[#FBFAF6]"
      >
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.15em] text-[#B66A45]">
                The problem
              </p>

              <h2 className="mt-4 text-4xl font-semibold leading-[1.05] tracking-[-0.045em] text-[#171A17] sm:text-5xl">
                The environment can change
                <br />
                a good decision into a costly one.
              </h2>
            </div>

            <div className="max-w-2xl">
              <p className="text-lg leading-8 text-[#4F554F]">
                A site can look suitable until flooding becomes a problem.
                A warehouse can operate normally until heat affects storage.
                A delivery route can work until rainfall disrupts movement.
              </p>

              <p className="mt-6 text-lg leading-8 text-[#6D7069]">
                The information exists. The difficult part is understanding
                <span className="font-medium text-[#23483A]">
                  {" "}how it affects the asset or operation you're responsible for.
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section
        id="how-it-works"
        className="border-t border-[#D9D7CE] bg-[#F5F3ED]"
      >
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.15em] text-[#B66A45]">
                How TerrIQ works
              </p>

              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-[#171A17] sm:text-5xl">
                From a location to a decision.
              </h2>

              <p className="mt-5 max-w-md leading-7 text-[#6D7069]">
                TerrIQ connects environmental conditions to the physical
                asset or operation they could affect.
              </p>
            </div>

            <div className="divide-y divide-[#D9D7CE]">
              {[
                [
                  "01",
                  "Start with the place",
                  "Choose a site, route, facility, or other physical location.",
                ],
                [
                  "02",
                  "Understand exposure",
                  "See the environmental conditions that matter around it.",
                ],
                [
                  "03",
                  "See what could be affected",
                  "Identify risks to the asset, inventory, movement, or operation.",
                ],
                [
                  "04",
                  "Decide what to do",
                  "Get practical recommendations based on timing, cost, effort, and expected impact.",
                ],
              ].map(([number, title, description]) => (
                <div
                  key={number}
                  className="grid gap-4 py-7 sm:grid-cols-[70px_1fr]"
                >
                  <span className="text-sm text-[#B66A45]">
                    {number}
                  </span>

                  <div>
                    <h3 className="text-xl font-medium text-[#171A17]">
                      {title}
                    </h3>

                    <p className="mt-2 max-w-xl leading-7 text-[#6D7069]">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section
        id="use-cases"
        className="border-t border-[#D9D7CE] bg-[#FBFAF6]"
      >
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-[0.15em] text-[#B66A45]">
              Built for physical decisions
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.045em] text-[#171A17] sm:text-5xl">
              Two places where environmental risk gets expensive.
            </h2>
          </div>

          <div className="mt-14 grid gap-px overflow-hidden border border-[#D9D7CE] bg-[#D9D7CE] md:grid-cols-2">
            <article className="bg-[#FBFAF6] p-8 sm:p-10">
              <p className="text-xs uppercase tracking-[0.15em] text-[#B66A45]">
                Site intelligence
              </p>

              <h3 className="mt-5 text-2xl font-medium tracking-[-0.03em] text-[#171A17]">
                Before you build, understand the site.
              </h3>

              <p className="mt-4 leading-7 text-[#6D7069]">
                Assess environmental exposure before committing to land,
                construction, or infrastructure.
              </p>

              <div className="mt-8 space-y-3 border-t border-[#D9D7CE] pt-6 text-sm text-[#4F554F]">
                <p>Flood and drainage exposure</p>
                <p>Heat and rainfall conditions</p>
                <p>Water considerations</p>
                <p>Site-specific recommendations</p>
              </div>
            </article>

            <article className="bg-[#23483A] p-8 text-[#F5F3ED] sm:p-10">
              <p className="text-xs uppercase tracking-[0.15em] text-[#D99A78]">
                Operational intelligence
              </p>

              <h3 className="mt-5 text-2xl font-medium tracking-[-0.03em]">
                When you operate, prepare for what could change.
              </h3>

              <p className="mt-4 leading-7 text-[#C7D1CB]">
                Understand how environmental conditions could affect routes,
                facilities, inventory, and day-to-day operations.
              </p>

              <div className="mt-8 space-y-3 border-t border-white/15 pt-6 text-sm text-[#D7DED9]">
                <p>Route and movement disruption</p>
                <p>Heat and weather exposure</p>
                <p>Storage considerations</p>
                <p>Operational recommendations</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Action layer */}
      <section className="border-t border-[#D9D7CE] bg-[#23483A] text-[#F5F3ED]">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[.85fr_1.15fr]">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.15em] text-[#D99A78]">
                Make the decision useful
              </p>

              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                Don't stop at the risk.
              </h2>
            </div>

            <div>
              <p className="max-w-2xl text-lg leading-8 text-[#C7D1CB]">
                TerrIQ turns identified risks into practical next steps.
              </p>

              <div className="mt-10 grid gap-px border border-white/15 bg-white/15 sm:grid-cols-2">
                {[
                  ["Recommendation", "What should change?"],
                  ["Budget", "What could it cost?"],
                  ["Impact", "What could it prevent?"],
                  ["Local options", "What can you get nearby?"],
                ].map(([title, description]) => (
                  <div
                    key={title}
                    className="bg-[#23483A] p-6"
                  >
                    <p className="text-sm font-medium">{title}</p>
                    <p className="mt-2 text-sm leading-6 text-[#A9B9AF]">
                      {description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-[#D9D7CE] bg-[#F5F3ED]">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <div className="max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.15em] text-[#B66A45]">
              TerrIQ
            </p>

            <h2 className="mt-4 text-4xl font-semibold leading-[1.05] tracking-[-0.045em] text-[#171A17] sm:text-6xl">
              Know the environment.
              <br />
              Make the better call.
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-[#6D7069]">
              Assess a site or understand the environmental risks around your
              operation before they become expensive problems.
            </p>

            <Link
              href="/signup"
              className="group mt-9 inline-flex items-center gap-3 bg-[#23483A] px-5 py-3.5 text-sm font-medium text-white transition hover:bg-[#18362B]"
            >
              Explore TerrIQ
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#D9D7CE] px-6 py-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <TerrIQLogo />

          <p className="text-xs text-[#92958D]">
            Environmental intelligence for sites and operations.
          </p>
        </div>
      </footer>
    </main>
  );
}