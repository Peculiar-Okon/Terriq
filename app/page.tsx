"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useSpring,
  useMotionValue,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  ArrowRight,
  Location,
} from "@/components/icons/terr-iq-icons";
import { TerrIQLogo } from "@/components/brands/terriq-logo";

/* ---------------------------------- utils --------------------------------- */

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

function Reveal({
  children,
  className,
  index = 0,
}: {
  children: React.ReactNode;
  className?: string;
  index?: number;
}) {
  return (
    <motion.div
      className={className}
      variants={fadeUp}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------- watermark that draws --------------------------- */

const WATERMARK_PATHS = [
  "M-80 430C80 330 120 500 270 390C410 287 440 400 680 230",
  "M-100 500C60 390 150 560 300 450C450 340 500 440 700 290",
  "M80 0C130 150 240 140 220 300C200 450 360 480 500 620",
  "M260 -30C300 110 420 140 390 270C360 410 500 480 590 560",
];

function DrawingWatermark({ progress }: { progress: MotionValue<number> }) {
  return (
    <div className="pointer-events-none absolute inset-0 opacity-[0.08]">
      <svg
        viewBox="0 0 600 600"
        className="h-full w-full"
        fill="none"
        aria-hidden="true"
      >
        {WATERMARK_PATHS.map((d) => (
          <motion.path
            key={d}
            d={d}
            stroke="currentColor"
            strokeWidth="1"
            style={{ pathLength: progress }}
          />
        ))}
        <motion.circle
          cx="330"
          cy="300"
          r="105"
          stroke="currentColor"
          style={{ pathLength: progress }}
        />
        <motion.circle
          cx="330"
          cy="300"
          r="55"
          stroke="currentColor"
          style={{ pathLength: progress }}
        />
      </svg>
    </div>
  );
}

/* --------------------- snapshot with cursor push effect -------------------- */

function Snapshot() {
  const ref = useRef<HTMLDivElement>(null);

  // Draw the watermark as the snapshot scrolls into view
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const draw = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    restDelta: 0.001,
  });

  // Cursor position for the "push" effect
  const mx = useMotionValue(0.5); // 0..1 within card
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { stiffness: 250, damping: 25 });
  const sy = useSpring(my, { stiffness: 250, damping: 25 });

  // Inner content subtly shifts away from the cursor, like being pressed
  const contentX = useTransform(sx, [0, 1], [10, -10]);
  const contentY = useTransform(sy, [0, 1], [8, -8]);
  // A soft "dent" highlight follows the cursor
  const dentX = useTransform(sx, (v) => `${v * 100}%`);
  const dentY = useTransform(sy, (v) => `${v * 100}%`);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  }

  function handleLeave() {
    mx.set(0.5);
    my.set(0.5);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative min-h-[440px] overflow-hidden bg-[#23483A] p-6 text-[#F5F3ED] sm:min-h-[500px] sm:p-9 lg:hover:shadow-2xl lg:hover:shadow-[#23483A]/30"
      style={{ transitionProperty: "box-shadow" }}
    >
      <DrawingWatermark progress={draw} />

      {/* Cursor-following "press" dent */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute hidden h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full lg:block"
        style={{
          left: dentX,
          top: dentY,
          background:
            "radial-gradient(circle, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 40%, transparent 70%)",
        }}
      />

      <motion.div
        className="relative flex h-full flex-col justify-between"
        style={{ x: contentX, y: contentY }}
      >
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-[#A9B9AF] sm:text-xs">
            Decision snapshot
          </p>

          <div className="mt-8 flex items-center gap-2 text-sm text-[#D7DED9]">
            <Location size={17} />
            Lagos, Nigeria
          </div>
        </div>

        <div className="mt-16">
          <p className="text-[11px] uppercase tracking-[0.16em] text-[#A9B9AF] sm:text-xs">
            Site assessment
          </p>

          <h2 className="mt-3 max-w-md text-xl font-medium tracking-[-0.03em] sm:text-2xl md:text-3xl md:tracking-[-0.035em]">
            This location has conditions worth considering before you build.
          </h2>

          <div className="mt-8 border-t border-white/15">
            <div className="grid grid-cols-2 divide-x divide-white/15">
              <div className="py-5 pr-5">
                <p className="text-[11px] uppercase tracking-[0.12em] text-[#A9B9AF] sm:text-xs">
                  Exposure
                </p>

                <p className="mt-2 text-base font-medium sm:text-lg">
                  Elevated
                </p>

                <p className="mt-1 text-sm leading-6 text-[#C7D1CB]">
                  Heat and rainfall may increase site and drainage
                  considerations.
                </p>
              </div>

              <div className="py-5 pl-5">
                <p className="text-[11px] uppercase tracking-[0.12em] text-[#A9B9AF] sm:text-xs">
                  Consider
                </p>

                <p className="mt-2 text-base font-medium sm:text-lg">
                  Site design
                </p>

                <p className="mt-1 text-sm leading-6 text-[#C7D1CB]">
                  Plan drainage, cooling, materials, and other interventions.
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
      </motion.div>
    </motion.div>
  );
}

/* ---------------------------------- page ---------------------------------- */

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
      <section className="mx-auto grid max-w-7xl gap-14 px-6 pb-24 pt-12 sm:pt-16 lg:grid-cols-[1.02fr_.98fr] lg:px-10 lg:pt-24">
        <div className="flex flex-col justify-center">
          <Reveal>
            <div className="mb-6 flex items-center gap-2 text-xs font-medium text-[#B66A45] sm:text-sm">
              <span className="h-px w-8 bg-[#B66A45]" />
              Environmental intelligence for sites & businesses
            </div>
          </Reveal>

          <Reveal index={1}>
            <h1 className="max-w-4xl text-3xl font-semibold leading-[1.02] tracking-[-0.05em] text-[#171A17] sm:text-5xl sm:leading-[0.97] sm:tracking-[-0.06em] lg:text-7xl">
              Know how the environment could affect your next decision.
            </h1>
          </Reveal>

          <Reveal index={2}>
            <p className="mt-7 max-w-xl text-base leading-7 text-[#6D7069] sm:text-lg sm:leading-8">
              TerrIQ helps businesses assess locations and operations against
              environmental conditions before they become costly problems.
            </p>
          </Reveal>

          <Reveal index={3}>
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
          </Reveal>
        </div>

        {/* Decision Snapshot */}
        <Snapshot />
      </section>

      {/* Problem */}
      <section
        id="why"
        className="border-t border-[#D9D7CE] bg-[#FBFAF6]"
      >
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
            <Reveal>
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#B66A45] sm:text-sm">
                The problem
              </p>

              <h2 className="mt-4 text-2xl font-semibold leading-[1.08] tracking-[-0.04em] text-[#171A17] sm:text-4xl sm:leading-[1.05] sm:tracking-[-0.045em] lg:text-5xl">
                The environment can change
                <br />
                a good decision into a costly one.
              </h2>
            </Reveal>

            <Reveal index={1} className="max-w-2xl">
              <p className="text-base leading-7 text-[#4F554F] sm:text-lg sm:leading-8">
                A site can look suitable until flooding becomes a problem.
                A warehouse can operate normally until heat affects storage.
                A delivery route can work until rainfall disrupts movement.
              </p>

              <p className="mt-6 text-base leading-7 text-[#6D7069] sm:text-lg sm:leading-8">
                The information exists. The difficult part is understanding
                <span className="font-medium text-[#23483A]">
                  {" "}how it affects the asset or operation you're responsible for.
                </span>
              </p>
            </Reveal>
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
            <Reveal>
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#B66A45] sm:text-sm">
                How TerrIQ works
              </p>

              <h2 className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-[#171A17] sm:text-4xl sm:tracking-[-0.04em] lg:text-5xl">
                From a location to a decision.
              </h2>

              <p className="mt-5 max-w-md text-base leading-7 text-[#6D7069] sm:text-lg">
                TerrIQ connects environmental conditions to the physical
                asset or operation they could affect.
              </p>
            </Reveal>

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
              ].map(([number, title, description], i) => (
                <Reveal key={number} index={i}>
                  <div className="grid gap-4 py-7 transition-colors duration-300 hover:bg-[#EFEBE0] sm:grid-cols-[70px_1fr] lg:-mx-4 lg:px-4">
                    <span className="text-sm text-[#B66A45]">
                      {number}
                    </span>

                    <div>
                      <h3 className="text-lg font-medium text-[#171A17] sm:text-xl">
                        {title}
                      </h3>

                      <p className="mt-2 max-w-xl text-sm leading-6 text-[#6D7069] sm:text-base sm:leading-7">
                        {description}
                      </p>
                    </div>
                  </div>
                </Reveal>
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
          <Reveal className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#B66A45] sm:text-sm">
              Built for physical decisions
            </p>

            <h2 className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-[#171A17] sm:text-4xl sm:tracking-[-0.045em] lg:text-5xl">
              Two places where environmental risk gets expensive.
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-px overflow-hidden border border-[#D9D7CE] bg-[#D9D7CE] md:grid-cols-2">
            <motion.article
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              className="group bg-[#FBFAF6] p-6 transition-shadow duration-300 hover:shadow-xl hover:shadow-[#171A17]/10 sm:p-10"
            >
              <p className="text-[11px] uppercase tracking-[0.15em] text-[#B66A45] sm:text-xs">
                Site intelligence
              </p>

              <h3 className="mt-5 text-xl font-medium tracking-[-0.03em] text-[#171A17] sm:text-2xl">
                Before you build, understand the site.
              </h3>

              <p className="mt-4 text-sm leading-6 text-[#6D7069] sm:text-base sm:leading-7">
                Assess environmental exposure before committing to land,
                construction, or infrastructure.
              </p>

              <div className="mt-8 space-y-3 border-t border-[#D9D7CE] pt-6 text-sm text-[#4F554F]">
                {[
                  "Flood and drainage exposure",
                  "Heat and rainfall conditions",
                  "Water considerations",
                  "Site-specific recommendations",
                ].map((item) => (
                  <p
                    key={item}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    {item}
                  </p>
                ))}
              </div>
            </motion.article>

            <motion.article
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.7,
                delay: 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -6 }}
              className="group bg-[#23483A] p-6 text-[#F5F3ED] transition-shadow duration-300 hover:shadow-xl hover:shadow-[#23483A]/40 sm:p-10"
            >
              <p className="text-[11px] uppercase tracking-[0.15em] text-[#D99A78] sm:text-xs">
                Operational intelligence
              </p>

              <h3 className="mt-5 text-xl font-medium tracking-[-0.03em] sm:text-2xl">
                When you operate, prepare for what could change.
              </h3>

              <p className="mt-4 text-sm leading-6 text-[#C7D1CB] sm:text-base sm:leading-7">
                Understand how environmental conditions could affect routes,
                facilities, inventory, and day-to-day operations.
              </p>

              <div className="mt-8 space-y-3 border-t border-white/15 pt-6 text-sm text-[#D7DED9]">
                {[
                  "Route and movement disruption",
                  "Heat and weather exposure",
                  "Storage considerations",
                  "Operational recommendations",
                ].map((item) => (
                  <p
                    key={item}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    {item}
                  </p>
                ))}
              </div>
            </motion.article>
          </div>
        </div>
      </section>

      {/* Action layer */}
      <section className="border-t border-[#D9D7CE] bg-[#23483A] text-[#F5F3ED]">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[.85fr_1.15fr]">
            <Reveal>
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#D99A78] sm:text-sm">
                Make the decision useful
              </p>

              <h2 className="mt-4 text-2xl font-semibold tracking-[-0.04em] sm:text-4xl sm:tracking-[-0.045em] lg:text-5xl">
                Don't stop at the risk.
              </h2>
            </Reveal>

            <Reveal index={1}>
              <p className="max-w-2xl text-base leading-7 text-[#C7D1CB] sm:text-lg sm:leading-8">
                TerrIQ turns identified risks into practical next steps.
              </p>

              <div className="mt-10 grid gap-px border border-white/15 bg-white/15 sm:grid-cols-2">
                {[
                  ["Recommendation", "What should change?"],
                  ["Budget", "What could it cost?"],
                  ["Impact", "What could it prevent?"],
                  ["Local options", "What can you get nearby?"],
                ].map(([title, description]) => (
                  <motion.div
                    key={title}
                    whileHover={{ backgroundColor: "#2B5747" }}
                    transition={{ duration: 0.25 }}
                    className="cursor-default bg-[#23483A] p-6"
                  >
                    <p className="text-sm font-medium">{title}</p>
                    <p className="mt-2 text-sm leading-6 text-[#A9B9AF]">
                      {description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-[#D9D7CE] bg-[#F5F3ED]">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <Reveal className="max-w-3xl">
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#B66A45] sm:text-sm">
              TerrIQ
            </p>

            <h2 className="mt-4 text-3xl font-semibold leading-[1.05] tracking-[-0.04em] text-[#171A17] sm:text-5xl sm:tracking-[-0.045em] lg:text-6xl">
              Know the environment.
              <br />
              Make the better call.
            </h2>

            <p className="mt-6 max-w-xl text-base leading-7 text-[#6D7069] sm:text-lg sm:leading-8">
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
          </Reveal>
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