// "use client";

// import { FormEvent, useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { TerrIQLogo } from "@/components/brands/terriq-logo";
// import { createClient } from "@/lib/supabase/client";

// export default function LoginPage() {
//   const router = useRouter();
//   const supabase = createClient();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   async function handleLogin(e: FormEvent) {
//     e.preventDefault();

//     setLoading(true);
//     setError("");

//     const { data, error } = await supabase.auth.signInWithPassword({
//       email,
//       password,
//     });

//     if (error) {
//       setError(error.message);
//       setLoading(false);
//       return;
//     }

//     if (data.user) {
//       const { data: profile } = await supabase
//         .from("profiles")
//         .select("onboarding_completed")
//         .eq("id", data.user.id)
//         .single();

//       if (profile?.onboarding_completed) {
//         router.push("/dashboard");
//       } else {
//         router.push("/onboarding/location");
//       }
//     }

//     setLoading(false);
//   }

//   return (
//     <main className="flex min-h-screen bg-[#F5F3ED]">
//       <div className="hidden w-1/2 bg-[#23483A] p-10 lg:flex lg:flex-col lg:justify-between">
//         <TerrIQLogo dark />

//         <div className="max-w-md">
//           <p className="text-sm uppercase tracking-[0.15em] text-[#A9B9AF]">
//             Welcome back
//           </p>

//           <h1 className="mt-4 text-5xl font-semibold leading-tight tracking-[-0.04em] text-[#F5F3ED]">
//             Continue making better decisions for where you live.
//           </h1>
//         </div>

//         <p className="text-xs text-[#A9B9AF]">
//           TerrIQ · Environmental intelligence
//         </p>
//       </div>

//       <div className="flex flex-1 items-center justify-center px-6 py-12">
//         <div className="w-full max-w-md">
//           <div className="lg:hidden">
//             <TerrIQLogo />
//           </div>

//           <div className="mt-12 lg:mt-0">
//             <h2 className="text-3xl font-semibold tracking-[-0.035em]">
//               Sign in
//             </h2>

//             <p className="mt-2 text-sm text-[#6D7069]">
//               Access your TerrIQ profile and plans.
//             </p>

//             <form onSubmit={handleLogin} className="mt-8 space-y-5">
//               <div>
//                 <label className="mb-2 block text-sm font-medium">
//                   Email
//                 </label>

//                 <input
//                   required
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="w-full border border-[#D9D7CE] bg-[#FBFAF6] px-4 py-3 outline-none focus:border-[#23483A]"
//                 />
//               </div>

//               <div>
//                 <label className="mb-2 block text-sm font-medium">
//                   Password
//                 </label>

//                 <input
//                   required
//                   type="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="w-full border border-[#D9D7CE] bg-[#FBFAF6] px-4 py-3 outline-none focus:border-[#23483A]"
//                 />
//               </div>

//               <div className="flex justify-end">
//                 <Link
//                   href="/forgot-password"
//                   className="text-sm font-medium text-[#23483A]"
//                 >
//                   Forgot password?
//                 </Link>
//               </div>

//               {error && (
//                 <p className="text-sm text-[#A34E45]">{error}</p>
//               )}

//               <button
//                 disabled={loading}
//                 className="w-full bg-[#23483A] px-5 py-3.5 text-sm font-medium text-white disabled:opacity-50"
//               >
//                 {loading ? "Signing in..." : "Sign in"}
//               </button>
//             </form>

//             <p className="mt-6 text-center text-sm text-[#6D7069]">
//               Don't have an account?{" "}
//               <Link
//                 href="/signup"
//                 className="font-medium text-[#23483A]"
//               >
//                 Create one
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }

"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TerrIQLogo } from "@/components/brands/terriq-logo";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setError("");

    const supabase = createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    if (data.user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("onboarding_completed")
        .eq("id", data.user.id)
        .single();

      if (profile?.onboarding_completed) {
        router.push("/dashboard");
      } else {
        router.push("/onboarding/Use-case");
      }
    }

    setLoading(false);
  }

  return (
    <main className="flex min-h-screen bg-[#F5F3ED]">
      {/* Left panel */}
      <div className="hidden w-1/2 bg-[#23483A] p-10 lg:flex lg:flex-col lg:justify-between">
        <TerrIQLogo dark />

        <div className="max-w-md">
          <p className="text-sm uppercase tracking-[0.15em] text-[#A9B9AF]">
            Welcome back
          </p>

            <h1 className="mt-4 text-5xl font-medium leading-[1.05] tracking-[-0.04em] text-[#F5F3ED]">
              See what&apos;s changing around your sites and operations.
            </h1>

            <p className="mt-6 max-w-sm text-base leading-7 text-[#C7D1CB]">
              Check environmental conditions, understand what they could affect, and
              make better decisions before risk reaches your site or operations.
            </p>
            </div>

            <p className="text-xs text-[#A9B9AF]">
              Environmental conditions. Better decisions.
            </p>
      </div>

      {/* Right panel */}
      <div className="flex w-full items-center justify-center px-6 py-12 lg:w-1/2">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="mb-10 lg:hidden">
            <TerrIQLogo />
          </div>

          <div>
            <p className="text-sm uppercase tracking-[0.15em] text-[#6B746E]">
              Welcome back
            </p>

              <h2 className="mt-3 text-4xl font-medium tracking-[-0.04em] text-[#1D2822]">
                Welcome back to TerrIQ.
              </h2>

              <p className="mt-3 text-sm leading-6 text-[#6B746E]">
                See what has changed around your sites and operations.
              </p>
          </div>

          <form onSubmit={handleLogin} className="mt-8 space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-[#26332B]"
              >
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                required
                className="h-12 w-full rounded-xl border border-[#D7D8D1] bg-white px-4 text-sm text-[#1D2822] outline-none transition placeholder:text-[#9CA39D] focus:border-[#23483A] focus:ring-2 focus:ring-[#23483A]/10"
              />
            </div>

            {/* Password */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-[#26332B]"
                >
                  Password
                </label>

                <Link
                  href="/forgot-password"
                  className="text-xs font-medium text-[#23483A] transition hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                  className="h-12 w-full rounded-xl border border-[#D7D8D1] bg-white px-4 pr-12 text-sm text-[#1D2822] outline-none transition placeholder:text-[#9CA39D] focus:border-[#23483A] focus:ring-2 focus:ring-[#23483A]/10"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-[#6B746E] transition hover:bg-[#F5F3ED] hover:text-[#23483A]"
                >
                  {showPassword ? (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      className="h-5 w-5"
                      aria-hidden="true"
                    >
                      <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" />
                      <circle cx="12" cy="12" r="2.5" />
                    </svg>
                  ) : (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      className="h-5 w-5"
                      aria-hidden="true"
                    >
                      <path d="m3 3 18 18" />
                      <path d="M10.6 5.2A10.7 10.7 0 0 1 12 5c6.5 0 10 7 10 7a18.7 18.7 0 0 1-3.1 3.8" />
                      <path d="M6.7 6.7C3.7 8.5 2 12 2 12s3.5 7 10 7c1.5 0 2.8-.3 4-.8" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-xl border border-[#E8B7B2] bg-[#FDF3F2] px-4 py-3">
                <p className="text-sm leading-5 text-[#A9443D]">
                  {error}
                </p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="h-12 w-full rounded-xl bg-[#23483A] text-sm font-medium text-white transition hover:bg-[#1B392E] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[#6B746E]">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="font-medium text-[#23483A] transition hover:underline"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}