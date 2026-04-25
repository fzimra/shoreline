"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { placeCategories } from "@/config/constants";

const initialForm = {
  name: "",
  description: "",
  opening_hours: "",
  distance_km: "",
  address: "",
  latitude: "",
  longitude: "",
  image_url: "",
  travel_tips: "",
};

function toOptionalNumber(value) {
  if (value === "") {
    return undefined;
  }

  const parsed = Number(value);

  if (Number.isNaN(parsed)) {
    return undefined;
  }

  return parsed;
}

export default function NewPlaceForm() {
  const router = useRouter();
  const [form, setForm] = useState(initialForm);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const updateField = (key) => (event) => {
    setForm((current) => ({ ...current, [key]: event.target.value }));
  };

  const toggleCategory = (category) => {
    setSelectedCategories((current) => {
      if (current.includes(category)) {
        return current.filter((item) => item !== category);
      }

      return [...current, category];
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const requiredFieldsMissing =
      !form.name.trim() ||
      !form.description.trim() ||
      !form.opening_hours.trim() ||
      !form.distance_km;

    if (requiredFieldsMissing) {
      setError("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      const latitude = toOptionalNumber(form.latitude);
      const longitude = toOptionalNumber(form.longitude);

      const payload = {
        name: form.name.trim(),
        description: form.description.trim(),
        category: selectedCategories,
        opening_hours: form.opening_hours.trim(),
        distance_km: Number(form.distance_km),
        image_url: form.image_url.trim() || undefined,
        travel_tips: form.travel_tips
          .split("\n")
          .map((tip) => tip.trim())
          .filter(Boolean),
      };

      payload.location = {
        address: form.address.trim() || undefined,
        latitude,
        longitude,
      };

      const response = await fetch("/api/places", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const responseBody = await response.json();

      if (!response.ok) {
        throw new Error(responseBody?.error || "Failed to create place.");
      }

      router.replace("/dashboard/places");
      router.refresh();
    } catch (submitError) {
      setError(submitError.message || "Unable to create place.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-7 space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <h2 className="text-base font-semibold text-slate-900">Basic Info</h2>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="sm:col-span-2">
            <span className="mb-2 block text-sm font-medium text-slate-700">
              Place name *
            </span>
            <input
              type="text"
              value={form.name}
              onChange={updateField("name")}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
              placeholder="Temple of the Sacred Tooth Relic"
              required
            />
          </label>

          <label className="sm:col-span-2">
            <span className="mb-2 block text-sm font-medium text-slate-700">
              Description *
            </span>
            <textarea
              value={form.description}
              onChange={updateField("description")}
              rows={4}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
              placeholder="Add a concise description for visitors"
              required
            />
          </label>

          <label>
            <span className="mb-2 block text-sm font-medium text-slate-700">
              Opening hours *
            </span>
            <input
              type="text"
              value={form.opening_hours}
              onChange={updateField("opening_hours")}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
              placeholder="8:00 AM - 6:00 PM"
              required
            />
          </label>

          <label>
            <span className="mb-2 block text-sm font-medium text-slate-700">
              Distance (km) *
            </span>
            <input
              type="number"
              min="0"
              step="0.1"
              value={form.distance_km}
              onChange={updateField("distance_km")}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
              placeholder="6.8"
              required
            />
          </label>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <h2 className="text-base font-semibold text-slate-900">Categories</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {placeCategories.map((category) => {
            const checked = selectedCategories.includes(category);

            return (
              <label
                key={category}
                className={`cursor-pointer rounded-full border px-3 py-1.5 text-sm font-medium transition ${
                  checked
                    ? "border-sky-300 bg-sky-50 text-sky-700"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                }`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleCategory(category)}
                  className="sr-only"
                />
                {category}
              </label>
            );
          })}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <h2 className="text-base font-semibold text-slate-900">Location</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="sm:col-span-2">
            <span className="mb-2 block text-sm font-medium text-slate-700">
              Address
            </span>
            <input
              type="text"
              value={form.address}
              onChange={updateField("address")}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
              placeholder="Kandy, Sri Lanka"
            />
          </label>

          <label>
            <span className="mb-2 block text-sm font-medium text-slate-700">
              Latitude
            </span>
            <input
              type="number"
              step="any"
              value={form.latitude}
              onChange={updateField("latitude")}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
              placeholder="7.2906"
            />
          </label>

          <label>
            <span className="mb-2 block text-sm font-medium text-slate-700">
              Longitude
            </span>
            <input
              type="number"
              step="any"
              value={form.longitude}
              onChange={updateField("longitude")}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
              placeholder="80.6337"
            />
          </label>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <h2 className="text-base font-semibold text-slate-900">Extras</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="sm:col-span-2">
            <span className="mb-2 block text-sm font-medium text-slate-700">
              Image URL
            </span>
            <input
              type="url"
              value={form.image_url}
              onChange={updateField("image_url")}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
              placeholder="https://example.com/place-image.jpg"
            />
          </label>

          <label className="sm:col-span-2">
            <span className="mb-2 block text-sm font-medium text-slate-700">
              Travel tips (one per line)
            </span>
            <textarea
              value={form.travel_tips}
              onChange={updateField("travel_tips")}
              rows={4}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
              placeholder={"Go early in the morning\nCarry drinking water"}
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
          {isSubmitting ? "Creating..." : "Create Place"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/dashboard/places")}
          className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
