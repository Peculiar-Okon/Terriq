// "use client";

// import { FormEvent, useState } from "react";
// import { useRouter } from "next/navigation";
// import { Location } from "@/components/icons/terr-iq-icons";
// import { createClient } from "@/lib/supabase/client";

// export default function LocationPage() {
//   const router = useRouter();
//   const supabase = createClient();

//   const [city, setCity] = useState("");
//   const [state, setState] = useState("");
//   const [country, setCountry] = useState("Nigeria");
//   const [loading, setLoading] = useState(false);

//   async function handleSubmit(e: FormEvent) {
//     e.preventDefault();
//     setLoading(true);

//     let latitude: number | null = null;
//     let longitude: number | null = null;

//     if (navigator.geolocation) {
//       try {
//         const position = await new Promise<GeolocationPosition>(
//           (resolve, reject) =>
//             navigator.geolocation.getCurrentPosition(resolve, reject)
//         );

//         latitude = position.coords.latitude;
//         longitude = position.coords.longitude;
//       } catch {
//         // Location permission is optional.
//       }
//     }

//     const {
//       data: { user },
//     } = await supabase.auth.getUser();

//     if (!user) {
//       router.push("/login");
//       return;
//     }

//     const { error } = await supabase
//       .from("profiles")
//       .upsert({
//         id: user.id,
//         full_name: user.user_metadata?.full_name,
//         city,
//         state,
//         country,
//         latitude,
//         longitude,
//       });

//     if (!error) {
//       router.push("/onboarding/goals");
//     }

//     setLoading(false);
//   }

//   return (
//     <section className="mx-auto max-w-2xl px-6 py-16">
//       <div className="mb-10">
//         <p className="text-sm font-medium text-[#B66A45]">
//           01 / 03
//         </p>

//         <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em]">
//           Where do you live?
//         </h1>

//         <p className="mt-3 max-w-lg text-sm leading-6 text-[#6D7069]">
//           Your location helps TerrIQ understand the environmental conditions
//           around you.
//         </p>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-5">
//         <div>
//           <label className="mb-2 block text-sm font-medium">City</label>
//           <input
//             required
//             value={city}
//             onChange={(e) => setCity(e.target.value)}
//             placeholder="e.g. Lagos"
//             className="w-full border border-[#D9D7CE] bg-[#FBFAF6] px-4 py-3.5 outline-none focus:border-[#23483A]"
//           />
//         </div>

//         <div>
//           <label className="mb-2 block text-sm font-medium">State</label>
//           <input
//             required
//             value={state}
//             onChange={(e) => setState(e.target.value)}
//             placeholder="e.g. Lagos State"
//             className="w-full border border-[#D9D7CE] bg-[#FBFAF6] px-4 py-3.5 outline-none focus:border-[#23483A]"
//           />
//         </div>

//         <div>
//           <label className="mb-2 block text-sm font-medium">Country</label>
//           <input
//             required
//             value={country}
//             onChange={(e) => setCountry(e.target.value)}
//             className="w-full border border-[#D9D7CE] bg-[#FBFAF6] px-4 py-3.5 outline-none focus:border-[#23483A]"
//           />
//         </div>

//         <div className="flex gap-3 border border-[#D9D7CE] bg-[#EBE9E1] p-4">
//           <Location size={20} className="mt-0.5 text-[#B66A45]" />

//           <p className="text-sm leading-6 text-[#6D7069]">
//             We'll optionally use your device location to improve local
//             environmental recommendations. You can deny permission.
//           </p>
//         </div>

//         <button
//           disabled={loading}
//           className="w-full bg-[#23483A] px-5 py-3.5 text-sm font-medium text-white disabled:opacity-50"
//         >
//           {loading ? "Saving..." : "Continue"}
//         </button>
//       </form>
//     </section>
//   );
// }

"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { TerrIQLogo } from "@/components/brands/terriq-logo";

const interests = [
  "Extreme heat",
  "Flooding",
  "Air quality",
  "Water",
  "Energy",
  "Waste",
  "Weather changes",
];

