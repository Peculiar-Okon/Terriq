// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { createClient } from "@/lib/supabase/client";

// const goals = [
//   {
//     id: "reduce_heat",
//     title: "Reduce heat",
//     description: "Make my home cooler and more comfortable.",
//   },
//   {
//     id: "reduce_energy_cost",
//     title: "Reduce energy cost",
//     description: "Use energy more efficiently and spend less.",
//   },
//   {
//     id: "water_management",
//     title: "Improve water management",
//     description: "Use, store, and manage water better.",
//   },
//   {
//     id: "improve_resilience",
//     title: "Improve resilience",
//     description: "Prepare my home for environmental risks.",
//   },
//   {
//     id: "renovate_build",
//     title: "Renovate or build",
//     description: "Make better decisions about materials and construction.",
//   },
// ];

// export default function GoalsPage() {
//   const router = useRouter();
//   const supabase = createClient();

//   const [selected, setSelected] = useState<string[]>([]);
//   const [loading, setLoading] = useState(false);

//   function toggleGoal(id: string) {
//     setSelected((current) =>
//       current.includes(id)
//         ? current.filter((goal) => goal !== id)
//         : [...current, id]
//     );
//   }

//   async function handleContinue() {
//     if (!selected.length) return;

//     setLoading(true);

//     const {
//       data: { user },
//     } = await supabase.auth.getUser();

//     if (!user) {
//       router.push("/login");
//       return;
//     }

//     await supabase
//       .from("user_goals")
//       .delete()
//       .eq("user_id", user.id);

//     const { error } = await supabase
//       .from("user_goals")
//       .insert(
//         selected.map((goal) => ({
//           user_id: user.id,
//           goal,
//         }))
//       );

//     if (!error) {
//       router.push("/onboarding/home");
//     }

//     setLoading(false);
//   }

//   return (
//     <section className="mx-auto max-w-2xl px-6 py-16">
//       <div className="mb-10">
//         <p className="text-sm font-medium text-[#B66A45]">
//           02 / 03
//         </p>

//         <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em]">
//           What matters most to you?
//         </h1>

//         <p className="mt-3 text-sm leading-6 text-[#6D7069]">
//           Choose everything you're interested in improving.
//         </p>
//       </div>

//       <div className="space-y-3">
//         {goals.map((goal) => {
//           const isSelected = selected.includes(goal.id);

//           return (
//             <button
//               key={goal.id}
//               type="button"
//               onClick={() => toggleGoal(goal.id)}
//               className={`w-full border p-5 text-left transition ${
//                 isSelected
//                   ? "border-[#23483A] bg-[#E7ECE8]"
//                   : "border-[#D9D7CE] bg-[#FBFAF6] hover:border-[#B9B7AE]"
//               }`}
//             >
//               <div className="flex items-start justify-between gap-4">
//                 <div>
//                   <h2 className="font-medium">{goal.title}</h2>

//                   <p className="mt-1 text-sm leading-6 text-[#6D7069]">
//                     {goal.description}
//                   </p>
//                 </div>

//                 <span
//                   className={`flex h-5 w-5 shrink-0 items-center justify-center border ${
//                     isSelected
//                       ? "border-[#23483A] bg-[#23483A] text-white"
//                       : "border-[#B9B7AE]"
//                   }`}
//                 >
//                   {isSelected && "✓"}
//                 </span>
//               </div>
//             </button>
//           );
//         })}
//       </div>

//       <button
//         onClick={handleContinue}
//         disabled={!selected.length || loading}
//         className="mt-8 w-full bg-[#23483A] px-5 py-3.5 text-sm font-medium text-white disabled:opacity-40"
//       >
//         {loading ? "Saving..." : "Continue"}
//       </button>
//     </section>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { TerrIQLogo } from "@/components/brands/terriq-logo";

type Profile = {
  city: string | null;
  state: string | null;
  country: string | null;
  interests: string[] | null;
  goals: string[] | null;
};

export default function SnapshotPage() {
  const router = useRouter();
  const supabase = createClient();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("city, state, country, interests, goals")
        .eq("id", user.id)
        .single();

      if (error || !data) {
        router.push("/onboarding/location");
        return;
      }

      setProfile(data);
      setLoading(false);
    }

    loadProfile();
  }, [router, supabase]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F5F3ED]">
        <p className="text-sm text-[#6D7069]">
          Reading your environment...
        </p>
      </main>
    );
  }

  if (!profile) {
    return null;
  }

  const location = [profile.city, profile.state]
    .filter(Boolean)
    .join(", ");

  return (
    <main className="min-h-screen bg-[#F5F3ED]">
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col px-6 py-8">
        <TerrIQLogo />

        <div className="mt-16 flex-1">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.15em] text-[#B66A45]">
              03 / 03
            </p>

            <h1 className="mt-4 text-4xl font-medium tracking-[-0.04em] text-[#171A17] sm:text-5xl">
              Here's what we're watching.
            </h1>

            <p className="mt-4 max-w-xl text-base leading-7 text-[#6D7069]">
              Based on your location and priorities, TerrIQ will
              keep an eye on the environmental conditions that matter
              most to you.
            </p>
          </div>

          <div className="mt-10 overflow-hidden rounded-2xl border border-[#D7D8D1] bg-white">
            <div className="border-b border-[#D7D8D1] px-6 py-5">
              <p className="text-xs uppercase tracking-[0.15em] text-[#8A8F88]">
                Your area
              </p>

              <p className="mt-2 text-xl font-medium text-[#171A17]">
                {location || profile.country}
              </p>

              {profile.country && (
                <p className="mt-1 text-sm text-[#6D7069]">
                  {profile.country}
                </p>
              )}
            </div>

            <div className="divide-y divide-[#D7D8D1]">
              {profile.interests?.map((interest) => (
                <div
                  key={interest}
                  className="flex items-center justify-between px-6 py-5"
                >
                  <span className="text-sm font-medium text-[#26332B]">
                    {interest}
                  </span>

                  <span className="text-xs text-[#39745A]">
                    Monitoring
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 rounded-2xl bg-[#23483A] p-6 text-[#F5F3ED]">
            <p className="text-xs uppercase tracking-[0.15em] text-[#A9B9AF]">
              Your first insight
            </p>

            <h2 className="mt-3 text-2xl font-medium tracking-[-0.025em]">
              TerrIQ is ready to start reading your environment.
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-[#C7D1CB]">
              Your dashboard will turn environmental conditions into
              clear alerts, explanations, and practical actions.
            </p>
          </div>

          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="mt-6 h-12 w-full rounded-xl bg-[#23483A] text-sm font-medium text-white transition hover:bg-[#1B392E]"
          >
            Enter my dashboard
          </button>
        </div>
      </div>
    </main>
  );
}