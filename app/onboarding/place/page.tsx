"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { TerrIQLogo } from "@/components/brands/terriq-logo";

type Profile = {
  primary_use_case: "site" | "operation" | "both" | null;
  site_context: string | null;
  operation_context: string | null;
};

const sitePriorities = [
  "Flood exposure",
  "Heat",
  "Rainfall",
  "Drainage",
  "Water availability",
  "Building conditions",
  "Long-term site suitability",
];

const operationPriorities = [
  "Route reliability",
  "Delivery timing",
  "Vehicle movement",
  "Goods / inventory",
  "Heat exposure",
  "Flood exposure",
  "Facility conditions",
];

const sitePlaceTypes = [
  { label: "Residential", value: "residential" },
  { label: "Commercial", value: "commercial" },
  { label: "Warehouse / Facility", value: "warehouse" },
  { label: "Industrial", value: "industrial" },
  { label: "Agricultural", value: "agricultural" },
];

const operationPlaceTypes = [
  { label: "Logistics / Transportation", value: "logistics" },
  { label: "Warehouse / Storage", value: "warehouse" },
  { label: "Retail / Distribution", value: "retail" },
  { label: "Agriculture / Food Supply", value: "agricultural" },
  { label: "Manufacturing", value: "manufacturing" },
];