export default function LocationPage() {
  const router = useRouter();

  const [country, setCountry] = useState("Nigeria");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function toggleInterest(interest: string) {
    setSelectedInterests((current) =>
      current.includes(interest)
        ? current.filter((item) => item !== interest)
        : [...current, interest]
    );
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (selectedInterests.length === 0) {
      setError("Choose at least one environmental concern.");
      return;
    }

    setLoading(true);
    setError("");

    let latitude: number | null = null;
    let longitude: number | null = null;

    if (navigator.geolocation) {
      try {
        const position = await new Promise<GeolocationPosition>(
          (resolve, reject) =>
            navigator.geolocation.getCurrentPosition(resolve, reject)
        );

        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
      } catch {
        // Location permission is optional.
      }
    }

    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    const { error: upsertError } = await supabase
      .from("profiles")
      .upsert({
        id: user.id,
        full_name: user.user_metadata?.full_name,
        country,
        state,
        city,
        latitude,
        longitude,
        interests: selectedInterests,
      });

    if (upsertError) {
      setError(upsertError.message);
      setLoading(false);
      return;
    }

    router.push("/onboarding/priorities");
  }

  return (
    <main className="min-h-screen bg-[#F5F3ED]">
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col px-6 py-8">
        <TerrIQLogo />

        <div className="mt-16 flex-1">
          <div className="mb-10">
            <p className="text-sm font-medium uppercase tracking-[0.15em] text-[#B66A45]">
              01 / 03
            </p>

            <h1 className="mt-4 text-4xl font-medium tracking-[-0.04em] text-[#171A17] sm:text-5xl">
              Start with your environment.
            </h1>

            <p className="mt-4 max-w-xl text-base leading-7 text-[#6D7069]">
              Tell us where you are and what environmental conditions
              matter to you. TerrIQ will use this to understand what
              deserves your attention.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="country"
                  className="mb-2 block text-sm font-medium text-[#26332B]"
                >
                  Country
                </label>

                <input
                  id="country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                  className="h-12 w-full rounded-xl border border-[#D7D8D1] bg-white px-4 text-sm outline-none transition focus:border-[#23483A] focus:ring-2 focus:ring-[#23483A]/10"
                />
              </div>

              <div>
                <label
                  htmlFor="state"
                  className="mb-2 block text-sm font-medium text-[#26332B]"
                >
                  State / region
                </label>

                <input
                  id="state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  placeholder="e.g. Lagos"
                  required
                  className="h-12 w-full rounded-xl border border-[#D7D8D1] bg-white px-4 text-sm outline-none transition focus:border-[#23483A] focus:ring-2 focus:ring-[#23483A]/10"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="city"
                className="mb-2 block text-sm font-medium text-[#26332B]"
              >
                City
              </label>

              <input
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g. Lagos"
                required
                className="h-12 w-full rounded-xl border border-[#D7D8D1] bg-white px-4 text-sm outline-none transition focus:border-[#23483A] focus:ring-2 focus:ring-[#23483A]/10"
              />
            </div>

            <div>
              <div className="mb-3">
                <p className="text-sm font-medium text-[#26332B]">
                  What do you want TerrIQ to watch?
                </p>

                <p className="mt-1 text-sm text-[#6D7069]">
                  Select everything that matters to you.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {interests.map((interest) => {
                  const selected = selectedInterests.includes(interest);

                  return (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => toggleInterest(interest)}
                      className={`rounded-xl border px-4 py-4 text-left text-sm transition ${
                        selected
                          ? "border-[#23483A] bg-[#EAF0EB] text-[#23483A]"
                          : "border-[#D7D8D1] bg-white text-[#26332B] hover:border-[#AEB3AC]"
                      }`}
                    >
                      <span className="flex items-center justify-between">
                        {interest}

                        {selected && (
                          <span className="text-[#23483A]">✓</span>
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {error && (
              <div className="rounded-xl border border-[#E8B7B2] bg-[#FDF3F2] px-4 py-3">
                <p className="text-sm text-[#A9443D]">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="h-12 w-full rounded-xl bg-[#23483A] text-sm font-medium text-white transition hover:bg-[#1B392E] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Saving..." : "Continue"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}