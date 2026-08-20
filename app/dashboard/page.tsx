// const conditions = [
//   {
//     label: "Temperature",
//     value: "38°C",
//     detail: "Above seasonal average",
//   },
//   {
//     label: "Rain",
//     value: "62%",
//     detail: "Chance later today",
//   },
//   {
//     label: "Air",
//     value: "Fair",
//     detail: "Conditions currently moderate",
//   },
// ];

// const actions = [
//   {
//     title: "Reduce heat exposure",
//     description:
//       "Peak heat is expected this afternoon. Consider shifting outdoor activity to a cooler window.",
//     meta: "High impact · Low effort",
//   },
//   {
//     title: "Check drainage",
//     description:
//       "Rain is likely later today. Clear nearby drainage paths before rainfall increases.",
//     meta: "High impact · Low effort",
//   },
//   {
//     title: "Plan your afternoon",
//     description:
//       "The hottest period is expected between 1 PM and 4 PM.",
//     meta: "Practical planning",
//   },
// ];

// export default function DashboardPage() {
//   return (
//     <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10 lg:py-12">
//       <header>
//         <p className="text-sm uppercase tracking-[0.15em] text-[#B66A45]">
//           Lagos, Nigeria
//         </p>

//         <h1 className="mt-3 text-4xl font-medium tracking-[-0.045em] text-[#171A17] sm:text-5xl">
//           What&apos;s happening around you?
//         </h1>

//         <p className="mt-3 max-w-2xl text-sm leading-6 text-[#6D7069]">
//           TerrIQ is monitoring environmental conditions around your
//           location and highlighting what matters most.
//         </p>
//       </header>

//       <section className="mt-10 grid gap-5 lg:grid-cols-[1.35fr_.65fr]">
//         <div className="bg-[#23483A] p-7 text-[#F5F3ED] sm:p-9">
//           <div className="flex items-start justify-between gap-6">
//             <div>
//               <p className="text-xs uppercase tracking-[0.16em] text-[#A9B9AF]">
//                 Current heat
//               </p>

//               <p className="mt-5 text-6xl font-medium tracking-[-0.05em]">
//                 38°
//               </p>

//               <p className="mt-2 text-sm text-[#C7D1CB]">
//                 Elevated environmental heat
//               </p>
//             </div>

//             <span className="border border-[#B66A45]/40 px-3 py-1.5 text-xs text-[#D99A78]">
//               HIGH
//             </span>
//           </div>

//           <div className="mt-10 border-t border-white/15 pt-5">
//             <p className="max-w-xl text-sm leading-6 text-[#D7DED9]">
//               Temperatures are unusually high around your location.
//               Conditions may remain uncomfortable into the evening.
//             </p>

//             <a
//               href="/dashboard/insights"
//               className="mt-5 inline-block text-sm font-medium text-[#D99A78] transition hover:text-white"
//             >
//               Understand this risk →
//             </a>
//           </div>
//         </div>

//         <div className="border border-[#D9D7CE] bg-[#FBFAF6] p-7">
//           <p className="text-xs uppercase tracking-[0.16em] text-[#B66A45]">
//             Right now
//           </p>

//           <div className="mt-6 divide-y divide-[#D9D7CE]">
//             {conditions.map((condition) => (
//               <div
//                 key={condition.label}
//                 className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
//               >
//                 <div>
//                   <p className="text-sm font-medium text-[#26332B]">
//                     {condition.label}
//                   </p>

//                   <p className="mt-1 text-xs text-[#7B8079]">
//                     {condition.detail}
//                   </p>
//                 </div>

//                 <p className="text-lg font-medium text-[#23483A]">
//                   {condition.value}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <section className="mt-12">
//         <div className="flex items-end justify-between gap-6">
//           <div>
//             <p className="text-sm uppercase tracking-[0.15em] text-[#B66A45]">
//               What to do
//             </p>

//             <h2 className="mt-2 text-2xl font-medium tracking-[-0.03em] text-[#171A17]">
//               Decisions worth making today.
//             </h2>
//           </div>

