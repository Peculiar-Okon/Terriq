import Link from "next/link";
import { TerrIQLogo } from "@/components/brands/terriq-logo";

export default function SignupPage() {
  return (
    <main className="flex min-h-screen bg-[#F5F3ED]">
      <div className="hidden w-1/2 bg-[#23483A] p-10 lg:flex lg:flex-col lg:justify-between">
        <TerrIQLogo dark />

        <div className="max-w-md">
          <p className="text-sm uppercase tracking-[0.15em] text-[#A9B9AF]">
            Start here
          </p>

          <h1 className="mt-4 text-5xl font-semibold leading-tight tracking-[-0.04em] text-[#F5F3ED]">
            Understand your environment. Make better choices.
          </h1>
        </div>

        <p className="text-xs text-[#A9B9AF]">
          TerrIQ · Environmental intelligence
        </p>
      </div>

      <div className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden">
            <TerrIQLogo />
          </div>

          <div className="mt-12 lg:mt-0">
            <h2 className="text-3xl font-semibold tracking-[-0.035em]">
              Create your account
            </h2>

            <p className="mt-2 text-sm text-[#6D7069]">
              Your environmental profile starts here.
            </p>

            <form className="mt-8 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Full name
                </label>

                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full border border-[#D9D7CE] bg-[#FBFAF6] px-4 py-3 outline-none transition focus:border-[#23483A]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Email
                </label>

                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full border border-[#D9D7CE] bg-[#FBFAF6] px-4 py-3 outline-none transition focus:border-[#23483A]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Password
                </label>

                <input
                  type="password"
                  placeholder="Create a password"
                  className="w-full border border-[#D9D7CE] bg-[#FBFAF6] px-4 py-3 outline-none transition focus:border-[#23483A]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#23483A] px-5 py-3.5 text-sm font-medium text-white transition hover:bg-[#18362B]"
              >
                Create account
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-[#6D7069]">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-[#23483A] hover:text-[#B66A45]"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}