export default function PlacePage() {
  const router = useRouter();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  const [placeName, setPlaceName] = useState("");
  const [location, setLocation] = useState("");

  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  const [placeType, setPlaceType] = useState("");

  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);

  const [detectingLocation, setDetectingLocation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProfile() {
      const supabase = createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select(
          "primary_use_case, site_context, operation_context"
        )
        .eq("id", user.id)
        .single();

      if (error || !data) {
        router.push("/onboarding/use-case");
        return;
      }

      setProfile(data);
      setLoadingProfile(false);
    }

    loadProfile();
  }, [router]);

  function togglePriority(priority: string) {
    setSelectedPriorities((current) =>
      current.includes(priority)
        ? current.filter((item) => item !== priority)
        : [...current, priority]
    );
  }

  async function detectLocation() {
    if (!navigator.geolocation) {
      setError("Location detection isn't supported by this browser.");
      return;
    }

    setDetectingLocation(true);
    setError("");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        setLatitude(lat);
        setLongitude(lon);

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`
          );

          if (!response.ok) {
            throw new Error("Unable to find this location.");
          }

          const data = await response.json();

          const address = data.address ?? {};

          const readableLocation = [
            address.city ||
              address.town ||
              address.village ||
              address.municipality,
            address.state,
            address.country,
          ]
            .filter(Boolean)
            .join(", ");

          setLocation(readableLocation || data.display_name || "");
        } catch {
          setLocation(`${lat.toFixed(5)}, ${lon.toFixed(5)}`);
          setError(
            "We found your coordinates, but couldn't get a readable address. You can edit the location."
          );
        } finally {
          setDetectingLocation(false);
        }
      },
      () => {
        setDetectingLocation(false);
        setError(
          "We couldn't access your location. You can search or enter it manually."
        );
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
      }
    );
  }

  if (loadingProfile) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F5F3ED]">
        <p className="text-sm text-[#6D7069]">
          Preparing your place...
        </p>
      </main>
    );
  }

  if (!profile) return null;

  const isSite =
    profile.primary_use_case === "site" ||
    profile.primary_use_case === "both";

  const isOperation =
    profile.primary_use_case === "operation" ||
    profile.primary_use_case === "both";

  const priorities =
    profile.primary_use_case === "site"
      ? sitePriorities
      : profile.primary_use_case === "operation"
      ? operationPriorities
      : [...new Set([...sitePriorities, ...operationPriorities])];

  const context =
    profile.primary_use_case === "site"
      ? "site"
      : profile.primary_use_case === "operation"
      ? "operation"
      : "both";

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!placeName.trim()) {
      setError("Give your place a name.");
      return;
    }

    if (!location.trim()) {
      setError("Add a location for this place.");
      return;
    }

    if (!placeType) {
      setError("Tell us what this place is.");
      return;
    }

    if (selectedPriorities.length === 0) {
      setError("Choose at least one priority.");
      return;
    }

    setLoading(true);
    setError("");

    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    const { data: place, error: placeError } = await supabase
      .from("places")
      .insert({
        user_id: user.id,
        name: placeName.trim(),
        place_type: placeType,
        address: location.trim(),
        latitude,
        longitude,
        context_category: context,
        description: null,
      })
      .select("id")
      .single();

    if (placeError || !place) {
      setError(placeError?.message || "Unable to create your place.");
      setLoading(false);
      return;
    }

    const { error: prioritiesError } = await supabase
      .from("place_priorities")
      .insert(
        selectedPriorities.map((priority) => ({
          place_id: place.id,
          priority,
        }))
      );

    if (prioritiesError) {
      setError(prioritiesError.message);
      setLoading(false);
      return;
    }

    router.push(`/onboarding/snapshot?place=${place.id}`);
  }

  return (
    <main className="min-h-screen bg-[#F5F3ED]">
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col px-6 py-8">
        <TerrIQLogo />

        <div className="mt-16 flex-1 pb-10">
          <div className="mb-10">
            <p className="text-sm font-medium uppercase tracking-[0.15em] text-[#B66A45]">
              02 / 03 · Place
            </p>

            <h1 className="mt-4 text-4xl font-medium tracking-[-0.04em] text-[#171A17] sm:text-5xl">
              Where should TerrIQ start?
            </h1>

            <p className="mt-4 max-w-xl text-base leading-7 text-[#6D7069]">
              Add the first place you want TerrIQ to understand.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label
                htmlFor="placeName"
                className="mb-2 block text-sm font-medium text-[#26332B]"
              >
                Place name
              </label>

              <input
                id="placeName"
                value={placeName}
                onChange={(e) => setPlaceName(e.target.value)}
                placeholder="e.g. Lagos Warehouse"
                className="h-12 w-full rounded-xl border border-[#D7D8D1] bg-white px-4 text-sm outline-none transition focus:border-[#23483A] focus:ring-2 focus:ring-[#23483A]/10"
              />
            </div>

            <div>
              <label
                htmlFor="location"
                className="mb-2 block text-sm font-medium text-[#26332B]"
              >
                Location
              </label>

              <div className="relative">
                <input
                  id="location"
                  value={location}
                  onChange={(e) => {
                    setLocation(e.target.value);
                    setLatitude(null);
                    setLongitude(null);
                  }}
                  placeholder="Search for an address or area"
                  className="h-12 w-full rounded-xl border border-[#D7D8D1] bg-white px-4 pr-12 text-sm outline-none transition focus:border-[#23483A] focus:ring-2 focus:ring-[#23483A]/10"
                />
              </div>

              <button
                type="button"
                onClick={detectLocation}
                disabled={detectingLocation}
                className="mt-3 text-sm font-medium text-[#23483A] hover:text-[#1B392E] disabled:opacity-60"
              >
                {detectingLocation
                  ? "Finding your location..."
                  : "Use my current location"}
              </button>
            </div>

            <div>
              <p className="mb-3 text-sm font-medium text-[#26332B]">
                What is this place?
              </p>

              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  ...(isSite ? sitePlaceTypes : []),
                  ...(isOperation ? operationPlaceTypes : []),
                ]
                  .filter(
                    (type, index, array) =>
                      array.findIndex((t) => t.value === type.value) ===
                      index
                  )
                  .map((type) => {
                    const selected = placeType === type.value;

                    return (
                      <button
                        key={type.label}
                        type="button"
                        onClick={() => setPlaceType(type.value)}
                        className={`rounded-xl border px-4 py-4 text-left text-sm transition ${
                          selected
                            ? "border-[#23483A] bg-[#EAF0EB] text-[#23483A]"
                            : "border-[#D7D8D1] bg-white text-[#26332B] hover:border-[#AEB3AC]"
                        }`}
                      >
                        <span className="flex items-center justify-between">
                          {type.label}
                          {selected && (
                            <span className="text-[#23483A]">✓</span>
                          )}
                        </span>
                      </button>
                    );
                  })}
              </div>
            </div>

            <div>
              <p className="mb-1 text-sm font-medium text-[#26332B]">
                What matters most here?
              </p>

              <p className="mb-3 text-sm text-[#6D7069]">
                Choose the things you want TerrIQ to pay attention to.
              </p>

              <div className="grid gap-3 sm:grid-cols-2">
                {priorities.map((priority) => {
                  const selected = selectedPriorities.includes(priority);

                  return (
                    <button
                      key={priority}
                      type="button"
                      onClick={() => togglePriority(priority)}
                      className={`rounded-xl border px-4 py-4 text-left text-sm transition ${
                        selected
                          ? "border-[#23483A] bg-[#EAF0EB] text-[#23483A]"
                          : "border-[#D7D8D1] bg-white text-[#26332B] hover:border-[#AEB3AC]"
                      }`}
                    >
                      <span className="flex items-center justify-between gap-3">
                        {priority}
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
              {loading ? "Saving your place..." : "Continue"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}