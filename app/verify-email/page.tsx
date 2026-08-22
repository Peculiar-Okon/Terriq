"use client";

import { FormEvent, Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { TerrIQLogo } from "@/components/brands/terriq-logo";
import { createClient } from "@/lib/supabase/client";
import { AuthReveal } from "@/components/auth/auth-reveal";

function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email") ?? "";

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function verifyOtp(e: FormEvent) {
    e.preventDefault();

    setLoading(true);
    setError("");

    const supabase = createClient();

    const { error } = await supabase.auth.verifyOtp({
      email,
      token: otp,
      type: "signup",
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/onboarding/Use-case");
  }

  async function resendOtp() {
    setResending(true);
    setError("");

    const supabase = createClient();

    const { error } = await supabase.auth.resend({
      type: "signup",
      email,
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage("A new verification code has been sent.");
    }

    setResending(false);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F5F3ED] px-6">
      <div className="w-full max-w-md">
        <AuthReveal>
          <TerrIQLogo />
        </AuthReveal>

        <AuthReveal index={1} className="mt-14">
          <p className="text-sm uppercase tracking-[0.15em] text-[#B66A45]">
            Verify your email
          </p>

          <h1 className="mt-3 text-2xl font-semibold tracking-[-0.03em] sm:text-4xl sm:tracking-[-0.04em]">
            One small step.
          </h1>

          <p className="mt-2 text-sm leading-6 text-[#6D7069] sm:mt-3">
            We sent a 6-digit verification code to{" "}
            <strong>{email}</strong>.
          </p>
        </AuthReveal>

        <AuthReveal index={2}>
          <form onSubmit={verifyOtp} className="mt-6 sm:mt-8">
            <input
              value={otp}
              onChange={(e) =>
                setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
              }
              inputMode="numeric"
              maxLength={6}
              required
              autoFocus
              placeholder="000000"
              className="w-full border border-[#D9D7CE] bg-[#FBFAF6] px-4 py-4 text-center text-2xl tracking-[0.35em] outline-none focus:border-[#23483A] sm:py-5 sm:text-3xl sm:tracking-[0.4em]"
            />

            {error && (
              <p className="mt-3 text-sm text-[#A34E45]">{error}</p>
            )}

            {message && (
              <p className="mt-3 text-sm text-[#3F6B4D]">{message}</p>
            )}

            <button
              disabled={loading || otp.length !== 6}
              className="mt-4 w-full bg-[#23483A] px-5 py-3 text-sm font-medium text-white disabled:opacity-50 sm:mt-5 sm:py-3.5"
            >
              {loading ? "Verifying..." : "Verify email"}
            </button>
          </form>

          <button
            onClick={resendOtp}
            disabled={resending}
            className="mt-5 w-full text-sm font-medium text-[#23483A]"
          >
            {resending ? "Sending..." : "Didn't receive it? Send again"}
          </button>
        </AuthReveal>
      </div>
    </main>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={null}>
      <VerifyEmailContent />
    </Suspense>
  );
}