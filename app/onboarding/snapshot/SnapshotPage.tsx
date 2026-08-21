"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { TerrIQLogo } from "@/components/brands/terriq-logo";

type Place = {
  id: string;
  name: string;
  place_type: string;
  address: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  context_category: string | null;
};

type Priority = {
  priority: string;
};

type Profile = {
  primary_use_case: string | null;
  site_context: string | null;
  operation_context: string | null;
};

export default function SnapshotPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const placeId = searchParams.get("place");

  const [place, setPlace] = useState<Place | null>(null);
  const [priorities, setPriorities] = useState<Priority[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);

  const [loading, setLoading] = useState(true);
  const [starting, setStarting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadSetup() {
      if (!placeId) {
        router.push("/onboarding/place");
        return;
      }

      const supabase = createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      const [placeResult, priorityResult, profileResult] =
        await Promise.all([
          supabase
            .from("places")
            .select(
              "id, name, place_type, address, city, state, country, context_category"
            )
            .eq("id", placeId)
            .eq("user_id", user.id)
            .single(),

          supabase
            .from("place_priorities")
            .select("priority")
            .eq("place_id", placeId),

          supabase
            .from("profiles")
            .select(
              "primary_use_case, site_context, operation_context"
            )
            .eq("id", user.id)
            .single(),
        ]);

      if (placeResult.error || !placeResult.data) {
        router.push("/onboarding/place");
        return;
      }

      setPlace(placeResult.data);
      setPriorities(priorityResult.data ?? []);
      setProfile(profileResult.data);
      setLoading(false);
    }

    loadSetup();
  }, [placeId, router]);

  async function startMonitoring() {
    setStarting(true);
    setError("");

    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    const { error: updateError } = await supabase
      .from("profiles")
      .update({
        onboarding_completed: true,
      })
      .eq("id", user.id);

    if (updateError) {
      setError(updateError.message);
      setStarting(false);
      return;
    }

    router.push("/dashboard");
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F5F3ED]">
        <p className="text-sm text-[#6D7069]">
          Preparing your TerrIQ setup...
        </p>
      </main>
    );
  }

  if (!place) return null;

  const location = [
    place.address,
    place.city,
    place.state,
    place.country,
  ]
    .filter(Boolean)
    .join(", ");

  const contextLabel =
    profile?.primary_use_case === "site"
      ? profile.site_context
      : profile?.primary_use_case === "operation"
      ? profile.operation_context
      : profile?.primary_use_case === "both"
      ? `${profile.site_context || ""}${
          profile.site_context && profile.operation_context ? " · " : ""
        }${profile.operation_context || ""}`
      : place.place_type;

  return (
    <main className="min-h-screen bg-[#F5F3ED]">
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col px-6 py-8">
        <TerrIQLogo />

        <div className="mt-16 flex-1 pb-10">
          <div className="mb-10">
            <p className="text-sm font-medium uppercase tracking-[0.15em] text-[#B66A45]">
              03 / 03 · Your setup
            </p>

            <h1 className="mt-4 text-4xl font-medium tracking-[-0.04em] text-[#171A17] sm:text-5xl">
              TerrIQ knows where to start.
            </h1>

            <p className="mt-4 max-w-xl text-base leading-7 text-[#6D7069]">
              We&apos;ll use this place and your priorities to understand
              environmental conditions that could affect what you&apos;re
              building or operating.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-[#D7D8D1] bg-white">
            <div className="border-b border-[#D7D8D1] px-6 py-6">
              <p className="text-xs uppercase tracking-[0.15em] text-[#8A8F88]">
                Your place
              </p>

              <h2 className="mt-2 text-2xl font-medium tracking-[-0.025em] text-[#171A17]">
                {place.name}
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#6D7069]">
                {location || "Location added"}
              </p>

              <p className="mt-4 inline-flex rounded-full bg-[#EAF0EB] px-3 py-1.5 text-xs font-medium text-[#23483A]">
                {place.place_type}
              </p>
            </div>

            <div className="px-6 py-6">
              <p className="text-xs uppercase tracking-[0.15em] text-[#8A8F88]">
                Your context
              </p>

              <p className="mt-2 text-sm font-medium text-[#26332B]">
                {contextLabel || "Environmental monitoring"}
              </p>
            </div>

            <div className="border-t border-[#D7D8D1] px-6 py-6">
              <p className="text-xs uppercase tracking-[0.15em] text-[#8A8F88]">
                What matters here
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {priorities.map((item) => (
                  <span
                    key={item.priority}
                    className="rounded-full border border-[#D7D8D1] bg-[#F8F8F4] px-3 py-2 text-xs text-[#26332B]"
                  >
                    {item.priority}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-2xl bg-[#23483A] p-6 text-[#F5F3ED]">
            <p className="text-xs uppercase tracking-[0.15em] text-[#A9B9AF]">
              Ready to begin
            </p>

            <h2 className="mt-3 text-2xl font-medium tracking-[-0.025em]">
              We&apos;ll watch this place for what matters to you.
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-[#C7D1CB]">
              Your dashboard will turn environmental conditions into clear
              insights, emerging risks, and practical actions.
            </p>
          </div>

          {error && (
            <div className="mt-6 rounded-xl border border-[#E8B7B2] bg-[#FDF3F2] px-4 py-3">
              <p className="text-sm text-[#A9443D]">{error}</p>
            </div>
          )}

          <button
            type="button"
            onClick={startMonitoring}
            disabled={starting}
            className="mt-6 h-12 w-full rounded-xl bg-[#23483A] text-sm font-medium text-white transition hover:bg-[#1B392E] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {starting ? "Starting monitoring..." : "Start monitoring"}
          </button>
        </div>
      </div>
    </main>
  );
}