//           <a
//             href="/dashboard/actions"
//             className="hidden text-sm font-medium text-[#23483A] sm:block"
//           >
//             View all →
//           </a>
//         </div>

//         <div className="mt-6 divide-y divide-[#D9D7CE] border-y border-[#D9D7CE]">
//           {actions.map((action, index) => (
//             <article
//               key={action.title}
//               className="grid gap-4 py-6 sm:grid-cols-[50px_1fr_auto]"
//             >
//               <span className="text-sm text-[#B66A45]">
//                 0{index + 1}
//               </span>

//               <div>
//                 <h3 className="text-lg font-medium text-[#171A17]">
//                   {action.title}
//                 </h3>

//                 <p className="mt-2 max-w-2xl text-sm leading-6 text-[#6D7069]">
//                   {action.description}
//                 </p>
//               </div>

//               <p className="text-xs font-medium uppercase tracking-[0.08em] text-[#7B8079] sm:text-right">
//                 {action.meta}
//               </p>
//             </article>
//           ))}
//         </div>
//       </section>

//       <section className="mt-12 border-t border-[#D9D7CE] pt-8">
//         <div className="flex flex-wrap items-center justify-between gap-4">
//           <div>
//             <p className="text-sm font-medium text-[#26332B]">
//               Last environmental update
//             </p>

//             <p className="mt-1 text-xs text-[#7B8079]">
//               Data refreshed recently
//             </p>
//           </div>

//           <p className="text-xs text-[#92958D]">
//             TerrIQ environmental intelligence
//           </p>
//         </div>
//       </section>
//     </div>
//   );
// }

"use client";

import Link from "next/link";

const signals = [
  {
    label: "Heat",
    value: "38°C",
    status: "High",
    description: "May affect comfort, clothing, cooling and energy use.",
  },
  {
    label: "Rain",
    value: "62%",
    status: "Watch",
    description: "May affect roads, drainage, land and farming.",
  },
  {
    label: "Air",
    value: "Fair",
    status: "Fair",
    description: "Currently acceptable, but conditions can change.",
  },
  {
    label: "Water",
    value: "Stable",
    status: "Normal",
    description: "No significant water-related concern detected.",
  },
];

const impacts = [
  {
    label: "Clothing",
    context: "Heat + humidity",
    description:
      "Heavier fabrics may become uncomfortable outdoors. Breathable materials may be more suitable today.",
    action: "Find suitable materials near you",
    href: "/dashboard/actions?category=clothing",
  },
  {
    label: "Farming",
    context: "Heat + water conditions",
    description:
      "Current conditions may increase water stress for exposed crops and increase the need for efficient water use.",
    action: "Explore water-saving options",
    href: "/dashboard/actions?category=farming",
  },
  {
    label: "Land",
    context: "Rain + drainage",
    description:
      "Heavy rainfall can increase runoff and expose poorly drained areas to localized flooding.",
    action: "See flood-prone areas",
    href: "/dashboard/environment?view=flooding",
  },
  {
    label: "Movement",
    context: "Rain + roads",
    description:
      "Rain later today may make some routes slower or less reliable, particularly in vulnerable areas.",
    action: "See potentially affected roads",
    href: "/dashboard/environment?view=roads",
  },
  {
    label: "Energy",
    context: "Heat + energy demand",
    description:
      "Higher temperatures can increase cooling demand, especially during the hottest part of the day.",
    action: "Explore cooling options",
    href: "/dashboard/actions?category=energy",
  },
  {
    label: "Outdoor work",
    context: "Heat + exposure",
    description:
      "Afternoon heat may increase physical strain and reduce comfortable working time.",
    action: "See safer working windows",
    href: "/dashboard/actions?category=outdoor-work",
  },
];

