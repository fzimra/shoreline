"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (field) => (event) => {
    setFormData((current) => ({ ...current, [field]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload?.error || "Login failed");
      }

      router.replace("/dashboard");
      router.refresh();
    } catch (loginError) {
      setError(loginError.message || "Unable to log in right now.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-[1.1fr_0.9fr]">
      <section className="relative hidden overflow-hidden bg-slate-950 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.35),_transparent_35%),linear-gradient(135deg,_rgba(15,23,42,0.98),_rgba(3,7,18,0.95))]" />
        <div className="absolute -left-16 top-20 h-56 w-56 rounded-full bg-sky-500/20 blur-3xl" />
        <div className="absolute bottom-10 right-0 h-72 w-72 rounded-full bg-cyan-400/15 blur-3xl" />

        <div className="relative z-10 flex h-full flex-col justify-between px-10 py-12 xl:px-16">
          <Link href="/" className="flex items-center gap-3 text-white">
            <Image
              src="/images/logo.png"
              alt="Shoreline"
              width={152}
              height={48}
              className="h-10 w-auto brightness-0 invert"
              priority
            />
          </Link>

          <div className="max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-300/90">
              Welcome back
            </p>
            <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-white xl:text-6xl">
              Sign in to manage your platform.
            </h1>
          </div>

          <p className="relative z-10 text-sm text-slate-400">
            Explore Sri Lanka with Shoreline.
          </p>
        </div>
      </section>

      <section className="relative flex items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.08),_transparent_40%),linear-gradient(180deg,_#f8fafc_0%,_#eef4fb_100%)] px-4 py-10 sm:px-6 lg:px-10">
        <div className="w-full max-w-md rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.14)] backdrop-blur-xl sm:p-8">
          <div className="mb-8 lg:hidden">
            <Link href="/" className="inline-flex items-center gap-2">
              <Image
                src="/images/logo.png"
                alt="Shoreline"
                width={120}
                height={36}
                className="h-8 w-auto"
              />
            </Link>
          </div>

          <div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
              Login
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Use your account email and password.
            </p>
          </div>

          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={formData.email}
                onChange={updateField("email")}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                autoComplete="current-password"
                value={formData.password}
                onChange={updateField("password")}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                placeholder="Enter your password"
              />
            </div>

            {error ? (
              <p className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full items-center justify-center rounded-xl bg-sky-700 px-4 py-3 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(2,132,199,0.25)] transition hover:bg-sky-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Need an account? Contact your administrator.
          </p>
        </div>
      </section>
    </div>
  );
}
