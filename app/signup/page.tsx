"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const passwordMessage = getPasswordMessage(password);

  const passwordsMatch =
    confirmPassword.length > 0 && password === confirmPassword;

  const passwordMismatch =
    confirmPassword.length > 0 && password !== confirmPassword;

  async function handleSignup(e: FormEvent) {
    e.preventDefault();

    setError("");

    // Validate password
    if (!isStrongPassword(password)) {
      setError("Please create a stronger password.");
      return;
    }

    // Validate confirmation
    if (password !== confirmPassword) {
      setError("Your passwords do not match.");
      return;
    }

    setLoading(true);

    const supabase = createClient();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    if (data.user) {
      router.push(
        `/verify-email?email=${encodeURIComponent(email)}`
      );
    }
  }

  return (
    <main className="flex min-h-screen bg-[#F5F3ED]">
      {/* Left side */}
      <div className="hidden w-1/2 bg-[#23483A] p-10 lg:flex lg:flex-col lg:justify-between">
        <TerrIQLogo dark />

        <div className="max-w-md">
          <p className="text-sm uppercase tracking-[0.15em] text-[#A9B9AF]">
            Set up your workspace
          </p>

          <h1 className="mt-4 text-5xl font-medium leading-[1.05] tracking-[-0.04em] text-[#F5F3ED]">
            Start making better decisions around your sites and operations.
          </h1>

          <p className="mt-6 max-w-sm text-base leading-7 text-[#C7D1CB]">
            TerrIQ helps you understand environmental conditions around a place,
            identify what they could affect, and decide what to do before they become
            costly problems.
          </p>
        </div>

        <p className="text-xs text-[#A9B9AF]">
          For sites, businesses, and the decisions around them.
        </p>
      </div>
      

      {/* Right side */}
      <div className="flex w-full items-center justify-center px-6 py-12 lg:w-1/2">
        <div className="w-full max-w-md">
          <div className="mb-10 lg:hidden">
            <TerrIQLogo />
          </div>

          <div>
            <p className="text-sm uppercase tracking-[0.15em] text-[#6B746E]">
              Create account
            </p>

            <h2 className="mt-3 text-4xl font-medium tracking-[-0.04em] text-[#1D2822]">
              Welcome to TerrIQ.
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#6B746E]">
              Create your account and start understanding your
              environment.
            </p>
          </div>

          <form onSubmit={handleSignup} className="mt-8 space-y-5">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-[#26332B]"
              >
                Full name
              </label>

              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
                className="h-12 w-full rounded-xl border border-[#D7D8D1] bg-white px-4 text-sm text-[#1D2822] outline-none transition placeholder:text-[#9CA39D] focus:border-[#23483A] focus:ring-2 focus:ring-[#23483A]/10"
              />
            </div>

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
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="h-12 w-full rounded-xl border border-[#D7D8D1] bg-white px-4 text-sm text-[#1D2822] outline-none transition placeholder:text-[#9CA39D] focus:border-[#23483A] focus:ring-2 focus:ring-[#23483A]/10"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-[#26332B]"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a strong password"
                required
                minLength={8}
                className={`h-12 w-full rounded-xl border bg-white px-4 text-sm text-[#1D2822] outline-none transition placeholder:text-[#9CA39D] focus:ring-2 focus:ring-[#23483A]/10 ${
                  passwordMessage
                    ? "border-[#C95C54] focus:border-[#C95C54]"
                    : "border-[#D7D8D1] focus:border-[#23483A]"
                }`}
              />

              {/* Password guidance */}
              {passwordMessage && (
                <p className="mt-2 text-xs leading-5 text-[#C95C54]">
                  {passwordMessage}
                </p>
              )}

              {/* Success */}
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
                onChange={(e) => setConfirmPassword(e.target.value)}
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

            {/* General error */}
            {error && (
              <div className="rounded-xl border border-[#E8B7B2] bg-[#FDF3F2] px-4 py-3">
                <p className="text-sm text-[#A9443D]">
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
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[#6B746E]">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-[#23483A] hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}