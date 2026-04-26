"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const initialForm = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "tourist",
};

export default function NewUserForm() {
  const router = useRouter();
  const [form, setForm] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const updateField = (key) => (event) => {
    setForm((current) => ({ ...current, [key]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const requiredFieldsMissing =
      !form.username.trim() || !form.email.trim() || !form.password;

    if (requiredFieldsMissing) {
      setError("Please fill in all required fields.");
      return;
    }

    if (form.password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Password confirmation does not match.");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        username: form.username.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password,
        role: form.role,
      };

      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const responseBody = await response.json();

      if (!response.ok) {
        throw new Error(responseBody?.error || "Failed to create user.");
      }

      toast.success("New user added successfully");
      router.replace("/dashboard/users");
      router.refresh();
    } catch (submitError) {
      setError(submitError.message || "Unable to create user.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-7 space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <h2 className="text-base font-semibold text-slate-900">User Details</h2>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label>
            <span className="mb-2 block text-sm font-medium text-slate-700">
              Username *
            </span>
            <input
              type="text"
              value={form.username}
              onChange={updateField("username")}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
              placeholder="jane_doe"
              required
            />
          </label>

          <label>
            <span className="mb-2 block text-sm font-medium text-slate-700">
              Role *
            </span>
            <select
              value={form.role}
              onChange={updateField("role")}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
            >
              <option value="tourist">tourist</option>
              <option value="admin">admin</option>
            </select>
          </label>

          <label className="sm:col-span-2">
            <span className="mb-2 block text-sm font-medium text-slate-700">
              Email address *
            </span>
            <input
              type="email"
              value={form.email}
              onChange={updateField("email")}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
              placeholder="user@shoreline.app"
              required
              autoComplete="email"
            />
          </label>

          <label>
            <span className="mb-2 block text-sm font-medium text-slate-700">
              Password *
            </span>
            <input
              type="password"
              value={form.password}
              onChange={updateField("password")}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
              placeholder="At least 8 characters"
              required
              minLength={8}
              autoComplete="new-password"
            />
          </label>

          <label>
            <span className="mb-2 block text-sm font-medium text-slate-700">
              Confirm password *
            </span>
            <input
              type="password"
              value={form.confirmPassword}
              onChange={updateField("confirmPassword")}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
              placeholder="Retype password"
              required
              minLength={8}
              autoComplete="new-password"
            />
          </label>
        </div>
      </section>

      {error ? (
        <p className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-xl bg-sky-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-800 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? "Creating..." : "Create User"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/dashboard/users")}
          className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
