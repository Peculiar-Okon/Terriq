import Link from "next/link";
import { ArrowRight, ArrowUpRight, Leaf, Location } from "@/components/icons/terr-iq-icons";
import { TerrIQLogo } from "@/components/brands/terriq-logo";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F5F3ED]">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        <TerrIQLogo />

        <div className="hidden items-center gap-8 text-sm text-[#6D7069] md:flex">
          <a href="#how-it-works" className="transition hover:text-[#171A17]">
            How it works
          </a>

          <a href="#why" className="transition hover:text-[#171A17]">
            Why TerrIQ
          </a>
        </div>

        <Link
          href="/login"
          className="text-sm font-medium text-[#23483A] hover:text-[#B66A45]"
        >
          Sign in
        </Link>
      </nav>

      <section className="mx-auto grid max-w-7xl gap-16 px-6 pb-24 pt-16 lg:grid-cols-[1.1fr_.9fr] lg:px-10 lg:pt-24">
        <div className="flex flex-col justify-center">
          <div className="mb-6 flex items-center gap-2 text-sm font-medium text-[#B66A45]">
            <span className="h-px w-8 bg-[#B66A45]" />
            Environmental intelligence
          </div>

          <h1 className="max-w-4xl text-5xl font-semibold leading-[0.98] tracking-[-0.055em] text-[#171A17] sm:text-6xl lg:text-7xl">
            Better decisions for the place you call home.
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-8 text-[#6D7069]">
            TerrIQ combines your location, environmental conditions,
            priorities, and budget to help you make practical decisions
            for a healthier, more resilient home.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="/signup"
              className="group inline-flex items-center gap-3 bg-[#23483A] px-5 py-3.5 text-sm font-medium text-white transition hover:bg-[#18362B]"
            >
              Start your assessment
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

        <div className="relative min-h-[470px] overflow-hidden bg-[#23483A] p-7 text-[#F5F3ED]">
          <div className="absolute right-8 top-8">
            <Leaf size={42} strokeWidth={1.3} className="text-[#B66A45]" />
          </div>

          <div className="flex h-full flex-col justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-[#A9B9AF]">
                Your environment
              </p>

              <div className="mt-8 flex items-center gap-2 text-sm text-[#D7DED9]">
                <Location size={17} />
                Lagos, Nigeria
              </div>
            </div>

            <div>
              <div className="border-t border-white/15 py-5">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-sm text-[#A9B9AF]">Heat exposure</p>
                    <p className="mt-1 text-4xl font-medium tracking-tight">
                      High
                    </p>
                  </div>

                  <span className="text-sm text-[#B66A45]">+4.2°</span>
                </div>

                <div className="mt-5 h-1 bg-white/10">
                  <div className="h-full w-[82%] bg-[#B66A45]" />
                </div>
              </div>

              <div className="grid grid-cols-2 border-t border-white/15">
                <div className="border-r border-white/15 py-5 pr-5">
                  <p className="text-sm text-[#A9B9AF]">Energy</p>
                  <p className="mt-1 text-lg">Needs attention</p>
                </div>

                <div className="py-5 pl-5">
                  <p className="text-sm text-[#A9B9AF]">Flood risk</p>
                  <p className="mt-1 text-lg">Moderate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="how-it-works"
        className="border-t border-[#D9D7CE] bg-[#FBFAF6]"
      >
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.15em] text-[#B66A45]">
                How it works
              </p>

              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-[#171A17]">
                From uncertainty to action.
              </h2>
            </div>

            <div className="divide-y divide-[#D9D7CE]">
              {[
                [
                  "01",
                  "Understand your place",
                  "Tell TerrIQ where you live and what your home is like.",
                ],
                [
                  "02",
                  "Identify opportunities",
                  "We combine your information with environmental conditions to find what matters most.",
                ],
                [
                  "03",
                  "Choose what makes sense",
                  "Compare practical options by cost, impact, difficulty, and local availability.",
                ],
                [
                  "04",
                  "Turn it into a plan",
                  "Get a realistic next step instead of another list of things you should probably do.",
                ],
              ].map(([number, title, description]) => (
                <div
                  key={number}
                  className="grid gap-4 py-7 sm:grid-cols-[70px_1fr]"
                >
                  <span className="text-sm text-[#B66A45]">{number}</span>

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

      <footer className="border-t border-[#D9D7CE] px-6 py-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <TerrIQLogo />

          <p className="text-xs text-[#92958D]">
            Environmental intelligence for better decisions.
          </p>
        </div>
      </footer>
    </main>
  );
}