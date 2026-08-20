"use client";

import { FormEvent, Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { TerrIQLogo } from "@/components/brands/terriq-logo";
import { createClient } from "@/lib/supabase/client";

const passwordRules = {
  length: /.{8,}/,
  uppercase: /[A-Z]/,
  lowercase: /[a-z]/,
  number: /[0-9]/,
  special: /[^A-Za-z0-9]/,
};

function getPasswordMessage(password: string) {
  if (!password) return "";

  if (!passwordRules.length.test(password)) {
    return "Increase your password length to at least 8 characters.";
  }

  if (!passwordRules.uppercase.test(password)) {
    return "Include at least one capital letter.";
  }

  if (!passwordRules.lowercase.test(password)) {
    return "Include at least one lowercase letter.";
  }

  if (!passwordRules.number.test(password)) {
    return "Include at least one number.";
  }

  if (!passwordRules.special.test(password)) {
    return "Include at least one special character.";
  }

  return "";
}

function isStrongPassword(password: string) {
  return (
    passwordRules.length.test(password) &&
    passwordRules.uppercase.test(password) &&
    passwordRules.lowercase.test(password) &&
    passwordRules.number.test(password) &&
    passwordRules.special.test(password)
  );
}

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email") ?? "";

  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");

  const passwordMessage = getPasswordMessage(password);

  const passwordsMatch =
    confirmPassword.length > 0 &&
    password === confirmPassword;

  const passwordMismatch =
    confirmPassword.length > 0 &&
    password !== confirmPassword;

  async function verifyCode(e: FormEvent) {
    e.preventDefault();

    setLoading(true);
    setError("");

    if (!otp || otp.length !== 6) {
      setError("Enter the 6-digit verification code.");
      setLoading(false);
      return;
    }

    const supabase = createClient();

    const { error } = await supabase.auth.verifyOtp({
      email,
      token: otp,
      type: "recovery",
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setVerified(true);
    setLoading(false);
  }

  async function updatePassword(e: FormEvent) {
    e.preventDefault();

    setError("");

    // Same password validation used during signup
    if (!isStrongPassword(password)) {
      setError("Please create a stronger password.");
      return;
    }

    // Confirm password
    if (password !== confirmPassword) {
      setError("Your passwords do not match.");
      return;
    }

    setLoading(true);

    const supabase = createClient();

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/login?reset=success");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F5F3ED] px-6">
      <div className="w-full max-w-md">

        <div className="mb-10">
          <TerrIQLogo />
        </div>

        {!verified ? (
          <>
            <div>
              <p className="text-sm uppercase tracking-[0.15em] text-[#6B746E]">
                Reset password
              </p>

              <h1 className="mt-3 text-4xl font-medium tracking-[-0.04em] text-[#1D2822]">
                Verify your email.
              </h1>

              <p className="mt-3 text-sm leading-6 text-[#6B746E]">
                Enter the 6-digit code we sent to{" "}
                <span className="font-medium text-[#23483A]">
                  {email}
                </span>
                .
              </p>
            </div>

            <form
              onSubmit={verifyCode}
              className="mt-8 space-y-5"
            >
              <div>
                <label
                  htmlFor="otp"
                  className="mb-2 block text-sm font-medium text-[#26332B]"
                >
                  Verification code
                </label>

                <input
                  id="otp"
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={otp}
                  onChange={(e) =>
                    setOtp(
                      e.target.value.replace(/\D/g, "")
                    )
                  }
                  placeholder="000000"
                  required
                  className="h-14 w-full rounded-xl border border-[#D7D8D1] bg-white px-4 text-center text-xl tracking-[0.35em] text-[#1D2822] outline-none transition placeholder:text-[#B0B5B1] focus:border-[#23483A] focus:ring-2 focus:ring-[#23483A]/10"
                />
              </div>

              {error && (
                <div className="rounded-xl border border-[#E8B7B2] bg-[#FDF3F2] px-4 py-3">
                  <p className="text-sm text-[#A9443D]">
                    {error}
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="h-12 w-full rounded-xl bg-[#23483A] text-sm font-medium text-white transition hover:bg-[#1B392E] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Verifying..." : "Verify code"}
              </button>
            </form>
          </>
        ) : (
          <>
            <div>
              <p className="text-sm uppercase tracking-[0.15em] text-[#6B746E]">
                New password
              </p>

              <h1 className="mt-3 text-4xl font-medium tracking-[-0.04em] text-[#1D2822]">
                Create a new password.
              </h1>

              <p className="mt-3 text-sm leading-6 text-[#6B746E]">
                Choose a strong password to keep your TerrIQ account
                secure.
              </p>
            </div>

            <form
              onSubmit={updatePassword}
              className="mt-8 space-y-5"
            >
              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-[#26332B]"
                >
                  New password
                </label>

                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  placeholder="Create a strong password"
                  required
                  minLength={8}
                  className={`h-12 w-full rounded-xl border bg-white px-4 text-sm text-[#1D2822] outline-none transition placeholder:text-[#9CA39D] focus:ring-2 focus:ring-[#23483A]/10 ${
                    passwordMessage
                      ? "border-[#C95C54] focus:border-[#C95C54]"
                      : "border-[#D7D8D1] focus:border-[#23483A]"
                  }`}
                />

                {passwordMessage && (
                  <p className="mt-2 text-xs leading-5 text-[#C95C54]">
                    {passwordMessage}
                  </p>
                )}

                {password &&
                  !passwordMessage &&
                  isStrongPassword(password) && (
                    <p className="mt-2 text-xs text-[#39745A]">
                      Strong password.
                    </p>
                  )}
              </div>

              {/* Confirm password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-medium text-[#26332B]"
                >
                  Confirm password
                </label>

                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
                  placeholder="Enter your password again"
                  required
                  className={`h-12 w-full rounded-xl border bg-white px-4 text-sm text-[#1D2822] outline-none transition placeholder:text-[#9CA39D] focus:ring-2 focus:ring-[#23483A]/10 ${
                    passwordMismatch
                      ? "border-[#C95C54] focus:border-[#C95C54]"
                      : passwordsMatch
                      ? "border-[#39745A] focus:border-[#39745A]"
                      : "border-[#D7D8D1] focus:border-[#23483A]"
                  }`}
                />

                {passwordMismatch && (
                  <p className="mt-2 text-xs text-[#C95C54]">
                    Passwords do not match.
                  </p>
                )}

                {passwordsMatch && (
                  <p className="mt-2 text-xs text-[#39745A]">
                    Passwords match.
                  </p>
                )}
              </div>

              {error && (
                <div className="rounded-xl border border-[#E8B7B2] bg-[#FDF3F2] px-4 py-3">
                  <p className="text-sm text-[#A9443D]">
                    {error}
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={
                  loading ||
                  !isStrongPassword(password) ||
                  password !== confirmPassword
                }
                className="h-12 w-full rounded-xl bg-[#23483A] text-sm font-medium text-white transition hover:bg-[#1B392E] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading
                  ? "Updating password..."
                  : "Update password"}
              </button>
            </form>
          </>
        )}
      </div>
    </main>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={null}>
      <ResetPasswordContent />
    </Suspense>
  );
}