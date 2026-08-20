"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { TerrIQLogo } from "@/components/brands/terriq-logo";
import { createClient } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setError("");

    const supabase = createClient();

    const { error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) {
      setError(error.message);
    } else {
      setSent(true);
    }

    setLoading(false);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F5F3ED] px-6 py-12">
      <div className="w-full max-w-md">
        <TerrIQLogo />

        <div className="mt-10">
          <p className="text-sm uppercase tracking-[0.15em] text-[#6B746E]">
            Account recovery
          </p>

          <h1 className="mt-3 text-4xl font-medium tracking-[-0.04em] text-[#1D2822]">
            Reset your password.
          </h1>

          <p className="mt-3 text-sm leading-6 text-[#6B746E]">
            Enter your email and we'll send you a verification code to
            continue.
          </p>
        </div>

        {sent ? (
          <div className="mt-8">
            <div className="rounded-xl border border-[#D7D8D1] bg-white p-5">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF0EB] text-[#23483A]">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <path d="M4 5h16v14H4z" />
                    <path d="m4 7 8 6 8-6" />
                  </svg>
                </div>

                <div>
                  <p className="text-sm font-medium text-[#1D2822]">
                    Check your email
                  </p>

                  <p className="mt-1 text-sm leading-6 text-[#6B746E]">
                    We've sent a verification code to{" "}
                    <span className="font-medium text-[#26332B]">
                      {email}
                    </span>
                    .
                  </p>
                </div>
              </div>

              <Link
                href={`/reset-password?email=${encodeURIComponent(email)}`}
                className="mt-5 block h-12 rounded-xl bg-[#23483A] px-5 py-3.5 text-center text-sm font-medium text-white transition hover:bg-[#1B392E]"
              >
                Enter verification code
              </Link>
            </div>

            <button
              type="button"
              onClick={() => {
                setSent(false);
                setError("");
              }}
              className="mt-4 w-full text-sm font-medium text-[#23483A] transition hover:underline"
            >
              Use a different email
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8">
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

            {error && (
              <div className="mt-4 rounded-xl border border-[#E8B7B2] bg-[#FDF3F2] px-4 py-3">
                <p className="text-sm leading-5 text-[#A9443D]">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-5 h-12 w-full rounded-xl bg-[#23483A] text-sm font-medium text-white transition hover:bg-[#1B392E] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Sending code..." : "Send verification code"}
            </button>
          </form>
        )}

        <Link
          href="/login"
          className="mt-6 block text-center text-sm text-[#6B746E] transition hover:text-[#23483A]"
        >
          ← Back to sign in
        </Link>
      </div>
    </main>
  );
}