const recommendations = [
  {
    number: "01",
    title: "Choose lighter clothing",
    description:
      "Heat and humidity are elevated today. Breathable clothing may keep you more comfortable outdoors.",
    meta: "Low cost · Immediate",
    href: "/dashboard/actions?category=clothing",
  },
  {
    number: "02",
    title: "Move outdoor work earlier",
    description:
      "Peak heat is expected between 1–4 PM. Morning conditions are more favorable.",
    meta: "No cost · High impact",
    href: "/dashboard/actions?category=outdoor-work",
  },
  {
    number: "03",
    title: "Check drainage",
    description:
      "Rain later today may increase runoff around poorly drained areas.",
    meta: "Low effort · Preventive",
    href: "/dashboard/actions?category=drainage",
  },
  {
    number: "04",
    title: "Protect heat-sensitive crops",
    description:
      "Current conditions may increase moisture stress for exposed crops.",
    meta: "Farming · Local condition",
    href: "/dashboard/actions?category=farming",
  },
];

const planningItems = [
  {
    label: "Heat",
    timing: "Friday",
    detail: "Elevated conditions may continue.",
  },
  {
    label: "Rain",
    timing: "Saturday",
    detail: "Rainfall may increase local flood exposure.",
  },
  {
    label: "Water",
    timing: "This week",
    detail: "Consider collection and storage opportunities.",
  },
];

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10 lg:py-12">
      {/* Header */}
      <header>
        <p className="text-sm uppercase tracking-[0.15em] text-[#B66A45]">
          Lagos, Nigeria
        </p>

        <div className="mt-3 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-4xl font-medium tracking-[-0.045em] text-[#171A17] sm:text-5xl">
              What&apos;s happening around you?
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#6D7069]">
              TerrIQ connects environmental conditions around you to the
              decisions they may affect.
            </p>
          </div>

          <p className="text-xs text-[#92958D]">
            Updated recently
          </p>
        </div>
      </header>

      {/* Today's environment */}
      <section className="mt-10">
        <p className="text-sm uppercase tracking-[0.15em] text-[#B66A45]">
          Today&apos;s environment
        </p>

        <div className="mt-4 border border-[#D9D7CE] bg-[#23483A] p-7 text-[#F5F3ED] sm:p-9">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-[#A9B9AF]">
                A condition worth noticing
              </p>

              <h2 className="mt-5 max-w-2xl text-3xl font-medium leading-tight tracking-[-0.04em] sm:text-4xl">
                Your surroundings are running hotter than usual today.
              </h2>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-[#C7D1CB]">
                Peak conditions are expected between 1–4 PM. This could
                affect how you move, work, dress, grow, build, and use
                energy today.
              </p>
            </div>

            <Link
              href="/dashboard/environment"
              className="inline-flex items-center text-sm font-medium text-[#D99A78] transition hover:text-white"
            >
              See what could be affected
              <span className="ml-2">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Today's signals */}
      <section className="mt-12">
        <div>
          <p className="text-sm uppercase tracking-[0.15em] text-[#B66A45]">
            Today&apos;s signals
          </p>

          <h2 className="mt-2 text-2xl font-medium tracking-[-0.03em] text-[#171A17]">
            What the environment is telling us.
          </h2>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {signals.map((signal) => (
            <article
              key={signal.label}
              className="border border-[#D9D7CE] bg-[#FBFAF6] p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <p className="text-sm font-medium text-[#26332B]">
                  {signal.label}
                </p>

                <span className="text-xs uppercase tracking-[0.08em] text-[#B66A45]">
                  {signal.status}
                </span>
              </div>

              <p className="mt-5 text-2xl font-medium tracking-[-0.03em] text-[#23483A]">
                {signal.value}
              </p>

              <p className="mt-2 text-xs leading-5 text-[#7B8079]">
                {signal.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* What this means */}
      <section className="mt-14">
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-[0.15em] text-[#B66A45]">
            What this means
          </p>

          <h2 className="mt-2 text-3xl font-medium tracking-[-0.04em] text-[#171A17]">
            Your environment can influence more than the weather.
          </h2>

          <p className="mt-3 text-sm leading-6 text-[#6D7069]">
            TerrIQ connects what is happening around you to the things
            you may need to decide, buy, grow, build, move, or plan.
          </p>
        </div>

        <div className="mt-7 divide-y divide-[#D9D7CE] border-y border-[#D9D7CE]">
          {impacts.map((impact, index) => (
            <article
              key={impact.label}
              className="grid gap-5 py-7 lg:grid-cols-[80px_180px_1fr_auto] lg:items-center"
            >
              <span className="text-sm text-[#B66A45]">
                0{index + 1}
              </span>

              <div>
                <h3 className="text-lg font-medium text-[#171A17]">
                  {impact.label}
                </h3>

                <p className="mt-1 text-xs uppercase tracking-[0.08em] text-[#92958D]">
                  {impact.context}
                </p>
              </div>

              <p className="max-w-xl text-sm leading-6 text-[#6D7069]">
                {impact.description}
              </p>

              <Link
                href={impact.href}
                className="text-sm font-medium text-[#23483A] transition hover:text-[#B66A45]"
              >
                {impact.action} →
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* Recommended decisions */}
      <section className="mt-14">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-sm uppercase tracking-[0.15em] text-[#B66A45]">
              Recommended decisions
            </p>

            <h2 className="mt-2 text-2xl font-medium tracking-[-0.03em] text-[#171A17]">
              A few things may be worth changing today.
            </h2>
          </div>

          <Link
            href="/dashboard/actions"
            className="hidden text-sm font-medium text-[#23483A] transition hover:text-[#B66A45] sm:block"
          >
            View all →
          </Link>
        </div>

        <div className="mt-6 divide-y divide-[#D9D7CE] border-y border-[#D9D7CE]">
          {recommendations.map((recommendation) => (
            <Link
              key={recommendation.number}
              href={recommendation.href}
              className="group grid gap-4 py-6 transition hover:bg-[#FBFAF6] sm:grid-cols-[50px_1fr_auto] sm:px-3"
            >
              <span className="text-sm text-[#B66A45]">
                {recommendation.number}
              </span>

              <div>
                <h3 className="text-lg font-medium text-[#171A17] transition group-hover:text-[#23483A]">
                  {recommendation.title}
                </h3>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-[#6D7069]">
                  {recommendation.description}
                </p>
              </div>

              <p className="text-xs font-medium uppercase tracking-[0.08em] text-[#7B8079] sm:text-right">
                {recommendation.meta}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Planning ahead */}
      <section className="mt-14 border-t border-[#D9D7CE] pt-10">
        <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.15em] text-[#B66A45]">
              Planning ahead
            </p>

            <h2 className="mt-2 text-3xl font-medium tracking-[-0.04em] text-[#171A17]">
              Conditions worth considering this week.
            </h2>

            <p className="mt-3 max-w-md text-sm leading-6 text-[#6D7069]">
              Environmental conditions are easier to respond to when
              you can see them coming.
            </p>

            <Link
              href="/dashboard/actions"
              className="mt-5 inline-flex text-sm font-medium text-[#23483A] transition hover:text-[#B66A45]"
            >
              Build a plan →
            </Link>
          </div>

          <div className="divide-y divide-[#D9D7CE] border-y border-[#D9D7CE]">
            {planningItems.map((item) => (
              <div
                key={item.label}
                className="grid gap-2 py-5 sm:grid-cols-[100px_100px_1fr] sm:items-center"
              >
                <p className="text-sm font-medium text-[#26332B]">
                  {item.label}
                </p>

                <p className="text-xs uppercase tracking-[0.08em] text-[#B66A45]">
                  {item.timing}
                </p>

                <p className="text-sm text-[#6D7069]">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer status */}
      <section className="mt-14 border-t border-[#D9D7CE] pt-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-[#7B8079]">
            Monitoring environmental conditions around Lagos, Nigeria
          </p>

          <p className="text-xs text-[#92958D]">
            TerrIQ environmental intelligence
          </p>
        </div>
      </section>
    </div>
  );
}